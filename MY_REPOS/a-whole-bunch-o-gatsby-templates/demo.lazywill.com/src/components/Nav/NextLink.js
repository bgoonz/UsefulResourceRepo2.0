import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import injectSheet from "react-jss";
import Color from "color";
import PropTypes from "prop-types";

import ArrowBack from "material-ui-icons/ArrowBack";
import ArrowForward from "material-ui-icons/ArrowForward";
import BlockButton from "../shared/BlockButton";

const superstyles = () => ({
  root: {
    ".subs-screen &": {
      left: "61px",
      right: props => `${props.windowWidth - 120}px`
    }
  }
});

const styles = theme => ({
  root: {
    background: theme.palette.background.green,
    left: "100%",
    position: "absolute",
    right: 0,
    width: "auto",
    transition: "all .8s",
    "&:hover": {
      background: Color(theme.palette.background.green)
        .darken(0.2)
        .string()
    },
    ".browse-screen &": {
      left: "61px"
    },
    ".browse-screen.subs-button &": {
      right: "61px"
    }
  },
  progress: {
    color: "#ffffff",
    margin: "-15px 0 0 5px"
  },
  label: {
    ".browse-screen &": {
      marginTop: "-3px",
      "& svg": {
        margin: "6px 0 0 5px"
      }
    }
  }
});

const NextLink = props => {
  const { classes, onClick, currentRoute } = props;

  function getTarget(route) {
    if (route === "subs") {
      return "/browse";
    } else {
      return "#";
    }
  }

  return (
    <BlockButton
      to={getTarget(currentRoute)}
      component={Link}
      classes={{ root: classes.root, label: classes.label }}
      onClick={onClick}
    >
      <span
        style={{
          display: currentRoute === "browse" ? "inline" : "none",
          transitionDelay: "2s"
        }}
      >
        next
      </span>
      {currentRoute === "browse" ? <ArrowForward /> : <ArrowBack />}
    </BlockButton>
  );
};

NextLink.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  currentRoute: PropTypes.string
};

export default injectSheet(superstyles)(withStyles(styles)(NextLink));
