import React from "react";
import "./Backdrop.css";
interface BackdropProps {
  clicked: () => void;
  show: boolean;
}
const Backdrop: React.SFC<BackdropProps> = (props) => {
  return props.show ? (
    <div className="Backdrop" onClick={props.clicked} />
  ) : null;
};

export default Backdrop;
