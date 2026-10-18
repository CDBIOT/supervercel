import Axios from "axios";

// Mesmo backend já usado no resto do projeto.
// Pode ser sobrescrito com REACT_APP_API_URL no .env / Vercel.
const API_URL = (
  process.env.REACT_APP_API_URL || "https://super-server-nu.vercel.app"
).replace(/\/$/, "");

// A API devolve erros de regra em português ({ error: "..." }): mostra essa
// mensagem ao operador; se não houver, usa o texto padrão.
export function mensagemDeErro(error, padrao) {
  const data = error && error.response && error.response.data;
  return (data && (data.error || data.message)) || padrao;
}

// ----- Caixa -----

// Retorna o caixa aberto ou null se não houver nenhum.
export async function fetchCaixaAberto() {
  try {
    const { data } = await Axios.get(`${API_URL}/caixa/aberto`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) return null;
    throw error;
  }
}

export async function abrirCaixa(usuario_id, valor_inicial) {
  const { data } = await Axios.post(`${API_URL}/caixa/abrir`, {
    usuario_id,
    valor_inicial,
  });
  return data.caixa;
}

// Fecha o caixa aberto e devolve o resumo (total_vendas, qtd_vendas, valor_final).
export async function fecharCaixa() {
  const { data } = await Axios.post(`${API_URL}/caixa/fechar`, {});
  return data;
}

// ----- Vendas -----

// items: [{ id, quantidade }]. Preço e estoque são conferidos no servidor.
export async function registrarVenda(items, forma_pagamento) {
  const { data } = await Axios.post(`${API_URL}/sales`, {
    items,
    forma_pagamento,
  });
  return data;
}

export async function listarVendas() {
  const { data } = await Axios.get(`${API_URL}/sales`);
  return Array.isArray(data) ? data : [];
}

// ----- Produtos -----

export async function listarProdutos() {
  const { data } = await Axios.get(`${API_URL}/products`);
  return Array.isArray(data) ? data : [];
}

export async function cadastrarProduto(dados) {
  const { data } = await Axios.post(`${API_URL}/products`, dados);
  return data;
}

// Atualização parcial: envia só os campos que mudaram (ex.: só o barcode).
export async function atualizarProduto(id, dados) {
  const { data } = await Axios.put(`${API_URL}/products/${id}`, dados);
  return data;
}
