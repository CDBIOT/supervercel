import React from 'react';
import {useEffect, useState} from 'react';
import Axios from "axios";
import styles from './Show_Prod.module.css'
import{API} from "aws-amplify"

function ShowUsers() {

const [users, setUsers] = useState([]);

async function getUsers(e){
   // e.preventDefault()

    await API.get("superExpress", "/users")
    .then((response) => {
    setUsers(response.data)
    });

}
        
useEffect(() => {
 getUsers()

},[])

return ( 
    <>
        <table>
            <tr>
        <th colSpan={3}>
            <td>Nome</td>
            <td>E-mail</td>
            <td>Senha</td>
        </th>  
            </tr>
            </table>
            <tbody> 
        {users.length >0 ? (
         users.map((users,index)=> (
        <tr key={index}> 
            <td width="30%" className={styles.td}>{users.nome} </td>
            <td width="30%" className={styles.td}>{users.email} </td>
            <td width="30%" className={styles.td}>{users.senha}</td>  
        </tr>
        
        ))) : (
        <td>Não há itens na lista</td>
        )}</tbody>
    
    </>
   ) 
}
export default ShowUsers