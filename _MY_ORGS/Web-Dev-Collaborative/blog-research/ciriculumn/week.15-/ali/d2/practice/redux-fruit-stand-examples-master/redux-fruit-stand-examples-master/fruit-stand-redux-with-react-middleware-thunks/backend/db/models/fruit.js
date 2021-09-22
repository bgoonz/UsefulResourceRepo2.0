'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fruit = sequelize.define('Fruit', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {});
  Fruit.associate = function(models) {
    // associations can be defined here
  };
  return Fruit;
};