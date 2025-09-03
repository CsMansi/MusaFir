import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Hero from './components/custom/Hero'
import Plantrip from './plan-trip/index.jsx'
import ViewTrip from './view-trip/[tripID]/index.jsx'
import MyTrips from './My-trips/index.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const router = createBrowserRouter([
  { path: '/', element: <Hero /> },
  { path: '/plan-trip', element: <Plantrip /> },
  { path: '/view-trip/:tripID', element: <ViewTrip /> },
  { path: '/My-trips', element: <MyTrips /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <App />
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
)
