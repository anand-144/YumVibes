import React, { useContext } from "react";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  // Redirect logged-in users to home
  if (user) {
    navigate("/");
    return null;
  }

  const emojis = [
    { emoji: "😀", top: "12%", left: "8%" },
    { emoji: "😢", top: "28%", left: "75%" },
    { emoji: "☕", top: "60%", left: "12%" },
    { emoji: "❤️", top: "78%", left: "68%" },
    { emoji: "🌞", top: "35%", left: "42%" },
    { emoji: "🌙", top: "85%", left: "25%" },
    { emoji: "☁️", top: "52%", left: "90%" },
    { emoji: "⭐", top: "8%", left: "58%" },
    { emoji: "🎂", top: "48%", left: "60%" },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-gradient-to-br from-violet-200 via-indigo-400 to-amber-200 overflow-hidden">
      {/* Floating emojis */}
      {emojis.map(({ emoji, top, left }, i) => (
        <span
          key={i}
          className="absolute opacity-50 text-4xl sm:text-6xl animate-float hidden sm:block"
          style={{
            top,
            left,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* Centered Text + Login Button */}
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-violet-700 to-fuchsia-800 bg-clip-text text-transparent">
          YumVibe
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xl rounded-xl shadow-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Landing;
