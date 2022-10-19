import React from 'react';
import {useEffect, useState} from 'react';
import Axios from "axios";
import Product_list from '../Product_list';


const ShowProducts = (props)=> {

const [equips, setEquips] = useState([]);
const [selectValue, setSelectValue] = useState([])
        
function handleCreate(e){
    e.preventDefault()
    alert(selectValue)
}

useEffect(() => {
    Axios.get("http://localhost:3001/ShowProducts")
    .then((response) =>{
    setEquips(response.data);
    });
    {
    console.log(equips)
    }
   
}, [])

return (  <div>
        <h3 >{selectValue}</h3>
        
        <select id = "products" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
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
         
        </select>
      
    <h1>{selectValue}</h1>
    <h3>{equips.product}{equips.marca}{equips.qtd}{equips.price}</h3>
  
        </div>
        )
        
    }
export default ShowProducts
