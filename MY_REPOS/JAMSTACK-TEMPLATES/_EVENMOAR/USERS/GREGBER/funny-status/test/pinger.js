var expect = require('chai').expect;
var sinon = require('sinon');
var Pinger = require('../lib/pinger');

require('chai').use(require('sinon-chai'));

describe('Pinger', function () {
  var pinger;

  beforeEach(function () {
    pinger = new Pinger();
  });

  describe('#add', function () {
    it('should add service and history entries', function () {
      pinger.add('github', function () {});

      expect(pinger.services).to.have.property('github');
      expect(pinger.history).to.have.property('github');
    });
  });

  describe('#ping', function () {
    var github, npm;

    beforeEach(function () {
      github = sinon.stub().yields();
      npm = sinon.stub().yields(true);
      pinger.add('github', github);
      pinger.add('npm', npm);
      sinon.stub(pinger, 'purge');
      sinon.stub(pinger, 'updateStatus');
    });

    it('should ping each services', function (done) {
      pinger.ping(function () {
        expect(github).to.be.called;
        expect(npm).to.be.called;
        expect(pinger.history.github).to.deep.equal([ 'up' ]);
        expect(pinger.history.npm).to.deep.equal([ 'down' ]);
        expect(pinger.purge).to.be.called;
        expect(pinger.updateStatus).to.be.calledWith('github');
        expect(pinger.updateStatus).to.be.calledWith('npm');
        done();
      });
    });
  });

  describe('#updateStatus', function () {

    describe('without enough history', function () {
      beforeEach(function () {
        pinger.options.threshold = 10;
        pinger.history = {};
        pinger.history.github = ['up', 'up', 'up'];
      });

      it('should return false', function () {
        expect(pinger.updateStatus('github')).to.be.false;
      });
    });

    describe('with different status', function () {
      beforeEach(function () {
        pinger.options.threshold = 3;
        pinger.history = {};
        pinger.history.github = ['up', 'up', 'up'];
        pinger.statuses.github = 'up';
      });

      it('should return false', function () {
        expect(pinger.updateStatus('github')).to.be.false;
      });
    });

    describe('with no consecutive statuses', function () {
      beforeEach(function () {
        pinger.options.threshold = 3;
        pinger.history = {};
        pinger.history.github = ['up', 'down', 'up'];
        pinger.statuses.github = 'down';
      });

      it('should return false', function () {
        expect(pinger.updateStatus('github')).to.be.false;
      });
    });

    describe('with actual status undefined', function () {
      beforeEach(function () {
        pinger.options.threshold = 3;
        pinger.history = {};
        pinger.history.github = ['up', 'up', 'up'];
      });

      it('should update status but return false', function () {
        expect(pinger.updateStatus('github')).to.be.false;
        expect(pinger.statuses.github).to.equal('up');
      });
    });

    describe('if all is fine', function () {
      beforeEach(function () {
        pinger.options.threshold = 3;
        pinger.history = {};
        pinger.history.github = ['up', 'up', 'up'];
        pinger.statuses.github = 'down';
      });

      it('should update current status and return it', function () {
        expect(pinger.updateStatus('github')).to.equal('up');
        expect(pinger.statuses.github).to.equal('up');
      });
    });
  });

  describe('#purge', function () {
    beforeEach(function () {
      pinger.history = {};
      pinger.history.github = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    });

    it('should keep 10 first items', function () {
      pinger.purge();
      expect(pinger.history.github).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });
});