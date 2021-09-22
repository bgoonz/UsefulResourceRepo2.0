'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Person.associate = function(models) {
    const columnMapping = {
      foreignKey: 'personId',
      through: 'Enrollments',
      otherKey: 'courseId',
    };
    Person.belongsToMany(models.Course, columnMapping);
  };
  return Person;
};
