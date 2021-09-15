import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import VocabBox from "./VocabBox/";

const styles = () => ({
  root: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "auto"
  }
});

class Browser extends React.Component {
  componentDidMount() {
    if (typeof window.gtag === `function`) {
      window.gtag("config", "UA-82862651-1", { page_path: "/browse" });
      window.gtag("event", "vocab_view", {
        event_category: "engagement"
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (typeof window.gtag === `function` && prevProps.combo !== this.props.combo) {
      window.gtag("event", "vocab_view", {
        event_category: "engagement"
      });
    }
  }
  render() {
    const { classes, combo, nextCombo, windowWidth, windowHeight } = this.props;

    return (
      <div className={classes.root}>
        {combo && (
          <React.Fragment>
            <VocabBox
              combo={combo}
              nextCombo={nextCombo}
              windowWidth={windowWidth}
              windowHeight={windowHeight}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

Browser.propTypes = {
  classes: PropTypes.object.isRequired,
  combo: PropTypes.object.isRequired,
  nextCombo: PropTypes.object.isRequired,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number
};

export default injectSheet(styles)(Browser);
