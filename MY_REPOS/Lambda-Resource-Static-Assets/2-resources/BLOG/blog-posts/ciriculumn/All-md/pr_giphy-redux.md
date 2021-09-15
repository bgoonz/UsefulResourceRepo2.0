
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Giphy Search Project

Today's project will help you become more comfortable with the full Redux cycle!
You will build out a single Redux cycle for a Giphy search tool.

When a user enters a search query, a fetch action will use the search endpoint
from the Giphy API to return the fetch response. The action will then be
dispatched to update the application's global state provided by the Redux store.
Your application will then use a slice of state to render an index of GIF
results.

Your completed project will look something like this:

![giphy-search][giphy-search]

## Phase 0: Set up the project

You'll begin by cloning this repository containing basic skeleton files and the
conventional frontend folders (`actions`, `components`, `reducers`, and `util`).

```sh
git clone https://github.com/appacademy-starters/react-redux-giphy-starter.git
```

Take a moment to familiarize yourself with the file structure. Look inside all
the frontend files and note the `TODO` notes in each file skeleton. Throughout
the next phases of the project, you'll finish all the tasks listed in the `TODO`
notes to create your very own Giphy search app!

After you have reviewed the `TODO` notes, run `npm install` to install your
application's packages. Note that you have `redux`, `react-redux`,
`redux-thunk`, and `redux-logger` already listed as dependencies in your
project's `package.json` file. You'll use Redux `thunk` as middleware to connect
(or _dispatch_) your fetch results into the Redux store. You'll use Redux
`logger` as middleware to automatically console log your dispatched actions.

### Component overview

Now that you're acquainted with the file structure, let's map out an overview of
the component hierarchy:

```
Root
  AppContainer
    App
      SearchBar
      Gifs
```

- The `Root` component is responsible for providing the component tree with the
  Redux `store`. It renders the `AppContainer`.
- The `AppContainer` passes the `gifs` slice of state and the dispatched
  `fetchGifs` action creator as props to the `App` component. It wraps the `App`
  component to connect the component to the Redux store.
- The `App` component renders the `GifsList` and the `SearchBar`. It uses its
  `gifs` prop (passed into `App` through `mapStateToProps`) to create and pass a
  `gifUrls` array as a prop to the `GifsList`. It also uses its `fetchGifs` prop
  (passed into `App` through `mapDispatchToProps`) as a prop to the `SearchBar`
  component.
- The `SearchBar` component handles all of the search logic (keeping track of
  the query and triggering the fetch request on submit).
- The `GifsList` component iterates over its `gifUrls` prop, to render an image for
  each one.

### Giphy API key

Before you start, let's create a Giphy API Key to use in your fetch requests to
the Giphy API. Get started by [creating a Giphy account]. Then navigate to the
[Giphy API Quick Start Guide] and click `Create an App`.

Fill out the form for creating a new app, and only check the option for `I only
want to use the GIPHY API`.

![Giphy Example][giphy-example]

Once you've submitted the form, you'll be taken to a dashboard, and under the
`Your Apps` section, you should see your newly created app with an API Key that
you will use for this project. As a reminder, API keys normally shouldn't be
stored in client-side JavaScript. You would normally want to store the keys in
your server-side code. To keep this project a simple, front-end only project,
you'll store the API key in a front-end environment variable for convenience.
Take a moment to create an `.env` file in the root of your project and set an
environment variable with your API key, like so:

```js
REACT_APP_GIPHY_API_KEY=<<YOUR API KEY>>
```

Notice that your `config.js` file is already exporting your
`REACT_APP_GIPHY_API_KEY` environment variable as `apiKey`:

```js
export const apiKey = process.env.REACT_APP_GIPHY_API_KEY
```

This means that you can import the API key from any of your frontend components
with the following import statement:

```js
import { apiKey } from '../config';
```

## Phase 1: Fetch data in the Redux cycle

Before you begin to build the project, it's important to think about the state
shape. You know that you want to display GIF results returned by a fetch
request. This means you'll probably want a `gifs` slice of the state that holds
a collection of `gif` objects.

