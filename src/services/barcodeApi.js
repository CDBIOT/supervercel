import Axios from "axios";

// Mesmo backend já usado no resto do projeto.
// Pode ser sobrescrito com REACT_APP_API_URL no .env / Vercel.
const API_URL = (
  process.env.REACT_APP_API_URL || "https://super-server-nu.vercel.app"
).replace(/\/$/, "");

// Consulta um produto pelo código de barras (somente leitura).
export async function fetchProductByBarcode(code) {
  try {
    const { data } = await Axios.get(
      `${API_URL}/products/barcode/${encodeURIComponent(code)}`
    );
    return data;
  } catch (error) {
    const err = new Error("Falha ao consultar o produto");
    err.code = "API_ERROR";
    if (error.response?.status === 404) {
      err.message = "Produto não cadastrado";
      err.code = "NOT_FOUND";
    } else if (error.response?.status === 400) {
      err.message = "Código de barras inválido";
      err.code = "INVALID";
    }
    throw err;
  }
}
