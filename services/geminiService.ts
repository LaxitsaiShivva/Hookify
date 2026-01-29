
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
  // Fixed: Initializing GoogleGenAI directly with process.env.API_KEY as per the world-class guidelines.
  // We assume process.env.API_KEY is pre-configured and valid.
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
    // Fixed: Using 'gemini-3-pro-preview' for creative copywriting and complex strategy reasoning.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
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

    // Fixed: Accessing response.text directly (not a function call) as per the SDK documentation.
    const text = response.text;
    if (!text) throw new Error("Empty response from AI.");
    return JSON.parse(text) as HookResponse;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Graceful error handling for service availability issues.
    if (error.message?.includes("503") || error.message?.includes("overloaded")) {
      throw new Error("Google's servers are currently busy. Please wait 10 seconds and try again.");
    }
    
    throw new Error(error.message || "Something went wrong with the generation.");
  }
};
