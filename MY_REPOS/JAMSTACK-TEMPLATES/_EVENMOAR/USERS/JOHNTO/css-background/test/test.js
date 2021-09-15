var assert = require('assert');
var cssBackground = require('..');

describe('css-background', function() {

  it('should parse a value with attachment, color, image, clip, and repeat specified', function() {
    assert.deepEqual(
      cssBackground('url("img_tree.png") scroll content-box repeat round #ffffff'),
      {
        attachment: 'scroll',
        clip: 'content-box',
        color: '#ffffff',
        image: 'url("img_tree.png")',
        repeat: 'repeat round'
      }
    )
  })
})
