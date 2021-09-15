'use strict';
module.exports = (sequelize, DataTypes) => {
  const Potato = sequelize.define('Potato', {
    type: DataTypes.STRING
  }, {});
  Potato.associate = function(models) {
    // associations can be defined here
  };
  return Potato;
};