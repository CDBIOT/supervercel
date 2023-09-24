
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
const[sales, setSales] = useState([])


const [customers, setCustomers] = useState([])
const [input, setInput] = useState("")

 async function getData(e) {
// e.preventDefault()
const options = {
method: 'GET',
cache: 'default',
header: { 'Access-Control-Allow-Origin':'*',
mode: 'cors',
'Content-Type':  '*/*' },
redirect: 'follow'
};

await Axios.post("https://super-server-nu.vercel.app/vendas",options)
// await API.get('superExpress','/vendas')
    .then(response => {
    console.log(response.data)
    setSales(response.data.vendas)
    }).catch (error=> {
        console.log(error)
    })
}

 useEffect(() => {
   getData()  
}, []);



async function NovaVenda(e){
   // e.preventDefault()
    
const options = {
    method: 'POST',
    cache: 'default',
    header: { 'Access-Control-Allow-Origin':'*',mode: 'cors',
    'Content-Type':  '*/*' },
    redirect: 'follow'
    };


 await Axios.post("https://super-server-nu.vercel.app/vendas",options,{
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
    
    <ShowProducts 
    idproduct = {idproduct} setIdproduct = {setIdproduct} 
    product = {product} setProduct = {setProduct} 
    marca = {marca} setMarca = {setMarca} 
    qtd = {qtd}     setQtd = {setQtd} 
    price = {price} setPrice = {setPrice}
    total = {total} setTot = {setTot}
    value = {value} selectValue={selectValue} /> 
    
   <Resultado  Total ={parseFloat(price)*parseFloat(qtd)}/>

   <Button onClick={()=>NovaVenda()}> <HiPlusCircle/>Nova Venda <HiShoppingCart /></Button>

     <Button onClick={()=>getData({input})}>API getData</Button> 
{

sales.map((sales,index)=>(
      <div key = {index}>
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
       </div>
       ))
}
<CadVendas />
</div>
)


}

export default Vendas