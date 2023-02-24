import React from 'react';
import {useEffect, useState} from 'react';
import Axios from "axios";
import styles from './Show_Prod.module.css';

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
  
        <table>
            <tr>
        <th colSpan={3}>
            <td>Nome</td>
            <td>Função</td>
            <td>Senha</td>
        </th>  
            </tr>
            </table>
            <tbody> 
        {users.length >0 ? (
         users.map((users,index)=> (
        <tr key={index}> 
            <td width="30%" className={styles.td}>{users.name} </td>
            <td width="30%" className={styles.td}>{users.role} </td>
            <td width="30%" className={styles.td}>{users.password}</td>  
        </tr>
        
        ))) : (
        <td>Não há itens na lista</td>
        )}</tbody>
    </h3>
    </>
   ) 
}
export default ShowUsers