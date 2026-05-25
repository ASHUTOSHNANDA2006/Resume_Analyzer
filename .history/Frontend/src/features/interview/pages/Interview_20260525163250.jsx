import React, { useState } from 'react'
import '../style/interview.scss'

const Interview = () => {
  // Sample data - will be replaced with API call
  const reportData = {
    matchScore: 92,
    atsScore: 95,
    technicalQuestions: [
      {
        question: "Can you explain the concept of React Hooks?",
        intention: "To assess the candidate's understanding of modern React state management.",
        answer: "Explain that React Hooks allow functional components to use state and other React features..."
      }
    ],
    behavioralQuestions: [
      {
        question: "Tell me about a time you collaborated with a team...",
        intention: "To assess the candidate's teamwork and communication skills.",
        answer: "Use the STAR method..."
      }
    ],
    skillGaps: [
      { skill: "redis", severity: "High" },
      { skill: "Message queue", severity: "Medium" },
      { skill: "Event loop", severity: "High" }
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "React Fundamentals & Advanced Hooks",
        tasks: ["Review React component lifecycle", "Deep dive into useState, useEffect"]
      }
    ]
  }

  const [activeTab, setActiveTab] = useState('technical')
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'high'
      case 'Medium':
        return 'medium'
      case 'Low':
        return 'low'
      default:
        return 'medium'
    }
  }

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