'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sauces', [
      {name:'Alfredo', color:'white', createdAt: new Date(), updatedAt: new Date()},
      {name:'Bolognese', color:'red', createdAt: new Date(), updatedAt: new Date()},
      {name:'Cheesy Bechamel', color:'white', createdAt: new Date(), updatedAt: new Date()},
      {name:'Garlic Soy', color:'brown', createdAt: new Date(), updatedAt: new Date()},
      {name:'Brown Butter Sage', color:'brown', createdAt: new Date(), updatedAt: new Date()},
      {name:'Red chili Broth', color:'red', createdAt: new Date(), updatedAt: new Date()}
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sauces', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
