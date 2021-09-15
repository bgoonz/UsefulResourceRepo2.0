// Refactor block tags into a dictionary for cleanliness.
const BLOCK_TAGS = {
  p: "paragraph",
  blockquote: "block-quote",
  pre: "code_block",
  ul: "bulleted-list",
  li: "list-item",
  ol: "numbered-list",
  h1: "heading-one",
  h2: "heading-two",
  div: "code_line",
  img: "image",
};

const MARK_TAGS = {
  em: "italic",
  strong: "bold",
  u: "underlined",
  code: "code",
};

const styles = {
  center: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  left: { marginRight: "auto" },
  right: { marginLeft: "auto" },
};

export const rules = [
  {
    // Switch deserialize to handle more blocks...
    deserialize(el, next) {
      let type = BLOCK_TAGS[el.tagName.toLowerCase()];

      if (!type) {
        return;
      }

      switch (type) {
        case "code_line":
          const subType = el.getAttribute("subType");
          if (subType === type) {
            return {
              object: "block",
              type: type,
              nodes: next(el.childNodes),
            };
          }
          return;
        case "image":
          return {
            object: "block",
            type: "image",
            data: {
              src: el.getAttribute("src"),
              align: el.getAttribute("align"),
            },
            nodes: next(el.childNodes),
          };
        case type:
          return {
            object: "block",
            type: type,
            nodes: next(el.childNodes),
          };
      }
    },
  },
  {
    // Switch serialize to handle more blocks...
    serialize(obj, children) {
      if (obj.object == "block") {
        switch (obj.type) {
          case "paragraph":
            return <p>{children}</p>;
          case "block-quote":
            return <blockquote>{children}</blockquote>;
          case "code_block":
            return (
              <div className={obj.data.get("className")}>
                <pre>
                  <div>{children}</div>
                </pre>
              </div>
            );
          case "bulleted-list":
            return <ul>{children}</ul>;
          case "list-item":
            return <li>{children}</li>;
          case "numbered-list":
            return <ol>{children}</ol>;
          case "heading-one":
            return <h1>{children}</h1>;
          case "heading-two":
            return <h2>{children}</h2>;
          case "code_line":
            return <div subType={"code_line"}>{children}</div>;
          case "image":
            const align = obj.data.get("align");
            return (
              <div style={{ width: "260px", ...styles[align] }}>
                <img
                  align={align}
                  src={obj.data.get("src")}
                  style={styles[align]}
                />
              </div>
            );
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];

      if (type) {
        return {
          object: "mark",
          type: type,
          nodes: next(el.childNodes),
        };
      }
    },
  },
  {
    serialize(obj, children) {
      if (obj.object == "mark") {
        switch (obj.type) {
          case "bold":
            return <strong>{children}</strong>;
          case "italic":
            return <em>{children}</em>;
          case "underlined":
            return <u>{children}</u>;
          case "code":
            return <code>{children}</code>;
        }
      }
    },
  },
];
