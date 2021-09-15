var nconf = require('nconf');

module.exports = nconf
  .env('__')
  .file('envfile', __dirname + '/../config/' + (process.env.NODE_ENV || 'development') + '.json')
  .file(__dirname + '/../config/default.json');