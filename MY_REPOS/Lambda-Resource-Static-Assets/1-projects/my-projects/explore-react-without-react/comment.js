"use strict";
{
  const Racked = { render };
  // okay works now continuing on
  function formatDate(date) {
    return new Date(date).toLocaleTimeString();
  }

  function Avatar(props) {
    return R`
      <img
        className="Avatar"
        src="${props.user.avatarUrl}"
        alt="${props.user.name}"
      />
    `;
  }

  function UserInfo(props) {
    return R`
      <div className="UserInfo">
        <Avatar user="${props.user}" />
        <div className="UserInfo-name">${props.user.name}</div>
      </div>
    `;
  }

  function RComment(props) {
    return R`
      <div className="RComment">
        <UserInfo user="${props.author}" />
        <div className="RComment-text">${props.text}</div>
        <div className="RComment-date">
          ${formatDate(props.date)}
        </div>
      </div>
    `;
  }

  const comment = {
    date: new Date(),
    text: "I hope you enjoy learning React!",
    author: {
      name: "Hello Kitty",
      avatarUrl: "https://placekitten.com/g/64/64",
    },
  };

  Racked.render(
    R`<RComment
      date="${comment.date}"
      text="${comment.text}"
      author="${comment.author}"
    />`,
    document.getElementById("root")
  );

  function render(textrack, where) {
    const rack = fc(textrack);
    if (!rack) {
      return textrack;
    }

    const parser = document.createTreeWalker(rack, NodeFilter.SHOW_ALL);
    const stack = [];
    let html = "";

    do {
      const node = parser.currentNode;
      switch (node.nodeType) {
        case Node.ELEMENT_NODE: {
          const name = node.tagName.toLowerCase();
          const CapitalizedNameIndex = textrack.toLowerCase().indexOf(name);
          let CapitalizedName = name;
          if (CapitalizedNameIndex >= 0) {
            CapitalizedName = textrack.substr(
              CapitalizedNameIndex,
              name.length
            );
          }
          // see if it's a ract component (if there's a function called <CapitalizedName>))
          try {
            const props = Array.from(node.attributes).reduce(
              (all, { name, value }) => {
                try {
                  all[name] = JSON.parse(unescape(value));
                } catch (e) {
                  all[name] = value;
                }
                return all;
              },
              {}
            );
            let componentHtml = eval(
              `${CapitalizedName}(${JSON.stringify(props)})`
            );
            const renderedAgainComponentHtml = render(componentHtml, null);
            if (componentHtml !== renderedAgainComponentHtml) {
              componentHtml = renderedAgainComponentHtml;
            }
            html += componentHtml;
            break;
          } catch (e) {
            // not a ract component so we need to close it
            stack.push(node);
            // and report it
            html += `<${name}${
              node.attributes.length
                ? " " +
                  Array.from(node.attributes)
                    .map((attr) => `${attr.name}="${attr.value}"`)
                    .join(" ")
                : ""
            }>`;
            break;
          }
        }
        default: {
          if (!!node.nodeValue) {
            const renderedAgainComponentHtml = render(node.nodeValue, null);
            if (renderedAgainComponentHtml !== node.nodeValue) {
              html += renderedAgainComponentHtml;
            } else {
              html += node.nodeValue || "";
            }
          }
          break;
        }
      }
      if (!node.nextSibling && !node.childNodes.length) {
        const parent = stack.pop();
        if (!!parent && !VOID_ELEMENTS.has(parent.localName)) {
          // close it
          html += `</${parent.tagName.toLowerCase()}>`;
        }
      }
    } while (parser.nextNode());

    if (!where) {
      return html;
    } else {
      where.innerHTML = html;
      //where.insertAdjacentHTML('afterBegin', html);
    }
  }
}
