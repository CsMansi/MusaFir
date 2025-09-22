// src/view-trip/[tripID]/components/Hotels.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { getPhoto } from '@/service/pexelsService'; // Import the new service

// A new component for each hotel card to manage its own image
const HotelCard = ({ hotel }) => {
    const [imageUrl, setImageUrl] = useState('/hotel.jpg'); // Fallback image

    useEffect(() => {
        const fetchImage = async () => {
            // Search for the hotel name + its city for better results
            const query = `${hotel.HotelName} ${hotel.HotelAddress.split(',')[1]}`;
            const photo = await getPhoto(query);
            if (photo) {
                setImageUrl(photo);
            }
        };

        fetchImage();
    }, [hotel.HotelName, hotel.HotelAddress]);

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.HotelName + ", " + hotel.HotelAddress)}`;

    return (
        <Link to={googleMapsUrl} target='_blank' rel="noopener noreferrer">
            <div className='hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer p-3 rounded-xl border h-full'>
                <img 
                    className='rounded-xl h-[180px] w-full object-cover' 
                    src={imageUrl} 
                    alt={hotel.HotelName} 
                />
                <div className='my-2 flex flex-col gap-1'>
                    <h2 className='font-medium text-lg truncate'>{hotel.HotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel.HotelAddress}</h2>
                    <h2 className='text-sm font-medium'>💰 {hotel.Price}</h2>
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className='ml-1 text-sm font-medium'>{hotel.rating} Stars</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// The main Hotels component now just renders the list
const Hotels = ({ hotelList }) => { 
    if (!hotelList) {
        return null;
    }
    return (
        <div>
            <h1 className='font-bold text-2xl mt-5'><span className='text-[#FF5050] text-shadow-md'>Hotel</span> Recommendations</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
                {hotelList.map((hotel, index) => (
                    <HotelCard key={index} hotel={hotel} />
                ))}
            </div>
        </div>
    )
}

export default Hotels;