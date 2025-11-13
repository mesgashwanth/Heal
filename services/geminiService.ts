
import { GoogleGenAI, Chat, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

let chat: Chat | null = null;

function getChatInstance(): Chat {
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: 'You are a helpful and empathetic assistant for expecting mothers and new parents. Provide clear, concise, and supportive information related to maternity and child health. Do not provide medical advice; always suggest consulting a healthcare professional for serious concerns.',
      },
    });
  }
  return chat;
}

export const getChatResponse = async (prompt: string): Promise<string> => {
  try {
    const chatInstance = getChatInstance();
    const response = await chatInstance.sendMessage({ message: prompt });
    return response.text;
  } catch (error) {
    console.error("Error getting chat response:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};

export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

export const generateSpeech = async (text: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
};
