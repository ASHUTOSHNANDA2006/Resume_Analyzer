const mongoose = require('mongoose');


/**
 * - job description schema : String
 * - resume text : String
 * - self description : String
 * - 
 * 
 * - Match Score : Number
 * - Technical Questions : array [{question : string, intention: string, answer : string}]
 * - Behavioral Questions : array [{question : string, intention: string, answer : string}]
 * - Skill Gaps : array [{skill : string, severity : {String, enum : ['Low', 'Medium', 'High']}}]
 * - Prepaparation Plan : array [{day: number, focus: string, tasks: [String]}]
 */


const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type: String,
        required: [true, 'Technical question is required']
    },
    intention : {
        type: String,
        required: [true, 'Intention is required']
    },
    answer : {
        type: String,
        required: [true, 'Answer is required']
    }
}, { 
    _id: false 
})

const behavioralQuestionSchema = new mongoose.Schema({
    question : {
        type: String,
        required: [true, 'Technical question is required']
    },
    intention : {
        type: String,
        required: [true, 'Intention is required']
    },
    answer : {
        type: String,
        required: [true, 'Answer is required']
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema()


const interviewReportSchema = new mongoose.Schema({

    jobDescription: {
        type: String,
        required: [true, 'Job description is required'],
    },
    resume: {
        type : String,
    },

    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    }, 
})