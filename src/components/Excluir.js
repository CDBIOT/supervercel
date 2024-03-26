import React from 'react'
import {useState,useEffect} from 'react'
import {HiPlusCircle , HiTrash}  from 'react-icons/hi2';
import Axios from "axios";

function Excluir({props}){

const URL = "https://super-server-nu.vercel.app/products"

const[products,setProducts] = useState([])

const [_id, setId] = useState([])
const [select,setSelect] = useState([])

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
          console.log(data.products._id)
          });
         
}
       
useEffect(() => {
    getProducts()
          
}, [])

const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(URL, id, options);
      if (res.data.success) {
        alert(res.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

async function exluirProd(e){
e.preventDefault()

const options = {
    method: 'DELETE',
    cache: 'default',
    header: { 'Access-Control-Allow-Origin':'GET,HEAD,PUT,PATCH,POST,DELETE',
    mode: 'cors',
    'Content-Type':  '*/*' },
    redirect: 'follow',
    data: {_id}
    };
    
const dado = {
   // id: "651dd7f0c095615e71b297a9",
    _id:_id  }

{
console.log(dado._id)

}
  
// await Axios.delete(URL,options)      
//  .then((response) =>  {
//     console.log(`Opa fui excluido ${_id}`,response),
//     console.log(`Opa fui excluido ${dado}`,response)
//  })
}

useEffect(() => {
     //exluirProd()
     handleDelete()  
}, [])

return(
    <div>
        <div>
            <select id = "data" value = {products} onChange={(e)=> setId(e.target.value)}>Select o Id</select>
            <select id = "products" value= {select} onChange={(e) => setSelect(e.target.value)}> 
            
            <option value = {products}> Select product to exclude </option>  
            {products.map(option=>{
            return(
                    <option value= {option.id}  key={option.id}> 
                     {option._id} </option>
            )
        })}
        </select>
        <input type="text" value={select} placeholder = "Digite id do equip" onChange={(e)=> setId(e.target.value)}/>
        </div>
        <label htmlFor="_id"></label>
        <button  onClick={exluirProd} _id={_id} >Excluir<HiTrash/></button>
    </div>
)

}

export default Excluir