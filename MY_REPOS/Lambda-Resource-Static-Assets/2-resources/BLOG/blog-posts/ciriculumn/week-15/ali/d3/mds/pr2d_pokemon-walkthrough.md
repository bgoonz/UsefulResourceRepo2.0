# The Rest Of It
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

You have now been given instructions on how to refactor components from managing
global application state to putting it in Redux. There are two more pieces left,
the "select the current Pokemon" functionality and the "create a new Pokemon"
functionality. Refactor the application so those are Redux-supported, as well.

## Select the current Pokemon

The place to start, here, is to determine how the click of the navigation item
on the left gets handled. It's a `NavLink`, so the `BrowserRouter` in the `App`
component handles that by routing to the `PokemonBrowser` with the route
parameters. The `PokemonBrowser` then routes to the `PokemonDetail` with a
`Route` component. In the `PokemonDetail` component, if the value of the
`this.props.match.params.id` changes, then the `loadPokemon` method is called
which, in turn, makes an AJAX call. And, there it is! The AJAX call.

This is like everything else, create a thunk, an action type, yada yada yada.

* Create a thunk (similar to what you did for logging in) to load the current
  Pokemon that
  * accepts an id
  * loads the Pokemon from an AJAX call
  * dispatches a "set current Pokemon" action
* Create a reducer that handles the "set current Pokemon" action by adding it
  to the state
* Connect the `PokemonDetail` to the Redux store by
  * mapping the current Pokemon information in the state to its props, and
  * mapping the "load the current Pokemon" thunk to its props with a `dispatch`
    call (don't forget the id parameter)

## Creating a new Pokemon

This is very similar to the login stuff you did with `LoginPanel`. In the
`PokemonForm`, have

* the `componentDidMount` method call a thunk to load the Pokemon types
* the `handleSubmit` method call a thunk to post the form information to the
  API

In moving the Pokemon type fetching from the state to the props, you may end up
getting an error that there is no method "map" of undefined. If that's the case,
in the reducer in your **src/store/pokemon.js** file, have the default state
include an array for the "types" property.

```js
// CODE SNIPPET
export default function reducer(state = { types: [] }, action) {
```

That's the power of default parameters and initial state!

The action types, action creators, and thunk created to do this should go into
the **src/store/pokemon.js** module. When the AJAX call succeeds to create the
new Pokemon, have it _then_ dispatch the `getPokemon` thunk to get a new list of
Pokemon. Redux and React will add a new Pokemon to the end of the list. That's
why you have to provide the "key" property in lists of things, so that React
will efficiently determine if something in the list needs to get changed, added,
or deleted.

The only "new" part, here, is the coordination between `PokemonForm` and
`PokemonBrowser` to determine if it should show a form. This is up to you to
decide, if showing the create form is part of the global application state (and
should exist in the Redux store), or if it is part of the "local" state between
the two components and be managed by `PokemonForm` invoking a function passed to
it by `PokemonBrowser`. The solution choose the former solution.

## Bonus: Extend the functionality

Think about adding

* A _Cancel_ button on the form that hides it
* Error messages for the forms when something bad happens

## Bonus: Connected React Router

Rather than relying on `Redirect` routes in your application, you can use
actions to manage the URL of your application. Install [Connected React
Router][1] and remove all `Redirect` components from the application, replacing
them with dispatched `push` actions. Check out the [How to navigation with
Redux action][2] article in the Connected React Router documentation.


[1]: https://github.com/supasate/connected-react-router
[2]: https://github.com/supasate/connected-react-router/blob/master/FAQ.md#how-to-navigate-with-redux-action
