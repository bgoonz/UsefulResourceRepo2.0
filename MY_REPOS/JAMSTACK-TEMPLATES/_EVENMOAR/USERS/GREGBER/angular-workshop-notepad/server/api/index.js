var express = require('express');
var bodyParser = require('body-parser');

/**
 * Create and expose router.
 */

var router = module.exports = new express.Router();

/**
 * Use JSON body parser.
 */

router.use(bodyParser.json());

// Notes
router.use('/notes', require('./notes'));