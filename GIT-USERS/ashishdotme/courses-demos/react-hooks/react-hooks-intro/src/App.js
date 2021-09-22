import React from "react";

class App extends React.Component {
  state = {
    count: 0,
  };

  increaseCounter = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.increaseCounter}>
          I was clicked {this.state.count} times
        </button>
      </div>
    );
  }
}

export default App;
