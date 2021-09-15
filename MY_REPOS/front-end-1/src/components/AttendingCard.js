import React from 'react';

// import FoodRequestList from './FoodRequestList';

function AttendingCard({event}) {
  return (
    <div className='attending-card'>
      <h3>{event.title}</h3>
      <p>Location: {event.location}</p>
      <p>Date: {event.month} {event.day}, {event.year}</p>
      <p>Time: {event.start_time}-{event.end_time}</p>
      {/* <FoodRequestList foodRequests={event.food}/> */}
    </div>
  )
}

export default AttendingCard;
    
