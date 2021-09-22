
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [useState](#usestate)
- [useEffect](#useeffect)
  - [Skipping effects with the dependency array](#skipping-effects-with-the-dependency-array)
  - [Asynchronous effects](#asynchronous-effects)
  - [Effect cleanup](#effect-cleanup)
- [useContext](#usecontext)
- [What you have learned](#what-you-have-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________
# Intro to React Hooks

React Hooks are a way for function components to have the same functionality as
class components that make use of component lifecycle methods. Hooks are simply
functions that allow components to utilize React features without explicitly
using the lifecycle methods.

Before React Hooks, the only way to use lifecycle methods were through class
components. Hooks allow you to manage a component's state and lifecycle within
function components. They are helpful in extracting stateful logic from a
component to be independently tested and reused - it's much more complicated to
test the functionality of logic in a component's lifecycle methods. After
reading this article, you will:

* Have a general understanding of the features of basic React hooks
* Understand how the basic Hooks connect to features of React class components
  (i.e. lifecycle methods)
* Create function components that use state and other React features
* Use the `useState` hook to manage a component's state
* Use the `useEffect` hook to manage _side effect_ operations (i.e. data
  fetching)
* Use the `useContext` hook to access a context object

## useState

Up to this point, you have set a component's default state within a component's
`constructor` method. The `useState` hook replaces the need to use a constructor
to declare a default state with `this.state`. You can use the `useState` hook to
set and name a default slice of state without a `constructor()` method. You can
set a default state simply by invoking the `useState` hook. The **with hooks**
example below sets the default `inputValue` state to be `'Default input value
here!'` by invoking the `useState` hook with the string `'Default input value
here!'`.

**with hooks**
```js
const FormWithHooks = () => {
  const [inputValue, setInputValue] = useState('Default input value here!');
};
```

**without hooks**
```js
class FormWithoutHooks extends React.Component {  
  constructor() {
    super();
    this.state = {
      inputValue: 'Default input value here!',
    };
  };
}
```

When you use the `useState` hook to set up a slice of state, you also set up a
prospective function to update that slice of state. In this example, you can
update a slice of state by invoking `setInputValue`, instead of invoking the
`this.setState()` method.

**with hooks**
```js
const updateInputVal = e => setInputValue(e.target.value);
```

**without hooks**
```js
updateInputVal = e => this.setState({ inputValue: e.target.value });
```

In general, React Hooks help clean up your code **a lot**! For example, when
using the `useState` hook, you can also simply reference `inputValue` throughout
the component, instead of `this.state.inputValue`. Compare the difference
between the code for the `FormWithHooks` and `FormWithoutHooks` components
below.

**with hooks**
```js
const FormWithHooks = () => {
  const [inputValue, setInputValue] = useState('');
  const updateInputVal = e => setInputValue(e.target.value);

  return (
    <form>
      <input
        type="text"
        value={inputValue}
        onChange={updateInputVal}
        placeholder="Type something!"
      />
    </form>
  );
};
```

**without hooks**
```js
class FormWithoutHooks extends React.Component {  
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
  };

  updateInputVal = e => this.setState({ inputValue: e.target.value });
  
  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.updateInputVal}
          placeholder="Type something!"
        />
      </form>
    );
  }
}
```

When refactoring your projects to implement React Hooks, you can always refactor
component by component, starting out with refactoring the component's state
management.

## useEffect

The `useEffect` hook is used to manage side effect operations. An example of a
side effect operation you are familiar with is data fetching. Similarly to the
`componentDidMount` or `componentDidUpdate` lifecycle methods, the `useEffect`
hook will automatically run.

Take a moment to notice how using the `useEffect` hook simply means invoking the
`useEffect` function. You can invoke the function with one or two arguments,
with the first argument always being a function, and then second argument being
an optional _dependency array_.

When the `useEffect` hook is invoked **without** a second argument, the function
will be invoked after every render:

```js
useEffect(() => {
  // Side effect logic invoked after every render
});
```

When the `useEffect` hook is invoked **with an empty array**, the function is
only invoked once, when a component mounts (think of `componentDidMount`):

```js
useEffect(() => {
  // Side effect logic invoked once, when a component mounts
}, []);
```

When the `useEffect` hook is invoked **with an array of dependencies**, the
function is invoked whenever a dependency changes (think of
`componentDidUpdate`):

```js
useEffect(() => {
  // Side effect logic invoked every time the `dependentVariable` changes
}, [dependentVariable]);
```

### Skipping effects with the dependency array

This second argument of the `useEffect` hook is known as the _dependency array_.
You can optimize the performance for your component by using the dependency
array to skip effects. The dependency array is a collection of dependent
variables. Similarly to how the `componentDidUpdate` lifecycle method listens
for a change in the component, the `useEffect` hook listen for changes to
variables in the dependency array to determine whether or not to run the
_effect_ again.

```js
useEffect(() => {
  // Side effect logic
}, [/* Dependency array */]);
```

### Asynchronous effects

You are familiar with using `async/await` to await a database fetch. If you'd
like to make an asynchronous fetch within a `useEffect` hook, you would declare
an asynchronous function within the hook. Then, you would invoke the
asynchronous functions from within the hook.

```js
useEffect(() => {
  const fetchSomething = async () => {
    // Fetch call
  };

  fetchSomething();
}, [/* Dependency array */]);
```

The function passed in as the `useEffect` hook's first argument **cannot** be an
asynchronous function - this is why you need to define and invoke the
asynchronous function from within the hook's first function argument.

In the example below, the `useEffect` hooks runs an asynchronous fetch of a
puppy, based on a `puppyId` input. The hook's dependency array references
`props.match.params.puppyId`. Since the `useEffect` hook's dependency array
references the `puppyId` parameter, the application will only fetch whenever the
`puppyId` parameter changes. This optimizes the code, because now the effect is
only run upon the change of a specific variable - `puppyId`!

```js
useEffect(() => {
  const fetchPuppy = async (puppyId) => {
    const puppy = await fetch(`https://api.puppies.example/${puppyId}`);
    const puppyJSON = await res.json();
    return puppyJSON;
  };

  fetchPuppy(props.match.params.puppyId);
}, [props.match.params.puppyId]);
```

Using a dependency array also prevents endless loops. Without the dependency
array, a fetch call invoked within a `useEffect` hook would constantly run and
your code would error out.

Alternatively, you can invoke the asynchronous effect with an [IIFE]
(immediately invoked function expression). Take the example syntax below:

```js
useEffect(() => {
  (async function fetchSomething() {
    // Fetch call
  })();
}, [/* Dependency array */]);
```

### Effect cleanup

In a class component, you might use the `componentWillUnmount` lifecycle method
to handle _cleanup_. In order to _cleanup_ an effect, you would need to return a
function from within the `useEffect` hook. Having the `useEffect` hook's
callback return another function results in the cleanup behavior of
`componentWillUnmount`.

```js
useEffect(() => {
  return function cleanup() {
    // Cleanup logic
  }
}, [/* Dependency array */]);
```

In a later lesson, you will learn about how to use WebSockets. When you use a
WebSocket, you create a connection. What if you want to close that connection?
Closing a connection sounds like a _cleanup_ task! It is common to invoke the
WebSocket's `close` method in a _cleanup_ function. The example below makes use
of the _dependency array_ and a _cleanup_ function.

```js
useEffect(() => {
  if (!username) {
    return;
  }

  const ws = new WebSocket('ws://localhost:8080');
  webSocket.current = ws;
  
  return function cleanup() {
    if (webSocket.current !== null) {
      webSocket.current.close();
    }
  };
}, [username]);
```

Similar to the behavior of `componentDidUpdate`, the effect is re-run whenever
the `username` changes. The `useEffect` hook below takes care of setting up a
new WebSocket connection. The hook's _cleanup_ function will be run whenever the
component unmounts. Replacing the `componentWillUnmount` lifecycle method, the
_cleanup_ function will take care of closing the WebSocket connection when the
component unmounts.

## useContext

You can use the `useContext` hook to access a context object to read and
subscribe to context changes. The `useContext` hooks replaces the `static
contextType` property in class components. Whenever you used the `static
contextType` property in a class component, you were able to access a context
object via referencing `this.context`. When you use the `useContext` hook, you
can access a context object via whatever you name the context! In the example
below, the `useContext` hook is invoked and its return value (the `MyContext`
object) is named `context` - this means you can access the `MyContext` object
anywhere within the component via referencing `context`.

**with hooks**
```js
const context = useContext(MyContext);    // Makes `MyContext` available as `context`
const banana = useContext(BananaContext); // Makes `BananaContext` available as `banana`
const puppy = useContext(PuppyContext);   // Makes `PuppyContext` available as `puppy`
```

**without hooks**
```js
static contextType = MyContext; // Makes `MyContext` available as `this.context`
```

When using the `useContext` hook to access a context object, you would still use
a `<Context.Provider>` to set the context's `value`.

## What you have learned

In this article, you have learned about the general features of the basic React
hooks (`useState`, `useEffect`, and `useContext`). You should now understand the
functionality of how the basic Hooks connect to the features of React class
components. You should be able to use the:

* `useState` hook to manage a function component's state
* `useEffect` hook to manage running, skipping, and cleaning up effects
* `useContext` hook to access a context object

[IIFE]: https://en.wikipedia.org/wiki/Immediately_invoked_function_expression
