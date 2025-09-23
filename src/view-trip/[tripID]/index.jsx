import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/Service/firebaseConfig.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

// Import your components
import InfoSec from './components/InfoSec';
import Hotels from './components/Hotels';
import Itinerary from './components/Itinerary';

const ViewTrip = () => {
    const { tripID } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (tripID) {
            getTripData();
        }
    }, [tripID]);

    const getTripData = async () => {
        setLoading(true);
        const docRef = doc(db, 'Trips', tripID);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setTrip(docSnap.data());
            } else {
                toast.error("Trip not found!");
            }
        } catch (error) {
            console.error("Error fetching trip:", error);
            toast.error("Failed to fetch trip data.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-xl mt-4">Loading your trip...</p>
            </div>
        );
    }
    
    // NOTE: This now correctly looks inside the tripData.travelPlan object
    const travelPlan = trip?.tripData?.travelPlan;

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            {trip ? (
                <div>
                    {/* FIX 1: Pass the full trip object to InfoSec for it to use */}
                    <InfoSec trip={trip} />
                    
                    {/* FIX 2: Pass the hotels array from inside the travelPlan object */}
                    <Hotels hotelList={travelPlan?.hotels} />
                    
                    {/* FIX 3: Pass the itinerary object from inside the travelPlan object */}
                    <Itinerary itinerary={travelPlan?.itinerary} />
                </div>
            ) : (
                 <div className="min-h-screen flex items-center justify-center">
                    Could not find the requested trip.
                 </div>
            )}
        </div>
    );
};

export default ViewTrip;