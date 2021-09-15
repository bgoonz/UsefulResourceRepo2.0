// Expose methods.
exports.parse = parse;

var regexp = /(\d+)x(\d+)@?([\d\.]+x)?/;

/**
 * Parse image size.
 *
 * @param {string} size Size string
 * @returns {object} size Size object
 * @returns {number} size.width Width
 * @returns {number} size.height Height
 */

function parse(size) {
  var matches = size.match(regexp);

  if (!matches)
    return null;

  var multiplicator = matches[3] ? +matches[3].replace(/x$/, '') : 1;

  return {
    width: +matches[1] * multiplicator,
    height: +matches[2] * multiplicator
  };
}
