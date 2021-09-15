var Code = require('code'),
    Lab = require('lab'),
    lab = exports.lab = Lab.script(),
    describe = lab.experiment,
    before = lab.before,
    it = lab.test,
    expect = Code.expect;

var Facilitator = require('../.');

var redis = require('redis-mock'),
    client;

before(function (done) {
  client = redis.createClient();

  done();
});

describe('Instantiating a facilitator', function () {
  it('errors out if there is no redis option', function (done) {
    expect(function () {
      var facilitator = new Facilitator();
    }).to.throw('A Redis instance (i.e., `options.redis`) is required!');
    done();
  });

  it('does not error out if redis is included', function (done) {
    expect(function () {
      var facilitator = new Facilitator({redis: client});
    }).to.not.throw();
    done();
  });
});

describe('generating a token', function () {
  it('sets some data to a randomly generated token', function (done) {
    var data = 'boom';

    var facilitator = new Facilitator({redis: client});
    facilitator.generate(data)
      .then(function (token) {
        expect(token).to.exist();

        var key = sha(token);
        client.get(key, function (err, data) {
          data = JSON.parse(data);
          expect(data).to.equal('boom');
          done();
        });
      });
  });

  it('includes the token and hash if the data is an object', function (done) {
    var data = {
      a: 'one',
      b: 'two'
    };

    var facilitator = new Facilitator({redis: client});
    facilitator.generate(data)
      .then(function (token) {
        expect(token).to.exist();

        var key = sha(token);
        client.get(key, function (err, data) {
          data = JSON.parse(data);
          expect(data.token).to.exist();
          expect(data.hash).to.exist();
          done();
        });
      });
  });

  it('stringifies the data to be set', function (done) {
    var data = {
      a: 'one',
      b: 'two'
    };

    var facilitator = new Facilitator({redis: client});
    facilitator.generate(data)
      .then(function (token) {
        expect(token).to.exist();

        var key = sha(token);
        client.get(key, function (err, data) {
          expect(data).to.be.a.string();
          data = JSON.parse(data);
          expect(data.a).to.equal('one');
          expect(data.b).to.equal('two');
          done();
        });
      });
  });

  it('uses a predefined token if desired', function (done) {
    var data = 'boom';
    var opts = {
      token: '12345'
    };

    var facilitator = new Facilitator({redis: client});
    facilitator.generate(data, opts)
      .then(function (token) {
        expect(token).to.equal(opts.token);
        var key = sha(token);
        client.get(key, function (err, data) {
          data = JSON.parse(data);
          expect(data).to.equal('boom');
          done();
        });
      });
  });

  it('adds a prefix to the key if desired', function (done) {
    var data = 'boom';
    var opts = {
      prefix: 'ahoy:'
    };

    var facilitator = new Facilitator({redis: client});
    facilitator.generate(data, opts)
      .then(function (token) {
        var key = opts.prefix + sha(token);
        client.get(key, function (err, data) {
          data = JSON.parse(data);
          expect(data).to.equal('boom');
          facilitator.read(token, opts)
            .then(function (data) {
              expect(data).to.equal('boom');
              done();
            });
        });
      });
  });


  it('adds a timeout to the key if desired', function (done) {
    var data = 'boom';
    var opts = {
      timeout: 1
    };

    var facilitator = new Facilitator({redis: client});
    facilitator.generate(data, opts)
      .then(function (token) {
        var key = sha(token);
        client.ttl(key, function (err, time) {
          expect(time).to.equal(1);
          client.get(key, function (err, data) {
            data = JSON.parse(data);
            expect(data).to.equal('boom');

            setTimeout(function () {
              client.get(key, function (err, data) {
                data = JSON.parse(data);
                expect(data).to.be.null;
                done();
              });
            }, 1000);
          });
        });
      });
  });
});

var crypto = require('crypto');

function sha (token) {
  return crypto.createHash('sha1').update(token).digest('hex');
}
