# 🌍 MusaFir - AI Powered Trip Planner

**MusaFir** (Traveler) is an intelligent travel planning application that helps you create personalized trip itineraries in seconds. Powered by **Google Gemini AI**, it generates day-by-day plans, budget estimates, and hotel recommendations tailored to your preferences.

---

## 🚀 Key Features

- **🤖 AI-Generated Itineraries:** Get detailed daily plans including best time to visit and ticket pricing using **Google Gemini AI**.
- **🏨 Smart Hotel Suggestions:** Recommendations based on budget and location with images powered by **Google Places API**.
- **📸 Dynamic Visuals:** Automatically fetches high-quality travel photos for every location.
- **🔐 Secure Login:** Seamless authentication using **Google Sign-In** (Firebase Auth).
- **☁️ Cloud Sync:** Saves your trip history securely in **Firebase Firestore**.
- **📱 Responsive UI:** Built with **React + Vite** and styled with **Tailwind CSS** for a smooth mobile & desktop experience.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Shadcn UI
- **Backend (BaaS):** Firebase (Authentication, Firestore)
- **AI Model:** Google Gemini API
- **APIs:** Google Places API, Google Maps API

---

## ⚙️ Environment Variables

To run this project locally, create a `.env` file in the root directory and add the following keys:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# AI & Google APIs
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_AUTH_CLIENT_ID=your_oauth_client_id
VITE_PLACES_API_KEY=your_places_api_key
