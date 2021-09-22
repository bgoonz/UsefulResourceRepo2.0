import React from "react";
import { Component } from "react";
import Hero from "./common/hero";

export default class App extends Component {
  render() {
    return (
      <div>
        <Hero />
        {this.props.children}
      </div>
    );
  }
}
