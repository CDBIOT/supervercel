
import React from 'react'
import { useState } from 'react'

function Cad_Prods(){

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
    <h1> Cadastro de Products</h1>
    <form onSubmit={CadProducts}>
        <div>
            <label htmlFor="Product"></label>
            <input type="text" id ="product" name="product" placeholder = "Digite o produto" onChange={(e)=> setProduct(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="marca"></label>
            <input type="text" id= "marca" name="marca" placeholder = "Digite a marca" onChange={(e)=> setMarca(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="qtd"></label>
            <input type="text" id= "qtd" name="modelo" placeholder = "Digite a qtd" onChange={(e)=> setQtd(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="price"></label>
            <input type="text" id= "price" name="price" placeholder = "Digite o Preço" onChange={(e)=> setPrice(e.target.value)}/>
        </div>
        <div>
       
        <input type="submit" value="Cadastrar"/>
        </div>
        
    </form>
</div>
)

}

export default Cad_Prods