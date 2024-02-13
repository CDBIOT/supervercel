import React from "react"
import {useEffect, useState} from 'react';
import Axios from "axios";
import styles from './Show_Prod.module.css';
import Loader from './Loader';
import Card from "./Card";
 

function Product_list() {

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);

function getPostgres(){
   
const options = {
    method: 'GET',
    cache: 'default',
    header: { 'Access-Control-Allow-Origin':'*',
    mode: 'cors',
    'Content-Type': '*/*' },
    redirect: 'follow'
    };
     
    Axios.get("https://super-server-nu.vercel.app/postgre",options)
    .then((response) =>{
    setProducts(response.data);
    const data = response.data
    console.log(data)
    });
    {
    console.log(products)
    setLoading(true)
    }
}
useEffect(() => {
  getPostgres()
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
        {data.length >0 ? (
        data.map((products, index) => (
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