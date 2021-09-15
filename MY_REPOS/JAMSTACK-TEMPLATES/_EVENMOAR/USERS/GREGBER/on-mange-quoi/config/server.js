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
  app.set('views', global.base + '/app/templates');

  // aliases
  app.use('/assets/components', express.static(global.base + '/components'));
  app.use('/assets/font', express.static(global.base + '/components/font-awesome/font'));
});

app.configure('production', function () {
  app.use(express.static(global.base + '/public'));
});

app.configure('development', function () {
  app.use('/assets', express.static(global.base + '/app/assets'));
});

app.configure(function () {
  // routes
  require('./routes')(app);
});

module.exports = exports = app;