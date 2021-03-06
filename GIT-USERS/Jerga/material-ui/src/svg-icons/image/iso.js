import React from "react";
import pure from "recompose/pure";
import SvgIcon from "../../SvgIcon";

let ImageIso = (props) => (
  <SvgIcon {...props}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5.5 7.5h2v-2H9v2h2V9H9v2H7.5V9h-2V7.5zM19 19H5L19 5v14zm-2-2v-1.5h-5V17h5z" />
  </SvgIcon>
);
ImageIso = pure(ImageIso);
ImageIso.displayName = "ImageIso";
ImageIso.muiName = "SvgIcon";

export default ImageIso;
