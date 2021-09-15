var bunyan = require('bunyan');
var bunyanTcp = require('bunyan-logstash-tcp');
var config = require('./config');

if (config.logger.logstash) {
  config.logger.streams = [
    {
      level: config.logger.level,
      type: 'raw',
      stream: bunyanTcp.createStream({
        host: 'log.hipush.net',
        port: 9998,
        max_connect_retries: -1, // Don't give up on reconnecting
        retry_interval: 1000     // Wait 1s between reconnect attempts
      })
    }
  ];
  
  delete config.logger.logstash;
}

module.exports = bunyan.createLogger(config.logger);
