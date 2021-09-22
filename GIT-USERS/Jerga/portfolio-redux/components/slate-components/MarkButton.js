import React from "react";
import { Button, Icon } from "./index";

const DEFAULT_NODE = "paragraph";

export class MarkButton extends React.Component {
  hasMark = (type) => {
    const { editor } = this.props;
    const { value } = editor;
    return value.activeMarks.some((node) => node.type == type);
  };

  onClickMark = (event, type) => {
    const { editor } = this.props;

    event.preventDefault();
    editor.change((change) => change.toggleMark(type));
  };

  render() {
    const { type, icon } = this.props;
    const isActive = this.hasMark(type);

    return (
      <Button
        reversed
        active={isActive}
        onMouseDown={(event) => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  }
}
