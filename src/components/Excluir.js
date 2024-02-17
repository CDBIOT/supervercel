import React from 'react'
import {useState,useEffect} from 'react'
import {HiPlusCircle , HiTrash}  from 'react-icons/hi2';
import Axios from "axios";

function Excluir({props}){

const[products,setProducts] = useState([])

const [idproduct, setId] = useState([])
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
          });
         
}
       
useEffect(() => {
    getProducts()
          
}, [])


async function exluirProd(e){
e.preventDefault()

const options = {
    method: 'delete',
    cache: 'default',
    header: { 'Access-Control-Allow-Origin':'*',
    mode: 'cors',
    'Content-Type':  '*/*' },
    redirect: 'follow'
    };
    
const dataProd = {
    id: "651dd7f0c095615e71b297a9"
      //idproduct:idproduct
      }

{
console.log(idproduct)

}
await Axios.delete`https://super-server-nu.vercel.app/products/${idproduct}`,options,)      
 .then((response) => 
    {
    console.log(`Opa fui excluido ${idproduct}`,response)
    }
)}

useEffect(() => {
     exluirProd()  
}, [])

return(
    <div>
        <div>
            <select id = "products" value= {select} onChange={(e) => setSelect(e.target.value)}> 
            <option value = {products.idproduct}> Select product to exclude </option>  
            {products.map(option=>{
            return(
                    <option value= {option.id}  key={option.id}> 
                     {option._id} </option>
            )
        })}
        </select>
        <input type="text" value={select} placeholder = "Digite id do equip" onChange={(e)=> setId(e.target.value)}/>
        </div>
        <button  onClick={exluirProd} idproduct={idproduct} >Excluir<HiTrash/></button>
    </div>
)

}

export default Excluir