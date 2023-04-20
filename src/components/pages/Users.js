import Axios from 'axios'
import { useState } from 'react'
import ShowUsers from '../ShowUsers'
import { HiArrowUpTray } from 'react-icons/hi2'
import {API} from "aws-amplify"


function Users(){

async function cadastrarUsuario(e){
 e.preventDefault()
    console.log(`O usuario ${name} usa a senha ${senha}`)
    
//Axios.post("http://localhost:3001/users",{
    await API.post("superExpress", "/users",{
        user_id: {user_id},
        name: {name},
        email: {email},
        senha:{senha}
        }).then((response)=>{
        console.log(response)
        });
}
const [user_id, setUserId] = useState()
const [name, setName] = useState()
const [email, setEmail] = useState()
const [senha, setSenha] = useState()

return(
<div>
    <h1> Submit New User</h1>
    <form onSubmit={cadastrarUsuario}>

        
        <div>
            <label htmlFor="user_id"></label>
            <input type="text" id ="user_id" name="user_id" placeholder = "Digite seu id" onChange={(e)=> setUserId(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="name"></label>
            <input type="text" id ="name" name="name" placeholder = "Digite seu nome" onChange={(e)=> setName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="role"></label>
            <input type="text" id= "email" name="email" placeholder = "Digite seu e-mail" onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="senha"></label>
            <input type="text" id= "senha" name="password" placeholder = "Digite sua senha" onChange={(e)=> setSenha(e.target.value)}/>
        </div>
        <div>
            <input type="submit" value="Cadastrar"/>
        </div>
        <h3 >
    {user_id}
    {name}
    {email}
    {senha}
    </h3>
   
    </form>
    <ShowUsers />
</div>

)


}

export default Users