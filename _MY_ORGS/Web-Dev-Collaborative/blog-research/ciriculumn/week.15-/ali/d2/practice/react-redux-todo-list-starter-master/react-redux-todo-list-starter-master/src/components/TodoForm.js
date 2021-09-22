import React from 'react';
// TODO: Import the application's Redux store instance
// TODO: Import the `createTask` action creator function

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Invoke `createTask` with the `inputValue` state
    //       and dispatch a 'CREATE_TASK' action
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Add a todo"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

export default TodoForm;
