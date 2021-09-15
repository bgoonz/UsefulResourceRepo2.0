var _ = require('lodash'),
  fs = require('fs'),
  Connection = require('ssh2');

// Loads ~/.log on the remote server.
// the .log file should contain a list of
// interesting logs located on the server.
function LoadDotLog(opts) {
  _.extend(this, {
    sshPrivateKey: process.env.SSH_PRIVATE_KEY,
    sshUser: process.env.SSH_USER,
    remoteHost: null, // the remote host to tail.
    dotLogFile: '~/.log' // list of logs to tail.
  }, opts);
}

LoadDotLog.prototype.load = function(cb) {
  var _this = this,
    logData = '',
    conn = new Connection(),
    opts = {
      host: this.remoteHost,
      port: this.port,
      username: this.sshUser,
      privateKey: fs.readFileSync(this.sshPrivateKey)
    }

  if (process.env.SSH_PASSPHRASE) opts.passphrase = process.env.SSH_PASSPHRASE;

  conn.on('ready', function() {
    console.log('Connection :: ready');
    conn.exec('cat ' + _this.dotLogFile, function(err, stream) {
      if (err) throw err;
      stream.on('exit', function(code, signal) {
        console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
      }).on('close', function() {
        console.log('Stream :: close');
        conn.end();
        cb(null, logData);
      }).on('data', function(data) {
        logData += data.toString('utf-8');
      })
      .stderr.on('data', function(data) {
        console.log('STDERR: ' + data);
      });
    });
  }).connect(opts);
};

module.exports = LoadDotLog;
