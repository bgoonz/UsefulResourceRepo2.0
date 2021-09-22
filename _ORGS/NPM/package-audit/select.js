#!/usr/bin/env node

function debug() {
  //console.log.apply(console, arguments)
}

var obj
var json = ''
var path = require('path')
var url = require('url')
var FAIL = false

var spawn = require('child_process').spawn
var crypto = require('crypto')
var fs = require('fs')
var assert = require('assert')

process.stdin.setEncoding('utf8')
process.stdin.on('data', function(c) { json += c })
process.stdin.on('end', go)
var okDay = Date.parse('2015-03-01T00:00:00.000Z')

function go() {
  try {
    obj = JSON.parse(json)
  } catch (er) {
    return
  }

  var dt = obj['dist-tags']
  var l = dt && dt.latest
  var versions = obj.versions
  var v = versions && l && versions[l]
  var tgz = v && v.dist && v.dist.tarball
  debug('tgz=%j', tgz)
  if (!tgz)
    return

  var time = obj.time
  var lt = time && time[l]
  var ok = lt && (Date.parse(lt) > okDay)

  debug('ok?', ok)
  if (ok) {
    console.log('%s@%s ok (published %s)', obj.name, l, lt)
    return
  }

  var m = process.env.MANTA_INPUT_OBJECT

  var repo = obj.repository || obj.repositories
  if (repo) {
    if (Array.isArray(repo)) {
      repo = repo[0]
    }
    if (typeof repo === 'object') {
      repo = repo.url || repo.href
    }
  }

  var f = path.basename(url.parse(tgz).pathname)
  var d = path.dirname(m) + '/_attachments/' + f

  if (repo) {
    // Use the read-only version of github repos
    // if it's actually a private repo, well, we can't audit it.  oh well.
    repo = repo.replace(/^((https?|ssh|git\+[a-z]+):\/\/)?git@github.com:/,
                        'git://github.com/')
    repo = repo.replace(/git:\/\/github.com:/, 'git://github.com/')
  }

  obj = {
    name: obj.name,
    tgz: d,
    repo: repo,
    version: l
  }

  debug('got object', obj)

  // any error means possibly bad.
  process.on('uncaughtException', function(er) {
    var m = ''
    if (typeof er === 'string')
      m = er
    else if (er instanceof Error)
      m = er.stack
    else
      m = 'weird error: ' + er
    console.log('%s@%s %s', obj.name, obj.version, m)
  })

  if (!repo) {
    throw 'no git repo'
    return
  }

  clone()
}

function shacheck(found, wanted) {
  var fsha = crypto.createHash('sha1')
  var wsha = crypto.createHash('sha1')

  var f = fsha.update(fs.readFileSync(found)).digest('hex')
  var w = wsha.update(fs.readFileSync(wanted)).digest('hex')

  if (f !== w) {
    FAIL = true
    console.log('not ok %s@%s %s', obj.name, obj.version, found)
    console.log('  wanted: %s', f)
    console.log('  actual: %s', w)
  }
}

function clone() {
  debug('clone')
  var c = spawn('git', [ 'clone', obj.repo, 'repo'])
  c.stdout.pipe(process.stderr)
  c.stderr.pipe(process.stderr)
  c.on('close', function(code) {
    if (code)
      throw 'failed to clone: ' + obj.repo
    tags()
  })
}

// Find tag matching the version
function tags() {
  debug('tags')
  var c = spawn('git', [ 'tag' ], { cwd: 'repo' })
  var output = ''
  c.stdout.setEncoding('utf8')
  c.stderr.pipe(process.stderr)
  c.stdout.on('data', function(d) { output += d })
  c.on('close', function(code) {
    if (code)
      throw 'failed to get tags'
    var t = output.trim().split(/\n/).filter(function(tag) {
      tag = tag.replace(/^(v|=|release-?)+/, '')
      if (tag.indexOf(obj.version) === 0) {
        // found it!
        return true
      }
    })[0]
    if (!t) {
      console.log('%s@%s tag not found', obj.name, obj.version)
      return getTar()
    }
    checkout(t)
  })
}

