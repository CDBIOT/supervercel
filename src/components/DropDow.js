import {useEffect, useState} from 'react';
//import {fetchStates} from '../helpers/ibge';

const DropDow = ()=> {

const [states, setStates] = useState([]);

useEffect(()=>{
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => response.json())
        .then(states => setStates (states))
         console.log(states)
    }, [])

return (   
        <select id = "state">
        <option value = "" >Selecione o estado...</option>
        {states.map(states => {

        return (
                <option value key={states.nome}> {states.nome}</option>
                )
        })}
        </select>
        )
    }
export default DropDow