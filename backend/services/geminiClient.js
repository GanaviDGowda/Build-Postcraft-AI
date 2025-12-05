// services/geminiClient.js
// Gemini AI Service - Handles all text generation via Google Gemini 1.5 Flash
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_ID = "gemini-1.5-flash";

if (!GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is missing. Text generation will fail until it is set.");
}

// Initialize Gemini client
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: MODEL_ID }) : null;

async function generateText(prompt) {
  if (!model) {
    throw new Error("Gemini client not configured (missing GEMINI_API_KEY).");
  }
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("❌ Gemini Error:", err);
    throw err;
  }
}

module.exports = { generateText };