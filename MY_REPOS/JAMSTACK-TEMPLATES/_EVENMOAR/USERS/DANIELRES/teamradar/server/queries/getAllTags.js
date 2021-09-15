const neo = require('../neo4j')

const format = ({ child_of, name, _id: id }) => ({
  id: id.toNumber(),
  name,
  tags: child_of ? child_of.map(format) : undefined,
})

module.exports = async () => {
  const { records } = await neo.query(`
    MATCH p = (n:Tag) <-[:CHILD_OF*]- (m)
    WITH COLLECT (p) AS ps
    CALL apoc.convert.toTree(ps) yield value
    RETURN value
  `)

  return records.map(r => format(r.toObject().value))
}
