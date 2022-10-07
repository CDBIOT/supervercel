import logo from './blue/logo.png';
import logo_toi from './blue/logo_toi.png';
import React, {useEffect, useState} from 'react';
import './App.css';

import Card from './components/Card'
import Axios from "axios";
import EquipShow from './components/EquipShow';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';
import Users from './components/pages/Users';
import Routes from './Routes';
import Cad_Prods from './components/Cad_Prods';

function App() {
  
const [values, setValues] = useState()
const [listEquips, setListEquips] = useState()
console.log(listEquips)

const handleClick = ()=>{

  Axios.post("http://localhost:3001/",{
    product: values.product,
    marca: values.marca,
    qtd:values.qtd,
    price: values.price
  });
}

  return (
    
<div className = "App" > 
<Routes />

<p>  <img src={logo} alt="Logo"/>
<img src={logo_toi} alt="Logo"/></p>
<p>
<h1> Supermarket </h1>Supermarket Control</p>
<Users/>

<label htmlFor="product"> Produtos :</label>

<EquipShow></EquipShow>
<Cad_Prods></Cad_Prods>

  {typeof listEquips !== "undefined" && 
  listEquips.map((value)=>{
  return( 
    <Card 
    key={value.id}
    listEquips={listEquips}
    setListEquips={setListEquips}
    product={value.product}
    marca={value.marca}
    qtd={value.qtd}
    price={value.price}
    >
    </Card>
  )
  })}

   </div>
  
  );
  }

export default App;
