import React from 'react';

const moods = [
  { name: 'Happy', icon: '😊', gradient: 'from-amber-400 to-orange-500', shadow: 'hover:shadow-amber-400/40' },
  { name: 'Sad', icon: '😢', gradient: 'from-blue-400 to-cyan-500', shadow: 'hover:shadow-cyan-400/40' },
  { name: 'Excited', icon: '⚡', gradient: 'from-emerald-600 to-green-500', shadow: 'hover:shadow-emerald-600/40' },
  { name: 'Tired', icon: '☕', gradient: 'from-violet-400 to-purple-500', shadow: 'hover:shadow-violet-300/40' },
  { name: 'Romantic', icon: '❤️', gradient: 'from-pink-400 to-rose-400', shadow: 'hover:shadow-pink-400/40' }
];

const MoodCard = ({ onSelect }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
        How are you feeling?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => onSelect(mood.name)}
            className={`bg-gradient-to-br ${mood.gradient} ${mood.shadow} text-white rounded-2xl p-5 sm:p-7 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95`}
          >
            <div className="flex flex-col items-center space-y-2 sm:space-y-3">
              {/* Render emoji instead of icon component */}
              <span className="text-3xl sm:text-4xl drop-shadow-lg">{mood.icon}</span>
              <span className="font-semibold text-sm sm:text-lg">{mood.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodCard;
