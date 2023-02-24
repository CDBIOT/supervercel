
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
const[sales, setSales] = useState('')

function NovaVenda(values){
      Axios.post("http://localhost:3001/vendas",{
      
          idproduct: idproduct,
          product: props.product,
          marca: props.marca,
          qtd: props.qtd,
          price: price,
          total: total
          }).then((response)=>
          {
          console.log(response)
          });
      
      }
  

useEffect(() => {
    Axios.get("http://localhost:3001/vendas")
    .then((response) =>{
    setSales(response.data);
    });
    {
    console.log(sales)
    }
}, [])

return(
    <div>
    <HiPlusCircle/> <HiTrash/> <HiShoppingCart/>


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
    </div>

)

}

export default Vendas