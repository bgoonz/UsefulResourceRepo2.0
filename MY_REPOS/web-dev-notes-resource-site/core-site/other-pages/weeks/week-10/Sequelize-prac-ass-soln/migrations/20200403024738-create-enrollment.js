'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Enrollments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'People' }
      },
      courseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Courses' }
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
    return queryInterface.dropTable('Enrollments');
  }
};
