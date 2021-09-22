# Redux-Based Pokedex Project
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Instead of building a new application, you will spend time refactoring an
existing application, one that is not yours. Navigating around someone else's
code is an interesting way to learn what to do and what _not_ to do. The
starter application is in a little bit of a mess and needs your help to get
unmessed.

By the end of this walk-through, you will be able to:

* Describe the Redux data cycle
* Explain a _reducer_
* Configure a React application to use Redux
* Use connected components to access Redux state
* Use composed reducers to simplify state management
* Configure a React application to use the Redux development tools

## Getting started

You'll need the backend of the application.

If you have *not* cloned it, please clone the repository from
https://github.com/appacademy-starters/pokedex-backend.

If you have cloned it, please get the latest (things sometimes change) by going
to the repository in your Terminal and typing `git pull origin master`. This
will get the latest code for you.

You'll need the starter application. Please clone the repository from
https://github.com/appacademy-starters/redux-pokedex-starter.

## Tour the application

This application is a Heroku-deployable React application. Here are the files
that are in it. Hopefully, you find nothing surprising about the file layout or
the intent of each file. Take a moment to look in each file to get the lay of
the land. (Really, take a look in each file. You may feel like jumping right
into it, but looking at other people's code is helpful. This is one of the
benefits to the pair-programming learning style at App Academy.)

```
.
├── package-lock.json        - The NPM lock file
├── package.json             - The NPM file
├── public
│   └── index.html           - The page that gets served to the browser
├── server.js                - A very light-weight server for Heroku
└── src
    ├── App.js               - The main application component
    ├── Fab.js               - A floating action button component
    ├── LoginPanel.js        - The form that shows the login
    ├── LogoutButton.js      - A component for logging out
    ├── PokemonBrowser.js    - The component that shows the list and detail
    ├── PokemonDetail.js     - The component that shows the detail of a Pokemon
    ├── PokemonForm.js       - The form to create a new Pokemon
    ├── config.js            - Configuration variables
    ├── index.css            - Styling for the application
    └── index.js             - The main entry point for Webpack
```

Start the backend with `npm run dev`. Start the React application with `npm run
dev`. Make sure it runs. It looks for a local backend at
`http://localhost:8000`, so make sure that's where the backend is running.

## Install Redux and DevTools

If you haven't already, install [Redux DevTools][1]. During development, you can
watch the Redux store handle actions and change state in the timeline.

To use Redux in this application, you need to install it and the connector
between Redux and React. You will also want to use asynchronous actions with the
Redux store, so you'll want a middleware, one like [Redux Thunk][3].

```
npm install react-redux redux redux-thunk
```

There are more than one asynchronous action-handling middleware out there in
the world. Redux Thunk happens to be one of the oldest and widely used.

Whenever you consider installing a library or framework, you should make sure
that your existing application meets the expectations. For example, as of the
time of this writing, to [install "react-redux"][2], your application needs to
support **React 16.8.3** or later. Take a look in the **package.json** file to
make sure that an acceptable version of React is listed in there. If not, you
will need to upgrade the version of React used by this project by running
something like `npm upgrade`.

## Setting up the store

The _store_ is the object (and supporting objects and functions) that will
contain the state of the application. This centralizes the state so that,
presumably, you can better reason about it.

There are a couple of ways to organize your state management code, each with
their own benefits. Redux has a list of different articles about [this very
topic][4]. You should choose to organize your code in a way that makes sense to
your team (or follow any conventions that already exist). This walk-through will
follow the [Ducks][5] approach of layout.

In the **src** directory, create a new directory named **store**. In that new
directory, create a new file named **configureStore.js**. In that file, put
this code. This is boilerplate code and will appear in nearly every application
that you have that uses Redux. A description of the contents follows the code
block.

```js
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
});

const configureStore = initialState => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
};

export default configureStore;
```

