import React from "react";
import styles from "./testing.scss";

class Testing extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Hello World</h1>
        <h2>Just Testing</h2>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Testing;
