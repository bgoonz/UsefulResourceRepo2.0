const deleteAllRelationships = require('../../queries/deleteAllRelationships')
const deleteAllNodes = require('../../queries/deleteAllNodes')

module.exports = async () => {
  await deleteAllRelationships()
  await deleteAllNodes()
}
