**Hello World**
===============

The smallest React example looks like this:
===========================================

```
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);

```

It displays a heading saying "Hello, world!" on the page.

**[Try it on CodePen](https://reactjs.org/redirect-to-codepen/hello-world)**

[](https://codepen.io/bgoonz/pen/wveBJBM)<https://codepen.io/bgoonz/pen/wveBJBM>

Click the link above to open an online editor. Feel free to make some changes, and see how they affect the output. Most pages in this guide will have editable examples like this one.

How to Read This Guide
======================

In this guide, we will examine the building blocks of React apps: elements and components. Once you master them, you can create complex apps from small reusable pieces.

> TipThis guide is designed for people who prefer learning concepts step by step. If you prefer to learn by doing, check out our practical tutorial. You might find this guide and the tutorial complementary to each other.

This is the first chapter in a step-by-step guide about main React concepts. You can find a list of all its chapters in the navigation sidebar. If you're reading this from a mobile device, you can access the navigation by pressing the button in the bottom right corner of your screen.

Every chapter in this guide builds on the knowledge introduced in earlier chapters. **You can learn most of React by reading the "Main Concepts" guide chapters in the order they appear in the sidebar.** For example, ["Introducing JSX"](https://reactjs.org/docs/introducing-jsx.html) is the next chapter after this one.

Knowledge Level Assumptions
===========================

React is a JavaScript library, and so we'll assume you have a basic understanding of the JavaScript language. **If you don't feel very confident, we recommend [going through a JavaScript tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) to check your knowledge level** and enable you to follow along this guide without getting lost. It might take you between 30 minutes and an hour, but as a result you won't have to feel like you're learning both React and JavaScript at the same time.

> NoteThis guide occasionally uses some newer JavaScript syntax in the examples. If you haven't worked with JavaScript in the last few years, these three points should get you most of the way.

**Introducing JSX**
===================

Consider this variable declaration:
===================================

```
const element = <h1>Hello, world!</h1>;

```

This funny tag syntax is neither a string nor HTML.

It is called JSX, and it is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.

JSX produces React "elements". We will explore rendering them to the DOM in the [next section](https://reactjs.org/docs/rendering-elements.html). Below, you can find the basics of JSX necessary to get you started.

Why JSX?
========

React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.

Instead of artificially separating *technologies* by putting markup and logic in separate files, React [separates *concerns*](https://en.wikipedia.org/wiki/Separation_of_concerns) with loosely coupled units called "components" that contain both. We will come back to components in a [further section](https://reactjs.org/docs/components-and-props.html), but if you're not yet comfortable putting markup in JS, [this talk](https://www.youtube.com/watch?v=x7cQ3mrcKaY) might convince you otherwise.

React [doesn't require](https://reactjs.org/docs/react-without-jsx.html) using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages.

With that out of the way, let's get started!

Embedding Expressions in JSX
============================

In the example below, we declare a variable called `name` and then use it inside JSX by wrapping it in curly braces:

```
const name = 'Josh Perez';const element = <h1>Hello, {name}</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);

```

You can put any valid [JavaScript expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) inside the curly braces in JSX. For example, `2 + 2`, `user.firstName`, or `formatName(user)` are all valid JavaScript expressions.

In the example below, we embed the result of calling a JavaScript function, `formatName(user)`, into an `<h1>` element.

```
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>    Hello, {formatName(user)}!  </h1>);

ReactDOM.render(
  element,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://reactjs.org/redirect-to-codepen/introducing-jsx)**

[](https://codepen.io/bgoonz/pen/oNwgZgm)<https://codepen.io/bgoonz/pen/oNwgZgm>

We split JSX over multiple lines for readability. While it isn't required, when doing this, we also recommend wrapping it in parentheses to avoid the pitfalls of [automatic semicolon insertion](https://stackoverflow.com/q/2846283).

JSX is an Expression Too
========================

After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.

This means that you can use JSX inside of `if` statements and `for` loops, assign it to variables, accept it as arguments, and return it from functions:

```
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;  }
  return <h1>Hello, Stranger.</h1>;}

```

Specifying Attributes with JSX
==============================

You may use quotes to specify string literals as attributes:

```
const element = <div tabIndex="0"></div>;

```

You may also use curly braces to embed a JavaScript expression in an attribute:

```
const element = <img src={user.avatarUrl}></img>;

```

Don't put quotes around curly braces when embedding a JavaScript expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.

> Warning:Since JSX is closer to JavaScript than to HTML, React DOM uses camelCase property naming convention instead of HTML attribute names.For example, class becomes className in JSX, and tabindex becomes tabIndex.

Specifying Children with JSX
============================

If a tag is empty, you may close it immediately with `/>`, like XML:

```
const element = <img src={user.avatarUrl} />;

```

JSX tags may contain children:

```
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>);

```

JSX Prevents Injection Attacks
==============================

It is safe to embed user input in JSX:

```
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;

```

By default, React DOM [escapes](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that's not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks.

JSX Represents Objects
======================

Babel compiles JSX down to `React.createElement()` calls.

These two examples are identical:

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>);

```

```
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

```

`React.createElement()` performs a few checks to help you write bug-free code but essentially it creates an object like this:

```
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};

```

These objects are called "React elements". You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

We will explore rendering React elements to the DOM in the [next section](https://reactjs.org/docs/rendering-elements.html).

> Tip:We recommend using the "Babel" language definition for your editor of choice so that both ES6 and JSX code is properly highlighted.

**Rendering Elements**
======================

Elements are the smallest building blocks of React apps.
========================================================

An element describes what you want to see on the screen:

`const element = <h1>Hello, world</h1>;`

Unlike browser DOM elements, React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements.

> Note:One might confuse elements with a more widely known concept of "components". We will introduce components in the next section. Elements are what components are "made of", and we encourage you to read this section before jumping ahead.

Rendering an Element into the DOM
=================================

Let's say there is a `<div>` somewhere in your HTML file:

```
<div id="root"></div>

```

We call this a "root" DOM node because everything inside it will be managed by React DOM.

Applications built with just React usually have a single root DOM node. If you are integrating React into an existing app, you may have as many isolated root DOM nodes as you like.

To render a React element into a root DOM node, pass both to `[ReactDOM.render()](<https://reactjs.org/docs/react-dom.html#render>)`:

```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));

```

**[Try it on CodePen](https://reactjs.org/redirect-to-codepen/rendering-elements/render-an-element)**

[](https://codepen.io/bgoonz/pen/mdwyWeb?editors=0010)<https://codepen.io/bgoonz/pen/mdwyWeb?editors=0010>

It displays "Hello, world" on the page.

Updating the Rendered Element
=============================

React elements are [immutable](https://en.wikipedia.org/wiki/Immutable_object). Once you create an element, you can't change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `[ReactDOM.render()](<https://reactjs.org/docs/react-dom.html#render>)`.

Consider this ticking clock example:

```
function tick() {
  const element = (
    <div>      <h1>Hello, world!</h1>      <h2>It is {new Date().toLocaleTimeString()}.</h2>    </div>);
  ReactDOM.render(element, document.getElementById('root'));}

setInterval(tick, 1000);

```

**[Try it on CodePen](https://reactjs.org/redirect-to-codepen/rendering-elements/update-rendered-element)**

[](https://codepen.io/bgoonz/pen/eYRmvNy?editors=0010)<https://codepen.io/bgoonz/pen/eYRmvNy?editors=0010>

It calls `[ReactDOM.render()](<https://reactjs.org/docs/react-dom.html#render>)` every second from a `[setInterval()](<https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval>)` callback.

> Note:In practice, most React apps only call ReactDOM.render() once. In the next sections we will learn how such code gets encapsulated into stateful components.We recommend that you don't skip topics because they build on each other.

React Only Updates What's Necessary
===================================

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

You can verify by inspecting the [last example](https://reactjs.org/redirect-to-codepen/rendering-elements/update-rendered-element) with the browser tools:

![https://reactjs.org/c158617ed7cc0eac8f58330e49e48224/granular-dom-updates.gif](https://reactjs.org/c158617ed7cc0eac8f58330e49e48224/granular-dom-updates.gif)

Even though we create an element describing the whole UI tree on every tick, only the text node whose contents have changed gets updated by React DOM.

In our experience, thinking about how the UI should look at any given moment, rather than how to change it over time, eliminates a whole class of bugs.

**Components and Props**
========================

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. This page provides an introduction to the idea of components. You can find a [detailed component API reference here](https://reactjs.org/docs/react-component.html).
================================================================================================================================================================================================================================================================================

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

Function and Class Components
=============================

The simplest way to define a component is to write a JavaScript function:

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

```

This function is a valid React component because it accepts a single "props" (which stands for properties) object argument with data and returns a React element. We call such components "function components" because they are literally JavaScript functions.

You can also use an [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) to define a component:

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

```

The above two components are equivalent from React's point of view.

Function and Class components both have some additional features that we will discuss in the [next sections](https://reactjs.org/docs/state-and-lifecycle.html).

Rendering a Component
=====================

Previously, we only encountered React elements that represent DOM tags:

```
const element = <div />;

```

However, elements can also represent user-defined components:

```
const element = <Welcome name="Sara" />;

```

When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object "props".

For example, this code renders "Hello, Sara" on the page:

```
function Welcome(props) {  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;ReactDOM.render(
  element,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://reactjs.org/redirect-to-codepen/components-and-props/rendering-a-component)**

[](https://codepen.io/bgoonz/pen/QWgwpjd?editors=0010)<https://codepen.io/bgoonz/pen/QWgwpjd?editors=0010>

Let's recap what happens in this example:

1.  We call `ReactDOM.render()` with the `<Welcome name="Sara" />` element.
2.  React calls the `Welcome` component with `{name: 'Sara'}` as the props.
3.  Our `Welcome` component returns a `<h1>Hello, Sara</h1>` element as the result.
4.  React DOM efficiently updates the DOM to match `<h1>Hello, Sara</h1>`.

> Note: Always start component names with a capital letter.React treats components starting with lowercase letters as DOM tags. For example, <div /> represents an HTML div tag, but <Welcome /> represents a component and requires Welcome to be in [scope.To](http://scope.To) learn more about the reasoning behind this convention, please read JSX In Depth.

Composing Components
====================

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components.

For example, we can create an `App` component that renders `Welcome` many times:

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>      <Welcome name="Sara" />      <Welcome name="Cahal" />      <Welcome name="Edite" />    </div>);
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://reactjs.org/redirect-to-codepen/components-and-props/composing-components)**

[](https://codepen.io/bgoonz/pen/LYLEWNq?editors=0010)<https://codepen.io/bgoonz/pen/LYLEWNq?editors=0010>

Typically, new React apps have a single `App` component at the very top. However, if you integrate React into an existing app, you might start bottom-up with a small component like `Button` and gradually work your way to the top of the view hierarchy.

Extracting Components
=====================

Don't be afraid to split components into smaller components.

For example, consider this `Comment` component:

```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"src={props.author.avatarUrl}alt={props.author.name}/>
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>);
}

```

**[Try it on CodePen](https://reactjs.org/redirect-to-codepen/components-and-props/extracting-components)**

[](https://codepen.io/bgoonz/pen/PojwpzP?editors=0010)<https://codepen.io/bgoonz/pen/PojwpzP?editors=0010>

It accepts `author` (an object), `text` (a string), and `date` (a date) as props, and describes a comment on a social media website.

This component can be tricky to change because of all the nesting, and it is also hard to reuse individual parts of it. Let's extract a few components from it.

First, we will extract `Avatar`:

```
function Avatar(props) {
  return (
    <img className="Avatar"      src={props.user.avatarUrl}      alt={props.user.name}    />  );
}

```

The `Avatar` doesn't need to know that it is being rendered inside a `Comment`. This is why we have given its prop a more generic name: `user` rather than `author`.

We recommend naming props from the component's own point of view rather than the context in which it is being used.

We can now simplify `Comment` a tiny bit:

```
function Comment(props) {
  return (
    <div className="Comment">      <div className="UserInfo">        <Avatar user={props.author} />        <div className="UserInfo-name">          {props.author.name}
        </div>      </div>      <div className="Comment-text">        {props.text}
      </div>      <div className="Comment-date">        {formatDate(props.date)}
      </div>    </div>);
}

```

Next, we will extract a `UserInfo` component that renders an `Avatar` next to the user's name:

`function UserInfo(props) { return ( <div className="UserInfo"> <Avatar user={props.user} /> <div className="UserInfo-name"> {props.user.name} </div> </div> ); }`

This lets us simplify `Comment` even further:

```
function Comment(props) {
  return (
    <div className="Comment">      <UserInfo user={props.author} />      <div className="Comment-text">        {props.text}
      </div>      <div className="Comment-date">        {formatDate(props.date)}
      </div>    </div>);
}

```

**[Try it on CodePen](https://reactjs.org/redirect-to-codepen/components-and-props/extracting-components-continued)**

[](https://codepen.io/bgoonz/pen/eYRmvzV?editors=0010)<https://codepen.io/bgoonz/pen/eYRmvzV?editors=0010>

Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be extracted to a separate component.

Props are Read-Only
===================

Whether you declare a component [as a function or a class](https://reactjs.org/docs/components-and-props.html#function-and-class-components), it must never modify its own props. Consider this `sum` function:

```
function sum(a, b) {
  return a + b;
}

```

Such functions are called ["pure"](https://en.wikipedia.org/wiki/Pure_function) because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, this function is impure because it changes its own input:

```
function withdraw(account, amount) {
  account.total -= amount;
}

```

React is pretty flexible but it has a single strict rule:

**All React components must act like pure functions with respect to their props.**

Of course, application UIs are dynamic and change over time. In the [next section](https://reactjs.org/docs/state-and-lifecycle.html), we will introduce a new concept of "state". State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.

**State and Lifecycle**
=======================

This page introduces the concept of state and lifecycle in a React component. You can find a [detailed component API reference here](https://reactjs.org/docs/react-component.html).
====================================================================================================================================================================================

Consider the ticking clock example from [one of the previous sections](https://reactjs.org/docs/rendering-elements.html#updating-the-rendered-element). In [Rendering Elements](https://reactjs.org/docs/rendering-elements.html#rendering-an-element-into-the-dom), we have only learned one way to update the UI. We call `ReactDOM.render()` to change the rendered output:

```
function tick() {
  const element = (
    <div>      <h1>Hello, world!</h1>      <h2>It is {new Date().toLocaleTimeString()}.</h2>    </div>);
  ReactDOM.render(    element,    document.getElementById('root')  );}

setInterval(tick, 1000);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)**

In this section, we will learn how to make the `Clock` component truly reusable and encapsulated. It will set up its own timer and update itself every second.

We can start by encapsulating how the clock looks:

```
function Clock(props) {
  return (
    <div>      <h1>Hello, world!</h1>      <h2>It is {props.date.toLocaleTimeString()}.</h2>    </div>  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,    document.getElementById('root')
  );
}

setInterval(tick, 1000);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)**

[](https://codepen.io/bgoonz/pen/powvegw?editors=0010)<https://codepen.io/bgoonz/pen/powvegw?editors=0010>

However, it misses a crucial requirement: the fact that the `Clock` sets up a timer and updates the UI every second should be an implementation detail of the `Clock`.

Ideally we want to write this once and have the `Clock` update itself:

```
ReactDOM.render(
  <Clock />,  document.getElementById('root')
);

```

To implement this, we need to add "state" to the `Clock` component.

State is similar to props, but it is private and fully controlled by the component.

Converting a Function to a Class
================================

You can convert a function component like `Clock` to a class in five steps:

1.  Create an [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), with the same name, that extends `React.Component`.
2.  Add a single empty method to it called `render()`.
3.  Move the body of the function into the `render()` method.
4.  Replace `props` with `this.props` in the `render()` body.
5.  Delete the remaining empty function declaration.

```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>);
  }
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)**

[](https://codepen.io/bgoonz/pen/eYRmvJV?editors=0010)<https://codepen.io/bgoonz/pen/eYRmvJV?editors=0010>

`Clock` is now defined as a class rather than a function.

The `render` method will be called each time an update happens, but as long as we render `<Clock />` into the same DOM node, only a single instance of the `Clock` class will be used. This lets us use additional features such as local state and lifecycle methods.

Adding Local State to a Class
=============================

We will move the `date` from props to state in three steps:

1.  Replace `this.props.date` with `this.state.date` in the `render()` method:

```
class Clock extends React.Component {
  render() {
    return (
      <div>        <h1>Hello, world!</h1>        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>      </div>);
  }
}

```

1.  Add a [class constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) that assigns the initial `this.state`:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};  }

  render() {
    return (
      <div>        <h1>Hello, world!</h1>        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>      </div>);
  }
}

```

Note how we pass `props` to the base constructor:

```
 constructor(props) {
    super(props);    this.state = {date: new Date()};
  }

```

Class components should always call the base constructor with `props`.

1.  Remove the `date` prop from the `<Clock />` element:

```
ReactDOM.render(
  <Clock />,  document.getElementById('root')
);

```

We will later add the timer code back to the component itself.

The result looks like this:

```
class Clock extends React.Component {
  constructor(props) {    super(props);    this.state = {date: new Date()};  }render() {
    return (
      <div>        <h1>Hello, world!</h1>        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>      </div>);
  }
}

ReactDOM.render(
  <Clock />,  document.getElementById('root')
);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)**

[](https://codepen.io/bgoonz/pen/oNwgZbV?editors=0010)<https://codepen.io/bgoonz/pen/oNwgZbV?editors=0010>

Next, we'll make the `Clock` set up its own timer and update itself every second.

Adding Lifecycle Methods to a Class
===================================

In applications with many components, it's very important to free up resources taken by the components when they are destroyed.

We want to [set up a timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) whenever the `Clock` is rendered to the DOM for the first time. This is called "mounting" in React.

We also want to [clear that timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) whenever the DOM produced by the `Clock` is removed. This is called "unmounting" in React.

We can declare special methods on the component class to run some code when a component mounts and unmounts:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {  }  componentWillUnmount() {  }render() {
    return (
      <div>        <h1>Hello, world!</h1>        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>      </div>);
  }
}

```

These methods are called "lifecycle methods".

The `componentDidMount()` method runs after the component output has been rendered to the DOM. This is a good place to set up a timer:

```
  componentDidMount() {
    this.timerID = setInterval(      () => this.tick(),      1000    );  }

```

Note how we save the timer ID right on `this` (`this.timerID`).

While `this.props` is set up by React itself and `this.state` has a special meaning, you are free to add additional fields to the class manually if you need to store something that doesn't participate in the data flow (like a timer ID).

We will tear down the timer in the `componentWillUnmount()` lifecycle method:

```
  componentWillUnmount() {
    clearInterval(this.timerID);  }

```

Finally, we will implement a method called `tick()` that the `Clock` component will run every second.

It will use `this.setState()` to schedule updates to the component local state:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {    this.setState({      date: new Date()    });  }render() {
    return (
      <div>        <h1>Hello, world!</h1>        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>      </div>);
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/amqdNA?editors=0010)**

Now the clock ticks every second.

Let's quickly recap what's going on and the order in which the methods are called:

1.  When `<Clock />` is passed to `ReactDOM.render()`, React calls the constructor of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.
2.  React then calls the `Clock` component's `render()` method. This is how React learns what should be displayed on the screen. React then updates the DOM to match the `Clock`'s render output.
3.  When the `Clock` output is inserted in the DOM, React calls the `componentDidMount()` lifecycle method. Inside it, the `Clock` component asks the browser to set up a timer to call the component's `tick()` method once a second.
4.  Every second the browser calls the `tick()` method. Inside it, the `Clock` component schedules a UI update by calling `setState()` with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls the `render()` method again to learn what should be on the screen. This time, `this.state.date` in the `render()` method will be different, and so the render output will include the updated time. React updates the DOM accordingly.
5.  If the `Clock` component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle method so the timer is stopped.

Using State Correctly
=====================

There are three things you should know about `setState()`.

Do Not Modify State Directly
============================

For example, this will not re-render a component:

```
// Wrong
this.state.comment = 'Hello';

```

Instead, use `setState()`:

```
// Correct
this.setState({comment: 'Hello'});

```

The only place where you can assign `this.state` is the constructor.

State Updates May Be Asynchronous
=================================

React may batch multiple `setState()` calls into a single update for performance.

Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.

For example, this code may fail to update the counter:

```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

```

To fix it, use a second form of `setState()` that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

```
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

```

We used an [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) above, but it also works with regular functions:

```
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});

```

State Updates are Merged
========================

When you call `setState()`, React merges the object you provide into the current state.

For example, your state may contain several independent variables:

```
  constructor(props) {
    super(props);
    this.state = {
      posts: [],      comments: []    };
  }

```

Then you can update them independently with separate `setState()` calls:

```
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments      });
    });
  }

