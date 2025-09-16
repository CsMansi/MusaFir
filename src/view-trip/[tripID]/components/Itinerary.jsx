import React from 'react'
import Placecard from './placecard'

const Itinerary = ({ itineraryData }) => { 
  return (
    <div>
      <h1 className='font-bold text-2xl mt-5'><span className='text-[#FF5050] text-shadow-md'>Daily</span> Itinerary</h1>
      <div>
        {itineraryData && Object.values(itineraryData).map((day, index) => (
          <div key={index} className="mt-5">
            <h2 className='font-bold text-xl'>Day {day.Day || day.day || index + 1}</h2>
            <div className='grid md:grid-cols-2 gap-5 mt-3'>
              
              {/* ✅ CHANGE MADE HERE: Now checks for both 'day.Plan.Activities' and 'day.Activities' */}
              {(day.Plan?.Activities || day.Activities || day.activities)?.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <Placecard place={item} />
                </div>
              ))}

            </div>
          </div >
        ))}
      </div>
    </div>
  )
}

export default Itinerary;