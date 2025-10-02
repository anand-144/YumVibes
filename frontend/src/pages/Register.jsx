import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleRegister = async () => {
    if (!name || !email || !password) return toast.error("All fields are required");

    try {
      setLoading(true);
      const { data } = await axios.post(`${API_BASE}/api/auth/register`, {
        name, email, password
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success("Registered successfully!");
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md relative overflow-hidden">
        <span className="absolute top-3 left-6 text-3xl opacity-70">🍕</span>
        <span className="absolute top-10 right-12 text-4xl opacity-80">😋</span>
        <span className="absolute bottom-8 left-1 text-7xl opacity-75">🍔</span>
        <span className="absolute bottom-3 right-6 text-xl opacity-70">🥗</span>
        <span className="absolute top-1/2 left-3 text-xl opacity-60">🤩</span>
        <span className="absolute top-1/4 right-3 text-5xl opacity-60">🍩</span>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 font-extrabold"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 font-extrabold"
        />

        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 font-extrabold"
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
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 rounded-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <span
            className="text-violet-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
