'use strict';

module.exports = {
  up: ( queryInterface, Sequelize ) => {
    return queryInterface.bulkInsert( 'Categories', [ {
        name: 'High Priority',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shopping',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Book Contract',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Interviews',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ] );
  },

  down: ( queryInterface, Sequelize ) => {
    return queryInterface.bulkDelete( 'Categories' );
  }
};
