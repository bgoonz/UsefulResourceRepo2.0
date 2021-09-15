'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Questions",
      [
        {
          questionSubject: faker.company.catchPhrase(),
          questionText: faker.company.catchPhrase(),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          questionSubject: faker.company.catchPhrase(),
          questionText: faker.company.catchPhrase(),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          questionSubject: faker.company.catchPhrase(),
          questionText: faker.company.catchPhrase(),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Questions", null, {});
  }
};
