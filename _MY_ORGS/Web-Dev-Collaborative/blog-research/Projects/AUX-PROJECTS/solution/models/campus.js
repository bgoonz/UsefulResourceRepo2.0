'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const Campus = sequelize.define( 'Campus', {
    name: DataTypes.STRING
  }, {} );
  Campus.associate = function ( models ) {
    Campus.hasMany( models.Course, {
      foreignKey: 'campusId'
    } );
  };
  return Campus;
};
