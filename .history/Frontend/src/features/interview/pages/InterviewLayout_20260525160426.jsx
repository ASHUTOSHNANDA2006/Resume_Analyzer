import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from './Home'

const InterviewLayout = () => {
  return (
    <div className="interview-layout">
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default InterviewLayout
