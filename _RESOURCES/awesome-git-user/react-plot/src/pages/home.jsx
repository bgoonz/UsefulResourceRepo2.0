import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header-title">React Plot</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link className="App-link" to="/functions">
          Functions
        </Link>
        <Link className="App-link" to="/sandbox">
          Sandbox
        </Link>
        <Link className="App-link" to="/circledrag">
          Click & Drag Animation
        </Link>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Home;
