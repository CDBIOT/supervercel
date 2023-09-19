import React from 'react';
import {useEffect, useState} from 'react';
import Axios from "axios";
import styles from './Show_Prod.module.css'
import{API} from "aws-amplify"

function ShowUsers() {

const [users, setUsers] = useState([]);

 function getUsers(e){
   // e.preventDefault()
  
const options = {
    method: 'GET',
    cache: 'default',
    header: { 'Access-Control-Allow-Origin':'*',
    mode: 'cors',
    'Content-Type':  '*/*' },
    redirect: 'follow'
    };
    Axios.get("https://super-server-nu.vercel.app/user",options)
    .then((response) =>{
    setUsers(response.data.users);
    const data = response.data
    console.log(data)
    });
    {
     console.log(users)
    //setLoading(true)
   
    }
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