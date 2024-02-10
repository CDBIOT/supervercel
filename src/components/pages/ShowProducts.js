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


function getProducts(e){
 // e.preventDefault()
  
const options = {
  method: 'GET',
  cache: 'default',
  header: { 'Access-Control-Allow-Origin':'*',
  mode: 'cors',
  'Content-Type':  '*/*' },
  redirect: 'follow'
  };

   Axios.get("https://super-server-nu.vercel.app/products",options)
   .then((response) =>{
   setProducts(response.data.products);
   const data = response.data
   console.log(data)
   });
   {
    console.log(products)
   setLoading(true)
  
   }
}

useEffect(() => {
  getProducts()
   
}, [])

function selectValue(e){
  const[id,checked] = e.target;
  if(checked){
setSelect(prev=>[...prev,props.value]);
  }// else[setSelect(...prev,props.value='')]
  console.log(props.value)}



return (  
    <div>        
    <select id = "products" value={props.value} onChange={(e) => props.selectValue(e.target.value)}>
    <option value = "" >Selecione o produto...</option>
        {products.length >0 ?(
        products.map(products => {
        return (
                <option value={products.id} key={products.id}> 
                {products.marca}
                {products.product}
                {products.qtd}
                {products.price} </option>
                )  
        })):(  
        !loading && <Loader/>)
        } 
         {!loading && <Loader/>}
        </select>
        <h3 >{props.value}  </h3>
        <Excluir />
     
        <Card />
       
        </div>
        )
        
    }
export default ShowProducts
