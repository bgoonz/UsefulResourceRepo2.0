import React from "react";
import styled from "react-emotion";

export const Button = styled("span")`
  cursor: pointer;
  color: ${(props) =>
    props.reversed
      ? props.active
        ? "white"
        : "#aaa"
      : props.active
      ? "black"
      : "#ccc"};
`;

export const Icon = styled((props) => {
  const onClick = props.onClick ? props.onClick : () => {};
  return (
    <span
      onClick={onClick}
      className={`material-icons ${props.className}`}
      children={props.children}
    />
  );
  // return <span className={`material-icons ${props.className}`} {...rest}/>
  // return <span className={`material-icons ${props.className}`}> {props.children} </span>
})`
  font-size: 18px;
  vertical-align: text-bottom;
`;

export const Menu = styled("div")`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`;

export const Image = styled("img")`
  display: block;
  width: 100%;
  max-height: 20em;
  box-shadow: ${(props) => (props.selected ? "0 0 0 2px blue;" : "none")};
`;

export const StyledMenu = styled(Menu)`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
  transition: opacity 0.75s;
`;

export const BlockQuote = styled((props) => {
  return (
    <blockquote className={`${props.className}`} {...props.attributes}>
      {" "}
      {props.children}{" "}
    </blockquote>
  );
})`
  border-left: 2px solid #ddd;
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  color: #aaa;
  font-style: italic;
  display: block;
`;

export const CodeBlock = styled((props) => {
  const { editor, node } = props;

  return (
    <div className={`${props.className}`}>
      <pre>
        <code {...props.attributes}>{props.children}</code>
      </pre>
    </div>
  );
})`
  padding: 10px;
  background-color: #eee;
  width: 100%;
`;

export const CodeBlockLine = (props) => {
  const { node } = props;

  return <div {...props.attributes}>{props.children}</div>;
};

export const ImageBlock = (props) => {
  const { editor, node, isFocused, attributes } = props;
  const src = node.data.get("src");

  const styles = {
    center: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    left: { marginRight: "auto" },
    right: { marginLeft: "auto" },
  };

  const onClick = (event, align) => {
    event.preventDefault();

    editor.change((change) =>
      change.setNodeByKey(node.key, { data: { align, src } })
    );
  };

  const align = node.data.get("align") || "left";

  return (
    <React.Fragment>
      <div className="prop-image" style={{ width: "260px", ...styles[align] }}>
        <div>
          <Icon onClick={(e) => onClick(e, "left")}>format_align_left</Icon>
          <Icon onClick={(e) => onClick(e, "center")}>format_align_center</Icon>
          <Icon onClick={(e) => onClick(e, "right")}>format_align_right</Icon>
        </div>
        <Image
          style={styles[align]}
          src={src}
          selected={isFocused}
          {...attributes}
        />
      </div>
    </React.Fragment>
  );
};
