import React from "react";

import { StyledMenu } from "../slate-components";
import { MarkButton } from "../slate-components/MarkButton";
import { BlockButton } from "../slate-components/BlockButton";

export default class HoverMenu extends React.Component {
  render() {
    const { className, innerRef } = this.props;
    // const root = window.document.getElementById('__next')
    const { editor } = this.props;

    return (
      <StyledMenu className={className} innerRef={innerRef}>
        {this.renderMarkButton("bold", "format_bold")}
        {this.renderMarkButton("italic", "format_italic")}
        {this.renderMarkButton("underlined", "format_underlined")}
        {this.renderMarkButton("code", "code")}
        {this.renderBlockButton("heading-one", "looks_one")}
        {this.renderBlockButton("heading-two", "looks_two")}
        {this.renderBlockButton("block-quote", "format_quote")}
        {this.renderBlockButton("numbered-list", "format_list_numbered")}
        {this.renderBlockButton("bulleted-list", "format_list_bulleted")}
      </StyledMenu>
    );
  }

  renderMarkButton = (type, icon) => {
    const { editor } = this.props;

    return <MarkButton editor={editor} type={type} icon={icon} />;
  };

  renderBlockButton = (type, icon) => {
    const { editor } = this.props;

    return <BlockButton editor={editor} type={type} icon={icon} />;
  };
}
