
import { GoogleGenAI, Type } from "@google/genai";
import { HOTELS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAIConciergeResponse = async (userPrompt: string, chatHistory: {role: 'user' | 'assistant', content: string}[]) => {
  try {
    const hotelContext = HOTELS.map(h => 
      `${h.name} located in ${h.location}. Features: ${h.amenities.join(', ')}. Price: $${h.pricePerNight}/night. ${h.description}`
    ).join('\n\n');

    const systemInstruction = `
      You are the AI Concierge for Matterhorn Hotels & Resorts. 
      Your goal is to help users find the perfect hotel from our curated list.
      
      Available Hotels:
      ${hotelContext}
      
      Guidelines:
      1. Be professional, warm, and helpful.
      2. If the user asks for a recommendation, look for hotels that match their needs (budget, location, amenities).
      3. Use details from the descriptions provided to sell the experience.
      4. If you mention a hotel name, wrap it in **bold**.
      5. Keep responses concise and focused on travel planning.
      6. If asked about a location or feature we don't have, politely mention that we don't have it yet and suggest the closest alternative.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...chatHistory.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request right now. How else can I help you?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently taking a short break. Please try again in a moment!";
  }
};
