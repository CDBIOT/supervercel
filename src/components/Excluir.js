import {useState} from 'react'

function Excluir({identifica}){

function meuEvento(e){
    e.preventDefault()
console.log(`Opa fui excluido ${identifica}`)
}

const [id, setId] = useState()

return(
    <div>
        <div>
            <label htmlFor="id"></label>
            <input type="text" id ="id" name="id" placeholder = "Digite id do equip" onChange={(e)=> setId(e.target.value)}/>
        </div>
        <button onClick={meuEvento}>Excluir</button>
    </div>
)

}

export default Excluir