import { STATUS_CODES } from 'http'

const errorToJson = ({ message = null, name, code = null }) => ({
  error: {
    message: message || name,
    code,
  },
})

export const json = (
  err,
  req,
  res,
  next, // eslint-disable-line no-unused-vars
) => res.send(errorToJson(err))

export const html = (
  err,
  req,
  res,
  next, // eslint-disable-line no-unused-vars
) =>
  res.render('error', {
    error: err,
    statusMessage: STATUS_CODES[res.statusCode],
  })

export const text = (
  err,
  req,
  res,
  next, // eslint-disable-line no-unused-vars
) => res.send(err.message || err.name)
