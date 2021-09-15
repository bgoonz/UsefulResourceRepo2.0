module.exports = function (sequelize, DataTypes) {
  var Notification = sequelize.define('Notification', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    action: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Notification.belongsTo(models.Website);
        Notification.hasMany(models.Click);
      }
    }
  });

  return Notification;
};
