'use strict';
module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define('People', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    biography: DataTypes.TEXT,
    hairColorId: DataTypes.INTEGER
  }, {});
  People.associate = function(models) {
    // associations can be defined here
  };
  return People;
};