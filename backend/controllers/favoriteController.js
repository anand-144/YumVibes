import User from '../models/User.js';

export const getFavorites = async (req, res) => {
  res.json(req.user.favorites);
};

export const addFavorite = async (req, res) => {
  const { meal } = req.body;
  if (!meal) return res.status(400).json({ message: 'Meal required' });

  if (!req.user.favorites.includes(meal)) {
    req.user.favorites.push(meal);
    await req.user.save();
  }

  res.json(req.user.favorites);
};

export const removeFavorite = async (req, res) => {
  const { meal } = req.body;
  req.user.favorites = req.user.favorites.filter(m => m !== meal);
  await req.user.save();
  res.json(req.user.favorites);
};
