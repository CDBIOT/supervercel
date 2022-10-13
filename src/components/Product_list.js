import React from "react"
import {useEffect, useState} from 'react';
import Axios from "axios";
import styles from './Show_Prod.module.css';

function Product_list() {
    
const [products, setProducts] = useState([]);
        
useEffect(() => {
    Axios.get("http://localhost:3001/")
    .then((response) =>{
    setProducts(response.data);
    });
  
}, [])


return (
    <><h3>
    {products.length >0 ? (
        products.map((products, index) => (
        <h3 key = {index}>
        <table className={styles.products_table}><tr><th className={styles.th} colSpan={4}><td>Produto</td><td>Marca</td><td>Qtd</td><td>Preço</td></th>  </tr>
        <tr><td>{products.product}</td><td>{products.marca}</td><td>{products.qtd}</td><td> {products.price}</td>   
        </tr>
        </table>
        </h3> ))) : (
         <p1>Não há itens na lista</p1>
        )}
    </h3></>
    )
}
export default Product_list