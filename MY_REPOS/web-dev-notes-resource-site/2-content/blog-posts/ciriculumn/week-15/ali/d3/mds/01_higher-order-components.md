
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Higher-Order Components

In React, [higher-order components (HOCs)][react-docs-higher-order-components]
are a pattern for reusing component logic. Ultimately, higher order components
allow you to dynamically generate wrapper components.

Before React existed, developers leveraged JavaScript's support for functions as
first-class objects, meaning that functions can be treated just like any other
data type (i.e. stored in a variable, object, or array, passed as an argument to
a function, or returned from a function). Understanding what higher-order
functions are and how they work will help you to understand and use higher-order
components in React.

When you finish this article, you should be able to:

* Describe what a higher-order component (HOC) is
* Write a higher-order component (HOC) that accepts a component as an argument
  and returns a new component

## Reviewing higher-order functions

Functions that operate on other functions, either by receiving them as arguments
or returning them, are called **higher-order functions**. Said differently,
higher-order functions are functions that:

* Define and return functions;
* Accept callbacks as arguments;
* Or do both.

### Using closures with higher-order functions

A [**closure**][mdn-closure], also known as *lexical scoping*, is a function
that uses **free variables**, variables defined outside of its scope. Closures
come in handy when writing higher-order functions. Consider the following code:

```js
const calculator = function (operationCb) { // high-order function
  return function (op1, op2) { // closure
    console.log(`calling with ${op1} ${op2}`);
    const result = operationCb(op1, op2);
    console.log(`equals ${result}`);
  };
}

const addition = function (n1, n2) { // callback
  console.log(`${n1} + ${n2}`);
  return n1 + n2;
}

const adder = calculator(addition);
adder(1, 2);
// calling with 1 2
// 1 + 2
// equals 3
```

The `calculator` function receives a callback as an argument (`operationCb`)
which is called in the anonymous function `calculator` returns. This return
value would not work if the inner function could not close over `operationCb`, a
variable defined outside of its scope.

### Defining higher-order functions with arrow functions

Arrow functions make it easy to write higher-order functions. The two examples
below illustrate the same function:

```js
// Without arrow functions (ES5):
function foo(arg1) {
  return function(arg2) {
    return function(arg3) {
      console.log(`${arg1} came before ${arg2} and ${arg3} came last`);
    };
  };
}

// With arrow functions (ES6):
const foo = arg1 => arg2 => arg3 => {
  console.log(`${arg1} came before ${arg2} and ${arg3} came last`);
};
```

Here's the earlier `calculator` function rewritten using arrow functions:

```js
const calculator = (operationCb) => (op1, op2) => {
  console.log(`calling with ${op1} ${op2}`);
  const result = operationCb(op1, op2);
  console.log(`equals ${result}`);
};
```

> **Note:** Remember, ES6 arrow functions, unlike normal JavaScript functions,
> are automatically bound to the context (`this`) that existed when they were
> defined. In other words, `this` means the same thing inside an arrow function
> that it does outside of it.

## Leveraging higher-order components (HOCs)

In the same way that higher-order functions can receive a function as an
argument and return a new function, [**higher-order components** or
**HOC**s][react-docs-higher-order-components] receive a React component as an
argument and return a new component.

### `ProtectedRoute` and `AuthRoute`

In the **React Twitter Lite** project, you created two HOCs to control what
pages users could see based upon their authentication status. The
`ProtectedRoute` HOC ensured that only logged users could view the Profile and
Home pages while the `AuthRoute` HOC prevented logged in users from viewing the
`Login` or `Registration` pages:

```js
export const ProtectedRoute = ({ component: Component, path, currentUserId, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        currentUserId ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
```

```js
export const AuthRoute = ({ component: Component, path, currentUserId, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        currentUserId ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
```

Notice how both components accept a component via the `component` parameter and
return a `Route` component (that renders the passed component via a `render`
prop).

## Using HOCs to keep code DRY

HOCs give React developers a powerful way to reuse component logic so that they
can keep their code DRY.

When learning about Redux container components, you might have noticed that the
`FruitManagerContainer` and `FarmerManagerContainer` components in the Fruit
Stand application contain the same `componentDidMount` and
`componentWillUnmount` lifecycle method implementations:

```js
// ./src/components/FruitManagerContainer.js

import React from 'react';
import store from '../store';
import {
  addFruit,
  addFruits,
  sellFruit,
  sellOut,
} from '../actions/fruitActions';
import FruitManager from './FruitManager';

class FruitManagerContainer extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = (fruit) => {
    store.dispatch(addFruit(fruit));
  }

  addBulk = (fruit) => {
    store.dispatch(addFruits(fruit));
  }

  sell = (fruit) => {
    store.dispatch(sellFruit(fruit));
  }

  sellAll = () => {
    store.dispatch(sellOut());
  }

  render() {
    const { fruit } = store.getState();
    const distinctFruit = Array.from(new Set(fruit)).sort();

    return (
      <FruitManager
        fruit={fruit}
        distinctFruit={distinctFruit}
        add={this.add}
        addBulk={this.addBulk}
        sell={this.sell}
        sellAll={this.sellAll} />
    );
  }
}

export default FruitManagerContainer;
```

