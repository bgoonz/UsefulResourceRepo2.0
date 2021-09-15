# More State Moving
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

The application is cleaner, but now has that bug of infinite redirecting. You
will first fix that.

## Fixing the loop

In the `App` component, it would change state in response to the `LoginPanel`
calling the `updateToken` method. The `LoginPanel` no longer does that because
it dispatches its information to a thunk that makes the AJAX call and, in turns,
dispatches an action that updates the Redux store. Then, `LoginPanel` uses the
value from the store to no that something good has happened. You need to have
`App` do the same.

Since `updateToken` is no longer used, remove the method and all of its uses
from the `App` component.

When you have that done, you may notice that the route that shows the
`LoginPanel` looks like this.

```js
<Route path="/login"
  render={props => <LoginPanel {...props} />} />
```

That is rendering `LoginPanel` and passing its props to it. That's just like
using the "component" property of the `Route` component, so change it to use
that instead of the more expensive "render" property.

```js
<Route path="/login" component={LoginPanel} />
```

You're still in a render loop, so that hasn't fixed it. Time to connect `App` to
the Redux store.

1. Like you did in `LoginPanel`, import the `connect` function from the
   "react-redux" module.
2. Then, just like you did in `LoginPanel`, declare `mapStateToProps` and
   `mapDispatchToProps` functions after the component.
  * In the `mapStateToProps` function, map the token to a property named "token"
    identically to the way it is done in `LoginPanel`.
  * You have no actions, right now, so leave `mapDispatchToProps` just returning
    an empty object.
3. Finally, connect `App` to the Redux store using those functions.

That puts the value of the token into the props. In the actual `App` component,
now find everywhere that uses `this.state.token` and replace it with
`this.props.token`.

Try logging in, again. Still doesn't work. That's because `App` relies on
another setting in its state named "needLogin" which is just a Boolean value
that is basically the opposite of whether the token has a value. If there is a
token, there is no need to login. If there is no token, there is a need to
login. You can figure that out in the `mapStateToProps` function! Create another
property, one named "needLogin", in the object returned from the function. If
there _is_ a value in `state.authentication.token`, then set it to `false`. If
there is _no_ value (or an empty string) in `state.authentication.token`, then
set "needLogin" to `true`. Once you have that, find every use of
`this.state.needLogin` and replace it with `this.props.needLogin`.

You have now fixed the problem with the infinite redirects! And, once you log
into the application, you can check that the `App` component _is_ rendering the
`PokemonBrowser` component. However, it is not showing anything. That's because
the `App` component calls its `loadPokemon` method in the `componentDidMount`
method. There's no token at that time in its state because the token now comes
from Redux.

What would be great is if, after logging in, the `login` action loaded the
Pokemon for you, put them in the store, and `PokemonBrowser` could just use
them directly.

Oh, that's what you'll do next.

## Getting the list of Pokemon

Now, you need some actions, thunks, and reducers for Pokemon, not
authentication. Create a new file **src/store/pokemon.js**. In there, create the
following items.

* An action type named `LOAD` with a value of 'pokedex/pokemon/LOAD'
* An action creator named `load` that takes in a list of Pokemon and creates
  an action with the type of `LOAD` and the list of Pokemon in it
* A reducer that checks for the "LOAD" action and adds the list of Pokemon to
  the state (and returns just the state if the action is not "LOAD")
* Make sure the reducer has a default value for its `state` parameter

Now, you need to make a thunk that will make the AJAX call. Call your think
"getPokemon". The thunk needs the token from the state to make its API call. The
function that gets the "dispatch" parameter can also get a second parameter, a
function conventionally called "getState". Your thunk could look like this.

```js
export const getPokemon = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  // AJAX call
  // Handle response
};
```

Then, in **configureStore.js**, import the default reducer and add it to the
`combineReducers` argument as the "pokemon" property next to "authentication".

```js
const reducer = combineReducers({
  authentication,
  pokemon,
});
```

Now, you just need to kick off that AJAX call. It seems only reasonable that
the component that actually needs it kicks it off, the `PokemonBrowser`
component. In `PokemonBrowser`, do the following:

* Import the `connect` function from "react-redux"
* Import the `getPokemon` thunk you just created
* Create a `mapStateToProps` function that maps the list of Pokemon from
  `state.pokemon.list` (or whatever you called your property in the reducer)
  to a property named "pokemon"
* Create a `mapDispatchToProps` function that returns an object with a property
  named "getPokemon" that dispatches the `getPokemon` thunk you imported
* Connect your component to the Redux store using `connect`, `mapStateToProps`,
  and `mapDispatchToProps`
* Add a `componentDidMount` method to the `PokemonBrowser` component and call
  `this.props.getPokemon()` from it

Now, when you log into the application, you should see two actions in your
Redux store!

![Pokemon LOAD action in Redux DevTools][1]

