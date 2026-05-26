import React from 'react'
import './SuccessModal.scss'

const SuccessModal = () => {
    return (
        <div className="success-modal-overlay">
            <div className="success-modal-container">
                {/* Animated checkmark circle */}
                <div className="success-checkmark-wrapper">
                    <div className="checkmark-circle">
                        <svg className="checkmark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark-circle-outline" cx="26" cy="26" r="25" fill="none"/>
                            <path className="checkmark-kick" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                </div>

                <h2>Analysis Successful!</h2>
                <p>We've successfully generated your custom interview preparation report and tailored ATS metrics.</p>

                <div className="success-redirect-loader">
                    <span>Opening report...</span>
                    <span className="tiny-spinner"></span>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal
