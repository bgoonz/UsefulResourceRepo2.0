
# Redux Learning Objectives: Part 3

Just like Luke Skywalker returning to Dagobah to complete his Jedi training with
Yoda, it's time for you to return to learning Redux one more time. In this final
section on Redux, you'll learn how to use the React-Redux library to connect
components to a Redux store and how to use middleware and thunks to interact
with an API.

After completing this final section on Redux, you should be able to:

* Describe what a higher-order component (HOC) is
* Write a higher-order component (HOC) that accepts a component as an argument
  and returns a new component
* Use the React-Redux library's `<Provider />` component to make your Redux
  store available to any nested components that have been wrapped in the
  `connect` function
* Use the React-Redux library's `connect` function to give a component access to
  a Redux store
* Write a selector to extract and format information from state stored in a
  Redux store
* Use the React-Redux library's `applyMiddleware` function to configure one or
  more middleware when creating a store
* Write a thunk action creator to make an asynchronous request to an API and
  dispatch an action when the response is received
* Describe a situation where defining multiple containers for a single component
  is advantageous
* Configure a React application to use the Redux development tools
