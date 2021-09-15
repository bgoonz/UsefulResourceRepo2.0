import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import SvgEl from "../components/shared/SvgEl";
import LOGOS from "../../utils/logos";

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  main: {
    width: "100%",
    minHeight: "100vh",
    background: "#D0E0D8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundPosition: "left bottom"
  },
  box: {
    maxWidth: "500px",
    padding: "3em",
    "& p": {
      lineHeight: "1.3em"
    }
  },
  logo: {
    width: "120px",
    display: "block"
  }
});

class Confirmed extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <div className={classes.box}>
          <span className={classes.logo}>
            <SvgEl svg={LOGOS.MAIN} />
          </span>
          <p>Thank you, you have just confirmed your Lazywill Newsletter subscription.</p>
          <p>
            You will be able to cancel it at any time. There will be an unsubscribe link in any of
            my messages to you.
          </p>
          <p> If you have any questions, feel free to contact me at hello@lazywill.com.</p>
          <p>
            {" "}
            We are in touch <br />
            <b>Will</b>
          </p>
        </div>
      </main>
    );
  }
}

Confirmed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Confirmed);
