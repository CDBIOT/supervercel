import React from "react";
import Axios from "axios";
import {useEffect, useState} from 'react';

function Card(props){

    const [products, setProducts] = useState()

    useEffect(() => {
        Axios.get("http://localhost:3001/")
        .then((response) =>{
        setProducts(response.data);
        });
    
    }, [])
return(
<div>
   <h3 >
    {products.product}
    {products.marca}
    {products.qtd}
    {products.price}
   </h3>
</div>
)
}
export default Card