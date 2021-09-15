var util = require('util');
var spawn = require('child_process').spawn;
var Promise = require('promise');

// Expose methods.
exports.sign = sign;

/**
 * Sign a file.
 *
 * @param {object} options Options
 * @param {stream.Readable} options.content Content stream
 * @param {string} options.key Key path
 * @param {string} options.cert Cert path
 * @param {string} [options.password] Key password
 * @param {function} [cb] Optional callback
 * @returns {object} result Result
 * @returns {string} result.der Der signature
 * @returns {ChildProcess} result.child Child process
 */

function sign(options, cb) {
  return new Promise(function (resolve, reject) {
    options = options || {};

    if (!options.content)
      throw new Error('Invalid content.');

    if (!options.key)
      throw new Error('Invalid key.');

    if (!options.cert)
      throw new Error('Invalid certificate.');

    var command = util.format(
      'openssl smime -sign -text -signer %s -inkey %s -outform DER -binary',
      options.cert,
      options.key
    );

    if (options.password)
      command += util.format(' -passin pass:%s', options.password);

    var args = command.split(' ');
    var child = spawn(args[0], args.splice(1));

    var der = [];

    child.stdout.on('data', function (chunk) {
      der.push(chunk);
    });

    child.on('close', function (code) {
      if (code !== 0)
        reject(new Error('Process failed.'));
      else
        resolve({
          child: child,
          der: Buffer.concat(der)
        });
    });

    options.content.pipe(child.stdin);
  })
  .nodeify(cb);
}