```js
// ./src/components/FarmerManagerContainer.js

import React from 'react';
import store from '../store';
import { hireFarmer, payFarmer } from '../actions/farmersActions';
import FarmerManager from './FarmerManager';

class FarmerManagerContainer extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  pay = (id) => {
    store.dispatch(payFarmer(id));
  }

  hire = (name) => {
    store.dispatch(hireFarmer(name));
  }

  render() {
    const { farmers: farmersState } = store.getState();
    const farmers = Object.values(farmersState);

    return (
      <FarmerManager
        farmers={farmers}
        pay={this.pay}
        hire={this.hire} />
    );
  }
}

export default FarmerManagerContainer;
```

While the amount of duplicated code is currently relatively small, keep in mind
that **the approach of using the `forceUpdate` method to render the component
whenever state is updated in the store isn't optimal**. Calling `forceUpdate`
causes `render` to be called without first calling `shouldComponentUpdate`.

Ideally, each container component should contain logic to determine if the state
that it retrieves from the store has _actually changed_ before continuing with
rendering. Adding the code for this logic would increase the amount of code
duplicated in each container component.

### React-Redux `connect`

[React-Redux][react-redux], a library from the creators of [Redux][redux],
includes a higher-order component named `connect` that you can use to create
container components. Using `connect` frees you from having to manually create
the `FruitManagerContainer` and `FarmerManagerContainer` container components.
Using `connect` also eliminates boilerplate code so you can focus on what makes each
container unique: selecting specific slices of state from the store and writing
functions to dispatch specific actions. Even better, `connect` includes the
logic that's needed to optimize the rendering performance, only rendering when
the state retrieved from the store has _actually changed_.

>Over the next couple of articles, you'll learn how to use `connect` and the
>[React-Redux][react-redux] library.

### Writing a HOC for creating container components

Higher-order components like [React-Redux][react-redux] `connect`, while
extremely useful, can be confusing to understand. To help give you some insight
into the underlying implementation of the `connect` function, you can build a
your own _custom version_ of `connect` (albeit without the logic that's needed
to optimize rendering performance).

> Don't worry if you struggle to fully understand the following custom version
> of `connect`. It takes time and practice to get comfortable with the
> techniques that are used to create higher-order components. And remember,
> **you don't have to build your `connect` function!** Going forward, you'll use
> the well-maintained, highly optimized `connect` function provided by the
> [React-Redux][react-redux] library.

Consider the following _custom_ `connect` function:

```js
// ./src/connect.js

import React from 'react';
import store from './store';

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (
  class extends React.Component {
    render() {
      let stateProps = {};
      if (mapStateToProps) {
        stateProps = mapStateToProps(store.getState(), this.props);
      }

      let dispatchProps = {};
      if (mapDispatchToProps) {
        dispatchProps = mapDispatchToProps(store.dispatch, this.props);
      }

      const propsToSpread = Object.assign({}, this.props, stateProps, dispatchProps);

      return (
        <WrappedComponent {...propsToSpread} />
      );
    }

    componentDidMount() {
      this.unsubscribe = store.subscribe(() => {
        this.forceUpdate();
      });
    }
  
    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }
  }
);

export default connect;
```

The `connect` function is a higher-order component that returns a function. That
function returns an anonymous class component that wraps the component passed in
via the `WrappedComponent` parameter.

The anonymous class component is a "generic" container component that _connects_
`WrappedComponent` to the Redux store by:

* Defining the `componentDidMount` and `componentWillUnmount` lifecycle method
  implementations necessary for managing the subscription to the store to render
  `WrappedComponent` when state is updated; and
* Passing slices of state and functions to dispatch actions down to
  `WrappedComponent` using props.

### Comparing nested arrow functions to regular functions

As you saw earlier in this article, higher-order functions can be written using
arrow functions or regular functions. The `connect` higher-order function
can be written using arrow functions and implicit return statements:

```js
const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (
  class extends React.Component {
    // Code removed for brevity.
  }
);
```

Or can be rewritten using regular functions and explicit return statements:

```js
function connect(mapStateToProps, mapDispatchToProps) {
  return function(WrappedComponent) {
    return class extends React.Component {
      // Code removed for brevity.
    };
  };
};
```

The arrow function syntax, while concise, can be confusing to read.

### Dynamically setting component attributes

The `connect` function's `mapStateToProps` and `mapDispatchToProps` parameters
are both functions that are called within the anonymous class' `render` method:

