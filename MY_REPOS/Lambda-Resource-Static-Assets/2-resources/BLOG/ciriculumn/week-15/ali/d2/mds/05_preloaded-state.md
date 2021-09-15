
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Preloaded State

Currently, when the page in the browser is reloaded, any state data stored in
the Redux store is lost. Later in this lesson, you'll learn how to use Redux to
interact with an API to persist state data. Until then (or if your React
application doesn't use an API), you can use the combination of Redux's ability
to create a store with _preloaded state_ with the browser's local storage to
persist store state across page reloads.

When you finish this article, you should be able to:

* Create a Redux store with preloaded state
* Use the browser's local storage to persist a Redux store's state across page
  reloads

## Creating a store with preloaded state

So far, your Redux stores have initialized with no initial state. Sometimes,
though, you may want to take pre-existing data and pass it into the store upon
initialization. Such data can be passed to the `createStore` method using the
`preloadedState` argument:

```js
const preloadedState = {
  fruit: [
    'APPLE',
    'ORANGE',
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
};

const store = createStore(rootReducer, preloadedState);
```

A couple of things to note about preloading state:

* The `preloadedState` must match the state shape (as produced by the reducers).
* `preloadedState` is not the same as default state. Default state should always
  be set in your reducers themselves.

## Creating local storage helper functions

To assist with using the browser's local storage to persist a Redux store's
state across page reloads, start with creating a set of helper functions:

```js
// localStorage.js

const STATE_KEY = 'fruitstand';

export const loadState = () => {
  try {
    const stateJSON = localStorage.getItem(STATE_KEY);
    if (stateJSON === null) {
      return undefined;
    }
    return JSON.parse(stateJSON);
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateJSON = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, stateJSON);
  } catch (err) {
    console.warn(err);
  }
};
```

The `saveState` function is responsible for converting the `state` parameter
value into JSON (using the `JSON.stringify` method) and saving the state JSON
string to the browser's local storage (using the `localStorage.setItem` method).
A `try...catch` statement is used to catch and log any errors.

The `loadState` function is responsible for loading the state JSON from the
browser's local storage (using the `localStorage.getItem` method). If the state
JSON isn't stored in local storage, `undefined` is returned so the store's
reducer function can initialize the state to its default value. If the state
JSON is successfully retrieved from local storage, it's parsed into JavaScript
objects (using the `JSON.parse` method) and returned to the caller. A
`try...catch` statement is used to catch and log any errors.

## Saving state to local storage

To ensure that the persisted state in local storage doesn't get out of sync with
the store, you want to persist the state whenever it's updated. Knowing that the
store's reducer is called whenever there's an action dispatched to update the
state, you might be tempted to update your reducer like this:

```js
import {
  ADD_FRUIT,
  ADD_FRUITS,
  SELL_FRUIT,
  SELL_OUT,
} from '../actions/fruitActions';
import { saveState } from '../localStorage';

const fruitReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case ADD_FRUIT:
      const nextState = [...state, action.fruit];
      saveState(nextState);  // Persist state data to local storage
      return nextState;

    // Case clauses removed for brevity.

    default:
      return state;
  }
};

export default fruitReducer;
```

**But don't do this!** Per the [official Redux docs on
reducers][redux-js-reducers-handling-actions], reducers should stay _pure_ and
not cause _side effects_ (like calling APIs or persisting data to local
storage).

To keep your reducers pure, handle persisting state to local storage in the
module where you create your store (`store.js`) by subscribing to listen for
state changes:

```js
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { saveState } from './localStorage';

const store = createStore(rootReducer);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
```

Now whenever the store's state is updated, the `store.getState` method is called
to get and pass the current state to the `saveState` method.

## Loading state from local storage

Now that you're persisting state to local storage, you can load state from local
storage and pass it to the `createStore` method as preloaded state:

```js
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

const store = createStore(rootReducer, preloadedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
```

With these updates in place, your Redux store's state will persist across page
reloads.

## What you learned

In this article, you learned how to create a Redux store with preloaded state.
You also learned how to use the browser's local storage to persist a Redux
store's state across page reloads.

[redux-js-reducers-handling-actions]: https://redux.js.org/basics/reducers#handling-actions
