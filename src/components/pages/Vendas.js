
import React from 'react'
import { useState, useEffect} from 'react'
import { Button , Span} from "../../styles/styles";
import Axios from "axios";
import Card from '../Card';
import CadVendas from '../CadVendas';
import {HiPlusCircle , HiTrash}  from 'react-icons/hi2';
import {HiShoppingCart} from 'react-icons/hi';
import ShowProducts from './ShowProducts';
import Notas from '../Notas';
import Resultado from '../Resultado';
import {API,Amplify} from 'aws-amplify';
import config from '../../aws-exports'

Amplify.configure(config)
API.configure(config)


function Vendas(props){
const [idvendas,setIdvendas] = useState();
const [idproduct,setIdproduct] = useState();
const [product,setProduct] = useState();
const [marca,setMarca] = useState();
const [qtd,setQtd] = useState();
const [price, setPrice] = useState()
const [total,setTot] = useState();
const [resultado,setResultado]= useState()
const [value, selectValue] = useState()
const[sales, setSales] = useState('')


const [customers, setCustomers] = useState([])
const [input, setInput] = useState("")

async function getData(e) {
  
let myInit = { // OPTIONAL
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, // OPTIONAL
      response: true
    };
    let customerId = e.input
   await API.get('APIsuper','/items')
    .then(response => {
        console.log(response)
        let newCustomers = [...customers]
        newCustomers.push(response)
        setCustomers(newCustomers)
    }).catch (error=> {
        console.log(error)
    })
   
}

useEffect(() => {
  getData()  
  
   }, []);



async function NovaVenda(values){
    
let myInit = { // OPTIONAL
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, // OPTIONAL
      response: true
    };

 await API.post('superApi','/vendas',{
      body: {
          idproduct: idproduct,
          product: props.product,
          marca: props.marca,
          qtd: props.qtd,
          price: price,
          total: total
      }
          }).then((response)=>
          {
          console.log(response)
          });
      
      }
  

useEffect(() => {
    NovaVenda()
    
}, [])

return(
    <div>
    <HiPlusCircle/> <HiTrash/> <HiShoppingCart />
  
    <ShowProducts 
    idproduct = {idproduct} setIdproduct = {setIdproduct} 
    product = {product} setProduct = {setProduct} 
    marca = {marca} setMarca = {setMarca} 
    qtd = {qtd}     setQtd = {setQtd} 
    price = {price} setPrice = {setPrice}
    total = {total} setTot = {setTot}
    value = {value} selectValue={selectValue} />

    <Card values = {value}/>
    
   <Resultado  Total ={parseFloat(price)*parseFloat(qtd)}/>

    <h3> Produtos </h3>
        {sales.length> 0 &&
        sales.map((sale)=>(
        <Card 
        key= {sale.idvendas}
        idproduct={sale.idvendas}
        product = {sale.product} 
        marca= {sale.marca}
        qtd={sale.qtd}
        price={sale.price}
        total={sale.total}
        />
        ))}
   <Button onClick={()=>NovaVenda()}>Nova Venda</Button>
   
    <div>
            <label htmlFor="customer id"></label>
            <input type="text" value= {input} name="costumerId" placeholder = "Digite o idCustomer" onChange={(e)=> setInput(e.target.value)}/>
            <label> Value: {input}</label>
    </div>
    <Button onClick={()=>getData({input})}>API getData</Button>
{

customers.map((Custom,index)=>(
      <div key = {index}>
        <span>CustomerId: {Custom.customerId}</span>
        <span>CustomerName: {Custom.customerName}</span>
       </div>
       ))
}
</div>
)


}

export default Vendas