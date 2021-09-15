var expect = require('chai').expect;
var spnAuthToken = require('../../../lib/services/spn-auth-token');

describe('Spn auth token', function () {
  it('should encode and decode', function () {
    var token = spnAuthToken.encode({websiteId: 20});
    var payload = spnAuthToken.decode(token);
    expect(payload).to.eql({websiteId: 20});
  });
});
