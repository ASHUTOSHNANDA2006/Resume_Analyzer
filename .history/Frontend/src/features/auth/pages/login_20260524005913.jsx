import React from 'react'
import {useNavigate, Link} from "react-router"
import "../auth.form.scss"
import {useAuth} from "../hooks/useAuth"


const Login = () => {


    const {loading, handleLogin} = useAuth()

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

   const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin({email,password})
   }

   if(loading){
    return (<main></main>)
   }





    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit = {handleSubmit}>

                    <div className="input-group">
                        <label htmlFor ="email">Email</label>
                        <input 
                        onchange={(e)=>{setEmail(e.target.value)}}
                        type='email' id='email' name='email'placeholder='Enter Email Address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor ="password">Password</label>
                        <input 
                        onchange={(e)=>{setPassword(e.target.value)}}
                        type='password' id='password' name='password'placeholder='Enter Password' />
                    </div>
                    <button className = 'button primary-button'>Login</button>

                </form>

                <p>Don't have an account?<Link to={"/register"}> Register here</Link></p>
            </div>
        </main>
    )
}

export default Login