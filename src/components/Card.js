import React from "react";

function Card(props){

return(
   
<div> 
    <div>
    <span >{props.Total}</span> 
    <h4> {props.idvendas}</h4> 
    <span> Id: {props.idproduct}</span>
    <span> Prod: {props.product}</span>
    <span> Marca: {props.marca}</span>
    <span> Qtd: {props.qtd}</span>
    <span> Preço: {props.price}</span>
    <span> Total: {props.total}</span>
      
    
      {/*<p>Soma das notas: </p>   
    <h3>)=>setQuant=(sales[1].qtd)}</h3>  */}
    </div>
   
    </div>
    )
}
export default Card