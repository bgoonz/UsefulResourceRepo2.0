#!/usr/bin/env node

module.exports = readmeTrim

var README_MAXLEN = 64 * 1024

function readmeTrim(doc) {
  var changed = false
  var readme = doc.readme || ''
  var readmeFilename = doc.readmeFilename || ''
  if (doc['dist-tags'] && doc['dist-tags'].latest) {
    var latest = doc.versions[doc['dist-tags'].latest]
    if (latest && latest.readme) {
      readme = latest.readme
      readmeFilename = latest.readmeFilename || ''
    }
  }

  for (var v in doc.versions) {
    // If we still don't have one, just take the first one.
    if (doc.versions[v].readme && !readme)
      readme = doc.versions[v].readme
    if (doc.versions[v].readmeFilename && !readmeFilename)
      readmeFilename = doc.versions[v].readmeFilename

    if (doc.versions[v].readme)
      changed = true

    delete doc.versions[v].readme
    delete doc.versions[v].readmeFilename
  }

  if (readme && readme.length > README_MAXLEN) {
    changed = true
    readme = readme.slice(0, README_MAXLEN)
  }
  doc.readme = readme
  doc.readmeFilename = readmeFilename

  return changed
}

if (module === require.main) {
  if (process.argv.length > 2) {
    console.error('No args. Just pipe a doc to stdin, trimmed on stdout')
    process.exit(1)
  }

  var json = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function(c) {
    json += c
  })
  process.stdin.on('end', function() {
    var obj = JSON.parse(json)
    readmeTrim(obj)
    console.log(JSON.stringify(obj, null, 2))
  })
}
