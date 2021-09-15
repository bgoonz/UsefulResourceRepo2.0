'use strict';
module.exports = {
  up: ( queryInterface, Sequelize ) => {
    return queryInterface.createTable( 'Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING( 500 )
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories'
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      completed: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    } );
  },
  down: ( queryInterface, Sequelize ) => {
    return queryInterface.dropTable( 'Tasks' );
  }
};
