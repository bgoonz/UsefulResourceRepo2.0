# React Context
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Using Context](#using-context)
  - [Creating a Context](#creating-a-context)
  - [Adding a Provider to the App component](#adding-a-provider-to-the-app-component)
  - [Adding a Consumer to a nested component](#adding-a-consumer-to-a-nested-component)
- [Updating the Context from a nested component](#updating-the-context-from-a-nested-component)
- [What you learned](#what-you-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

At this point, you know how to manage a component's state and pass information
down an application's component tree by threading props from parent components
to child components. Think of how tedious it could be to pass down information,
like current user data or a UI theme, to every component in an application.
Instead of threading the information as props from a parent component to its
children and grandchildren, you can share information with any of your
application's components by using React Context!

[React Context] gives you a way to pass data through the component tree without
having to manually thread props. Context gives developers a convenient way to
share and update "global" data across a React application. Now it's time to dive
into application-wide data management!

When you finish this article, you should be able to:

* Use React Context to pass down global information
* Create a Provider wrapper component to set a default context
* Create a Consumer wrapper component to allow child components to subscribe to
  a global context
* Use the `static contextType` property to access the global context
* Update the global context from a nested component

> In a future lesson, you'll learn about Redux, a common approach for managing
> global state in React applications. The React Context can be thought of as a
> lightweight alternative to using Redux.

## Using Context

In this demo, you'll create a simple React app that uses Context to allow users
to choose what images/images/images/images/puppy picture to render.

Begin by cloning this starter React app with a folder of `pups` photos!

```sh
git clone https://github.com/appacademy-starters/react-context-pups-starter.git
```

Now let's import the pup photos into your `App.js` file and render the `speedy`
pup:

```js
// App.js
import React from 'react';
import speedy from './pups/speedy-pup.jpg'
import banana from './pups/banana-pup.jpg'
import sleepy from './pups/sleepy-pup.jpg'

const App = () => (
  <div id="app">
    <img src={speedy} alt="pup" />
  </div>
);

export default App;
```

Start your application is you'll see a huge and super happy pup that's running!
Take a moment to update your `index.css` file so that your pup photo isn't so
large:

```css
/* index.css */
body {
  padding: 50px;
}

#app {
  display: flex;
  flex-direction: column;
  width: 500px;
}

img {
  width: 500px;
}
```

Being able to render a pup photo is great, but what about giving your users the
chance to select a pup photo to render? Let's allow your users to select a pup
photo through a form by passing information through Context!

### Creating a Context

You can use the [React.createContext] method to create a `PupContext`. In order
to create a context, you can simply import the `createContext()` function from
`react`, invoke the function to create a Context object, and export the Context!

```js
// PupContext.js
import { createContext } from 'react';

const PupContext = createContext();

export default PupContext;
```

Note that if you invoke the `createContext` method with arguments, those
arguments will be set as the default context. In the next step, you'll set up a
component's state to use as the default context.

### Adding a Provider to the App component

The _Provider_ component expects `value` prop to set the context information
passed throughout your application. You need to wrap your child components with
provider component tags to give them access to the context. The context `value`
will include information to pass to child components by using context _Consumer_
components. As a reminder, Consumer components must always be nested under
Provider components because the Provider must render first (parent components
always render before children components).

```jsx
<MyContext.Provider value={/* some value */}>
  <ChildComponent />
</MyContext.Provider>
```

Now you'll use [Context.Provider] to create a wrapper component to set the
`value` of your `PupContext`! Let's go into your `App.js` file to create an
`AppWithContext` wrapper component that will pass a `puppyType` prop to
determine what image your `App` component renders.

Your wrapper component should set up a default `puppyType` state in its
constructor. Choose one of your imported pup photos (`banana`, `sleepy`, or
`speedy`) to set as the default state.

```js
this.state = {
  puppyType: speedy,
};
```

Note that you should set the `puppyType` as `speedy` instead of `"speedy"`
(without quotations), or else you'd be setting a string to be the default state,
instead of a default pup photo to be rendered.

Now let's visit the `AppWithContext` component's `render()` method! You'll want
to render the `App` component wrapped with `<PupContext.Provider>` tags to give
`App` and all of its children components access to the `PupContext`:

```js
render() {
  return (
    <PupContext.Provider value={}>
      <App />
    </PupContext.Provider>
  );
}
```

Remember that provider components expect to receive a `value` prop. The `value`
prop will hold the context information that will be passed throughout the
application. Set the provider component's `value` prop to be the `state` of your
`AppWithContext` component. As you know, a component re-renders when its state
is updated. This is how you'll update an application's context from nested
components. Your `AppWithContext` component's `render()` method should look
something like this:

```js
render() {
  return (
    <PupContext.Provider value={this.state}>
      <App />
    </PupContext.Provider>
  );
}
```

Since you are rendering the pup image from `App`, you can pass in the wrapper
component's `puppyType` state as a prop:

```jsx
<App puppyType={this.state.puppyType} />
```

Now you can refactor your `App` component to use its `puppyType` prop to render
a specific pup photo!

```js
const App = ({ puppyType }) => (
  <div id="app">
    <PupForm />
    <img src={puppyType} alt="pup" />
  </div>
);
```

Don't forget to update the `export` statement at the bottom of your `App.js`
file. You'll want to export the `AppWithContext` component instead of the `App`
component. Don't worry about changing the `App` import statement in your
`index.js` file. Since you are using `export default`, only the component
explicitly specified in your file's export statement will be exported from the
file. At this point, your full `App.js` file should look something like this:

```js
// App.js
import React from 'react';
import PupContext from './PupContext';
import banana from './pups/banana-pup.jpg'
import sleepy from './pups/sleepy-pup.jpg'
import speedy from './pups/speedy-pup.jpg'

const App = ({ puppyType }) => (
  <div id="app">
    <img src={puppyType} alt="pup" />
  </div>
);

class AppWithContext extends React.Component {
  constructor() {
    super();
    this.state = {
      puppyType: speedy,
    };
  }

  render() {
    return (
      <PupContext.Provider value={this.state}>
        <App puppyType={this.state.puppyType} />
      </PupContext.Provider>
    );
  }
}

export default AppWithContext;
```

Now start your server and make sure that your cute pup photo is rendering!

### Adding a Consumer to a nested component

Before setting up a consumer, let's create a nested child component that will
consume your `PupContext`! Create a `PupForm` component that will be be rendered
as a child of your `App` component. Begin by rendering a dropdown menu for users
to choose which pup photo to render in the app. Feel free to use the `PupForm`
component defined below:

```js
// PupForm.js
import React from 'react';
import banana from './pups/banana-pup.jpg';
import sleepy from './pups/sleepy-pup.jpg';
import speedy from './pups/speedy-pup.jpg';

class PupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPup: 'select', // Set the default select option
    };
  }

  // Update state with the user's dropdown selection
  updateSelection = (e) => {
    this.setState({ selectedPup: e.target.value });
  }

  render() {
    return (
      <form>
        <select
          name="pup"
          onChange={this.updateSelection}
          value={this.state.selectedPup}>

          <option value="select">Select a pup!</option>
          <option value={speedy}>Speedy Pup</option>
          <option value={banana}>Banana Pup</option>
          <option value={sleepy}>Sleepy Pup</option>
        </select>
        <button onClick={/* TODO: Set up the click handler */}>
          Submit
        </button>
      </form>
    );
  }
}
```

As you can see, the `PupForm` has a default `selectedPup` state that will set
the default select option to be "Select a pup!". There is also an
`updateSelection` method that listens for change events in the dropdown menu to
update the `selectedPup` slice of state. Now that you have a basic dropdown menu
set up, it's time to create a consumer wrapper so that the `PupForm` component
can have access to the `PupContext`!

You'll want to use a [Context.Consumer] component to wrap your `PupForm`
component, this way the wrapped component can subscribe to context changes. Note
that the `Context.Consumer` component expects a function as a child:

```jsx
<MyContext.Consumer>
  {(value) => <Component value={value} />}
</MyContext.Consumer>
```

The function has access to the `value` prop passed into the `Context.Provider`.
The `value` prop can then be passed as a render prop into the wrapped component.

Import your `PupContext` into your `PupForm.js` file and use the
`Context.Consumer` component to create a wrapper for your `PupForm` component
like so:

```js
const PupFormWithContext = () => {
  return (
    <PupContext.Consumer>
      {(value) => <PupForm value={value} />}
    </PupContext.Consumer>
  );
};
```

Just as you did with your `AppWithContext` component, you'll want to export the
`PupFormWithContext` wrapper component in your `PupForm.js` file.

```js
export default PupFormWithContext;
```

Now update your `App` component to render the `PupFormWithContext` component:

```js
const App = ({ puppyType }) => (
  <div id="app">
    <PupFormWithContext />
    <img src={puppyType} alt="pup" />
  </div>
);
```

Take a moment to create a `handleClick` function for your submit button's
`onClick` listener. For now, simply prevent the default re-render of the
submitted form and console log your component's props so that you can examine
the `value` prop passed into the `PupForm` component:

```js
handleClick = (e) => {
  e.preventDefault();
  console.log(this.props);
}
```

Open up your developer tools and click the submit button! You should see the
context `value` prop logged in your console:

```sh
{value: {...}}
```

If you expand the prop, you'll then see the `puppyType`, which is the default
context set by your `AppWithContext` component's state!

Note that you can also use the `static contextType` property to access context
value in class components. Take a moment to set the `contextType` property to
your `PupContext` in the `PupForm` class component:

```js
// Rest of file not shown
class PupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPup: 'select',
    };
  }

  static contextType = PupContext;
// Rest of file not shown
```

Now update your `handleClick` method to console log `this.context` instead of
`this.props`:

```js
handleClick = (e) => {
  e.preventDefault();
  console.log(this.context);
}
```

Click the submit button to fire your `handleClick` method and you should see the
context `value` object logged in your console:

```sh
{puppyType: "/static/media/speedy-pup.d706601f.jpg"}
```

Note that the `static contextType` property only works for class components.
Because of this, you'll focus on using `Context.Consumer` components to manually
pass render props.

## Updating the Context from a nested component

Now you can access the context value, but what about updating the context value?
It's a common need to update the global context from a child consumer component.
For example, if your Context is providing the UI theme or language, you might
have a child component that consumes the context and allows a user to select
their preferred theme or language.

Once a user makes a selection, your application will need a way to update the
context value. From the context update fired from the child component, your
application will re-render all of the nested components that depend on that
data.

Let's define an `updateContext` method in your `AppWithContext` component! This
method will take care of updating the `puppyType` slice of state:

```js
updateContext = (puppyType) => {
  this.setState({ puppyType });
}
```

You'll then set a reference to the method in the state so that a nested
component (with access to context) can invoke the `updateContext` method to
update the `AppWithContext` state (and therefore the global context)!

```js
this.state = {
  puppyType: speedy,
  updateContext: this.updateContext,
};
```

At this point, your complete `AppWithContext` component should look something
like this:

```js
class AppWithContext extends React.Component {
  constructor() {
    super();
    this.state = {
      puppyType: speedy,
      updateContext: this.updateContext,
    };
  }

  updateContext = (puppyType) => {
    this.setState({ puppyType });
  }

  render() {
    return (
      <PupContext.Provider value={this.state}>
        <App puppyType={this.state.puppyType} />
      </PupContext.Provider>
    );
  }
}
```

Since your `value` prop is taking in the component's `state`, this means that
your `updateContext` method is also available to any components with access to
context. Let's revisit the `PupFormWithContext` component! Update the wrapper
component to pass the `updateContext` method as a render prop to the `PupForm`:

```js
const PupFormWithContext = () => {
  return (
    <PupContext.Consumer>
      {(value) => <PupForm updateContext={value.updateContext} />}
    </PupContext.Consumer>
  );
};
```

Now if you update your `handleClick` method to console log both `this.props` and
`this.context`, you'll see the `updateContext` method you just created and
passed down!

```js
handleClick = (e) => {
  e.preventDefault();
  console.log(this.props);
  console.log(this.context);
}
```

This means that you can invoke either `this.props.value.updateContext` or
`this.context.updateContext` to update the global context. Take a moment to
refactor your `handleClick` method to invoke the `updateContext` method by
passing in the `selectedPup` from the `PupForm` state:

```js
handleClick = (e) => {
  e.preventDefault();
  this.props.value.updateContext(this.state.selectedPup);
}
```

Now you should be able to use the dropdown menu to select a pup photo to render!
Congratulations, you now know how to use React Context to share and update
global information across your application!

## What you learned

In this article, you learned how to:

* Create a Context to share global information with an application; and
* Use the `Context.Provider` to create a wrapper and set the default context;
  and
* Use the `Context.Consumer` to create a wrapper that shares the global context
  through render props; and
* Access the global context through the `contextType` property; and
* Pass a method to a nested component to update the global context.

[React Context]: https://reactjs.org/docs/context.html

[React.createContext]: https://reactjs.org/docs/context.html#reactcreatecontext

[Context.Provider]: https://reactjs.org/docs/context.html#contextprovider

[Context.Consumer]: https://reactjs.org/docs/context.html#contextconsumer
