'use strict';
module.exports = (sequelize, DataTypes) => {
  const Farmer = sequelize.define('Farmer', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Farmer.associate = function(models) {
    // associations can be defined here
  };
  return Farmer;
};