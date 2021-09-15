'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pasta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING(50)
      },
      description: {
        type: Sequelize.TEXT
      },
      taste: {
        type: Sequelize.DECIMAL(10,1)
      },
      noodleId: {
        type: Sequelize.INTEGER,
        references: {model: 'noodles'}

      },
      sauceId: {
        type: Sequelize.INTEGER,
        references: {model: 'sauces'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pasta');
  }
};
