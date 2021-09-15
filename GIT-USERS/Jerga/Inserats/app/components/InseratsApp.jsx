import React, { Component } from "react";

import Header from "./InseratsHeader";

class InseratApp extends Component {
  render() {
    return (
      <div className="row">
        <div className="column small-10 small-centered">
          <div className="container">
            <Header />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default InseratApp;
