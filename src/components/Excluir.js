import React from 'react'
import {useState,useEffect} from 'react'
import {HiPlusCircle , HiTrash}  from 'react-icons/hi2';
import Axios from "axios";

function Excluir({idproduct}){

async function delProduct(e){
e.preventDefault()

console.log(`Opa fui excluido ${idproduct}`)


const [idproduct, setId] = useState()

await Axios.delete()("https://super-server-nu.vercel.app/products",options,{
body:{
    idproduct:idproduct

}
})
    .then(response => {
    console.log(response)
    }).catch (error=> {
        console.log(error)
    })

useEffect(() => {
        delProduct()  
     }, []);
    }


return(
    <div>
         <HiPlusCircle/> <HiTrash/> <HiShoppingCart />
        <div>
            <label htmlFor="id"></label>
            <input type="text" id ="id" name="id" placeholder = "Digite id do equip" onChange={(e)=> setId(e.target.value)}/>
        </div>
        <button onClick={delProduct}>Excluir</button>
    </div>
)

}

export default Excluir