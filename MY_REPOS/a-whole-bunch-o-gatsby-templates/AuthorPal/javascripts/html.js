/*
  If using css to affect all divs, make sure to exclude .component class if desired
  */
/* global TS */
/* global marked */
Object.assign(TS.html.display, {
  start: function () {
    let box = document.createElement("div");
    Object.assign(box, {
      style: TS.css.boxes.wholeDisplayContainer(),
      id: "TS.html.display"
    });
    let root = box.attachShadow({
      mode: "open"
    });
    let currentID = "";
    let sorted = "";
    root.append(TS.html.display.splash().box);
    let opts = {
      element: box,
      splash: function () {
        root.innerHTML = "";
        root.append(TS.html.display.splash().box);
      },
      render: function (id) {
        currentID = id;
        root.innerHTML = "";
        sorted = TS.html.display.sort(id);
        root.append(sorted.element);
      }, 
      swapTab: function (id) {
        currentID = id;
        sorted.opts.swapTab(id);
      },
      swapFocus: function (obj, target) {
        sorted.opts.focus(obj, target);
      }
    };
    TS.events.bodyChange = function (focused) {
      if (focused.length === 0) {
        root.innerHTML = "";
        sorted = TS.html.display.sort(currentID);
        root.append(sorted.element);
      } else {
        currentID = focused[1];
        root.innerHTML = "";
        sorted = TS.html.display.sort(currentID);
        root.append(sorted.element);
        sorted.opts.update(focused);
      }
    };
    return opts;
  },
  sort: function (id) {
    let box = document.createElement("div");
    Object.assign(box, {
      id: "TS.html.display.sort"
    });
    box.style = TS.css.boxes.wholeDisplayContainer();
    let root = box.attachShadow({
      mode: "open"
    });
    let mainDisplay = TS.html.display.renderedList(id);
    let topUI = TS.html._navBars.displayLeftNav({
      mainDisplay: mainDisplay.opts,
      id: id
    });
    if (typeof (TS.data.chosenFile[id]) === "object") {
      topUI.opts.makeList([]);
    }
    root.append(topUI.box, mainDisplay.element);
    let opts = {
      update: mainDisplay.opts.update,
      swapTab: function (id) {
        mainDisplay.element.remove();
        mainDisplay.element = TS.html.display.renderedList(id).element;
        root.append(mainDisplay.element);
      },
      focus: function (obj, pathName) {
        mainDisplay.element.remove();
        mainDisplay.element = mainDisplay.opts.focus(obj, pathName);
        root.append(mainDisplay.element);
      }
    };
    return {
      element: box,
      opts: opts
    };
  },
  renderedList: function (id) {
    let focused = [];
    let opts = {}
    let box = Object.assign(document.createElement("div"), {
      name: "mainDisplayView",
      id: "TS.html.display.renderedList"
    });
    TS.refs.display = box;
    let root = box.attachShadow({
      mode: "open"
    });
    let style = document.createElement("style");
    style.innerHTML = TS.css.boxes.display();
    root.append(style);
    let determine = function (item, itemName, path, {maxDepth, depth, unfocus}) {
      let formatType;
      if (depth === undefined) depth = 0;
      //something funky here
      if (path === TS.data.chosenFile && itemName === "master_root") return 0;
      if (itemName[0] === "*") {
        formatType = function (a) {
          return a;
        };
      } else if (itemName[0] === "_") {
        formatType = function (a) {
          return a;
        };
      } else {
        formatType = function (a) {
          return marked(a);
        };
      }
      let line = Object.assign(document.createElement("div"), {
        className: "lineContainer "
      });
      if (typeof (item) === "object") line.className += " objectContainer";
      else line.className += " stringContainer";
      let lineBody;
      lineBody = Object.assign(document.createElement("div"), {
        className: "lineBody"
      });
      let title = TS.html.display.titleBar({path: path, itemName: itemName, depth: depth, unfocus: unfocus, item: item, opts: opts, focused: focused, lineBody: lineBody})
      line.append(title);
      if (typeof (item) === "string" && maxDepth === undefined) {
        let textField = Object.assign(document.createElement("div"), {
          className: "textField",
          contentEditable: true,
          onfocus: function () {
            this.innerText = path[itemName];
          },
          onblur: function () {
            path[itemName] = this.innerText;
            if (itemName[0] !== "*") {
              this.innerHTML = formatType(this.innerText);
            }
            TS.events.save();
          }
        });
        if (itemName[0] === "*") {
          textField.innerText = item;
        } else {
          textField.innerHTML = formatType(item);
        }
        lineBody.append(textField);
        line.append(lineBody);
      } else if (typeof (item) === "object") {
        if (maxDepth === undefined || depth < maxDepth) {
          for (let x in item) {
            if (item.hasOwnProperty(x)) {
              lineBody.append(determine(item[x], x, item, {
                maxDepth: maxDepth,
                depth: 1 + depth
              }));
            }
          }
        }
      }
      if (typeof (item) === "object" && Object.keys(item).length !== 0) {
        line.append(lineBody);
      }
      if (itemName === TS.data.addedLine) {
        delete TS.data.addedLine;
        TS.data.scrollToLine = line;
        setTimeout(function () {
          let height = TS.data.scrollToLine.getBoundingClientRect().top - TS.refs.mainNavBar.clientHeight;
          if (TS.data.alignment === "top") {
            height -= TS.refs.secondaryNavBar.clientHeight;
          }
          TS.refs.display.scrollTop = height;
        }, 20);
      }
      return line;
    };
    root.append(determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {}));
    Object.assign(opts, {
      showAll: function () {
        let curr = TS.data.currentView[0];
        focused = [TS.data.chosenFile[curr], curr, TS.data.chosenFile, {}];
        root.innerHTML = "";
        root.append(style, determine(TS.data.chosenFile[curr], curr, TS.data.chosenFile, {}));
      },
      fold: function (n) {
        root.innerHTML = "";
        root.append(style);
        if (focused.length === 0)
          root.append(determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {
            maxDepth: n
          }));
        else {
          root.append(determine(focused[0], focused[1], focused[2], {
            maxDepth: n
          }));
        }
      },
      focus: function (path, itemName, clickedFocus) {
        root.innerHTML = "";
        let obj = {};
        if (clickedFocus) obj.unfocus = true;
        focused = [path[itemName], itemName, path, {}];
        root.append(style, determine(path[itemName], itemName, path, obj));
        return box;
      },
      update: function (item) {
        focused = item;
        root.innerHTML = "";
        root.append(style, (focused.length > 0 ? determine(...item) : determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {})));
      }
    });
    return {
      element: box,
      opts: opts
    };
  },
  titleBar : function({itemName, unfocus, path, item, depth, opts, focused, lineBody}) {
    let title = TS.lib.createNode("div", {
      className: "title",
      draggable: "true",
      ondragstart: function (event) {
        TS.js.events.dragTitle(event);
      },
      ondragend: function(event) {
        TS.js.events.dragTitle(event)
      }
    });
    let titleContent = Object.assign(document.createElement("span"), {
      className: "titleContent",
      innerHTML: itemName,
      contentEditable: true,
      onblur: function () {
        if (path[this.innerText] === undefined) {
          let oldItemName = itemName;
          item = path[itemName];
          itemName = this.innerText;
          path[itemName] = item;
          delete path[oldItemName];
          let targPath = TS.data.currentView
          let obj = TS.data.chosenFile
          for (let i = 0; i < targPath.length-1; i++) {
            obj = obj[targPath[i]]
          }
          if (path === TS.data.chosenFile) {
            TS.refs.displayOpts.render(itemName);
          } else {
            TS.refs.displayOpts.swapFocus(obj, targPath[targPath.length-1]);
          }
        }
        if (itemName !== this.innerText)
          this.innerText = itemName;
        TS.events.save();
      }
    });
    let buttonGroup = Object.assign(document.createElement("div"), {
      className: "buttonGroup"
    });
    let keyDelete = Object.assign(document.createElement("button"), {
      innerHTML: "<b>-</b>",
      className: "deleteLine",
      onclick: function () {
        let callback = function () {
          delete path[itemName];
          if (path === TS.data.chosenFile) {
            let x;
            for (let i in TS.data.chosenFile) {
              if (i !== "master_root") {
                x = i;
                break;
              }
            }
            focused = [TS.data.chosenFile[x], x, TS.data.chosenFile, {}];
          }
          if (focused.length > 0 && focused[1] !== itemName) {
            TS.events.bodyChange(focused);
          } else {
            TS.events.bodyChange([]);
          }
          TS.data.currentView = [focused[1]];
          TS.refs.treeNav[TS.data.currentView[0]].click();
        };
        document.body.append(TS.html.modals.confirmationDelete(itemName, callback));
      },
      contentEditable: false
    });
    let unfocusBtn = Object.assign(document.createElement("button"), {
      innerHTML: "&nbsp;&nbsp;",
      title: `unfocus element`,
      className: "unfocusMe",
      onclick: function() {
        let targ = TS.data.chosenFile
        TS.data.currentView.forEach(function(ele, i) {
          if (i < TS.data.currentView.length -1) targ = targ[ele]
        })
        opts.focus(targ, TS.data.currentView[TS.data.currentView.length-1]);
      }
    });
    let openEditorChoices;
    let editorChoices = function(name) {
      let buttons = [];
      let addEditor = function(type) {
        document.body.append(TS.lib.createNode('div', {
          id: 'editor',
          style: `width: ${TS.refs.display.clientWidth}px; height: ${TS.refs.display.clientHeight}px; position: absolute; z-index: 1; top: ${TS.refs.topNav.clientHeight}px; left: ${TS.refs.secondaryNavBar.clientWidth}px`
        }))
        let aceEditor;
        switch (type) {
          case 'rich text':
            $(document).ready(function() {
              $('#editor').summernote();
              $('#editor').summernote({
                focus: true
              });
              document.querySelector('.note-editor').style = `
                width: ${TS.refs.display.clientWidth}px; height: ${TS.refs.display.clientHeight}px; position: absolute; z-index: 1; top: ${TS.refs.topNav.clientHeight}px; left: ${TS.refs.secondaryNavBar.clientWidth}px
              `
              $('#editor').summernote('code', lineBody.querySelector('.textField').innerHTML);
              aceEditor = {
                getValue: function() {
                  let text = $('#editor').summernote('code')
                  $('#editor').summernote('destroy');

                  return text;
                },
                setValue: function() {// code insertion todo?
                }
              }
            });
            break;
          default:
            aceEditor = ace.edit("editor");
            aceEditor.setTheme("ace/theme/monokai");
            aceEditor.getSession().setMode("ace/mode/" + type);
            aceEditor.setOptions({
              wrap: true,
              fontSize: "1rem"
            });
            aceEditor.setValue(item);
        }
        let exitEditor = TS.lib.createNode('button', {
          innerText: 'Exit Editor',
          className: 'baseButtons2',
          onclick: function() {
            item = aceEditor.getValue();
            path[itemName] = item;
            if (itemName[0] == '*') {
              lineBody.querySelector('.textField').innerText = item;
            } else {
              lineBody.querySelector('.textField').innerHTML = marked(item);
            }
            document.querySelector('#editor').remove();
            this.remove()
          }
        })
        TS.refs.secondaryNavBar.shadowRoot.querySelector('#left').append(exitEditor)
      }
      if (name[0] == '*') {
        let opts = ['javascript', 'css', 'json', 'html']
        opts.forEach(ele => {
          let aBtn = TS.lib.createNode('button', {
            innerText: ele,
            onclick: function() {addEditor(ele)}
          })
          buttons.push(aBtn)
        })
      } else {
        let opts = ['rich text', 'markdown', 'html']
        opts.forEach(ele => buttons.push(
          TS.lib.createNode('button', {
            innerText: ele,
            onclick: function() {
              addEditor(ele)
            }
          })
        ))
      }
      let div = TS.lib.createNode('div', {
        className: 'editorTooltip'
      })
      div.append(...buttons)
      return div
    }
    let editor = TS.lib.createNode('div', {
      innerHTML: `editor`,
      className: "editor",
      onmouseenter: function() {
        openEditorChoices = editorChoices(titleContent.innerHTML)
        this.append(openEditorChoices)
      },
      onmouseleave: function() {
          openEditorChoices.remove()
      }
    })

    let focusMe = Object.assign(document.createElement("button"), {
      innerHTML: `&nbsp;&nbsp;`,
      title: `focus this element`,
      className: "focusMe",
      onclick: function () {
        opts.focus(path, itemName, true);
      },
      contentEditable: false
    });
    if (typeof(item) === "object") {
      let add = Object.assign(document.createElement("button"), {
        className: "addLine",
        onclick: function () {
          TS.refs.container.append(TS.html.modals.addLine(path[itemName], focused));
        },
        innerHTML: "+"
      });
      buttonGroup.append(add);
    }
    title.append(titleContent, buttonGroup);
    buttonGroup.append(keyDelete);
    if (depth === 0 && unfocus) buttonGroup.append(unfocusBtn);
    if (depth > 0) buttonGroup.append(focusMe);
    if (typeof(item) ==='string') {
      buttonGroup.append(editor)
    }
    return title;
  }
});
