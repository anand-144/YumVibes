import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // simulate login state
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setDropdownOpen(false);
      navigate("/"); // go to home after logout
    } else {
      navigate("/login"); // redirect to login page
      setDropdownOpen(false);
    }
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg fixed w-full z-20">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-white p-2.5 rounded-xl shadow-lg">
            <p className='text-3xl font-extrabold'>😋</p>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">YumVibe</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-7">
          <Link to="/" className="hover:text-amber-300 transition-colors font-semibold">Home</Link>
          <Link to="/about" className="hover:text-amber-300 transition-colors font-semibold">About</Link>

          {/* Profile Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-2xl sm:text-3xl inline-block">😎</span>
            </button>


            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                {!isLoggedIn ? (
                  <button
                    onClick={handleLoginLogout}
                    className="w-full text-left px-4 py-2 hover:bg-violet-100 transition-colors"
                  >
                    Login
                  </button>
                ) : (
                  <>
                    <Link
                      to="/favorites"
                      className="block px-4 py-2 hover:bg-violet-100 transition-colors"
                    >
                      Favorite
                    </Link>
                    <button
                      onClick={handleLoginLogout}
                      className="w-full text-left px-4 py-2 hover:bg-violet-100 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center space-x-3">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Profile Dropdown Mobile */}
          <div ref={dropdownRef} className="relative">
            <button
              className="flex items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <User className="w-6 h-6" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                {!isLoggedIn ? (
                  <button
                    onClick={handleLoginLogout}
                    className="w-full text-left px-4 py-2 hover:bg-violet-100 transition-colors"
                  >
                    Login
                  </button>
                ) : (
                  <>
                    <Link
                      to="/favorites"
                      className="block px-4 py-2 hover:bg-violet-100 transition-colors"
                    >
                      Favorite
                    </Link>
                    <button
                      onClick={handleLoginLogout}
                      className="w-full text-left px-4 py-2 hover:bg-violet-100 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-gradient-to-tl from-violet-600 to-fuchsia-600 overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-40 py-2" : "max-h-0"}`}>
        <Link to="/" className="block px-4 py-2 text-white hover:text-amber-300 font-semibold">Home</Link>
        <Link to="/about" className="block px-4 py-2 text-white hover:text-amber-300 font-semibold">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
