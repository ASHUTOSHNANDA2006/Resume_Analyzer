const { GoogleGenAI, Type } = require("@google/genai");
const { title } = require("node:process");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// Define the schema natively using the SDK's Type enum to guarantee compatibility
const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.NUMBER,
            description: "The overall match score between the candidate and the job description, calculated based on various factors such as skills, experience, etc. on a scale of 0 to 100."
        },
        atsScore: {
            type: Type.NUMBER,
            description: "The ATS score of the candidate's resume, indicating how well it is optimized for ATS. Scale of 0 to 100."
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "A list of technical questions that can be asked in the interview.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical question to be asked" },
                    intention: { type: Type.STRING, description: "The intention of the interviewer behind this question" },
                    answer: { type: Type.STRING, description: "How to answer this question, points to cover, approach to take" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "A list of behavioral questions that can be asked in the interview.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioral question to be asked" },
                    intention: { type: Type.STRING, description: "The intention of the interviewer behind this question" },
                    answer: { type: Type.STRING, description: "How to answer this question, points to cover, approach to take" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "A list of skill gaps in the candidate's profile.",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The skill in which the candidate is lacking" },
                    severity: { 
                        type: Type.STRING, 
                        enum: ["Low", "Medium", "High"], 
                        description: "The severity of the skill gap" 
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-wise preparation plan for the candidate.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "The day number in the preparation plan, starting from 1" },
                    focus: { type: Type.STRING, description: "The main focus of this day (e.g., Data Structures, System Design)" },
                    tasks: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "List of tasks to be completed on this day"
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title
    },
    // Ensure the model returns every top-level key
    required: ["matchScore", "atsScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
};

async function generateInterviewReport({resume, selfDescription, jobDescription}) {
    const prompt = `Generate an interview report for a candidate based on the following information:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema 
        }
   });

    try {
        const reportData = JSON.parse(response.text);
        return reportData;
    } catch (error) {
        console.error("Failed to parse Gemini response. Raw output:", response.text);
        throw error;
    }
}

module.exports = generateInterviewReport;