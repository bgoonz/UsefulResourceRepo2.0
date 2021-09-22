var test = require('tape')
var exec = require('child_process').exec
var TIMEOUT = 15000 // 5 seconds
var async = require('async')

test('npm 1.1.58 should fail', function (t) {

  exec(
    "npm cache clear; node ./npms/npm-1.1.58/cli.js view express name -ddd --fetch-retries=1 --fetch-retry-mintimeout=1",
    {
      timeout: TIMEOUT
    },
    function(er,stdout,stderr) {
      t.equal(er.code,1,"exit status 1")
      t.ok(er.toString().indexOf("SELF_SIGNED_CERT_IN_CHAIN") > 0,"complain about self-signed cert in chain")
      t.end()
    }
  )
})

// passing versions
var passing = ["1.1.62","1.3.24","1.4.6","1.4.14","2.1.18"]
test('all popular versions of npm post 1.1.62 should work',function(t) {
  async.each(
    passing,
    function(version,cb) {
      exec(
        "npm cache clear; node ./npms/npm-"+version+"/cli.js view express name -ddd --fetch-retries=1 --fetch-retry-mintimeout=15",
        {
          timeout: TIMEOUT
        },
        function(er,stdout,stderr) {
          t.equal(er,null,version + " exits without error")
          t.ok(stdout.indexOf("express") !== false,version + " outputs name of express package")
          cb()
        }
      )
    },
    function(er) {
      t.end()
    }
  )
})