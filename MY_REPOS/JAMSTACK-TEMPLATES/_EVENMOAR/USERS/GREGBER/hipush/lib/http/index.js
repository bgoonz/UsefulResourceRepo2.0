var http = require('http');
var routes = require('./routes');

module.exports = http.createServer(routes);
