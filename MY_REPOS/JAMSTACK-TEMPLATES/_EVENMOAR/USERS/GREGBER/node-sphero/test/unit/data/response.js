var Response = require('../../../lib/data/response').Response;

describe('Response', function () {

  describe('#computeCHK', function () {
    it('should compute CHK', function () {
      var response = new Response(new Buffer('ffff0101030506ef', 'hex'));
      expect(response.computeCHK(2, 7)).to.equal(239);
    });
  });

  describe('#parse', function () {

    it('should throw an error if length < 2', function () {
      var response = new Response(new Buffer('ff', 'hex'));
      expect(response.parse.bind(response)).to.throw(/wrong length/);
    });

    it('should throw an error if SOP1 is invalid', function () {
      var response = new Response(new Buffer('0101', 'hex'));
      expect(response.parse.bind(response)).to.throw(/invalid SOP1/);
    });

    it('should throw an error if SOP2 is invalid', function () {
      var response = new Response(new Buffer('ff01', 'hex'));
      expect(response.parse.bind(response)).to.throw(/invalid SOP2/);
    });

    describe('"acknoledgement" type', function () {

      it('should detect "acknoledgement" type', function () {
        var response = new Response(new Buffer('ffff', 'hex'));
        try { response.parse(); } catch (e) {}
        expect(response.type).to.equal('acknoledgement');
      });

      it('should throw an error if length < 6', function () {
        var response = new Response(new Buffer('ffffff', 'hex'));
        expect(response.parse.bind(response)).to.throw(/wrong length/);
      });

      it('should parse MRSP, SEQ and DLEN', function () {
        var response = new Response(new Buffer('ffff01020304', 'hex'));
        try { response.parse(); } catch (e) {}
        expect(response.MRSP).to.equal(1);
        expect(response.SEQ).to.equal(2);
        expect(response.DLEN).to.equal(3);
      });
    });

    describe('"asynchronous" type', function () {

      it('should detect "acknoledgement" type', function () {
        var response = new Response(new Buffer('ffff', 'hex'));
        try { response.parse(); } catch (e) {}
        expect(response.type).to.equal('acknoledgement');
      });

      it('should throw an error if length < 7', function () {
        var response = new Response(new Buffer('fffeff', 'hex'));
        expect(response.parse.bind(response)).to.throw(/wrong length/);
      });

      it('should parse IDCODE and DLEN', function () {
        var response = new Response(new Buffer('fffe0100030405', 'hex'));
        try { response.parse(); } catch (e) {}
        expect(response.IDCODE).to.equal(1);
        expect(response.DLEN).to.equal(3);
      });
    });

    it('should valid length with data', function () {
      var response = new Response(new Buffer('ffff0101040506', 'hex'));
      expect(response.parse.bind(response)).to.throw(/wrong length/);
    });

    it('should parse data', function () {
      var response = new Response(new Buffer('ffff010103050607', 'hex'));
      try { response.parse(); } catch (e) {}
      expect(response.data.toString('hex')).to.equal('0506');
    });

    it('should return an error if CHK is not valid', function () {
      var response = new Response(new Buffer('ffff0101030506ee', 'hex'));
      expect(response.parse.bind(response)).to.throw(/invalid CHK/);
    });

    it('should valid CHK', function () {
      var response = new Response(new Buffer('ffff0101030506ef', 'hex'));
      response.parse();
    });

    it('should cut the buffer', function () {
      var response = new Response(new Buffer('ffff0101030506ef01', 'hex'));
      response.parse();
      expect(response.buffer.toString('hex')).to.equal('01');
    });
  });
});