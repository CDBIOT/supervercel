
import { useState } from 'react'
import ShowUsers from '../ShowUsers'
function Users(){

function cadastrarUsuario(e){
 e.preventDefault()
    console.log(`O usuario ${name} usa a senha ${password}`)
    console.log("Cadastrou usuário")
   
}

const [name, setName] = useState()
const [role, setFunção] = useState()
const [password, setPassword] = useState()

return(
<div>
    <h1> Submit New User</h1>
    <form onSubmit={cadastrarUsuario}>
        <div>
            <label htmlFor="name"></label>
            <input type="text" id ="name" name="name" placeholder = "Digite seu nome" onChange={(e)=> setName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="role"></label>
            <input type="text" id= "role" name="role" placeholder = "Digite sua função" onChange={(e)=> setFunção(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="password"></label>
            <input type="text" id= "password" name="password" placeholder = "Digite sua password" onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <div>
            <input type="submit" value="Cadastrar"/>
        </div>
        <h1 >
    {name}
    {role}
    {password}
    </h1>
   
    </form>
    <ShowUsers />
</div>

)


}

export default Users