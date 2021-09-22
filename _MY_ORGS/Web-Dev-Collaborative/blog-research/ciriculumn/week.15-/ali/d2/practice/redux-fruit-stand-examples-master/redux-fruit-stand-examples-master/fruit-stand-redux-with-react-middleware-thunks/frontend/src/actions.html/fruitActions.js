import { FRUIT_STAND_API_BASE_URL } from '../config';
import { getFruitIDs } from '../reducers/fruitSelectors';

export const RECEIVE_FRUITS = 'RECEIVE_FRUITS';
export const RECEIVE_ADDED_FRUITS = 'RECEIVE_ADDED_FRUITS';
export const REMOVE_SOLD_FRUITS = 'REMOVE_SOLD_FRUITS';

export const fetchFruits = () => (dispatch) => (
  fetch(`${FRUIT_STAND_API_BASE_URL}/fruits`)
    .then((res) => res.json())
    .then((data) => {
      dispatch(receiveFruits(data.fruits));
    })
);

const receiveFruits = (fruits) => {
  return {
    type: RECEIVE_FRUITS,
    fruits,
  };
};

const postFruits = (fruits, dispatch) => (
  fetch(`${FRUIT_STAND_API_BASE_URL}/fruits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fruits }),    
  })
  .then((res) => res.json())
  .then((data) => {
    dispatch(receiveAddedFruits(data.addedFruits));
  })
);

export const addFruit = (fruit) => (dispatch) => postFruits([ fruit ], dispatch);

export const addFruits = (fruits) => (dispatch) => postFruits(fruits, dispatch);

const receiveAddedFruits = (addedFruits) => ({
  type: RECEIVE_ADDED_FRUITS,
  addedFruits,
});

export const sellFruit = (fruit) => (dispatch) => (
  fetch(`${FRUIT_STAND_API_BASE_URL}/fruits/one`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: fruit }),    
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    dispatch(removeSoldFruits([ data ]));
  })
);

export const sellOut = () => (dispatch, getState) => {
  const fruitIDs = getFruitIDs(getState());

  return fetch(`${FRUIT_STAND_API_BASE_URL}/fruits/multiple`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fruitIDs }),    
  })
  .then((res) => res.json())
  .then((data) => {
    dispatch(removeSoldFruits(data.soldFruits));
  });
};

const removeSoldFruits = (soldFruits) => ({
  type: REMOVE_SOLD_FRUITS,
  soldFruits: soldFruits.map((fruit) => fruit.id),
});
