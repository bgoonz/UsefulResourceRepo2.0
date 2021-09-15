
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Thunks

One of the most common problems you need middleware to solve is asynchronicity.
When building web applications that interact with a server, you'll need to
request resources and then dispatch the response to your store when it
eventually gets back.

While it's possible to make these API calls from your components and dispatch
synchronously on success, for consistency and reusability it's preferable to
have the source of every change to our application state be an action creator.
Thunks are a new kind of action creator that will allow you to do that.

When you finish this article, you should be able to write a thunk action creator
to make an asynchronous request to an API and dispatch an action when the
response is received.

## Looking at how thunks work

Rather than returning a plain object, a thunk action creator returns a function.
This function, when called with an argument of `dispatch`, can then dispatch one
or more actions, immediately, or later. Here's an example:

```js
const thunkActionCreator = () => dispatch => {
  dispatch({
    type: 'RECEIVE_MESSAGE',
    message: 'This will be dispatched immediately.'
  });

  setTimeout(() => dispatch({
    type: 'RECEIVE_MESSAGE',
    message: 'This will be dispatched 1 second later.'
  }, 1000));
}
```

This is great, but without custom middleware it will break as soon as the
function action hits your reducer. You need middleware to intercept all actions
of type `function` and then trigger the dispatch:

```js
// ./src/middleware/thunkMiddleware.js

const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  return next(action);
};

export default thunk;
```

Notice how the `getState` function is passed into the `action` in case your
asynchronous action creators need access to your application state. 

Then you'd apply your custom middleware to your store:

```js
// ./src/store.js

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './reducers/rootReducer';
import thunk from './middleware/thunkMiddleware';

const configureStore = (preloadedState = {}) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger),
  );
};

export default configureStore;
```

That's it! Now that you have all the pieces, you're ready to review a more
concrete example.

## Reviewing a concrete example

Much like the logger from the previous article, thunk middleware is available as
the `redux-thunk` library.

> The middleware you just wrote is almost the entire original library! ([Check
> out the source code][thunk-source]). For more on thunks and handling
> asynchronicity in Redux, you can take a look at [this interesting SO post from
> the creator][thunks-so].

Start by using npm to install the `redux-thunk` package:

```sh
npm install redux-thunk
```

Then apply the middleware to your store:

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

Imagine that you're updating the Fruit Stand application to use a Node/Express
API for data persistence. You would use a `fetchFruits` thunk action creator to
retrieve the list of fruits from the API:

```js
// ./src/actions/fruitActions.js

import { FRUIT_STAND_API_BASE_URL } from '../config';

export const RECEIVE_FRUITS = 'RECEIVE_FRUITS';

export const fetchFruits = () => (dispatch) => (
  fetch(`${FRUIT_STAND_API_BASE_URL}/fruits`)
    .then((res) => res.json())
    .then((data) => {
      dispatch(receiveFruits(data.fruits));
    })
);

const receiveFruits = (fruits) => {
  return {
    type: RECEIVE_FRUITS,
    fruits,
  };
};
```

Notice that the Fetch API is used to make an HTTP request to the `/fruits` API
endpoint. When the promise returned from the `fetch` method call resolves, the
`res.json` method is called to parse the JSON into JavaScript objects, which in
turn is dispatched to the store using the `receiveFruits` action creator. The
`receiveFruits` action creator returns an action of type `RECEIVE_FRUITS` that
includes the `fruit` payload.

In the `fruitReducer`, the `RECEIVE_FRUITS` case clause simply returns the
`action.fruits` payload as the new state:

```js
// ./src/reducers/fruitReducer.js

import { RECEIVE_FRUITS } from '../actions/fruitActions';

const fruitReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FRUITS:
      return action.fruits;
    default:
      return state;
  }
};

export default fruitReducer;
```

To load the fruits from the API when the React application starts up, you can
update the `index.js` file to dispatch the `fetchFruits` thunk action creator
after creating the store:

```js
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import configureStore from './store';
import { fetchFruits } from './actions/fruitActions';

const store = configureStore();
store.dispatch(fetchFruits());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

### Adding configuration for the API base URL

The `FRUIT_STAND_API_BASE_URL` variable (imported at the top of the
`fruitActions.js` file) is defined in the `config.js` file:

```js
export const FRUIT_STAND_API_BASE_URL = process.env.REACT_APP_FRUIT_STAND_API_BASE_URL;
```

And the `REACT_APP_FRUIT_STAND_API_BASE_URL` environment variable is defined in
an `.env` file (located in the root of the React project):

```
REACT_APP_FRUIT_STAND_API_BASE_URL=http://localhost:8080
```

Adding configuration for the API base URL keeps you from having to hard-code a
value that'll change between environments.

## Reviewing a completed Fruit Stand example

To review and run a completed Fruit Stand example application that utilizes
middleware and thunks to support asynchronous interaction with a backend API,
clone the [redux-fruit-stand-examples] repo.

After cloning the repo, open a terminal and browse to the
`fruit-stand-redux-with-react-middleware-thunks` folder.

### Running the API

To run the Node/Express API application, complete the following steps:

1. Within the `backend` folder, add an `.env` file based upon the `.env.example`
   file.

2. Use the following SQL statements to create a PostgreSQL database and user:

```sql
create database fruit_stand;
create user fruit_stand_app with encrypted password '«a strong password for the fruit_stand_app user»';
grant all privileges on database fruit_stand to fruit_stand_app;
```

3. From a terminal, browse to the `backend` folder and run the following
   commands to apply the Sequelize migrations and seed data:

```sh
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

4. Start the application using `npm start`.

### Running the React application

From the `frontend` folder, run the command `npm install` to install the
project's dependencies. Then use the command `npm start` to run the Fruit Stand
application.

This Fruit Stand example application is a React application created by the
Create React App tooling. When running the application using `npm start`, the
application should automatically open in your default browser. If it doesn't,
you can manually browse to `http://localhost:3000/` to view the application.

## What you learned

In this article, you learned how to write a thunk action creator to make an
asynchronous request to an API and dispatch an action when the response is
received.

[thunk-source]: https://github.com/gaearon/redux-thunk/blob/master/src/index.js
[thunks-so]: http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559
[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples
