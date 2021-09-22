# WEEK-15 DAY-2<br>*React + Redux* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->
________________________________________________________________________________
________________________________________________________________________________

# Redux Learning Objectives: Part 2

To keep things as simple as possible when initially learning Redux, you started
with using Redux independent of React. Now it's time to learn how to use Redux
within a React application!

After reading and practicing how to use Redux with React, you should be able to:

* Add Redux actions, reducer(s), and a store to a React project
* Update a React class component to subscribe to a Redux store to listen for
  state changes
* Update a React component to dispatch actions to a Redux store
* Define multiple reducers to manage individual slices of state
* Use the Redux `combineReducers` method to combine multiple reducers into a
  single root reducer
* Update a reducer to delegate a state update to a subordinate reducer
* Describe how container components differ from presentational components
* Write a container component to handle all of the Redux store interaction for
  one or more presentational components
* Use `Object.freeze` to prevent the current state within a reducer from being
  mutated
* Create a Redux store with preloaded state

________________________________________________________________________________

# Using Redux with React

To keep things as simple as possible when initially learning Redux, you started
with using Redux independent of React. Now it's time to learn how to use Redux
within a React application!

When you finish this article, you should be able to:

* Add Redux actions, reducer(s), and a store to a React project
* Update a React class component to subscribe to a Redux store to listen for
  state changes
* Update a React component to dispatch actions to a Redux store

## Integrating Redux into a React application

The techniques shown in this article for integrating Redux into a React
application, is just one step in your journey to learn Redux. As you work your
way through this lesson, you'll learn how to improve upon these techniques to
improve the organization or your code, the design of your components, and the
overall performance of your application.

In general, the steps to integrate Redux into an existing React application are:

* Set up Redux
  * Install the `redux` npm package
  * Define your actions
  * Define your reducer(s)
  * Create your store
* Update components
  * Use `store.subscribe` to listen for state updates
  * Call `store.getState` to retrieve state for rendering
  * Call `store.dispatch` to dispatch actions to the store

> **Note:** You'll start with writing all of the code to interact with the store
> within each component that needs to render state from the store or to dispatch
> actions. Later on, you'll learn how to improve the overall design of your
> application by using container components. Eventually, you'll learn how to use
> the [React-Redux][react-redux] library's `connect` method to avoid writing
> container components by hand.

## Organizing your Redux code

Instead of placing all of your Redux related code into a single file, you'll
separate your store, reducer, and actions into their own files.

There are a variety of acceptable ways to organize your Redux code within a
React project. When starting out with using Redux, organizing your code by type
(i.e. separate files or folders for the store, reducers, and actions) often
feels natural and makes it easy to find the file that you need to make a change
to. As your projects increase in size and complexity, you might find that
organizing your files by feature (i.e. locating all the files related to a
feature inside of a single folder) will keep you from searching and jumping
around a project that contains hundreds of files.

> **Note:** How a project is organized is highly dependent upon who is working
> on the project. It's also not unusual for the organization of a project to
> evolve and change throughout its lifetime. Don't struggle too much with
> deciding on an approach when getting starting a new project. Pick an approach
> and move on to getting work done!

### Following along

If you'd like to follow along, clone the [react-fruit-stand-with-react-starter]
repo.

After cloning the repo, open a terminal and browse to the `starter` folder
within the repo. Run the command `npm install` to install the project's
dependencies (the `redux` package is already listed as a dependency). Then use
the command `npm start` to run the Fruit Stand application.

This Fruit Stand example application is a React application created by the
Create React App tooling. When running the application using `npm start`, the
application should automatically open in your default browser. If it doesn't,
you can manually browse to `http://localhost:3000/` to view the application.

### Adding the actions

Within the React project's `src` folder, add a folder named `actions`. Within
that folder, add a file named `fruitActions.js` containing the following code:

```js
// ./src/actions/fruitActions.js

export const ADD_FRUIT = 'ADD_FRUIT';
export const ADD_FRUITS = 'ADD_FRUITS';
export const SELL_FRUIT = 'SELL_FRUIT';
export const SELL_OUT = 'SELL_OUT';

export const addFruit = (fruit) => ({
  type: ADD_FRUIT,
  fruit,
});

export const addFruits = (fruits) => ({
  type: ADD_FRUITS,
  fruits,
});

export const sellFruit = (fruit) => ({
  type: SELL_FRUIT,
  fruit,
});

export const sellOut = () => ({
  type: SELL_OUT,
});
```

### Adding the reducer

Within the React project's `src` folder, add a folder named `reducers`. Within
that folder, add a file named `fruitReducer.js` containing the following code:

```js
// ./src/components/fruitReducer.js

import {
  ADD_FRUIT,
  ADD_FRUITS,
  SELL_FRUIT,
  SELL_OUT,
} from '../actions/fruitActions';

const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FRUIT:
      return [...state, action.fruit];
    case ADD_FRUITS:
      return [...state, ...action.fruits];
    case SELL_FRUIT:
      const index = state.indexOf(action.fruit);
      if (index !== -1) {
        // remove first instance of action.fruit
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state; // if action.fruit is not in state, return previous state
    case SELL_OUT:
      return [];
    default:
      return state;
  }
};

export default fruitReducer;
```

### Adding the store

Within the React project's `src` folder, add a file named `store.js` containing
the following code:

```js
// ./src/store.js

import { createStore } from 'redux';
import fruitReducer from './reducers/fruitReducer';

const store = createStore(fruitReducer);

export default store;
```

## Writing Redux aware React components

**Remember that the integration techniques shown in this article are just a
starting point with using Redux with React components.** As you work your way
through this lesson, you'll learn how to improve upon these techniques.

### Listening for state changes

Components that need to render state from the store can use the
`store.subscribe` method to subscribe to listen for state updates. When a state
update occurs, the [`forceUpdate`][react-forceupdate] method is called to render
the component. Within the component's `render` method, the `store.getState`
method is called to retrieve the current state. This approach ensures that
whenever state is updated in the store (after the reducer has processed a
dispatched action), the component will retrieve and render the updated state.

> **Note:** Calling `forceUpdate` causes `render` to be called without first
> calling `shouldComponentUpdate`. Child components will go through their normal
> lifecycle, including calling `shouldComponentUpdate` to determine if the child
> component should render. While this pattern works, it's a rather blunt
> instrument for complex components, since re-rendering a parent causes
> re-rendering of all its children. Later in this lesson, you'll learn how the
> [React-Redux][react-redux] library solves this problem.

The `componentDidMount` and `componentWillUnmount` class component lifecycle
methods can be used to ensure that the component _subscribes_ to the store when
it's mounted and _unsubscribes_ from the store when the component is about to be
unmounted:

