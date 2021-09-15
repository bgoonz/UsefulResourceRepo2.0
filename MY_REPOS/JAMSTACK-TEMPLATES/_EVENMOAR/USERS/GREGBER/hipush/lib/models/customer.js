var bcrypt = require('bcryptjs');
var Promise = require('bluebird');

module.exports = function (sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Customer.hasMany(models.Website);
      },
      comparePassword: function (password, hash) {
        return Promise.promisify(bcrypt.compare.bind(bcrypt))(password, hash);
      },
      encryptPassword: function (password) {
        return Promise.promisify(bcrypt.hash.bind(bcrypt))(password, 8);
      }
    },
    instanceMethods: {
      encryptPassword: function (password) {
        var customer = this;

        return Customer.encryptPassword(password)
        .then(function (hash) {
          customer.password = hash;
        });
      },
      comparePassword: function (password) {
        return Customer.comparePassword(password, this.password);
      }
    },
    indexes: [
      {fields: ['email'], unique: true}
    ]
  });

  return Customer;
};
