
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // Here, we rely on the environment providing the key.
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

// We only initialize if the key exists.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generateText = async (prompt: string): Promise<string> => {
  if (!ai) {
    return "AI service is not configured. Please set the API_KEY environment variable.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an assistant for a teacher. Your goal is to provide helpful, concise, and classroom-appropriate content. This could include lesson plan ideas, summaries of topics, quiz questions, or positive feedback for students.",
        temperature: 0.7,
        topP: 0.9,
      }
    });

    if (response.text) {
      return response.text;
    }
    
    return "No content generated. The response was empty.";

  } catch (error) {
    console.error("Error generating text with Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while contacting the AI service: ${error.message}`;
    }
    return "An unknown error occurred while contacting the AI service.";
  }
};
