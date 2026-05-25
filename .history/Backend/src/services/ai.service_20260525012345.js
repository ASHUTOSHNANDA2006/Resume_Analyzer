const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")




const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).("The overall match score between the candidate and the job , calculated based on various factors such as skills, experience, etc. on a scale of 0 to 100, where 100 indicates a perfect match."),
    atsScore: z.number().min(0).max(100).("The ATS score of the candidate's resume, which indicates how well the resume is optimized for Applicant Tracking Systems used by employers to screen resumes. The score is calculated based on factors such as keyword usage, formatting, and relevance to the job , on a scale of 0 to 100, where 100 indicates a highly optimized resume for ATS."),
    technicalQuestions: z.array(z.object({
    question: z.string().("The technical question can be asked in the interview"),
    intention: z.string().("The intention of interviewer behind asking this question in the interview"),
    answer: z.string().("How to answer this question, what points to cover, what approach to take etc.")
    })).("A list of technical questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them."),
    behavioralQuestions: z.array(z.object({
    question: z.string().("The behavioral question can be asked in the interview"),
    intention: z.string().("The intention of interviewer behind asking this question in the interview"),
    answer: z.string().("How to answer this question, what points to cover, what approach to take etc.")
    })).("A list of behavioral questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them."),
    skillGaps: z.array(z.object({
    skill: z.string().("The skill in which the candidate is lacking"),
    severity: z.enum(['Low', 'Medium', 'High']).("The severity of the skill gap, whether it is low, medium or high")
    })).("A list of skill gaps in the candidate's profile along with the severity of each skill gap."),
    preparationPlan: z.array(z.object({
    day: z.number().("The day number in the preparation plan, starting from 1 realistically."),
    focus: z.string().("The main focus of this day int the preparation plan, e.g. Data Structures, System Design, mock interviews etc."),
    tasks: z.array(z.string()).("List of tasks to be completed on this day to follow the preparation plan completed realistically, e.g. read a specific book, solve a set of problems, watch a set of videos etc.")
    })).("A day-wise preparation plan for the candidate to prepare for the interview, with specific focus and tasks for each day so that they can prepare effectively and realistaically.")
})


async function generateInterviewReport({resume,self,job}) {
    
    const prompt = `Genrate an interview report for a candidate based on the following information:
                    Resume: ${resume}
                    Self : ${self}
                    Job : ${job}
                `
    
    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents:prompt,
        config:{
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    })

    console.log(JSON.parse(response.text))



}

module.exports = generateInterviewReport