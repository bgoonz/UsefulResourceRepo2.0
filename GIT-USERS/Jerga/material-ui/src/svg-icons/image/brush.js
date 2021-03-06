import React from "react";
import pure from "recompose/pure";
import SvgIcon from "../../SvgIcon";

let ImageBrush = (props) => (
  <SvgIcon {...props}>
    <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" />
  </SvgIcon>
);
ImageBrush = pure(ImageBrush);
ImageBrush.displayName = "ImageBrush";
ImageBrush.muiName = "SvgIcon";

export default ImageBrush;
