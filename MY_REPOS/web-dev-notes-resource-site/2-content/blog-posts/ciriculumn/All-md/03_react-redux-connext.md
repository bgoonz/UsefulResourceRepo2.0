
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# React-Redux: `connect()`

The React-Redux library allows you to access the store `context` set by the
`<Provider />` in a powerful and convenient way via the `connect` function.
Using `connect`, you can pass specific slices of the store's state and specific
action-dispatches to a React component as `props`. A component's `props` then
serve as its API to the store, making the component more modular and less
burdened by Redux boilerplate.

When you finish this article, you should be able to use the `connect` function
to give a component access to a Redux store.

## Calling `connect`

The React-Redux `connect` function is a _higher-order function_. It takes two
arguments (plus a couple optional arguments you can read more about in the
[docs][docs]) and returns a function:

```js
const createConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
);
```

The returned function (`createConnectedComponent`) then takes the React
component that needs access to the Redux store and returns a new React
component:

```js
const ConnectedComponent = createConnectedComponent(MyComponent);

export default ConnectedComponent;
```

`ConnectedComponent` will render `MyComponent`, passing along `props` as
determined by the `mapStateToProps` and `mapDispatchToProps` arguments.

You can combine these function calls into a single statement by immediately
calling the function returned by the `connect` method (similarly to how you
immediately call a function expression when defining an [IIFE][mdn-iife]):

```js
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyComponent);

export default ConnectedComponent;
```

Typically, to keep things as concise as possible, the `ConnectedComponent`
variable is omitted:

```js
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

## Defining `mapStateToProps(state, [ownProps])`

This first argument to `connect` is a function, `mapStateToProps`. It tells
`connect` how to map the `state` into your component's `props`.

It must take as an argument the store's `state` (supplied by the `Provider`'s
store `context`) and return an object containing the relevant `props` for your
component.

```jsx
const MyComponent = ({ name }) => (
  <div>{name}</div>
);

const mapStateToProps = (state) => ({
  name: state.name;
});

const ConnectedComponent = connect(mapStateToProps)(MyComponent);
```

In the example above, `ConnectedComponent` will render `MyComponent`, passing
`name` as a prop.

### `ownProps` (optional)

A component with explicit `props` passed down from its parent (e.g.
`<ConnectedComponent lastName={'Wozniak'}/>`) can merge those `props` with
slices of `state` via `ownProps`, a optional second argument to
`mapStateToProps`:

```js
const mapStateToProps = (state, ownProps) => ({
  firstName: state.name,
  initials: `${state.name[0]}. ${ownProps.lastName[0]}.`
});

const ConnectedComponent = connect(mapStateToProps)(MyComponent);
```

You can also access React Router props, such `match` and `history` through
`ownProps`. Imagine you have a `users` slice of state, and you want to pass a
specific user's `name` based on a `:userId` parameter. You can access the
parameter from within the `mapStateToProps` function with
`ownProps.match.params.userId`:

```js
const mapStateToProps = (state, ownProps) => ({
  name: state.users[ownProps.match.params.userId].name,
});

const ConnectedComponent = connect(mapStateToProps)(MyComponent);
```

## Defining `mapDispatchToProps`

`mapDispatchToProps` is the second argument to `connect`. It's a function that
accepts the store's `dispatch` method and returns an object containing functions
that can be called to dispatch actions to the store. These action dispatchers
are then passed as `props` to the component.

```js
const deleteTodo = (id) => ({ type: 'DELETE_TODO', id }); // action creators
const addTodo = (msg) => ({ type: 'ADD_TODO', msg });

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (id) => dispatch(deleteTodo(id)),
  handleAdd: (msg) => dispatch(addTodo(msg))
});

const ConnectedComponent = connect(null, mapDispatchToProps)(MyComponent);
```

Notice that in the example above, the `connect` function is invoked with `null`
as a placeholder for the `mapStateToProps` function. The `connect` function
expects `mapStateToProps` as its first argument and `mapDispatchToProps` as its
second argument.

## Putting it all together

```js
const MyComponent = ({ firstName, initials, handleAdd, handleDelete }) => {
  return <div>...</div>;
};

const mapStateToProps = (state, ownProps) => ({
  firstName: state.name,
  initials: `${state.name[0]}. ${ownProps.lastName[0]}.`
});

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (id) => dispatch(deleteTodo(id)),
  handleAdd: (msg) => dispatch(addTodo(msg))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);
```

`MyComponent` will receive `firstName`, `initials`, `handleDelete`, and
`handleAdd` as `props`.

And remember, unlike the earlier attempt at writing a custom `connect`
higher-order component, the React-Redux library's `connect` function **contains
logic to optimize the rendering of your connected components**.

## Reviewing a completed Fruit Stand example

To review and run a completed Fruit Stand example application that utilizes the
React-Redux library, clone the [redux-fruit-stand-examples] repo.

After cloning the repo, open a terminal and browse to the
`fruit-stand-redux-with-react-official-bindings` folder. Run the command `npm
install` to install the project's dependencies. Then use the command `npm start`
to run the Fruit Stand application.

This Fruit Stand example application is a React application created by the
Create React App tooling. When running the application using `npm start`, the
application should automatically open in your default browser. If it doesn't,
you can manually browse to `http://localhost:3000/` to view the application.

## What you learned

In this article, you learned how to use the React-Redux library's `connect`
function to give a component access to a Redux store.

[docs]: https://react-redux.js.org/using-react-redux/connect-mapstate#ownprops-optional
[mdn-iife]: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples
