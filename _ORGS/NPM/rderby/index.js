// 1. remove a service from HAProxy.
// 2. restart the service using ndm.
// 3. wait for 200s.
// 4. add the service back to HAProxy.
var _ = require('lodash'),
  async = require('async'),
  HAProxy = require('haproxy'),
  request = require('request'),
  spawn = require('child_process').spawn;

function RDerby(opts) {
  _.extend(this, {
    backend: null, // default HAProxy backend name.
    socket: '/run/haproxy/admin.sock', // Default HAProxy Socket.
    healthCheck: null, // default endpoint to hit for health check.
    services: [], // an array of services to perform a rolling restart on.

    // wait ~ 15 seconds for the service to come online.
    maxRetries: 30,
    interval: 1000
  }, opts);
}

// use async to perform a rolling restart,
// if anything fails we abort. nagios alerts
// are setup to detect a failure scenario.
RDerby.prototype.roll = function() {
  var _this = this;

  async.eachLimit(this.services, 1, function(service, cb) {
    var splitService = service.split(':'),
      name = splitService[0],
      port = splitService[1];

    async.series([
      function(done) {
        _this._removeFromHAProxy(name, done);
      },
      function(done) {
        _this._restartService(name, done);
      },
      function(done) {
        _this._waitFor200(port, done);
      },
      function(done) {
        _this._addToHAProxy(name, done);
      }
    ], function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        console.log('rolled', service);
        return cb();
      }
    });
  }, function() {
    console.log('finished rolling restart');
  });
};

// restart the ndm service corresponding to one
// of the 4 backends.
RDerby.prototype._restartService = function(name, cb) {
  var _this = this,
    command = 'ndm restart ' + name;

  var proc = spawn('sh', ['-c', command], {
    cwd: './',
    env: process.env,
    stdio: [process.stdin, process.stdout, null]
  });

  proc.stderr.on('data', function(data) {
    console.log('  ' + data.toString().trim());
  });

  proc.on('close', function(output) {
    return cb();
  });
};

// remove a single service from the HAProxy backend.
RDerby.prototype._removeFromHAProxy = function(name, cb) {
  var haproxy = new HAProxy(this.socket);

  console.log('removing', name, 'from HAProxy')

  haproxy.disable(this.backend, name, function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else return cb();
  });
};

// add a single service back to the HAProxy backend.
RDerby.prototype._addToHAProxy = function(name, cb) {
  var haproxy = new HAProxy(this.socket);

  console.log('adding', name, 'to HAProxy')

  haproxy.enable(this.backend, name, function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else return cb();
  });
};

// wait for the ping endpoint to start serving 200s.
RDerby.prototype._waitFor200 = function(port, cb) {
  var _this = this,
    id = null,
    retries = 0;

  console.log('waiting for port', port, 'to return status = 200');

  id = setInterval(function() {
    request.get({
      url: 'http://127.0.0.1:' + port + _this.healthCheck,
      json: true
    }, function (err, resp, body) {
      if (resp && resp.statusCode === 200) {
        clearInterval(id);
        return cb();
      } else console.log('received status', resp ? resp.statusCode : 0, 'connecting to', port);
    });

    // explode if we hit max retries.
    if ( (retries++) > _this.maxRetries) {
      console.error('hit max retries connecting to', port);
      process.exit(1);
    }
  }, this.interval);
};

module.exports = RDerby;
