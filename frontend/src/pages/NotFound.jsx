import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-200 via-pink-400 to-purple-300 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
