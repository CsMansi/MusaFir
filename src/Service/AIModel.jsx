import { GoogleGenAI } from "@google/genai";

// ✅ Ensure API key is properly read from .env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// ❌ Throw error if key missing
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not set in .env");
}

// Initialize GoogleGenAI client
const ai = new GoogleGenAI({ apiKey });

async function main(Prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [Prompt], // ✅ contents should be an array
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // disables thinking
        },
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });

    // ✅ Gemini v2+ returns response in choices array
    return response?.choices?.[0]?.content?.[0]?.text || "";
  } catch (err) {
    console.error("AI generation error:", err);
    return `Error: ${err.message}`;
  }
}

export default main;
