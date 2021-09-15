/**
 * Encode an object.
 *
 * @param {Mixed} data The data that needs to be transformed in to a string.
 * @param {Function} callback Completion callback.
 */

exports.encode = function encode(data, callback) {
  var err;

  try { data = JSON.stringify(data); }
  catch (e) { err = e; }

  callback(err, data);
};

/**
 * Decode an object.
 *
 * @param {Mixed} data The data that needs to be transformed in to a string.
 * @param {Function} callback Completion callback.
 */

exports.decode = function decode(data, callback) {
  var err;

  try { data = JSON.parse(data); }
  catch (e) { err = e; }

  callback(err, data);
};