```

The merging is shallow, so `this.setState({comments})` leaves `this.state.posts` intact, but completely replaces `this.state.comments`.

The Data Flows Down
===================

Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn't care whether it is defined as a function or a class.

This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components:

```
<FormattedDate date={this.state.date} />

```

The `FormattedDate` component would receive the `date` in its props and wouldn't know whether it came from the `Clock`'s state, from the `Clock`'s props, or was typed by hand:

```
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)**

[](https://codepen.io/bgoonz/pen/GREgWEp?editors=0010)<https://codepen.io/bgoonz/pen/GREgWEp?editors=0010>

This is commonly called a "top-down" or "unidirectional" data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.

If you imagine a component tree as a waterfall of props, each component's state is like an additional water source that joins it at an arbitrary point but also flows down.

To show that all components are truly isolated, we can create an `App` component that renders three `<Clock>`s:

```
function App() {
  return (
    <div>      <Clock />      <Clock />      <Clock />    </div>);
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)**

[](https://codepen.io/bgoonz/pen/YzQPZQK?editors=0010)<https://codepen.io/bgoonz/pen/YzQPZQK?editors=0010>

Each `Clock` sets up its own timer and updates independently.

In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time. You can use stateless components inside stateful components, and vice versa.

**Handling Events**
===================

Handling events with React elements is very similar to handling events on DOM elements. There are some syntax differences:
==========================================================================================================================

-   React events are named using camelCase, rather than lowercase.
-   With JSX you pass a function as the event handler, rather than a string.

For example, the HTML:

```
<button onclick="activateLasers()">
  Activate Lasers
</button>

```

is slightly different in React:

```
<button onClick={activateLasers}>  Activate Lasers
</button>

```

Another difference is that you cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly. For example, with plain HTML, to prevent the default form behavior of submitting, you can write:

```
<form onsubmit="console.log('You clicked submit.'); return false"><button type="submit">Submit</button></form>

```

In React, this could instead be:

```
function Form() {
  function handleSubmit(e) {
    e.preventDefault();    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>      <button type="submit">Submit</button>    </form>);
}

```

Here, `e` is a synthetic event. React defines these synthetic events according to the [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/), so you don't need to worry about cross-browser compatibility. React events do not work exactly the same as native events. See the `[SyntheticEvent](<https://reactjs.org/docs/events.html>)` reference guide to learn more.

When using React, you generally don't need to call `addEventListener` to add listeners to a DOM element after it is created. Instead, just provide a listener when the element is initially rendered.

When you define a component using an [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), a common pattern is for an event handler to be a method on the class. For example, this `Toggle` component renders a button that lets the user toggle between "ON" and "OFF" states:

```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback    this.handleClick = this.handleClick.bind(this);  }

  handleClick() {    this.setState(prevState => ({      isToggleOn: !prevState.isToggleOn    }));  }render() {
    return (
      <button onClick={this.handleClick}>        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>);
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)**

You have to be careful about the meaning of `this` in JSX callbacks. In JavaScript, class methods are not [bound](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) by default. If you forget to bind `this.handleClick` and pass it to `onClick`, `this` will be `undefined` when the function is actually called.

This is not React-specific behavior; it is a part of [how functions work in JavaScript](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Generally, if you refer to a method without `()` after it, such as `onClick={this.handleClick}`, you should bind that method.

If calling `bind` annoys you, there are two ways you can get around this. If you are using the experimental [public class fields syntax](https://babeljs.io/docs/plugins/transform-class-properties/), you can use class fields to correctly bind callbacks:

```
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.  // Warning: this is *experimental* syntax.  handleClick = () => {    console.log('this is:', this);  }render() {
    return (
      <button onClick={this.handleClick}>        Click me
      </button>);
  }
}

```

This syntax is enabled by default in [Create React App](https://github.com/facebookincubator/create-react-app).

If you aren't using class fields syntax, you can use an [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) in the callback:

```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick    return (      <button onClick={() => this.handleClick()}>        Click me
      </button>);
  }
}

```

The problem with this syntax is that a different callback is created each time the `LoggingButton` renders. In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.

Passing Arguments to Event Handlers
===================================

Inside a loop, it is common to want to pass an extra parameter to an event handler. For example, if `id` is the row ID, either of the following would work:

`<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button><button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>`

The above two lines are equivalent, and use [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and `[Function.prototype.bind](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind>)` respectively.

In both cases, the `e` argument representing the React event will be passed as a second argument after the ID. With an arrow function, we have to pass it explicitly, but with `bind` any further arguments are automatically forwarded.

**Conditional Rendering**
=========================

In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.
====================================================================================================================================================================

Conditional rendering in React works the same way conditions work in JavaScript. Use JavaScript operators like `[if](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else>)` or the [conditional operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to create elements representing the current state, and let React update the UI to match them.

Consider these two components:

```
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

```

We'll create a `Greeting` component that displays either of these components depending on whether a user is logged in:

```
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {    return <UserGreeting />;  }  return <GuestGreeting />;}
ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,  document.getElementById('root'));

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)**

[](https://codepen.io/bgoonz/pen/mdwyWmJ?editors=0011)<https://codepen.io/bgoonz/pen/mdwyWmJ?editors=0011>

This example renders a different greeting depending on the value of `isLoggedIn` prop.

Element Variables
=================

You can use variables to store elements. This can help you conditionally render a part of the component while the rest of the output doesn't change.

Consider these two new components representing Logout and Login buttons:

```
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>);
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>);
}

```

In the example below, we will create a [stateful component](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class) called `LoginControl`.

It will render either `<LoginButton />` or `<LogoutButton />` depending on its current state. It will also render a `<Greeting />` from the previous example:

```
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {      button = <LogoutButton onClick={this.handleLogoutClick} />;    } else {      button = <LoginButton onClick={this.handleLoginClick} />;    }return (
      <div>        <Greeting isLoggedIn={isLoggedIn} />        {button}      </div>);
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)**

While declaring a variable and using an `if` statement is a fine way to conditionally render a component, sometimes you might want to use a shorter syntax. There are a few ways to inline conditions in JSX, explained below.

Inline If with Logical && Operator
==================================

You may [embed expressions in JSX](https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx) by wrapping them in curly braces. This includes the JavaScript logical `&&` operator. It can be handy for conditionally including an element:

```
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>      <h1>Hello!</h1>      {unreadMessages.length > 0 &&        <h2>          You have {unreadMessages.length} unread messages.        </h2>      }    </div>);
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/ozJddz?editors=0010)**

[](https://codepen.io/bgoonz/pen/VwWYppo?editors=0010)<https://codepen.io/bgoonz/pen/VwWYppo?editors=0010>

It works because in JavaScript, `true && expression` always evaluates to `expression`, and `false && expression` always evaluates to `false`.

Therefore, if the condition is `true`, the element right after `&&` will appear in the output. If it is `false`, React will ignore and skip it.

Note that returning a falsy expression will still cause the element after `&&` to be skipped but will return the falsy expression. In the example below, `<div>0</div>` will be returned by the render method.

```
render() {
  const count = 0;  return (
    <div>      { count && <h1>Messages: {count}</h1>}    </div>);
}

```

Inline If-Else with Conditional Operator
========================================

Another method for conditionally rendering elements inline is to use the JavaScript conditional operator `[condition ? true : false](<https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator>)`.

In the example below, we use it to conditionally render a small block of text.

```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.    </div>);
}

```

It can also be used for larger expressions although it is less obvious what's going on:

```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>      {isLoggedIn        ? <LogoutButton onClick={this.handleLogoutClick} />        : <LoginButton onClick={this.handleLoginClick} />      }
    </div>  );
}

```

Just like in JavaScript, it is up to you to choose an appropriate style based on what you and your team consider more readable. Also remember that whenever conditions become too complex, it might be a good time to [extract a component](https://reactjs.org/docs/components-and-props.html#extracting-components).

Preventing Component from Rendering
===================================

In rare cases you might want a component to hide itself even though it was rendered by another component. To do this return `null` instead of its render output.

In the example below, the `<WarningBanner />` is rendered depending on the value of the prop called `warn`. If the value of the prop is `false`, then the component does not render:

```
function WarningBanner(props) {
  if (!props.warn) {    return null;  }return (
    <div className="warning">      Warning!
    </div>);
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>        <WarningBanner warn={this.state.showWarning} />        <button onClick={this.handleToggleClick}>          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>      </div>);
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)**

Returning `null` from a component's `render` method does not affect the firing of the component's lifecycle methods. For instance `componentDidUpdate` will still be called.

**Lists and Keys**
==================

First, let's review how you transform lists in JavaScript.
==========================================================

Given the code below, we use the `[map()](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map>)` function to take an array of `numbers` and double their values. We assign the new array returned by `map()` to the variable `doubled` and log it:

```
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);console.log(doubled);

```

This code logs `[2, 4, 6, 8, 10]` to the console.

In React, transforming arrays into lists of [elements](https://reactjs.org/docs/rendering-elements.html) is nearly identical.

Rendering Multiple Components
=============================

You can build collections of elements and [include them in JSX](https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx) using curly braces `{}`.

Below, we loop through the `numbers` array using the JavaScript `[map()](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map>)` function. We return a `<li>` element for each item. Finally, we assign the resulting array of elements to `listItems`:

```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>  <li>{number}</li>);

```

We include the entire `listItems` array inside a `<ul>` element, and [render it to the DOM](https://reactjs.org/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```
ReactDOM.render(
  <ul>{listItems}</ul>,  document.getElementById('root')
);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)**

[](https://codepen.io/bgoonz/pen/eYRmvvr?editors=0011)<https://codepen.io/bgoonz/pen/eYRmvvr?editors=0011>

This code displays a bullet list of numbers between 1 and 5.

Basic List Component
====================

Usually you would render lists inside a [component](https://reactjs.org/docs/components-and-props.html).

We can refactor the previous example into a component that accepts an array of `numbers` and outputs a list of elements.

```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>    <li>{number}</li>  );  return (
    <ul>{listItems}</ul>  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,  document.getElementById('root')
);

```

When you run this code, you'll be given a warning that a key should be provided for list items. A "key" is a special string attribute you need to include when creating lists of elements. We'll discuss why it's important in the next section.

Let's assign a `key` to our list items inside `numbers.map()` and fix the missing key issue.

```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>      {number}
    </li>);
  return (
    <ul>{listItems}</ul>);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)**

[](https://codepen.io/bgoonz/pen/yLXyMMP?editors=0011)<https://codepen.io/bgoonz/pen/yLXyMMP?editors=0011>

Keys
====

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:

```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>    {number}
  </li>);

```

The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys:

```
const todoItems = todos.map((todo) =>
  <li key={todo.id}>    {todo.text}
  </li>);

```

When you don't have stable IDs for rendered items, you may use the item index as a key as a last resort:

```
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs  <li key={index}>    {todo.text}
  </li>);

```

We don't recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny's article for an [in-depth explanation on the negative impacts of using an index as a key](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318). If you choose not to assign an explicit key to list items then React will default to using indexes as keys.

Here is an [in-depth explanation about why keys are necessary](https://reactjs.org/docs/reconciliation.html#recursing-on-children) if you're interested in learning more.

Extracting Components with Keys
===============================

Keys only make sense in the context of the surrounding array.

For example, if you [extract](https://reactjs.org/docs/components-and-props.html#extracting-components) a `ListItem` component, you should keep the key on the `<ListItem />` elements in the array rather than on the `<li>` element in the `ListItem` itself.

**Example: Incorrect Key Usage**

```
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:    <li key={value.toString()}>      {value}
    </li>);
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:    <ListItem value={number} />  );
  return (
    <ul>      {listItems}
    </ul>);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

```

**Example: Correct Key Usage**

```
function ListItem(props) {
  // Correct! There is no need to specify the key here:  return <li>{props.value}</li>;}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.    <ListItem key={number.toString()} value={number} />  );
  return (
    <ul>      {listItems}
    </ul>);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)**

A good rule of thumb is that elements inside the `map()` call need keys.

Keys Must Only Be Unique Among Siblings
=======================================

Keys used within arrays should be unique among their siblings. However, they don't need to be globally unique. We can use the same keys when we produce two different arrays:

```
function Blog(props) {
  const sidebar = (    <ul>      {props.posts.map((post) =>
        <li key={post.id}>          {post.title}
        </li>)}
    </ul>);
  const content = props.posts.map((post) =>    <div key={post.id}>      <h3>{post.title}</h3>      <p>{post.content}</p>    </div>);
  return (
    <div>      {sidebar}      <hr />      {content}    </div>);
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)**

[](https://codepen.io/bgoonz/pen/mdwyWWy?editors=0010)<https://codepen.io/bgoonz/pen/mdwyWWy?editors=0010>

Keys serve as a hint to React but they don't get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name:

```
const content = posts.map((post) =>
  <Post    key={post.id}    id={post.id}    title={post.title} />);

```

With the example above, the `Post` component can read `props.id`, but not `props.key`.

Embedding map() in JSX
======================

In the examples above we declared a separate `listItems` variable and included it in JSX:

```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>    <ListItem key={number.toString()}              value={number} />  );  return (
    <ul>      {listItems}
    </ul>);
}

```

JSX allows [embedding any expression](https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx) in curly braces so we could inline the `map()` result:

```
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>      {numbers.map((number) =>        <ListItem key={number.toString()}                  value={number} />      )}    </ul>);
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)**

[](https://codepen.io/bgoonz/pen/JjJoWEw?editors=0010)<https://codepen.io/bgoonz/pen/JjJoWEw?editors=0010>

Sometimes this results in clearer code, but this style can also be abused. Like in JavaScript, it is up to you to decide whether it is worth extracting a variable for readability. Keep in mind that if the `map()` body is too nested, it might be a good time to [extract a component](https://reactjs.org/docs/components-and-props.html#extracting-components).

**Forms**
=========

HTML form elements work a bit differently from other DOM elements in React, because form elements naturally keep some internal state. For example, this form in plain HTML accepts a single name:
=================================================================================================================================================================================================

```
<form><label>
    Name:
    <input type="text" name="name" /></label><input type="submit" value="Submit" /></form>

```

This form has the default HTML form behavior of browsing to a new page when the user submits the form. If you want this behavior in React, it just works. But in most cases, it's convenient to have a JavaScript function that handles the submission of the form and has access to the data that the user entered into the form. The standard way to achieve this is with a technique called "controlled components".

Controlled Components
=====================

In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with `[setState()](<https://reactjs.org/docs/react-component.html#setstate>)`.

We can combine the two by making the React state be the "single source of truth". Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a "controlled component".

For example, if we want to make the previous example log the name when it is submitted, we can write the form as a controlled component:

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>        <label>          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>        <input type="submit" value="Submit" />      </form>);
  }
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)**

[](https://codepen.io/bgoonz/pen/rNwayjv?editors=0010)<https://codepen.io/bgoonz/pen/rNwayjv?editors=0010>

Since the `value` attribute is set on our form element, the displayed value will always be `this.state.value`, making the React state the source of truth. Since `handleChange` runs on every keystroke to update the React state, the displayed value will update as the user types.

With a controlled component, the input's value is always driven by the React state. While this means you have to type a bit more code, you can now pass the value to other UI elements too, or reset it from other event handlers.

The textarea Tag
================

In HTML, a `<textarea>` element defines its text by its children:

```
<textarea>
  Hello there, this is some text in a text area
</textarea>

```

In React, a `<textarea>` uses a `value` attribute instead. This way, a form using a `<textarea>` can be written very similarly to a form that uses a single-line input:

```
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      value: 'Please write an essay about your favorite DOM element.'    };this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>        <label>          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />        </label>        <input type="submit" value="Submit" />      </form>);
  }
}

```

Notice that `this.state.value` is initialized in the constructor, so that the text area starts off with some text in it.

The select Tag
==============

In HTML, `<select>` creates a drop-down list. For example, this HTML creates a drop-down list of flavors:

`<select><option value="grapefruit">Grapefruit</option><option value="lime">Lime</option><option selected value="coconut">Coconut</option><option value="mango">Mango</option></select>`

Note that the Coconut option is initially selected, because of the `selected` attribute. React, instead of using this `selected` attribute, uses a `value` attribute on the root `select` tag. This is more convenient in a controlled component because you only need to update it in one place. For example:

```
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>        <label>          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>            <option value="grapefruit">Grapefruit</option>            <option value="lime">Lime</option>            <option value="coconut">Coconut</option>            <option value="mango">Mango</option>          </select>        </label>        <input type="submit" value="Submit" />      </form>);
  }
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)**

Overall, this makes it so that `<input type="text">`, `<textarea>`, and `<select>` all work very similarly - they all accept a `value` attribute that you can use to implement a controlled component.

> NoteYou can pass an array into the value attribute, allowing you to select multiple options in a select tag:<select multiple={true} value={['B', 'C']}>

The file input Tag
==================

In HTML, an `<input type="file">` lets the user choose one or more files from their device storage to be uploaded to a server or manipulated by JavaScript via the [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications).

`<input type="file" />`

Because its value is read-only, it is an **uncontrolled** component in React. It is discussed together with other uncontrolled components [later in the documentation](https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag).

Handling Multiple Inputs
========================

When you need to handle multiple controlled `input` elements, you can add a `name` attribute to each element and let the handler function choose what to do based on the value of `event.target.name`.

For example:

```
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;this.setState({
      [name]: value    });
  }

  render() {
    return (
      <form>        <label>          Is going:
          <input
            name="isGoing"            type="checkbox"checked={this.state.isGoing}onChange={this.handleInputChange} />        </label>        <br />        <label>          Number of guests:
          <input
            name="numberOfGuests"            type="number"value={this.state.numberOfGuests}onChange={this.handleInputChange} />        </label>      </form>);
  }
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/wgedvV?editors=0010)**

Note how we used the ES6 [computed property name](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) syntax to update the state key corresponding to the given input name:

```
this.setState({
  [name]: value});

```

It is equivalent to this ES5 code:

```
var partialState = {};
partialState[name] = value;this.setState(partialState);

```

Also, since `setState()` automatically [merges a partial state into the current state](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-are-merged), we only needed to call it with the changed parts.

Controlled Input Null Value
===========================

Specifying the value prop on a [controlled component](https://reactjs.org/docs/forms.html#controlled-components) prevents the user from changing the input unless you desire so. If you've specified a `value` but the input is still editable, you may have accidentally set `value` to `undefined` or `null`.

The following code demonstrates this. (The input is locked at first but becomes editable after a short delay.)

```
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

Alternatives to Controlled Components
=====================================

It can sometimes be tedious to use controlled components, because you need to write an event handler for every way your data can change and pipe all of the input state through a React component. This can become particularly annoying when you are converting a preexisting codebase to React, or integrating a React application with a non-React library. In these situations, you might want to check out [uncontrolled components](https://reactjs.org/docs/uncontrolled-components.html), an alternative technique for implementing input forms.

Fully-Fledged Solutions
=======================

If you're looking for a complete solution including validation, keeping track of the visited fields, and handling form submission, [Formik](https://jaredpalmer.com/formik) is one of the popular choices. However, it is built on the same principles of controlled components and managing state --- so don't neglect to learn them.

**Lifting State Up**
====================

Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor. Let's see how this works in action.
================================================================================================================================================================================

In this section, we will create a temperature calculator that calculates whether the water would boil at a given temperature.

We will start with a component called `BoilingVerdict`. It accepts the `celsius` temperature as a prop, and prints whether it is enough to boil the water:

```
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;  }
  return <p>The water would not boil.</p>;}

```

Next, we will create a component called `Calculator`. It renders an `<input>` that lets you enter the temperature, and keeps its value in `this.state.temperature`.

Additionally, it renders the `BoilingVerdict` for the current input value.

```
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};  }

  handleChange(e) {
    this.setState({temperature: e.target.value});  }

  render() {
    const temperature = this.state.temperature;    return (
      <fieldset>        <legend>Enter temperature in Celsius:</legend>        <input          value={temperature}          onChange={this.handleChange} />        <BoilingVerdict          celsius={parseFloat(temperature)} />      </fieldset>);
  }
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)**

[](https://codepen.io/bgoonz/pen/zYzxZoL?editors=0010)<https://codepen.io/bgoonz/pen/zYzxZoL?editors=0010>

Adding a Second Input
=====================

Our new requirement is that, in addition to a Celsius input, we provide a Fahrenheit input, and they are kept in sync.

We can start by extracting a `TemperatureInput` component from `Calculator`. We will add a new `scale` prop to it that can either be `"c"` or `"f"`:

```
const scaleNames = {  c: 'Celsius',  f: 'Fahrenheit'};class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;    return (
      <fieldset>        <legend>Enter temperature in {scaleNames[scale]}:</legend>        <input value={temperature}onChange={this.handleChange} />      </fieldset>);
  }
}

```

We can now change the `Calculator` to render two separate temperature inputs:

```
class Calculator extends React.Component {
  render() {
    return (
      <div>        <TemperatureInput scale="c" />        <TemperatureInput scale="f" />      </div>);
  }
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/jGBryx?editors=0010)**

[](https://codepen.io/bgoonz/pen/QWgwpGv?editors=0010)<https://codepen.io/bgoonz/pen/QWgwpGv?editors=0010>

We have two inputs now, but when you enter the temperature in one of them, the other doesn't update. This contradicts our requirement: we want to keep them in sync.

We also can't display the `BoilingVerdict` from `Calculator`. The `Calculator` doesn't know the current temperature because it is hidden inside the `TemperatureInput`.

Writing Conversion Functions
============================

First, we will write two functions to convert from Celsius to Fahrenheit and back:

```
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

```

These two functions convert numbers. We will write another function that takes a string `temperature` and a converter function as arguments and returns a string. We will use it to calculate the value of one input based on the other input.

It returns an empty string on an invalid `temperature`, and it keeps the output rounded to the third decimal place:

```
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

```

For example, `tryConvert('abc', toCelsius)` returns an empty string, and `tryConvert('10.22', toFahrenheit)` returns `'50.396'`.

Lifting State Up
================

Currently, both `TemperatureInput` components independently keep their values in the local state:

```
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};  }

  handleChange(e) {
    this.setState({temperature: e.target.value});  }

  render() {
    const temperature = this.state.temperature;    // ...

```

However, we want these two inputs to be in sync with each other. When we update the Celsius input, the Fahrenheit input should reflect the converted temperature, and vice versa.

In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it. This is called "lifting state up". We will remove the local state from the `TemperatureInput` and move it into the `Calculator` instead.

If the `Calculator` owns the shared state, it becomes the "source of truth" for the current temperature in both inputs. It can instruct them both to have values that are consistent with each other. Since the props of both `TemperatureInput` components are coming from the same parent `Calculator` component, the two inputs will always be in sync.

Let's see how this works step by step.

First, we will replace `this.state.temperature` with `this.props.temperature` in the `TemperatureInput` component. For now, let's pretend `this.props.temperature` already exists, although we will need to pass it from the `Calculator` in the future:

```
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;    // ...

```

We know that [props are read-only](https://reactjs.org/docs/components-and-props.html#props-are-read-only). When the `temperature` was in the local state, the `TemperatureInput` could just call `this.setState()` to change it. However, now that the `temperature` is coming from the parent as a prop, the `TemperatureInput` has no control over it.

In React, this is usually solved by making a component "controlled". Just like the DOM `<input>` accepts both a `value` and an `onChange` prop, so can the custom `TemperatureInput` accept both `temperature` and `onTemperatureChange` props from its parent `Calculator`.

Now, when the `TemperatureInput` wants to update its temperature, it calls `this.props.onTemperatureChange`:

```
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);    // ...

```

> Note:There is no special meaning to either temperature or onTemperatureChange prop names in custom components. We could have called them anything else, like name them value and onChange which is a common convention.

The `onTemperatureChange` prop will be provided together with the `temperature` prop by the parent `Calculator` component. It will handle the change by modifying its own local state, thus re-rendering both inputs with the new values. We will look at the new `Calculator` implementation very soon.

Before diving into the changes in the `Calculator`, let's recap our changes to the `TemperatureInput` component. We have removed the local state from it, and instead of reading `this.state.temperature`, we now read `this.props.temperature`. Instead of calling `this.setState()` when we want to make a change, we now call `this.props.onTemperatureChange()`, which will be provided by the `Calculator`:

```
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);  }

  render() {
    const temperature = this.props.temperature;    const scale = this.props.scale;
    return (
      <fieldset>        <legend>Enter temperature in {scaleNames[scale]}:</legend>        <input value={temperature}onChange={this.handleChange} />      </fieldset>);
  }
}

```

Now let's turn to the `Calculator` component.

We will store the current input's `temperature` and `scale` in its local state. This is the state we "lifted up" from the inputs, and it will serve as the "source of truth" for both of them. It is the minimal representation of all the data we need to know in order to render both inputs.

For example, if we enter 37 into the Celsius input, the state of the `Calculator` component will be:

```
{
  temperature: '37',
  scale: 'c'
}

```

If we later edit the Fahrenheit field to be 212, the state of the `Calculator` will be:

```
{
  temperature: '212',
  scale: 'f'
}

```

We could have stored the value of both inputs but it turns out to be unnecessary. It is enough to store the value of the most recently changed input, and the scale that it represents. We can then infer the value of the other input based on the current `temperature` and `scale` alone.

The inputs stay in sync because their values are computed from the same state:

```
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});  }

  render() {
    const scale = this.state.scale;    const temperature = this.state.temperature;    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;return (
      <div>        <TemperatureInputscale="c"          temperature={celsius}          onTemperatureChange={this.handleCelsiusChange} />        <TemperatureInputscale="f"          temperature={fahrenheit}          onTemperatureChange={this.handleFahrenheitChange} />        <BoilingVerdict          celsius={parseFloat(celsius)} />      </div>);
  }
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)**

Now, no matter which input you edit, `this.state.temperature` and `this.state.scale` in the `Calculator` get updated. One of the inputs gets the value as is, so any user input is preserved, and the other input value is always recalculated based on it.

Let's recap what happens when you edit an input:

-   React calls the function specified as `onChange` on the DOM `<input>`. In our case, this is the `handleChange` method in the `TemperatureInput` component.
-   The `handleChange` method in the `TemperatureInput` component calls `this.props.onTemperatureChange()` with the new desired value. Its props, including `onTemperatureChange`, were provided by its parent component, the `Calculator`.
-   When it previously rendered, the `Calculator` had specified that `onTemperatureChange` of the Celsius `TemperatureInput` is the `Calculator`'s `handleCelsiusChange` method, and `onTemperatureChange` of the Fahrenheit `TemperatureInput` is the `Calculator`'s `handleFahrenheitChange` method. So either of these two `Calculator` methods gets called depending on which input we edited.
-   Inside these methods, the `Calculator` component asks React to re-render itself by calling `this.setState()` with the new input value and the current scale of the input we just edited.
-   React calls the `Calculator` component's `render` method to learn what the UI should look like. The values of both inputs are recomputed based on the current temperature and the active scale. The temperature conversion is performed here.
-   React calls the `render` methods of the individual `TemperatureInput` components with their new props specified by the `Calculator`. It learns what their UI should look like.
-   React calls the `render` method of the `BoilingVerdict` component, passing the temperature in Celsius as its props.
-   React DOM updates the DOM with the boiling verdict and to match the desired input values. The input we just edited receives its current value, and the other input is updated to the temperature after conversion.

Every update goes through the same steps so the inputs stay in sync.

Lessons Learned
===============

