// src/Service/AIModel.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";
import JSON5 from 'json5';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined in the .env file");
}

const genAI = new GoogleGenerativeAI(apiKey);

export default async function main(prompt) {
  console.log("FINAL JSON5 CODE IS RUNNING!");

  try {
    // --- FIX IS HERE ---
    // Changed "gemini-pro" to "gemini-1.5-flash" to fix the 404 error
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    console.log("AI Raw Response:", rawText);

    // This regex correctly extracts the JSON content from markdown code blocks
    const match = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const jsonStringToParse = match && match[1] ? match[1] : rawText;

    try {
      // JSON5 is used for more robust parsing
      return JSON5.parse(jsonStringToParse);
    } catch (parseError) {
      console.error("⚠️ AI response was not valid JSON (even with JSON5):", parseError);
      // Return a structured error object
      return { error: "AI response could not be parsed as JSON.", raw: rawText };
    }

  } catch (apiError) {
    console.error("Error while generating content from AI:", apiError);
    
    const errorMessage = apiError.message || "An unknown API error occurred.";
    return { 
      error: `Failed to generate content from AI: ${errorMessage}`,
      // Optionally include status if available, for debugging network issues
      status: apiError.status || null 
    };
  }
}