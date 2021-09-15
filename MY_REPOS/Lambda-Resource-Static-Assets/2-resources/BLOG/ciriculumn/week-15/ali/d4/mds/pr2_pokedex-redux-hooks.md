
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
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
