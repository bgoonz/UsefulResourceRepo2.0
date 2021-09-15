import React from "react";
import ThemeContext from "./ThemeContext";

class ThemeProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      color: "white",
      updateColor: this.updateColor,
    };
  }

  updateColor = (color) => {
    this.setState({ color });
  };

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;
