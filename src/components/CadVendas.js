import React from 'react'
import { useState, useEffect} from 'react'
import Axios from "axios";
import { Button , Span} from "../styles/styles";

function CadVendas() {

    const [sales, setSales] = useState();

    const [idproduct, setIdProduct] = useState();
    const [idvendas, setIdvendas] = useState();
    const [product, setProduct] = useState();
    const [marca, setMarca] = useState();
    const [qtd, setQtd] = useState();
    const [price, setPrice] = useState();
    const [total, setTotal]= useState();


function CadVendas(e){

    Axios.post("https://super-server-eta.vercel.app/vendas", {
        idvendas: idvendas,
        idproduct: idproduct,
        product: product,
        marca: marca,
        qtd: qtd,
        price: price,
        total: total
    }).then((response) => {
        console.log(response);
    });
}

    return (
        <div>
            <h1> Cadastro de Venda </h1>
            <form onSubmit={CadVendas}>
                <div>
                    <label htmlFor="idvendas">IdVendas</label>
                    <input type="number" id="idvendas" name="idvendas" placeholder="Digite o idvendas" value={idvendas} onChange={(e) => setIdvendas(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="idproduct">IdProduto</label>
                    <input type="number" id="idproduct" value={idproduct} placeholder="Digite o id" onChange={(e) => setIdProduct(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="product">Produto</label>
                    <input type="text" id="product" value={product} placeholder="Produto" onChange={(e) => setProduct(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="marca">Marca</label>
                    <input type="text" id="marca" value={marca} placeholder="Digite a marca" onChange={(e) => setMarca(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="qtd">Qtd</label>
                    <input type="number" id="qtd" value={qtd} placeholder="Digite a quantidade" onChange={(e) => setQtd(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="price">Preço</label>
                    <input type="number" id="price" value={price} placeholder="Digite o Preço" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="total">Total</label>
                    <input type="number" id="total" value={total} placeholder="Total" onChange={(e) => setTotal(e.target.value)} />
                </div>
                <div>
                    <input type="submit" value="Cadastrar" />
                    <Button onClick={() => setSales(!sales)}>Confirma Venda</Button>
                </div>
            </form>
        </div>
    );
}
   export default CadVendas