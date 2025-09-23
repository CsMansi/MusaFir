// src/view-trip/[tripID]/components/placecard.jsx

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button.jsx';
import { FaMapLocationDot } from "react-icons/fa6";
import { getPhoto } from '@/Service/pexelsService'; // Import the new service

const Placecard = ({ place }) => {
    // State to hold the image URL
    const [imageUrl, setImageUrl] = useState('/placeholder.jpg');

    useEffect(() => {
        // This function runs when the component loads
        const fetchImage = async () => {
            // Use the Pexels service to get a real image
            const photo = await getPhoto(place.PlaceName);
            if (photo) {
                setImageUrl(photo);
            }
        };
        
        fetchImage();
    }, [place.PlaceName]); // Re-run if the place name changes

    const createMapLink = () => {
        const { latitude, longitude } = place.GeoCoordinates || {};
        if (latitude && longitude) {
            return `https://www.google.com/maps/search/?api=1&query=$,${latitude},${longitude}`;
        }
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.PlaceName)}`;
    };

    return (
        <div className='flex gap-4 border rounded-xl p-3 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out h-full'>
            <img 
                className='w-[130px] h-full object-cover rounded-xl' 
                src={imageUrl} // Use the state variable for the image source
                alt={place.PlaceName} 
            />
            <div className='flex flex-col justify-between flex-1'>
                <div className="flex flex-col gap-1">
                    <h2 className='font-bold text-lg'>{place.PlaceName}</h2>
                    <p className='text-sm text-gray-500'>{place.PlaceDetails}</p>
                    <h3 className='text-sm font-medium mt-1'>💰 {place.TicketPricing}</h3>
                    <h3 className='text-sm font-medium'>🕒 {place.BestTime}</h3>
                </div>
                <div className="mt-2">
                    <a href={createMapLink()} target='_blank' rel="noopener noreferrer">
                        <Button className='flex items-center gap-2 h-auto p-2'>
                            <FaMapLocationDot />
                            <span className="text-xs">View on Map</span>
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Placecard;