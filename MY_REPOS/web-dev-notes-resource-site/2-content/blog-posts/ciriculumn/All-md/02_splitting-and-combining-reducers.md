
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Splitting and Combining Reducers

So far, you've been using a single reducer to manage state in your Redux store.
As your applications increase in size and complexity, it'll become necessary to
use multiple reducers, each managing a slice of state.

When you finish this article, you should be able to:

* Define multiple reducers to manage individual slices of state
* Use the Redux `combineReducers` method to combine multiple reducers into a
  single root reducer
* Update a reducer to delegate a state update to a subordinate reducer

## Splitting reducers

Imagine that your fruit stand is extremely successful and it grows so much that
you need multiple farmers helping you to keep your stand stocked with fruit.
Your application's state will need to grow to store not only an array of `fruit`
but also a `farmers` object that keeps track of your farmers.

Here's a sample state tree of your updated application:

```js
{
  fruit: [
    'APPLE',
    'APPLE',
    'ORANGE',
    'GRAPEFRUIT',
    'WATERMELON',
  ],
  farmers: {
    1: {
      id: 1,
      name: 'John Smith',
      paid: false,
    },
    2: {
      id: 2,
      name: 'Sally Jones',
      paid: false,
    },
  }
}
```

The store now needs to handle new action types like `'HIRE_FARMER'` and
`'PAY_FARMER'` by updating the `farmers` slice of state. You could add more
cases to your existing reducer, but eventually the existing reducer would become
too large and difficult to manage. The solution is to split the reducer into
separate `fruit` and `farmers` reducers.

Splitting up the reducer into multiple reducers handling separate, independent
_slices_ of state is called **reducer composition**, and it's the fundamental
pattern of building Redux apps. Because each reducer only handles a single
_slice_ of state, its `state` parameter corresponds only to the part of the
state that it manages and it only responds to actions that concern that slice of
state.

Split up your popular Fruit Stand application's reducer into two reducers:

- `fruitReducer` - A reducing function that handles actions updating the
  `fruits` slice of state
- `farmersReducer` - A reducing function that handles actions updating the new
  `farmers` slice of state

```js
// ./src/reducers/fruitReducer.js

import {
  ADD_FRUIT,
  ADD_FRUITS,
  SELL_FRUIT,
  SELL_OUT,
} from '../actions/fruitActions';

const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FRUIT:
      return [...state, action.fruit];
    case ADD_FRUITS:
      return [...state, ...action.fruits];
    case SELL_FRUIT:
      const index = state.indexOf(action.fruit);
      if (index) !== -1) {
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

export default fruitReducer;
```

```js
// ./src/reducers/farmersReducer.js

import { HIRE_FARMER, PAY_FARMER } from '../actions/farmersActions';

const farmersReducer = (state = {}, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case HIRE_FARMER:
      const farmerToHire = {
        id: action.id,
        name: action.name,
        paid: false
      };
      nextState[action.id] = farmerToHire;
      return nextState;
    case PAY_FARMER:
      const farmerToPay = nextState[action.id];
      farmerToPay.paid = !farmerToPay.paid;
      return nextState;
    default:
      return state;
  }
};

export default farmersReducer;
```

You'll also need to define a module containing the `'HIRE_FARMER'` and
`'PAY_FARMER'` actions:

```js
// ./src/actions/farmersActions.js

export const HIRE_FARMER = 'HIRE_FARMER';
export const PAY_FARMER = 'PAY_FARMER';

export const hireFarmer = (name) => ({
  type: HIRE_FARMER,
  id: new Date().getTime(),
  name,
});

export const payFarmer = (id) => ({
  type: PAY_FARMER,
  id,
});
```

## Combining reducers

Your reducer setup is now much more modular. However, `createStore` only takes
one `reducer` argument, so you must combine your reducers back into a single
reducer to pass to the store. To do this you'll use the `combineReducers` method
from the `redux` package and pass it an object that maps state keys to the
reducers that handle those slices of state. Below, the `combineReducers` maps
the `fruitReducer` for the `fruit` slice of state and the `farmersReducer` for
the `farmers` slice of state. Invoking the `combineReducers` function returns a
single `rootReducer` that you can use to create your Redux store.

```js
// ./src/reducers/rootReducer.js

import { combineReducers } from 'redux';
import fruitReducer from './fruitReducer';
import farmersReducer from './farmersReducer';

const rootReducer = combineReducers({
  fruit: fruitReducer,
  farmers: farmersReducer
});

export default rootReducer;
```

```js
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

export default store;
```

## Delegating to reducers

Another aspect of reducer composition involves delegating state updates to
subordinate reducers. Consider the farmers reducer. You can modify it so that
the `farmers` (plural) reducer delegates to a `farmer` (singular) reducer
whenever a single farmer's attributes need to be modified (in this case whenever
a farmer has been hired or paid):

