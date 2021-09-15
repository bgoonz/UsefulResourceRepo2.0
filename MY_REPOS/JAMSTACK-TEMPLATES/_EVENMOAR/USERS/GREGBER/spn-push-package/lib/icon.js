var gm = require('gm');
var parseImageSize = require('image-size-parser').parse;

/**
 * Generate an icon from an image at a specific size.
 *
 * @param {string} image Path of the image
 * @param {string} size Size of the image
 * @returns {stream.Readable} iconStream
 */

exports.generate = function (image, size) {
  var sizeObj = parseImageSize(size);

  if (!sizeObj)
    throw new Error('Invalid size');

  return gm(image)
  .resize(sizeObj.width, sizeObj.height)
  .stream('png');
};
