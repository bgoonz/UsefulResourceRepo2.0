---
title: Style Guide
subtitle: >-
  The style guide provides you with a blueprint of default post and page styles.
  The style guide is also a great reference for suggested typographic treatment
  and styles for your content.
img_path: /images/space.gif
seo:
  title: Theme Style Guide
  description: A reference for suggested typographic treatment and styles for your content
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Theme Style Guide
      keyName: property
    - name: 'og:description'
      value: >-
        A reference for suggested typographic treatment and styles for your
        content
      keyName: property
    - name: 'og:image'
      value: images/style-guide.jpg
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: Theme Style Guide
    - name: 'twitter:description'
      value: >-
        A reference for suggested typographic treatment and styles for your
        content
    - name: 'twitter:image'
      value: images/style-guide.jpg
      relativeUrl: true
layout: page
---

React.js cheatsheet
===================

> React.Component - render() - componentDidMount() - props/state - dangerouslySetInnerHTML - React is a JavaScript library for building user interfaces. This guide targets React v15 to v16.

[React](https://reactjs.org/) is a JavaScript library for building user interfaces. This guide targets React v15 to v16.

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#react-cheat-sheet)React Cheat Sheet
======================================================================================================

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#render)render
--------------------------------------------------------------------------------

```
render() {
  return <div />;
}

```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#constructor)constructor
------------------------------------------------------------------------------------------

```source-js
    constructor(props) {
      super(props);
      this.state = {
        list: props.initialList
      };
    }

    // where props aren't used in constructor

    constructor() {
      super();
      this.state = {
        list: []
      };
    }
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#componentwillmount)componentWillMount
--------------------------------------------------------------------------------------------------------

```source-js
    componentWillMount() {
      // invoked once.
      // fires before initial 'render'
    }
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#componentdidmount)componentDidMount
------------------------------------------------------------------------------------------------------

```source-js
    componentDidMount() {
      // good for AJAX: fetch, ajax, or subscriptions.

      // invoked once (client-side only).
      // fires before initial 'render'
    }
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#componentwillreceiveprops)componentWillReceiveProps
----------------------------------------------------------------------------------------------------------------------

```source-js
    componentWillReceiveProps(nextProps) {
      // invoked every time component recieves new props.
      // does not before initial 'render'
    }
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#shouldcomponentupdate)shouldComponentUpdate
--------------------------------------------------------------------------------------------------------------

```source-js
    shouldComponentUpdate(nextProps, nextState) {
      // invoked before every update (new props or state).
      // does not fire before initial 'render'.
    }
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#componentwillupdate)componentWillUpdate
----------------------------------------------------------------------------------------------------------

```source-js
    componentWillUpdate(nextProps, nextState) {
      // invoked immediately before update (new props or state).
      // does not fire before initial 'render'.

      // (see componentWillReceiveProps if you need to call setState)
    }
```

✖ this.setState

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#componentdidupdate)componentDidUpdate
--------------------------------------------------------------------------------------------------------

```source-js
    componentDidUpdate(prevProps, prevState) {
      // invoked immediately after DOM updates
      // does not fire after initial 'render'
    }
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#componentwillunmount)componentWillUnmount
------------------------------------------------------------------------------------------------------------

```source-js
    componentWillUnmount() {
      // invoked immediately before a component is unmounted.
    }
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#setstate-function)setState (function)
--------------------------------------------------------------------------------------------------------

```source-js
    // good for state transitions

    this.setState((prevState, props) => {
      return {count: prevState.count + props.step};
    });
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#setstate-object)setState (object)
----------------------------------------------------------------------------------------------------

```source-js
    // good for static values

    this.setState({mykey: 'my new value'});

    ```

setState (optional callback)
----------------------------
```js
    // fires after setState
    // prefer componentDidUpdate

    this.setState(
      (prevState, props) => ({ count: prevState.count + props.step }),
      () => console.log(this.state.count)
    );
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#forceupdate)forceUpdate
------------------------------------------------------------------------------------------

```source-js
    // forces a re-render; AVOID if possible

    this.forceUpdate();
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#displayname)displayName
------------------------------------------------------------------------------------------

```source-js
    displayName: "MyComponent"

    ```

defaultProps
------------
```js
    class Greeting extends React.Component {
          render() {
            return <h1>Hi {this.props.name}</h1>
          }
        }

        CustomButton.defaultProps = {
          name: 'guest'
        };
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#childrenmap)Children.map
-------------------------------------------------------------------------------------------

```source-js
    React.Children.map(this.props.children, (child, i) => {
        return child;
    })
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#childrenforeach)Children.forEach
---------------------------------------------------------------------------------------------------

```source-js
    React.Children.forEach(this.props.children, (child, i) => {
      console.log(child + ' at index: ' + i);
    })
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#childrencount)Children.count
-----------------------------------------------------------------------------------------------

```source-js
    React.Children.count(this.props.children);
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#childrenonly)Children.only
---------------------------------------------------------------------------------------------

```source-js
    React.Children.only(this.props.children);
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#childrentoarray)Children.toArray
---------------------------------------------------------------------------------------------------

```source-js
    React.Children.toArray(this.props.children)
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#context-example)Context (example)
----------------------------------------------------------------------------------------------------

```source-js
    // requires 'prop-types' library

    import { string } from "prop-types";

    class Cowboy extends React.Component {
      childContextTypes: {
        salutation: string
      }

      getChildContext() {
        return { salutation: "Howdy" };
      }

      render() {
        return React.Children.only(this.props.children);
      }
    }

    const Greeting = (props, context) =>
      <div>{context.salutation} {props.name}.</div>

    Greeting.contextTypes = {
      salutation: PropTypes.string
    }

    // <Greeting name="Michael" />
    // => Michael.

    // <Cowboy><Greeting name="Michael" /></Cowboy>
    // => Howdy Michael.

```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#contexttypes)contextTypes
--------------------------------------------------------------------------------------------

```source-js
    // add to the context-aware component
    // requires 'prop-types' library

    contextTypes: {
      color: PropTypes.string
    },
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#childcontexttypes)childContextTypes
------------------------------------------------------------------------------------------------------

```source-js
    // add to the context provider
    // requires 'prop-types' library

    childContextTypes: {
      color: PropTypes.string
    },
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#getchildcontext)getChildContext
--------------------------------------------------------------------------------------------------

```source-js
    // add to the context provider

    getChildContext() {
      return {color: "purple"};
    }
```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#components)[#](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#components)Components
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#components-1)Components

```source-js
    import React from 'react'
    import ReactDOM from 'react-dom'

    class Hello extends React.Component {
      render () {
        return <div className='message-box'>
          Hello {this.props.name}
        </div>
      }
    }

    const el = document.body
    ReactDOM.render(<Hello name='John' />, el)

```

Use the [React.js jsfiddle](https://jsfiddle.net/reactjs/69z2wepo/) to start hacking. (or the unofficial [jsbin](http://jsbin.com/yafixat/edit?js,output))

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#import-multiple-exports)Import multiple exports

```source-js
    import React, {Component} from 'react'
    import ReactDOM from 'react-dom'

    class Hello extends Component {
      ...
    }

```

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#properties)Properties

```source-js
    <Video fullscreen={true} autoplay={false} />

    render () {
      this.props.fullscreen
      const { fullscreen, autoplay } = this.props
      ---
    }

```

Use `this.props` to access properties passed to the component.

See: [Properties](https://reactjs.org/docs/tutorial.html#using-props)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#states)States

```source-js
    constructor(props) {
      super(props)
      this.state = { username: undefined }
    }

    this.setState({ username: 'rstacruz' })

    render () {
      this.state.username
      const { username } = this.state
      ---
    }

```

Use states (`this.state`) to manage dynamic data.

With [Babel](https://babeljs.io/) you can use [proposal-class-fields](https://github.com/tc39/proposal-class-fields) and get rid of constructor

```source-js
    class Hello extends Component {
      state = { username: undefined };
      ...
    }
```

See: [States](https://reactjs.org/docs/tutorial.html#reactive-state)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#nesting)Nesting

```source-js
    class Info extends Component {
      render () {
        const { avatar, username } = this.props

        return <div>
          <UserAvatar src={avatar} />
          <UserProfile username={username} />
        </div>
      }
    }
```

As of React v16.2.0, fragments can be used to return multiple children without adding extra wrapping nodes to the DOM.

```source-js
    import React, {
      Component,
      Fragment
    } from 'react'

    class Info extends Component {
      render () {
        const { avatar, username } = this.props

        return (
          <Fragment>
            <UserAvatar src={avatar} />
            <UserProfile username={username} />
          </Fragment>
        )
      }
    }

```

Nest components to separate concerns.

See: [Composing Components](https://reactjs.org/docs/components-and-props.html#composing-components)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#children)Children

```source-js
    <AlertBox>
      <h1>You have pending notifications</h1>
    </AlertBox>

    class AlertBox extends Component {
      render () {
        return <div className='alert-box'>
          {this.props.children}
        </div>
      }
    }

```

Children are passed as the `children` property.

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#defaults)[#](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#defaults)Defaults
-----------------------------------------------------------------------------------------------------------------------------------------------------------------

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#setting-default-props)Setting default props

```source-js
    Hello.defaultProps = {
      color: 'blue'
    }

```

See: [defaultProps](https://reactjs.org/docs/react-component.html#defaultprops)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#setting-default-state)Setting default state

```source-js
    class Hello extends Component {
      constructor (props) {
        super(props)
        this.state = { visible: true }
      }
    }

```

Set the default state in the `constructor()`.

And without constructor using [Babel](https://babeljs.io/) with [proposal-class-fields](https://github.com/tc39/proposal-class-fields).

```source-js
    class Hello extends Component {
      state = { visible: true }
    }
```

See: [Setting the default state](https://reactjs.org/docs/react-without-es6.html#setting-the-initial-state)

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#other-components)[#](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#other-components)Other components
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#functional-components)Functional components

```source-js
    function MyComponent ({ name }) {
      return <div className='message-box'>
        Hello {name}
      </div>
    }

```

Functional components have no state. Also, their `props` are passed as the first parameter to a function.

See: [Function and Class Components](https://reactjs.org/docs/components-and-props.html#functional-and-class-components)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#pure-components)Pure components

```source-js
    import React, {PureComponent} from 'react'

    class MessageBox extends PureComponent {
      ---
    }

```

Performance-optimized version of `React.Component`. Doesn't rerender if props/state hasn't changed.

See: [Pure components](https://reactjs.org/docs/react-api.html#react.purecomponent)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#component-api)Component API

```source-js
    this.forceUpdate()

    this.setState({ ... })
    this.setState(state => { ... })

    this.state
    this.props

```

These methods and properties are available for `Component` instances.

See: [Component API](https://facebook.github.io/react/docs/component-api.html)

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#lifecycle)[#](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#lifecycle)Lifecycle
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#mounting)Mounting

| Method | Description |
| --- | --- |
| `constructor` *(props)* | Before rendering [#](https://reactjs.org/docs/react-component.html#constructor) |
| `componentWillMount()` | *Don't use this* [#](https://reactjs.org/docs/react-component.html#componentwillmount) |
| `render()` | Render [#](https://reactjs.org/docs/react-component.html#render) |
| `componentDidMount()` | After rendering (DOM available) [#](https://reactjs.org/docs/react-component.html#componentdidmount) |
| `componentWillUnmount()` | Before DOM removal [#](https://reactjs.org/docs/react-component.html#componentwillunmount) |
| `componentDidCatch()` | Catch errors (16+) [#](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html) |

Set initial the state on `constructor()`. Add DOM event handlers, timers (etc) on `componentDidMount()`, then remove them on `componentWillUnmount()`.

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#updating)Updating

| Method | Description |
| --- | --- |
| `componentDidUpdate` *(prevProps, prevState, snapshot)* | Use `setState()` here, but remember to compare props |
| `shouldComponentUpdate` *(newProps, newState)* | Skips `render()` if returns false |
| `render()` | Render |
| `componentDidUpdate` *(prevProps, prevState)* | Operate on the DOM here |

Called when parents change properties and `.setState()`. These are not called for initial renders.

See: [Component specs](https://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops)

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#hooks-new)[#](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#hooks-new)Hooks (New)
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#state-hook)State Hook

```source-js
    import React, { useState } from 'react';

    function Example() {

      const [count, setCount] = useState(0);

      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      );
    }

```

Hooks are a new addition in React 16.8.

See: [Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#declaring-multiple-state-variables)Declaring multiple state variables

```source-js
    function ExampleWithManyStates() {

      const [age, setAge] = useState(42);
      const [fruit, setFruit] = useState('banana');
      const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

    }

```

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#effect-hook)Effect hook

```source-js
    import React, { useState, useEffect } from 'react';

    function Example() {
      const [count, setCount] = useState(0);

      useEffect(() => {

        document.title = `You clicked ${count} times`;
      }, [count]);

      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      );
    }

```

If you're familiar with React class lifecycle methods, you can think of `useEffect` Hook as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

By default, React runs the effects after every render --- including the first render.

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#building-your-own-hooks)Building your own hooks

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#define-friendstatus)Define FriendStatus

```source-js
    import React, { useState, useEffect } from 'react';

    function FriendStatus(props) {
      const [isOnline, setIsOnline] = useState(null);

      useEffect(() => {
        function handleStatusChange(status) {
          setIsOnline(status.isOnline);
        }

        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
      }, [props.friend.id]);

      if (isOnline === null) {
        return 'Loading...';
      }
      return isOnline ? 'Online' : 'Offline';
    }

```

Effects may also optionally specify how to "clean up" after them by returning a function.

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#use-friendstatus)Use FriendStatus

```source-js
    function FriendStatus(props) {
      const isOnline = useFriendStatus(props.friend.id);

      if (isOnline === null) {
        return 'Loading...';
      }
      return isOnline ? 'Online' : 'Offline';
    }

```

See: [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#hooks-api-reference)Hooks API Reference

Also see: [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#basic-hooks)Basic Hooks

| Hook | Description |
| --- | --- |
| `useState`*(initialState)* |   |
| `useEffect`*(() => { ... })* |   |
| `useContext`*(MyContext)* | value returned from `React.createContext` |

Full details: [Basic Hooks](https://reactjs.org/docs/hooks-reference.html#basic-hooks)

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#additional-hooks)Additional Hooks

| Hook | Description |
| --- | --- |
| `useReducer`*(reducer, initialArg, init)* |   |
| `useCallback`*(() => { ... })* |   |
| `useMemo`*(() => { ... })* |   |
| `useRef`*(initialValue)* |   |
| `useImperativeHandle`*(ref, () => { ... })* |   |
| `useLayoutEffect` | identical to `useEffect`, but it fires synchronously after all DOM mutations |
| `useDebugValue`*(value)* | display a label for custom hooks in React DevTools |

Full details: [Additional Hooks](https://reactjs.org/docs/hooks-reference.html#additional-hooks)

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#dom-nodes)[#](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#dom-nodes)DOM nodes
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#references)References

```source-js
    class MyComponent extends Component {
      render () {
        return <div>
          <input ref={el => this.input = el} />
        </div>
      }

      componentDidMount () {
        this.input.focus()
      }
    }

```

Allows access to DOM nodes.

See: [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#dom-events)DOM Events

```source-js
    class MyComponent extends Component {
      render () {
        <input type="text"
            value={this.state.value}
            onChange={event => this.onChange(event)} />
      }

      onChange (event) {
        this.setState({ value: event.target.value })
      }
    }

```

Pass functions to attributes like `onChange`.

See: [Events](https://reactjs.org/docs/events.html)

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#other-features)[#](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#other-features)Other features
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#transferring-props)Transferring props

```source-js
    <VideoPlayer src="video.mp4" />

    class VideoPlayer extends Component {
      render () {
        return <VideoEmbed {...this.props} />
      }
    }

```

Propagates `src="..."` down to the sub-component.

See [Transferring props](https://facebook.github.io/react/docs/transferring-props.html)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#top-level-api)Top-level API

```source-js
    React.createClass({ ... })
    React.isValidElement(c)

    ReactDOM.render(<Component />, domnode, [callback])
    ReactDOM.unmountComponentAtNode(domnode)

    ReactDOMServer.renderToString(<Component />)
    ReactDOMServer.renderToStaticMarkup(<Component />)

```

There are more, but these are most common.

See: [React top-level API](https://reactjs.org/docs/react-api.html)

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#jsx-patterns)[#](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#jsx-patterns)JSX patterns
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#style-shorthand)Style shorthand

```source-js
    const style = { height: 10 }
    return <div style={style}></div>

    return <div style={{ margin: 0, padding: 0 }}></div>

```

See: [Inline styles](https://reactjs.org/tips/inline-styles.html)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#inner-html)Inner HTML

```source-js
    function markdownify() { return "<p>...</p>"; }
    <div dangerouslySetInnerHTML={{__html: markdownify()}} />

```

See: [Dangerously set innerHTML](https://reactjs.org/tips/dangerously-set-inner-html.html)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#lists)Lists

```source-js
    class TodoList extends Component {
      render () {
        const { items } = this.props

        return <ul>
          {items.map(item =>
            <TodoItem item={item} key={item.key} />)}
        </ul>
      }
    }

```

Always supply a `key` property.

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#conditionals)Conditionals

```source-js
    <Fragment>
      {showMyComponent
        ? <MyComponent />
        : <OtherComponent />}
    </Fragment>

```

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#short-circuit-evaluation)Short-circuit evaluation

```source-js
    <Fragment>
      {showPopup && <Popup />}
      ...
    </Fragment>

```

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#new-features)[#](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#new-features)New features
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#returning-multiple-elements)Returning multiple elements

You can return multiple elements as arrays or fragments.

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#arrays)Arrays

```source-js
    render () {

      return [
        <li key="A">First item</li>,
        <li key="B">Second item</li>
      ]
    }

```

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#fragments)Fragments

```source-js
    render () {

      return (
        <Fragment>
          <li>First item</li>
          <li>Second item</li>
        </Fragment>
      )
    }

```

See: [Fragments and strings](https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-render-return-types-fragments-and-strings)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#returning-strings)Returning strings

```source-js
    render() {
      return 'Look ma, no spans!';
    }

```

You can return just a string.

See: [Fragments and strings](https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-render-return-types-fragments-and-strings)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#errors)Errors

```source-js
    class MyComponent extends Component {
      ---
      componentDidCatch (error, info) {
        this.setState({ error })
      }
    }

```

Catch errors via `componentDidCatch`. (React 16+)

See: [Error handling in React 16](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#portals)Portals

```source-js
    render () {
      return React.createPortal(
        this.props.children,
        document.getElementById('menu')
      )
    }

```

This renders `this.props.children` into any location in the DOM.

See: [Portals](https://reactjs.org/docs/portals.html)

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#hydration)Hydration

```source-js
    const el = document.getElementById('app')
    ReactDOM.hydrate(<App />, el)

```

Use `ReactDOM.hydrate` instead of using `ReactDOM.render` if you're rendering over the output of [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html).

See: [Hydrate](https://reactjs.org/docs/react-dom.html#hydrate)

[](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#property-validation)[#](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#property-validation)Property validation
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#proptypes)PropTypes

```source-js
    import PropTypes from 'prop-types'

```

See: [Typechecking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

| Key | Description |
| --- | --- |
| `any` | Anything |

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#basic)Basic

| Key | Description |
| --- | --- |
| `string` |   |
| `number` |   |
| `func` | Function |
| `bool` | True or false |

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#enum)Enum

| Key | Description |
| --- | --- |
| `oneOf`*(any)* | Enum types |
| `oneOfType`*(type array)* | Union |

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#array)Array

| Key | Description |
| --- | --- |
| `array` |   |
| `arrayOf`*(...)* |   |

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#object)Object

| Key | Description |
| --- | --- |
| `object` |   |
| `objectOf`*(...)* | Object with values of a certain type |
| `instanceOf`*(...)* | Instance of a class |
| `shape`*(...)* |   |

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#elements)Elements

| Key | Description |
| --- | --- |
| `element` | React element |
| `node` | DOM node |

#### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#required)Required

| Key | Description |
| --- | --- |
| `(---).isRequired` | Required |

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#basic-types)Basic types

```source-js
    MyComponent.propTypes = {
      email:      PropTypes.string,
      seats:      PropTypes.number,
      callback:   PropTypes.func,
      isClosed:   PropTypes.bool,
      any:        PropTypes.any
    }

```

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#required-types)Required types

```source-js
    MyCo.propTypes = {
      name:  PropTypes.string.isRequired
    }

```

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#elements-1)Elements

```source-js
    MyCo.propTypes = {

      element: PropTypes.element,

      node: PropTypes.node
    }

```

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#enumerables-oneof)Enumerables (oneOf)

```source-js
    MyCo.propTypes = {
      direction: PropTypes.oneOf([
        'left', 'right'
      ])
    }

```

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#arrays-and-objects)Arrays and objects

```source-js
    MyCo.propTypes = {
      list: PropTypes.array,
      ages: PropTypes.arrayOf(PropTypes.number),
      user: PropTypes.object,
      user: PropTypes.objectOf(PropTypes.number),
      message: PropTypes.instanceOf(Message)
    }

    MyCo.propTypes = {
      user: PropTypes.shape({
        name: PropTypes.string,
        age:  PropTypes.number
      })
    }

```

Use `.array[Of]`, `.object[Of]`, `.instanceOf`, `.shape`.

### [](https://gist.github.com/bgoonz/894d714a116f2ed23f2474882c71abbf#custom-validation)Custom validation

```source-js
    MyCo.propTypes = {
      customProp: (props, key, componentName) => {
        if (!/matchme/.test(props[key])) {
          return new Error('Validation failed!')
        }
      }
    }
```