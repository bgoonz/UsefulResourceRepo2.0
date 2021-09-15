import React from 'react';

// TODO: Take in `deleteTask` method and `task` object as props
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
