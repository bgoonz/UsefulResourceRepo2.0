
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Integrating Redux into a React application](#integrating-redux-into-a-react-application)
- [Organizing your Redux code](#organizing-your-redux-code)
  - [Following along](#following-along)
  - [Adding the actions](#adding-the-actions)
  - [Adding the reducer](#adding-the-reducer)
  - [Adding the store](#adding-the-store)
- [Writing Redux-aware React components](#writing-redux-aware-react-components)
  - [Listening for state changes](#listening-for-state-changes)
  - [Dispatching actions](#dispatching-actions)
  - [Listening for state changes and dispatching actions](#listening-for-state-changes-and-dispatching-actions)
  - [Practicing on your own](#practicing-on-your-own)
- [Reviewing a completed Fruit Stand example](#reviewing-a-completed-fruit-stand-example)
- [What you learned](#what-you-learned)

<!-- /code_chunk_output -->
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
improve the organization of your code, the design of your components, and the
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

## Writing Redux-aware React components

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
