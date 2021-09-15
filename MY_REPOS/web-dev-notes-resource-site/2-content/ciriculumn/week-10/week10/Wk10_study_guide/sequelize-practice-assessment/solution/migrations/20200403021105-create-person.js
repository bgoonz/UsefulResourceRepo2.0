// 'use strict';
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('People', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       firstName: {
//         allowNull: false,
//         type: Sequelize.STRING(50)
//       },
//       lastName: {
//         allowNull: false,
//         type: Sequelize.STRING(50)
//       },
//       email: {
//         allowNull: false,
//         type: Sequelize.STRING(255),
//         unique: true
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('People');
//   }
// };

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('People', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			firstName: {
				type: Sequelize.STRING(50),
				allowNull: false
			},
			lastName: {
				type: Sequelize.STRING(50),
				allowNull: false
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true
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
		return queryInterface.dropTable('People');
	}
};
