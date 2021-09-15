#!/usr/bin/env node

'use strict'

const meow = require('meow')
const cssScss = require('css-scss')
const read = require('read-file-stdin')
const write = require('write-file-stdout')
const trailingLines = require('single-trailing-newline')

const cli = meow(`
  Usage
    $ css-scss <input.css> <output.scss>

  Example
    $ css-scss --help
    $ css-scss input.css output.scss
    $ css-scss input.css > output.scss
    $ css-scss < input.css > output.scss
`)

const inputFile = cli.input[0]
const outputFile = cli.input[1]

read(inputFile, (err, buffer) => {
  if (err) {
    throw err
  }

  write(outputFile, cssScss(String(buffer)))
  process.exit(0)
})
