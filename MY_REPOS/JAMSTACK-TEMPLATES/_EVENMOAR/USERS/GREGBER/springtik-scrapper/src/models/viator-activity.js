import Sequelize from 'sequelize';

export default db => db.define('viatorActivity', {
  title: {
    type: Sequelize.STRING
  },
  link: {
    type: Sequelize.STRING
  },
  pageIndex: {
    type: Sequelize.INTEGER
  }
}, {
  paranoid: true,
  underscored: true,
  tableName: 'viator_activities'
});
