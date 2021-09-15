# WEEK-15 DAY-1<br>*Redux* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->
________________________________________________________________________________
________________________________________________________________________________

# Redux Learning Objectives: Part 1

You've been using React's Context API to manage global state to share the same
information across multiple components. Redux, like Context, gives you a way to
store and manage global state in your React applications. Even though Context
has become a popular option since its introduction, Redux remains a popular
option for projects with sophisticated global state requirements.

After reading and practicing how to use Redux, you should be able to:

* Describe the Redux data cycle
* Describe the role of the store in the Redux architecture
* Explain what a _reducer_ is
* Use the `createStore` method to create an instance of a Redux store
* Use the `store.dispatch` method to dispatch an action to trigger a state
  update
* Use the `store.subscribe` method to listen for state updates
* Use the `store.getState` method to get the current state
* Use a `switch` statement within a reducer function to handle multiple action
  types
* Describe why it's important for a reducer to avoid mutating the current state
  when creating the next state
* Write an action creator function to facilitate in the creation of action
  objects
* Use constants to define action types to prevent simple typos in action type
  string literals

________________________________________________________________________________

# Redux Explained

Redux is a JavaScript framework for managing the frontend state of a web
application. It allows us to store information in an organized manner in a web
app and to quickly retrieve that information from anywhere in the app. Redux is
modeled on a few previous web technologies including [Elm][elm] and
[Flux][flux].

Advantages of Redux include:

* It simplifies some of the more cumbersome aspects of Flux
* It is very lightweight; the library only takes up 2 kbs
* It is very fast (the time to insert or retrieve data is low)
* It is predictable (interacting with the data store in the same way repeatedly
  will produce the same effect)

## Where did Redux come from?

Redux was created by Dan Abramov in 2015. It was initially intended as an
experiment to create a simplified version of Flux. Abramov wanted to remove some
of what he saw as the unnecessary boilerplate code that was required to create a
Flux app.

Abramov also wanted to eliminate some of the aspects of development he found
frustrating. When trying to debug a web app, one must often go through the
series of steps that cause the bug to occur each time the code is changed. This
quickly becomes repetitive and frustrating. Abramov envisioned dev tools that
would allow one to undo or replay a series of actions at the click of a button.
This idea became the Redux DevTools.

The reason this works is that Redux updates the state using pure functions
called reducers (see below for definitions), so one can simply replay a series
of actions and be guaranteed to arrive at the same final state. As Redux was
developed it also became more convenient to use a single object to store the
state, as opposed to traditional Flux which uses multiple stores.

These design choices allowed for the creation of an ecosystem of powerful Redux
tools and extensions. Over time three principles were recognized as central to
the philosophy of Redux. They are:

* **A Single Source of Truth** The state for an entire Redux app is stored in a
  single, plain JavaScript object.

* **State is Read Only** The state object cannot be directly modified. Instead
  it is modified by dispatching actions.

* **Changes Are Made with Pure Functions** The reducers that receive the actions
  and return updated state are pure functions of the old state and the action.

Beyond this, a guiding meta-philosophy of Redux is the idea that in a software
library restrictions can be just as important as features. Redux deliberately
places significant restrictions on the way state can be stored and updated, but
in return it allows easy implementation of a number of powerful features that
would be extremely difficult to write using a less restrictive framework.

## When is it appropriate to use Redux?

Initially, Redux grew in popularity, quickly moving beyond its initial plan as
an experiment. As of early 2016 it had over 3,000,000 downloads. The Redux
repository on GitHub has over 50,000 stars, and Redux is now used by a number of
companies including Exana, Patreon, and ClassPass.

Since the introduction of Redux, Context has been added to React. Context, like
Redux, gives you a way to store and manage global state in your React
applications. For projects with simpler global state requirements, Context has
become a popular alternative to using Redux.

Context is built into React so there's no need to install an additional library
as a dependency. Context is also simpler overall and generally requires less
work to get up and running. All that being said, for projects with more
sophisticated global state requirements, Redux remains a popular option. Redux
offers greater flexibility with support for middleware and richer developer
tools in the form of the Redux DevTools.

## Vocabulary

Learning how to use Redux requires you to understand a fair amount of
terminology. For now, don't worry about memorizing all of the following terms;
it's good enough to just have a general awareness. You'll revisit each of these
terms as you work your way through this lesson. 

### State

Ex: "_Redux is a state manager._"

The _state_ of a program means all the information stored by that program at a
particular point in time. It is generally used to refer to the data stored by
the program at a particular instance in time, as opposed to the logic of the
program, which doesn't change over time. The job of Redux is to store the state
of your app and make it available to entire app.

### Store

Ex: "_Redux stores state in a single store._"

The Redux store is a single JavaScript object with a few methods, including
`getState`, `dispatch(action)`, and `subscribe(listener)`. Any state you want
Redux to handle is held in the store.

### Actions

Ex: "_The Redux store is updated by dispatching actions._"

An action is a POJO (plain old JavaScript object) with a `type` property.
Actions contain information that can be used to update the store. They can be
_dispatched_, i.e. sent to the store, in response to user actions or AJAX
requests. Typically Redux apps use functions called _action creators_ that
return actions. Action creators can take arguments which allow them to customize
the data contained in the actions they generate.

### Pure functions

Ex: "_Redux reducers are pure functions._"

A function is pure if its behavior depends only its arguments and it has no side
effects. This means the function can't depend on the value of any variables that
aren't passed to it as arguments, and it can't alter the state of the program or
any variable existing outside itself. It simply takes in arguments and returns a
value.

### Reducer

Ex: "_Redux handles actions using reducers._"

A reducer is a function that is called each time an action is dispatched. The
reducer receives an action and the current state as arguments and returns an
updated state.

Redux reducers are required to be pure functions of the dispatched action and
the current state. This makes their behavior very predictable and allows their
effects to potentially be reversed.

### Middleware

