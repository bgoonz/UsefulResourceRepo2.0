var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');
var Primus = require('primus');
var http = require('http');
var elasticsearch = require('elasticsearch');
var Server = require('../lib/server');

describe('Server', function () {
  var esClient;

  beforeEach(function () {
    esClient = {
      index: sinon.spy()
    };

    sinon.stub(elasticsearch, 'Client').returns(esClient);
  });

  afterEach(function () {
    elasticsearch.Client.restore();
  });

  describe('constructor', function () {
    it('should define an http server, primus, and ES client', function () {
      var server = new Server();
      expect(server.httpServer).to.be.instanceOf(http.Server);
      expect(server.primus).to.be.instanceOf(Primus);
      expect(server.es).to.equal(esClient);
    });

    it('should be possible to give options to ES client', function () {
      new Server({ es: { host: 'elastic1:9043' } });
      expect(elasticsearch.Client).to.be.calledWith({ host: 'elastic1:9043' });
    });
  });

  describe('#listen', function () {
    it('should listen http server', function () {
      var server = new Server();
      server.httpServer.listen = sinon.spy();
      server.listen(9400);

      expect(server.httpServer.listen).to.be.calledWith(9400);
    });
  });

  describe('#onReceiveMetric', function () {
    var clock;

    beforeEach(function () {
      clock = sinon.useFakeTimers(1387846764697);
    });

    afterEach(function () {
      clock.restore();
    });

    it('should index data into elasticsearch', function () {
      var server = new Server();
      server.es.index = sinon.spy();

      server.onReceiveMetric({ name: 'customMetric', data: { foo: 'bar' } });

      expect(server.es.index).to.be.calledWith({
        body: { '@timestamp': '2013-12-24T00:59:24.697Z', foo: 'bar' },
        index: 'blackpearl',
        type: 'customMetric'
      });
    });
  });
});