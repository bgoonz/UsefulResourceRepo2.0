'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const Task = sequelize.define( 'Task', {
    title: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    completed: DataTypes.BOOLEAN
  }, {} );
  Task.associate = function ( models ) {
    Task.belongsTo( models.Category, {
      foreignKey: 'categoryId'
    } );
  };
  return Task;
};
