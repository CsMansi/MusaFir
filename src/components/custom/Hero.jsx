import React from 'react'
import { Button } from '../ui/Button.jsx'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex items-center flex-col m-16'>
      <h1 className='font-extrabold text-3xl text-center'>Naye raaste <span className='text-[#5D2A2A] text-shadow-md'>aapko kahan </span>bula rahe hain?</h1>
      <h2 className=' text-2xl text-center text-gray-700 m-13 w-[60%]'>Unburden yourself from the noise of daily life and the hassle of planning. Our smart AI builds your perfect path to peace and adventure.</h2>
      <Link to="/plan-trip"><Button className=" cursor-pointer p-5">Plan Your Trip &gt; </Button></Link>

      <img className='m-20' src="/Landing.png" alt="" />
    </div>
  )
}

export default Hero
