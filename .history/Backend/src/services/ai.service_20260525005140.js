const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod")
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


async function invokeGeminiAI(){

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: "Hello gemini ! Explain what is Interview ?"
    })

    console.log(response.text)
}

module.exports = invokeGeminiAI