// components/SuggestionBox.jsx
import React, { useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";

const SuggestionBox = ({ mood }) => {
  const { onSent, response, loading } = useContext(Context);

  useEffect(() => {
    if (mood) onSent(mood);
  }, [mood]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-lg font-bold mb-2 text-pink-500">AI Suggestion</h2>
      {loading && <p className="text-pink-400 animate-pulse">Loading...</p>}

      {response && (
        <div>
          <p className="font-semibold">
            <strong>Food:</strong> {response.food}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Fun Story:</strong> {response.funStory}
          </p>
          {response.image && (
            <img
              src={response.image}
              alt={response.food}
              className="mt-4 w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionBox;
