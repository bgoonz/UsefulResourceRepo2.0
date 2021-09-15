import HttpError from './HttpError'

const httpErrorMiddleware = (statusCode, message) => (req, res, next) =>
  next(new HttpError(statusCode, message))

export default httpErrorMiddleware
