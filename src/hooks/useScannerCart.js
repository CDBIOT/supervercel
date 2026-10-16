import { useCallback, useMemo, useState } from "react";

// Carrinho 100% local (estado React). Não grava nada no banco.
// Totais calculados em centavos para evitar erro de ponto flutuante.
const toCents = (v) => Math.round(Number(v) * 100);

export function useScannerCart() {
  const [items, setItems] = useState([]);

  // Adiciona 1 unidade; respeita o estoque (qtd) do produto.
  const addProduct = useCallback((product) => {
    const stock = Number(product.qtd);
    const existing = items.find((i) => i.id === product.id);
    const currentQty = existing ? existing.qty : 0;

    if (currentQty + 1 > stock) {
      return { ok: false, reason: "SEM_ESTOQUE" };
    }

    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          product: product.product,
          marca: product.marca,
          price: Number(product.price),
          stock,
          barcode: product.barcode,
          qty: 1,
        },
      ];
    });
    return { ok: true };
  }, [items]);

  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id
            ? { ...i, qty: Math.max(0, Math.min(Number(qty) || 0, i.stock)) }
            : i
        )
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback(
    (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const totalCents = useMemo(
    () => items.reduce((sum, i) => sum + toCents(i.price) * i.qty, 0),
    [items]
  );

  return {
    items,
    addProduct,
    setQty,
    removeItem,
    clear,
    total: totalCents / 100,
    count: items.reduce((n, i) => n + i.qty, 0),
  };
}
