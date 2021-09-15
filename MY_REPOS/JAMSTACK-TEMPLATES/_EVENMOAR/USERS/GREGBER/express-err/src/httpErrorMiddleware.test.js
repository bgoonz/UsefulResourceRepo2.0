import request from 'supertest'
import express from 'express'
import errorHandler from './errorHandler'
import httpErrorMiddleware from './httpErrorMiddleware'

describe('httpErrorMiddleware', () => {
  let app

  beforeEach(() => {
    app = express()
  })

  it('should work with errorHandler', async () => {
    app.use(httpErrorMiddleware(401))

    app.use(errorHandler({ exitOnUncaughtException: false }))

    const response = await request(app)
      .get('/')
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({
      error: {
        code: null,
        message: 'Unauthorized',
      },
    })
  })
})
