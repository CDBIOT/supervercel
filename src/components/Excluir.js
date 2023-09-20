import React from 'react'
import {useState,useEffect} from 'react'
import {HiPlusCircle , HiTrash}  from 'react-icons/hi2';
import Axios from "axios";

function Excluir({props}){

const [idproduct, setId] = useState([])

async function exluirProd(e){
e.preventDefault()

console.log(`Opa fui excluido ${idproduct}`)

const options = {
    method: 'GET',
    cache: 'default',
    header: { 'Access-Control-Allow-Origin':'*',
    mode: 'cors',
    'Content-Type':  '*/*' },
    redirect: 'follow'
    };

await Axios.delete()(`https://super-server-nu.vercel.app/products/${idproduct}`,options,{
body:{
    idproduct:idproduct
}
})
    .then(response => {
    console.log(response)
    }).catch (error=> {
        console.log(error)
    })

    }

useEffect(() => {
        exluirProd()  
}, [idproduct]);

return(
    <div>
         <HiPlusCircle/> <HiTrash/>
        <div>
            <label htmlFor="id"></label>
            <input type="text" id ="id" name="id" placeholder = "Digite id do equip" onChange={(e)=> setId(e.target.value)}/>
        </div>
        <button onClick={exluirProd}>Excluir</button>
    </div>
)

}

export default Excluir