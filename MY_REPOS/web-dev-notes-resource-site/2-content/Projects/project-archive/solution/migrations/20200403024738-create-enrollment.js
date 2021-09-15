// 'use strict';
// module.exports = {
// 	up: async (queryInterface, Sequelize) => {
// 		return await queryInterface.createTable('Enrollments', {
// 			id: {
// 				allowNull: false,
// 				autoIncrement: true,
// 				primaryKey: true,
// 				type: Sequelize.INTEGER
// 			},
// 			personId: {
// 				allowNull: false,
// 				type: Sequelize.INTEGER,
// 				references: { model: { tableName: 'People' } }
// 			},
// 			courseId: {
// 				allowNull: false,
// 				type: Sequelize.INTEGER,
// 				references: { model: { tableName: 'Courses' } }
// 			},
// 			createdAt: {
// 				allowNull: false,
// 				type: Sequelize.DATE
// 			},
// 			updatedAt: {
// 				allowNull: false,
// 				type: Sequelize.DATE
// 			}
// 		});
// 	},
// 	down: async (queryInterface, Sequelize) => {
// 		return await squeryInterface.dropTable('Enrollments');
// 	}
// };

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Enrollments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			personId: {
				type: Sequelize.INTEGER,
				references: { model: { tableName: 'People' } },
				allowNull: false
			},
			courseId: {
				type: Sequelize.INTEGER,
				references: { model: { tableName: 'Courses' } },
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Enrollments');
	}
};
