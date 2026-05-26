import {createContext,useState} from "react";
import {getMe} from "./services/auth.api"


export const AuthContext = createContext()


export const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const [toast, setToast] = useState(null) // { message: string, type: 'success' | 'error' }

    const showToast = (message, type = 'success') => {
        setToast({ message, type })
        // Autoclose toast after 4 seconds
        setTimeout(() => {
            setToast(null)
        }, 4000)
    }

    return(
        <AuthContext.Provider value = {{user,setUser,loading,setLoading,toast,showToast}}>
            {children}
        </AuthContext.Provider>
    )
}