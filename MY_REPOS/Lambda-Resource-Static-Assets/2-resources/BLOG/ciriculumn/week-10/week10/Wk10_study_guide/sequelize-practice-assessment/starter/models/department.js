'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
  };
  return Department;
};