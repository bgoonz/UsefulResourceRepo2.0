var fs = require('fs')
var path = require('path')
var Promise = require('bluebird')
var redis = require('redis')
var map = require('async').map
var xor = require('lodash.xor')
var logger = require('bole')('npm-explicit-installs')

function ExplicitInstalls (cb) {
  return checkCache()
    .then(function (pkgs) {
      return ExplicitInstalls.getPackages()
        .then(function (_pkgs) {
          var cachedPackages = (pkgs || []).map(function (p) {
            return p.name
          })

          if (pkgs && xor(_pkgs, cachedPackages).length === 0) {
            // we can use the cached packages, since no new
            // packages have been found.
            return pkgs
          } else {
            return ExplicitInstalls.getLogos()
              .then(function (logos) {
                return loadPackageMeta(_pkgs, logos)
              })
          }
        })
    })
    .nodeify(cb)
}

function configDirectory () {
  return process.env.NEI_CONFIG_DIRECTORY || __dirname
}

ExplicitInstalls.getPackages = function () {
  return new Promise(function (resolve, reject) {
    ExplicitInstalls.fs.readFile(path.resolve(configDirectory(), './packages.json'), 'utf-8', function (err, packages) {
      // error occurred fetching packages from disk.
      if (err) {
        logger.error('failed to read packages from disk:', err.message)
        return resolve([])
      }

      // error occurred parsing packages JSON.
      try {
        packages = JSON.parse(packages)
      } catch (e) {
        logger.error('failed to parse package JSON:', e.message)
        return resolve([])
      }

      return resolve(packages)
    })
  })
}

ExplicitInstalls.getLogos = function () {
  return new Promise(function (resolve, reject) {
    ExplicitInstalls.fs.readFile(path.resolve(configDirectory(), './logos.json'), 'utf-8', function (err, logos) {
      // error occurred fetching logos from disk.
      if (err) {
        logger.error('failed to read logos from disk:', err.message)
        return resolve({})
      }

      // error occurred parsing logos JSON.
      try {
        logos = JSON.parse(logos)
      } catch (e) {
        logger.error('failed to parse logos JSON:', e.message)
        return resolve([])
      }

      return resolve(logos)
    })
  })
}

ExplicitInstalls.request = require('request')
ExplicitInstalls.fs = require('fs')
ExplicitInstalls.client = redis.createClient(process.env.REDIS_URL)
ExplicitInstalls.client.on('error', function (err) {
  logger.error('redis emitted error:', err.message)
})
ExplicitInstalls.cacheKey = '__npm_explicit_installs'
ExplicitInstalls.defaultRegistry = 'https://skimdb.npmjs.com/registry'
ExplicitInstalls.supportedExtensions = [
  '.gif',
  '.png',
  '.jpg',
  '.jpeg'
]

var hour = 60 * 60
ExplicitInstalls.cacheTtl = hour * 4 // only reload packages every 4 hours.

function checkCache () {
  return new Promise(function (resolve, reject) {
    // redis client is failing to connect, don't use cache.
    if (!ExplicitInstalls.client.connected) return resolve(null)

    ExplicitInstalls.client.get(ExplicitInstalls.cacheKey, function (err, pkgs) {
      if (err) logger.error('failed to read cache:', ExplicitInstalls.cacheKey)

      if (pkgs) {
        try {
          pkgs = JSON.parse(pkgs)
        } catch (e) {
          pkgs = null
          logger.error('failed to parse cached JSON:', e.message)
        }
      }

      return resolve(pkgs)
    })
  })
}

function loadPackageMeta (pkgs, logos) {
  return new Promise(function (resolve, reject) {
    map(pkgs, function (pkg, cb) {
      ExplicitInstalls.request(requestOpts(pkg), function (err, res, info) {
        if (!err && res.statusCode >= 400) {
          err = Error('unexpected status = ' + res.statusCode)
        }

        if (err) {
          logger.error('failed to load package:', err.message)
          return cb(null, packageError(pkg))
        }
        return cb(null, info)
      })
    }, function (err, pkgs) {
      if (err) {
        logger.error('failed to load package meta formation:', err.message)
        return resolve([])
      } else {
        return resolve(mapPkgs(pkgs, logos))
      }
    })
  })
  .then(function (pkgs) {
    return populateCache(pkgs)
  })
}

