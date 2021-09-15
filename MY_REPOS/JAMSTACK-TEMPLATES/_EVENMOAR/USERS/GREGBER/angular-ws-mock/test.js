var expect = chai.expect;

describe('WebSocket mock', function () {

  beforeEach(module('wsMock'));

  describe('provider', function () {
    describe('#setUrl', function () {
      it('should define url', function () {
        module(function (wsProvider) {
          wsProvider.setUrl('ws://echo.websocket.org/');
        });

        inject(function (ws) {
          ws.connect();
          expect(ws.baseSocket.url).to.equal('ws://echo.websocket.org/');
        });
      });
    });

    describe('#setProtocols', function () {
      it('should define protocols', function () {
        module(function (wsProvider) {
          wsProvider.setUrl('ws://echo.websocket.org/');
          wsProvider.setProtocols('a');
        });

        inject(function (ws) {
          ws.connect();
          expect(ws.baseSocket.url).to.equal('ws://echo.websocket.org/');
        });
      });
    });
  });

  describe('service', function () {
    var ws;

    beforeEach(inject(function ($injector) {
      ws = $injector.get('ws');
    }));

    describe('#connect', function () {
      describe('with error', function () {
        it('should reject promise', function (done) {
          ws.connect({url: 'ws://google.com'})
          .catch(function (event) {
            expect(event.type).to.equal('error');
            done();
          });
          ws.emit('error', {type: 'error'});
        });
      });

      describe('without error', function () {
        it('should resolve promise', function (done) {
          ws.connect({url: 'ws://echo.websocket.org'})
          .then(function (_ws) {
            expect(_ws).to.equal(ws);
            done();
          });
          ws.emit('open');
        });
      });
    });

    describe('#getReadyState', function () {
      it('should return null if the websocket is not here', function () {
        expect(ws.getReadyState()).to.be.null;
      });

      it('should return the ready state of the WebSocket if connected', function () {
        ws.connect({url: 'ws://echo.websocket.org'});
        expect(ws.getReadyState()).to.equal(0);
        ws.emit('open');
        expect(ws.getReadyState()).to.equal(1);
      });
    });

    describe('#on', function () {
      it('should emit event correctly', function (done) {
        ws.connect({url: 'ws://echo.websocket.org'});
        ws.on('open', function () {
          done();
        });
        ws.emit('open');
      });
    });

    describe('#send', function () {
      it('should send and receive message', function (done) {
        ws.connect({url: 'ws://echo.websocket.org'});
        ws.emit('open');
        ws.send('hello');
        expect(ws.messages).to.eql(['hello']);
        ws.on('message', function (event) {
          expect(event.data).to.equal('hello');
          done();
        });
        ws.emit('message', {data: 'hello'});
      });
    });

    describe('#close', function () {
      it('should close the socket', function (done) {
        ws.connect({url: 'ws://echo.websocket.org'});
        ws.close();
        ws.on('close', function () {
          expect(ws.getReadyState()).to.equal(3);
          done();
        });
      });
    });
  });
});