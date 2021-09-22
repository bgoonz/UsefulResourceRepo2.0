import { FRUIT_STAND_API_BASE_URL } from '../config';

export const RECEIVE_FARMERS = 'RECEIVE_FARMERS';
export const RECEIVE_ADDED_FARMER = 'RECEIVE_ADDED_FARMER';
export const UPDATE_FARMER = 'UPDATE_FARMER';

export const fetchFarmers = () => (dispatch) => (
  fetch(`${FRUIT_STAND_API_BASE_URL}/farmers`)
    .then((res) => res.json())
    .then((data) => {
      dispatch(receiveFarmers(data.farmers));
    })
);

const receiveFarmers = (farmers) => {
  return {
    type: RECEIVE_FARMERS,
    farmers,
  };
};

export const hireFarmer = (name) => (dispatch) => (
  fetch(`${FRUIT_STAND_API_BASE_URL}/farmers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
  .then((res) => res.json())
  .then((data) => {
    dispatch(receiveAddedFarmer(data));
  })
);

export const receiveAddedFarmer = (farmer) => {
  return {
    type: RECEIVE_ADDED_FARMER,
    farmer,
  };
};

export const payFarmer = (id) => (dispatch) => (
  fetch(`${FRUIT_STAND_API_BASE_URL}/farmers/${id}/pay`, {
    method: 'PATCH',
  })
  .then((res) => res.json())
  .then((data) => {
    dispatch(updateFarmer(data));
  })
);

export const updateFarmer = (farmer) => {
  return {
    type: UPDATE_FARMER,
    farmer,
  };
};
