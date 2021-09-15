import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Copyright from "material-ui-icons/Copyright";
import Close from "material-ui-icons/Close";
import SquareButton from "../../shared/SquareButton";

const styles = () => ({
  root: {
    background: "rgba(255,255,255,0.1)",
    position: "absolute",
    top: 0,
    left: 0,
    transform: "translateY(-100%)",
    color: "rgba(255,255,255,0.5)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      color: "rgba(255,255,255,1)"
    },
    ".opened &": {
      background: "rgba(0,0,0,0.7)",
      left: "auto",
      right: 0,
      color: "rgba(255,255,255,1)",
      "@media (min-width: 500px)": {
        transform: "none",
        background: "rgba(0,0,0,0)"
      }
    }
  }
});

const CreditsDetailsToggle = props => {
  const { classes, detailsOpened, onClick } = props;

  return (
    <SquareButton classes={{ root: classes.root }} onClick={onClick}>
      {detailsOpened ? <Close /> : <Copyright />}
    </SquareButton>
  );
};

CreditsDetailsToggle.propTypes = {
  classes: PropTypes.object.isRequired,
  detailsOpened: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(CreditsDetailsToggle);
