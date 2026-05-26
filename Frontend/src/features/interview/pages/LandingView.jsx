import React, { useState } from 'react'
import { Link } from 'react-router'
import './LandingView.scss'

const SHOWCASE_TABS = [
    {
        id: 'ats',
        label: 'ATS Scanner',
        icon: '📊',
        title: 'ATS Alignment & Keyword Mapping',
        description: 'Our AI scans your resume against the target job description to compute your match probability, finding missing keywords commonly filtered by Indian recruiting algorithms.'
    },
    {
        id: 'questions',
        label: 'Custom Questions',
        icon: '💬',
        title: 'Personalized Technical & Behavioral Prep',
        description: 'Get high-fidelity mock questions mapped directly to your project list and the target tech stack. Complete with model answers and intention guides.'
    },
    {
        id: 'roadmap',
        label: 'Preparation Roadmap',
        icon: '🗺️',
        title: 'Actionable 7-Day Day-by-Day Roadmap',
        description: 'Know exactly what to review. A custom preparation plan is compiled dynamically, prioritizing high-yield topics and system design focus.'
    }
]

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)} style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '0.85rem',
            padding: '1.25rem 1.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        }}>
            <div className="faq-question" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>{question}</h3>
                <span className={`faq-chevron ${isOpen ? 'open' : ''}`} style={{
                    color: '#ff1e6f',
                    transition: 'transform 0.3s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {isOpen && (
                <div className="faq-answer" style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '0.75rem',
                    marginTop: '0.25rem',
                    animation: 'elementFadeIn 0.3s ease-out forwards'
                }}>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.6', margin: 0 }}>{answer}</p>
                </div>
            )}
        </div>
    )
}

