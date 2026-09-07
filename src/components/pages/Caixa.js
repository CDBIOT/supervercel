
import React from 'react'
import { useState, useEffect } from 'react'
import Axios from "axios";
import ShowProducts from './ShowProducts';
import Excluir from '../Excluir';
import Card from '../Card';

function Caixa(){

const [caixa_id, setCaixaId] = useState("");
const [usuario_id, setUsuarioId] = useState("");
const [valor_inicial, setValorInicial] = useState("");
const [status, setStatus] = useState("");

//ABRIR CAIXA
    
async function abrirCaixa(e){

e.preventDefault()

const dados = {
    "caixa_id": caixa_id,
    "usuario_id": usuario_id,
    "valor_inicial":valor_inicial,
    "status":status
}

console.log(`O caixa ${caixa_id} com o usuario ${usuario_id}`)

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
await Axios.post("https://super-server-nu.vercel.app/caixa/abrir", dados)
        .then((response)=>{
       // console.log(dados)
        console.log(response.data)
        })
        .catch (error=> {
            console.error(error.response)
        });


}
useEffect(() => {
    abrirCaixa()  
 }, []);


const dadosfechar = {
    "caixa_id": caixa_id,
    "usuario_id": usuario_id,
    "valor_inicial":valor_inicial,
    "status":status
}

//FECHAR CAIXA

 async function fecharCaixa(){

await Axios.post("https://super-server-nu.vercel.app/caixa/fechar" ,
        dadosfechar)
        .then((response)=>{
       // console.log(dados)
        console.log(response.data)
        })
        .catch (error=> {
            console.error(error.response)
        });
}


useEffect(() => {
    fecharCaixa()  
 }, []);


 

return(
<div>
    <h1> Cadastro de Produtos</h1>
    <form onSubmit={abrirCaixa}>
    
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
        <input type="submit" value="Abrir Caixa"/>
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
{/* ========================= DADOS DO CAIXA ========================= */}

 {caixa_id && ( 
<div> <h3>Caixa atual</h3>
 <p> <strong>Caixa ID:</strong> {caixa_id} </p> 
 <p> <strong>Usuário:</strong> {usuario_id} </p> 
 <p> <strong>Valor inicial:</strong> R$ {valor_inicial} </p> 
 <p> <strong>Status:</strong> {status} </p> 
 </div> 
)}
{/* ========================= FECHAMENTO DO CAIXA ========================= */} 
{caixa_id && status === "ABERTO" && (
     <form onSubmit={fecharCaixa}> 
     <input type="submit" value="Fechar Caixa" />
      </form> 
    )}
<Card />
</div>

)

}

export default Caixa