/* global describe it after, beforeEach, before */

var npmExplicitInstalls = require('../')
var clearRequire = require('clear-require')
var expect = require('chai').expect
var fs = require('fs')
var redis = require('redis')
var rimraf = require('rimraf')

require('chai').should()
console.error = function () {}

// mock require('npm-stats').module('lodash').info(cb).
function mockRequest (npmExplicitInstalls, error) {
  var data = JSON.parse(fs.readFileSync('./test/fixtures/data.json', 'utf-8'))

  npmExplicitInstalls.request = function (opts, cb) {
    if (typeof error === 'number') return cb(null, {statusCode: error})
    if (error) return cb(error)

    var pkg = data.filter(function (p) {
      return opts.url.indexOf(p.name) !== -1
    })[0]

    return cb(null, {statusCode: 200}, pkg)
  }
}

function mockFs (npmExplicitInstalls, mockPath, contents) {
  npmExplicitInstalls.fs = {
    readFile: function (path, encoding, cb) {
      if (path.indexOf(mockPath) === -1) return fs.readFile(path, encoding, cb)
      if (typeof contents !== 'string') return cb(contents)
      else return cb(null, contents)
    }
  }
}

function mockGetPackages (npmExplicitInstalls, packages) {
  var original = npmExplicitInstalls.getPackages

  npmExplicitInstalls.getPackages = function () {
    return new Promise(function (resolve, reject) {
      process.nextTick(function () {
        resolve(packages)
      })
    })
  }

  return function reset () {
    npmExplicitInstalls.getPackages = original
  }
}

