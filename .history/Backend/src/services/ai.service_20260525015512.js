const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")




const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("The overall match score between the candidate and the job describe, calculated based on various factors such as skills, experience, etc. on a scale of 0 to 100, where 100 indicates a perfect match."),
    atsScore: z.number().min(0).max(100).describe("The ATS score of the candidate's resume, which indicates how well the resume is optimized for Applicant Tracking Systems used by employers to screen resumes. The score is calculated based on factors such as keyword usage, formatting, and relevance to the job describe, on a scale of 0 to 100, where 100 indicates a highly optimized resume for ATS."),
    technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical question can be asked in the interview"),
    intention: z.string().describe("The intention of interviewer behind asking this question in the interview"),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("A list of technical questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them."),
    behavioralQuestions: z.array(z.object({
    question: z.string().describe("The behavioral question can be asked in the interview"),
    intention: z.string().describe("The intention of interviewer behind asking this question in the interview"),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("A list of behavioral questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them."),
    skillGaps: z.array(z.object({
    skill: z.string().describe("The skill in which the candidate is lacking"),
    severity: z.enum(['Low', 'Medium', 'High']).describe("The severity of the skill gap, whether it is low, medium or high")
    })).describe("A list of skill gaps in the candidate's profile along with the severity of each skill gap."),
    preparationPlan: z.array(z.object({
    day: z.number().describe("The day number in the preparation plan, starting from 1 realistically."),
    focus: z.string().describe("The main focus of this day int the preparation plan, e.g. Data Structures, System Design, mock interviews etc."),
    tasks: z.array(z.string()).describe("List of tasks to be completed on this day to follow the preparation plan completed realistically, e.g. read a specific book, solve a set of problems, watch a set of videos etc.")
    })).describe("A day-wise preparation plan for the candidate to prepare for the interview, with specific focus and tasks for each day so that they can prepare effectively and realistaically.")
})


async function generateInterviewReport({resume,selfDescription,jobDescription}) {
    
    const prompt = `Genrate an interview report for a candidate based on the following information:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}
                `
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
   });

    const parsed = JSON.parse(response.text);

    return parsed



}

module.exports = generateInterviewReport