import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

// ✅ Query function
export const GetPlaceDetails = async (text) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query: text,
        key: import.meta.env.VITE_GEMINI_API_KEY, // API key here
        fields: 'places.photos,places.displayName,places.id', // fieldMask
      }
    });
    return response.data;
  } catch (err) {
    console.error("GetPlaceDetails Error:", err);
    return { error: err.message };
  }
};
