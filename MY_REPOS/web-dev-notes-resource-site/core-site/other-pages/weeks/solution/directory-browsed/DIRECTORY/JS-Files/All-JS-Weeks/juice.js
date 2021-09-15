'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const Juice = sequelize.define( 'Juice', {
    name: DataTypes.STRING,
    flavor: DataTypes.STRING
  }, {} );
  Juice.associate = function ( models ) {
    // associations can be defined here
  };
  return Juice;
};
