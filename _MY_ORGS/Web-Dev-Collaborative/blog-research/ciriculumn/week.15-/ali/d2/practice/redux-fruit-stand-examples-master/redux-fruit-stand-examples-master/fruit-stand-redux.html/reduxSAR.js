const { createStore } = require('redux');

const ADD_FRUIT = 'ADD_FRUIT';
const ADD_FRUITS = 'ADD_FRUITS';
const SELL_FRUIT = 'SELL_FRUIT';
const SELL_OUT = 'SELL_OUT';

// Create a reducer to manage your Redux store

const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FRUIT:
      return [...state, action.fruit];
    case ADD_FRUITS:
      return [...state, ...action.fruits];
    case SELL_FRUIT:
      const index = state.indexOf(action.fruit);
      if (index !== -1) {
        // remove first instance of action.fruit
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state; // if action.fruit is not in state, return previous state
    case SELL_OUT:
      return [];
    default:
      return state;
  }
};

// Create a Redux store holding the state of your app, managed by the `fruitReducer`.
// You can then interact with the Redux store by using its `subscribe`, `dispatch`,
// and `getState` methods.

const store = createStore(fruitReducer);

const addFruit = (fruit) => ({
  type: ADD_FRUIT,
  fruit,
});

const addFruits = (fruits) => ({
  type: ADD_FRUITS,
  fruits,
});

const sellFruit = (fruit) => ({
  type: SELL_FRUIT,
  fruit,
});

const sellOut = () => ({
  type: SELL_OUT,
});

module.exports = {
  store,
  addFruit,
  addFruits,
  sellFruit,
  sellOut,
};
