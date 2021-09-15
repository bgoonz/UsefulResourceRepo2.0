/*! Angular wsMock v1.1.1 | (c) 2014 Greg Bergé | License MIT */

angular
.module('wsMock', [])
.provider('ws', function wsProvider() {

  /**
   * Fake WebSocket.
   */

  var FakeWebSocket = function (url, protocols) {
    this.url = url;
    this.protocol = protocols;
    this._events = [];
    this.readyState = 0;
    this.OPEN = 1;

    this.addEventListener('open', function () {
      this.readyState = 1;
    });
  };

  FakeWebSocket.prototype.addEventListener = function (event, fn) {
    this._events[event] = this._events[event] || [];
    this._events[event].push(fn);
  };

  FakeWebSocket.prototype.removeEventListener = function (event, fn) {
    if (event in this._events === false) return;
    this._events[event].splice(this._events[event].indexOf(fn), 1);
  };

  FakeWebSocket.prototype.trigger = function (event) {
    if (event in this._events === false) return;
    for (var i = 0; i < this._events[event].length; i++) {
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  };

  FakeWebSocket.prototype.close = function () {
    var fakeWebSocket = this;

    this.readyState = 2;

    setTimeout(function () {
      fakeWebSocket.readyState = 3;
      fakeWebSocket.trigger('close');
    }, 0);
  };

  var provider = this;

  /**
   * Configuration.
   */

  this.config = {};

  /**
   * Expose ws service.
   */

  this.$get = ['$rootScope', '$q', wsService];

  /**
   * Create a new Primus service.
   */

  function wsService($rootScope, $q) {

    var ws = {};

    ws.messages = [];

    ws._buffer = [];

    /**
     * Connect the WebSocket.
     *
     * @param {object} config
     */

    ws.connect = function (config) {
      config = config || {};
      var defer = $q.defer();

      if (config.url) provider.config.url = config.url;
      if (config.protocols) provider.config.protocols = config.protocols;

      if (provider.config.protocols)
        ws.baseSocket = new FakeWebSocket(provider.config.url, provider.config.protocols);
      else
        ws.baseSocket = new FakeWebSocket(provider.config.url);

      ws.on('open', function () {
        // Send buffered messages.
        ws._buffer.forEach(ws.send);
        ws._buffer = [];

        defer.resolve(ws);
      });

      ws.on('error', function (err) {
        defer.reject(err);
      });

      return defer.promise;
    };

    /**
     * Return the ready state of the WebSocket.
     *
     * @returns {string}
     */

    ws.getReadyState = function () {
      if (!ws.baseSocket) return null;
      return ws.baseSocket.readyState;
    };

    /**
     * Listen on events of a given type.
     * This event make an $rootScope.$apply on the listener.
     *
     * @param {String} event
     * @param {Function} listener
     * @returns {Function} Deregistration function for this listener.
     */

    ws.on = function (event, listener) {
      if (!ws.baseSocket) ws.connect();

      // Wrap primus event with $rootScope.$apply.
      ws.baseSocket.addEventListener(event, applyListener);

      function applyListener() {
        var args = arguments;
        $rootScope.$apply(function () {
          listener.apply(null, args);
        });
      }

      // Return the deregistration function
      return function $off() {
        ws.baseSocket.removeEventListener(event, applyListener);
      };
    };

    /**
     * Send a message threw the socket.
     *
     * @param {string} msg
     */

    ws.send = function (msg) {
      if (!ws.baseSocket) ws.connect();

      if (!ws.baseSocket || ws.baseSocket.readyState !== ws.baseSocket.OPEN)
        return ws._buffer.push(msg);

      ws.messages.push(msg);
    };

    /**
     * Close the WebSocket.
     */

    ws.close = function () {
      if (!ws.baseSocket) return;
      ws.baseSocket.close.apply(ws.baseSocket, arguments);
    };

    /**
     * Emit an event.
     *
     * @param {string} event
     * @param {*} data
     */

    ws.emit = function (event, data) {
      if (!ws.baseSocket) return;
      ws.baseSocket.trigger(event, data);
    };

    /**
     * Empty messages.
     */

    ws.reset = function () {
      ws.messages = [];
    };

    return ws;
  }

  /**
   * Define URL.
   *
   * @param {string} url
   * @returns {primusProvider}
   */

  this.setUrl = function setOptions(url) {
    this.config.url = url;
    return this;
  };

  /**
   * Define protocols.
   *
   * @param {*} protocols
   * @returns {primusProvider}
   */

  this.setProtocols = function setEndpoint(protocols) {
    this.config.protocols = protocols;
    return this;
  };

  /**
   * Define transport.
   *
   * @param {*} transport
   * @returns {primusProvider}
   */

  this.setTransport = function setEndpoint(transport) {
    this.config.transport = transport;
    return this;
  };
});