Ex: "_You can customize your response to dispatched actions using middleware._"

Middleware is an optional component of Redux that allows custom responses to
dispatched actions. When an action is dispatched, it passes through each
middleware that has been added to the state. The middleware can take some action
in response and chose whether or not to pass the action on down the chain.
Behind the scenes, the middleware actually replaces the dispatch method of the
store with a customized version. There is a large ecosystem of existing
middleware ready to be plugged into any Redux projects. One example is a logger
that records each action before passing it on to the reducer. Perhaps the most
common use for middleware is to dispatch asynchronous requests to a server.

### Time traveling dev tools

Ex: "_Redux has time traveling dev tools._"

Redux reducers are pure functions of the dispatched action and the current
state. This means that if one were to store a list of the previous states over
time and the actions that had been dispatched, one could retroactively cancel an
action and recalculate the state as if that action had never been dispatched.
This is precisely the functionality that the Redux DevTools provide. The dev
tools can be added as middleware to any Redux project. They allow you to look
back through the history of the state and toggle past actions on and off to see
a live recalculation of the state. This ability to revert to a previous state is
what is meant by time travel.

### Thunks

Ex: "_Thunks are a convenient format for taking asynchronous actions in Redux._"

The traditional approach to middleware closely parallels the format of reducers.
The actions being dispatched are POJOs with types and various middleware files
are waiting to receive them. These files check the type of the action using a
case statement just like reducers.

Thunks are an alternative approach. A thunk is a general concept in computer
science referring to a function whose primary purpose is simply to call another
function. In Redux a thunk action creator returns a function rather than an
object. When they are dispatched, thunk actions are intercepted by a piece of
middleware that simply checks if each action is a function. If it is, that
function is called with the state and dispatch as arguments, otherwise it is
passed on down the chain. Thunks are most commonly used to make asynchronous API
requests.

## What you learned

In this article, you learned what Redux is and where it came from. You also
learned when it's appropriate to use Redux and some of the vocabulary terms used
by Redux.

## See also...

The [official Redux documentation][redux-docs] is a great resource for learning
more about Redux. To see who's using Redux, see this page on
[StackShare][stackshare-redux].

[elm]: http://elm-lang.org/docs
[flux]: https://facebook.github.io/flux/docs/overview.html#content
[redux-docs]: http://redux.js.org/
[stackshare-redux]: https://stackshare.io/reduxjs

________________________________________________________________________________

# Flux and Redux

Redux is an evolution of the concepts introduced by Flux. Having a general
understanding of Flux will assist you in learning Redux.

When you finish this article, you should be able to:

* Describe the relationship between Redux and Flux
* Describe the three principles that Redux abides by
* Describe the Redux data cycle

## What is Flux?

Flux is a front-end application architecture Facebook developed to use with
React. Flux is not a library or framework. Flux is simply a pattern in which to
structure one’s application. It doesn’t even need to be used with React! Flux
provides unidirectional data flow, which affords more predictability than one
might encounter when using other application design patterns.

![flux]

### Actions

An action begins the flow of data in Flux. An action is a simple object that at
a minimum contains a `type`. An action’s `type` indicates the type of change to
be performed on the application’s state. An action may contain additional data
(the "payload") that’s necessary for changing the application’s former state to
its next one.

### Dispatcher

The dispatcher is a mechanism for distributing (or "dispatching") actions to a
Flux application’s store. The dispatcher is little more than a registry of
callback functions into the store. Redux (the implementation of Flux we’ll use
at App Academy) consolidates the dispatcher into a single `dispatch()` function.

### Store

The store represents the entire state of the application. It’s also responsible
for updating the state of the application appropriately whenever it receives an
action. It does so by registering with the dispatcher a callback function that
receives an action. This callback function uses the action’s type to invoke the
proper function to change the application’s state. After the store has changed
state, it “emits a change," i.e. the store passes the new state to any views
(explanation incoming) that have registered listeners (callbacks) to it.

### View

A view is a unit of code that’s responsible for rendering the user interface. To
complete the Flux pattern, a view listens to change events emitted by the store.
When a change to the application’s data layer occurs, a view can respond
appropriately, such as by updating its internal state and triggering a
re-render.

A view can create actions itself, e.g. in user-triggered events. If a user marks
a todo as complete, a view might call a function that would dispatch an action
to toggle the todo’s state. Creating an action from the view turns our Flux
pattern into a unidirectional loop.

![flux-loop]

Here the original action might (for example) result from an asynchronous request
to fetch todos from the database with a success callback to dispatch our action
to receive those todos and update the application’s state accordingly. It's a
common pattern in Flux to dispatch an action that populates the initial state of
the application, with further modifications coming from the client.

## Redux

Redux is a library (distributed as an npm package) that facilitates a particular
implementation of Flux. A Redux loop behaves slightly differently than a vanilla
Flux loop, but the general concepts remain the same. Redux abides by three
principles:

1. **Single Source of Truth**: The entire state of the application is stored in
   a single JavaScript object in a single store. This object is commonly
   referred to as a “state tree" because its values often contain or are objects
   themselves.
2. **State is Read-Only**: The only way to change the state is to dispatch an
   action. This principle ensures that our Redux loop is never short-circuited
   and change of state remains single-threaded.
3. **Only Pure Functions Change State**: Pure functions known as “reducers"
   receive the previous state and an action and return the next state. They
   return new state objects instead of mutating previous state. Read
   [more][pure-functions] about what makes a function pure.

![redux-loop]

As you've probably already surmised, `React` will be our view layer.

> **Note:** Middleware is an ecosystem of utilities that augments the
> functionality of `dispatch()`. Among other things, it allows for asynchronous
> requests in a Redux application.

You'll learn more about each part in the Redux loop in this lesson.

## What you learned

In this article, you learned about the relationship between Redux and Flux. You
also learned about the three principles that Redux abides by and the Redux data
cycle.