function checkout(tag) {
  debug('checkout', tag)
  var c = spawn('git', ['checkout', tag], { cwd: 'repo' })
  c.stdout.pipe(process.stderr)
  c.stderr.pipe(process.stderr)
  c.on('close', function(code){
    if (code)
      throw 'failed to checkout ' + tag
    getTar()
  })
}

function getTar() {
  debug('getTar')
  var c = spawn('mget', [obj.tgz])
  c.stdout.pipe(fs.createWriteStream('package.tgz'))
  c.stderr.pipe(process.stderr)
  c.on('close', function(code){
    if (code)
      throw 'failed to fetch ' + obj.tgz
    unpackTar()
  })
}

function unpackTar() {
  debug('unpackTar')
  fs.mkdirSync('package')
  var c = spawn('tar', ['xzvf', 'package.tgz', '-C', 'package', '--strip=1'])
  c.stdout.pipe(process.stderr)
  c.stderr.pipe(process.stderr)
  c.on('close', function(code){
    if (code)
      throw 'failed to unpack tgz'
    testFiles()
  })
}

function findFiles(folder, acc, root) {
  debug('findFiles', folder, root || '')
  acc = acc || {}
  root = root || folder

  // the .git folder wont' be in the pkg, so don't test that
  // README files are often force-published without malintent
  // the package.json is mangled by npm in some cases, so just
  // test that separately and make sure scripts and main haven't changed
  fs.readdirSync(folder).filter(function(f) {
    return f !== '.git' && f !== 'package.json' && f !== /^README(\..*)?$/i
  }).map(function(f) {
    return (folder + '/' + f).substr(root.length + 1)
  }).forEach(function(f) {
    if (fs.statSync(root + '/' + f).isDirectory())
      findFiles(root + '/' + f, acc, root)
    else
      acc[f] = true
  })
  return acc
}

var pkgFiles
var repoFiles
function testFiles() {
  pkgFiles = findFiles('package')
  repoFiles = findFiles('repo')
  cleanLineEndings()
}

// git fixes line endings, but npm doesn't.
function cleanLineEndings() {
  var files = Object.keys(pkgFiles).map(function(f) {
    return 'package/' + f
  }).concat(Object.keys(repoFiles).map(function(f) {
    return 'repo/' + f
  }))
  debug('cleanLineEndings')
  files.forEach(function (f) {
    var s = fs.readFileSync(f, 'utf8')
    fs.writeFileSync(f, s.replace(/\r/g, ''), 'utf8')
  })
  testCleanFiles()
}


function testPackageJson() {
  var f = JSON.parse(fs.readFileSync('package/package.json', 'utf8'))

  try {
    var w = JSON.parse(fs.readFileSync('repo/package.json', 'utf8'))
  } catch (er) {
    throw 'failed to read package.json from repo: ' + er.message
  }

  try {
    assert.deepEqual(f.scripts || {}, w.scripts || {})
  } catch (er) {
    console.log('%s@%s Scripts Changed!', obj.name, obj.version)
    console.log('  actual: %j', f.scripts)
    console.log('  expect: %j', w.scripts)
    FAIL = true
  }

  try {
    assert.equal(f.main || '', w.main || '')
  } catch (er) {
    console.log('%s@%s main Changed!', obj.name, obj.version)
    console.log('  actual: %j', f.main)
    console.log('  expect: %j', w.main)
    FAIL = true
  }
}


function testCleanFiles() {
  // A file in one and not the other = fine
  // LOTS of packages do this, especially for built things, etc.
  // But a file in both that's DIFFERENT = suspicion
  Object.keys(pkgFiles).forEach(function(f) {
    if (!repoFiles[f])
      return

    // ok, got one
    shacheck('package/' + f, 'repo/' + f)
  })

  testPackageJson()

  if (!FAIL)
    console.log('ok %s@%s', obj.name, obj.version)
  else
    console.log('not ok %s@%s', obj.name, obj.version)
}
