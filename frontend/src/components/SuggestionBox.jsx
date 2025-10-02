import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/ContextProvider";
import { Loader2, Sparkles, Heart, BookOpen } from "lucide-react";
import { toast } from "react-toastify";

const SuggestionBox = ({ mood }) => {
  const { onSent, response, loading, user, addFavorite, favorites } = useContext(Context);
  const [addedToFav, setAddedToFav] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);

  useEffect(() => {
    if (mood) {
      onSent(mood);
      setAddedToFav(false);
      setShowRecipe(false);
    }
  }, [mood]);

  useEffect(() => {
    if (response) {
      const exists = favorites.find(f => f.food === response.food);
      setAddedToFav(!!exists);
    }
  }, [response, favorites]);

  const handleAddToFavorites = () => {
    if (!user) {
      toast.info("Please login to add favorites.");
      return;
    }
    addFavorite({ food: response.food, image: response.image, recipe: response.recipe });
    setAddedToFav(true);
  };

  const handleCopyRecipe = () => {
    if (!response?.recipe) return;

    const text = `
Ingredients:
${response.recipe.ingredients.map((i) => `- ${i}`).join("\n")}

Steps:
${response.recipe.steps.map((s, idx) => `${idx + 1}. ${s}`).join("\n")}
    `;
    navigator.clipboard.writeText(text);
    toast.success("Recipe copied to clipboard!");
  };

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
              {/* Dish Name */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-violet-600 uppercase tracking-wide mb-1 sm:mb-2">
                  Recommended Dish
                </h3>
                <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {response.food}
                </p>
              </div>

              {/* Dish Image */}
              {response.image && (
                <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-violet-100">
                  <img
                    src={response.image}
                    alt={response.food}
                    className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Fun Story */}
              <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-5 sm:p-7 border-2 border-violet-200">
                <h3 className="text-xs sm:text-sm font-bold text-violet-600 uppercase tracking-wide mb-2 sm:mb-3">
                  Why This Dish?
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-lg">{response.funStory}</p>
              </div>

              {/* Recipe Section */}
              {response.recipe && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={() => setShowRecipe(prev => !prev)}
                      className="py-2 px-4 rounded-lg flex justify-center items-center space-x-2 font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                    >
                      <BookOpen className="w-5 h-5" />
                      <span>{showRecipe ? "Hide Recipe" : "Show Recipe"}</span>
                    </button>

                    {showRecipe && (
                      <button
                        onClick={handleCopyRecipe}
                        className="py-2 px-4 rounded-lg flex justify-center items-center space-x-2 font-semibold bg-green-500 hover:bg-green-600 text-white"
                      >
                        <span>Copy Recipe</span>
                      </button>
                    )}
                  </div>

                  {showRecipe && (
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-3 text-gray-700">
                      <h4 className="font-bold text-violet-600">Ingredients:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {response.recipe.ingredients.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>

                      <h4 className="mt-3 font-bold text-violet-600">Steps:</h4>
                      <ol className="list-decimal list-inside space-y-1">
                        {response.recipe.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {/* Add to Favorites Button */}
              <button
                onClick={handleAddToFavorites}
                disabled={addedToFav}
                className={`w-full py-3 rounded-lg mt-4 flex justify-center items-center space-x-2 font-semibold ${
                  addedToFav
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white"
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>{addedToFav ? "Added to Favorites" : "Add to Favorites"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionBox;
