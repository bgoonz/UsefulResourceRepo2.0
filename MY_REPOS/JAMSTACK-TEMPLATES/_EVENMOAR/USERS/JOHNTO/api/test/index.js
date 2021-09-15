var fs = require('fs')
var data = require('..')

// JSON parsing and stringification shouldn't cause errors
JSON.parse(fs.readFileSync('./data.json'))
JSON.stringify(data)
