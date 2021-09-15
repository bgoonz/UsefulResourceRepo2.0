import { Editor, Transforms, Text } from "slate";
import { jsx } from "slate-hyperscript";
import escapeHtml from "escape-html";

const ELEMENT_TAGS = {
  BLOCKQUOTE: () => ({ type: "block-quote" }),
  H1: () => ({ type: "heading-one" }),
  H2: () => ({ type: "heading-two" }),
  LI: () => ({ type: "list-item" }),
  UL: () => ({ type: "bulleted-list" }),
  OL: () => ({ type: "numbered-list" }),
  P: () => ({ type: "paragraph" }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  EM: () => ({ italic: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underlined: true }),
};

const applyTag = (node) => {
  node.text = node.text && escapeHtml(node.text);

  if (node.bold) {
    node.text = `<strong>${node.text}</strong>`;
  }
  if (node.italic) {
    node.text = `<em>${node.text}</em>`;
  }
  if (node.underlined) {
    node.text = `<u>${node.text}</u>`;
  }
  if (node.code) {
    node.text = `<code>${node.text}</code>`;
  }

  return node.text;
};

const serialize = (node) => {
  if (Text.isText(node)) {
    return applyTag({ ...node });
  }

  const children = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "block-quote":
      return `<blockquote>${children}</blockquote>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "paragraph":
      return `<p>${children}</p>`;
    default:
      return children;
  }
};

const deserialize = (el) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0];
  }
  const children = Array.from(parent.childNodes).map(deserialize).flat();

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    const _children = children.length === 0 ? [""] : children;
    return jsx("element", attrs, _children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => jsx("text", attrs, child));
  }

  return children;
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: "all",
  });
  return !!match;
};

const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export {
  toggleFormat,
  isFormatActive,
  isBlockActive,
  toggleBlock,
  serialize,
  deserialize,
};
