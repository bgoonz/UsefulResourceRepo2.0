'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Fruits', [
      {
        name: 'APPLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'APPLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ORANGE',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    return queryInterface.bulkInsert('Farmers', [
      {
        name: 'John Smith',
        paid: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sally Jones',
        paid: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Fruits', null, {});
    return queryInterface.bulkDelete('Farmers', null, {});
  }
};
