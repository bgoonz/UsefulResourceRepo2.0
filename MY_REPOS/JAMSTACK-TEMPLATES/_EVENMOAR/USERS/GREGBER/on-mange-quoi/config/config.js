module.exports = exports = require('lodash').extend({

  server: {
    domain: 'on-mange-quoi.co',
    port: 80
  },

  mandrill: {
    key: 'GZoGtCqu9ER5ogoPCVsQFw'
  },

  foursquare: {
    clientId: 'W2KH5DEAVKXM1BIDOHUDUOPX4M4X22Y33XGSR3HNGL23BR0J',
    clientSecret: '34HP4QTQJ5PT2EVOVQ0MSX5NBA52ISQVJ3GJGXMZSOALHKUA'
  }

}, require('./environments/' + require('./application').settings.env));