var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');
var rewire = require('rewire');
var Client = rewire('../lib/client');

describe('Client', function () {
  var Socket;

  beforeEach(function () {
    Socket = sinon.spy();
    Client.__set__('Socket', Socket);
  });

  describe('constructor', function () {
    it('should create a new socket', function () {
      var client = new Client('http://localhost:9400');
      expect(client.primus).to.be.instanceof(Socket);
      expect(Socket).to.be.calledWith('http://localhost:9400');
    });
  });

  describe('#push', function () {
    var client;

    beforeEach(function () {
      client = new Client('http://localhost:9400');
      client.primus.write = sinon.spy();
    });

    it('should write message', function () {
      client.push('customMetric', { count: 5 });
      expect(client.primus.write).to.be.calledWith({
        name: 'customMetric',
        data: { count: 5 }
      });
    });
  });
});