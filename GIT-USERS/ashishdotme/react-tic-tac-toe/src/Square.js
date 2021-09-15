import React from "react";

export default Square;

function Square(props) {
  return (
    <button className="square" onClick={() => props.handleClick(props.id)}>
      {props.value}
    </button>
  );
}
