import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-8 mt-auto">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-lg font-semibold">Made with</span>
          <Heart className="w-5 h-5 fill-white" />
          <span className="text-lg font-semibold">for food lovers</span>
        </div>
        <p className="text-sm opacity-90">
          &copy; {new Date().getFullYear()} MoodFood. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
