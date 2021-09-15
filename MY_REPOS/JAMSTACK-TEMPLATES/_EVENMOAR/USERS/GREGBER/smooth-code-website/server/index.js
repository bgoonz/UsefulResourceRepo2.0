var http = require('http');
var path = require('path');
var express = require('express');
var compress = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var config = require('./config');

/**
 * Create app and server.
 */

var app = express();
var server = http.createServer(app);

/**
 * Middlewares.
 */

var root = path.join(__dirname, '..', config.server.root);

app.use(compress());
app.use(express.static(root));
app.use(favicon(path.join(root, 'favicon.ico')));

app.post('/api/contact',
  bodyParser.urlencoded({extended: false}),
  require('./contact/route')
);

// Redirect all pages to the home.
app.use(function(req, res) {
  res.redirect('/');
});

/**
 * Start listening.
 */

server.listen(process.env.PORT || config.server.port);

server.on('listening', function onListening() {
  console.info(
    'Server is started: http://localhost:%d/',
    server.address().port
  );
});
