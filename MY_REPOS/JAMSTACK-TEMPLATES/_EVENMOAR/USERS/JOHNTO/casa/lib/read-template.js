var fs = require('fs')
var path = require('path')

module.exports = function readTemplate (templateName) {
  var templateDir = path.resolve(path.dirname(require.main.filename), 'templates/')
  var template = null

  try {
    template = fs.readFileSync(templateDir + '/' + templateName + '.html', 'utf8')
  } catch (e) {
    if (e.errno === -2) {
      console.log('There is no template called ' + templateName +
                  ' in the template directory (' + templateDir + ')')
    } else {
      console.log(e)
    }
  }

  return template
}
