import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Page Imports
import Hero from './components/custom/Hero'
import Plantrip from './plan-trip/index.jsx'
import ViewTrip from './view-trip/[tripID]/index.jsx'
import MyTrips from './My-trips/index.jsx'

// Provider Imports
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from './components/ThemeProvider.jsx' // <-- Import ThemeProvider

// This new structure makes <App /> the layout for all your pages.
// Your Navbar will now appear on every page correctly.
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App component is now the main layout
    children: [
      { path: '/', element: <Hero /> },
      { path: '/plan-trip', element: <Plantrip /> },
      { path: '/view-trip/:tripID', element: <ViewTrip /> },
      { path: '/my-trips', element: <MyTrips /> }, // Path is now lowercase to match navbar link
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap everything with the ThemeProvider */}
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        {/* RouterProvider now renders your entire app structure */}
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)