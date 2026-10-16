import React, { useCallback, useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";

const DUPLICATE_WINDOW_MS = 1800; // evita ler o mesmo produto várias vezes seguidas

// Formatos lineares comuns (varejo e logística).
const ZXING_FORMATS = [
  BarcodeFormat.EAN_13,
  BarcodeFormat.EAN_8,
  BarcodeFormat.UPC_A,
  BarcodeFormat.UPC_E,
  BarcodeFormat.CODE_128,
  BarcodeFormat.CODE_39,
  BarcodeFormat.ITF,
  BarcodeFormat.CODABAR,
];
const NATIVE_FORMATS = [
  "ean_13",
  "ean_8",
  "upc_a",
  "upc_e",
  "code_128",
  "code_39",
  "itf",
  "codabar",
];

function BarcodeScanner({ onDetected, active = true }) {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const lastRef = useRef({ code: "", at: 0 });
  const attemptsRef = useRef(0); // quantas varreduras o ZXing já fez
  const onDetectedRef = useRef(onDetected);
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState("");
  const [info, setInfo] = useState({ res: "-", attempts: 0 });
  const [native, setNative] = useState("verificando");
  const [lastRaw, setLastRaw] = useState("");

  useEffect(() => {
    onDetectedRef.current = onDetected;
  }, [onDetected]);

  // Ponto único de saída: qualquer detector (ZXing ou nativo) chama aqui.
  const emit = useCallback((code, source) => {
    setLastRaw(`${code} (${source})`); // mostra mesmo se for inválido para a API
    const now = Date.now();
    const last = lastRef.current;
    if (code === last.code && now - last.at < DUPLICATE_WINDOW_MS) return;
    lastRef.current = { code, at: now };
    if (onDetectedRef.current) onDetectedRef.current(code);
  }, []);

  // Lista as câmeras disponíveis (webcam do laptop, USB etc.)
  useEffect(() => {
    BrowserMultiFormatReader.listVideoInputDevices()
      .then((list) => setDevices(list))
      .catch(() => setError("Não foi possível listar as câmeras."));
  }, []);

  // Leitor 1: ZXing (funciona em qualquer navegador).
  useEffect(() => {
    if (!active) return undefined;

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, ZXING_FORMATS);
    // Mais lento por frame, mas lê códigos pequenos, inclinados ou com desfoque.
    hints.set(DecodeHintType.TRY_HARDER, true);
    // Varre a cada ~120 ms (o padrão é 500 ms, pouco para uma câmera na mão).
    const reader = new BrowserMultiFormatReader(hints, {
      delayBetweenScanAttempts: 120,
    });
    let cancelled = false;
    attemptsRef.current = 0;

    // Resolução alta: um EAN-13 em 640x480 (padrão de webcam) fica ilegível.
    // "ideal" não falha se a câmera não suportar: o navegador usa o mais próximo.
    const video = {
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      advanced: [{ focusMode: "continuous" }], // ignorado se a câmera não tiver foco
    };
    if (deviceId) video.deviceId = { exact: deviceId };
    else video.facingMode = { ideal: "environment" };

    // Atraso curto: no React StrictMode (npm start) o efeito monta, desmonta e monta
    // de novo. Sem isso, o stop() tardio da 1ª montagem apaga o vídeo da 2ª
    // (tela preta e nenhuma leitura).
    const timer = setTimeout(() => {
      reader
        .decodeFromConstraints({ video }, videoRef.current, (result) => {
          attemptsRef.current += 1; // chamado a cada varredura (com ou sem código)
          if (result) emit(result.getText(), "zxing");
        })
        .then((controls) => {
          if (cancelled) controls.stop();
          else controlsRef.current = controls;
          setError("");
        })
        .catch((err) => {
          if (err && err.name === "NotAllowedError") {
            setError("Permissão da câmera negada. Libere o acesso no navegador.");
          } else if (err && err.name === "NotFoundError") {
            setError("Nenhuma câmera encontrada.");
          } else if (err && err.name === "NotReadableError") {
            setError("A câmera está em uso por outro app ou aba. Feche e tente de novo.");
          } else {
            setError(`Erro ao abrir a câmera${err && err.name ? ` (${err.name})` : ""}.`);
          }
        });
    }, 250);

    // Diagnóstico: resolução real do vídeo e número de varreduras.
    const diag = setInterval(() => {
      const v = videoRef.current;
      const res = v && v.videoWidth ? `${v.videoWidth}x${v.videoHeight}` : "-";
      setInfo({ res, attempts: attemptsRef.current });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(diag);
      cancelled = true;
      if (controlsRef.current) controlsRef.current.stop(); // libera a webcam
      controlsRef.current = null;
    };
  }, [active, deviceId, emit]);

  // Leitor 2: detector NATIVO do navegador, em paralelo ao ZXing.
  // Usa o reconhecimento do sistema, bem mais tolerante a desfoque.
  // Só roda onde o navegador oferece BarcodeDetector.
  useEffect(() => {
    if (!active) return undefined;
    if (typeof window === "undefined" || !("BarcodeDetector" in window)) {
      setNative("indisponível");
      return undefined;
    }
    let stopped = false;
    let timer;
    let detector;

    (async () => {
      try {
        const supported = await window.BarcodeDetector.getSupportedFormats();
        const formats = NATIVE_FORMATS.filter((f) => supported.includes(f));
        if (!formats.length) {
          setNative("indisponível");
          return;
        }
        detector = new window.BarcodeDetector({ formats });
        setNative("ativo");
      } catch (e) {
        setNative("indisponível");
        return;
      }

      const loop = async () => {
        if (stopped) return;
        const v = videoRef.current;
        if (v && v.readyState >= 2) {
          try {
            const codes = await detector.detect(v);
            if (codes.length && codes[0].rawValue) emit(codes[0].rawValue, "nativo");
          } catch (e) {
            /* quadro inválido: tenta no próximo */
          }
        }
        timer = setTimeout(loop, 150);
      };
      loop();
    })();

    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [active, emit]);

  return (
    <div style={{ maxWidth: 480 }}>
      <video
        ref={videoRef}
        muted
        playsInline
        style={{ width: "100%", borderRadius: 8, background: "#000" }}
      />
      <p style={{ fontSize: 12, opacity: 0.7, margin: "4px 0" }}>
        Resolução: {info.res} · Varreduras: {info.attempts} · Detector nativo: {native}
      </p>
      <p style={{ fontSize: 12, opacity: 0.7, margin: "4px 0" }}>
        Último código lido: {lastRaw || "nenhum"}
      </p>
      {devices.length > 1 && (
        <select
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          style={{ marginTop: 8, width: "100%" }}
        >
          <option value="">Câmera padrão</option>
          {devices.map((d, i) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label || `Câmera ${i + 1}`}
            </option>
          ))}
        </select>
      )}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <p style={{ fontSize: 12, opacity: 0.7 }}>
        Dica: segure o código a 20–40 cm, bem iluminado, reto e sem reflexo. Webcam de
        laptop tem foco fixo: se ficar borrado, afaste um pouco.
      </p>
    </div>
  );
}

export default BarcodeScanner;
