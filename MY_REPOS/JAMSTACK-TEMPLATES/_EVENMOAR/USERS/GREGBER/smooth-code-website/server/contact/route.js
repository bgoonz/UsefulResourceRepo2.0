/**
 * Module dependencies.
 */

var mandrill = require('mandrill-api');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var config = require('../config');

/**
 * Expose route.
 */

module.exports = contact;

// Mandrill client.
var mandrillClient = new mandrill.Mandrill(
  process.env.MANDRILL_APIKEY || config.mandrill.key
);

// Email template.
var emailTemplate = fs.readFileSync(path.join(__dirname, 'email.html'), {encoding: 'utf-8'});

/**
 * Contact.
 */

function contact(req, res) {
  if (! req.body.email || ! req.body.message)
    return res.status(400).send({
      error: { message: 'Email or message not found.' }
    });

  var message = {
    text: _.template(emailTemplate, req.body),
    subject: 'Nouveau message de smooth-code.com',
    from_email: req.body.email,
    to: [
      {
        email: process.env.EMAIL || 'berge.greg+sc@gmail.com',
        name: 'Smooth Code'
      }
    ]
  };

  mandrillClient.messages.send({
    message: message,
    async: false
  }, function (result) {
    console.info('Email sent', result);
    res.send({ error: false });
  }, function (error) {
    res.status(500).send({ error: error });
  });
}
