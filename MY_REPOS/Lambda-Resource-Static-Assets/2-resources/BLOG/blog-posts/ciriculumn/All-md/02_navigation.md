# React Router Navigation
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Now that you know how to create front-end routes with React Router, you'll need
to implement a way for your users to navigate the routes! This is what using
React Router's `Link`, `NavLink`, `Redirect`, and `history` prop can help you
do.

In this article, you'll be working off of the demo project you built in the
React Router Intro reading. When you finish this article, you should be able to
use the following components from the `react-router-dom` library:

* `<Link>` or `<NavLink>` to create links with absolute paths to routes in your
  application (like "/users/1"); and,
* `<Redirect>` to redirect a user to another path (i.e. a login page when the
  user is not logged in); and
* React Router's `history` prop to update a browser's URL programmatically.

## Adding links for navigation

React Router's `<Link>` is one way to simplify navigation around your app. It
issues an on-click navigation event to a route defined in your app's router.
Using `<Link>` renders an anchor tag with a correctly set `href` attribute.

### Link

To use it, update your imports from the `react-router-dom` package to include
`Link`:

```js
import { BrowserRouter, Route, Link } from 'react-router-dom';
```

Note that `<Link>` can take two props: `to` and `onClick`.

The `to` prop is a route location description that points to an absolute path,
(i.e. `/users`). Add the following `Link` components in your `index.js` file
above your routes:

```jsx
<Link to="/">App</Link>
<Link to="/users">Users</Link>
<Link to="/users/1">Andrew's Profile</Link>
```

The `onClick` prop is just like any other JSX click handler. You can write a
function that takes in an `event` and handles it. Add the following `Link`
before your routes and the following click handler function within your `Root`
component:

```jsx
// Link with onClick prop
<Link to="/" onClick={handleClick}>App with click handler</Link>
```

```js
// Click handler function
const handleClick = () => {
  console.log('Thanks for clicking!')
};
```

Now, test your routes and links! If you inspect the page, you'll see that your
links are now rendered as `<a>` elements. Notice that clicking the `App with
click handler` link logs a message in your console while directing your browser
to render the `App` component.

### NavLink

The `<NavLink>` works just like a `<Link>`, but with a little extra
functionality. It has the ability to add extra styling when the path it links to
matches the current path. This makes it an ideal choice for a navigation bar,
hence the name. This styling can be controlled by three extra props:
`activeClassName`, `activeStyle`, and `exact`. To begin using `NavLink`, update
your imports from the `react-router-dom` package:

```js
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
```

The `activeClassName` prop of the `NavLink` component allows you to set a CSS
class name for styling the `NavLink` when its route is active. By default, the
`activeClassName` is already set to `active`. This means that you simply need to
add an `.active` class to your CSS file to add active styling to your link. A
`NavLink` will be active if its `to` prop path matches the current URL.

Let's change your "Users", "Hello", and "Andrew's Profile" links to be different
colors and have a larger font size when active.

```jsx
<NavLink to="/">App</NavLink>
<NavLink activeClassName="red" to="/users">Users</NavLink>
<NavLink activeClassName="blue" to="/hello">Hello</NavLink>
<NavLink activeClassName="green" to="/users/1">Andrew's Profile</NavLink>
<NavLink to="/" onClick={handleClick}>App with click handler</NavLink>
```

For example, this is what the rendered HTML `<a>` tag would look like when when
the browser is navigated to the `/` path or the `/users` path:

```html
<!-- Navigated to the / path (the activeClassName
     prop is set to active by default) -->
<a href="/" class="active">App</a>

<!-- NOT navigated to the `/` path -->
<a href="/">App</a>
```

```html
<!-- Navigated to the /users path (the activeClassName
     prop is manually set to red) -->
<a href="/users" class="red">Users</a>

<!-- NOT navigated to the `/users` path -->
<a href="/users">Users</a>
```

Import `NavLink` into your `index.js` file and take a moment to update all your
`Link` elements to `NavLink` elements. Set an `activeClassName` prop to an
`active` class. Add the following `.active` class to your `index.css` file:

```css
.active {
  font-weight: bold;
}

.red {
  color: red;
  font-size: 30px;
}

.blue {
  color: blue;
  font-size: 30px;
}

.green {
  color: green;
  font-size: 30px;
}
```

Test your styled links! Notice how the `App` and `App with click handler` links
are always bolded. This is because all of your links include the `/` path,
meaning that the link to `/` will be active when browsing to `/users` and
`/users/1` because of how `users` and `users/1` are both prefaced by a `/`.

The `activeStyle` prop is a style object that will be applied inline to the
`NavLink` when its `to` prop matches the current URL. Add the following
`activeStyle` to your `App` link and comment out the `.active` class in your CSS
file.

```jsx
<NavLink to="/" activeStyle={{ fontWeight: "bold" }}>App</NavLink>
```

The following html is rendered when at the `/` path:

```html
<a href="/" style="font-weight:bold;" class="active">App</a>
```

Notice how your `App with click handler` is not bolded anymore. This is because
the default `active` class being applied does not have any CSS stylings set to
the class. Uncomment your `.active` class in your CSS file to bring back bolding
to this NavLink.

