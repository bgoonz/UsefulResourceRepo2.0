var assert = require('assert');
var cssFontUnits = require('..');

describe('css-font-units', function() {

  it('should return an array of the correct units', function() {
    assert.deepEqual(cssFontUnits(), ['em', 'ex', 'ch', 'rem']);
  });
});
