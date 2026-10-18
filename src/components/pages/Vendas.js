import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarVendas, mensagemDeErro } from "../../services/api";

const brl = (v) =>
  Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const FORMAS = {
  dinheiro: "Dinheiro",
  cartao_debito: "Cartão de débito",
  cartao_credito: "Cartão de crédito",
  pix: "Pix",
};

// A coluna "itens" pode vir como objeto (jsonb) ou como texto JSON; vendas antigas podem não ter.
function lerItens(itens) {
  if (Array.isArray(itens)) return itens;
  if (typeof itens === "string") {
    try {
      const lido = JSON.parse(itens);
      return Array.isArray(lido) ? lido : [];
    } catch (e) {
      return [];
    }
  }
  return [];
}

// Histórico de vendas. As vendas novas são feitas no leitor (/caixa-scanner),
// que envia ao servidor só os ids e quantidades; o servidor confere preço e estoque.
// Esta página apenas lê (GET /sales): não grava nada ao abrir.
function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregar() {
    setCarregando(true);
    setErro("");
    try {
      setVendas(await listarVendas());
    } catch (error) {
      setErro(mensagemDeErro(error, "Não foi possível carregar as vendas."));
      setVendas([]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  const totalGeral = vendas.reduce((soma, v) => soma + Number(v.total || 0), 0);

  return (
    <div style={{ padding: 16, textAlign: "left" }}>
      <h1>Vendas</h1>
      <p>
        <Link to="/caixa-scanner">Nova venda (leitor de código de barras)</Link>{" "}
        · <button onClick={carregar}>Atualizar</button>
      </p>

      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: "crimson" }}>{erro}</p>}
      {!carregando && !erro && vendas.length === 0 && <p>Nenhuma venda registrada.</p>}

      {vendas.length > 0 && (
        <>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th align="left">Venda</th>
                <th align="left">Data</th>
                <th align="left">Caixa</th>
                <th align="left">Pagamento</th>
                <th align="left">Itens</th>
                <th align="right">Total</th>
              </tr>
            </thead>
            <tbody>
              {vendas.map((v) => (
                <tr key={v.vendas_id}>
                  <td>#{v.vendas_id}</td>
                  <td>{v.criado_em ? new Date(v.criado_em).toLocaleString("pt-BR") : "-"}</td>
                  <td>{v.caixa_id ?? "-"}</td>
                  <td>{FORMAS[v.forma_pagamento] || "-"}</td>
                  <td>
                    {lerItens(v.itens)
                      .map((i) => `${i.quantidade}× ${i.product}`)
                      .join(", ") || "-"}
                  </td>
                  <td align="right">{brl(v.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>
            Total geral ({vendas.length} vendas): {brl(totalGeral)}
          </h3>
        </>
      )}
    </div>
  );
}

export default Vendas;
