import React, { useContext } from "react";
import { Context } from "../context/ContextProvider";

const Favorites = () => {
  const { user, favorites, removeFavorite } = useContext(Context);

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">Please login to see your favorites.</p>
      </div>
    );

  if (favorites.length === 0)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">You haven't added any favorites yet.</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold">Your Favorite Meals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {favorites.map((fav, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
            {fav.image && (
              <img src={fav.image} alt={fav.food} className="w-full h-48 object-cover" />
            )}
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">{fav.food}</h3>
              <button
                onClick={() => removeFavorite(fav.food)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
