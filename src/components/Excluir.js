import React from 'react'
import {useState,useEffect} from 'react'
import {HiPlusCircle , HiTrash}  from 'react-icons/hi2';
import Axios from "axios";

function Excluir({props}){

const [idproduct, setId] = useState([])

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
    setId(idproduct)
   //setId(props.filter((props.product)=>props.idproduct !== idproduct))
    console.log(`Opa fui excluido ${idproduct}`)
    })
    .catch ((err)=> console.log(err))
}
)}

useEffect(() => {
        exluirProd()  
}, [idproduct]);

return(
    <div>
         <HiPlusCircle/> 
        <div>
            <label htmlFor="id"></label>
            <input type="text" id ="id" name="id" placeholder = "Digite id do equip" onChange={(e)=> setId(e.target.value)}/>
        </div>
        <button  onClick={exluirProd} ><HiTrash/>Excluir</button>
    </div>
)

}

export default Excluir