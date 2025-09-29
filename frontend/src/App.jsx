import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 container  mx-auto px-4 py-6">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