```js
// ./src/components/FruitList.js

import React from 'react';
import store from '../store';

class FruitList extends React.Component {
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

  render() {
    const fruit = store.getState();

    return (
      <div>
        {fruit.length > 0
          ? <ul>{fruit.map((fruitName, index) => <li key={index}>{fruitName}</li>)}</ul>
          : <span>No fruit currently in stock!</span>
        }
      </div>
    );
  }
}

export default FruitList;
```

### Dispatching actions

Updating a component to dispatch an action to the store is a bit simpler overall
than listening for and rendering state updates. You just need to import the
appropriate action creator function and use the `store.dispatch` method within a
event handler to dispatch the action:

```js
// ./src/components/FruitQuickAdd.js

import React from 'react';
import store from '../store';
import { addFruit } from '../actions/fruitActions';

class FruitQuickAdd extends React.Component {
  addFruitClick = (event) => {
    const fruit = event.target.innerText;
    store.dispatch(addFruit(fruit));
  }

  render() {
    return (
      <div>
        <h3>Quick Add</h3>
        <button onClick={this.addFruitClick}>APPLE</button>
        <button onClick={this.addFruitClick}>ORANGE</button>
      </div>  
    );
  }
}

export default FruitQuickAdd;
```

### Listening for state changes and dispatching actions

Sometimes components need to listen for and render state updates _and_ dispatch
actions to the store. The `FruitSeller` component listens for state updates so
that it can render a collection of buttons--one for each distinct fruit
available in the fruit stand. The component also handles button clicks to
dispatch an action to sell a fruit or to sell out all of the fruits.

Here's what the component looks like:

```js
// ./src/components/FruitSeller.js

import React from 'react';
import store from '../store';
import { sellFruit, sellOut } from '../actions/fruitActions';

class FruitSeller extends React.Component {
  sellFruitClick = (event) => {
    const fruit = event.target.innerText;
    store.dispatch(sellFruit(fruit));
  }

  sellOutClick = () => {
    store.dispatch(sellOut());
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

  render() {
    const fruit = store.getState();
    const distinctFruit = Array.from(new Set(fruit)).sort();

    if (distinctFruit.length === 0) {
      return null;
    }

    return (
      <div>
        <h3>Sell</h3>
        {distinctFruit.map((fruitName, index) => (
          <button key={index} onClick={this.sellFruitClick}>{fruitName}</button>
        ))}
        <button onClick={this.sellOutClick}>SELL OUT</button>
      </div>
    );
  }
}

export default FruitSeller;
```

The `FruitSeller` component is sort of a mash up of the `FruitList` and
`FruitQuickAdd` components!

### Practicing on your own

There's just one component left to implement: `BulkAdd`. This is the perfect
chance to get a bit of practice on your own to help you cement what you're
learned in this article.

## Reviewing a completed Fruit Stand example

To review and run a completed Fruit Stand example application that uses React
with Redux, clone the [redux-fruit-stand-examples] repo.

After cloning the repo, open a terminal and browse to the
`fruit-stand-redux-with-react` folder. Run the command `npm install` to install
the project's dependencies. Then use the command `npm start` to run the Fruit
Stand application.

This Fruit Stand example application is a React application created by the
Create React App tooling. When running the application using `npm start`, the
application should automatically open in your default browser. If it doesn't,
you can manually browse to `http://localhost:3000/` to view the application.

## What you learned

In this article, you learned how to add Redux actions, reducer(s), and a store
to a React project. You also learned how to update a React class component to
subscribe to a Redux store to listen for state changes and to dispatch actions
to a Redux store.

[react-redux]: https://react-redux.js.org/
[react-fruit-stand-with-react-starter]: https://github.com/appacademy-starters/redux-fruit-stand-with-react-starter
[react-forceupdate]: https://facebook.github.io/react/docs/component-api.html#forceupdate
[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples

________________________________________________________________________________

# Splitting and Combining Reducers

So far, you've been using a single reducer to manage state in your Redux store.
As your applications increase in size and complexity, it'll become necessary to
use multiple reducers, each managing a slice of state.

When you finish this article, you should be able to:

* Define multiple reducers to manage individual slices of state
* Use the Redux `combineReducers` method to combine multiple reducers into a
  single root reducer
* Update a reducer to delegate a state update to a subordinate reducer

## Splitting reducers

Imagine that your fruit stand is extremely successful and it grows so much that
you need multiple farmers helping you to keep your stand stocked with fruit.
Your application's state will need to grow to store not only an array of `fruit`
but also a `farmers` object that keeps track of your farmers.

Here's a sample state tree of your updated application:

```js
{
  fruit: [
    'APPLE',
    'APPLE',
    'ORANGE',
    'GRAPEFRUIT',
    'WATERMELON',
  ],
  farmers: {
    1: {
      id: 1,
      name: 'John Smith',
      paid: false,
    },
    2: {
      id: 2,
      name: 'Sally Jones',
      paid: false,
    },
  }
}
```

The store now needs to handle new action types like `'HIRE_FARMER'` and
`'PAY_FARMER'` by updating the `farmers` slice of state. You could add more
cases to your existing reducer, but eventually the existing reducer would become
too large and difficult to manage. The solution is to split the reducer into
separate `fruit` and `farmers` reducers.

Splitting up the reducer into multiple reducers handling separate, independent
_slices_ of state is called **reducer composition**, and it's the fundamental
pattern of building Redux apps. Because each reducer only handles a single
_slice_ of state, its `state` parameter corresponds only to the part of the
state that it manages and it only responds to actions that concern that slice of
state.

Split up your popular Fruit Stand application's reducer into two reducers:

- `fruitReducer` - A reducing function that handles actions updating the
  `fruits` slice of state
- `farmersReducer` - A reducing function that handles actions updating the new
  `farmers` slice of state

```js
// ./src/reducers/fruitReducer.js

import {
  ADD_FRUIT,
  ADD_FRUITS,
  SELL_FRUIT,
  SELL_OUT,
} from '../actions/fruitActions';

const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FRUIT:
      return [...state, action.fruit];
    case ADD_FRUITS:
      return [...state, ...action.fruits];
    case SELL_FRUIT:
      const index = state.indexOf(action.fruit);
      if (index) !== -1) {
        // remove first instance of action.fruit
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state; // if action.fruit is not in state, return previous state
    case SELL_OUT:
      return [];
    default:
      return state;
  }
};

export default fruitReducer;
```

```js
// ./src/reducers/farmersReducer.js

import { HIRE_FARMER, PAY_FARMER } from '../actions/farmersActions';

const farmersReducer = (state = {}, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case HIRE_FARMER:
      const farmerToHire = {
        id: action.id,
        name: action.name,
        paid: false
      };
      nextState[action.id] = farmerToHire;
      return nextState;
    case PAY_FARMER:
      const farmerToPay = nextState[action.id];
      farmerToPay.paid = !farmerToPay.paid;
      return nextState;
    default:
      return state;
  }
};

export default farmersReducer;
```

You'll also need to define a module containing the `'HIRE_FARMER'` and
`'PAY_FARMER'` actions:

```js
// ./src/actions/farmersActions.js

export const HIRE_FARMER = 'HIRE_FARMER';
export const PAY_FARMER = 'PAY_FARMER';

export const hireFarmer = (name) => ({
  type: HIRE_FARMER,
  id: new Date().getTime(),
  name,
});

export const payFarmer = (id) => ({
  type: PAY_FARMER,
  id,
});
```

## Combining reducers

Your reducer setup is now much more modular. However, `createStore` only takes
one `reducer` argument, so you must combine your reducers back into a single
reducer to pass to the store. To do this you'll use the `combineReducers` method
from the `redux` package and pass it an object that maps state keys to the
reducers that handle those slices of state. Below, the `combineReducers` maps
the `fruitReducer` for the `fruit` slice of state and the `farmersReducer` for
the `farmers` slice of state. Invoking the `combineReducers` function returns a
single `rootReducer` that you can use to create your Redux store.

```js
// ./src/reducers/rootReducer.js

import { combineReducers } from 'redux';
import fruitReducer from './fruitReducer';
import farmersReducer from './farmersReducer';

const rootReducer = combineReducers({
  fruit: fruitReducer,
  farmers: farmersReducer
});

export default rootReducer;
```

```js
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

export default store;
```

## Delegating to reducers

Another aspect of reducer composition involves delegating state updates to
subordinate reducers. Consider the farmers reducer. You can modify it so that
the `farmers` (plural) reducer delegates to a `farmer` (singular) reducer
whenever a single farmer's attributes need to be modified (in this case whenever
a farmer has been hired or paid):