The `exact` prop is a boolean that defaults to `false`. If set to `true`, then
the `activeStyle` and `activeClassName` props will only be applied when the
current URL exactly matches the `to` prop. Update your `App` and `App with click
handler` links with an `exact` prop set. Just like in your routes, you can use
the `exact` flag instead of `exact={true}`.

```jsx
<NavLink to="/" exact={true} activeStyle={{ fontWeight: "bold" }}>App</NavLink>
<NavLink to="/" exact onClick={handleClick}>App with click handler</NavLink>
```

Now your `App` and `App with click handler` links will only be bolded when you
have navigated precisely to the `/` path.

## Switching between routes

You came across styling issues when the `/users` and `/users/1` paths matched
the `/` path. Routing can have this issue as well. This is why you need to
control the switching between routes.

React Router's `<Switch>` component allows you to only render one `<Route>` even
if several match the current URL. You can nest as many `Route`s as you wish
between the opening and closing `Switch` tags, but only the first one that
matches the current URL will be rendered.

This is particularly useful if you want a default component that will only
render if none of our other routes match. View the example below. Without the
Switch, `DefaultComponent` would always render. Since there isn't set a path in
the `DefaultComponent` route, it will simply use the default path of `/`. Now
the `DefaultComponent` will only render when neither of the preceding routes
match.

```jsx
<Switch>
  <Route path="some/url" component={SomeComponent} />
  <Route path="some/other/url" component={OtherComponent} />
  <Route component={DefaultComponent} />
</Switch>
```

Import `Switch` from `react-router-dom` and add `<Switch>` tags around your
routes to take care of ordering and switching between your routes! Begin by
adding the following route to the bottom of your routes to render that a `404:
Page not found` message:

```jsx
<Route render={() => <h1>404: Page not found</h1>} />
```

This is what your `Root` component should look like at this point:

```js
const Root = () => {
  const users = [
    { name: 'andrew' },
    { name: 'raymond' }
  ];

  const handleClick = () => {
    console.log('Thanks for clicking!')
  };

  return (
    <BrowserRouter>
      <h1>Hi, I'm Root!</h1>

      <div>
        <NavLink to="/" exact={true} activeStyle={{ fontWeight: "bold" }}>App</NavLink>
        <NavLink activeClassName="red" to="/users">Users</NavLink>
        <NavLink activeClassName="blue" to="/hello">Hello</NavLink>
        <NavLink activeClassName="green" to="/users/1">Andrew's Profile</NavLink>
        <NavLink to="/" exact onClick={handleClick}>App with click handler</NavLink>

        <Switch>
          <Route path="/users/:userId" component={(props) => <Profile users={users} {...props} />} />
          <Route exact path="/users" render={() => <Users users={users} />} />
          <Route path="/hello" render={() => <h1>Hello!</h1>} />
          <Route exact path="/" component={App} />
          <Route render={() => <h1>404: Page not found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
```

Now you have control over the precedence of rendered components! Try navigating
to `http://localhost:3000/asdf` or any other route you have not defined. The
`<h1>404: Page not found</h1>` JSX of the last `<Route>` will be rendered
whenever the browser attempts to visit an undefined route.

## Redirecting users

But what if you want to redirect users to a login page when they aren't logged
in? The `<Redirect>` component from React Router helps you redirect users!

The component takes only one prop: `to`. When it renders, it replaces the
current URL with the value of its `to` prop. Typically you conditionally render
`<Redirect>` to redirect the user away from some page you don't want them to
visit. The example below checks whether there is a defined `currentUser` prop.
If so, the `<Route>` will render the `Home` component. Otherwise, it will
redirect the user to the `/login` path.

```jsx
<Route
  exact path="/"
  render={() => (this.props.currentUser ? <Home /> : <Redirect to="/login" />)}
/>
```

Note: you will learn how to use a more flexible auth pattern - don't directly
imitate this example.

## History

You know how to redirect users with a `<Redirect>` component, but what if you
need to redirect users programmatically? You've learned about the React Router's
`match` prop, but now let's go over another one of the [route props]: `history`!

```js
// Pushing a new URL (and adding to the end of history stack):
const handleClick = () => this.props.history.push('/some/url');

// Replacing the current URL (won't be tracked in history stack):
const redirect = () => this.props.history.replace('/some/other/url');
```

This prop lets you update the URL programmatically. For example, suppose you
want to push a new URL when the user clicks a button. It has two useful methods:

- `push` - This adds a new URL to the end of the history stack. That means that
  clicking the back button will take the browser to the previous URL. Note that
  pushing the same URL multiple times in a row will have no effect; the URL will
  still only show up on the stack once. In development mode, pushing the same
  URL twice in a row will generate a console warning. This warning is disabled
  in production mode.
- `replace` - This replaces the current URL on the history stack, so the back
  button won't take you to it. For example:

## What you learned

In this article, you learned how to:

* Create navigation links for your route paths; and
* Redirect users through using the `<Redirect>` component; and
* Update a browser's URL programmatically by using React Router's `history`
  prop.

[route props]: https://reacttraining.com/react-router/web/api/Route/route-props
