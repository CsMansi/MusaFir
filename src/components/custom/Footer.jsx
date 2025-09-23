import React from 'react';

const Footer = () => {
  return (
    // FIX: Corrected the background color hex code by removing the 's'.
    // FIX: Changed 'text-black-400' to a valid class 'text-gray-800' for better contrast.
    <footer className="bg-[#F5C7B8] text-gray-800 p-6 text-center text-sm font-semibold">
      <p>Copyright © 2025 MusaFir | All rights reserved</p>
      <p className="mt-1">Handcrafted with ❤️ by Mansi</p>
    </footer>
  );
}

export default Footer;

