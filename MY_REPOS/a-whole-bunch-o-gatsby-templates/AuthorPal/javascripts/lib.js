/* global TS */
TS.lib = {
  createNode: function (type, obj) {
    let node = Object.assign(document.createElement(type), obj);
    return node;
  },
  createComponent: function ({css,parent,id,html,js}) {
    let box = TS.lib.createNode("div", {
      "id": id,
      "class": "component"
    });
    let root = box.attachShadow({mode: "open"});
    let style = TS.lib.createNode("style", {
      innerHTML: css
    });
    root.appendChild(style);
    root.innerHTML += html;
    let opts = {};
    js({box,root,style,parent,opts});
    return {box: box, opts: opts};
  }
};
