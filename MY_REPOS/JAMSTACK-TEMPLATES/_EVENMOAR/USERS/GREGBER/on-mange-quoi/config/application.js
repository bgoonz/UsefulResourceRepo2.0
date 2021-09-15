var express = require('express'),
app = express();

//root
global.base = require('path').resolve(__dirname + '/../');

// db connection
require('mongoose').connect('localhost', 'on-mange-quoi');

module.exports = exports = app;