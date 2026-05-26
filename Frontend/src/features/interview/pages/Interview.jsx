import { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const AnimatedScore = ({ value, label, scoreColor }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let start = 0
        const end = value || 0
        if (end === 0) return
        const duration = 1200 // 1.2 seconds animation
        const increment = end / (duration / 16) // ~60fps

        const timer = setInterval(() => {
            start += increment
            if (start >= end) {
                setCount(end)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)

        return () => clearInterval(timer)
    }, [value])

    const getSubInfo = () => {
        const score = value || 0
        if (label === "Match Score") {
            if (score >= 80) return { text: "Excellent match for this role", class: "high" }
            if (score >= 60) return { text: "Strong match for this role", class: "mid" }
            if (score >= 40) return { text: "Moderate match - alignment needed", class: "mid" }
            return { text: "Weak match - significant alignment needed", class: "low" }
        } else {
            // ATS Score
            if (score >= 80) return { text: "Highly optimized for ATS systems", class: "high" }
            if (score >= 60) return { text: "Well optimized - standard resume format", class: "mid" }
            if (score >= 40) return { text: "Needs moderate resume optimization", class: "mid" }
            return { text: "Critical resume optimization required", class: "low" }
        }
    }

    const subInfo = getSubInfo()

    return (
        <div className="match-score">
            <p className="match-score__label">{label}</p>
            <div className={`match-score__ring ${scoreColor}`}>
                <span className="match-score__value">{count}</span>
            </div>
            <p className={`match-score__sub match-score__sub--${subInfo.class}`}>
                {subInfo.text}
            </p>
        </div>
    )
}

const RoadMapDay = ({ day, completedTasks, toggleTask }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => {
                const key = `${day.day}-${i}`
                const isCompleted = !!completedTasks[key]
                return (
                    <li 
                        key={i} 
                        onClick={() => toggleTask(day.day, i)}
                        className={`roadmap-task-item ${isCompleted ? 'completed' : ''}`}
                        style={{ 
                            cursor: 'pointer', 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.6rem 0.85rem',
                            borderRadius: '0.5rem',
                            background: isCompleted ? 'rgba(39, 201, 63, 0.04)' : 'transparent',
                            border: isCompleted ? '1px solid rgba(39, 201, 63, 0.15)' : '1px solid transparent',
                            textDecoration: isCompleted ? 'line-through' : 'none', 
                            opacity: isCompleted ? 0.5 : 1,
                            transition: 'all 0.25s ease'
                        }}
                    >
                        <span 
                            className={`roadmap-day__bullet ${isCompleted ? 'completed' : ''}`} 
                            style={{ 
                                flexShrink: 0,
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: isCompleted ? '#27c93f' : '#e1034d', 
                                boxShadow: isCompleted ? '0 0 10px #27c93f' : 'none',
                                transition: 'all 0.25s ease'
                            }} 
                        />
                        <span style={{ fontSize: '0.92rem', lineHeight: '1.4' }}>{task}</span>
                    </li>
                )
            })}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    
    // Premium Local States
    const [isDownloading, setIsDownloading] = useState(false)
    const [completedTasks, setCompletedTasks] = useState({})
    const [hoveredSeverity, setHoveredSeverity] = useState(null)

    const handleDownloadPdf = async () => {
        setIsDownloading(true)
        try {
            await getResumePdf(interviewId)
        } catch (err) {
            console.error(err)
        } finally {
            setIsDownloading(false)
        }
    }

    const toggleTask = (dayNumber, taskIndex) => {
        const key = `${dayNumber}-${taskIndex}`
        setCompletedTasks(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    if (loading || !report) {
        return (
            <div className="app-layout-wrapper">
                <Navbar />
                <main className='loading-screen'>
                    <h1>Loading your interview plan...</h1>
                </main>
                <Footer />
            </div>
        )
    }

    // Determine colors for both scores
    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

    const atsScoreColor =
        report.atsScore >= 80 ? 'score--high' :
            report.atsScore >= 60 ? 'score--mid' : 'score--low'

    return (
        <div className="app-layout-wrapper">
            <Navbar />
            <div className='interview-page'>
                <div className='interview-layout'>

                    {/* ── Left Nav ── */}
                    <nav className='interview-nav'>
                        <div className="nav-content">
                            <p className='interview-nav__label'>Sections</p>
                            {NAV_ITEMS.map(item => (
                                <button
                                    key={item.id}
                                    className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                    onClick={() => setActiveNav(item.id)}
                                >
                                    <span className='interview-nav__icon'>{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleDownloadPdf}
                            disabled={isDownloading}
                            className={`button primary-button download-pdf-btn ${isDownloading ? 'downloading' : ''}`}
                        >
                            {isDownloading ? (
                                <>
                                    <span className="spinner tiny-spinner" style={{
                                        display: 'inline-block',
                                        width: '12px',
                                        height: '12px',
                                        marginRight: '0.5rem',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderRadius: '50%',
                                        borderTopColor: '#white',
                                        animation: 'spin 0.8s linear infinite'
                                    }}></span>
                                    Compiling PDF...
                                </>
                            ) : (
                                <>
                                    <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                                    Download Resume
                                </>
                            )}
                        </button>
                    </nav>

                    <div className='interview-divider' />

                    {/* ── Center Content ── */}
                    <main className='interview-content'>
                        {activeNav === 'technical' && (
                            <section>
                                <div className='content-header'>
                                    <h2>Technical Questions</h2>
                                    <span className='content-header__count'>{report.technicalQuestions.length} questions</span>
                                </div>
                                <div className='q-list'>
                                    {report.technicalQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'behavioral' && (
                            <section>
                                <div className='content-header'>
                                    <h2>Behavioral Questions</h2>
                                    <span className='content-header__count'>{report.behavioralQuestions.length} questions</span>
                                </div>
                                <div className='q-list'>
                                    {report.behavioralQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'roadmap' && (
                            <section>
                                <div className='content-header'>
                                    <h2>Preparation Road Map</h2>
                                    <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
                                </div>
                                <div className='roadmap-list'>
                                    {report.preparationPlan.map((day) => (
                                        <RoadMapDay 
                                            key={day.day} 
                                            day={day} 
                                            completedTasks={completedTasks}
                                            toggleTask={toggleTask}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    <div className='interview-divider' />

                    {/* ── Right Sidebar ── */}
                    <aside className='interview-sidebar'>

                        {/* Match Score */}
                        <AnimatedScore 
                            value={report.matchScore} 
                            label="Match Score" 
                            scoreColor={scoreColor} 
                        />

                        <div className='sidebar-divider' />

                        {/* ATS Score */}
                        <AnimatedScore 
                            value={report.atsScore} 
                            label="ATS Score" 
                            scoreColor={atsScoreColor} 
                        />

                        <div className='sidebar-divider' />

                        {/* Skill Gaps */}
                        <div className='skill-gaps'>
                            <p className='skill-gaps__label'>Skill Gaps</p>
                            
                            {/* Interactive Severity Legend */}
                            <div className='skill-gaps__legend'>
                                <span 
                                    className='legend-item legend-item--high' 
                                    title='Critical gap - high impact on matching. Hover to highlight.'
                                    onMouseEnter={() => setHoveredSeverity('High')}
                                    onMouseLeave={() => setHoveredSeverity(null)}
                                >
                                    <span className='legend-dot'>🔥</span> Critical
                                </span>
                                <span 
                                    className='legend-item legend-item--medium' 
                                    title='Important gap - medium impact on matching. Hover to highlight.'
                                    onMouseEnter={() => setHoveredSeverity('Medium')}
                                    onMouseLeave={() => setHoveredSeverity(null)}
                                >
                                    <span className='legend-dot'>⚠️</span> Important
                                </span>
                                <span 
                                    className='legend-item legend-item--low' 
                                    title='Minor gap - good to have elective. Hover to highlight.'
                                    onMouseEnter={() => setHoveredSeverity('Low')}
                                    onMouseLeave={() => setHoveredSeverity(null)}
                                >
                                    <span className='legend-dot'>🟢</span> Elective
                                </span>
                            </div>

                            <div className='skill-gaps__list'>
                                {report.skillGaps.map((gap, i) => {
                                    const isDimmed = hoveredSeverity && gap.severity !== hoveredSeverity
                                    return (
                                        <span 
                                            key={i} 
                                            className={`skill-tag skill-tag--${gap.severity.toLowerCase()}`}
                                            style={{ 
                                                opacity: isDimmed ? 0.22 : 1, 
                                                transform: isDimmed ? 'scale(0.94)' : 'scale(1)',
                                                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                        >
                                            {gap.skill}
                                            {gap.severity === 'High' && ' 🔥' }
                                            {gap.severity === 'Medium' && ' ⚠️'}
                                            {gap.severity === 'Low' && ' 🟢'}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Interview