(If you're looking in your console after putting this code in there, you'll
see an error about not having any valid reducers. That's true, there are no
valid reducers. You'll fix that in just a moment.)

On those first two lines, the code imports the stuff it will need to create and
configure a store.

* `createStore` is the function from Redux that creates the state-management
  object
* `applyMiddleware` allows you to plug in extra functionality into the
  state-management workflow (in this case, Redux Thunk)
* `combineReducers` takes many reducers and combines them into a single one
* `compose` is a function that _composes_ functions from right-to-left, that is,
  it puts them together, the return value of the right-most getting passed to
  the second right-most, return values getting passed from that to the third
  right-most, and so on, until the first function in the list returns its final
  value to the store ([documentation][7] for compose)
* `thunk` is the middleware that will allow you to make asynchronous calls
  because you can't do that in Redux actions

The fourth line creates a new `composeEnhancers` variable that will be either
the Redux DevTools special compose function, or the one from Redux, if DevTools
is not installed. This allows browsers that have the DevTools installed to take
advantage of watching the changes in the store.

The sixth and seventh lines is just the thing that combines the reducers for
the store into a single reducer. More about that later.

The ninth line declares a function that gets exported at the end of the file
that creates and configures the store with the `reducer`, the `initialState`
passed into the function, and composes the React Thunk middleware and the Redux
DevTools, if they exist.

To use this functionality, open **src/index.js** and add two imports to the top
of the file.

```js
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
```

Those two lines import a Context Provider from React Redux and the function you
just created above. Now, under those lines and before the `ReactDOM.render`
statement, create a store.

```js
const store = configureStore();
```

Finally, wrap the `App` component in a `Provider` component that has a "store"
property assigned the value of `store` that you created in the previous code
snippet, just as you saw in the _Passing the Store_ section of the _Usage with
React_ article you read in the homework preparing you for these topics.

If everything works, you should be able to view the Redux DevTools in your
browser's DevTools environment as a new tab. You should see the "@@INIT" action
that was run and an empty state.

![Redux DevTools initialization][6]

## Your first action workflow

Now, you will refactor the `LoginPanel` component to put the token it receives
from the AJAX call into the Redux store. The rest of the application will remain
the same, for now.

Open `LoginPanel` and review it. There are two "interesting" portions of this
code, the `render` function which will redirect to the path "/" when a token
exists (and show the login form if it does not), and the `handleSubmit` method
that makes the actual AJAX call to get the token. These are the things that you
will modify to make this work. It's going to seem like a lot of code replacing
just a few lines, but this will make your application easier to understand
because all of the state changes will be encapsulated in their own area under
the **store** directory. You won't have to search through a bunch of components
to figure out why the application as a whole is not working.

The first step is to make `LoginPanel` a _connected component_, that is, connect
it to the Redux store's pipeline. To do this, follow these steps:

1. Import `connect` from `react-redux` in the import section of the
   `LoginPanel`.
2. Remove the `export` line at the bottom and replace it with this.

   ```js
   const mapStateToProps = state => {
     return {
     };
   };

   const mapDispatchToProps = dispatch => {
     return {
     };
   };

   // Yes, this looks funny, but you will often
   // see this kind of indentation in others'
   // code when using React and Redux.
   export default connect(
     mapStateToProps,
     mapDispatchToProps
   )(
     LoginPanel
   );
   ```

The last line of the code _connects_ the `LoginPanel` to the Redux store. The
two functions that you created above it, `mapStateToProps` and
`mapDispatchToProps` are functions that you will write to help in translating
state and actions for use in your component. The `mapStateToProps` function maps
the state of the Redux store to the values that you want to show up in the
`props` of the connected component. The `mapDispatchToProps` function maps
complicated action calls to simple ones that your component can use.

The first thing you'll need is one of those actions. This is going to be
something to let your authentication run to get that token. In the **src/store**
directory, create a new file named **authentication.js** which will contain
all of the Redux-related stuff to handle authentication:

* the actions,
* the action types,
* the thunks (which are just actions that are allowed to perform calls
  that have use resources _outside_ the function, like AJAX calls or putting
  something into local storage), and,
* the reducers.

The steps that you want the application to go through are:

* Make an AJAX call to sign in (that's a _thunk_)
* When the token returns, create an _action_ that will send the token to the
  store
* Create a reducer to put the token in the store

Most of these steps will need something more, so if you see something not
defined in one of these steps, you will get to it in a later step.

### The thunk

In case you lost track, this goes in **src/store/authentication.js**.

First up, _thunks_ are functions that return another function that takes a
single function as its argument. The argument is the `dispatch` method used to
dispatch actions to Redux. So, for example, the `login` thunk could have this
form.

```js
export const login = (email, password) => async dispatch => {
  // Dispatch an action, here
}
```

That's pretty weird, if you've never seen that syntax before, those double `=>`
signs in there. It's a shortcut to write a function that returns a function. You
could also write it like this:

```js
export const login = (email, password) => {
  return async dispatch => {
    // Dispatch an action, here
  }
}
```

Once you get used to the double (or triple) `=>` signs, it becomes second nature
to write functions that return functions, that way.

Inside the login method, make a `fetch` call to the API using the same `fetch`
call found in `LoginPanel`'s `handleSubmit` method. You'll need to import
`baseUrl` from the **src/config.js** module. You don't have access to the state
of the object, just the `email` and `password` that they're passing in through
your method call, so change the "body" parameter of the `fetch` from
`JSON.stringify(this.state),` to `JSON.stringify({ email, password }),`.

For now, if the response from the fetch is ok, just get the token out of the
response object and log it to the console.

Now, to hook up this thunk to your component, open **src/LoginPanel.js** and
import the `login` thunk that you just created. At the bottom in the
`mapDispatchToProps` function, add a "login" key that is a function that
takes an email and password, and then dispatches the `login` thunk with those
values.

```js
return {
  login: (email, password) => dispatch(login(email, password))
};
```

Now, there's a "login" property on the `props` handed to the `LoginPanel`
component. The value of the "login" property is a function that takes an
_email_ and a _password_. Those then get handed to the `login` thunk which
returns a function to the `dispatch` function of Redux. It's functions all the
way down.

Now, delete everything from the `handleSubmit` method _except_ the line that
prevents the default action. Replace it with a call to the function in the
"login" property of the `props` like this.

```js
this.props.login(this.state.email, this.state.password);
```

After the application refreshes, you should be able to click the _Login_ button
on the screen and see token appear after the AJAX call completes.

Now that you have the token, you need to dispatch another action, one that isn't
created yet, to set the token in the state so it can be used elsewhere. Remove
the `console.log` statement in your `login` thunk and replace it with an
invocation of the `dispatch` method that your thunk gets, dispatching an action
creator named `setToken` with the token as its argument.

```js
dispatch(setToken(token))
```

Now, it's time to create that action.

### The action

Actions are just plain objects that have, at a minimum, a "type" property.
Action creators are just plain functions that return actions.

Below your import section and above the `login` thunk of your code in
**src/store/authentication.js**, create a constant named `SET_TOKEN` and set it
equal to the string `'pokedex/authentication/SET_TOKEN'`. You could make this
string _anything_, it just needs to be unique within your application. This is
merely the [Ducks][5] convention.

Now, create a function `setToken` that takes a token as its one parameter, and
returns an object that has a "type" property set to the `SET_TOKEN` constant and
a "token" property set to the value passed into the parameter. Export the
`setToken` function.

If you've done everything correctly to this point, when you click the _Login_
button, you should now see an action appear in the Redux DevTools with the
string that you set the `SET_TOKEN` constant to.

![Redux DevTools with SET_TOKEN action][8]

Now, you need to tell Redux how to handle that action with a reducer.

## The reducer

Somewhere in the **src/store/authentication.js** file, export a `reducer`
function as the default value of the module. The `state` parameter gets a
default value of an empty object because Redux does not like `undefined` values
returned from reducers. Redux _will_ call your reducer when it creates the store
with `undefined` just to mess with you.

```js
export default function reducer(state = {}, action) {
  // Your code in here.
}
```

In that reducer, you want to check if the "type" property of `action` is equal
to the `SET_TOKEN` constant. Every reducer is called with every action, so you
have to do this check. If it is, then you should return an object with the
token in it. If it doesn't, then just return the state unaltered. Idiomatic
Redux usually uses a `switch` statement to do this with each `case` statement
handling a different action type.

```js
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    default: return state;
  }
}

```

### Adding the reducer to the store

Now that you have the reducer handling the action, you must add it to the
reducer in **src/store/configureStore.js**. Open up that file and import the
default value as `authentication` from the **src/store/authentication.js**
module.

```js
import authentication from './authentication';
```

Then, in the `combineReducers` invocation, add `authentication` as a key and
value.

```js
const reducer = combineReducers({
  authentication
});
```

After the page reloads, when you click the _Login_ button, you should now see
the authentication and token appear in the right pane of the Redux DevTools.
(You may need to select the action in the left pane.)

## Using the token

Now, you've come full circle. You're going to use the token in the store to
inform the `LoginPanel` that it needs to close. In the `render` function, the
code uses `this.state.token` to determine whether or not to redirect. You want
that to use `this.props.token`, now, so change it to that.

To get the token value from the state of the Redux store into the `props`, you
use `mapStateToProps` function that you created below. Change it to read like
this, now, which takes the value of the token stored in the state and puts it
into the "token" property of what will be passed to `LoginPanel` in its `props`.

```js
const mapStateToProps = state => {
  return {
    token: state.authentication.token,
  };
};
```

Now, when you click the _Login_ button, it redirects the application back to
"/". However, because `App` relies on its own state to get updated from a call
to its `updateToken` method, it goes into an recursive loop of redirecting back
and forth between the `App` component and the `LoginPanel`. You'll fix that in
the next section.



[1]: https://github.com/zalmoxisus/redux-devtools-extension#installation
[2]: https://react-redux.js.org/introduction/quick-start
[3]: https://github.com/reduxjs/redux-thunk
[4]: https://redux.js.org/faq/code-structure/
[5]: https://github.com/erikras/ducks-modular-redux
[6]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/aggregates/pokedex/redux-based/assets/redux-initial-state-devtools.png
[7]: https://redux.js.org/api/compose
[8]: images/redux-set-token-action-devtools.png