const LandingView = () => {
    const [activeTab, setActiveTab] = useState('ats')

    return (
        <div className="landing-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-grid">
                    <div className="hero-content">
                        <div className="badge-new">
                            <span className="sparkle">✨</span> Optimized for the Indian Job Market
                        </div>
                        <h1 className="hero-title">
                            Land Your Dream Tech Job in <span className="highlight-text">India</span>
                        </h1>
                        <p className="hero-subtitle">
                            An intelligent AI Resume Analyzer & Interview Planner customized for ambitious Indian graduates. Get an instant ATS match score, customized technical & behavioral interview questions, and prep dynamically for top giants and hot product startups.
                        </p>
                        <div className="hero-cta">
                            <Link to="/register" className="btn-primary">
                                Get Started For Free
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                            <Link to="/login" className="btn-secondary">Log In</Link>
                        </div>
                        
                        <div className="hero-trust">
                            <span className="trust-text">100% FREE • NO SUBSCRIPTION TIERS • BUILT FOR SUCCESS</span>
                        </div>
                    </div>

                    {/* Interactive Preview Widget */}
                    <div className="hero-visual">
                        <div className="visual-card main-card">
                            <div className="card-header">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                                <div className="card-title">Interactive AI Preview</div>
                            </div>
                            
                            {/* Showcase Interactive Tabs */}
                            <div className="showcase-tabs">
                                {SHOWCASE_TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        className={`showcase-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        <span className="showcase-tab-icon">{tab.icon}</span>
                                        <span className="showcase-tab-label">{tab.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="card-body">
                                {activeTab === 'ats' && (
                                    <div className="tab-showcase-content fade-in">
                                        <div className="preview-score-row">
                                            <div className="preview-score-box">
                                                <div className="score-circle score-high">87</div>
                                                <div className="score-label">ATS Match</div>
                                            </div>
                                            <div className="preview-score-box">
                                                <div className="score-circle score-mid">74%</div>
                                                <div className="score-label">Skills Match</div>
                                            </div>
                                        </div>

                                        <div className="preview-skills">
                                            <span className="skill-badge high">React.js 🔥</span>
                                            <span className="skill-badge high">TypeScript 🔥</span>
                                            <span className="skill-badge mid">System Design ⚠️</span>
                                            <span className="skill-badge low">Node.js 🟢</span>
                                        </div>

                                        <div className="preview-tips">
                                            <div className="tip-item">
                                                <span className="tip-icon">💡</span>
                                                <p>Rewrite "worked on responsive views" to "Architected fluid dashboard layout, decreasing first-input lag by 24%."</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'questions' && (
                                    <div className="tab-showcase-content fade-in">
                                        <div className="mock-q-card">
                                            <div className="mock-q-header">
                                                <span className="mock-q-badge">Technical</span>
                                                <h4>Q: Explain virtual DOM diffing in React.</h4>
                                            </div>
                                            <p className="mock-q-intention"><strong>Recruiter Intention:</strong> Testing deep engine understanding over surface syntax.</p>
                                            <p className="mock-q-answer"><strong>Model Answer:</strong> React compares the new virtual DOM with the previous snapshot. It computes the minimal set of changes and batches updates to the real DOM...</p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'roadmap' && (
                                    <div className="tab-showcase-content fade-in">
                                        <div className="mock-roadmap-timeline">
                                            <div className="timeline-step">
                                                <span className="step-number">Day 1</span>
                                                <div className="step-desc">
                                                    <h5>JS Core Concepts</h5>
                                                    <p>Closures, Prototypal Inheritance, Event Loop, Promises.</p>
                                                </div>
                                            </div>
                                            <div className="timeline-step">
                                                <span className="step-number">Day 2</span>
                                                <div className="step-desc">
                                                    <h5>React Internals</h5>
                                                    <p>Fiber Architecture, custom hooks optimization, rendering lifecycle.</p>
                                                </div>
                                            </div>
                                            <div className="timeline-step">
                                                <span className="step-number">Day 3</span>
                                                <div className="step-desc">
                                                    <h5>System Design</h5>
                                                    <p>Caching strategies, CDN loading, responsive design metrics.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className="floating-badge badge-1">
                            <span className="badge-icon">💼</span>
                            <div className="badge-text">
                                <h4>Avg package in India</h4>
                                <h4>₹12L - ₹36L Lakhs/annum</h4>
                            </div>
                        </div>

                        <div className="floating-badge badge-2">
                            <span className="badge-icon">⚡</span>
                            <div className="badge-text">
                                <h4>Instant Preparation</h4>
                                <h4>In under 30 seconds</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="section-header">
                    <h2>Everything You Need to <span className="gradient-text">Excel</span></h2>
                    <p>Designed by top frontend architects to help ambitious Indian engineers conquer technical rounds.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                        </div>
                        <h3>AI Resume Analysis</h3>
                        <p>Upload your PDF resume and target job requirements. Get deep analytical breakdowns of skill alignments, target keywords, and customized revision comments.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <h3>Automated Interview Prep</h3>
                        <p>Generate precise technical questions and behavioral scenarios personalized to your project history and job profile. Includes model answers and guides.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <h3>ATS PDF Resume Download</h3>
                        <p>Instantly generate a beautifully formatted, highly professional, ATS-optimized resume. Download the clean PDF version ready for submissions.</p>
                    </div>
                </div>
            </section>

            {/* Indian Context Highlight */}
            <section className="indian-market-section">
                <div className="market-card">
                    <div className="market-text">
                        <span className="sub-badge">🇮🇳 Customized for Indian Aspirants</span>
                        <h2>Cracking Indian Tech Hiring Standards</h2>
                        <p>
                          From services companies (TCS, Infosys, Wipro) to elite product companies (Zomato, Swiggy, Paytm) and MNC hubs in Bengaluru, Pune, Hyderabad, and Gurgaon — our AI understands exactly what Indian hiring managers are searching for on profiles.
                        </p>
                        <div className="stats-row">
                            <div className="stat-box">
                                <h3>85%</h3>
                                <p>ATS Pass Rate</p>
                            </div>
                            <div className="stat-box">
                                <h3>3x</h3>
                                <p>More Shortlists</p>
                            </div>
                            <div className="stat-box">
                                <h3>₹0</h3>
                                <p>Free Forever</p>
                            </div>
                        </div>
                    </div>
                    <div className="market-logo-cloud">
                        <div className="cloud-title">Optimized for Profiles Applying to:</div>
                        <div className="logo-grid">
                            <div className="logo-placeholder">Bengaluru Hubs</div>
                            <div className="logo-placeholder">Gurgaon Tech</div>
                            <div className="logo-placeholder">Pune Offshores</div>
                            <div className="logo-placeholder">Mumbai FinTech</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Frequently Asked Questions Section */}
            <section id="faq" className="faq-section" style={{
                maxWidth: '1200px',
                margin: '0 auto 6rem',
                padding: '0 2rem',
                width: '100%'
            }}>
                <div className="section-header" style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px' }}>
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <p style={{ color: 'rgba(255, 255, 255, 0.65)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
                        Quick answers to understand how InterviewIntel helps you conquer your preparation.
                    </p>
                </div>

                <div className="faq-list" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <FAQItem 
                        question="Is InterviewIntel completely free to use?" 
                        answer="Yes! InterviewIntel is 100% free with open access for all aspirants. We have no hidden costs, locked premium tiers, or monthly subscription paywalls. Our mission is to empower college graduates and software developers in India to conquer technical recruitment."
                    />
                    <FAQItem 
                        question="How does the AI Resume Analyzer compute the ATS score?" 
                        answer="Our analysis engine compares the structural text nodes and keyword density of your uploaded resume directly against the target Job Description. It highlights matching strengths and maps missing keyword gaps commonly filtered out by corporate ATS parsers in companies like TCS, Infosys, and high-growth product startups."
                    />
                    <FAQItem 
                        question="What companies or regions are supported in India?" 
                        answer="The custom technical and behavioral questions are generated dynamically to match hiring criteria across top tech hubs, including Bengaluru, Pune, Gurgaon, and Hyderabad. They prepare you for services companies, product startups (Flipkart, Swiggy, Paytm), and global developer hubs."
                    />
                    <FAQItem 
                        question="How do I get the ATS-optimized resume PDF?" 
                        answer="Once our AI scans your skills and generates the interview preparation report, you can click the 'Download Resume' button. The platform compiles a dynamically generated, highly polished, ATS-optimized resume ready for applications."
                    />
                </div>
            </section>

            {/* Call To Action */}
            <section className="cta-banner-section">
                <div className="cta-banner">
                    <h2>Master Your Next Technical Rounds</h2>
                    <p>Stop sending generic resumes. Let InterviewIntel build your personalized AI strategy blueprint in under 30 seconds for absolutely free.</p>
                    <Link to="/register" className="btn-cta">
                        Start Preparing Now
                        <span className="btn-spark">⚡</span>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default LandingView
