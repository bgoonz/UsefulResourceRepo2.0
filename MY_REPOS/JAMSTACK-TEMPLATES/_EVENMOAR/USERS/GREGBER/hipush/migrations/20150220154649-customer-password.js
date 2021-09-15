'use strict';

module.exports = {
  up: function (migration, DataTypes) {
    return migration.addColumn('Customers', 'password', DataTypes.STRING);
  },

  down: function (migration) {
    return migration.removeColumn('Customers', 'password');
  }
};
