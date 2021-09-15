import { Button, Icon } from "./index";

export const ImageButton = (props) => {
  const onClickImage = (event) => {
    event.preventDefault();
    const src = window.prompt("Enter the URL of the image:");
    if (!src) return;

    const { editor } = props;
    editor.change(insertImage, src);
  };

  const insertImage = (change, src, target) => {
    if (target) {
      change.select(target);
    }

    change.insertBlock({
      type: "image",
      data: { src },
    });
  };

  return (
    <Button onMouseDown={onClickImage}>
      <Icon>image</Icon>
    </Button>
  );
};
