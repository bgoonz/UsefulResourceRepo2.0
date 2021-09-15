# WEEK-15 DAY-4<br>*Hooks* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->
________________________________________________________________________________
________________________________________________________________________________

# Hooks Objectives

Now that you've learned the basic objectives of using React, you should be able
to gain a fundamental understanding of the React, Redux, and React-Router hooks.
In your software engineering career, official documentation will be your friend!
It's important to learn how to navigate through official documentation. At the
end of the readings, you should use your new fundamental understanding of hooks
to go through the official React Hooks documentation. At the end of this topic's
articles and lectures you should be able to create function components that use
state and other React features.

You should be able to use React's:

* `useState` hook to manage a component's state.
* `useState` hook to set a default state, instead of setting the default state
  in a `constructor()` method.
* `useState` hook to update state, instead of the `setState()` method.
* `useEffect` hook to manage _side effect_ operations (i.e. data fetching).
* `useEffect` hook in replacement of commonly used component lifecycle methods
  (`componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`).
* `useEffect` (and the hook's _dependency array_) to optimize an application's
  performance by skipping `useEffect` calls.
* `useContext` hook to access a context object, instead of a `Context.Consumer`
  or the `static contentType` property.

You should be able to use Redux's:

* `useSelector` hook to access the Redux store's state from within a component
  (instead of passing a part of state as a prop with the `mapStateToProps`
  function).
* `useDispatch` hook to dispatch an action from within a component (instead of
  passing an thunk action creator function through the `mapDispatchToProps`
  function). 

You should be able to use React Router's:

* `useParams` hook to match parameters in the current route (instead of
  accessing the `match.params` prop).
* `useHistory` hook to navigation from within code (without `<Link>`,
  `<NavLink>`, or the `history` prop).
* `useLocation` hook to track url changes.
* `useRouteMatch` hook to check if the current url matches a path format.

________________________________________________________________________________

# Intro to React Hooks

React Hooks are a way for function components to have the same functionality as
class components that make use of component lifecycle methods. Hooks are simply
functions that allow components to utilize React features without explicitly
using the lifecycle methods.

Before React Hooks, the only way to use lifecycle methods were through class
components. Hooks allow you to manage a component's state and lifecycle within
function components. They are helpful in extracting stateful logic from a
component to be independently tested and reused - it's much more complicated to
test the functionality of logic in a component's lifecycle methods. After
reading this article, you will:

* Have a general understanding of the features of basic React hooks
* Understand how the basic Hooks connect to features of React class components
  (i.e. lifecycle methods)
* Create function components that use state and other React features
* Use the `useState` hook to manage a component's state
* Use the `useEffect` hook to manage _side effect_ operations (i.e. data
  fetching)
* Use the `useContext` hook to access a context object

## useState

Up to this point, you have set a component's default state within a component's
`constructor` method. The `useState` hook replaces the need to use a constructor
to declare a default state with `this.state`. You can use the `useState` hook to
set and name a default slice of state without a `constructor()` method. You can
set a default state simply by invoking the `useState` hook. The **with hooks**
example below sets the default `inputValue` state to be `'Default input value
here!'` by invoking the `useState` hook with the string `'Default input value
here!'`.

**with hooks**
```js
const FormWithHooks = () => {
  const [inputValue, setInputValue] = useState('Default input value here!');
};
```

**without hooks**
```js
class FormWithoutHooks extends React.Component {  
  constructor() {
    super();
    this.state = {
      inputValue: 'Default input value here!',
    };
  };
}
```

When you use the `useState` hook to set up a slice of state, you also set up a
prospective function to update that slice of state. In this example, you can
update a slice of state by invoking `setInputValue`, instead of invoking the
`this.setState()` method.

**with hooks**
```js
const updateInputVal = e => setInputValue(e.target.value);
```

**without hooks**
```js
updateInputVal = e => this.setState({ inputValue: e.target.value });
```

In general, React Hooks help clean up your code **a lot**! For example, when
using the `useState` hook, you can also simply reference `inputValue` throughout
the component, instead of `this.state.inputValue`. Compare the difference
between the code for the `FormWithHooks` and `FormWithoutHooks` components
below.

**with hooks**
```js
const FormWithHooks = () => {
  const [inputValue, setInputValue] = useState('');
  const updateInputVal = e => setInputValue(e.target.value);

  return (
    <form>
      <input
        type="text"
        value={inputValue}
        onChange={updateInputVal}
        placeholder="Type something!"
      />
    </form>
  );
};
```

**without hooks**
```js
class FormWithoutHooks extends React.Component {  
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
  };

  updateInputVal = e => this.setState({ inputValue: e.target.value });
  
  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.updateInputVal}
          placeholder="Type something!"
        />
      </form>
    );
  }
}
```

When refactoring your projects to implement React Hooks, you can always refactor
component by component, starting out with refactoring the component's state
management.

## useEffect

The `useEffect` hook is used to manage side effect operations. An example of a
side effect operation you are familiar with is data fetching. Similarly to the
`componentDidMount` or `componentDidUpdate` lifecycle methods, the `useEffect`
hook will automatically run.

Take a moment to notice how using the `useEffect` hook simply means invoking the
`useEffect` function. You can invoke the function with one or two arguments,
with the first argument always being a function, and then second argument being
an optional _dependency array_.

When the `useEffect` hook is invoked **without** a second argument, the function
will be invoked after every render:

```js
useEffect(() => {
  // Side effect logic invoked after every render
});
```

When the `useEffect` hook is invoked **with an empty array**, the function is
only invoked once, when a component mounts (think of `componentDidMount`):

```js
useEffect(() => {
  // Side effect logic invoked once, when a component mounts
}, []);
```

When the `useEffect` hook is invoked **with an array of dependencies**, the
function is invoked whenever a dependency changes (think of
`componentDidUpdate`):

```js
useEffect(() => {
  // Side effect logic invoked every time the `dependentVariable` changes
}, [dependentVariable]);
```

### Skipping effects with the dependency array

This second argument of the `useEffect` hook is known as the _dependency array_.
You can optimize the performance for your component by using the dependency
array to skip effects. The dependency array is a collection of dependent
variables. Similarly to how the `componentDidUpdate` lifecycle method listens
for a change in the component, the `useEffect` hook listen for changes to
variables in the dependency array to determine whether or not to run the
_effect_ again.

```js
useEffect(() => {
  // Side effect logic
}, [/* Dependency array */]);
```

### Asynchronous effects

You are familiar with using `async/await` to await a database fetch. If you'd
like to make an asynchronous fetch within a `useEffect` hook, you would declare
an asynchronous function within the hook. Then, you would invoke the
asynchronous functions from within the hook.

```js
useEffect(() => {
  const fetchSomething = async () => {
    // Fetch call
  };

  fetchSomething();
}, [/* Dependency array */]);
```

The function passed in as the `useEffect` hook's first argument **cannot** be an
asynchronous function - this is why you need to define and invoke the
asynchronous function from within the hook's first function argument.

In the example below, the `useEffect` hooks runs an asynchronous fetch of a
puppy, based on a `puppyId` input. The hook's dependency array references
`props.match.params.puppyId`. Since the `useEffect` hook's dependency array
references the `puppyId` parameter, the application will only fetch whenever the
`puppyId` parameter changes. This optimizes the code, because now the effect is
only run upon the change of a specific variable - `puppyId`!

```js
useEffect(() => {
  const fetchPuppy = async (puppyId) => {
    const puppy = await fetch(`https://api.puppies.example/${puppyId}`);
    const puppyJSON = await res.json();
    return puppyJSON;
  };

  fetchData(props.match.params.puppyId);
}, [props.match.params.puppyId]);
```

Using a dependency array also prevents endless loops. Without the dependency
array, a fetch call invoked within a `useEffect` hook would constantly run and
your code would error out.

Alternatively, you can invoke the asynchronous effect with an [IIFE]
(immediately invoked function expression). Take the example syntax below:

```js
useEffect(() => {
  (async function fetchSomething() {
    // Fetch call
  })();
}, [/* Dependency array */]);
```

### Effect cleanup

In a class component, you might use the `componentWillUnmount` lifecycle method
to handle _cleanup_. In order to _cleanup_ an effect, you would need to return a
function from within the `useEffect` hook. Having the `useEffect` hook's
callback return another function results in the cleanup behavior of
`componentWillUnmount`.

```js
useEffect(() => {
  return function cleanup() {
    // Cleanup logic
  }
}, [/* Dependency array */]);
```

In a later lesson, you will learn about how to use WebSockets. When you use a
WebSocket, you create a connection. What if you want to close that connection?
Closing a connection sounds like a _cleanup_ task! It is common to invoke the
WebSocket's `close` method in a _cleanup_ function. The example below makes use
of the _dependency array_ and a _cleanup_ function.

```js
useEffect(() => {
  if (!username) {
    return;
  }

  const ws = new WebSocket('ws://localhost:8080');
  webSocket.current = ws;
  
  return function cleanup() {
    if (webSocket.current !== null) {
      webSocket.current.close();
    }
  };
}, [username]);
```

Similar to the behavior of `componentDidUpdate`, the effect is re-run whenever
the `username` changes. The `useEffect` hook below takes care of setting up a
new WebSocket connection. The hook's _cleanup_ function will be run whenever the
component unmounts. Replacing the `componentWillUnmount` lifecycle method, the
_cleanup_ function will take care of closing the WebSocket connection when the
component unmounts.

## useContext

You can use the `useContext` hook to access a context object to read and
subscribe to context changes. The `useContext` hooks replaces the `static
contextType` property in class components. Whenever you used the `static
contextType` property in a class component, you were able to access a context
object via referencing `this.context`. When you use the `useContext` hook, you
can access a context object via whatever you name the context! In the example
below, the `useContext` hook is invoked and its return value (the `MyContext`
object) is named `context` - this means you can access the `MyContext` object
anywhere within the component via referencing `context`.

**with hooks**
```js
const context = useContext(MyContext);    // Makes `MyContext` available as `context`
const banana = useContext(BananaContext); // Makes `BananaContext` available as `banana`
const puppy = useContext(PuppyContext);   // Makes `PuppyContext` available as `puppy`
```

**without hooks**
```js
static contextType = MyContext; // Makes `MyContext` available as `this.context`
```

When using the `useContext` hook to access a context object, you would still use
a `<Context.Provider>` to set the context's `value`.

## What you have learned

In this article, you have learned about the general features of the basic React
hooks (`useState`, `useEffect`, and `useContext`). You should now understand the
functionality of how the basic Hooks connect to the features of React class
components. You should be able to use the:

* `useState` hook to manage a function component's state
* `useEffect` hook to manage running, skipping, and cleaning up effects
* `useContext` hook to access a context object

[IIFE]: https://en.wikipedia.org/wiki/Immediately_invoked_function_expression

________________________________________________________________________________
# Introduction to Hooks in Redux

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

________________________________________________________________________________
# React Router Hooks

Now it's time to dig into the specifics of how hooks can simplify **React** code
when working with React Router, specifically `react-router-dom`.

When you complete this lesson, you should be able to use the hooks that are
built into the `react-router-dom` package:

* `useParams` for matching parameters in the current route
* `useHistory` for navigation from code (without `Link` or `NavLink`)
* `useLocation` for tracking url changes
* `useRouteMatch` for checking if the current url matches a path format

## `useParams`

The most common usage of hooks with `react-router-dom` is the case where 
a RESTful path has one or more parameters, such as an `id`.

For example, the `id` in a path like `/user/:id` may be accessed as the 
property of an object returned by `useParams()`.

Option 1
```javascript
const params = useParams();
console.log('User id is', params.id);
```

Option 2 (more common)
```javascript
const { id } = useParams();
console.log('User id is', id);
```

Now, consider this path `/user/:userId/doc/:docId`. It has two parameters, 
`userId` and `docId`; therefore, they would be accessed using
`const { userId, docId } = useParams()`. Notice how the variables in the path
match the properties on the objects returned by `useParams()`.

Here's an expanded example showing a basic function component.

```javascript
// ./src/components/Document.js

