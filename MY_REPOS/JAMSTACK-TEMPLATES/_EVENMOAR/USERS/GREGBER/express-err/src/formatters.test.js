import path from 'path'
import request from 'supertest'
import express from 'express'
import ejs from 'ejs'
import { json, html, text } from './formatters'

describe('json', () => {
  let app

  beforeEach(() => {
    app = express()
  })

  it('should format error with message', async () => {
    app.use((req, res, next) => {
      next(new Error('My error'))
    })

    app.use(json)

    const response = await request(app).get('/')
    expect(response.body.error).toEqual({
      message: 'My error',
      code: null,
    })
  })

  it('should fallback message to error name', async () => {
    app.use((req, res, next) => {
      next(new Error())
    })

    app.use(json)

    const response = await request(app).get('/')
    expect(response.body.error).toEqual({
      message: 'Error',
      code: null,
    })
  })

  it('should also put code', async () => {
    app.use((req, res, next) => {
      const error = new Error()
      error.code = 440
      next(error)
    })

    app.use(json)

    const response = await request(app).get('/')
    expect(response.body.error).toEqual({
      message: 'Error',
      code: 440,
    })
  })
})

describe('html', () => {
  let app

  beforeEach(() => {
    app = express()
    app.engine('html', ejs.renderFile)
    app.set('views', path.resolve(__dirname, './__fixtures__/views'))
    app.set('view engine', 'html')
  })

  it('should format error using renderer', async () => {
    app.use((req, res, next) => {
      res.status(500)
      next(new Error('My error'))
    })

    app.use(html)

    const response = await request(app).get('/')
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

describe('text', () => {
  let app

  beforeEach(() => {
    app = express()
  })

  it('should display error message', async () => {
    app.use((req, res, next) => {
      next(new Error('My error'))
    })

    app.use(text)

    const response = await request(app).get('/')
    expect(response.text).toBe('My error')
  })

  it('should fallback to error name', async () => {
    app.use((req, res, next) => {
      next(new Error())
    })

    app.use(text)

    const response = await request(app).get('/')
    expect(response.text).toBe('Error')
  })
})
