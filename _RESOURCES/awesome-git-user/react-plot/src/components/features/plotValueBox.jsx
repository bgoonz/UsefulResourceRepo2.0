import React from "react";
import "../../styles/plotvaluebox.css";

const Values = ({ x, y }) => {
  return (
    <>
      <rect x="80%" y="0" width="20%" height="15%" />
      <text x="85%" y="5%">
        x: {x}
      </text>
      <text x="85%" y="10%">
        y: {y}
      </text>
    </>
  );
};

export default Values;
