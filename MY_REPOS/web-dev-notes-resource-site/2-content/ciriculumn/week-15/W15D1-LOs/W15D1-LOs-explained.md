## Redux (W15D1) - Learning Objectives

### Redux
1. Describe the Redux data cycle
- Redux is a node package that facilitates a particular implementation of Flux, which itself is simply a pattern to follow to implement a unidirectional flow of data in our front-end applications.
- The Redux adaptation of Flux can be seen in the following gif:
![redux-cycle](./redux.gif)
- If we start at the view, ie what the user sees and interacts with, we can describe the cycle as follows.
- An event is fired, such as a component mounting, or a user clicking on a button.
- There are two major scenarios that result from this event.
  1. If our application knows everything that it needs to reflect the change in our store, we can create an action and dispatch it. An example would be a change to the UI, such as showing a form. We don't need any outside information, we are simply updating our store to indicate that a form should now be displayed.
  2. If our application needs to perform additional outside functions, such as posting or fetching information to/from a database, we dispatch a function, which will be intercepted and invoked before it hits our reducers. The function will ultimately get its data and then dispatch its own action with any additional data that it needed.
- An action is dispatched to the reducers. An action is a POJO that at a minimum has a `type` key, but can also have additional data associated with it that is necessary to invoke a specific desired change in our store.
  - For example, logging out a user may not need any additional information, since we are simply removing information from our store that we already know the location of.
  - Adding a new pokemon in a pokedex application, however, would require us to have the information about the pokemon in the action object so that we can add this data to our store.
- The action is sent to our reducers. The reducers look at the `type` key and see if they need to respond to this particular action. If they do, they return a new object that represents their updated state. It's possible that only one reducer responds to a particular action `type` or that several reducers will need to respond to it, updating their 'slice' of state. This difference does not matter to us because every action will hit every reducer, with reducers that are not impacted by the action simply returning their previous state.
- Redux is a separate tool from React. As you've seen from lectures and projects, we do not need to implement React in order to take advantage of a Redux store. With that in mind, Redux does play very nicely with React. After the action has hit all of our reducers and our state has been updated, the new state is passed along to each connected component, as we will see in future lessons. If the slice of state that that component was concerned with has changed, the props being passed in to the component will change. As we know from basic React, a change in props will result in a rerendering of the component, which will ultimately reflect any changes that our initial event triggered.

2. Describe the role of the store in the Redux architecture
- The store holds the global state of an application.
- It provides a central location where data can be accessed.
- We interact with the store by dispatching actions, which are processed by our reducer to update the state of our store (see next LOs for details).
- We can subscribe functions to be invoked whenever an action is dispatched.
- We can view the content of our store's current state with a call to `getState`.

3. Explain what a reducer is
- A reducer is a function that is called each time an action is dispatched. The reducer receives an action and the current state as arguments and returns an updated state.
- Redux reducers are required to be pure functions of the dispatched action and the current state. This makes their behavior very predictable and allows their effects to potentially be reversed.
- A typical reducer has a switch statement with a case for each action `type` that will modify its slice of state, as well as a default case. For cases that modify, the reducer returns a new object that reflects the result of the action, it does not mutate the original object. For actions that the reducer is not concerned with, the default case simply returns the previous state.
```js
// The `state` parameter is assigned a default value of [] in this case.
// We will often assign a default value of [], {}, or some value such as { currentUser: null } that will be modified by actions dispatched to us.
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FRUIT":
      return [...state, action.fruit];
    default:
      return state;
  }
};

export default fruitReducer;
```

