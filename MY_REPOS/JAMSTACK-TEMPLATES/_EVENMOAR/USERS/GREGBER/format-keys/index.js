module.exports = formatKeys;

/**
* Format input keys recursively.
*
* @param {Object} input
* @param {Function} formatter
* @returns {Object}
*/

function formatKeys(input, formatter) {
  if (!input || typeof input !== 'object') {
    throw new Error('input is not an object literal or array');
  }
  if (typeof formatter !== 'function') {
    throw new Error('formatter is not a function');
  }


  if (Array.isArray(input)) {
    return input.map(function(val) {
      return formatIfObject(val, formatter);
    });
  }

  return Object.keys(input).reduce(function(mem, key) {
    var newKey = formatter(key);
    mem[newKey] = formatIfObject(input[key], formatter);
    return mem;
  }, {});
}

// check val isn't null, is an object, and is not an object represented by a string (i.e. Date)
function formatIfObject(val, formatter) {
  var parsed = JSON.parse(JSON.stringify(val));
  var shouldFormat = val && typeof parsed === 'object';
  return shouldFormat ? formatKeys(val, formatter) : val;
}
