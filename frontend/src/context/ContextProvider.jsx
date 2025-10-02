import React, { createContext, useState, useEffect } from "react";
import { runChat } from "../services/geminiService";
import { getFoodImage } from "../services/imageService.js";
import axios from "axios";
import { toast } from "react-toastify";

export const Context = createContext();

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const ContextProvider = ({ children }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [favorites, setFavorites] = useState([]);

  // Sync favorites when user logs in
  useEffect(() => {
    if (user && token) fetchFavorites();
  }, [user, token]);

  const onSent = async (mood) => {
    setLoading(true);
    setResponse(null);

    try {
      // Step 1: AI food + fun story
      const aiResponse = await runChat(mood);

      if (aiResponse.error) {
        setResponse({ error: true, message: aiResponse.message });
      } else {
        // Step 2: Fresh image
        const image = await getFoodImage(aiResponse.food);
        setResponse({ ...aiResponse, image, error: false });
      }
    } catch (err) {
      console.error("Error generating suggestion:", err);
      setResponse({
        error: true,
        message: "Oops! Something went wrong while generating your food suggestion.",
      });
    } finally {
      setLoading(false);
    }
  };

  const loginUser = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
    fetchFavorites(jwtToken);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    setFavorites([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const fetchFavorites = async (overrideToken) => {
    try {
      const t = overrideToken || token;
      if (!t) return;
      const res = await axios.get(`${API_BASE}/api/favorites`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      setFavorites(res.data);
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    }
  };

  const addFavorite = async (meal) => {
    if (!user || !token) return;

    try {
      await axios.post(
        `${API_BASE}/api/favorites`,
        { food: meal.food, image: meal.image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFavorites();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add favorite");
    }
  };

  const removeFavorite = async (meal) => {
    if (!user || !token) return;

    try {
      const normalizedMeal = meal.trim().toLowerCase();

      // Optimistic UI update: remove from local state first
      setFavorites((prev) =>
        prev.filter((fav) => fav.food.trim().toLowerCase() !== normalizedMeal)
      );

      // Send request to backend
      await axios.post(
        `${API_BASE}/api/favorites/remove`,
        { food: meal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Optionally, re-fetch favorites
      // await fetchFavorites();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to remove favorite");
      fetchFavorites(); // re-sync in case of error
    }
  };

  return (
    <Context.Provider
      value={{
        onSent,
        response,
        loading,
        user,
        token,
        favorites,
        loginUser,
        logoutUser,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
