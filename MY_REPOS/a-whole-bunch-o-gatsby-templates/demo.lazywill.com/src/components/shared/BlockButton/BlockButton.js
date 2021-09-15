import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import Button from "material-ui/Button";

const styles = () => ({
  root: {
    borderRadius: 0,
    border: 0,
    boxShadow: "none",
    color: "white",
    fontSize: "1.8em",
    fontWeight: 300,
    fontFamily: "inherit",
    height: "100%",
    minWidth: 0,
    textTransform: "none",
    width: "100%"
  },
  label: {}
});

const BlockButton = props => {
  const { classes, children, onClick } = props;
  return (
    <Button {...props} classes={{ root: classes.root, label: classes.label }} onClick={onClick}>
      {children}
    </Button>
  );
};

BlockButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  look: PropTypes.string,
  onClick: PropTypes.func
};

export default withStyles(styles)(BlockButton);
