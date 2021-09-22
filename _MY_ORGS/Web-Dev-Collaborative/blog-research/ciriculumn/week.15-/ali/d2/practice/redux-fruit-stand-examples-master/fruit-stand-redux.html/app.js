const {
  store,
  addFruit,
  addFruits,
  sellFruit,
  sellOut,
} = require('./reduxSAR');

console.log('Default Redux Store (empty fruit list):');
console.log(store.getState());
// Default Redux Store (empty fruit list):
// []

// ---------------------------------------------------

store.dispatch(addFruit('orange'));
store.dispatch(addFruit('apple'));

console.log('Redux Store:');
console.log(store.getState());
// Redux Store:
// [ 'orange', 'apple' ]

// ---------------------------------------------------

store.dispatch(addFruits(['orange', 'lychee', 'grapefruit']));

console.log('Redux Store:');
console.log(store.getState());
// Redux Store:
// [ 'orange', 'apple', 'orange', 'lychee', 'grapefruit' ]

// ---------------------------------------------------

store.dispatch(sellFruit('apple'));

console.log('Updated Redux Store:');
console.log(store.getState());
// Updated Redux Store:
// [ 'orange', 'orange', 'lychee', 'grapefruit' ]

// ---------------------------------------------------

store.dispatch(sellOut());
console.log('Reset Redux Store (empty fruit list):');
console.log(store.getState());
// Reset Redux Store (empty fruit list):
// []
