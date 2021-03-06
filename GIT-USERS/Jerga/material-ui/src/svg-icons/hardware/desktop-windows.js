import React from "react";
import pure from "recompose/pure";
import SvgIcon from "../../SvgIcon";

let HardwareDesktopWindows = (props) => (
  <SvgIcon {...props}>
    <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z" />
  </SvgIcon>
);
HardwareDesktopWindows = pure(HardwareDesktopWindows);
HardwareDesktopWindows.displayName = "HardwareDesktopWindows";
HardwareDesktopWindows.muiName = "SvgIcon";

export default HardwareDesktopWindows;
