import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-pink-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">MoodFood</h1>
        <div className="space-x-4">
          <button className="hover:underline">Home</button>
          <button className="hover:underline">About</button>
          <button className="hover:underline">Contact</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
