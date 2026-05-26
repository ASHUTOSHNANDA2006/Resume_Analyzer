import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import './Footer.scss'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const navigate = useNavigate()
    const location = useLocation()

    const scrollToSection = (id) => {
        if (location.pathname !== '/') {
            navigate(`/${id}`)
            return
        }
        if (id === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        const element = document.querySelector(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="logo-section">
                            <span className="logo-icon">🧠</span>
                            <span className="logo-text">
                                Interview<span className="logo-highlight">Intel</span>
                            </span>
                        </div>
                        <p className="brand-description">
                            Empowering job seekers across India with advanced AI analysis to match top-tier career requirements, optimize resumes, and master technical and behavioral interviews.
                        </p>
                    </div>

                    <div className="footer-links-grid">
                        <div className="links-column">
                            <h3>Product</h3>
                            <button onClick={() => scrollToSection('#features')} className="footer-link-btn">Features</button>
                            <button onClick={() => scrollToSection('top')} className="footer-link-btn">Resume Analyzer</button>
                            <button onClick={() => scrollToSection('top')} className="footer-link-btn">ATS Scanner</button>
                        </div>
                        <div className="links-column">
                            <h3>Resources</h3>
                            <button onClick={() => scrollToSection('#faq')} className="footer-link-btn">Help Center</button>
                            <button onClick={() => scrollToSection('#features')} className="footer-link-btn">Interview Guides</button>
                            <button onClick={() => scrollToSection('#faq')} className="footer-link-btn">Frequently Asked Questions</button>
                        </div>
                        <div className="links-column">
                            <h3>Legal</h3>
                            <a href="#privacy">Privacy Policy</a>
                            <a href="#terms">Terms of Service</a>
                            <a href="#cookies">Cookie Policy</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        &copy; {currentYear} InterviewIntel. Crafted with ❤️ in India.
                    </p>
                    <p className="free-badge">
                        ⚡ 100% Free & Open Access
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
