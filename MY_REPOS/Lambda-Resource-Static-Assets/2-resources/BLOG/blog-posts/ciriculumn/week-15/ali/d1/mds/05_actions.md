
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Actions

As you've already learned from an earlier article, **actions** are the only way
to trigger changes to the store's state. Remember, actions are simple POJOs with
a mandatory `type` key and optional payload keys containing new information.
They get sent using `store.dispatch()` and are the primary drivers of the Redux
loop.

When you finish this article, you should be able to:

* Write an action creator function to facilitate in the creation of action
  objects
* Use constants to define action types to prevent simple typos in action type
  string literals

## Using action creators

When an action is dispatched, any new state data must be passed along as the
**payload**. The example below passes a payload key of `fruit` with the new
state data, 'orange':

```js
const addOrange = {
  type: 'ADD_FRUIT',
  fruit: 'orange',
};

store.dispatch(addOrange);
console.log(store.getState()); // [ 'orange' ]
```

However, when these action payloads are generated dynamically, it becomes
necessary to extrapolate the creation of the action object into a function.
These functions are called **action creators**. The JavaScript objects they
return are the **actions**. To initiate a dispatch, you pass the result of
calling an action creator to `store.dispatch()`.

For example, an action creator function to create 'ADD_FRUIT' actions looks like
this:

```js
const addFruit = (fruit) => {
  return {
    type: 'ADD_FRUIT',
    fruit,
  };
};
```

You can also rewrite the above arrow function to use an implicit return value:

```js
const addFruit = (fruit) => ({
  type: 'ADD_FRUIT',
  fruit,
});
```

> While either approach for defining action creators using arrow functions
> works, the latter approach of using an implicit return value makes it more
> difficult to debug the Redux cycle (you'll see why later in this lesson).

Now we can add any `fruit` to the store using our action creator
`addFruit(fruit)`, instead of having to define an action object for each fruit:

```js
store.dispatch(addFruit('apple'));
store.dispatch(addFruit('strawberry'));
store.dispatch(addFruit('lychee'));
console.log(store.getState()); // [ 'orange', 'apple', 'strawberry', 'lychee' ]
```

## Preventing typos in action type string literals

Update your actions to include `'ADD_FRUIT'`, `'ADD_FRUITS'`, `'SELL_FRUIT'`,
and `'SELL_OUT'`:

```js
const ADD_FRUIT = 'ADD_FRUIT';
const ADD_FRUITS = 'ADD_FRUITS';
const SELL_FRUIT = 'SELL_FRUIT';
const SELL_OUT = 'SELL_OUT';

const addFruit = (fruit) => ({
  type: ADD_FRUIT,
  fruit,
});

const addFruits = (fruits) => ({
  type: ADD_FRUITS,
  fruits,
});

const sellFruit = (fruit) => ({
  type: SELL_FRUIT,
  fruit,
});

const sellOut = () => ({
  type: SELL_OUT,
});
```

Notice that constants were used for all of the fruit action types. This prevents
simple typos in the reducer's case clauses (i.e. `'ADD_FRIUT'`) from
unexpectedly not matching the appropriate action type (i.e. `'ADD_FRUIT'`).
Creating constants for the action type string literals ensures that an error is
thrown if the constant name is mistyped.

## Reviewing a completed Fruit Stand example

To review and run a completed Fruit Stand example application, clone the
[redux-fruit-stand-examples] repo.

After cloning the repo, open a terminal and browse to the `fruit-stand-redux`
folder. Run the command `npm install` to install the project's dependencies.
Then use the command `node app.js` to run the Fruit Stand application. You
should see the following output:

```sh
Default Redux Store (empty fruit list):
[]
Redux Store:
[ 'orange', 'apple' ]
Redux Store:
[ 'orange', 'apple', 'orange', 'lychee', 'grapefruit' ]
Updated Redux Store:
[ 'orange', 'orange', 'lychee', 'grapefruit' ]
Reset Redux Store (empty fruit list):
[]
```

The `reduxSAR.js` file contains the action types, reducer, store, and action
creator functions. The `app.js` file contains the code that interacts with the
Redux store. The `appWithSubscription.js` file also contains code that interacts
with the store but subscribes a callback function (using the `store.subscribe`
method) to listen for and log state updates to the console.

## What you learned

In this article, you learned how to write an action creator function to
facilitate in the creation of action objects. You also learned how to use
constants to define action types to prevent simple typos in action type string
literals.

## See also...

To learn more about actions, see the official [Redux
documentation][redux-js-actions].

[redux-js-actions]: http://redux.js.org/docs/basics/Actions.html
[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples
