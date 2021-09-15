var _ = require('lodash');

// Create a new Request from options
var Request = function (options) {
  options = _.extend({
    resetTimeout: true,
    DID: 0x00,
    CID: 0x01,
    SEQ: 0xff
  }, options || {});

  _.extend(this, options);
};

Request.prototype = {

  // Build request
  build: function () {
    this.buffer = new Buffer(0);

    this.SOP1 = 0xff;
    this.SOP2 = this.computeSOP2();
    this.DLEN = this.computeDLEN();

    this.buffer = new Buffer(7 + this.body.length);
    this.buffer[0] = this.SOP1;
    this.buffer[1] = this.SOP2;
    this.buffer[2] = this.DID;
    this.buffer[3] = this.CID;
    this.buffer[4] = this.SEQ;
    this.buffer[5] = this.DLEN;
    this.body.copy(this.buffer, 6);
    this.buffer[this.buffer.length - 1] = this.computeCHK();
  },

  // Compute SOP2
  computeSOP2: function () {
    var data = 0xff;
    data = ! this.resetTimeout ? data & 0xfd : data;
    data = this.SEQ === 0xff ? data & 0xfe : data;
    return data;
  },

  // Compute DLEN
  computeDLEN: function () {
    return this.body.length + 1;
  },

  // Compute the checksum
  // The checksum equals the sum of the underlined bytes modulo 256 and then bit inverted.
  computeCHK: function () {
    var sum = [].slice.call(this.buffer, 2, this.buffer.length - 1).reduce(function (a, b) {
      return a + b;
    }, 0);

    return (sum % 256) ^ 0xff;
  }
};

exports.Request = Request;