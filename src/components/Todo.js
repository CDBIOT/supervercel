import React  from "react"
import { Button , Span} from "../styles/styles";
import { useState, useEffect } from "react"


function Todo() {
    
    const [simula, setSimula] = useState()

    return(
        <>
        <div>
            {
                simula?<Span>Hello</Span>:null
            }
        </div>
        <Button onClick={()=>setSimula(!simula)}>Toggle</Button>
        
        </>
    )

}

export default Todo;