import React from 'react';
import { useParams } from 'react-router-dom';

const Document = () => {
    const { userId, docId } = useParams();

    return (
        <>
            <h2>Document {docId}</h2>
            <p>Created by User {userId}</p>
        </>
    );
};

export default Document;
```

As a reminder, you'll need to wrap your components within a `<Router>` in order 
to use the hooks built into the `react-router-dom` package. Perhaps like this...

```javascript
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Document from './components/Document';

// For simplicity, Router and Switch are here instead of the traditional App.js
ReactDOM.render(
    <Router>
        <Switch>
            <Route path='/user/:userId/doc/:docId' component={Document} />
            {/* Other routes also */}
        </Switch>
    </Router>,
  document.getElementById('root')
);
```

## `useHistory`

The `useHistory()` hook gives you access to the **history** object, which is
a record of paths visited on the current browser tab.

While there are a number of possibilities for what you can do with `history`, 
some are more useful than others. Here are the top methods and property.

* `push(path, [state])`
  * Adds a new path to the history and navigates there
  * `state` object is optional
* `replace(path, [state])`
  * Removes the current path from history before adding the new path
  and navigating there
  * `state` object is optional
  * When the user goes back from the next path, they will skip the replaced path 
   (either with the browser's BACK button or the `goBack()` function)
* `goBack()`
  * Returns to the previous path in the history
* `location` - the current location 
  * `pathname` - the path
  * `search` - query params (following a `?` in the url), if any
  * `hash` - value following a `#` in the url, if any
  * `state` - object provided with `push()` or `replace()`