### State shape

```js
{
  gifs: [
    // gif objects  
  ]
}
```

As a reminder, you pass the `gifs` slice of state as a prop to the `App`
component in the `AppContainer` through the `mapStateToProps` function.

### API util

The first part of creating your Redux cycle for fetching GIFs is creating a
fetch request that will be connected to a _thunk action creator_. Define and
export a `fetchGifs` function in the `apiUtil.js` file. This function will make
a fetch call to the Giphy API's search endpoint.

```js
// apiUtil.js
import { apiKey } from '../config';

export const fetchGifs = searchTerm => (
  // TODO: Write a fetch call to the Giphy API's search endpoint
)
```

It will take a single argument, the `searchQuery` entered by a user. You can
check out the [Giphy API docs] for more details, but in short, you want to make
a fetch request to the following endpoint:

```js
`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=3`
```

The `searchQuery` will be replaced with your user's actual query. You should tag
`&limit=3` onto the end of your query string to tell Giphy you only want three
GIF responses. The Giphy API is relatively slow, so keeping the response size
down helps optimize your application's performance.

Remember, it's best to test small pieces as we go. Let's test out that fetch
request from your developer tools console to make sure it's doing what you're
intending.

You may need to restart your server to have your application process the
environment variables set in your `.env` file.

Import your `fetchGifs` function to the entry `index.js` file, then go ahead and
put it on the window so we have access to it in the console:

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { fetchGifs } from './util/apiUtil';

window.fetchGifs = fetchGifs;

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

```

Try running this test code:

```js
fetchGifs('puppy').then(res => res.json()).then(res => console.log(res.data));
```

This will make the fetch request, which will return a promise. You'll chain on a
`.then` to parse the response and log the parsed response data. You should see
an array of three objects. Those are your gif objects fetched from the Giphy
API! Make sure you get this working before moving on, and don't forget to remove
`fetchGifs` from the window once you're done testing.

## Phase 2: Redux actions

Next, you'll set up an [action] to properly receive GIF payload information
(your fetch responses). As always, you want to export constants for your action
types set to strings of your action types. As a reminder, this is to prevent
bugs from mistyping your action types.

```js
export const RECEIVE_GIFS = 'RECEIVE_GIFS';
```

Now it's time to write a function that returns your `action`, an object literal.
Write `receiveGifs` as a function that takes in `gifs` data as a parameter and
returns an action object. The object should have two keys: one for the `type`
and another for the `gifs` data. Your function should look like the following:

```js
const receiveGifs = gifs => {
  return {
    type: RECEIVE_GIFS,
    gifs
  }
};
```

Before testing this action creator, you'll need a reducer.

### gifsReducer

Let's write a switch case and default switch return in your `gifsReducer.js`
file. Note that the `gifsReducer` function receives the previous `state` and an
`action`. Recall that a reducer describes how a slice of state should change
based on a dispatched action. It should always return the new state without
mutating the previous state. If the action dispatched to the reducer should not
change the state, the reducer should return the previous `state` by default. You
will need to import the `RECEIVE_GIFS` constant from your `gifActions.js` file.

Your reducer should look similar to the this one:

```js
// TODO: Import the `RECEIVE_GIFS` constant

const gifsReducer = (state = [], action) => {
  switch (action.type) {
    // TODO: Return the GIFs from the action object if the action type is `RECEIVE_GIFS`
    // TODO: Return the previous state by default
  }
};

