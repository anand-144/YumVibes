import React, { useContext, useEffect } from 'react';
import { Context } from '../context/ContextProvider';
import { Loader2, Sparkles } from 'lucide-react';

const SuggestionBox = ({ mood }) => {
  const { onSent, response, loading } = useContext(Context);

  useEffect(() => {
    if (mood) onSent(mood);
  }, [mood]);

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-0">
      <div className="bg-white rounded-3xl shadow-xl border-2 border-violet-100 overflow-hidden">
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 sm:px-7 py-4 sm:py-5">
          <div className="flex items-center space-x-2 sm:space-x-3 text-white">
            <Sparkles className="w-6 sm:w-7 h-6 sm:h-7" />
            <h2 className="text-xl sm:text-2xl font-bold">Your Perfect Match</h2>
          </div>
        </div>

        <div className="p-5 sm:p-9">
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 sm:py-14 space-y-4 sm:space-y-5">
              <Loader2 className="w-12 sm:w-14 h-12 sm:h-14 text-fuchsia-500 animate-spin" />
              <p className="text-gray-600 font-semibold text-base sm:text-lg">
                Finding the perfect food for your mood...
              </p>
            </div>
          )}

          {response && response.error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-5 sm:p-7">
              <p className="text-red-600 font-semibold text-base sm:text-lg">{response.message}</p>
            </div>
          )}

          {response && !response.error && (
            <div className="space-y-5 sm:space-y-7">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-violet-600 uppercase tracking-wide mb-1 sm:mb-2">
                  Recommended Dish
                </h3>
                <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {response.food}
                </p>
              </div>

              {response.image && (
                <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-violet-100">
                  <img
                    src={response.image}
                    alt={response.food}
                    className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-5 sm:p-7 border-2 border-violet-200">
                <h3 className="text-xs sm:text-sm font-bold text-violet-600 uppercase tracking-wide mb-2 sm:mb-3">
                  Why This Dish?
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-lg">{response.funStory}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionBox;
