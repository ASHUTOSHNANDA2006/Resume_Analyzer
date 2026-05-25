const {GoogleGenAI} = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


async function invokeGeminiAI(){

    const response = await ai.models.generateContent({
        
    })
}