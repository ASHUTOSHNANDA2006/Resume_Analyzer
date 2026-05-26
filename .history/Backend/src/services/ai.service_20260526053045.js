const { GoogleGenAI, Type } = require("@google/genai");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// ── SCHEMAS ──
const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: { type: Type.NUMBER, description: "The overall match score between the candidate and the job description, calculated based on various factors such as skills, experience, etc. on a scale of 0 to 100." },
        atsScore: { type: Type.NUMBER, description: "The ATS score of the candidate's resume, indicating how well it is optimized for ATS. Scale of 0 to 100." },
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
        title: { type: Type.STRING, description: "The title of the job for which the interview report is generated." }
    },
    required: ["matchScore", "atsScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
};

const resumePdfSchema = {
    type: Type.OBJECT,
    properties: {
        html: { type: Type.STRING, description: "The HTML content of the resume which can be converted to PDF using any library like puppeteer" }
    },
    required: ["html"]
};

// ── SERVICES ──

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

    return JSON.parse(response.text);
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
        format: "A4", 
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    });

    await browser.close();
    return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate a highly optimized, ATS-friendly resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        The response should be a JSON object with a single field "html" which contains the HTML content of the resume.
                        The resume should be tailored for the given job description and highlight the candidate's strengths and relevant experience. 
                        The HTML content should be well-formatted, structured, and visually appealing using inline CSS.
                        The content must not sound AI-generated. Make it as close as possible to a real human-written resume.
                        You can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        It should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: resumePdfSchema
        }
    });

    const jsonContent = JSON.parse(response.text);
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

    return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };