import React from "react";
import pure from "recompose/pure";
import SvgIcon from "../../SvgIcon";

let NavigationChevronLeft = (props) => (
  <SvgIcon {...props}>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </SvgIcon>
);
NavigationChevronLeft = pure(NavigationChevronLeft);
NavigationChevronLeft.displayName = "NavigationChevronLeft";
NavigationChevronLeft.muiName = "SvgIcon";

export default NavigationChevronLeft;
