import React, { useState } from 'react';
import { Send } from 'lucide-react';

const MoodInput = ({ onSubmit }) => {
  const [mood, setMood] = useState('');

  const handleSubmit = () => {
    if (mood.trim() !== '') {
      onSubmit(mood);
      setMood('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-700 text-center">
        Or describe your mood
      </h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="e.g., feeling adventurous, need comfort..."
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-7 py-4 bg-white border-2 border-violet-200 rounded-full focus:outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100 transition-all text-gray-700 placeholder-gray-400 shadow-md text-lg"
        />
        <button
          onClick={handleSubmit}
          disabled={!mood.trim()}
          className="px-9 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 hover:shadow-xl hover:shadow-fuchsia-400/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-semibold text-lg hover:scale-105 active:scale-95"
        >
          <span>Send</span>
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MoodInput;
