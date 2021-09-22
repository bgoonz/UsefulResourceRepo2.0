/* eslint-env mocha */
require('chai').should()
const expect = require('chai').expect
const path = require('path')
const MustacheMailer = require('../')
const MockTransport = require('nodemailer-mock-transport')

describe('MustacheMailer', function () {
  describe('message', function () {
    var mm = null

    beforeEach(async () => {
      mm = new MustacheMailer({
        transport: {},
        templateDir: path.resolve(__dirname, './fixtures')
      })
    })

    it("returns message with 'text' contents populated, if text template is found", async () => {
      const msg = await mm.message('bar')
      const data = await msg.templates.text()
      data.should.match(/glad to meet you.\n/)
    })

    it("does not populate 'html' contents, if no template is found", async () => {
      const msg = await mm.message('bar')
      expect(msg.templates.html).to.equal(undefined)
    })

    it("populates both 'html' and 'text' templates if both templates are found", async () => {
      const msg = await mm.message('foo')
      let data = await msg.templates.text()
      data.should.match(/great to meet you.\n/)

      data = await msg.templates.html()
      data.should.match(/great to meet you.<br\/>/)
    })
  })

  describe('meta', function () {
    it('expands meta information template, and parses it as JSON', async () => {
      var mock = MockTransport()

      var mm = new MustacheMailer({
        transport: mock,
        templateDir: path.resolve(__dirname, './fixtures')
      })

      const msg = await mm.message('bar')

      await msg.sendMail({
        to: 'dalek@example.com',
        name: 'dalek',
        from: 'doctor@gallifrey.co'
      })

      mock.sentMail.length.should.equal(1)
      mock.sentMail[0].data.subject.should.eql('no extermination please')
      mock.sentMail[0].data.awesomeName.should.eql('Chief dalek')
      mock.sentMail[0].data.to.should.eql('dalek@example.com')
      mock.sentMail[0].data.from.should.eql('"Who, Indeed" <doctor@gallifrey.co>')
    })
  })

  describe('cache', function () {
    var mm = null

    beforeEach(async () => {
      mm = new MustacheMailer({
        transport: {},
        templateDir: path.resolve(__dirname, './fixtures')
      })
    })

    it('should place templates in the cache the first time they are used', async () => {
      await mm.message('foo')
      ;(typeof mm.cache.foo).should.equal('object')
    })

    it('should serve template from cache if entry already exists', async () => {
      mm.cache.blarg = 'cached message'
      const msg = await mm.message('blarg')
      msg.should.equal('cached message')
    })
  })

  describe('message.sendMail()', function () {
    it('expands templates with data, and includes them in sent message', async () => {
      var mock = MockTransport()

      var mm = new MustacheMailer({
        transport: mock,
        templateDir: path.resolve(__dirname, './fixtures')
      })

      const msg = await mm.message('foo')
      await msg.sendMail({
        to: 'dalek@example.com',
        fname: 'dalek'
      })
      mock.sentMail.length.should.equal(1)
      mock.sentMail[0].data.to.should.eql('dalek@example.com')
      mock.sentMail[0].data.html.should.match(/Hello dalek great to meet you.<br\/>/)
      mock.sentMail[0].data.text.should.match(/Hello dalek great to meet you.\n/)
    })

    it('handles sending message from cache', async () => {
      var mock = MockTransport()

      var mm = new MustacheMailer({
        transport: mock,
        templateDir: path.resolve(__dirname, './fixtures')
      })

      let msg = await mm.message('foo')
      ;(typeof mm.cache.foo).should.equal('object')
      msg = await mm.message('foo')
      await msg.sendMail({
        to: 'dalek@example.com',
        fname: 'dalek'
      })
      mock.sentMail.length.should.equal(1)
      mock.sentMail[0].data.to.should.eql('dalek@example.com')
      mock.sentMail[0].data.html.should.match(/Hello dalek great to meet you.<br\/>/)
      mock.sentMail[0].data.text.should.match(/Hello dalek great to meet you.\n/)
    })

    it('handles malformed templates', async () => {
      var mock = MockTransport()

      var mm = new MustacheMailer({
        transport: mock,
        templateDir: path.resolve(__dirname, './fixtures')
      })

      const msg = await mm.message('invalid')
      let err
      try {
        await msg.sendMail({
          fname: 'dalek'
        })
      } catch (e) {
        err = e
      }
      err.message.should.match(/Parse error/)
    })

    it('throws an error if a template has neither text nor html', async () => {
      var mock = MockTransport()
      var mm = new MustacheMailer({
        transport: mock,
        templateDir: path.resolve(__dirname, './fixtures')
      })

      let err
      try {
        await mm.message('notfound')
      } catch (e) {
        err = e
      }
      err.message.should.match(/template not found/)
    })
  })

  describe('tokenHelper', function () {
    it('if tokenFacilitator is not provided, templates still work', async () => {
      var mock = MockTransport()
      var mm = new MustacheMailer({
        transport: mock,
        templateDir: path.resolve(__dirname, './fixtures')
      })

      const msg = await mm.message('bar')
      await msg.sendMail({
        to: 'dalek@example.com',
        name: 'dalek',
        email: 'dalek@example.com'
      })
      mock.sentMail[0].data.text.should.match(/http:\/\/example.com\/\n/)
    })

    it('if tokenFacilitator is provided, templates have access to helper', async () => {
      var mock = MockTransport()
      var mm = new MustacheMailer({
        transport: mock,
        templateDir: path.resolve(__dirname, './fixtures'),
        // a fake token facilitator.
        tokenFacilitator: {
          generate: function (data, opts, cb) {
            setTimeout(function () {
              data.email.should.eql('dalek@example.com')
              data.name.should.eql('dalek')
              opts.ttl.should.eql(680400000)
              opts.prefix.should.eql('email_confirm_')
              return cb(null, parseInt(Math.random() * 256))
            }, 20)
          }
        }
      })

      const msg = await mm.message('bar')
      await msg.sendMail({
        to: 'dalek@example.com',
        name: 'dalek',
        email: 'dalek@example.com'
      })
      mock.sentMail[0].data.text.should.match(/http:\/\/example.com\/[0-9]{1,3}/)
      mock.sentMail[0].data.text.should.not.match(/one week/)
    })
  })
})
