import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

export const GetPlaceDetails = async (text) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        textQuery: text, // ✅ body me textQuery dena hai
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": import.meta.env.VITE_PLACES_API_KEY, // ✅ Places API key
          "X-Goog-FieldMask": "places.displayName,places.photos,places.id", // ✅ fieldMask sahi jagah
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("GetPlaceDetails Error:", err.response?.data || err.message);
    return { error: err.message };
  }
};
