import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // protect all routes

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/', removeFavorite);

export default router;
