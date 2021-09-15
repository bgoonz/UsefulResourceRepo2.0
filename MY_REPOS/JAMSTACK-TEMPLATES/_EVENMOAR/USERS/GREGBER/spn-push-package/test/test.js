var expect = require('chai').expect;
var spn = require('../');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var Promise = require('promise');

var yodaPath = path.join(__dirname, 'mocks/yoda.jpg');

describe('Spn push package', function () {
  beforeEach(function (done) {
    mkdirp(path.join(__dirname, 'tmp'), done);
  });

  describe('#generateIcon', function () {
    it('should generate an icon with simple format', function (done) {
      var iconPath = path.join(__dirname, 'tmp/30x30.png');
      var stream = spn.generateIcon(yodaPath, '30x30');
      var writeStream = fs.createWriteStream(iconPath);
      stream.pipe(writeStream);

      writeStream.on('close', function () {
        var stats = fs.statSync(iconPath);
        expect(stats.size).to.be.at.least(3200);
        expect(stats.size).to.be.at.most(3300);
        done();
      });
    });

    it('should generate an icon with multiplicator format', function (done) {
      var iconPath = path.join(__dirname, 'tmp/30x30@2x.png');
      var stream = spn.generateIcon(yodaPath, '30x30@2x');
      var writeStream = fs.createWriteStream(iconPath);
      stream.pipe(writeStream);

      writeStream.on('close', function () {
        var stats = fs.statSync(iconPath);
        expect(stats.size).to.be.at.least(8750);
        expect(stats.size).to.be.at.most(8850);
        done();
      });
    });
  });

  describe('#generateIconSet', function () {
    it('should generate an icon set', function () {
      var iconset = spn.generateIconSet(yodaPath);
      expect(iconset).to.have.property('icon_16x16.png');
      expect(iconset).to.have.property('icon_16x16@2x.png');
      expect(iconset).to.have.property('icon_32x32.png');
      expect(iconset).to.have.property('icon_32x32@2x.png');
      expect(iconset).to.have.property('icon_128x128.png');
      expect(iconset).to.have.property('icon_128x128@2x.png');
    });
  });

  describe('#generate', function () {
    this.timeout(2000);

    it('should generate a package', function (done) {
      var zipPath = path.join(__dirname, 'tmp/test.zip');
      var iconset = spn.generateIconSet(yodaPath);
      var zipStream = spn.generate({
        websiteJSON: {
          websiteName: 'Hipush',
          websitePushId: 'web.net.hipush',
          allowedDomains: ['http://hipush.net'],
          urlFormatString: '%s',
          authenticationToken: '19f8d7a6e9fb8a7f6d9330dabe',
          webServiceURL: 'http://hipush.net/api/apple'
        },
        iconset: iconset,
        key: path.join(__dirname, 'mocks/key.pem'),
        cert: path.join(__dirname, 'mocks/certificate.pem')
      });

      var writeStream = fs.createWriteStream(zipPath);
      zipStream.pipe(writeStream);

      writeStream.on('close', function () {
        var stats = fs.statSync(zipPath);
        expect(stats.size).to.be.at.least(152000);
        expect(stats.size).to.be.at.most(153500);
        done();
      });
    });
  });
});
