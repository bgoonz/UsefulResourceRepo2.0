var github = require('octonode'),
  app = require('./app'),
  parseReference = require('./references/parser').parse;

module.exports = monitor;

function monitor(options) {
  app.set('ghClient', github.client(options.token));
  app.set('references', options.references.map(parseReference));
  app.set('refresh', options.refresh);
  app.set('template', options.template);
  app.listen(options.port);
}