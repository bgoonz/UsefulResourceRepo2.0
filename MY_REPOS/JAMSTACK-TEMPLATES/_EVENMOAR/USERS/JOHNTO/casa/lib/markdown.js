var marked = require('marked')
var hljs = require('highlight.js')
var renderer = new marked.Renderer()

renderer.code = function (code, lang) {
  if (lang && lang.match(/^html/)) {
    return '<div class="border rounded"><div class="border-bottom p2 mt1">' + code + '</div><div class="p2"><pre>' + hljs.highlightAuto(code, [lang]).value + '</pre></div></div>'
  } else {
    return '<pre>' + hljs.highlightAuto(code, [lang]).value + '</pre>'
  }
}

module.exports = function md(markdown) {
  return marked(markdown, { renderer: renderer })
}
