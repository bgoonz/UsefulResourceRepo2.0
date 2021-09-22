import React from "react";
import { Button, Icon } from "./index";

const DEFAULT_NODE = "paragraph";

export class BlockButton extends React.Component {
  hasBlock = (type) => {
    const { editor } = this.props;
    const { value } = editor;
    return value.blocks.some((node) => node.type == type);
  };

  onClickBlock = (event, type) => {
    const { editor } = this.props;
    event.preventDefault();

    editor.change((change, target) => {
      const { value } = change;
      const { document } = value;

      const parent = value.document.getParent(value.blocks.first().key);
      if (parent.type === "code_block") {
        change.unwrapBlock("code_block");
        return;
      }

      if (type === "code_block") {
        change.setBlocks("code_line").wrapBlock({
          type,
          data: { subType: "code_line" },
        });
        return;
      }

      // Handle everything but list buttons.
      if (type != "bulleted-list" && type != "numbered-list") {
        const isActive = this.hasBlock(type, editor);
        const isList = this.hasBlock("list-item", editor);

        if (isList) {
          change
            .setBlocks(isActive ? DEFAULT_NODE : type)
            .unwrapBlock("bulleted-list")
            .unwrapBlock("numbered-list");
        } else {
          const blockType = isActive ? DEFAULT_NODE : type;
          change.setBlocks({ type: blockType });
        }
      } else {
        // Handle the extra wrapping required for list buttons.
        const isList = this.hasBlock("list-item", editor);
        const isType = value.blocks.some((block) => {
          return !!document.getClosest(
            block.key,
            (parent) => parent.type == type
          );
        });

        if (isList && isType) {
          change
            .setBlocks(DEFAULT_NODE)
            .unwrapBlock("bulleted-list")
            .unwrapBlock("numbered-list");
        } else if (isList) {
          change
            .unwrapBlock(
              type == "bulleted-list" ? "numbered-list" : "bulleted-list"
            )
            .wrapBlock(type);
        } else {
          change.setBlocks("list-item").wrapBlock(type);
        }
      }
    });
  };

  render() {
    const { type, icon, editor } = this.props;
    let isActive = this.hasBlock(type);

    if (["numbered-list", "bulleted-list", "code_block"].includes(type)) {
      const { value } = editor;
      const parent = value.blocks.size
        ? value.document.getParent(value.blocks.first().key)
        : "";
      isActive =
        this.hasBlock("list-item") ||
        (this.hasBlock("code_line") && parent && parent.type === type);
    }

    return (
      <Button
        active={isActive}
        onMouseDown={(event) => this.onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  }
}
