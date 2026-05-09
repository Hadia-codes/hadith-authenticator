import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface HadithVerification {
  authenticity: 'Sahih' | 'Hasan' | 'Da\'if' | 'Mawdu' | 'Unknown';
  source?: string;
  reference?: string;
  grade_explanation: string;
  context: string;
  original_text?: string;
  translation?: string;
}

export async function verifyHadith(text: string): Promise<HadithVerification> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Analyze the following text to see if it is a Hadith or Sunnah narrations. 
  Text: "${text}"
  
  Please provide:
  1. The authenticity level (Sahih, Hasan, Da'if, Mawdu, or Unknown).
  2. The primary source (e.g., Sahih Bukhari, Sahih Muslim, etc.).
  3. A specific reference if available.
  4. A brief explanation of why it has this grade.
  5. The historical or linguistic context.
  6. The original Arabic text if found.
  7. A clear English translation.
  
  Focus on accuracy and reliability based on standard Hadith sciences ('Ulum al-Hadith).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            authenticity: { 
              type: Type.STRING, 
              enum: ['Sahih', 'Hasan', 'Da\'if', 'Mawdu', 'Unknown'] 
            },
            source: { type: Type.STRING },
            reference: { type: Type.STRING },
            grade_explanation: { type: Type.STRING },
            context: { type: Type.STRING },
            original_text: { type: Type.STRING },
            translation: { type: Type.STRING },
          },
          required: ['authenticity', 'grade_explanation', 'context']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as HadithVerification;
  } catch (error) {
    console.error("Hadith verification error:", error);
    throw new Error("Failed to verify Hadith. Please try again later.");
  }
}
