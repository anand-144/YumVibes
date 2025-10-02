import { GoogleGenAI } from "@google/genai";
import { getFoodImage } from "./imageService.js";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const lastFoodCache = {};

function safeJSONParse(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    // Attempt minor fixes: remove trailing commas in arrays/objects
    try {
      const cleaned = text
        .replace(/,\s*([\]}])/g, "$1") // remove trailing commas
        .replace(/\r?\n/g, " "); // remove line breaks
      return JSON.parse(cleaned);
    } catch (e) {
      console.error("Final JSON parse failed:", e, text);
      return null;
    }
  }
}

export async function runChat(prompt) {
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return {
      error: true,
      message: "Please enter a mood or feeling to get a food suggestion!",
    };
  }

  const mood = prompt.trim();

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `You are a playful food suggestion AI.
                 Only consider this input if it represents a mood or feeling (e.g., happy, sad, excited, relaxed).
                 If the input is not a mood, respond strictly as JSON:
                 { "food": "", "funStory": "", "recipe": { "ingredients": [], "steps": [] }, "error": "Invalid mood" }.

                 Based on this mood: "${mood}", suggest ONLY a food name (do NOT repeat the mood in the food name).
                 Write a 2-3 sentence playful story about that food.
                 Then provide a recipe including:
                 - A list of necessary ingredients (name + quantity)
                 - Step-by-step instructions (2-5 steps)

                 Return strictly JSON like this:
                 {
                   "food": "Pizza",
                   "funStory": "Short playful story...",
                   "recipe": {
                     "ingredients": ["1 cup flour", "100g cheese", ...],
                     "steps": ["Step 1...", "Step 2...", ...]
                   }
                 }
                 Do not include markdown, code blocks, or extra text.`
        },
      ],
    },
  ];

  try {
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents,
      temperature: 0.9,
      candidateCount: 8,
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (!parts) continue;
      for (const part of parts) {
        if (part.text) fullText += part.text.trim();
      }
    }

    const parsed = safeJSONParse(fullText);

    if (!parsed) {
      return {
        error: true,
        message:
          "AI response could not be parsed. Please try again with a simpler mood word.",
      };
    }

    if (parsed.error === "Invalid mood") {
      return {
        error: true,
        message:
          "Hmm, that doesn’t look like a mood or feeling. Please enter a valid mood (e.g., happy, sad, excited).",
      };
    }

    if (lastFoodCache[mood] === parsed.food) {
      return await runChat(prompt + " (try again!)");
    }

    lastFoodCache[mood] = parsed.food;

    // Get image
    const image = await getFoodImage(parsed.food);

    return {
      error: false,
      ...parsed,
      image,
    };
  } catch (err) {
    console.error("AI JSON parse failed:", err);
    return {
      error: true,
      message:
        "Oops! Something went wrong while generating your food suggestion. Please try again.",
    };
  }
}
