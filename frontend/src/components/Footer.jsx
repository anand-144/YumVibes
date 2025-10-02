import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-600 via-indigo-300/50 to-fuchsia-600 text-blue-950 py-8 mt-auto">
      <div className="container mx-auto text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
          <span className="text-lg font-semibold">Made with</span>
          <Heart className="w-5 h-5 fill-red-600" />
          <span className="text-lg font-semibold">for food lovers</span>
        </div>
        <p className="text-sm opacity-90">&copy; {new Date().getFullYear()} YumVibe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
