var DataControl = require('./data-control').DataControl,
    Chain = require('./chain').Chain,
    onecolor = require('onecolor'),
    _ = require('lodash');

// Create a new client to control a ball
var Client = function (options) {
  options = options || {};
  this.dataControl = new DataControl(options);
};

Client.prototype = {

  // Connect to the ball
  connect: function (callback) {
    this.dataControl.connect(callback);
  },

  chain: function () {
    var self = this;
    var chain = new Chain();

    chain.connect = function (async) {
      return this.add(self.connect.bind(self), async);
    };

    chain.wait = function (time, async) {
      return this.add(function (callback) {
        setTimeout(callback, time)
      }, async);
    };

    chain.color = function (rawColor, async) {
      return this.add(self.color.bind(self, rawColor), async);
    };

    return chain;
  },

  // Ping the ball
  ping: function (callback) {
    this.dataControl.send({
      callback: callback
    });
  },

  // Return versionning information from the ball
  getVersionning: function (callback) {
    this.dataControl.send({
      CID: 0x02,
      callback: function (err, data) {
        if (err || ! data || data.length < 8)
          return callback(err);

        callback(err, {
          'RECV': data[0],
          'MDL': data[1],
          'HW': data[2],
          'MSA-ver': data[3],
          'MSA-rev': data[4],
          'BL': data[5],
          'BAS': data[6],
          'MACRO': data[7]
        });
      }
    });
  },

  // Return power state of the ball
  getPowerState: function (callback) {
    this.dataControl.send({
      CID: 0x20,
      callback: function (err, data) {
        if (err || ! data || data.length < 8)
          return callback(err);

        var labels = ['unknown', 'charging', 'ok', 'low', 'critical'];

        callback(err, {
          'RecVer': data[0],
          'PowerState': labels[data[1]] || labels[0],
          'BattVoltage': data.readUInt16BE(2) / 100,
          'NumCharges': data.readUInt16BE(4),
          'TimeSinceChg': data.readUInt16BE(6)
        });
      }
    });
  },

  // Set the RGB color of the ball
  color: function (rawColor, callback) {
    var color = onecolor(rawColor);

    this.dataControl.send({
      DID: 0x02,
      CID: 0x20,
      body: new Buffer([Math.round(color.red() * 255), Math.round(color.green() * 255), Math.round(color.blue() * 255), 0]),
      callback: callback
    });
  }
};

exports.Client = Client;