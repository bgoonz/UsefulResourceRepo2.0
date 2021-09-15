
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# React-Redux: `<Provider/>`

As you learned in earlier articles, the integration techniques that you were
initially shown were just a starting point with using Redux with React. Now that
you've learned the basics of how React components interact with a Redux store,
it's time to learn how you can use [React-Redux][react-redux], a library from
the creators of [Redux][redux], to improve upon those techniques.

To prepare to use the `connect` function from the [React-Redux
library][react-redux], you need to first add a `<Provider />` component to your
React application. When you finish this article, you should be able to use the
`<Provider />` component to make your Redux store available to any nested
components that have been wrapped in the `connect` function.

## Understanding the advantages of the `<Provider />` component

Oftentimes, a deeply nested component will need access to the store, while its
parents do not. Using vanilla React, these parents would have to receive the
`store` prop in order to pass it down to its child.

Consider the example below:

```js
// App.js

import React from 'react';

const UserInfo = ({ store }) => (
  <div>
    {store.getState().username}
  </div>
);

const Header = ({ store }) => (
  <div>
    <UserInfo store={store} />
  </div>
);

const App = ({ store }) => (
  <div>
    <Header store={store} />
  </div>
);

export default App;
```

```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import reducer from './reducer';
import App from './App';

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
```

The `store` is created in the `index.js` file, but the `UserInfo` component that
needs to access it is deeply nested. Thus, the store must be passed as a prop
down the entire component tree, even though components such as the `Header` do
not need to access the store.

This pattern, called **prop threading**, is tedious and error-prone. You can
avoid it by using the `<Provider />`/`connect` API provided by React-Redux.

### Preparing your React application for server-side rendering

Using `<Provider />` also helps to prepare your React/Redux application to
utilize server-side rendering. Server-side rendering allows you to render
components to static markup, which can help to reduce the initial loading time
of your application.

> React server-side rendering is an advanced topic that won't be covered in this
> course. For more information, see the official [React][react-reactdomserver]
> and [Redux][redux-server-rendering] docs.

## Adding `<Provider />`

Before adding `<Provider />` to your React application, use npm to install the
`react-redux` package:

```sh
npm install react-redux
```

Then, in the entry point for your application (typically the `index.js` file),
import the `Provider` component and your Redux `store`:

```js
import { Provider } from 'react-redux';
import store from './store';
```

Then use the `Provider` component to wrap your `App` component and set its
`store` prop to your Redux `store`:

```js
<Provider store={store}>
  <App />
</Provider>
```

Here's what your completed `index.js` file will look like:

```js
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

`<Provider />` is simply a React component in which you wrap the rest of the
application. The `Provider` component receives the `store` as a `prop` and sets
a store `context`. Because you wrapped the entire `App` in the `Provider`
component, all your components can access the store `context`.

Components that need to access the store `context` have to be wrapped in a
container component created by the `connect` function, which converts the store
`context` into a `store` prop. You'll learn how to use the `connect` function in
the next article.

## Understanding how `<Provider />` relates to the React Context API

The store `context` set by `<Provider />` is the _same_ React Context that you
used in an earlier lesson to manage global state within a React application. You
can see this in action by reviewing the `react-redux` source code on GitHub:

```js
// https://github.com/reduxjs/react-redux/blob/master/src/components/Context.js

import React from 'react'

export const ReactReduxContext = /*#__PURE__*/ React.createContext(null)

if (process.env.NODE_ENV !== 'production') {
  ReactReduxContext.displayName = 'ReactRedux'
}

export default ReactReduxContext
```

And while it's rarely used, it's possible to import the context from React-Redux
and use the `<Consumer />` to access the `store`:

```js
import { ReactReduxContext } from 'react-redux';

// in your connected component
render() {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        // do something with the store here
      }}
    </ReactReduxContext.Consumer>
  );
}
```

You can also connect the Redux `<Provider />` component to the
`<Context.Provider />` component that passes the `value` of a context object to
all child components. Redux's `<Provider />` component simply passes the Redux
`store`, instead of a context `value`.

## What you learned

In this article, you learned how to use the `<Provider />` component to make
your Redux store available to any nested components that have been wrapped in
the `connect` function.

[react-redux]: https://react-redux.js.org/
[redux]: https://redux.js.org/
[react-reactdomserver]: https://reactjs.org/docs/react-dom-server.html
[redux-server-rendering]: https://redux.js.org/recipes/server-rendering
