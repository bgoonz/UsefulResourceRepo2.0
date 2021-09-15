
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# React Router Introduction

Now that you know how to render components in a React app, how do you handle
rendering different components for different website pages? React Router is the
answer!

Think of how you have created server-side routes in Express. Take the following
URL and server-side route. Notice how the `/users/:userId` path corresponds with
the `http://localhost:3000/users/2` URL to render a specific HTML page.

```js
// http://localhost:3000/users/2
app.get('/users/:userId', (req, res) => {
  res.render('userProfile.pug');
});
```

In the default React setup, you lose the ability to create routes in the same
manner as in Express. This is what React Router aims to solve!

[React Router] is a frontend routing library that allows you to control which
components to display using the browser location. A user can also copy and paste
a URL and email it to a friend or link to it from their own website.

When you finish this article, you should be able to use the following from the
`react-router-dom` library:

* `<BrowserRouter>` to provide your application access to the `react-router-dom`
  library; and
* `<Route>` to connect specific URL paths to specific components you want
  rendered; and
* `<Switch>` to wrap several `Route` elements, rendering only one even if
  several match the current URL; and
* React Router's `match` prop to access route path parameters.

## Getting started with routing

Since you are writing single page apps, you don't want to refresh the page each
time you change the browser location. Instead, you want to update the browser
location and your app's response using JavaScript. This is known as client-side
routing. You are using React, so you will use React Router to do this.

Create a simple react project template:

```sh
npx create-react-app my-app --template @appacademy/simple
```

Then install React Router:

```sh
npm install --save react-router-dom@^5.1.2
```

Now import `BrowserRouter` from `react-router-dom` in your entry file:

```js
import { BrowserRouter } from 'react-router-dom`;
```

### BrowserRouter

`BrowserRouter` is the primary component of the router that wraps your route
hierarchy. It creates a React context that passes routing information down to
all its descendent components. For example, if you want to give `<App>` and all
its children components access to React Router, you would wrap `<App>` like so:

```js
// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

Now you can route the rendering of certain components to certain URLs (i.e
`https://www.website.com/profile`).

### HashRouter

Alternatively, you could import and use `HashRouter` from `react-router-dom`.
Links for applications that use `<HashRouter>` would look like
`https://www.website.com/#/profile` (with an `#` between the domain and path).

You'll focus on using the `<BrowserRouter>`.

## Creating frontend routes

React Router helps your React application render specific components based on
the URL. The React Router component you'll use most often is `<Route>`.

The `<Route>` component is used to wrap another component, causing that
component to only be rendered if a certain URL is matched. The behavior of the
`<Route>` component is controlled by the following props: `path`, `component`,
`exact`, and `render` (optional).

Create a simple `Users` component that returns `<h1>This is the users
index!</h1>`. Now let's refactor your `index.js` file so that you can create
your routes within the component:

```js
// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Users from './Users';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        {/* TODO: Routes */}
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

Note that `BrowserRouter` can only have a single child component, so the snippet
above wraps all routes within parent a `<div>` element. Now let's create some
routes!

### component

Begin with the `component` prop. This prop takes a reference to the component to
be rendered. Let's render your `App` component:

```js
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route component={App} />
      </div>
    </BrowserRouter>
  );
};
```

Now you'll need to connect a path to the component!

### path

The wrapped component will only be rendered when the path is matched. The path
matches the URL when it matches some initial portion of the URL. For example, a
path of `/` would match both of the following URLs: `/` and `/users`. (Because
`/users` begins with a `/` it matches the path `/`)

```jsx
<Route path='/' component={App} />
<Route path='/users' component={Users} />
```

Take a moment to navigate to `http://localhost:3000/users` to see how both the
`App` component and `Users` component are rendering.

### exact

If this `exact` flag is set, the path will only match when it exactly matches
the URL. Then browsing to the `/users` path would no longer match `/` and only
the `Users` component will be rendered (instead of both the `App` component and
`Users` component).

```jsx
<Route exact path='/' component={App} />
<Route path='/users' component={Users} />
```

### render

This is an optional prop that takes in a function to be called. The function
will be called when the path matches. The function's return value is rendered.
You could also define a functional component inside the `component` prop, but
this results in extra, unnecessary work for React. The `render` prop is
preferred for inline rendering of simple functional components.

The difference between using `component` and `render` is that `component`
returns new JSX to be re-mounted every time the route renders, while `render`
simply returns to JSX what will be mounted once and re-rendered. For any given
route, you should only use either the `component` prop, or the `render` prop. If
both are supplied, only the `component` prop will be used.

```jsx
// This inline rendering will work, but is unnecessarily slow.
<Route path="/hello" component={() => <h1>Hello!</h1>} />

// This is the preferred way for inline rendering.
<Route path="/hello" render={() => <h1>Hello!</h1>} />
```

It can be helpful to use `render` instead of `component` in your `<Route>` when
you need to pass props into the rendered component. For example, imagine that
you needed to pass the `users` object as a prop to your `Users` component. Then
you could pass in props from `Root` to `Users` by returning the `Users`
component like so:

