import React from 'react';
import './App.css';
import Navbar from './components/custom/Navbar.jsx';
import Footer from './components/custom/Footer.jsx'; // Corrected the component name to match standard naming conventions
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from 'react-router-dom'; // <-- Import Outlet

function App() {
  return (
    <>
      <Navbar />
      
      {/* Outlet will render the current page's component based on the URL */}
      <main className="min-h-screen">
        <Outlet />
      </main>
      
      <Toaster />
      <Footer />
    </>
  )
}

export default App