function requestOpts (pkg) {
  pkg = decodeURIComponent(pkg)
  var opts = {method: 'get', json: true}
  var url = process.env.COUCH_URL_REMOTE || ExplicitInstalls.defaultRegistry
  if (/^@/.test(pkg) && process.env.FRONT_DOOR_HOST) {
    // fetch the module from our private npm On-Site
    // instance (don't set proxy, and pass secret).
    url = process.env.FRONT_DOOR_HOST
    opts.qs = {
      sharedFetchSecret: process.env.SHARED_FETCH_SECRET
    }
  } else if (process.env.PROXY_URL) {
    // fetch from the global registry, we should set a
    // proxy if it's provided.
    opts.proxy = process.env.PROXY_URL
  }
  opts.url = url + '/' + pkg.replace('/', '%2f')
  return opts
}

function populateCache (pkgs) {
  return new Promise(function (resolve, reject) {
    // redis client is failing to connect, don't set cache.
    if (!ExplicitInstalls.client.connected) return resolve(pkgs)

    ExplicitInstalls.client.setex(ExplicitInstalls.cacheKey, ExplicitInstalls.cacheTtl, JSON.stringify(pkgs), function (err) {
      if (err) logger.error('failed to cache packages:', ExplicitInstalls.cacheKey)
      return resolve(pkgs)
    })
  })
}

ExplicitInstalls.bustCache = function (cb) {
  return new Promise(function (resolve, reject) {
    // redis client is failing to connect, don't set cache.
    if (!ExplicitInstalls.client.connected) return reject('redis not connected')

    ExplicitInstalls.client.del(ExplicitInstalls.cacheKey, function (err) {
      if (err) logger.error('failed to bust cache:', ExplicitInstalls.cacheKey)
      return resolve()
    })
  })
  .nodeify(cb)
}

ExplicitInstalls.add = function (pkg, logo) {
  var logoPath = path.resolve(configDirectory(), './logos.json')
  var logos = tryLoadJson(logoPath, {})
  var pkgPath = path.resolve(configDirectory(), './packages.json')
  var packages = tryLoadJson(pkgPath, [])

  if (logo) {
    logos[pkg] = logo
    fs.writeFileSync(logoPath, JSON.stringify(logos, null, 2), 'utf-8')
  }
  packages.push(pkg)
  fs.writeFileSync(pkgPath, JSON.stringify(packages, null, 2), 'utf-8')
}

ExplicitInstalls.delete = function (pkg) {
  var logoPath = path.resolve(configDirectory(), './logos.json')
  var logos = tryLoadJson(logoPath, {})
  var pkgPath = path.resolve(configDirectory(), './packages.json')
  var packages = tryLoadJson(pkgPath, [])

  packages.splice(packages.indexOf(pkg), 1)
  fs.writeFileSync(pkgPath, JSON.stringify(packages, null, 2), 'utf-8')
  if (logos[pkg]) {
    delete logos[pkg]
    fs.writeFileSync(logoPath, JSON.stringify(logos, null, 2), 'utf-8')
  }
}

ExplicitInstalls.getPackagesSync = function () {
  var pkgPath = path.resolve(configDirectory(), './packages.json')
  var packages = tryLoadJson(pkgPath, [])
  return packages
}

function tryLoadJson (path, defaultValue) {
  var value
  try {
    value = JSON.parse(
      fs.readFileSync(path)
    )
  } catch (_) {
    value = defaultValue
  }
  return value
}

/*
  Make pkgs match the format expected by newww:
    {{name}}
    {{version}}
    {{description}}
    {{version}}
    {{lastPublishedAt}}
    {{publisher.name}}
*/
function mapPkgs (pkgs, logos) {
  return pkgs.map(function (pkg) {
    var version = pkg['dist-tags'].latest

    return {
      name: pkg.name,
      description: pkg.description,
      version: version,
      lastPublishedAt: pkg.time[version],
      publisher: pkg.versions[version]._npmUser,
      logo: getLogo(pkg.versions[version], logos)
    }
  })
}

function getLogo (latest, logos) {
  var logo = latest.logo
  var extension = typeof logo === 'string' ? path.parse(logo).ext : null
  if (typeof logo === 'string' &&
    process.env.FEATURE_NPMO &&
    ~ExplicitInstalls.supportedExtensions.indexOf(extension)
  ) {
    return logo
  } else {
    return logos[latest.name]
  }
}

function packageError (pkg) {
  return {
    name: pkg,
    description: 'not found',
    'dist-tags': {
      latest: 'n/a'
    },
    time: {
      'n/a': Date().toString()
    },
    versions: {
      'n/a': {
        _npmUser: {
          name: 'n/a'
        }
      }
    }
  }
}

module.exports = ExplicitInstalls
