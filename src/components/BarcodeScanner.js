import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";

const DUPLICATE_WINDOW_MS = 1800; // evita ler o mesmo produto várias vezes seguidas

function BarcodeScanner({ onDetected, active = true }) {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const lastRef = useRef({ code: "", at: 0 });
  const onDetectedRef = useRef(onDetected);
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    onDetectedRef.current = onDetected;
  }, [onDetected]);

  // Lista as câmeras disponíveis (webcam do laptop, USB etc.)
  useEffect(() => {
    BrowserMultiFormatReader.listVideoInputDevices()
      .then((list) => setDevices(list))
      .catch(() => setError("Não foi possível listar as câmeras."));
  }, []);

  useEffect(() => {
    if (!active) return undefined;

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.CODE_128,
    ]);
    const reader = new BrowserMultiFormatReader(hints);
    let cancelled = false;

    // Atraso curto: no React StrictMode (npm start) o efeito monta, desmonta e monta
    // de novo. Sem isso, o stop() tardio da 1ª montagem apaga o vídeo da 2ª
    // (tela preta e nenhuma leitura).
    const timer = setTimeout(() => {
    reader
      .decodeFromVideoDevice(deviceId || undefined, videoRef.current, (result) => {
        if (!result) return; // frame sem código: normal
        const code = result.getText();
        const now = Date.now();
        const last = lastRef.current;
        if (code === last.code && now - last.at < DUPLICATE_WINDOW_MS) return;
        lastRef.current = { code, at: now };
        if (onDetectedRef.current) onDetectedRef.current(code);
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
        } else {
          setError("Erro ao abrir a câmera.");
        }
      });
    }, 250);

    return () => {
      clearTimeout(timer);
      cancelled = true;
      if (controlsRef.current) controlsRef.current.stop(); // libera a webcam
      controlsRef.current = null;
    };
  }, [active, deviceId]);

  return (
    <div style={{ maxWidth: 480 }}>
      <video
        ref={videoRef}
        muted
        playsInline
        style={{ width: "100%", borderRadius: 8, background: "#000" }}
      />
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
    </div>
  );
}

export default BarcodeScanner;
