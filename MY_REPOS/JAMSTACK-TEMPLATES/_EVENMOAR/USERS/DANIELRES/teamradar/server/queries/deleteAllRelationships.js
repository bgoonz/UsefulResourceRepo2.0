const neo = require('../neo4j')

module.exports = () => neo.query(`MATCH () -[r]- () DELETE r`)
