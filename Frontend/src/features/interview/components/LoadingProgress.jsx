import React, { useState, useEffect } from 'react'
import './LoadingProgress.scss'

const CAREER_TIPS = [
    "💡 Tip: ATS systems scan for exact matches of skills like 'React' or 'TypeScript'. Always align your spelling with the job description.",
    "💡 Tip: Instead of just listing projects, state the business outcome. E.g., 'Implemented React dashboard that boosted user engagement by 20%.'",
    "💡 Tip: Behavioral interview rounds in India heavily focus on the STAR method (Situation, Task, Action, Result). State them clearly.",
    "💡 Tip: Prepare 2-3 specific questions for the interviewer at the end of the round. It shows intense interest and prep work.",
    "💡 Tip: The Indian job market highly values structured DSA problem-solving alongside system design. Don't skip practicing coding rounds!"
];

const MILESTONES = [
    { text: "Uploading resume securely...", time: 0 },
    { text: "Parsing resume structure and key skills...", time: 4000 },
    { text: "Comparing profiles against job requirements...", time: 9000 },
    { text: "Computing ATS similarity and matching metrics...", time: 15000 },
    { text: "Synthesizing custom technical questions...", time: 20000 },
    { text: "Drafting optimized preparation roadmap...", time: 25000 }
];

const LoadingProgress = () => {
    const [tipIndex, setTipIndex] = useState(0)
    const [currentMilestone, setCurrentMilestone] = useState(MILESTONES[0].text)

    useEffect(() => {
        // Interchanges career tips every 6 seconds
        const tipInterval = setInterval(() => {
            setTipIndex((prevIndex) => (prevIndex + 1) % CAREER_TIPS.length)
        }, 6000)

        // Simulates progress milestones to keep user informed and engaged
        const milestonesTimers = MILESTONES.map(milestone => {
            return setTimeout(() => {
                setCurrentMilestone(milestone.text)
            }, milestone.time)
        })

        return () => {
            clearInterval(tipInterval)
            milestonesTimers.forEach(clearTimeout)
        }
    }, [])

    return (
        <div className="loading-progress-overlay">
            <div className="loading-progress-container">
                {/* AI brain pulse indicator */}
                <div className="brain-pulse-wrapper">
                    <div className="brain-pulse-ring ring-1"></div>
                    <div className="brain-pulse-ring ring-2"></div>
                    <div className="brain-icon">🧠</div>
                </div>

                <h2>Generating Your Custom Strategy</h2>
                <p className="loading-subtitle">
                    Analyzing your resume & matching with target job description. This usually takes ~30 seconds.
                </p>

                {/* Milestone tracking ticker */}
                <div className="milestone-status">
                    <span className="milestone-indicator">⚡</span>
                    <span className="milestone-text">{currentMilestone}</span>
                </div>

                {/* Micro loading progress bar */}
                <div className="loader-bar-wrapper">
                    <div className="loader-bar-fill"></div>
                </div>

                {/* Career tips carousel */}
                <div className="tip-box">
                    <p className="tip-content">{CAREER_TIPS[tipIndex]}</p>
                </div>
            </div>
        </div>
    )
}

export default LoadingProgress
