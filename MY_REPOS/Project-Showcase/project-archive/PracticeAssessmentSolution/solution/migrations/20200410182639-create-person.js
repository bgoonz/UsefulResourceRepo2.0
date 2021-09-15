'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('People', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      age: {
        type: Sequelize.INTEGER
      },
      biography: {
        type: Sequelize.TEXT
      },
      hairColorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'HairColors' }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('People');
  }
};
