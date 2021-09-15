var express = require('express');
var proxy = require('express-http-proxy');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));
app.use('/', proxy('https://registry.npmjs.org'));
app.listen(3000);
