# Making Decisions About State
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Now, it's time to log out of the application. Do that with the following
steps.

The steps that the application will take are these:

1. Someone clicks the logout button
2. The `LogoutButton` component dispatches a thunk
3. The thunk makes the AJAX call to logout
4. If that AJAX call succeeds, remove the token from local storage and dispatch
   an action to remove the token from the store
5. Redux will invoke a reducer that removes the token from the store
6. The `LogoutButton` will redirect the application back to "/login"

In **src/store/authentication.js**:

* Create a new action type named `REMOVE_TOKEN`
* Create a new action creator that returns an action with just the "type"
  property set to the value of `REMOVE_TOKEN`
* Create a thunk named `logout` that
  * makes an AJAX call to the API to `DELETE /api/session` (using the token in
    the state)
  * if the response is ok, then
    * removes the item from local storage with the key `TOKEN_KEY`
    * dispatches the `removeToken` action
* Handles the `REMOVE_TOKEN` action type in the reducer by creating a new
  object that does _not_ have the "token" key in it and returning that.

  ```js
  case REMOVE_TOKEN: {
    const newState = { ...state };
    delete newState.token;
    return newState;
  }
  ```

  Remember that handlers in reducers _must_ return new objects if they want to
  modify the state.

In **src/LogoutButton.js**:

(If you make a mistake with this and get into an inconsistent state, just delete
all of the contents of your local storage and refresh your browser.)

* Import `connect` from "react-redux"
* Import the `logout` thunk you just created
* Create the `mapStateToProps` and set a property named `loggedOut` to `true` if
  the token in the state is empty, and `false` if there is a value for the token
  in the state
* Create the `mapDispatchToProps` and set the "logout" property equal to a
  function that dispatches the result of the `logout` thunk you imported
* In the `LogoutButton`'s method named "logout", instead of making an AJAX call,
  have it call `this.props.logout()`, instead
* Get rid of the
* Get rid of initializing the state in the constructor
* Change the use of `this.state.loggedOut` to `this.props.loggedOut`
* Remove any unused imports

If you check the console, now, you'll see that Babel is reporting a "useless"
constructor. Sure enough, it is. `LogoutButton` no longer has any state, so
there's no reason to leave it as a class-based component. Convert it to a
function-based component. If you've followed these instructions, your
`LogoutButton` should end up looking something like this.

```js
const LogoutButton = props =>
  props.loggedOut ?
    <Redirect to="/login" /> :
    <div id="logout-button-holder">
      <button onClick={props.logout}>Logout</button>
    </div>
;
```
