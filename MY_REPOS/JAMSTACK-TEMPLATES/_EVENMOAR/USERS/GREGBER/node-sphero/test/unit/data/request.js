var Request = require('../../../lib/data/request').Request;

describe('Request', function () {
  describe('#computeSOP2', function () {
    it('should compute SOP2 with reset timeout', function () {
      var request = new Request();
      expect(request.computeSOP2()).to.equal(0xff & 0xfe);
    });

    it('should compute SOP2 with SEQ', function () {
      var request = new Request({
        resetTimeout: true
      });
      request.SEQ = 0xff;
      expect(request.computeSOP2()).to.equal(0xff & 0xfe);
    });
  });

  describe('#computeCHK', function () {
    it('should compute CHK', function () {
      var request = new Request();
      request.buffer = new Buffer('ffff010402', 'hex');
      expect(request.computeCHK()).to.equal(250);
    });
  });

  describe('#build', function () {
    it('should compute a buffer with all options', function () {
      var request = new Request({
        body: new Buffer('010203', 'hex'),
        DID: 33,
        CID: 34
      });

      request.build();

      expect(request.buffer.toString('hex')).to.equal('fffe2122ff04010203b3');
    });
  });
});