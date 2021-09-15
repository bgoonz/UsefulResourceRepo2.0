module.exports = function (sequelize) {
  var Click = sequelize.define('Click', {}, {
    classMethods: {
      associate: function (models) {
        Click.belongsTo(models.Notification);
        Click.belongsTo(models.User);
      }
    },
    indexes: [
      {fields: ['NotificationId', 'UserId'], unique: true}
    ]
  });

  return Click;
};
