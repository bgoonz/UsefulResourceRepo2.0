
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Redux To-do List Project

At this point, you understand how to perform CRUD operations with a backend API.
You also know how to perform CRUD operations by creating a user interface with
React, managing state with React Context, and storing persistent data in local
storage. It's time to create a simple Node to-do list application that utilizes
the Redux library and runs in your terminal! This project is intended as a way
to practice the basics of Redux before learning how to use Redux within a React
application.

In today's project, you will:

- Generate a Redux **store** by using the `createStore` method from the Redux
  library
- Set up a **reducer** to direct different action types to interact with the
  Redux store in different ways
- Set up **actions** to create a task, delete a task, and reset the task list
- Use the `store.getState` method to access the data stored in the Redux store
- Use the `store.dispatch` method to **dispatch** actions to the Redux store
- Use the `store.subscribe` method to subscribe to Redux store changes
- Use the VS Code debugger to follow the Redux cycle

## Phase 1: Create Redux store, actions, and reducer

Run the following commands in your terminal to create a new project directory,
generate a `package.json` file, and install `redux` as a dependency:

```sh
mkdir redux-todos && cd redux-todos
npm init -y && npm install redux
```

Now it's time to create your first Redux project! Create a
`reduxStoreActionReducer.js` file and import the `createStore` method from
Redux. You'll need to use CommonJS module syntax (`module.exports` and
`require`) to be able to run the project within the Node environment:

```js
const { createStore } = require('redux');
```

### Store

You'll use the `createStore` method to generate your Redux store by invoking it
with a reducer. As a reminder, each application should only have one Redux store
where all of an application's state is managed. This is unlike using React
Context, where a single React application can utilize multiple contexts.

Conceptually speaking, you can think of the reducer as a function that helps
manage the Redux store by routing actions based on their `type` attribute. Based
on the official Redux documentation on the [createStore] method and its
parameters, a reducer is a "reducing function that returns the next state tree,
given the current state tree and an action to handle."

Now that we've gone over a conceptual overview of reducers, let's create a
`tasksReducer` to manage the to-do list tasks in your Redux store!

Define the `tasksReducer` function and have it take in the Redux store's `state`
and an `action` as parameters. You'll want the `state` to default to an empty
(`[]`) if the `tasksReducer` is invoked without a state. Since you invoke the
`createStore` method with the `tasksReducer`, you'll need to define the
`tasksReducer` before invoking the `createStore` method to generate the Redux
store.

> **Note:** this project uses an array to store the tasks instead of an object
> to make it easier to delete a positional task, since there is no user
> interface that will expose the task ID needed to dispatch task deletion. In
> the case of this project, a `taskId` will refer to the index of a task in the
> array.

```js
const tasksReducer = (state = [], action) => {
  // TODO: Set up switch statement to manage actions based on type
};

const store = createStore(tasksReducer);
```

The underlying code in the store returned by the `createStore` method will
automatically invoke the `tasksReducer` function whenever an action is
dispatched. Speaking of actions, let's set up the `createTask`, `deleteTask`,
and `resetTaskList` actions before finishing the `tasksReducer` function that
conceptually _routes_ action objects (think of how it makes more sense to create
a component before setting up a `<Route>` for it).

You'll finish defining the `tasksReducer` function after creating the
`createTask`, `deleteTask`, and `resetTaskList` actions that the reducer
manages. You'll set up your actions below the line of code that sets up the
Redux `store`.

### Actions

Let's set up the `createTask` action creator! You'll want your `createTask`
action creator to return an action with the following shape:

```js
{
  type: 'CREATE_TASK',
  taskMessage: 'walk dog',
}
```

As a reminder, an **action creator** is simply a function that returns an
**action** which is a POJO (plain old JavaScript object) that defines a `type`
key and optional payload keys. Have your `createTask` function take in a
`taskMessage` as a parameter:

```js
const createTask = (taskMessage) => {
  // TODO: Return POJO with `type` property and function's argument (`taskMessage`)
};
```

