"use strict";
{
  class Component {
    constructor(props = {}) {
      this.props = Object.freeze(clone(props));
      this.state = {};
      Object.assign(this.state, this.props);
    }
    setState(newState) {
      Object.assign(this.state, newState);
      Racked.render(R`<Clock />`, document.getElementById("root"));
    }
  }

  const Racked = { render, Component };

  class Clock extends Racked.Component {
    constructor(props) {
      super(props);
      this.state = { date: new Date() };
    }
    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
    render() {
      return R`
        <div>
          <h1>Hello, world!</h1>
          <h2>It is ${this.state.date.toLocaleTimeString()}.</h2>
        </div>
      `;
    }
    tick() {
      this.setState({
        date: new Date(),
      });
    }
  }

  Racked.render(R`<Clock />`, document.getElementById("root"));

  function render(textrack, where) {
    const rack = fc(textrack);
    let isClass = false,
      component;
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
            isClass = eval(`descendent(${CapitalizedName},Component)`);
            let componentHtml;
            if (isClass) {
              component = eval(
                `new ${CapitalizedName}(${JSON.stringify(props)})`
              );
              componentHtml = component.render();
            } else {
              componentHtml = eval(
                `${CapitalizedName}(${JSON.stringify(props)})`
              );
            }
            const renderedAgainComponentHtml = render(componentHtml, null);
            if (componentHtml !== renderedAgainComponentHtml) {
              componentHtml = renderedAgainComponentHtml;
            }
            html += componentHtml;
            break;
          } catch (e) {
            // console.warn(e);
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
      if (isClass) {
        component.componentDidMount();
      }
    }
  }

  function descendent(cls, superClass) {
    let { prototype } = cls;
    let checks = 0;
    while (!!prototype && checks < 100) {
      checks += 1;
      if (prototype === superClass.prototype) {
        return true;
      }
      prototype = Object.getPrototypeOf(prototype);
    }
    return false;
  }

  function clone(o) {
    return JSON.parse(JSON.stringify(o));
  }
}
