module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    type: DataTypes.STRING,
    info: DataTypes.JSON
  }, {
    classMethods: {
      associate: function (models) {
        Event.belongsTo(models.Website);
      }
    },
    indexes: [
      {fields: ['type']}
    ]
  });

  return Event;
};