```js
// ./src/reducers/farmersReducer.js

import { HIRE_FARMER, PAY_FARMER } from '../actions/farmersActions';

const farmerReducer = (state, action) => {
  // State is a farmer object.
  switch (action.type) {
    case HIRE_FARMER:
      return {
        id: action.id,
        name: action.name,
        paid: false
      };
    case PAY_FARMER:
      return Object.assign({}, state, {
        paid: !state.paid
      });
    default:
      return state;
  }
};

const farmersReducer = (state = {}, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case HIRE_FARMER:
      nextState[action.id] = farmerReducer(undefined, action);
      return nextState;
    case PAY_FARMER:
      nextState[action.id] = farmerReducer(nextState[action.id], action);
      return nextState;
    default:
      return state;
  }
};

export default farmersReducer;
```

### Catching and preventing state mutation bugs

Updating the `farmersReducer` to delegate farmer state updates to the
`farmerReducer` resolved a subtle state mutation bug. Take another look at the
original implementation of the `farmersReducer` function:

```js
const farmersReducer = (state = {}, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case HIRE_FARMER:
      const farmerToHire = {
        id: action.id,
        name: action.name,
        paid: false
      };
      nextState[action.id] = farmerToHire;
      return nextState;
    case PAY_FARMER:
      const farmerToPay = nextState[action.id];
      farmerToPay.paid = !farmerToPay.paid;
      return nextState;
    default:
      return state;
  }
};
```

Notice that the `state` parameter is duplicated to the `nextState` variable
using the `Object.assign` method:

```js
let nextState = Object.assign({}, state);
```

While this code correctly creates a duplicate of the `state` object, `nextState`
is only a shallow duplicate as only the top-level object is duplicated. Each
"farmer" object that the `state` object refers to are still the _same_ objects.

In the `PAY_FARMER` case clause, the farmer object is mutated by setting the
`paid` property to a new value:

```js
case PAY_FARMER:
  const farmerToPay = nextState[action.id];
  farmerToPay.paid = !farmerToPay.paid;
  return nextState;
```

Now look again at the `PAY_FARMER` case clause in the version of the
`farmersReducer` that delegates farmer state updates to the `farmerReducer`:

```js
case PAY_FARMER:
  nextState[action.id] = farmerReducer(nextState[action.id], action);
  return nextState;
```

This code calls the `farmerReducer` by passing in the farmer object for the
`action.id` property value (i.e. `nextState[action.id]`) and the `action`
parameter. The `farmerReducer` has a `PAY_FARMER` case clause that correctly
uses the `Object.assign` method to duplicate the farmer object with the new
`paid` property value (i.e. `Object.assign({}, state, { paid: !state.paid })`):

```js
const farmerReducer = (state, action) => {
  // State is a farmer object.
  switch (action.type) {
    case HIRE_FARMER:
      return {
        id: action.id,
        name: action.name,
        paid: false
      };
    case PAY_FARMER:
      return Object.assign({}, state, {
        paid: !state.paid
      });
    default:
      return state;
  }
};
```

**Catching state mutation bugs is difficult to do.** Leveraging patterns like
reducer composition can help you from introducing these kinds of bugs in the
first place.

## Destructuring State in your component

If you try to start your Fruit Stand app now, you will probably get an error that looks something like:
```
TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
```
That is because there is one last thing that you need to do in order prepare your fruitstand to use these split reducers: make sure that your component is accessing the right slice of state. Back in your `FruitList.js` `render` method, you are currently assigning the return value of your `getState()` call to 'fruit'. 

```
const fruit = store.getState();
```

If you `console.log` or insert a debugger just after this line to see what fruit has been assigned, you will see:

```
fruit = {
  fruit: [],
  farmers: {}
}
```
Your state shape changed when you created these reducers! You component is trying to iterate over your new state shape, instead of the fruit slice of that state. To give the component access to the array of fruit, destructure this assignment:

```
const { fruit } = store.getState();
```

## Reviewing a completed Fruit Stand example

To review and run a completed Fruit Stand example application that contains
multiple reducers, clone the [redux-fruit-stand-examples] repo.

After cloning the repo, open a terminal and browse to the
`fruit-stand-redux-with-react-multiple-reducers` folder. Run the command `npm
install` to install the project's dependencies. Then use the command `npm start`
to run the Fruit Stand application.

This Fruit Stand example application is a React application created by the
Create React App tooling. When running the application using `npm start`, the
application should automatically open in your default browser. If it doesn't,
you can manually browse to `http://localhost:3000/` to view the application.

