import React,{ useState } from 'react'
import Notes from './Notes'

function Resultado(props)
{


return(
 <>
 <p>Soma das notas: {props.Total} </p>
 <p>{props.somaNotas >= 60 ? "Aprovado" : "Reprovado" } </p>
 
 </>

);

}

export default Resultado