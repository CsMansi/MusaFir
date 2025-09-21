import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

// UPDATE: Added Share2 icon
import { Share2 } from 'lucide-react';

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
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setTrip(docSnap.data());
        } else {
            toast.error("Trip not found!");
        }
        setLoading(false);
    };

    // UPDATE: Function to handle sharing the trip link
    const handleShare = () => {
        const url = window.location.href;
        
        // Use a temporary textarea to copy the text
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            toast.success("Link Copied to Clipboard!");
        } catch (err) {
            toast.error("Failed to copy link.");
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading your trip...</div>;
    }

    if (!trip) {
        return <div className="min-h-screen flex items-center justify-center">Could not find the requested trip.</div>;
    }

    // This is a placeholder for your actual trip view UI
    return (
        <div className="p-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Your Trip to {trip?.userSelection?.location}</h1>
                {/* UPDATE: The share button now calls the handleShare function */}
                <Button onClick={handleShare} className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" /> Share
                </Button>
            </div>

            {/* Your existing trip details, itinerary, hotel info, etc. would go here */}
            <div className="mt-8">
                <p><strong>Duration:</strong> {trip?.userSelection?.duration} Days</p>
                <p><strong>Budget:</strong> {trip?.userSelection?.budget}</p>
                <p><strong>Travelers:</strong> {trip?.userSelection?.people}</p>
            </div>
            {/* ... rest of your UI */}
        </div>
    );
};

export default ViewTrip;

