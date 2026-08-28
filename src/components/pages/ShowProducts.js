import React from 'react';
import {useEffect, useState} from 'react';
import Axios from "axios";
import Loader from '../Loader';
import Excluir from '../Excluir';
import Card from '../Card';
import Product_list from '../Product_list';

const ShowProducts = (props)=> {

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
const [select, setSelect] = useState([])


async function getProducts(e){
 // e.preventDefault()
  
const options = {
  method: 'GET',
  cache: 'default',
  headers: { 'Access-Control-Allow-Origin':'*',
  mode: 'cors',
  'Content-Type':  '*/*' },
  redirect: 'follow'
  };
  
try{

   setLoading(false);

  const response = await Axios.get(
    "https://super-server-nu.vercel.app/products",
    options
  );

  const data = response.data;
   console.log(data);
  
   const productData = Array.isArray(data.products)?data.products:[];

   setProducts(productsData);

}catch(error){


    console.log("Erro ao buscar produtos", error);
  //Evita que products fique undefined em caso de erro
  setProducts([]);

}finally{
  setLoading(true);
}
   
}

useEffect(() => {
  getProducts()
   
}, [])

function selectValue(e){
  const id =Number(e.target.value);
const produto =  products.find(

  product => product.id === id
);

 setSelect(produto || "");
  console.log(produto)
}
return (
   <div> {!loading ? ( 
   <Loader /> 
  ) : (
     <> <select id="products" value={select?.id || ""} 
     onChange={selectValue} >
       <option value=""> Selecione o produto no estoque... </option>
        {products.map(product => ( <option value={product.id} key={product.id} > 
          {product.barcode} - 
          {product.id} - 
          {product.product} - 
          {product.marca} - 
          {product.qtd} - 
          R$ {product.price} </option> ))} 
          </select> {select && ( <h3> Produto selecionado: {select.barcode} {select.id} {select.product} {select.marca} {select.qtd} {select.price}</h3> )} </> )} 
          </div> 
          );
          
          <Card />
           } 
           export default ShowProducts;