# React Class Components
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Hello class components!](#hello-class-components)
  - [Setting and accessing props](#setting-and-accessing-props)
  - [Legacy class component syntax](#legacy-class-component-syntax)
- [Stateful components](#stateful-components)
  - [What is state?](#what-is-state)
  - [When to use state](#when-to-use-state)
- [Initializing state](#initializing-state)
  - [Using the React Developer Tools to view a component's state](#using-the-react-developer-tools-to-view-a-components-state)
- [Updating state](#updating-state)
  - [Don't modify state directly](#dont-modify-state-directly)
- [Properly updating state from the previous state](#properly-updating-state-from-the-previous-state)
- [Providing default values for props](#providing-default-values-for-props)
- [What you learned](#what-you-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________


As you've learned the fundamentals of React, you've seen how to use functions to
create components to develop the user interface for a frontend application.
Unsurprisingly, as with most things related to software development, there's
more than one way to create components in React.

When you finish this article, you should be able to:

* Create a React component using ES2015 class syntax;
* Describe when it's appropriate to use a class component;
* Initialize and update state within a class component; and
* Provide default values for props.

## Hello class components!

Up to this point, you've written components using functions:

```js
// ./src/Message.js

import React from 'react';

const Message = (props) => {
  return (
    <div>{props.text}</div>
  );
};

export default Message;
```

But React also allows you to create components using ES2015 classes. Here's the
above function component rewritten as a class component:

```js
// ./src/Message.js

import React from 'react';

class Message extends React.Component {
  render() {
    return (
      <div>{this.props.text}</div>
    );
  }
}

export default Message;
```

Every class component must extend (i.e. inherit) from `React.Component` and have
a `render` method that returns the element(s) to render for the component.

Class components are used just like function components:

```js
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

ReactDOM.render(
  <React.StrictMode>
    <Message text='Hello world!' />
  </React.StrictMode>,
  document.getElementById('root')
);
```

From just the above JSX code in the `index.js` file, you can't tell if the
`<Message>` component is written as a function or class component. Which
approach that's used is an internal implementation detail of the component. In
fact, you can switch back and forth between the two approaches provided that you
aren't using a feature that's only available in class components (more about
this in just a bit).

### Setting and accessing props

Notice from this example of using the `Message` class component that props are
set on class components just like you do with function components:

```js
<Message text='Hello world!' />
```

To access props within a class component, use the `this.props` property:

```js
class Message extends React.Component {
  render() {
    return (
      <div>{this.props.text}</div>
    );
  }
}
```

If your class component defines a `constructor` method that needs access to
props, define a `props` parameter:

```js
class Message extends React.Component {
  constructor(props) {
    super(props);

    // TODO Initialize state, etc.
  }

  render() {
    return (
      <div>{this.props.text}</div>
    );
  }
}
```

Just be sure to call the `super` method and pass in the `props` parameter!
Failing to do so will result in the following error:

```
ReferenceError: Must call super constructor in derived class before accessing
'this' or returning from derived constructor
```

> Remember, a component, whether it's a function or class component, should
> never change its own props.

### Legacy class component syntax

In the early days of React, before using ES2015 classes was commonplace,
components were usually created using the `React.createclass` function. You'll
still sometimes see this syntax in the wild. If in the future you ever find
yourself needing to create a component using the `React.createclass` function
when targeting newer versions of React, you'll need to install a separate React
module named [`create-react-class`][create-class].

## Stateful components

So far, the above example class component behaves exactly as its function
component counterpart. This might leave you wondering why you'd want or need to
create a class component.

**One of the two reasons why you would use a Class component over a Function
component is to add and manage local or internal state to your component. The 
second main reason to use a Class component is to use a component's
lifecycle methods.** The following sections will focus on how to add and manage
a component's state. You'll learn more about a component's lifecycle (and the 
associated component lifecycle methods) later in a future reading.

### What is state?

In contrast to props which are provided by the consumer or caller of the
component, state is data that's internal to a component. State is owned by the
component where it's defined and used. That's why we say it's "internal" or
"local" to that component. Whereas props are not to be changed by a component,
state is intended to be updated or mutated (you'll see how to update state in
just a bit). Together, props and state represent the data that's used to
determine how the component should behave and render.

### When to use state

State should only be used when it's absolutely necessary. If a bit of data is
never going to change or if it is needed across the entire application, use
props instead.

When you're just learning React, it can be challenging to know when it's okay to
use state and when it's not. State is often used when creating components that
retrieve data from APIs or render forms. You'll see examples of those kinds of
components later in this lesson. To start, we'll look at simple, contrived
example of using state in just a bit.

> Function components are the simplest way to declare a component. If a
> component doesn't need to use state or lifecycle methods, it should be written
> as a function component. A new feature in React, [hooks][react hooks], levels
> the playing field between function and class components, so that everything
> you can do in a class component can now be done with function components.
> You'll learn about React hooks in a future lesson.

## Initializing state

When creating a stateful class component, you can use a class `constructor`
method to initialize the `this.state` object.

Here's a `RandomQuote` component that initializes two state properties,
`this.state.quotes` and `this.state.currentQuoteIndex`, within its `constructor`
method:

```js
// ./src/RandomQuote.js

import React from 'react';

class RandomQuote extends React.Component {
  constructor() {
    super();

    const quotes = [
      'May the Force be with you.',
      'There\'s no place like home.',
      'I\'m the king of the world!',
      'My mama always said life was like a box of chocolates.',
      'I\'ll be back.',
    ];

    this.state = {
      quotes,
      currentQuoteIndex: this.getRandomInt(quotes.length),
    };
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    return (
      <div>
        <h2>Random Quote</h2>
        <p>{this.state.quotes[this.state.currentQuoteIndex]}</p>
      </div>
    );
  }
}

export default RandomQuote;
```

Notice in the `render` method, that the state properties are being accessed
using `this.state.quotes` and `this.state.currentQuoteIndex`.

If you're following along, be sure to update your application's entry point to
import and render the `RandomQuote` component:

```js
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import RandomQuote from './RandomQuote';

ReactDOM.render(
  <React.StrictMode>
    <RandomQuote />
  </React.StrictMode>,
  document.getElementById('root')
);
```

If you run your application (i.e. `npm start`) and view it in the browser,
you'll one of the five quotes displayed. Refreshing the page will display a new
random quote.

> Sometimes the same quote will be displayed more than once in a row. You'll see
> in a bit how to fix that bug.

### Using the React Developer Tools to view a component's state

Assuming you have the [React Developer Tools][react developer tools] installed,
open up your browser's developer tools and view the "Components" tab. On the
left, you can select the `RandomQuote` component to view its current props and
state values on the right.

![init state][init state]

## Updating state

Remember earlier when we said that state should only be used if the data is
going to change? Currently, the current quote index doesn't change after it's
been initialized in the `constructor` method. Using state to track this value
would make more sense if there was a way to trigger the component to _update_
the current quote index.

To do this, add a `<button>` element just below the `<p>` element with the
following attributes and content:

```jsx
<button type='button' onClick={this.changeQuote}>Change Quote</button>
```

Notice the `onClick={this.changeQuote}` bit? This is how you add an event
listener for the `onclick` event. `this.changeQuote` is the event handler method
and `onClick` is the event to listen for.

> When adding event listeners, be sure to camelCase the event name (i.e.
> `onClick` instead of `onclick`) and pass a reference to the event handler
> method instead of calling it (i.e. `this.changeQuote` instead of
> `this.changeQuote()`). You'll learn more about handling events later in this
> lesson.

Now add the `changeQuote` event handler method to the `RandomQuote` class:

```js
changeQuote = () => {
  const newIndex = this.getRandomInt(this.state.quotes.length);

  this.setState({
    currentQuoteIndex: newIndex,
  });
}
```

> Did you notice the slightly odd looking class property syntax (i.e.
> `changeQuote = () => { ... }`) that's being used to define the `changeQuote`
> method? Using this experimental syntax for defining a class property in
> combination with an arrow function ensures that you can reliably use the
> `this` keyword within the method. You'll learn more about this coding pattern
> for defining event handlers later in this lesson.

The `changeQuote` event handler calls the `this.getRandomInt` method to get a
new random integer and then calls the `this.setState` method to update the
component's state. The `this.setState` method accepts an object literal
containing the state properties to update.

After updating the state, React re-renders the component and displays the new
quote (provided that the current quote index actually changed). Because calling
the `this.setState` method triggers a re-render, it should not be called from
within the `render` method, as that would trigger an infinite loop.

Notice that the object literal passed into the `this.setState` method only
contains the state property that needs to be updated. The `this.setState` method
merges state updates into the current state object, so you only need to provide
the state properties that need to be updated.

Now, instead of refreshing the page, you can click the "Change Quote" button to
display a new random quote!

For your reference, here's the updated `RandomQuote` component:

```js
// ./src/RandomQuote.js

import React from 'react';

class RandomQuote extends React.Component {
  constructor() {
    super();

    const quotes = [
      'May the Force be with you.',
      'There\'s no place like home.',
      'I\'m the king of the world!',
      'My mama always said life was like a box of chocolates.',
      'I\'ll be back.',
    ];

    this.state = {
      quotes,
      currentQuoteIndex: this.getRandomInt(quotes.length),
    };
  }

  changeQuote = () => {
    const newIndex = this.getRandomInt(this.state.quotes.length);

    this.setState({
      currentQuoteIndex: newIndex,
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    return (
      <div>
        <h2>Random Quote</h2>
        <p>{this.state.quotes[this.state.currentQuoteIndex]}</p>
        <button type='button' onClick={this.changeQuote}>Change Quote</button>
      </div>
    );
  }
}

export default RandomQuote;
```

### Don't modify state directly

You should always use the `this.setState` method to update state rather than
setting the `this.state` property directly:

```js
changeQuote = () => {
  const newIndex = this.getRandomInt(this.state.quotes.length);

  // Don't set the `this.state` property directly
  // anywhere outside of the `constructor` method!
  // this.state = {
  //   currentQuoteIndex: newIndex,
  // };

  // Always use the `this.setState` method to update state.
  this.setState({
    currentQuoteIndex: newIndex,
  });
}
```

Reassigning `this.state` alone won't trigger re-rendering, leaving your
component out of sync.

If you used Create React App to create your application and your application is
currently running (using the `npm start` command), you'll receive a warning in
the terminal if you reassign `this.state` outside of the constructor:

```sh
Do not mutate state directly. Use setState()  react/no-direct-mutation-state
```

## Properly updating state from the previous state

When testing the `RandomQuote` component, you might have noticed that sometimes
the same quote will display more than once. This is occurring because the
`this.getRandomInt` method is returning a random integer that's the same as
the current quote index value. We can fix this bug by calling the
`this.getRandomInt` method until we get a random integer that's different from
the current quote index value.

On the surface, this appears to be simple fix--just use a loop to call the
`this.getRandomInt` method until you get a random integer that's different from
the current quote index:

```js
changeQuote = () => {
  const { quotes, currentQuoteIndex } = this.state;

  let newIndex = -1;

  do {
    newIndex = this.getRandomInt(quotes.length);
  } while (newIndex === currentQuoteIndex);

  this.setState({
    currentQuoteIndex: newIndex,
  });
}
```

The problem with the above solution is that it doesn't take into account that
state updates are handled asynchronously by React. When the `currentQuoteIndex`
value is retrieved from state (at the start of the method block), you're not
guaranteed that it's the latest value. There could be a state update that hasn't
been applied yet.

To safely update state based upon the previous state, pass an anonymous method
to the `this.setState` method (instead of an object literal) that defines two
parameters, `state` and `props`, and returns an object literal containing the
state properties to update. The `state` and `props` parameters give you safe,
predictable access to the previous state and prop values:

```js
changeQuote = () => {
  this.setState((state, props) => {
    const { quotes, currentQuoteIndex } = state;

    let newIndex = -1;

    do {
      newIndex = this.getRandomInt(quotes.length);
    } while (newIndex === currentQuoteIndex);

    return {
      currentQuoteIndex: newIndex,
    };
  });
}
```

Now, if you retest your application, clicking the "Change Quote" button will
display a different random quote every time!

## Providing default values for props

Currently, the list of quotes doesn't change once it's initialized in the
`constructor` method:

```js
constructor() {
  super();

  const quotes = [
    'May the Force be with you.',
    'There\'s no place like home.',
    'I\'m the king of the world!',
    'My mama always said life was like a box of chocolates.',
    'I\'ll be back.',
  ];

  this.state = {
    quotes,
    currentQuoteIndex: this.getRandomInt(quotes.length),
  };
}
```

Given this, it makes more sense for the quotes to be a prop value. Changing the
quotes to a prop would also give the consumer or caller of the `RandomQuote`
component the ability to customize the list of quotes.

Here's an updated version of the `RandomQuote` component that defines the list
of quotes as a prop:

```js
// ./src/RandomQuote.js

import React from 'react';

class RandomQuote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuoteIndex: this.getRandomInt(props.quotes.length),
    };
  }

  changeQuote = () => {
    this.setState((state, props) => {
      const { currentQuoteIndex } = state;
      const { quotes } = props;

      let newIndex = -1;

      do {
        newIndex = this.getRandomInt(quotes.length);
      } while (newIndex === currentQuoteIndex);

      return {
        currentQuoteIndex: newIndex,
      };
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    return (
      <div>
        <h2>Random Quote</h2>
        <p>{this.props.quotes[this.state.currentQuoteIndex]}</p>
        <button type='button' onClick={this.changeQuote}>Change Quote</button>
      </div>
    );
  }
}

export default RandomQuote;
```

Notice that the `constructor` method now defines a `props` parameter and passes
that parameter into the `super` method call:

```js
constructor(props) {
  super(props);

  this.state = {
    currentQuoteIndex: this.getRandomInt(props.quotes.length),
  };
}
```

The `changeQuote` and `render` methods were also updated to reference the quotes
using `this.props.quotes` instead of `this.state.quotes`.

Now, in the `index.js` file, the quotes to randomly display can be passed into
the `RandomQuote` component:

```js
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import RandomQuote from './RandomQuote';

const quotes = [
  'Toto, I\'ve a feeling we\'re not in Kansas anymore.',
  'Here\'s looking at you, kid.',
  'There\'s no crying in baseball!',
  'Elementary, my dear Watson.',
  'Rosebud.',
];

ReactDOM.render(
  <React.StrictMode>
    <RandomQuote quotes={quotes} />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Unfortunately, now the consumer or caller of the component _must_ set the
`quotes` prop or the component will throw an error. You can retain the previous
behavior by defining a default value for the `quotes` prop using the
`defaultProps` static property:

```js
import React from 'react';

class RandomQuote extends React.Component {
  // Code removed for brevity.
}

RandomQuote.defaultProps = {
  quotes: [
    'May the Force be with you.',
    'There\'s no place like home.',
    'I\'m the king of the world!',
    'My mama always said life was like a box of chocolates.',
    'I\'ll be back.',
  ],
};

export default RandomQuote;
```

The default `quotes` prop value will be used if the consumer or caller of the
`RandomQuote` component doesn't provide a value for the `quotes` prop.

Now the `RandomQuote` component can be used without having to provide the
`quotes` prop:

```js
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import RandomQuote from './RandomQuote';

ReactDOM.render(
  <React.StrictMode>
    <RandomQuote />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## What you learned

In this article, you learned how to:

* Create a React component using ES2015 class syntax;
* Describe when it's appropriate to use a class component;
* Initialize and update state within a class component; and
* Provide default values for props.

[create-class]: https://reactjs.org/docs/react-without-es6.html
[react hooks]: https://reactjs.org/docs/hooks-intro.html
[init state]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-class-components/assets/react-class-components-init-state.png
[react developer tools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
