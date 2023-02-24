
import React from 'react'
import { useState } from 'react'
import Axios from "axios";

function Cad_Prods(){
    
const [values, setValues] = useState()
  
const [idproduct, setIdProduct] = useState()
const [product, setProduct] = useState()
const [marca, setMarca] = useState()
const [qtd, setQtd] = useState()
const [price, setPrice] = useState()
    
function CadProducts(e){
 e.preventDefault()
    console.log(`O produto ${product} com preço ${price}`)

    Axios.post("http://localhost:3001/Cad_Prods",{
        idproduct: idproduct,
        product: product,
        marca: marca,
        qtd:qtd,
        price: price
        }).then((response)=>{
        console.log(response)
        });
    
}
return(
<div>
    <h1> Cadastro de Produtos</h1>
    <form onSubmit={CadProducts}>
    <div>
            <label htmlFor="idproduct"></label>
            <input type="number" id ="idproduct" name="idproduct" placeholder = "Digite o id" onChange={(e)=> setIdProduct(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="product"></label>
            <input type="text" id ="product" name="product" placeholder = "Digite o produto" onChange={(e)=> setProduct(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="marca"></label>
            <input type="text" id= "marca" name="marca" placeholder = "Digite a marca" onChange={(e)=> setMarca(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="qtd"></label>
            <input type="number" id= "qtd" name="modelo" placeholder = "Digite a quantidade" onChange={(e)=> setQtd(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="price"></label>
            <input type="number" id= "price" name="price" placeholder = "Digite o Preço" onChange={(e)=> setPrice(e.target.value)}/>
        </div>
        <div>
        <input type="submit" value="Cadastrar"/>
        </div>
        <div>
    
        </div>
        
       
    </form>
</div>

)

}

export default Cad_Prods