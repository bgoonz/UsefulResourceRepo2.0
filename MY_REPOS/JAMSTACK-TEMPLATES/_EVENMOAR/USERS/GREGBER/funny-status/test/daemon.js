var rewire = require('rewire');
var sinon = require('sinon');
var expect = require('chai').expect;
var play = require('play');
var Daemon = rewire('../lib/daemon');

require('chai').use(require('sinon-chai'));

describe('Daemon', function () {
  var daemon;

  beforeEach(function () {
    daemon = new Daemon();
  });

  describe('constructor', function () {
    it('should create a new pinger and add services', function () {
      daemon = new Daemon({ service: 'github' });
      expect(Object.keys(daemon.pinger.services)).to.length(1);
    });

    it('should be possible to pass service as array', function () {
      daemon = new Daemon({ service: ['github', 'npm'] });
      expect(Object.keys(daemon.pinger.services)).to.length(2);
    });

    it('should be possible to pass services as function', function () {
      daemon = new Daemon({ service: ['github', function () {}] });
      expect(Object.keys(daemon.pinger.services)).to.length(2);
    });
  });

  describe('#start', function () {
    beforeEach(function () {
      sinon.stub(daemon, 'loop');
    });

    it('should call the loop', function () {
      daemon.start();
      expect(daemon.loop).to.be.called;
    });
  });

  describe('#loop', function () {
    beforeEach(function () {
      sinon.stub(daemon.pinger, 'ping').yields(null, ['up']);
      sinon.stub(daemon, 'handleStatusChange');
    });

    it('should ping, handle change and setTimeout', function () {
      daemon.loop();
      expect(daemon.pinger.ping).to.be.called;
      expect(daemon.handleStatusChange).to.be.calledWith('up');
      expect(daemon.loopInterval).to.exists;
    });
  });

  describe('#success', function () {
    beforeEach(function () {
      sinon.stub(play, 'sound');
    });

    afterEach(function () {
      play.sound.restore();
    });

    it('should play sound', function () {
      daemon.options.successSound = '/success.mp3';
      daemon.success();
      expect(play.sound).to.be.calledWith('/success.mp3');
    });
  });

  describe('#failure', function () {
    beforeEach(function () {
      sinon.stub(play, 'sound');
    });

    afterEach(function () {
      play.sound.restore();
    });

    it('should play sound', function () {
      daemon.options.failureSound = '/failure.mp3';
      daemon.failure();
      expect(play.sound).to.be.calledWith('/failure.mp3');
    });
  });
});