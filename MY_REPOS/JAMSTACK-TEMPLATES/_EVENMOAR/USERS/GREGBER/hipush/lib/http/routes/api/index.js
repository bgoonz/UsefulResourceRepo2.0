var express = require('express');
var bodyParser = require('body-parser');
var appleRoutes = require('./apple');
var internalRoutes = require('./internal');

var router = module.exports = new express.Router();

router.use(bodyParser.json());

router.use('/internal', internalRoutes);
router.use('/apple', appleRoutes);
