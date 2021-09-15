import { Button, Icon } from "./index";

export const AlignmentCenterButton = (props) => {
  const onClickAlignment = (event, align) => {
    const { editor } = props;
    event.preventDefault();

    editor.change((change, target) => {
      change
        .setBlocks({
          type: "alignment",
          data: { align, currentBlockType: getType(change.value) },
        })
        .focus();
    });
  };

  const { type, icon, editor } = props;
  const { value } = editor;

  const isActive =
    hasMark(value) && getMark(value).data.get("align") === "center";

  return (
    <Button
      active={isActive}
      onMouseDown={(event) => onClickAlignment(event, "center")}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export const AlignmentNode = ({ children, node: { data } }) => {
  let Node = "div";

  return <Node style={{ textAlign: `${data.get("align")}` }}>{children}</Node>;
};

export default AlignmentNode;
