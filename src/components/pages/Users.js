import Axios from 'axios'
import { useState, useEffect} from 'react'
import ShowUsers from '../ShowUsers'
import { HiArrowUpTray } from 'react-icons/hi2'
import {API} from "aws-amplify"


function Users(){

const [user_id, setUserId] = useState()
const [nome, setName] = useState()
const [email, setEmail] = useState()
const [senha, setSenha] = useState()

async function cadastrarUsuario(e,value){
    e.preventDefault()
    console.log(`O usuario ${nome} usa a senha ${senha}`)
    
// var myHeaders = new Headers();
// myHeaders.append(
//     {"Content-type": 'application/json',
//     "Access-Control-Allow-Origin": "*"}
//     );
    
const options = {
                method: 'POST',
                cache: 'default',
                header: { 'Access-Control-Allow-Origin':'*',mode: 'cors',
                'Content-Type':  '*/*' },
                redirect: 'follow'
                };

Axios.post("https://super-server-nu.vercel.app/user",options,{
 //   await API.post("superExpress", "/users",options,{
    body:{
        user_id: user_id,
        nome: nome,
        email:email,
        senha:senha
    } ,
    
        }).then((response)=>{
            response.json()
            console.log(data)
        })
        .catch (error=> {
            console.log(error.response)
         })
}

useEffect(() => {
    cadastrarUsuario()  
 }, []);
  
return(
<div>
    <h1> Submit New User</h1>
    <form onSubmit={cadastrarUsuario}>
        <div>
            <label htmlFor="user_id"></label>
            <input type="text" value = {user_id} id ="user_id" name="user_id" placeholder = "Digite seu id" onChange={(e)=> setUserId(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="nome"></label>
            <input type="text" value = {nome} id ="nome" name="nome" placeholder = "Digite seu nome" onChange={(e)=> setName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="email"></label>
            <input type="text" value = {email} id= "email" name="email" placeholder = "Digite seu e-mail" onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="senha"></label>
            <input type="text" value = {senha}  id= "senha" name="senha" placeholder = "Digite sua senha" onChange={(e)=> setSenha(e.target.value)}/>
        </div>
        <div>
            <input type="submit" value="Cadastrar"/>
        </div>
        <h4 >
    {user_id }
    { nome }
    { email }
    { senha }
    </h4>
   
    </form>
    {<ShowUsers />}
</div>

)


}

export default Users