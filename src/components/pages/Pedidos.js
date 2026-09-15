
import React, { useEffect, useState } from "react";
import Axios from "axios";

function Pedidos() {
    // ==============================
    // CARDÁPIO
    // ==============================
    const [cardapio, setCardapio] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [loading, setLoading] = useState(true);

    // ==============================
    // CARRINHO
    // ==============================
    const [carrinho, setCarrinho] = useState([]);
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);

    // ==============================
    // CHECKOUT
    // ==============================
    const [checkoutAberto, setCheckoutAberto] = useState(false);

    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [tipoPedido, setTipoPedido] = useState("retirada");
    const [endereco, setEndereco] = useState("");
    const [pagamento, setPagamento] = useState("dinheiro");
    const [observacoes, setObservacoes] = useState("");

    // ==============================
    // CONFIRMAÇÃO
    // ==============================
    const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
    const [pedidoId, setPedidoId] = useState(null);

    // ==============================
    // BUSCAR CARDÁPIO
    // ==============================
    async function buscarCardapio() {
        try {
            setLoading(true);
            const response = await Axios.get(
                "https://super-server-nu.vercel.app/cardapio"
            );

            console.log("Cardápio recebido:");
            console.log(response.data);

            const dados = Array.isArray(response.data)
                ? response.data
                : [];
            setCardapio(dados);

            // Seleciona a primeira categoria
            if (dados.length > 0) {
                setCategoriaSelecionada(dados[0].categoria);
            }
        } catch (error) {
            console.error(
                "Erro ao buscar cardápio:",
                error.response?.data || error
            );
            setCardapio([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        buscarCardapio();
    }, []);

    // ==============================
    // CATEGORIAS
    // ==============================
    const categorias = [
        ...new Set(
            cardapio.map(item => item.categoria)
        )
    ];

    // ==============================
    // PRODUTOS DA CATEGORIA
    // ==============================
    const produtosCategoria = cardapio.filter(
        item => item.categoria === categoriaSelecionada
    );

    // ==============================
    // ADICIONAR AO CARRINHO
    // ==============================
    function adicionarCarrinho(produto) {
        setCarrinho(carrinhoAtual => {
            const itemExistente = carrinhoAtual.find(
                item => item.id === produto.id
            );
            if (itemExistente) {
                return carrinhoAtual.map(item =>

                    item.id === produto.id
                        ? {
                            ...item,
                            quantidade: item.quantidade + 1
                        }
                        : item
                );
            }
            return [
                ...carrinhoAtual,
                {
                    ...produto,
                    quantidade: 1
                }
            ];
        });
    }
    // ==============================
    // AUMENTAR QUANTIDADE
    // ==============================
    function aumentarQuantidade(id) {
        setCarrinho(
            carrinho.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantidade: item.quantidade + 1
                    }
                    : item
            )
        );
    }

    // ==============================
    // DIMINUIR QUANTIDADE
    // ==============================
    function diminuirQuantidade(id) {
        setCarrinho(
            carrinho
                .map(item =>
                    item.id === id
                        ? {
                            ...item,
                            quantidade: item.quantidade - 1
                        }
                        : item
                )
                .filter(item => item.quantidade > 0)
        );
    }

    // ==============================
    // REMOVER ITEM
    // ==============================
    function removerItem(id) {
        setCarrinho(
            carrinho.filter(item => item.id !== id)
        );
    }

    // ==============================
    // QUANTIDADE TOTAL
    // ==============================
    const quantidadeTotal = carrinho.reduce(
        (total, item) =>
            total + item.quantidade,
        0
    );

    // ==============================
    // TOTAL DO PEDIDO
    // ==============================
    const totalPedido = carrinho.reduce(
        (total, item) =>
            total +
            Number(item.preco) *
            item.quantidade,
        0
    );
    // ==============================
    // FORMATAR MOEDA
    // ==============================
    function moeda(valor) {
        return Number(valor).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }

    // ==============================
    // FINALIZAR CARRINHO
    // ==============================
    function abrirCheckout() {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio.");
            return;
        }
        setCarrinhoAberto(false);
        setCheckoutAberto(true);
    }

    // ==============================
    // ENVIAR PEDIDO
    // ==============================
    async function enviarPedido(e) {

        e.preventDefault();

        if (carrinho.length === 0) {

            return;
        }

        const pedido = {
            nome,
            telefone,
            tipo_pedido: tipoPedido,
            endereco:
                tipoPedido === "entrega"
                    ? endereco
                    : null,

            pagamento,
            observacoes,

            total: totalPedido,

            itens: carrinho.map(item => ({

                cardapio_id: item.id,
                nome: item.nome,
                preco: Number(item.preco),
                quantidade: item.quantidade,
                subtotal:
                    Number(item.preco) *
                    item.quantidade
            }))
        };

        console.log("Pedido que será enviado:");
        console.log(pedido);

        try {
            const response = await Axios.post(
                "https://super-server-nu.vercel.app/pedidos",
                pedido
            );
            console.log("Pedido criado:");
            console.log(response.data);
            // Tenta obter o ID retornado
            setPedidoId(
                response.data.pedido_id ||
                response.data.id ||
                null
            );

            setCheckoutAberto(false);
            setPedidoConfirmado(true);

            // Limpa o carrinho
            setCarrinho([]);

        } catch (error) {
            console.error(
                "Erro ao enviar pedido:",
                error.response?.data || error
            );
            alert(
                "Erro ao enviar o pedido."
            );
        }
    }
    // ==============================
    // NOVO PEDIDO
    // ==============================
    function novoPedido() {
        setPedidoConfirmado(false);

        setNome("");
        setTelefone("");
        setTipoPedido("retirada");
        setEndereco("");
        setPagamento("dinheiro");
        setObservacoes("");
        setPedidoId(null);
    }
    // ==============================
    // LOADING
    // ==============================
    if (loading) {
        return (
            <div className="pedidos-loading">
                <h2>
                    Carregando cardápio...
                </h2>
            </div>
        );
    }

    return (
        <div className="pedidos-page">
            {/* ===================================
                TOPO
            =================================== */}
            <header className="topbar">
                <div className="brand">
                    <span className="brand-emoji">
                        🍽️
                    </span>
                    <div>
                        <h1>
                            SUCRIS SERVICES
                        </h1>
                        <p>
                            Peça pelo site, sem complicação
                        </p>
                    </div>
                </div>
            </header>

            {/* ===================================
                CATEGORIAS
            =================================== */}
            <nav
                className="cat-nav"
                aria-label="Categorias do cardápio"
            >
                {categorias.map(categoria => (
                    <button
                        key={categoria}
                        className={
                            categoria ===
                            categoriaSelecionada
                                ? "categoria ativa"
                                : "categoria"
                        }
                        onClick={() =>
                            setCategoriaSelecionada(
                                categoria
                            )
                        }
                    >
                        {categoria}
                    </button>
                ))}
            </nav>
            {/* ===================================
                CARDÁPIO
            =================================== */}
            <main className="menu">
                <h2>
                    {categoriaSelecionada}
                </h2>
                <div className="menu-grid">
                    {produtosCategoria.map(produto => (
                        <div
                            className="menu-card"
                            key={produto.id}
                        >
                            <div className="produto-emoji">

                                {produto.emoji || "🍽️"}
                            </div>
                            <div className="produto-info">
                                <h3>
                                    {produto.nome}
                                </h3>
                                <p>
                                    {produto.descricao}
                                </p>
                                <strong>
                                    {moeda(produto.preco)}
                                </strong>
                            </div>
                            <button
                                className="btn-primary"
                                onClick={() =>
                                    adicionarCarrinho(
                                        produto
                                    )
                                }
                            >
                                Adicionar
                            </button>
                        </div>
                    ))}
                </div>
            </main>
           {/* ===================================
                BOTÃO CARRINHO
            =================================== */}
            <button
                className="cart-fab"
                onClick={() =>
                    setCarrinhoAberto(true)
                }
                aria-label="Abrir carrinho"
            >
                <span className="cart-fab-icon">
                    🛒
                </span>
                <span className="cart-fab-count">
                    {quantidadeTotal}
                </span>
                <span className="cart-fab-total">
                    {moeda(totalPedido)}
                </span>
            </button>
            {/* ===================================
                OVERLAY CARRINHO
            =================================== */}
            {carrinhoAberto && (
                <div
                    className="drawer-overlay"
                    onClick={() =>
                        setCarrinhoAberto(false)
                    }
                />
            )}
            {/* ===================================
                CARRINHO
            =================================== */}
            {carrinhoAberto && (
                <aside className="cart-drawer">
                    <div className="drawer-header">
                        <h2>
                            Seu pedido
                        </h2>
                        <button
                            className="icon-btn"
                            onClick={() =>
                                setCarrinhoAberto(false)
                            }
                        >

                            ✕
                        </button>
                    </div>
                    <div className="cart-items">
                        {carrinho.length === 0 ? (
                            <p>
                                Seu carrinho está vazio.
                            </p>
                        ) : (
                            carrinho.map(item => (
                                <div
                                    className="cart-item"
                                    key={item.id}
                                >
                                    <div>
                                        <strong>
                                            {item.nome}
                                        </strong>
                                        <p>
                                            {moeda(item.preco)}
                                        </p>
                                    </div>
                                    <div className="quantity">
                                        <button
                                            onClick={() =>
                                                diminuirQuantidade(
                                                    item.id
                                                )
                                            }
                                        >
                                            -
                                        </button>

                                        <span>
                                            {item.quantidade}
                                        </span>

                                        <button
                                            onClick={() =>
                                                aumentarQuantidade(
                                                    item.id
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <strong>

                                        {moeda(
                                            Number(item.preco) *
                                            item.quantidade
                                        )}
                                    </strong>
                                    <button
                                        className="remove-btn"

                                        onClick={() =>
                                            removerItem(
                                                item.id
                                            )
                                        }
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="drawer-footer">
                        <div className="cart-total-row">
                            <span>
                                Total
                            </span>
                            <strong>
                                {moeda(totalPedido)}
                            </strong>
                        </div>
                        <button
                            className="btn-primary"
                            onClick={abrirCheckout}
                        >
                            Finalizar pedido
                        </button>
                    </div>
                </aside>
            )}
            {/* ===================================
                CHECKOUT
            =================================== */}
            {checkoutAberto && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>
                                Finalizar pedido
                            </h2>
                            <button
                                className="icon-btn"
                                onClick={() =>
                                    setCheckoutAberto(false)
                                }
                            >
                                ✕
                            </button>
                        </div>
                        <form
                            className="modal-body"
                            onSubmit={enviarPedido}
                        >
                            <label className="field">
                                <span>
                                    Nome*
                                </span>
                                <input
                                    type="text"
                                    value={nome}
                                    required
                                    onChange={e =>
                                        setNome(
                                            e.target.value
                                        )
                                    }
                                />
                            </label>
                            <label className="field">
                                <span>
                                    Telefone / WhatsApp
                                </span>
                                <input
                                    type="tel"
                                    value={telefone}
                                    placeholder="(11) 99999-9999"
                                    onChange={e =>
                                        setTelefone(
                                            e.target.value
                                        )
                                    }
                                />
                            </label>
                            <fieldset className="field radio-group">
                                <legend>
                                    Tipo de pedido
                                </legend>
                                <label>
                                    <input
                                        type="radio"
                                        name="deliveryType"
                                        value="retirada"
                                        checked={
                                            tipoPedido ===
                                            "retirada"
                                        }
                                        onChange={e =>
                                            setTipoPedido(
                                                e.target.value
                                            )
                                        }
                                    />
                                    Retirar no local
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="deliveryType"
                                        value="entrega"
                                        checked={
                                            tipoPedido ===
                                            "entrega"
                                        }
                                        onChange={e =>
                                            setTipoPedido(
                                                e.target.value
                                            )
                                        }
                                    />
                                    Entrega
                                </label>
                            </fieldset>

                            {tipoPedido === "entrega" && (
                                <label className="field">
                                    <span>
                                        Endereço de entrega*
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        value={endereco}
                                        placeholder="Rua, número, bairro"
                                        onChange={e =>
                                            setEndereco(
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                            )}

                            <label className="field">
                                <span>
                                    Forma de pagamento
                                </span>
                                <select
                                    value={pagamento}
                                    onChange={e =>
                                        setPagamento(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="dinheiro">
                                        Dinheiro
                                    </option>
                                    <option value="cartao">
                                        Cartão na entrega
                                    </option>
                                    <option value="pix">
                                        Pix
                                    </option>
                                </select>
                            </label>
                            <label className="field">
                                <span>
                                    Observações
                                </span>
                                <textarea
                                    rows="2"
                                    value={observacoes}
                                    placeholder="Ex: sem cebola, ponto da carne, etc."

                                    onChange={e =>
                                        setObservacoes(
                                            e.target.value
                                        )
                                    }
                                />
                            </label>
                            {/* RESUMO */}
                            <div className="modal-summary">
                                <h3>
                                    Resumo do pedido
                                </h3>
                                {carrinho.map(item => (
                                    <div
                                        key={item.id}
                                    >
                                        <span>
                                            {item.quantidade}x{" "}
                                            {item.nome}
                                        </span>
                                        <strong>
                                            {moeda(
                                                Number(item.preco) *
                                                item.quantidade
                                            )}
                                        </strong>
                                    </div>
                                ))}
                                <hr />
                                <div>
                                    <strong>
                                        Total
                                    </strong>
                                    <strong>
                                        {moeda(
                                            totalPedido
                                        )}
                                    </strong>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn-primary"
                            >
                                Confirmar pedido
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* ===================================
                PEDIDO CONFIRMADO
            =================================== */}
            {pedidoConfirmado && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-body confirm-body">
                            <div className="confirm-check">
                                ✓
                            </div>
                            <h2>
                                Pedido enviado!
                            </h2>
                            <p className="confirm-order-id">
                                Pedido{" "}
                                <strong>
                                    {pedidoId
                                        ? `#${pedidoId}`
                                        : "#0"}
                                </strong>
                            </p>
                            <div className="status-track">
                                <span>
                                    ✓ Pedido recebido
                                </span>
                                <span>
                                    ⏳ Em preparo
                                </span>
                                <span>
                                    🍽️ Pronto
                                </span>
                            </div>

                            <p className="confirm-total">
                                Total:{" "}
                                <strong>
                                    {moeda(totalPedido)}
                                </strong>
                            </p>
                            <button
                               className="btn-secondary"
                                onClick={novoPedido}
                            >
                                Fazer novo pedido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default Pedidos;

