
# Redux Learning Objectives: Part 1

You've been using React's Context API to manage global state to share the same
information across multiple components. Redux, like Context, gives you a way to
store and manage global state in your React applications. Even though Context
has become a popular option since its introduction, Redux remains a popular
option for projects with sophisticated global state requirements.

After reading and practicing how to use Redux, you should be able to:

* Describe the Redux data cycle
* Describe the role of the store in the Redux architecture
* Explain what a _reducer_ is
* Use the `createStore` method to create an instance of a Redux store
* Use the `store.dispatch` method to dispatch an action to trigger a state
  update
* Use the `store.subscribe` method to listen for state updates
* Use the `store.getState` method to get the current state
* Use a `switch` statement within a reducer function to handle multiple action
  types
* Describe why it's important for a reducer to avoid mutating the current state
  when creating the next state
* Write an action creator function to facilitate in the creation of action
  objects
* Use constants to define action types to prevent simple typos in action type
  string literals
