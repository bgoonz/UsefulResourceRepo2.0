var app = require('./application');

module.exports = exports = require('lodash').extend({
  server: {
    domain: 'localhost:3000',
    port: 3000
  }
}, require('./environments/' + app.settings.env));