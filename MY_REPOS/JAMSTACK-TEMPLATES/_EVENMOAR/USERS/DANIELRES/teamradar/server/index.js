require('./helpers/dotenv/loadenv')

const app = new (require('koa'))()
const neo = require('./neo4j')
const router = new (require('koa-trie-router'))()

const teardown = require('./helpers/neo4j/teardown')

const getAllPersons = require('./queries/getAllPersons')
const getAllTags = require('./queries/getAllTags')
const getPersonWithFriendsById = require('./queries/getPersonWithFriendsById')
const insertSeedData = require('./queries/insertSeedData')

app.use(require('koa-morgan')('combined'))
app.use(require('koa-bodyparser')())
app.use(router.middleware())

router.get('/api', async ctx => (ctx.body = { hello: 'world' }))

router.get('/api/persons', async ctx => {
  const persons = await getAllPersons()
  ctx.body = { persons }
})

router.get('/api/persons/:id', async ctx => {
  const person = await getPersonWithFriendsById(ctx.params.id)
  ctx.body = { person }
})

router.get('/api/tags', async ctx => {
  const tags = await getAllTags()
  ctx.body = { tags }
})

router.post('/api/dev/db/reset', async ctx => {
  try {
    await teardown()

    const result = await insertSeedData()
    ctx.body = { result }
  } catch (error) {
    console.log(error)
    const message = error.code.includes('ConstraintValidationFailed')
      ? 'ConstraintValidationFailed'
      : error.messsage
    ctx.status = 500
    ctx.body = { error: message }
  }
})

if (!module.parent) {
  const { SERVER_PORT } = process.env
  console.log(`[server] listening on http://localhost:${SERVER_PORT}`)
  app.listen(SERVER_PORT)
}

const cleanup = () => {
  neo.close()
  process.exit(1)
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

module.exports = app
