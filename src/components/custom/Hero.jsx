import React from 'react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[85vh] py-20 px-4 text-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/Landing.png")' }}
    >
      {/* UPDATE: Increased opacity for better text readability */}
      <div className="absolute inset-0 bg-black opacity-0"></div>

      <div className="relative z-10 flex flex-col items-center">
        
        <h1 className='font-extrabold text-4xl md:text-5xl text-white text-center'>
          Naye raaste <span className='text-[#F5C7B8]'>aapko kahan</span> bula rahe hain?
        </h1>
        
        <h2 className='text-xl md:text-2xl text-center text-gray-200 mt-6 max-w-3xl'>
          Unburden yourself from the noise of daily life and the hassle of planning. Our smart AI builds your perfect path to peace and adventure.
        </h2>
        
        <Link to="/plan-trip" className="mt-10">
          {/* UPDATE: Redesigned button with a gradient, shadow, and hover effect */}
          <Button className="cursor-pointer bg-gradient-to-r from-[#8a4a4a] to-[#5D2A2A] text-white text-lg h-14 px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            Plan Your Trip &gt;
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;

