require('./application');

var PROCESS_DIR = global.base + '/app/processes',
cron = require('cron').CronJob;

exports.poll = new cron('0 10 * * *', require(PROCESS_DIR + '/poll-email'));
exports.result = new cron('0 12 * * *', require(PROCESS_DIR + '/result-email'));