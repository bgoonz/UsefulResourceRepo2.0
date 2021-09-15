/* global TS */
TS.html._navBars = {
  mainButtons: function () {
    let box = document.createElement("div");
    Object.assign(box, {
      id: "TS.html._navBars.mainButtons"
    });
    let root = box.attachShadow({
      mode: "open"
    });

    let style = document.createElement("style");
    style.innerText = TS.css.boxes.mainButtons();
    let openedFiles = TS.lib.createNode("div", {
      id: "openedFiles"
    });
    root.append(openedFiles, style);
    let openFiles = {};
    let opts = {
      add: function (name) {
        if (openFiles[name] !== undefined) return 0;
        openFiles[name] = true;
        if (TS.data.chosenFileButton) {
          TS.data.chosenFileButton.className = 'navButton'
        }
        let btn = TS.lib.createNode("button", {
          className: 'navButton chosen',
          innerText: name,
          onclick: function () {
            TS.events.openFile(name, true);
            if (TS.data.chosenFileButton) {
              TS.data.chosenFileButton.className = 'navButton'
            }
            this.className = 'navButton chosen'
            TS.data.chosenFileButton = this
          }
        });
        TS.data.chosenFileButton = btn;
        root.querySelector("#openedFiles").append(btn);
        return root;
      }
    };
    return {
      element: box,
      opts: opts
    };
  },
  mainNavBar: function (display) {
    let box = document.createElement("div");
    Object.assign(box, {
      id: "TS.html._navBars.mainNavBar"
    });
    TS.refs.mainNavBar = box;
    let root = box.attachShadow({
      mode: "open"
    });
    let style = document.createElement("style");
    style.innerHTML = TS.css.boxes.topLeftNav();
    root.append(style);
    let buttons;
    let commands = {
      file: function (choice) {
        let modal = TS.html.modals[choice + "File"]({
          commands: commands
        });
        TS.refs.container.append(modal);
      },
      changeTab: function (choice) {
        display.render(choice);
      },
      preferences: function () {},
      open: function (name) {
        TS.data.chosenFile = TS.data.local.files[name];
        let firstItem = Object.keys(TS.data.chosenFile)[0];
        if (firstItem === "master_root") {
          firstItem = Object.keys(TS.data.chosenFile)[1];
        }
        display.render(firstItem);
        TS.refs.treeNav[firstItem].click();
        buttons.opts.add(name);
      }
    };
    TS.refs.displayOpts = display;
    TS.events.openFile = commands.open;
    let topDiv = document.createElement("div");
    topDiv.id = "topDiv";
    buttons = TS.html._navBars.mainButtons(commands.changeTab);
    let collapsed = false;
    let bottomDiv = Object.assign(document.createElement("div"), {
      innerHTML: `<button id='collapseNav'>^</button>`,
      style: `height: .4rem;text-align:center;`,
      onclick: function (event) {
        if (event.target.id !== "collapseNav")
          return;
        collapsed = !collapsed;
        if (collapsed) {
          topDiv.style.display = "none";
          this.style = "height: .4rem;text-align:center;margin-top: .2rem;";
        } else {
          topDiv.style.display = "flex";
          this.style = "height: .4rem;text-align:center;margin-top: 0rem;";
        }
      }
    });
    let file = TS.html._navBars.file(commands.file, display);
    let left = Object.assign(document.createElement("div"), {
      id: "left"
    });
    left.append(file)
    topDiv.append(left, buttons.element);
    root.append(topDiv, bottomDiv)
    return box;
  },
  displayLeftNav: function ({mainDisplay}) {
    let item = TS.lib.createComponent({
      id: "TS.html._navBars.displayLeftNav",
      css: TS.css.boxes.displayLeftNav(),
      html: `
        <div id='left'>
          <button class='baseButtons2' id = 'show'>Unfold</button>
          <button class='baseButtons2' id='fold1'>Fold >1</button>
          <button class='baseButtons2' id='fold2'>Fold >2</button>
        </div>
        <div id='tree'></div>
      `,
      js: function ({root, opts}) {
        root.querySelector("#show").onclick = function () {
          mainDisplay.showAll();
        };
        root.querySelector("#fold1").onclick = function () {
          mainDisplay.fold(1);
        };
        root.querySelector("#fold2").onclick = function () {
          mainDisplay.fold(2);
        };
        let treeButtons = root.querySelector("#tree");
        let ul = document.createElement("ul");
        ul.className = "ul_0";
        TS.data.currentView = [];
        let vUl = {};
        let list = [ul];
        TS.refs.treeNav = vUl;
        treeButtons.append(ul);
        Object.assign(opts, {
          makeList: function (path) {
            let vTarget = vUl;
            let target = TS.data.chosenFile;
            for (let i = 0; i < path.length; i++) {
              vTarget = vTarget[path[i]];
              target = target[path[i]];
            }
            let subUL = opts.subInit(target, path.length, path);
            if (path.length > 0) {
              list.push(subUL);
              list[list.length - 2].insertBefore(subUL, vTarget.nextSibling);
            } else {
              treeButtons.replaceChild(subUL, list[0]);
              list[0] = subUL;
            }
            return subUL;
          },
          subInit: function (obj, depth, path) {
            let subUL = TS.lib.createNode("ul", {
              className: `ul_${depth}`
            });
            let vTarget = vUl;
            path.forEach(ele => {
              vTarget = vTarget[ele];
            });
            for (let str in obj) {
              if (str === "master_root") continue;
              let targ = path.concat([str]);
              let li = Object.assign(document.createElement("li"), {
                innerHTML: str,
                className: `rightButtons li_${depth}`,
                onclick: function () {
                  TS.data.currentView = targ;
                  TS.refs.displayOpts.swapFocus(obj, str);
                  let discard = list.slice(depth + 1);
                  list = list.slice(0, depth + 1);
                  if (discard.length > 0) discard[0].remove();
                  if (depth < 4 && typeof (obj[targ[targ.length - 1]]) === "object") {
                    opts.makeList(targ);
                  }
                }
              });
              vTarget[str] = li;
              subUL.append(li);
            }
            return subUL;
          }
        });
        let addColumn = Object.assign(document.createElement("button"), {
          innerText: "+new column",
          id: "addColumn",
          onclick: function () {
            TS.data.chosenFile["EditThisName"] = {};
            TS.refs.displayOpts.render("EditThisName");
            TS.refs.treeNav["EditThisName"].click();
          }
        });
        root.append(addColumn);
      }
    });
    TS.refs.secondaryNavBar = item.box;
    return item;
  },
  file: function (callback, display) {
    let select = Object.assign(document.createElement("div"), {
      id: "menu",
      innerHTML: `Menu
      <div id='hiddenOptions' class='hidden'></div>`
    });
    let options = ["home", "open", "create", "delete", "save", "upload", "preferences", "export", "faq", "devMode"];
    let values = ["Home", "Open File", "New File", "Delete File", "Download", "Upload", "Preferences", "Export File", "FAQ", "Dev. Mode"];
    for (var j = 0; j < options.length; j++) {
      let option = Object.assign(document.createElement("div"), {
        className: "menuOptions",
        "value": options[j],
        "innerText": values[j],
        onclick: function () {
          switch (this.value) {
            case "devMode":
              window.open("devMode.html", "_blank");
              break;
            case "faq":
              window.open("FAQ.html", "_blank");
              break;
            case "home":
              display.splash();
              break;
            default:
              callback(this.value);
          }
          this.parentNode.style.display = "none";
          let vis = this.parentNode;
          setTimeout(function () {
            vis.style.display = "";
          }, 134);
        }
      });
      select.querySelector("#hiddenOptions").append(option);
    }
    return select;
  }
};
