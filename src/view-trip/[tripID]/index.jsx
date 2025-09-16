import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { db } from '@/Service/firebaseConfig';
import InfoSec from './components/InfoSec';
import Hotels from './components/Hotels';
import Itinerary from './components/Itinerary';
import Footer from '../../components/custom/footer';

const viewtrip = () => {

    const {tripID} = useParams();
    const [trip, settrip] = useState(null); 

    useEffect(() => {
        tripID && GetTripData();
    }, [tripID]);
    
    const GetTripData = async () => {
        const docRef = doc(db, "Trips", tripID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            settrip(docSnap.data());
        } else {
            console.log("No such document!");
            toast.error("No such trip found!");
        }
    };

    if (!trip) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading your trip...</div>
            </div>
        );
    }

    // ✅ YAHAN CODE KO SACHA KIYA GAYA HAI
    // Since our new prompt is very strict, we can rely on a consistent data structure.
    const hotels = trip?.tripdata?.travelPlan?.hotels || [];
    const itinerary = trip?.tripdata?.travelPlan?.itinerary || {};

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <InfoSec trip={trip} />
            <Hotels hotelList={hotels} />
            <Itinerary itineraryData={itinerary} />
            <Footer />
        </div>
    )
}

export default viewtrip;