'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sauces', [
      {name:'Alfredo', color:'white' },
      {name:'Bolognese', color:'red', },
      {name:'Cheesy Bechamel', color:'white', },
      {name:'Garlic Soy', color:'brown', },
      {name:'Brown Butter Sage', color:'brown', },
      {name:'Red chili Broth', color:'red', }
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