```js
// `users` to be passed as a prop:
const users = {
  1: { name: 'Andrew' },
  2: { name: 'Raymond' }
};
```

```jsx
<Route path="/users" render={() => <Users users={users} />} />
```

As a reminder, `BrowserRouter` can only have a single child component. That's
why you have wrapped all your routes within parent a `<div>` element.

```jsx
const Root = () => {
  const users = {
    1: { name: 'Andrew' },
    2: { name: 'Raymond' }
  };

  return (
    <BrowserRouter>
      <div>
        <h1>Hi, I'm Root!</h1>
        <Route exact path="/" component={App} />
        <Route path="/hello" render={() => <h1>Hello!</h1>} />
        <Route path="/users" render={() => <Users users={users} />} />
      </div>
    </BrowserRouter>
  );
};
```

With this `Root` component, you will always render the `<h1>Hi, I'm Root!</h1>`,
regardless of the path. Because of the first `<Route>`, you will only render the
`App` component if the path exactly matches `/`. Because of the second
`<Route>`, you will only render the `Users` component if the path matches
`/users`.

### Route path params

A component's props can also hold information about a URL's parameters. The
router will match route segments starting at `:` up to the next `/`, `?`, or
`#`. Those matched values are then passed to components via their props. Such
segments are _wildcard_ values that make up your route parameters.

For example, take the route below:

```jsx
<Route path="/users/:userId"
       render={(props) => <Profile users={users} {...props} />} />
```

The router would break down the full `/users/:userId/photos` path to two parts:
`/users`, `:userId`.

The `Profile` component's props would have access to the `:userId` part of the
`http://localhost:3000/users/:userId/photos` URL through the `props` with router
parameter information. You would access the the `match` prop's parameters
(`props.match.params`). If you are using the `render` prop of the `Route`
component, make sure to spread the props back into the component if you want it
to know about the "match" parameters.

```jsx
// Route's `render` prop allows you to pass the `users`
// prop and spread the router `props`.
render={(props) => <Profile users={users} {...props} />}

```

The `params` object would then have a property of `userId` which would hold the
value of the `:userId` _wildcard_ value. Let's render the `userId` parameter in
a user profile component. Take a moment to create a `Profile.js` file with the
following code:

```js
// ./src/Profile.js
import React from "react";

const Profile = (props) => (
  <div>
    The user's id is {props.match.params.userId}.
  </div>
);

export default Profile;
```

Notice how it uses the `match` prop to access the `:userId` parameter from the
URL. You can use this wildcard to make and AJAX call to fetch the user
information from the database and render the return data in the `Profile`
component. Recall that your `Profile` component was rendered at the path
`/users/:userId`. Thus you can use your `userId` parameters from `match.params`
to fetch a specific user:

```js
// ./src/Profile.js
import React from "react";

const Profile = ({ users, match: { params } }) => {

  // In a real-world scenario, you'd make a call to an API to fetch the user,
  // instead of passing down and keying into a `users` prop.
  const user = users[params.userId];

  return (
    <div>
      The user's id is {params.userId} and the user's name is {user.name}.
    </div>
  );
};

export default Profile;
```

## Match

Now that you've seen your React Router's `match` prop in action, let's go over
more about [route props]! React Router passes information to the components as
route props, accessible to all components with access to the React Router. The
three props it makes available are `location`, `match` and `history`. You've
learned about `props.match.params`, but now let's review the other properties of
the `match` prop!

This is an object that contains important information about how the current URL
matches the route path. Here are some of the more useful keys on the `match`
object:

- `isExact`: a boolean that tells you whether or not the URL exactly matches the
  path
- `url`: the current URL
- `path`: the route path it matched against (without wildcards filled in)
- `params`: the matches for the individual wildcard segments, nested under their
  names

When you use React Router, the browser `location` and `history` are a part of
the state of your app. You can store information about which component should be
displayed, which user profile you are currently viewing, or any other piece of
state, in the browser location. You can then access that information from
anywhere your Router props are passed to in your app.

Now that you've learned about parameters and route props, let's revisit your
`Root` component to add an `exact` flag to your `/users` route so that it does
not render with your `/users/:userId` route. Your component should look
something like this:

```js
const Root = () => {
  const users = {
    1: { name: 'Andrew' },
    2: { name: 'Raymond' }
  };

  return (
    <BrowserRouter>
      <h1>Hi, I'm Root!</h1>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/hello" render={() => <h1>Hello!</h1>} />

        {/* Render the `Users` page if no ID is included. */}
        <Route exact path="/users" render={() => <Users users={users} />} />

        {/* Otherwise, render the profile page for that userId. */}
        <Route path="/users/:userId" component={(props) => <Profile users={users} {...props} />} />
      </div>
    </BrowserRouter>
  );
};
```

## What you learned

In this article, you learned how to:

* Use components from the React Router library; and
* Create routes to render specific components; and
* Manage the order of rendered routes; and
* Use the `exact` flag to ensure that a specific path renders a specific
  component; and
* Use the React Router `match` prop to access Router params.

[React Router]: https://github.com/ReactTraining/react-router

[route props]: https://reacttraining.com/react-router/web/api/Route/route-props
