import React, { createContext, useState, useEffect } from "react";
import { runChat } from "../services/geminiService";
import { getFoodImage } from "../services/imageService.js";
import axios from "axios";

export const Context = createContext();

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
      const res = await axios.get("http://localhost:5000/api/favorites", {
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
      "http://localhost:5000/api/favorites",
      { food: meal.food, image: meal.image },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchFavorites();
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to add favorite");
  }
};

const removeFavorite = async (meal) => {
  if (!user || !token) return;

  try {
    await axios.post(
      "http://localhost:5000/api/favorites/remove",
      { food: meal.food },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchFavorites();
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to remove favorite");
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