```js
const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (
  class extends React.Component {
    render() {
      let stateProps = {};
      if (mapStateToProps) {
        stateProps = mapStateToProps(store.getState(), this.props);
      }

      let dispatchProps = {};
      if (mapDispatchToProps) {
        dispatchProps = mapDispatchToProps(store.dispatch, this.props);
      }

      // Code removed for brevity.
    }

    // Code removed for brevity.
  }
);
```

The Redux store's current state, retrieved using `store.getState`, is passed to
the `mapStateToProps` function and the store's `dispatch` method is passed to
the `mapDispatchToProps` function. The `mapStateToProps` and
`mapDispatchToProps` functions also receive the anonymous class component's
props (via `this.props`).

But what are the `mapStateToProps` and `mapDispatchToProps` functions exactly?
To answer that question, take a look at an example of using the `connect`
function to define the `FruitManagerContainer` component:

```js
// ./src/components/FruitManagerContainer.js

import connect from '../connect';
import {
  addFruit,
  addFruits,
  sellFruit,
  sellOut,
} from '../actions/fruitActions';
import FruitManager from './FruitManager';

const mapStateToProps = (state) => ({
  fruit: state.fruit,
  distinctFruit: Array.from(new Set(state.fruit)).sort(),
});

const mapDispatchToProps = (dispatch) => ({
  add: (fruit) => dispatch(addFruit(fruit)),
  addBulk: (fruit) => dispatch(addFruits(fruit)),
  sell: (fruit) => dispatch(sellFruit(fruit)),
  sellAll: () => dispatch(sellOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FruitManager);
```

`mapStateToProps` is a function that accepts store's current state and returns
an object that maps state data to one or more properties. `mapDispatchToProps`
is also a function, but it accepts the store's `dispatch` method and returns an
object whose properties are set to functions that can be called dispatch actions
to the store.

In the `connect` function, `Object.assign` is then used to combine the
`stateProps` and `dispatchProps` objects with `this.props` (the anonymous class
component's props):

```js
const propsToSpread = Object.assign({}, this.props, stateProps, dispatchProps);
```

Then the properties defined on the `propsToSpread` object become props on
`WrappedComponent` using JSX spread attribute syntax (`...`):

```js
return (
  <WrappedComponent {...propsToSpread} />
);
```

Within the `FruitManager` component (the component that the `connect` function's
`WrappedComponent` is wrapping), parameter destructuring is used to reference
the props provided by the `mapStateToProps` and `mapDispatchToProps` functions.
These props are then passed as props to the appropriate child presentational
component:

```js
// ./src/components/FruitManager.js

import React from 'react';
import FruitList from './FruitList';
import FruitSeller from './FruitSeller';
import FruitQuickAdd from './FruitQuickAdd';
import FruitBulkAdd from './FruitBulkAdd';

const FruitManager = ({ fruit, distinctFruit, add, addBulk, sell, sellAll }) => {
  return (
    <div>
      <h2>Available Fruit</h2>
      <FruitList fruit={fruit} />
      <h2>Fruit Inventory Manager</h2>
      <FruitSeller distinctFruit={distinctFruit} sell={sell} sellAll={sellAll} />
      <FruitQuickAdd add={add} />
      <FruitBulkAdd addBulk={addBulk} />
    </div>
  );
};

export default FruitManager;
```

Visualizing the flow of data all the from the `mapStateToProps` and
`mapDispatchToProps` function definitions within the `FruitManagerContainer.js`
file through the `connect` higher-order component down to the `FruitManager`
wrapped component is **difficult to do**. Understanding how to use React's
ability to dynamically set component attributes using JSX spread attribute
syntax is **one of the more challenging aspects of writing higher-order
components**.

**Just remember that you don't need to fully understand the above example to use
the `connect` function provided by the [React-Redux][react-redux] library.**

## Reviewing a completed Fruit Stand example

To review and run a completed Fruit Stand example application that utilizes the
above _custom_ `connect` higher-order component to create container components,
clone the [redux-fruit-stand-examples] repo.

After cloning the repo, open a terminal and browse to the
`fruit-stand-redux-with-react-generic-container` folder. Run the command `npm
install` to install the project's dependencies. Then use the command `npm start`
to run the Fruit Stand application.

This Fruit Stand example application is a React application created by the
Create React App tooling. When running the application using `npm start`, the
application should automatically open in your default browser. If it doesn't,
you can manually browse to `http://localhost:3000/` to view the application.

## What you learned

In this article, you learned about higher-order components (HOCs) including how
to write a higher-order component that accepts a component as an argument and
returns a new component.

[react-docs-higher-order-components]: https://reactjs.org/docs/higher-order-components.html
[mdn-closure]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
[react-redux]: https://react-redux.js.org/
[redux]: https://redux.js.org/
[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples
