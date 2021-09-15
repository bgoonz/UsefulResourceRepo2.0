# Mustache-Mailer

[![Build Status](https://travis-ci.org/npm/mustache-mailer.png)](https://travis-ci.org/npm/mustache-mailer)
[![Coverage Status](https://coveralls.io/repos/npm/mustache-mailer/badge.svg?branch=)](https://coveralls.io/r/npm/mustache-mailer?branch=)

A mustache-template-backed mailer. Built with [handlebars](https://www.npmjs.com/package/handlebars#readme),
and [nodemailer](https://www.npmjs.com/package/nodemailer), inspired by ActionMailer.

# Usage

1. create a templates directory with the following naming convention:
  * `foo.text.hbs`, for text email templates.
  * `foo.meta.hbs`, meta information in JSON format, e.g., `subject`.
  * `foo.html.hbs`, for html email templates.

2. instantiate `MustacheMailer` with:
  * `transport`: the transport module you wish to use, e.g., SES.
  * `templateDir`: the path to the template directory.

```js
var mm = new MustacheMailer({
  transport: require('nodemailer-ses-transport')({
      accessKeyId: 'AWSACCESSKEY',
      secretAccessKey: 'AWS/Secret/key'
  }),
  templateDir: './mail-templates'
});
```

3. use the `MessageMailer` instance to grab a template:
  * if it sees an `html` template and a `text` template, both will be sent.
  * any variable passed to `sendMail` are sent to `nodemailer`, and
    to the mustache templates.

```js
var msg = mm.message('confirmation', function(err, msg) {
  msg.sendMail({
    to: 'bencoe@gmail.com',
    name: 'Ben',
    id: 'adfasdfadsfasdf'
  });
}
```

# `tokenFacilitator` Plugin

It often arises that you'd like to toss a token inside an email, e.g.,
click this confirmation link to change your password.

For generating these tokens, MustacheMailer allows you to install a
`tokenFacilitator` plugin:

## When instantiating MustacheMailer:

```js
var mm = new MustacheMailer({
  transport: mock,
  templateDir: path.resolve(__dirname, './fixtures'),
  // a fake token facilitator.
  tokenFacilitator: {
    generate: function(data, cb) {
      setTimeout(function() {
        data.email.should.eql('zeke@example.com');
        data.name.should.eql('Zeke');
        return cb(null, parseInt(Math.random() * 256));
      }, 20);
    }
  }
});
```

# In the template

```mustache
http://example.com/{{{tokenHelper name=name email=email}}}
```

* the arguments will be stored as `key`, `value` pairs in data.
