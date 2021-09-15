var path = require('path');
var express = require('express');
var _ = require('lodash');
var uuid = require('uuid');

/**
 * Create and expose router.
 */

var router = module.exports = new express.Router();

/**
 * Load initial data.
 */

var notes = require(path.join(__dirname, '..', '..', 'data', 'notes.json'));

// Handle id param.
router.param('id', function (req, res, next, id) {
  req.note = _.find(notes, {id: id});

  if (!req.note) {
    var error = new Error('Not Found');
    error.status = 404;
    return next(error);
  }

  next();
});

// Find
router.get('/', function (req, res) {
  res.send(notes);
});

// Find all
router.get('/:id', function (req, res) {
  res.send(req.note);
});

// Create
router.post('/', function (req, res) {
  var note = req.body;
  note.id = uuid();
  notes.push(note);
  res.send(201, note);
});

// Update
router.patch('/:id', function (req, res) {
  _.extend(req.note, req.body);
  res.send(req.note);
});

// Delete
router.delete('/:id', function (req, res) {
  _.remove(notes, req.note);
  res.send(204);
});

// Error handler.
router.use(function (err, req, res, next) {
  res.send(err.status || 500, {message: err.message});
});