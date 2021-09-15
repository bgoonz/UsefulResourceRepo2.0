import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import HoveringToolbar from "./HoverMenu";
import { Transforms, createEditor, Node } from "slate";
import { serialize, deserialize } from "./functions";

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  return <span {...attributes}>{children}</span>;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
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
    case "paragraph":
      return <p {...attributes}>{children}</p>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const withLayout = (editor, value) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length < 1) {
        const title = { type: "heading-one", children: [{ text: "" }] };
        Transforms.insertNodes(editor, title, { at: path.concat(0) });
      }

      if (editor.children.length < 2) {
        const subtitle = { type: "heading-two", children: [{ text: "" }] };
        Transforms.insertNodes(editor, subtitle, { at: path.concat(1) });
      }

      if (editor.children.length < 3) {
        const paragraph = { type: "paragraph", children: [{ text: "" }] };
        Transforms.insertNodes(editor, paragraph, { at: path.concat(2) });
      }

      for (const [child, childPath] of Node.children(editor, path)) {
        const type =
          childPath[0] === 0
            ? "heading-one"
            : childPath[0] === 1
            ? "heading-two"
            : "paragraph";
        const canAdd =
          childPath[0] === 0 || childPath[0] === 1 || childPath[0] === 2;

        if (canAdd && child.type !== type) {
          Transforms.setNodes(editor, { type }, { at: childPath });
        }
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};

const BlogEditor = ({
  saveMessage = "saving...",
  onSave,
  header = "Write your story",
  loading,
  initialContent,
}) => {
  const [value, setValue] = useState(initialValue);
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
  );
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  useEffect(() => {
    if (initialContent) {
      const document = new DOMParser().parseFromString(
        initialContent,
        "text/html"
      );
      const deserialized = deserialize(document.body);
      if (deserialized && deserialized.length === 1 && deserialized[0].text) {
        deserialized[0].children = [{ ...deserialized[0] }];
        deserialized[0].type = "paragraph";
        delete deserialized[0].text;
        setValue([...initialValue, ...deserialized]);
      } else {
        setValue(deserialize(document.body));
      }
    }
  }, [initialContent]);

  const save = () => {
    const serialized = serialize({ children: value });
    const title =
      (value[0] && value[0].children.map((n) => n.text).join("")) || "";
    const subTitle =
      (value[1] && value[1].children.map((n) => n.text).join("")) || "";
    onSave({ content: serialized, title, subTitle });
  };

  const onKeyDown = (event) => {
    if (!loading && event.which === 83 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      save();
    }
  };

  return (
    <div className="slate-container">
      <div className="editor-header">
        <div className="editor-title">{header}</div>
        <div className="save-button-container">
          {loading && <div className="save-message">{saveMessage}</div>}
          <button onClick={save} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
      <hr />
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <HoveringToolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
        />
        <style>
          {`
            @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
          `}
        </style>
      </Slate>
    </div>
  );
};

const initialValue = [
  {
    type: "heading-one",
    children: [{ text: "Title" }],
  },
  {
    type: "heading-two",
    children: [
      {
        text: "Subtitle",
      },
    ],
  },
];

export default BlogEditor;
