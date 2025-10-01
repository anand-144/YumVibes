import React from 'react';
import { Smile, Frown, Zap, Coffee, Heart } from 'lucide-react';

const moods = [
  { name: 'Happy', icon: Smile, gradient: 'from-amber-400 to-orange-500', shadow: 'hover:shadow-amber-400/40' },
  { name: 'Sad', icon: Frown, gradient: 'from-blue-400 to-cyan-500', shadow: 'hover:shadow-cyan-400/40' },
  { name: 'Excited', icon: Zap, gradient: 'from-emerald-400 to-green-500', shadow: 'hover:shadow-emerald-400/40' },
  { name: 'Tired', icon: Coffee, gradient: 'from-violet-400 to-purple-500', shadow: 'hover:shadow-violet-400/40' },
  { name: 'Romantic', icon: Heart, gradient: 'from-pink-400 to-rose-500', shadow: 'hover:shadow-pink-400/40' }
];

const MoodCard = ({ onSelect }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        How are you feeling?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {moods.map((mood) => {
          const IconComponent = mood.icon;
          return (
            <button
              key={mood.name}
              onClick={() => onSelect(mood.name)}
              className={`bg-gradient-to-br ${mood.gradient} ${mood.shadow} text-white rounded-2xl p-7 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95`}
            >
              <div className="flex flex-col items-center space-y-3">
                <IconComponent className="w-10 h-10 drop-shadow-lg" />
                <span className="font-semibold text-lg">{mood.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodCard;
