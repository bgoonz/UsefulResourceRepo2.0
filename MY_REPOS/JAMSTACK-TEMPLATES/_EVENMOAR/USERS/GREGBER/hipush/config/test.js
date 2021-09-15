var path = require('path');

module.exports = {
  isTestConfig: true,
  spn: {
    authTokenSalt: 'testSecret',
    imageDirectory: path.join(__dirname, '../test/mocks/images'),
    cert: path.join(__dirname, 'spn/test/cert.pem'),
    key: path.join(__dirname, 'spn/test/key.pem')
  },
  logger: {
    level: 'error'
  },
  sendQueue: {
    name: 'hipush-send-queue-test'
  },
  apnQueue: {
    name: 'hipush-apn-queue-test'
  }
};
