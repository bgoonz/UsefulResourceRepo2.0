
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Creating the store](#creating-the-store)
- [Store API](#store-api)
  - [Store methods](#store-methods)
- [Updating the store](#updating-the-store)
- [Subscribing to the store](#subscribing-to-the-store)
- [Reviewing a simple example](#reviewing-a-simple-example)
- [What you learned](#what-you-learned)
- [See also...](#see-also)

<!-- /code_chunk_output -->
________________________________________________________________________________
# Store

The **store** is the central element of Redux's architecture. It holds the
global **state** of an application. The store is responsible for updating the
global state via its **reducer**, broadcasting state updates via
**subscription**, and listening for **actions** that tell it when to update the
state.

When you finish this article, you should be able to:

* Describe the role of the store in the Redux architecture
* Use the `createStore` method to create an instance of the Redux store
* Use the `store.dispatch` method to dispatch an action to trigger a state
  update
* Use the `store.subscribe` method to listen for state updates
* Use the `store.getState` method to get the current state

## Creating the store

The `redux` library provides us with a `createStore()` method, which takes up to
three arguments and returns a Redux store.

```js
createStore(reducer, [preloadedState], [enhancer]);
```

- `reducer` (required) - A reducing function that receives the store's current
  state and incoming action, determines how to update the store's state, and
  returns the next state (more on this in a moment).
- `preloadedState` (optional) - An `object` representing any application state
  that existed before the store was created.
- `enhancer` (optional) - A `function` that adds extra functionality to the
  store.

> You'll learn more about how to use the `preloadedState` and `enhancer`
> parameters later in this lesson. For now you'll focus on creating a store with
> just the single required `reducer` parameter. 

Here is an example of how to create a store for a Fruit Stand application:

```js
import { createStore } from 'redux';

const fruitReducer = (state = [], action) => {
  // TODO implement reducer
}

const store = createStore(fruitReducer);
```

A Redux application will typically only have a single store. You'll implement
the `reducer` function in just a bit.

## Store API

A Redux store is just an object that holds the application state, wrapped in a
minimalist API. The store has three methods: `getState()`, `dispatch(action)`,
and `subscribe(callback)`.

### Store methods

- `getState()` - Returns the store's current state.
- `dispatch(action)` - Passes an `action` into the store's `reducer` telling it
  what information to update.
- `subscribe(callback)` - Registers a callback to be triggered whenever the
  store updates. Returns a function, which when invoked, unsubscribes the
  callback function from the store.

## Updating the store

Store updates can only be triggered by dispatching **actions**:

```js
store.dispatch(action);
```

An `action` in Redux is just a plain object with:

- a `type` key indicating the action being performed, and
- optional payload keys containing any new information.

For example, the store for your Fruit Stand application would handle the
inventory. You would use the following `addOrange` action to add an orange to
the store's state. Notice how it has a `type` of 'ADD_FRUIT' and a `fruit`
payload of 'orange':

```js
const addOrange = {
  type: 'ADD_FRUIT',
  fruit: 'orange',
};
```

When `store.dispatch()` is called, the store passes its current `state`, along
with the `action` being dispatched, to the `reducer`. The `reducer` function
takes the two arguments (`state` and `action`) and returns the next `state`.
You'll read more about the `reducer` in just a bit, but for now, think of it as
a Redux app's traffic cop, routing new information to its rightful place in the
state.

A `reducer` for the Fruit Stand application looks like this:

```js
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FRUIT':
      return [...state, action.fruit];
    default:
      return state;
  }
};
```

The reducer's `state` parameter provides a default value; this is the **initial
state** of our store prior to any actions. In this case, it's an empty array. In
Redux, [**the state is immutable**][why-immutable], so the reducer must return a
**new array or object** whenever the state changes.

Now that you've defined your app's reducing function, you can now `dispatch` the
`addOrange` action to the store:

```js
console.log(store.getState()); // []
store.dispatch(addOrange);
console.log(store.getState()); // [ 'orange' ]
```

## Subscribing to the store

Once the store has processed a `dispatch()`, it triggers all its subscribers.
Subscribers are callbacks that can be added to the store via `subscribe()`.

You can define a callback `display` and subscribe it to the store:

```js
const display = () => {
  console.log(store.getState());
};

const unsubscribeDisplay = store.subscribe(display);

store.dispatch(addOrange); // [ 'orange', 'orange' ]

// display will no longer be invoked after store.dispatch()
unsubscribeDisplay();

store.dispatch(addOrange); // no output
```

In the example above, the store processed the dispatched action and then called
all of its subscribers in response. The only subscriber is your `display`
callback which logs the current state when called.

> Later in this lesson, you'll learn how to use the `store.subscribe()` method
> to connect a React component to the store so that it can listen for global
> state updates.

## Reviewing a simple example

Later in this lesson, you'll see how to use Redux with React and how to organize
your Redux code into separate modules, but for now to keep things as simple as
possible, you'll put everything into a single file and use Node.js to run your
application.

Here's an `app.js` file that brings together all of the above code snippets into
a single example:

```js
// app.js

const { createStore } = require('redux');

// Define the store's reducer.
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FRUIT':
      return [...state, action.fruit];
    default:
      return state;
  }
};

// Create the store.
const store = createStore(fruitReducer);

// Define an 'ADD_FRUIT' action for adding an orange to the store.
const addOrange = {
  type: 'ADD_FRUIT',
  fruit: 'orange',
};

// Log to the console the store's state before and after
// dispatching the 'ADD_FRUIT' action.
console.log(store.getState()); // []
store.dispatch(addOrange);
console.log(store.getState()); // [ 'orange' ]

// Define and register a callback to listen for store updates
// and console log the store's state.
const display = () => {
  console.log(store.getState());
};
const unsubscribeDisplay = store.subscribe(display);

// Dispatch the 'ADD_FRUIT' action. This time the `display` callback
// will be called by the store when its state is updated.
store.dispatch(addOrange); // [ 'orange', 'orange' ]

// Unsubscribe the `display` callback to stop listening for store updates.
unsubscribeDisplay();

// Dispatch the 'ADD_FRUIT' action one more time
// to confirm that the `display` method won't be called
// when the store state is updated.
store.dispatch(addOrange); // no output
```

To run the above example, use npm to initialize the project (`npm init -y`) and
to install Redux (`npm install redux`). Then use the command `node app.js` to
run the example. You should see the following output:

```sh
[]
[ 'orange' ]
[ 'orange', 'orange' ]
```

## What you learned

In this article, you learned about the role of the store in the Redux
architecture. You saw how to use the `createStore` method to create a store
instance, the `store.dispatch` method to dispatch an action to trigger a state
update, the `store.subscribe` method to listen for state updates, and
`store.getState` method to get the current state.

## See also...

To learn more about the store, see the official [Redux
documentation][redux-js-store].

[why-immutable]: https://github.com/reactjs/redux/issues/758
[redux-js-store]: http://redux.js.org/docs/basics/Store.html
