import React from "react";
import "./DrawerToggle.css";

interface DrawerToggleProps {
  clicked: () => void;
}
const DrawerToggle: React.SFC<DrawerToggleProps> = (props) => {
  return (
    <div className="DrawerToggle" onClick={props.clicked}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default DrawerToggle;
