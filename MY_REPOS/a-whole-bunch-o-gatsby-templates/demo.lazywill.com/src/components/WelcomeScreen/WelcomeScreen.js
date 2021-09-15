import React from "react";
import { withStyles } from "material-ui/styles";
import ArrowForward from "material-ui-icons/ArrowForward";
import IconButton from "material-ui/IconButton";
import PropTypes from "prop-types";

import SvgEl from "../shared/SvgEl/";
import { LOGOS } from "../../constants/logos";

const styles = theme => ({
  root: {
    background: theme.palette.background.fourth,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    fontWeight: 300,
    justifyContent: "center",
    minHeight: "100vh",
    padding: "1em 3em 3em",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "500px",
    width: "100%",
    "& h1": {
      fontSize: "1.5em",
      fontWeight: 300,
      margin: "0 0 .4em -.05em",
      "@media (min-width: 1024px)": {
        fontSize: "1.8em",
        marginBottom: ".5em"
      }
    },
    "& p": {
      lineHeight: 1.4,
      margin: "0 0 1em",
      "& b": {
        fontWeight: 700
      }
    }
  },
  logo: {
    margin: "0 0 1em 0",
    maxWidth: "200px",
    width: "80%",
    "@media (min-width: 1024px)": {
      maxWidth: "300px"
    }
  },
  sign: {
    paddingRight: "2em"
  },
  avatar: {
    display: "inline-block",
    height: "26px",
    margin: ".2em .5em 0 0",
    verticalAlign: "middle",
    width: "26px"
  },
  button: {
    background: theme.palette.background.third,
    fontSize: "4em",
    height: "100px",
    margin: "0 auto",
    marginTop: "20px",
    overflow: "hidden",
    width: "100px"
  },
  icon: {
    animationName: "example",
    animationDuration: "1s",
    animationDelay: "1s",
    animationFillMode: "forwards",
    marginLeft: "-150px",
    transform: "rotate(0deg)"
  },
  "@keyframes example": {
    "0%": {
      marginLeft: "-150px",
      transform: "rotate(0deg) scale(1)"
    },
    "50%": {
      marginLeft: 0,
      transform: "rotate(360deg) scale(1)"
    },
    "75%": {
      marginLeft: 0,
      transform: "rotate(360deg) scale(1.5)"
    },
    "100%": {
      marginLeft: 0,
      transform: "rotate(360deg) scale(1)"
    }
  }
});

const WelcomeScreen = props => {
  return (
    <div className={props.classes.root}>
      <h1>Welcome to </h1>
      <div className={props.classes.logo}>
        <SvgEl svg={LOGOS.MAIN} />
      </div>
      <p>
        This is a small sneak preview of a coming <b>vocabulary</b> learning app for declared{" "}
        <b>visual</b> learners.
      </p>
      <p>Take a look and share with me what you think</p>
      <p className={props.classes.sign}>
        <span className={props.classes.avatar}>
          <SvgEl svg={LOGOS.AVATAR} />
        </span>
        lazy <b>Will</b>{" "}
      </p>
      <IconButton className={props.classes.button} aria-label="Forward">
        <ArrowForward className={props.classes.icon} />
      </IconButton>
    </div>
  );
};

WelcomeScreen.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WelcomeScreen);