The `state` object is a way for you to pass one or more data values between
routes. The sender creates the object and passes it as the second argument to
`history.push` or `history.replace`; the receiver accesses the object using
`history.location.state`.

For more capabilities, you can read the [documentation on History], if you so 
desire.

Here's an example of a function component using history for custom navigation.

```javascript
// ./src/components/ComingSoon.js

import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const ComingSoon = () => {
    const history = useHistory();

    useEffect(() => {
        const tid = setTimeout(() => {
            history.replace('/');
        }, 2000);
        return () => clearTimeout(tid);
    });

    return (
        <h2>Coming Soon</h2>
    );
};

export default ComingSoon;
```

> ASIDE: This example also makes use of the `useEffect` hook discussed in other
> lessons in order to automatically redirect the user after a timeout period.
> In particular, notice how `return` is used to prevent warnings in React
> if the user chooses to leave the page before the timeout period ends.

## `useLocation`

The preferred approach to accessing the location from within a component is 
through the history object. However, there is a special case where the 
`useLocation` hook is useful - connecting to a service which tracks page loads.

One example is **Google Analytics**.

```javascript
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    useLocation
} from 'react-router-dom';
import ga from 'react-ga';

const TrackingWrapper = ({ children }) => {
    const location = useLocation();
    React.useEffect(() => {
        ga.send(['pageview', location.pathname]);
    }, [location]);
    return children;
}

ReactDOM.render(
    <Router>
        <TrackingWrapper>
            <Switch>
                {/* App and/or Routes, etc. */}
            </Switch>
        </TrackingWrapper>
    </Router>,
  document.getElementById('root')
);

```

The setup and usage of Google Analytics is beyond the scope of this lesson. 
However, if you'd like to learn more you can search online for examples, such as
[Google Analytics with React]. In short, the call to `ga.send()` logs whatever
event you pass it into your GA account. Then you can sign in to GA to view and
analyze the recorded data including days and times when users are most active,
what country your visitors are coming from, and much more.

## `useRouteMatch`

If you'd like to check for a matching path before rendering a route, then
turn to `useRouteMatch`. This hook accepts an argument which is compared to the
current path in the same fashion as `Route` and returns a boolean (`true` or 
`false`).

For example, `useRouteMatch('/report/advanced')` could be
used to show (or hide, when not matching) an advanced user interface for 
modifying a report on the fly.

## Bring it together

Here is an example of a component which lays the framework for a thorough usage
of React Router hooks (except `location` which is better used elsewhere). Use 
your detective skills to figure out as much as you can. A thorough explanation 
is provided in one of the video lessons.

Imagine the following `Report` component is placed in a router with
`<Route path={['/report/:date', '/report']} component={Report}/>`.

> BONUS: In case you didn't know already, a router can use an array to specify
> multiple paths to match with the provided component.

