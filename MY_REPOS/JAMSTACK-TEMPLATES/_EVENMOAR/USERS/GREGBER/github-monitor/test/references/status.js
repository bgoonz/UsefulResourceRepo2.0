var status = require('../../lib/references/status').status,
  expect = require('chai').expect;

describe('References status', function () {
  var ghClient;

  beforeEach(function () {
    ghClient = {
      repo: function () {
        return {
          statuses: function (hash, callback) {
            callback(null, { status: hash });
          }
        };
      }
    };
  });

  it('should return status of a reference', function (done) {
    status(ghClient, { repo: 'my/repo', hash: 'myhash' }, function (err, status) {
      expect(status).to.deep.equal({ status: 'myhash' });
      done();
    });
  });

  it('be possible to return multiple statuses', function (done) {
    status(ghClient, [
      { repo: 'my/repo', hash: 'myhash' },
      { repo: 'my/repo', hash: 'mysecondhash' }
    ], function (err, statuses) {
      expect(statuses[0]).to.deep.equal({ status: 'myhash' });
      expect(statuses[1]).to.deep.equal({ status: 'mysecondhash' });
      done();
    });
  });
});