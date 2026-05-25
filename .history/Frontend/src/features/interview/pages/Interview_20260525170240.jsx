import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
// import { useInterview } from '../hooks/useInterview.js'
import {  useParams } from 'react-router'

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

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])

    if (loading || !report) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

  return (
    <div className='interview-report-container'>
      <div className="interview-report-layout">
        {/* Left Sidebar */}
        <aside className="report-sidebar left-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Interview Report</h3>
            <nav className="sidebar-nav">
              <button
                className={`nav-item ${activeTab === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveTab('technical')}
              >
                Technical questions
              </button>
              <button
                className={`nav-item ${activeTab === 'behavioral' ? 'active' : ''}`}
                onClick={() => setActiveTab('behavioral')}
              >
                Behavioral questions
              </button>
              <button
                className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`}
                onClick={() => setActiveTab('roadmap')}
              >
                Road Map
              </button>
            </nav>
          </div>

          <div className="sidebar-scores">
            <div className="score-card">
              <p className="score-label">Match Score</p>
              <p className="score-value">{reportData.matchScore}%</p>
            </div>
            <div className="score-card">
              <p className="score-label">ATS Score</p>
              <p className="score-value">{reportData.atsScore}%</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="report-main">
          {activeTab === 'technical' && (
            <div className="content-section">
              <h2 className="content-title">Technical Questions</h2>
              <div className="questions-list">
                {reportData.technicalQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="question-item"
                    onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                  >
                    <div className="question-header">
                      <span className="question-number">{idx + 1}</span>
                      <p className="question-text">{q.question}</p>
                      <span className="expand-icon">{expandedQuestion === idx ? '▼' : '▶'}</span>
                    </div>
                    {expandedQuestion === idx && (
                      <div className="question-details">
                        <div className="detail-section">
                          <h4>Intention</h4>
                          <p>{q.intention}</p>
                        </div>
                        <div className="detail-section">
                          <h4>Expected Answer</h4>
                          <p>{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'behavioral' && (
            <div className="content-section">
              <h2 className="content-title">Behavioral Questions</h2>
              <div className="questions-list">
                {reportData.behavioralQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="question-item"
                    onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                  >
                    <div className="question-header">
                      <span className="question-number">{idx + 1}</span>
                      <p className="question-text">{q.question}</p>
                      <span className="expand-icon">{expandedQuestion === idx ? '▼' : '▶'}</span>
                    </div>
                    {expandedQuestion === idx && (
                      <div className="question-details">
                        <div className="detail-section">
                          <h4>Intention</h4>
                          <p>{q.intention}</p>
                        </div>
                        <div className="detail-section">
                          <h4>Expected Answer</h4>
                          <p>{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="content-section">
              <h2 className="content-title">7-Day Preparation Plan</h2>
              <div className="roadmap-list">
                {reportData.preparationPlan.map((plan, idx) => (
                  <div
                    key={idx}
                    className="roadmap-item"
                    onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                  >
                    <div className="roadmap-header">
                      <span className="day-badge">Day {plan.day}</span>
                      <p className="roadmap-focus">{plan.focus}</p>
                      <span className="expand-icon">{expandedQuestion === idx ? '▼' : '▶'}</span>
                    </div>
                    {expandedQuestion === idx && (
                      <div className="roadmap-details">
                        <ul className="tasks-list">
                          {plan.tasks.map((task, taskIdx) => (
                            <li key={taskIdx}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="report-sidebar right-sidebar">
          <div className="skill-gaps-section">
            <h3 className="sidebar-title">Skill Gaps</h3>
            <div className="skill-tags">
              {reportData.skillGaps.map((gap, idx) => (
                <span
                  key={idx}
                  className={`skill-tag ${getSeverityColor(gap.severity)}`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Interview