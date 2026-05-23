import {useAuth} from "./hooks/useAuth"
import React from 'react'
import {useNavigate} from "react-router"

const Protected = (children) => {

    const navigate = useNavigate()
    const {loading, user} = useAuth()

    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }

    if(!user){
        navigate("/login")
    }
    return(
}


export default Protected