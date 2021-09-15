
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# React Router Nested Routes

Now you know how to create front-end routes and add navigation with React
Router. When initializing Express projects, you declare static routes. Static
routes are routes that are declared when an application is initialized. When
using React Router in your application's initialization, you can declare dynamic
routes. React Router introduces dynamic routing, where your routes are created
as your application is rendering. This allows you to create nested routes within
components!

In this article, let's dive into [nested routes]! When you finish the article,
you should:

* Describe what nested routes are; and
* Be able to use React Router to create and navigate nested routes; and
* Know how to use the React Router `match` prop to generate links and routes.

## Why nested routes?

Let's begin with why you might need nested routes. As you remember, you are
using React to create a single-page application. This means that you'll be
organizing your application into different components and sub-components.

For example, imagine creating a simple front-end application with three main
pages: a home welcome page (path of `/`), a users index page (path of `/users`),
and user profile pages (path of `/users/:userId`). Now imagine if every user had
links to separate `posts` and `photos` pages.

You can create those routes and links within the user profile component, instead
of creating the routes and links where the main routes are defined.

## What are nested routes?

Now let's dive into a user profile component to understand what are nested
routes! Imagine you have a route in your application's entry file to each user's
profile like so:

```jsx
<Route path="/users/:userId" component={Profile} />
```

This means that upon navigating to `http://localhost:3000/users/1`, you would
render the following `Profile` component and the `userId` parameter within
`props.match.params` would have the value of `"1"`.

```js
const Profile = (props) => {
  // Custom call to database to fetch a user by a user ID.
  const user = fetchUser(props.match.params.userId);
  const { name, id } = user;

  return (
    <div>
      <h1>Welcome to the profile of {name}!</h1>

      {/* Links to a specific user's posts and photos */}
      <Link to={`/users/${id}/posts`}>{name}'s Posts</Link>
      <Link to={`/users/${id}/photos`}>{name}'s Photos</Link>

      {/* Routes to a specific user's posts and photos */}
      <Route path='/users/:userId/posts' component={UserPosts} />
      <Route path='/users/:userId/photos' component={UserPhotos} />
    </div>
  );
};
```

Since this route is not created until the `Profile` component is rendered, you
are dynamically creating your nested `/users/:userId/posts` and
`/users/:userId/photos` routes. Remember that your `match` prop also has other
helpful properties. You can use `match.url` instead of `/users/${id}` in your
profile links. You can also use `match.path` instead of `/users/:userId` in your
profile routes. Remember that you can destructure `url`, `path`, and `params`
from your `match` prop!

```js

// Destructure `match` prop
const Profile = ({ match: { url, path, params }) => {

  // Custom call to database to fetch a user by a user ID.
  const user = fetchUser(params.userId);
  const { name, id } = user;

  return (
    <div>
      <h1>Welcome to the profile of {name}!</h1>

      {/* Replaced `/users/${id}` URL with `props.match.url` */}
      <Link to={`${url}/posts`}>{name}'s Posts</Link>
      <Link to={`${url}/photos`}>{name}'s Photos</Link>

      {/* Replaced `/users/:userId` path with `props.match.path` */}
      <Route path={`${path}/posts`} component={UserPosts} />
      <Route path={`${path}/photos`} component={UserPhotos} />
    </div>}
  );
};
```

In tomorrow's project, you'll build a rainbow of routes as well as define nested
routes. In the future, you may choose to implement nested routes to keep your
application's routes organized within related components.

## What you learned

In this article, you learned:

* What nested routes are; and
* About creating and navigating nested routes with React Router; and
* How to use the React Router props to generate nested links and routes.

[nested routes]:
  https://reacttraining.com/react-router/core/guides/philosophy/nested-routes
