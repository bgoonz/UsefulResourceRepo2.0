const choo = require('choo')

const mainView = require('./views/main')
const currencyView = require('./views/currency')

const app = choo()

app.model({
  namespace: 'currencies',
  state: {
    data: {}
  }
})

app.router(route => [
  route('/', mainView),
  route('/currency/:symbol', currencyView)
])

if (module.parent) {
  module.exports = app
} else {
  app.start('#app-root')
}
