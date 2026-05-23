import {useAuth} from "./hooks/useAuth"
import React from 'react'

const Protected = () => {


    const {loading, user} = useAuth()

    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }
    return(
        <div>Protected</div>
    )
}


export default Protected