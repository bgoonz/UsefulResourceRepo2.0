import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = () => ({
  root: {
    color: "#fff",
    fontSize: "1em",
    padding: "1em 1.5em 2em",
    ".portrait &": {
      position: "relative",
      width: "100%"
    },
    ".landscape &": {
      position: "absolute",
      top: 0,
      bottom: "60px",
      left: props => props.windowHeight,
      overflow: "hidden"
    }
  },
  entry: {
    "& h1": {
      fontSize: "2.8em",
      fontWeight: 300,
      letterSpacing: "-.02em",
      lineHeight: ".9em",
      margin: 0
    }
  },
  meta: {
    margin: ".5em 0",
    fontSize: "1.1em",
    color: "#999"
  },
  metaDefinition: {
    color: "#ddd"
  },
  metaType: {
    fontStyle: "italic",
    color: "#aaa",
    textTransform: "lowercase"
  },
  sentences: {
    fontSize: "1.4em",
    listStyle: "none",
    margin: "1.2em 0 0 0",
    padding: 0
  }
});

const TextsBox = props => {
  const { combo, classes } = props;

  return (
    <div className={classes.root}>
      {combo && (
        <React.Fragment>
          <header className={classes.entry}>
            <h1>{combo.entry.text}</h1>
          </header>
          <div className={classes.meta}>
            <span className={classes.metaType}>{combo.meaning.type}</span> •{" "}
            <span className={classes.metaDefinition}>{combo.meaning.definition}</span>
          </div>
          <ul className={classes.sentences}>
            {combo.sentences.map(sentence => <li key={sentence.id}>{sentence.text}</li>)}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

TextsBox.propTypes = {
  classes: PropTypes.object.isRequired,
  combo: PropTypes.object.isRequired
};

export default injectSheet(styles)(TextsBox);
