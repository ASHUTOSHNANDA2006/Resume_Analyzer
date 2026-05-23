import {useAuth} from "./hooks/useAuth"
import React from 'react'

const Protected = () => {


    const {} = useAuth()
    return(
        <div>Protected</div>
    )
}


export default Protected