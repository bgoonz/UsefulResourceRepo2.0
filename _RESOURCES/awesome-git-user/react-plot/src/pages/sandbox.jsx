import React from "react";
import Header from "../components/header";

import "./styles/sandbox.css";

const Sandbox = () => {
  return (
    <div className="sandbox">
      <Header />
      <div className="canvas">
        <svg
          viewBox={`0 0 800 500`}
          preserveAspectRatio="0 0 xMinYMin meet"
          width="100%"
          height="100%"
          style={{ backgroundColor: "beige" }}
        ></svg>
      </div>
    </div>
  );
};

export default Sandbox;
