import React from 'react'
import {useState,useEffect} from 'react'
import {HiPlusCircle , HiTrash}  from 'react-icons/hi2';
import Axios from "axios";

function Excluir({props}){
const[products,setProducts] = useState('')

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

const [idproduct, setId] = useState([])
const [select,setSelect] = useState('')

async function exluirProd(e){
e.preventDefault()


const options = {
    method: 'DELETE',
    cache: 'default',
    header: { 'Access-Control-Allow-Origin':'*',
    mode: 'cors',
    'Content-Type':  '*/*' },
    redirect: 'follow'
    };

await Axios.delete(`https://super-server-nu.vercel.app/products/${idproduct}`,options,{
body:{
    idproduct:idproduct
}

 .then(response => response.json())
  .then((data)=>{
   //setId(props.filter((props.product)=>props.idproduct !== idproduct))
    console.log(`Opa fui excluido ${idproduct}`)
    })
    .catch ((err)=> console.log(err))
}
)}

useEffect(() => {
       // exluirProd()  
        
}, []);

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
            <input type="text" value="idproduct" placeholder = "Digite id do equip" onChange={(e)=> setId(e.target.value)}/>
        </div>
        <button  onClick={exluirProd} idproduct={idproduct} ><HiTrash/>Excluir</button>
    </div>
)

}

export default Excluir