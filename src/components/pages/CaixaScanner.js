import React, { useState } from "react";
import BarcodeScanner from "../BarcodeScanner";
import { fetchProductByBarcode } from "../../services/barcodeApi";
import { useScannerCart } from "../../hooks/useScannerCart";

const brl = (v) =>
  Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Página NOVA e independente (rota /caixa-scanner).
// Lê o código pela câmera, consulta o produto e monta um carrinho local.
// Modo teste: não existe pagamento e nenhuma rota de escrita é chamada
// (não usa /sales, /caixa/abrir nem /caixa/fechar).
function CaixaScanner() {
  const cart = useScannerCart();
  const [scanning, setScanning] = useState(true);
  const [manual, setManual] = useState("");
  const [status, setStatus] = useState({
    type: "info",
    text: "Aponte o código de barras para a câmera.",
  });

  async function handleCode(code) {
    setStatus({ type: "info", text: `Lido: ${code}. Consultando...` });
    try {
      const product = await fetchProductByBarcode(code);
      const res = cart.addProduct(product);
      setStatus(
        res.ok
          ? { type: "ok", text: `Adicionado: ${product.product} (${product.marca})` }
          : { type: "warn", text: `Sem estoque suficiente de ${product.product}.` }
      );
    } catch (err) {
      setStatus({
        type: "error",
        text:
          err.code === "NOT_FOUND"
            ? `Código ${code} não está cadastrado.`
            : err.message || "Erro ao consultar a API.",
      });
    }
  }

  const colors = { info: "#444", ok: "green", warn: "#b36b00", error: "crimson" };

  return (
    <div
      style={{
        padding: 16,
        display: "grid",
        gap: 24,
        gridTemplateColumns: "minmax(280px, 480px) 1fr",
        textAlign: "left",
      }}
    >
      <section>
        <h2>Leitor de código de barras</h2>
        <BarcodeScanner active={scanning} onDetected={handleCode} />
        <button onClick={() => setScanning((s) => !s)} style={{ marginTop: 8 }}>
          {scanning ? "Pausar câmera" : "Retomar câmera"}
        </button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (manual.trim()) handleCode(manual.trim());
            setManual("");
          }}
          style={{ marginTop: 12 }}
        >
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="Digitar código (simula leitura)"
            inputMode="numeric"
          />
          <button type="submit">Simular</button>
        </form>

        <p role="status" style={{ color: colors[status.type] }}>
          {status.text}
        </p>
      </section>

      <section>
        <h2>Carrinho ({cart.count})</h2>
        {cart.items.length === 0 ? (
          <p>Nenhum item.</p>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th align="left">Produto</th>
                <th>Qtd</th>
                <th align="right">Unit.</th>
                <th align="right">Subtotal</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cart.items.map((i) => (
                <tr key={i.id}>
                  <td>
                    {i.product} <small>{i.marca}</small>
                  </td>
                  <td align="center">
                    <input
                      type="number"
                      min={0}
                      max={i.stock}
                      value={i.qty}
                      onChange={(e) => cart.setQty(i.id, e.target.value)}
                      style={{ width: 56 }}
                    />
                  </td>
                  <td align="right">{brl(i.price)}</td>
                  <td align="right">{brl(i.price * i.qty)}</td>
                  <td>
                    <button onClick={() => cart.removeItem(i.id)}>×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h3>Total: {brl(cart.total)}</h3>
        <button onClick={cart.clear} disabled={!cart.items.length}>
          Limpar carrinho
        </button>
        <p style={{ opacity: 0.6, fontSize: 12 }}>
          Modo teste: nenhum pagamento é processado e nenhuma venda é gravada.
        </p>
      </section>
    </div>
  );
}

export default CaixaScanner;
