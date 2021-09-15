const knex = require("../init");

module.exports = () => knex.destroy();
