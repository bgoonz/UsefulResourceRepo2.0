var path = require('path');
var express = require('express');
var bunyanRequest = require('bunyan-request');
var errorHandler = require('express-err');
var apiRoutes = require('./api');
var urlRoute = require('./url');
var logger = require('../../logger');

var app = module.exports = express();

app.use(bunyanRequest({
  logger: logger
}));

app.use(express.static(path.join(__dirname, '../../../public'), {maxAge: '30s'}));

app.use('/api', apiRoutes);
app.use('/url', urlRoute);

// Redirect other routes to 404.
app.use(errorHandler.httpError(404));

// Handle errors.
app.use(errorHandler({
  formatters: ['json', 'text'],
  exitOnUncaughtException: false
}));
