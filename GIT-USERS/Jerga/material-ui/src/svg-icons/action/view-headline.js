import React from "react";
import pure from "recompose/pure";
import SvgIcon from "../../SvgIcon";

let ActionViewHeadline = (props) => (
  <SvgIcon {...props}>
    <path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z" />
  </SvgIcon>
);
ActionViewHeadline = pure(ActionViewHeadline);
ActionViewHeadline.displayName = "ActionViewHeadline";
ActionViewHeadline.muiName = "SvgIcon";

export default ActionViewHeadline;
