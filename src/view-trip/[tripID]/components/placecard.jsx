import React from 'react'
import { Button } from '@/components/ui/Button'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const Placecard = ({ place }) => {
    return (
        <div className='border rounded-xl p-3 flex gap-5 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out'>
            
            {/* ✅ Place ki asli image URL ka istemal kiya gaya */}
            <img 
                className='w-[130px] h-[130px] rounded-xl object-cover' 
                src={place.PlaceImageURL?.includes('example.com') ? '/placeholder.jpg' : place.PlaceImageURL} 
                alt={place.PlaceName} 
            />

            <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-lg'>{place.PlaceName}</h2>
                <p className='text-sm text-gray-500'>{place.PlaceDetails}</p>
                <h2 className='text-sm font-medium'>💰 {place.TicketPricing}</h2>
                <h2 className='text-sm font-medium'>🕒 {place.BestTime}</h2>
            </div>

            {/* ✅ Google Maps ka link theek kiya gaya */}
            <Link to={`https://www.google.com/maps/search/?api=1&query=${place.PlaceName}`} target='_blank' className="self-end">
                <Button className='p-3 h-auto'><FaMapLocationDot /></Button>
            </Link>
        </div>
    )
}

export default Placecard