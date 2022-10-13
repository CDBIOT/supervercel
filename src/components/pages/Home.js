import React from "react"
import cart from "../../blue/cart.png"
import styles from './Home.module.css'

function Home(){
    return( 
    <div>
    <h1> Home </h1>
    <h1> Bem vindo ao Supermercado Online</h1>
    <img src={cart} alt="cart"/>
    </div>
    )
}
export default Home