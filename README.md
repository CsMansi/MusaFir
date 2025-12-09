# 🌍 MusaFir - AI Powered Trip Planner

**MusaFir** (Traveler) is an intelligent travel planning application that generates personalized itineraries, hotel recommendations, and travel tips using Google Gemini AI. Plan your next adventure in seconds!

🔗 **Live Demo:** [https://musa-fir-hyzk.vercel.app/](https://musa-fir-hyzk.vercel.app/)

---

## 🚀 Features

* **🤖 AI-Powered Itineraries:** Generates day-by-day travel plans based on your budget, days, and companion preference using **Google Gemini AI**.
* **🏨 Smart Hotel Recommendations:** Fetches highly rated hotels with images, pricing, and geo-coordinates.
* **📸 Dynamic Visuals:** Automatically fetches high-quality images of locations using **Google Places API** (or Pexels/Unsplash).
* **🔐 Secure Authentication:** Seamless sign-in using **Google OAuth** via Firebase.
* **📱 Responsive Design:** Fully optimized for mobile and desktop using **Tailwind CSS**.
* **💾 Cloud Storage:** Saves user trips and data securely in **Firebase Firestore**.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite
* **Styling:** Tailwind CSS, Shadcn UI, Lucide React
* **Backend/BaaS:** Firebase (Authentication, Firestore)
* **AI Model:** Google Gemini API
* **APIs:** Google Places API, Google Maps API

---

## ⚙️ Environment Variables

```bash

git clone [https://github.com/your-username/musa-fir-trip-planner.git](https://github.com/your-username/musa-fir-trip-planner.git)
cd musa-fir-trip-planner
Install dependencies:

```bash

npm install
Run the development server:

```bash

npm run dev
Open http://localhost:5173 with your browser to see the result.

📂 Project Structure
├── public/              # Static assets (images, icons)
├── src/
│   ├── components/      # Reusable UI components
│   ├── constants/       # Options for budget, travelers, etc.
│   ├── service/         # API calls (GlobalApi.jsx, AIModel.jsx)
│   ├── view-trip/       # Trip details and display logic
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point
└── index.html
