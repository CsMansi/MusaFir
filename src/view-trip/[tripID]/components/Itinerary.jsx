import React from 'react'
import Placecard from './placecard'

const Itinerary = ({ itinerary }) => { 
  if (!itinerary) {
    return null; 
  }

  return (
    <div>
      <h2 className='font-bold text-2xl mt-5'>
        <span className='text-[#5D2A2A] text-shadow-md'>Daily</span> Itinerary
      </h2>
      <div className='mt-3 space-y-8'>
        {Object.values(itinerary).map((dayPlan, index) => {
          // FIX: This makes the code much safer. It checks for 'Activities' or 'activities'.
          const activities = dayPlan.Activities || dayPlan.activities || [];

          return (
            <div key={index} className="border-b-2 border-gray-200 pb-6">
              <h3 className='font-bold text-xl text-blue-700 mb-4'>
                {dayPlan.Day || `Day ${index + 1}`}
              </h3>
              <div className='grid md:grid-cols-2 gap-5'>
                {activities.map((activity, itemIndex) => (
                    <Placecard key={itemIndex} place={activity} />
                ))}
              </div>
            </div >
          );
        })}
      </div>
    </div>
  )
}

export default Itinerary;