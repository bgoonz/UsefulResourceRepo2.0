import React from "react";
import { Editor, getEventTransfer } from "slate-react";
import Plain from "slate-plain-serializer";
import Prism from "prismjs";
import { Value, Block } from "slate";
import { schema } from "./schema";
import {
  Button,
  Icon,
  Image,
  CodeBlock,
  CodeBlockLine,
  ImageBlock,
  BlockQuote,
} from "../slate-components";
import HoverMenu from "./HoverMenu";
import ControllMenu from "./ControllMenu";
import initialValue from "./value.json";

import { BlockButton } from "../slate-components/BlockButton";
import { ImageButton } from "../slate-components/ImageButton";

import Html from "slate-html-serializer";
import { rules } from "./rules";
const html = new Html({ rules });

class BlogEditor extends React.Component {
  constructor(props) {
    super(props);

    const { loadInitialData } = props;
    const value = loadInitialData
      ? Value.fromJSON(initialValue)
      : Value.create();
    this.state = { value, isLoaded: false, isUpdate: false };
    this.previousNodeType = undefined;

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  ref = (editor) => {
    this.editor = editor;
  };

  componentDidMount = () => {
    this.setState({ isLoaded: true });
    this.updateMenu();
  };

  componentDidUpdate = () => {
    this.updateMenu();

    const { blog } = this.props;
    const { isUpdate } = this.state;

    if (!isUpdate && blog) {
      const value = html.deserialize(blog.story);
      this.setState({ value: Value.fromJSON(value), isUpdate: true });
    }
  };

  updateMenu = () => {
    const menu = this.menu;
    if (!menu) return;

    const { value } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
      menu.removeAttribute("style");
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

    menu.style.left = `${
      rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2
    }px`;
  };

  onPaste = (event, change, next) => {
    const { value } = change;
    const { startBlock } = value;
    const parent = value.document.getParent(value.blocks.first().key);

    if (startBlock.type === "code_line" && parent.type === "code_block") {
      const transfer = getEventTransfer(event);
      const { text = "" } = transfer;
      change.insertText(text);
      return;
    }

    next();
  };

  onKeyDown = (event, change, next) => {
    const { isSaving } = this.props;
    const { value } = this.state;
    const { startBlock } = value;

    if (startBlock.type === "code_line") {
      const parent = value.document.getParent(value.blocks.first().key);

      if (this.previousNodeType === "code_block" && !parent.type) {
        change.setBlocks("paragraph");
      }

      this.previousNodeType = parent.type;
    }

    if (!isSaving && event.which === 83 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.saveCtrl();
      return;
    }

    next();
  };

  getTitle = (value) => {
    const firstBlock = value.document.getBlocks().get(0);
    const secondBlock = value.document.getBlocks().get(1);

    const title = firstBlock.text ? firstBlock.text : "No Title";
    const subTitle = secondBlock.text ? secondBlock.text : "No SubTitle";

    return { title, subTitle };
  };

  saveCtrl = () => {
    const { value } = this.state;

    const string = html.serialize(value);
    // const jsonValue = value.toJSON();

    this.props.save(string, this.getTitle(value));
  };

  updateCtrl = () => {
    const { value } = this.state;

    const string = html.serialize(value);

    this.props.update(string, this.getTitle(value), true);
  };

  render() {
    const { isLoaded, value } = this.state;

    return (
      <div style={{ paddingLeft: 40, paddingRight: 40 }}>
        {isLoaded && (
          <React.Fragment>
            <Editor
              {...this.props}
              ref={this.ref}
              onKeyDown={this.onKeyDown}
              placeholder={"Start Writing..."}
              value={value}
              schema={schema}
              onChange={this.onChange}
              onPaste={this.onPaste}
              renderEditor={this.renderEditor}
              renderMark={this.renderMark}
              renderNode={this.renderNode}
            />
          </React.Fragment>
        )}
      </div>
    );
  }

  renderEditor = (props, next) => {
    const { editor, save, update, isSaving } = props;
    const children = next();

    return (
      <React.Fragment>
        <ControllMenu
          save={this.saveCtrl}
          update={this.updateCtrl}
          isSaving={isSaving}
          value={this.state.value}
        />
        {children}
        <HoverMenu innerRef={(menu) => (this.menu = menu)} editor={editor} />
        <BlockButton type="code_block" icon="code" editor={editor} />
        <ImageButton editor={editor} />
      </React.Fragment>
    );
  };

  renderNode = (props, next) => {
    const { attributes, children, node, isFocused } = props;

    switch (node.type) {
      case "paragraph":
        return <p {...props}>{children}</p>;
      case "block-quote":
        return <BlockQuote {...props} />;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "heading-one":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-two":
        return <h2 {...attributes}>{children}</h2>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      case "image": {
        return <ImageBlock {...props} />;
      }
      case "code_block":
        return <CodeBlock {...props} />;
      case "code_line":
        return <CodeBlockLine {...props} />;
      default:
        return next();
    }
  };

  renderMark = (props, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return (
          <code style={{ color: "red" }} {...attributes}>
            {children}
          </code>
        );
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };
}

export default BlogEditor;
