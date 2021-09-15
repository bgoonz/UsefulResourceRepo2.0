# Handling Events
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Adding event listeners](#adding-event-listeners)
- [Preventing default behavior](#preventing-default-behavior)
- [Using `this` in event handlers](#using-this-in-event-handlers)
  - [Reviewing class methods and the `this` keyword](#reviewing-class-methods-and-the-this-keyword)
  - [Understanding the class property + arrow function pattern](#understanding-the-class-property-arrow-function-pattern)
  - [Pick an approach and be consistent](#pick-an-approach-and-be-consistent)
- [The `SyntheticEvent` object](#the-syntheticevent-object)
- [What you learned](#what-you-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

Event handling is a key part of any dynamic application; without it, you
wouldn't be able to respond to user actions. As with most things in React, how
you add event listeners and handle events is different from how you'd do it in
vanilla JavaScript, it also manages to feel familiar.

In an earlier article, you saw an example of handling button click events. In
this article you'll deepen your understanding how to handle events in React
components.

When you finish this article, you should be able to:

* Add event listeners to elements;
* Prevent event default behavior;
* Safely use the `this` keyword within event handlers; and
* Describe what the React `SyntheticEvent` object is and the role it plays in
  handling events.

## Adding event listeners

To add an event listener to an element, define a method to handle the event and
associate that method with the element event you want to listen for:

```js
// ./src/AlertButton.js

import React from 'react';

class AlertButton extends React.Component {
  showAlert = () => {
    window.alert('Button clicked!');
  }

  render() {
    return (
      <button type='button' onClick={this.showAlert}>Click Me</button>
    );
  }
}

export default AlertButton;
```

In the above example, the `showAlert` method is the event handler, which simply
calls the `window.alert` method to display the text "Button clicked!" within a
browser alert dialog. The `showAlert` event handler is added as a listener for
the `<button>` element's click event using the `onClick` attribute (i.e.
`onClick={this.showAlert}`).

When adding event listeners, be sure to camelCase the event name (i.e. `onClick`
instead of `onclick`) and pass a reference to the event handler method instead
of calling it (i.e. `this.showAlert` instead of `this.showAlert()`).

Also notice the slightly odd looking class property syntax (i.e.
`showAlert = () => { ... }`) that's used to define the `showAlert` method. Using
this experimental syntax for defining a class property in combination with an
arrow function ensures that you can reliably use the `this` keyword within the
event handler method. We'll exam this issue in more detail in just a bit.

> See the official React documentation for a [list of the supported
> events][react events].

## Preventing default behavior

Within the browser, HTML element events often have default behavior associated
with them. For example, clicking an `<a>` element will navigate to the resource
indicated by the anchor element's `href` attribute or clicking a `<button>`
element that's contained with a form will submit the form.

When handling button clicks in the previous example, nothing special had to be
done to prevent the event's default behavior from interfering with our intended
action because a `<button>` element of type `button` doesn't have any default
behavior associated with it.

Consider the following example though:

```js
// ./src/NoDefaultSubmitForm.js

import React from 'react';

class NoDefaultSubmitForm extends React.Component {
  submitForm = () => {
    window.alert('Handling form submission...');
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <button>Submit</button>
      </form>
    );
  }
}

export default NoDefaultSubmitForm;
```

In this example, a `<button>` element without a `type` attribute is rendered
within a `<form>` element. By default, this button will submit the form when
clicked. This has the unintended consequence of reloading the page when the
button is clicked, instead of allowing the `this.submitForm` event handler
method to handle the form submission.

> In an actual React application, the `this.submitForm` event handler method
> would likely use the browser's Fetch API to send a `POST` or `PUT` request to
> a REST API when the form is submitted. To keep this example as simple as
> possible, the `window.alert` method is used to display the text "Handling form
> submission...".

To keep the default form submission from occurring, the event handler method can
be updated to this:

```js
submitForm = (e) => {
  e.preventDefault();
  window.alert('Handling form submission...');
}
```

Notice that a parameter named `e` has been added to the anonymous method
definition. The `e` parameter references an event object that's the form
submission event being handled. The `e` event object provides a method named
`preventDefault` that when called, prevents the event's default action.

> The `e` parameter is a `SyntheticEvent` object type. You'll learn more about
> this object type in just a bit.

## Using `this` in event handlers

Earlier, it was mentioned that the class property syntax (i.e.
`showAlert = () => { ... }`) was being used in combination with an arrow
function so that the `this` keyword could be reliably used within an event
handler method. To understand why this coding pattern is needed, let's stray
from the "happy path" and make things break.

Here's the example of a button click event handler again that correctly defines
the `showAlert` event handler method:

```js
// ./src/AlertButton.js

import React from 'react';

class AlertButton extends React.Component {
  showAlert = () => {
    window.alert('Button clicked!');
  }

  render() {
    return (
      <button type='button' onClick={this.showAlert}>Click Me</button>
    );
  }
}

export default AlertButton;
```

To see what `this` references in the `showAlert` event handler method, you can
replace the call to the `window.alert` method with a call to the `console.log`
method to print `this` to the console:

```js
showAlert = () => {
  console.log(this);
}
```

Now when the button is clicked, you'll see the `AlertButton` component printed
to the console:

![console alert button][console alert button]

To break the `this` keyword, you can rewrite the `showAlert` event handler
method to be a regular class method:

```js
showAlert() {
  console.log(this);
}
```

Now when the button is clicked, you'll see `undefined` printed to the console:

![console undefined][console undefined]

### Reviewing class methods and the `this` keyword

To understand why `this` is `undefined` when an event handler method is defined
as a class method, take a look at the following example:

```js
class Person {
  constructor() {
    this.name = 'Jane Smith';
  }

  displayName() {
    console.log(this.name);
  }
}

const p = new Person();

// Calling the method on the instance
// works as expected.
p.displayName(); // Jane Smith

// Storing a reference to the method in a variable
// and calling the method using the variable
// breaks the `this` keyword's implicit binding
// to the class instance.
const displayName = p.displayName;
displayName(); // TypeError: Cannot read property 'name' of undefined
```

The first time that the `displayName` method is called, it's called directly on
`p`, the instance of the `Person` class. "Jane Smith" is printed to the console
because the `this` keyword is implicitly bound to the instance of the class
allowing the `name` property on the instance to be found and passed to the
`console.log` method.

The second time that the `displayName` method is called, a reference to the
class method is stored in a variable and the method is called using the
variable. This breaks the `this` keyword's implicit binding to the instance of
the class (i.e. `p`) resulting in the `TypeError` because `this` is `undefined`.

The `bind` method can be used to _explicitly_ bind the `displayName` class
method to the `p` class instance. The [`bind` method][mdn bind] returns a
function that's bound to the passed in object. Now the `displayName` variable
can be successfully called to display the person's name in the console:

```js
const displayName = p.displayName.bind(p);
displayName(); // Jane Smith
```

Even though this is a simple, contrived example, it accurately models what is
happening with the React component's event handler method. When adding an event
listener to a React element, you associate an event handler method with the
element event you want to listen for by passing a reference to the event handler
method:

```jsx
<button type='button' onClick={this.showAlert}>Click Me</button>
```

Passing the reference to the `this.showAlert` class method to the `onClick`
attribute breaks the `this` keyword's implicit binding to the instance of the
class (i.e. the instance of the `AlertButton` component).

The `bind` method, just like was done with the above `Person` class example, can
be used in a React component `constructor` method to explicitly bind event
handler methods to the component instance:

```js
import React from 'react';

class AlertButton extends React.Component {
  constructor() {
    super();

    this.showAlert = this.showAlert.bind(this);
  }

  showAlert() {
    console.log(this);
  }

  render() {
    return (
      <button type='button' onClick={this.showAlert}>Click Me</button>
    );
  }
}

export default AlertButton;
```

### Understanding the class property + arrow function pattern

To review, the pattern of defining an event handler method using a class
property in combination with an arrow function looks like this:

```js
showAlert = () => {
  console.log(this);
}
```

What's not apparent from this example is that the class property syntax, which
allows you to define class properties (or fields as they're sometimes called)
_outside_ of the `constructor` method, is an experimental syntax. Experimental
JavaScript syntax is syntax that's been proposed to add to
[ECMAScript][ecmascript] (the scripting-language specification for JavaScript)
but hasn't officially been added to the language specification yet.

While some browsers support class property syntax, other browsers don't. To
reliably use class property syntax, your JavaScript code needs to be converted,
or _transpiled_, into syntax that's broadly supported by browsers.

When using Create React App to create a React application, Babel is configured
on your behalf to transpile your JavaScript code (including JSX) into a version
of JavaScript that's broadly supported. When you run the application using
`npm start`, the `AlertButton` component is transpiled by Babel into the
following code:

```js
class AlertButton extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(...args) {
    super(...args);

    this.showAlert = () => {
      console.log(this);
    };
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      onClick: this.showAlert,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 7
      }
    }, "Click Me");
  }
}
```

Notice how the `showAlert` class property definition has been moved into the
`constructor` method? The value of the `showAlert` property is set to the arrow
function that defines the event handler method. Since arrow functions don't have
their own context, the event handler method inherits the surrounding lexical
context, which is the `constructor` method's context. That results in the `this`
keyword within the arrow function referring to the instance of the component
that's being initialized by the `constructor` method.

An arrow function's inherited context can't be lost or changed. When the event
handler method is called later on, when the button is clicked, the `this`
keyword remains correctly bound to the instance of the component.

> You'll learn more about transpilation and Babel in a future lesson. To read
> more about Babel and its support for the proposed class property syntax, see
> [this page][babel class properties].

### Pick an approach and be consistent

Feel free to use either approach, class properties and arrow functions or the
`bind` method, to ensure that the `this` keyword can be reliably used in your
event handler methods. Just be sure that whatever approach you or your team has
decided to use, that you follow it consistently. Doing so will make it easier to
read and maintain your code.

## The `SyntheticEvent` object

Earlier, an example was shown on how to prevent the default form submission from
occurring when handling the `onSubmit` form event:

```js
// ./src/NoDefaultSubmitForm.js

import React from 'react';

class NoDefaultSubmitForm extends React.Component {
  submitForm = (e) => {
    e.preventDefault();
    window.alert('Handling form submission...');
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <button>Submit</button>
      </form>
    );
  }
}

export default NoDefaultSubmitForm;
```

Notice that the `submitForm` event handler method defines a parameter named `e`
which references an event object that's the form submission event being handled.

In a React application, event objects are not the native browser event object
types that you'd normally interact with when handling events using JavaScript in
the browser. Instead, they're instances of the [React `SyntheticEvent` object
type][react syntheticevent object type].

An instance of the React `SyntheticEvent` object type wraps the native browser
event object to normalize events across browser vendors. The `SyntheticEvent`
object type follows the [W3C spec for UI events][w3c ui events], so you can use
synthetic event objects just like you would if they were the native browser
event objects. This gives you, the developer, a consistent, predictable
experience working with events without having to worry about which browser your
application is running within.

For your reference, the `SyntheticEvent` object type has the following
attributes:

```
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
```

Notice that a synthetic event object defines a property named `nativeEvent`.
This property gives you access to the underlying native browser event, though
you'll rarely (if ever) need to access it.

## What you learned

In this article, you learned how to:

* Add event listeners to elements;
* Prevent event default behavior;
* Safely use the `this` keyword within event handlers; and
* Describe what the React `SyntheticEvent` object is and the role it plays in
  handling events.

[react events]: https://reactjs.org/docs/events.html#supported-events
[console alert button]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-class-components/assets/event-handling-console-alert-button.png
[console undefined]: images/event-handling-console-undefined.png
[mdn bind]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
[ecmascript]: https://en.wikipedia.org/wiki/ECMAScript
[babel class properties]: https://babeljs.io/docs/en/next/babel-plugin-proposal-class-properties.html
[react syntheticevent object type]: https://reactjs.org/docs/events.html
[w3c ui events]: https://www.w3.org/TR/2019/WD-uievents-20190530/