```js
// ./src/reducers/farmersReducer.js

import { HIRE_FARMER, PAY_FARMER } from '../actions/farmersActions';

const farmerReducer = (state, action) => {
  // State is a farmer object.
  switch (action.type) {
    case HIRE_FARMER:
      return {
        id: action.id,
        name: action.name,
        paid: false
      };
    case PAY_FARMER:
      return Object.assign({}, state, {
        paid: !state.paid
      });
    default:
      return state;
  }
};

const farmersReducer = (state = {}, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case HIRE_FARMER:
      nextState[action.id] = farmerReducer(undefined, action);
      return nextState;
    case PAY_FARMER:
      nextState[action.id] = farmerReducer(nextState[action.id], action);
      return nextState;
    default:
      return state;
  }
};

export default farmersReducer;
```

### Catching and preventing state mutation bugs

Updating the `farmersReducer` to delegate farmer state updates to the
`farmerReducer` resolved a subtle state mutation bug. Take another look at the
original implementation of the `farmersReducer` function:

```js
const farmersReducer = (state = {}, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case HIRE_FARMER:
      const farmerToHire = {
        id: action.id,
        name: action.name,
        paid: false
      };
      nextState[action.id] = farmerToHire;
      return nextState;
    case PAY_FARMER:
      const farmerToPay = nextState[action.id];
      farmerToPay.paid = !farmerToPay.paid;
      return nextState;
    default:
      return state;
  }
};
```

Notice that the `state` parameter is duplicated to the `nextState` variable
using the `Object.assign` method:

```js
let nextState = Object.assign({}, state);
```

While this code correctly creates a duplicate of the `state` object, `nextState`
is only a shallow duplicate as only the top-level object is duplicated. Each
"farmer" object that the `state` object refers to are still the _same_ objects.

In the `PAY_FARMER` case clause, the farmer object is mutated by setting the
`paid` property to a new value:

```js
case PAY_FARMER:
  const farmerToPay = nextState[action.id];
  farmerToPay.paid = !farmerToPay.paid;
  return nextState;
```

Now look again at the `PAY_FARMER` case clause in the version of the
`farmersReducer` that delegates farmer state updates to the `farmerReducer`:

```js
case PAY_FARMER:
  nextState[action.id] = farmerReducer(nextState[action.id], action);
  return nextState;
```

This code calls the `farmerReducer` by passing in the farmer object for the
`action.id` property value (i.e. `nextState[action.id]`) and the `action`
parameter. The `farmerReducer` has a `PAY_FARMER` case clause that correctly
uses the `Object.assign` method to duplicate the farmer object with the new
`paid` property value (i.e. `Object.assign({}, state, { paid: !state.paid })`):

```js
const farmerReducer = (state, action) => {
  // State is a farmer object.
  switch (action.type) {
    case HIRE_FARMER:
      return {
        id: action.id,
        name: action.name,
        paid: false
      };
    case PAY_FARMER:
      return Object.assign({}, state, {
        paid: !state.paid
      });
    default:
      return state;
  }
};
```

**Catching state mutation bugs is difficult to do.** Leveraging patterns like
reducer composition can help you from introducing these kinds of bugs in the
first place.

## Destructuring State in your component

If you try to start your Fruit Stand app now, you will probably get an error that looks something like:
```
TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
```
That is because there is one last thing that you need to do in order prepare your fruitstand to use these split reducers: make sure that your component is accessing the right slice of state. Back in your `FruitList.js` `render` method, you are currently assigning the return value of your `getState()` call to 'fruit'. 

```
const fruit = store.getState();
```

If you `console.log` or insert a debugger just after this line to see what fruit has been assigned, you will see:

```
fruit = {
  fruit: [],
  farmers: {}
}
```
Your state shape changed when you created these reducers! You component is trying to iterate over your new state shape, instead of the fruit slice of that state. To give the component access to the array of fruit, destructure this assignment:

```
const { fruit } = store.getState();
```

## Reviewing a completed Fruit Stand example

To review and run a completed Fruit Stand example application that contains
multiple reducers, clone the [redux-fruit-stand-examples] repo.

After cloning the repo, open a terminal and browse to the
`fruit-stand-redux-with-react-multiple-reducers` folder. Run the command `npm
install` to install the project's dependencies. Then use the command `npm start`
to run the Fruit Stand application.

This Fruit Stand example application is a React application created by the
Create React App tooling. When running the application using `npm start`, the
application should automatically open in your default browser. If it doesn't,
you can manually browse to `http://localhost:3000/` to view the application.

## What you learned

In this article, you learned how to define multiple reducers to manage
individual slices of state. You also learned how to use the Redux
`combineReducers` method to combine multiple reducers into a single root reducer
and how to update a reducer to delegate a state update to a subordinate reducer.

[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples
