import {useAuth} from "./hooks/useAuth"
import React from 'react'

const Protected = () => {


    const {loading, user} = useAuth()

    if(loading)
    return(
        <div>Protected</div>
    )
}


export default Protected