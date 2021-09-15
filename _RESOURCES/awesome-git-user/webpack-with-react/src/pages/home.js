import React from "react";
import "../styles/home.css";
import WebpackLogo from "../assets/webpack-icon.png";

const Home = () => {
  return (
    <div>
      <header>
        <h2>Webpack 4 with React</h2>
      </header>
      <h1 className="title">Now we have a React Project</h1>
      <h2 className="title">CSS works, too!</h2>
      <h2 className="title">And images. Yay!</h2>
      <div className="img-container">
        <img width="200" src={WebpackLogo} alt="" />
      </div>
    </div>
  );
};

export default Home;
