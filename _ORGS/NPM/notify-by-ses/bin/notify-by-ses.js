#!/usr/bin/env node

var aws = require('aws-lib'),
  argv = require('yargs')
  .usage('Send a Nagios notification using SES.\n')
  .options('k', {
    alias: 'accessKeyId',
    describe: 'SES Access Key ID',
    demand: true
  })
  .options('s', {
    alias: 'secretAccessKey',
    describe: 'SES Secret Access Key',
    demand: true
  })
  .options('n', {
    alias: 'notificationType',
    describe: 'Notification Type',
  })
  .options('h', {
    alias: 'hostName',
    describe: 'Hostname',
  })
  .options('t', {
    alias: 'hostState',
    describe: 'Host State'
  })
  .options('d', {
    alias: 'serviceDisplayName',
    describe: 'Service Display Name'
  })
  .options('a', {
    alias: 'hostAddress',
    describe: 'Host Address'
  })
  .options('o', {
    alias: 'longHostOutput',
    describe: 'Long Host Output'
  })
  .options('p', {
    alias: 'contactPager',
    describe: 'Contact Pager Email'
  })
  .options('r', {
    alias: 'region',
    describe: 'AWS Region',
    default: 'email.us-east-1.amazonaws.com'
  })
  .options('l', {
    alias: 'logFile',
    default: '/var/log/notify-by-ses.log'
  })
  .options('y', {
    alias: 'type',
    default: 'Service',
    describe: 'Type of notification, serveric or host.'
  })
  .argv;

var ses = aws.createSESClient(
    argv.accessKeyId,
    argv.secretAccessKey,
    {host: argv.region}
  ),
  sendArgs = {
  	'Destination.ToAddresses.member': [argv.contactPager],
  	'Message.Body.Text.Charset': 'UTF-8',
  	'Message.Body.Text.Data': '***** Nagios *****\n' +
      'Notification Type: ' + argv.notificationType + '\n' +
      'Host: ' + argv.hostName + '\n' +
      'Address: ' + argv.hostAddress + '\n' +
      'State: ' + argv.hostState + '\n' +
      'Date/Time: ' + (new Date).toString() + '\n' +
      'Additional Info:\n' + argv.longHostOutput,
  	'Message.Body.Html.Charset': 'UTF-8',
  	'Message.Body.Html.Data': '***** Nagios *****<br /><p>' +
      'Notification Type: ' + argv.notificationType + '</p><p>' +
      'Host: ' + argv.hostName + '</p><p>' +
      'Address: ' + argv.hostAddress + '</p><p>' +
      'State: ' + argv.hostState + '</p><p>' +
      'Date/Time: ' + (new Date).toString() + '</p><p>' +
      'Additional Info:</p><p>' + argv.longHostOutput + '</p>',
  	'Message.Subject.Charset': 'UTF-8',
  	'Message.Subject.Data': '** ' + argv.notificationType + ' ' + argv.type + ' Alert: ' +
      argv.hostName + '/' + argv.hostState + '**',
  	'Source': argv.contactPager
  },
  winston = require('winston');

winston.add(winston.transports.File, { filename: argv.logFile });

ses.call('SendEmail', sendArgs, function(err, result) {
  winston.log('info', result);
});
