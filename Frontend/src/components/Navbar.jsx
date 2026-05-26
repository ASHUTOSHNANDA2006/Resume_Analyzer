import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import './Navbar.scss'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const onLogout = async () => {
        await handleLogout()
        navigate('/')
    }

    const scrollToSection = (id) => {
        if (location.pathname !== '/') {
            navigate(`/${id}`)
            return
        }
        const element = document.querySelector(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <header className="navbar-header">
            <div className="navbar-content">
                <Link to="/" className="logo-section">
                    <div className="logo-icon">🧠</div>
                    <span className="logo-text">
                        Interview<span className="logo-highlight">Intel</span>
                    </span>
                </Link>

                <nav className="navbar-nav">
                    {user ? (
                        <>
                            <Link to="/" className="nav-link">Dashboard</Link>
                            <button onClick={() => scrollToSection('#recent-plans')} className="nav-link-btn">Recent Reports</button>
                        </>
                    ) : (
                        <button onClick={() => scrollToSection('#features')} className="nav-link-btn">Features</button>
                    )}
                </nav>

                <div className="navbar-actions">
                    {user ? (
                        <div className="user-profile">
                            <span className="user-welcome">Hello, <strong>{user.username}</strong></span>
                            <div className="profile-badge">
                                {user.username.slice(0, 2).toUpperCase()}
                            </div>
                            <button onClick={onLogout} className="logout-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="auth-btn login-btn">Login</Link>
                            <Link to="/register" className="auth-btn register-btn">Get Started</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar

