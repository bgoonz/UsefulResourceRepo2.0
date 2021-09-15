'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('PetTypes', [
			{ type: 'Bird', createdAt: new Date(), updatedAt: new Date() },
			{ type: 'Cat', createdAt: new Date(), updatedAt: new Date() },
			{ type: 'Dog', createdAt: new Date(), updatedAt: new Date() },
			{ type: 'Elephant', createdAt: new Date(), updatedAt: new Date() }
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('PetTypes', {
			type: [ 'Bird', 'Cat', 'Dog', 'Elephant' ]
		});
	}
};
