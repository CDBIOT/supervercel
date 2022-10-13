
import React from 'react'
import { useState } from 'react'
import Axios from "axios";

function Cad_Prods(){
    
  const [values, setValues] = useState()
    
  const handleClick = ()=>{
    Axios.post("http://localhost:3001/",{
    product: values.product,
      marca: values.marca,
      qtd:values.qtd,
      price: values.price
    });
  }

function CadProducts(e){
 e.preventDefault()
    console.log(`O produto ${product} com preço ${price}`)
    console.log("Produto cadastrado")
    
}
const [product, setProduct] = useState()
const [marca, setMarca] = useState()
const [qtd, setQtd] = useState()
const [price, setPrice] = useState()
return(
<div>
    <h1> Cadastro de Produtos</h1>
    <form onSubmit={CadProducts}>
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
        <p><button onClick={handleClick}>Cadastrar Produto</button></p>
        </div>
       
    </form>
</div>

)

}

export default Cad_Prods