module.exports = function (sequelize, DataTypes) {
  var Website = sequelize.define('Website', {
    name: DataTypes.STRING,
    domain: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Website.belongsTo(models.Customer);
        Website.hasMany(models.User);
        Website.hasMany(models.Notification);
        Website.hasMany(models.Event);
      }
    }
  });

  return Website;
};
