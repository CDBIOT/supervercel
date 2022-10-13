import React from "react"
import cart from "../../blue/cart.png"

function Home(){
    return( 
    <div>
    <h1> Home </h1>
    <h1> Bem vindo ao Supermecado Online</h1>
    <img src={cart} alt="imagem"/>
    </div>
    )
}
export default Home