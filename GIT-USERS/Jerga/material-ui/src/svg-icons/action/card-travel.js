import React from "react";
import pure from "recompose/pure";
import SvgIcon from "../../SvgIcon";

let ActionCardTravel = (props) => (
  <SvgIcon {...props}>
    <path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z" />
  </SvgIcon>
);
ActionCardTravel = pure(ActionCardTravel);
ActionCardTravel.displayName = "ActionCardTravel";
ActionCardTravel.muiName = "SvgIcon";

export default ActionCardTravel;
