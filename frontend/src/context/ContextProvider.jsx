// context/ContextProvider.jsx
import React, { createContext, useState } from "react";
import { runChat } from "../services/geminiService";
import { getFoodImage } from "../services/imageService.js";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSent = async (mood) => {
    setLoading(true);
    setResponse(null);

    try {
      // Step 1: AI food + fun story
      const aiResponse = await runChat(mood);

      if (aiResponse.error) {
        // If AI indicates invalid mood, just set error message
        setResponse({ error: true, message: aiResponse.message });
      } else {
        // Step 2: Fresh image from Unsplash or Pexels
        const image = await getFoodImage(aiResponse.food);

        setResponse({ ...aiResponse, image, error: false });
      }
    } catch (err) {
      console.error("Error generating suggestion:", err);
      setResponse({
        error: true,
        message: "Oops! Something went wrong while generating your food suggestion.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider value={{ onSent, response, loading }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
