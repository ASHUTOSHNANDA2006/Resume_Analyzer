import React from 'react'

const Home = () => {
  return (
    <main classname = 'home'>
        <div className = "left">
            <textArea name="jobDescription" id = "jobDescription" placeholder ="Enter job description here....."></textArea>
        </div>
        <div className="right">
            <div className="input-group">
                <label htmlFor = "resume">Upload Resume</label>
                <input type="file" name="resume" id = "resume" accept=".pdf"/>
            </div>
            <div className="input-group">
                <label htmlFor = "selfDescription">Self Description</label>
                <textArea name="selfDescription" id = "selfDescription" placeholder ="Describe yourself in a few sentences....."></textArea>
            </div>
        </div>
    </main>
  )
}

export default Home