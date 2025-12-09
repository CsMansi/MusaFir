import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const HotelCard = ({ hotel }) => {
    // Fallback images in case Google API fails
    // Fallback images (Direct online links)
    const fallbackImages = [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1425&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1470&auto=format&fit=crop'
    ];
    
    // Pick a random default image initially
    const [imageUrl, setImageUrl] = useState(fallbackImages[Math.floor(Math.random() * fallbackImages.length)]);

    useEffect(() => {
        const fetchGooglePlacePhoto = async () => {
            try {
                // Ensure we have a valid query
                const searchText = `${hotel?.HotelName}, ${hotel?.HotelAddress}`;
                
                const response = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': import.meta.env.VITE_PLACES_API_KEY, 
                        'X-Goog-FieldMask': 'places.photos,places.id'
                    },
                    body: JSON.stringify({
                        textQuery: searchText
                    })
                });

                if (!response.ok) {
                    console.error("API Error:", response.statusText);
                    return; 
                }

                const data = await response.json();

                if (data.places && data.places[0]?.photos?.length > 0) {
                    const photoName = data.places[0].photos[0].name;
                    // Construct the final URL
                    const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_PLACES_API_KEY}`;
                    setImageUrl(photoUrl);
                } 

            } catch (error) {
                console.error("Error fetching hotel image:", error);
            }
        };

        if (hotel?.HotelName) {
            fetchGooglePlacePhoto();
        }
    }, [hotel]);

    // ✅ FIXED: Correct Google Maps URL syntax
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.HotelName + "," + hotel?.HotelAddress)}`;

    return (
        <Link to={googleMapsUrl} target='_blank' rel="noopener noreferrer">
            <div className='hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer p-3 rounded-xl border h-full bg-white'>
                <img 
                    className='rounded-xl h-[180px] w-full object-cover' 
                    src={imageUrl} 
                    alt={hotel?.HotelName} 
                    onError={(e) => {
                        // If image fails to load, switch to a fallback
                        e.target.src = '/hotel.jpg'; 
                    }}
                />
                <div className='my-2 flex flex-col gap-1'>
                    <h2 className='font-medium text-lg truncate'>{hotel?.HotelName}</h2>
                    <h2 className='text-xs text-gray-500 line-clamp-2'>📍 {hotel?.HotelAddress}</h2>
                    <h2 className='text-sm font-medium'>💰 {hotel?.Price}</h2>
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className='ml-1 text-sm font-medium'>{hotel?.rating} Stars</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const Hotels = ({ hotelList }) => { 
    if (!hotelList || hotelList.length === 0) {
        return null;
    }
    return (
        <div>
            <h1 className='font-bold text-2xl mt-5'>
                <span className='text-[#5D2A2A] text-shadow-md'>Hotel</span> Recommendations
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 pb-10'>
                {hotelList.map((hotel, index) => (
                    <HotelCard key={index} hotel={hotel} />
                ))}
            </div>
        </div>
    )
}

export default Hotels;