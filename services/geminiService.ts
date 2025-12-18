
import { GoogleGenAI, Type } from "@google/genai";
import { Drama, RecommendationRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getDramaSummary(title: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a captivating 2-sentence summary and a "Why you should watch" hook for the K-Drama titled "${title}". Keep it enthusiastic and fan-friendly.`,
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not fetch AI summary at this time.";
  }
}

export async function getRecommendations(req: RecommendationRequest): Promise<string> {
  try {
    const prompt = `Act as a veteran K-Drama expert. Suggest 3 K-dramas for someone who is feeling ${req.mood}, loves the genre ${req.favoriteGenre}, and specifically wants: ${req.extraInfo}. 
    Provide the name of the drama and a short reason why. Format as a friendly chat message.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "I couldn't find any recommendations right now. Try watching 'Crash Landing on You'!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, my drama knowledge is currently offline.";
  }
}

export async function imagineDramaPoster(prompt: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `High-quality K-Drama official poster for a new series: ${prompt}. Cinematic lighting, emotional depth, Korean aesthetic, professional typography layout.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
}
