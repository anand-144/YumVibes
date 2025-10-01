import React, { useState } from 'react';
import MoodCard from '../components/MoodCard';
import MoodInput from '../components/MoodInput';
import SuggestionBox from '../components/SuggestionBox';

const Home = () => {
  const [mood, setMood] = useState('');

  return (
    <div className="space-y-10 sm:space-y-14">
      <div className="text-center space-y-3 sm:space-y-4 px-2 sm:px-0">
        <h1 className="relative text-4xl sm:text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-violet-700 to-fuchsia-800 bg-clip-text text-transparent">
          Find Your Yum Vibe
        </h1>

        <p className="text-base sm:text-xl text-gray-600 max-w-xl sm:max-w-2xl mx-auto font-medium">
          Let your emotions guide you to the perfect meal ✨
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-11 px-2 sm:px-0">
        <MoodCard onSelect={setMood} />

        <div className="flex items-center space-x-2 sm:space-x-5">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-violet-300 to-transparent"></div>
          <span className="text-violet-800 font-bold text-lg sm:text-xl">OR</span>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-violet-300 to-transparent"></div>
        </div>

        <MoodInput onSubmit={setMood} />
      </div>

      {mood && (
        <div className="px-2 sm:px-0">
          <SuggestionBox mood={mood} />
        </div>
      )}
    </div>
  );
};

export default Home;
