require('../helpers/dotenv/loadenv')
const { close } = require('../neo4j')
const teardown = require('../helpers/neo4j/teardown')

afterAll(close)
afterEach(teardown)

const createTag = require('./createTag')

describe('createTag', () => {
  it('creates a new Tag with name an uuid', async done => {
    const result = await createTag({ name: 'Snorkelling' })

    expect(result.name).toEqual('Snorkelling')
    expect(result.id.length).toEqual(36)
    done()
  })

  it('prevents duplicates', async done => {
    await createTag({ name: 'Snorkelling' })

    await expect(createTag({ name: 'Snorkelling' })).rejects.toHaveProperty(
      'code',
      'Neo.ClientError.Schema.ConstraintValidationFailed'
    )

    done()
  })
})
