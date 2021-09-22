import React, { Component } from "react";
import "./BuildControl.css";

interface BuildControlProps {
  disabled: boolean;
  label: string;
  added: () => void;
  removed: () => void;
}

const BuildControl: React.SFC<BuildControlProps> = (props) => {
  return (
    <div className="BuildControl">
      <div className="Label">{props.label}</div>
      <button
        className="Less"
        onClick={props.removed}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className="More" onClick={props.added}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