Now you'll want to set up the function's return statement to return the action
POJO. The POJO should have a `type` property. The `type` property will be how
the `tasksReducer` will decipher different types of actions to update the Redux
store's state in different ways. The action will also have a payload key set to
the function's argument (`taskMessage`).

In this case, the `createTask` function has a `taskMessage` parameter, so the
action POJO will have a `type` property set to the string `CREATE_TASK`, as
well as a `taskMessage` property set to the `taskMessage` parameter value. 

```js
const createTask = (taskMessage) => {
  return {
    type: 'CREATE_TASK',
    taskMessage: taskMessage,
  };
};
```

It is best practice to use constants for action types, instead of string
literals. Since the reducer depends on the action's `type` to decipher different
types of actions, a typo in the reducer or action specifying the type will go
unseen. For example, imagine if the reducer needs an action with the type
`CREATE_TASK` to perform the create operation, but there is a typo making the
reducer listen for the type `'CREATE_TSAK'` instead. When an action of type
`CREATE_TASK` is dispatched, it will never be evaluated by the reducer
listening for an action of type `'CREATE_TSAK'`. Creating constants for string
literals ensures that an error will be thrown for action type typos. 

Define a constant for the `CREATE_TASK` string. Make sure to define the
constant before defining your `tasksReducer`, otherwise you'll receive
`ReferenceError: CREATE_TASK is not defined` when you dispatch an action. At
this point, your file should look something like this:

```js
const { createStore } = require('redux');

const CREATE_TASK = 'CREATE_TASK';

const tasksReducer = (state = [], action) => {
  // TODO: Set up switch statement to manage actions based on type
};

const store = createStore(tasksReducer);

const createTask = (taskMessage) => {
  return {
    type: CREATE_TASK,
    taskMessage: taskMessage,
  };
};
```

You can also have the function implicitly return by removing the function's
curly braces and wrapping the action object's curly braces with parentheses. The
`createTask` code below has the exact same functionality as the code above:

```js
const createTask = (taskMessage) => ({
  type: CREATE_TASK,
  taskMessage,
});
```

Although the code looks shorter and cleaner, note that you are unable to use the
[debugger statement] to debug a function when it is implicitly returning. You
can use the VS Code debugger to set a breakpoint, but you won't be able to set a
breakpoint with the `debugger` statement.

When working on your React-Redux projects in the future, it'll be helpful to
keep the `return` statement so you can easily place a breakpoint with the
`debugger` statement to debug the action creator function and make sure a
specific action is actually being dispatched.

Now that you have set up a `createTask` action creator, follow the same pattern
to set up a `deleteTask` action creator that takes in a `taskId`. The
`resetTaskList` action creator will be a little different. You'll still follow
the pattern of setting a `type` for the action, but the `resetTaskList` function
will not take any parameters. The action will simply have a `type` property and
a `emptyTaskList` property set to an empty array:

```js
const resetTaskList = () => {
  return {
    type: RESET_TASK_LIST,
    emptyTaskList: [],
  };
};
```

### Reducer

It's time to circle back and finish implementing the `tasksReducer`! Begin by
setting up a [switch] statement that evaluates a case statement based on the
`action.type`.

```js
const tasksReducer = (state = [], action) => {
  switch (action.type) {
    // TODO: Set up switch case for `createTask` action
    // TODO: Set up switch case for `deleteTask` action
    // TODO: Set up switch case for `resetTaskList` action
    // TODO: Set up default switch case
  }
};
```

Let's begin by setting up the default switch case. By default, you always want
to return the default `state` argument passed into the reducer:

```js
const tasksReducer = (state = [], action) => {
  switch (action.type) {
    // TODO: Set up switch case for `createTask` action
    // TODO: Set up switch case for `deleteTask` action
    // TODO: Set up switch case for `resetTaskList` action
    default:
      return state;
  }
};
```

Now let's set up the `case` statements for each action type. You have three task
actions, so you'll set up three case statements. As a reminder, you set up the
action types with constants to make sure typos in the reducer's `case`
statements throw an error. Use the constants in the switch statement:

