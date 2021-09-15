# Calculator Project
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Phase 1: Setup](#phase-1-setup)
- [Phase 2: Creating the `Calculator` component](#phase-2-creating-the-calculator-component)
  - [State](#state)
- [Phase 3: Rendering in your component](#phase-3-rendering-in-your-component)
- [Phase 4: Creating input fields](#phase-4-creating-input-fields)
- [Phase 5: Creating calculator buttons](#phase-5-creating-calculator-buttons)
  - [Clear](#clear)
- [Phase 6: Refactoring your project](#phase-6-refactoring-your-project)
  - [What you've learned](#what-youve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

You're going to build a simple calculator app. Our app takes in two numbers and
shows the result of a simple operation on the numbers when you click the
operation button. Take a look at the [Live Demo] to see the app in action.
Assume that only numbers will be entered.

## Phase 1: Setup

Begin by using the [create-react-app] package. You'll use the command below to
create a React application.

```sh
npx create-react-app my-app --template @appacademy/simple
```

Take note that using the `create-react-app` command initializes your project as
a Git repository. If you use the `ls -a` to view the hidden files in your
project, you'll see the `.git` file.

You'll also see that your `package.json` file includes four auto-generated
scripts: `start`, `build`, `test`, and `eject`.

Today, you'll be focusing on writing code in the project's `src` directory. But
before you begin, let's take a moment to walk through how your view is rendered.

Start your development server with the `npm start` command and your browser
should open `http://localhost:3000/` to render a view. This view is connected to
your entry file (`./src/App.js`). Open your developer tools and view your HTML
elements in the **Elements** tab. If you open up your `App.js` file, you'll see
that the [JSX] in the file is similar to the HTML in your developer tools.

Although your `App.js` file is generated as a JavaScript file with a `.js`
extension, JSX is used to produce and render the React elements. As a reminder,
JSX is a syntax extension that ultimately get converted to vanilla JavaScript.
It is not HTML although the syntax is similar. An example of a difference is the
use of [`className`] instead of the HTML `class` attribute. You'll learn more
about how [Babel] is used to transpile JSX into JavaScript.

For now, let's refactor and clean up your `App` component by replacing its
content:

```js
// App.js
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Calculator</h1>
    </div>
  );
}

export default App;
```

Since your React app is rendering with JavaScript, you can return your `App`
component with an arrow function. Replace your `App.js` file with the code below
and see how the same view is rendered in `http://localhost:3000/`:

```js
// App.js
import React from 'react';

const App = () => {
  return (
    <div className="App">
      <h1>Calculator</h1>
    </div>
  );
}

export default App;
```

In addition, you can use parentheses to implicitly return the `App` component:

```js
// App.js
import React from 'react';

const App = () => (
  <div className="App">
    <h1>Calculator</h1>
  </div>
);

export default App;
```

But how does the JSX in `App.js` get rendered? Use `cmd + shift + f` to find
where the `<App />` is rendered in your application. You should see the
`index.js` entry file. At the top of the file, you'll see that the `App`
component has been imported. Since your `App.js` file is returning JSX, you can
render the JSX as a `<App />` component by using the [ReactDOM.render()] method
within your entry `index.js` file. The role of the `index.js` entry file is to
render your React components.

Notice that the [ReactDOM.render()] method's second argument is finding an HTML
element with the `id` of `root`. Take a moment to use `cmd + shift + f` to find
`id="root"`. You should now find a `<div>` element with an `id` of `root` in the
`index.html` file. The [ReactDOM.render()] method is replacing the `<div>`
element with the JSX.

Congratulations! You now have a basic React application set up with a component
that you understand how to render.

## Phase 2: Creating the `Calculator` component

Now create a file called `Calculator.js` within your `src` directory. Start
with the code skeleton below:

```js
import React from "react";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Initialize state
  }

  render() {
    return (
      <div>
        <h1>Time for math!</h1>
      </div>
    );
  }
}

export default Calculator;
```

In your `App.js` file, import the `Calculator` component and set it to render
underneath the `<h1>` element. Make sure "Calculator" still shows up in the
browser, this time with "Time for math!" from your `Calculator` component.

### State

Now let's initialize the `state` of your `Calculator` component! The state of
your component is just a JavaScript object. For the calculator, it will contain
three keys: the result and two numbers from user input.

Within the `constructor()` method of your `Calculator` component, define
`this.state` with default values for the result and two numbers. The `result`
should have a default value of `0`. You actually want the two numbers to start
out blank, so give `num1` and `num2` a default value of an empty string:

```js
constructor(props) {
  super(props);
  this.state = {
  // TODO: Set default state
  };
}
```

## Phase 3: Rendering in your component

The first thing you want to render is your `result`. Notice how your
`Calculator` and `App` components are rendering JSX elements in different ways.
Your `Calculator` component is a [class component], so it needs to use the
`render()` method to return JSX, while your `App` component is a function
component so it can directly return JSX. You want to interpolate the result,
which is stored in the component's `state`, into the JSX. It'll look something
like this:

```javascript
  render() {
    return (
      <div>
        <h1>Result: {this.state.result}</h1>
      </div>
    );
  }
```

## Phase 4: Creating input fields

Let's make the input fields. You want the `state` to receive the new value of
the input field every time something is typed in. You can do this by passing an
`onChange` event handler as a _prop_ to the input field. Whenever the input
field's value changes (via the user), the input will run its `onChange` prop,
which should be a callback. Let's create a callback as a method inside your
component. Begin by console logging the _change_ event that is passed into the
callback.

```js
handleFirstNum = e => {
  console.log(e);
};
```

Add an `<input>` element underneath your rendered `result`. Assign the
`onChange` prop to a `handleFirstNum()` callback like so:

```js
<input onChange={this.handleFirstNum} placeholder="First number" />
```

Try typing in your "First number" input field and seeing what is logged in your
developer tools console from the _change_ event. As a reminder, event objects
from your event listeners have [target] and [currentTarget] elements. In this
case, both the `event.target` and `event.currentTarget` refer to the `<input>`
element.

Update your `handleFirstNum` method to use the parsed `value` of your
`event.target` to set the `num1` state. As a reminder, parsing non-numeric
strings results in a `NaN` ("Not a Number") output. Also make note that you need
to use [this.setState()] in order to set a component's state and re-render the
component with the updated state.

```js
handleFirstNum = e => {
  // TODO: Parse value
  // TODO: Set state
}
```

You also want your input fields to always reflect the current version of the
state and properly update when you trigger a re-render by changing the state, so
make sure to include `value={this.state.num1}` in the input tag.

That's one of the inputs! Create a second `<input>` element and a
`handleSecondNum()` callback. It should look very similar.

## Phase 5: Creating calculator buttons

Time to write the operations. Each one of these is a button, with an `onClick`
callback set that carries out the operation and sets the state of the result to
the answer. For example, you can create a "+" button with an `onClick` listener
to invoke an `add()` method with `num1` and `num2` to update the `result`
state.

The current values for `num1` and `num2` should be properly updated and stored
within the state of your component. Create four methods to handle adding,
subtracting, multiplying, and dividing. Remember to use `setState()` to set
`this.state.result` to the correct result.

### Clear

It'd also be nice to be able to clear out the input fields. Make a button that
resets the state to its initial values. You can add an `onClick` listener to
this button to invoke a `clearInput` method to reset the state, and therefore
clear each input field's `value`.

This is part of why it's important to set a `value` on the input fields. By
having the value depend on the state, you ensure that the value will be
re-rendered, and therefore be properly cleared when you set the state of `num1`
and `num2` back to empty strings.

## Phase 6: Refactoring your project

You're probably using the values stored in your state a few times in your
`render` method. Let's DRY it up a little. Destructure the properties stored
in your state in your `render` method to be able to refer to them by separate
variables. Remember that any JavaScript you do should happen before the `return`
statement!

```javascript
render(){
  // TODO: destructuring state variables
  return (
    // TODO: refactor variables defined
  );
}
```

Congratulations! You've created your first React application!

### What you've learned

In this small project, you created your first React class-based component and
used it to store state and handle events.



[create-react-app]: https://github.com/facebook/create-react-app
[Live Demo]: https://appacademy.github.io/curriculum/calculator/
[JSX]: https://reactjs.org/docs/introducing-jsx.html
[`className`]: https://developer.mozilla.org/en-US/docs/Web/API/Element/className
[Babel]: https://babeljs.io/docs/en/next/
[ReactDOM.render()]: https://reactjs.org/docs/react-dom.html
[class component]: https://reactjs.org/docs/react-component.html
[this.setState()]: https://reactjs.org/docs/react-component.html#setstate
[ES6 arrow function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[class properties]: https://reactjs.org/docs/faq-functions.html#class-properties-stage-3-proposal
[target]: https://developer.mozilla.org/en-US/docs/Web/API/Event/target
[currentTarget]: https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
