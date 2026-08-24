
import {useEffect, useState} from 'react';
import { Axios } from "axios";

function Calc()
{
    
let t,H1;

const [f, setFreq] = useState([])
const [quant1, setQuant1] = useState([])
const [quant2, seQuant2] = useState([])
const [capacitor, setCap] = useState([])
const [ind, setInd] = useState([])

const [result, setResult] = useState([])
const [high, setHigh] = useState([])
const [low, setLow] = useState([])


let RC = (Number(parseFloat(capacitor))* Number(parseFloat(ind)));
let raiz = Math.sqrt(RC);
let pi = (6.28*raiz);
let numer = (1/6.28*RC);
let Freq = (1/pi);


const sum = ()=>{

	let setResult = (quant1 + quant2);
    console.log("Soma: " + result);
	console.log("x= " + quant1 +"y= " + quant2);    
    console.log("a= " + quant1 +"b= " + quant2);
}

function freq(){

console.log(" raiz= " + raiz + "\n  RC = "+ numer + "\n  pi= " + pi)
console.log(" C= " + capacitor +"  L= " + ind);
console.log("Freq: " + Freq)
}

function mult(){
var K = (quant1 * quant2);
}


useEffect(() => {
   freq();
}, [])


return(

<>

<p id="RC">{RC}</p>
<p id="quant1"> {quant1} </p>
<p id="quant2"> {quant2} </p>

<h2 hd="disp"></h2>


<h1 id="Z"></h1>

<h1 id="Freq"></h1>


<h1>Cálculadora Javascript</h1>
    <div class="img">
	    
            <div class="img">
                
<tr><h2> Capacitor </h2>{quant1} </tr>
            <input type="text"  name="cap" size="5" onChange={(e)=> setCap(e.target.value)}></input> 
<tr><h2> Indutor </h2> {quant2}</tr>
            <input type="text" name ='ind' size ='5'onChange={(e)=> setInd(e.target.value)}></input> 
 
        <tr><h2> Capacitor </h2>{quant1}  <td><input type="number" id="cap" onChange = {(e)=> setCap(e.target.value)}></input> </td></tr>
        <tr><h2> Indutor </h2> {quant2} <td><input type="number" id="ind" onChange = {(e)=> setInd(e.target.value)}></input> </td></tr>
        </div>
    </div>

<table>

<tr><h1> Result </h1> </tr>

<tr><td><h2 id="quant1" size="5">Q1 = {quant1}</h2> </td><td><h2 id="quant2" size="10" >Q2 = {quant2} </h2></td></tr>

<tr><td><h2 id="result">{result}</h2> </td><td></td></tr>

<tr><h2 id="RC"> RC: {RC}</h2> </tr>

<tr><h2 id="raiz"> Raiz: {raiz}</h2> </tr>

<tr><h2 id="Freq"> Frequency: {Freq}</h2></tr>

<td>
<input type="button" class = "add" id="btnOn" value="Somar" onClick={sum}></input>
<input type="button" id="btnOff" value="Freq " onClick={freq}></input>
<input type="button" id="btndisp" value="X" onClick={mult}></input>
<input type ="button" id ="mult" onChange={(e) => setCap(e.target.value)}></input>
</td>

</table>

</>

    )

} export default Calc
