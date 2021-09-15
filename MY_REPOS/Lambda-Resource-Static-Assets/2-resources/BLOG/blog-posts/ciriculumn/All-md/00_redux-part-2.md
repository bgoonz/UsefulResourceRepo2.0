
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
