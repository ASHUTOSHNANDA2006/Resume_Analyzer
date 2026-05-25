import React from 'react'
import "../style/home.scss"
import {useInterview} from '../hooks/useInterview.js'

const Home = () => {

    const {loading, generateReport} = use
  return (
    <div className='interview-container'>
      {/* Header */}
      <header className="interview-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🧠</div>
            <span className="logo-text">Interview<span className="logo-highlight">Intel</span></span>
          </div>
          <nav className="header-nav">
            <a href="#">Dashboard</a>
            <a href="#">Reports</a>
            <a href="#">Templates</a>
          </nav>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <div className="profile-icon">👤</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='interview-main'>
        {/* Title Section */}
        <div className="title-section">
          <h1>Create Your Custom <span className="highlight">Interview Plan</span></h1>
          <p className="subtitle">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
        </div>

        {/* Form Card */}
        <div className="form-card">
          <div className="form-grid">
            {/* Left Column - Job Description */}
            <section className="form-section left-section">
              <div className="section-header">
                <div className="section-title">
                  <span className="section-icon">📄</span>
                  <h2>Target Job Description</h2>
                </div>
                <span className="badge">Required</span>
              </div>
              <div className="textarea-wrapper">
                <textarea
                  name="jobDescription"
                  id="jobDescription"
                  placeholder="Paste the full job description here...
e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                  className="job-textarea"
                />
                <div className="char-counter">0 / 5000 chars</div>
              </div>
            </section>

            {/* Right Column - Profile */}
            <section className="form-section right-section">
              <div className="profile-header">
                <div className="section-title">
                  <span className="section-icon">👤</span>
                  <h2>Your Profile</h2>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="profile-group">
                <div className="group-header">
                  <label className="group-label">Upload Resume</label>
                  <span className="best-results">Best Results</span>
                </div>
                <label htmlFor="resume" className="upload-zone">
                  <div className="upload-icon-wrapper">☁️</div>
                  <p className="upload-text">Click to upload or drag & drop</p>
                  <p className="upload-hint">PDF or DOCX (Max 5MB)</p>
                </label>
                <input
                  hidden
                  type="file"
                  name="resume"
                  id="resume"
                  accept=".pdf,.docx"
                />
              </div>

              {/* OR Divider */}
              <div className="divider">
                <div className="divider-line"></div>
                <span className="divider-text">OR</span>
                <div className="divider-line"></div>
              </div>

              {/* Self Description */}
              <div className="profile-group flex-grow">
                <label className="group-label">Quick Self-description</label>
                <textarea
                  name="selfDescription"
                  id="selfDescription"
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                  className="self-textarea"
                />
              </div>

              {/* Info Box */}
              <div className="info-box">
                <span className="info-icon">ℹ️</span>
                <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
              </div>
            </section>
          </div>

          {/* Card Footer */}
          <div className="card-footer">
            <div className="ai-badge">
              <span className="badge-icon">✨</span>
              <span>AI-Powered Strategy Generation • Approx 30s</span>
            </div>
            <button className="generate-btn">
              <span className="btn-icon">⚡</span>
              Generate My Interview Strategy
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="interview-footer">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
      </footer>
    </div>
  )
}

export default Home