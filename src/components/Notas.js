import React,{ useState } from 'react'
import Notes from './Notes'
import Resultado from './Resultado'

function Notas(props)
{
const [nota1,setNota1] = useState(0)
const [nota2,setNota2] = useState(0)
const [nota3,setNota3] = useState(0)
const [nota4,setNota4] = useState(0)

return(
 <>
 <Notes num = {1} nota={nota1} setNota={setNota1}/>
 <Notes num = {2} nota={nota2} setNota={setNota2}/>
 <Notes num = {3} nota={nota3} setNota={setNota3}/>
 <Notes num = {4} nota={nota4} setNota={setNota4}/>
 <Resultado somaNotas ={parseFloat(nota1)+parseFloat(nota2)+parseFloat(nota3)+parseFloat(nota4)} />
 
 </>

);

}

export default Notas