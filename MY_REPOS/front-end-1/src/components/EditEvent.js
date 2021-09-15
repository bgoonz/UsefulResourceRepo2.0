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

function EditEvent(props){
  const { push } = useHistory();
  const { id } = useParams();
  const [formVal, setFormVal] = useState({
    title: '',
    day: 1,
    month: 'January',
    year: 2021,
    start_time: 0,
    end_time: 0,
    location: ''
  });

  useEffect(() => {
    api.get(`/events/${id}`)
      .then(res => {
	setFormVal(res.data);
      })
      .catch(alert)
  }, [id]);

  const onChange = (e) => {
    setFormVal({
      ...formVal,
      [e.target.name]: e.target.value,
    })
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const typeCorrected = {
      ...formVal,
      year: Number(formVal.year),
      day: Number(formVal.day),
      start_time: Number(formVal.start_time),
      end_time: Number(formVal.end_time)
    };
      api.put(`/events/${id}`, typeCorrected)
      .then(res => {
	props.editEvent(res.data.success);
	push('/organizer');
      })
      .catch(alert)
  };
  
  return (
    <form onSubmit={onSubmit}>
      <label>
	Title
	<input
	  name='title'
	  value={formVal.title}
	  type='text'
	  onChange={onChange}
	  placeholder='Event Title'
	/>
      </label>
      <label>
	Year
	<input
	  name='year'
	  value={formVal.year}
	  type='number'
	  onChange={onChange}
	/>
      </label>
      <label>
	Month
	<select
	  name='month'
	  value={formVal.month}
	  onChange={onChange}
	>
	  <option value='January'>January</option>
	  <option value='February'>February</option>
	  <option value='March'>March</option>
	  <option value='April'>April</option>
	  <option value='May'>May</option>
	  <option value='June'>June</option>
	  <option value='July'>July</option>
	  <option value='August'>August</option>
	  <option value='September'>September</option>
	  <option value='October'>October</option>
	  <option value='November'>November</option>
	  <option value='December'>December</option>
	</select>
      </label>
      <label>
	Day
	<input
	  name='day'
	  value={formVal.day}
	  type='number'
	  onChange={onChange}
	/>
      </label>
      <label>
	Start Time
	<input
	  name='start_time'
	  value={formVal.start_time}
	  type='number'
	  onChange={onChange}
	/>
      </label>
      <label>
	End Time
	<input
	  name='end_time'
	  value={formVal.end_time}
	  type='number'
	  onChange={onChange}
	/>
      </label>
      <label>
	Location
	<input
	  name='location'
	  value={formVal.location}
	  type='text'
	  onChange={onChange}
	  placeholder='Event Location'
	/>
      </label>
      <button>Submit</button>
    </form>
  );
}

export default connect(null, { editEvent })(EditEvent);
