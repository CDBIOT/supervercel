import React from 'react'
import {useState,useEffect} from 'react'
import {HiPlusCircle , HiTrash}  from 'react-icons/hi2';
import Axios from "axios";

function Excluir({props}){

<<<<<<< HEAD
const [id, setId] = useState([])
=======
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

>>>>>>> 9344ab64594506a3d9700bf8535d2bcb52d74841

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

<<<<<<< HEAD
await Axios.delete(`https://super-server-nu.vercel.app/products/${idproduct}`,options,{
body:{
    idproduct:id
}

 .then(response => response.json())
  .then((data)=>{
    setId(id)
   //setId(props.filter((props.product)=>props.idproduct !== idproduct))
    console.log(`Opa fui excluido ${idproduct}`)
    })
    .catch ((err)=> console.log(err))
=======
{
console.log(idproduct)

>>>>>>> 9344ab64594506a3d9700bf8535d2bcb52d74841
}
await Axios.delete('https://super-server-nu.vercel.app/products/'`${idproduct}`,options)      
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
<<<<<<< HEAD
            <label htmlFor="id"></label>

            <select onChange={e =>setId(e.target.value)}> 
                <option value={id}> Select product </option>  
                 {id.map(min=>{
            return<option value= {id} key={id}>{id} </option>
=======
            <select id = "products" value= {select} onChange={(e) => setSelect(e.target.value)}> 
            <option value = {products.idproduct}> Select product to exclude </option>  
            {products.map(option=>{
            return(
                    <option value= {option.id}  key={option.id}> 
                     {option._id} </option>
            )
>>>>>>> 9344ab64594506a3d9700bf8535d2bcb52d74841
        })}
        </select>
        <input type="text" value={select} placeholder = "Digite id do equip" onChange={(e)=> setId(e.target.value)}/>
        </div>
<<<<<<< HEAD
        <button  onClick={exluirProd} id={id} ><HiTrash/>Excluir</button>
=======
        <button  onClick={exluirProd} idproduct={idproduct} >Excluir<HiTrash/></button>
>>>>>>> 9344ab64594506a3d9700bf8535d2bcb52d74841
    </div>
)

}

export default Excluir