export default gifsReducer;
```

### rootReducer

Recall the state shape you saw earlier in the project instructions. The
`gifsReducer` above should control the `gifs` slice of the application state.
You'll create and export a `rootReducer` with Redux's `combineReducers` function
to assign control of different slices of state to their prospective reducer
functions to create the application state structure.

This project only needs one reducer, but using `combineReducers` would allow you
to easily add more state slices in the future.

The `combineReducers` function has already been imported for you. Take a moment
to import your `gifsReducer` and set the `gifs` slice of state to its reducer,
like so:

```js
gifs: gifsReducer,
```

Now that you have your reducers set up to structure your application's global
state, you'll need to set up the Redux store to hold that global state.

## Phase 3: The Redux store

The store holds the global state of an application, so you'll need to create it
before you can test your reducer. Remember that Redux provides a `createStore`
function that receives a `reducer`, optional `preloadedState`, and an optional
`enhancer`. Begin by writing a `configureStore` function that passes your
`rootReducer` to `createStore`.

```js
// store.js
import { createStore } from 'redux';
// TODO: Import middleware
import rootReducer from './reducers/rootReducer';

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
```

Import `configureStore` into your entry `index.js` file, then use the function
to generate the Redux store.

```js
const store = configureStore();
```

Now you'll work on providing the store you have generated to your application's
components! Begin by passing the `store` you've generated as a prop to the
`Root` component. Your `index.js` file should look something like this:

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store';
import { fetchGifs } from './util/apiUtil';

window.fetchGifs = fetchGifs;
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Now go into your `Root.js` file and import `Provider` from `react-redux`. Use
the `Provider` component to set the Redux store through the `Provider`
component's expected `store` prop. Remember how you have just configured and
passed a `store` as a prop to the `Root` component in your entry file
(`index.js`). Use the `Root` component's `store` prop to set the `store` prop of
the `Provider`:

```js
// Root.js
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
```

Now that you have configured your Redux store and tested your `fetchGifs`
function, let's connect the function to the store to implement a full Redux
cycle. In the next phase, you'll define a _thunk action creator_ function and
use the `thunk` middleware so that each fetch response is dispatched as a change
to the global application `state`.

## Phase 4: Thunk middleware

Let's refactor how you fetch GIFs by using a thunk action creator. Recall that
we use a _thunk action creator_ to return a function. When that function is
called with an argument of `dispatch`, the function can dispatch additional
actions.

Begin by refactoring your `configureStore` function in the `store.js` file to
incorporate your thunk middleware. Remember that Redux provides `thunk`
middleware from the `redux-thunk` module. Import the `thunk` middleware and
`applyMiddleware` function from Redux. You'll use the `applyMiddleware`
function, with your `thunk` middleware as an argument, to set the optional
`enhancer` argument in the `createStore` function:

Your `store.js` file should now include the following:

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
```

Now your Redux cycle is almost good to go! To summarize your progress to this
point, you have configured your Redux store, provided the store to your
application, written a fetch function in a util file, defined an action type,
and defined an action creator.

The last step is to define a _thunk action creator_ that will dispatch the
`receiveGifs` action after the Giphy API call is successful!

Begin by importing your API util function into your `gifActions.js` file. Since
you want to easily associate your _thunk action creators_ with a specific
action, and you'll often have more than one function exported from your util
file, use a [namespace] to import your fetch function:

```js
import * as APIUtil from '../util/apiUtil';
```

You would then invoke your `fetchGifs` function in your `apiUtil.js` file like
so:

```js
APIUtil.fetchGifs(searchQuery);
```

Now it's time to write your _thunk action creator_! Define and export a function
named `fetchGifs` that receives a search term and returns a function that can be
called with `dispatch`. Your function will use a promise to parse the fetch
response to JSON and dispatch the `receiveGifs` action with the fetch response
data after the `APIUtil.fetchGifs` call is successful.

Your _thunk action creator_ should look like the following:

```js
export const fetchGifs = searchTerm => {
  return dispatch => {
    return APIUtil.fetchGifs(searchTerm)
      .then(res => res.json())
      .then(res => dispatch(receiveGifs(res.data)));
  }
};
```

Or you can clean up the function by using implicit returns with ES6 arrow
functions:

```js
export const fetchGifs = searchTerm => dispatch => (
  APIUtil.fetchGifs(searchTerm)
    .then(res => res.json())
    .then(res => dispatch(receiveGifs(res.data)))
);
```

## Phase 5: Test your thunk action creator

