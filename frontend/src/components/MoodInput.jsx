import React, { useState } from "react";

const MoodInput = ({ onSubmit }) => {
  const [mood, setMood] = useState("");

  const handleSubmit = () => {
    if (mood.trim() !== "") {
      onSubmit(mood);
      setMood("");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Type Your Mood</h2>
      <div className="flex justify-center gap-2">
        <input
          type="text"
          placeholder="Enter mood..."
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MoodInput;
