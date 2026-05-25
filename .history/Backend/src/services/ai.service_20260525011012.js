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
    tasks: z.array(z.string()).description("List of tasks to be completed on this day to follow the preparation plan completed , e.g. read a specific book, solve a set of problems, watch a set of videos etc.")
    })).description("A day-wise preparation plan for the candidate to prepare for the interview, with specific focus and tasks for each day so that they can prepare effectively and realistaically.")
})


async function generateInterviewReport({resume,selfDescription,jobDescription}) {
    



}

module.exports = invokeGeminiAI