'use strict'
const handlebarsAsync = require('handlebars-async')
const Handlebars = require('handlebars')
const nodemailer = require('nodemailer')
const Promise = require('bluebird')
const path = require('path')
const _ = require('lodash')
const fs = require('fs')

const readFile = Promise.promisify(fs.readFile)
const readdir = Promise.promisify(fs.readdir)
handlebarsAsync(Handlebars)

// the message objects returned by .message()
class Message {
  constructor (transporter, templates) {
    this.transporter = transporter
    this.templates = templates
    this._sendMail = Promise.promisify(this.transporter.sendMail, {
      context: this.transporter
    })
  }

  async sendMail (data) {
    const [html, text, metaStr] = await Promise.all([
      this._expandTemplate(data, this.templates.html),
      this._expandTemplate(data, this.templates.text),
      this._expandTemplate(data, this.templates.meta)
    ])
    const meta = metaStr ? JSON.parse(metaStr) : {}

    const mail = Object.assign({text, html}, data, _.pickBy(meta))

    return this._sendMail(mail)
  }

  async _expandTemplate (data, template) {
    if (!template) return null
    return template(data)
  }
}

class MustacheMailer {
  constructor (opts) {
    Object.assign(this, {
      nodemailer: {}, // node-mailer initialization options.
      transport: null, // the transport method, e.g., SES.
      templateDir: './templates',
      cache: {}
    }, opts)

    this.transporter = nodemailer.createTransport(this.transport)

    // if we provide a helper for generating tokens, e.g.,
    // email signup tokens, register the async helper.
    if (!this.tokenFacilitator) return

    const _this = this
    Handlebars.registerHelper('tokenHelper', function (data) {
      const done = this.async()
      _this.tokenFacilitator.generate(
        _.omit(data.hash, ['prefix', 'ttl']),
        _.pick(data.hash, ['prefix', 'ttl']),
        done
      )
    })
  }

  async message (name) {
    if (this.cache[name]) {
      return this.cache[name]
    }

    const files = await readdir(this.templateDir).filter(f => f.match(/\.hbs$/))
    const htmlPath = this._resolveTemplateFile(name + '.html.hbs', files)
    const textPath = this._resolveTemplateFile(name + '.text.hbs', files)
    const metaPath = this._resolveTemplateFile(name + '.meta.hbs', files)

    const [textT, htmlT, metaT] = await Promise.map(
      [textPath, htmlPath, metaPath],
      this._loadTemplate)

    const templates = {}
    if (textT) templates.text = textT
    if (htmlT) templates.html = htmlT
    if (metaT) templates.meta = metaT

    if (!templates.text && !templates.html) {
      throw new Error('template not found')
    }

    const message = new Message(this.transporter, templates)
    this.cache[name] = message
    return message
  }

  _resolveTemplateFile (name, files) {
    return files.includes(name) ? path.resolve(this.templateDir, name) : null
  }

  async _loadTemplate (path) {
    if (!path) return null

    const source = await readFile(path, 'utf-8')

    return Promise.promisify(Handlebars.compile(source))
  }
}

module.exports = MustacheMailer
