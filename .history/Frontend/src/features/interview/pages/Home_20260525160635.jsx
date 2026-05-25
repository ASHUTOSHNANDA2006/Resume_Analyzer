import React from 'react'
import "../style/home.scss"

const Home = () => {
  return (
    <div className='interview-page'>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-icon">🎯</span>
            <h1>Interview Boost</h1>
          </div>
          <ul className="navbar-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          <div className="navbar-right">
            <button className="btn-signin">Sign In</button>
            <button className="btn-signup">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className='home'>
      <div className="container">
        {/* Header Section */}
        <div className="header">
          <h1>Create Your Custom <span className="highlight">Interview Plan</span></h1>
          <p className="subtitle">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
        </div>

        {/* Main Content */}
        <div className="content-wrapper">
          {/* Left Section - Job Description */}
          <div className="section left-section">
            <div className="section-header">
              <div className="section-title">
                <span className="icon">📋</span>
                <h2>TARGET JOB DESCRIPTION</h2>
              </div>
              <span className="badge required">REQUIRED</span>
            </div>
            <div className="input-group">
              <textarea
                name="jobDescription"
                id="jobDescription"
                placeholder="Paste the full job description here...
e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                className="textarea-input"
              />
              <span className="char-count">0 / 5000 chars</span>
            </div>
          </div>

          {/* Right Section - Profile */}
          <div className="section right-section">
            <div className="section-header">
              <div className="section-title">
                <span className="icon">👤</span>
                <h2>YOUR PROFILE</h2>
              </div>
              <span className="badge required">REQUIRED</span>
            </div>

            {/* Resume Upload */}
            <div className="profile-input-group">
              <div className="profile-label">
                <p>Upload Resume</p>
                <span className="file-results">TEST RESULTS</span>
              </div>
              <label htmlFor="resume" className="file-upload-area">
                <div className="upload-icon">☁️</div>
                <p>Click to upload or drag & drop</p>
                <span className="file-info">PDF or DOCX (Max 5MB)</span>
              </label>
              <input
                hidden
                type="file"
                name="resume"
                id="resume"
                accept=".pdf,.docx"
              />
            </div>

            {/* Divider */}
            <div className="divider">
              <span>OR</span>
            </div>

            {/* Self Description */}
            <div className="profile-input-group">
              <div className="profile-label">
                <p>Quick Self-description</p>
              </div>
              <textarea
                name="selfDescription"
                id="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                className="textarea-input textarea-small"
              />
            </div>

            {/* Info Note */}
            <div className="info-note">
              <span className="info-icon">ℹ️</span>
              <p>Either a <strong>Resume or a Self Description</strong> is required to generate a personalized plan.</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="footer">
          <div className="ai-badge">
            <span>✨ AI-Powered Strategy Generation • Approx 30s</span>
          </div>
          <button className="btn-primary">
            <span className="btn-icon">⚡</span>
            Generate My Interview Strategy
          </button>
        </div>
      </div>
      </main>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>About</h3>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Product</h3>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#roadmap">Roadmap</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#guides">Guides</a></li>
                <li><a href="#api">API</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Legal</h3>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#conduct">Code of Conduct</a></li>
                <li><a href="#cookies">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>&copy; 2024 Interview Boost. All rights reserved.</p>
            </div>
            <div className="footer-links">
              <a href="#privacy">Privacy & Terms</a>
              <a href="#conduct">Code of Conduct</a>
              <a href="#sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home