var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var logger = require('../logger').child({type: 'database'});
var config = require('../config');

// Expose module.
var db = module.exports = {};

// Create sequelize instance.
var sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password, {
    host: config.database.hostname,
    port: config.database.port,
    dialect: 'postgres',
    logging: function (query) {
      logger.info(query);
    }
 }
);

// Expose sequelize on db.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Authenticated to database.
sequelize.authenticate()
.then(function () {
  logger.info('Connected to the database');
})
.catch(function (err) {
  logger.error(err, 'Could not connect to the database');
});

// Load models.
fs.readdirSync(__dirname)
.filter(function (file) {
  return file.indexOf('.') !== 0 && file !== 'index.js';
})
.forEach(function (file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

// Load associations.
Object.keys(db).forEach(function (name) {
  if ('associate' in db[name])
    db[name].associate(db);
});
