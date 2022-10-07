import React from 'react';
import {useEffect, useState} from 'react';
//import {fetchStates} from '../helpers/ibge';
import Axios from "axios";

const EquipShow = ()=> {

const [equips, setEquips] = useState([]);
  
useEffect(() => {
    Axios.get("http://localhost:3001/")
    .then((response) =>{
    setEquips(response.data);
    });
    {
    console.log(equips)
    }
}, [])


return (   
    
        <select id = "products">
        <option value = "" >Selecione o produto...</option>
        {equips.map(equips => {

        return (
                <option value key={equips.id}> 
                {equips.product}
                {equips.marca}
                {equips.qtd}
                {equips.price} </option>
                )  
        })}
        </select>
        )
    }
export default EquipShow