There should be a single "source of truth" for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the [top-down data flow](https://reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down).

Lifting state involves writing more "boilerplate" code than two-way binding approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state "lives" in some component and that component alone can change it, the surface area for bugs is greatly reduced. Additionally, you can implement any custom logic to reject or transform user input.

If something can be derived from either props or state, it probably shouldn't be in the state. For example, instead of storing both `celsiusValue` and `fahrenheitValue`, we store just the last edited `temperature` and its `scale`. The value of the other input can always be calculated from them in the `render()` method. This lets us clear or apply rounding to the other field without losing any precision in the user input.

When you see something wrong in the UI, you can use [React Developer Tools](https://github.com/facebook/react/tree/main/packages/react-devtools) to inspect the props and move up the tree until you find the component responsible for updating the state. This lets you trace the bugs to their source:

![https://reactjs.org/ef94afc3447d75cdc245c77efb0d63be/react-devtools-state.gif](https://reactjs.org/ef94afc3447d75cdc245c77efb0d63be/react-devtools-state.gif)

**Composition vs Inheritance**
==============================

React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.
===================================================================================================================================

In this section, we will consider a few problems where developers new to React often reach for inheritance, and show how we can solve them with composition.

Containment
===========

Some components don't know their children ahead of time. This is especially common for components like `Sidebar` or `Dialog` that represent generic "boxes".

We recommend that such components use the special `children` prop to pass children elements directly into their output:

```
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>      {props.children}    </div>);
}

```

This lets other components pass arbitrary children to them by nesting the JSX:

```
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">      <h1 className="Dialog-title">        Welcome      </h1>      <p className="Dialog-message">        Thank you for visiting our spacecraft!      </p>    </FancyBorder>);
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

Anything inside the `<FancyBorder>` JSX tag gets passed into the `FancyBorder` component as a `children` prop. Since `FancyBorder` renders `{props.children}` inside a `<div>`, the passed elements appear in the final output.

While this is less common, sometimes you might need multiple "holes" in a component. In such cases you may come up with your own convention instead of using `children`:

```
function SplitPane(props) {
  return (
    <div className="SplitPane">      <div className="SplitPane-left">        {props.left}      </div>      <div className="SplitPane-right">        {props.right}      </div>    </div>);
}

function App() {
  return (
    <SplitPaneleft={
        <Contacts />      }right={
        <Chat />      } />);
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)**

React elements like `<Contacts />` and `<Chat />` are just objects, so you can pass them as props like any other data. This approach may remind you of "slots" in other libraries but there are no limitations on what you can pass as props in React.

Specialization
==============

Sometimes we think about components as being "special cases" of other components. For example, we might say that a `WelcomeDialog` is a special case of `Dialog`.

In React, this is also achieved by composition, where a more "specific" component renders a more "generic" one and configures it with props:

```
function Dialog(props) {
  return (
    <FancyBorder color="blue">      <h1 className="Dialog-title">        {props.title}      </h1>      <p className="Dialog-message">        {props.message}      </p>    </FancyBorder>);
}

function WelcomeDialog() {
  return (
    <Dialog      title="Welcome"      message="Thank you for visiting our spacecraft!" />  );
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)**

Composition works equally well for components defined as classes:

```
function Dialog(props) {
  return (
    <FancyBorder color="blue">      <h1 className="Dialog-title">        {props.title}
      </h1>      <p className="Dialog-message">        {props.message}
      </p>      {props.children}    </FancyBorder>);
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"message="How should we refer to you?">        <input value={this.state.login}               onChange={this.handleChange} />        <button onClick={this.handleSignUp}>          Sign Me Up!        </button>      </Dialog>);
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}

```

**[Try it on CodePen](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)**

So What About Inheritance?
==========================

At Facebook, we use React in thousands of components, and we haven't found any use cases where we would recommend creating component inheritance hierarchies.

Props and composition give you all the flexibility you need to customize a component's look and behavior in an explicit and safe way. Remember that components may accept arbitrary props, including primitive values, React elements, or functions.

If you want to reuse non-UI functionality between components, we suggest extracting it into a separate JavaScript module. The components may import it and use that function, object, or a class, without extending it.

**Thinking in React**
=====================

React is, in our opinion, the premier way to build big, fast Web apps with JavaScript. It has scaled very well for us at Facebook and Instagram.
================================================================================================================================================

One of the many great parts of React is how it makes you think about apps as you build them. In this document, we'll walk you through the thought process of building a searchable product data table using React.

Start With A Mock
=================

Imagine that we already have a JSON API and a mock from our designer. The mock looks like this:

![https://reactjs.org/static/1071fbcc9eed01fddc115b41e193ec11/d4770/thinking-in-react-mock.png](https://reactjs.org/static/1071fbcc9eed01fddc115b41e193ec11/d4770/thinking-in-react-mock.png)

Our JSON API returns some data that looks like this:

```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

```

Step 1: Break The UI Into A Component Hierarchy
===============================================

The first thing you'll want to do is to draw boxes around every component (and subcomponent) in the mock and give them all names. If you're working with a designer, they may have already done this, so go talk to them! Their Photoshop layer names may end up being the names of your React components!

But how do you know what should be its own component? Use the same techniques for deciding if you should create a new function or object. One such technique is the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle), that is, a component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.

Since you're often displaying a JSON data model to a user, you'll find that if your model was built correctly, your UI (and therefore your component structure) will map nicely. That's because UI and data models tend to adhere to the same *information architecture*. Separate your UI into components, where each component matches one piece of your data model.

![https://reactjs.org/static/eb8bda25806a89ebdc838813bdfa3601/6b2ea/thinking-in-react-components.png](https://reactjs.org/static/eb8bda25806a89ebdc838813bdfa3601/6b2ea/thinking-in-react-components.png)

You'll see here that we have five components in our app. We've italicized the data each component represents.

1.  **`FilterableProductTable` (orange):** contains the entirety of the example
2.  **`SearchBar` (blue):** receives all *user input*
3.  **`ProductTable` (green):** displays and filters the *data collection* based on *user input*
4.  **`ProductCategoryRow` (turquoise):** displays a heading for each *category*
5.  **`ProductRow` (red):** displays a row for each *product*

If you look at `ProductTable`, you'll see that the table header (containing the "Name" and "Price" labels) isn't its own component. This is a matter of preference, and there's an argument to be made either way. For this example, we left it as part of `ProductTable` because it is part of rendering the *data collection* which is `ProductTable`'s responsibility. However, if this header grows to be complex (e.g., if we were to add affordances for sorting), it would certainly make sense to make this its own `ProductTableHeader` component.

Now that we've identified the components in our mock, let's arrange them into a hierarchy. Components that appear within another component in the mock should appear as a child in the hierarchy:

-   `FilterableProductTable`
    -   `SearchBar`
    -   `ProductTable`
        -   `ProductCategoryRow`
        -   `ProductRow`

Step 2: Build A Static Version in React
=======================================

See the Pen [Thinking In React: Step 2](https://codepen.io/gaearon/pen/BwWzwm) on [CodePen](https://codepen.io/).

Now that you have your component hierarchy, it's time to implement your app. The easiest way is to build a version that takes your data model and renders the UI but has no interactivity. It's best to decouple these processes because building a static version requires a lot of typing and no thinking, and adding interactivity requires a lot of thinking and not a lot of typing. We'll see why.

To build a static version of your app that renders your data model, you'll want to build components that reuse other components and pass data using *props*. *props* are a way of passing data from parent to child. If you're familiar with the concept of *state*, **don't use state at all** to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app, you don't need it.

You can build top-down or bottom-up. That is, you can either start with building the components higher up in the hierarchy (i.e. starting with `FilterableProductTable`) or with the ones lower in it (`ProductRow`). In simpler examples, it's usually easier to go top-down, and on larger projects, it's easier to go bottom-up and write tests as you build.

At the end of this step, you'll have a library of reusable components that render your data model. The components will only have `render()` methods since this is a static version of your app. The component at the top of the hierarchy (`FilterableProductTable`) will take your data model as a prop. If you make a change to your underlying data model and call `ReactDOM.render()` again, the UI will be updated. You can see how your UI is updated and where to make changes. React's **one-way data flow** (also called *one-way binding*) keeps everything modular and fast.

Refer to the [React docs](https://reactjs.org/docs/) if you need help executing this step.

A Brief Interlude: Props vs State
=================================

There are two types of "model" data in React: props and state. It's important to understand the distinction between the two; skim [the official React docs](https://reactjs.org/docs/state-and-lifecycle.html) if you aren't sure what the difference is. See also [FAQ: What is the difference between state and props?](https://reactjs.org/docs/faq-state.html#what-is-the-difference-between-state-and-props)

Step 3: Identify The Minimal (but complete) Representation Of UI State
======================================================================

To make your UI interactive, you need to be able to trigger changes to your underlying data model. React achieves this with **state**.

To build your app correctly, you first need to think of the minimal set of mutable state that your app needs. The key here is [DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand. For example, if you're building a TODO list, keep an array of the TODO items around; don't keep a separate state variable for the count. Instead, when you want to render the TODO count, take the length of the TODO items array.

Think of all the pieces of data in our example application. We have:

-   The original list of products
-   The search text the user has entered
-   The value of the checkbox
-   The filtered list of products

Let's go through each one and figure out which one is state. Ask three questions about each piece of data:

1.  Is it passed in from a parent via props? If so, it probably isn't state.
2.  Does it remain unchanged over time? If so, it probably isn't state.
3.  Can you compute it based on any other state or props in your component? If so, it isn't state.

The original list of products is passed in as props, so that's not state. The search text and the checkbox seem to be state since they change over time and can't be computed from anything. And finally, the filtered list of products isn't state because it can be computed by combining the original list of products with the search text and value of the checkbox.

So finally, our state is:

-   The search text the user has entered
-   The value of the checkbox

Step 4: Identify Where Your State Should Live
=============================================

See the Pen [Thinking In React: Step 4](https://codepen.io/gaearon/pen/qPrNQZ) on [CodePen](https://codepen.io/).

OK, so we've identified what the minimal set of app state is. Next, we need to identify which component mutates, or *owns*, this state.

Remember: React is all about one-way data flow down the component hierarchy. It may not be immediately clear which component should own what state. **This is often the most challenging part for newcomers to understand,** so follow these steps to figure it out:

For each piece of state in your application:

-   Identify every component that renders something based on that state.
-   Find a common owner component (a single component above all the components that need the state in the hierarchy).
-   Either the common owner or another component higher up in the hierarchy should own the state.
-   If you can't find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.

Let's run through this strategy for our application:

-   `ProductTable` needs to filter the product list based on state and `SearchBar` needs to display the search text and checked state.
-   The common owner component is `FilterableProductTable`.
-   It conceptually makes sense for the filter text and checked value to live in `FilterableProductTable`

Cool, so we've decided that our state lives in `FilterableProductTable`. First, add an instance property `this.state = {filterText: '', inStockOnly: false}` to `FilterableProductTable`'s `constructor` to reflect the initial state of your application. Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as a prop. Finally, use these props to filter the rows in `ProductTable` and set the values of the form fields in `SearchBar`.

You can start seeing how your application will behave: set `filterText` to `"ball"` and refresh your app. You'll see that the data table is updated correctly.

Step 5: Add Inverse Data Flow
=============================

See the Pen [Thinking In React: Step 5](https://codepen.io/gaearon/pen/LzWZvb) on [CodePen](https://codepen.io/).

So far, we've built an app that renders correctly as a function of props and state flowing down the hierarchy. Now it's time to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

React makes this data flow explicit to help you understand how your program works, but it does require a little more typing than traditional two-way data binding.

If you try to type or check the box in the current version of the example, you'll see that React ignores your input. This is intentional, as we've set the `value` prop of the `input` to always be equal to the `state` passed in from `FilterableProductTable`.

Let's think about what we want to happen. We want to make sure that whenever the user changes the form, we update the state to reflect the user input. Since components should only update their own state, `FilterableProductTable` will pass callbacks to `SearchBar` that will fire whenever the state should be updated. We can use the `onChange` event on the inputs to be notified of it. The callbacks passed by `FilterableProductTable` will call `setState()`, and the app will be updated.

And That's It
=============

Hopefully, this gives you an idea of how to think about building components and applications with React. While it may be a little more typing than you're used to, remember that code is read far more than it's written, and it's less difficult to read this modular, explicit code. As you start to build large libraries of components, you'll appreciate this explicitness and modularity, and with code reuse, your lines of code will start to shrink. :)

[Advanced Content](https://www.notion.so/Advanced-Content-fbe1ec3ca3544951b5763b051b843949)

[React Component](https://www.notion.so/React-Component-3dc17bc49a8e4d7e89efcc1281e747d9)

[000-Create-a-Simple-JSX-Element.md](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e81ab8ff-a7dc-45de-bac9-5e24031499da/000-Create-a-Simple-JSX-Element.md)

[w14-study-guide.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3735677b-c131-4b3d-9b48-113654162edf/w14-study-guide.pdf)

**Accessibility**
=================

Why Accessibility?
==================

Web accessibility (also referred to as **[a11y](https://en.wiktionary.org/wiki/a11y)**) is the design and creation of websites that can be used by everyone. Accessibility support is necessary to allow assistive technology to interpret web pages.

React fully supports building accessible websites, often by using standard HTML techniques.

Standards and Guidelines
========================

WCAG
====

The [Web Content Accessibility Guidelines](https://www.w3.org/WAI/intro/wcag) provides guidelines for creating accessible web sites.

The following WCAG checklists provide an overview:

-   [WCAG checklist from Wuhcag](https://www.wuhcag.com/wcag-checklist/)
-   [WCAG checklist from WebAIM](https://webaim.org/standards/wcag/checklist)
-   [Checklist from The A11Y Project](https://a11yproject.com/checklist.html)

WAI-ARIA
========

The [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria) document contains techniques for building fully accessible JavaScript widgets.

Note that all `aria-*` HTML attributes are fully supported in JSX. Whereas most DOM properties and attributes in React are camelCased, these attributes should be hyphen-cased (also known as kebab-case, lisp-case, etc) as they are in plain HTML:

`<input type="text" aria-label={labelText} aria-required="true" onChange={onchangeHandler}value={inputValue}name="name"/>`

Semantic HTML
=============

Semantic HTML is the foundation of accessibility in a web application. Using the various HTML elements to reinforce the meaning of information in our websites will often give us accessibility for free.

-   [MDN HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

Sometimes we break HTML semantics when we add `<div>` elements to our JSX to make our React code work, especially when working with lists (`<ol>`, `<ul>` and `<dl>`) and the HTML `<table>`. In these cases we should rather use [React Fragments](https://reactjs.org/docs/fragments.html) to group together multiple elements.

For example,

`import React, { Fragment } from 'react';function ListItem({ item }) { return ( <Fragment> <dt>{item.term}</dt> <dd>{item.description}</dd> </Fragment> ); }

function Glossary(props) { return ( <dl> {props.items.map(item => ( <ListItem item={item} key={[item.id](http://item.id)} />))} </dl>); }`

You can map a collection of items to an array of fragments as you would any other type of element as well:

`function Glossary(props) { return ( <dl> {props.items.map(item => ( // Fragments should also have a`key`prop when mapping collections <Fragment key={item.id}> <dt>{item.term}</dt> <dd>{item.description}</dd> </Fragment> ))} </dl>); }`

When you don't need any props on the Fragment tag you can use the [short syntax](https://reactjs.org/docs/fragments.html#short-syntax), if your tooling supports it:

`function ListItem({ item }) { return ( <> <dt>{item.term}</dt> <dd>{item.description}</dd> </> ); }`

For more info, see [the Fragments documentation](https://reactjs.org/docs/fragments.html).

Accessible Forms
================

Labeling
========

Every HTML form control, such as `<input>` and `<textarea>`, needs to be labeled accessibly. We need to provide descriptive labels that are also exposed to screen readers.

The following resources show us how to do this:

-   [The W3C shows us how to label elements](https://www.w3.org/WAI/tutorials/forms/labels/)
-   [WebAIM shows us how to label elements](https://webaim.org/techniques/forms/controls)
-   [The Paciello Group explains accessible names](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Although these standard HTML practices can be directly used in React, note that the `for` attribute is written as `htmlFor` in JSX:

`<label htmlFor="namedInput">Name:</label><input id="namedInput" type="text" name="name"/>`

Notifying the user of errors
============================

Error situations need to be understood by all users. The following link shows us how to expose error texts to screen readers as well:

-   [The W3C demonstrates user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
-   [WebAIM looks at form validation](https://webaim.org/techniques/formvalidation/)

Focus Control
=============

Ensure that your web application can be fully operated with the keyboard only:

-   [WebAIM talks about keyboard accessibility](https://webaim.org/techniques/keyboard/)

Keyboard focus and focus outline
================================

Keyboard focus refers to the current element in the DOM that is selected to accept input from the keyboard. We see it everywhere as a focus outline similar to that shown in the following image:

![https://reactjs.org/static/dec0e6bcc1f882baf76ebc860d4f04e5/4fcfe/keyboard-focus.png](https://reactjs.org/static/dec0e6bcc1f882baf76ebc860d4f04e5/4fcfe/keyboard-focus.png)

Only ever use CSS that removes this outline, for example by setting `outline: 0`, if you are replacing it with another focus outline implementation.

Mechanisms to skip to desired content
=====================================

Provide a mechanism to allow users to skip past navigation sections in your application as this assists and speeds up keyboard navigation.

Skiplinks or Skip Navigation Links are hidden navigation links that only become visible when keyboard users interact with the page. They are very easy to implement with internal page anchors and some styling:

-   [WebAIM - Skip Navigation Links](https://webaim.org/techniques/skipnav/)

Also use landmark elements and roles, such as `<main>` and `<aside>`, to demarcate page regions as assistive technology allow the user to quickly navigate to these sections.

Read more about the use of these elements to enhance accessibility here:

-   [Accessible Landmarks](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

Programmatically managing focus
===============================

Our React applications continuously modify the HTML DOM during runtime, sometimes leading to keyboard focus being lost or set to an unexpected element. In order to repair this, we need to programmatically nudge the keyboard focus in the right direction. For example, by resetting keyboard focus to a button that opened a modal window after that modal window is closed.

MDN Web Docs takes a look at this and describes how we can build [keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

To set focus in React, we can use [Refs to DOM elements](https://reactjs.org/docs/refs-and-the-dom.html).

Using this, we first create a ref to an element in the JSX of a component class:

`class CustomTextInput extends React.Component { constructor(props) { super(props); // Create a ref to store the textInput DOM element this.textInput = React.createRef(); } render() { // Use the`ref`callback to store a reference to the text input DOM // element in an instance field (for example, this.textInput). return ( <input type="text" ref={this.textInput} />); } }`

Then we can focus it elsewhere in our component when needed:

`focus() { // Explicitly focus the text input using the raw DOM API // Note: we're accessing "current" to get the DOM node this.textInput.current.focus(); }`

Sometimes a parent component needs to set focus to an element in a child component. We can do this by [exposing DOM refs to parent components](https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) through a special prop on the child component that forwards the parent's ref to the child's DOM node.

`function CustomTextInput(props) { return ( <div> <input ref={props.inputRef} /> </div>); }

class Parent extends React.Component { constructor(props) { super(props); this.inputElement = React.createRef(); } render() { return ( <CustomTextInput inputRef={this.inputElement} /> ); } }

// Now you can set focus when required. this.inputElement.current.focus();`

When using a HOC to extend components, it is recommended to [forward the ref](https://reactjs.org/docs/forwarding-refs.html) to the wrapped component using the `forwardRef` function of React. If a third party HOC does not implement ref forwarding, the above pattern can still be used as a fallback.

A great focus management example is the [react-aria-modal](https://github.com/davidtheclark/react-aria-modal). This is a relatively rare example of a fully accessible modal window. Not only does it set initial focus on the cancel button (preventing the keyboard user from accidentally activating the success action) and trap keyboard focus inside the modal, it also resets focus back to the element that initially triggered the modal.

> Note:While this is a very important accessibility feature, it is also a technique that should be used judiciously. Use it to repair the keyboard focus flow when it is disturbed, not to try and anticipate how users want to use applications.

Mouse and pointer events
========================

Ensure that all functionality exposed through a mouse or pointer event can also be accessed using the keyboard alone. Depending only on the pointer device will lead to many cases where keyboard users cannot use your application.

To illustrate this, let's look at a prolific example of broken accessibility caused by click events. This is the outside click pattern, where a user can disable an opened popover by clicking outside the element.

![https://reactjs.org/5523b05b22210c5a2fa0bd1f01339cb3/outerclick-with-mouse.gif](https://reactjs.org/5523b05b22210c5a2fa0bd1f01339cb3/outerclick-with-mouse.gif)

This is typically implemented by attaching a `click` event to the `window` object that closes the popover:

`class OuterClickExample extends React.Component { constructor(props) { super(props);

```
this.state = { isOpen: false };
this.toggleContainer = React.createRef();

this.onClickHandler = this.onClickHandler.bind(this);
this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);

```

}

componentDidMount() { window.addEventListener('click', this.onClickOutsideHandler); }componentWillUnmount() { window.removeEventListener('click', this.onClickOutsideHandler); }

onClickHandler() { this.setState(currentState => ({ isOpen: !currentState.isOpen })); }

onClickOutsideHandler(event) { if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) { this.setState({ isOpen: false }); } }render() { return ( <div ref={this.toggleContainer}> <button onClick={this.onClickHandler}>Select an option</button> {this.state.isOpen && ( <ul> <li>Option 1</li> <li>Option 2</li> <li>Option 3</li> </ul>)} </div>); } }`

This may work fine for users with pointer devices, such as a mouse, but operating this with the keyboard alone leads to broken functionality when tabbing to the next element as the `window` object never receives a `click` event. This can lead to obscured functionality which blocks users from using your application.

![https://reactjs.org/eca0ca825c8c5e2aa609cee72ef47e27/outerclick-with-keyboard.gif](https://reactjs.org/eca0ca825c8c5e2aa609cee72ef47e27/outerclick-with-keyboard.gif)

The same functionality can be achieved by using appropriate event handlers instead, such as `onBlur` and `onFocus`:

`class BlurExample extends React.Component { constructor(props) { super(props);

```
this.state = { isOpen: false };
this.timeOutId = null;

this.onClickHandler = this.onClickHandler.bind(this);
this.onBlurHandler = this.onBlurHandler.bind(this);
this.onFocusHandler = this.onFocusHandler.bind(this);

```

}

onClickHandler() { this.setState(currentState => ({ isOpen: !currentState.isOpen })); }

// We close the popover on the next tick by using setTimeout. // This is necessary because we need to first check if // another child of the element has received focus as // the blur event fires prior to the new focus event. onBlurHandler() { this.timeOutId = setTimeout(() => { this.setState({ isOpen: false }); }); } // If a child receives focus, do not close the popover. onFocusHandler() { clearTimeout(this.timeOutId); }render() { // React assists us by bubbling the blur and // focus events to the parent. return ( <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}> <button onClick={this.onClickHandler}aria-haspopup="true"aria-expanded={this.state.isOpen}> Select an option </button> {this.state.isOpen && ( <ul> <li>Option 1</li> <li>Option 2</li> <li>Option 3</li> </ul>)} </div>); } }`

This code exposes the functionality to both pointer device and keyboard users. Also note the added `aria-*` props to support screen-reader users. For simplicity's sake the keyboard events to enable `arrow key` interaction of the popover options have not been implemented.

![https://reactjs.org/28ce2067489843caf05fe7ce22494542/blur-popover-close.gif](https://reactjs.org/28ce2067489843caf05fe7ce22494542/blur-popover-close.gif)

This is one example of many cases where depending on only pointer and mouse events will break functionality for keyboard users. Always testing with the keyboard will immediately highlight the problem areas which can then be fixed by using keyboard aware event handlers.

More Complex Widgets
====================

A more complex user experience should not mean a less accessible one. Whereas accessibility is most easily achieved by coding as close to HTML as possible, even the most complex widget can be coded accessibly.

Here we require knowledge of [ARIA Roles](https://www.w3.org/TR/wai-aria/#roles) as well as [ARIA States and Properties](https://www.w3.org/TR/wai-aria/#states_and_properties). These are toolboxes filled with HTML attributes that are fully supported in JSX and enable us to construct fully accessible, highly functional React components.

Each type of widget has a specific design pattern and is expected to function in a certain way by users and user agents alike:

-   [WAI-ARIA Authoring Practices - Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
-   [Heydon Pickering - ARIA Examples](https://heydonworks.com/article/practical-aria-examples/)
-   [Inclusive Components](https://inclusive-components.design/)

Other Points for Consideration
==============================

Setting the language
====================

Indicate the human language of page texts as screen reader software uses this to select the correct voice settings:

-   [WebAIM - Document Language](https://webaim.org/techniques/screenreader/#language)

Setting the document title
==========================

Set the document `<title>` to correctly describe the current page content as this ensures that the user remains aware of the current page context:

-   [WCAG - Understanding the Document Title Requirement](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

We can set this in React using the [React Document Title Component](https://github.com/gaearon/react-document-title).

Color contrast
==============

Ensure that all readable text on your website has sufficient color contrast to remain maximally readable by users with low vision:

-   [WCAG - Understanding the Color Contrast Requirement](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
-   [Everything About Color Contrast And Why You Should Rethink It](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
-   [A11yProject - What is Color Contrast](https://a11yproject.com/posts/what-is-color-contrast/)

It can be tedious to manually calculate the proper color combinations for all cases in your website so instead, you can [calculate an entire accessible color palette with Colorable](https://jxnblk.com/colorable/).

Both the aXe and WAVE tools mentioned below also include color contrast tests and will report on contrast errors.

If you want to extend your contrast testing abilities you can use these tools:

-   [WebAIM - Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
-   [The Paciello Group - Color Contrast Analyzer](https://www.paciellogroup.com/resources/contrastanalyser/)

Development and Testing Tools
=============================

There are a number of tools we can use to assist in the creation of accessible web applications.

The keyboard
============

By far the easiest and also one of the most important checks is to test if your entire website can be reached and used with the keyboard alone. Do this by:

1.  Disconnecting your mouse.
2.  Using `Tab` and `Shift+Tab` to browse.
3.  Using `Enter` to activate elements.
4.  Where required, using your keyboard arrow keys to interact with some elements, such as menus and dropdowns.

Development assistance
======================

We can check some accessibility features directly in our JSX code. Often intellisense checks are already provided in JSX aware IDE's for the ARIA roles, states and properties. We also have access to the following tool:

### eslint-plugin-jsx-a11y

The [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) plugin for ESLint provides AST linting feedback regarding accessibility issues in your JSX. Many IDE's allow you to integrate these findings directly into code analysis and source code windows.

[Create React App](https://github.com/facebookincubator/create-react-app) has this plugin with a subset of rules activated. If you want to enable even more accessibility rules, you can create an `.eslintrc` file in the root of your project with this content:

```
{
  "extends": ["react-app", "plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"]
}

```

Testing accessibility in the browser
====================================

A number of tools exist that can run accessibility audits on web pages in your browser. Please use them in combination with other accessibility checks mentioned here as they can only test the technical accessibility of your HTML.

### aXe, aXe-core and react-axe

Deque Systems offers [aXe-core](https://github.com/dequelabs/axe-core) for automated and end-to-end accessibility tests of your applications. This module includes integrations for Selenium.

[The Accessibility Engine](https://www.deque.com/products/axe/) or aXe, is an accessibility inspector browser extension built on `aXe-core`.

You can also use the [react-axe](https://github.com/dylanb/react-axe) module to report these accessibility findings directly to the console while developing and debugging.

### WebAIM WAVE

The [Web Accessibility Evaluation Tool](https://wave.webaim.org/extension/) is another accessibility browser extension.

### Accessibility inspectors and the Accessibility Tree

[The Accessibility Tree](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) is a subset of the DOM tree that contains accessible objects for every DOM element that should be exposed to assistive technology, such as screen readers.

In some browsers we can easily view the accessibility information for each element in the accessibility tree:

-   [Using the Accessibility Inspector in Firefox](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
-   [Using the Accessibility Inspector in Chrome](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#pane)
-   [Using the Accessibility Inspector in OS X Safari](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

Screen readers
==============

Testing with a screen reader should form part of your accessibility tests.

Please note that browser / screen reader combinations matter. It is recommended that you test your application in the browser best suited to your screen reader of choice.

Commonly Used Screen Readers
============================

### NVDA in Firefox

[NonVisual Desktop Access](https://www.nvaccess.org/) or NVDA is an open source Windows screen reader that is widely used.

Refer to the following guides on how to best use NVDA:

-   [WebAIM - Using NVDA to Evaluate Web Accessibility](https://webaim.org/articles/nvda/)
-   [Deque - NVDA Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

### VoiceOver in Safari

VoiceOver is an integrated screen reader on Apple devices.

Refer to the following guides on how to activate and use VoiceOver:

-   [WebAIM - Using VoiceOver to Evaluate Web Accessibility](https://webaim.org/articles/voiceover/)
-   [Deque - VoiceOver for OS X Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
-   [Deque - VoiceOver for iOS Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

### JAWS in Internet Explorer

[Job Access With Speech](https://www.freedomscientific.com/Products/software/JAWS/) or JAWS, is a prolifically used screen reader on Windows.

Refer to the following guides on how to best use JAWS:

-   [WebAIM - Using JAWS to Evaluate Web Accessibility](https://webaim.org/articles/jaws/)
-   [Deque - JAWS Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

Other Screen Readers
====================

### ChromeVox in Google Chrome

[ChromeVox](https://www.chromevox.com/) is an integrated screen reader on Chromebooks and is available [as an extension](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) for Google Chrome.

Refer to the following guides on how best to use ChromeVox:

-   [Google Chromebook Help - Use the Built-in Screen Reader](https://support.google.com/chromebook/answer/7031755?hl=en)
-   [ChromeVox Classic Keyboard Shortcuts Reference](https://www.chromevox.com/keyboard_shortcuts.html)

**Code-Splitting**
==================

Bundling
========

Most React apps will have their files "bundled" using tools like [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) or [Browserify](http://browserify.org/). Bundling is the process of following imported files and merging them into a single file: a "bundle". This bundle can then be included on a webpage to load an entire app at once.

### Example

**App:**

```
// app.js
import { add } from './math.js';

console.log(add(16, 26)); // 42

```

```
// math.js
export function add(a, b) {
  return a + b;
}

```

**Bundle:**

```
function add(a, b) {
  return a + b;
}

console.log(add(16, 26)); // 42

```

> Note:Your bundles will end up looking a lot different than this.

If you're using [Create React App](https://create-react-app.dev/), [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org/), or a similar tool, you will have a Webpack setup out of the box to bundle your app.

If you aren't, you'll need to set up bundling yourself. For example, see the [Installation](https://webpack.js.org/guides/installation/) and [Getting Started](https://webpack.js.org/guides/getting-started/) guides on the Webpack docs.

Code Splitting
==============

Bundling is great, but as your app grows, your bundle will grow too. Especially if you are including large third-party libraries. You need to keep an eye on the code you are including in your bundle so that you don't accidentally make it so large that your app takes a long time to load.

To avoid winding up with a large bundle, it's good to get ahead of the problem and start "splitting" your bundle. Code-Splitting is a feature supported by bundlers like [Webpack](https://webpack.js.org/guides/code-splitting/), [Rollup](https://rollupjs.org/guide/en/#code-splitting) and Browserify (via [factor-bundle](https://github.com/browserify/factor-bundle)) which can create multiple bundles that can be dynamically loaded at runtime.

Code-splitting your app can help you "lazy-load" just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven't reduced the overall amount of code in your app, you've avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.

`import()`
==========

The best way to introduce code-splitting into your app is through the dynamic `import()` syntax.

**Before:**

```
import { add } from './math';

console.log(add(16, 26));

```

**After:**

```
import("./math").then(math => {
  console.log(math.add(16, 26));
});

```

When Webpack comes across this syntax, it automatically starts code-splitting your app. If you're using Create React App, this is already configured for you and you can [start using it](https://create-react-app.dev/docs/code-splitting/) immediately. It's also supported out of the box in [Next.js](https://nextjs.org/docs/advanced-features/dynamic-import).

If you're setting up Webpack yourself, you'll probably want to read Webpack's [guide on code splitting](https://webpack.js.org/guides/code-splitting/). Your Webpack config should look vaguely [like this](https://www.notion.so/ca6e803f5c604d37468b0091d9959269).

When using [Babel](https://babeljs.io/), you'll need to make sure that Babel can parse the dynamic import syntax but is not transforming it. For that you will need [@babel/plugin-syntax-dynamic-import](https://classic.yarnpkg.com/en/package/@babel/plugin-syntax-dynamic-import).

`React.lazy`
============

> Note:React.lazy and Suspense are not yet available for server-side rendering. If you want to do code-splitting in a server rendered app, we recommend Loadable Components. It has a nice guide for bundle splitting with server-side rendering.

The `React.lazy` function lets you render a dynamic import as a regular component.

**Before:**

```
import OtherComponent from './OtherComponent';

```

**After:**

```
const OtherComponent = React.lazy(() => import('./OtherComponent'));

```

This will automatically load the bundle containing the `OtherComponent` when this component is first rendered.

`React.lazy` takes a function that must call a dynamic `import()`. This must return a `Promise` which resolves to a module with a `default` export containing a React component.

The lazy component should then be rendered inside a `Suspense` component, which allows us to show some fallback content (such as a loading indicator) while we're waiting for the lazy component to load.

```
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>);
}

```

The `fallback` prop accepts any React elements that you want to render while waiting for the component to load. You can place the `Suspense` component anywhere above the lazy component. You can even wrap multiple lazy components with a single `Suspense` component.

```
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>);
}

```

Error boundaries
================

If the other module fails to load (for example, due to network failure), it will trigger an error. You can handle these errors to show a nice user experience and manage recovery with [Error Boundaries](https://reactjs.org/docs/error-boundaries.html). Once you've created your Error Boundary, you can use it anywhere above your lazy components to display an error state when there's a network error.

```
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>);

```

Route-based code splitting
==========================

Deciding where in your app to introduce code splitting can be a bit tricky. You want to make sure you choose places that will split bundles evenly, but won't disrupt the user experience.

A good place to start is with routes. Most people on the web are used to page transitions taking some amount of time to load. You also tend to be re-rendering the entire page at once so your users are unlikely to be interacting with other elements on the page at the same time.

Here's an example of how to setup route-based code splitting into your app using libraries like [React Router](https://reacttraining.com/react-router/) with `React.lazy`.

```
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>);

```

Named Exports
=============

`React.lazy` currently only supports default exports. If the module you want to import uses named exports, you can create an intermediate module that reexports it as the default. This ensures that tree shaking keeps working and that you don't pull in unused components.

```
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;

```

```
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";

```

```
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));

```

**Context**
===========

Context provides a way to pass data through the component tree without having to pass props down manually at every level.
=========================================================================================================================

In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

-   [When to Use Context](https://reactjs.org/docs/context.html#when-to-use-context)
-   [Before You Use Context](https://reactjs.org/docs/context.html#before-you-use-context)
-   [API](https://reactjs.org/docs/context.html#api)
    -   [React.createContext](https://reactjs.org/docs/context.html#reactcreatecontext)
    -   [Context.Provider](https://reactjs.org/docs/context.html#contextprovider)
    -   [Class.contextType](https://reactjs.org/docs/context.html#classcontexttype)
    -   [Context.Consumer](https://reactjs.org/docs/context.html#contextconsumer)
    -   [Context.displayName](https://reactjs.org/docs/context.html#contextdisplayname)
-   [Examples](https://reactjs.org/docs/context.html#examples)
    -   [Dynamic Context](https://reactjs.org/docs/context.html#dynamic-context)
    -   [Updating Context from a Nested Component](https://reactjs.org/docs/context.html#updating-context-from-a-nested-component)
    -   [Consuming Multiple Contexts](https://reactjs.org/docs/context.html#consuming-multiple-contexts)
-   [Caveats](https://reactjs.org/docs/context.html#caveats)
-   [Legacy API](https://reactjs.org/docs/context.html#legacy-api)

When to Use Context
===================

Context is designed to share data that can be considered "global" for a tree of React components, such as the current authenticated user, theme, or preferred language. For example, in the code below we manually thread through a "theme" prop in order to style the Button component:

```
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // The Toolbar component must take an extra "theme" prop  // and pass it to the ThemedButton. This can become painful  // if every single button in the app needs to know the theme  // because it would have to be passed through all components.  return (
    <div>      <ThemedButton theme={props.theme} />    </div>);
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}

```

Using context, we can avoid passing props through intermediate elements:

```
// Context lets us pass a value deep into the component tree// without explicitly threading it through every component.// Create a context for the current theme (with "light" as the default).const ThemeContext = React.createContext('light');class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.    // Any component can read it, no matter how deep it is.    // In this example, we're passing "dark" as the current value.    return (
      <ThemeContext.Provider value="dark">        <Toolbar />      </ThemeContext.Provider>);
  }
}

// A component in the middle doesn't have to// pass the theme down explicitly anymore.function Toolbar() {
  return (
    <div>      <ThemedButton />    </div>);
}

class ThemedButton extends React.Component {
  // Assign a contextType to read the current theme context.  // React will find the closest theme Provider above and use its value.  // In this example, the current theme is "dark".  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;  }
}

```

Before You Use Context
======================

Context is primarily used when some data needs to be accessible by *many* components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.

**If you only want to avoid passing some props through many levels, [component composition](https://reactjs.org/docs/composition-vs-inheritance.html) is often a simpler solution than context.**

For example, consider a `Page` component that passes a `user` and `avatarSize` prop several levels down so that deeply nested `Link` and `Avatar` components can read it:

```
<Page user={user} avatarSize={avatarSize} />// ... which renders ...
<PageLayout user={user} avatarSize={avatarSize} />// ... which renders ...
<NavigationBar user={user} avatarSize={avatarSize} />// ... which renders ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>

```

It might feel redundant to pass down the `user` and `avatarSize` props through many levels if in the end only the `Avatar` component really needs it. It's also annoying that whenever the `Avatar` component needs more props from the top, you have to add them at all the intermediate levels too.

One way to solve this issue **without context** is to [pass down the `Avatar` component itself](https://reactjs.org/docs/composition-vs-inheritance.html#containment) so that the intermediate components don't need to know about the `user` or `avatarSize` props:

```
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>);
  return <PageLayout userLink={userLink} />;
}

// Now, we have:
<Page user={user} avatarSize={avatarSize} />// ... which renders ...
<PageLayout userLink={...} />// ... which renders ...
<NavigationBar userLink={...} />// ... which renders ...
{props.userLink}

```

With this change, only the top-most Page component needs to know about the `Link` and `Avatar` components' use of `user` and `avatarSize`.

This *inversion of control* can make your code cleaner in many cases by reducing the amount of props you need to pass through your application and giving more control to the root components. Such inversion, however, isn't the right choice in every case; moving more complexity higher in the tree makes those higher-level components more complicated and forces the lower-level components to be more flexible than you may want.

You're not limited to a single child for a component. You may pass multiple children, or even have multiple separate "slots" for children, [as documented here](https://reactjs.org/docs/composition-vs-inheritance.html#containment):

```
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>);
  return (
    <PageLayouttopBar={topBar}content={content}/>);
}

```

This pattern is sufficient for many cases when you need to decouple a child from its immediate parents. You can take it even further with [render props](https://reactjs.org/docs/render-props.html) if the child needs to communicate with the parent before rendering.

However, sometimes the same data needs to be accessible by many components in the tree, and at different nesting levels. Context lets you "broadcast" such data, and changes to it, to all components below. Common examples where using context might be simpler than the alternatives include managing the current locale, theme, or a data cache.

API
===

`React.createContext`
=====================

```
const MyContext = React.createContext(defaultValue);

```

Creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching `Provider` above it in the tree.

The `defaultValue` argument is **only** used when a component does not have a matching Provider above it in the tree. This default value can be helpful for testing components in isolation without wrapping them. Note: passing `undefined` as a Provider value does not cause consuming components to use `defaultValue`.

`Context.Provider`
==================

```
<MyContext.Provider value={/* some value */}>

```

Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.

The Provider component accepts a `value` prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers. Providers can be nested to override values deeper within the tree.

All consumers that are descendants of a Provider will re-render whenever the Provider's `value` prop changes. The propagation from Provider to its descendant consumers (including `[.contextType](<https://reactjs.org/docs/context.html#classcontexttype>)` and `[useContext](<https://reactjs.org/docs/hooks-reference.html#usecontext>)`) is not subject to the `shouldComponentUpdate` method, so the consumer is updated even when an ancestor component skips an update.

Changes are determined by comparing the new and old values using the same algorithm as `[Object.is](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description>)`.

> NoteThe way changes are determined can cause some issues when passing objects as value: see Caveats.

`Class.contextType`
===================

```
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* perform a side-effect at mount using the value of MyContext */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* render something based on the value of MyContext */
  }
}
MyClass.contextType = MyContext;

```

The `contextType` property on a class can be assigned a Context object created by `[React.createContext()](<https://reactjs.org/docs/context.html#reactcreatecontext>)`. Using this property lets you consume the nearest current value of that Context type using `this.context`. You can reference this in any of the lifecycle methods including the render function.

> Note:You can only subscribe to a single context using this API. If you need to read more than one see Consuming Multiple Contexts.If you are using the experimental public class fields syntax, you can use a static class field to initialize your contextType.

```
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* render something based on the value */
  }
}

```

`Context.Consumer`
==================

```
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>

```

A React component that subscribes to context changes. Using this component lets you subscribe to a context within a [function component](https://reactjs.org/docs/components-and-props.html#function-and-class-components).

Requires a [function as a child](https://reactjs.org/docs/render-props.html#using-props-other-than-render). The function receives the current context value and returns a React node. The `value` argument passed to the function will be equal to the `value` prop of the closest Provider for this context above in the tree. If there is no Provider for this context above, the `value` argument will be equal to the `defaultValue` that was passed to `createContext()`.

> NoteFor more information about the 'function as a child' pattern, see render props.

`Context.displayName`
=====================

Context object accepts a `displayName` string property. React DevTools uses this string to determine what to display for the context.

For example, the following component will appear as MyDisplayName in the DevTools:

```
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools

```

Examples
========

Dynamic Context
===============

A more complex example with dynamic values for the theme:

**theme-context.js**

```
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(  themes.dark // default value);

```

**themed-button.js**

```
import {ThemeContext} from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;    return (
      <button
        {...props}style={{backgroundColor: theme.background}}/>);
  }
}
ThemedButton.contextType = ThemeContext;export default ThemedButton;

```

**app.js**

```
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>      Change Theme
    </ThemedButton>);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // The ThemedButton button inside the ThemeProvider    // uses the theme from state while the one outside uses    // the default dark theme    return (
      <Page>        <ThemeContext.Provider value={this.state.theme}>          <Toolbar changeTheme={this.toggleTheme} />        </ThemeContext.Provider>        <Section>          <ThemedButton />        </Section>      </Page>);
  }
}

ReactDOM.render(<App />, document.root);

```

Updating Context from a Nested Component
========================================

It is often necessary to update the context from a component that is nested somewhere deeply in the component tree. In this case you can pass a function down through the context to allow consumers to update the context:

**theme-context.js**

```
// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const ThemeContext = React.createContext({
  theme: themes.dark,  toggleTheme: () => {},});

```

**theme-toggler-button.js**

```
import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  // The Theme Toggler Button receives not only the theme  // but also a toggleTheme function from the context  return (
    <ThemeContext.Consumer>      {({theme, toggleTheme}) => (        <button
          onClick={toggleTheme}style={{backgroundColor: theme.background}}>          Toggle Theme
        </button>)}
    </ThemeContext.Consumer>);
}

export default ThemeTogglerButton;

```

**app.js**

```
import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // State also contains the updater function so it will    // be passed down into the context provider    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,    };
  }

  render() {
    // The entire state is passed to the provider    return (
      <ThemeContext.Provider value={this.state}>        <Content />      </ThemeContext.Provider>);
  }
}

function Content() {
  return (
    <div>      <ThemeTogglerButton />    </div>);
}

ReactDOM.render(<App />, document.root);

```

Consuming Multiple Contexts
===========================

To keep context re-rendering fast, React needs to make each context consumer a separate node in the tree.

```
// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // App component that provides initial context values
    return (
      <ThemeContext.Provider value={theme}>        <UserContext.Provider value={signedInUser}>          <Layout />        </UserContext.Provider>      </ThemeContext.Provider>    );
  }
}

function Layout() {
  return (
    <div>      <Sidebar />      <Content />    </div>);
}

// A component may consume multiple contexts
function Content() {
  return (
    <ThemeContext.Consumer>      {theme => (        <UserContext.Consumer>          {user => (            <ProfilePage user={user} theme={theme} />          )}        </UserContext.Consumer>      )}    </ThemeContext.Consumer>  );
}

```

If two or more context values are often used together, you might want to consider creating your own render prop component that provides both.

Caveats
=======

Because context uses reference identity to determine when to re-render, there are some gotchas that could trigger unintentional renders in consumers when a provider's parent re-renders. For example, the code below will re-render all consumers every time the Provider re-renders because a new object is always created for `value`:

```
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{something: 'something'}}>        <Toolbar />      </MyContext.Provider>);
  }
}

```

To get around this, lift the value into the parent's state:

```
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},    };
  }

  render() {
    return (
      <MyContext.Provider value={this.state.value}>        <Toolbar />      </MyContext.Provider>);
  }
}

```

Legacy API
==========

> NoteReact previously shipped with an experimental context API. The old API will be supported in all 16.x releases, but applications using it should migrate to the new version. The legacy API will be removed in a future major React version. Read the legacy context docs here.

**Fragments**
=============

A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.
===========================================================================================================================================================

```
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>);
}

```

There is also a new [short syntax](https://reactjs.org/docs/fragments.html#short-syntax) for declaring them.

Motivation
==========

A common pattern is for a component to return a list of children. Take this example React snippet:

```
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>);
  }
}

```

`<Columns />` would need to return multiple `<td>` elements in order for the rendered HTML to be valid. If a parent div was used inside the `render()` of `<Columns />`, then the resulting HTML will be invalid.

```
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>);
  }
}

```

results in a `<Table />` output of:

```
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>

```

Fragments solve this problem.

Usage
=====

```
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>        <td>Hello</td>        <td>World</td>      </React.Fragment>    );
  }
}

```

which results in a correct `<Table />` output of:

```
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>

```

Short Syntax
============

There is a new, shorter syntax you can use for declaring fragments. It looks like empty tags:

```
class Columns extends React.Component {
  render() {
    return (
      <>        <td>Hello</td>        <td>World</td>      </>    );
  }
}

```

You can use `<></>` the same way you'd use any other element except that it doesn't support keys or attributes.

Keyed Fragments
===============

Fragments declared with the explicit `<React.Fragment>` syntax may have keys. A use case for this is mapping a collection to an array of fragments --- for example, to create a description list:

```
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>))}
    </dl>);
}

```

`key` is the only attribute that can be passed to `Fragment`. In the future, we may add support for additional attributes, such as event handlers.

Live Demo
=========

You can try out the new JSX fragment syntax with this [CodePen](https://codepen.io/reactjs/pen/VrEbjE?editors=1000).

**Higher-Order Components**
===========================

A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React's compositional nature.
============================================================================================================================================================================================================

Concretely, **a higher-order component is a function that takes a component and returns a new component.**

`const EnhancedComponent = higherOrderComponent(WrappedComponent);`

Whereas a component transforms props into UI, a higher-order component transforms a component into another component.

HOCs are common in third-party React libraries, such as Redux's `[connect](<https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect>)` and Relay's `[createFragmentContainer](<https://relay.dev/docs/v10.1.3/fragment-container/#createfragmentcontainer>)`.

In this document, we'll discuss why higher-order components are useful, and how to write your own.

Use HOCs For Cross-Cutting Concerns
===================================

> NoteWe previously recommended mixins as a way to handle cross-cutting concerns. We've since realized that mixins create more trouble than they are worth. Read more about why we've moved away from mixins and how you can transition your existing components.

Components are the primary unit of code reuse in React. However, you'll find that some patterns aren't a straightforward fit for traditional components.

For example, say you have a `CommentList` component that subscribes to an external data source to render a list of comments:

```
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />))}
      </div>);
  }
}

```

Later, you write a component for subscribing to a single blog post, which follows a similar pattern:

```
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}

```

`CommentList` and `BlogPost` aren't identical --- they call different methods on `DataSource`, and they render different output. But much of their implementation is the same:

-   On mount, add a change listener to `DataSource`.
-   Inside the listener, call `setState` whenever the data source changes.
-   On unmount, remove the change listener.

You can imagine that in a large app, this same pattern of subscribing to `DataSource` and calling `setState` will occur over and over again. We want an abstraction that allows us to define this logic in a single place and share it across many components. This is where higher-order components excel.

We can write a function that creates components, like `CommentList` and `BlogPost`, that subscribe to `DataSource`. The function will accept as one of its arguments a child component that receives the subscribed data as a prop. Let's call the function `withSubscription`:

```
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);

```

The first parameter is the wrapped component. The second parameter retrieves the data we're interested in, given a `DataSource` and the current props.

When `CommentListWithSubscription` and `BlogPostWithSubscription` are rendered, `CommentList` and `BlogPost` will be passed a `data` prop with the most current data retrieved from `DataSource`:

```
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

```

Note that a HOC doesn't modify the input component, nor does it use inheritance to copy its behavior. Rather, a HOC *composes* the original component by *wrapping* it in a container component. A HOC is a pure function with zero side-effects.

And that's it! The wrapped component receives all the props of the container, along with a new prop, `data`, which it uses to render its output. The HOC isn't concerned with how or why the data is used, and the wrapped component isn't concerned with where the data came from.

Because `withSubscription` is a normal function, you can add as many or as few arguments as you like. For example, you may want to make the name of the `data` prop configurable, to further isolate the HOC from the wrapped component. Or you could accept an argument that configures `shouldComponentUpdate`, or one that configures the data source. These are all possible because the HOC has full control over how the component is defined.

Like components, the contract between `withSubscription` and the wrapped component is entirely props-based. This makes it easy to swap one HOC for a different one, as long as they provide the same props to the wrapped component. This may be useful if you change data-fetching libraries, for example.

Don't Mutate the Original Component. Use Composition.
=====================================================

Resist the temptation to modify a component's prototype (or otherwise mutate it) inside a HOC.

```
function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function(prevProps) {
    console.log('Current props: ', this.props);
    console.log('Previous props: ', prevProps);
  };
  // The fact that we're returning the original input is a hint that it has
  // been mutated.
  return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);

```

There are a few problems with this. One is that the input component cannot be reused separately from the enhanced component. More crucially, if you apply another HOC to `EnhancedComponent` that *also* mutates `componentDidUpdate`, the first HOC's functionality will be overridden! This HOC also won't work with function components, which do not have lifecycle methods.

Mutating HOCs are a leaky abstraction---the consumer must know how they are implemented in order to avoid conflicts with other HOCs.

Instead of mutation, HOCs should use composition, by wrapping the input component in a container component:

```
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}

```

This HOC has the same functionality as the mutating version while avoiding the potential for clashes. It works equally well with class and function components. And because it's a pure function, it's composable with other HOCs, or even with itself.

You may have noticed similarities between HOCs and a pattern called **container components**. Container components are part of a strategy of separating responsibility between high-level and low-level concerns. Containers manage things like subscriptions and state, and pass props to components that handle things like rendering UI. HOCs use containers as part of their implementation. You can think of HOCs as parameterized container component definitions.

Convention: Pass Unrelated Props Through to the Wrapped Component
=================================================================

HOCs add features to a component. They shouldn't drastically alter its contract. It's expected that the component returned from a HOC has a similar interface to the wrapped component.

HOCs should pass through props that are unrelated to its specific concern. Most HOCs contain a render method that looks something like this:

```
render() {
  // Filter out extra props that are specific to this HOC and shouldn't be
  // passed through
  const { extraProp, ...passThroughProps } = this.props;

  // Inject props into the wrapped component. These are usually state values or
  // instance methods.
  const injectedProp = someStateOrInstanceMethod;

  // Pass props to wrapped component
  return (
    <WrappedComponentinjectedProp={injectedProp}{...passThroughProps}/>);
}

```

This convention helps ensure that HOCs are as flexible and reusable as possible.

Convention: Maximizing Composability
====================================

Not all HOCs look the same. Sometimes they accept only a single argument, the wrapped component:

```
const NavbarWithRouter = withRouter(Navbar);

```

Usually, HOCs accept additional arguments. In this example from Relay, a config object is used to specify a component's data dependencies:

```
const CommentWithRelay = Relay.createContainer(Comment, config);

```

The most common signature for HOCs looks like this:

```
// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);

```

*What?!* If you break it apart, it's easier to see what's going on.

```
// connect is a function that returns another function
const enhance = connect(commentListSelector, commentListActions);
// The returned function is a HOC, which returns a component that is connected
// to the Redux store
const ConnectedComment = enhance(CommentList);

```

In other words, `connect` is a higher-order function that returns a higher-order component!

This form may seem confusing or unnecessary, but it has a useful property. Single-argument HOCs like the one returned by the `connect` function have the signature `Component => Component`. Functions whose output type is the same as its input type are really easy to compose together.

```
// Instead of doing this...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... you can use a function composition utility
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const enhance = compose(
  // These are both single-argument HOCs
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)

```

(This same property also allows `connect` and other enhancer-style HOCs to be used as decorators, an experimental JavaScript proposal.)

The `compose` utility function is provided by many third-party libraries including lodash (as `[lodash.flowRight](<https://lodash.com/docs/#flowRight>)`), [Redux](https://redux.js.org/api/compose), and [Ramda](https://ramdajs.com/docs/#compose).

Convention: Wrap the Display Name for Easy Debugging
====================================================

The container components created by HOCs show up in the [React Developer Tools](https://github.com/facebook/react/tree/main/packages/react-devtools) like any other component. To ease debugging, choose a display name that communicates that it's the result of a HOC.

The most common technique is to wrap the display name of the wrapped component. So if your higher-order component is named `withSubscription`, and the wrapped component's display name is `CommentList`, use the display name `WithSubscription(CommentList)`:

```
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

```

Caveats
=======

Higher-order components come with a few caveats that aren't immediately obvious if you're new to React.

Don't Use HOCs Inside the render Method
=======================================

React's diffing algorithm (called [Reconciliation](https://reactjs.org/docs/reconciliation.html)) uses component identity to determine whether it should update the existing subtree or throw it away and mount a new one. If the component returned from `render` is identical (`===`) to the component from the previous render, React recursively updates the subtree by diffing it with the new one. If they're not equal, the previous subtree is unmounted completely.

Normally, you shouldn't need to think about this. But it matters for HOCs because it means you can't apply a HOC to a component within the render method of a component:

```
render() {
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}

```

The problem here isn't just about performance --- remounting a component causes the state of that component and all of its children to be lost.

Instead, apply HOCs outside the component definition so that the resulting component is created only once. Then, its identity will be consistent across renders. This is usually what you want, anyway.

In those rare cases where you need to apply a HOC dynamically, you can also do it inside a component's lifecycle methods or its constructor.

Static Methods Must Be Copied Over
==================================

Sometimes it's useful to define a static method on a React component. For example, Relay containers expose a static method `getFragment` to facilitate the composition of GraphQL fragments.

When you apply a HOC to a component, though, the original component is wrapped with a container component. That means the new component does not have any of the static methods of the original component.

```
// Define a static method
WrappedComponent.staticMethod = function() {/*...*/}
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true

```

To solve this, you could copy the methods onto the container before returning it:

```
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Must know exactly which method(s) to copy :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}

```

However, this requires you to know exactly which methods need to be copied. You can use [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) to automatically copy all non-React static methods:

```
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}

```

Another possible solution is to export the static method separately from the component itself.

```
// Instead of...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...export the method separately...
export { someFunction };

// ...and in the consuming module, import both
import MyComponent, { someFunction } from './MyComponent.js';

```

Refs Aren't Passed Through
==========================

While the convention for higher-order components is to pass through all props to the wrapped component, this does not work for refs. That's because `ref` is not really a prop --- like `key`, it's handled specially by React. If you add a ref to an element whose component is the result of a HOC, the ref refers to an instance of the outermost container component, not the wrapped component.

The solution for this problem is to use the `React.forwardRef` API (introduced with React 16.3). [Learn more about it in the forwarding refs section](https://reactjs.org/docs/forwarding-refs.html).

**JSX In Depth**
================

Fundamentally, JSX just provides syntactic sugar for the `React.createElement(component, props, ...children)` function. The JSX code:
=====================================================================================================================================

```
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>

```

compiles into:

```
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)

```

You can also use the self-closing form of the tag if there are no children. So:

```
<div className="sidebar" />

```

compiles into:

```
React.createElement(
  'div',
  {className: 'sidebar'}
)

```

If you want to test out how some specific JSX is converted into JavaScript, you can try out [the online Babel compiler](https://babeljs.io/repl/#?presets=react&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA).

Specifying The React Element Type
=================================

The first part of a JSX tag determines the type of the React element.

Capitalized types indicate that the JSX tag is referring to a React component. These tags get compiled into a direct reference to the named variable, so if you use the JSX `<Foo />` expression, `Foo` must be in scope.

React Must Be in Scope
======================

Since JSX compiles into calls to `React.createElement`, the `React` library must also always be in scope from your JSX code.

For example, both of the imports are necessary in this code, even though `React` and `CustomButton` are not directly referenced from JavaScript:

```
import React from 'react';import CustomButton from './CustomButton';function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);  return <CustomButton color="red" />;
}

```

If you don't use a JavaScript bundler and loaded React from a `<script>` tag, it is already in scope as the `React` global.

Using Dot Notation for JSX Type
===============================

You can also refer to a React component using dot-notation from within JSX. This is convenient if you have a single module that exports many React components. For example, if `MyComponents.DatePicker` is a component, you can use it directly from JSX with:

```
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;}

```

User-Defined Components Must Be Capitalized
===========================================

When an element type starts with a lowercase letter, it refers to a built-in component like `<div>` or `<span>` and results in a string `'div'` or `'span'` passed to `React.createElement`. Types that start with a capital letter like `<Foo />` compile to `React.createElement(Foo)` and correspond to a component defined or imported in your JavaScript file.

We recommend naming components with a capital letter. If you do have a component that starts with a lowercase letter, assign it to a capitalized variable before using it in JSX.

For example, this code will not run as expected:

```
import React from 'react';

// Wrong! This is a component and should have been capitalized:function hello(props) {  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Wrong! React thinks <hello /> is an HTML tag because it's not capitalized:  return <hello toWhat="World" />;}

```

To fix this, we will rename `hello` to `Hello` and use `<Hello />` when referring to it:

```
import React from 'react';

// Correct! This is a component and should be capitalized:function Hello(props) {  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Correct! React knows <Hello /> is a component because it's capitalized.  return <Hello toWhat="World" />;}

```

Choosing the Type at Runtime
============================

You cannot use a general expression as the React element type. If you do want to use a general expression to indicate the type of the element, just assign it to a capitalized variable first. This often comes up when you want to render a different component based on a prop:

```
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Wrong! JSX type can't be an expression.  return <components[props.storyType] story={props.story} />;}

```

To fix this, we will assign the type to a capitalized variable first:

```
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Correct! JSX type can be a capitalized variable.  const SpecificStory = components[props.storyType];  return <SpecificStory story={props.story} />;}

```

Props in JSX
============

There are several different ways to specify props in JSX.

JavaScript Expressions as Props
===============================

You can pass any JavaScript expression as a prop, by surrounding it with `{}`. For example, in this JSX:

`<MyComponent foo={1 + 2 + 3 + 4} />`

For `MyComponent`, the value of `props.foo` will be `10` because the expression `1 + 2 + 3 + 4` gets evaluated.

`if` statements and `for` loops are not expressions in JavaScript, so they can't be used in JSX directly. Instead, you can put these in the surrounding code. For example:

```
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {    description = <strong>even</strong>;  } else {    description = <i>odd</i>;  }  return <div>{props.number} is an {description} number</div>;
}

```

You can learn more about [conditional rendering](https://reactjs.org/docs/conditional-rendering.html) and [loops](https://reactjs.org/docs/lists-and-keys.html) in the corresponding sections.

String Literals
===============

You can pass a string literal as a prop. These two JSX expressions are equivalent:

`<MyComponent message="hello world" /><MyComponent message={'hello world'} />`

When you pass a string literal, its value is HTML-unescaped. So these two JSX expressions are equivalent:

`<MyComponent message="&lt;3" /><MyComponent message={'<3'} />`

This behavior is usually not relevant. It's only mentioned here for completeness.

Props Default to "True"
=======================

If you pass no value for a prop, it defaults to `true`. These two JSX expressions are equivalent:

`<MyTextBox autocomplete /><MyTextBox autocomplete={true} />`

In general, we don't recommend *not* passing a value for a prop, because it can be confused with the [ES6 object shorthand](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015) `{foo}` which is short for `{foo: foo}` rather than `{foo: true}`. This behavior is just there so that it matches the behavior of HTML.

Spread Attributes
=================

If you already have `props` as an object, and you want to pass it in JSX, you can use `...` as a "spread" operator to pass the whole props object. These two components are equivalent:

```
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;}

```

You can also pick specific props that your component will consume while passing all other props using the spread operator.

```
const Button = props => {
  const { kind, ...other } = props;  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>      <Button kind="primary" onClick={() => console.log("clicked!")}>        Hello World!
      </Button>    </div>);
};

```

In the example above, the `kind` prop is safely consumed and *is not* passed on to the `<button>` element in the DOM. All other props are passed via the `...other` object making this component really flexible. You can see that it passes an `onClick` and `children` props.

Spread attributes can be useful but they also make it easy to pass unnecessary props to components that don't care about them or to pass invalid HTML attributes to the DOM. We recommend using this syntax sparingly.

Children in JSX
===============

In JSX expressions that contain both an opening tag and a closing tag, the content between those tags is passed as a special prop: `props.children`. There are several different ways to pass children:

String Literals
===============

You can put a string between the opening and closing tags and `props.children` will just be that string. This is useful for many of the built-in HTML elements. For example:

`<MyComponent>Hello world!</MyComponent>`

This is valid JSX, and `props.children` in `MyComponent` will simply be the string `"Hello world!"`. HTML is unescaped, so you can generally write JSX just like you would write HTML in this way:

`<div>This is valid HTML &amp; JSX at the same time.</div>`

JSX removes whitespace at the beginning and ending of a line. It also removes blank lines. New lines adjacent to tags are removed; new lines that occur in the middle of string literals are condensed into a single space. So these all render to the same thing:

```
<div>Hello World</div><div>
  Hello World
</div><div>
  Hello
  World
</div><div>

  Hello World
</div>

```

JSX Children
============

You can provide more JSX elements as the children. This is useful for displaying nested components:

```
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>

```

You can mix together different types of children, so you can use string literals together with JSX children. This is another way in which JSX is like HTML, so that this is both valid JSX and valid HTML:

```
<div>
  Here is a list:
  <ul><li>Item 1</li><li>Item 2</li></ul></div>

```

A React component can also return an array of elements:

`render() { // No need to wrap list items in an extra element! return [ // Don't forget the keys :) <li key="A">First item</li>, <li key="B">Second item</li>, <li key="C">Third item</li>, ]; }`

JavaScript Expressions as Children
==================================

You can pass any JavaScript expression as children, by enclosing it within `{}`. For example, these expressions are equivalent:

`<MyComponent>foo</MyComponent><MyComponent>{'foo'}</MyComponent>`

This is often useful for rendering a list of JSX expressions of arbitrary length. For example, this renders an HTML list:

```
function Item(props) {
  return <li>{props.message}</li>;}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>      {todos.map((message) => <Item key={message} message={message} />)}    </ul>);
}

```

JavaScript expressions can be mixed with other types of children. This is often useful in lieu of string templates:

```
function Hello(props) {
  return <div>Hello {props.addressee}!</div>;}

```

Functions as Children
=====================

Normally, JavaScript expressions inserted in JSX will evaluate to a string, a React element, or a list of those things. However, `props.children` works just like any other prop in that it can pass any sort of data, not just the sorts that React knows how to render. For example, if you have a custom component, you could have it take a callback as `props.children`:

```
// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>      {(index) => <div key={index}>This is item {index} in the list</div>}    </Repeat>);
}

```

Children passed to a custom component can be anything, as long as that component transforms them into something React can understand before rendering. This usage is not common, but it works if you want to stretch what JSX is capable of.

Booleans, Null, and Undefined Are Ignored
=========================================

`false`, `null`, `undefined`, and `true` are valid children. They simply don't render. These JSX expressions will all render to the same thing:

```
<div /><div></div><div>{false}</div><div>{null}</div><div>{undefined}</div><div>{true}</div>

```

This can be useful to conditionally render React elements. This JSX renders the `<Header />` component only if `showHeader` is `true`:

```
<div>  {showHeader && <Header />}  <Content /></div>

```

One caveat is that some ["falsy" values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), such as the `0` number, are still rendered by React. For example, this code will not behave as you might expect because `0` will be printed when `props.messages` is an empty array:

```
<div>  {props.messages.length &&    <MessageList messages={props.messages} />}
</div>

```

To fix this, make sure that the expression before `&&` is always boolean:

```
<div>  {props.messages.length > 0 &&    <MessageList messages={props.messages} />}
</div>

```

Conversely, if you want a value like `false`, `true`, `null`, or `undefined` to appear in the output, you have to [convert it to a string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion) first:

```
<div>  My JavaScript variable is {String(myVariable)}.</div>

```

**Optimizing Performance**
==========================

Internally, React uses several clever techniques to minimize the number of costly DOM operations required to update the UI. For many applications, using React will lead to a fast user interface without doing much work to specifically optimize for performance. Nevertheless, there are several ways you can speed up your React application.
=================================================================================================================================================================================================================================================================================================================================================

Use the Production Build
========================

If you're benchmarking or experiencing performance problems in your React apps, make sure you're testing with the minified production build.

By default, React includes many helpful warnings. These warnings are very useful in development. However, they make React larger and slower so you should make sure to use the production version when you deploy the app.

If you aren't sure whether your build process is set up correctly, you can check it by installing [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi). If you visit a site with React in production mode, the icon will have a dark background:

![https://reactjs.org/static/d0f767f80866431ccdec18f200ca58f1/0a47e/devtools-prod.png](https://reactjs.org/static/d0f767f80866431ccdec18f200ca58f1/0a47e/devtools-prod.png)

If you visit a site with React in development mode, the icon will have a red background:

![https://reactjs.org/static/e434ce2f7e64f63e597edf03f4465694/0a47e/devtools-dev.png](https://reactjs.org/static/e434ce2f7e64f63e597edf03f4465694/0a47e/devtools-dev.png)

It is expected that you use the development mode when working on your app, and the production mode when deploying your app to the users.

You can find instructions for building your app for production below.

Create React App
================

If your project is built with [Create React App](https://github.com/facebookincubator/create-react-app), run:

```
npm run build

```

This will create a production build of your app in the `build/` folder of your project.

Remember that this is only necessary before deploying to production. For normal development, use `npm start`.

Single-File Builds
==================

We offer production-ready versions of React and React DOM as single files:

```
<script src="<https://unpkg.com/react@17/umd/react.production.min.js>"></script><script src="<https://unpkg.com/react-dom@17/umd/react-dom.production.min.js>"></script>

```

Remember that only React files ending with `.production.min.js` are suitable for production.

Brunch
======

For the most efficient Brunch production build, install the `[terser-brunch](<https://github.com/brunch/terser-brunch>)` plugin:

```
# If you use npm
npm install --save-dev terser-brunch

# If you use Yarn
yarn add --dev terser-brunch

```

Then, to create a production build, add the `-p` flag to the `build` command:

```
brunch build -p

```

Remember that you only need to do this for production builds. You shouldn't pass the `-p` flag or apply this plugin in development, because it will hide useful React warnings and make the builds much slower.

Browserify
==========

For the most efficient Browserify production build, install a few plugins:

```
# If you use npm
npm install --save-dev envify terser uglifyify

# If you use Yarn
yarn add --dev envify terser uglifyify

```

To create a production build, make sure that you add these transforms **(the order matters)**:

-   The `[envify](<https://github.com/hughsk/envify>)` transform ensures the right build environment is set. Make it global (`g`).
-   The `[uglifyify](<https://github.com/hughsk/uglifyify>)` transform removes development imports. Make it global too (`g`).
-   Finally, the resulting bundle is piped to `[terser](<https://github.com/terser-js/terser>)` for mangling ([read why](https://github.com/hughsk/uglifyify#motivationusage)).

For example:

```
browserify ./index.js \\
  -g [ envify --NODE_ENV production ] \\
  -g uglifyify \\
  | terser --compress --mangle > ./bundle.js

```

Remember that you only need to do this for production builds. You shouldn't apply these plugins in development because they will hide useful React warnings, and make the builds much slower.

Rollup
======

For the most efficient Rollup production build, install a few plugins:

```
# If you use npm
npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser

# If you use Yarn
yarn add --dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser

```

To create a production build, make sure that you add these plugins **(the order matters)**:

-   The `[replace](<https://github.com/rollup/rollup-plugin-replace>)` plugin ensures the right build environment is set.
-   The `[commonjs](<https://github.com/rollup/rollup-plugin-commonjs>)` plugin provides support for CommonJS in Rollup.
-   The `[terser](<https://github.com/TrySound/rollup-plugin-terser>)` plugin compresses and mangles the final bundle.

```
plugins: [
  // ...
  require('rollup-plugin-replace')({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  require('rollup-plugin-commonjs')(),
  require('rollup-plugin-terser')(),
  // ...
]

```

For a complete setup example [see this gist](https://www.notion.so/cb14f4bc0670c47d00d191565be36bf0).

Remember that you only need to do this for production builds. You shouldn't apply the `terser` plugin or the `replace` plugin with `'production'` value in development because they will hide useful React warnings, and make the builds much slower.

webpack
=======

> Note:If you're using Create React App, please follow the instructions above.This section is only relevant if you configure webpack directly.

Webpack v4+ will minify your code by default in production mode.

```
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
};

```

You can learn more about this in [webpack documentation](https://webpack.js.org/guides/production/).

Remember that you only need to do this for production builds. You shouldn't apply `TerserPlugin` in development because it will hide useful React warnings, and make the builds much slower.

Profiling Components with the DevTools Profiler
===============================================

`react-dom` 16.5+ and `react-native` 0.57+ provide enhanced profiling capabilities in DEV mode with the React DevTools Profiler. An overview of the Profiler can be found in the blog post ["Introducing the React Profiler"](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html). A video walkthrough of the profiler is also [available on YouTube](https://www.youtube.com/watch?v=nySib7ipZdk).

If you haven't yet installed the React DevTools, you can find them here:

-   [Chrome Browser Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
-   [Firefox Browser Extension](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)
-   [Standalone Node Package](https://www.npmjs.com/package/react-devtools)

> NoteA production profiling bundle of react-dom is also available as react-dom/profiling. Read more about how to use this bundle at [fb.me/react-profiling](http://fb.me/react-profiling)

> NoteBefore React 17, we use the standard User Timing API to profile components with the chrome performance tab. For a more detailed walkthrough, check out this article by Ben Schwarz.

Virtualize Long Lists
=====================

If your application renders long lists of data (hundreds or thousands of rows), we recommend using a technique known as "windowing". This technique only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created.

[react-window](https://react-window.now.sh/) and [react-virtualized](https://bvaughn.github.io/react-virtualized/) are popular windowing libraries. They provide several reusable components for displaying lists, grids, and tabular data. You can also create your own windowing component, like [Twitter did](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3), if you want something more tailored to your application's specific use case.

Avoid Reconciliation
====================

React builds and maintains an internal representation of the rendered UI. It includes the React elements you return from your components. This representation lets React avoid creating DOM nodes and accessing existing ones beyond necessity, as that can be slower than operations on JavaScript objects. Sometimes it is referred to as a "virtual DOM", but it works the same way on React Native.

When a component's props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM.

Even though React only updates the changed DOM nodes, re-rendering still takes some time. In many cases it's not a problem, but if the slowdown is noticeable, you can speed all of this up by overriding the lifecycle function `shouldComponentUpdate`, which is triggered before the re-rendering process starts. The default implementation of this function returns `true`, leaving React to perform the update:

```
shouldComponentUpdate(nextProps, nextState) {
  return true;
}

```

If you know that in some situations your component doesn't need to update, you can return `false` from `shouldComponentUpdate` instead, to skip the whole rendering process, including calling `render()` on this component and below.

In most cases, instead of writing `shouldComponentUpdate()` by hand, you can inherit from `[React.PureComponent](<https://reactjs.org/docs/react-api.html#reactpurecomponent>)`. It is equivalent to implementing `shouldComponentUpdate()` with a shallow comparison of current and previous props and state.

shouldComponentUpdate In Action
===============================

Here's a subtree of components. For each one, `SCU` indicates what `shouldComponentUpdate` returned, and `vDOMEq` indicates whether the rendered React elements were equivalent. Finally, the circle's color indicates whether the component had to be reconciled or not.

![https://reactjs.org/static/5ee1bdf4779af06072a17b7a0654f6db/cd039/should-component-update.png](https://reactjs.org/static/5ee1bdf4779af06072a17b7a0654f6db/cd039/should-component-update.png)

Since `shouldComponentUpdate` returned `false` for the subtree rooted at C2, React did not attempt to render C2, and thus didn't even have to invoke `shouldComponentUpdate` on C4 and C5.

For C1 and C3, `shouldComponentUpdate` returned `true`, so React had to go down to the leaves and check them. For C6 `shouldComponentUpdate` returned `true`, and since the rendered elements weren't equivalent React had to update the DOM.

The last interesting case is C8. React had to render this component, but since the React elements it returned were equal to the previously rendered ones, it didn't have to update the DOM.

Note that React only had to do DOM mutations for C6, which was inevitable. For C8, it bailed out by comparing the rendered React elements, and for C2's subtree and C7, it didn't even have to compare the elements as we bailed out on `shouldComponentUpdate`, and `render` was not called.

Examples
========

If the only way your component ever changes is when the `props.color` or the `state.count` variable changes, you could have `shouldComponentUpdate` check that:

```
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>);
  }
}

```

In this code, `shouldComponentUpdate` is just checking if there is any change in `props.color` or `state.count`. If those values don't change, the component doesn't update. If your component got more complex, you could use a similar pattern of doing a "shallow comparison" between all the fields of `props` and `state` to determine if the component should update. This pattern is common enough that React provides a helper to use this logic - just inherit from `React.PureComponent`. So this code is a simpler way to achieve the same thing:

```
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>);
  }
}

```

Most of the time, you can use `React.PureComponent` instead of writing your own `shouldComponentUpdate`. It only does a shallow comparison, so you can't use it if the props or state may have been mutated in a way that a shallow comparison would miss.

This can be a problem with more complex data structures. For example, let's say you want a `ListOfWords` component to render a comma-separated list of words, with a parent `WordAdder` component that lets you click a button to add a word to the list. This code does *not* work correctly:

```
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This section is bad style and causes a bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>);
  }
}

```

The problem is that `PureComponent` will do a simple comparison between the old and new values of `this.props.words`. Since this code mutates the `words` array in the `handleClick` method of `WordAdder`, the old and new values of `this.props.words` will compare as equal, even though the actual words in the array have changed. The `ListOfWords` will thus not update even though it has new words that should be rendered.

The Power Of Not Mutating Data
==============================

The simplest way to avoid this problem is to avoid mutating values that you are using as props or state. For example, the `handleClick` method above could be rewritten using `concat` as:

```
handleClick() {
  this.setState(state => ({
    words: state.words.concat(['marklar'])
  }));
}

```

ES6 supports a [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) for arrays which can make this easier. If you're using Create React App, this syntax is available by default.

```
handleClick() {
  this.setState(state => ({
    words: [...state.words, 'marklar'],
  }));
};

```

You can also rewrite code that mutates objects to avoid mutation, in a similar way. For example, let's say we have an object named `colormap` and we want to write a function that changes `colormap.right` to be `'blue'`. We could write:

`function updateColorMap(colormap) { colormap.right = 'blue'; }`

To write this without mutating the original object, we can use [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method:

```
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}

```

`updateColorMap` now returns a new object, rather than mutating the old one. `Object.assign` is in ES6 and requires a polyfill.

[Object spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) makes it easier to update objects without mutation as well:

```
function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}

```

This feature was added to JavaScript in ES2018.

If you're using Create React App, both `Object.assign` and the object spread syntax are available by default.

When you deal with deeply nested objects, updating them in an immutable way can feel convoluted. If you run into this problem, check out [Immer](https://github.com/mweststrate/immer) or [immutability-helper](https://github.com/kolodny/immutability-helper). These libraries let you write highly readable code without losing the benefits of immutability.

Is this page useful?[Edit this page](https://github.com/reactjs/reactjs.org/tree/main/content/docs/optimizing-performance.md)

**Render Props**
================

The term ["render prop"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) refers to a technique for sharing code between React components using a prop whose value is a function.
==============================================================================================================================================================================================

A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

```
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>)}/>

```

Libraries that use render props include [React Router](https://reacttraining.com/react-router/web/api/Route/render-func), [Downshift](https://github.com/paypal/downshift) and [Formik](https://github.com/jaredpalmer/formik).

In this document, we'll discuss why render props are useful, and how to write your own.

Use Render Props for Cross-Cutting Concerns
===========================================

Components are the primary unit of code reuse in React, but it's not always obvious how to share the state or behavior that one component encapsulates to other components that need that same state.

For example, the following component tracks the mouse position in a web app:

```
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>);
  }
}

```

As the cursor moves around the screen, the component displays its (x, y) coordinates in a `<p>`.

Now the question is: How can we reuse this behavior in another component? In other words, if another component needs to know about the cursor position, can we encapsulate that behavior so that we can easily share it with that component?

Since components are the basic unit of code reuse in React, let's try refactoring the code a bit to use a `<Mouse>` component that encapsulates the behavior we need to reuse elsewhere.

```
// The <Mouse> component encapsulates the behavior we need...
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/* ...but how do we render something other than a <p>? */}
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>);
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <>
        <h1>Move the mouse around!</h1>
        <Mouse />
      </>);
  }
}

```

Now the `<Mouse>` component encapsulates all behavior associated with listening for `mousemove` events and storing the (x, y) position of the cursor, but it's not yet truly reusable.

For example, let's say we have a `<Cat>` component that renders the image of a cat chasing the mouse around the screen. We might use a `<Cat mouse={{ x, y }}>` prop to tell the component the coordinates of the mouse so it knows where to position the image on the screen.

As a first pass, you might try rendering the `<Cat>` *inside `<Mouse>`'s `render` method*, like this:

```
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />);
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          We could just swap out the <p> for a <Cat> here ... but then
          we would need to create a separate <MouseWithSomethingElse>
          component every time we need to use it, so <MouseWithCat>
          isn't really reusable yet.
        */}
        <Cat mouse={this.state} />
      </div>);
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <MouseWithCat />
      </div>);
  }
}

```

This approach will work for our specific use case, but we haven't achieved the objective of truly encapsulating the behavior in a reusable way. Now, every time we want the mouse position for a different use case, we have to create a new component (i.e. essentially another `<MouseWithCat>`) that renders something specifically for that use case.

Here's where the render prop comes in: Instead of hard-coding a `<Cat>` inside a `<Mouse>` component, and effectively changing its rendered output, we can provide `<Mouse>` with a function prop that it uses to dynamically determine what to render--a render prop.

```
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />);
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>);
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />)}/>
      </div>);
  }
}

```

Now, instead of effectively cloning the `<Mouse>` component and hard-coding something else in its `render` method to solve for a specific use case, we provide a `render` prop that `<Mouse>` can use to dynamically determine what it renders.

More concretely, **a render prop is a function prop that a component uses to know what to render.**

This technique makes the behavior that we need to share extremely portable. To get that behavior, render a `<Mouse>` with a `render` prop that tells it what to render with the current (x, y) of the cursor.

One interesting thing to note about render props is that you can implement most [higher-order components](https://reactjs.org/docs/higher-order-components.html) (HOC) using a regular component with a render prop. For example, if you would prefer to have a `withMouse` HOC instead of a `<Mouse>` component, you could easily create one using a regular `<Mouse>` with a render prop:

```
// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />)}/>);
    }
  }
}

```

So using a render prop makes it possible to use either pattern.

Using Props Other Than `render`
===============================

It's important to remember that just because the pattern is called "render props" you don't *have to use a prop named `render` to use this pattern*. In fact, *[any* prop that is a function that a component uses to know what to render is technically a "render prop"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).

Although the examples above use `render`, we could just as easily use the `children` prop!

```
<Mouse children={mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>)}/>

```

And remember, the `children` prop doesn't actually need to be named in the list of "attributes" in your JSX element. Instead, you can put it directly *inside* the element!

```
<Mouse>
  {mouse => (
    <p>The mouse position is {mouse.x}, {mouse.y}</p>)}
</Mouse>

```

You'll see this technique used in the [react-motion](https://github.com/chenglou/react-motion) API.

Since this technique is a little unusual, you'll probably want to explicitly state that `children` should be a function in your `propTypes` when designing an API like this.

```
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};

```

Caveats
=======

Be careful when using Render Props with React.PureComponent
===========================================================

Using a render prop can negate the advantage that comes from using `[React.PureComponent](<https://reactjs.org/docs/react-api.html#reactpurecomponent>)` if you create the function inside a `render` method. This is because the shallow prop comparison will always return `false` for new props, and each `render` in this case will generate a new value for the render prop.

For example, continuing with our `<Mouse>` component from above, if `Mouse` were to extend `React.PureComponent` instead of `React.Component`, our example would look like this:

```
class Mouse extends React.PureComponent {
  // Same implementation as above...
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>

        {/*
          This is bad! The value of the `render` prop will
          be different on each render.
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />)}/>
      </div>);
  }
}

```

In this example, each time `<MouseTracker>` renders, it generates a new function as the value of the `<Mouse render>` prop, thus negating the effect of `<Mouse>` extending `React.PureComponent` in the first place!

To get around this problem, you can sometimes define the prop as an instance method, like so:

```
class MouseTracker extends React.Component {
  // Defined as an instance method, `this.renderTheCat` always
  // refers to *same* function when we use it in render
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>);
  }
}

```

In cases where you cannot define the prop statically (e.g. because you need to close over the component's props and/or state) `<Mouse>` should extend `React.Component` instead.