'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subbreaddit = sequelize.define(
    'Subbreaddit',
    {
      name: DataTypes.STRING,
      ownerId: DataTypes.INTEGER,
    },
    {}
  );
  Subbreaddit.associate = function (models) {
    // associations can be defined here
    Subbreaddit.belongsTo(models.User, { foreignKey: 'ownerId' });
    Subbreaddit.hasMany(models.Post, { foreignKey: 'subId' });
    Subbreaddit.belongsToMany(models.User, { through: 'Subscription', otherKey: 'userId', foreignKey: 'subId' });
  };
  return Subbreaddit;
};
