import React from "react";
import { Component } from "react";
import Header from "./common/header";
import Footer from "./common/footer";

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
