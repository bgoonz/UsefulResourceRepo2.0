
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Reducers

As you saw in an earlier article, the Redux store has a **reducer** function for
updating its state. The reducer function receives the current `state` and an
`action`, updates the state appropriately based on the `action.type`, and
returns the next state.

When you finish this article, you should be able to:

* Explain what a _reducer_ is
* Use a `switch` statement within a reducer function to handle multiple action
  types
* Describe why it's important for a reducer to avoid mutating the current state
  when creating the next state

## Updating the reducer to handle additional action types

Recall the reducer from the Fruit Stand application:

```js
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FRUIT':
      return [...state, action.fruit];
    default:
      return state;
  }
};
```

When the store initializes, it calls its reducer with an `undefined` `state`,
allowing the reducer to dictate the store's initial state via the `state`
parameter's default value.

The bulk of the reducer function then implements updates to the state. First,
the reducer decides what logic to implement based on the `action.type` `switch`.
Then, it creates and returns a new object representing the next state (after
processing the action) if any of the information needs to be changed. The
`state` is returned unchanged if no cases match the `action.type`, meaning that
the reducer doesn't _care_ about that action (e.g. `{type:
'NEW_TRANSFORMERS_SEQUEL'}`).

In the above example, the reducer's initial state is set to an empty array (i.e.
`[]`). The reducer returns a new array with `action.fruit` appended to the
previous `state` if `action.type` is `'ADD_FRUIT'`. Otherwise, it returns the
`state` unchanged.

Additional `case` clauses can be added to update the reducer to handle the
following action types:

- `'ADD_FRUITS'` - Add an array of fruits to the inventory of fruits
- `'SELL_FRUIT'` - Remove the first instance of a fruit if available
- `'SELL_OUT'` - Someone bought the whole inventory of fruit! Return an empty
  array

```js
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FRUIT':
      return [...state, action.fruit];
    case 'ADD_FRUITS':
      return [...state, ...action.fruits];
    case 'SELL_FRUIT':
      const index = state.indexOf(action.fruit);
      if (index !== -1) {
        // remove first instance of action.fruit
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state; // if action.fruit is not in state, return previous state
    case 'SELL_OUT':
      return [];
    default:
      return state;
  }
};
```

### Reviewing how `Array#slice` works

If you don't regularly use the [`Array#slice`] method, the following expression
might look odd at first glance:

```js
[...state.slice(0, index), ...state.slice(index + 1)]
```

The [`Array#slice`] method returns a new array containing a shallow copy of the
array elements indicated by the `start` and `end` arguments. The `start`
argument is the index of the first element to include and the `end` argument is
the index of the element to include up to (but not including). If the `end`
argument isn't provided, all of the array elements up to the end of the array
will be included. The original array will not be modified.

By combining two calls to the [`Array#slice`] method into a new array, a copy of
an array can be created that omits an element at a specific index (`index`):

- `state.slice(0, index)` - Returns a new array containing the elements starting
  from index `0` up to `index`
- `state.slice(index + 1)` - Returns a new array containing the elements
  starting from `index + 1` (one past the index to omit the element at `index`)
  up through the last element in the array

Then the spread syntax is used to spread the elements in the slices into a new
array.

Here's a complete example:

```js
const fruits = ['apple', 'apple', 'orange', 'banana', 'watermelon'];

// The index of the 'orange' element is 2.
const index = fruits.indexOf('orange');

// `...fruits.slice(0, index)` returns the array ['apple', 'apple']
// `...fruits.slice(index + 1)` returns the array ['banana', 'watermelon']
// The spread syntax combines the two array slices into the array
// ['apple', 'apple', 'banana', 'watermelon']
const newFruits = [...fruits.slice(0, index), ...fruits.slice(index + 1)];
```

This approach to removing an element from an array is just one way to complete
the operation without modifying or mutating the original array.

## Avoiding state mutations

Inside a Redux reducer, you must never mutate its arguments (i.e. `state` and
`action`). **Your reducer must return a new object if the state changes**.
[Here's why][why-immutable].

Here's an example of a _bad_ reducer which mutates the previous state.

```js
const badReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      state.count++;
      return state;
    default:
      return state;
  }
};
```

And here's an example of a good reducer which uses `Object.assign` to create a
shallow duplicate of the previous `state`:

```js
const goodReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      const nextState = Object.assign({}, state);
      nextState.count++;
      return nextState;
    default:
      return state;
  }
};
```

## What you learned

In this article, you learned about reducers and how to use a `switch` statement
within a reducer function to handle multiple action types. You also learned why
it's important for a reducer to avoid mutating the current state when creating
the next state.

## See also...

To learn more about reducers, see the official [Redux
documentation][redux-js-reducers].

[`Array#slice`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
[why-immutable]: https://github.com/reactjs/redux/issues/758
[redux-js-reducers]: https://redux.js.org/basics/reducers