```javascript
// ./src/components/Report.js

import React, {useEffect} from 'react';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';

const Report = () => {
    const matchUC = useRouteMatch({
        path: '/REPORT*',
        strict: true,
        sensitive: true
    });
    const matchAdvanced = useRouteMatch([
        '/report/advanced',
        '/report/*/advanced'
    ]);
    const matchAll = useRouteMatch('/report/all');
    const { date } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (matchUC)
            history.replace(history.location.pathname.toLowerCase());
    }, [matchUC, history])

    if (matchUC)
        return ""

    if (!date) return (
        <p>Select Report
            <br/><button onClick={() =>
                history.push('/report/last-week')
            }>Last Week</button>
            <br/><button onClick={() =>
                history.push('/report/last-month')
            }>Last Month</button>
            <br/><button onClick={() =>
                history.push('/report/all')
            }>View All</button>
        </p>
    );

    if (date === 'advanced') return (
        <p>Select Report
            <br/><button onClick={() =>
                history.push('/report/last-week/'+date)
            }>Last Week</button>
            <br/><button onClick={() =>
                history.push('/report/last-month/'+date)
            }>Last Month</button>
            <br/><button onClick={() =>
                history.push('/report/all/'+date)
            }>View All</button>
        </p>
    );

    if (matchAll) return (
        <>
            <h2>Complete Report of Everything</h2>
            {matchAdvanced && <p>... Alternate Advanced Controls ...</p>}
        </>
    )

    return (
        <>
            <h2>Report For {date}</h2>
            {matchAdvanced && <p>... Advanced Controls ...</p>}
        </>
    );
};

export default Report;
```

The various routes to explore include

* `/REPORT` or `/REPORT/SOMETHING/ADVANCED` or any other variation starting with
REPORT in all caps will redirect to the same url in lowercase
* `/report` or `/report/advanced` will show a few buttons
* `/report/all` will show a different title than `/report/something-else`
(with or without the next option)
* any url ending in `/advanced` will show "Advanced Controls"

## What you've learned

The `react-router-dom` package comes with hooks you can use to simplify the code 
in your **React** applications. For example, utilizing 
`const { id } = useParams()` within a component displayed in the path 
`/user/:id` give you access to the value that replaces the `:id` parameter. 
Navigating can be accomplished with `const history = useHistory()` followed by 
`history.push('/a/new/path')`, and you can even include a `state` object as 
a second parameter. Additionally, `useLocation` can help you connect to tracking 
services, and `useRouteMatch` might come in handy once in while for pattern 
matching on the path itself. In short, the handling of RESTful paths in React is 
enhanced when you embrace the hooks available in React Router.

For future reference, you may want to bookmark the 
[official documentation on React Router Hooks].


[documentation on History]: https://reactrouter.com/web/api/history
[Google Analytics with React]: https://levelup.gitconnected.com/using-google-analytics-with-react-3d98d709399b
[official documentation on React Router Hooks]: https://reactrouter.com/web/api/Hooks

________________________________________________________________________________

# React Hooks Documentation

You now know how to manage information in a React application through `state`,
`props`, `context`, and a `Redux` store. Take a moment to read through the
official React Hooks documentation. Now that you've been working with React for
almost two weeks now, you should have a base level understanding of React and
the component lifecycle. Congratulations on learning such a concept heavy
library!

As you move forward in your development careers, you'll need to lean more on
official documentation - React's official documentation is a great place to
start! Review the following articles about from the official React Hooks
documentation and try to be aware of how you navigate the documentation to aid
your own learning.

## Why hooks?

* [The Motivation Behind Hooks]
* [Hooks at a Glance]

## Hook basics

* [Rules of Hooks]
* [Hooks API Reference]
* [useState]
* [useEffect]
* [useContext]
* [Optimizing Performance by Skipping Effects]

## More about hooks

* [Custom Hooks]
* [Hooks FAQ]

[The Motivation Behind Hooks]:
  https://reactjs.org/docs/hooks-intro.html#motivation
[Hooks at a Glance]:
  https://reactjs.org/docs/hooks-overview.html
[Rules of Hooks]:
  https://reactjs.org/docs/hooks-rules.html
[Hooks API Reference]:
  https://reactjs.org/docs/hooks-reference.html
[useState]:
  https://reactjs.org/docs/hooks-state.html
[useEffect]:
  https://reactjs.org/docs/hooks-effect.html
[useContext]:
  https://reactjs.org/docs/hooks-reference.html#usecontext
[Optimizing Performance by Skipping Effects]:
  https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
[Custom Hooks]:
  https://reactjs.org/docs/hooks-custom.html
[Hooks FAQ]:
  https://reactjs.org/docs/hooks-faq.html

________________________________________________________________________________

# Pokedex Hooks Project: Phase 1

In today's project you will refactor class-based components that make use of
lifecycle methods to function components that make use of React Hooks! At this
point, you have already built an application with class components and context
to manage application state. You've also built the same application to learn
about how to use Redux instead of React Context for state-management. 

In this project, you'll build your application with React and Redux hooks! You
will implement the:

- `useState` hook to manage a component's state
- `useEffect` hook to manage a component's side effect operations
- `useDispatch` hook to dispatch actions from with a component file
- `useSelector` hook access slices of state from the Redux store
- `useContext` hook to manage your application with Context instead of Redux

## Phase 1: State-based hooks application

You'll need the backend for the Pokedex application. Take a moment to clone it
from https://github.com/appacademy-starters/pokedex-backend and get it set up.

The API for the backend is also documented in repository's README.

Once you have that up and running, you'll begin working out of the solution for
the state-based class components project. Begin by cloning the state-based
application from
https://github.com/appacademy-starters/react-hooks-pokedex-starter.git.

Throughout today, you'll work on refactoring each class component in the
application to be a function component that makes use of React Hooks!

### Explore the reference application

As you might remember, your current application comprises of the following
components:

* `App`: Does the browser routing and top-level fetches of data to draw the data
* `LoginPanel`: Shows the login panel
* `PokemonBrowser`: The browser that draws the list on the left after logging in
   and has a route to the `PokemonDetail` when the route matches "/pokemon/:id"
* `PokemonDetail`: Makes a fetch to the API on mount and update to load the
   details of the selected Pokemon

### Refactor components

As you're refactoring your application's components, you'll most likely hit bugs
and break your application. While you're refactoring each component, make sure
to test that your refactored code is working before moving on to refactor the
next component. As a general guideline, you should refactor each component from
the lowest, most nested component up to the top-most parent:

1. `PokemonDetail`
2. `PokemonBrowser`
3. `LoginPanel`
4. `App`

You'll update how each component sets its default state by using the `useState`
hook. You'll also refactor the lifecycle methods of each component into side
effect operations managed by the `useEffect` hook. At the end of this exercise,
you should have a good understanding of how to use the basic `useState` and
`useEffect` hooks to write function components with side effect operations.

Take this project as a way to practice learning new technologies by referencing
official documentation:

* [Using the State Hook]
* [Using the Effect Hook]
* [Hooks API Reference]

Remember, Create React App will let your React application use environment
variables that start with `REACT_APP_`. Just like with your state-based
application built with class components, you can import environment variables
from the `config.js` file to clean up your code for specifying the URL of the
backend.

Once you have finished refactoring, take a moment to commit your changes to the
main branch of your `react-hooks-pokedex-starter` project:

```sh
git add .
git commit -m "Refactor app to implement hooks"
```

In the next two phases, you'll create two different projects in two different
branches that use this commit as a starting point. You'll branch off from this
point to create a Redux-based project and a Context-based project (both
utilizing hooks).

[Using the State Hook]: https://reactjs.org/docs/hooks-state.html
[Using the Effect Hook]: https://reactjs.org/docs/hooks-effect.html
[Hooks API Reference]: https://reactjs.org/docs/hooks-reference.html

________________________________________________________________________________

# Pokedex Hooks Project: Phase 2

As you might remember from the Redux-based Pokedex project, implementing Redux
results in a lot of boilerplate code. Using Redux hooks can help clean up and
get rid of a lot of boilerplate code. In this phase you will refactor the
Redux-based project to use React hooks and implement Redux hooks!

Begin by creating a new branch for your Redux-based application:

```sh
git checkout -b redux-hooks-app
```

Take a moment to download the [Redux-based Pokedex hooks starter project]. Make
sure you are in your new `redux-hooks-app` branch:

```sh
git branch
```

Delete all of your project's current code and move the files of
`redux-based-pokedex-solution` into your current directory
(`react-hooks-pokedex-starter`). For example, if both
project directories are within the same directory, you can use the `mv` command
from the two project folders' parent directory.

```sh
mv -v redux-based-pokedex-solution/* react-hooks-pokedex-starter
```

Now take a moment to commit the start of your Redux-based project:

```sh
git add .
git commit -m "Initialize redux hooks starter project"
```

## Using Redux hooks to manage application state

In this phase, you'll be refactoring all your component files to use Redux hooks
instead of the `mapStateToProps`, `mapDispatchToProps`, and Redux `connect`
functions. Just like in phase 1, you might hit bugs and break your application
while refactoring your application's components. Make sure to test that your
refactored code is working before moving on to refactor the next component. As a
general overview, you'll be refactoring the code for the following components:

1. `LogoutButton`
2. `LoginPanel`
3. `PokemonDetail`
4. `PokemonForm`
5. `PokemonBrowser`

There are two ways you can refactor your project:

1. You can refactor your project to use the `useDispatch` and `useSelector`
   hooks in a _container_ component.
2. You can refactor your project to use the `useDispatch` and `useSelector`
  hooks within the component itself.

You can choose either method to refactor your project. At this point, you are a
full-fledged React developer - it's time for you to start planning your own
React code! Talk things through with your partner and decide which way you would
like to begin refactoring your project. Remember, as you are using this project
as practice for implementing Redux hooks, you can always implement Redux hooks
into a container component for one component, and then implement Redux hooks
directly in another component for the next component. Just make sure to choose
one method to stick with for your personal React projects!

### Version 1: Using Redux hooks in a container component

If you chose to use the `useDispatch` and `useSelector` hooks in a _container_
component, this means you should use a namespace to import actions into each
component file. For example, in the `LogoutButton.js` file, you currently have
the following import statement that imports the `logout` action creator
function:

```js
import { logout } from '../actions/authentication';
```

In order to remove confusion about whether an invocation of `logout()` is
invoking the `logout` prop or the `logout` action creator function, you can
update the import statement for your logout action to use an `AuthAction`
namespace:

```js
import * as AuthAction from '../actions/authentication';
```

This way, you can create a container component to replace what is happening
under the hood with the `mapStateToProps`, `mapDispatchToProps`, and `connect`
functions. You can reference the logout action with the `AuthAction` namepsace,
like so: `AuthAction.logout`.

Based on the `mapStateToProps` and `mapDispatchToProps` functions in the
`LogoutButton.js` file, you can tell that the component is accessing Redux by
receiving `loggedOut` and `logout` props:

