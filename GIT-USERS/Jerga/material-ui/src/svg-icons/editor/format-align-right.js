import React from "react";
import pure from "recompose/pure";
import SvgIcon from "../../SvgIcon";

let EditorFormatAlignRight = (props) => (
  <SvgIcon {...props}>
    <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z" />
  </SvgIcon>
);
EditorFormatAlignRight = pure(EditorFormatAlignRight);
EditorFormatAlignRight.displayName = "EditorFormatAlignRight";
EditorFormatAlignRight.muiName = "SvgIcon";

export default EditorFormatAlignRight;
