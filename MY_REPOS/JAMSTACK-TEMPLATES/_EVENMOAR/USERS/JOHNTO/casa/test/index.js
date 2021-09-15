var fs = require('fs')
var test = require('tape')

var renderPage = require('../lib/render-page')
var readTemplate = require('../lib/read-template')
var renderTemplate = require('../lib/render-template')

test('page render', function (t) {
  t.plan(1)

  renderPage('test/pages/test-page.html')
  var testPage = fs.readFileSync('test/test-page/index.html', 'utf8')
  var expected = fs.readFileSync('test/test-page/index.expected.html', 'utf8')
  t.equal(testPage, expected)
})

test('markdown page render', function (t) {
  t.plan(1)

  renderPage('test/pages/foobar.md')
  var testPage = fs.readFileSync('test/foobar/index.html', 'utf8')
  var expected = fs.readFileSync('test/foobar/index.expected.html', 'utf8')
  t.equal(testPage, expected)
})

test('template render', function (t) {
  t.plan(1)

  var template = fs.readFileSync('test/templates/nested-template.html', 'utf8')
  var renderedTemplate = renderTemplate({ content: template })
  var expected = fs.readFileSync('test/templates/nested-template.expected.html', 'utf8')
  t.equal(renderedTemplate, expected)
})

test('read template', function (t) {
  t.plan(2)

  var expected = '{{{\n  "template": "nested-nested-template",\n  "foobar": "Some string thing"\n}}}\n<div class="awesome-nested-template"></div>\n'

  t.doesNotThrow(readTemplate)
  t.equal(readTemplate('nested-template'), expected)
})
