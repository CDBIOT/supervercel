import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  abrirCaixa,
  fecharCaixa,
  fetchCaixaAberto,
  mensagemDeErro,
} from "../../services/api";

const brl = (v) =>
  Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const dataBr = (v) => (v ? new Date(v).toLocaleString("pt-BR") : "-");

// Abertura e fechamento do caixa. Nada é enviado ao abrir a página:
// só a consulta do caixa aberto. Abrir e fechar dependem de clique do operador.
function Caixa() {
  const [caixa, setCaixa] = useState(undefined); // undefined = carregando, null = nenhum aberto
  const [usuarioId, setUsuarioId] = useState("");
  const [valorInicial, setValorInicial] = useState("");
  const [resumo, setResumo] = useState(null); // resultado do último fechamento
  const [msg, setMsg] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const carregar = useCallback(async () => {
    try {
      setCaixa(await fetchCaixaAberto());
    } catch (error) {
      setCaixa(null);
      setMsg({ type: "error", text: "Não foi possível consultar o caixa." });
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function handleAbrir(e) {
    e.preventDefault();
    setEnviando(true);
    setMsg(null);
    try {
      await abrirCaixa(usuarioId, valorInicial);
      setResumo(null);
      setUsuarioId("");
      setValorInicial("");
      setMsg({ type: "ok", text: "Caixa aberto." });
      await carregar();
    } catch (error) {
      setMsg({ type: "error", text: mensagemDeErro(error, "Erro ao abrir o caixa.") });
    } finally {
      setEnviando(false);
    }
  }

  async function handleFechar() {
    if (!window.confirm("Fechar o caixa? Depois disso não será possível vender até abrir outro.")) {
      return;
    }
    setEnviando(true);
    setMsg(null);
    try {
      const fechado = await fecharCaixa();
      setResumo(fechado);
      setCaixa(null);
      setMsg({ type: "ok", text: "Caixa fechado." });
    } catch (error) {
      setMsg({ type: "error", text: mensagemDeErro(error, "Erro ao fechar o caixa.") });
    } finally {
      setEnviando(false);
    }
  }

  const colors = { ok: "green", error: "crimson" };

  return (
    <div style={{ padding: 16, textAlign: "left", maxWidth: 560 }}>
      <h1>Caixa</h1>

      {msg && (
        <p role="status" style={{ color: colors[msg.type] }}>
          {msg.text}
        </p>
      )}

      {caixa === undefined && <p>Carregando...</p>}

      {caixa && (
        <div>
          <h3>Caixa aberto</h3>
          <p>
            <strong>Caixa:</strong> #{caixa.caixa_id}
          </p>
          <p>
            <strong>Usuário:</strong> {caixa.usuario_id}
          </p>
          <p>
            <strong>Valor inicial:</strong> {brl(caixa.valor_inicial)}
          </p>
          <p>
            <strong>Aberto em:</strong> {dataBr(caixa.data_abertura)}
          </p>
          <p>
            <Link to="/caixa-scanner">Ir para o leitor de vendas</Link>
          </p>
          <button onClick={handleFechar} disabled={enviando}>
            Fechar caixa
          </button>
        </div>
      )}

      {caixa === null && (
        <form onSubmit={handleAbrir}>
          <h3>Abrir caixa</h3>
          <div>
            <label htmlFor="usuario_id">Usuário (id) </label>
            <input
              type="text"
              id="usuario_id"
              value={usuarioId}
              placeholder="ID do usuário"
              onChange={(e) => setUsuarioId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="valor_inicial">Valor inicial (R$) </label>
            <input
              type="number"
              step="0.01"
              min="0"
              id="valor_inicial"
              value={valorInicial}
              placeholder="0,00"
              onChange={(e) => setValorInicial(e.target.value)}
            />
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="submit" disabled={enviando}>
              Abrir caixa
            </button>
          </div>
        </form>
      )}

      {resumo && (
        <div style={{ marginTop: 16 }}>
          <h3>Resumo do fechamento</h3>
          <p>
            <strong>Vendas:</strong> {resumo.qtd_vendas}
          </p>
          <p>
            <strong>Total vendido:</strong> {brl(resumo.total_vendas)}
          </p>
          <p>
            <strong>Valor inicial:</strong> {brl(resumo.valor_inicial)}
          </p>
          <p>
            <strong>Valor final (inicial + vendas):</strong> {brl(resumo.valor_final)}
          </p>
        </div>
      )}
    </div>
  );
}

export default Caixa;
