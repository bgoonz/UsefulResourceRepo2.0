var expect = require('chai').expect;
var config = require('../../lib/config');

describe('Config', function () {
  it('should find test config', function () {
    expect(config).to.have.property('isTestConfig', true);
  });

  it('should correctly extend default', function () {
    expect(config).to.have.property('database');
  });
});
