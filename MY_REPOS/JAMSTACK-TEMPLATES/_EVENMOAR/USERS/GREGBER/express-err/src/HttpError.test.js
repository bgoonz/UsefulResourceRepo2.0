import HttpError from './HttpError'

describe('HttpError', () => {
  it('should create an error with message and statusCode', () => {
    const error = new HttpError(401, 'So bad!')
    expect(error.name).toBe('HttpError')
    expect(error.message).toBe('So bad!')
    expect(error.statusCode).toBe(401)
  })

  it('should fallback message to HTTP status', () => {
    const error = new HttpError(404)
    expect(error.name).toBe('HttpError')
    expect(error.message).toBe('Not Found')
    expect(error.statusCode).toBe(404)
  })
})
