var glob = require('glob')

var renderPage = require('./lib/render-page')

module.exports = function (options) {
  options = options || {}
  options.dataDir = options.dataDir || 'data'
  options.pagesDir = options.pagesDir || 'pages'
  options.templateDir = options.templateDir || 'templates'

  glob(options.pagesDir + '/**/*.(md|html)', function (pages) {
    pages.forEach(function (page) {
      renderPage(page)
    })
  })
}
