
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
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
