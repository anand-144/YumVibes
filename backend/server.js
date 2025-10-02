import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: ['http://localhost:5173' , 'https://yum-vibes-r8e6.vercel.app'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is running..."));
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
