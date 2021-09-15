const createPerson = require('./createPerson')
const createRel = require('./createRelationship')
const createTag = require('./createTag')

module.exports = async () => {
  const tags = await Promise.all([
    createTag({ name: 'Skydiving' }),
    createTag({ name: 'Sport' }),
    createTag({ name: 'SEO' }),
    createTag({ name: 'Marketing' }),
    createTag({ name: 'Communication' }),
    createTag({ name: 'ReactJs' }),
    createTag({ name: 'Development' }),
  ])

  const [skydiving, sport, seo, marketing, comm, react, development] = tags

  const persons = await Promise.all([
    createPerson({ name: 'Alice', slug: 'alice' }),
    createPerson({ name: 'Jack', slug: 'jack' }),
    createPerson({ name: 'John', slug: 'john' }),
    createPerson({ name: 'Tom', slug: 'tom' }),
  ])

  const [alice, jack, john] = persons

  const friendships = await Promise.all([
    createRel({ fromId: jack.id, toId: john.id, type: 'HAS_FRIEND' }),
    createRel({ fromId: alice.id, toId: john.id, type: 'HAS_FRIEND' }),
  ])

  const tagRels = await Promise.all([
    createRel({ fromId: skydiving.id, toId: sport.id, type: 'CHILD_OF' }),
    createRel({ fromId: seo.id, toId: marketing.id, type: 'CHILD_OF' }),
    createRel({ fromId: marketing.id, toId: comm.id, type: 'CHILD_OF' }),
    createRel({ fromId: react.id, toId: development.id, type: 'CHILD_OF' }),
  ])

  return { persons, friendships, tagRels }
}
