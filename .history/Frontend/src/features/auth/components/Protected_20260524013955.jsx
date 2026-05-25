import {useAuth} from "./hooks/useAuth"
import React from 'react'
import {useNavigate} from "react-router"

const Protected = () => {

    const
    const {loading, user} = useAuth()

    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }

    if(!user){

    }
    return(
        <div>Protected</div>
    )
}


export default Protected