```js
const mapStateToProps = state => {
  return {
    loggedOut: !state.authentication.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
```

Take a moment to import the `useSelector` and `useDispatch` from the Redux
library into the file:

```js
import { useDispatch, useSelector } from 'react-redux';
```

Now you'll write a container component that will replace the `mapStateToProps`,
`mapDispatchToProps`, and `connect` functions! Start by setting up the container
component that returns the `LogoutButton` component to use the `useDispatch`
prop. You'll also want to have the `LogoutButton.js` file export the
`LogoutButtonContainer` component (instead of the higher-order component
returned by the `connect` function):

```js
const LogoutButtonContainer = () => {
  const dispatch = useDispatch();

  return <LogoutButton />;
};

export default LogoutButtonContainer;
```

> Feel free to visit the Redux Hooks documentation to view [`useDispatch`
> examples].

Now that you have the container component and `dispatch` set up, you can pass
dispatched version of the `logout` action as a prop into the `LogoutButton`
component:

```js
const LogoutButtonContainer = () => {
  const dispatch = useDispatch();
  const logout = () => dispatch(AuthAction.logout());

  return <LogoutButton logout={logout} />;
};
```

At this point, the container component is taking care of what the
`mapDispatchToProps` function took care of! Now let's use the `useSelector` hook
to take care of what the `mapStateToProps` function took care of:

```js
const LogoutButtonContainer = () => {
  const dispatch = useDispatch();
  const logout = () => dispatch(AuthAction.logout());
  const loggedOut = useSelector(state => !state.authentication.token);

  return <LogoutButton logout={logout} />;
};
```

> Feel free to visit the Redux Hooks documentation to view [`useSelector`
> examples].

Now that you've gone over how to create a container component that implements
Redux Hooks for the `LogoutButton` component, follow the same pattern to
implement Redux hooks into container components for your `LoginPanel`,
`PokemonDetail`, `PokemonForm`, and `PokemonBrowser` components. Feel free to
practice implementing Redux hooks directly within a component instead!

### Version 2: Using Redux hooks from within a component

If you chose to use the `useDispatch` and `useSelector` hooks within the
component itself, you'll need to do some refactoring so that your component
doesn't receive any props. Instead of receiving slices of state and dispatchable
action functions as props, you will use the `useSelector` hook to access a slice
a state from within the component and the `useDispatch` hook to dispatch actions
from within the component.

Based on the `mapStateToProps` and `mapDispatchToProps` functions in the
`LogoutButton.js` file, you can tell that the component is accessing Redux by
receiving `loggedOut` and `logout` props.

```js
const mapStateToProps = state => {
  return {
    loggedOut: !state.authentication.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
```

Take a moment to import the `useSelector` and `useDispatch` from the Redux
library into the file.

```js
import { useDispatch, useSelector } from 'react-redux';
```

Now you'll want to remove all the props that the `LogoutButton` receives.
Instead of receiving props to access the `loggedOut` state and dispatched
`logout` function, you'll use the `useSelector` and `useDispatch` hook you just
imported into the file. At this point, your `LogoutButton` component should look
something like this:

```js
const LogoutButton = () => {
  if (loggedOut) {
    return <Redirect to="/login" />;
  }

  return (
    <div id="logout-button-holder">
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};
```

Now you'll use Redux hooks within the `LoginButton` component so that you can
remove the `mapStateToProps`, `mapDispatchToProps`, and `connect` functions!
Instead of receiving a `loggedOut` prop, you'll use the `useSelector` hook to
access the state's `authentication.token`.

```js
const LogoutButton = () => {
  const loggedOut = useSelector(state => !state.authentication.token);
  
  // CODE SHORTENED FOR BREVITY
};
```

> Feel free to visit the Redux Hooks documentation to view [`useSelector`
> examples].

Notice how the `logout` thunk action creator function has already been imported
into your `LogoutButton.js` file. You'll use `useDispatch` hook to return a
reference to the `dispatch` function from the Redux store:

```js
const dispatch = useDispatch();
```

Then you can use the `dispatch` function to dispatch the `logout` function:

```js
const LogoutButton = () => {
  const loggedOut = useSelector(state => !state.authentication.token);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(logout());

  // CODE SHORTENED FOR BREVITY
};
```

> Feel free to visit the Redux Hooks documentation to view [`useDispatch`
> examples].

Lastly, you'll want to remove the `mapStateToProps` and `mapDispatchToProps`
functions from the file, and replace the `connect` function to an export
statement that exports the `LoginButton` component by default:

```js
export default LoginButton;
```

Now that you've gone over how to refactor your `LogoutButton` component, follow
the same pattern to implement Redux hooks into your `LoginPanel`,
`PokemonDetail`, `PokemonForm`, and `PokemonBrowser` components. Feel free to
practice creating a container component that utilizes Redux hooks instead!

### Router hooks: `useParams`

Notice the references to the React Router `match` prop accessed in your
`PokemonBrowser` and `PokemonDetail` components. Instead of having your
component take in a `match` prop to access the route parameters, you'll
implement the `useParams` prop and use object destructuring to access the
`pokemonId` parameter in the `PokemonBrowser` component and the `id` parameter
in the `PokemonDetail` component. Feel free to visit React Router documentation
to view examples of using the [`useParams` hook].

Once you have finished refactoring, take a moment to commit your changes to your
`redux-hooks-app` branch:

```sh
git add .
git commit -m "Refactor app to implement redux hooks"
```

Now that you have practiced refactoring your application to implement Redux
hooks, it's time to work on a Context-based project utilizing React's
`useContext` hook! In the next phase, you'll branch off from your application's
main branch to create a new `context-hooks-app` branch for the project.

