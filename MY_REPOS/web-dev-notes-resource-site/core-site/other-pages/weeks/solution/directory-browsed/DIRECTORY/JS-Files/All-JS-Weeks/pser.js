'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pser = sequelize.define('Pser', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Pser.associate = function(models) {
    // associations can be defined here
  };
  return Pser;
};