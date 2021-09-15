import React from "react";

import "./components.css";

const QuakeTile = ({ id, magnitude, location, when }) => {
  return (
    <div className="quaketile">
      <h3>Quake {id}</h3>
      <hr />
      <p>Location: {location}</p>
      <p>magnitude: {magnitude}</p>
      <p>When: {when}</p>
    </div>
  );
};

export default QuakeTile;
