"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      name: DataTypes.STRING,
      level: DataTypes.INTEGER,
      campusId: DataTypes.INTEGER,
      departmentId: DataTypes.INTEGER,
    },
    {}
  );
  Course.associate = function (models) {
    Course.belongsTo(models.Campus, {
      foreignKey: "campusId",
    });
    Course.belongsTo(models.Department, {
      foreignKey: "departmentId",
    });

    const columnMapping = {
      foreignKey: "courseId",
      through: "Enrollments",
      otherKey: "personId",
    };
    Course.belongsToMany(models.Person, columnMapping);
  };
  return Course;
};
