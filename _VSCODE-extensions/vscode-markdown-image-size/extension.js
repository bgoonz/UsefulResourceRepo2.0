"use strict";

function activate(context) {
  return {
    extendMarkdownIt(md) {
      return md.use(require("markdown-it-imsize"));
    },
  };
}
exports.activate = activate;
