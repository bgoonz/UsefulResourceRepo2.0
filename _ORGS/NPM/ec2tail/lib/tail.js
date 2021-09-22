var _ = require('lodash'),
  fs = require('fs'),
  Connection = require('ssh2');

// tail a remote list of files.
function Tail(opts) {
  _.extend(this, {
    logFiles: [], // array of absolute paths to files to tail.
    sshPrivateKey: process.env.SSH_PRIVATE_KEY,
    sshUser: process.env.SSH_USER,
    remoteHost: null, // the remote host to tail.
    port: 22
  }, opts);
}

Tail.prototype.start = function() {
  var _this = this,
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
    conn.exec('tail' + _.map(_this.logFiles, function(f) {return ' -f ' + f}).join(''), function(err, stream) {
      if (err) throw err;
      stream.on('exit', function(code, signal) {
        console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
      }).on('close', function() {
        console.log('Stream :: close');
        conn.end();
      }).on('data', function(data) {
        console.log(data.toString('utf-8'));
      })
      .stderr.on('data', function(data) {
        console.log('STDERR: ' + data);
      });
    });
  }).connect(opts);
};

module.exports = Tail;
