import React from "react";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import Color from "color";
import PropTypes from "prop-types";
import MailOutline from "material-ui-icons/MailOutline";

import SquareButton from "../shared/SquareButton";

const styles = theme => ({
  root: {
    background: theme.palette.background.green,
    position: "absolute",
    right: "-60px",
    width: "60px",
    transition: "all .8s",
    "&:hover": {
      background: Color(theme.palette.background.green)
        .darken(0.1)
        .string()
    },
    ".subs-button &": {
      right: 0
    },
    ".subs-screen &, .home-screen &": {
      right: "-60px"
    }
  }
});

const SubscribeLink = props => {
  const { classes } = props;

  return (
    <SquareButton to="/subs" component={Link} classes={{ root: classes.root }}>
      <MailOutline />
    </SquareButton>
  );
};

SubscribeLink.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubscribeLink);
