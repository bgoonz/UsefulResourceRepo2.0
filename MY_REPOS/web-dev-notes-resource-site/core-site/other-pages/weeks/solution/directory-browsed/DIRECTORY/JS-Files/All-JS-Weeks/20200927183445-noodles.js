'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('noodles', [
      {name:'Linguini', isStuffed: false, createdAt: new Date(), updatedAt: new Date()},
      {name:'Fettucini', isStuffed: false, createdAt: new Date(), updatedAt: new Date()},
      {name:'Tortellini', isStuffed: true, createdAt: new Date(), updatedAt: new Date()},
      {name:'Ravioli', isStuffed: true, createdAt: new Date(), updatedAt: new Date()},
      {name:'Udon', isStuffed: false, createdAt: new Date(), updatedAt: new Date()},
      {name:'Ramen', isStuffed: false, createdAt: new Date(), updatedAt: new Date()}
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
