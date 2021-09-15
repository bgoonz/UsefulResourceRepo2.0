import React from "react";

import ThemeContext from "./ThemeContext";
import Home from "./Home";

class App extends React.Component {
  static contextType = ThemeContext;

  render() {
    return (
      <div id="app" style={{ backgroundColor: `${this.context.color}` }}>
        <Home />
      </div>
    );
  }
}

export default App;
