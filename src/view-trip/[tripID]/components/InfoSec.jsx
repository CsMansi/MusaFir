import React, { useState, useEffect } from 'react';
import { WhatsappShareButton, WhatsappIcon } from "react-share";

const InfoSec = ({ trip }) => {
    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        setShareUrl(window.location.href);
    }, []);

    const userSelection = trip?.userSelection;
    const tripData = trip?.tripData;
    const imageUrl = tripData?.itinerary?.Plan1?.Activities[0]?.PlaceImageURL || '/city1.png';

    if (!userSelection) {
        return null;
    }

    return (
        <div>
            <img 
                className='h-[340px] w-full object-cover rounded-xl' 
                src={imageUrl.includes('example.com') ? '/city.jpg' : imageUrl} 
                alt={userSelection.location} 
            />
            
            <div className='flex justify-between items-center my-5'>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-2xl'>Your Trip to {userSelection.location}</h1>
                    <div className='flex flex-wrap gap-3'>
                        <h2 className='p-2 px-3 bg-gray-200 rounded-full text-black sm:text-base font-semibold'>
                            📅 {userSelection.duration} Days
                        </h2>
                        <h2 className='p-2 px-3 bg-gray-200 rounded-full text-black sm:text-base font-semibold'>
                            💰 {userSelection.budget} Budget
                        </h2>
                        <h2 className='p-2 px-3 bg-gray-200 rounded-full text-black sm:text-base font-semibold'>
                            ✈️ Travelers: {userSelection.people}
                        </h2>
                    </div>
                </div>

                {/* FIX: Removed the extra <Button> wrapper to fix the console warning */}
                <WhatsappShareButton
                    url={shareUrl}
                    title={`Check out my trip to ${userSelection.location}!`}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    <WhatsappIcon size={24} round />
                    <span>Share</span>
                </WhatsappShareButton>
            </div>
        </div>
    )
}

export default InfoSec;