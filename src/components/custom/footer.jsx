// src/components/custom/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  // CHANGE: Removed the "mt-20" class to reduce the space above the footer.
  return (
    <footer className="bg-[#3D1E1E] text-gray-200 p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Brand & Logo */}
        <div className="flex flex-col items-center md:items-start">
          {/* Make sure this logo path is correct */}
          <img src="/MusaFir-logo-light.svg" alt="MusaFir Logo" className="w-24 mb-4" />
          <p className="text-center md:text-left text-sm text-gray-400">
            Your personal AI travel planner, creating unforgettable journeys just for you.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-white text-center md:text-left">Quick Links</h3>
          <ul className="space-y-2 text-center md:text-left">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/plan-trip" className="hover:text-white transition-colors">Plan a Trip</Link></li>
            <li><Link to="/my-trips" className="hover:text-white transition-colors">My Trips</Link></li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-white text-center md:text-left">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-2xl hover:text-white transition-colors"><FaInstagram /></a>
            <a href="#" className="text-2xl hover:text-white transition-colors"><FaTwitter /></a>
            <a href="#" className="text-2xl hover:text-white transition-colors"><FaFacebookF /></a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
        <p>Copyright © 2025 MusaFir | All rights reserved</p>
        <p className="mt-1">Handcrafted with ❤️ by Mansi</p>
      </div>
    </footer>
  );
}

export default Footer;