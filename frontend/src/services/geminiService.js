import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const lastFoodCache = {};

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
                 { "food": "", "funStory": "", "error": "Invalid mood" }.

                 Based on this mood: "${mood}", suggest ONLY a food name (do NOT repeat the mood in the food name).
                 Then write a 2-3 sentence playful story about that food.
                 Return strictly JSON like this:
                 { "food": "Pizza", "funStory": "Short fun story..." }.
                 Do not include markdown, code blocks, or extra text.`,
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents,
      temperature: 0.9,
      candidateCount: 8,
    });

    let fullText = "";

    for await (const chunk of response) {
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (!parts) continue;
      for (const part of parts) {
        if (part.text) fullText += part.text.trim();
      }
    }

    const parsed = JSON.parse(fullText);

    if (parsed.error === "Invalid mood") {
      return {
        error: true,
        message: "Hmm, that doesn’t look like a mood or feeling. Please enter a valid mood (e.g., happy, sad, excited).",
      };
    }

    // Retry once if same food as last suggestion
    if (lastFoodCache[mood] === parsed.food) {
      return await runChat(prompt + " (try again!)");
    }

    lastFoodCache[mood] = parsed.food;

    return { error: false, ...parsed };
  } catch (err) {
    console.error("AI JSON parse failed:", err);
    return {
      error: true,
      message: "Oops! Something went wrong while generating your food suggestion. Please try again.",
    };
  }
}
