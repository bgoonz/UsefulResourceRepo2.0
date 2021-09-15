var path = require('path');
var express = require('express');
var app = express();

var clientDir = path.join(__dirname, '..', 'client');

// Expose the application.
app.use(express.static(clientDir));
app.use('/bower_components', express.static(path.join(__dirname, '..', 'bower_components')));

// API
app.use('/api', require('./api'));
app.use(function (req, res) {
  res.sendFile(path.join(clientDir, 'index.html'));
});

app.listen(process.env.PORT || 3000);