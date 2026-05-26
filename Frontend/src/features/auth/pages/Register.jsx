import React, { useState } from 'react'
import { useNavigate, Link } from "react-router"
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"

const Register = () => {
    const { handleRegister, showToast } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateForm = () => {
        if (!username.trim()) {
            showToast("Username is required.", "error")
            return false
        }

        if (username.trim().length < 3) {
            showToast("Username must be at least 3 characters.", "error")
            return false
        }

        if (!email.trim()) {
            showToast("Email address is required.", "error")
            return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email.trim())) {
            showToast("Please enter a valid email address.", "error")
            return false
        }

        if (!password) {
            showToast("Password is required.", "error")
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)
        const result = await handleRegister({ username: username.trim(), email: email.trim(), password })
        setIsSubmitting(false)

        if (result && result.success) {
            navigate("/")
        }
    }

    return (
        <main>
            <div className="form-container">
                <Link to="/" className="auth-logo">
                    <span className="logo-icon">🧠</span>
                    <span className="logo-text">Interview<span>Intel</span></span>
                </Link>

                <h1>Create Account</h1>
                <p className="auth-subtitle">Join thousands of job seekers today</p>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type='text'
                                id='username'
                                name='username'
                                value={username}
                                placeholder='johndoe'
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </span>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                placeholder='name@example.com'
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                id='password'
                                name='password'
                                value={password}
                                placeholder='••••••••'
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className='submit-btn'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span>
                                Registering...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <p>
                    Already have an account?
                    <Link to="/login"> Login here</Link>
                </p>
            </div>
        </main>
    )
}

export default Register