import React from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

import Phonelink from "material-ui-icons/Phonelink";
import Button from "material-ui/Button";

const styles = theme => ({
  root: {
    display: "block",
    borderRadius: "2px",
    background: theme.main.green,
    border: 0,
    boxShadow: "none",
    color: "white",
    fontWeight: 300,
    fontFamily: "inherit",
    height: "60px",
    lineHeight: 1,
    textTransform: "none",
    padding: ".5em 2em",
    "&:hover": {
      background: theme.main.blue
    }
  },
  label: {
    fontSize: "2em",
    "& svg": {
      width: "1.1em",
      height: "1.1em",
      verticalAlign: "middle"
    }
  }
});

const DemoLink = props => {
  const { classes, onClick } = props;
  return (
    <Button onClick={onClick} classes={{ root: classes.root, label: classes.label }}>
      Try demo&nbsp; <Phonelink />
    </Button>
  );
};

DemoLink.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(DemoLink);
