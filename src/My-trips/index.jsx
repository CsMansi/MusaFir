// src/pages/MyTrips.jsx

import { db } from '@/Service/firebaseConfig';
import UserTripItemCard from './components/UserTripItemCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
// CHANGED: Using useNavigate for programmatic navigation
import { useNavigate } from 'react-router-dom';

const MyTrips = () => {
    // CHANGED: Renamed to 'navigate' for clarity
    const navigate = useNavigate();

    const [userTrips, setUserTrips] = useState([]);
    // ADDED: A loading state for better UI control
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user) {
            // CHANGED: Correctly call navigate function
            navigate('/');
            return;
        }

        const q = query(collection(db, "Trips"), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);

        // CHANGED: Collect all trips first, then set state once.
        const trips = [];
        querySnapshot.forEach((doc) => {
            // Assuming your doc data has an 'id' field, if not, you can add it
            trips.push({ ...doc.data(), id: doc.id });
        });

        setUserTrips(trips);
        setLoading(false); // Set loading to false after data is fetched
    };

    return (
        <div className='sm:px-10 md:px-15 lg:px-20 xl:px-25 px-5 mt-10'>
            <h2 className='font-extrabold text-4xl text-center'>
                My <span className="text-[#5D2A2A]">Trips</span>
            </h2>

            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {/* CHANGED: Logic now uses the loading state */}
                {!loading && userTrips.length > 0 && userTrips.map((trip) => (
                    // CHANGED: Using trip.id for a stable and unique key
                    <UserTripItemCard trip={trip} key={trip.id} />
                ))}

                {/* Show skeleton loaders while loading */}
                {loading && [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                    <div key={index} className='h-[300px] w-full bg-slate-200 animate-pulse rounded-2xl'></div>
                ))}

                {/* Show a message if not loading and no trips are found */}
                {!loading && userTrips.length === 0 && (
                    <div className="col-span-full text-center py-10">
                        <p className="text-lg text-gray-500">You haven't planned any trips yet!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTrips;