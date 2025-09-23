import React from 'react';
import '@/App.css';
import Navbar from '@/components/custom/Navbar.jsx';
// ✅ Sahi Code
import Footer from '@/components/custom/Footer.jsx';
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from 'react-router-dom';

function App() {
  return (
    // YEH CLASS 'bg-background' POORI SITE KA BACKGROUND THEME KE ANUSAAR SET KARTI HAI
    <div className="bg-background">
      <Navbar />
      
      <main className="min-h-screen">
        <Outlet />
      </main>
      
      <Toaster />
      <Footer />
    </div>
  )
}

export default App;

