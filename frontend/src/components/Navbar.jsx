import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-5">
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-white p-2.5 rounded-xl shadow-lg">
            <UtensilsCrossed className="w-6 h-6 text-fuchsia-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">MoodFood</h1>
        </Link>
        <div className="hidden md:flex space-x-7">
          <Link to="/" className="hover:text-amber-300 transition-colors font-semibold">Home</Link>
          <Link to="/about" className="hover:text-amber-300 transition-colors font-semibold">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