[redux-loop]: https://assets.aaonline.io/fullstack/react/assets/redux.gif
[pure-functions]: https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.lfv7bgqco
[flux-loop]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/react/assets/flux-loop.png
[flux]: images/redux-flux.pngimages/redux-flux.png____________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Flux and Redux

Redux is an evolution of the concepts introduced by Flux. Having a general
understanding of Flux will assist you in learning Redux.

When you finish this article, you should be able to:

* Describe the relationship between Redux and Flux
* Describe the three principles that Redux abides by
* Describe the Redux data cycle

## What is Flux?

Flux is a front-end application architecture Facebook developed to use with
React. Flux is not a library or framework. Flux is simply a pattern in which to
structure one’s application. It doesn’t even need to be used with React! Flux
provides unidirectional data flow, which affords more predictability than one
might encounter when using other application design patterns.

![flux]

### Actions

An action begins the flow of data in Flux. An action is a simple object that at
a minimum contains a `type`. An action’s `type` indicates the type of change to
be performed on the application’s state. An action may contain additional data
(the "payload") that’s necessary for changing the application’s former state to
its next one.

### Dispatcher

The dispatcher is a mechanism for distributing (or "dispatching") actions to a
Flux application’s store. The dispatcher is little more than a registry of
callback functions into the store. Redux (the implementation of Flux we’ll use
at App Academy) consolidates the dispatcher into a single `dispatch()` function.

### Store

The store represents the entire state of the application. It’s also responsible
for updating the state of the application appropriately whenever it receives an
action. It does so by registering with the dispatcher a callback function that
receives an action. This callback function uses the action’s type to invoke the
proper function to change the application’s state. After the store has changed
state, it “emits a change," i.e. the store passes the new state to any views
(explanation incoming) that have registered listeners (callbacks) to it.

### View

A view is a unit of code that’s responsible for rendering the user interface. To
complete the Flux pattern, a view listens to change events emitted by the store.
When a change to the application’s data layer occurs, a view can respond
appropriately, such as by updating its internal state and triggering a
re-render.

A view can create actions itself, e.g. in user-triggered events. If a user marks
a todo as complete, a view might call a function that would dispatch an action
to toggle the todo’s state. Creating an action from the view turns our Flux
pattern into a unidirectional loop.

![flux-loop]

Here the original action might (for example) result from an asynchronous request
to fetch todos from the database with a success callback to dispatch our action
to receive those todos and update the application’s state accordingly. It's a
common pattern in Flux to dispatch an action that populates the initial state of
the application, with further modifications coming from the client.

## Redux

Redux is a library (distributed as an npm package) that facilitates a particular
implementation of Flux. A Redux loop behaves slightly differently than a vanilla
Flux loop, but the general concepts remain the same. Redux abides by three
principles:

1. **Single Source of Truth**: The entire state of the application is stored in
   a single JavaScript object in a single store. This object is commonly
   referred to as a “state tree" because its values often contain or are objects
   themselves.
2. **State is Read-Only**: The only way to change the state is to dispatch an
   action. This principle ensures that our Redux loop is never short-circuited
   and change of state remains single-threaded.
3. **Only Pure Functions Change State**: Pure functions known as “reducers"
   receive the previous state and an action and return the next state. They
   return new state objects instead of mutating previous state. Read
   [more][pure-functions] about what makes a function pure.

![redux-loop]

As you've probably already surmised, `React` will be our view layer.

> **Note:** Middleware is an ecosystem of utilities that augments the
> functionality of `dispatch()`. Among other things, it allows for asynchronous
> requests in a Redux application.

You'll learn more about each part in the Redux loop in this lesson.

## What you learned

In this article, you learned about the relationship between Redux and Flux. You
also learned about the three principles that Redux abides by and the Redux data
cycle.

[redux-loop]: https://assets.aaonline.io/fullstack/react/assets/redux.gif
[pure-functions]: https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.lfv7bgqco
[flux-loop]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/react/assets/flux-loop.png
[flux]: images/redux-flux.png

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

________________________________________________________________________________

# Reducers

As you saw in an earlier article, the Redux store has a **reducer** function for
updating its state. The reducer function receives the current `state` and an
`action`, updates the state appropriately based on the `action.type`, and
returns the next state.

When you finish this article, you should be able to:

* Explain what a _reducer_ is
* Use a `switch` statement within a reducer function to handle multiple action
  types
* Describe why it's important for a reducer to avoid mutating the current state
  when creating the next state

## Updating the reducer to handle additional action types

Recall the reducer from the Fruit Stand application:

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

When the store initializes, it calls its reducer with an `undefined` `state`,
allowing the reducer to dictate the store's initial state via the `state`
parameter's default value.

The bulk of the reducer function then implements updates to the state. First,
the reducer decides what logic to implement based on the `action.type` `switch`.
Then, it creates and returns a new object representing the next state (after
processing the action) if any of the information needs to be changed. The
`state` is returned unchanged if no cases match the `action.type`, meaning that
the reducer doesn't _care_ about that action (e.g. `{type:
'NEW_TRANSFORMERS_SEQUEL'}`).

In the above example, the reducer's initial state is set to an empty array (i.e.
`[]`). The reducer returns a new array with `action.fruit` appended to the
previous `state` if `action.type` is `'ADD_FRUIT'`. Otherwise, it returns the
`state` unchanged.

Additional `case` clauses can be added to update the reducer to handle the
following action types:

- `'ADD_FRUITS'` - Add an array of fruits to the inventory of fruits
- `'SELL_FRUIT'` - Remove the first instance of a fruit if available
- `'SELL_OUT'` - Someone bought the whole inventory of fruit! Return an empty
  array

```js
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FRUIT':
      return [...state, action.fruit];
    case 'ADD_FRUITS':
      return [...state, ...action.fruits];
    case 'SELL_FRUIT':
      const index = state.indexOf(action.fruit);
      if (index !== -1) {
        // remove first instance of action.fruit
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state; // if action.fruit is not in state, return previous state
    case 'SELL_OUT':
      return [];
    default:
      return state;
  }
};
```

### Reviewing how `Array#slice` works

