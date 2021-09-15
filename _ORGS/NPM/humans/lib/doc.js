var fs = require('fs')
var path = require('path')
var handlebars = require('handlebars')
var template = handlebars.compile(
  fs.readFileSync(path.resolve(process.cwd(), 'templates/readme.hbs'), 'utf-8')
)

var context = {
  package: require('../package.json'),
  humans: require('../index.js')
}

process.stdout.write(template(context))
