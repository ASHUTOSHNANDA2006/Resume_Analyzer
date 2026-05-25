const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")




const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).description("The overall match score between the candidate and the job description, calculated based on various factors such as skills, experience, etc. on a scale of 0 to 100, where 100 indicates a perfect match."),
    atsScore: z.number().min(0).max(100).description("The ATS score of the candidate's resume, which indicates how well the resume is optimized for Applicant Tracking Systems used by employers to screen resumes. The score is calculated based on factors such as keyword usage, formatting, and relevance to the job description, on a scale of 0 to 100, where 100 indicates a highly optimized resume for ATS."),
    technicalQuestions: z.array(z.object({
    question: z.string().description("The technical question can be asked in the interview"),
    intention: z.string().description("The intention of interviewer behind asking this question in the interview"),
    answer: z.string().description("How to answer this question, what points to cover, what approach to take etc.")
    })).description("A list of technical questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them."),
    behavioralQuestions: z.array(z.object({
    question: z.string().description("The behavioral question can be asked in the interview"),
    intention: z.string().description("The intention of interviewer behind asking this question in the interview"),
    answer: z.string().description("How to answer this question, what points to cover, what approach to take etc.")
    })).description("A list of behavioral questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them."),
    skillGaps: z.array(z.object({
    skill: z.string().description("The skill in which the candidate is lacking"),
    severity: z.enum(['Low', 'Medium', 'High']).description("The severity of the skill gap, whether it is low, medium or high")
    })).description("A list of skill gaps in the candidate's profile along with the severity of each skill gap."),
    preparationPlan: z.array(z.object({
    day: z.number().description("The day number in the preparation plan, starting from 1 realistically."),
    focus: z.string().description("The main focus of this day int the preparation plan, e.g. Data Structures, System Design, mock interviews etc."),
    tasks: z.array(z.string()).description("List of tasks to be completed on this day to follow the preparation plan completed realistically, e.g. read a specific book, solve a set of problems, watch a set of videos etc.")
    })).description("A day-wise preparation plan for the candidate to prepare for the interview, with specific focus and tasks for each day so that they can prepare effectively and realistaically.")
})


async function generateInterviewReport({resume,selfDescription,jobDescription}) {
    
    const prompt = `Gne`
    
    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents:"",
        config:{
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    })



}

module.exports = invokeGeminiAI