If you don't regularly use the [`Array#slice`] method, the following expression
might look odd at first glance:

```js
[...state.slice(0, index), ...state.slice(index + 1)]
```

The [`Array#slice`] method returns a new array containing a shallow copy of the
array elements indicated by the `start` and `end` arguments. The `start`
argument is the index of the first element to include and the `end` argument is
the index of the element to include up to (but not including). If the `end`
argument isn't provided, all of the array elements up to the end of the array
will be included. The original array will not be modified.

By combining two calls to the [`Array#slice`] method into a new array, a copy of
an array can be created that omits an element at a specific index (`index`):

- `state.slice(0, index)` - Returns a new array containing the elements starting
  from index `0` up to `index`
- `state.slice(index + 1)` - Returns a new array containing the elements
  starting from `index + 1` (one past the index to omit the element at `index`)
  up through the last element in the array

Then the spread syntax is used to spread the elements in the slices into a new
array.

Here's a complete example:

```js
const fruits = ['apple', 'apple', 'orange', 'banana', 'watermelon'];

// The index of the 'orange' element is 2.
const index = fruits.indexOf('orange');

// `...fruits.slice(0, index)` returns the array ['apple', 'apple']
// `...fruits.slice(index + 1)` returns the array ['banana', 'watermelon']
// The spread syntax combines the two array slices into the array
// ['apple', 'apple', 'banana', 'watermelon']
const newFruits = [...fruits.slice(0, index), ...fruits.slice(index + 1)];
```

This approach to removing an element from an array is just one way to complete
the operation without modifying or mutating the original array.

## Avoiding state mutations

