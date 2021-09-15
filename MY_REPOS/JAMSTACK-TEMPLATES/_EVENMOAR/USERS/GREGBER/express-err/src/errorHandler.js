import { json, html, text } from './formatters'

const errorHandler = ({
  defaultStatusCode = 500,
  formatters = { json, html, text, default: text },
  exitOnUncaughtException = true,
  exitCode = 1,
} = {}) => (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const candidates = [err.statusCode, defaultStatusCode]
  const statusCode = candidates.find(Number.isInteger)

  if (exitOnUncaughtException && statusCode >= 500) {
    res.once('finish', process.exit.bind(process, exitCode))
  }

  const bindedFormatters = Object.entries(formatters).reduce(
    (acc, [name, format]) => ({
      ...acc,
      [name]: () => format(err, req, res, next),
    }),
    {},
  )

  res.status(statusCode).format(bindedFormatters)
}

export default errorHandler
