var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('./logger');

// Create express application.
var app = express();

app.get('/', serveIndex);
app.get('/game', serveIndex);

function serveIndex(req, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
}

// Expose client.
app.use(express.static(path.join(__dirname, '..', 'client')));

// Expose bower components.
app.use('/bower_components', express.static(path.join(__dirname, '..', 'bower_components')));

// Create and expose server.
var server = module.exports = http.createServer(app);

// Log when server is started.
server.on('listening', function () {
  logger.log('Server started http://localhost:%d/', server.address().port);
});
