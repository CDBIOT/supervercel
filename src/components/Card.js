import React from "react";
import Axios from "axios";
import {useEffect, useState} from 'react';

function Card(props){

    const [products, setProducts] = useState()

    useEffect(() => {
        Axios.get("http://localhost:3001/vendas")
        .then((response) =>{
        setProducts(response.data);
        });
        {
        console.log(products)
        }
    }, [])

return(
<div>
    {products.map((p,index)=> (
        <h3 key={index}> 
     {p.product}</h3>
    )
    )}
</div>
)
}
export default Card