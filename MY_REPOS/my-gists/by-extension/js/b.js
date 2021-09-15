var a = require('a')
console.log('a is', a)

if (module.hot) {
  module.hot.accept('./a', () => {
    // Evaluate again
    a = require('a')
    console.log('now a is', a)
  })
}