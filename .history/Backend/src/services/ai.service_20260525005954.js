const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")




const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({
    question: z.string().description("The technical question can be asked in the interview"),
    intention: z.string().description("The intention of interviewer behind asking this question in the interview"),
    answer: z.string().description("How to answer this question, what points to cover, what approach to take etc.")
    })),
    behavioralQuestions: z.array(z.object({
    question: z.string().description("The behavioral question can be asked in the interview"),
    intention: z.string().description("The intention of interviewer behind asking this question in the interview"),
    
})


async function generateInterviewReport({resume,selfDescription,jobDescription}) {
    



}

module.exports = invokeGeminiAI