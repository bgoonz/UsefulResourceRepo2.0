var express = require('express'),
app = require('./application');

app.configure(function() {

  // express config
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(app.router);

  // view config
  app.engine('hbs', require('consolidate').handlebars);
  app.set('view engine', 'hbs');
  app.set('views', global.base + '/app');

  //md5 helper
  require(global.base + '/app/helpers/md5');

  // aliases
  app.use('/assets/components', express.static(global.base + '/components'));
});

app.configure('production', function () {
  app.use(express.static(global.base + '/public'));
});

app.configure('development', function () {
  app.use(express.logger());
  app.use('/assets', express.static(global.base + '/app/assets'));
});

app.configure(function () {
  // routes
  require('./routes')(app);
});

module.exports = exports = app;