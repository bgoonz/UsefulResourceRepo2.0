import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Circle from "../elements/hideableCircle";

const CircleDrag = () => {
  const [x, setX] = useState("100");
  const [y, setY] = useState("100");

  const canvas = useRef(null);

  useEffect(() => {
    let svg = d3.select(canvas.current);

    svg.on("mousedown", () => {
      updateMousePos(svg);
    });
    svg.on("mouseup", () => {
      fixMousePos(svg);
    });
  });

  const updateMousePos = (svg) => {
    svg.on("mousemove", () => {
      let point = d3.mouse(canvas.current);
      setX(point[0]);
      setY(point[1]);
    });
  };

  const fixMousePos = (svg) => {
    svg.on("mousemove", null);
  };

  console.log({ x, y });
  return (
    <div className="circlemain">
      <svg
        width={600}
        height={400}
        ref={canvas}
        style={{ background: "beige" }}
      >
        <Circle
          x={x}
          y={y}
          r="40"
          color="dodgerblue"
          border="hotpink"
          show={true}
          border_width={2}
        />
      </svg>
    </div>
  );
};

export default CircleDrag;