Inside a Redux reducer, you must never mutate its arguments (i.e. `state` and
`action`). **Your reducer must return a new object if the state changes**.
[Here's why][why-immutable].

Here's an example of a _bad_ reducer which mutates the previous state.

```js
const badReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      state.count++;
      return state;
    default:
      return state;
  }
};
```

And here's an example of a good reducer which uses `Object.assign` to create a
shallow duplicate of the previous `state`:

```js
const goodReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      const nextState = Object.assign({}, state);
      nextState.count++;
      return nextState;
    default:
      return state;
  }
};
```

## What you learned

In this article, you learned about reducers and how to use a `switch` statement
within a reducer function to handle multiple action types. You also learned why
it's important for a reducer to avoid mutating the current state when creating
the next state.

## See also...

To learn more about reducers, see the official [Redux
documentation][redux-js-reducers].

[`Array#slice`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
[why-immutable]: https://github.com/reactjs/redux/issues/758
[redux-js-reducers]: https://redux.js.org/basics/reducers

________________________________________________________________________________

# Actions

As you've already learned from an earlier article, **actions** are the only way
to trigger changes to the store's state. Remember, actions are simple POJOs with
a mandatory `type` key and optional payload keys containing new information.
They get sent using `store.dispatch()` and are the primary drivers of the Redux
loop.

When you finish this article, you should be able to:

* Write an action creator function to facilitate in the creation of action
  objects
* Use constants to define action types to prevent simple typos in action type
  string literals

## Using action creators

When an action is dispatched, any new state data must be passed along as the
**payload**. The example below passes a payload key of `fruit` with the new
state data, 'orange':

```js
const addOrange = {
  type: 'ADD_FRUIT',
  fruit: 'orange',
};

store.dispatch(addOrange);
console.log(store.getState()); // [ 'orange' ]
```

However, when these action payloads are generated dynamically, it becomes
necessary to extrapolate the creation of the action object into a function.
These functions are called **action creators**. The JavaScript objects they
return are the **actions**. To initiate a dispatch, you pass the result of
calling an action creator to `store.dispatch()`.

For example, an action creator function to create 'ADD_FRUIT' actions looks like
this:

```js
const addFruit = (fruit) => {
  return {
    type: 'ADD_FRUIT',
    fruit,
  };
};
```

You can also rewrite the above arrow function to use an implicit return value:

```js
const addFruit = (fruit) => ({
  type: 'ADD_FRUIT',
  fruit,
});
```

> While either approach for defining action creators using arrow functions
> works, the latter approach of using an implicit return value makes it more
> difficult to debug the Redux cycle (you'll see why later in this lesson).

Now we can add any `fruit` to the store using our action creator
`addFruit(fruit)`, instead of having to define an action object for each fruit:

```js
store.dispatch(addFruit('apple'));
store.dispatch(addFruit('strawberry'));
store.dispatch(addFruit('lychee'));
console.log(store.getState()); // [ 'orange', 'apple', 'strawberry', 'lychee' ]
```

## Preventing typos in action type string literals

Update your actions to include `'ADD_FRUIT'`, `'ADD_FRUITS'`, `'SELL_FRUIT'`,
and `'SELL_OUT'`:

```js
const ADD_FRUIT = 'ADD_FRUIT';
const ADD_FRUITS = 'ADD_FRUITS';
const SELL_FRUIT = 'SELL_FRUIT';
const SELL_OUT = 'SELL_OUT';

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
```

Notice that constants were used for all of the fruit action types. This prevents
simple typos in the reducer's case clauses (i.e. `'ADD_FRIUT'`) from
unexpectedly not matching the appropriate action type (i.e. `'ADD_FRUIT'`).
Creating constants for the action type string literals ensures that an error is
thrown if the constant name is mistyped.

## Reviewing a completed Fruit Stand example

To review and run a completed Fruit Stand example application, clone the
[redux-fruit-stand-examples] repo.

After cloning the repo, open a terminal and browse to the `fruit-stand-redux`
folder. Run the command `npm install` to install the project's dependencies.
Then use the command `node app.js` to run the Fruit Stand application. You
should see the following output:

```sh
Default Redux Store (empty fruit list):
[]
Redux Store:
[ 'orange', 'apple' ]
Redux Store:
[ 'orange', 'apple', 'orange', 'lychee', 'grapefruit' ]
Updated Redux Store:
[ 'orange', 'orange', 'lychee', 'grapefruit' ]
Reset Redux Store (empty fruit list):
[]
```

The `reduxSAR.js` file contains the action types, reducer, store, and action
creator functions. The `app.js` file contains the code that interacts with the
Redux store. The `appWithSubscription.js` file also contains code that interacts
with the store but subscribes a callback function (using the `store.subscribe`
method) to listen for and log state updates to the console.

## What you learned

In this article, you learned how to write an action creator function to
facilitate in the creation of action objects. You also learned how to use
constants to define action types to prevent simple typos in action type string
literals.

## See also...

To learn more about actions, see the official [Redux
documentation][redux-js-actions].

[redux-js-actions]: http://redux.js.org/docs/basics/Actions.html
[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples

________________________________________________________________________________

# Debugging Arrow Functions

Arrow functions are ubiquitous in React and Redux. Understanding how to use
`debugger` statements with arrow functions is necessary to be able to
effectively debug the Redux cycle.

When you finish this article, you should be able to:

* Describe why `debugger` statements can't be used with arrow functions that
  have an implicit return value
* Rewrite an arrow function with an implicit return value to use an explicit
  return statement so that a `debugger` statement can be added

## Understanding the limitations of implicit return values

Here's an example of a Redux action creator that's defined using an arrow
function with an implicit return value:

```js
const addFruit = (fruit) => ({
  type: 'ADD_FRUIT',
  fruit,
});
```

While using an arrow function with an implicit return value allows you to
concisely define `addFruit`, it's difficult to debug. Suppose you want to use a
`debugger` statement to stop execution within `addFruit` to inspect the value of
the `fruit` parameter. You **can't** do this:

```js
const addFruit = (fruit) => ({
  debugger
  type: 'ADD_FRUIT',
  fruit,
});
```

`{ type: 'ADD_FRUIT', fruit }` is an object, and you can't put a `debugger`
statement inside of an object. But you also **can't** do this:

```js
const addFruit = (fruit) => (
  debugger
  {
    type: 'ADD_FRUIT',
    fruit,
  }
);
```

The parentheses after the fat arrow (`=>`) are used to indicate that the object
`{ type: 'ADD_FRUIT', fruit }` should be implicitly returned. As a result, the
above won't work, because we can't put a debugger inside of a return statement.

## Rewriting an arrow function to use an explicit return statement

To put a `debugger` statement inside of the `addFruit` action creator function,
you first need to convert it into an arrow function with an explicit return
statement:

```js
const addFruit = (fruit) => {
  return {
    type: 'ADD_FRUIT',
    fruit,
  };
};
```

Now, finally, you can put the `debugger` statement before the `return`
statement:

```js
const addFruit = (fruit) => {
  debugger;
  return {
    type: 'ADD_FRUIT',
    fruit,
  };
};
```

If you want to avoid having to do this over and over again as you're debugging
your arrow functions, you can make it a habit to write all of your arrow
functions with explicit return statements. Do be aware, however, that writing
arrow functions with implicit return values is a common convention in Redux and
you will see it often out in the wild.

## What you learned

In this article, you learned why `debugger` statements can't be used with arrow
functions that have an implicit return value. You also learned how to rewrite an
arrow function with an implicit return value to use an explicit return statement
so that a `debugger` statement can be added.

________________________________________________________________________________

# Redux To-do List Project

At this point, you understand how to perform CRUD operations with a backend API.
You also know how to perform CRUD operations by creating a user interface with
React, managing state with React Context, and storing persistent data in local
storage. It's time to create a simple Node to-do list application that utilizes
the Redux library and runs in your terminal! This project is intended as a way
to practice the basics of Redux before learning how to use Redux within a React
application.

In today's project, you will:

- Generate a Redux **store** by using the `createStore` method from the Redux
  library
- Set up a **reducer** to direct different action types to interact with the
  Redux store in different ways
- Set up **actions** to create a task, delete a task, and reset the task list
- Use the `store.getState` method to access the data stored in the Redux store
- Use the `store.dispatch` method to **dispatch** actions to the Redux store
- Use the `store.subscribe` method to subscribe to Redux store changes
- Use the VS Code debugger to follow the Redux cycle

## Phase 1: Create Redux store, actions, and reducer

Run the following commands in your terminal to create a new project directory,
generate a `package.json` file, and install `redux` as a dependency:

```sh
mkdir redux-todos && cd redux-todos
npm init -y && npm install redux
```

Now it's time to create your first Redux project! Create a
`reduxStoreActionReducer.js` file and import the `createStore` method from
Redux. You'll need to use CommonJS module syntax (`module.exports` and
`require`) to be able to run the project within the Node environment:

```js
const { createStore } = require('redux');
```

### Store

You'll use the `createStore` method to generate your Redux store by invoking it
with a reducer. As a reminder, each application should only have one Redux store
where all of an application's state is managed. This is unlike using React
Context, where a single React application can utilize multiple contexts.

Conceptually speaking, you can think of the reducer as a function that helps
manage the Redux store by routing actions based on their `type` attribute. Based
on the official Redux documentation on the [createStore] method and its
parameters, a reducer is a "reducing function that returns the next state tree,
given the current state tree and an action to handle."

Now that we've gone over a conceptual overview of reducers, let's create a
`tasksReducer` to manage the to-do list tasks in your Redux store!

Define the `tasksReducer` function and have it take in the Redux store's `state`
and an `action` as parameters. You'll want the `state` to default to an empty
(`[]`) if the `tasksReducer` is invoked without a state. Since you invoke the
`createStore` method with the `tasksReducer`, you'll need to define the
`tasksReducer` before invoking the `createStore` method to generate the Redux
store.

> **Note:** this project uses an array to store the tasks instead of an object
> to make it easier to delete a positional task, since there is no user
> interface that will expose the task ID needed to dispatch task deletion. In
> the case of this project, a `taskId` will refer to the index of a task in the
> array.

```js
const tasksReducer = (state = [], action) => {
  // TODO: Set up switch statement to manage actions based on type
};

const store = createStore(tasksReducer);
```

The underlying code in the store returned by the `createStore` method will
automatically invoke the `tasksReducer` function whenever an action is
dispatched. Speaking of actions, let's set up the `createTask`, `deleteTask`,
and `resetTaskList` actions before finishing the `tasksReducer` function that
conceptually _routes_ action objects (think of how it makes more sense to create
a component before setting up a `<Route>` for it).

You'll finish defining the `tasksReducer` function after creating the
`createTask`, `deleteTask`, and `resetTaskList` actions that the reducer
manages. You'll set up your actions below the line of code that sets up the
Redux `store`.

### Actions

Let's set up the `createTask` action creator! You'll want your `createTask`
action creator to return an action with the following shape:

```js
{
  type: 'CREATE_TASK',
  taskMessage: 'walk dog',
}
```

As a reminder, an **action creator** is simply a function that returns an
**action** which is a POJO (plain old JavaScript object) that defines a `type`
key and optional payload keys. Have your `createTask` function take in a
`taskMessage` as a parameter:

```js
const createTask = (taskMessage) => {
  // TODO: Return POJO with `type` property and function's argument (`taskMessage`)
};
```

Now you'll want to set up the function's return statement to return the action
POJO. The POJO should have a `type` property. The `type` property will be how
the `tasksReducer` will decipher different types of actions to update the Redux
store's state in different ways. The action will also have a payload key set to
the function's argument (`taskMessage`).

In this case, the `createTask` function has a `taskMessage` parameter, so the
action POJO will have a `type` property set to the string `CREATE_TASK`, as
well as a `taskMessage` property set to the `taskMessage` parameter value. 

```js
const createTask = (taskMessage) => {
  return {
    type: 'CREATE_TASK',
    taskMessage: taskMessage,
  };
};
```

It is best practice to use constants for action types, instead of string
literals. Since the reducer depends on the action's `type` to decipher different
types of actions, a typo in the reducer or action specifying the type will go
unseen. For example, imagine if the reducer needs an action with the type
`CREATE_TASK` to perform the create operation, but there is a typo making the
reducer listen for the type `'CREATE_TSAK'` instead. When an action of type
`CREATE_TASK` is dispatched, it will never be evaluated by the reducer
listening for an action of type `'CREATE_TSAK'`. Creating constants for string
literals ensures that an error will be thrown for action type typos. 

Define a constant for the `CREATE_TASK` string. Make sure to define the
constant before defining your `tasksReducer`, otherwise you'll receive
`ReferenceError: CREATE_TASK is not defined` when you dispatch an action. At
this point, your file should look something like this:

```js
const { createStore } = require('redux');

const CREATE_TASK = 'CREATE_TASK';

const tasksReducer = (state = [], action) => {
  // TODO: Set up switch statement to manage actions based on type
};

const store = createStore(tasksReducer);

const createTask = (taskMessage) => {
  return {
    type: CREATE_TASK,
    taskMessage: taskMessage,
  };
};
```

You can also have the function implicitly return by removing the function's
curly braces and wrapping the action object's curly braces with parentheses. The
`createTask` code below has the exact same functionality as the code above:

```js
const createTask = (taskMessage) => ({
  type: CREATE_TASK,
  taskMessage,
});
```

Although the code looks shorter and cleaner, note that you are unable to use the
[debugger statement] to debug a function when it is implicitly returning. You
can use the VS Code debugger to set a breakpoint, but you won't be able to set a
breakpoint with the `debugger` statement.

When working on your React-Redux projects in the future, it'll be helpful to
keep the `return` statement so you can easily place a breakpoint with the
`debugger` statement to debug the action creator function and make sure a
specific action is actually being dispatched.

Now that you have set up a `createTask` action creator, follow the same pattern
to set up a `deleteTask` action creator that takes in a `taskId`. The
`resetTaskList` action creator will be a little different. You'll still follow
the pattern of setting a `type` for the action, but the `resetTaskList` function
will not take any parameters. The action will simply have a `type` property and
a `emptyTaskList` property set to an empty array:

```js
const resetTaskList = () => {
  return {
    type: RESET_TASK_LIST,
    emptyTaskList: [],
  };
};
```

### Reducer

It's time to circle back and finish implementing the `tasksReducer`! Begin by
setting up a [switch] statement that evaluates a case statement based on the
`action.type`.

```js
const tasksReducer = (state = [], action) => {
  switch (action.type) {
    // TODO: Set up switch case for `createTask` action
    // TODO: Set up switch case for `deleteTask` action
    // TODO: Set up switch case for `resetTaskList` action
    // TODO: Set up default switch case
  }
};
```

Let's begin by setting up the default switch case. By default, you always want
to return the default `state` argument passed into the reducer:

```js
const tasksReducer = (state = [], action) => {
  switch (action.type) {
    // TODO: Set up switch case for `createTask` action
    // TODO: Set up switch case for `deleteTask` action
    // TODO: Set up switch case for `resetTaskList` action
    default:
      return state;
  }
};
```

Now let's set up the `case` statements for each action type. You have three task
actions, so you'll set up three case statements. As a reminder, you set up the
action types with constants to make sure typos in the reducer's `case`
statements throw an error. Use the constants in the switch statement:

```js
const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_TASK:
      // TODO: Define what happens when a `createTask` action is dispatched
    case DELETE_TASK:
      // TODO: Define what happens when a `deleteTask` action is dispatched
    case RESET_TASK_LIST:
      // TODO: Define what happens when a `resetTaskList` action is dispatched
    default:
      return state;
  }
};
```

As a reminder, the reducer function is called every time an action is
dispatched. This means that the `tasksReducer` function will be invoked whenever
an action is dispatched. It's now time to write code to handle each specific
action type and define what happens when actions of different types are
dispatched!

#### `CREATE_TASK` case statement

Under the case statement for `CREATE_TASK`, you'll want to return an updated
version of the reducer's state tree, with the new task. As a reminder, the Redux
store's state should be immutable - this means you should never mutate the
`state` array directly.

Begin by generating a `newTask` object based on the action's `taskMessage`
property:

```js
const newTask = {
  message: action.taskMessage,
};
```

Since you don't want to directly mutate the `state` array, you don't want to
`push` the `newTask` directly into the `state` array. Instead, you can use
spread syntax to return an updated state with `newTask` set as the last array
element in a new array:

```js
case CREATE_TASK:
  const newTask = {
    message: action.taskMessage,
  };
  return [...state, newTask];
```

#### `DELETE_TASK` case statement

Now let's define what happens when a `DELETE_TASK` action is dispatched. As a
reminder, the `deleteTask` action creator function takes in a `taskId` that
actually references a task element's index in the `state` array. In the
`DELETE_TASK` case statement, you'll use the index (the action's `taskId`
property) and the native [Array.slice] method to return a copy of the state that
excludes the task to delete:

```js
case DELETE_TASK:
  const idx = action.taskId;
  return [...state.slice(0, idx), ...state.slice(idx + 1)];
```

Using spread syntax and non-mutative methods are one of the many immutable
update patterns you can use to update state without directly mutating it. Feel
free to visit the official Redux documentation to view more [immutable update
patterns].

#### `RESET_TASK_LIST` case statement

Now let's define what happens when a `RESET_TASK_LIST` action is dispatched. As
a reminder, the action has an `emptyTaskList` property that is an empty array,
similar to the default state set by the reducer. You can simply return the
`emptyTaskList` array to update the Redux store's state. The `emptyTaskList`
will replace the `state` array entirely.

```js
case RESET_TASK_LIST:
  return action.emptyTaskList;
```

## Phase 2: Testing

Start by creating an `app.js` file and importing `store`, `createTask`,
`deleteTask`, and `resetTaskList` from the `reduxStoreActionReducer.js` file.
Since this project is running within the native Node environment, you'll need to
use CommonJS module syntax (`require` and `module.exports`) to manage imports
and exports within the project:

```js
const {
  store,
  createTask,
  deleteTask,
  resetTaskList,
} = require('./reduxStoreActionReducer');
```

Before you begin dispatching actions to test the actions and reducer you have
created, you'll need to set up a way to log the Redux store and view its current
state. You can use the `store.getState` method to access the Redux store's
current state and simply console log the Redux store's state that was retrieved.
To make your logging more clear, you can even add a message labeling the status
of the store logged. After the imports at the top of your `app.js` file, log the
initial state of the Redux store (an empty task list) with the following
`console.log` statements:

```js
console.log('Default Redux Store (empty task list):');
console.log(store.getState());
```

At this point, take a moment to run your Node application by running the follow
terminal statement from the root of the project directory:

```sh
node app.js
```

You should see the following output in your terminal:

```sh
Default Redux Store (empty task list):
[]
```

> Notice how you are currently using `console.log` statements to test and debug
> your code. Later in the project, you'll get a chance to investigate your code
> with the VS Code debugger to gain more context and insight about your code and
> its variable values.

### Dispatch the `CREATE_TASK` action

Now you can test whether you can actually create a task by using the
`store.dispatch` method to dispatch the `CREATE_TASK` action. Invoke the
`createTask` action creator function with a task message, and then dispatch the
invoked action. As a reminder, dispatching the action will "send" it through the
reducer (in this case, the `tasksReducer`) and determine what operation to
perform based on the action's `type` property.

```js
store.dispatch(createTask('walk dog'));
store.dispatch(createTask('feed cat'));
store.dispatch(createTask('talk to bird'));
store.dispatch(createTask('watch goldfish'));

console.log('Redux Store:');
console.log(store.getState());
```

Now run your application with `node app.js` and you should see the following
output in your terminal:

```sh
Default Redux Store (empty task list):
[]
Redux Store:
[ { message: 'walk dog' },
  { message: 'feed cat' },
  { message: 'talk to bird' },
  { message: 'watch goldfish' } ]
```

That may have seemed like magic for now, but at the end of the project, you'll
walk-through your project's code step-by-step to view what is really happening
with the Redux cycle. For now, focus on understanding the idea of _dispatching
an action_.

### Dispatch the `DELETE_TASK` action

Now you can add the following code after your `CREATE_TASK` dispatch calls to
dispatch a `DELETE_TASK` action and log the Redux store's updated state:

```js
store.dispatch(deleteTask(0));
store.dispatch(deleteTask(1));

console.log('Updated Redux Store:');
console.log(store.getState());
```

Run your application with `node app.js` and you should see the following output
in your terminal:

```sh
Default Redux Store (empty task list):
[]
Redux Store:
[ { message: 'walk dog' },
  { message: 'feed cat' },
  { message: 'talk to bird' },
  { message: 'watch goldfish' } ]
Updated Redux Store:
[ { message: 'feed cat' }, { message: 'watch goldfish' } ]
```

### Dispatch the `RESET_TASK_LIST` action

Lastly, take a moment to test the dispatching of the `RESET_TASK_LIST` action
and log the updated state by adding the following code after the `DELETE_TASK`
dispatch calls:

```js
store.dispatch(resetTaskList());
console.log('Reset Redux Store (empty task list):');
console.log(store.getState());
```

If you run your application with `node app.js` and you should see the following
output in your terminal:

```sh
Default Redux Store (empty task list):
[]
Redux Store:
[ { message: 'walk dog' },
  { message: 'feed cat' },
  { message: 'talk to bird' },
  { message: 'watch goldfish' } ]
Updated Redux Store:
[ { message: 'feed cat' }, { message: 'watch goldfish' } ]
Reset Redux Store (empty task list):
[]
```

### Subscribe to Redux store updates

Instead of having multiple console log statements to log `store.getState()`, you
can have your store subscribe to changes in the state with the `store.subscribe`
method. Create a new `appWithSubscription.js` file with the following code to
view how you can invoke `store.subscribe` so that the state is logged anytime
the store is updated (i.e. anytime an action is dispatched).

```js
// ./appWithSubscription.js

const {
  store,
  createTask,
  deleteTask,
  resetTaskList,
} = require('./reduxStoreActionReducer');

console.log('Default Redux Store (empty task list):');
console.log(store.getState());

store.subscribe(() => console.log(store.getState()));

console.log('Task creation actions');
store.dispatch(createTask('walk dog'));
store.dispatch(createTask('feed cat'));
store.dispatch(createTask('talk to bird'));
store.dispatch(createTask('watch goldfish'));

console.log('Task deletion actions');
store.dispatch(deleteTask(0));
store.dispatch(deleteTask(1));

console.log('Task reset action');
store.dispatch(resetTaskList());
```

Run your application with `node appWithSubscription.js` and you should see the
following output. Notice how the state was logged four times under "Task
creation actions" because of how four actions were dispatched, and the state was
logged twice after "Task deletion actions" because of how two actions were
dispatched.

```sh
Default Redux Store (empty task list):
[]
Task creation actions:
[ { message: 'walk dog' } ]
[ { message: 'walk dog' }, { message: 'feed cat' } ]
[ { message: 'walk dog' },
  { message: 'feed cat' },
  { message: 'talk to bird' } ]
[ { message: 'walk dog' },
  { message: 'feed cat' },
  { message: 'talk to bird' },
  { message: 'watch goldfish' } ]
Task deletion actions:
[ { message: 'feed cat' },
  { message: 'talk to bird' },
  { message: 'watch goldfish' } ]
[ { message: 'feed cat' }, { message: 'watch goldfish' } ]
Task reset action:
[]
```

### Debug to follow the Redux cycle

Now that you've used `console.log` statements to thoroughly investigate your
project, you can set up the VS Code debugger and add some breakpoints to follow
the Redux cycle. You'll use the breakpoints to investigate how invoking
`store.dispatch` with the result from an action creator function directs the
action to a specific switch case in the `tasksReducer` function. Start by
creating a `.vscode` directory and a `launch.json` file to configure the VS Code
debugger:

```sh
mkdir .vscode && cd .vscode
touch launch.json
```

Paste the following configuration into your `launch.json` file:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/app.js"
    }
  ]
}
```

> As a reminder, VS Code can also auto-generate the `.vscode` directory and the
> `launch.json` for you. Feel free to visit the VS Code documentation for more
> on [debugging with VS Code].

You can follow your code when an action object is dispatched by setting
breakpoints. You can also examine the action's attributes by setting a
breakpoint in the reducer. In the reducer, make sure to set the breakpoint
within a `case` statement. For example, if you set a breakpoint in the `switch`
statement, but _outside_ of a `case` statement, you won't ever hit the
breakpoint set.

```js
// Example of bad `debugger` placement that will not work!

