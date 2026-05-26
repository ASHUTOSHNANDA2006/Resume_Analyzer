import React from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import './Toast.scss'

const Toast = () => {
    const { toast } = useAuth()

    if (!toast) return null

    return (
        <div className={`toast-notification-container ${toast.type}`}>
            <div className="toast-card">
                <div className="toast-icon">
                    {toast.type === 'success' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    )}
                </div>
                <span className="toast-message">{toast.message}</span>
            </div>
        </div>
    )
}

export default Toast
