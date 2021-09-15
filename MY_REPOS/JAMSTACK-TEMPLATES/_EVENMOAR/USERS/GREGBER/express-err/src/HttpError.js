import { STATUS_CODES } from 'http'
import ExtendableError from 'es6-error'

class HttpError extends ExtendableError {
  constructor(statusCode, message = STATUS_CODES[statusCode]) {
    super(message)
    this.statusCode = statusCode
  }
}

export default HttpError
