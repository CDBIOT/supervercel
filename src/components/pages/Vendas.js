
import React from 'react'
import { useState, useEffect} from 'react'
import { Button , Span} from "../../styles/styles";
import Axios from "axios";
import Card from '../Card';
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

await Axios.get("https://super-server-nu.vercel.app/vendas",options)
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
          idvendas: idvendas,
          idproduct: idproduct,
          product: product,
          marca: marca,
          qtd: qtd,
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

    <Button onClick={()=>getData({input})}>getData</Button> 
    <Button onClick={() => setSales(!sales)}>Confirma Venda</Button>
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
<h4> Cadastro de Venda </h4>
            <form onSubmit={NovaVenda}>
                <div>
                    <label htmlFor="idvendas">IdVendas</label>
                    <input type="number" id="idvendas" name="idvendas" placeholder="Digite o idvendas" value={idvendas} onChange={(e) => setIdvendas(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="idproduct">IdProduto</label>
                    <input type="number" id="idproduct" value={idproduct} placeholder="Digite o id" onChange={(e) => setIdproduct(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="product">Produto</label>
                    <input type="text" id="product" value={product} placeholder="Produto" onChange={(e) => setProduct(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="marca">Marca</label>
                    <input type="text" id="marca" value={marca} placeholder="Digite a marca" onChange={(e) => setMarca(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="qtd">Qtd</label>
                    <input type="number" id="qtd" value={qtd} placeholder="Digite a quantidade" onChange={(e) => setQtd(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="price">Preço</label>
                    <input type="number" id="price" value={price} placeholder="Digite o Preço" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="total">Total</label>
                    <input type="number" id="total" value={total} placeholder="Total" onChange={(e) => setTot(e.target.value)} />
                </div>
                <div>
                
                </div>
            </form>

</div>
)


}

export default Vendas