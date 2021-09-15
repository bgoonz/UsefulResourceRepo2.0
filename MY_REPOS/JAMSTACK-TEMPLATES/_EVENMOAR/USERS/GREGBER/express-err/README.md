# express-err

[![Build Status](https://travis-ci.org/neoziro/express-err.svg?branch=master)](https://travis-ci.org/neoziro/express-err)
[![Dependency Status](https://david-dm.org/neoziro/express-err.svg?theme=shields.io)](https://david-dm.org/neoziro/express-err)
[![devDependency Status](https://david-dm.org/neoziro/express-err/dev-status.svg?theme=shields.io)](https://david-dm.org/neoziro/express-err#info=devDependencies)

Basic error handler for express.
This middleware shows errors according to the "Accept" header. It will shutdown app in case of uncaught error.

## Install

```
yarn add express-err
```

## Usage

```js
import express from 'express'
import errorHandler, { httpError } from 'express-err'

const app = express()

// Basic route.
app.get('/', (req, res) => {
  res.send('Hello world!')
})

// Redirect other routes to 404.
app.use(httpError(404))

// Handle errors.
app.use(errorHandler())
```

## errorHandler(options)

The error handler middleware is used to display errors and shutdown app in case of uncaught error.

The avalaible options are:

### exitOnUncaughtException

Tell to the process to exit on uncaught exceptions. Defaults to `true`.

```js
app.use(errorHandler({ exitOnUncaughtException: false }))
```

### exitCode

The code used to exit app in case of uncaught exception. Defaults to `1`.

```js
app.use(errorHandler({ exitCode: 2 }))
```

### defaultStatusCode

The default HTTP error code. Defaults to `500`.

```js
app.use(errorHandler({ status: 503 }))
```

### formatters

The error handler come with some preconfigured formatters, one for "json", "text" and "html".
It's possible to provide your own formatters:

```js
import { text } from 'express-err/lib/formatters'

app.use(
  errorHandler({
    formatters: {
      json(err, req, res, next) {
        res.send({ error: true })
      },
      default: text,
    },
  }),
)
```

## httpError(status, [message])

You can use httpError to return a custom error with a status and a message, if you don't provide a message, it will automatically use the HTTP status.

```js
import { httpError } from 'express-err'

app.use(httpError(404))
```

## new HttpError(status, [message])

You can create a custom HttpError with a status and a message, if you don't provide a message, it will automatically use the HTTP status.

```js
import { HttpError } from 'express-err'

app.use((req, res, next) => {
  next(new HttpError(404, 'Bad way'))
})
```

## License

MIT
