
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Middleware

In Redux, middleware specifically refers to an `enhancer` passed to the store
via `createStore`. When a `dispatch` is made, the middleware intercepts the
`action` before it reaches the `reducer`. The middleware can then:

- **resolve the action itself** (for example, by making an AJAX request),
- **pass along the action** (if the middleware isn't concerned with it),
- **generate a side effect** (such as logging debugging information),
- **send another dispatch** (if the action triggers other actions),
- or some combination thereof.

You'll use Redux middleware for logging information about the store and making
asynchronous API requests, but you can also use it for crash reporting, routing,
and many other applications.

When you finish this article, you should be able to use the React-Redux
library's `applyMiddleware` function to configure one or more middleware when
creating a store.

## Applying middleware to a Redux store

Recall the `redux` library's `createStore` function used to instantiate a store.
`createStore` accepts three arguments (`reducer, preloadedState, enhancer`);
middleware is given to the store via the optional `enhancer` argument.

Consider the following example, where you import a third-party `logger`
middleware:

```js
// ./src/store.js

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './reducers/rootReducer';

const configureStore = (preloadedState = {}) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(logger),
  );
};

export default configureStore;
```

Any actions dispatched to the `store` pass through the `logger` middleware,
which prints the store's state before and after the `action` is processed.

> **Note:** `applyMiddleware()` accepts multiple arguments, so you can also
> apply more middleware if necessary.

## Reviewing the signature of middleware functions

In addition to importing third-party middlewares such as the above `logger`,
you'll sometimes need to roll your own. All middleware functions need to conform
to the same signature in order to be compatible with the store and other
middlewares.

A [**function signature**][signature] is the set of inputs and output of a
function. A Redux middleware must always have the following signature:

```js
const middleware = store => next => action => {
 // side effects, if any
 return next(action);
};
```

Every middleware receives the `store` as an argument and returns a function that
takes the `next` link in the middleware chain as an argument. That function
returns *another* function that receives the `action` and then triggers any side
effects before returning the result of `next(action)`. Side effects can include
triggering AJAX requests, logging to the console, and more. Side effects can
also happen after `next(action)` is called, like so:

```js
const middleware = store => next => action => {
 const result = next(action);
 // side effect using `result`
 return result;
};
```

## Creating your own `logger` middleware

You can hand-roll the `logger` middleware you imported above. It should print
out the state before and after each dispatch, allowing you to check if your
reducers are working as expected. This middleware should:

- receive the store as its only argument,
- return a function that receives the `next` middleware,
- which should itself return a function receiving the `action`.

The body of the innermost function is where you want to do your logging. That
function should:

- `console.log` the `action`
- `console.log` the result of `store.getState()` (pre-dispatch)
- call `next(action)` to pass the action on to the rest of the middlewares, and
  eventually, the reducer
- save the `result` of the `next(action)` variable, to be returned later
- `console.log` the new `store.getState()`
- return the saved `result`

```js
const logger = store => next => action => {
  console.log('Action received:', action);
  console.log('State pre-dispatch:', store.getState());

  let result = next(action);

  console.log('State post-dispatch:', store.getState());

  return result;
};
```

Now, whenever you dispatch an action, you'll see its effect on the store.

## Installing and applying the `redux-logger` middleware

As you move forward with Redux, you'll want to have access to your store's state
for debugging purposes. Including the `redux-logger` npm package and adding it
as a middleware gives you access (through the console) to the previous state,
action, and next state with each dispatch. This is incredibly convenient for
debugging purposes and avoids such unpleasantness as attaching the `store` to
the `window`. 

![react-redux-logger]

Follow the example below to include it in your projects:

* Include the `redux-logger` package:

```sh
npm install redux-logger
```

* Pass an instance of `redux-logger` to `applyMiddleware` when creating your
  store:

**Note: `logger` must be the last middleware passed into `applyMiddleware`**,
otherwise it will log the thunk and any involved promises. You'll learn about
thunks and `react-thunk` in the next article.

```js
// ./src/store.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers/rootReducer';

const configureStore = (preloadedState = {}) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger),
  );
};

export default configureStore;
```

## What you learned

In this article, you learned how to use the React-Redux library's
`applyMiddleware` function to configure one or more middleware when creating a
store.

[signature]: https://developer.mozilla.org/en-US/docs/Glossary/Signature/Function
[react-redux-logger]: images/react-redux-logger.png
