'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    userId: DataTypes.INTEGER,
    subId: DataTypes.INTEGER
  }, {});
  Subscription.associate = function(models) {
    // associations can be defined here
  };
  return Subscription;
};