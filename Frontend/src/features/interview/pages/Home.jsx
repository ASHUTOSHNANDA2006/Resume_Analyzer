import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useAuth } from '../../auth/hooks/useAuth'
import { useNavigate } from 'react-router'

// Shared Layout Components
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

// Sub-components for Home page
import LandingView from './LandingView'
import LoadingProgress from '../components/LoadingProgress'
import SuccessModal from '../components/SuccessModal'

const Home = () => {
    const { generateReport, reports } = useInterview()
    const { user } = useAuth()
    const navigate = useNavigate()

    // State management for form inputs
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resumeFile, setResumeFile] = useState(null)
    const [charCount, setCharCount] = useState(0)

    // UI state feedback
    const [formError, setFormError] = useState("")
    const [generationStatus, setGenerationStatus] = useState("idle") // idle, generating, success
    const [isDragging, setIsDragging] = useState(false)
    
    const resumeInputRef = useRef()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.type !== "application/pdf") {
                setFormError("Only PDF resumes are supported.")
                setResumeFile(null)
            } else if (file.size > 3 * 1024 * 1024) {
                setFormError("Resume file size exceeds the 3MB limit.")
                setResumeFile(null)
            } else {
                setResumeFile(file)
                setFormError("")
            }
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) {
            if (file.type !== "application/pdf") {
                setFormError("Only PDF resumes are supported.")
                setResumeFile(null)
            } else if (file.size > 3 * 1024 * 1024) {
                setFormError("Resume file size exceeds the 3MB limit.")
                setResumeFile(null)
            } else {
                setResumeFile(file)
                setFormError("")
            }
        }
    }

    const handleJobDescriptionChange = (e) => {
        const val = e.target.value
        setJobDescription(val)
        setCharCount(val.length)
        if (formError && val.trim()) setFormError("")
    }

    const handleSelfDescriptionChange = (e) => {
        const val = e.target.value
        setSelfDescription(val)
        if (formError && val.trim()) setFormError("")
    }

    const handleGenerateReport = async () => {
        setFormError("")

        // Form Validation Check
        if (!jobDescription.trim()) {
            setFormError("Please provide a Job Description so the AI can match your skills properly.")
            return
        }

        if (!resumeFile && !selfDescription.trim()) {
            setFormError("Please either upload a Resume OR write a Quick Self-description to assess your skills.")
            return
        }

        try {
            setGenerationStatus("generating")
            
            const data = await generateReport({
                jobDescription: jobDescription.trim(),
                selfDescription: selfDescription.trim(),
                resumeFile: resumeFile
            })

            if (data && data._id) {
                setGenerationStatus("success")
                // Success modal plays for 2 seconds before navigating
                setTimeout(() => {
                    navigate(`/interview/${data._id}`)
                    setGenerationStatus("idle")
                }, 2000)
            } else {
                throw new Error("Failed to receive a valid report identifier from the server.")
            }
        } catch (err) {
            console.error("Report generation failed:", err)
            setFormError(err?.message || "Something went wrong during generation. Please try again.")
            setGenerationStatus("idle")
        }
    }

    // Toggle public landing page view if user is logged out
    if (!user) {
        return (
            <div className="app-layout-wrapper">
                <Navbar />
                <main className="landing-page-main">
                    <LandingView />
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="app-layout-wrapper">
            <Navbar />

            {/* Displaying Loading Overlay if generating plan */}
            {generationStatus === "generating" && <LoadingProgress />}

            {/* Displaying Success Animation Modal before redirecting */}
            {generationStatus === "success" && <SuccessModal />}

            <div className='interview-container'>
                {/* Main Content */}
                <main className='interview-main'>
                    {/* Title Section */}
                    <div className="title-section">
                        <h1>Create Your Custom <span className="highlight">Interview Plan</span></h1>
                        <p className="subtitle">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                    </div>

                    {/* Alert Banner for Validations/Errors */}
                    {formError && (
                        <div className="form-alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="alert-icon">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <p>{formError}</p>
                        </div>
                    )}

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
                                        onChange={handleJobDescriptionChange}
                                        value={jobDescription}
                                        name="jobDescription"
                                        id="jobDescription"
                                        maxLength="5000"
                                        placeholder="Paste the full job description here...
e.g. 'Frontend Engineer at Google India requires proficiency in React, TypeScript, and large-scale web systems...'"
                                        className="job-textarea"
                                    />
                                    <div className="char-counter">{charCount} / 5000 chars</div>
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

                                {/* Resume Upload Zone */}
                                <div className="profile-group">
                                    <div className="group-header">
                                        <label className="group-label">Upload Resume</label>
                                        <span className="best-results">Best Results</span>
                                    </div>
                                    <label 
                                        htmlFor="resume" 
                                        className={`upload-zone ${resumeFile ? 'selected-file' : ''} ${isDragging ? 'dragging' : ''}`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <div className="upload-icon-wrapper">
                                            {resumeFile ? '📄' : '☁️'}
                                        </div>
                                        {resumeFile ? (
                                            <>
                                                <p className="upload-text">{resumeFile.name}</p>
                                                <p className="upload-hint">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Click to replace</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="upload-text">Click to upload or drag & drop</p>
                                                <p className="upload-hint">PDF (Max 3MB)</p>
                                            </>
                                        )}
                                    </label>
                                    <input
                                        ref={resumeInputRef}
                                        onChange={handleFileChange}
                                        hidden
                                        type="file"
                                        name="resume"
                                        id="resume"
                                        accept=".pdf"
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
                                        onChange={handleSelfDescriptionChange}
                                        value={selfDescription}
                                        name="selfDescription"
                                        id="selfDescription"
                                        placeholder="Briefly describe your experience, key skills, and project list if you don't have a resume handy..."
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
                            <button 
                                onClick={handleGenerateReport}
                                className="generate-btn"
                            >
                                <span className="btn-icon">⚡</span>
                                Generate My Interview Strategy
                            </button>
                        </div>
                    </div>
                </main>

                {/* Recent Reports List */}
                {reports && reports.length > 0 && (
                    <section id="recent-plans" className="recent-reports">
                        <h2 className="recent-title">Your Recent Interview Plans</h2>
                        <div className="reports-grid">
                            {reports.map((report) => (
                                <div 
                                    key={report._id} 
                                    className="report-card" 
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <div className="report-card-header">
                                        <span className="report-bag">💼</span>
                                        <h3 className="report-job-title">{report.title || "Untitled Position"}</h3>
                                    </div>
                                    <div className="report-metrics-row">
                                        <div className="metric-badge">
                                            <span>ATS Score:</span>
                                            <strong className={report.atsScore >= 80 ? 'high' : report.atsScore >= 60 ? 'mid' : 'low'}>
                                                {report.atsScore || 0}
                                            </strong>
                                        </div>
                                        <div className="metric-badge">
                                            <span>Match Score:</span>
                                            <strong className={report.matchScore >= 80 ? 'high' : report.matchScore >= 60 ? 'mid' : 'low'}>
                                                {report.matchScore || 0}
                                            </strong>
                                        </div>
                                    </div>
                                    <p className="report-date">Generated on {new Date(report.createdAt).toLocaleDateString('en-IN')}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
            
            <Footer />
        </div>
    )
}

export default Home