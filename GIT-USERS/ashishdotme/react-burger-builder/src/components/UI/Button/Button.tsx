import React from "react";
import "./Button.css";
//const classes = require("./Button.css");

interface ButtonProps {
  btnType: string;
  clicked: () => void;
}
const getColor = (type: string) => {
  if (type === "Danger") {
    return "Danger Button";
  } else {
    return "Success Button";
  }
};
const Button: React.SFC<ButtonProps> = (props) => {
  return (
    <button className={getColor(props.btnType)} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
