var sqs = require('ya-sqs');
var config = require('../config');
var logger = require('../logger').child({type: 'send-queue'});

var queue = module.exports = sqs.createQueue({
  aws: config.aws,
  name: config.sendQueue.name,
  waitTime: config.sendQueue.waitTime
});

queue.on('message pushed', function (message) {
  logger.info('message pushed', message);
});

queue.on('message received', function (message) {
  logger.info('message received', message);
});

queue.on('message processed', function (message) {
  logger.info('message processed', message);
});
