
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
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
