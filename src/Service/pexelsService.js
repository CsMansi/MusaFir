// src/service/pexelsService.js

import axios from 'axios';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const getPhoto = async (query) => {
    try {
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });

        // Return the URL of the first photo found
        if (response.data.photos.length > 0) {
            return response.data.photos[0].src.large;
        }
        return null; // Return null if no photo is found
    } catch (error) {
        console.error("Error fetching photo from Pexels:", error);
        return null;
    }
};