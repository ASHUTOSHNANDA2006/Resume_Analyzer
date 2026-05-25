require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function checkModels() {
    console.log("Fetching available models for your API key...");
    try {
        const response = await ai.models.list();
        
        console.log("\n--- EXACT MODEL STRINGS TO USE ---");
        for await (const model of response) {
            // Only print models that support text/content generation
            if (model.supportedGenerationMethods.includes("generateContent")) {
                // Remove the 'models/' prefix to get the exact string you need
                console.log(model.name.replace('models/', '')); 
            }
        }
        console.log("----------------------------------");
    } catch (error) {
        console.error("Failed to fetch models:", error);
    }
}

checkModels();