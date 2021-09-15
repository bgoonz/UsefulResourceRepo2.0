var assert = require('assert');
var cssAbsoluteUnits = require('..');

describe('css-absolute-units', function() {

  it('should do return an array of the correct units', function() {
    assert.deepEqual(cssAbsoluteUnits(), ['px', 'mm', 'cm', 'in', 'pt', 'pc', 'mozmm']);
  });
});
