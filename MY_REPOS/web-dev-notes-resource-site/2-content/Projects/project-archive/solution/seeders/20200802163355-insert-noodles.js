'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Noodles', [
      { name: "Linguini", isStuffed: false },
      { name: "Fettucini", isStuffed: false },
      { name: "Tortellini", isStuffed: true },
      { name: "Ravioli", isStuffed: true },
      { name: "Udon", isStuffed: false },
      { name: "Ramen", isStuffed: false },
    ], {
      fields: ['name', 'isStuffed']
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Noodles', null, {});
  }
};
