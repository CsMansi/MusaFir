import React from 'react'
import { Link } from 'react-router-dom'

// ✅ Prop ka naam 'trip' se 'hotelList' kiya gaya taaki parent se match ho
const Hotels = ({ hotelList }) => { 
    return (
        <div>
            <h1 className='font-bold text-2xl mt-5'><span className='text-[#FF5050] text-shadow-md'>Hotel</span> Recommendations</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
                {/* ✅ Loop ab seedha 'hotelList' par chal raha hai */}
                {hotelList.map((hotel, index) => {
                    return (
                        // ✅ Google Maps ka link theek kiya gaya hai
                        <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel.HotelName}, ${hotel.HotelAddress}`} target='_blank' key={index}>
                            <div className='hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer p-3 rounded-xl border'>
                                {/* ✅ Hotel ki asli image URL ka istemal kiya gaya, agar na ho toh placeholder dikhega */}
                                <img className='rounded-xl h-[180px] w-full object-cover' 
                                    src={hotel.HotelImageURL?.includes('example.com') ? '/hotel.jpg' : hotel.HotelImageURL} 
                                    alt={hotel.HotelName} 
                                />
                                <div className='my-2 flex flex-col gap-1'>
                                    <h2 className='font-medium text-lg'>{hotel.HotelName}</h2>
                                    <h2 className='text-xs text-gray-500'>📍 {hotel.HotelAddress}</h2>
                                    <h2 className='text-sm font-medium'>💰 {hotel.Price}</h2>
                                    <h2 className='text-sm font-medium'>⭐ {hotel.rating} Stars</h2>
                                oversikt
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Hotels