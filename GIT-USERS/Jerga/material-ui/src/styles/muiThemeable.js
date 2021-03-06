import React, { PropTypes } from "react";
import getMuiTheme from "./getMuiTheme";

let DEFAULT_THEME;

function getDefaultTheme() {
  if (!DEFAULT_THEME) {
    DEFAULT_THEME = getMuiTheme();
  }
  return DEFAULT_THEME;
}

export default function muiThemeable() {
  return (Component) => {
    const MuiComponent = (props, context) => {
      const { muiTheme = getDefaultTheme() } = context;

      return <Component muiTheme={muiTheme} {...props} />;
    };

    MuiComponent.contextTypes = {
      muiTheme: PropTypes.object.isRequired,
    };

    return MuiComponent;
  };
}
