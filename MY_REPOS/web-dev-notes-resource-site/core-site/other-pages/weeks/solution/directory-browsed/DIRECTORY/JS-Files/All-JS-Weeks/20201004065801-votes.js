'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Votes",
      [
        {
          vote: true,
          answerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          vote: true,
          answerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
        {
          vote: false,
          answerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Votes', null, {});
    
  }
};
