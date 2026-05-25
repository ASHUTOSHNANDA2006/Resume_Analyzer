import React from 'react'
import '../style/navbar.scss'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <span className="logo-icon">🎯</span>
          <h1>Interview Boost</h1>
        </div>

        {/* Menu Items */}
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#about">About</a></li>
        </ul>

        {/* Right Section */}
        <div className="navbar-right">
          <button className="btn-signin">Sign In</button>
          <button className="btn-signup">Get Started</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
