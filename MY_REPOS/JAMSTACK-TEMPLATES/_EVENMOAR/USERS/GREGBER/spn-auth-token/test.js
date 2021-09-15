var expect = require('chai').expect;
var spnAuthToken = require('./index');
var randomstring = require('randomstring');

describe('Spn auth token', function () {
  it('should encode and decode an object', function () {
    var token = spnAuthToken.encode({foo: 'bar'}, 'my key');
    var payload = spnAuthToken.decode(token, 'my key');
    expect(payload).to.eql({foo: 'bar'});
  });

  it('should have a minimal char length of 15', function () {
    function randomNum(size) {
      return Math.ceil(Math.random() * size);
    }

    function cryptRandom() {
      return spnAuthToken.encode(
        {a: randomstring.generate(randomNum(10))},
        randomstring.generate(randomNum(10))
      );
    }

    for (var i = 0; i < 1000; i++) {
      var token = cryptRandom();
      expect(token.length).to.be.least(15);
    }
  });
});
