'use strict'
var isBlank = require('is-blank')
var parseAuthor = require('parse-author')
var normalizeUrl = require('normalize-url')

module.exports = function authorsToMarkdown (pkg) {
  if (isBlank(pkg) || typeof pkg !== 'object') {
    throw new TypeError('authors-to-markdown expected a required package.json')
  }

  var authors = []
  if (pkg.author) {
    authors.push(pkg.author)
  }

  if (pkg.contributors || typeof pkg.contributors === 'array') {
    authors = authors.concat(pkg.contributors)
  } 

  authors = authors.map(function (author) {
    if (typeof author === 'string') {
      return parseAuthor(author)
    } else {
      return author
    }
  })

  var md = ''
  authors.forEach(function (author) {
    if (isBlank(author.name)) { return }

    if (isBlank(author.url) && isBlank(author.email)) {
      md += '- ' + author.name + '\n'
    } else {
      md += '- [' + author.name + '](' + getAuthorUrl(author) + ')\n'
    }
  })

  return md
}

function getAuthorUrl(author) {
  if (author.url) {
    return normalizeUrl(author.url)
  } else {
    return 'mailto:' + author.email
  }
}