## What you learned

In this article, you learned how to define multiple reducers to manage
individual slices of state. You also learned how to use the Redux
`combineReducers` method to combine multiple reducers into a single root reducer
and how to update a reducer to delegate a state update to a subordinate reducer.

[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples

________________________________________________________________________________

# Container Components

As you saw in an earlier article, there can be quite a bit of code involved in
connecting a component to the store. Putting all this code into the component
with heavy rendering logic tends to cause bloated components and violates the
principle of [separation of concerns][wikipedia-separation-of-concerns].
Therefore, it's a common pattern in Redux code to separate **presentational
components** from their connected counterparts, called **containers**.

When you finish this article, you should be able to:

* Describe how container components differ from presentational components
* Write a container component to handle all of the Redux store interaction for
  one or more presentational components

## Comparing presentational and container components

The distinction between presentational components and containers is not
technical but rather functional. Presentational components are concerned with
how things look and container components are concerned with how things work.

Here's a table outlining the differences:

|                | Presentational                   | Container                                      |
| -------------- | -------------------------------- | ---------------------------------------------- |
| Purpose        | How things look (markup, styles) | How things work (data fetching, state updates) |
| Aware of Redux | No                               | Yes                                            |
| To Read Data   | Read data from `props`           | Subscribe to Redux state                       |
| To Change Data | Invoke callbacks from `props`    | Dispatch Redux actions                         |

> **Note:** You'll start with writing all of the code for your container
> components by hand. Later in this lesson, you'll learn how to create container
> components using the [React-Redux][react-redux] library's `connect` method.

## Determining where to create containers

Not every component needs to be connected to the store. Generally, you'll only
want to create containers for the 'big' components in your app that represent
sections of a page and contain smaller purely functional presentational
components. These larger container components are responsible for interacting
with the store and passing state and dispatch props down to all their
presentational children.

For the Fruit Stand application, a good starting point would be to create two
container components, `FruitManagerContainer` and `FarmerManagerContainer`, to
respectively render the presentational components for the "Fruit" and "Farmers"
sections of the page. Here's a visual representation of that component
hierarchy:

```
App
├── FruitManagerContainer
│   └── FruitManager
│       ├── FruitList
│       ├── FruitSeller
│       ├── FruitQuickAdd
│       └── FruitBulkAdd
└── FarmerManagerContainer
    └── FarmerManager
        ├── FarmerList
        │   └── Farmer
        └── FarmerHire
```

Notice that the container component names are a combination of the name of the
presentational component that they wrap and the suffix "Container".

In general, aim to have fewer containers rather than more. Most of the
components you'll write will be presentational, but you'll need to generate a
few containers to connect presentational components to the Redux store.

## Writing a container component

While you can write a container component from scratch, you can also refactor an
existing React component that interacts with a Redux store into separate
container and presentational components.

### Using a container component to retrieve state

Here's the current version of the `FruitList` component that subscribes to the
store (using `store.subscribe`) to know when state has been updated and calls
`store.getState` to retrieve and render the `fruit` state slice:

```js
// ./src/components/FruitList.js

import React from 'react';
import store from '../store';

class FruitList extends React.Component {
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

  render() {
    const { fruit } = store.getState();

    return (
      <div>
        {fruit.length > 0
          ? <ul>{fruit.map((fruitName, index) => <li key={index}>{fruitName}</li>)}</ul>
          : <span>No fruit currently in stock!</span>
        }
      </div>
    );
  }
}

export default FruitList;
```

The `FruitManager` component is responsible for rendering each of the
fruit-related components (i.e. `FruitList`, `FruitSeller`, `FruitQuickAdd`, and
`FruitBulkAdd`), so create a container component named `FruitManagerContainer`
to handle all of the store interaction for the "Fruit" section of the page.

To review, here's what the component hierarchy will look like:

```
FruitManagerContainer
└── FruitManager
    ├── FruitList
    ├── FruitSeller
    ├── FruitQuickAdd
    └── FruitBulkAdd
```

As a starting point, here's the code for the `FruitManagerContainer` component:

```js
// ./src/components/FruitManagerContainer.js

import React from 'react';
import store from '../store';
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

  render() {
    const { fruit } = store.getState();

    return (
      <FruitManager fruit={fruit} />
    );
  }
}

export default FruitManagerContainer;
```

Notice that the container component, just like the original version of the
`FruitList` component, subscribes to the store (using `store.subscribe`) to know
when state has been updated and calls `store.getState` to retrieve the `fruit`
state slice. But instead of directly rendering the `fruit` state, it sets a prop
on the `FruitManager` component to pass the state down the component hierarchy.

The `FruitManager` component receives the `fruit` prop and in turn uses a prop
to pass it down to the `FruitList` component:

```js
// ./src/components/FruitManager.js

import React from 'react';
import FruitList from './FruitList';
import FruitSeller from './FruitSeller';
import FruitQuickAdd from './FruitQuickAdd';
import FruitBulkAdd from './FruitBulkAdd';

const FruitManager = ({ fruit }) => {
  return (
    <div>
      <h2>Available Fruit</h2>
      <FruitList fruit={fruit} />
      <h2>Fruit Inventory Manager</h2>
      <FruitSeller />
      <FruitQuickAdd />
      <FruitBulkAdd />
    </div>
  );
};

export default FruitManager;
```

And finally, the `FruitList` component receives the `fruit` prop and renders it
into an unordered list:

```js
// ./src/components/FruitList.js

import React from 'react';

const FruitList = ({ fruit }) => {
  return (
    <div>
      {fruit.length > 0
        ? <ul>{fruit.map((fruitName, index) => <li key={index}>{fruitName}</li>)}</ul>
        : <span>No fruit currently in stock!</span>
      }
    </div>
  );
};

export default FruitList;
```

> **Reminder:** Using component props to pass a value down the component
> hierarchy is known as _prop threading_.

Notice that the `FruitList` _presentational_ component, which no longer needs to
use the `componentDidMount` and `componentWillUnmount` lifecycle methods to
subscribe and unsubscribe to the store, can be refactored into a function
component. Additionally, the `store` is no longer imported in the `FruitList`
module, as the `FruitList` component simply receives and renders the `fruit`
state via a prop without any knowledge of or direct interaction with the store.

### Using a container component to dispatch actions

Here's the current version of the `FruitQuickAdd` component that dispatches the
`ADD_FRUIT` action to add a fruit to the fruit stand:

```js
// ./src/components/FruitQuickAdd.js

import React from 'react';
import store from '../store';
import { addFruit } from '../actions/fruitActions';

class FruitQuickAdd extends React.Component {
  addFruitClick = (event) => {
    const fruit = event.target.innerText;
    store.dispatch(addFruit(fruit));
  }

  render() {
    return (
      <div>
        <h3>Quick Add</h3>
        <button onClick={this.addFruitClick}>APPLE</button>
        <button onClick={this.addFruitClick}>ORANGE</button>
      </div>  
    );
  }
}

export default FruitQuickAdd;
```

To prepare to refactor the `FruitQuickAdd` component into a _presentational_
component, update the `FruitManagerContainer` component to the following code:

```js
// ./src/components/FruitManagerContainer.js

import React from 'react';
import store from '../store';
import { addFruit } from '../actions/fruitActions';
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

  render() {
    const { fruit } = store.getState();

    return (
      <FruitManager
        fruit={fruit}
        add={this.add} />
    );
  }
}

export default FruitManagerContainer;
```

Notice that the `addFruit` action creator is imported (at the top of the file)
and a new component method named `add` receives a `fruit` parameter value and
calls `store.dispatch` to dispatch a `ADD_FRUIT` action. The `render` method
sets a prop on the `FruitManager` component to pass the `add` method down the
component hierarchy.

The `FruitManager` component receives the `add` prop and in turn uses a prop to
pass it down to the `FruitQuickAdd` component:

```js
// ./src/components/FruitManager.js

import React from 'react';
import FruitList from './FruitList';
import FruitSeller from './FruitSeller';
import FruitQuickAdd from './FruitQuickAdd';
import FruitBulkAdd from './FruitBulkAdd';

const FruitManager = ({ fruit, add }) => {
  return (
    <div>
      <h2>Available Fruit</h2>
      <FruitList fruit={fruit} />
      <h2>Fruit Inventory Manager</h2>
      <FruitSeller />
      <FruitQuickAdd add={add} />
      <FruitBulkAdd />
    </div>
  );
};

export default FruitManager;
```

And finally, the `FruitQuickAdd` component receives the `add` callback function
via a prop and calls it within a `handleClick` event handler, passing in the
target button's inner text:

```js
// ./src/components/FruitQuickAdd.js

import React from 'react';

const FruitQuickAdd = ({ add }) => {
  const handleClick = (event) => add(event.target.innerText);

  return (
    <div>
      <h3>Quick Add</h3>
      <button onClick={handleClick}>APPLE</button>
      <button onClick={handleClick}>ORANGE</button>
    </div>  
  );
};

export default FruitQuickAdd;
```

The change between the original and refactored `FruitQuickAdd` component isn't
as dramatic as the `FruitList` component example, but it's still a significant
improvement to the overall separation of concerns. The `FruitQuickAdd` component
is now strictly concerned with rendering the UI and handling user generated
events (i.e. button clicks) and the `FruitManagerContainer` component is now
strictly concerned with interacting with the Redux store.

### Reviewing the completed container component

The `FruitManagerContainer` _container_ component can continue to be expanded
until each of its child _presentational_ components no longer interact directly
with the store. Here's a look at the completed `FruitManagerContainer`
component:

```js
// ./src/components/FruitManagerContainer.js

import React from 'react';
import store from '../store';
import { addFruit, addFruits, sellFruit, sellOut } from '../actions/fruitActions';
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

## Reviewing a completed Fruit Stand example

To review and run a completed Fruit Stand example application that utilizes
containers, clone the [redux-fruit-stand-examples] repo.

After cloning the repo, open a terminal and browse to the
`fruit-stand-redux-with-react-containers` folder. Run the command `npm install`
to install the project's dependencies. Then use the command `npm start` to run
the Fruit Stand application.

This Fruit Stand example application is a React application created by the
Create React App tooling. When running the application using `npm start`, the
application should automatically open in your default browser. If it doesn't,
you can manually browse to `http://localhost:3000/` to view the application.

## What you learned

In this article, you learned how container components differ from presentational
components. You also learned how to write a container component to handle all of
the Redux store interaction for one or more presentational components.

[wikipedia-separation-of-concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns
[react-redux]: https://react-redux.js.org/
[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples

________________________________________________________________________________

# Freezing Objects

As you learned earlier in this lesson, a reducer must never mutate its
arguments. If the state changes, the reducer must return a new object.

JavaScript provides us with an easy way to enforce this.
[`Object.freeze`][mdn-obj-freeze] prevents new properties from being added to an
object, and also prevents properties currently on an object from being altered
or deleted. Essentially, it renders an object immutable, which is exactly what
you want.

When you finish this article, you should be able to use `Object.freeze` to
prevent the current state within a reducer from being mutated.

## Using `Object.freeze` to prevent state mutations

By calling `Object.freeze(state)` at the top of every reducer, you can ensure
that the state is never accidentally mutated. For example, this is what your
farmer reducer from the Fruit Stand application would look like:

```js
const farmersReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case HIRE_FARMER:
      const farmerToHire = {
        id: action.id,
        name: action.name,
        paid: false
      };
      nextState[action.id] = farmerToHire;
      return nextState;
    case PAY_FARMER:
      const farmerToPay = nextState[action.id];
      farmerToPay.paid = !farmerToPay.paid;
      return nextState;
    default:
      return state;
  }
};
```

Now you can be certain that you won't accidentally mutate the state within the
reducer.

### Understanding the difference between deep and shallow freezes

Here's another example:

```js
const people = { farmers: { name: 'Old MacDonald' } };
Object.freeze(people);
```

When you try to mutate an object that you _froze_ by modifying a property, it
will be prevented:

```js
people.farmers = { name: 'Young MacDonald' };
people; // { farmers: { name: 'Old MacDonald' } }
```

**Note: This is not a _deep freeze_.** `Object.freeze` performs a _shallow
freeze_ as it only applies to the immediate properties of the object itself.
Nested objects can still be mutated, so be careful. Here's an example of this:

```js
people.farmers.name = 'Young MacDonald';
people; // { farmers: { name: 'Young MacDonald' } }
```

### `Object.freeze` and arrays

You can also use `Object.freeze` to freeze an array, so if a reducer's `state`
parameter is an array, you can still prevent accidental state mutations:

```js
const fruitReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case ADD_FRUIT:
      return [...state, action.fruit];
    case ADD_FRUITS:
      return [...state, ...action.fruits];
    case SELL_FRUIT:
      const index = state.indexOf(action.fruit);
      if (index !== -1) {
        // remove first instance of action.fruit
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state; // if action.fruit is not in state, return previous state
    case SELL_OUT:
      return [];
    default:
      return state;
  }
};
```

When an array is frozen with `Object.freeze`, its elements cannot be altered and
no elements can be added to or removed from the array. Just like with objects,
freezing arrays has limitations. If the array's elements containing objects,
properties on those objects can still be mutated.

## What you learned

In this article, you learned how to use `Object.freeze` to prevent the current
state within a reducer from being mutated.

[mdn-obj-freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

________________________________________________________________________________

# Preloaded State

Currently, when the page in the browser is reloaded, any state data stored in
the Redux store is lost. Later in this lesson, you'll learn how to use Redux to
interact with an API to persist state data. Until then (or if your React
application doesn't use an API), you can use the combination of Redux's ability
to create a store with _preloaded state_ with the browser's local storage to
persist store state across page reloads.

When you finish this article, you should be able to:

* Create a Redux store with preloaded state
* Use the browser's local storage to persist a Redux store's state across page
  reloads

## Creating a store with preloaded state

So far, your Redux stores have initialized with no initial state. Sometimes,
though, you may want to take pre-existing data and pass it into the store upon
initialization. Such data can be passed to the `createStore` method using the
`preloadedState` argument:

```js
const preloadedState = {
  fruit: [
    'APPLE',
    'ORANGE',
  ],
  farmers: {
    1: {
      id: 1,
      name: 'John Smith',
      paid: false,
    },
    2: {
      id: 2,
      name: 'Sally Jones',
      paid: false,
    },
  }
};

const store = createStore(rootReducer, preloadedState);
```

A couple of things to note about preloading state:

* The `preloadedState` must match the state shape (as produced by the reducers).
* `preloadedState` is not the same as default state. Default state should always
  be set in your reducers themselves.

## Creating local storage helper functions

To assist with using the browser's local storage to persist a Redux store's
state across page reloads, start with creating a set of helper functions:

```js
// localStorage.js

const STATE_KEY = 'fruitstand';

export const loadState = () => {
  try {
    const stateJSON = localStorage.getItem(STATE_KEY);
    if (stateJSON === null) {
      return undefined;
    }
    return JSON.parse(stateJSON);
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateJSON = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, stateJSON);
  } catch (err) {
    console.warn(err);
  }
};
```

The `saveState` function is responsible for converting the `state` parameter
value into JSON (using the `JSON.stringify` method) and saving the state JSON
string to the browser's local storage (using the `localStorage.setItem` method).
A `try...catch` statement is used to catch and log any errors.

The `loadState` function is responsible for loading the state JSON from the
browser's local storage (using the `localStorage.getItem` method). If the state
JSON isn't stored in local storage, `undefined` is returned so the store's
reducer function can initialize the state to its default value. If the state
JSON is successfully retrieved from local storage, it's parsed into JavaScript
objects (using the `JSON.parse` method) and returned to the caller. A
`try...catch` statement is used to catch and log any errors.

## Saving state to local storage

To ensure that the persisted state in local storage doesn't get out of sync with
the store, you want to persist the state whenever it's updated. Knowing that the
store's reducer is called whenever there's an action dispatched to update the
state, you might be tempted to update your reducer like this:

```js
import {
  ADD_FRUIT,
  ADD_FRUITS,
  SELL_FRUIT,
  SELL_OUT,
} from '../actions/fruitActions';
import { saveState } from '../localStorage';

const fruitReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case ADD_FRUIT:
      const nextState = [...state, action.fruit];
      saveState(nextState);  // Persist state data to local storage
      return nextState;

    // Case clauses removed for brevity.

    default:
      return state;
  }
};

export default fruitReducer;
```

**But don't do this!** Per the [official Redux docs on
reducers][redux-js-reducers-handling-actions], reducers should stay _pure_ and
not cause _side effects_ (like calling APIs or persisting data to local
storage).

To keep your reducers pure, handle persisting state to local storage in the
module where you create your store (`store.js`) by subscribing to listen for
state changes:

```js
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { saveState } from './localStorage';

const store = createStore(rootReducer);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
```

Now whenever the store's state is updated, the `store.getState` method is called
to get and pass the current state to the `saveState` method.

## Loading state from local storage

Now that you're persisting state to local storage, you can load state from local
storage and pass it to the `createStore` method as preloaded state:

```js
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

const store = createStore(rootReducer, preloadedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
```

With these updates in place, your Redux store's state will persist across page
reloads.

## What you learned

In this article, you learned how to create a Redux store with preloaded state.
You also learned how to use the browser's local storage to persist a Redux
store's state across page reloads.

[redux-js-reducers-handling-actions]: https://redux.js.org/basics/reducers#handling-actions

________________________________________________________________________________

# React and Redux To-Do List Project

Today you'll be building a to-do list application with React and local storage.
Instead of using Context to manage and update your application's state, you'll
set up a Redux store and interact with it using the store's `getState`,
`dispatch`, and `subscribe` methods.

This project will also give you a better understanding of how to share and
update "global" data across a React application by using Redux. You'll use Redux
to dispatch action POJOs through a reducer function, and have your component
access an updated version of the Redux store's state.

In this project, you will:

* Generate a Redux store to manage your application's global information
* Define functions to save and load the Redux store's state with local storage
* Generate a Redux **store** with a preloaded state from local storage by using
  the `createStore` method from the Redux library
* Set up a **reducer** to direct different action types to interact with the
  Redux store in different ways
* Set up **actions** to create a task and delete a task
* Use a `debugger` to investigate the state from within a component

## Phase 1: Set up project and Redux store

Begin by cloning the starter project from
https://github.com/appacademy-starters/react-redux-todo-list-starter.

Take a moment to examine the project's file tree below. In the next few phases,
you'll follow the `TODO` notes in each file to implement Redux into your React
project.

```sh
├── package-lock.json
├── package.json
├── public
│   └── index.html
└── src
    ├── App.js
    ├── actions
    │   └── taskActions.js
    ├── components
    │   ├── Task.js
    │   ├── TodoForm.js
    │   └── TodoList.js
    ├── index.js
    ├── localStorage.js
    ├── reducers
    │   └── tasksReducer.js
    └── store.js
```

### Local storage

Let's start by setting up some functions in the `localStorage.js` file to save
and load the Redux store's state with local storage!

In the `loadState` function, you'll want to access the stored tasks state from
local storage by using the `localStorage.getItem` method. If there is no state
found, return `undefined`. However, if the state was found, parse the state from
JSON into JavaScript and return the parsed state. If any errors were caught, log
the errors with a `console.warn` statement and have the function return
`undefined`.

In the `saveState` function, you'll want to parse the `state` input from
JavaScript into a JSON string. When you call the `saveState` function, you'll
invoke the function with the Redux store's state accessed with the
`store.getState` method. After parsing the state from JavaScript into a JSON
string, set the string into local storage. Lastly, you'll want to catch any
errors with a `console.warn` statement.

### Generate application's Redux store

Now that you've set up some functions to handle accessing and storing the data
with local storage, you'll want to use those functions in the `store.js` file.
In this file, you'll use Redux's `createStore` function to set up your
application's Redux `store`. As a reminder, the `createStore` function takes in
a reducer as its first argument, and an optional preloaded state, also referred
to as _initial_ state, as its second argument.

Use the `loadState` function you just defined to access the `preloadedState`.
Now you'll invoke the `createStore` function with the `tasksReducer` and the
`preloadedState` to generate the application's Redux store.

You'll want your application to update local storage and log the state whenever
there an update to the store - this means you'll want your application to listen
for changes to the store with the `store.subscribe` method and then update local
storage with the `saveState` function and `console.log` the state upon any
change.

## Phase 2: Actions and reducers

Now that you have your application's Redux store set up, it's time to define
some action creator functions and reducers! You'll define action creator
functions in the `taskActions.js` file and set up corresponding case statements
for each action type in the `tasksReducer.js` file.

### Define action creator functions

As a reminder, it is best practice to use constants for action types, instead of
string literals, to ensure that errors will be thrown for typos. Start by
defining constants for your action types: `CREATE_TASK` and `DELETE_TASK`.

Once you have the constants set up, it's time to define an action creator
function for each action type! Start by thinking of what payload information you
want your action POJOs to pass into the reducer function.

Define a `createTask` action creator function that returns actions of type
`CREATE_TASK`. You'll want `type`, `taskId`, and `taskMessage` payload keys for
each `CREATE_TASK` action POJO. Have the action creator function take in a
`taskMessage` and auto-generate the `taskId`. You can set the `taskId` to a
time-string that is set when the action creator function is invoked. Generate a
new `Date` object and get its time-string with `new Date().getTime()`. Set the
time-string to the `taskId` payload key and the `taskMessage` input to the
`taskMessage` payload key.

Now you'll want to define the `deleteTask` action creator function to return
actions of type `DELETE_TASK`. You'll want the action creator function to take
in a `taskId`. Each `DELETE_TASK` action POJO should have a `type` property and
a `taskId` payload key.

### Define tasks reducer function

The next step is to finish implementing the `tasksReducer`! Begin by freezing
the `state` with `Object.freeze(state);` so that you won't accidentally mutate
the state. As a reminder, Redux follows the immutable state pattern, meaning
that a reducer function should never directly mutate state. After freezing the
state, import `CREATE_TASK` and `DELETE_TASK` string literal constants and set
up a switch statement to evaluate a case statement based on each `action.type`.

In the `CREATE_TASK` case, you'll want to make a copy of the state, structure a
`newTask` POJO, and add the `newTask` into the copy of the state before
returning the copy. Define a `nextState` variable and use spread syntax (`...`)
to make a copy of the state (`{ ...state }`). Next, you'll want to structure the
`newTask` POJO to have an `id` property set to the action's `taskId` payload and
a `message` property set to the action's `taskMessage` payload.

Once you have finished structuring the `newTask` POJO, key into the `nextState`
with the new task ID and set the value of `nextState[newTask.id]` to the
`newTask`. Alternatively, you could use the `taskId` payload and set the value
of `nextState[action.taskId]` to the `newTask` (this will also accomplish what
we want, which is to set up a `nextState` with keys that are task IDs and values
that are task POJOs). At the end of the `CREATE_TASK` case statement, return the
updated `nextState`.

In the `DELETE_TASK` case, you'll also want to make a copy of the state
(`{...state }`). Set the copy of the state to a `stateWithDeletion` variable.
Since your `DELETE_TASK` actions have a `taskId` payload, you can use
JavaScript's [delete] operator to delete a specific key-value pair from the
`stateWithDeletion` object, based on the `taskId` payload:

```js
delete stateWithDeletion[action.taskId];
```

The last thing left in your `DELETE_TASK` statement is to return the updated
`stateWithDeletion`! If you compare your initial definition of the `nextState`
and `stateWithDeletion` variables, you'll see that they are both copies of the
`state` made with spread syntax. Move the `nextState` variable outside of the
`switch` statement so that both `case` statements can reference and update the
`nextState`, instead of the `DELETE_TASK` case statement creating a new copy of
the state and updating it.

## Phase 3: Dispatch actions from the DevTools console

Now you can test whether you can actually create a task by using the
`store.dispatch` method to dispatch the `CREATE_TASK` action. As a reminder,
dispatching the action will "send" it through the reducer to determine what
operation to perform based on the action's `type` property. Take a moment to go
into your `index.js` file and import your application's Redux `store` and action
creator functions:

```js
import { store } from './store';
import { createTask, deleteTask } from './actions/taskActions';
```

Now that you've had the store and actions imported into the file, you can set
them as properties to the `window` object, so that you can access the `store`
and actions from the developer tools console.

```js
window.store = store;
window.createTask = createTask;
window.deleteTask = deleteTask;
```

At this point, your `index.js` file should look something like this:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store';
import { createTask, deleteTask } from './actions/taskActions';

window.store = store;
window.createTask = createTask;
window.deleteTask = deleteTask;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Open up your browser's DevTools console and type `window.store`. Now you should
see the `store` object and its methods: `{dispatch: ƒ, subscribe: ƒ, getState:
ƒ, replaceReducer: ƒ, Symbol(observable): ƒ}`,

Now type `window.store.getState()`. You should see an empty object - this is the
default state (`state = {}`) that you set up in the `tasksReducer`.

Since you can access your application's state from the DevTools console, that
means you can also dispatch actions by invoking the `window.store.dispatch`
method with an action:

```js
window.store.dispatch(window.createTask('learn redux'));
```

You just dispatched a `CREATE_TASK` action! You'll see that your updated state
was logged - this is because of the `console.log` statement in the
`store.subscribe` invocation in your `index.js` file (as you might remember, the
`store.subscribe` method listens for any updates to the store, i.e. dispatch
calls). Dispatch another `CREATE_TASK` action:

```js
window.store.dispatch(window.createTask('learn react hooks'));
```

Now if you type `window.store.getState()` again, you'll see that the state
return from the `store.getState` method is the same plain old JavaScript object
as the state that was logged within the `store.subscribe` invocation.

Now let's place some `debugger` statements in the `tasksReducer` and
`createTask` action creator function! Remember to make sure the `debugger`
statement in your `tasksReducer` is **inside** a case statement. If the
`debugger` is between the switch statement and a case statement, you will never
hit that breakpoint!

```js
const tasksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case CREATE_TASK:
      debugger;
    // CODE SHORTENED FOR BREVITY
```

```js
export const createTask = (taskMessage) => {
  debugger;
  return ({
    type: CREATE_TASK,
    taskId: new Date().getTime(),
    taskMessage,
  });
};
```

Now dispatch another `CREATE_TASK` action to hit the two `debugger` statements
you just set:

```js
window.store.dispatch(window.createTask('work on self-care'));
```

Notice how you are now in the `Sources` tab of your DevTools looking at the
`taskActions.js` file in your project. You can view the value of the
`taskMessage` argument by hovering over the variable or looking at the local
scope variables in the DevTools' right window.

![devtools-taskActions][devtools-1]

If you click the blue play button to continue to the next `debugger` statement,
you'll land in your `tasksReducer.js` file and be able to hover over the `state`
to view the value of the Redux store's previous state **before** the dispatching
of the `CREATE_TASK` action. 

![devtools-tasksReducer][devtools-2]

Now if you click the blue play button to continue, you'll exit out of debug mode
and your updated state will be logged in the console.

Congratulations! You just used a `debugger` to follow the Redux flow of
dispatching a `CREATE_TASK` action! Comment out your `debugger` statements for
now. In the next phase, you'll work on dispatching actions through a user
interface.

## Phase 4: Dispatch actions from components

Now it's time to set up a user interface that allows for intuitive dispatching
of actions. In the `TodoForm` component, you'll set up a button that invokes the
`createTask` action creator function with the `inputValue` state to dispatch a
`CREATE_TASK` action based on the form input! For each `Task` component, you'll
set up a button to dispatch a `DELETE_TASK` action for that task.

### TodoForm

In the `TodoForm.js` file, import your application's Redux `store` instance and
the `createTask` action creator function. Now you'll want to finish the
`handleSubmit` method so that it dispatches a `CREATE_TASK` action. Invoke the
`createTask` action creator function with the `inputValue` state and the
`store.dispatch` method with the invoked action creator function.

Take a moment to test out the dispatch call generated by your form submission.
Type a task in the input field - when you submit, you should see an updated
state logged in the DevTools console with your new task!

### TodoList

In the `TodoList.js` file, import the application's Redux `store` instance and
the `deleteTask` action creator function. Now you'll set up the component's
`componentDidMount` and `componentDidUnmount` life-cycle methods.

In the `componentDidMount` method, use the store's `subscribe` method to force a
component to update whenever the state changes:

```js
componentDidMount() {
  this.unsubscribe = store.subscribe(() => {
    this.forceUpdate();
  });
}
```

You want to name the subscription as `this.unsubscribe`, so that you can
unsubscribe upon the unmounting of a component. When the `componentDidMount`
life-cycle method is invoked upon the mounting of a component, it will invoke
the `store.subscribe` method to force the component to update whenever the
store's state changes. It will also set a `this.unsubscribe` variable to the
`TodoList` class, so that `this.unsubscribe` is accessible from other parts of
the component's code.

In the `componentDidUnmount` method, you'll want to check if the component has
mounted by checking if `this.unsubscribe` has been defined. Whenever a component
mounts, the `this.unsubscribe` variable set in the `componentDidMount` method
will become initialize. If `this.unsubscribe` is undefined, that means that the
component has not invoked the `componentDidMount` method and has therefore not
been mounted yet. If `this.unsubscribe` is defined, you'll want to invoke
`this.unsubscribe` to have the component unsubscribe from changes once component
unmounts:

```js
componentWillUnmount() {
  if (this.unsubscribe) {
    this.unsubscribe();
  }
}
```

In the `deleteTask` method, you'll want to wrap the invocation of the
`deleteTask` action creator function with the `store.dispatch` method. The
`deleteTask` action creator function will be invoked based on the
`this.deleteTask` method's `id` input. Later in this phase, you'll pass the
`TodoList` component's `this.deleteTask` method as a `deleteTask` prop into each
`Task` component. Then, whenever the `deleteTask` prop is invoked from within a
`Task` component, it can simply be invoked with a task ID to dispatch a
`DELETE_TASK` action without needing to import the `store` into each `Task`
component to invoke `store.dispatch`

In the component's `render` method, access the tasks stored in the Redux store's
state by invoking the `store.getState` method and saving its return value to a
`tasksState` variable. Now that you can use a `debugger` statement to view the
state and check out what data you are working with!

If there are no tasks stored in state, you'll want to have the `TodoList`
component return `null`. Otherwise if there are tasks stored in state, render a
`Task` component for each of the tasks. For each `Task` component, you'll want
to use the task's ID as the `key` and pass two props: the `task` object and the
`this.deleteTask` method as a `deleteTask` prop.

### Task

Have the `Task` function component destructure and take in the `deleteTask`
method and `task` object props. Invoke the `deleteTask` function passed as a
prop in the `Task` component's `handleClick` method and replace the `Hi, I'm a
task in your to-do list!` placeholder text with the `task.message`.

As a reminder, the `deleteTask` action creator function was already wrapped with
a `store.dispatch` call in the `TodoList` component - this is why the
`handleClick` function in the `Task` component does not include a
`store.dispatch` invocation. The `TodoList` component passed the wrapped
function as a prop named `deleteTask` to each `Task` component. The `deleteTask`
function invoked in the `Task` component's `handleClick` function is the
`TodoList` component's `deleteTask` **method**, not the `deleteTask` **action
creator function**.

## Phase 5: Implement a full Redux cycle

In this phase, you'll implement a full Redux cycle without the guidance of
`TODO` notes or specific, written instructions. Remember, the `debugger`
statement is your friend! If you get stuck, think of where you can place
`debugger` statements to gain more context about your code. As a general
guideline, feel free to follow the steps below:

* Set up an action creator function for a `RESET_TASK_LIST` action
* Set up a reducer case statement for the `RESET_TASK_LIST` action type
* Create a user interface (button) to dispatch the `RESET_TASK_LIST` action

Congratulations! You have just created an application that uses Redux to manage
the application's information. Give yourself a pat on the back! As a reminder,
the Redux library is a highly conceptual library to pick up, and when learning
anything new practice always makes perfect! If the implementation of Redux feels
confusing, always feel free to step back and use a `debugger` statement to
follow the Redux flow: an action is generated, then the action is dispatched to
go through a reducer, and then the store is updated.

[devtools-1]:
https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/redux/assets/react-redux-to-do-list-devtools-1.png

[devtools-2]:
https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/redux/assets/react-redux-to-do-list-devtools-2.png

[delete]:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
