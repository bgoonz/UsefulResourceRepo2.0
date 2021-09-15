import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* global styles */}
        <style jsx global>
          {`
            body {
              margin: 0;
              padding: 0;
              font-family: sans-serif;
            }
          `}
        </style>
        {/* local styles */}
        <style jsx>{`
          .App {
            text-align: center;
          }

          .App-logo {
            animation: App-logo-spin infinite 20s linear;
            height: 80px;
          }

          .App-header {
            background-color: #222;
            height: 150px;
            padding: 20px;
            color: white;
          }

          .App-title {
            font-size: 1.5em;
          }

          .App-intro {
            font-size: large;
          }

          @keyframes App-logo-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default App;