```js
const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_TASK:
      // TODO: Define what happens when a `createTask` action is dispatched
    case DELETE_TASK:
      // TODO: Define what happens when a `deleteTask` action is dispatched
    case RESET_TASK_LIST:
      // TODO: Define what happens when a `resetTaskList` action is dispatched
    default:
      return state;
  }
};
```

As a reminder, the reducer function is called every time an action is
dispatched. This means that the `tasksReducer` function will be invoked whenever
an action is dispatched. It's now time to write code to handle each specific
action type and define what happens when actions of different types are
dispatched!

#### `CREATE_TASK` case statement

Under the case statement for `CREATE_TASK`, you'll want to return an updated
version of the reducer's state tree, with the new task. As a reminder, the Redux
store's state should be immutable - this means you should never mutate the
`state` array directly.

Begin by generating a `newTask` object based on the action's `taskMessage`
property:

```js
const newTask = {
  message: action.taskMessage,
};
```

Since you don't want to directly mutate the `state` array, you don't want to
`push` the `newTask` directly into the `state` array. Instead, you can use
spread syntax to return an updated state with `newTask` set as the last array
element in a new array:

```js
case CREATE_TASK:
  const newTask = {
    message: action.taskMessage,
  };
  return [...state, newTask];
```

#### `DELETE_TASK` case statement

Now let's define what happens when a `DELETE_TASK` action is dispatched. As a
reminder, the `deleteTask` action creator function takes in a `taskId` that
actually references a task element's index in the `state` array. In the
`DELETE_TASK` case statement, you'll use the index (the action's `taskId`
property) and the native [Array.slice] method to return a copy of the state that
excludes the task to delete:

```js
case DELETE_TASK:
  const idx = action.taskId;
  return [...state.slice(0, idx), ...state.slice(idx + 1)];
```

Using spread syntax and non-mutative methods are one of the many immutable
update patterns you can use to update state without directly mutating it. Feel
free to visit the official Redux documentation to view more [immutable update
patterns].

#### `RESET_TASK_LIST` case statement

Now let's define what happens when a `RESET_TASK_LIST` action is dispatched. As
a reminder, the action has an `emptyTaskList` property that is an empty array,
similar to the default state set by the reducer. You can simply return the
`emptyTaskList` array to update the Redux store's state. The `emptyTaskList`
will replace the `state` array entirely.

```js
case RESET_TASK_LIST:
  return action.emptyTaskList;
```

## Phase 2: Testing

Start by creating an `app.js` file and importing `store`, `createTask`,
`deleteTask`, and `resetTaskList` from the `reduxStoreActionReducer.js` file.
Since this project is running within the native Node environment, you'll need to
use CommonJS module syntax (`require` and `module.exports`) to manage imports
and exports within the project:

```js
const {
  store,
  createTask,
  deleteTask,
  resetTaskList,
} = require('./reduxStoreActionReducer');
```

Before you begin dispatching actions to test the actions and reducer you have
created, you'll need to set up a way to log the Redux store and view its current
state. You can use the `store.getState` method to access the Redux store's
current state and simply console log the Redux store's state that was retrieved.
To make your logging more clear, you can even add a message labeling the status
of the store logged. After the imports at the top of your `app.js` file, log the
initial state of the Redux store (an empty task list) with the following
`console.log` statements:

```js
console.log('Default Redux Store (empty task list):');
console.log(store.getState());
```

At this point, take a moment to run your Node application by running the follow
terminal statement from the root of the project directory:

```sh
node app.js
```

You should see the following output in your terminal:

```sh
Default Redux Store (empty task list):
[]
```

> Notice how you are currently using `console.log` statements to test and debug
> your code. Later in the project, you'll get a chance to investigate your code
> with the VS Code debugger to gain more context and insight about your code and
> its variable values.

### Dispatch the `CREATE_TASK` action

Now you can test whether you can actually create a task by using the
`store.dispatch` method to dispatch the `CREATE_TASK` action. Invoke the
`createTask` action creator function with a task message, and then dispatch the
invoked action. As a reminder, dispatching the action will "send" it through the
reducer (in this case, the `tasksReducer`) and determine what operation to
perform based on the action's `type` property.

