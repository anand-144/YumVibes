// utils/runChat.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY, // 🔑 from your .env
});

export async function runChat(prompt) {
  const model = "gemini-2.5-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `You are a fun and playful food suggestion generator.
                 Based on this mood: "${prompt}", suggest ONLY a food name (do NOT repeat the mood in the food name).
                 Then write a 2-3 sentence playful story about that food.
                 Return the response as strict JSON only, like this:

                 {
                   "food": "Pizza",
                   "funStory": "Short fun story..."
                 }

                 Do not include any markdown, code blocks, or extra text.`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    contents,
  });

  let fullText = "";

  for await (const chunk of response) {
    const parts = chunk.candidates?.[0]?.content?.parts;
    if (!parts) continue;

    for (const part of parts) {
      if (part.text) fullText += part.text.trim();
    }
  }

  try {
    return JSON.parse(fullText); // { food, funStory }
  } catch (err) {
    console.warn("AI JSON parse failed:", err);
    return { food: "", funStory: fullText };
  }
}
