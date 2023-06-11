import React from "react"
import cart from "../../blue/cart.png"
import styles from './Home.module.css'

function Home(){

    
const [bd_Status, setBdStatus] = useState();
const [status, setStatus] = useState(false);

function getStatus(e){

   Axios.get("https://super-server-eta.vercel.app/")
   .then((response) =>{
   setStatus(response.data);
    setBdStatus(response.data);
   const data = response.data
   });
   {
   console.log(status)
   console.log(bd_Status)  
   }
}

useEffect(() => {
  getProducts()
   
}, [])
    return( 
    <div>
    <h1> Home </h1>
    <h1> Bem vindo ao Supermercado AWS</h1>
    <img src={cart} alt="cart"/>

    <h1>Status{status}</h1>
    <h1>BD_Status{bd_Status}</h1>
    </div>
    )
}
export default Home