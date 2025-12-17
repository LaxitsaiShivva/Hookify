import { GoogleGenAI, Type } from "@google/genai";
import { FormData, HookResponse, GeneratorMode } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Hookify, a free AI Hook Generator designed to help creators stop the scroll instantly.

You are an expert viral copywriter and social media strategist who understands how attention works on social platforms.

Your task is to generate high-performing, scroll-stopping hooks that grab attention within the first 2 seconds.

RULES:
- Hooks must sound human, confident, and natural
- Avoid generic or overused phrases
- Optimize wording strictly for the selected platform
- Each hook must be ONE sentence only
- Use emotional triggers like curiosity, pain, fear, desire, or surprise
- No hashtags
- No explanations
- No titles or headings
- Emojis only if Emoji Mode is ON and platform is Instagram or TikTok
- If CTA Mode is ON, append a short natural CTA (e.g., “watch till end”, “save this”)
- Respect hook length setting:
  - Short: 5–7 words
  - Medium: 8–14 words
  - Long: Story-style but concise
- Append " - Created by Hookify" to the end of every single hook string.

OUTPUT REQUIREMENTS:
- Generate exactly 10 hooks (or 5 if improving)
- Mix creativity while respecting the selected hook style

Additional Task:
- You must also provide a brief "Video Strategy" to help the user film this content.
- This strategy should include a visual hook idea, pacing suggestion, audio suggestion, and a caption tip.
`;

export const generateHooks = async (data: FormData): Promise<HookResponse> => {
  const isImprove = data.mode === GeneratorMode.IMPROVE;
  
  const prompt = `
    Mode: ${data.mode}
    Topic: ${data.topic}
    ${isImprove ? `User Hook to Improve: "${data.userHook}"` : ''}
    Platform: ${data.platform}
    Audience: ${data.audience || 'General Audience'}
    Tone: ${data.tone}
    Hook Style: ${data.hookStyle}
    Hook Length: ${data.hookLength}
    Emoji Mode: ${data.emojiMode ? 'On' : 'Off'}
    CTA Mode: ${data.ctaMode ? 'On' : 'Off'}
    Language: ${data.language}

    ${isImprove 
      ? 'Rewrite the provided hook to be more scroll-stopping. Generate 5 improved versions. Preserve the original idea but increase impact.' 
      : 'Generate 10 viral hooks for this topic.'}
      
    Also provide a video strategy.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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
              description: "The list of viral hooks",
            },
            strategy: {
              type: Type.OBJECT,
              description: "Strategic advice for creating the video/reel",
              properties: {
                visualHook: { type: Type.STRING, description: "Description of the first 3 seconds visually" },
                pacing: { type: Type.STRING, description: "Suggested speed and editing style" },
                audioSuggestion: { type: Type.STRING, description: "Type of audio (e.g. trending song, voiceover, ASMR)" },
                captionTip: { type: Type.STRING, description: "One tip for the description/caption" }
              },
              required: ["visualHook", "pacing", "audioSuggestion", "captionTip"]
            }
          },
          required: ["hooks", "strategy"],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    // Parse JSON
    const parsed = JSON.parse(responseText);
    
    return parsed as HookResponse;

  } catch (error) {
    console.error("Error generating hooks:", error);
    throw error;
  }
};