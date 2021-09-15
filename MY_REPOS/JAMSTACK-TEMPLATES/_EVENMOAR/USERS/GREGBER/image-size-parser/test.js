var expect = require('chai').expect;
var parseImageSize = require('./').parse;

describe('Image size parser', function () {
  describe('basic size', function () {
    it('should return null if the size has not a correct format', function () {
      expect(parseImageSize('a')).to.be.null;
      expect(parseImageSize('axb')).to.be.null;
      expect(parseImageSize('20xx10')).to.be.null;
    });

    it('should return the size', function () {
      expect(parseImageSize('10x10')).to.eql({width: 10, height: 10});
      expect(parseImageSize('130x40')).to.eql({width: 130, height: 40});
    });
  });

  describe('@Xx size', function () {
    it('should ignore the @ if it\'s not a correct format', function () {
      expect(parseImageSize('10x10@a')).to.eql({width: 10, height: 10});
      expect(parseImageSize('10x10@ax')).to.eql({width: 10, height: 10});
      expect(parseImageSize('10x10@20')).to.eql({width: 10, height: 10});
    });

    it('should return the size', function () {
      expect(parseImageSize('10x20@2x')).to.eql({width: 20, height: 40});
      expect(parseImageSize('10x20@1.5x')).to.eql({width: 15, height: 30});
    });
  });
});
