//Dependencies
import React, { Component } from 'react';
//Internals
import UserMenu from '../UserMenu';
import MeshDisplay from '../MeshDisplay';
import './styles.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      color: 0x00ff00,
    };
  }

  changeColor = (color) => {
    this.setState({
      color: color.hex,
    });
  }

  render() {
    return(
      <div className="app">
        <div className="app-mesh-display">
          <MeshDisplay color={this.state.color} />
        </div>
        <div className="app-user-menu">
          <UserMenu changeColor={this.changeColor} />
        </div>
      </div>
    )
  }
}

export default App;
