## Visit
https://yum-vibes-r8e6.vercel.app/

![Screenshot](https://i.postimg.cc/Wznwy79D/yum-vibes-r8e6-vercel-app-2.png)

<div align="center">
  <h1>🍱 YumVibes</h1>
  <h3>AI-Powered Mood-Based Food Recommender & Recipe Generator</h3>
  <p>“Your Mood, Your Meal — Let AI Cook Up the Perfect Dish!”</p>
  <br/>
  <img src="https://img.shields.io/badge/Made_with-React-blue?logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/Backend-Express.js-green?logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/AI-Gemini_AI-orange?logo=google&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?logo=open-source-initiative&logoColor=white"/>
</div>

---

## 🌈 Overview

**YumVibes** is a fun and intelligent food suggestion web app that uses **AI** to recommend dishes based on your **mood** 😄😢☕❤️.  
It not only suggests meals but also generates **full recipes** and **realistic images** of your dish using **Google Gemini AI**.

Whether you’re feeling happy, sad, romantic, or lazy — **YumVibes** curates the perfect recipe to lift your spirits 🍳💫.

---

## ✨ Key Features

- 🎭 **Mood-Based Food Suggestion:** Input or choose your mood; get AI-generated dish recommendations.
- 🍽️ **Auto Recipe Generator:** Detailed recipe with ingredients, steps, and tips.
- 📸 **AI Dish Images:** Realistic food images generated instantly.
- ❤️ **Favorites:** Save dishes you love for later.
- 🔐 **JWT Auth:** Secure user login and registration.
- 🌤️ **Beautiful Animated UI:** Floating emojis and gradient backgrounds add life to every page.

---

## 🧠 How It Works

1. Choose or type your current mood.  
2. Gemini AI analyzes your text and emotion.  
3. AI suggests a dish matching your vibe.  
4. The app then:
   - 🧂 Generates a complete recipe  
   - 🖼️ Creates a matching dish image  
   - 💾 Lets you save it to your favorites  

---

## 🛠️ Tech Stack

### ⚙️ Backend
- **Node.js + Express 5**
- **MongoDB + Mongoose**
- **JWT + bcrypt** authentication
- **dotenv, cors** configuration
- **Gemini AI API** integration

### 🎨 Frontend
- **React 19 + Vite**
- **Tailwind CSS 4**
- **Framer Motion**
- **React Router v7**
- **React Toastify**
- **Lucide Icons**

---

## 📂 Project Structure

YumVibes/
│
├── backend/
│ ├── server.js
│ ├── models/
│ ├── middleware/
│ ├── routes/
│ ├── controllers/
│ └── config/
│
├── frontend/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── services/
│ └── index.html
│
└── README.md


---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/anand-144/YumVibes.git
cd YumVibes
```

2️⃣ Backend Setup
cd backend
npm install
npm run dev

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev


Then open:
👉 http://localhost:5173

🍳 Example Moods & Results
Mood	Suggested Dish	Description
😊 Happy	Mango Smoothie Bowl	A bright tropical bowl to match your joy
😢 Sad	Chocolate Lava Cake	Comforting, warm, and rich
☕ Calm	Green Tea & Mochi	Gentle flavors to match your serenity
❤️ Romantic	Italian Pasta & Wine	A candlelight classic for two

## 📦 Deployment

Frontend: Vercel / Netlify
Backend: Render / Railway
Database: MongoDB Atlas

## 🤝 Contributing

Pull requests are welcome!
If you’d like to suggest new moods or cuisines, feel free to open an issue.

## 📜 License

This project is licensed under the MIT License.
