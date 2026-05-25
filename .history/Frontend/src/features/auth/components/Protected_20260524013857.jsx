import {useAuth} from "./hooks/useAuth"
import React from 'react'

const Protected = () => {


    const {loading, user} = useAuth()
    return(
        <div>Protected</div>
    )
}


export default Protected