
import React from 'react'
import { useState, useEffect } from 'react'
import Axios from "axios";
import {API} from "aws-amplify"

function Cad_Prods(){


const [id, setIdProduct] = useState()
const [product, setProduct] = useState()
const [marca, setMarca] = useState()
const [qtd, setQtd] = useState()
const [price, setPrice] = useState()
    
async function CadProducts(e){
e.preventDefault()

console.log(`O produto ${product} com preço ${price}`)
    
const options = {
    method: 'POST',
    cache: 'default',
    header: { 'Access-Control-Allow-Origin':'*',mode: 'cors',
    'Content-Type': 'application/json' },
    redirect: 'follow'
    };

await API.post("superExpress","/products",options,{
    body:{
        id: id,
        produc: product,
        marc: marca,
        qtd: qtd,
        pric: price
    }, 
   
        }).then((response)=>{
        console.log(id)
        console.log(response)
        .catch (error=> {
        console.log(error.response)
        })
       
        });
}

useEffect(() => {
    CadProducts()  
 }, []);
    


return(
<div>
    <h1> Cadastro de Produtos</h1>
    <form onSubmit={CadProducts}>
    
        <div>
            <label htmlFor="id"></label>
            <input type="number" value = {id} id ="id" name="id" placeholder = "Digite o id" onChange={(e)=> setIdProduct(e.target.value)}/>
        </div>  
         <div>
            <label htmlFor="product"></label>
            <input type="text"  value = {product} id ="product" name="product" placeholder = "Digite o produto" onChange={(e)=> setProduct(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="marca"></label>
            <input type="text" value = {marca} id= "marca" name="marca" placeholder = "Digite a marca" onChange={(e)=> setMarca(e.target.value)}/>
        </div>
         <div>
            <label htmlFor="qtd"></label>
            <input type="number" value = {qtd}  id= "qtd" name="qtd" placeholder = "Digite a quantidade" onChange={(e)=> setQtd(e.target.value)}/>
        </div> 
        <div>
            <label htmlFor="price"></label>
            <input type="number"  value = {price} id= "price" name="price" placeholder = "Digite o Preço" onChange={(e)=> setPrice(e.target.value)}/>
</div>
        <div>
        <input type="submit" value="Cadastrar Produto"/>
        </div>
        <div>
    
        </div>
        
       
    </form>
</div>

)

}

export default Cad_Prods