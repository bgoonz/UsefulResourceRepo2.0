import React from "react";
import pure from "recompose/pure";
import SvgIcon from "../../SvgIcon";

let DeviceSdStorage = (props) => (
  <SvgIcon {...props}>
    <path d="M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 6h-2V4h2v4zm3 0h-2V4h2v4zm3 0h-2V4h2v4z" />
  </SvgIcon>
);
DeviceSdStorage = pure(DeviceSdStorage);
DeviceSdStorage.displayName = "DeviceSdStorage";
DeviceSdStorage.muiName = "SvgIcon";

export default DeviceSdStorage;
