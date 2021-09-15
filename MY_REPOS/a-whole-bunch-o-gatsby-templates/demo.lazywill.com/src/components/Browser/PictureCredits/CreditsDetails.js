import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    background: "rgba(0,0,0,0.7)",
    display: "none",
    overflow: "hidden",
    padding: "1.5em",
    ".opened &": {
      display: "block"
    }
  },
  picture: {
    float: "left",
    margin: "0 1em 0 0"
  },
  links: {
    "& p": {
      color: "#ddd",
      fontSize: ".95em",
      margin: "0 0 .6em 0"
    },
    "& p:last-child": {
      margin: 0
    },
    "& i": {
      color: "#999",
      fontSize: "0.9em"
    },
    "& a": {
      color: "#fff",
      textDecoration: "none"
    },
    "& a:hover": {
      color: theme.palette.background.accent
    }
  }
});

const CreditsDetails = props => {
  function getPictureSrc(picture) {
    return `https://d3nstmfkiycslv.cloudfront.net/${picture.arangoKey}_${picture.hash}_prv.jpeg`;
  }

  const { picture, classes } = props;

  return (
    <div className={classes.root}>
      <a href={picture.sourceUrl} target="_blank" rel="noopener">
        <img src={getPictureSrc(picture)} className={classes.picture} alt="" />
      </a>
      <div className={classes.links}>
        <p>
          <i>author:</i>{" "}
          <a href={picture.authorUrl} target="_blank" rel="noopener">
            {picture.authorName}
          </a>
        </p>
        <p>
          <i>source:</i>{" "}
          <a href={picture.sourceUrl} target="_blank" rel="noopener">
            {picture.sourceName}
          </a>
        </p>
        <p>
          <i>licence:</i>{" "}
          <a href={picture.licenceUrl} target="_blank" rel="noopener">
            {picture.licenceName}
          </a>
        </p>
      </div>
    </div>
  );
};

CreditsDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  picture: PropTypes.object.isRequired
};

export default injectSheet(styles)(CreditsDetails);
