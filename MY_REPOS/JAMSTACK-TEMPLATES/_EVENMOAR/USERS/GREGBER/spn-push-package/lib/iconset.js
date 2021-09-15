var icon = require('./icon');

var sizes = [
  '16x16',
  '16x16@2x',
  '32x32',
  '32x32@2x',
  '128x128',
  '128x128@2x'
];

/**
 * Generate an icon set from a path.
 *
 * @param {string} image Path of the image
 * @returns {object} iconset Map of icon streams
 */

exports.generate = function (image) {
  return sizes.reduce(function (iconset, size) {
    iconset['icon_' + size + '.png'] = icon.generate(image, size);
    return iconset;
  }, {});
};
