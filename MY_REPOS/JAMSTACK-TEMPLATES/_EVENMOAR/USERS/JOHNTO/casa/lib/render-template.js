var _ = require('lodash')
var fm = require('json-front-matter')
var objectMerge = require('object-merge')

var readTemplate = require('./read-template')

module.exports = function renderTemplate (frontMatter) {
  var fmParsed = fm.parse(frontMatter.content)
  var templateFrontMatter = fmParsed.attributes || {}
  frontMatter = objectMerge(templateFrontMatter, frontMatter)
  frontMatter.content = fmParsed.body

  if (templateFrontMatter.template) {
    var template = readTemplate(templateFrontMatter.template)
    var compiledTemplate = _.template(template)(frontMatter)
    frontMatter.content = compiledTemplate

    return renderTemplate(frontMatter)
  } else {
    return frontMatter.content
  }
}
