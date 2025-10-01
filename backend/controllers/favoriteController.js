import User from "../models/User.js";

// Get all user's favorites
export const getFavorites = async (req, res) => {
  try {
    res.status(200).json(req.user.favorites || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a meal to favorites
export const addFavorite = async (req, res) => {
  try {
    const { food, image } = req.body;
    if (!food) return res.status(400).json({ message: "Food required" });

    const exists = req.user.favorites.find(fav => fav.food === food);
    if (exists) return res.status(400).json({ message: "Already in favorites" });

    req.user.favorites.push({ food, image });
    await req.user.save();

    res.status(201).json(req.user.favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove a meal from favorites
export const removeFavorite = async (req, res) => {
  try {
    const { food } = req.body;
    req.user.favorites = req.user.favorites.filter(fav => fav.food !== food);
    await req.user.save();
    res.status(200).json(req.user.favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
