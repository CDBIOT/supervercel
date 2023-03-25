import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import { Button , Span} from "./styles/styles";

import {API} from "aws-amplify"

import Navbar from './components/Navbar';

import Home from './components/pages/Home';
import Vendas from './components/pages/Vendas';
import Users from './components/pages/Users';
import Cad_Prods from './components/pages/Cad_Prods';
import ShowProducts from './components/pages/ShowProducts';
import Product_list from './components/Product_list';

function App() {
  
const [customers, setCustomers] = useState([])
const [input, setInput] = useState("")

async function getCustomers(e) {

  let reqInfo = { // OPTIONAL
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, // OPTIONAL
      response: true
    };

  let customerId = e.input
  await API.get('superApi','/customers/'+ customerId)
  .then(response => {
      console.log(response)
      let newCustomers = [...customers]
      newCustomers.push(response)
      setCustomers(newCustomers)
  }).catch (error=> {
      console.log(error)
  })
 
}

  return (
   
<div className='App'>
<Router>
    <Navbar />

         <Routes>
            <Route exact path="/"       element={<Home/>}></Route>
            <Route path="/vendas"       element={<Vendas/>}></Route>
            <Route path="/Cad_Prods"    element={<Cad_Prods/>} ></Route>
            <Route path="/Product_list" element={<Product_list/>}></Route>
            <Route path="/Users"        element={<Users/>}></Route>
         </Routes>
    </Router>

    
    <div>
            <label htmlFor="customer id"></label>
            <input type="text" value= {input} name="costumerId" placeholder = "Digite o idCustomer" onChange={(e)=> setInput(e.target.value)}/>
            <label>{input}</label>
    </div>

        <button  onClick={()=>getCustomers({input})}>Get Data </button>
       
        <label>{input} {customers}</label>
{
//</div>customers.map((Custom,index)=>{
  //  return(
        //<div key = {index}>
        <div>
        <span>CustomerId: {customers}</span>
        <span>CustomerName: {customers}</span>
       </div>
        //)
}
        <div>
        <input type="submit" value="Cadastrar"/>
        </div>
</div>
  
  );
  }

export default App;