More importantly, you should see the list of Pokemon in the `PokemonBrowser`
actually appear in the browser.

## Clean up the App component

Previously, all of the fetching logic for the list of Pokemon was handled by the
`App` component. You can now get rid of the `loadPokemon` method and clean up
any calls to it. Also, anywhere that refers to `this.state.pokemon` or using
`setState` to update the "pokemon" property, you should get rid of all of that.
This makes the `handleCreated` method empty, so get rid of that and all
references to it, too, in the `App` component.

Because the `App` component doesn't make any AJAX calls, anymore, it doesn't
need the token from the state. Remove the "token" property in `mapStateToProps`
and everywhere `token` is used in the `App` component. Include the call to
local storage, too, in the deleting of things. You can remove the import of
`baseUrl`, too, because there are no AJAX calls in the file.

Now, because `cProps` in the `render` method is empty, delete it and its uses
in the `PrivateRoute` components below it. Now that the code is not using
`cProps`, you can delete the parameter and its use from the `PrivateRoute`
component on line 8 (or so) of the **src/App.js** file.

## Storing the token in local storage

Actions that use outside resources like AJAX calls and local storage _must_ be
created in thunks. Back in the **src/store/authentication.js** module, do two
things:

* Create a constant named `TOKEN_KEY` and set it equal to some non-empty string
* In the `login` thunk, between getting the token from the response and
  dispatching the `setToken` action, write the token to local storage using the
  constant `TOKEN_KEY`

## Reading the token out of local storage

You need a new thunk to do this. Create a thunk named `loadToken` that takes no
parameters, and returns a function that accepts a "dispatch" parameter. Then,
implement it to read the value from local storage using the `TOKEN_KEY`
constant. If a value comes back, have it dispatch the `setToken` action.

```js
export const loadToken = () => async dispatch => {
  // Read the token from local
};
```

In the `App` component, import the `loadToken` thunk. Use it in the
`mapDispatchToProps` by mapping the dispatch of the `loadToken` thunk to a
property of the same name.

```js
const mapDispatchToProps = dispatch => {
  return {
    loadToken: () => dispatch(loadToken()),
  };
};
```

Invoke that `loadToken` method in the `componentDidMount` method of the
`App` component.

```js
async componentDidMount() {
  this.setState({ loaded: true });
  this.props.loadToken();
}
```

The moment you do that, the page should refresh and you should see the Pokemon
browser rather than the login form.

You're halfway home!

[1]: images/redux-load-pokemon-action-devtools.pngimages/redux-load-pokemon-action-devtools.png} -->
________________________________________________________________________________

The application is cleaner, but now has that bug of infinite redirecting. You
will first fix that.

## Fixing the loop

In the `App` component, it would change state in response to the `LoginPanel`
calling the `updateToken` method. The `LoginPanel` no longer does that because
it dispatches its information to a thunk that makes the AJAX call and, in turns,
dispatches an action that updates the Redux store. Then, `LoginPanel` uses the
value from the store to no that something good has happened. You need to have
`App` do the same.

Since `updateToken` is no longer used, remove the method and all of its uses
from the `App` component.

When you have that done, you may notice that the route that shows the
`LoginPanel` looks like this.

```js
<Route path="/login"
  render={props => <LoginPanel {...props} />} />
```

That is rendering `LoginPanel` and passing its props to it. That's just like
using the "component" property of the `Route` component, so change it to use
that instead of the more expensive "render" property.

```js
<Route path="/login" component={LoginPanel} />
```

You're still in a render loop, so that hasn't fixed it. Time to connect `App` to
the Redux store.

1. Like you did in `LoginPanel`, import the `connect` function from the
   "react-redux" module.
2. Then, just like you did in `LoginPanel`, declare `mapStateToProps` and
   `mapDispatchToProps` functions after the component.
  * In the `mapStateToProps` function, map the token to a property named "token"
    identically to the way it is done in `LoginPanel`.
  * You have no actions, right now, so leave `mapDispatchToProps` just returning
    an empty object.
3. Finally, connect `App` to the Redux store using those functions.

That puts the value of the token into the props. In the actual `App` component,
now find everywhere that uses `this.state.token` and replace it with
`this.props.token`.

Try logging in, again. Still doesn't work. That's because `App` relies on
another setting in its state named "needLogin" which is just a Boolean value
that is basically the opposite of whether the token has a value. If there is a
token, there is no need to login. If there is no token, there is a need to
login. You can figure that out in the `mapStateToProps` function! Create another
property, one named "needLogin", in the object returned from the function. If
there _is_ a value in `state.authentication.token`, then set it to `false`. If
there is _no_ value (or an empty string) in `state.authentication.token`, then
set "needLogin" to `true`. Once you have that, find every use of
`this.state.needLogin` and replace it with `this.props.needLogin`.

