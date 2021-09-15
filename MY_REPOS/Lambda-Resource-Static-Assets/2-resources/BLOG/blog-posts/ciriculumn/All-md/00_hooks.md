
# Hooks Objectives

Now that you've learned the basic objectives of using React, you should be able
to gain a fundamental understanding of the React, Redux, and React-Router hooks.
In your software engineering career, official documentation will be your friend!
It's important to learn how to navigate through official documentation. At the
end of the readings, you should use your new fundamental understanding of hooks
to go through the official React Hooks documentation. At the end of this topic's
articles and lectures you should be able to create function components that use
state and other React features.

You should be able to use React's:

* `useState` hook to manage a component's state.
* `useState` hook to set a default state, instead of setting the default state
  in a `constructor()` method.
* `useState` hook to update state, instead of the `setState()` method.
* `useEffect` hook to manage _side effect_ operations (i.e. data fetching).
* `useEffect` hook in replacement of commonly used component lifecycle methods
  (`componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`).
* `useEffect` (and the hook's _dependency array_) to optimize an application's
  performance by skipping `useEffect` calls.
* `useContext` hook to access a context object, instead of a `Context.Consumer`
  or the `static contentType` property.

You should be able to use Redux's:

* `useSelector` hook to access the Redux store's state from within a component
  (instead of passing a part of state as a prop with the `mapStateToProps`
  function).
* `useDispatch` hook to dispatch an action from within a component (instead of
  passing an thunk action creator function through the `mapDispatchToProps`
  function). 

You should be able to use React Router's:

* `useParams` hook to match parameters in the current route (instead of
  accessing the `match.params` prop).
* `useHistory` hook to navigation from within code (without `<Link>`,
  `<NavLink>`, or the `history` prop).
* `useLocation` hook to track url changes.
* `useRouteMatch` hook to check if the current url matches a path format.
