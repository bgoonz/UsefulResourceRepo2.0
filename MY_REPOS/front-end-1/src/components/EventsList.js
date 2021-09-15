import React from 'react';
import { connect } from 'react-redux';

import EventCard from './EventCard';

function EventsList({events}) {
  return (
    <div className='organizer'>
      { events.map(event => <EventCard key={event.id} event={event}/>)}
    </div>
  )
}

const state2props = (state) => {
  return {
  events: state.events.events
  };
};

export default connect(state2props)(EventsList);
