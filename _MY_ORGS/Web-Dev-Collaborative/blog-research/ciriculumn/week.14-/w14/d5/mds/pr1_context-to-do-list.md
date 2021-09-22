# React Context To-do List Project
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Phase 1: Set up your project](#phase-1-set-up-your-project)
  - [Create a context](#create-a-context)
- [Phase 2: Provider wrapper component](#phase-2-provider-wrapper-component)
  - [Set default state](#set-default-state)
  - [Create a task](#create-a-task)
  - [Delete a task](#delete-a-task)
  - [Use a provider component](#use-a-provider-component)
- [Phase 3: Consumer wrapper component](#phase-3-consumer-wrapper-component)
- [Phase 4: Access context through contextType](#phase-4-access-context-through-contexttype)

<!-- /code_chunk_output -->
________________________________________________________________________________

Today you'll be building a to-do list application with React and local storage.
Instead of threading props from a parent to its children and grandchildren,
you'll use Context to share information with any of your application's
components!

As a reminder, Context gives you a convenient way to pass data through the
component tree without having to manually thread props. This project will also
give you a better understanding of how to share and update "global" data across
a React application.

In this project, you will:

* Create and use a `TodoContext` to share global information
* Create an `AppWithContext` wrapper component that uses `Provider` to set the
  default value of `TodoContext` in your application
* Create a `TodoFormWithContext` wrapper component that uses `Consumer` to allow
  child components to subscribe to the application's global `TodoContext`
* Use the `static contextType` property to access the global `TodoContext` in a
  class component
* Update the global value of the `TodoContext` from a nested component
* Use a `debugger` to investigate the context value from nested component

## Phase 1: Set up your project

Begin by using the `create-react-app` package to create a React application:

```sh
npx create-react-app context-to-do-list --template @appacademy/simple
```

Next, set up your application file structure based on the file tree below. To
begin, you'll want two subdirectories within `src`: `components` and `contexts`.

```
├── package-lock.json
├── package.json
├── public
│   └── index.html
└── src
    ├── App.js
    ├── AppWithContext.js
    ├── components
    │   ├── Task.js
    │   ├── TodoForm.js
    │   └── TodoList.js
    ├── contexts
    │   └── TodoContext.js
    └── index.js
```

Within your `components` directory, you'll want a `Task` component:

```js
// ./src/components/Task.js

import React from 'react';

const Task = () => {
  const handleClick = () => {
    // TODO: Delete task
  }
  
  return (
    <li>
      <h1>Hi, I'm a task in your to-do list!</h1>
      <button onClick={handleClick}>Delete Task</button>
    </li>
  );
}

export default Task;
```

You'll also want a `TodoList` component:

```js
// ./src/components/TodoList.js

import React from 'react';
// import Task from './Task';
// TODO: Import context

class TodoList extends React.Component {
  // TODO: Access context

  render() {
    return (
      <ul>
        {/* TODO: Render a `Task` component for each of the `tasks` stored in context */}
      </ul>
    );
  }
} 

export default TodoList;
```

You'll also want a `TodoForm` component:

```js
// ./src/components/TodoForm.js

import React from 'react';
// TODO: Import TodoContext

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Set default `inputValue` state
  }

  handleInputChange = (e) => {
    // TODO: Update `inputValue` state
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Create a task based on the `inputValue`
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Add a todo"
          value={/* TODO: Set the `inputValue` state as the input's value */}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

const TodoFormWithContext = () => (
  // TODO: Use a Consumer component to wrap the TodoForm
  // TODO: Pass the `createTask` method stored in the context value as a prop to TodoForm
);

export default TodoFormWithContext;
```

Now you'll update your `App` component to render the `TodoForm` and `TodoList`
components, along with a "To-do List" header.

```js
// ./src/App.js

import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => (
  <div>
    <h1>To-do List</h1>
    <TodoForm />
    <TodoList />
  </div>
);

export default App;
```

### Create a context

Let's get started on creating the `TodoContext` that will store your to-do list
application's global information! Within your `contexts` directory, you'll set
up the `TodoContext.js` file. Create and export a `TodoContext` by using the
`createContext()` method, like so:

```js
// ./src/contexts/TodoContext.js

import { createContext } from 'react';

const TodoContext = createContext();

export default TodoContext;
```

Now that you have a `TodoContext` set up, you can work on providing the context
value from a parent `TodoContext.Provider` component. In the next phase, you'll
create an `AppWithContext` to wrap your `App` component with a parent
`TodoContext.Provider` component. This will provide the context `value` to the
`App` component and any of its child or grandchildren components.

## Phase 2: Provider wrapper component

Create a `AppWithContext` wrapper component. This wrapper component will take
care of _providing_ the context value. Start off with this code skeleton of the
`AppWithContext` component:

```js
// ./src/AppWithContext.js

import React from 'react';
// TODO: Import TodoContext
// TODO: Import App

class AppWithContext extends React.Component {
  constructor() {
    super();
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    // TODO: Set up default state (tasks, createTask, deleteTask)
  }

  createTask = (task) => {
    // TODO: Use the built-in Date `getTime` method to generate the `nextTaskId` for the `newTask`
    // TODO: Generate a `newTask` object, structured with proper "state shape"
    // TODO: Update the `tasks` state
    // TODO: Invoke the `updateLocalStorageTasks` method
  }
  
  deleteTask = (id) => {
    // TODO: Delete the task based on the task `id`
    // TODO: Update the `tasks` state
    // TODO: Invoke the `updateLocalStorageTasks` method
  }

  updateLocalStorageTasks = () => {
    console.log(this.state.tasks);
    const jsonTasks = JSON.stringify(this.state.tasks);
    localStorage.setItem('tasks', jsonTasks);
  }
  
  render() {
    return (
      // TODO: Use a Provider component to wrap the App component
      // TODO: Use the AppWithContext state as the Provider component's `value`
    );
  }
}

export default AppWithContext;
```

Begin by importing the `TodoContext` and `App` component. Next, you'll want to
set up a default state with `tasks`, `createTask`, `deleteTask`.

### Set default state

Set the value of the `tasks` state to the `storedTasks`, _or_ an empty object
(`{}`) if `storedTasks` is null. Notice how `storedTasks` is simply accessing
the local storage item with a name of `tasks`, and parsing the JSON string back
to JavaScript.

```js
const storedTasks = JSON.parse(localStorage.getItem('tasks'));
```

For the `createTask` state and `deleteTask` state, you'll want to set the state
values to their prospective methods, like so:

```js
createTask: this.createTask,
deleteTask: this.deleteTask,
```

### Create a task

Now you'll define the `createTask` method. Use the built-in Date `getTime`
method to generate the `nextTaskId` for the `newTask`. You'll also want to
generate a `newTask` object. You can use square brackets around the `nextTaskId`
to use the generated integer as a key:

```js
const newTask = {
  [nextTaskId]: {
    id: nextTaskId,
    message: task,
  },
};
```

As you might remember, the `tasks` state is set to the `storedTasks`, _or_ an
empty object (`{}`) as default. You might be wondering why you are using an
object instead of an array. You are being prepared to work with [normalized
state shape]! The `byId` slice of state in the Redux documentation's example
illustrates the state format you will be building today. Similarly to how each
post has its ID as a key, each task will have its ID as a key, as well as `id`
and `message` properties.

```js
byId : {
  "post1" : {
    id : "post1",
    author : "user1",
    body : "......",
    comments : ["comment1", "comment2"]
  },
  "post2" : {
    id : "post2",
    author : "user2",
    body : "......",
    comments : ["comment3", "comment4", "comment5"]
  }
},
```

In the future, you'll be working with Redux and will manage much more data. Feel
free to view the [nested state shape with an array] and read more about how
using normalized state shape is an improvement. The documentation explains how
"compared to the original nested format, this is an improvement in several
ways."

After generating a `newTask` object, you'll want to update the `tasks` state
with the new object and then update the tasks stored in local storage. First,
let's take a closer look at the `updateLocalStorageTasks` method. You'll see
that it takes care of logging the tasks to your DevTools console, converting the
JavaScript `tasks` object into a JSON string, and then storing the tasks in
local storage, under the name `tasks`.

```js
updateLocalStorageTasks = () => {
  console.log(this.state.tasks);
  const jsonTasks = JSON.stringify(this.state.tasks);
  localStorage.setItem('tasks', jsonTasks);
}
```

You can spread the `tasks` slice of state and the attributes of the `newTask` to
generate a collection of updated tasks. When a state update depends on a
previous state value, you need to [pass a function] into the `setState` method
to reliably get the previous state value. Since your `createTask` method relies
on the previous state to produce the next state, the method's `setState`
invocation will look something like this:

```js
this.setState((state, props) => ({
  tasks: { ...state.tasks, ...newTask },
}));
```

After the `tasks` slice of state has been updated, you'll want to update the
tasks stored in local storage by invoking the `updateLocalStorageTasks` method.
The `setState()` method takes an optional callback as its second parameter so
that you can have asynchronous behavior with `setState()`. Note that you can't
`await` on a `setState()` method since it doesn't return a promise!

Invoke `setState` with a callback that invokes the `updateLocalStorageTasks`
method, so that the method is invoked after the state is set:

```js
this.setState((state, props) => ({
  tasks: { ...state.tasks, ...newTask },
}), () => this.updateLocalStorageTasks());
```

### Delete a task

Delete a task based on the task's `id`. Since your `tasks` state is structured
as an object, you can use the [delete operator] to delete a specific task.
Although you can delete a specific tasks directly from the `tasks` slice of
state, it's best practice not to do so.

It's best practice to maintain immutable state, meaning that you should not
directly delete a task from the `tasks` slice of state with the delete operator.
You can maintain immutable state by making a copy of the `tasks` slice of state
with spread syntax, and then using the delete operator to delete a specific task
within the `setState` method.

```js
this.setState((state, props) => {
  const tasksWithDeletion = { ...state.tasks };
  delete tasksWithDeletion[id];
  return {
    tasks: tasksWithDeletion,
  };
}));
```

> **Reminder:** when a state update depends on a previous state value, you need
> to pass a function into the `setState` method to reliably access the previous
> state.

Just like how you used an optional callback to invoke the
`updateLocalStorageTasks` method asynchronously within the `createTask` method,
you'll do the same for task deletion.

### Use a provider component

Now it's time to provide context to your application. Use a `Provider` component
(`<TodoContext.Provider>`) to wrap the `App` component in the `render` method.
You'll use the `AppWithContext` state as the Provider component's `value`.

As a reminder, rendering the `Provider` component and nesting the `App`
component as a child within the `Provider` component will provide the context
`value` (global state of the application) to your application. The `App`
component and any of its child or grandchildren components will then be able to
access any information stored within the context `value`. Since your `App`
component renders the rest of your application's components, the context value
will be provided to any of its child components as well - even if they were not
directly rendered as a child component of `<TodoContext.Provider>`!

Lastly, take a moment to update your `index.js` to render your new
`AppWithContext` component instead of the `App` component. This will not result
in any breaking changes, as you have simply replaced the `App` component with
another component that wraps and renders it.

## Phase 3: Consumer wrapper component

It's time to set up a consumer wrapper component to allow the `TodoForm`
component to _consume_ the `TodoContext`. Begin by importing `TodoContext` into
the file and updating the return of the `TodoFormWithContext`. Within the
`TodoFormWithContext`, you use a `Consumer` component (`<TodoContext.Consumer>`)
to wrap the `TodoForm` and pass render props.

Pass the `createTask` method stored in the context `value` as a prop to the
`TodoForm`. Since you set the `AppWithContext` state as the `value` in the
`<TodoContext.Provider>`, you can access anything stored in the `AppWithContext`
state through the `value` prop referenced within the `<TodoContext.Consumer>`:

```js
<TodoContext.Consumer>
  {value => /* TODO: Pass the `createTask` method as a prop to TodoForm */ }
</TodoContext.Consumer>
```

Now that you have the consumer wrapper component set up, it's time to work on
the `TodoForm` component. Set the default `inputValue` state to an empty string
and update `inputValue` state within the `handleInputChange` method. You'll also
want to set the `inputValue` state as the form input's value so that the input
is a [controlled component].

On form submission, you'll want to create a task based on the `inputValue` by
invoking the `createTask` prop passed from the context consumer. As a reminder,
the `createTask` method updates the `tasks` stored in the `AppWithContext`
state. This means that whenever the `createTask` method is invoked, the global
`tasks` state will update and any components that subscribe to the context (via
a `Consumer` component or `static contextType`) will have access to the updated
tasks.

Before moving onto the next phase, use a `debugger` to investigate what actions
happen when you submit the `TodoForm`. Set two `debugger` statements: one in the
`handleSubmit` method defined in `TodoForm` and another in the `createTask`
method defined in `AppWithContext`. With these two debugger statements, you can
trace whether invoking `this.props.createTask` really invokes the `createTask`
method in the `AppWithContext` component.

![debugger-createTask][debugger-createTask]

## Phase 4: Access context through contextType

Now you'll access context by using the `static contextType` property instead of
setting up a consumer wrapper component. Uncomment the import statement for
`Task` and import the `TodoContext` into your `TodoList.js` file. Set the
`TodoList` component's `static contextType` property to the `TodoContext`. By
setting the `contextType` property, the `TodoList` component gains access to the
context value via `this.context`. As a reminder, you can use a `debugger`
statement to investigate `this.context` to view everything stored as the context
value before moving forward.

![debugger-context][debugger-context]

Access the `tasks` and `deleteTask` method stored within the context value. Map
over each of the `tasks` and render a `Task` component for each task. Since your
tasks are currently formatted as an object, you'll need to convert the object to
an iterable array before mapping over them. You can use the [Object.values]
method to access an array containing the object's property values.

You'll want to set a task ID `key` for each of the tasks, as well as pass the
task as a prop for each `Task` component rendered. In order to keep the `Task`
component as a function component, you'll pass the `deleteTask` method from
context as a prop into each rendered `Task` as well. As a reminder, the `static
contextType` property can only be used in class components.

Now have the `Task` component take in the props. Then update the click handler
to invoke the `deleteTask` prop with the task's ID. You'll also want to replace
the "Hi, I'm a task in your to-do list!" message with the task's message.

Congratulations! You have just built a to-do list application with React
Context! You used a context provider to set a global context value, used a
context consumer to pass render props into a consuming component, and used the
`static contextType` property to give a class component access to the context
value. In the next Context project, you'll work on using Context to store a
user's login session information.

[normalized state shape]: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/#designing-a-normalized-state
[nested state shape with an array]: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/#normalizing-state-shape
[pass a function]: https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
[delete operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
[Context.Consumer documentation]: https://reactjs.org/docs/context.html#contextconsumer
[controlled component]: https://reactjs.org/docs/forms.html#controlled-components
[Object.values]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
[debugger-context]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-context/assets/debugger-context.gif
[debugger-createTask]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-context/assets/debugger-createTask.gif
