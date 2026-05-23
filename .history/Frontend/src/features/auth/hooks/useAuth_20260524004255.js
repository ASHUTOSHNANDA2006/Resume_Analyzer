import {useContext} from "react";
import {AuthContext} from "../auth.context";
import {}

export const useAuth = () => {

    const context = useContext(AuthContext)

    const {user,setUser,loading,setLoading} = context


}