import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';   // new page
import ContextProvider from './context/ContextProvider';
import { Smile, Frown, Coffee, Heart, Sun, Moon, Cloud, Star, CakeSlice } from "lucide-react";

function App() {
  const icons = [
    { Icon: Smile, color: "text-pink-600", top: "10%", left: "5%" },
    { Icon: Frown, color: "text-blue-700", top: "25%", left: "80%" },
    { Icon: Coffee, color: "text-amber-600", top: "60%", left: "15%" },
    { Icon: Heart, color: "text-red-600", top: "75%", left: "70%" },
    { Icon: Sun, color: "text-yellow-400", top: "30%", left: "40%" },
    { Icon: Moon, color: "text-indigo-800", top: "85%", left: "30%" },
    { Icon: Cloud, color: "text-gray-600", top: "55%", left: "90%" },
    { Icon: Star, color: "text-violet-600", top: "5%", left: "60%" },
    { Icon: CakeSlice, color: "text-pink-700", top: "50%", left: "60%" },
  ];

  return (
    <ContextProvider>
      <Router>
        <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-violet-200 via-indigo-400 to-amber-200 overflow-hidden">

          {/* floating mood icons */}
          {icons.map(({ Icon, color, top, left }, i) => (
            <Icon
              key={i}
              className={`absolute ${color} opacity-40 w-16 h-16 animate-float`}
              style={{
                top,
                left,
                animationDelay: `${i * 0.5}s` // stagger movement
              }}
            />
          ))}


          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-14 relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
