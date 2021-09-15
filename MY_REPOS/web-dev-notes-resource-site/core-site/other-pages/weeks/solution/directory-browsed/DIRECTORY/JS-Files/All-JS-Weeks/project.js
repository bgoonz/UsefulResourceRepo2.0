const db = require('../db');

const Project = db.define('project', {
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: db.Sequelize.DATE,
    }
});

module.exports = Project;
