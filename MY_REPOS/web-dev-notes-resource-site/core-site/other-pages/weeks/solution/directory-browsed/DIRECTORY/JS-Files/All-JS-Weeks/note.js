'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const Note = sequelize.define( 'Note', {
    reminder: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {} );
  Note.associate = function ( models ) {};
  return Note;
};
