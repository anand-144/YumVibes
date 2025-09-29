import React from "react";

const Footer = () => {
  return (
    <footer className="bg-pink-500 text-white py-4 mt-6">
      <div className="text-center text-sm">
        &copy; {new Date().getFullYear()} MoodFood. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