describe('npm-explicit-installs', function () {
  describe('redis is down', function () {
    before(function () {
      process.env.REDIS_URL = 'redis://fake:9999'
      clearRequire('../')
      npmExplicitInstalls = require('../')
      mockRequest(npmExplicitInstalls)
    })

    it('returns a list of packages', function (done) {
      npmExplicitInstalls(function (err, pkgs) {
        expect(err).to.equal(null)
        var gruntCli = pkgs[1]
        gruntCli.name.should.equal('grunt-cli')
        gruntCli.version.should.equal('0.1.13')
        gruntCli.logo.should.equal('https://i.cloudup.com/bDkmXyEmr5.png')
        return done()
      })
    })

    after(function () { npmExplicitInstalls.client.end(true) })
  })

  describe('redis is up', function () {
    function clean (done) {
      npmExplicitInstalls.client.del(npmExplicitInstalls.cacheKey, function (err) {
        return done(err)
      })
    }
    before(function () {
      delete process.env.REDIS_URL
      clearRequire('../')
      npmExplicitInstalls = require('../')
      mockRequest(npmExplicitInstalls)
    })
    beforeEach(function (done) {
      mockRequest(npmExplicitInstalls)
      clean(done)
    })
    after(clean)

    it("loads package data from the registry, if it's fallen out of cache", function (done) {
      npmExplicitInstalls(function (err, pkgs) {
        expect(err).to.equal(null)
        var gruntCli = pkgs[1]
        gruntCli.name.should.equal('grunt-cli')
        gruntCli.version.should.equal('0.1.13')
        gruntCli.logo.should.equal('https://i.cloudup.com/bDkmXyEmr5.png')
        return done()
      })
    })

    it('populates cache', function (done) {
      npmExplicitInstalls(function (err, pkgs) {
        expect(err).to.equal(null)
        npmExplicitInstalls.client.get(npmExplicitInstalls.cacheKey, function (err, pkgsCached) {
          expect(err).to.equal(null)
          pkgsCached = JSON.parse(pkgsCached)
          var gruntCli = pkgsCached[1]
          gruntCli.name.should.equal('grunt-cli')
          gruntCli.version.should.equal('0.1.13')
          gruntCli.logo.should.equal('https://i.cloudup.com/bDkmXyEmr5.png')
          return done()
        })
      })
    })

    it('uses cache if it is populated', function (done) {
      var pkgsCached = [
        {
          name: 'batman',
          version: '1.0.0',
          description: 'grumpy detective'
        }
      ]

      var reset = mockGetPackages(npmExplicitInstalls, ['batman'])

      npmExplicitInstalls.client.set(npmExplicitInstalls.cacheKey, JSON.stringify(pkgsCached), function (err) {
        expect(err).to.equal(null)
        npmExplicitInstalls(function (err, pkgs) {
          reset()
          expect(err).to.equal(null)
          pkgs.should.deep.equal(pkgsCached)
          return done()
        })
      })
    })

    it('skips cache if cache contains invalid JSON', function (done) {
      npmExplicitInstalls.client.set(npmExplicitInstalls.cacheKey, '{"name":', function (err) {
        expect(err).to.equal(null)
        npmExplicitInstalls(function (err, pkgs) {
          expect(err).to.equal(null)
          var gruntCli = pkgs[1]
          gruntCli.name.should.equal('grunt-cli')
          gruntCli.version.should.equal('0.1.13')
          gruntCli.logo.should.equal('https://i.cloudup.com/bDkmXyEmr5.png')
          return done()
        })
      })
    })

    it('does not use cache if list of packages has changed', function (done) {
      var pkgsCached = [
        {
          name: 'batman',
          version: '1.0.0',
          description: 'grumpy detective'
        }
      ]

      npmExplicitInstalls.client.set(npmExplicitInstalls.cacheKey, JSON.stringify(pkgsCached), function (err) {
        expect(err).to.equal(null)

        npmExplicitInstalls(function (err, pkgs) {
          expect(err).to.equal(null)
          var gruntCli = pkgs[1]
          gruntCli.name.should.equal('grunt-cli')
          gruntCli.version.should.equal('0.1.13')
          gruntCli.logo.should.equal('https://i.cloudup.com/bDkmXyEmr5.png')
          return done()
        })
      })
    })

    it('returns a list of packages if redis dies', function (done) {
      var client = redis.createClient()
      var original = npmExplicitInstalls.client
      npmExplicitInstalls.client = client

      client.end(true)
      npmExplicitInstalls(function (err, pkgs) {
        npmExplicitInstalls.client = original
        expect(err).to.equal(null)
        var gruntCli = pkgs[1]
        gruntCli.name.should.equal('grunt-cli')
        gruntCli.version.should.equal('0.1.13')
        gruntCli.logo.should.equal('https://i.cloudup.com/bDkmXyEmr5.png')
        return done()
      })
    })

    describe('bustCache', function () {
      it('deletes entry in redis', function (done) {
        npmExplicitInstalls.client.set(npmExplicitInstalls.cacheKey, JSON.stringify({}), function (err) {
          expect(err).to.equal(null)
          npmExplicitInstalls.bustCache(function (err) {
            expect(err).to.equal(null)
            npmExplicitInstalls.client.get(npmExplicitInstalls.cacheKey, function (err, res) {
              expect(err).to.equal(null)
              expect(res).to.equal(null)
              return done()
            })
          })
        })
      })
    })

    describe('add', function () {
      var logosPath = './test/fixtures/add-test/logos.json'
      var pkgsPath = './test/fixtures/add-test/packages.json'
      beforeEach(function () {
        rimraf.sync(logosPath)
        rimraf.sync(pkgsPath)
      })

      it('adds a new package and logo', function () {
        process.env.NEI_CONFIG_DIRECTORY = './test/fixtures/add-test'
        npmExplicitInstalls.add('foo', 'foo.logo')
        npmExplicitInstalls.add('bar', 'bar.logo')
        delete process.env.NEI_CONFIG_DIRECTORY

        expect(
          JSON.parse(fs.readFileSync(logosPath))
        ).to.deep.equal({
          foo: 'foo.logo',
          bar: 'bar.logo'
        })

        expect(
          JSON.parse(fs.readFileSync(pkgsPath))
        ).to.deep.equal(['foo', 'bar'])
      })

      after(function () {
        rimraf.sync(logosPath)
        rimraf.sync(pkgsPath)
      })
    })

    describe('delete', function () {
      var logosPath = './test/fixtures/add-test/logos.json'
      var pkgsPath = './test/fixtures/add-test/packages.json'
      beforeEach(function () {
        rimraf.sync(logosPath)
        rimraf.sync(pkgsPath)
      })

      it('deletes from packages.json and logos.json', function () {
        process.env.NEI_CONFIG_DIRECTORY = './test/fixtures/add-test'
        npmExplicitInstalls.add('foo', 'foo.logo')
        npmExplicitInstalls.add('bar', 'bar.logo')
        npmExplicitInstalls.delete('foo')
        delete process.env.NEI_CONFIG_DIRECTORY

        expect(
          JSON.parse(fs.readFileSync(logosPath))
        ).to.deep.equal({
          bar: 'bar.logo'
        })

        expect(
          JSON.parse(fs.readFileSync(pkgsPath))
        ).to.deep.equal(['bar'])
      })

      after(function () {
        rimraf.sync(logosPath)
        rimraf.sync(pkgsPath)
      })
    })

    describe('getPackagesSync', function () {
      it('returns a list of packages in packages.json', function () {
        var packages = npmExplicitInstalls.getPackagesSync()
        packages.should.include('browserify')
        packages.should.include('grunt-cli')
      })
    })

    describe('logos', function () {
      it('should not use logo from package.json, unless we are npmo', function (done) {
        npmExplicitInstalls(function (err, pkgs) {
          expect(err).to.equal(null)
          // browserify has a string URL logo.
          pkgs[0].logo.should.equal('https://d21ii91i3y6o6h.cloudfront.net/gallery_images/from_proof/1647/small/1405586570/browserify-2-hexagon-sticker.png')
          return done()
        })
      })

      it('should not use logo from package.json, if it is not a supported image type', function (done) {
        process.env.FEATURE_NPMO = 'true'
        npmExplicitInstalls(function (err, pkgs) {
          expect(err).to.equal(null)
          // gulp has an svg image which we do not currently support.
          pkgs[3].logo.should.equal('https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png')
          delete process.env.FEATURE_NPMO
          return done()
        })
      })

      it('should use the logo from a package.json if it exists and is a string', function (done) {
        process.env.FEATURE_NPMO = 'true'
        npmExplicitInstalls(function (err, pkgs) {
          expect(err).to.equal(null)
          // browserify has a string URL logo.
          pkgs[0].logo.should.equal('http://example.com/logo.png')
          delete process.env.FEATURE_NPMO
          return done()
        })
      })

      it('should not use logo from package.json if it is not a string', function (done) {
        process.env.FEATURE_NPMO = 'true'
        npmExplicitInstalls(function (err, pkgs) {
          expect(err).to.equal(null)
          // bower has an object representing its logo.
          pkgs[2].logo.should.equal('https://i.cloudup.com/Ka0R3QvWRs.png')
          delete process.env.FEATURE_NPMO
          return done()
        })
      })
    })

    it('allows an alternate config location to be specified', function (done) {
      process.env.NEI_CONFIG_DIRECTORY = './test/fixtures'
      npmExplicitInstalls(function (err, pkgs) {
        delete process.env.NEI_CONFIG_DIRECTORY

        expect(err).to.equal(null)
        var browserify = pkgs[0]
        var gruntCli = pkgs[1]

        pkgs.length.should.equal(2)
        gruntCli.name.should.equal('grunt-cli')
        gruntCli.version.should.equal('0.1.13')
        browserify.logo.should.equal('https://logo.example.com')
        expect(gruntCli.logo).to.equal(undefined)
        return done()
      })
    })

    after(function () { npmExplicitInstalls.client.end(true) })
  })

  describe('package service is down', function () {
    it('populates packages with the default packageError object', function (done) {
      mockRequest(npmExplicitInstalls, Error("i have no idea what I'm doing"))
      npmExplicitInstalls(function (err, pkgs) {
        expect(err).to.equal(null)
        pkgs[0].description.should.equal('not found')
        return done()
      })
    })

    it('populates packages with default packageError object, if bad status is returned', function (done) {
      mockRequest(npmExplicitInstalls, 404)
      npmExplicitInstalls(function (err, pkgs) {
        expect(err).to.equal(null)
        pkgs[0].description.should.equal('not found')
        return done()
      })
    })
  })

  describe('bad files', function () {
    it('handles bad packages.json having been written to disk', function (done) {
      mockFs(npmExplicitInstalls, 'packages.json', '{"foo":')
      npmExplicitInstalls(function (err, pkgs) {
        expect(err).to.equal(null)
        pkgs.length.should.eq(0)
        return done()
      })
    })

    it('handles reading packages.json thowing error', function (done) {
      mockFs(npmExplicitInstalls, 'packages.json', Error('i have no idea what i am doing'))
      npmExplicitInstalls(function (err, pkgs) {
        expect(err).to.equal(null)
        pkgs.length.should.eq(0)
        return done()
      })
    })

    it('handles bad logos.json having been written to disk', function (done) {
      mockFs(npmExplicitInstalls, 'logos.json', '{"foo":')
      npmExplicitInstalls(function (err, logos) {
        expect(err).to.equal(null)
        Array.isArray(logos).should.equal(true)
        return done()
      })
    })

    it('handles reading logos.json thowing error', function (done) {
      mockFs(npmExplicitInstalls, 'logos.json', Error('i have no idea what i am doing'))
      npmExplicitInstalls(function (err, logos) {
        expect(err).to.equal(null)
        Array.isArray(logos).should.equal(true)
        return done()
      })
    })
  })
})
