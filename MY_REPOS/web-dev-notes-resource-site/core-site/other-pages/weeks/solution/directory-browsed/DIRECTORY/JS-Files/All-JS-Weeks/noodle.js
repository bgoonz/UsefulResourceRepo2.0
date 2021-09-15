'use strict';
module.exports = (sequelize, DataTypes) => {
  const noodle = sequelize.define('noodle', {
    name: DataTypes.STRING,
    isStuffed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false

    }
  }, {});
  noodle.associate = function(models) {
    noodle.hasMany(models.pasta, {foreignKey: 'noodleId'})
  };
  return noodle;
};
