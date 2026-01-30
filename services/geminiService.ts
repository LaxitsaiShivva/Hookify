import { GoogleGenAI, Type } from "@google/genai";
import { FormData, HookResponse, GeneratorMode } from '../types';

const SYSTEM_INSTRUCTION = `
You are Hookify, a free AI Hook Generator designed to help creators stop the scroll instantly.
You are an expert viral copywriter and social media strategist.

Your task is to generate high-performing, scroll-stopping hooks that grab attention within the first 2 seconds.

RULES:
- Hooks must sound human, confident, and natural.
- Each hook must be ONE sentence only.
- Respect hook length setting: Short (5-7 words), Medium (8-14 words), Long (Story-style).
- Emojis only if Emoji Mode is ON.
- Append " - Created by Hookify" to the end of every hook.

OUTPUT:
- Return valid JSON matching the schema provided.
`;

export const generateHooks = async (data: FormData): Promise<HookResponse> => {
  // Always initialize GoogleGenAI with process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const isImprove = data.mode === GeneratorMode.IMPROVE;
  const prompt = `
    Mode: ${data.mode}
    Topic: ${data.topic}
    ${isImprove ? `Improve this hook: "${data.userHook}"` : 'Generate viral hooks for this topic.'}
    Platform: ${data.platform}
    Tone: ${data.tone}
    Style: ${data.hookStyle}
    Length: ${data.hookLength}
    Emojis: ${data.emojiMode}
    CTA: ${data.ctaMode}
    Language: ${data.language}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hooks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            strategy: {
              type: Type.OBJECT,
              properties: {
                visualHook: { type: Type.STRING },
                pacing: { type: Type.STRING },
                audioSuggestion: { type: Type.STRING },
                captionTip: { type: Type.STRING }
              },
              required: ["visualHook", "pacing", "audioSuggestion", "captionTip"]
            }
          },
          required: ["hooks", "strategy"],
        },
      },
    });

    // Access the .text property directly as it is not a method
    const text = response.text;
    if (!text) throw new Error("Empty response from AI.");
    return JSON.parse(text) as HookResponse;

  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);
    
    const errorMessage = error.message || "";
    
    // Check for Rate Limit / Quota Exhausted (429)
    if (errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("quota")) {
      throw new Error("You've reached the free daily limit for Gemini AI. Please wait about 30-60 seconds before trying again.");
    }
    
    // Check for Server Overloaded (503)
    if (errorMessage.includes("503") || errorMessage.toLowerCase().includes("overloaded")) {
      throw new Error("Google's servers are currently busy. Please wait 10 seconds and try again.");
    }

    // Attempt to extract a clean message if it's trapped in a JSON string
    try {
      if (errorMessage.startsWith('{')) {
        const parsed = JSON.parse(errorMessage);
        if (parsed?.error?.message) {
          throw new Error(parsed.error.message);
        }
      }
    } catch (e) {
      // If parsing fails, just use the original error message logic
    }
    
    throw new Error("Something went wrong with the AI. Please try again in a moment.");
  }
};