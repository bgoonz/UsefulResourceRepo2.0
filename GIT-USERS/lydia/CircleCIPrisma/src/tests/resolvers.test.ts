import TestClient from '../../utils/TestClient'

const client = new TestClient()

describe('Query and mutation work', () => {
  it('should create a draft', async () => {
    const res: any = await client.request(`
      mutation {
        createDraft(title: "Title", content: "Content", authorEmail: "alice@prisma.io") {
          title
        }
      }
    `)
    expect(res).toMatchSnapshot()
  })

  it('should receive the test draft', async () => {
    const res: any = await client.request(`
      {
        drafts {
          title
        }
      }
    `)
    expect(res.drafts[0]).toMatchSnapshot()
  })

  it('should delete the test draft', async () => {
    const res: any = (parent, args, ctx) => ctx.db.deleteManyPosts({ where: {title: "Title"}})
    expect(res).toBeDefined()
  })
})