4. Use the `createStore` method to create an instance of a Redux store
- The `createStore` function is imported from the `redux` library.
- It must take in a reducer as its first argument, with optional arguments for a preloaded state and enhancers.
- The preloaded state argument can set a default value for our store to be created with (we'll see this can be helpful when restoring data from a session on reload, for example)
- Enhancers are middleware functions that we'd like to run with each dispatched action. These are separate from subscribed functions. Where subscribed functions are only invoked after an action has been dispatched and the store has been interacted with, enhancers can interact with the action and store both before and after the store is updated. We often see enhancers used for functionality such as logging the action that was dispatched and how the store was impacted before and after. Another use case would be for middleware that we want to be able to interact with or mutate an action before it hits our reducers, such as thunk middleware.
```js
import { createStore } from 'redux';

const fruitReducer = (state = [], action) => {
  // TODO implement reducer
}

const store = createStore(fruitReducer);
```

5. Use the `store.dispatch` method to dispatch an action to trigger a state update
- Dispatching an action means we are going to be sending an object to our reducer in order to impact our store in some way.
- The action that we dispatch should have a `type` key so that our reducer's switch statement can determine if/how it needs to interact with the object.
- Our action can have optional additional key/value pairs, often referred to as the "payload", so that our reducer can use this data to impact our store. We often include data that we are trying to add, objects that we are trying to modify, keys to items we are trying to remove, etc.
```js
// The action that we'll dispatch:
const addOrange = {
  type: 'ADD_FRUIT',
  fruit: 'orange',
};

// The reducer that we'll be impacting
// Notice that this reducer has a case that matches our action's type
// If we didn't have this case, we would hit our default and return the original state
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FRUIT':
      return [...state, action.fruit];
    default:
      return state;
  }
};

// Invoking our dispatch function:
console.log(store.getState()); // []
store.dispatch(addOrange);
console.log(store.getState()); // [ 'orange' ]
```

6. Use the `store.subscribe` method to listen for state updates
- If we want a function to be invoked every time an action has been dispatched, we can pass the function to `store.subscribe`.
- The return value of `store.subscribe` is a function that can be invoked in order to remove the original function's subscription so that it will no longer be invoked with each action.
- It's important to note that the functions that we pass to `store.subscribe` are going to be invoked *after* the action has been dispatched and the store has been updated.
```js
// Assuming the same reducer and action as the above code block:

// This function is going to be subscribed, meaning it will be invoked after each action is dispatched.
// getState will be the state after the action has already impacted the store
const display = () => {
  console.log(store.getState());
};

// Invoking this function later on will remove the display function from the store's subscriptions, no longer executing the logging functionality
const unsubscribeDisplay = store.subscribe(display);

store.dispatch(addOrange); // [ 'orange', 'orange' ]

// display will no longer be invoked after store.dispatch()
unsubscribeDisplay();

store.dispatch(addOrange); // no output
```

7. Use the `store.getState` method to get the current state
- We can view the current structure and contents of the store by invoking the `store.getState()` function.
- The return value is a snapshot of the current store; its current contents.
- We've seen examples in the previous code block, where we invoke `getState` and then log the results. We did this in a "display" function that we subscribed to the store so that any action being dispatched results in us getting the current state of the store and logging it to the console.

8. Use a `switch` statement within a reducer function to handle multiple action types
- Our reducers are able to effectively interact with different actions by incorporating a switch statement.
- The reducer switches over the action's `type` key, the only required key on an action object.
- By including a case for each action type that this reducer wants to impact the store for, we can interact with each action appropriately and return the resulting version of the store's state.
- In the example below, we have cases for `ADD_FRUIT`, `ADD_FRUITS`, `SELL_FRUIT`, and `SELL_OUT`. Each of these action types interact with our store slightly differently.
- We also include a `default` case. If an action's type doesn't match any of our cases, we want to return our previous state. By returning our previous state, we are maintaining the content of our store without making any changes.
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

9. Describe why it's important for a reducer to avoid mutating the current state when creating the next state
- It's important for us to return a new object in our reducers instead of mutating our state.
- We want our reducers to be pure functions, taking in arguments and returning a value in a predictable way without making any kind of outside impact.
- The fact that we are returning new objects becomes very important for future applications, as well. In addition to making sure we aren't inadvertantly changing other aspects of our state, the ability to compare our previous store's state to the new state that we are returning will be beneficial in determining exactly which slices of state have changed due to our action.
- This is especially useful when we connect to React later on, allowing us to easily see which components need to receive this new data. 
- We return a new object when an action modifies our slice of state so that `react-redux` knows a change has occurred and can trigger a new mapping of the store's state to props that are concerned with it. If we were to modify the state object itself, it would assume since the new slice of state has the same object id as the old slice of state that no changes have occurred and will not remap and rerender. This ensuring that state is immutable is part of the optimization that makes the diffing algorithms so fast.

10. Write an action creator function to facilitate in the creation of action objects
- We can create functions that will return objects in a format that will be able to be dispatched to our store.
- The reason we would want to make a function for this is to make our code dry and more dynamic.
- If we want to be able to add "apple", "banana", or "orange" into our store, instead of having to make an action for each, we can make a function that takes in the fruit that we want to add and then returns the action POJO appropriate for that fruit:
```js
const addFruit = (fruit) => {
  return {
    type: 'ADD_FRUIT',
    fruit,
  };
};
```
- Now that we have this function, we can dispatch the function invoked with our specific fruit that we want to add at that time.
```js
store.dispatch(addFruit("apple"));
store.dispatch(addFruit("banana"));
store.dispatch(addFruit("apple"));
store.dispatch(addFruit("apple"));
store.dispatch(addFruit("orange"));
```

11. Use constants to define action types to prevent simple typos in action type string literals
- Using constants instead of typing out our strings for an action's `type` can be helpful in preventing typos.
- This is particularly useful based on the structure of our reducers. If we have a typo in our action's `type` we won't receive an error. Our string simply won't match any of our cases and we'll hit the switch's `default`, resulting in no change in our store when we dispatch the action; a tricky bug to track down.
- If we only define the string in one location as a constant and import it wherever it is used, we will not be hitting that default case. Having a typo in our variable name will result in an error (referencing a variable that was not declared).
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
```js
import { ADD_FRUIT, ADD_FRUITS, SELL_FRUIT, SELL_OUT } from './FruitActions';

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
```
