import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import Color from "color";

import InfoOutline from "material-ui-icons/InfoOutline";
import SquareButton from "../shared/SquareButton";

const styles = theme => ({
  root: {
    background: theme.palette.background.blue,
    position: "absolute",
    left: 0,
    "&:hover": {
      background: Color(theme.palette.background.blue)
        .darken(0.1)
        .string()
    }
  }
});

const InfoLink = props => {
  const { classes, onClick } = props;

  return (
    <SquareButton to="/info" component={Link} classes={{ root: classes.root }} onClick={onClick}>
      <InfoOutline />
    </SquareButton>
  );
};

InfoLink.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(InfoLink);
