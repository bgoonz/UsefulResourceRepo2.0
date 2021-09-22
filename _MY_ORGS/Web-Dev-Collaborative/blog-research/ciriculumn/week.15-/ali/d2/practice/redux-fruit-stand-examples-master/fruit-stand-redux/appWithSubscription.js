const {
  store,
  addFruit,
  addFruits,
  sellFruit,
  sellOut,
} = require('./reduxSAR');

console.log('Default Redux Store (empty fruit list):');
console.log(store.getState());

store.subscribe(() => console.log(store.getState()));

console.log('Fruit add actions:');
store.dispatch(addFruit('orange'));
store.dispatch(addFruit('apple'));
store.dispatch(addFruits(['orange', 'lychee', 'grapefruit']));

console.log('Fruit sell actions:');
store.dispatch(sellFruit('apple'));

console.log('Fruit sell out actions:');
store.dispatch(sellOut());

// Terminal output:

// Default Redux Store (empty fruit list):
// []
// Fruit add actions:
// [ 'orange' ]
// [ 'orange', 'apple' ]
// [ 'orange', 'apple', 'orange', 'lychee', 'grapefruit' ]
// Fruit sell actions:
// [ 'orange', 'orange', 'lychee', 'grapefruit' ]
// Fruit sell out actions:
// []
