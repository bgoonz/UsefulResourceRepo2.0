# Introduction to Hooks in Redux
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

In previous lessons and projects, you have learned to build **React** components
using **Redux**. Now it's time to explore ways to modify your approach using
hooks.

When you complete this lesson, you will be able to

* Use Redux in a function component with the `useSelector` and `useDispatch` 
hooks

## Using hooks with Redux

In order to use hooks in Redux, your application will need to utilize the 
`react-redux` package.  If you need a refresher on what this kind of application 
looks like, see the [Starting Point](#starting-point-for-ip-address-project) 
section at the end of this reading or clone the [intro-to-redux-hooks] 
repository from GitHub and look at the __starter__ folder.

## Getting Started

Consider a simple application that displays the user's current IP Address with
a button to start the lookup. You many even include a loading message which 
shows while the server call is running.

```javascript
// ./src/App.js

import React, { useEffect, useState } from 'react';

const App = props => {
  const [ip, setIP] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMyIP = () => {
    setIP('(coming soon)');
  };

  useEffect(() => {
    setLoading(ip === "");
  }, [ip]);

  return (
    <div>
      <h1>Get My IP</h1>

      {loading
        ? <p>Loading...</p>
        : <p>{ip}</p>
      }
      <button 
        onClick={getMyIP} 
        disabled={loading}
      >{ip ? 'Again' : 'Go'}</button>
    </div>
  );
};

export default App;
```

Notice that this framework uses your knowledge of the `useState` hook to 
simulate the server call and the `useEffect` hook to cause the loading indicator 
to show at the appropriate times.

Now you can update this example to use Redux hooks to replace the fake loading 
of `ip`.

## `useSelector`

Begin by importing `useSelector` from the *React Redux* package.

```javascript
import { useSelector } from 'react-redux';
```

Assuming you have a reducer with the property `ipAddress`, then you can 
use the `useSelector` hook to access the `ipAddress` from your Redux store's
state.

```javascript
const ip = useSelector(state => state.ipAddress);
```

In the sample _App.js_ above, using the `useSelector` hook would replace 
`const [ip, setIP] = useState('')`. Your component would receive the `ip` via 
your Redux store's `state.ipAddress`, instead of the component's `ip` state. 

> As a reminder, the `useState` hook in this example is simply mimicking a fetch 
> response. Upon clicking the button with the `getMyIP` click handler, a fetch 
> call is mimicked with the `setIP('(coming soon)')` method. You will need to 
> remove this line as well. Don't worry you'll replace it momentarily using
> another Redux hook.

You can access any available property this way and even call `useSelector()` 
multiple times within a single function component. You can even use props 
or route parameters to determine what to extract from the store.
 
Here is an example using props. Assume you have a store with a `users` object in 
its state. Furthermore, you want to get just `user` based on the `id` provided 
in a prop to a function component.

Here is the component's code. See if you can spot where the "magic" happens.

```javascript
import React from "react";
import { useSelector } from "react-redux";

const UserCard = props => {
  const user = useSelector(state => state.users[props.id]);
  return <div>{todo.text}</div>;
};

export default UserCard;
``` 

If you said the magic happens in the function passed to the `useSelector` hook, then you would be
correct. Specifically the square bracket notation is used to get just a part
of the `users` object. Remember, you're passing a function as the argument to
`useSelector`; therefore you can use all your skills to determine the right 
object or value to `return`.

## `useDispatch`

In order to trigger an action in **Redux**, you will need to utilize a different
hook; specifically, `useDispatch()`. This hook returns a function which you can 
call to dispatch the action.

```javascript
const dispatch = useDispatch();
```

Exactly how you use dispatch depends on your Redux setup. There are some minor
differences based on whether you decided to use `redux-thunk` in your project.
The configuration of Redux is beyond the scope of this reading and is something
you saw in previous activities. Two solutions are provided in the sample, so you 
can make the choice which works best for your project. Here's a quick look at 
these two options.

### Option A: Generic Redux (no thunk)

In this configuration, you will need to dispatch actions created in your Redux 
component (e.g. _src/store/ipAddress.js_). For example, one possible action 
creator function might look like 
`export const setIP = ip => ({ type: SET_IP, ip });`.

Any functions which perform loading operations will need to be asynchronous and 
return the value or object retrieved; perhaps in a scenario like this...

```javascript
// relevant snippet from of src/store/ipAddress.js

export const loadIP = async () => {
  // ...
  // do stuff here like a fetch with await
  // ...
  // return the result
  return origin
};
```

Back in the component with the UI (e.g. _src/App.js_), you'll need to start by
importing these functions as well as adding `useDispatch` to the import for 
**Redux**.

```javascript
import { useDispatch, useSelector } from "react-redux";
import { loadIP, setIP } from "./store/ipAddress";
```

Then use these with your button click handler. Notice you dispatch is using the 
action to set the value of the ip variable that you just got with `useSelector`.

```javascript
// relevant snippet from src/App.js

  const dispatch = useDispatch();

  const getMyIP = async () => {
    dispatch(setIP(""));

    const origin = await loadIP();
    dispatch(setIP(origin));
  };
```

The example dispatches two values for the IP Address. The first dispatch call 
sets the IP address to an empty string (so that the old value no longer shows 
in the UI while the newer value is loading). The second, of course, is the 
result of the fetch (or any other kind of service call, of course).

One advantage of this approach is that you will not need to install 
`redux-thunk` or add it to the **Redux** configuration. However, this comes
with the trade-off that actions will be dispatched throughout the application,
including in UI components.

### Option B: Using Redux Thunk

Now consider the difference using `redux-thunk`. The action function remains 
unchanged (`export const setIP = ip => ({ type: SET_IP, ip });`). The `loadIP`
function will do its own dispatching (this means a double function in the 
declaration that results in the code below).

```javascript
// relevant snippet from ./src/App.js

export const loadIP = () => async dispatch => {
  dispatch(setIP(""));

  // ...
  // do stuff here like a fetch with await
  // ...
  // dispatch the result
  dispatch(setIP(origin));
};
```

In the component (e.g. _src/App.js), you'll need to import only the `loadIP()` 
function (and not the `setIP` action creator function) (while still importing 
`useDispatch`, of course).

```javascript
import { useDispatch, useSelector } from "react-redux";
import { loadIP } from "./store/ipAddress";
```

Then the click handler for the button simplifies to

```javascript
// relevant snippet from ./src/App.js

  const getMyIP = () => {
    dispatch(loadIP());
  };
```

The advantages of this approach using **Redux Thunk** is the separation of 
responsibilities where the load and action dispatches are all together
resulting in simplified handling within the UI components.

The trade-off is double functions in your Redux 
(like `export const loadIP = () => async dispatch => {`) 
and the one-time install and setup of `redux-thunk`.

Ultimately the decision on the approach is made by each development team based 
on their personal preference.

## Refactoring an existing component

In order to refactor an existing class component from the classic approach to 
using hooks, there are several steps that need to be taken:

* Change component definition from class to function
    * Switch state handling to the `useState` hook
    * Use the `useEffect` hook for side-effect management, instead of the 
    `componentDidMount` and `componentDidUpdate` methods
    * Create or move event handlers to constant functions
* Use one or multiple `useSelector` hooks to replace the `mapStateToProps` 
function
* Invoke the `useDispatch` hook to use `dispatch` and replace the 
`mapDispatchToProps` function
* Simplify the `export` to just the component name by removing `connect`
* Delete any imports that are no longer in use

The best way to understand exactly what to do is to see an example. This will
be provided in an upcoming video lesson.

## What you have learned

The `react-redux` package comes with several hooks which can be used to replace
`mapStateToProps`, `mapDispatchToProps` and `connect`. Hooks are used with 
function components, so remember to start with one if you intend to use hooks; 
otherwise you'll need to convert your class component to a function component.

The `useSelector` hook give you access to any and all props that are exposed 
through the state in a Redux store by passing in a function to resolve the 
state property you want (e.g. `useSelector(state => state.theProp)`). The
`useDispatch` hook allows you to trigger an action directly or by calling
a function that uses `redux-thunk` to dispatch the action. 

Using hooks with **React Redux** can improve the readability and maintainability 
of a **React** project.

## Additional resources

For future reference, there are a few additional (advanced and rarely used) 
features in the [official documentation on hooks in React Redux].

## Starting point for IP address project

As promised, here is an example of setting up the framework with Redux for the 
"Get My IP" application discussed throughout this reading. This version includes 
**Redux Thunk**.

You may access the starter project, the solution project with Redux Thunk, and 
the solution project without Redux Thunk by cloning the [intro-to-redux-hooks] 
repository.

Start with `create-react-app` and install `react-redux`, `redux-thunk` and their 
dependencies (e.g. `redux`) as you've done previously.

Wrap your application in the **Redux Provider** ...

```javascript
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

... and configure a **Redux** store ...

```javascript
// ./src/store/configureStore.js

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import ipAddress from './ipAddress';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  ipAddress,
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

... which includes a **reducer**, an **action creator** function, and a 
**thunk action creator** function ...

```javascript
// ./src/store/ipAddress.js

import { ipUrl } from '../config';

const SET_IP = 'ipAddress/SET_IP';

export const setIP = ip => ({ type: SET_IP, ip });

export const loadIP = () => async dispatch => {
  dispatch(setIP(""));

  const response = await fetch(`${ipUrl}/ip`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    let { origin } = await response.json();
    // obscure last segment for privacy purposes
    origin = origin.split('.', 3).join('.') + ".xxx";
    // dispatch the result
    dispatch(setIP(origin));
  }

};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_IP: {
      return {
        ...state,
        ip: action.ip,
      };
    }

    default: return state;
  }
}
```

... that relies on the application configuration ...

```javascript
// ./src/config.js

export const ipUrl = process.env.REACT_APP_BASEURL || `https://httpbin.org`;
```

... to fetch the IP Address using the [ip query at httpbin.org].


[intro-to-redux-hooks]: https://github.com/appacademy-starters/intro-to-redux-hooks
[official documentation on hooks in React Redux]: https://react-redux.js.org/next/api/hooks
[ip query at httpbin.org]: https://httpbin.org/ip
