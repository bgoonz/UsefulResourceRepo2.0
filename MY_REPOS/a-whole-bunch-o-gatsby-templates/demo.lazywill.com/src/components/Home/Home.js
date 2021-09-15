import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Loadable from "react-loadable";
import Loading from "../shared/Loading/";
import SvgEl from "../shared/SvgEl";
import LOGOS from "../../constants/logos";

const styles = theme => ({
  root: {
    bottom: "60px",
    color: "#fff",
    left: 0,
    overflow: "auto",
    position: "absolute",
    right: 0,
    top: 0
  },
  logo: {},
  textBox: {
    padding: "3em",
    maxWidth: "30em",
    marginLeft: "auto",
    marginRight: "auto",
    "& p": {
      lineHeight: "1.4em",
      fontSize: "1.1em"
    },
    "& b": {
      fontWeight: 600
    },
    "& a": {
      color: theme.palette.primary["500"],
      textDecoration: "none",
      fontWeight: 600
    }
  },
  head: {
    fontWeight: 300
  },
  avatar: {
    display: "inline-block",
    height: "30px",
    margin: "-.2em 0 0 .5em",
    verticalAlign: "middle",
    width: "30px"
  }
});

const Home = props => {
  const { classes } = props;

  const AsyncBrowser = Loadable({
    loader: () => import("../Browser/"),
    loading: Loading
  });

  AsyncBrowser.preload();

  return (
    <div className={classes.root}>
      <div className={classes.textBox}>
        <h1 className={classes.head}>Welcome to </h1>
        <span className={classes.logo}>
          <SvgEl svg={LOGOS.MAIN} />
        </span>
        <p>
          I{`'`}m Will and I{`'`}m working at a new <b>vocabulary training app</b> for language
          learners like myself, for declared <b>visual learners</b>.
        </p>
        <p>
          Please, take a look at this small <b>demo</b> and share with me what you think.
        </p>
        <p>
          This is only a sneak preview of how the app will look like and how it will work, but it
          shows the main idea.
        </p>
        <p>
          Feel free to send your comments at{" "}
          <a href="mailto:hello@lazywill.com">hello@lazywill.com</a>.
        </p>
        <p>I appreciate any kind of feedback.</p>
        <p>
          <i>Thank you</i>
        </p>
        <p>
          <b>Will</b>
          <span className={classes.avatar}>
            <SvgEl svg={LOGOS.AVATAR} />
          </span>
        </p>
      </div>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Home);
