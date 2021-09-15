var assert = require('assert');
var cssViewportUnits = require('..');

describe('css-viewport-units', function() {

  it('should return an array of the correct units', function() {
    assert.deepEqual(cssViewportUnits(), ['vh', 'vw', 'vmin', 'vmax' ]);
  });
});
