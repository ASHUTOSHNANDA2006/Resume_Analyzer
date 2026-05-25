import {useContext} from "react";
import {AuthContext} from "../auth.context";
import {login,register,logout,getMe}

export const useAuth = () => {

    const context = useContext(AuthContext)

    const {user,setUser,loading,setLoading} = context


}