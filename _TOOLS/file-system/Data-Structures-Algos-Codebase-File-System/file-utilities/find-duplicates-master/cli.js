#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2), {
  default: {
    glob: ['node_modules/**/*.js'],
    concurrency: 1000,
  },
})

const { version } = require('./package')
const { findAndRemap } = require('./')
const { glob, concurrency } = argv
const globs = [].concat(glob)

const prettify = (obj) => JSON.stringify(obj, null, 2)
const prettyLog = (obj) => console.log(prettify(obj))

const run = async () => {
  const result = await findAndRemap({ globs, concurrency })
  prettyLog({ version, result })
}

run().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
