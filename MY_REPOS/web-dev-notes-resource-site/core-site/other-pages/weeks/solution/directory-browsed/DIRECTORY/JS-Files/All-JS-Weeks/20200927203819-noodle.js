'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('noodles', [
      {name:'Linguini', isPretty: "But really?" },
      {name:'Fettucini', isCool: false },
      {name:'Tortellini', isStuffed: true, },
      {name:'Ravioli', isStuffed: false, },
      {name:'Udon', },
      {name:'Ramen', }
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('noodles', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
