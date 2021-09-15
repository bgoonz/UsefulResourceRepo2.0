var express = require('express'),
  cons = require('consolidate'),
  path = require('path'),
  _ = require('lodash'),
  api = require('./api'),
  Media = require('../models/media');

var app = module.exports = express();

app.engine('jade', cons.jade);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname + '/../views'));

app.param('photoId', function (req, res, next, id) {
  Media.findOne({ id: id }, function (err, media) {
    if (err) return next(err);
    if (! media) return next(404);
    next();
  });
});

app.get('/', _.partial(renderPage, 'default'));
app.get('/photos', _.partial(renderPage, 'default'));
app.get('/photos/:photoId', _.partial(renderPage, 'default'));
app.use('/api', api);
app.use(show404);
app.use(error404Handler);
app.use(errorHandler);

function renderPage(page, options, req, res) {
  if (options.originalUrl) {
    res = req;
    req = options;
    options = {};
  }

  _.defaults(options, {
    pageTitle: 'Insta Tour Paris 13'
  });

  res.render(page, options);
}

function show404(req, res, next) {
  next(404);
}

function error404Handler(err, req, res, next) {
  if (err !== 404) next(err);

  res.status(404);

  if (req.accepts('html')) return renderPage('errors/not-found', {
      pageTitle: 'Page introuvable',
      error: true
    }, req, res);
  if (req.accepts('json')) return res.send({ error: 'Not found' });
  res.type('txt').send('Not found');
}

function errorHandler(err, req, res) {
  res.status(500);

  if (req.accepts('html')) return renderPage('errors/server', {
      pageTitle: 'Erreur serveur',
      error: true
    }, req, res);
  if (req.accepts('json')) return res.send({ error: 'Internal Server Error' });
  res.type('txt').send('Internal Server Error');
}