import React from "react";

const moods = ["Happy", "Sad", "Excited", "Tired", "Romantic"];

const MoodCard = ({ onSelect }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Select a Mood</h2>
      <div className="flex justify-center gap-4 flex-wrap">
        {moods.map((m) => (
          <div
            key={m}
            onClick={() => onSelect(m)}
            className="cursor-pointer px-5 py-2 rounded-lg bg-pink-200 hover:bg-pink-300 transition"
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodCard;
