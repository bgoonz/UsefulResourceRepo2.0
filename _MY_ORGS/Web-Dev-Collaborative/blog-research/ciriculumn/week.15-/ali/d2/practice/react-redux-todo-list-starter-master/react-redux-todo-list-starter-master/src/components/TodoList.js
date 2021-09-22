import React from 'react';
import Task from './Task';
// TODO: Import the application's Redux store instance
// TODO: Import the `deleteTask` action creator function

class TodoList extends React.Component {
  componentDidMount() {
    // TODO: Use `store.subscribe` to force an update when the state changes
    // TODO: Name the subscription as `this.unsubscribe`
  }

  componentWillUnmount() {
    // TODO: Check if `this.unsubscribe` is defined
    // TODO: If its defined, invoke `this.unsubscribe`
  }

  deleteTask = (id) => {
    // TODO: Invoke `deleteTask` based on an `id` input
    //       and dispatch a 'DELETE_TASK' action
  }

  render() {
    // TODO: Get the tasks stored in state with the `getState` method
    // TODO: Use debugger to view state

    // TODO: If there are no tasks stored in state, return `null`.

    return (
      <ul>
        {/* 
          TODO: Render a `Task` component for each of the tasks stored in state 
          TODO: Pass the `this.deleteTask` method as a `deleteTask` prop
        */}
      </ul>
    );
  }
} 

export default TodoList;
