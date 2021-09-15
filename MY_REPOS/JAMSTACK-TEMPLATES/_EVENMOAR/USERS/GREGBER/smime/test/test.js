var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var smime = require('../');

describe('Smime', function () {
  describe('#sign', function () {
    it('should return an error if there is no content', function () {
      return smime.sign({
        key: path.join(__dirname, 'key.pem'),
        cert: path.join(__dirname, 'certificate.pem')
      })
      .catch(function (err) {
        expect(err.message).to.equal('Invalid content.');
      });
    });

    it('should return an error if there is no key', function () {
      return smime.sign({
        content: fs.createReadStream(path.join(__dirname, 'file-to-sign')),
        cert: path.join(__dirname, 'certificate.pem')
      })
      .catch(function (err) {
        expect(err.message).to.equal('Invalid key.');
      });
    });

    it('should return an error if there is no cert', function () {
      return smime.sign({
        content: fs.createReadStream(path.join(__dirname, 'file-to-sign')),
        key: path.join(__dirname, 'key.pem')
      })
      .catch(function (err) {
        expect(err.message).to.equal('Invalid certificate.');
      });
    });

    it('should sign a content', function () {
      return smime.sign({
        content: fs.createReadStream(path.join(__dirname, 'file-to-sign')),
        key: path.join(__dirname, 'key.pem'),
        cert: path.join(__dirname, 'certificate.pem')
      })
      .then(function (res) {
        expect(res).to.have.property('der');
        expect(res).to.have.property('child');
      });
    });

    it('should work with password', function () {
      return smime.sign({
        content: fs.createReadStream(path.join(__dirname, 'file-to-sign')),
        key: path.join(__dirname, 'key.pem'),
        cert: path.join(__dirname, 'certificate.pem'),
        password: 'x'
      })
      .then(function (res) {
        expect(res).to.have.property('der');
        expect(res).to.have.property('child');
      });
    });
  });
});
