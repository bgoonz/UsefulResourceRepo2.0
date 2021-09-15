import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { connect } from 'react-redux';
import { editEvent } from '../actions/eventActions';

import axios from 'axios';
const api = axios.create({
  baseURL: 'https://potluck-planner1.herokuapp.com/api',
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJuYW1lIjoidGVzdGVyIiwidXNlcm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE2MjQzNjUwNTQsImV4cCI6MTYyNDk2OTg1NH0.pdyE9DfHyUiz1N8hZQI7veq1c-hRad1hg4kcSFVKg6c'
  }
});

function Inviting(props) {
  const { push } = useHistory();
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (props.events.length) {
      const guestSet = new Set(props.events
			       .find(event => event.id === Number(id))
			       .guests
			       .map(guest => guest.id));
      api.get('/users')
	.then(res => {
	  setUsers(res.data.map(user => {
	    return {
	      ...user,
	      invited: guestSet.has(user.id)
	    };
	  }));
	})
	.catch(alert);
    }
  }, [id, props.events]);
  const onChange = (e) => {
    const changedUser = users.find(user => user.id === Number(e.target.name));
    const returnUsers = users.map(user => {
      return (user === changedUser) ? {
	...user,
	invited: e.target.checked
      } : user;
    })
    setUsers(returnUsers);    
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    api.get(`/events/${id}/guests`)
      .then(resX => {
	const invitedUsers = new Set(
	  users
	    .filter(user => user.invited)
	    .map(user => user.id));
	const apiCalls = [];
	resX.data.forEach(user => {
	  if (!invitedUsers.has(user.id)){
	    apiCalls.push(api.delete(`/events/${id}/guests/${user.userID}`))
	  }
	  invitedUsers.delete(user.id);
	});
	invitedUsers.forEach(userID => {
	  apiCalls.push(api.post(`/events/${id}/guests`, {
	    userID: userID
	  }));
	});
	apiCalls.forEach(call => {
	  call.catch(err => {
	    console.log(err.message);
	    alert(err)
	  });
	});
	Promise.all(apiCalls)
	  .then(vals => {
	    props.editEvent({
	      ...props.events.find(event => event.id === Number(id)),
	      guests: users.filter(user => user.invited)
	    });
	  })
	  .catch(alert);
      })
      .catch(alert);
    push('/organizer');
  };
  
  return (
    <form onSubmit={onSubmit}>
      { users.map(user => {
	return (
	  <label key={user.id}>
	    {user.name}
	    <input
	      name={user.id}
	      type='checkbox'
	      checked={user.invited}
	      onChange={onChange}
	    />
	  </label>
	);
      })}
      <button>Invite</button>
    </form>
  );
}

const state2props = (state) => {
  return {
    events: state.events.events
  };
};
export default connect(state2props, { editEvent })(Inviting);
