import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import Color from "color";

import ArrowForward from "material-ui-icons/ArrowForward";
import InfoOutline from "material-ui-icons/InfoOutline";
import SquareButton from "../shared/SquareButton";

const styles = theme => ({
  root: {
    background: theme.palette.background.blue,
    position: "absolute",
    left: "100%",
    marginLeft: "-60px",
    transition: "all .8s",
    "&:hover": {
      background: Color(theme.palette.background.blue)
        .darken(0.1)
        .string()
    },
    ".browse-screen &, .subs-screen &": {
      left: 0,
      marginLeft: 0
    }
  }
});

const HomeLink = props => {
  const { classes, onClick, currentRoute } = props;

  function getTarget(route) {
    if (route === "home") {
      return "/browse";
    } else {
      return "/";
    }
  }

  return (
    <SquareButton
      to={getTarget(currentRoute)}
      component={Link}
      classes={{ root: classes.root }}
      onClick={onClick}
    >
      {currentRoute === "home" ? <ArrowForward /> : <InfoOutline />}
    </SquareButton>
  );
};

HomeLink.propTypes = {
  classes: PropTypes.object.isRequired,
  currentRoute: PropTypes.string,
  onClick: PropTypes.func
};

export default withStyles(styles)(HomeLink);
