var expect = require('chai').expect;
var sinon = require('sinon');
var rewire = require('rewire');
var util = rewire('../lib/util');

require('chai').use(require('sinon-chai'));

describe('Util', function () {
  describe('#log', function () {
    beforeEach(function () {
      sinon.stub(console, 'log');
      util.__set__('debug', true);
    });

    afterEach(function () {
      console.log.restore();
    });

    it('should log only in debug mode', function () {
      util.log('log');
      expect(console.log).to.be.calledWith('log');
    });
  });
});