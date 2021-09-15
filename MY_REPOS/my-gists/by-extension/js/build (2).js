#!/usr/bin/env node
const fs = require('fs')
const input = process.argv[2]
const stat = fs.statSync(input)
const src = fs.readFileSync(input, 'utf8')
const result = src.replace(/\{\{LAST_MODIFIED}}/g, stat.mtime.toString()).trim()
console.log(result)
