import React, { useCallback, useEffect, useState } from "react";
import {
  atualizarProduto,
  cadastrarProduto,
  listarProdutos,
  mensagemDeErro,
} from "../../services/api";

const brl = (v) =>
  Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const VAZIO = { product: "", marca: "", qtd: "", price: "", barcode: "" };

// Cadastro de produtos. Nada é enviado ao abrir a página: só ao clicar em
// "Cadastrar produto" (novo) ou "Salvar" (código de barras de um produto existente).
function Cad_Prods() {
  const [form, setForm] = useState(VAZIO);
  const [produtos, setProdutos] = useState([]);
  const [codigos, setCodigos] = useState({}); // id -> código digitado na tabela
  const [msg, setMsg] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const carregar = useCallback(async () => {
    try {
      setProdutos(await listarProdutos());
    } catch (error) {
      setMsg({ type: "error", text: mensagemDeErro(error, "Não foi possível listar os produtos.") });
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const mudar = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  async function cadastrar(e) {
    e.preventDefault();
    setEnviando(true);
    setMsg(null);
    try {
      const novo = await cadastrarProduto({
        product: form.product,
        marca: form.marca,
        qtd: form.qtd,
        price: form.price,
        barcode: form.barcode,
      });
      setMsg({ type: "ok", text: `Produto "${novo.product}" cadastrado (id ${novo.id}).` });
      setForm(VAZIO);
      await carregar();
    } catch (error) {
      setMsg({ type: "error", text: mensagemDeErro(error, "Erro ao cadastrar o produto.") });
    } finally {
      setEnviando(false);
    }
  }

  async function salvarCodigo(p) {
    setEnviando(true);
    setMsg(null);
    try {
      await atualizarProduto(p.id, { barcode: codigos[p.id] });
      setMsg({ type: "ok", text: `Código de "${p.product}" salvo.` });
      setCodigos((c) => {
        const { [p.id]: _descartado, ...resto } = c;
        return resto;
      });
      await carregar();
    } catch (error) {
      setMsg({ type: "error", text: mensagemDeErro(error, "Erro ao salvar o código de barras.") });
    } finally {
      setEnviando(false);
    }
  }

  const colors = { ok: "green", error: "crimson" };

  return (
    <div style={{ padding: 16, textAlign: "left" }}>
      <h1>Cadastro de Produtos</h1>

      <form onSubmit={cadastrar} style={{ maxWidth: 420 }}>
        <div>
          <label htmlFor="product">Produto </label>
          <input id="product" type="text" value={form.product} placeholder="Nome do produto" onChange={mudar("product")} required />
        </div>
        <div>
          <label htmlFor="marca">Marca </label>
          <input id="marca" type="text" value={form.marca} placeholder="Marca" onChange={mudar("marca")} />
        </div>
        <div>
          <label htmlFor="qtd">Quantidade em estoque </label>
          <input id="qtd" type="number" min="0" step="1" value={form.qtd} placeholder="0" onChange={mudar("qtd")} required />
        </div>
        <div>
          <label htmlFor="price">Preço (R$) </label>
          <input id="price" type="number" min="0" step="0.01" value={form.price} placeholder="0,00" onChange={mudar("price")} required />
        </div>
        <div>
          <label htmlFor="barcode">Código de barras (opcional) </label>
          <input id="barcode" type="text" inputMode="numeric" value={form.barcode} placeholder="8 a 14 dígitos" onChange={mudar("barcode")} />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={enviando}>
            Cadastrar produto
          </button>
        </div>
      </form>

      {msg && (
        <p role="status" style={{ color: colors[msg.type] }}>
          {msg.text}
        </p>
      )}

      <h2>Produtos cadastrados</h2>
      {produtos.length === 0 ? (
        <p>Nenhum produto.</p>
      ) : (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th align="left">Id</th>
              <th align="left">Produto</th>
              <th align="left">Marca</th>
              <th align="right">Qtd</th>
              <th align="right">Preço</th>
              <th align="left">Código de barras</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => {
              const digitado = codigos[p.id];
              const valor = digitado !== undefined ? digitado : p.barcode || "";
              const mudou = digitado !== undefined && digitado !== (p.barcode || "");
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.product}</td>
                  <td>{p.marca}</td>
                  <td align="right">{p.qtd}</td>
                  <td align="right">{brl(p.price)}</td>
                  <td>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={valor}
                      placeholder="sem código"
                      onChange={(e) => setCodigos((c) => ({ ...c, [p.id]: e.target.value }))}
                      style={{ width: 150 }}
                    />{" "}
                    <button onClick={() => salvarCodigo(p)} disabled={!mudou || enviando}>
                      Salvar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cad_Prods;
