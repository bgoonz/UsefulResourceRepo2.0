#!/usr/bin/env node

const MustacheMailer = require('../')
const argv = require('yargs')
  .usage('$0 [options]')
  .option('o', {
    alias: 'transport-options',
    description: "options for transport, separated by '.'s, e.g., o.accessKeyId"
  })
  .option('t', {
    demand: true,
    alias: 'transport',
    description: 'module to use for mail transport'
  })
  .option('d', {
    alias: 'template-data',
    description: 'data for mail template, e.g., o.to; o.from'
  })
  .option('n', {
    demand: true,
    alias: 'template',
    description: 'name of template to use for email'
  })
  .option('r', {
    alias: 'template-dir',
    description: 'template to load templates from',
    default: './templates'
  })
  .option('h', {
    alias: 'help'
  })
  .help('h')
  .example('$0 -o.accessKeyId=key -o.secretAccessKey=secret -d.to=bencoe@example.com -t ses --template=test')
  .check(function (argv) {
    if (typeof argv.o !== 'object') throw new Error('transport options must be an object')
    if (typeof argv.d !== 'object') throw new Error('template data must be an object')
    return true
  })
  .argv

const mm = new MustacheMailer({
  transport: require(`nodemailer-${argv.transport}-transport`)(argv.transportOptions),
  templateDir: argv.templateDir
})

mm.message(argv.template)
  .then(msg => {
    return msg.sendMail(argv.templateData)
  })
  .then(data => {
    console.log('message sent', data)
  })
  .catch(err => {
    console.log(err.message)
  })
