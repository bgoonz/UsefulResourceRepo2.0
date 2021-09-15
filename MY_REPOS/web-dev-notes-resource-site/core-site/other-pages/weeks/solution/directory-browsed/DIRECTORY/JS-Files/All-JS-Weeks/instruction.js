'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const Instruction = sequelize.define( 'Instruction', {
    specification: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      }
    },
    listOrder: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [ 0 ]
        }
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [ 0 ]
        }
      }
    }
  }, {} );
  Instruction.associate = function ( models ) {
    Instruction.belongsTo( models.Recipe, {
      foreignKey: 'recipeId'
    } );
  };
  return Instruction;
};
