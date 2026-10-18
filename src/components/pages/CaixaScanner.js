import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BarcodeScanner from "../BarcodeScanner";
import { fetchProductByBarcode } from "../../services/barcodeApi";
import { fetchCaixaAberto, mensagemDeErro, registrarVenda } from "../../services/api";
import { useScannerCart } from "../../hooks/useScannerCart";

const brl = (v) =>
  Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const FORMAS = [
  { valor: "dinheiro", rotulo: "Dinheiro" },
  { valor: "cartao_debito", rotulo: "Cartão de débito" },
  { valor: "cartao_credito", rotulo: "Cartão de crédito" },
  { valor: "pix", rotulo: "Pix" },
];

// Tela de venda (rota /caixa-scanner).
// Lê o código (câmera, leitor USB ou digitado), monta o carrinho e finaliza a venda.
// O servidor recebe só { id, quantidade } de cada item e confere preço e estoque;
// a forma de pagamento é apenas registrada (nenhum pagamento é processado aqui).
function CaixaScanner() {
  const cart = useScannerCart();
  const [scanning, setScanning] = useState(true);
  const [manual, setManual] = useState("");
  const [forma, setForma] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [caixa, setCaixa] = useState(undefined); // undefined = carregando, null = nenhum aberto
  const [ultimaVenda, setUltimaVenda] = useState(null);
  const [status, setStatus] = useState({
    type: "info",
    text: "Aponte o código de barras para a câmera.",
  });

  useEffect(() => {
    let ativo = true;
    fetchCaixaAberto()
      .then((c) => ativo && setCaixa(c))
      .catch(() => ativo && setCaixa(null));
    return () => {
      ativo = false;
    };
  }, []);

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

  async function finalizar() {
    if (enviando || cart.items.length === 0 || !forma) return;
    setEnviando(true);
    setStatus({ type: "info", text: "Registrando a venda..." });
    try {
      const venda = await registrarVenda(
        cart.items.map((i) => ({ id: i.id, quantidade: i.qty })),
        forma
      );
      setUltimaVenda(venda);
      cart.clear();
      setForma("");
      setStatus({ type: "ok", text: `Venda #${venda.vendas_id} registrada.` });
    } catch (error) {
      // Mantém o carrinho: o operador pode corrigir (ex.: tirar o item sem estoque)
      setStatus({
        type: "error",
        text: mensagemDeErro(error, "Não foi possível registrar a venda."),
      });
      if (error.response && error.response.status === 409) {
        fetchCaixaAberto().then(setCaixa).catch(() => {});
      }
    } finally {
      setEnviando(false);
    }
  }

  const colors = { info: "#444", ok: "green", warn: "#b36b00", error: "crimson" };
  const semCaixa = caixa === null;
  const podeFinalizar =
    !enviando && cart.items.length > 0 && forma !== "" && caixa !== null && caixa !== undefined;

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
            placeholder="Digitar código ou usar leitor USB"
            inputMode="numeric"
          />
          <button type="submit">Adicionar</button>
        </form>

        <p role="status" style={{ color: colors[status.type] }}>
          {status.text}
        </p>
      </section>

      <section>
        <h2>Carrinho ({cart.count})</h2>

        {semCaixa && (
          <p style={{ color: "crimson" }}>
            Nenhum caixa aberto. <Link to="/caixa">Abra o caixa</Link> para poder vender.
          </p>
        )}
        {caixa && <p style={{ opacity: 0.7 }}>Caixa #{caixa.caixa_id} aberto.</p>}

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

        <div>
          <label htmlFor="forma">Forma de pagamento </label>
          <select id="forma" value={forma} onChange={(e) => setForma(e.target.value)}>
            <option value="">Selecione...</option>
            {FORMAS.map((f) => (
              <option key={f.valor} value={f.valor}>
                {f.rotulo}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 8 }}>
          <button onClick={finalizar} disabled={!podeFinalizar}>
            {enviando ? "Registrando..." : "Finalizar venda"}
          </button>{" "}
          <button onClick={cart.clear} disabled={!cart.items.length || enviando}>
            Limpar carrinho
          </button>
        </div>

        {ultimaVenda && (
          <p style={{ marginTop: 12 }}>
            Última venda: <strong>#{ultimaVenda.vendas_id}</strong> · {brl(ultimaVenda.total)} ·{" "}
            <Link to="/vendas">ver histórico</Link>
          </p>
        )}
        <p style={{ opacity: 0.6, fontSize: 12 }}>
          Esta tela registra vendas reais e dá baixa no estoque. A forma de pagamento é só um
          registro: nenhum pagamento é processado pelo sistema.
        </p>
      </section>
    </div>
  );
}

export default CaixaScanner;
