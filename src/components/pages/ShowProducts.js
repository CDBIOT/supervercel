import React from 'react';
import {useEffect, useState} from 'react';
import Axios from "axios";
import Loader from '../Loader';

const ShowProducts = (props)=> {

const [equips, setEquips] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
    Axios.get("http://localhost:3001/ShowProducts")
    .then((response) =>{
    setEquips(response.data);
    const data = response.data
    });
    {
    console.log(equips)
    setLoading(true)
   
    }
   
}, [])

return (  
    <div>        
    <select id = "products" value={props.value} onChange={(e) => props.selectValue(e.target.value)}>
    <option value = "" >Selecione o produto...</option>
        {equips.map(equips => {
        return (
                <option value={equips.id} key={equips.id}> 
                {equips.product}
                {equips.marca}
                {equips.qtd}
                {equips.price} </option>
                )  
        })} 
         {!loading && <Loader/>}
        </select>
        <h3 >{props.value}  </h3>

        </div>
        )
        
    }
export default ShowProducts