Let's take a moment to test your the `fetchGifs` _thunk action creator_ you just
defined.

Import `fetchGifs` from your `gifActions.js` file to your entry `index.js` file.
You'll hit the error `Parsing error: Identifier 'fetchGifs' has already been
declared` since have already imported the `fetchGifs` function from your
`apiUtil.js` file. Note that this is why using a namespace to `import * as
APIUtil` from your `apiUtil.js` file is important.

Update the import statement from your `./util/apiUtil.js` file with a namespace:

```js
import * as APIUtil from './util/apiUtil';
```

Now you'll want to put your fetch function, thunk action creator, and Redux
store on the window. This way you can view your application's global state and
compare the result of your fetch function and the dispatched thunk action
creator:

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store';
import * as APIUtil from './util/apiUtil';
import { fetchGifs } from './actions/gifActions';

const store = configureStore();
window.apiFetchGifs = APIUtil.fetchGifs;
window.fetchGifs = fetchGifs;
window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Now you'll use the `getState()` and `dispatch(action)` [store methods] to view
and update your application's global state. Try the following code in the
browser's console before continuing to the next phase:

```js
 // Return the initial application state
store.getState();

// Use the thunk action creator to dispatch the fetch response and populate state
store.dispatch(fetchGifs('puppy'));

// Return the application state populated with GIFs
store.getState();
```

Congratulations! You just wrote a Redux cycle to populate your application's
global state with a response from the Giphy API.

Notice how your application's global state changed after invoking the
`dispatch(fetchGifs('puppy))` method. Now you can pass the `fetchGifs` _thunk
action creator_ through a Redux container so that a fetch call can be dispatched
from your component to update the global state in the same way!

## Phase 6: Logger middleware

Now instead of manually logging the status of your global state and the response
of your dispatch call, you can use the Redux `logger` middleware to
automatically do so. Import `logger` from `redux-logger` into your `store.js`
file:

```js
import logger from 'redux-logger';
```

Just like how you applied your `thunk` middleware to your configured store,
you'll invoke the `applyMiddleware()` function with your `logger` middleware.
Your updated `store.js` file should look something like this:

```js
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger));
};

export default configureStore;
```

Now go back to your browser's console and dispatch a fetch request:

```sh
store.dispatch(fetchGifs('puppy'))
```

Upon a successful fetch, you should have received a helpful log with your
application's `prev state`, the dispatched `action` object, and your
application's `next state` from the `logger` middleware you just utilized!

## Phase 7: Container component

Now that you've set up the global state of your application, it's time to
connect your React components to the global state! Remember how you used the
`Provider` component in your `Root.js` file to pass the configured `store` as a
prop to the `Provider` component.

Just like how a `Context.Provider` component expects `value` as a prop to set
the context object, the Redux `Provider` component expects `store` as a prop to
share the store's global state with nested components. Instead of rendering your
`App` component as the child of the `Provider`, you'll render an `AppContainer`.

### AppContainer

In your `AppContainer.js` file, you will define a `mapStateToProps` function and
a `mapDispatchToProps` function and invoke the `connect()` function from Redux.
Invoking the `connect()` function will connect the `App` component with the
Redux store. Within the container, you will pass slices of `state` and
dispatched _thunk action creators_ as props to the `App` component.

Note that the skeleton has already imported the `connect` function from
`react-redux`, your `fetchGifs` thunk action creator from the `gifAction.js`
file, and the `App` component.

Take a look at the code skeletons of the `mapStateToProps` and
`mapDispatchToProps` functions. Think of these functions as functions that take
in `state` or `dispatch` as arguments to return object literals that represent
the props that your `App` component will receive.

Have your `mapStateToProps` function return an object with a `gifs` property set
to the `state.gifs` slice of state. Doing this will pass a `gifs` prop into your
`App` component.

Next, have your `mapDispatchToProps` function return an object with a
`fetchGifs` property set to an arrow function that accepts a `searchQuery` value
and dispatches a call to the `fetchGifs(searchQuery)` function. Remember how you
tested the `store.dispatch(fetchGifs(searchQuery))` function in the browser
console. Think of how you would use an arrow function to almost wait for a
`searchQuery` input from the user before firing the dispatch call.

Lastly, take a moment to examine how your `AppContainer.js` file is simply
exporting the `connect()` invocation:

```js
export default connect(mapStateToProps, mapDispatchToProps)(App);
```

Now you can render your `AppContainer` instead of your `App` component so that
the `connect()` method is invoked to pass a `gifs` prop and a `fetchGifs` props
to `App`!

Take a moment to refactor your `Root.js` file to do so:

```js
// Root.js
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';

const Root = ({ store }) => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default Root;
```

## Phase 8: Presentational components

Now that you've created a container to pass (or _map_) slices of the global
state and dispatched actions as props, it's time to render and update the `gifs`
from the global state!

### App

Have your `App` component take in and destructure your `gifs` and `fetchGifs`
props. Notice how your component is rendering a `SearchBar` component and a
`GifsList` component. You'll want to pass in the `fetchGifs` function as a prop
to the `SearchBar` component.

Instead of directly passing all of the `gifs` as a prop to the `GifsList`
component, you'll refactor your `mapStateToProps` function and use a selector to
map the array of `gifs` into an array of GIF urls.

Currently, your `mapStateToProps` function should look something like this:

```js
const mapStateToProps = state => {
  return {
    gifs: state.gifs,
  };
};
```

Define a `getGifUrls` selector that takes in the `state` and uses parameter
destructuring to map over each gif in the `gifs` slice of state to pluck the
image URL from the JSON data, like so:

```js
const getGifUrls = ({ gifs }) => (
  gifs.map(gif => gif.images.fixed_height.url)
);

const mapStateToProps = state => {
  return {
    gifUrls: getGifUrls(state),
  };
};
```

Now you can pass in the `gifUrls` for your `GifsList` component to render GIF
images without passing unnecessary data as props!

### SearchBar

In your `SearchBar` component, you already have a search form, an `inputValue`
state, and an `onChange` handler for the form's input field set up. Right now,
your component has several `TODO` notes to guide your creation of an `onSubmit`
handler for your search form. The `onSubmit` handler will dispatch the
`fetchGifs` action creator function (don't forget to prevent the default action
of a submit event).

After finishing your `SearchBar` component, test out your submit event handler
and check your `logger` response to see if your `fetchGifs` action creator is
actually being dispatched to update the application's global state! Once you see
that your fetched `gifs` have been dispatched to the `gifs` slice of state, it's
time to render your list of GIFs!

### GifsList

Right now, your component has several `TODO` notes:

- Take in and destructure the `gifUrls` prop.
- Render a `<div>` as the parent element of your `GifsList` component.
- Map over your `gifUrls` array to render an `<img>` for each `url`.

### Debugging

If you're having issues rendering a GIF in your project, that means it's a great
time to practice using `debugger` statements to debug your Redux cycle code! For
example, you could set a `debugger` in the:

- `handleSubmit` method to check out the submitted search `inputValue`
- `receiveGifs` action creator function to check out the value of the `gifs`
  payload
- `RECEIVE_GIFS` case statement in the `gifsReducer` to check out the value of
  the dispatch `action` object

If you didn't hit any issues, congratulations - you have implemented Redux with
the Giphy API to create a search API that renders a list of GIFs! Before moving
forward to the next project, you should still use `debugger` statements to step
through this project's Redux cycle.

[giphy-search]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-hooks/assets/giphy-search.gif

[creating a Giphy account]: https://giphy.com/join

[Giphy API Quick Start Guide]:
https://developers.giphy.com/docs/api/#quick-start-guide

[giphy-example]:
https://assets.aaonline.io/fullstack/react/assets/giphy_api_key.png

[Giphy API docs]: https://github.com/Giphy/GiphyAPI

[action]: https://redux.js.org/basics/actions

[namespace]:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Description

[store methods]: https://redux.js.org/api/store
