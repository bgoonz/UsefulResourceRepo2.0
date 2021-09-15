import path from 'path'
import request from 'supertest'
import express from 'express'
import ejs from 'ejs'
import errorHandler from './errorHandler'

describe('errorHandler', () => {
  let app

  beforeEach(() => {
    app = express()
    app.engine('html', ejs.renderFile)
    app.set('views', path.resolve(__dirname, './__fixtures__/views'))
    app.set('view engine', 'html')
  })

  it('should handle default statusCode', async () => {
    app.use((req, res, next) => {
      next(new Error('My error'))
    })

    app.use(
      errorHandler({
        exitOnUncaughtException: false,
        defaultStatusCode: 501,
      }),
    )

    const response = await request(app)
      .get('/')
      .set('Accept', 'blabla')
    expect(response.statusCode).toBe(501)
    expect(response.text).toBe('My error')
  })

  it('should use text as default', async () => {
    app.use((req, res, next) => {
      next(new Error('My error'))
    })

    app.use(errorHandler({ exitOnUncaughtException: false }))

    const response = await request(app)
      .get('/')
      .set('Accept', 'blabla')
    expect(response.statusCode).toBe(500)
    expect(response.text).toBe('My error')
  })

  it('should work with json', async () => {
    app.use((req, res, next) => {
      next(new Error('My error'))
    })

    app.use(errorHandler({ exitOnUncaughtException: false }))

    const response = await request(app)
      .get('/')
      .set('Accept', 'application/json')
    expect(response.body.error).toEqual({
      message: 'My error',
      code: null,
    })
  })

  it('should work with text', async () => {
    app.use((req, res, next) => {
      next(new Error('My error'))
    })

    app.use(errorHandler({ exitOnUncaughtException: false }))

    const response = await request(app)
      .get('/')
      .set('Accept', 'text/plain')
    expect(response.text).toBe('My error')
  })

  it('should work with html', async () => {
    app.use((req, res, next) => {
      next(new Error('My error'))
    })

    app.use(errorHandler({ exitOnUncaughtException: false }))

    const response = await request(app)
      .get('/')
      .set('Accept', 'text/html')
    expect(response.text).toBe(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Error page</title>
  </head>
  <body>
    statusMessage: Internal Server Error
    errorMessage: My error
  </body>
</html>
`)
  })
})
