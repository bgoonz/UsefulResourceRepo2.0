var expect = require('chai').expect;
var logger = require('../../lib/logger');

describe('Logger', function () {
  it('should expose logger methods', function () {
    expect(logger).to.have.property('info');
    expect(logger).to.have.property('warn');
    expect(logger).to.have.property('error');
  });
});