You have now fixed the problem with the infinite redirects! And, once you log
into the application, you can check that the `App` component _is_ rendering the
`PokemonBrowser` component. However, it is not showing anything. That's because
the `App` component calls its `loadPokemon` method in the `componentDidMount`
method. There's no token at that time in its state because the token now comes
from Redux.

What would be great is if, after logging in, the `login` action loaded the
Pokemon for you, put them in the store, and `PokemonBrowser` could just use
them directly.

Oh, that's what you'll do next.

## Getting the list of Pokemon

Now, you need some actions, thunks, and reducers for Pokemon, not
authentication. Create a new file **src/store/pokemon.js**. In there, create the
following items.

* An action type named `LOAD` with a value of 'pokedex/pokemon/LOAD'
* An action creator named `load` that takes in a list of Pokemon and creates
  an action with the type of `LOAD` and the list of Pokemon in it
* A reducer that checks for the "LOAD" action and adds the list of Pokemon to
  the state (and returns just the state if the action is not "LOAD")
* Make sure the reducer has a default value for its `state` parameter

Now, you need to make a thunk that will make the AJAX call. Call your think
"getPokemon". The thunk needs the token from the state to make its API call. The
function that gets the "dispatch" parameter can also get a second parameter, a
function conventionally called "getState". Your thunk could look like this.

```js
export const getPokemon = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  // AJAX call
  // Handle response
};
```

Then, in **configureStore.js**, import the default reducer and add it to the
`combineReducers` argument as the "pokemon" property next to "authentication".

```js
const reducer = combineReducers({
  authentication,
  pokemon,
});
```

Now, you just need to kick off that AJAX call. It seems only reasonable that
the component that actually needs it kicks it off, the `PokemonBrowser`
component. In `PokemonBrowser`, do the following:

* Import the `connect` function from "react-redux"
* Import the `getPokemon` thunk you just created
* Create a `mapStateToProps` function that maps the list of Pokemon from
  `state.pokemon.list` (or whatever you called your property in the reducer)
  to a property named "pokemon"
* Create a `mapDispatchToProps` function that returns an object with a property
  named "getPokemon" that dispatches the `getPokemon` thunk you imported
* Connect your component to the Redux store using `connect`, `mapStateToProps`,
  and `mapDispatchToProps`
* Add a `componentDidMount` method to the `PokemonBrowser` component and call
  `this.props.getPokemon()` from it

Now, when you log into the application, you should see two actions in your
Redux store!

![Pokemon LOAD action in Redux DevTools][1]

More importantly, you should see the list of Pokemon in the `PokemonBrowser`
actually appear in the browser.

## Clean up the App component

Previously, all of the fetching logic for the list of Pokemon was handled by the
`App` component. You can now get rid of the `loadPokemon` method and clean up
any calls to it. Also, anywhere that refers to `this.state.pokemon` or using
`setState` to update the "pokemon" property, you should get rid of all of that.
This makes the `handleCreated` method empty, so get rid of that and all
references to it, too, in the `App` component.

Because the `App` component doesn't make any AJAX calls, anymore, it doesn't
need the token from the state. Remove the "token" property in `mapStateToProps`
and everywhere `token` is used in the `App` component. Include the call to
local storage, too, in the deleting of things. You can remove the import of
`baseUrl`, too, because there are no AJAX calls in the file.

Now, because `cProps` in the `render` method is empty, delete it and its uses
in the `PrivateRoute` components below it. Now that the code is not using
`cProps`, you can delete the parameter and its use from the `PrivateRoute`
component on line 8 (or so) of the **src/App.js** file.

## Storing the token in local storage

Actions that use outside resources like AJAX calls and local storage _must_ be
created in thunks. Back in the **src/store/authentication.js** module, do two
things:

* Create a constant named `TOKEN_KEY` and set it equal to some non-empty string
* In the `login` thunk, between getting the token from the response and
  dispatching the `setToken` action, write the token to local storage using the
  constant `TOKEN_KEY`

## Reading the token out of local storage

You need a new thunk to do this. Create a thunk named `loadToken` that takes no
parameters, and returns a function that accepts a "dispatch" parameter. Then,
implement it to read the value from local storage using the `TOKEN_KEY`
constant. If a value comes back, have it dispatch the `setToken` action.

```js
export const loadToken = () => async dispatch => {
  // Read the token from local
};
```

In the `App` component, import the `loadToken` thunk. Use it in the
`mapDispatchToProps` by mapping the dispatch of the `loadToken` thunk to a
property of the same name.

```js
const mapDispatchToProps = dispatch => {
  return {
    loadToken: () => dispatch(loadToken()),
  };
};
```

Invoke that `loadToken` method in the `componentDidMount` method of the
`App` component.

```js
async componentDidMount() {
  this.setState({ loaded: true });
  this.props.loadToken();
}
```

The moment you do that, the page should refresh and you should see the Pokemon
browser rather than the login form.

You're halfway home!

[1]: images/redux-load-pokemon-action-devtools.png