```js
store.dispatch(createTask('walk dog'));
store.dispatch(createTask('feed cat'));
store.dispatch(createTask('talk to bird'));
store.dispatch(createTask('watch goldfish'));

console.log('Redux Store:');
console.log(store.getState());
```

Now run your application with `node app.js` and you should see the following
output in your terminal:

```sh
Default Redux Store (empty task list):
[]
Redux Store:
[ { message: 'walk dog' },
  { message: 'feed cat' },
  { message: 'talk to bird' },
  { message: 'watch goldfish' } ]
```

That may have seemed like magic for now, but at the end of the project, you'll
walk-through your project's code step-by-step to view what is really happening
with the Redux cycle. For now, focus on understanding the idea of _dispatching
an action_.

### Dispatch the `DELETE_TASK` action

Now you can add the following code after your `CREATE_TASK` dispatch calls to
dispatch a `DELETE_TASK` action and log the Redux store's updated state:

```js
store.dispatch(deleteTask(0));
store.dispatch(deleteTask(1));

console.log('Updated Redux Store:');
console.log(store.getState());
```

Run your application with `node app.js` and you should see the following output
in your terminal:

```sh
Default Redux Store (empty task list):
[]
Redux Store:
[ { message: 'walk dog' },
  { message: 'feed cat' },
  { message: 'talk to bird' },
  { message: 'watch goldfish' } ]
Updated Redux Store:
[ { message: 'feed cat' }, { message: 'watch goldfish' } ]
```

### Dispatch the `RESET_TASK_LIST` action

Lastly, take a moment to test the dispatching of the `RESET_TASK_LIST` action
and log the updated state by adding the following code after the `DELETE_TASK`
dispatch calls:

```js
store.dispatch(resetTaskList());
console.log('Reset Redux Store (empty task list):');
console.log(store.getState());
```

If you run your application with `node app.js` and you should see the following
output in your terminal:

```sh
Default Redux Store (empty task list):
[]
Redux Store:
[ { message: 'walk dog' },
  { message: 'feed cat' },
  { message: 'talk to bird' },
  { message: 'watch goldfish' } ]
Updated Redux Store:
[ { message: 'feed cat' }, { message: 'watch goldfish' } ]
Reset Redux Store (empty task list):
[]
```

### Subscribe to Redux store updates

Instead of having multiple console log statements to log `store.getState()`, you
can have your store subscribe to changes in the state with the `store.subscribe`
method. Create a new `appWithSubscription.js` file with the following code to
view how you can invoke `store.subscribe` so that the state is logged anytime
the store is updated (i.e. anytime an action is dispatched).

```js
// ./appWithSubscription.js

const {
  store,
  createTask,
  deleteTask,
  resetTaskList,
} = require('./reduxStoreActionReducer');

console.log('Default Redux Store (empty task list):');
console.log(store.getState());

store.subscribe(() => console.log(store.getState()));

console.log('Task creation actions');
store.dispatch(createTask('walk dog'));
store.dispatch(createTask('feed cat'));
store.dispatch(createTask('talk to bird'));
store.dispatch(createTask('watch goldfish'));

console.log('Task deletion actions');
store.dispatch(deleteTask(0));
store.dispatch(deleteTask(1));

console.log('Task reset action');
store.dispatch(resetTaskList());
```

Run your application with `node appWithSubscription.js` and you should see the
following output. Notice how the state was logged four times under "Task
creation actions" because of how four actions were dispatched, and the state was
logged twice after "Task deletion actions" because of how two actions were
dispatched.

```sh
Default Redux Store (empty task list):
[]
Task creation actions:
[ { message: 'walk dog' } ]
[ { message: 'walk dog' }, { message: 'feed cat' } ]
[ { message: 'walk dog' },
  { message: 'feed cat' },
  { message: 'talk to bird' } ]
[ { message: 'walk dog' },
  { message: 'feed cat' },
  { message: 'talk to bird' },
  { message: 'watch goldfish' } ]
Task deletion actions:
[ { message: 'feed cat' },
  { message: 'talk to bird' },
  { message: 'watch goldfish' } ]
[ { message: 'feed cat' }, { message: 'watch goldfish' } ]
Task reset action:
[]
```

