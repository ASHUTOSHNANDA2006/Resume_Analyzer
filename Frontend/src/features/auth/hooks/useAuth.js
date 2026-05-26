import {useContext, useEffect} from "react";
import {AuthContext} from "../auth.context";
import {login,register,logout,getMe} from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)

    const {user,setUser,loading,setLoading,toast,showToast} = context


    const handleLogin = async ({email,password}) => {
        setLoading(true)
        try {
            const data = await login({email,password})
            if (data && data.user) {
                setUser(data.user)
                showToast(`Welcome back, ${data.user.username}!`, "success")
                return { success: true }
            } else {
                throw new Error("Invalid credentials or server error")
            }
        } catch(err) {
            console.error("Login hook error:", err)
            const errMsg = err?.response?.data?.message || err?.message || "Invalid email or password"
            showToast(errMsg, "error")
            return { success: false, error: errMsg }
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({username,email,password}) => {
        setLoading(true)
        try {
            const data = await register({username,email,password})
            if (data && data.user) {
                setUser(data.user)
                showToast("Account created successfully! Welcome to InterviewIntel.", "success")
                return { success: true }
            } else {
                throw new Error("Registration failed")
            }
        } catch(err) {
            console.error("Register hook error:", err)
            const errMsg = err?.response?.data?.message || err?.message || "Registration failed. Try a different username/email."
            showToast(errMsg, "error")
            return { success: false, error: errMsg }
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            // 1. Hit logout API first to let the server blacklist the token from the cookie
            await logout()
        } catch(err) {
            console.log("Logout API error (frontend fallback triggered):", err)
        } finally {
            // 2. Wipe frontend auth tokens & data from cookies and localStorage
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            
            // 3. Clear auth context state
            setUser(null)
            showToast("Logged out successfully.", "success")
            setLoading(false)
        }
    }

    useEffect(() =>{


        const getAndSetUser = async () => {

            try{
                const data = await getMe()
                setUser(data.user)
            }catch(err){}finally{
                setLoading(false)
            }
        }
        getAndSetUser()
    },[])


    return {user,loading,handleLogin,handleRegister,handleLogout,toast,showToast}
}