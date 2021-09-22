import React from 'react';
import ThemeContext from './ThemeContext';
import Home from './Home';

const App = ({ color }) => (
  <div id="app" style={{ backgroundColor: `${color}`}}>
    <Home />
  </div>
);

class AppWithContext extends React.Component {
  constructor() {
    super();
    this.state = {
      color: 'white',
      updateContext: this.updateContext,
    };
  }

  updateContext = (color) => {
    this.setState({ color });
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <App color={this.state.color} />
      </ThemeContext.Provider>
    );
  }
}

export default AppWithContext;