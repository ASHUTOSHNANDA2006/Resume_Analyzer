require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function checkModels() {
    console.log("Fetching available models for your API key...");
    try {
        const response = await ai.models.list();
        
        console.log("\n--- EXACT MODEL STRINGS ---");
        for await (const model of response) {
            // Just print the name, no complex filtering to crash on
            if (model.name) {
                console.log(model.name.replace('models/', '')); 
            }
        }
        console.log("---------------------------");
    } catch (error) {
        console.error("Failed to fetch models:", error);
    }
}

checkModels();