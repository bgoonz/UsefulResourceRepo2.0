var log = require('../util').log;

// Create a new Response from a buffer
var Response = function (buffer) {
  this.buffer = buffer;
};

Response.prototype = {

  // Parse response
  parse: function () {

    this.validLength(2);

    this.SOP1 = this.buffer[0];
    this.validSOP1(this.SOP1);

    this.SOP2 = this.buffer[1];
    this.validSOP2(this.SOP2);

    this.type = this.computeType();

    log('request type', this.type);

    if (this.type === 'acknoledgement')
      this.parseAcknoledgement();
    else
      this.parseAsynchronous();

    log('DLEN', this.DLEN);

    this.validLength(this.DLEN + 5);

    var startOfData = 5,
    endOfData = startOfData + this.DLEN - 1;
    this.data = this.buffer.slice(startOfData, endOfData);

    this.CHK = this.buffer[endOfData];
    var computedCHK = this.computeCHK(2, endOfData);
    log('CHK', this.CHK, 'computed', computedCHK);
    this.validCHK(this.CHK, computedCHK);

    this.error = this.MRSP;

    this.buffer = this.buffer.slice(endOfData + 1);
  },

  // Parse acknoledgement response
  parseAcknoledgement: function () {
    this.validLength(6);

    this.MRSP = this.buffer[2];
    this.SEQ = this.buffer[3];
    this.DLEN = this.buffer[4];
  },

  // Parse asynchronous response
  parseAsynchronous: function () {
    this.validLength(7);

    this.IDCODE = this.buffer[2];
    this.DLEN = this.buffer.readUInt16BE(3);
  },

  // Compute the checksum
  // The checksum equals the sum of the underlined bytes modulo 256 and then bit inverted.
  computeCHK: function (start, end) {
    var sum = [].slice.call(this.buffer, start, end).reduce(function (a, b) {
      return a + b;
    }, 0);

    return (sum % 256) ^ 0xff;
  },

  // Compute the type of the response `acknoledgement` or `asynchronous`
  computeType: function () {
    switch (this.SOP2) {
    case 0xff:
      return 'acknoledgement';
    case 0xfe:
      return 'asynchronous';
    }

    throw 'can\'t compute type';
  },

  // Valid length
  validLength: function (length) {
    if (this.buffer.length < length)
      throw 'wrong length, expected ' + length + ', actual ' + this.buffer.length;
  },

  // Valid SOP1
  validSOP1: function (data) {
    if (data !== 0xff)
      throw 'invalid SOP1';
  },

  // Valid SOP2
  validSOP2: function (data) {
    if (data !== 0xff && data !== 0xfe)
      throw 'invalid SOP2';
  },

  // Valid CHK
  validCHK: function (actual, expected) {
    if (actual !== expected)
      throw 'invalid CHK';
  }
};

exports.Response = Response;