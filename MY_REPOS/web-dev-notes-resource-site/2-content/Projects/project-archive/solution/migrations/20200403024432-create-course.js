// 'use strict';
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('Courses', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       name: {
//         allowNull: false,
//         type: Sequelize.STRING(50)
//       },
//       level: {
//         allowNull: false,
//         type: Sequelize.INTEGER
//       },
//       campusId: {
//         allowNull: false,
//         type: Sequelize.INTEGER,
//         references: { model: 'Campuses' }
//       },
//       departmentId: {
//         allowNull: false,
//         type: Sequelize.INTEGER,
//         references: { model: 'Departments' }
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
//     return queryInterface.dropTable('Courses');
//   }
// };

'use strict';
module.exports = {
  up: ( queryInterface, Sequelize ) => {
    return queryInterface.createTable( 'Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING( 50 ),
        allowNull: false
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      campusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Campuses'
        }
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Departments'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    } );
  },
  down: ( queryInterface, Sequelize ) => {
    return queryInterface.dropTable( 'Courses' );
  }
};
