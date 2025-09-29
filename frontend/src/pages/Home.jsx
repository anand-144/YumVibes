import React, { useState } from "react";
import MoodCard from "../components/MoodCard";
import MoodInput from "../components/MoodInput";
import SuggestionBox from "../components/SuggestionBox";

const Home = () => {
  const [mood, setMood] = useState("");

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-pink-500 mb-6">Find Your Yum Vibe ✨</h1>

      <div className="mb-6">
        <MoodCard onSelect={setMood} />
      </div>

      <div className="mb-6">
        <MoodInput onSubmit={setMood} />
      </div>

      <div className="mt-6">
        {mood && <SuggestionBox mood={mood} />}
      </div>
    </div>
  );
};

export default Home;