switch (action.type) {
  debugger;
  case CREATE_TASK:
    const newTask = {
      message: action.taskMessage,
    };
    return [...state, newTask];
```

Take a moment to use the `debugger` keyword to set breakpoints in the
`createTask` action creator and `CREATE_TASK` case statement in your
`reduxStoreActionReducer.js` file:

```js
const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_TASK:
      debugger
      const newTask = {
        message: action.taskMessage,
      };
      return [...state, newTask];
    case DELETE_TASK:
      const idx = action.taskId;
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    case RESET_TASK_LIST:
      return action.emptyTaskList;
    default:
      return state;
  }
};
```

```js
const createTask = (taskMessage) => {
  debugger
  return {
    type: CREATE_TASK,
    taskMessage,
  };
};
```

Now you'll be able to pause the running of your code to examine variables in the
environment and view step-by-step updates to the Redux store's `state` as your
code is evaluated. 

Open `app.js` as the active file in your VS Code workspace. Press `F5` and
select `Node.js` as your environment - VS Code will try to run your currently
active file in debug mode. This will allow you to follow each dispatched action
and watch how each dispatched action updates the Redux store's state.

As you step through each dispatched action, you'll notice that there really is a
_cycle_: an action is generated, then the action is dispatched to go through a
reducer, and then the store is updated.

Here is a quick breakdown of what happens with the `CREATE_TASK` action is
dispatched, to guide the navigation of using VS Code debugger to investigate the
Redux cycle:

1. The `createTask` action creator function is invoked with the string `'walk
   dog'`.
2. The `createTask` function returns a POJO (known as an "action") with a `type`
   attribute and `taskMessage` properties. The POJO is structured like this:
  ```js
  {
    type: 'CREATE_TASK',
    taskMessage: 'walk dog',
  }
  ```
3. The `store.dispatch` method is invoked to dispatch the action POJO and invoke
   the `tasksReducer` function. Since the POJO has a type of `CREATE_TASK`,
   the case statement for `CREATE_TASK` will be evaluated:
  ```js
  case CREATE_TASK:
    const newTask = {
      message: 'walk dog', // This is `action.taskMessage`
    };
    return [...state, newTask];
  ```
4. The store's state is updated to be the new state returned by the reducer
   (`[...state, newTask]`).

Congratulations! You have just created your first Redux store, reducer, and
actions. You also learned more about what a reducer is doing by investigating
with console log statements and debugging the project with the VS Code debugger.

[createStore]: https://redux.js.org/api/createstore/
[switch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
[immutable update patterns]: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#inserting-and-removing-items-in-arrays
[Array.slice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
[debugger statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger
[debugging with VS Code]: https://code.visualstudio.com/Docs/editor/debugging
