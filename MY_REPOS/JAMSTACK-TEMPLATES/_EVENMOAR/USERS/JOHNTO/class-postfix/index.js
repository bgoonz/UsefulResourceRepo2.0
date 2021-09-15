'use strict'

var isPresent = require('is-present')
var hasClass = require('has-class-selector')
var SelectorTokenizer = require('css-selector-tokenizer')

module.exports = (selector, postfix) => {
  if (typeof selector !== 'string') {
    throw new TypeError('class-repeat expects a string')
  }

  if (hasClass(selector)) {
    const tokens = SelectorTokenizer.parse(selector).nodes[0] || { nodes: [] }
    const tokensWithPostfixedClasses = []
    tokens.nodes.map((node, index) => {
      if (node.type === 'class') {
        node.name = `${node.name}${postfix}`
        tokensWithPostfixedClasses.push(node)
      } else {
        tokensWithPostfixedClasses.push(node)
      }
    })

    return SelectorTokenizer.stringify({
      type: 'selectors',
      nodes: [{
        type: 'selector',
        nodes: tokensWithPostfixedClasses
      }]
    })
  } else {
    return selector
  }
}

function isPseudo(token) {
  return token && (token.type === 'pseudo-element' || token.type === 'pseudo-class')
}