[useParams]: https://reacttraining.com/blog/react-router-v5-1/#useparams
[Redux-based Pokedex hooks starter project]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-hooks/projects/pokedex-hooks/starter-redux-based-hooks.zip
[`useSelector` examples]: https://react-redux.js.org/next/api/hooks#useselector-examples
[`useDispatch` examples]: https://react-redux.js.org/next/api/hooks#examples
[`useParams` hook]: https://reactrouter.com/web/api/Hooks/useparams

________________________________________________________________________________

# Pokedex Hooks Project: Phase 3

At this point, you've managed a state-based project with the `useState` and
`useEffect` hooks and a Redux-based project with the `useSelector` and
`useDispatch` hooks. Now you'll work off of the state-based project you built in
Phase 2 to manage your application's state with the `useContext` hook!

Begin by creating a new branch for your Context-based application off of your
main branch:

```sh
git checkout master
git checkout -b context-hooks-app
```

## Using the `useContext` hook to manage application state

Think of how you created a Redux cycle to pass Pokedex information through your
components. Now you'll manage your application's global information by using
React Context instead! Remember that you still generate context with the
`createContext` function, just as you would for class components. You also still
use `<Context.Provider>` components to set the `value` of your context object.

Think of how you would make use of the `useContext` hook instead of Redux's
`connect()` function to pass slices of state as well as functions to update the
global state. As you use the `useEffect` hook for side effect operations, think
of conditions where you would want to prevent the effect from running. Remember
to set the variables that determine these conditions in the `useEffect` hook's
dependency array.

### Providing context

Begin by creating a `PokemonContext` with the `createContext` function from
React. Then you'll need to set the context value with a `<Context.Provider>`
component by making a wrapper Provider component for the `App` component. Create
an `AppWithContext` component as the wrapper component for `App`.The wrapper
component will have the following slices of state:

  * `pokemon` - defaults to an empty array.
  * `singlePokemon` - defaults to `null`.
  * `authToken` - defaults to the `state-pokedex-token` item stored in
    `localStorage`.
  * `needLogin` - defaults to the _truthyness_ of the `state-pokedex-token` item
    stored in `localStorage` (hint: you can use the [double not] `!!` notation).

The wrapper component will also pass the following functions as the context
`value`:

  * `login(token)` - to set the `state-pokedex-token` item in `localStorage`,
    update the `authToken` state, and update the `needLogin` state to `false`.
  * `loadPokemon()` - to fetch all pokemon and update the `pokemon` state.
  * `getOnePokemon(id)` - to fetch one pokemon and update the `singlePokemon`
    state.

After you have set up the wrapper component, make sure to replace the `App` that
is rendered in your `index.js` file with your new `AppWithContext` wrapper
component. Now it's time to change your application from being a state-based
application to a context-based application.

Begin by removing all props that are passed between components. You'll use the
hooks and the `PokemonContext` value to manage the global state of your
application instead. Make sure to even remove the `match` prop you access in the
`PokemonDetail` component. You'll use the [useParams] hook from [React Router
v5.1] instead of the `match` prop.

### Consuming context with the useContext hook

Your application's consuming components should access the `PokemonContext`
through using the `useContext` hook. Feel free to reference the [Hooks API
Reference] to revisit the documentation on the `useContext` hook. As a reminder,
the `useContext` hook replaces the `static contextType` property of class
components:

### static contextType

```js
// Receive access to context in class components:
static contextType = PokemonContext;

// Access context with the `contextType` property:
this.context
```

### useContext

```js
// Receive access to context with React Hooks in function components:
const context = useContext(PokemonContext);

// Access context with the `useContext` hook:
context
```

Now it's time to set up how your application components _consume_ the
`PokemonContext`!

Feel free to console log the `context` in any component you are accessing the
`PokemonContext`. It could be helpful to create an application state logging
system like so:

```js
const context = useContext(PokemonContext);
console.log(context);
```

This way upon the mounting of a component, you have a general sense of the
`context` object the component is receiving. Since you'll be using Hooks and
Context to manage your user authentication, you may need to clear your
`localStorage` items to reset your application to allow for future testing and
debugging. As a reminder, you can go to the `Application` tab of your developer
tools to find a `Storage` section with your `Local Storage` items. There you can
right click to delete all items stored in `localStorage`.

### App

Take a moment to compare the code that currently lives in your `AppWithContext`
with the code that lives in you `App` component. Notice how there is a lot of
duplicated logic. This is because you `App` was the main component managing your
application's state-based information. Now that you have moved all the logic to
your `AppWithContext` component, you can refactor your `App` component to simply
use the `useContext` hook to pass the `needLogin` value to the `<PrivateRoute>`
it renders. You can also remove all other props passed through the routes. Your
refactored `App` component should look something like this:

```js
// App.js
import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './routesUtil';
import LoginPanel from './LoginPanel';
import PokemonBrowser from './PokemonBrowser';
import { PokemonContext } from './PokemonContext';

const App = () => {
  const { needLogin } = useContext(PokemonContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPanel} />
        <PrivateRoute
          path="/"
          component={PokemonBrowser}
          needLogin={needLogin}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
```

### LoginPanel

Let's begin by refactoring your `LoginPanel` component! The `LoginPanel` should
access the context's `login` function. Feel free to also access the `authToken`
value for testing purposes. Note that you can also destructure the context
object, like so:

```js
const { login, authToken } = useContext(PokemonContext);
console.log(authToken);
```

