import { GoogleGenerativeAI } from "@google/generative-ai";
import JSON5 from 'json5'; // ✅ Nayi library import ki gayi

// Environment variable se API key aana
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Agar key nahi hai toh error dena
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY .env file mein nahi hai");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Main function jo AI se content generate karega
async function main(prompt) {
  // ✅ Ab console mein yeh message aana chahiye
  console.log("FINAL JSON5 CODE IS RUNNING!"); 

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    console.log("AI Raw Response:", rawText);

    // Step 1: AI ke response se ```json wala block nikalo
    const match = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    
    let jsonStringToParse;

    if (match && match[1]) {
      jsonStringToParse = match[1];
    } else {
      jsonStringToParse = rawText;
    }

    // Step 2: Ab JSON.parse ki jagah JSON5.parse ka istemal karo
    // Yeh comments, extra commas, sab kuch apne aap handle kar lega.
    try {
      return JSON5.parse(jsonStringToParse);
    } catch (err) {
      console.error("⚠️ AI ka response valid JSON nahi hai (JSON5 se bhi fail ho gaya):", err);
      return { error: "AI response could not be parsed as JSON.", raw: rawText };
    }

  } catch (err) {
    console.error("AI se content generate karte waqt error:", err);
    return { error: err.message };
  }
}

export default main;