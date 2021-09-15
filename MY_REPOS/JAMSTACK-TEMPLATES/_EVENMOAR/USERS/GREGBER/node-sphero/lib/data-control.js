var serialport = require('serialport'),
    _ = require('lodash'),
    log = require('./util').log,
    Response = require('./data/response').Response,
    Request = require('./data/request').Request;

// Get Sphero port
var getPort = function (callback) {
  serialport.list(function (err, ports) {
    ports = _.map(_.filter(ports, function (port) {
      return port.comName.match(/Sphero/i);
    }), function (port) {
      return port.comName;
    });

    log('retrieve ports', ports);

    if (! ports[0])
      return callback('no-ports');

    callback(err, ports[0]);
  });
};

// DataControl object used to send and receive information from the ball
var DataControl = function (options) {
  this.options = options || {};

  this.responseBuffer = new Buffer(0);
  this.requests = {};
};

DataControl.prototype = {

  // Connect to the serialport
  connect: function (callback) {
    if (! this.options.port) {
      return getPort(_.bind(function (err, port) {
        if (err)
          throw 'No Sphero avalaible';

        this.options.port = port;
        this.connect(callback);
      }, this));
    }

    this.sp = new serialport.SerialPort(this.options.port, {
      baudrate: 57600
    });

    this.sp.on('open', _.bind(this.initialize, this));
    this.sp.on('open', callback);

    this.sp.on('error', _.bind(function () {
      log('error, try reopening');
      this.sp.close();
      this.connect(callback);
    }, this));
  },

  // Initialize the ball after the connection is opened
  initialize: function () {
    log('connection opened on', this.sp.path);
    this.sp.on('data', _.bind(this.receive, this));
  },

  // Receive data from the ball
  receive: function (data) {
    this.responseBuffer = Buffer.concat([this.responseBuffer, data]);
    this.parseResponse();
  },

  // Parse the response buffer
  parseResponse: function () {
    if (! this.responseBuffer)
      return ;

    log('parse response buffer', this.responseBuffer.toString('hex'));

    var response = new Response(this.responseBuffer);

    try {
      response.parse();
      this.responseBuffer = response.buffer;
    }
    catch (e) {
      log('buffer parse error', e);
    }

    if (response.type === 'acknoledgement') {
      if (this.requests[response.SEQ]) {
        this.requests[response.SEQ](response.error, response.data);
        delete this.requests[response.SEQ];
      }
    }
  },

  // Save the request in callback stack and return identifier
  saveRequest: function (callback) {
    for (var i = 1; i < 256; i++) {
      if (! this.requests[i]) {
        this.requests[i] = callback;
        return i;
      }
    }

    throw 'SEQ numbers full';
  },

  // Send data to the ball
  send: function(options) {
    options = options || {};

    if (options.callback)
      options.SEQ = this.saveRequest(options.callback);

    var request = new Request(options);
    request.build();

    log('send', request.buffer.toString('hex'));

    return this.sp.write(request.buffer);
  }
};

exports.DataControl = DataControl;
exports.getPort = getPort;