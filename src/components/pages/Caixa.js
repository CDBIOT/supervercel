
import React from 'react'
import { useState, useEffect } from 'react'
import Axios from "axios";
import ShowProducts from './ShowProducts';
import Excluir from '../Excluir';
import Card from '../Card';

function Caixa(){

const [caixa_id, setCaixaId] = useState()
const [usuario_id, setUsuarioId] = useState()
const [valor_inicial, setValorInicial] = useState()
const [status, setStatus] = useState()
    
async function Caixa(e){
e.preventDefault()

console.log(`O caixa ${caixa_id} com o usuario ${usuario_id}`)
const dados = {
    "caixa_id": caixa_id,
    "usuario_id": usuario_id,
    "valor_inicial":valor_inicial,
    "status":status
}

const options = {
   // method: 'POST',
    cache: 'default',
    header: { 'Access-Control-Allow-Origin':'*',
    mode: 'cors',
    'Content-Type':  'application/json' }
    
   // body : dados
    //redirect: 'follow'
    };

//await API.post("superExpress","/products",options,{
await Axios.post("https://super-server-nu.vercel.app/caixa" ,
        dados)
        .then((response)=>{
       // console.log(dados)
        console.log(response.data)
        })
        .catch (error=> {
            console.error(error.response)
        });
}

useEffect(() => {
    Caixa()  
 }, []);
    
return(
<div>
    <h1> Cadastro de Produtos</h1>
    <form onSubmit={Caixa}>
    
        { <div>    
            <label htmlFor="caixa_id"></label>
            <input type="number" value = {caixa_id} id ="id" name="id" placeholder = "Digite o id" onChange={(e)=> setCaixaId(e.target.value)}/>
        </div>  }
         <div> 
            <label htmlFor="usuariao_id"></label>
            <input type="text"  value = {usuario_id} id ="usuario_id" name="usuario_id" placeholder = "ID de usuario" onChange={(e)=> setUsuarioId(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="valor_inicial"></label>
            <input type="text" value = {valor_inicial} id= "valor_inicial" name="valor_inicial" placeholder = "Valor inicial" onChange={(e)=> setValorInicial(e.target.value)}/>
        </div>
         <div>
            <label htmlFor="status"></label>
            <input type="number" value = {status}  id= "status" name="status" placeholder = "Status" onChange={(e)=> setStatus(e.target.value)}/>
        </div> 
        <div>
        <input type="submit" value="Caixa"/>
        </div>
        <div>
    
        </div>
    <h4>
    {caixa_id}
    { usuario_id }
    { valor_inicial }
    { status}
    </h4> 
       
    </form>
<Card />
</div>

)

}

export default Caixa