import {
  RECEIVE_FARMERS,
  RECEIVE_ADDED_FARMER,
  UPDATE_FARMER,
} from '../actions/farmersActions';

const farmersReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_FARMERS:
      const farmers = {};
      action.farmers.forEach((farmer) => farmers[farmer.id] = farmer);
      return farmers;
    case RECEIVE_ADDED_FARMER:
      nextState[action.farmer.id] = action.farmer;
      return nextState;
    case UPDATE_FARMER:
      nextState[action.farmer.id] = action.farmer;
      return nextState;
    default:
      return state;
  }
};

export default farmersReducer;
