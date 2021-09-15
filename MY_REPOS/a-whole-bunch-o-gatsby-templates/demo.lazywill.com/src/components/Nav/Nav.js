import React from "react";
import injectSheet from "react-jss";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import HomeLink from "./HomeLink";
import NextLink from "./NextLink";
import SubscribeLink from "./SubscribeLink";

const styles = theme => ({
  root: {
    background: theme.palette.background.third,
    bottom: 0,
    height: "60px",
    left: 0,
    position: "absolute",
    right: 0,
    overflow: "hidden",
    "&.landscape.browse-screen": {
      left: props => props.windowHeight
    }
  }
});

const Nav = props => {
  const { classes, location, windowWidth, windowHeight, seenCombos, unseenCombos, history } = props;
  const { pathname } = location;

  const currentRoute = getCurrentRoute(pathname);

  function getCurrentRoute(path) {
    const route = path.slice(1);
    return route === "" ? "home" : route;
  }

  function getOrientationClass(width, height) {
    return width >= height ? "landscape" : "portrait";
  }

  function onNextClick() {
    if (seenCombos === 25 || unseenCombos === 1) {
      history.push("/subs");
    }

    if (unseenCombos > 1) {
      props.onNextClick();
    }
  }

  return (
    <nav
      className={`
        ${classes.root}
        ${seenCombos > 10 ? "subs-button" : ""}
        ${currentRoute}-screen
        ${getOrientationClass(windowWidth, windowHeight)}
      `}
    >
      <NextLink currentRoute={currentRoute} onClick={onNextClick} windowWidth={windowWidth} />
      <HomeLink currentRoute={currentRoute} />
      <SubscribeLink currentRoute={currentRoute} />
    </nav>
  );
};

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  windowHeight: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  seenCombos: PropTypes.number.isRequired,
  unseenCombos: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  onNextClick: PropTypes.func.isRequired
};

export default withRouter(injectSheet(styles)(Nav));
