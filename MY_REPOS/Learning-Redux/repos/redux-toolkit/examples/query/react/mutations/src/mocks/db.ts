import { factory, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import { rest } from 'msw'
import { Post } from '../app/services/posts'

const db = factory({
  post: {
    id: primaryKey(String),
    name: String,
  },
})

db.post.create({ id: nanoid(), name: 'A sample post' })
db.post.create({ id: nanoid(), name: 'A post about rtk query' })

export const handlers = [
  rest.post('/posts', async (req, res, ctx) => {
    const { name } = req.body as Partial<Post>

    if (Math.random() < 0.5) {
      return res(
        ctx.json({ error: 'Oh no, there was an error' }),
        ctx.status(500),
        ctx.delay(400)
      )
    }

    const post = db.post.create({
      id: nanoid(),
      name,
    })

    return res(ctx.json(post), ctx.delay(400))
  }),
  rest.put('/posts/:id', (req, res, ctx) => {
    const { name } = req.body as Partial<Post>

    if (Math.random() < 0.5) {
      return res(
        ctx.json({ error: 'Oh no, there was an error' }),
        ctx.status(500),
        ctx.delay(400)
      )
    }

    const post = db.post.update({
      where: { id: { equals: req.params.id } },
      data: { name },
    })

    return res(ctx.json(post), ctx.delay(400))
  }),
  ...db.post.toHandlers('rest'),
] as const
