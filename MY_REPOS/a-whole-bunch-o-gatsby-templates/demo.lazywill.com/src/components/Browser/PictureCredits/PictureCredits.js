import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import CreditsDetailsToggle from "./CreditsDetailsToggle";
import CreditsDetails from "./CreditsDetails";

const styles = () => ({
  root: {
    bottom: 0,
    left: 0,
    position: "absolute",
    width: "100%",
    ".picture-mode &": {
      display: "none"
    }
  }
});

//const PictureCredits = ({ picture, classes, onClick, detailsOpened, ...props }) => {
const PictureCredits = ({ picture, classes, onClick, detailsOpened }) => {
  return (
    <div className={`${classes.root} ${detailsOpened ? "opened" : ""}`}>
      <CreditsDetailsToggle detailsOpened={detailsOpened} onClick={onClick} />
      <CreditsDetails picture={picture} />
    </div>
  );
};

PictureCredits.propTypes = {
  classes: PropTypes.object.isRequired,
  picture: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  detailsOpened: PropTypes.bool.isRequired
};

export default injectSheet(styles)(PictureCredits);
