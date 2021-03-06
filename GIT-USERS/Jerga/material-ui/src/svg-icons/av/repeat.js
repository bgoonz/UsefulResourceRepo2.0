import React from "react";
import pure from "recompose/pure";
import SvgIcon from "../../SvgIcon";

let AvRepeat = (props) => (
  <SvgIcon {...props}>
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
  </SvgIcon>
);
AvRepeat = pure(AvRepeat);
AvRepeat.displayName = "AvRepeat";
AvRepeat.muiName = "SvgIcon";

export default AvRepeat;
