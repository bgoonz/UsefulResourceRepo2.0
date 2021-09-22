import React from "react";
import "../../styles/circle.css";

const Circle = ({ x, y, r, color, opacity, border, border_width, show }) => {
  return (
    <>
      {show && (
        <circle
          cx={x}
          cy={y}
          r={r}
          fill={color}
          opacity={opacity}
          stroke={border}
          strokeWidth={border_width}
        />
      )}
    </>
  );
};

export default Circle;
