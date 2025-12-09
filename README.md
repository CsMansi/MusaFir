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

To run this project locally, you will need to add the following environment variables to your `.env` file.

Create a file named `.env` in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key

# Google OAuth & Maps
VITE_GOOGLE_AUTH_CLIENT_ID=your_oauth_client_id
VITE_PLACES_API_KEY=your_google_places_api_key
