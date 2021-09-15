import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import BlockButton from "../BlockButton";

const styles = () => ({
  root: {
    width: "60px",
    height: "60px"
  }
});

const SquareButton = props => {
  const { onClick, classes, children } = props;
  return (
    <BlockButton {...props} onClick={onClick} classes={{ root: classes.root }}>
      {children}
    </BlockButton>
  );
};

SquareButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default withStyles(styles)(SquareButton);
