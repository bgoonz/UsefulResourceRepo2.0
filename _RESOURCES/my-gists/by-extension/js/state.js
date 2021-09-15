import React from "react";

class App extends React.Component {
  state = {
    counter: 0,
  };

  noState = {
    counter: 0,
  };

  increment = (num) => {
    this.setState({
      counter: this.state.counter + num,
    });
  };

  noIncrement = (num) => {
    this.noState.counter = this.noState.counter + num;
  };

  render() {
    return (
      <div className="container">
        <h1>Counter Application: {this.state.counter}</h1>
        {/* provide here function expression which will be executed when clicking
        on button */}
        <button onClick={() => this.increment(1)}>Increment</button>
        <button onClick={() => this.increment(-1)}>Decrement</button>

        <h1>No State Counter: {this.noState.counter}</h1>
        {/* provide here function expression which will be executed when clicking
        on button */}
        <button onClick={() => this.noIncrement(1)}>Increment</button>
        <button onClick={() => this.noIncrement(-1)}>Decrement</button>
      </div>
    );
  }
}

export default App;
