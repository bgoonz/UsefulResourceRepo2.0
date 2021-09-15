import React from 'react';
import { useDispatch } from 'react-redux';

import InviteFoodCard from './InviteFoodCard';

import { deleteInvite } from '../actions/eventActions';

import axios from 'axios';
const api = axios.create({
  baseURL: 'https://potluck-planner1.herokuapp.com/api',
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJuYW1lIjoidGVzdGVyIiwidXNlcm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE2MjQzNjUwNTQsImV4cCI6MTYyNDk2OTg1NH0.pdyE9DfHyUiz1N8hZQI7veq1c-hRad1hg4kcSFVKg6c'
  }
});

const currentUserID = 2;

function InviteCard({invite}) {
  const dispatch = useDispatch();
  const onDecline = (e) => {
    api.delete(`/events/${invite.id}/guests/${currentUserID}`)
      .then(res => {
        dispatch(deleteInvite(invite.id));
      })
      .catch(alert);
  }
  return (
    <div className='invite-card'>
      <h3>{invite.title}</h3>
      <p>Location: {invite.location}</p>
      <p>Date: {invite.month} {invite.day}, {invite.year}</p>
      <p>Times: {invite.start_time}-{invite.end_time}</p>
      { !!invite.food.length && (
        <>
          <h5>Food Requests: </h5>
          <ul>
            {invite.food.map(item => <InviteFoodCard key={item.id} item={item} invite={invite}/>)}
          </ul>
        </>
      )}
      {/* <button>RSVP</button> */}
      <button onClick={onDecline}>Decline Invitation</button>
    </div>
  );
}

export default InviteCard;
