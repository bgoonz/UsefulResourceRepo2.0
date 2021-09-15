/* global TS */
/* global marked */
//write .append function
Object.assign(TS.js, {
  baseModal: function (box, root) {
    box.onclick = function () {
      box.remove();
    };
    root.querySelector("#centerModal").onclick = function (event) {
      event.stopPropagation();
    };
    window.x = root.querySelector("#exit");
    root.querySelector("#exit").onclick = function () {
      box.remove();
    };
  },
  sortShadowTree: function(obj) {
    let output = {}
    let i = 0;
    for (let x in obj) {
      output[x] = {name: x, index: i}
      if (typeof(obj[x]) == 'object') {
        output[x].children = TS.js.sortShadowTree(obj[x])
      } else if (typeof(obj[x]) == 'string') {
        if (obj[x][0] == '*') output[x].editor = 'text'
        else output[x].editor = 'md'
      }
      i++
    }
    return output
  },
  events: {
    dragTitle: function (event) {
      console.log(event)
    }
  },
  fileFormat: {
    markdownBlog: function (file) {
      let body1 = ``;
      let navbar1 = `<div class='topNavbar'>`;
      let templates = {};
      // let recent = ``; // Todo: recent is defined but never used?
      { //populate navbar
        let keys = Object.keys(file);
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== "#general" && keys[i] !== "#advanced" && keys[i] !== "master_root") {
            { //populate templates
              let str = `<template id = '_Template_${keys[i]}'>`;
              if (keys[i] === "#general" && keys[i] === "#advanced" && keys[i] === "master_root") {
                //skip
              } else if (keys[i] === "archive") {
                let articles = [];
                Object.keys(file.archive).forEach(function (ele) {
                  if (file.archive[ele]["#type"] && file.archive[ele]["#type"] === "blog entry") {
                    articles.push(file.archive[ele]);
                  }
                });
                articles.sort(function (a, b) {

                  return a.date.getTime() - b.date.getTime();
                });
                articles.forEach(function (ele, i) {
                  str += `<div class='blogPost'>
                  <h2 class='blogPostTitle'>${ele.title}</h2>
                  <p class='blogPostContent'>${marked(ele.text)}</p>
                </div>`;
                  if (i < 5) {
                    recent += `<div class='blogPost'>
                    <h2 class='blogPostTitle'>${ele.title}</h2>
                    <p class='blogPostContent'>${marked(ele.text)}</p>
                    </div>`;
                  }
                });
              } else {
                for (let x in file[keys[i]]) {
                  if (file[keys[i]].hasOwnProperty(x)) {
                    if (x[0] === "*") {
                      str += file[keys[i]][x];
                    } else {
                      str += marked(file[keys[i]][x]);
                    }
                  }
                }
              }
              str += `</template>`;
              templates[keys[i]] = str;
            }
            navbar1 += `<button class='navButton'>${keys[i]}</button>`;
          }
        }
        navbar1 += "</div>";
        body1 += navbar1 + '<div id="main"></div>';
        for (let x in templates) {
          if (templates.hasOwnProperty(x)) {
            body1 += templates[x];
          }
        }
      }
      let script1 = `
      document.querySelector('#main').appendChild(document.querySelector("#_Template_homepage").cloneNode(1).content)
      document.querySelectorAll('.navButton').forEach(function(ele) {
        ele.onclick=function() {
          document.querySelector('#main').innerHTML =''
          document.querySelector('#main').appendChild(document.querySelector("#_Template_" + this.innerText).cloneNode(1).content)
        }
      })`;
      return {
        default: {
          head: {
          },
          main: body1,
          script: script1
        }
      };
    },
    outlineMarkdown: function (file) {
      let str = ``;
      let title;
      try {
        title = file.general.title;
      } catch (err) {
        title = "";
      }
      if (title) {
        str += `<h1>${title}</h1>`;
      }
      let tableOfContents = `<h2 id='tableOfContents'>Table of Contents</h2>`;
      let format = function (obj, depth, path, parent) {
        if (typeof (obj) !== "object") {
          str += `<div class='content _${depth}'>`;
          if (parent[0] === "*") str += obj; //add _ support later.
          else str += marked(obj);
          str += "</div>";
          return 0;
        }
        tableOfContents += "<ul>";
        let keys = Object.keys(obj);
        keys.forEach(ele => {
          if (ele === "master_root" || ele === "#advanced") return 0;
          tableOfContents += `<li><a href="#${path + ele}">${ele}</a></li>`;
          str += `<h${depth} id='${path + ele}' class='headers _${depth}'>${ele}</h${depth}>`;
          format(obj[ele], depth + 1, path + ele, ele);
        });
        tableOfContents += "</ul>";
      };
      format(file, 2, "_", "");
      let script = `
      document.querySelectorAll('.headers').forEach(ele => {ele.onclick = function() {
            window.scrollTo(0, 0);}
          })`;
      return {
        default: {
          head: {
          },
          main: tableOfContents + str,
          script: script
        }
      };
    }
  }
});
