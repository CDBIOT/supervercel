import React from 'react'

function Notes(props)
{

return(
 <>
 <legend>Informe a nota: {props.num} </legend>
 <input type ="text" value={props.nota} onChange={(e)=>props.setNota(e.target.value)} ></input>
 
 
 </>

);

}

export default Notes