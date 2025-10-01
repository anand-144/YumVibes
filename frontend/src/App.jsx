import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ContextProvider from "./context/ContextProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";

function App() {
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ContextProvider>
      <Router>
        <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-violet-200 via-indigo-400 to-amber-200 overflow-hidden">

          {/* floating mood emojis */}
          {emojis.map(({ emoji, top, left }, i) => (
            <span
              key={i}
              className="absolute opacity-50 text-3xl sm:text-5xl animate-float hidden sm:block"
              style={{
                top,
                left,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              {emoji}
            </span>
          ))}

          <Navbar />
          <main className="flex-1 container mx-auto px-4 sm:px-6 py-24 sm:py-28 relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
