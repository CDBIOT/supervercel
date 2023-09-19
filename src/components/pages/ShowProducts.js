import React from 'react';
import {useEffect, useState} from 'react';
import Axios from "axios";
import Loader from '../Loader';

const ShowProducts = (props)=> {

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);



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

        </div>
        )
        
    }
export default ShowProducts
