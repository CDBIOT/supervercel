import React from 'react';
import {useEffect, useState} from 'react';
import Axios from "axios";

function ShowUsers() {

const [users, setUsers] = useState([]);
        
useEffect(() => {
    Axios.get("http://localhost:3001/users")
    .then((response) => {
    setUsers(response.data)
    });

},[])

return ( 
    <><h3>
    {users.length >0 ? (
         users.map((users,index)=> (
        <h3 key={index}> 
        <table><tr><th colSpan={3}><td>Nome</td><td>Função</td><td>Senha</td></th>  </tr>
        <tr><td>{users.name} </td><td> {users.role} </td><td>{users.password}</td>  
        </tr>
        </table>
        
        </h3>))) : (
        <p1>Não há itens na lista</p1>
        )}
    </h3>
    </>
   ) 
}
export default ShowUsers