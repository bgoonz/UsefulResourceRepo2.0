import React from "react";
import { Component } from "react";
import Header from "./header";
import Footer from "./footer";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
