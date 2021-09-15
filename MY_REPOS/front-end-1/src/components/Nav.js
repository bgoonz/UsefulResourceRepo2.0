import React, { useEffect } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setEvents } from '../actions/eventActions';

import Inviting from './Inviting';
import EventsList from './EventsList';
import InvitedList from './InvitedList';

import axios from 'axios';
const api = axios.create({
  baseURL: 'https://potluck-planner1.herokuapp.com/api',
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJuYW1lIjoidGVzdGVyIiwidXNlcm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE2MjQzNjUwNTQsImV4cCI6MTYyNDk2OTg1NH0.pdyE9DfHyUiz1N8hZQI7veq1c-hRad1hg4kcSFVKg6c'
  }
});

function Nav(props) {
  const dispatch = useDispatch();
  useEffect(()=> {
    api.get('/events')
      .then(res => {
	const returnEvents = res.data.map(event => {
	  return {
	    ...event,
	    food: api.get(`/events/${event.id}/food`),
	    guests: api.get(`/events/${event.id}/guests`)
	  };
	});
	returnEvents.forEach(event => {
	  event.food
	    .then(res => {
	      event.food = res.data;
	    })
	    .catch(alert);
	  event.guests
	    .then(res => {
	      event.guests = res.data;
	    })
	    .catch(alert);
	});
	const allApiCalls = returnEvents
	      .map(event => event.food)
	      .concat(returnEvents
		      .map(event => event.guests));
	
	Promise.all(allApiCalls)
	  .then(vals => {
	    dispatch(setEvents(returnEvents));
	  })
	  .catch(alert);
      })
      .catch(alert);
  }, [dispatch]);

  return (
    <>
      <header>
	<Switch>
	  <Route path='/attendee'>
	    <Link to='/organizer'>
	      Organizer Menu
	    </Link>
	  </Route>
	  <Route path='/organizer'>
	    <Link to='/attendee'>
	      Attendee Menu
	    </Link>
	    <Link to='/add-event'>
	      Add Potluck
	    </Link>
	  </Route>
	</Switch>
      </header>
      <main>
	<Switch>
	  <Route path='/invite-to/:id' component={Inviting}/>
	  <Route path='/attendee'>
	    <InvitedList/>
	  </Route>
	  <Route path='/organizer'>
	    <EventsList/>
	  </Route>
	  <Route path='/'>
	    <Redirect to='/organizer'/> {/* Replace Me */}
	  </Route>
	</Switch>
      </main>
    </>
  )
};

export default Nav;
