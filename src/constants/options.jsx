export const SelectTravelList = [
    {
        id: 1,
        title: "Just me",
        desc: "Sirf main, mera backpack, aur ek naya raasta.",
        icon: '🎧',
        people: "1"
    },
    {
        id: 2,
        title: "A Couple",
        desc: "Har pal ko khaas banayein, apne humsafar ke saath.",
        icon: '👥',
        people: "2 People"
    },
    {
        id: 3,
        title: "Family",
        desc: "Ek aisi family trip, jiske kisse hamesha yaad rahenge.",
        icon: '🏡',
        people: "3 to 5 people"
    },
    {
        id: 4,
        title: "Friends",
        desc: "Trip, jo sirf group chat tak nahi rehta.",
        icon: '🧑‍🤝‍🧑',
        people: "5 to 10 people"
    },
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Budget",
        desc: "Essential and affordable options for the conscious traveler.",
        icon: '💵',
    },
    {
        id: 2,
        title: "Mid-range",
        desc: "Comfortable choices for a balanced experience",
        icon: '💰',
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Premium experiences for those who seek the best",
        icon: '💸',
    }
]

// Inside src/constants/options.jsx

export const AI_Prompt = `
Generate a travel plan for a location based on the user's input.
The user's request is for a trip to {Location} for {Duration} days, with a {Budget} budget for {People} people.

IMPORTANT INSTRUCTIONS:
1.  You MUST respond with only a valid JSON object.
2.  Do NOT include any text, notes, or explanations outside of the JSON object.
3.  Do NOT use Markdown formatting (like \`\`\`json).
4.  All keys and string values in the JSON must be enclosed in double quotes ("").
5.  Ensure there are no trailing commas or comments.
6.  The final JSON structure MUST follow this exact schema:

{
  "travelPlan": {
    "location": "The name of the location",
    "duration": "The number of days",
    "budget": "The budget type",
    // ✅ NEW INSTRUCTION & EXAMPLE ADDED HERE
    "hotels": [ // Provide at least 4 different hotel options in this array.
      {
        "HotelName": "First Hotel Name",
        "HotelAddress": "Address of the hotel",
        "Price": "Price range per night",
        "HotelImageURL": "A valid, placeholder image URL like https://example.com/image.jpg",
        "GeoCoordinates": {
          "latitude": 12.3456,
          "longitude": 78.9101
        },
        "rating": 4.2,
        "description": "A brief description of the hotel."
      },
      {
        "HotelName": "Second Hotel Name",
        "HotelAddress": "Address of the hotel",
        "Price": "Price range per night",
        "HotelImageURL": "A valid, placeholder image URL like https://example.com/image.jpg",
        "GeoCoordinates": {
          "latitude": 12.3456,
          "longitude": 78.9101
        },
        "rating": 4.2,
        "description": "A brief description of the hotel."
      }
    ],
    "itinerary": {
      "Plan1": {
        "Day": "Day 1",
        "Activities": [ // For each day, provide an optimized plan with 3 to 4 activities that are geographically close to each other.
          {
            "PlaceName": "Name of the place",
            "PlaceDetails": "A brief description of the place/activity.",
            "PlaceImageURL": "A valid, placeholder image URL like https://example.com/place.jpg",
            "GeoCoordinates": {
              "latitude": 12.3456,
              "longitude": 78.9101
            },
            "TicketPricing": "Ticket price or 'Free'",
            "BestTime": "Best time to visit"
          }
        ]
      },
      "Plan2": {
        "Day": "Day 2",
        "Activities": []
      }
    }
  }
}
`;