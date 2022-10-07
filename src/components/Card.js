import React from "react";


function Card(props){

return(
<div>
    <h3 >{props.product}
    {props.marca}
    {props.qtd}
    {props.price}
    </h3>
</div>
)

}
export default Card