### Debug to follow the Redux cycle

Now that you've used `console.log` statements to thoroughly investigate your
project, you can set up the VS Code debugger and add some breakpoints to follow
the Redux cycle. You'll use the breakpoints to investigate how invoking
`store.dispatch` with the result from an action creator function directs the
action to a specific switch case in the `tasksReducer` function. Start by
creating a `.vscode` directory and a `launch.json` file to configure the VS Code
debugger:

```sh
mkdir .vscode && cd .vscode
touch launch.json
```

Paste the following configuration into your `launch.json` file:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/app.js"
    }
  ]
}
```

> As a reminder, VS Code can also auto-generate the `.vscode` directory and the
> `launch.json` for you. Feel free to visit the VS Code documentation for more
> on [debugging with VS Code].

You can follow your code when an action object is dispatched by setting
breakpoints. You can also examine the action's attributes by setting a
breakpoint in the reducer. In the reducer, make sure to set the breakpoint
within a `case` statement. For example, if you set a breakpoint in the `switch`
statement, but _outside_ of a `case` statement, you won't ever hit the
breakpoint set.

```js
// Example of bad `debugger` placement that will not work!

switch (action.type) {
  debugger;
  case CREATE_TASK:
    const newTask = {
      message: action.taskMessage,
    };
    return [...state, newTask];
```

Take a moment to use the `debugger` keyword to set breakpoints in the
`createTask` action creator and `CREATE_TASK` case statement in your
`reduxStoreActionReducer.js` file:

```js
const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_TASK:
      debugger
      const newTask = {
        message: action.taskMessage,
      };
      return [...state, newTask];
    case DELETE_TASK:
      const idx = action.taskId;
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    case RESET_TASK_LIST:
      return action.emptyTaskList;
    default:
      return state;
  }
};
```

```js
const createTask = (taskMessage) => {
  debugger
  return {
    type: CREATE_TASK,
    taskMessage,
  };
};
```

Now you'll be able to pause the running of your code to examine variables in the
environment and view step-by-step updates to the Redux store's `state` as your
code is evaluated. 

Open `app.js` as the active file in your VS Code workspace. Press `F5` and
select `Node.js` as your environment - VS Code will try to run your currently
active file in debug mode. This will allow you to follow each dispatched action
and watch how each dispatched action updates the Redux store's state.

As you step through each dispatched action, you'll notice that there really is a
_cycle_: an action is generated, then the action is dispatched to go through a
reducer, and then the store is updated.

Here is a quick breakdown of what happens with the `CREATE_TASK` action is
dispatched, to guide the navigation of using VS Code debugger to investigate the
Redux cycle:

1. The `createTask` action creator function is invoked with the string `'walk
   dog'`.
2. The `createTask` function returns a POJO (known as an "action") with a `type`
   attribute and `taskMessage` properties. The POJO is structured like this:
  ```js
  {
    type: 'CREATE_TASK',
    taskMessage: 'walk dog',
  }
  ```
3. The `store.dispatch` method is invoked to dispatch the action POJO and invoke
   the `tasksReducer` function. Since the POJO has a type of `CREATE_TASK`,
   the case statement for `CREATE_TASK` will be evaluated:
  ```js
  case CREATE_TASK:
    const newTask = {
      message: 'walk dog', // This is `action.taskMessage`
    };
    return [...state, newTask];
  ```
4. The store's state is updated to be the new state returned by the reducer
   (`[...state, newTask]`).

Congratulations! You have just created your first Redux store, reducer, and
actions. You also learned more about what a reducer is doing by investigating
with console log statements and debugging the project with the VS Code debugger.

[createStore]: https://redux.js.org/api/createstore/
[switch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
[immutable update patterns]: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#inserting-and-removing-items-in-arrays
[Array.slice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
[debugger statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger
[debugging with VS Code]: https://code.visualstudio.com/Docs/editor/debugging
