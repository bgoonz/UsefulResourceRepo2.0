import {
  RECEIVE_FRUITS,
  RECEIVE_ADDED_FRUITS,
  REMOVE_SOLD_FRUITS,
} from '../actions/fruitActions';

const fruitReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FRUITS:
      return action.fruits;
    case RECEIVE_ADDED_FRUITS:
      return [...state, ...action.addedFruits];
    case REMOVE_SOLD_FRUITS:
      return state.filter((fruitObj) => !action.soldFruits.includes(fruitObj.id));
    default:
      return state;
  }
};

export default fruitReducer;
