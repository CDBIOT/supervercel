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
  header: { 'Access-Control-Allow-Origin':'*',
  mode: 'cors',
  'Content-Type':  '*/*' },
  redirect: 'follow'
  };

await Axios.get("https://super-server-nu.vercel.app/products",options)
   .then((response) =>{
   setProducts(response.data.products);
   const data = response.data
   console.log(data)
   });
   {
   setLoading(true)
  
   }
}

useEffect(() => {
  getProducts()
   
}, [])

function selectValue(e){
  //const id = e.target.value;
// if(checked){
//setSelect(prev=>[...prev,props.value]);
 // }// else[setSelect(...prev,props.value='')]
// console.log(selectValue[0])
  console.log(select.product)
}

return (  
    <div>        
    <select id = "products" value={select} onChange={(e) => setSelect(e.target.value)}>
    <option value = {products._id} >Selecione o produto mongodb...</option>
        {products.length >0 ?(
        products.map(products => {
        return (
                <option value={products.id} key={products.id}> 
                {products._id}
                {products.product}
                {products.marca}
                {products.qtd}
                {products.price} </option>
                )  
        })):(  
        !loading && <Loader/>)
        } 
         {!loading && <Loader/>}
         <h3 >{select }</h3>
        </select>
       
        <h3 >{select.product}</h3>
        <Excluir />
        <Product_list />
     
        </div>
        )
        
    }
export default ShowProducts
