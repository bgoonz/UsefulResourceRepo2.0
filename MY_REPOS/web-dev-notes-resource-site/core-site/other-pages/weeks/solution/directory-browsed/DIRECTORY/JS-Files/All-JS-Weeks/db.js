const Sequelize = require('sequelize');

module.exports = new Sequelize('sqltest2', 'eszwajkowski', '', {
    dialect: 'postgres',
    logging: false,
});
