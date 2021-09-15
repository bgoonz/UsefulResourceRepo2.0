var expect = require('chai').expect;
var blackPearl = require('../lib/black-pearl');

describe('Exposed api', function () {
  describe('#createClient', function () {
    it('should create a new Client', function () {
      expect(blackPearl.createClient('http://localhost:9400')).to.be.instanceof(blackPearl.Client);
    });
  });
});