// context/ContextProvider.jsx
import React, { createContext, useState } from "react";
import { runChat } from "../services/geminiService";
import { getFoodImage } from "../services/imageService";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSent = async (mood) => {
    setLoading(true);
    try {
      // Step 1: AI food + fun story
      const aiResponse = await runChat(mood);

      // Step 2: Fresh image from Unsplash
      const image = await getFoodImage(aiResponse.food);

      // Final response object
      const finalResponse = { ...aiResponse, image };

      setResponse(finalResponse);
    } catch (err) {
      console.error("Error generating suggestion:", err);
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
