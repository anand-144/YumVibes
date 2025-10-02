import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../context/ContextProvider';  // ✅ import context

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loginUser } = useContext(Context); // ✅ get loginUser from context

  const handleLogin = async () => {
    if (!email || !password) return toast.error("Both fields are required");

    try {
      setLoading(true);
      const { data } = await axios.post(`${API_BASE}/api/auth/login`, {
        email, password
      });

      // ✅ Use context to update state + localStorage
      loginUser(data.user, data.token);

      toast.success("Login successful 🎉");
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md relative overflow-hidden">
        <span className="absolute top-3 left-3 text-7xl opacity-70">🥮</span>
        <span className="absolute top-10 right-12 text-2xl opacity-80">🤤</span>
        <span className="absolute bottom-8 left-12 text-2xl opacity-75">🥐</span>
        <span className="absolute bottom-3 right-6 text-xl opacity-70">🥗</span>
        <span className="absolute top-1/2 left-3 text-5xl opacity-60">😍</span>
        <span className="absolute top-1/4 right-3 text-xl opacity-60">🍟</span>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer text-2xl"
          >
            {showPassword ? "🫣" : "👁️"}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 rounded-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-violet-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