You'll want to make sure that your `LoginPanel` has the following slices of
state:

  * `loggedIn` - defaults to `false`.
  * `email` - defaults to `'demo@example.com'`.
  * `password` - defaults to `'password'`.

Your `LoginPanel` component should also hold the following three functions:

  * `handleSubmit` - to make a fetch request to your API, update the `loggedIn`
    state, and invoke the context's `login` function with the `token` from the
    fetch response.
  * `updateEmail` - to update the `email` slice of state.
  * `updatePassword` - to update the `password` slice of state.

Lastly, your `LoginPanel` should redirect logged in users to the home page,
based on the `loggedIn` slice of state:

```js
if (loggedIn) return <Redirect to="/" />;
```

Now you'll want to set up your `PokemonBrowser` component before testing the
login flow and home page redirection - you'll hit a lot of errors if you don't
refactor your `PokemonBrowser` correctly first.

### PokemonBrowser

At this point, your `PokemonBrowser` component should look something like this:

```js
import React from "react";
import { NavLink, Route } from "react-router-dom";
import { imageUrl } from "./config";
import PokemonDetail from "./PokemonDetail";

const PokemonBrowser = ({ pokemon, token }) => {
  if (!pokemon) return null;

  return (
    <main>
      <nav>
        {pokemon.map((poke) => {
          return (
            <NavLink key={poke.name} to={`/pokemon/${poke.id}`}>
              <div className="nav-entry">
                <div className="nav-entry-image"
                  style={{
                    backgroundImage: `url('${imageUrl}${poke.imageUrl}')`
                  }} />
                <h1>{poke.name}</h1>
              </div>
            </NavLink>
          );
        })}
      </nav>
      <Route
        path="/pokemon/:id"
        render={(props) => <PokemonDetail {...props} token={token} />}
      />
    </main>
  );
};

export default PokemonBrowser;
```

You won't need to refactor any existing code within component, except removing
the props it receives. You'll simply use the `useContext` hook to access the
`PokemonContext` and use the `useEffect` hook to update the context's `pokemon`.

Begin by having your `PokemonBrowser` component access the context's `pokemon`
and `loadPokemon` function:

```js
const { pokemon, loadPokemon } = useContext(PokemonContext);
console.log(pokemon);
```

You'll want to update the global state by invoking `loadPokemon` upon load.
 Since data fetch is considered a _side effect operation_, you'll invoke the
 `loadPokemon` function within a `useEffect` hook:

```js
useEffect(() => {
  loadPokemon();
}, []);
```

Note that the hook's _dependency array_ is empty. If you start your server,
you'll notice that your application will be stuck in an infinite loop to fetch
pokemon! Think of what conditions you want your `loadPokemon` function to be
invoked (hint: think of how to use the length of the `pokemon` array).

Take a moment to test the user login flow. You want to be redirected to view the
`PokemonBrowser` component. You also want to keep an eye on your backend
database logs. Make sure that you are setting correct variables to optimize the
fetch calls made from the `useEffect` hook from your `PokemonBrowser`!

### PokemonDetail

Instead of using the `match.params.id` prop, your `PokemonDetail` component will
make use of the [useParams] hook from [React Router v5.1]! Begin by using the
`useContext` hook to give the component access to the context's `singlePokemon`
and `getOnePokemon` function.

Note that you can also rename the object keys to prevent the need to refactor
your rendered JSX. In the snippet below, the context's `singlePokemon` is
renamed to be `pokemon`.

```js
const { singlePokemon: pokemon, getOnePokemon } = useContext(PokemonContext);
console.log(pokemon);
```

This way, you won't need to refactor any of the render code to render the
`pokemon` in the `PokemonContext`!

Have your `PokemonDetail` component update the global state by invoking the
`getOnePokemon` function with the `id` from the route parameters upon load.
Import the [useParams] hook from the `react-router-dom` package:

```js
import { useParams } from 'react-router-dom';
```

Now you can simply invoke the function and destructure the `params` object it
receives!

```js
const { id } = useParams();
```

You'll need to use a `useEffect` hook to fetch a pokemon based on the `id` from
the route parameters. Just like in your `PokemonBrowser` component, you need to
determine what variables to place in the dependency array so that your
application is not stuck in an infinite fetch loop!

In your `useEffect` hook, you'll need to check two conditions. If the single
`pokemon` is _falsey_, have your component invoke the `getOnePokemon` function
with the `id` parameter. If the pokemon's ID is not equal to the route parameter
`id`, also have your component invoke the `getOnePokemon` function to fetch a
specific pokemon! Remember that the `id` from your route parameters is currently
a string, so you'll need to parse the `id` in order to make a valid comparison
to the pokemon's ID.

After you have finished refactoring your state-based React application built
with class components to a context-based React application built with function
components and React Hooks, compare your context-based application to the
redux-based solution. Using Redux instead of Context results in a lot of
boilerplate code in your application. React 16 revamped the Context API and
deemed the `useContext` hook as a basic hook to improve React's built-in state
management.

Redux is a large library with a lot of conceptual knowledge involved. In the
next project, you will dive deeper and have more practice with implementing the
Redux library for state management. Although you are free to use either Context
or Redux to manage the application state of your project next week, you can take
today's bonus project as a chance to dive in deeper and truly learn Redux.
Understanding all the conceptual knowledge behind the library will help you
architect your own React project and plan your application's state management.

[double not]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Double_NOT_!!
[useParams]: https://reacttraining.com/blog/react-router-v5-1/#useparams
[React Router v5.1]: https://reacttraining.com/blog/react-router-v5-1/
