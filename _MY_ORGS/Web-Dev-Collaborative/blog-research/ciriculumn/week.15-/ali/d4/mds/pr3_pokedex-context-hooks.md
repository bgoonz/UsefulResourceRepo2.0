
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
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
