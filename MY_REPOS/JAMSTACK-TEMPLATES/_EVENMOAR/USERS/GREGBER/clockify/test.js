var browsers, options, phantom_bin, testacular, spawn = require('child_process').spawn, exec = require('child_process').exec, cmd, env = process.env;
env.PHANTOMJS_BIN = __dirname + '/node_modules/phantomjs/lib/phantom/bin/phantomjs';
testacular = '' + __dirname + '/node_modules/testacular/bin/testacular';
browsers = process.env.TRAVIS ? 'PhantomJS' : 'PhantomJS,Chrome';
options = [
  'start',
  __dirname + '/test/testacular.conf.js',
  '--browsers=' + browsers
];
if(process.argv.length > 2) {
  process.argv.forEach(function(arg) {
    options.push(arg);
  });
}

cmd = spawn('testacular', options, {
  env: env
});

cmd.stdout.on('data', function (data) {
  process.stdout.write('' + data);
});

cmd.stderr.on('data', function (data) {
  process.stderr.write('' + data);
});

cmd.on('exit', function (code) {
  console.log('child process exited with code ' + code);
});