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


const interviewReportSchema = new mongoose.Schema()