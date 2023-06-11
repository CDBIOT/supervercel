import React from "react"
import {useEffect, useState} from 'react';
import Axios from "axios";
import styles from './Show_Prod.module.css';
import Loader from './Loader';

function Product_list() {
    
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
        
useEffect(() => {
    Axios.get("https://super-server-eta.vercel.app/products"),{
        method: 'GET',
        cache: 'default',
        header: { 'Access-Control-Allow-Origin':'*',mode: 'cors',
        'Content-Type': 'application/json' },
        redirect: 'follow'
        }
    .then((response) =>{
    setProducts(response.data);
    setLoading(true)
    });
  
}, [])


return (
    <>
    <div>
    <table className={styles.products_table}>
    <tr><th className={styles.th} colSpan={4}>
    <td width="25%"className={styles.th}>Produto</td>
    <td width="25%" className={styles.th}>Marca</td>
    <td width="25%" className={styles.th}>Qtd</td>
    <td width="25%" className={styles.th}>Preço</td>
    </th></tr>
    </table>
  
        <tbody className={styles.tbody}>
        {products.length >0 ? (
        products.map((products, index) => (
        <tr key = {index}>
        <td width="25%"className={styles.td}>{products.product}</td>
        <td width="25%"className={styles.td}>{products.marca}</td>
        <td width="25%"className={styles.td}>{products.qtd}</td>
        <td width="25%"className={styles.td}>{products.price}</td></tr>
        ))) : (
         <td>Não há itens na lista</td>
        )} 
        {!loading && <Loader/>}
        </tbody>
        <tfooter>
       
        </tfooter>
    </div></>
    )
}
export default Product_list