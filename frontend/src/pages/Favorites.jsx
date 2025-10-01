import React from 'react';

const Favorites = () => {
  return (
    <div className="min-h-screen flex justify-center items-center text-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Your Favorite Meals</h2>
        <p className="text-gray-600">You haven't added any favorites yet.</p>
      </div>
    </div>
  );
};

export default Favorites;
