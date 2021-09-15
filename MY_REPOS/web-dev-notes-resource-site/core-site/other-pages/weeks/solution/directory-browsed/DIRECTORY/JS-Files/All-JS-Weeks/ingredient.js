'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const Ingredient = sequelize.define( 'Ingredient', {
    amount: {
      type: DataTypes.NUMERIC,
      validate: {
        min: {
          args: [ 0 ]
        }
      }
    },
    measurementUnitId: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [ 0 ]
        }
      }
    },
    foodStuff: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true
      }

    },
    recipeId: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [ 0 ],
        }
      }
    },
  }, {} );
  Ingredient.associate = function ( models ) {
    Ingredient.belongsTo( models.MeasurementUnit, {
      foreignKey: "measurementUnitId"
    } );
    Ingredient.belongsTo( models.Recipe, {
      foreignKey: 'recipeId'
    } );
  };
  return Ingredient;
};
