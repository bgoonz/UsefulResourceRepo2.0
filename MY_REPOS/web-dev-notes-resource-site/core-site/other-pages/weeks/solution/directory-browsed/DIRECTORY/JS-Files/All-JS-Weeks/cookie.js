'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const Cookie = sequelize.define( 'Cookie', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name can't be null"
        },
        notEmpty: {
          msg: "name can't be empty"
        }
      }
    },
    flavor: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
  }, {} );
  Cookie.associate = function ( models ) {
    // associations can be defined here
  };
  return Cookie;
};
