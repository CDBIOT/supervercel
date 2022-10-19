
import React from 'react'
import { useState, useEffect} from 'react'
import Axios from "axios";
import Card from '../Card';
import ShowProducts from './ShowProducts';

function Vendas(props){

const [resultado,setResultado]= useState()
  
const [values, setValues] = useState()

const [idvendas, setIdVendas] = useState()
const [idproduct, setIdProduct] = useState()
const [product, setProduct] = useState()
const [marca, setMarca] = useState()
const [qtd, setQtd] = useState()
const [price, setPrice] = useState()
const [total, setTotal] = useState() 

const [products, setProducts] = useState()



function soma(e){

    console.log(e.target.value)
    var result = e.target.value;
    setResultado(result);
}

function CadVendas(e){
 e.preventDefault()
    console.log(`O produto ${product} com preço ${price}`)
   

    Axios.post("http://localhost:3001/vendas",{
        idvendas: idvendas,
        idproduct: idproduct,
        product: product,
        marca: marca,
        qtd: qtd,
        price: price,
        total: total
        }).then((response)=>
        {
        console.log(response)
        });
    
}


return(
    <div>
        <span>{props.price}</span>
        <span>{total}</span>
        <span><h1>{resultado}</h1></span>
     
        <ShowProducts />
        <div>
     <button onClick={soma} value= {price*qtd}> Add </button>
    </div>
        
    <h1> Cadastro de Venda </h1>
    <form onSubmit={CadVendas}>
    <div>
            <label htmlFor="idvendas">IdProduto</label>
            <input type="number" id ="idvendas" name="idvendas" placeholder = "Digite o idvendas"  onChange={(e)=> setIdVendas(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="idproduct">IdProduto</label>
            <input type="number" id ="idproduct" name="idproduct" placeholder = "Digite o id"  onChange={(e)=> setIdProduct(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="product">Produto</label>
            <input type="text" id ="product" name="product" placeholder = "Produto" onChange={(e)=> setProduct(e.target.value )}/>
        </div>
        <div>
            <label htmlFor="marca">Marca</label>
            <input type="text" id= "marca" name="marca" placeholder = "Digite a marca" onChange={(e)=> setMarca(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="qtd">Qtd</label>
            <input type="number" id= "qtd" name="modelo" placeholder = "Digite a quantidade" onChange={(e)=> setQtd(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="price">Preço</label>
            <input type="number" id= "price" name="price" placeholder = "Digite o Preço" value={price}/>
        </div>
        <div>
            <label htmlFor="total">Total</label>
            <input type="number" id= "total" name="total"  value ={resultado} placeholder = "Total" onChange={(e)=> setTotal(e.target.value)}/>
        </div>
        <div>
        <input type="submit" value="Cadastrar"/>
        </div>

    
    </form>

</div>


)

}

export default Vendas