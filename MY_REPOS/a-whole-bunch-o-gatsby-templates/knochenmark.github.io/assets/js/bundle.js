(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = require('./utils.js');

var utils = _interopRequireWildcard(_utils);

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _EventEmitter2 = require('./EventEmitter.js');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function remove(arr, what) {
  var found = arr.indexOf(what);

  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}

var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(backend, store, services) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Connector);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.backend = backend;
    _this.store = store;
    _this.languageUtils = services.languageUtils;
    _this.options = options;
    _this.logger = _logger2.default.create('backendConnector');

    _this.state = {};
    _this.queue = [];

    if (_this.backend && _this.backend.init) {
      _this.backend.init(services, options.backend, options);
    }
    return _this;
  }

  Connector.prototype.queueLoad = function queueLoad(languages, namespaces, callback) {
    var _this2 = this;

    // find what needs to be loaded
    var toLoad = [];
    var pending = [];
    var toLoadLanguages = [];
    var toLoadNamespaces = [];

    languages.forEach(function (lng) {
      var hasAllNamespaces = true;

      namespaces.forEach(function (ns) {
        var name = lng + '|' + ns;

        if (_this2.store.hasResourceBundle(lng, ns)) {
          _this2.state[name] = 2; // loaded
        } else if (_this2.state[name] < 0) {
          // nothing to do for err
        } else if (_this2.state[name] === 1) {
          if (pending.indexOf(name) < 0) pending.push(name);
        } else {
          _this2.state[name] = 1; // pending

          hasAllNamespaces = false;

          if (pending.indexOf(name) < 0) pending.push(name);
          if (toLoad.indexOf(name) < 0) toLoad.push(name);
          if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
        }
      });

      if (!hasAllNamespaces) toLoadLanguages.push(lng);
    });

    if (toLoad.length || pending.length) {
      this.queue.push({
        pending: pending,
        loaded: {},
        errors: [],
        callback: callback
      });
    }

    return {
      toLoad: toLoad,
      pending: pending,
      toLoadLanguages: toLoadLanguages,
      toLoadNamespaces: toLoadNamespaces
    };
  };

  Connector.prototype.loaded = function loaded(name, err, data) {
    var _this3 = this;

    var _name$split = name.split('|'),
        _name$split2 = _slicedToArray(_name$split, 2),
        lng = _name$split2[0],
        ns = _name$split2[1];

    if (err) this.emit('failedLoading', lng, ns, err);

    if (data) {
      this.store.addResourceBundle(lng, ns, data);
    }

    // set loaded
    this.state[name] = err ? -1 : 2;

    // callback if ready
    this.queue.forEach(function (q) {
      utils.pushPath(q.loaded, [lng], ns);
      remove(q.pending, name);

      if (err) q.errors.push(err);

      if (q.pending.length === 0 && !q.done) {
        _this3.emit('loaded', q.loaded);
        /* eslint no-param-reassign: 0 */
        q.done = true;
        if (q.errors.length) {
          q.callback(q.errors);
        } else {
          q.callback();
        }
      }
    });

    // remove done load requests
    this.queue = this.queue.filter(function (q) {
      return !q.done;
    });
  };

  Connector.prototype.read = function read(lng, ns, fcName) {
    var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    var _this4 = this;

    var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 250;
    var callback = arguments[5];

    if (!lng.length) return callback(null, {}); // noting to load

    return this.backend[fcName](lng, ns, function (err, data) {
      if (err && data /* = retryFlag */ && tried < 5) {
        setTimeout(function () {
          _this4.read.call(_this4, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    });
  };

  /* eslint consistent-return: 0 */


  Connector.prototype.load = function load(languages, namespaces, callback) {
    var _this5 = this;

    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
      return callback && callback();
    }
    var options = _extends({}, this.backend.options, this.options.backend);

    if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];

    var toLoad = this.queueLoad(languages, namespaces, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback(); // nothing to load and no pendings...callback now
      return null; // pendings will trigger callback
    }

    // load with multi-load
    if (options.allowMultiLoading && this.backend.readMulti) {
      this.read(toLoad.toLoadLanguages, toLoad.toLoadNamespaces, 'readMulti', null, null, function (err, data) {
        if (err) _this5.logger.warn('loading namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading failed', err);
        if (!err && data) _this5.logger.log('successfully loaded namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading', data);

        toLoad.toLoad.forEach(function (name) {
          var _name$split3 = name.split('|'),
              _name$split4 = _slicedToArray(_name$split3, 2),
              l = _name$split4[0],
              n = _name$split4[1];

          var bundle = utils.getPath(data, [l, n]);
          if (bundle) {
            _this5.loaded(name, err, bundle);
          } else {
            var error = 'loading namespace ' + n + ' for language ' + l + ' via multiloading failed';
            _this5.loaded(name, error);
            _this5.logger.error(error);
          }
        });
      });
    } else {
      toLoad.toLoad.forEach(function (name) {
        _this5.loadOne(name);
      });
    }
  };

  Connector.prototype.reload = function reload(languages, namespaces) {
    var _this6 = this;

    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
    }
    var options = _extends({}, this.backend.options, this.options.backend);

    if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];

    // load with multi-load
    if (options.allowMultiLoading && this.backend.readMulti) {
      this.read(languages, namespaces, 'readMulti', null, null, function (err, data) {
        if (err) _this6.logger.warn('reloading namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading failed', err);
        if (!err && data) _this6.logger.log('successfully reloaded namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading', data);

        languages.forEach(function (l) {
          namespaces.forEach(function (n) {
            var bundle = utils.getPath(data, [l, n]);
            if (bundle) {
              _this6.loaded(l + '|' + n, err, bundle);
            } else {
              var error = 'reloading namespace ' + n + ' for language ' + l + ' via multiloading failed';
              _this6.loaded(l + '|' + n, error);
              _this6.logger.error(error);
            }
          });
        });
      });
    } else {
      languages.forEach(function (l) {
        namespaces.forEach(function (n) {
          _this6.loadOne(l + '|' + n, 're');
        });
      });
    }
  };

  Connector.prototype.loadOne = function loadOne(name) {
    var _this7 = this;

    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var _name$split5 = name.split('|'),
        _name$split6 = _slicedToArray(_name$split5, 2),
        lng = _name$split6[0],
        ns = _name$split6[1];

    this.read(lng, ns, 'read', null, null, function (err, data) {
      if (err) _this7.logger.warn(prefix + 'loading namespace ' + ns + ' for language ' + lng + ' failed', err);
      if (!err && data) _this7.logger.log(prefix + 'loaded namespace ' + ns + ' for language ' + lng, data);

      _this7.loaded(name, err, data);
    });
  };

  Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

    if (this.backend && this.backend.create) {
      this.backend.create(languages, namespace, key, fallbackValue, null /* unused callback */, _extends({}, options, { isUpdate: isUpdate }));
    }

    // write to store to avoid resending
    if (!languages || !languages[0]) return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  };

  return Connector;
}(_EventEmitter3.default);

exports.default = Connector;
},{"./EventEmitter.js":3,"./logger.js":12,"./utils.js":14}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _EventEmitter2 = require('./EventEmitter.js');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(cache, store, services) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Connector);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.cache = cache;
    _this.store = store;
    _this.services = services;
    _this.options = options;
    _this.logger = _logger2.default.create('cacheConnector');

    if (_this.cache && _this.cache.init) _this.cache.init(services, options.cache, options);
    return _this;
  }

  /* eslint consistent-return: 0 */


  Connector.prototype.load = function load(languages, namespaces, callback) {
    var _this2 = this;

    if (!this.cache) return callback && callback();
    var options = _extends({}, this.cache.options, this.options.cache);

    var loadLngs = typeof languages === 'string' ? this.services.languageUtils.toResolveHierarchy(languages) : languages;

    if (options.enabled) {
      this.cache.load(loadLngs, function (err, data) {
        if (err) _this2.logger.error('loading languages ' + loadLngs.join(', ') + ' from cache failed', err);
        if (data) {
          /* eslint no-restricted-syntax: 0 */
          for (var l in data) {
            if (Object.prototype.hasOwnProperty.call(data, l)) {
              for (var n in data[l]) {
                if (Object.prototype.hasOwnProperty.call(data[l], n)) {
                  if (n !== 'i18nStamp') {
                    var bundle = data[l][n];
                    if (bundle) _this2.store.addResourceBundle(l, n, bundle);
                  }
                }
              }
            }
          }
        }
        if (callback) callback();
      });
    } else if (callback) {
      callback();
    }
  };

  Connector.prototype.save = function save() {
    if (this.cache && this.options.cache && this.options.cache.enabled) this.cache.save(this.store.data);
  };

  return Connector;
}(_EventEmitter3.default);

exports.default = Connector;
},{"./EventEmitter.js":3,"./logger.js":12}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.observers = {};
  }

  EventEmitter.prototype.on = function on(events, listener) {
    var _this = this;

    events.split(' ').forEach(function (event) {
      _this.observers[event] = _this.observers[event] || [];
      _this.observers[event].push(listener);
    });
  };

  EventEmitter.prototype.off = function off(event, listener) {
    var _this2 = this;

    if (!this.observers[event]) {
      return;
    }

    this.observers[event].forEach(function () {
      if (!listener) {
        delete _this2.observers[event];
      } else {
        var index = _this2.observers[event].indexOf(listener);
        if (index > -1) {
          _this2.observers[event].splice(index, 1);
        }
      }
    });
  };

  EventEmitter.prototype.emit = function emit(event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (this.observers[event]) {
      var cloned = [].concat(this.observers[event]);
      cloned.forEach(function (observer) {
        observer.apply(undefined, args);
      });
    }

    if (this.observers['*']) {
      var _cloned = [].concat(this.observers['*']);
      _cloned.forEach(function (observer) {
        var _ref;

        observer.apply(observer, (_ref = [event]).concat.apply(_ref, args));
      });
    }
  };

  return EventEmitter;
}();

exports.default = EventEmitter;
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils.js');

var utils = _interopRequireWildcard(_utils);

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interpolator = function () {
  function Interpolator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Interpolator);

    this.logger = _logger2.default.create('interpolator');

    this.init(options, true);
  }

  /* eslint no-param-reassign: 0 */


  Interpolator.prototype.init = function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var reset = arguments[1];

    if (reset) {
      this.options = options;
      this.format = options.interpolation && options.interpolation.format || function (value) {
        return value;
      };
      this.escape = options.interpolation && options.interpolation.escape || utils.escape;
    }
    if (!options.interpolation) options.interpolation = { escapeValue: true };

    var iOpts = options.interpolation;

    this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;

    this.prefix = iOpts.prefix ? utils.regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
    this.suffix = iOpts.suffix ? utils.regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';

    this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';

    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';

    this.nestingPrefix = iOpts.nestingPrefix ? utils.regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || utils.regexEscape('$t(');
    this.nestingSuffix = iOpts.nestingSuffix ? utils.regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || utils.regexEscape(')');

    this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;

    // the regexp
    this.resetRegExp();
  };

  Interpolator.prototype.reset = function reset() {
    if (this.options) this.init(this.options);
  };

  Interpolator.prototype.resetRegExp = function resetRegExp() {
    // the regexp
    var regexpStr = this.prefix + '(.+?)' + this.suffix;
    this.regexp = new RegExp(regexpStr, 'g');

    var regexpUnescapeStr = '' + this.prefix + this.unescapePrefix + '(.+?)' + this.unescapeSuffix + this.suffix;
    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');

    var nestingRegexpStr = this.nestingPrefix + '(.+?)' + this.nestingSuffix;
    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
  };

  Interpolator.prototype.interpolate = function interpolate(str, data, lng) {
    var _this = this;

    var match = void 0;
    var value = void 0;
    var replaces = void 0;

    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    }

    var handleFormat = function handleFormat(key) {
      if (key.indexOf(_this.formatSeparator) < 0) return utils.getPath(data, key);

      var p = key.split(_this.formatSeparator);
      var k = p.shift().trim();
      var f = p.join(_this.formatSeparator).trim();

      return _this.format(utils.getPath(data, k), f, lng);
    };

    this.resetRegExp();

    replaces = 0;
    // unescape if has unescapePrefix/Suffix
    /* eslint no-cond-assign: 0 */
    while (match = this.regexpUnescape.exec(str)) {
      value = handleFormat(match[1].trim());
      str = str.replace(match[0], value);
      this.regexpUnescape.lastIndex = 0;
      replaces++;
      if (replaces >= this.maxReplaces) {
        break;
      }
    }

    replaces = 0;
    // regular escape on demand
    while (match = this.regexp.exec(str)) {
      value = handleFormat(match[1].trim());
      if (typeof value !== 'string') value = utils.makeString(value);
      if (!value) {
        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
        value = '';
      }
      value = this.escapeValue ? regexSafe(this.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
      replaces++;
      if (replaces >= this.maxReplaces) {
        break;
      }
    }
    return str;
  };

  Interpolator.prototype.nest = function nest(str, fc) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var match = void 0;
    var value = void 0;

    var clonedOptions = _extends({}, options);
    clonedOptions.applyPostProcessor = false; // avoid post processing on nested lookup

    // if value is something like "myKey": "lorem $(anotherKey, { "count": {{aValueInOptions}} })"
    function handleHasOptions(key, inheritedOptions) {
      if (key.indexOf(',') < 0) return key;

      var p = key.split(',');
      key = p.shift();
      var optionsString = p.join(',');
      optionsString = this.interpolate(optionsString, clonedOptions);
      optionsString = optionsString.replace(/'/g, '"');

      try {
        clonedOptions = JSON.parse(optionsString);

        if (inheritedOptions) clonedOptions = _extends({}, inheritedOptions, clonedOptions);
      } catch (e) {
        this.logger.error('failed parsing options string in nesting for key ' + key, e);
      }

      return key;
    }

    // regular escape on demand
    while (match = this.nestingRegexp.exec(str)) {
      value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);

      // is only the nesting key (key1 = '$(key2)') return the value without stringify
      if (value && match[0] === str && typeof value !== 'string') return value;

      // no string to include or empty
      if (typeof value !== 'string') value = utils.makeString(value);
      if (!value) {
        this.logger.warn('missed to resolve ' + match[1] + ' for nesting ' + str);
        value = '';
      }
      // Nested keys should not be escaped by default #854
      // value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  };

  return Interpolator;
}();

exports.default = Interpolator;
},{"./logger.js":12,"./utils.js":14}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var LanguageUtil = function () {
  function LanguageUtil(options) {
    _classCallCheck(this, LanguageUtil);

    this.options = options;

    this.whitelist = this.options.whitelist || false;
    this.logger = _logger2.default.create('languageUtils');
  }

  LanguageUtil.prototype.getScriptPartFromCode = function getScriptPartFromCode(code) {
    if (!code || code.indexOf('-') < 0) return null;

    var p = code.split('-');
    if (p.length === 2) return null;
    p.pop();
    return this.formatLanguageCode(p.join('-'));
  };

  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
    if (!code || code.indexOf('-') < 0) return code;

    var p = code.split('-');
    return this.formatLanguageCode(p[0]);
  };

  LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
    // http://www.iana.org/assignments/language-tags/language-tags.xhtml
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
      var p = code.split('-');

      if (this.options.lowerCaseLng) {
        p = p.map(function (part) {
          return part.toLowerCase();
        });
      } else if (p.length === 2) {
        p[0] = p[0].toLowerCase();
        p[1] = p[1].toUpperCase();

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
      } else if (p.length === 3) {
        p[0] = p[0].toLowerCase();

        // if lenght 2 guess it's a country
        if (p[1].length === 2) p[1] = p[1].toUpperCase();
        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
      }

      return p.join('-');
    }

    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  };

  LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code) {
    if (this.options.load === 'languageOnly' || this.options.nonExplicitWhitelist) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1;
  };

  LanguageUtil.prototype.getFallbackCodes = function getFallbackCodes(fallbacks, code) {
    if (!fallbacks) return [];
    if (typeof fallbacks === 'string') fallbacks = [fallbacks];
    if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;

    if (!code) return fallbacks.default || [];

    // asume we have an object defining fallbacks
    var found = fallbacks[code];
    if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found) found = fallbacks[this.formatLanguageCode(code)];
    if (!found) found = fallbacks.default;

    return found || [];
  };

  LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
    var _this = this;

    var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);

    var codes = [];
    var addCode = function addCode(c) {
      if (!c) return;
      if (_this.isWhitelisted(c)) {
        codes.push(c);
      } else {
        _this.logger.warn('rejecting non-whitelisted language code: ' + c);
      }
    };

    if (typeof code === 'string' && code.indexOf('-') > -1) {
      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
    } else if (typeof code === 'string') {
      addCode(this.formatLanguageCode(code));
    }

    fallbackCodes.forEach(function (fc) {
      if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
    });

    return codes;
  };

  return LanguageUtil;
}();

exports.default = LanguageUtil;
},{"./logger.js":12}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// definition http://translate.sourceforge.net/wiki/l10n/pluralforms
/* eslint-disable */
var sets = [{ lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'ti', 'tr', 'uz', 'wa'], nr: [1, 2], fc: 1 }, { lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'he', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'], nr: [1, 2], fc: 2 }, { lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'], nr: [1], fc: 3 }, { lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'], nr: [1, 2, 5], fc: 4 }, { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 }, { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 }, { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ['fr'], nr: [1, 2], fc: 9 }, { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ['is'], nr: [1, 2], fc: 12 }, { lngs: ['jv'], nr: [0, 1], fc: 13 }, { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ['lt'], nr: [1, 2, 10], fc: 15 }, { lngs: ['lv'], nr: [1, 2, 0], fc: 16 }, { lngs: ['mk'], nr: [1, 2], fc: 17 }, { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 }, { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ['or'], nr: [2, 1], fc: 2 }, { lngs: ['ro'], nr: [1, 2, 20], fc: 20 }, { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 }];

var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  }
};
/* eslint-enable */

function createRules() {
  var rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}

var PluralResolver = function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PluralResolver);

    this.languageUtils = languageUtils;
    this.options = options;

    this.logger = _logger2.default.create('pluralResolver');

    this.rules = createRules();
  }

  PluralResolver.prototype.addRule = function addRule(lng, obj) {
    this.rules[lng] = obj;
  };

  PluralResolver.prototype.getRule = function getRule(code) {
    return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
  };

  PluralResolver.prototype.needsPlural = function needsPlural(code) {
    var rule = this.getRule(code);

    return rule && rule.numbers.length > 1;
  };

  PluralResolver.prototype.getPluralFormsOfKey = function getPluralFormsOfKey(code, key) {
    var _this = this;

    var ret = [];

    var rule = this.getRule(code);

    rule.numbers.forEach(function (n) {
      var suffix = _this.getSuffix(code, n);
      ret.push('' + key + suffix);
    });

    return ret;
  };

  PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
    var _this2 = this;

    var rule = this.getRule(code);

    if (rule) {
      // if (rule.numbers.length === 1) return ''; // only singular

      var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
      var suffix = rule.numbers[idx];

      // special treatment for lngs only having singular and plural
      if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
        if (suffix === 2) {
          suffix = 'plural';
        } else if (suffix === 1) {
          suffix = '';
        }
      }

      var returnSuffix = function returnSuffix() {
        return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
      };

      // COMPATIBILITY JSON
      // v1
      if (this.options.compatibilityJSON === 'v1') {
        if (suffix === 1) return '';
        if (typeof suffix === 'number') return '_plural_' + suffix.toString();
        return returnSuffix();
      } else if ( /* v2 */this.options.compatibilityJSON === 'v2' || rule.numbers.length === 2 && rule.numbers[0] === 1) {
        return returnSuffix();
      } else if ( /* v3 - gettext index */rule.numbers.length === 2 && rule.numbers[0] === 1) {
        return returnSuffix();
      }
      return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
    }

    this.logger.warn('no plural rule found for: ' + code);
    return '';
  };

  return PluralResolver;
}();

exports.default = PluralResolver;
},{"./logger.js":12}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _EventEmitter2 = require('./EventEmitter.js');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _utils = require('./utils.js');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ResourceStore = function (_EventEmitter) {
  _inherits(ResourceStore, _EventEmitter);

  function ResourceStore(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ns: ['translation'], defaultNS: 'translation' };

    _classCallCheck(this, ResourceStore);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.data = data || {};
    _this.options = options;
    return _this;
  }

  ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  };

  ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
    var index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  };

  ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var keySeparator = options.keySeparator || this.options.keySeparator;
    if (keySeparator === undefined) keySeparator = '.';

    var path = [lng, ns];
    if (key && typeof key !== 'string') path = path.concat(key);
    if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
    }

    return utils.getPath(this.data, path);
  };

  ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : { silent: false };

    var keySeparator = this.options.keySeparator;
    if (keySeparator === undefined) keySeparator = '.';

    var path = [lng, ns];
    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      value = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    utils.setPath(this.data, path, value);

    if (!options.silent) this.emit('added', lng, ns, key, value);
  };

  ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
    /* eslint no-restricted-syntax: 0 */
    for (var m in resources) {
      if (typeof resources[m] === 'string') this.addResource(lng, ns, m, resources[m], { silent: true });
    }
    this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
    var path = [lng, ns];
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      deep = resources;
      resources = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    var pack = utils.getPath(this.data, path) || {};

    if (deep) {
      utils.deepExtend(pack, resources, overwrite);
    } else {
      pack = _extends({}, pack, resources);
    }

    utils.setPath(this.data, path, pack);

    this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);

    this.emit('removed', lng, ns);
  };

  ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  };

  ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;

    // COMPATIBILITY: remove extend in v2.1.0
    if (this.options.compatibilityAPI === 'v1') return _extends({}, this.getResource(lng, ns));

    return this.getResource(lng, ns);
  };

  ResourceStore.prototype.toJSON = function toJSON() {
    return this.data;
  };

  return ResourceStore;
}(_EventEmitter3.default);

exports.default = ResourceStore;
},{"./EventEmitter.js":3,"./utils.js":14}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _EventEmitter2 = require('./EventEmitter.js');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _postProcessor = require('./postProcessor.js');

var _postProcessor2 = _interopRequireDefault(_postProcessor);

var _utils = require('./utils.js');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Translator = function (_EventEmitter) {
  _inherits(Translator, _EventEmitter);

  function Translator(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Translator);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    utils.copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector'], services, _this);

    _this.options = options;
    _this.logger = _logger2.default.create('translator');
    return _this;
  }

  Translator.prototype.changeLanguage = function changeLanguage(lng) {
    if (lng) this.language = lng;
  };

  Translator.prototype.exists = function exists(key) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { interpolation: {} };

    var resolved = this.resolve(key, options);
    return resolved && resolved.res !== undefined;
  };

  Translator.prototype.extractFromKey = function extractFromKey(key, options) {
    var nsSeparator = options.nsSeparator || this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';
    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

    var namespaces = options.ns || this.options.defaultNS;
    if (nsSeparator && key.indexOf(nsSeparator) > -1) {
      var parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    if (typeof namespaces === 'string') namespaces = [namespaces];

    return {
      key: key,
      namespaces: namespaces
    };
  };

  Translator.prototype.translate = function translate(keys, options) {
    var _this2 = this;

    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object' && this.options.overloadTranslationOptionHandler) {
      /* eslint prefer-rest-params: 0 */
      options = this.options.overloadTranslationOptionHandler(arguments);
    }
    if (!options) options = {};

    // non valid keys handling
    if (keys === undefined || keys === null || keys === '') return '';
    if (typeof keys === 'number') keys = String(keys);
    if (typeof keys === 'string') keys = [keys];

    // separators
    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

    // get namespace(s)

    var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
        key = _extractFromKey.key,
        namespaces = _extractFromKey.namespaces;

    var namespace = namespaces[namespaces.length - 1];

    // return key on CIMode
    var lng = options.lng || this.language;
    var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng && lng.toLowerCase() === 'cimode') {
      if (appendNamespaceToCIMode) {
        var nsSeparator = options.nsSeparator || this.options.nsSeparator;
        return namespace + nsSeparator + key;
      }

      return key;
    }

    // resolve from store
    var resolved = this.resolve(keys, options);
    var res = resolved && resolved.res;
    var resUsedKey = resolved && resolved.usedKey || key;

    var resType = Object.prototype.toString.apply(res);
    var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;

    // object
    var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';
    if (res && handleAsObject && noObject.indexOf(resType) < 0 && !(joinArrays && resType === '[object Array]')) {
      if (!options.returnObjects && !this.options.returnObjects) {
        this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, options) : 'key \'' + key + ' (' + this.language + ')\' returned an object instead of string.';
      }

      // if we got a separator we loop over children - else we just return object as is
      // as having it set to false means no hierarchy so no lookup for nested values
      if (options.keySeparator || this.options.keySeparator) {
        var copy = resType === '[object Array]' ? [] : {}; // apply child translation on a copy

        /* eslint no-restricted-syntax: 0 */
        for (var m in res) {
          if (Object.prototype.hasOwnProperty.call(res, m)) {
            var deepKey = '' + resUsedKey + keySeparator + m;
            copy[m] = this.translate(deepKey, _extends({}, options, { joinArrays: false, ns: namespaces }));
            if (copy[m] === deepKey) copy[m] = res[m]; // if nothing found use orginal value as fallback
          }
        }
        res = copy;
      }
    } else if (joinArrays && resType === '[object Array]') {
      // array special treatment
      res = res.join(joinArrays);
      if (res) res = this.extendTranslation(res, keys, options);
    } else {
      // string, empty or null
      var usedDefault = false;
      var usedKey = false;

      // fallback value
      if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
        usedDefault = true;
        res = options.defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }

      // save missing
      var updateMissing = options.defaultValue && options.defaultValue !== res && this.options.updateMissing;
      if (usedKey || usedDefault || updateMissing) {
        this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? options.defaultValue : res);

        var lngs = [];
        var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
        if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
          for (var i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === 'all') {
          lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
        } else {
          lngs.push(options.lng || this.language);
        }

        var send = function send(l, k) {
          if (_this2.options.missingKeyHandler) {
            _this2.options.missingKeyHandler(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
          } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
            _this2.backendConnector.saveMissing(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
          }
          _this2.emit('missingKey', l, namespace, k, res);
        };

        if (this.options.saveMissing) {
          if (this.options.saveMissingPlurals && options.count) {
            lngs.forEach(function (l) {
              var plurals = _this2.pluralResolver.getPluralFormsOfKey(l, key);

              plurals.forEach(function (p) {
                return send([l], p);
              });
            });
          } else {
            send(lngs, key);
          }
        }
      }

      // extend
      res = this.extendTranslation(res, keys, options);

      // append namespace if still key
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = namespace + ':' + key;

      // parseMissingKeyHandler
      if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
    }

    // return
    return res;
  };

  Translator.prototype.extendTranslation = function extendTranslation(res, key, options) {
    var _this3 = this;

    if (options.interpolation) this.interpolator.init(_extends({}, options, { interpolation: _extends({}, this.options.interpolation, options.interpolation) }));

    // interpolate
    var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
    if (this.options.interpolation.defaultVariables) data = _extends({}, this.options.interpolation.defaultVariables, data);
    res = this.interpolator.interpolate(res, data, options.lng || this.language);

    // nesting
    if (options.nest !== false) res = this.interpolator.nest(res, function () {
      return _this3.translate.apply(_this3, arguments);
    }, options);

    if (options.interpolation) this.interpolator.reset();

    // post process
    var postProcess = options.postProcess || this.options.postProcess;
    var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

    if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
      res = _postProcessor2.default.handle(postProcessorNames, res, key, options, this);
    }

    return res;
  };

  Translator.prototype.resolve = function resolve(keys) {
    var _this4 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var found = void 0;
    var usedKey = void 0;

    if (typeof keys === 'string') keys = [keys];

    // forEach possible key
    keys.forEach(function (k) {
      if (_this4.isValidLookup(found)) return;
      var extracted = _this4.extractFromKey(k, options);
      var key = extracted.key;
      usedKey = key;
      var namespaces = extracted.namespaces;
      if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);

      var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';

      var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language);

      namespaces.forEach(function (ns) {
        if (_this4.isValidLookup(found)) return;

        codes.forEach(function (code) {
          if (_this4.isValidLookup(found)) return;

          var finalKey = key;
          var finalKeys = [finalKey];

          var pluralSuffix = void 0;
          if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count);

          // fallback for plural if context not found
          if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);

          // get key for context if needed
          if (needsContextHandling) finalKeys.push(finalKey += '' + _this4.options.contextSeparator + options.context);

          // get key for plural if needed
          if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);

          // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only
          var possibleKey = void 0;
          /* eslint no-cond-assign: 0 */
          while (possibleKey = finalKeys.pop()) {
            if (!_this4.isValidLookup(found)) {
              found = _this4.getResource(code, ns, possibleKey, options);
            }
          }
        });
      });
    });

    return { res: found, usedKey: usedKey };
  };

  Translator.prototype.isValidLookup = function isValidLookup(res) {
    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
  };

  Translator.prototype.getResource = function getResource(code, ns, key) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    return this.resourceStore.getResource(code, ns, key, options);
  };

  return Translator;
}(_EventEmitter3.default);

exports.default = Translator;
},{"./EventEmitter.js":3,"./logger.js":12,"./postProcessor.js":13,"./utils.js":14}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformOptions = transformOptions;
function get() {
  return {
    debug: false,
    initImmediate: true,

    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false, // string or array of namespaces

    whitelist: false, // array with whitelisted languages
    nonExplicitWhitelist: false,
    load: 'all', // | currentOnly | languageOnly
    preload: false, // array with preload languages

    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',

    saveMissing: false, // enable to send missing values
    updateMissing: false, // enable to update default values if different from translated value (only useful on initial development, or when keeping code as source of truth)
    saveMissingTo: 'fallback', // 'current' || 'all'
    saveMissingPlurals: true, // will save all forms not only singular key
    missingKeyHandler: false, // function(lng, ns, key, fallbackValue) -> override if prefer on handling

    postProcess: false, // string or array of postProcessor names
    returnNull: true, // allows null value as valid translation
    returnEmptyString: true, // allows empty string value as valid translation
    returnObjects: false,
    joinArrays: false, // or string to join array
    returnedObjectHandler: function returnedObjectHandler() {}, // function(key, value, options) triggered if key returns object but returnObjects is set to false
    parseMissingKeyHandler: false, // function(key) parsed a key that was not found in t() before returning
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      var ret = {};
      if (args[1]) ret.defaultValue = args[1];
      if (args[2]) ret.tDescription = args[2];
      return ret;
    },

    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng) {
        return value;
      },
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      // prefixEscaped: '{{',
      // suffixEscaped: '}}',
      // unescapeSuffix: '',
      unescapePrefix: '-',

      nestingPrefix: '$t(',
      nestingSuffix: ')',
      // nestingPrefixEscaped: '$t(',
      // nestingSuffixEscaped: ')',
      // defaultVariables: undefined // object that can have values to interpolate on - extends passed in interpolation data
      maxReplaces: 1000 // max replaces to prevent endless loop
    }
  };
}

/* eslint no-param-reassign: 0 */
exports.get = get;
function transformOptions(options) {
  // create namespace object if namespace is passed in as string
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

  // extend whitelist with cimode
  if (options.whitelist && options.whitelist.indexOf('cimode') < 0) options.whitelist.push('cimode');

  return options;
}
},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _EventEmitter2 = require('./EventEmitter.js');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _ResourceStore = require('./ResourceStore.js');

var _ResourceStore2 = _interopRequireDefault(_ResourceStore);

var _Translator = require('./Translator.js');

var _Translator2 = _interopRequireDefault(_Translator);

var _LanguageUtils = require('./LanguageUtils.js');

var _LanguageUtils2 = _interopRequireDefault(_LanguageUtils);

var _PluralResolver = require('./PluralResolver.js');

var _PluralResolver2 = _interopRequireDefault(_PluralResolver);

var _Interpolator = require('./Interpolator.js');

var _Interpolator2 = _interopRequireDefault(_Interpolator);

var _BackendConnector = require('./BackendConnector.js');

var _BackendConnector2 = _interopRequireDefault(_BackendConnector);

var _CacheConnector = require('./CacheConnector.js');

var _CacheConnector2 = _interopRequireDefault(_CacheConnector);

var _defaults2 = require('./defaults.js');

var _postProcessor = require('./postProcessor.js');

var _postProcessor2 = _interopRequireDefault(_postProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function noop() {}

var I18n = function (_EventEmitter) {
  _inherits(I18n, _EventEmitter);

  function I18n() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    _classCallCheck(this, I18n);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.options = (0, _defaults2.transformOptions)(options);
    _this.services = {};
    _this.logger = _logger2.default;
    _this.modules = { external: [] };

    if (callback && !_this.isInitialized && !options.isClone) {
      var _ret;

      // https://github.com/i18next/i18next/issues/879
      if (!_this.options.initImmediate) return _ret = _this.init(options, callback), _possibleConstructorReturn(_this, _ret);
      setTimeout(function () {
        _this.init(options, callback);
      }, 0);
    }
    return _this;
  }

  I18n.prototype.init = function init() {
    var _this2 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    this.options = _extends({}, (0, _defaults2.get)(), this.options, (0, _defaults2.transformOptions)(options));

    this.format = this.options.interpolation.format;
    if (!callback) callback = noop;

    function createClassOnDemand(ClassOrObject) {
      if (!ClassOrObject) return null;
      if (typeof ClassOrObject === 'function') return new ClassOrObject();
      return ClassOrObject;
    }

    // init services
    if (!this.options.isClone) {
      if (this.modules.logger) {
        _logger2.default.init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        _logger2.default.init(null, this.options);
      }

      var lu = new _LanguageUtils2.default(this.options);
      this.store = new _ResourceStore2.default(this.options.resources, this.options);

      var s = this.services;
      s.logger = _logger2.default;
      s.resourceStore = this.store;
      s.resourceStore.on('added removed', function (lng, ns) {
        s.cacheConnector.save();
      });
      s.languageUtils = lu;
      s.pluralResolver = new _PluralResolver2.default(lu, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON, simplifyPluralSuffix: this.options.simplifyPluralSuffix });
      s.interpolator = new _Interpolator2.default(this.options);

      s.backendConnector = new _BackendConnector2.default(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      // pipe events from backendConnector
      s.backendConnector.on('*', function (event) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      s.backendConnector.on('loaded', function (loaded) {
        s.cacheConnector.save();
      });

      s.cacheConnector = new _CacheConnector2.default(createClassOnDemand(this.modules.cache), s.resourceStore, s, this.options);
      // pipe events from backendConnector
      s.cacheConnector.on('*', function (event) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        s.languageDetector.init(s, this.options.detection, this.options);
      }

      this.translator = new _Translator2.default(this.services, this.options);
      // pipe events from translator
      this.translator.on('*', function (event) {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      this.modules.external.forEach(function (m) {
        if (m.init) m.init(_this2);
      });
    }

    // append api
    var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle'];
    storeApi.forEach(function (fcName) {
      _this2[fcName] = function () {
        var _store;

        return (_store = _this2.store)[fcName].apply(_store, arguments);
      };
    });

    var load = function load() {
      _this2.changeLanguage(_this2.options.lng, function (err, t) {
        _this2.isInitialized = true;
        _this2.logger.log('initialized', _this2.options);
        _this2.emit('initialized', _this2.options);

        callback(err, t);
      });
    };

    if (this.options.resources || !this.options.initImmediate) {
      load();
    } else {
      setTimeout(load, 0);
    }

    return this;
  };

  /* eslint consistent-return: 0 */


  I18n.prototype.loadResources = function loadResources() {
    var _this3 = this;

    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    if (!this.options.resources) {
      if (this.language && this.language.toLowerCase() === 'cimode') return callback(); // avoid loading resources for cimode

      var toLoad = [];

      var append = function append(lng) {
        if (!lng) return;
        var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach(function (l) {
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };

      if (!this.language) {
        // at least load fallbacks in this case
        var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach(function (l) {
          return append(l);
        });
      } else {
        append(this.language);
      }

      if (this.options.preload) {
        this.options.preload.forEach(function (l) {
          return append(l);
        });
      }

      this.services.cacheConnector.load(toLoad, this.options.ns, function () {
        _this3.services.backendConnector.load(toLoad, _this3.options.ns, callback);
      });
    } else {
      callback(null);
    }
  };

  I18n.prototype.reloadResources = function reloadResources(lngs, ns) {
    if (!lngs) lngs = this.languages;
    if (!ns) ns = this.options.ns;
    this.services.backendConnector.reload(lngs, ns);
  };

  I18n.prototype.use = function use(module) {
    if (module.type === 'backend') {
      this.modules.backend = module;
    }

    if (module.type === 'cache') {
      this.modules.cache = module;
    }

    if (module.type === 'logger' || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }

    if (module.type === 'languageDetector') {
      this.modules.languageDetector = module;
    }

    if (module.type === 'postProcessor') {
      _postProcessor2.default.addPostProcessor(module);
    }

    if (module.type === '3rdParty') {
      this.modules.external.push(module);
    }

    return this;
  };

  I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
    var _this4 = this;

    var done = function done(err, l) {
      _this4.translator.changeLanguage(l);

      if (l) {
        _this4.emit('languageChanged', l);
        _this4.logger.log('languageChanged', l);
      }

      if (callback) callback(err, function () {
        return _this4.t.apply(_this4, arguments);
      });
    };

    var setLng = function setLng(l) {
      if (l) {
        _this4.language = l;
        _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
        if (!_this4.translator.language) _this4.translator.changeLanguage(l);

        if (_this4.services.languageDetector) _this4.services.languageDetector.cacheUserLanguage(l);
      }

      _this4.loadResources(function (err) {
        done(err, l);
      });
    };

    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      this.services.languageDetector.detect(setLng);
    } else {
      setLng(lng);
    }
  };

  I18n.prototype.getFixedT = function getFixedT(lng, ns) {
    var _this5 = this;

    var fixedT = function fixedT(key, opts) {
      for (var _len4 = arguments.length, rest = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        rest[_key4 - 2] = arguments[_key4];
      }

      var options = _extends({}, opts);
      if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
        options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
      }

      options.lng = options.lng || fixedT.lng;
      options.lngs = options.lngs || fixedT.lngs;
      options.ns = options.ns || fixedT.ns;
      return _this5.t(key, options);
    };
    if (typeof lng === 'string') {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    return fixedT;
  };

  I18n.prototype.t = function t() {
    var _translator;

    return this.translator && (_translator = this.translator).translate.apply(_translator, arguments);
  };

  I18n.prototype.exists = function exists() {
    var _translator2;

    return this.translator && (_translator2 = this.translator).exists.apply(_translator2, arguments);
  };

  I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  };

  I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
    var _this6 = this;

    if (!this.options.ns) return callback && callback();
    if (typeof ns === 'string') ns = [ns];

    ns.forEach(function (n) {
      if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
    });

    this.loadResources(callback);
  };

  I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
    if (typeof lngs === 'string') lngs = [lngs];
    var preloaded = this.options.preload || [];

    var newLngs = lngs.filter(function (lng) {
      return preloaded.indexOf(lng) < 0;
    });
    // Exit early if all given languages are already preloaded
    if (!newLngs.length) return callback();

    this.options.preload = preloaded.concat(newLngs);
    this.loadResources(callback);
  };

  I18n.prototype.dir = function dir(lng) {
    if (!lng) lng = this.languages && this.languages.length > 0 ? this.languages[0] : this.language;
    if (!lng) return 'rtl';

    var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];

    return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
  };

  /* eslint class-methods-use-this: 0 */


  I18n.prototype.createInstance = function createInstance() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    return new I18n(options, callback);
  };

  I18n.prototype.cloneInstance = function cloneInstance() {
    var _this7 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    var mergedOptions = _extends({}, this.options, options, { isClone: true });
    var clone = new I18n(mergedOptions);
    var membersToCopy = ['store', 'services', 'language'];
    membersToCopy.forEach(function (m) {
      clone[m] = _this7[m];
    });
    clone.translator = new _Translator2.default(clone.services, clone.options);
    clone.translator.on('*', function (event) {
      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      clone.emit.apply(clone, [event].concat(args));
    });
    clone.init(mergedOptions, callback);
    clone.translator.options = clone.options; // sync options

    return clone;
  };

  return I18n;
}(_EventEmitter3.default);

exports.default = new I18n();
},{"./BackendConnector.js":1,"./CacheConnector.js":2,"./EventEmitter.js":3,"./Interpolator.js":4,"./LanguageUtils.js":5,"./PluralResolver.js":6,"./ResourceStore.js":7,"./Translator.js":8,"./defaults.js":9,"./logger.js":12,"./postProcessor.js":13}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.use = exports.t = exports.setDefaultNamespace = exports.on = exports.off = exports.loadResources = exports.loadNamespaces = exports.loadLanguages = exports.init = exports.getFixedT = exports.exists = exports.dir = exports.createInstance = exports.cloneInstance = exports.changeLanguage = undefined;

var _i18next = require('./i18next.js');

var _i18next2 = _interopRequireDefault(_i18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _i18next2.default;
var changeLanguage = exports.changeLanguage = _i18next2.default.changeLanguage.bind(_i18next2.default);
var cloneInstance = exports.cloneInstance = _i18next2.default.cloneInstance.bind(_i18next2.default);
var createInstance = exports.createInstance = _i18next2.default.createInstance.bind(_i18next2.default);
var dir = exports.dir = _i18next2.default.dir.bind(_i18next2.default);
var exists = exports.exists = _i18next2.default.exists.bind(_i18next2.default);
var getFixedT = exports.getFixedT = _i18next2.default.getFixedT.bind(_i18next2.default);
var init = exports.init = _i18next2.default.init.bind(_i18next2.default);
var loadLanguages = exports.loadLanguages = _i18next2.default.loadLanguages.bind(_i18next2.default);
var loadNamespaces = exports.loadNamespaces = _i18next2.default.loadNamespaces.bind(_i18next2.default);
var loadResources = exports.loadResources = _i18next2.default.loadResources.bind(_i18next2.default);
var off = exports.off = _i18next2.default.off.bind(_i18next2.default);
var on = exports.on = _i18next2.default.on.bind(_i18next2.default);
var setDefaultNamespace = exports.setDefaultNamespace = _i18next2.default.setDefaultNamespace.bind(_i18next2.default);
var t = exports.t = _i18next2.default.t.bind(_i18next2.default);
var use = exports.use = _i18next2.default.use.bind(_i18next2.default);
},{"./i18next.js":10}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var consoleLogger = {
  type: 'logger',

  log: function log(args) {
    this.output('log', args);
  },
  warn: function warn(args) {
    this.output('warn', args);
  },
  error: function error(args) {
    this.output('error', args);
  },
  output: function output(type, args) {
    var _console;

    /* eslint no-console: 0 */
    if (console && console[type]) (_console = console)[type].apply(_console, _toConsumableArray(args));
  }
};

var Logger = function () {
  function Logger(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Logger);

    this.init(concreteLogger, options);
  }

  Logger.prototype.init = function init(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.prefix = options.prefix || 'i18next:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug;
  };

  Logger.prototype.setDebug = function setDebug(bool) {
    this.debug = bool;
  };

  Logger.prototype.log = function log() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this.forward(args, 'log', '', true);
  };

  Logger.prototype.warn = function warn() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return this.forward(args, 'warn', '', true);
  };

  Logger.prototype.error = function error() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return this.forward(args, 'error', '');
  };

  Logger.prototype.deprecate = function deprecate() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
  };

  Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return null;
    if (typeof args[0] === 'string') args[0] = '' + prefix + this.prefix + ' ' + args[0];
    return this.logger[lvl](args);
  };

  Logger.prototype.create = function create(moduleName) {
    return new Logger(this.logger, _extends({ prefix: this.prefix + ':' + moduleName + ':' }, this.options));
  };

  return Logger;
}();

exports.default = new Logger();
},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  processors: {},

  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;

    processors.forEach(function (processor) {
      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
    });

    return value;
  }
};
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeString = makeString;
exports.copy = copy;
exports.setPath = setPath;
exports.pushPath = pushPath;
exports.getPath = getPath;
exports.deepExtend = deepExtend;
exports.regexEscape = regexEscape;
exports.escape = escape;
function makeString(object) {
  if (object == null) return '';
  /* eslint prefer-template: 0 */
  return '' + object;
}

function copy(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) t[m] = s[m];
  });
}

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }

  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }

  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};

    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    object = object[key];
  }

  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}

function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;

  obj[k] = newValue;
}

function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object),
      obj = _getLastOfPath2.obj,
      k = _getLastOfPath2.k;

  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}

function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;

  if (!obj) return undefined;
  return obj[k];
}

function deepExtend(target, source, overwrite) {
  /* eslint no-restricted-syntax: 0 */
  for (var prop in source) {
    if (prop in target) {
      // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch
      if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
        if (overwrite) target[prop] = source[prop];
      } else {
        deepExtend(target[prop], source[prop], overwrite);
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}

function regexEscape(str) {
  /* eslint no-useless-escape: 0 */
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/* eslint-disable */
var _entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};
/* eslint-enable */

function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  }

  return data;
}
},{}],15:[function(require,module,exports){
module.exports = require('./dist/commonjs/index.js').default;

},{"./dist/commonjs/index.js":11}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaults = {
  tName: 't',
  i18nName: 'i18n',
  handleName: 'localize',
  selectorAttr: 'data-i18n',
  targetAttr: 'i18n-target',
  optionsAttr: 'i18n-options',
  useOptionsAttr: false,
  parseDefaultValueFromContent: true
};

function init(i18next, $) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  options = _extends({}, defaults, options);

  function parse(ele, key, opts) {
    if (key.length === 0) return;

    var attr = 'text';

    if (key.indexOf('[') === 0) {
      var parts = key.split(']');
      key = parts[1];
      attr = parts[0].substr(1, parts[0].length - 1);
    }

    if (key.indexOf(';') === key.length - 1) {
      key = key.substr(0, key.length - 2);
    }

    function extendDefault(o, val) {
      if (!options.parseDefaultValueFromContent) return o;
      return _extends({}, o, { defaultValue: val });
    }

    if (attr === 'html') {
      ele.html(i18next.t(key, extendDefault(opts, ele.html())));
    } else if (attr === 'text') {
      ele.text(i18next.t(key, extendDefault(opts, ele.text())));
    } else if (attr === 'prepend') {
      ele.prepend(i18next.t(key, extendDefault(opts, ele.html())));
    } else if (attr === 'append') {
      ele.append(i18next.t(key, extendDefault(opts, ele.html())));
    } else if (attr.indexOf('data-') === 0) {
      var dataAttr = attr.substr('data-'.length);
      var translated = i18next.t(key, extendDefault(opts, ele.data(dataAttr)));

      // we change into the data cache
      ele.data(dataAttr, translated);
      // we change into the dom
      ele.attr(attr, translated);
    } else {
      ele.attr(attr, i18next.t(key, extendDefault(opts, ele.attr(attr))));
    }
  }

  function localize(ele, opts) {
    var key = ele.attr(options.selectorAttr);
    if (!key && typeof key !== 'undefined' && key !== false) key = ele.text() || ele.val();
    if (!key) return;

    var target = ele,
        targetSelector = ele.data(options.targetAttr);

    if (targetSelector) target = ele.find(targetSelector) || ele;

    if (!opts && options.useOptionsAttr === true) opts = ele.data(options.optionsAttr);

    opts = opts || {};

    if (key.indexOf(';') >= 0) {
      var keys = key.split(';');

      $.each(keys, function (m, k) {
        // .trim(): Trim the comma-separated parameters on the data-i18n attribute.
        if (k !== '') parse(target, k.trim(), opts);
      });
    } else {
      parse(target, key, opts);
    }

    if (options.useOptionsAttr === true) {
      var clone = {};
      clone = _extends({ clone: clone }, opts);

      delete clone.lng;
      ele.data(options.optionsAttr, clone);
    }
  }

  function handle(opts) {
    return this.each(function () {
      // localize element itself
      localize($(this), opts);

      // localize children
      var elements = $(this).find('[' + options.selectorAttr + ']');
      elements.each(function () {
        localize($(this), opts);
      });
    });
  };

  // $.t $.i18n shortcut
  $[options.tName] = i18next.t.bind(i18next);
  $[options.i18nName] = i18next;

  // selector function $(mySelector).localize(opts);
  $.fn[options.handleName] = handle;
}

exports.default = {
  init: init
};
},{}],17:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"./dist/commonjs/index.js":16,"dup":15}],18:[function(require,module,exports){
'use strict';

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _jqueryI18next = require('jquery-i18next');

var _jqueryI18next2 = _interopRequireDefault(_jqueryI18next);

var _skillset = require('./modules/skillset');

var skillset = _interopRequireWildcard(_skillset);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

var english = require(".././locales/en.json");
var german = require(".././locales/de.json");

var resources = {
  en: english,
  de: german
};

function initSmoothScrolling() {
  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]').not('[href="#0"]').click(function (event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }
  });
}

function fadeInScrollTopButton() {
  if ($(window).scrollTop() > 250) {
    $('.back-to-top').fadeIn(400);
  } else {
    $('.back-to-top').fadeOut(400);
  }
}

var languageLookup = {
  "Deutsch": "de",
  "English": "en"
};

function switchLanguage(event) {
  var target = $(event.target);
  // if($(event.target).hasClass("active"))
  //   return;
  $("#languages .language").removeClass("active");
  target.addClass("active");
  _i18next2.default.changeLanguage(languageLookup[target.text()]);
  $("[data-i18n]").localize();
}

function addLanguageSwitchHandler() {
  $("#languages .language").click(switchLanguage);
}

function initJqueryI18next() {
  _i18next2.default.init({
    lng: 'en',
    debug: true,
    resources: resources
  }, function (err, t) {
    // initialized and ready to go!
  });

  _jqueryI18next2.default.init(_i18next2.default, $, {
    tName: 't', // --> appends $.t = i18next.t
    i18nName: 'i18n', // --> appends $.i18n = i18next
    handleName: 'localize', // --> appends $(selector).localize(opts);
    selectorAttr: 'data-i18n', // selector for translating elements
    targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
    optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
    useOptionsAttr: false, // see optionsAttr
    parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
  });
}

// DOM is ready
$(function () {
  initSmoothScrolling();
  initJqueryI18next();
  addLanguageSwitchHandler();
  skillset.init();
  $(window).scroll(fadeInScrollTopButton);
  $("#loader").removeClass("active");
});

},{".././locales/de.json":20,".././locales/en.json":21,"./modules/skillset":19,"i18next":15,"jquery-i18next":17}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
var data = {
    "nodes": [{
        "name": "Webdevelopment",
        "group": 0
    }, {
        "name": "Front-end",
        "group": 1
    }, {
        "name": "Back-end",
        "group": 2
    }, {
        "name": "CSS3",
        "group": 3
    }, {
        "name": "HTML5",
        "group": 1
    }, {
        "name": "Javascript",
        "group": 4
    }, {
        "name": "Less",
        "group": 3
    }, {
        "name": "Stylus",
        "group": 3
    }, {
        "name": "Pug",
        "group": 1
    }, {
        "name": "Bootstrap",
        "group": 3
    }, {
        "name": "Materialize",
        "group": 3
    }, {
        "name": "TypeScript",
        "group": 4
    }, {
        "name": "Task Runners",
        "group": 5
    }, {
        "name": "Gulp",
        "group": 5
    }, {
        "name": "npm scripts",
        "group": 5
    }, {
        "name": "Testing",
        "group": 6
    }, {
        "name": "Mocha",
        "group": 6
    }, {
        "name": "Jasmine",
        "group": 6
    }, {
        "name": "Sinon",
        "group": 6
    }, {
        "name": "Framework",
        "group": 7
    }, {
        "name": "Ampersand",
        "group": 7
    }, {
        "name": "Mithril",
        "group": 7
    }, {
        "name": "React",
        "group": 7
    }, {
        "name": "D3",
        "group": 7
    }, {
        "name": "General",
        "group": 8
    }, {
        "name": "Git",
        "group": 8
    }, {
        "name": "Github",
        "group": 8
    }, {
        "name": "Module Bundler",
        "group": 9
    }, {
        "name": "Browserify",
        "group": 9
    }],
    "links": [{
        "source": 0,
        "target": 1,
        "value": 1
    }, {
        "source": 0,
        "target": 2,
        "value": 1
    }, {
        "source": 1,
        "target": 3,
        "value": 1
    }, {
        "source": 1,
        "target": 4,
        "value": 1
    }, {
        "source": 1,
        "target": 5,
        "value": 1
    }, {
        "source": 3,
        "target": 6,
        "value": 1
    }, {
        "source": 3,
        "target": 7,
        "value": 1
    }, {
        "source": 4,
        "target": 8,
        "value": 1
    }, {
        "source": 3,
        "target": 9,
        "value": 1
    }, {
        "source": 3,
        "target": 10,
        "value": 1
    }, {
        "source": 5,
        "target": 11,
        "value": 1
    }, {
        "source": 5,
        "target": 12,
        "value": 1
    }, {
        "source": 12,
        "target": 13,
        "value": 1
    }, {
        "source": 12,
        "target": 14,
        "value": 1
    }, {
        "source": 5,
        "target": 15,
        "value": 1
    }, {
        "source": 15,
        "target": 16,
        "value": 1
    }, {
        "source": 15,
        "target": 17,
        "value": 1
    }, {
        "source": 15,
        "target": 18,
        "value": 1
    }, {
        "source": 5,
        "target": 19,
        "value": 1
    }, {
        "source": 19,
        "target": 20,
        "value": 1
    }, {
        "source": 19,
        "target": 21,
        "value": 1
    }, {
        "source": 19,
        "target": 22,
        "value": 1
    }, {
        "source": 19,
        "target": 23,
        "value": 1
    }, {
        "source": 0,
        "target": 24,
        "value": 1
    }, {
        "source": 24,
        "target": 25,
        "value": 1
    }, {
        "source": 24,
        "target": 26,
        "value": 1
    }, {
        "source": 5,
        "target": 27,
        "value": 1
    }, {
        "source": 27,
        "target": 28,
        "value": 1
    }]
};

function init() {

    //Constants for the SVG
    var width = $(".light").width(),
        height = $(".light").height();

    function dragstarted(d) {
        if (!d3.event.active) force.alphaTarget(0.5).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) force.alphaTarget(0.5);
        d.fx = null;
        d.fy = null;
    }

    //Set up the colour scale
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    //Set up the force layout
    var force = d3.forceSimulation().force("charge", d3.forceManyBody().strength(-700).distanceMin(100).distanceMax(1000)).force("link", d3.forceLink().id(function (d) {
        return d.index;
    })).force("center", d3.forceCenter(width / 2, height / 2)).force("y", d3.forceY(0.001)).force("x", d3.forceX(0.001));

    //Append a SVG to the body of the html page. Assign this SVG as an object to svg
    var svg = d3.select(".light").append("svg").attr("width", width).attr("height", height);

    force.nodes(data.nodes).force("link").links(data.links);

    var link = svg.selectAll(".link").data(data.links).enter().append("line").attr("class", "link").attr('marker-end', 'url(#arrowhead)');

    var node = svg.selectAll(".node").data(data.nodes).enter().append("g").attr("class", "node").call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

    node.append('circle').attr('r', 13).attr('fill', function (d) {
        return color(d.group);
    });

    node.append("text").attr("dx", 14).attr("dy", ".35em").text(function (d) {
        return d.name;
    }).style("stroke", "black");

    var padding = 1,
        // separation between circles
    radius = 8;
    function collide(alpha) {
        var quadtree = d3.quadtree(data.nodes);
        return function (d) {
            var rb = 2 * radius + padding,
                nx1 = d.x - rb,
                nx2 = d.x + rb,
                ny1 = d.y - rb,
                ny2 = d.y + rb;
            quadtree.visit(function (quad, x1, y1, x2, y2) {
                if (quad.point && quad.point !== d) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y);
                    if (l < rb) {
                        l = (l - rb) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }

    force.on("tick", function () {
        link.attr("x1", function (d) {
            return d.source.x;
        }).attr("y1", function (d) {
            return d.source.y;
        }).attr("x2", function (d) {
            return d.target.x;
        }).attr("y2", function (d) {
            return d.target.y;
        });
        node.each(collide(0.5)); //Added

        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    });
}

},{}],20:[function(require,module,exports){
module.exports={
  "nav": {
    "home": "Start",
    "projects": "Projekte",
    "aboutMe": "Über mich",
    "contact": "Kontakt"
  },
  "contact":{
    "thanks": "Danke fürs vorbeischauen!",
    "text": "Ich bin immer offen für einen kleinen Plausch, also kontaktiere mich ruhig.",
    "sayHi": "Sag Moin"
  }
}

},{}],21:[function(require,module,exports){
module.exports={
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "aboutMe": "About Me",
    "contact": "Contact"
  },
  "contact":{
    "thanks": "Thanks for coming by!",
    "text": "I’m always open for a chat so feel free to contact me.",
    "sayHi": "Say hi"
  }
}

},{}]},{},[18])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL0JhY2tlbmRDb25uZWN0b3IuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL0NhY2hlQ29ubmVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2kxOG5leHQvZGlzdC9jb21tb25qcy9FdmVudEVtaXR0ZXIuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL0ludGVycG9sYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9pMThuZXh0L2Rpc3QvY29tbW9uanMvTGFuZ3VhZ2VVdGlscy5qcyIsIm5vZGVfbW9kdWxlcy9pMThuZXh0L2Rpc3QvY29tbW9uanMvUGx1cmFsUmVzb2x2ZXIuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL1Jlc291cmNlU3RvcmUuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL1RyYW5zbGF0b3IuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL2RlZmF1bHRzLmpzIiwibm9kZV9tb2R1bGVzL2kxOG5leHQvZGlzdC9jb21tb25qcy9pMThuZXh0LmpzIiwibm9kZV9tb2R1bGVzL2kxOG5leHQvZGlzdC9jb21tb25qcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9pMThuZXh0L2Rpc3QvY29tbW9uanMvbG9nZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2kxOG5leHQvZGlzdC9jb21tb25qcy9wb3N0UHJvY2Vzc29yLmpzIiwibm9kZV9tb2R1bGVzL2kxOG5leHQvZGlzdC9jb21tb25qcy91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9pMThuZXh0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2pxdWVyeS1pMThuZXh0L2Rpc3QvY29tbW9uanMvaW5kZXguanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9tb2R1bGVzL3NraWxsc2V0LmpzIiwic3JjL2xvY2FsZXMvZGUuanNvbiIsInNyYy9sb2NhbGVzL2VuLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDM0hBOzs7O0FBQ0E7Ozs7QUFFQTs7SUFBWSxROzs7Ozs7QUFFWjs7QUFFQSxJQUFJLFVBQVUsUUFBUSxzQkFBUixDQUFkO0FBQ0EsSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBYjs7QUFFQSxJQUFJLFlBQVk7QUFDZCxNQUFJLE9BRFU7QUFFZCxNQUFJO0FBRlUsQ0FBaEI7O0FBS0EsU0FBUyxtQkFBVCxHQUE4QjtBQUM1QjtBQUNBLElBQUUsY0FBRjtBQUNFO0FBREYsR0FFRyxHQUZILENBRU8sWUFGUCxFQUdHLEdBSEgsQ0FHTyxhQUhQLEVBSUcsS0FKSCxDQUlTLFVBQVMsS0FBVCxFQUFnQjtBQUNyQjtBQUNBLFFBQ0UsU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWlDLEVBQWpDLEtBQXdDLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNkIsRUFBN0IsQ0FBeEMsSUFDQSxTQUFTLFFBQVQsSUFBcUIsS0FBSyxRQUY1QixFQUdFO0FBQ0E7QUFDQSxVQUFJLFNBQVMsRUFBRSxLQUFLLElBQVAsQ0FBYjtBQUNBLGVBQVMsT0FBTyxNQUFQLEdBQWdCLE1BQWhCLEdBQXlCLEVBQUUsV0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVgsR0FBZ0MsR0FBbEMsQ0FBbEM7QUFDQTtBQUNBLFVBQUksT0FBTyxNQUFYLEVBQW1CO0FBQ2pCO0FBQ0EsY0FBTSxjQUFOO0FBQ0EsVUFBRSxZQUFGLEVBQWdCLE9BQWhCLENBQXdCO0FBQ3RCLHFCQUFXLE9BQU8sTUFBUCxHQUFnQjtBQURMLFNBQXhCLEVBRUcsSUFGSCxFQUVTLFlBQVc7QUFDbEI7QUFDQTtBQUNBLGNBQUksVUFBVSxFQUFFLE1BQUYsQ0FBZDtBQUNBLGtCQUFRLEtBQVI7QUFDQSxjQUFJLFFBQVEsRUFBUixDQUFXLFFBQVgsQ0FBSixFQUEwQjtBQUFFO0FBQzFCLG1CQUFPLEtBQVA7QUFDRCxXQUZELE1BRU87QUFDTCxvQkFBUSxJQUFSLENBQWEsVUFBYixFQUF3QixJQUF4QixFQURLLENBQzBCO0FBQy9CLG9CQUFRLEtBQVIsR0FGSyxDQUVZO0FBQ2xCO0FBQ0YsU0FiRDtBQWNEO0FBQ0Y7QUFDRixHQWpDSDtBQWtDRDs7QUFFRCxTQUFTLHFCQUFULEdBQWdDO0FBQzlCLE1BQUksRUFBRSxNQUFGLEVBQVUsU0FBVixLQUF3QixHQUE1QixFQUFpQztBQUMvQixNQUFFLGNBQUYsRUFBa0IsTUFBbEIsQ0FBeUIsR0FBekI7QUFDRCxHQUZELE1BRU87QUFDTCxNQUFFLGNBQUYsRUFBa0IsT0FBbEIsQ0FBMEIsR0FBMUI7QUFDRDtBQUNGOztBQUVELElBQUksaUJBQWlCO0FBQ25CLGFBQVcsSUFEUTtBQUVuQixhQUFXO0FBRlEsQ0FBckI7O0FBS0EsU0FBUyxjQUFULENBQXdCLEtBQXhCLEVBQThCO0FBQzVCLE1BQUksU0FBUyxFQUFFLE1BQU0sTUFBUixDQUFiO0FBQ0E7QUFDQTtBQUNBLElBQUUsc0JBQUYsRUFBMEIsV0FBMUIsQ0FBc0MsUUFBdEM7QUFDQSxTQUFPLFFBQVAsQ0FBZ0IsUUFBaEI7QUFDQSxvQkFBUSxjQUFSLENBQXVCLGVBQWUsT0FBTyxJQUFQLEVBQWYsQ0FBdkI7QUFDQSxJQUFFLGFBQUYsRUFBaUIsUUFBakI7QUFDRDs7QUFFRCxTQUFTLHdCQUFULEdBQW1DO0FBQ2pDLElBQUUsc0JBQUYsRUFBMEIsS0FBMUIsQ0FBZ0MsY0FBaEM7QUFDRDs7QUFFRCxTQUFTLGlCQUFULEdBQTRCO0FBQzFCLG9CQUFRLElBQVIsQ0FBYTtBQUNYLFNBQUssSUFETTtBQUVYLFdBQU8sSUFGSTtBQUdYLGVBQVc7QUFIQSxHQUFiLEVBSUcsVUFBUyxHQUFULEVBQWMsQ0FBZCxFQUFpQjtBQUNsQjtBQUNELEdBTkQ7O0FBUUEsMEJBQWMsSUFBZCxvQkFBNEIsQ0FBNUIsRUFBK0I7QUFDN0IsV0FBTyxHQURzQixFQUNqQjtBQUNaLGNBQVUsTUFGbUIsRUFFWDtBQUNsQixnQkFBWSxVQUhpQixFQUdMO0FBQ3hCLGtCQUFjLFdBSmUsRUFJRjtBQUMzQixnQkFBWSxhQUxpQixFQUtGO0FBQzNCLGlCQUFhLGNBTmdCLEVBTUE7QUFDN0Isb0JBQWdCLEtBUGEsRUFPTjtBQUN2QixrQ0FBOEIsSUFSRCxDQVFNO0FBUk4sR0FBL0I7QUFVRDs7QUFFRDtBQUNBLEVBQUUsWUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFdBQVMsSUFBVDtBQUNBLElBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIscUJBQWpCO0FBQ0EsSUFBRSxTQUFGLEVBQWEsV0FBYixDQUF5QixRQUF6QjtBQUNELENBUEQ7Ozs7Ozs7O1FDc0dnQixJLEdBQUEsSTtBQTVNaEIsSUFBSSxPQUFPO0FBQ1AsYUFBUyxDQUFDO0FBQ04sZ0JBQVEsZ0JBREY7QUFFTixpQkFBUztBQUZILEtBQUQsRUFHUDtBQUNFLGdCQUFRLFdBRFY7QUFFRSxpQkFBUztBQUZYLEtBSE8sRUFNUDtBQUNFLGdCQUFRLFVBRFY7QUFFRSxpQkFBUztBQUZYLEtBTk8sRUFTUDtBQUNFLGdCQUFRLE1BRFY7QUFFRSxpQkFBUztBQUZYLEtBVE8sRUFZTjtBQUNDLGdCQUFRLE9BRFQ7QUFFQyxpQkFBUztBQUZWLEtBWk0sRUFlTjtBQUNDLGdCQUFRLFlBRFQ7QUFFQyxpQkFBUztBQUZWLEtBZk0sRUFrQlA7QUFDRSxnQkFBUSxNQURWO0FBRUUsaUJBQVM7QUFGWCxLQWxCTyxFQXFCTjtBQUNDLGdCQUFRLFFBRFQ7QUFFQyxpQkFBUztBQUZWLEtBckJNLEVBd0JOO0FBQ0MsZ0JBQVEsS0FEVDtBQUVDLGlCQUFTO0FBRlYsS0F4Qk0sRUEyQlA7QUFDRSxnQkFBUSxXQURWO0FBRUUsaUJBQVM7QUFGWCxLQTNCTyxFQThCTjtBQUNDLGdCQUFRLGFBRFQ7QUFFQyxpQkFBUztBQUZWLEtBOUJNLEVBaUNOO0FBQ0MsZ0JBQVEsWUFEVDtBQUVDLGlCQUFTO0FBRlYsS0FqQ00sRUFvQ047QUFDQyxnQkFBUSxjQURUO0FBRUMsaUJBQVM7QUFGVixLQXBDTSxFQXVDUDtBQUNFLGdCQUFRLE1BRFY7QUFFRSxpQkFBUztBQUZYLEtBdkNPLEVBMENOO0FBQ0MsZ0JBQVEsYUFEVDtBQUVDLGlCQUFTO0FBRlYsS0ExQ00sRUE2Q1A7QUFDRSxnQkFBUSxTQURWO0FBRUUsaUJBQVM7QUFGWCxLQTdDTyxFQWdEUDtBQUNFLGdCQUFRLE9BRFY7QUFFRSxpQkFBUztBQUZYLEtBaERPLEVBbURQO0FBQ0UsZ0JBQVEsU0FEVjtBQUVFLGlCQUFTO0FBRlgsS0FuRE8sRUFzRFA7QUFDRSxnQkFBUSxPQURWO0FBRUUsaUJBQVM7QUFGWCxLQXRETyxFQXlEUDtBQUNFLGdCQUFRLFdBRFY7QUFFRSxpQkFBUztBQUZYLEtBekRPLEVBNEROO0FBQ0MsZ0JBQVEsV0FEVDtBQUVDLGlCQUFTO0FBRlYsS0E1RE0sRUErRE47QUFDQyxnQkFBUSxTQURUO0FBRUMsaUJBQVM7QUFGVixLQS9ETSxFQWtFTjtBQUNDLGdCQUFRLE9BRFQ7QUFFQyxpQkFBUztBQUZWLEtBbEVNLEVBcUVOO0FBQ0MsZ0JBQVEsSUFEVDtBQUVDLGlCQUFTO0FBRlYsS0FyRU0sRUF3RU47QUFDQyxnQkFBUSxTQURUO0FBRUMsaUJBQVM7QUFGVixLQXhFTSxFQTJFUDtBQUNFLGdCQUFRLEtBRFY7QUFFRSxpQkFBUztBQUZYLEtBM0VPLEVBOEVOO0FBQ0MsZ0JBQVEsUUFEVDtBQUVDLGlCQUFTO0FBRlYsS0E5RU0sRUFpRlA7QUFDRSxnQkFBUSxnQkFEVjtBQUVFLGlCQUFTO0FBRlgsS0FqRk8sRUFvRlA7QUFDRSxnQkFBUSxZQURWO0FBRUUsaUJBQVM7QUFGWCxLQXBGTyxDQURGO0FBeUZQLGFBQVMsQ0FBQztBQUNOLGtCQUFVLENBREo7QUFFTixrQkFBVSxDQUZKO0FBR04saUJBQVM7QUFISCxLQUFELEVBSVA7QUFDRSxrQkFBVSxDQURaO0FBRUUsa0JBQVUsQ0FGWjtBQUdFLGlCQUFTO0FBSFgsS0FKTyxFQVFQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLENBRlo7QUFHRSxpQkFBUztBQUhYLEtBUk8sRUFZUDtBQUNFLGtCQUFVLENBRFo7QUFFRSxrQkFBVSxDQUZaO0FBR0UsaUJBQVM7QUFIWCxLQVpPLEVBZ0JQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLENBRlo7QUFHRSxpQkFBUztBQUhYLEtBaEJPLEVBb0JQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLENBRlo7QUFHRSxpQkFBUztBQUhYLEtBcEJPLEVBd0JQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLENBRlo7QUFHRSxpQkFBUztBQUhYLEtBeEJPLEVBNEJQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLENBRlo7QUFHRSxpQkFBUztBQUhYLEtBNUJPLEVBZ0NQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLENBRlo7QUFHRSxpQkFBUztBQUhYLEtBaENPLEVBb0NQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBcENPLEVBd0NQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBeENPLEVBNENQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBNUNPLEVBZ0RQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBaERPLEVBb0RQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBcERPLEVBd0RQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBeERPLEVBNERQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBNURPLEVBZ0VQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBaEVPLEVBb0VQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBcEVPLEVBd0VQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBeEVPLEVBNEVQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBNUVPLEVBZ0ZQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBaEZPLEVBb0ZQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBcEZPLEVBd0ZQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBeEZPLEVBNEZQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBNUZPLEVBZ0dQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBaEdPLEVBb0dQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBcEdPLEVBd0dQO0FBQ0Usa0JBQVUsQ0FEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBeEdPLEVBNEdQO0FBQ0Usa0JBQVUsRUFEWjtBQUVFLGtCQUFVLEVBRlo7QUFHRSxpQkFBUztBQUhYLEtBNUdPO0FBekZGLENBQVg7O0FBNE1PLFNBQVMsSUFBVCxHQUFlOztBQUd0QjtBQUNBLFFBQUksUUFBUSxFQUFFLFFBQUYsRUFBWSxLQUFaLEVBQVo7QUFBQSxRQUNJLFNBQVMsRUFBRSxRQUFGLEVBQVksTUFBWixFQURiOztBQUdBLGFBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUNwQixZQUFJLENBQUMsR0FBRyxLQUFILENBQVMsTUFBZCxFQUFzQixNQUFNLFdBQU4sQ0FBa0IsR0FBbEIsRUFBdUIsT0FBdkI7QUFDdEIsVUFBRSxFQUFGLEdBQU8sRUFBRSxDQUFUO0FBQ0EsVUFBRSxFQUFGLEdBQU8sRUFBRSxDQUFUO0FBQ0g7O0FBRUQsYUFBUyxPQUFULENBQWlCLENBQWpCLEVBQW9CO0FBQ2hCLFVBQUUsRUFBRixHQUFPLEdBQUcsS0FBSCxDQUFTLENBQWhCO0FBQ0EsVUFBRSxFQUFGLEdBQU8sR0FBRyxLQUFILENBQVMsQ0FBaEI7QUFDSDs7QUFFRCxhQUFTLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0I7QUFDbEIsWUFBSSxDQUFDLEdBQUcsS0FBSCxDQUFTLE1BQWQsRUFBc0IsTUFBTSxXQUFOLENBQWtCLEdBQWxCO0FBQ3RCLFVBQUUsRUFBRixHQUFPLElBQVA7QUFDQSxVQUFFLEVBQUYsR0FBTyxJQUFQO0FBQ0g7O0FBRUQ7QUFDQSxRQUFJLFFBQVEsR0FBRyxZQUFILENBQWdCLEdBQUcsZ0JBQW5CLENBQVo7O0FBRUE7QUFDQSxRQUFJLFFBQVEsR0FBRyxlQUFILEdBQ1AsS0FETyxDQUNELFFBREMsRUFDUyxHQUFHLGFBQUgsR0FBbUIsUUFBbkIsQ0FBNEIsQ0FBQyxHQUE3QixFQUFrQyxXQUFsQyxDQUE4QyxHQUE5QyxFQUFtRCxXQUFuRCxDQUErRCxJQUEvRCxDQURULEVBRVAsS0FGTyxDQUVELE1BRkMsRUFFTyxHQUFHLFNBQUgsR0FBZSxFQUFmLENBQWtCLFVBQVUsQ0FBVixFQUFhO0FBQUUsZUFBTyxFQUFFLEtBQVQ7QUFBZ0IsS0FBakQsQ0FGUCxFQUdQLEtBSE8sQ0FHRCxRQUhDLEVBR1MsR0FBRyxXQUFILENBQWUsUUFBUSxDQUF2QixFQUEwQixTQUFTLENBQW5DLENBSFQsRUFJUCxLQUpPLENBSUQsR0FKQyxFQUlJLEdBQUcsTUFBSCxDQUFVLEtBQVYsQ0FKSixFQUtQLEtBTE8sQ0FLRCxHQUxDLEVBS0ksR0FBRyxNQUFILENBQVUsS0FBVixDQUxKLENBQVo7O0FBT0E7QUFDQSxRQUFJLE1BQU0sR0FBRyxNQUFILENBQVUsUUFBVixFQUFvQixNQUFwQixDQUEyQixLQUEzQixFQUNMLElBREssQ0FDQSxPQURBLEVBQ1MsS0FEVCxFQUVMLElBRkssQ0FFQSxRQUZBLEVBRVUsTUFGVixDQUFWOztBQUlBLFVBQ0ssS0FETCxDQUNXLEtBQUssS0FEaEIsRUFFSyxLQUZMLENBRVcsTUFGWCxFQUVtQixLQUZuQixDQUV5QixLQUFLLEtBRjlCOztBQUlBLFFBQUksT0FBTyxJQUFJLFNBQUosQ0FBYyxPQUFkLEVBQ04sSUFETSxDQUNELEtBQUssS0FESixFQUVOLEtBRk0sR0FHTixNQUhNLENBR0MsTUFIRCxFQUlOLElBSk0sQ0FJRCxPQUpDLEVBSVEsTUFKUixFQUtOLElBTE0sQ0FLRCxZQUxDLEVBS2EsaUJBTGIsQ0FBWDs7QUFPQSxRQUFJLE9BQU8sSUFBSSxTQUFKLENBQWMsT0FBZCxFQUNOLElBRE0sQ0FDRCxLQUFLLEtBREosRUFFTixLQUZNLEdBRUUsTUFGRixDQUVTLEdBRlQsRUFHTixJQUhNLENBR0QsT0FIQyxFQUdRLE1BSFIsRUFJTixJQUpNLENBSUQsR0FBRyxJQUFILEdBQ0QsRUFEQyxDQUNFLE9BREYsRUFDVyxXQURYLEVBRUQsRUFGQyxDQUVFLE1BRkYsRUFFVSxPQUZWLEVBR0QsRUFIQyxDQUdFLEtBSEYsRUFHUyxTQUhULENBSkMsQ0FBWDs7QUFTQSxTQUFLLE1BQUwsQ0FBWSxRQUFaLEVBQ0ssSUFETCxDQUNVLEdBRFYsRUFDZSxFQURmLEVBRUssSUFGTCxDQUVVLE1BRlYsRUFFa0IsVUFBVSxDQUFWLEVBQWE7QUFDdkIsZUFBTyxNQUFNLEVBQUUsS0FBUixDQUFQO0FBQ0gsS0FKTDs7QUFNQSxTQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQ08sSUFEUCxDQUNZLElBRFosRUFDa0IsRUFEbEIsRUFFTyxJQUZQLENBRVksSUFGWixFQUVrQixPQUZsQixFQUdPLElBSFAsQ0FHWSxVQUFTLENBQVQsRUFBWTtBQUFFLGVBQU8sRUFBRSxJQUFUO0FBQWUsS0FIekMsRUFJTyxLQUpQLENBSWEsUUFKYixFQUl1QixPQUp2Qjs7QUFNQSxRQUFJLFVBQVUsQ0FBZDtBQUFBLFFBQWlCO0FBQ2IsYUFBTyxDQURYO0FBRUEsYUFBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCO0FBQ3RCLFlBQUksV0FBVyxHQUFHLFFBQUgsQ0FBWSxLQUFLLEtBQWpCLENBQWY7QUFDQSxlQUFPLFVBQVMsQ0FBVCxFQUFZO0FBQ2pCLGdCQUFJLEtBQUssSUFBRSxNQUFGLEdBQVcsT0FBcEI7QUFBQSxnQkFDSSxNQUFNLEVBQUUsQ0FBRixHQUFNLEVBRGhCO0FBQUEsZ0JBRUksTUFBTSxFQUFFLENBQUYsR0FBTSxFQUZoQjtBQUFBLGdCQUdJLE1BQU0sRUFBRSxDQUFGLEdBQU0sRUFIaEI7QUFBQSxnQkFJSSxNQUFNLEVBQUUsQ0FBRixHQUFNLEVBSmhCO0FBS0EscUJBQVMsS0FBVCxDQUFlLFVBQVMsSUFBVCxFQUFlLEVBQWYsRUFBbUIsRUFBbkIsRUFBdUIsRUFBdkIsRUFBMkIsRUFBM0IsRUFBK0I7QUFDNUMsb0JBQUksS0FBSyxLQUFMLElBQWUsS0FBSyxLQUFMLEtBQWUsQ0FBbEMsRUFBc0M7QUFDcEMsd0JBQUksSUFBSSxFQUFFLENBQUYsR0FBTSxLQUFLLEtBQUwsQ0FBVyxDQUF6QjtBQUFBLHdCQUNJLElBQUksRUFBRSxDQUFGLEdBQU0sS0FBSyxLQUFMLENBQVcsQ0FEekI7QUFBQSx3QkFFSSxJQUFJLEtBQUssSUFBTCxDQUFVLElBQUksQ0FBSixHQUFRLElBQUksQ0FBdEIsQ0FGUjtBQUdFLHdCQUFJLElBQUksRUFBUixFQUFZO0FBQ1osNEJBQUksQ0FBQyxJQUFJLEVBQUwsSUFBVyxDQUFYLEdBQWUsS0FBbkI7QUFDQSwwQkFBRSxDQUFGLElBQU8sS0FBSyxDQUFaO0FBQ0EsMEJBQUUsQ0FBRixJQUFPLEtBQUssQ0FBWjtBQUNBLDZCQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLENBQWhCO0FBQ0EsNkJBQUssS0FBTCxDQUFXLENBQVgsSUFBZ0IsQ0FBaEI7QUFDRDtBQUNGO0FBQ0QsdUJBQU8sS0FBSyxHQUFMLElBQVksS0FBSyxHQUFqQixJQUF3QixLQUFLLEdBQTdCLElBQW9DLEtBQUssR0FBaEQ7QUFDRCxhQWREO0FBZUQsU0FyQkQ7QUFzQkQ7O0FBRUQsVUFBTSxFQUFOLENBQVMsTUFBVCxFQUFpQixZQUFZO0FBQ3pCLGFBQUssSUFBTCxDQUFVLElBQVYsRUFBZ0IsVUFBVSxDQUFWLEVBQWE7QUFDekIsbUJBQU8sRUFBRSxNQUFGLENBQVMsQ0FBaEI7QUFDSCxTQUZELEVBR0ssSUFITCxDQUdVLElBSFYsRUFHZ0IsVUFBVSxDQUFWLEVBQWE7QUFDckIsbUJBQU8sRUFBRSxNQUFGLENBQVMsQ0FBaEI7QUFDSCxTQUxMLEVBTUssSUFOTCxDQU1VLElBTlYsRUFNZ0IsVUFBVSxDQUFWLEVBQWE7QUFDckIsbUJBQU8sRUFBRSxNQUFGLENBQVMsQ0FBaEI7QUFDSCxTQVJMLEVBU0ssSUFUTCxDQVNVLElBVFYsRUFTZ0IsVUFBVSxDQUFWLEVBQWE7QUFDckIsbUJBQU8sRUFBRSxNQUFGLENBQVMsQ0FBaEI7QUFDSCxTQVhMO0FBWUYsYUFBSyxJQUFMLENBQVUsUUFBUSxHQUFSLENBQVYsRUFiMkIsQ0FhRjs7QUFFdkIsYUFBSyxJQUFMLENBQVUsV0FBVixFQUF1QixVQUFVLENBQVYsRUFBYTtBQUNoQyxtQkFBTyxlQUFlLEVBQUUsQ0FBakIsR0FBcUIsR0FBckIsR0FBMkIsRUFBRSxDQUE3QixHQUFpQyxHQUF4QztBQUNILFNBRkQ7QUFHSCxLQWxCRDtBQW9CQzs7O0FDcFVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcblxudmFyIHV0aWxzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzKTtcblxudmFyIF9sb2dnZXIgPSByZXF1aXJlKCcuL2xvZ2dlci5qcycpO1xuXG52YXIgX2xvZ2dlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sb2dnZXIpO1xuXG52YXIgX0V2ZW50RW1pdHRlcjIgPSByZXF1aXJlKCcuL0V2ZW50RW1pdHRlci5qcycpO1xuXG52YXIgX0V2ZW50RW1pdHRlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FdmVudEVtaXR0ZXIyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2RlZmF1bHRzKG9iaiwgZGVmYXVsdHMpIHsgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkZWZhdWx0cyk7IGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykgeyB2YXIga2V5ID0ga2V5c1tpXTsgdmFyIHZhbHVlID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkZWZhdWx0cywga2V5KTsgaWYgKHZhbHVlICYmIHZhbHVlLmNvbmZpZ3VyYWJsZSAmJiBvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpOyB9IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBfZGVmYXVsdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIHJlbW92ZShhcnIsIHdoYXQpIHtcbiAgdmFyIGZvdW5kID0gYXJyLmluZGV4T2Yod2hhdCk7XG5cbiAgd2hpbGUgKGZvdW5kICE9PSAtMSkge1xuICAgIGFyci5zcGxpY2UoZm91bmQsIDEpO1xuICAgIGZvdW5kID0gYXJyLmluZGV4T2Yod2hhdCk7XG4gIH1cbn1cblxudmFyIENvbm5lY3RvciA9IGZ1bmN0aW9uIChfRXZlbnRFbWl0dGVyKSB7XG4gIF9pbmhlcml0cyhDb25uZWN0b3IsIF9FdmVudEVtaXR0ZXIpO1xuXG4gIGZ1bmN0aW9uIENvbm5lY3RvcihiYWNrZW5kLCBzdG9yZSwgc2VydmljZXMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29ubmVjdG9yKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9FdmVudEVtaXR0ZXIuY2FsbCh0aGlzKSk7XG5cbiAgICBfdGhpcy5iYWNrZW5kID0gYmFja2VuZDtcbiAgICBfdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgIF90aGlzLmxhbmd1YWdlVXRpbHMgPSBzZXJ2aWNlcy5sYW5ndWFnZVV0aWxzO1xuICAgIF90aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIF90aGlzLmxvZ2dlciA9IF9sb2dnZXIyLmRlZmF1bHQuY3JlYXRlKCdiYWNrZW5kQ29ubmVjdG9yJyk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHt9O1xuICAgIF90aGlzLnF1ZXVlID0gW107XG5cbiAgICBpZiAoX3RoaXMuYmFja2VuZCAmJiBfdGhpcy5iYWNrZW5kLmluaXQpIHtcbiAgICAgIF90aGlzLmJhY2tlbmQuaW5pdChzZXJ2aWNlcywgb3B0aW9ucy5iYWNrZW5kLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgQ29ubmVjdG9yLnByb3RvdHlwZS5xdWV1ZUxvYWQgPSBmdW5jdGlvbiBxdWV1ZUxvYWQobGFuZ3VhZ2VzLCBuYW1lc3BhY2VzLCBjYWxsYmFjaykge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgLy8gZmluZCB3aGF0IG5lZWRzIHRvIGJlIGxvYWRlZFxuICAgIHZhciB0b0xvYWQgPSBbXTtcbiAgICB2YXIgcGVuZGluZyA9IFtdO1xuICAgIHZhciB0b0xvYWRMYW5ndWFnZXMgPSBbXTtcbiAgICB2YXIgdG9Mb2FkTmFtZXNwYWNlcyA9IFtdO1xuXG4gICAgbGFuZ3VhZ2VzLmZvckVhY2goZnVuY3Rpb24gKGxuZykge1xuICAgICAgdmFyIGhhc0FsbE5hbWVzcGFjZXMgPSB0cnVlO1xuXG4gICAgICBuYW1lc3BhY2VzLmZvckVhY2goZnVuY3Rpb24gKG5zKSB7XG4gICAgICAgIHZhciBuYW1lID0gbG5nICsgJ3wnICsgbnM7XG5cbiAgICAgICAgaWYgKF90aGlzMi5zdG9yZS5oYXNSZXNvdXJjZUJ1bmRsZShsbmcsIG5zKSkge1xuICAgICAgICAgIF90aGlzMi5zdGF0ZVtuYW1lXSA9IDI7IC8vIGxvYWRlZFxuICAgICAgICB9IGVsc2UgaWYgKF90aGlzMi5zdGF0ZVtuYW1lXSA8IDApIHtcbiAgICAgICAgICAvLyBub3RoaW5nIHRvIGRvIGZvciBlcnJcbiAgICAgICAgfSBlbHNlIGlmIChfdGhpczIuc3RhdGVbbmFtZV0gPT09IDEpIHtcbiAgICAgICAgICBpZiAocGVuZGluZy5pbmRleE9mKG5hbWUpIDwgMCkgcGVuZGluZy5wdXNoKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzMi5zdGF0ZVtuYW1lXSA9IDE7IC8vIHBlbmRpbmdcblxuICAgICAgICAgIGhhc0FsbE5hbWVzcGFjZXMgPSBmYWxzZTtcblxuICAgICAgICAgIGlmIChwZW5kaW5nLmluZGV4T2YobmFtZSkgPCAwKSBwZW5kaW5nLnB1c2gobmFtZSk7XG4gICAgICAgICAgaWYgKHRvTG9hZC5pbmRleE9mKG5hbWUpIDwgMCkgdG9Mb2FkLnB1c2gobmFtZSk7XG4gICAgICAgICAgaWYgKHRvTG9hZE5hbWVzcGFjZXMuaW5kZXhPZihucykgPCAwKSB0b0xvYWROYW1lc3BhY2VzLnB1c2gobnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFoYXNBbGxOYW1lc3BhY2VzKSB0b0xvYWRMYW5ndWFnZXMucHVzaChsbmcpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRvTG9hZC5sZW5ndGggfHwgcGVuZGluZy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucXVldWUucHVzaCh7XG4gICAgICAgIHBlbmRpbmc6IHBlbmRpbmcsXG4gICAgICAgIGxvYWRlZDoge30sXG4gICAgICAgIGVycm9yczogW10sXG4gICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvTG9hZDogdG9Mb2FkLFxuICAgICAgcGVuZGluZzogcGVuZGluZyxcbiAgICAgIHRvTG9hZExhbmd1YWdlczogdG9Mb2FkTGFuZ3VhZ2VzLFxuICAgICAgdG9Mb2FkTmFtZXNwYWNlczogdG9Mb2FkTmFtZXNwYWNlc1xuICAgIH07XG4gIH07XG5cbiAgQ29ubmVjdG9yLnByb3RvdHlwZS5sb2FkZWQgPSBmdW5jdGlvbiBsb2FkZWQobmFtZSwgZXJyLCBkYXRhKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICB2YXIgX25hbWUkc3BsaXQgPSBuYW1lLnNwbGl0KCd8JyksXG4gICAgICAgIF9uYW1lJHNwbGl0MiA9IF9zbGljZWRUb0FycmF5KF9uYW1lJHNwbGl0LCAyKSxcbiAgICAgICAgbG5nID0gX25hbWUkc3BsaXQyWzBdLFxuICAgICAgICBucyA9IF9uYW1lJHNwbGl0MlsxXTtcblxuICAgIGlmIChlcnIpIHRoaXMuZW1pdCgnZmFpbGVkTG9hZGluZycsIGxuZywgbnMsIGVycik7XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgdGhpcy5zdG9yZS5hZGRSZXNvdXJjZUJ1bmRsZShsbmcsIG5zLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgbG9hZGVkXG4gICAgdGhpcy5zdGF0ZVtuYW1lXSA9IGVyciA/IC0xIDogMjtcblxuICAgIC8vIGNhbGxiYWNrIGlmIHJlYWR5XG4gICAgdGhpcy5xdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChxKSB7XG4gICAgICB1dGlscy5wdXNoUGF0aChxLmxvYWRlZCwgW2xuZ10sIG5zKTtcbiAgICAgIHJlbW92ZShxLnBlbmRpbmcsIG5hbWUpO1xuXG4gICAgICBpZiAoZXJyKSBxLmVycm9ycy5wdXNoKGVycik7XG5cbiAgICAgIGlmIChxLnBlbmRpbmcubGVuZ3RoID09PSAwICYmICFxLmRvbmUpIHtcbiAgICAgICAgX3RoaXMzLmVtaXQoJ2xvYWRlZCcsIHEubG9hZGVkKTtcbiAgICAgICAgLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOiAwICovXG4gICAgICAgIHEuZG9uZSA9IHRydWU7XG4gICAgICAgIGlmIChxLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICBxLmNhbGxiYWNrKHEuZXJyb3JzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBxLmNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSBkb25lIGxvYWQgcmVxdWVzdHNcbiAgICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS5maWx0ZXIoZnVuY3Rpb24gKHEpIHtcbiAgICAgIHJldHVybiAhcS5kb25lO1xuICAgIH0pO1xuICB9O1xuXG4gIENvbm5lY3Rvci5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIHJlYWQobG5nLCBucywgZmNOYW1lKSB7XG4gICAgdmFyIHRyaWVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiAwO1xuXG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICB2YXIgd2FpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogMjUwO1xuICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1s1XTtcblxuICAgIGlmICghbG5nLmxlbmd0aCkgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHt9KTsgLy8gbm90aW5nIHRvIGxvYWRcblxuICAgIHJldHVybiB0aGlzLmJhY2tlbmRbZmNOYW1lXShsbmcsIG5zLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICBpZiAoZXJyICYmIGRhdGEgLyogPSByZXRyeUZsYWcgKi8gJiYgdHJpZWQgPCA1KSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzNC5yZWFkLmNhbGwoX3RoaXM0LCBsbmcsIG5zLCBmY05hbWUsIHRyaWVkICsgMSwgd2FpdCAqIDIsIGNhbGxiYWNrKTtcbiAgICAgICAgfSwgd2FpdCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGVyciwgZGF0YSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyogZXNsaW50IGNvbnNpc3RlbnQtcmV0dXJuOiAwICovXG5cblxuICBDb25uZWN0b3IucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiBsb2FkKGxhbmd1YWdlcywgbmFtZXNwYWNlcywgY2FsbGJhY2spIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgIGlmICghdGhpcy5iYWNrZW5kKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKCdObyBiYWNrZW5kIHdhcyBhZGRlZCB2aWEgaTE4bmV4dC51c2UuIFdpbGwgbm90IGxvYWQgcmVzb3VyY2VzLicpO1xuICAgICAgcmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHZhciBvcHRpb25zID0gX2V4dGVuZHMoe30sIHRoaXMuYmFja2VuZC5vcHRpb25zLCB0aGlzLm9wdGlvbnMuYmFja2VuZCk7XG5cbiAgICBpZiAodHlwZW9mIGxhbmd1YWdlcyA9PT0gJ3N0cmluZycpIGxhbmd1YWdlcyA9IHRoaXMubGFuZ3VhZ2VVdGlscy50b1Jlc29sdmVIaWVyYXJjaHkobGFuZ3VhZ2VzKTtcbiAgICBpZiAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnKSBuYW1lc3BhY2VzID0gW25hbWVzcGFjZXNdO1xuXG4gICAgdmFyIHRvTG9hZCA9IHRoaXMucXVldWVMb2FkKGxhbmd1YWdlcywgbmFtZXNwYWNlcywgY2FsbGJhY2spO1xuICAgIGlmICghdG9Mb2FkLnRvTG9hZC5sZW5ndGgpIHtcbiAgICAgIGlmICghdG9Mb2FkLnBlbmRpbmcubGVuZ3RoKSBjYWxsYmFjaygpOyAvLyBub3RoaW5nIHRvIGxvYWQgYW5kIG5vIHBlbmRpbmdzLi4uY2FsbGJhY2sgbm93XG4gICAgICByZXR1cm4gbnVsbDsgLy8gcGVuZGluZ3Mgd2lsbCB0cmlnZ2VyIGNhbGxiYWNrXG4gICAgfVxuXG4gICAgLy8gbG9hZCB3aXRoIG11bHRpLWxvYWRcbiAgICBpZiAob3B0aW9ucy5hbGxvd011bHRpTG9hZGluZyAmJiB0aGlzLmJhY2tlbmQucmVhZE11bHRpKSB7XG4gICAgICB0aGlzLnJlYWQodG9Mb2FkLnRvTG9hZExhbmd1YWdlcywgdG9Mb2FkLnRvTG9hZE5hbWVzcGFjZXMsICdyZWFkTXVsdGknLCBudWxsLCBudWxsLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIF90aGlzNS5sb2dnZXIud2FybignbG9hZGluZyBuYW1lc3BhY2VzICcgKyB0b0xvYWQudG9Mb2FkTmFtZXNwYWNlcy5qb2luKCcsICcpICsgJyBmb3IgbGFuZ3VhZ2VzICcgKyB0b0xvYWQudG9Mb2FkTGFuZ3VhZ2VzLmpvaW4oJywgJykgKyAnIHZpYSBtdWx0aWxvYWRpbmcgZmFpbGVkJywgZXJyKTtcbiAgICAgICAgaWYgKCFlcnIgJiYgZGF0YSkgX3RoaXM1LmxvZ2dlci5sb2coJ3N1Y2Nlc3NmdWxseSBsb2FkZWQgbmFtZXNwYWNlcyAnICsgdG9Mb2FkLnRvTG9hZE5hbWVzcGFjZXMuam9pbignLCAnKSArICcgZm9yIGxhbmd1YWdlcyAnICsgdG9Mb2FkLnRvTG9hZExhbmd1YWdlcy5qb2luKCcsICcpICsgJyB2aWEgbXVsdGlsb2FkaW5nJywgZGF0YSk7XG5cbiAgICAgICAgdG9Mb2FkLnRvTG9hZC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgdmFyIF9uYW1lJHNwbGl0MyA9IG5hbWUuc3BsaXQoJ3wnKSxcbiAgICAgICAgICAgICAgX25hbWUkc3BsaXQ0ID0gX3NsaWNlZFRvQXJyYXkoX25hbWUkc3BsaXQzLCAyKSxcbiAgICAgICAgICAgICAgbCA9IF9uYW1lJHNwbGl0NFswXSxcbiAgICAgICAgICAgICAgbiA9IF9uYW1lJHNwbGl0NFsxXTtcblxuICAgICAgICAgIHZhciBidW5kbGUgPSB1dGlscy5nZXRQYXRoKGRhdGEsIFtsLCBuXSk7XG4gICAgICAgICAgaWYgKGJ1bmRsZSkge1xuICAgICAgICAgICAgX3RoaXM1LmxvYWRlZChuYW1lLCBlcnIsIGJ1bmRsZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBlcnJvciA9ICdsb2FkaW5nIG5hbWVzcGFjZSAnICsgbiArICcgZm9yIGxhbmd1YWdlICcgKyBsICsgJyB2aWEgbXVsdGlsb2FkaW5nIGZhaWxlZCc7XG4gICAgICAgICAgICBfdGhpczUubG9hZGVkKG5hbWUsIGVycm9yKTtcbiAgICAgICAgICAgIF90aGlzNS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9Mb2FkLnRvTG9hZC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIF90aGlzNS5sb2FkT25lKG5hbWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIENvbm5lY3Rvci5wcm90b3R5cGUucmVsb2FkID0gZnVuY3Rpb24gcmVsb2FkKGxhbmd1YWdlcywgbmFtZXNwYWNlcykge1xuICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgaWYgKCF0aGlzLmJhY2tlbmQpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ05vIGJhY2tlbmQgd2FzIGFkZGVkIHZpYSBpMThuZXh0LnVzZS4gV2lsbCBub3QgbG9hZCByZXNvdXJjZXMuJyk7XG4gICAgfVxuICAgIHZhciBvcHRpb25zID0gX2V4dGVuZHMoe30sIHRoaXMuYmFja2VuZC5vcHRpb25zLCB0aGlzLm9wdGlvbnMuYmFja2VuZCk7XG5cbiAgICBpZiAodHlwZW9mIGxhbmd1YWdlcyA9PT0gJ3N0cmluZycpIGxhbmd1YWdlcyA9IHRoaXMubGFuZ3VhZ2VVdGlscy50b1Jlc29sdmVIaWVyYXJjaHkobGFuZ3VhZ2VzKTtcbiAgICBpZiAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnKSBuYW1lc3BhY2VzID0gW25hbWVzcGFjZXNdO1xuXG4gICAgLy8gbG9hZCB3aXRoIG11bHRpLWxvYWRcbiAgICBpZiAob3B0aW9ucy5hbGxvd011bHRpTG9hZGluZyAmJiB0aGlzLmJhY2tlbmQucmVhZE11bHRpKSB7XG4gICAgICB0aGlzLnJlYWQobGFuZ3VhZ2VzLCBuYW1lc3BhY2VzLCAncmVhZE11bHRpJywgbnVsbCwgbnVsbCwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSBfdGhpczYubG9nZ2VyLndhcm4oJ3JlbG9hZGluZyBuYW1lc3BhY2VzICcgKyBuYW1lc3BhY2VzLmpvaW4oJywgJykgKyAnIGZvciBsYW5ndWFnZXMgJyArIGxhbmd1YWdlcy5qb2luKCcsICcpICsgJyB2aWEgbXVsdGlsb2FkaW5nIGZhaWxlZCcsIGVycik7XG4gICAgICAgIGlmICghZXJyICYmIGRhdGEpIF90aGlzNi5sb2dnZXIubG9nKCdzdWNjZXNzZnVsbHkgcmVsb2FkZWQgbmFtZXNwYWNlcyAnICsgbmFtZXNwYWNlcy5qb2luKCcsICcpICsgJyBmb3IgbGFuZ3VhZ2VzICcgKyBsYW5ndWFnZXMuam9pbignLCAnKSArICcgdmlhIG11bHRpbG9hZGluZycsIGRhdGEpO1xuXG4gICAgICAgIGxhbmd1YWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgbmFtZXNwYWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICB2YXIgYnVuZGxlID0gdXRpbHMuZ2V0UGF0aChkYXRhLCBbbCwgbl0pO1xuICAgICAgICAgICAgaWYgKGJ1bmRsZSkge1xuICAgICAgICAgICAgICBfdGhpczYubG9hZGVkKGwgKyAnfCcgKyBuLCBlcnIsIGJ1bmRsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgZXJyb3IgPSAncmVsb2FkaW5nIG5hbWVzcGFjZSAnICsgbiArICcgZm9yIGxhbmd1YWdlICcgKyBsICsgJyB2aWEgbXVsdGlsb2FkaW5nIGZhaWxlZCc7XG4gICAgICAgICAgICAgIF90aGlzNi5sb2FkZWQobCArICd8JyArIG4sIGVycm9yKTtcbiAgICAgICAgICAgICAgX3RoaXM2LmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhbmd1YWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgIG5hbWVzcGFjZXMuZm9yRWFjaChmdW5jdGlvbiAobikge1xuICAgICAgICAgIF90aGlzNi5sb2FkT25lKGwgKyAnfCcgKyBuLCAncmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgQ29ubmVjdG9yLnByb3RvdHlwZS5sb2FkT25lID0gZnVuY3Rpb24gbG9hZE9uZShuYW1lKSB7XG4gICAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgICB2YXIgcHJlZml4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnJztcblxuICAgIHZhciBfbmFtZSRzcGxpdDUgPSBuYW1lLnNwbGl0KCd8JyksXG4gICAgICAgIF9uYW1lJHNwbGl0NiA9IF9zbGljZWRUb0FycmF5KF9uYW1lJHNwbGl0NSwgMiksXG4gICAgICAgIGxuZyA9IF9uYW1lJHNwbGl0NlswXSxcbiAgICAgICAgbnMgPSBfbmFtZSRzcGxpdDZbMV07XG5cbiAgICB0aGlzLnJlYWQobG5nLCBucywgJ3JlYWQnLCBudWxsLCBudWxsLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICBpZiAoZXJyKSBfdGhpczcubG9nZ2VyLndhcm4ocHJlZml4ICsgJ2xvYWRpbmcgbmFtZXNwYWNlICcgKyBucyArICcgZm9yIGxhbmd1YWdlICcgKyBsbmcgKyAnIGZhaWxlZCcsIGVycik7XG4gICAgICBpZiAoIWVyciAmJiBkYXRhKSBfdGhpczcubG9nZ2VyLmxvZyhwcmVmaXggKyAnbG9hZGVkIG5hbWVzcGFjZSAnICsgbnMgKyAnIGZvciBsYW5ndWFnZSAnICsgbG5nLCBkYXRhKTtcblxuICAgICAgX3RoaXM3LmxvYWRlZChuYW1lLCBlcnIsIGRhdGEpO1xuICAgIH0pO1xuICB9O1xuXG4gIENvbm5lY3Rvci5wcm90b3R5cGUuc2F2ZU1pc3NpbmcgPSBmdW5jdGlvbiBzYXZlTWlzc2luZyhsYW5ndWFnZXMsIG5hbWVzcGFjZSwga2V5LCBmYWxsYmFja1ZhbHVlLCBpc1VwZGF0ZSkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgYXJndW1lbnRzWzVdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNV0gOiB7fTtcblxuICAgIGlmICh0aGlzLmJhY2tlbmQgJiYgdGhpcy5iYWNrZW5kLmNyZWF0ZSkge1xuICAgICAgdGhpcy5iYWNrZW5kLmNyZWF0ZShsYW5ndWFnZXMsIG5hbWVzcGFjZSwga2V5LCBmYWxsYmFja1ZhbHVlLCBudWxsIC8qIHVudXNlZCBjYWxsYmFjayAqLywgX2V4dGVuZHMoe30sIG9wdGlvbnMsIHsgaXNVcGRhdGU6IGlzVXBkYXRlIH0pKTtcbiAgICB9XG5cbiAgICAvLyB3cml0ZSB0byBzdG9yZSB0byBhdm9pZCByZXNlbmRpbmdcbiAgICBpZiAoIWxhbmd1YWdlcyB8fCAhbGFuZ3VhZ2VzWzBdKSByZXR1cm47XG4gICAgdGhpcy5zdG9yZS5hZGRSZXNvdXJjZShsYW5ndWFnZXNbMF0sIG5hbWVzcGFjZSwga2V5LCBmYWxsYmFja1ZhbHVlKTtcbiAgfTtcblxuICByZXR1cm4gQ29ubmVjdG9yO1xufShfRXZlbnRFbWl0dGVyMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ29ubmVjdG9yOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9sb2dnZXIgPSByZXF1aXJlKCcuL2xvZ2dlci5qcycpO1xuXG52YXIgX2xvZ2dlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sb2dnZXIpO1xuXG52YXIgX0V2ZW50RW1pdHRlcjIgPSByZXF1aXJlKCcuL0V2ZW50RW1pdHRlci5qcycpO1xuXG52YXIgX0V2ZW50RW1pdHRlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FdmVudEVtaXR0ZXIyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmF1bHRzKG9iaiwgZGVmYXVsdHMpIHsgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkZWZhdWx0cyk7IGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykgeyB2YXIga2V5ID0ga2V5c1tpXTsgdmFyIHZhbHVlID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkZWZhdWx0cywga2V5KTsgaWYgKHZhbHVlICYmIHZhbHVlLmNvbmZpZ3VyYWJsZSAmJiBvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpOyB9IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBfZGVmYXVsdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbnZhciBDb25uZWN0b3IgPSBmdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoQ29ubmVjdG9yLCBfRXZlbnRFbWl0dGVyKTtcblxuICBmdW5jdGlvbiBDb25uZWN0b3IoY2FjaGUsIHN0b3JlLCBzZXJ2aWNlcykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb25uZWN0b3IpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0V2ZW50RW1pdHRlci5jYWxsKHRoaXMpKTtcblxuICAgIF90aGlzLmNhY2hlID0gY2FjaGU7XG4gICAgX3RoaXMuc3RvcmUgPSBzdG9yZTtcbiAgICBfdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xuICAgIF90aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIF90aGlzLmxvZ2dlciA9IF9sb2dnZXIyLmRlZmF1bHQuY3JlYXRlKCdjYWNoZUNvbm5lY3RvcicpO1xuXG4gICAgaWYgKF90aGlzLmNhY2hlICYmIF90aGlzLmNhY2hlLmluaXQpIF90aGlzLmNhY2hlLmluaXQoc2VydmljZXMsIG9wdGlvbnMuY2FjaGUsIG9wdGlvbnMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qIGVzbGludCBjb25zaXN0ZW50LXJldHVybjogMCAqL1xuXG5cbiAgQ29ubmVjdG9yLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gbG9hZChsYW5ndWFnZXMsIG5hbWVzcGFjZXMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBpZiAoIXRoaXMuY2FjaGUpIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIHZhciBvcHRpb25zID0gX2V4dGVuZHMoe30sIHRoaXMuY2FjaGUub3B0aW9ucywgdGhpcy5vcHRpb25zLmNhY2hlKTtcblxuICAgIHZhciBsb2FkTG5ncyA9IHR5cGVvZiBsYW5ndWFnZXMgPT09ICdzdHJpbmcnID8gdGhpcy5zZXJ2aWNlcy5sYW5ndWFnZVV0aWxzLnRvUmVzb2x2ZUhpZXJhcmNoeShsYW5ndWFnZXMpIDogbGFuZ3VhZ2VzO1xuXG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jYWNoZS5sb2FkKGxvYWRMbmdzLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIF90aGlzMi5sb2dnZXIuZXJyb3IoJ2xvYWRpbmcgbGFuZ3VhZ2VzICcgKyBsb2FkTG5ncy5qb2luKCcsICcpICsgJyBmcm9tIGNhY2hlIGZhaWxlZCcsIGVycik7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgLyogZXNsaW50IG5vLXJlc3RyaWN0ZWQtc3ludGF4OiAwICovXG4gICAgICAgICAgZm9yICh2YXIgbCBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGwpKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIG4gaW4gZGF0YVtsXSkge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YVtsXSwgbikpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChuICE9PSAnaTE4blN0YW1wJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnVuZGxlID0gZGF0YVtsXVtuXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1bmRsZSkgX3RoaXMyLnN0b3JlLmFkZFJlc291cmNlQnVuZGxlKGwsIG4sIGJ1bmRsZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9O1xuXG4gIENvbm5lY3Rvci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgaWYgKHRoaXMuY2FjaGUgJiYgdGhpcy5vcHRpb25zLmNhY2hlICYmIHRoaXMub3B0aW9ucy5jYWNoZS5lbmFibGVkKSB0aGlzLmNhY2hlLnNhdmUodGhpcy5zdG9yZS5kYXRhKTtcbiAgfTtcblxuICByZXR1cm4gQ29ubmVjdG9yO1xufShfRXZlbnRFbWl0dGVyMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ29ubmVjdG9yOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFdmVudEVtaXR0ZXIpO1xuXG4gICAgdGhpcy5vYnNlcnZlcnMgPSB7fTtcbiAgfVxuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudHMsIGxpc3RlbmVyKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBfdGhpcy5vYnNlcnZlcnNbZXZlbnRdID0gX3RoaXMub2JzZXJ2ZXJzW2V2ZW50XSB8fCBbXTtcbiAgICAgIF90aGlzLm9ic2VydmVyc1tldmVudF0ucHVzaChsaXN0ZW5lcik7XG4gICAgfSk7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYoZXZlbnQsIGxpc3RlbmVyKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBpZiAoIXRoaXMub2JzZXJ2ZXJzW2V2ZW50XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub2JzZXJ2ZXJzW2V2ZW50XS5mb3JFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghbGlzdGVuZXIpIHtcbiAgICAgICAgZGVsZXRlIF90aGlzMi5vYnNlcnZlcnNbZXZlbnRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGluZGV4ID0gX3RoaXMyLm9ic2VydmVyc1tldmVudF0uaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgX3RoaXMyLm9ic2VydmVyc1tldmVudF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9ic2VydmVyc1tldmVudF0pIHtcbiAgICAgIHZhciBjbG9uZWQgPSBbXS5jb25jYXQodGhpcy5vYnNlcnZlcnNbZXZlbnRdKTtcbiAgICAgIGNsb25lZC5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICBvYnNlcnZlci5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub2JzZXJ2ZXJzWycqJ10pIHtcbiAgICAgIHZhciBfY2xvbmVkID0gW10uY29uY2F0KHRoaXMub2JzZXJ2ZXJzWycqJ10pO1xuICAgICAgX2Nsb25lZC5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICBvYnNlcnZlci5hcHBseShvYnNlcnZlciwgKF9yZWYgPSBbZXZlbnRdKS5jb25jYXQuYXBwbHkoX3JlZiwgYXJncykpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBFdmVudEVtaXR0ZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50RW1pdHRlcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG5cbnZhciB1dGlscyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlscyk7XG5cbnZhciBfbG9nZ2VyID0gcmVxdWlyZSgnLi9sb2dnZXIuanMnKTtcblxudmFyIF9sb2dnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbG9nZ2VyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEludGVycG9sYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gSW50ZXJwb2xhdG9yKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbnRlcnBvbGF0b3IpO1xuXG4gICAgdGhpcy5sb2dnZXIgPSBfbG9nZ2VyMi5kZWZhdWx0LmNyZWF0ZSgnaW50ZXJwb2xhdG9yJyk7XG5cbiAgICB0aGlzLmluaXQob3B0aW9ucywgdHJ1ZSk7XG4gIH1cblxuICAvKiBlc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246IDAgKi9cblxuXG4gIEludGVycG9sYXRvci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIHZhciByZXNldCA9IGFyZ3VtZW50c1sxXTtcblxuICAgIGlmIChyZXNldCkge1xuICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgIHRoaXMuZm9ybWF0ID0gb3B0aW9ucy5pbnRlcnBvbGF0aW9uICYmIG9wdGlvbnMuaW50ZXJwb2xhdGlvbi5mb3JtYXQgfHwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICB0aGlzLmVzY2FwZSA9IG9wdGlvbnMuaW50ZXJwb2xhdGlvbiAmJiBvcHRpb25zLmludGVycG9sYXRpb24uZXNjYXBlIHx8IHV0aWxzLmVzY2FwZTtcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmludGVycG9sYXRpb24pIG9wdGlvbnMuaW50ZXJwb2xhdGlvbiA9IHsgZXNjYXBlVmFsdWU6IHRydWUgfTtcblxuICAgIHZhciBpT3B0cyA9IG9wdGlvbnMuaW50ZXJwb2xhdGlvbjtcblxuICAgIHRoaXMuZXNjYXBlVmFsdWUgPSBpT3B0cy5lc2NhcGVWYWx1ZSAhPT0gdW5kZWZpbmVkID8gaU9wdHMuZXNjYXBlVmFsdWUgOiB0cnVlO1xuXG4gICAgdGhpcy5wcmVmaXggPSBpT3B0cy5wcmVmaXggPyB1dGlscy5yZWdleEVzY2FwZShpT3B0cy5wcmVmaXgpIDogaU9wdHMucHJlZml4RXNjYXBlZCB8fCAne3snO1xuICAgIHRoaXMuc3VmZml4ID0gaU9wdHMuc3VmZml4ID8gdXRpbHMucmVnZXhFc2NhcGUoaU9wdHMuc3VmZml4KSA6IGlPcHRzLnN1ZmZpeEVzY2FwZWQgfHwgJ319JztcblxuICAgIHRoaXMuZm9ybWF0U2VwYXJhdG9yID0gaU9wdHMuZm9ybWF0U2VwYXJhdG9yID8gaU9wdHMuZm9ybWF0U2VwYXJhdG9yIDogaU9wdHMuZm9ybWF0U2VwYXJhdG9yIHx8ICcsJztcblxuICAgIHRoaXMudW5lc2NhcGVQcmVmaXggPSBpT3B0cy51bmVzY2FwZVN1ZmZpeCA/ICcnIDogaU9wdHMudW5lc2NhcGVQcmVmaXggfHwgJy0nO1xuICAgIHRoaXMudW5lc2NhcGVTdWZmaXggPSB0aGlzLnVuZXNjYXBlUHJlZml4ID8gJycgOiBpT3B0cy51bmVzY2FwZVN1ZmZpeCB8fCAnJztcblxuICAgIHRoaXMubmVzdGluZ1ByZWZpeCA9IGlPcHRzLm5lc3RpbmdQcmVmaXggPyB1dGlscy5yZWdleEVzY2FwZShpT3B0cy5uZXN0aW5nUHJlZml4KSA6IGlPcHRzLm5lc3RpbmdQcmVmaXhFc2NhcGVkIHx8IHV0aWxzLnJlZ2V4RXNjYXBlKCckdCgnKTtcbiAgICB0aGlzLm5lc3RpbmdTdWZmaXggPSBpT3B0cy5uZXN0aW5nU3VmZml4ID8gdXRpbHMucmVnZXhFc2NhcGUoaU9wdHMubmVzdGluZ1N1ZmZpeCkgOiBpT3B0cy5uZXN0aW5nU3VmZml4RXNjYXBlZCB8fCB1dGlscy5yZWdleEVzY2FwZSgnKScpO1xuXG4gICAgdGhpcy5tYXhSZXBsYWNlcyA9IGlPcHRzLm1heFJlcGxhY2VzID8gaU9wdHMubWF4UmVwbGFjZXMgOiAxMDAwO1xuXG4gICAgLy8gdGhlIHJlZ2V4cFxuICAgIHRoaXMucmVzZXRSZWdFeHAoKTtcbiAgfTtcblxuICBJbnRlcnBvbGF0b3IucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucykgdGhpcy5pbml0KHRoaXMub3B0aW9ucyk7XG4gIH07XG5cbiAgSW50ZXJwb2xhdG9yLnByb3RvdHlwZS5yZXNldFJlZ0V4cCA9IGZ1bmN0aW9uIHJlc2V0UmVnRXhwKCkge1xuICAgIC8vIHRoZSByZWdleHBcbiAgICB2YXIgcmVnZXhwU3RyID0gdGhpcy5wcmVmaXggKyAnKC4rPyknICsgdGhpcy5zdWZmaXg7XG4gICAgdGhpcy5yZWdleHAgPSBuZXcgUmVnRXhwKHJlZ2V4cFN0ciwgJ2cnKTtcblxuICAgIHZhciByZWdleHBVbmVzY2FwZVN0ciA9ICcnICsgdGhpcy5wcmVmaXggKyB0aGlzLnVuZXNjYXBlUHJlZml4ICsgJyguKz8pJyArIHRoaXMudW5lc2NhcGVTdWZmaXggKyB0aGlzLnN1ZmZpeDtcbiAgICB0aGlzLnJlZ2V4cFVuZXNjYXBlID0gbmV3IFJlZ0V4cChyZWdleHBVbmVzY2FwZVN0ciwgJ2cnKTtcblxuICAgIHZhciBuZXN0aW5nUmVnZXhwU3RyID0gdGhpcy5uZXN0aW5nUHJlZml4ICsgJyguKz8pJyArIHRoaXMubmVzdGluZ1N1ZmZpeDtcbiAgICB0aGlzLm5lc3RpbmdSZWdleHAgPSBuZXcgUmVnRXhwKG5lc3RpbmdSZWdleHBTdHIsICdnJyk7XG4gIH07XG5cbiAgSW50ZXJwb2xhdG9yLnByb3RvdHlwZS5pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uIGludGVycG9sYXRlKHN0ciwgZGF0YSwgbG5nKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBtYXRjaCA9IHZvaWQgMDtcbiAgICB2YXIgdmFsdWUgPSB2b2lkIDA7XG4gICAgdmFyIHJlcGxhY2VzID0gdm9pZCAwO1xuXG4gICAgZnVuY3Rpb24gcmVnZXhTYWZlKHZhbCkge1xuICAgICAgcmV0dXJuIHZhbC5yZXBsYWNlKC9cXCQvZywgJyQkJCQnKTtcbiAgICB9XG5cbiAgICB2YXIgaGFuZGxlRm9ybWF0ID0gZnVuY3Rpb24gaGFuZGxlRm9ybWF0KGtleSkge1xuICAgICAgaWYgKGtleS5pbmRleE9mKF90aGlzLmZvcm1hdFNlcGFyYXRvcikgPCAwKSByZXR1cm4gdXRpbHMuZ2V0UGF0aChkYXRhLCBrZXkpO1xuXG4gICAgICB2YXIgcCA9IGtleS5zcGxpdChfdGhpcy5mb3JtYXRTZXBhcmF0b3IpO1xuICAgICAgdmFyIGsgPSBwLnNoaWZ0KCkudHJpbSgpO1xuICAgICAgdmFyIGYgPSBwLmpvaW4oX3RoaXMuZm9ybWF0U2VwYXJhdG9yKS50cmltKCk7XG5cbiAgICAgIHJldHVybiBfdGhpcy5mb3JtYXQodXRpbHMuZ2V0UGF0aChkYXRhLCBrKSwgZiwgbG5nKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXNldFJlZ0V4cCgpO1xuXG4gICAgcmVwbGFjZXMgPSAwO1xuICAgIC8vIHVuZXNjYXBlIGlmIGhhcyB1bmVzY2FwZVByZWZpeC9TdWZmaXhcbiAgICAvKiBlc2xpbnQgbm8tY29uZC1hc3NpZ246IDAgKi9cbiAgICB3aGlsZSAobWF0Y2ggPSB0aGlzLnJlZ2V4cFVuZXNjYXBlLmV4ZWMoc3RyKSkge1xuICAgICAgdmFsdWUgPSBoYW5kbGVGb3JtYXQobWF0Y2hbMV0udHJpbSgpKTtcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKG1hdGNoWzBdLCB2YWx1ZSk7XG4gICAgICB0aGlzLnJlZ2V4cFVuZXNjYXBlLmxhc3RJbmRleCA9IDA7XG4gICAgICByZXBsYWNlcysrO1xuICAgICAgaWYgKHJlcGxhY2VzID49IHRoaXMubWF4UmVwbGFjZXMpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVwbGFjZXMgPSAwO1xuICAgIC8vIHJlZ3VsYXIgZXNjYXBlIG9uIGRlbWFuZFxuICAgIHdoaWxlIChtYXRjaCA9IHRoaXMucmVnZXhwLmV4ZWMoc3RyKSkge1xuICAgICAgdmFsdWUgPSBoYW5kbGVGb3JtYXQobWF0Y2hbMV0udHJpbSgpKTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB2YWx1ZSA9IHV0aWxzLm1ha2VTdHJpbmcodmFsdWUpO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdtaXNzZWQgdG8gcGFzcyBpbiB2YXJpYWJsZSAnICsgbWF0Y2hbMV0gKyAnIGZvciBpbnRlcnBvbGF0aW5nICcgKyBzdHIpO1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSB0aGlzLmVzY2FwZVZhbHVlID8gcmVnZXhTYWZlKHRoaXMuZXNjYXBlKHZhbHVlKSkgOiByZWdleFNhZmUodmFsdWUpO1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UobWF0Y2hbMF0sIHZhbHVlKTtcbiAgICAgIHRoaXMucmVnZXhwLmxhc3RJbmRleCA9IDA7XG4gICAgICByZXBsYWNlcysrO1xuICAgICAgaWYgKHJlcGxhY2VzID49IHRoaXMubWF4UmVwbGFjZXMpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH07XG5cbiAgSW50ZXJwb2xhdG9yLnByb3RvdHlwZS5uZXN0ID0gZnVuY3Rpb24gbmVzdChzdHIsIGZjKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuXG4gICAgdmFyIG1hdGNoID0gdm9pZCAwO1xuICAgIHZhciB2YWx1ZSA9IHZvaWQgMDtcblxuICAgIHZhciBjbG9uZWRPcHRpb25zID0gX2V4dGVuZHMoe30sIG9wdGlvbnMpO1xuICAgIGNsb25lZE9wdGlvbnMuYXBwbHlQb3N0UHJvY2Vzc29yID0gZmFsc2U7IC8vIGF2b2lkIHBvc3QgcHJvY2Vzc2luZyBvbiBuZXN0ZWQgbG9va3VwXG5cbiAgICAvLyBpZiB2YWx1ZSBpcyBzb21ldGhpbmcgbGlrZSBcIm15S2V5XCI6IFwibG9yZW0gJChhbm90aGVyS2V5LCB7IFwiY291bnRcIjoge3thVmFsdWVJbk9wdGlvbnN9fSB9KVwiXG4gICAgZnVuY3Rpb24gaGFuZGxlSGFzT3B0aW9ucyhrZXksIGluaGVyaXRlZE9wdGlvbnMpIHtcbiAgICAgIGlmIChrZXkuaW5kZXhPZignLCcpIDwgMCkgcmV0dXJuIGtleTtcblxuICAgICAgdmFyIHAgPSBrZXkuc3BsaXQoJywnKTtcbiAgICAgIGtleSA9IHAuc2hpZnQoKTtcbiAgICAgIHZhciBvcHRpb25zU3RyaW5nID0gcC5qb2luKCcsJyk7XG4gICAgICBvcHRpb25zU3RyaW5nID0gdGhpcy5pbnRlcnBvbGF0ZShvcHRpb25zU3RyaW5nLCBjbG9uZWRPcHRpb25zKTtcbiAgICAgIG9wdGlvbnNTdHJpbmcgPSBvcHRpb25zU3RyaW5nLnJlcGxhY2UoLycvZywgJ1wiJyk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNsb25lZE9wdGlvbnMgPSBKU09OLnBhcnNlKG9wdGlvbnNTdHJpbmcpO1xuXG4gICAgICAgIGlmIChpbmhlcml0ZWRPcHRpb25zKSBjbG9uZWRPcHRpb25zID0gX2V4dGVuZHMoe30sIGluaGVyaXRlZE9wdGlvbnMsIGNsb25lZE9wdGlvbnMpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignZmFpbGVkIHBhcnNpbmcgb3B0aW9ucyBzdHJpbmcgaW4gbmVzdGluZyBmb3Iga2V5ICcgKyBrZXksIGUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cblxuICAgIC8vIHJlZ3VsYXIgZXNjYXBlIG9uIGRlbWFuZFxuICAgIHdoaWxlIChtYXRjaCA9IHRoaXMubmVzdGluZ1JlZ2V4cC5leGVjKHN0cikpIHtcbiAgICAgIHZhbHVlID0gZmMoaGFuZGxlSGFzT3B0aW9ucy5jYWxsKHRoaXMsIG1hdGNoWzFdLnRyaW0oKSwgY2xvbmVkT3B0aW9ucyksIGNsb25lZE9wdGlvbnMpO1xuXG4gICAgICAvLyBpcyBvbmx5IHRoZSBuZXN0aW5nIGtleSAoa2V5MSA9ICckKGtleTIpJykgcmV0dXJuIHRoZSB2YWx1ZSB3aXRob3V0IHN0cmluZ2lmeVxuICAgICAgaWYgKHZhbHVlICYmIG1hdGNoWzBdID09PSBzdHIgJiYgdHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAvLyBubyBzdHJpbmcgdG8gaW5jbHVkZSBvciBlbXB0eVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHZhbHVlID0gdXRpbHMubWFrZVN0cmluZyh2YWx1ZSk7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ21pc3NlZCB0byByZXNvbHZlICcgKyBtYXRjaFsxXSArICcgZm9yIG5lc3RpbmcgJyArIHN0cik7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgICAvLyBOZXN0ZWQga2V5cyBzaG91bGQgbm90IGJlIGVzY2FwZWQgYnkgZGVmYXVsdCAjODU0XG4gICAgICAvLyB2YWx1ZSA9IHRoaXMuZXNjYXBlVmFsdWUgPyByZWdleFNhZmUodXRpbHMuZXNjYXBlKHZhbHVlKSkgOiByZWdleFNhZmUodmFsdWUpO1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UobWF0Y2hbMF0sIHZhbHVlKTtcbiAgICAgIHRoaXMucmVnZXhwLmxhc3RJbmRleCA9IDA7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH07XG5cbiAgcmV0dXJuIEludGVycG9sYXRvcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gSW50ZXJwb2xhdG9yOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9sb2dnZXIgPSByZXF1aXJlKCcuL2xvZ2dlci5qcycpO1xuXG52YXIgX2xvZ2dlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sb2dnZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufVxuXG52YXIgTGFuZ3VhZ2VVdGlsID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBMYW5ndWFnZVV0aWwob3B0aW9ucykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMYW5ndWFnZVV0aWwpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIHRoaXMud2hpdGVsaXN0ID0gdGhpcy5vcHRpb25zLndoaXRlbGlzdCB8fCBmYWxzZTtcbiAgICB0aGlzLmxvZ2dlciA9IF9sb2dnZXIyLmRlZmF1bHQuY3JlYXRlKCdsYW5ndWFnZVV0aWxzJyk7XG4gIH1cblxuICBMYW5ndWFnZVV0aWwucHJvdG90eXBlLmdldFNjcmlwdFBhcnRGcm9tQ29kZSA9IGZ1bmN0aW9uIGdldFNjcmlwdFBhcnRGcm9tQ29kZShjb2RlKSB7XG4gICAgaWYgKCFjb2RlIHx8IGNvZGUuaW5kZXhPZignLScpIDwgMCkgcmV0dXJuIG51bGw7XG5cbiAgICB2YXIgcCA9IGNvZGUuc3BsaXQoJy0nKTtcbiAgICBpZiAocC5sZW5ndGggPT09IDIpIHJldHVybiBudWxsO1xuICAgIHAucG9wKCk7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0TGFuZ3VhZ2VDb2RlKHAuam9pbignLScpKTtcbiAgfTtcblxuICBMYW5ndWFnZVV0aWwucHJvdG90eXBlLmdldExhbmd1YWdlUGFydEZyb21Db2RlID0gZnVuY3Rpb24gZ2V0TGFuZ3VhZ2VQYXJ0RnJvbUNvZGUoY29kZSkge1xuICAgIGlmICghY29kZSB8fCBjb2RlLmluZGV4T2YoJy0nKSA8IDApIHJldHVybiBjb2RlO1xuXG4gICAgdmFyIHAgPSBjb2RlLnNwbGl0KCctJyk7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0TGFuZ3VhZ2VDb2RlKHBbMF0pO1xuICB9O1xuXG4gIExhbmd1YWdlVXRpbC5wcm90b3R5cGUuZm9ybWF0TGFuZ3VhZ2VDb2RlID0gZnVuY3Rpb24gZm9ybWF0TGFuZ3VhZ2VDb2RlKGNvZGUpIHtcbiAgICAvLyBodHRwOi8vd3d3LmlhbmEub3JnL2Fzc2lnbm1lbnRzL2xhbmd1YWdlLXRhZ3MvbGFuZ3VhZ2UtdGFncy54aHRtbFxuICAgIGlmICh0eXBlb2YgY29kZSA9PT0gJ3N0cmluZycgJiYgY29kZS5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgdmFyIHNwZWNpYWxDYXNlcyA9IFsnaGFucycsICdoYW50JywgJ2xhdG4nLCAnY3lybCcsICdjYW5zJywgJ21vbmcnLCAnYXJhYiddO1xuICAgICAgdmFyIHAgPSBjb2RlLnNwbGl0KCctJyk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubG93ZXJDYXNlTG5nKSB7XG4gICAgICAgIHAgPSBwLm1hcChmdW5jdGlvbiAocGFydCkge1xuICAgICAgICAgIHJldHVybiBwYXJ0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChwLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBwWzBdID0gcFswXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBwWzFdID0gcFsxXS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAgIGlmIChzcGVjaWFsQ2FzZXMuaW5kZXhPZihwWzFdLnRvTG93ZXJDYXNlKCkpID4gLTEpIHBbMV0gPSBjYXBpdGFsaXplKHBbMV0udG9Mb3dlckNhc2UoKSk7XG4gICAgICB9IGVsc2UgaWYgKHAubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIHBbMF0gPSBwWzBdLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgLy8gaWYgbGVuZ2h0IDIgZ3Vlc3MgaXQncyBhIGNvdW50cnlcbiAgICAgICAgaWYgKHBbMV0ubGVuZ3RoID09PSAyKSBwWzFdID0gcFsxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBpZiAocFswXSAhPT0gJ3NnbicgJiYgcFsyXS5sZW5ndGggPT09IDIpIHBbMl0gPSBwWzJdLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKHNwZWNpYWxDYXNlcy5pbmRleE9mKHBbMV0udG9Mb3dlckNhc2UoKSkgPiAtMSkgcFsxXSA9IGNhcGl0YWxpemUocFsxXS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgaWYgKHNwZWNpYWxDYXNlcy5pbmRleE9mKHBbMl0udG9Mb3dlckNhc2UoKSkgPiAtMSkgcFsyXSA9IGNhcGl0YWxpemUocFsyXS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHAuam9pbignLScpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2xlYW5Db2RlIHx8IHRoaXMub3B0aW9ucy5sb3dlckNhc2VMbmcgPyBjb2RlLnRvTG93ZXJDYXNlKCkgOiBjb2RlO1xuICB9O1xuXG4gIExhbmd1YWdlVXRpbC5wcm90b3R5cGUuaXNXaGl0ZWxpc3RlZCA9IGZ1bmN0aW9uIGlzV2hpdGVsaXN0ZWQoY29kZSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMubG9hZCA9PT0gJ2xhbmd1YWdlT25seScgfHwgdGhpcy5vcHRpb25zLm5vbkV4cGxpY2l0V2hpdGVsaXN0KSB7XG4gICAgICBjb2RlID0gdGhpcy5nZXRMYW5ndWFnZVBhcnRGcm9tQ29kZShjb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuICF0aGlzLndoaXRlbGlzdCB8fCAhdGhpcy53aGl0ZWxpc3QubGVuZ3RoIHx8IHRoaXMud2hpdGVsaXN0LmluZGV4T2YoY29kZSkgPiAtMTtcbiAgfTtcblxuICBMYW5ndWFnZVV0aWwucHJvdG90eXBlLmdldEZhbGxiYWNrQ29kZXMgPSBmdW5jdGlvbiBnZXRGYWxsYmFja0NvZGVzKGZhbGxiYWNrcywgY29kZSkge1xuICAgIGlmICghZmFsbGJhY2tzKSByZXR1cm4gW107XG4gICAgaWYgKHR5cGVvZiBmYWxsYmFja3MgPT09ICdzdHJpbmcnKSBmYWxsYmFja3MgPSBbZmFsbGJhY2tzXTtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseShmYWxsYmFja3MpID09PSAnW29iamVjdCBBcnJheV0nKSByZXR1cm4gZmFsbGJhY2tzO1xuXG4gICAgaWYgKCFjb2RlKSByZXR1cm4gZmFsbGJhY2tzLmRlZmF1bHQgfHwgW107XG5cbiAgICAvLyBhc3VtZSB3ZSBoYXZlIGFuIG9iamVjdCBkZWZpbmluZyBmYWxsYmFja3NcbiAgICB2YXIgZm91bmQgPSBmYWxsYmFja3NbY29kZV07XG4gICAgaWYgKCFmb3VuZCkgZm91bmQgPSBmYWxsYmFja3NbdGhpcy5nZXRTY3JpcHRQYXJ0RnJvbUNvZGUoY29kZSldO1xuICAgIGlmICghZm91bmQpIGZvdW5kID0gZmFsbGJhY2tzW3RoaXMuZm9ybWF0TGFuZ3VhZ2VDb2RlKGNvZGUpXTtcbiAgICBpZiAoIWZvdW5kKSBmb3VuZCA9IGZhbGxiYWNrcy5kZWZhdWx0O1xuXG4gICAgcmV0dXJuIGZvdW5kIHx8IFtdO1xuICB9O1xuXG4gIExhbmd1YWdlVXRpbC5wcm90b3R5cGUudG9SZXNvbHZlSGllcmFyY2h5ID0gZnVuY3Rpb24gdG9SZXNvbHZlSGllcmFyY2h5KGNvZGUsIGZhbGxiYWNrQ29kZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgZmFsbGJhY2tDb2RlcyA9IHRoaXMuZ2V0RmFsbGJhY2tDb2RlcyhmYWxsYmFja0NvZGUgfHwgdGhpcy5vcHRpb25zLmZhbGxiYWNrTG5nIHx8IFtdLCBjb2RlKTtcblxuICAgIHZhciBjb2RlcyA9IFtdO1xuICAgIHZhciBhZGRDb2RlID0gZnVuY3Rpb24gYWRkQ29kZShjKSB7XG4gICAgICBpZiAoIWMpIHJldHVybjtcbiAgICAgIGlmIChfdGhpcy5pc1doaXRlbGlzdGVkKGMpKSB7XG4gICAgICAgIGNvZGVzLnB1c2goYyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5sb2dnZXIud2FybigncmVqZWN0aW5nIG5vbi13aGl0ZWxpc3RlZCBsYW5ndWFnZSBjb2RlOiAnICsgYyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgY29kZSA9PT0gJ3N0cmluZycgJiYgY29kZS5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5sb2FkICE9PSAnbGFuZ3VhZ2VPbmx5JykgYWRkQ29kZSh0aGlzLmZvcm1hdExhbmd1YWdlQ29kZShjb2RlKSk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmxvYWQgIT09ICdsYW5ndWFnZU9ubHknICYmIHRoaXMub3B0aW9ucy5sb2FkICE9PSAnY3VycmVudE9ubHknKSBhZGRDb2RlKHRoaXMuZ2V0U2NyaXB0UGFydEZyb21Db2RlKGNvZGUpKTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubG9hZCAhPT0gJ2N1cnJlbnRPbmx5JykgYWRkQ29kZSh0aGlzLmdldExhbmd1YWdlUGFydEZyb21Db2RlKGNvZGUpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb2RlID09PSAnc3RyaW5nJykge1xuICAgICAgYWRkQ29kZSh0aGlzLmZvcm1hdExhbmd1YWdlQ29kZShjb2RlKSk7XG4gICAgfVxuXG4gICAgZmFsbGJhY2tDb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChmYykge1xuICAgICAgaWYgKGNvZGVzLmluZGV4T2YoZmMpIDwgMCkgYWRkQ29kZShfdGhpcy5mb3JtYXRMYW5ndWFnZUNvZGUoZmMpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb2RlcztcbiAgfTtcblxuICByZXR1cm4gTGFuZ3VhZ2VVdGlsO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBMYW5ndWFnZVV0aWw7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2xvZ2dlciA9IHJlcXVpcmUoJy4vbG9nZ2VyLmpzJyk7XG5cbnZhciBfbG9nZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xvZ2dlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8vIGRlZmluaXRpb24gaHR0cDovL3RyYW5zbGF0ZS5zb3VyY2Vmb3JnZS5uZXQvd2lraS9sMTBuL3BsdXJhbGZvcm1zXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xudmFyIHNldHMgPSBbeyBsbmdzOiBbJ2FjaCcsICdhaycsICdhbScsICdhcm4nLCAnYnInLCAnZmlsJywgJ2d1bicsICdsbicsICdtZmUnLCAnbWcnLCAnbWknLCAnb2MnLCAncHQnLCAncHQtQlInLCAndGcnLCAndGknLCAndHInLCAndXonLCAnd2EnXSwgbnI6IFsxLCAyXSwgZmM6IDEgfSwgeyBsbmdzOiBbJ2FmJywgJ2FuJywgJ2FzdCcsICdheicsICdiZycsICdibicsICdjYScsICdkYScsICdkZScsICdkZXYnLCAnZWwnLCAnZW4nLCAnZW8nLCAnZXMnLCAnZXQnLCAnZXUnLCAnZmknLCAnZm8nLCAnZnVyJywgJ2Z5JywgJ2dsJywgJ2d1JywgJ2hhJywgJ2hlJywgJ2hpJywgJ2h1JywgJ2h5JywgJ2lhJywgJ2l0JywgJ2tuJywgJ2t1JywgJ2xiJywgJ21haScsICdtbCcsICdtbicsICdtcicsICduYWgnLCAnbmFwJywgJ25iJywgJ25lJywgJ25sJywgJ25uJywgJ25vJywgJ25zbycsICdwYScsICdwYXAnLCAncG1zJywgJ3BzJywgJ3B0LVBUJywgJ3JtJywgJ3NjbycsICdzZScsICdzaScsICdzbycsICdzb24nLCAnc3EnLCAnc3YnLCAnc3cnLCAndGEnLCAndGUnLCAndGsnLCAndXInLCAneW8nXSwgbnI6IFsxLCAyXSwgZmM6IDIgfSwgeyBsbmdzOiBbJ2F5JywgJ2JvJywgJ2NnZycsICdmYScsICdpZCcsICdqYScsICdqYm8nLCAna2EnLCAna2snLCAna20nLCAna28nLCAna3knLCAnbG8nLCAnbXMnLCAnc2FoJywgJ3N1JywgJ3RoJywgJ3R0JywgJ3VnJywgJ3ZpJywgJ3dvJywgJ3poJ10sIG5yOiBbMV0sIGZjOiAzIH0sIHsgbG5nczogWydiZScsICdicycsICdkeicsICdocicsICdydScsICdzcicsICd1ayddLCBucjogWzEsIDIsIDVdLCBmYzogNCB9LCB7IGxuZ3M6IFsnYXInXSwgbnI6IFswLCAxLCAyLCAzLCAxMSwgMTAwXSwgZmM6IDUgfSwgeyBsbmdzOiBbJ2NzJywgJ3NrJ10sIG5yOiBbMSwgMiwgNV0sIGZjOiA2IH0sIHsgbG5nczogWydjc2InLCAncGwnXSwgbnI6IFsxLCAyLCA1XSwgZmM6IDcgfSwgeyBsbmdzOiBbJ2N5J10sIG5yOiBbMSwgMiwgMywgOF0sIGZjOiA4IH0sIHsgbG5nczogWydmciddLCBucjogWzEsIDJdLCBmYzogOSB9LCB7IGxuZ3M6IFsnZ2EnXSwgbnI6IFsxLCAyLCAzLCA3LCAxMV0sIGZjOiAxMCB9LCB7IGxuZ3M6IFsnZ2QnXSwgbnI6IFsxLCAyLCAzLCAyMF0sIGZjOiAxMSB9LCB7IGxuZ3M6IFsnaXMnXSwgbnI6IFsxLCAyXSwgZmM6IDEyIH0sIHsgbG5nczogWydqdiddLCBucjogWzAsIDFdLCBmYzogMTMgfSwgeyBsbmdzOiBbJ2t3J10sIG5yOiBbMSwgMiwgMywgNF0sIGZjOiAxNCB9LCB7IGxuZ3M6IFsnbHQnXSwgbnI6IFsxLCAyLCAxMF0sIGZjOiAxNSB9LCB7IGxuZ3M6IFsnbHYnXSwgbnI6IFsxLCAyLCAwXSwgZmM6IDE2IH0sIHsgbG5nczogWydtayddLCBucjogWzEsIDJdLCBmYzogMTcgfSwgeyBsbmdzOiBbJ21uayddLCBucjogWzAsIDEsIDJdLCBmYzogMTggfSwgeyBsbmdzOiBbJ210J10sIG5yOiBbMSwgMiwgMTEsIDIwXSwgZmM6IDE5IH0sIHsgbG5nczogWydvciddLCBucjogWzIsIDFdLCBmYzogMiB9LCB7IGxuZ3M6IFsncm8nXSwgbnI6IFsxLCAyLCAyMF0sIGZjOiAyMCB9LCB7IGxuZ3M6IFsnc2wnXSwgbnI6IFs1LCAxLCAyLCAzXSwgZmM6IDIxIH1dO1xuXG52YXIgX3J1bGVzUGx1cmFsc1R5cGVzID0ge1xuICAxOiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gPiAxKTtcbiAgfSxcbiAgMjogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuICE9IDEpO1xuICB9LFxuICAzOiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gMDtcbiAgfSxcbiAgNDogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuICUgMTAgPT0gMSAmJiBuICUgMTAwICE9IDExID8gMCA6IG4gJSAxMCA+PSAyICYmIG4gJSAxMCA8PSA0ICYmIChuICUgMTAwIDwgMTAgfHwgbiAlIDEwMCA+PSAyMCkgPyAxIDogMik7XG4gIH0sXG4gIDU6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiBOdW1iZXIobiA9PT0gMCA/IDAgOiBuID09IDEgPyAxIDogbiA9PSAyID8gMiA6IG4gJSAxMDAgPj0gMyAmJiBuICUgMTAwIDw9IDEwID8gMyA6IG4gJSAxMDAgPj0gMTEgPyA0IDogNSk7XG4gIH0sXG4gIDY6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiBOdW1iZXIobiA9PSAxID8gMCA6IG4gPj0gMiAmJiBuIDw9IDQgPyAxIDogMik7XG4gIH0sXG4gIDc6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiBOdW1iZXIobiA9PSAxID8gMCA6IG4gJSAxMCA+PSAyICYmIG4gJSAxMCA8PSA0ICYmIChuICUgMTAwIDwgMTAgfHwgbiAlIDEwMCA+PSAyMCkgPyAxIDogMik7XG4gIH0sXG4gIDg6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiBOdW1iZXIobiA9PSAxID8gMCA6IG4gPT0gMiA/IDEgOiBuICE9IDggJiYgbiAhPSAxMSA/IDIgOiAzKTtcbiAgfSxcbiAgOTogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuID49IDIpO1xuICB9LFxuICAxMDogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuID09IDEgPyAwIDogbiA9PSAyID8gMSA6IG4gPCA3ID8gMiA6IG4gPCAxMSA/IDMgOiA0KTtcbiAgfSxcbiAgMTE6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiBOdW1iZXIobiA9PSAxIHx8IG4gPT0gMTEgPyAwIDogbiA9PSAyIHx8IG4gPT0gMTIgPyAxIDogbiA+IDIgJiYgbiA8IDIwID8gMiA6IDMpO1xuICB9LFxuICAxMjogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuICUgMTAgIT0gMSB8fCBuICUgMTAwID09IDExKTtcbiAgfSxcbiAgMTM6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiBOdW1iZXIobiAhPT0gMCk7XG4gIH0sXG4gIDE0OiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gPT0gMSA/IDAgOiBuID09IDIgPyAxIDogbiA9PSAzID8gMiA6IDMpO1xuICB9LFxuICAxNTogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuICUgMTAgPT0gMSAmJiBuICUgMTAwICE9IDExID8gMCA6IG4gJSAxMCA+PSAyICYmIChuICUgMTAwIDwgMTAgfHwgbiAlIDEwMCA+PSAyMCkgPyAxIDogMik7XG4gIH0sXG4gIDE2OiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gJSAxMCA9PSAxICYmIG4gJSAxMDAgIT0gMTEgPyAwIDogbiAhPT0gMCA/IDEgOiAyKTtcbiAgfSxcbiAgMTc6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiBOdW1iZXIobiA9PSAxIHx8IG4gJSAxMCA9PSAxID8gMCA6IDEpO1xuICB9LFxuICAxODogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuID09IDAgPyAwIDogbiA9PSAxID8gMSA6IDIpO1xuICB9LFxuICAxOTogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuID09IDEgPyAwIDogbiA9PT0gMCB8fCBuICUgMTAwID4gMSAmJiBuICUgMTAwIDwgMTEgPyAxIDogbiAlIDEwMCA+IDEwICYmIG4gJSAxMDAgPCAyMCA/IDIgOiAzKTtcbiAgfSxcbiAgMjA6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiBOdW1iZXIobiA9PSAxID8gMCA6IG4gPT09IDAgfHwgbiAlIDEwMCA+IDAgJiYgbiAlIDEwMCA8IDIwID8gMSA6IDIpO1xuICB9LFxuICAyMTogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuICUgMTAwID09IDEgPyAxIDogbiAlIDEwMCA9PSAyID8gMiA6IG4gJSAxMDAgPT0gMyB8fCBuICUgMTAwID09IDQgPyAzIDogMCk7XG4gIH1cbn07XG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbmZ1bmN0aW9uIGNyZWF0ZVJ1bGVzKCkge1xuICB2YXIgcnVsZXMgPSB7fTtcbiAgc2V0cy5mb3JFYWNoKGZ1bmN0aW9uIChzZXQpIHtcbiAgICBzZXQubG5ncy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7XG4gICAgICBydWxlc1tsXSA9IHtcbiAgICAgICAgbnVtYmVyczogc2V0Lm5yLFxuICAgICAgICBwbHVyYWxzOiBfcnVsZXNQbHVyYWxzVHlwZXNbc2V0LmZjXVxuICAgICAgfTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBydWxlcztcbn1cblxudmFyIFBsdXJhbFJlc29sdmVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQbHVyYWxSZXNvbHZlcihsYW5ndWFnZVV0aWxzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBsdXJhbFJlc29sdmVyKTtcblxuICAgIHRoaXMubGFuZ3VhZ2VVdGlscyA9IGxhbmd1YWdlVXRpbHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIHRoaXMubG9nZ2VyID0gX2xvZ2dlcjIuZGVmYXVsdC5jcmVhdGUoJ3BsdXJhbFJlc29sdmVyJyk7XG5cbiAgICB0aGlzLnJ1bGVzID0gY3JlYXRlUnVsZXMoKTtcbiAgfVxuXG4gIFBsdXJhbFJlc29sdmVyLnByb3RvdHlwZS5hZGRSdWxlID0gZnVuY3Rpb24gYWRkUnVsZShsbmcsIG9iaikge1xuICAgIHRoaXMucnVsZXNbbG5nXSA9IG9iajtcbiAgfTtcblxuICBQbHVyYWxSZXNvbHZlci5wcm90b3R5cGUuZ2V0UnVsZSA9IGZ1bmN0aW9uIGdldFJ1bGUoY29kZSkge1xuICAgIHJldHVybiB0aGlzLnJ1bGVzW2NvZGVdIHx8IHRoaXMucnVsZXNbdGhpcy5sYW5ndWFnZVV0aWxzLmdldExhbmd1YWdlUGFydEZyb21Db2RlKGNvZGUpXTtcbiAgfTtcblxuICBQbHVyYWxSZXNvbHZlci5wcm90b3R5cGUubmVlZHNQbHVyYWwgPSBmdW5jdGlvbiBuZWVkc1BsdXJhbChjb2RlKSB7XG4gICAgdmFyIHJ1bGUgPSB0aGlzLmdldFJ1bGUoY29kZSk7XG5cbiAgICByZXR1cm4gcnVsZSAmJiBydWxlLm51bWJlcnMubGVuZ3RoID4gMTtcbiAgfTtcblxuICBQbHVyYWxSZXNvbHZlci5wcm90b3R5cGUuZ2V0UGx1cmFsRm9ybXNPZktleSA9IGZ1bmN0aW9uIGdldFBsdXJhbEZvcm1zT2ZLZXkoY29kZSwga2V5KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciByZXQgPSBbXTtcblxuICAgIHZhciBydWxlID0gdGhpcy5nZXRSdWxlKGNvZGUpO1xuXG4gICAgcnVsZS5udW1iZXJzLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgIHZhciBzdWZmaXggPSBfdGhpcy5nZXRTdWZmaXgoY29kZSwgbik7XG4gICAgICByZXQucHVzaCgnJyArIGtleSArIHN1ZmZpeCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIFBsdXJhbFJlc29sdmVyLnByb3RvdHlwZS5nZXRTdWZmaXggPSBmdW5jdGlvbiBnZXRTdWZmaXgoY29kZSwgY291bnQpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBydWxlID0gdGhpcy5nZXRSdWxlKGNvZGUpO1xuXG4gICAgaWYgKHJ1bGUpIHtcbiAgICAgIC8vIGlmIChydWxlLm51bWJlcnMubGVuZ3RoID09PSAxKSByZXR1cm4gJyc7IC8vIG9ubHkgc2luZ3VsYXJcblxuICAgICAgdmFyIGlkeCA9IHJ1bGUubm9BYnMgPyBydWxlLnBsdXJhbHMoY291bnQpIDogcnVsZS5wbHVyYWxzKE1hdGguYWJzKGNvdW50KSk7XG4gICAgICB2YXIgc3VmZml4ID0gcnVsZS5udW1iZXJzW2lkeF07XG5cbiAgICAgIC8vIHNwZWNpYWwgdHJlYXRtZW50IGZvciBsbmdzIG9ubHkgaGF2aW5nIHNpbmd1bGFyIGFuZCBwbHVyYWxcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2ltcGxpZnlQbHVyYWxTdWZmaXggJiYgcnVsZS5udW1iZXJzLmxlbmd0aCA9PT0gMiAmJiBydWxlLm51bWJlcnNbMF0gPT09IDEpIHtcbiAgICAgICAgaWYgKHN1ZmZpeCA9PT0gMikge1xuICAgICAgICAgIHN1ZmZpeCA9ICdwbHVyYWwnO1xuICAgICAgICB9IGVsc2UgaWYgKHN1ZmZpeCA9PT0gMSkge1xuICAgICAgICAgIHN1ZmZpeCA9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciByZXR1cm5TdWZmaXggPSBmdW5jdGlvbiByZXR1cm5TdWZmaXgoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIub3B0aW9ucy5wcmVwZW5kICYmIHN1ZmZpeC50b1N0cmluZygpID8gX3RoaXMyLm9wdGlvbnMucHJlcGVuZCArIHN1ZmZpeC50b1N0cmluZygpIDogc3VmZml4LnRvU3RyaW5nKCk7XG4gICAgICB9O1xuXG4gICAgICAvLyBDT01QQVRJQklMSVRZIEpTT05cbiAgICAgIC8vIHYxXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbXBhdGliaWxpdHlKU09OID09PSAndjEnKSB7XG4gICAgICAgIGlmIChzdWZmaXggPT09IDEpIHJldHVybiAnJztcbiAgICAgICAgaWYgKHR5cGVvZiBzdWZmaXggPT09ICdudW1iZXInKSByZXR1cm4gJ19wbHVyYWxfJyArIHN1ZmZpeC50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gcmV0dXJuU3VmZml4KCk7XG4gICAgICB9IGVsc2UgaWYgKCAvKiB2MiAqL3RoaXMub3B0aW9ucy5jb21wYXRpYmlsaXR5SlNPTiA9PT0gJ3YyJyB8fCBydWxlLm51bWJlcnMubGVuZ3RoID09PSAyICYmIHJ1bGUubnVtYmVyc1swXSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gcmV0dXJuU3VmZml4KCk7XG4gICAgICB9IGVsc2UgaWYgKCAvKiB2MyAtIGdldHRleHQgaW5kZXggKi9ydWxlLm51bWJlcnMubGVuZ3RoID09PSAyICYmIHJ1bGUubnVtYmVyc1swXSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gcmV0dXJuU3VmZml4KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnByZXBlbmQgJiYgaWR4LnRvU3RyaW5nKCkgPyB0aGlzLm9wdGlvbnMucHJlcGVuZCArIGlkeC50b1N0cmluZygpIDogaWR4LnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2dnZXIud2Fybignbm8gcGx1cmFsIHJ1bGUgZm91bmQgZm9yOiAnICsgY29kZSk7XG4gICAgcmV0dXJuICcnO1xuICB9O1xuXG4gIHJldHVybiBQbHVyYWxSZXNvbHZlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUGx1cmFsUmVzb2x2ZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX0V2ZW50RW1pdHRlcjIgPSByZXF1aXJlKCcuL0V2ZW50RW1pdHRlci5qcycpO1xuXG52YXIgX0V2ZW50RW1pdHRlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FdmVudEVtaXR0ZXIyKTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcblxudmFyIHV0aWxzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmF1bHRzKG9iaiwgZGVmYXVsdHMpIHsgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkZWZhdWx0cyk7IGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykgeyB2YXIga2V5ID0ga2V5c1tpXTsgdmFyIHZhbHVlID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkZWZhdWx0cywga2V5KTsgaWYgKHZhbHVlICYmIHZhbHVlLmNvbmZpZ3VyYWJsZSAmJiBvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpOyB9IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBfZGVmYXVsdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbnZhciBSZXNvdXJjZVN0b3JlID0gZnVuY3Rpb24gKF9FdmVudEVtaXR0ZXIpIHtcbiAgX2luaGVyaXRzKFJlc291cmNlU3RvcmUsIF9FdmVudEVtaXR0ZXIpO1xuXG4gIGZ1bmN0aW9uIFJlc291cmNlU3RvcmUoZGF0YSkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7IG5zOiBbJ3RyYW5zbGF0aW9uJ10sIGRlZmF1bHROUzogJ3RyYW5zbGF0aW9uJyB9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlc291cmNlU3RvcmUpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0V2ZW50RW1pdHRlci5jYWxsKHRoaXMpKTtcblxuICAgIF90aGlzLmRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIF90aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIFJlc291cmNlU3RvcmUucHJvdG90eXBlLmFkZE5hbWVzcGFjZXMgPSBmdW5jdGlvbiBhZGROYW1lc3BhY2VzKG5zKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5ucy5pbmRleE9mKG5zKSA8IDApIHtcbiAgICAgIHRoaXMub3B0aW9ucy5ucy5wdXNoKG5zKTtcbiAgICB9XG4gIH07XG5cbiAgUmVzb3VyY2VTdG9yZS5wcm90b3R5cGUucmVtb3ZlTmFtZXNwYWNlcyA9IGZ1bmN0aW9uIHJlbW92ZU5hbWVzcGFjZXMobnMpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLm9wdGlvbnMubnMuaW5kZXhPZihucyk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfTtcblxuICBSZXNvdXJjZVN0b3JlLnByb3RvdHlwZS5nZXRSZXNvdXJjZSA9IGZ1bmN0aW9uIGdldFJlc291cmNlKGxuZywgbnMsIGtleSkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiB7fTtcblxuICAgIHZhciBrZXlTZXBhcmF0b3IgPSBvcHRpb25zLmtleVNlcGFyYXRvciB8fCB0aGlzLm9wdGlvbnMua2V5U2VwYXJhdG9yO1xuICAgIGlmIChrZXlTZXBhcmF0b3IgPT09IHVuZGVmaW5lZCkga2V5U2VwYXJhdG9yID0gJy4nO1xuXG4gICAgdmFyIHBhdGggPSBbbG5nLCBuc107XG4gICAgaWYgKGtleSAmJiB0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGguY29uY2F0KGtleSk7XG4gICAgaWYgKGtleSAmJiB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykgcGF0aCA9IHBhdGguY29uY2F0KGtleVNlcGFyYXRvciA/IGtleS5zcGxpdChrZXlTZXBhcmF0b3IpIDoga2V5KTtcblxuICAgIGlmIChsbmcuaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgIHBhdGggPSBsbmcuc3BsaXQoJy4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMuZ2V0UGF0aCh0aGlzLmRhdGEsIHBhdGgpO1xuICB9O1xuXG4gIFJlc291cmNlU3RvcmUucHJvdG90eXBlLmFkZFJlc291cmNlID0gZnVuY3Rpb24gYWRkUmVzb3VyY2UobG5nLCBucywga2V5LCB2YWx1ZSkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiB7IHNpbGVudDogZmFsc2UgfTtcblxuICAgIHZhciBrZXlTZXBhcmF0b3IgPSB0aGlzLm9wdGlvbnMua2V5U2VwYXJhdG9yO1xuICAgIGlmIChrZXlTZXBhcmF0b3IgPT09IHVuZGVmaW5lZCkga2V5U2VwYXJhdG9yID0gJy4nO1xuXG4gICAgdmFyIHBhdGggPSBbbG5nLCBuc107XG4gICAgaWYgKGtleSkgcGF0aCA9IHBhdGguY29uY2F0KGtleVNlcGFyYXRvciA/IGtleS5zcGxpdChrZXlTZXBhcmF0b3IpIDoga2V5KTtcblxuICAgIGlmIChsbmcuaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgIHBhdGggPSBsbmcuc3BsaXQoJy4nKTtcbiAgICAgIHZhbHVlID0gbnM7XG4gICAgICBucyA9IHBhdGhbMV07XG4gICAgfVxuXG4gICAgdGhpcy5hZGROYW1lc3BhY2VzKG5zKTtcblxuICAgIHV0aWxzLnNldFBhdGgodGhpcy5kYXRhLCBwYXRoLCB2YWx1ZSk7XG5cbiAgICBpZiAoIW9wdGlvbnMuc2lsZW50KSB0aGlzLmVtaXQoJ2FkZGVkJywgbG5nLCBucywga2V5LCB2YWx1ZSk7XG4gIH07XG5cbiAgUmVzb3VyY2VTdG9yZS5wcm90b3R5cGUuYWRkUmVzb3VyY2VzID0gZnVuY3Rpb24gYWRkUmVzb3VyY2VzKGxuZywgbnMsIHJlc291cmNlcykge1xuICAgIC8qIGVzbGludCBuby1yZXN0cmljdGVkLXN5bnRheDogMCAqL1xuICAgIGZvciAodmFyIG0gaW4gcmVzb3VyY2VzKSB7XG4gICAgICBpZiAodHlwZW9mIHJlc291cmNlc1ttXSA9PT0gJ3N0cmluZycpIHRoaXMuYWRkUmVzb3VyY2UobG5nLCBucywgbSwgcmVzb3VyY2VzW21dLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICB9XG4gICAgdGhpcy5lbWl0KCdhZGRlZCcsIGxuZywgbnMsIHJlc291cmNlcyk7XG4gIH07XG5cbiAgUmVzb3VyY2VTdG9yZS5wcm90b3R5cGUuYWRkUmVzb3VyY2VCdW5kbGUgPSBmdW5jdGlvbiBhZGRSZXNvdXJjZUJ1bmRsZShsbmcsIG5zLCByZXNvdXJjZXMsIGRlZXAsIG92ZXJ3cml0ZSkge1xuICAgIHZhciBwYXRoID0gW2xuZywgbnNdO1xuICAgIGlmIChsbmcuaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgIHBhdGggPSBsbmcuc3BsaXQoJy4nKTtcbiAgICAgIGRlZXAgPSByZXNvdXJjZXM7XG4gICAgICByZXNvdXJjZXMgPSBucztcbiAgICAgIG5zID0gcGF0aFsxXTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE5hbWVzcGFjZXMobnMpO1xuXG4gICAgdmFyIHBhY2sgPSB1dGlscy5nZXRQYXRoKHRoaXMuZGF0YSwgcGF0aCkgfHwge307XG5cbiAgICBpZiAoZGVlcCkge1xuICAgICAgdXRpbHMuZGVlcEV4dGVuZChwYWNrLCByZXNvdXJjZXMsIG92ZXJ3cml0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhY2sgPSBfZXh0ZW5kcyh7fSwgcGFjaywgcmVzb3VyY2VzKTtcbiAgICB9XG5cbiAgICB1dGlscy5zZXRQYXRoKHRoaXMuZGF0YSwgcGF0aCwgcGFjayk7XG5cbiAgICB0aGlzLmVtaXQoJ2FkZGVkJywgbG5nLCBucywgcmVzb3VyY2VzKTtcbiAgfTtcblxuICBSZXNvdXJjZVN0b3JlLnByb3RvdHlwZS5yZW1vdmVSZXNvdXJjZUJ1bmRsZSA9IGZ1bmN0aW9uIHJlbW92ZVJlc291cmNlQnVuZGxlKGxuZywgbnMpIHtcbiAgICBpZiAodGhpcy5oYXNSZXNvdXJjZUJ1bmRsZShsbmcsIG5zKSkge1xuICAgICAgZGVsZXRlIHRoaXMuZGF0YVtsbmddW25zXTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVOYW1lc3BhY2VzKG5zKTtcblxuICAgIHRoaXMuZW1pdCgncmVtb3ZlZCcsIGxuZywgbnMpO1xuICB9O1xuXG4gIFJlc291cmNlU3RvcmUucHJvdG90eXBlLmhhc1Jlc291cmNlQnVuZGxlID0gZnVuY3Rpb24gaGFzUmVzb3VyY2VCdW5kbGUobG5nLCBucykge1xuICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlKGxuZywgbnMpICE9PSB1bmRlZmluZWQ7XG4gIH07XG5cbiAgUmVzb3VyY2VTdG9yZS5wcm90b3R5cGUuZ2V0UmVzb3VyY2VCdW5kbGUgPSBmdW5jdGlvbiBnZXRSZXNvdXJjZUJ1bmRsZShsbmcsIG5zKSB7XG4gICAgaWYgKCFucykgbnMgPSB0aGlzLm9wdGlvbnMuZGVmYXVsdE5TO1xuXG4gICAgLy8gQ09NUEFUSUJJTElUWTogcmVtb3ZlIGV4dGVuZCBpbiB2Mi4xLjBcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbXBhdGliaWxpdHlBUEkgPT09ICd2MScpIHJldHVybiBfZXh0ZW5kcyh7fSwgdGhpcy5nZXRSZXNvdXJjZShsbmcsIG5zKSk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZShsbmcsIG5zKTtcbiAgfTtcblxuICBSZXNvdXJjZVN0b3JlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfTtcblxuICByZXR1cm4gUmVzb3VyY2VTdG9yZTtcbn0oX0V2ZW50RW1pdHRlcjMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJlc291cmNlU3RvcmU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfbG9nZ2VyID0gcmVxdWlyZSgnLi9sb2dnZXIuanMnKTtcblxudmFyIF9sb2dnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbG9nZ2VyKTtcblxudmFyIF9FdmVudEVtaXR0ZXIyID0gcmVxdWlyZSgnLi9FdmVudEVtaXR0ZXIuanMnKTtcblxudmFyIF9FdmVudEVtaXR0ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRXZlbnRFbWl0dGVyMik7XG5cbnZhciBfcG9zdFByb2Nlc3NvciA9IHJlcXVpcmUoJy4vcG9zdFByb2Nlc3Nvci5qcycpO1xuXG52YXIgX3Bvc3RQcm9jZXNzb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zdFByb2Nlc3Nvcik7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG5cbnZhciB1dGlscyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlscyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZhdWx0cyhvYmosIGRlZmF1bHRzKSB7IHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGVmYXVsdHMpOyBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHsgdmFyIGtleSA9IGtleXNbaV07IHZhciB2YWx1ZSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZGVmYXVsdHMsIGtleSk7IGlmICh2YWx1ZSAmJiB2YWx1ZS5jb25maWd1cmFibGUgJiYgb2JqW2tleV0gPT09IHVuZGVmaW5lZCkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKTsgfSB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogX2RlZmF1bHRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG52YXIgVHJhbnNsYXRvciA9IGZ1bmN0aW9uIChfRXZlbnRFbWl0dGVyKSB7XG4gIF9pbmhlcml0cyhUcmFuc2xhdG9yLCBfRXZlbnRFbWl0dGVyKTtcblxuICBmdW5jdGlvbiBUcmFuc2xhdG9yKHNlcnZpY2VzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRyYW5zbGF0b3IpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0V2ZW50RW1pdHRlci5jYWxsKHRoaXMpKTtcblxuICAgIHV0aWxzLmNvcHkoWydyZXNvdXJjZVN0b3JlJywgJ2xhbmd1YWdlVXRpbHMnLCAncGx1cmFsUmVzb2x2ZXInLCAnaW50ZXJwb2xhdG9yJywgJ2JhY2tlbmRDb25uZWN0b3InXSwgc2VydmljZXMsIF90aGlzKTtcblxuICAgIF90aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIF90aGlzLmxvZ2dlciA9IF9sb2dnZXIyLmRlZmF1bHQuY3JlYXRlKCd0cmFuc2xhdG9yJyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgVHJhbnNsYXRvci5wcm90b3R5cGUuY2hhbmdlTGFuZ3VhZ2UgPSBmdW5jdGlvbiBjaGFuZ2VMYW5ndWFnZShsbmcpIHtcbiAgICBpZiAobG5nKSB0aGlzLmxhbmd1YWdlID0gbG5nO1xuICB9O1xuXG4gIFRyYW5zbGF0b3IucHJvdG90eXBlLmV4aXN0cyA9IGZ1bmN0aW9uIGV4aXN0cyhrZXkpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogeyBpbnRlcnBvbGF0aW9uOiB7fSB9O1xuXG4gICAgdmFyIHJlc29sdmVkID0gdGhpcy5yZXNvbHZlKGtleSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlc29sdmVkICYmIHJlc29sdmVkLnJlcyAhPT0gdW5kZWZpbmVkO1xuICB9O1xuXG4gIFRyYW5zbGF0b3IucHJvdG90eXBlLmV4dHJhY3RGcm9tS2V5ID0gZnVuY3Rpb24gZXh0cmFjdEZyb21LZXkoa2V5LCBvcHRpb25zKSB7XG4gICAgdmFyIG5zU2VwYXJhdG9yID0gb3B0aW9ucy5uc1NlcGFyYXRvciB8fCB0aGlzLm9wdGlvbnMubnNTZXBhcmF0b3I7XG4gICAgaWYgKG5zU2VwYXJhdG9yID09PSB1bmRlZmluZWQpIG5zU2VwYXJhdG9yID0gJzonO1xuICAgIHZhciBrZXlTZXBhcmF0b3IgPSBvcHRpb25zLmtleVNlcGFyYXRvciB8fCB0aGlzLm9wdGlvbnMua2V5U2VwYXJhdG9yIHx8ICcuJztcblxuICAgIHZhciBuYW1lc3BhY2VzID0gb3B0aW9ucy5ucyB8fCB0aGlzLm9wdGlvbnMuZGVmYXVsdE5TO1xuICAgIGlmIChuc1NlcGFyYXRvciAmJiBrZXkuaW5kZXhPZihuc1NlcGFyYXRvcikgPiAtMSkge1xuICAgICAgdmFyIHBhcnRzID0ga2V5LnNwbGl0KG5zU2VwYXJhdG9yKTtcbiAgICAgIGlmIChuc1NlcGFyYXRvciAhPT0ga2V5U2VwYXJhdG9yIHx8IG5zU2VwYXJhdG9yID09PSBrZXlTZXBhcmF0b3IgJiYgdGhpcy5vcHRpb25zLm5zLmluZGV4T2YocGFydHNbMF0pID4gLTEpIG5hbWVzcGFjZXMgPSBwYXJ0cy5zaGlmdCgpO1xuICAgICAga2V5ID0gcGFydHMuam9pbihrZXlTZXBhcmF0b3IpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnKSBuYW1lc3BhY2VzID0gW25hbWVzcGFjZXNdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGtleToga2V5LFxuICAgICAgbmFtZXNwYWNlczogbmFtZXNwYWNlc1xuICAgIH07XG4gIH07XG5cbiAgVHJhbnNsYXRvci5wcm90b3R5cGUudHJhbnNsYXRlID0gZnVuY3Rpb24gdHJhbnNsYXRlKGtleXMsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmICgodHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9wdGlvbnMpKSAhPT0gJ29iamVjdCcgJiYgdGhpcy5vcHRpb25zLm92ZXJsb2FkVHJhbnNsYXRpb25PcHRpb25IYW5kbGVyKSB7XG4gICAgICAvKiBlc2xpbnQgcHJlZmVyLXJlc3QtcGFyYW1zOiAwICovXG4gICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zLm92ZXJsb2FkVHJhbnNsYXRpb25PcHRpb25IYW5kbGVyKGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuXG4gICAgLy8gbm9uIHZhbGlkIGtleXMgaGFuZGxpbmdcbiAgICBpZiAoa2V5cyA9PT0gdW5kZWZpbmVkIHx8IGtleXMgPT09IG51bGwgfHwga2V5cyA9PT0gJycpIHJldHVybiAnJztcbiAgICBpZiAodHlwZW9mIGtleXMgPT09ICdudW1iZXInKSBrZXlzID0gU3RyaW5nKGtleXMpO1xuICAgIGlmICh0eXBlb2Yga2V5cyA9PT0gJ3N0cmluZycpIGtleXMgPSBba2V5c107XG5cbiAgICAvLyBzZXBhcmF0b3JzXG4gICAgdmFyIGtleVNlcGFyYXRvciA9IG9wdGlvbnMua2V5U2VwYXJhdG9yIHx8IHRoaXMub3B0aW9ucy5rZXlTZXBhcmF0b3IgfHwgJy4nO1xuXG4gICAgLy8gZ2V0IG5hbWVzcGFjZShzKVxuXG4gICAgdmFyIF9leHRyYWN0RnJvbUtleSA9IHRoaXMuZXh0cmFjdEZyb21LZXkoa2V5c1trZXlzLmxlbmd0aCAtIDFdLCBvcHRpb25zKSxcbiAgICAgICAga2V5ID0gX2V4dHJhY3RGcm9tS2V5LmtleSxcbiAgICAgICAgbmFtZXNwYWNlcyA9IF9leHRyYWN0RnJvbUtleS5uYW1lc3BhY2VzO1xuXG4gICAgdmFyIG5hbWVzcGFjZSA9IG5hbWVzcGFjZXNbbmFtZXNwYWNlcy5sZW5ndGggLSAxXTtcblxuICAgIC8vIHJldHVybiBrZXkgb24gQ0lNb2RlXG4gICAgdmFyIGxuZyA9IG9wdGlvbnMubG5nIHx8IHRoaXMubGFuZ3VhZ2U7XG4gICAgdmFyIGFwcGVuZE5hbWVzcGFjZVRvQ0lNb2RlID0gb3B0aW9ucy5hcHBlbmROYW1lc3BhY2VUb0NJTW9kZSB8fCB0aGlzLm9wdGlvbnMuYXBwZW5kTmFtZXNwYWNlVG9DSU1vZGU7XG4gICAgaWYgKGxuZyAmJiBsbmcudG9Mb3dlckNhc2UoKSA9PT0gJ2NpbW9kZScpIHtcbiAgICAgIGlmIChhcHBlbmROYW1lc3BhY2VUb0NJTW9kZSkge1xuICAgICAgICB2YXIgbnNTZXBhcmF0b3IgPSBvcHRpb25zLm5zU2VwYXJhdG9yIHx8IHRoaXMub3B0aW9ucy5uc1NlcGFyYXRvcjtcbiAgICAgICAgcmV0dXJuIG5hbWVzcGFjZSArIG5zU2VwYXJhdG9yICsga2V5O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cblxuICAgIC8vIHJlc29sdmUgZnJvbSBzdG9yZVxuICAgIHZhciByZXNvbHZlZCA9IHRoaXMucmVzb2x2ZShrZXlzLCBvcHRpb25zKTtcbiAgICB2YXIgcmVzID0gcmVzb2x2ZWQgJiYgcmVzb2x2ZWQucmVzO1xuICAgIHZhciByZXNVc2VkS2V5ID0gcmVzb2x2ZWQgJiYgcmVzb2x2ZWQudXNlZEtleSB8fCBrZXk7XG5cbiAgICB2YXIgcmVzVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkocmVzKTtcbiAgICB2YXIgbm9PYmplY3QgPSBbJ1tvYmplY3QgTnVtYmVyXScsICdbb2JqZWN0IEZ1bmN0aW9uXScsICdbb2JqZWN0IFJlZ0V4cF0nXTtcbiAgICB2YXIgam9pbkFycmF5cyA9IG9wdGlvbnMuam9pbkFycmF5cyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5qb2luQXJyYXlzIDogdGhpcy5vcHRpb25zLmpvaW5BcnJheXM7XG5cbiAgICAvLyBvYmplY3RcbiAgICB2YXIgaGFuZGxlQXNPYmplY3QgPSB0eXBlb2YgcmVzICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgcmVzICE9PSAnYm9vbGVhbicgJiYgdHlwZW9mIHJlcyAhPT0gJ251bWJlcic7XG4gICAgaWYgKHJlcyAmJiBoYW5kbGVBc09iamVjdCAmJiBub09iamVjdC5pbmRleE9mKHJlc1R5cGUpIDwgMCAmJiAhKGpvaW5BcnJheXMgJiYgcmVzVHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykpIHtcbiAgICAgIGlmICghb3B0aW9ucy5yZXR1cm5PYmplY3RzICYmICF0aGlzLm9wdGlvbnMucmV0dXJuT2JqZWN0cykge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdhY2Nlc3NpbmcgYW4gb2JqZWN0IC0gYnV0IHJldHVybk9iamVjdHMgb3B0aW9ucyBpcyBub3QgZW5hYmxlZCEnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZXR1cm5lZE9iamVjdEhhbmRsZXIgPyB0aGlzLm9wdGlvbnMucmV0dXJuZWRPYmplY3RIYW5kbGVyKHJlc1VzZWRLZXksIHJlcywgb3B0aW9ucykgOiAna2V5IFxcJycgKyBrZXkgKyAnICgnICsgdGhpcy5sYW5ndWFnZSArICcpXFwnIHJldHVybmVkIGFuIG9iamVjdCBpbnN0ZWFkIG9mIHN0cmluZy4nO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB3ZSBnb3QgYSBzZXBhcmF0b3Igd2UgbG9vcCBvdmVyIGNoaWxkcmVuIC0gZWxzZSB3ZSBqdXN0IHJldHVybiBvYmplY3QgYXMgaXNcbiAgICAgIC8vIGFzIGhhdmluZyBpdCBzZXQgdG8gZmFsc2UgbWVhbnMgbm8gaGllcmFyY2h5IHNvIG5vIGxvb2t1cCBmb3IgbmVzdGVkIHZhbHVlc1xuICAgICAgaWYgKG9wdGlvbnMua2V5U2VwYXJhdG9yIHx8IHRoaXMub3B0aW9ucy5rZXlTZXBhcmF0b3IpIHtcbiAgICAgICAgdmFyIGNvcHkgPSByZXNUeXBlID09PSAnW29iamVjdCBBcnJheV0nID8gW10gOiB7fTsgLy8gYXBwbHkgY2hpbGQgdHJhbnNsYXRpb24gb24gYSBjb3B5XG5cbiAgICAgICAgLyogZXNsaW50IG5vLXJlc3RyaWN0ZWQtc3ludGF4OiAwICovXG4gICAgICAgIGZvciAodmFyIG0gaW4gcmVzKSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXMsIG0pKSB7XG4gICAgICAgICAgICB2YXIgZGVlcEtleSA9ICcnICsgcmVzVXNlZEtleSArIGtleVNlcGFyYXRvciArIG07XG4gICAgICAgICAgICBjb3B5W21dID0gdGhpcy50cmFuc2xhdGUoZGVlcEtleSwgX2V4dGVuZHMoe30sIG9wdGlvbnMsIHsgam9pbkFycmF5czogZmFsc2UsIG5zOiBuYW1lc3BhY2VzIH0pKTtcbiAgICAgICAgICAgIGlmIChjb3B5W21dID09PSBkZWVwS2V5KSBjb3B5W21dID0gcmVzW21dOyAvLyBpZiBub3RoaW5nIGZvdW5kIHVzZSBvcmdpbmFsIHZhbHVlIGFzIGZhbGxiYWNrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlcyA9IGNvcHk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChqb2luQXJyYXlzICYmIHJlc1R5cGUgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIC8vIGFycmF5IHNwZWNpYWwgdHJlYXRtZW50XG4gICAgICByZXMgPSByZXMuam9pbihqb2luQXJyYXlzKTtcbiAgICAgIGlmIChyZXMpIHJlcyA9IHRoaXMuZXh0ZW5kVHJhbnNsYXRpb24ocmVzLCBrZXlzLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc3RyaW5nLCBlbXB0eSBvciBudWxsXG4gICAgICB2YXIgdXNlZERlZmF1bHQgPSBmYWxzZTtcbiAgICAgIHZhciB1c2VkS2V5ID0gZmFsc2U7XG5cbiAgICAgIC8vIGZhbGxiYWNrIHZhbHVlXG4gICAgICBpZiAoIXRoaXMuaXNWYWxpZExvb2t1cChyZXMpICYmIG9wdGlvbnMuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXNlZERlZmF1bHQgPSB0cnVlO1xuICAgICAgICByZXMgPSBvcHRpb25zLmRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5pc1ZhbGlkTG9va3VwKHJlcykpIHtcbiAgICAgICAgdXNlZEtleSA9IHRydWU7XG4gICAgICAgIHJlcyA9IGtleTtcbiAgICAgIH1cblxuICAgICAgLy8gc2F2ZSBtaXNzaW5nXG4gICAgICB2YXIgdXBkYXRlTWlzc2luZyA9IG9wdGlvbnMuZGVmYXVsdFZhbHVlICYmIG9wdGlvbnMuZGVmYXVsdFZhbHVlICE9PSByZXMgJiYgdGhpcy5vcHRpb25zLnVwZGF0ZU1pc3Npbmc7XG4gICAgICBpZiAodXNlZEtleSB8fCB1c2VkRGVmYXVsdCB8fCB1cGRhdGVNaXNzaW5nKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyh1cGRhdGVNaXNzaW5nID8gJ3VwZGF0ZUtleScgOiAnbWlzc2luZ0tleScsIGxuZywgbmFtZXNwYWNlLCBrZXksIHVwZGF0ZU1pc3NpbmcgPyBvcHRpb25zLmRlZmF1bHRWYWx1ZSA6IHJlcyk7XG5cbiAgICAgICAgdmFyIGxuZ3MgPSBbXTtcbiAgICAgICAgdmFyIGZhbGxiYWNrTG5ncyA9IHRoaXMubGFuZ3VhZ2VVdGlscy5nZXRGYWxsYmFja0NvZGVzKHRoaXMub3B0aW9ucy5mYWxsYmFja0xuZywgb3B0aW9ucy5sbmcgfHwgdGhpcy5sYW5ndWFnZSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2F2ZU1pc3NpbmdUbyA9PT0gJ2ZhbGxiYWNrJyAmJiBmYWxsYmFja0xuZ3MgJiYgZmFsbGJhY2tMbmdzWzBdKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmYWxsYmFja0xuZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxuZ3MucHVzaChmYWxsYmFja0xuZ3NbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuc2F2ZU1pc3NpbmdUbyA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICBsbmdzID0gdGhpcy5sYW5ndWFnZVV0aWxzLnRvUmVzb2x2ZUhpZXJhcmNoeShvcHRpb25zLmxuZyB8fCB0aGlzLmxhbmd1YWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsbmdzLnB1c2gob3B0aW9ucy5sbmcgfHwgdGhpcy5sYW5ndWFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VuZCA9IGZ1bmN0aW9uIHNlbmQobCwgaykge1xuICAgICAgICAgIGlmIChfdGhpczIub3B0aW9ucy5taXNzaW5nS2V5SGFuZGxlcikge1xuICAgICAgICAgICAgX3RoaXMyLm9wdGlvbnMubWlzc2luZ0tleUhhbmRsZXIobCwgbmFtZXNwYWNlLCBrLCB1cGRhdGVNaXNzaW5nID8gb3B0aW9ucy5kZWZhdWx0VmFsdWUgOiByZXMsIHVwZGF0ZU1pc3NpbmcsIG9wdGlvbnMpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoX3RoaXMyLmJhY2tlbmRDb25uZWN0b3IgJiYgX3RoaXMyLmJhY2tlbmRDb25uZWN0b3Iuc2F2ZU1pc3NpbmcpIHtcbiAgICAgICAgICAgIF90aGlzMi5iYWNrZW5kQ29ubmVjdG9yLnNhdmVNaXNzaW5nKGwsIG5hbWVzcGFjZSwgaywgdXBkYXRlTWlzc2luZyA/IG9wdGlvbnMuZGVmYXVsdFZhbHVlIDogcmVzLCB1cGRhdGVNaXNzaW5nLCBvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgX3RoaXMyLmVtaXQoJ21pc3NpbmdLZXknLCBsLCBuYW1lc3BhY2UsIGssIHJlcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zYXZlTWlzc2luZykge1xuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2F2ZU1pc3NpbmdQbHVyYWxzICYmIG9wdGlvbnMuY291bnQpIHtcbiAgICAgICAgICAgIGxuZ3MuZm9yRWFjaChmdW5jdGlvbiAobCkge1xuICAgICAgICAgICAgICB2YXIgcGx1cmFscyA9IF90aGlzMi5wbHVyYWxSZXNvbHZlci5nZXRQbHVyYWxGb3Jtc09mS2V5KGwsIGtleSk7XG5cbiAgICAgICAgICAgICAgcGx1cmFscy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbmQoW2xdLCBwKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VuZChsbmdzLCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBleHRlbmRcbiAgICAgIHJlcyA9IHRoaXMuZXh0ZW5kVHJhbnNsYXRpb24ocmVzLCBrZXlzLCBvcHRpb25zKTtcblxuICAgICAgLy8gYXBwZW5kIG5hbWVzcGFjZSBpZiBzdGlsbCBrZXlcbiAgICAgIGlmICh1c2VkS2V5ICYmIHJlcyA9PT0ga2V5ICYmIHRoaXMub3B0aW9ucy5hcHBlbmROYW1lc3BhY2VUb01pc3NpbmdLZXkpIHJlcyA9IG5hbWVzcGFjZSArICc6JyArIGtleTtcblxuICAgICAgLy8gcGFyc2VNaXNzaW5nS2V5SGFuZGxlclxuICAgICAgaWYgKHVzZWRLZXkgJiYgdGhpcy5vcHRpb25zLnBhcnNlTWlzc2luZ0tleUhhbmRsZXIpIHJlcyA9IHRoaXMub3B0aW9ucy5wYXJzZU1pc3NpbmdLZXlIYW5kbGVyKHJlcyk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuXG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBUcmFuc2xhdG9yLnByb3RvdHlwZS5leHRlbmRUcmFuc2xhdGlvbiA9IGZ1bmN0aW9uIGV4dGVuZFRyYW5zbGF0aW9uKHJlcywga2V5LCBvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICBpZiAob3B0aW9ucy5pbnRlcnBvbGF0aW9uKSB0aGlzLmludGVycG9sYXRvci5pbml0KF9leHRlbmRzKHt9LCBvcHRpb25zLCB7IGludGVycG9sYXRpb246IF9leHRlbmRzKHt9LCB0aGlzLm9wdGlvbnMuaW50ZXJwb2xhdGlvbiwgb3B0aW9ucy5pbnRlcnBvbGF0aW9uKSB9KSk7XG5cbiAgICAvLyBpbnRlcnBvbGF0ZVxuICAgIHZhciBkYXRhID0gb3B0aW9ucy5yZXBsYWNlICYmIHR5cGVvZiBvcHRpb25zLnJlcGxhY2UgIT09ICdzdHJpbmcnID8gb3B0aW9ucy5yZXBsYWNlIDogb3B0aW9ucztcbiAgICBpZiAodGhpcy5vcHRpb25zLmludGVycG9sYXRpb24uZGVmYXVsdFZhcmlhYmxlcykgZGF0YSA9IF9leHRlbmRzKHt9LCB0aGlzLm9wdGlvbnMuaW50ZXJwb2xhdGlvbi5kZWZhdWx0VmFyaWFibGVzLCBkYXRhKTtcbiAgICByZXMgPSB0aGlzLmludGVycG9sYXRvci5pbnRlcnBvbGF0ZShyZXMsIGRhdGEsIG9wdGlvbnMubG5nIHx8IHRoaXMubGFuZ3VhZ2UpO1xuXG4gICAgLy8gbmVzdGluZ1xuICAgIGlmIChvcHRpb25zLm5lc3QgIT09IGZhbHNlKSByZXMgPSB0aGlzLmludGVycG9sYXRvci5uZXN0KHJlcywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzMy50cmFuc2xhdGUuYXBwbHkoX3RoaXMzLCBhcmd1bWVudHMpO1xuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMuaW50ZXJwb2xhdGlvbikgdGhpcy5pbnRlcnBvbGF0b3IucmVzZXQoKTtcblxuICAgIC8vIHBvc3QgcHJvY2Vzc1xuICAgIHZhciBwb3N0UHJvY2VzcyA9IG9wdGlvbnMucG9zdFByb2Nlc3MgfHwgdGhpcy5vcHRpb25zLnBvc3RQcm9jZXNzO1xuICAgIHZhciBwb3N0UHJvY2Vzc29yTmFtZXMgPSB0eXBlb2YgcG9zdFByb2Nlc3MgPT09ICdzdHJpbmcnID8gW3Bvc3RQcm9jZXNzXSA6IHBvc3RQcm9jZXNzO1xuXG4gICAgaWYgKHJlcyAhPT0gdW5kZWZpbmVkICYmIHJlcyAhPT0gbnVsbCAmJiBwb3N0UHJvY2Vzc29yTmFtZXMgJiYgcG9zdFByb2Nlc3Nvck5hbWVzLmxlbmd0aCAmJiBvcHRpb25zLmFwcGx5UG9zdFByb2Nlc3NvciAhPT0gZmFsc2UpIHtcbiAgICAgIHJlcyA9IF9wb3N0UHJvY2Vzc29yMi5kZWZhdWx0LmhhbmRsZShwb3N0UHJvY2Vzc29yTmFtZXMsIHJlcywga2V5LCBvcHRpb25zLCB0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIFRyYW5zbGF0b3IucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiByZXNvbHZlKGtleXMpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIHZhciBmb3VuZCA9IHZvaWQgMDtcbiAgICB2YXIgdXNlZEtleSA9IHZvaWQgMDtcblxuICAgIGlmICh0eXBlb2Yga2V5cyA9PT0gJ3N0cmluZycpIGtleXMgPSBba2V5c107XG5cbiAgICAvLyBmb3JFYWNoIHBvc3NpYmxlIGtleVxuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgaWYgKF90aGlzNC5pc1ZhbGlkTG9va3VwKGZvdW5kKSkgcmV0dXJuO1xuICAgICAgdmFyIGV4dHJhY3RlZCA9IF90aGlzNC5leHRyYWN0RnJvbUtleShrLCBvcHRpb25zKTtcbiAgICAgIHZhciBrZXkgPSBleHRyYWN0ZWQua2V5O1xuICAgICAgdXNlZEtleSA9IGtleTtcbiAgICAgIHZhciBuYW1lc3BhY2VzID0gZXh0cmFjdGVkLm5hbWVzcGFjZXM7XG4gICAgICBpZiAoX3RoaXM0Lm9wdGlvbnMuZmFsbGJhY2tOUykgbmFtZXNwYWNlcyA9IG5hbWVzcGFjZXMuY29uY2F0KF90aGlzNC5vcHRpb25zLmZhbGxiYWNrTlMpO1xuXG4gICAgICB2YXIgbmVlZHNQbHVyYWxIYW5kbGluZyA9IG9wdGlvbnMuY291bnQgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5jb3VudCAhPT0gJ3N0cmluZyc7XG4gICAgICB2YXIgbmVlZHNDb250ZXh0SGFuZGxpbmcgPSBvcHRpb25zLmNvbnRleHQgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5jb250ZXh0ID09PSAnc3RyaW5nJyAmJiBvcHRpb25zLmNvbnRleHQgIT09ICcnO1xuXG4gICAgICB2YXIgY29kZXMgPSBvcHRpb25zLmxuZ3MgPyBvcHRpb25zLmxuZ3MgOiBfdGhpczQubGFuZ3VhZ2VVdGlscy50b1Jlc29sdmVIaWVyYXJjaHkob3B0aW9ucy5sbmcgfHwgX3RoaXM0Lmxhbmd1YWdlKTtcblxuICAgICAgbmFtZXNwYWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChucykge1xuICAgICAgICBpZiAoX3RoaXM0LmlzVmFsaWRMb29rdXAoZm91bmQpKSByZXR1cm47XG5cbiAgICAgICAgY29kZXMuZm9yRWFjaChmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICAgIGlmIChfdGhpczQuaXNWYWxpZExvb2t1cChmb3VuZCkpIHJldHVybjtcblxuICAgICAgICAgIHZhciBmaW5hbEtleSA9IGtleTtcbiAgICAgICAgICB2YXIgZmluYWxLZXlzID0gW2ZpbmFsS2V5XTtcblxuICAgICAgICAgIHZhciBwbHVyYWxTdWZmaXggPSB2b2lkIDA7XG4gICAgICAgICAgaWYgKG5lZWRzUGx1cmFsSGFuZGxpbmcpIHBsdXJhbFN1ZmZpeCA9IF90aGlzNC5wbHVyYWxSZXNvbHZlci5nZXRTdWZmaXgoY29kZSwgb3B0aW9ucy5jb3VudCk7XG5cbiAgICAgICAgICAvLyBmYWxsYmFjayBmb3IgcGx1cmFsIGlmIGNvbnRleHQgbm90IGZvdW5kXG4gICAgICAgICAgaWYgKG5lZWRzUGx1cmFsSGFuZGxpbmcgJiYgbmVlZHNDb250ZXh0SGFuZGxpbmcpIGZpbmFsS2V5cy5wdXNoKGZpbmFsS2V5ICsgcGx1cmFsU3VmZml4KTtcblxuICAgICAgICAgIC8vIGdldCBrZXkgZm9yIGNvbnRleHQgaWYgbmVlZGVkXG4gICAgICAgICAgaWYgKG5lZWRzQ29udGV4dEhhbmRsaW5nKSBmaW5hbEtleXMucHVzaChmaW5hbEtleSArPSAnJyArIF90aGlzNC5vcHRpb25zLmNvbnRleHRTZXBhcmF0b3IgKyBvcHRpb25zLmNvbnRleHQpO1xuXG4gICAgICAgICAgLy8gZ2V0IGtleSBmb3IgcGx1cmFsIGlmIG5lZWRlZFxuICAgICAgICAgIGlmIChuZWVkc1BsdXJhbEhhbmRsaW5nKSBmaW5hbEtleXMucHVzaChmaW5hbEtleSArPSBwbHVyYWxTdWZmaXgpO1xuXG4gICAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGZpbmFsS2V5cyBzdGFydGluZyB3aXRoIG1vc3Qgc3BlY2lmaWMgcGx1cmFsa2V5ICgtPiBjb250ZXh0a2V5IG9ubHkpIC0+IHNpbmd1bGFya2V5IG9ubHlcbiAgICAgICAgICB2YXIgcG9zc2libGVLZXkgPSB2b2lkIDA7XG4gICAgICAgICAgLyogZXNsaW50IG5vLWNvbmQtYXNzaWduOiAwICovXG4gICAgICAgICAgd2hpbGUgKHBvc3NpYmxlS2V5ID0gZmluYWxLZXlzLnBvcCgpKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzNC5pc1ZhbGlkTG9va3VwKGZvdW5kKSkge1xuICAgICAgICAgICAgICBmb3VuZCA9IF90aGlzNC5nZXRSZXNvdXJjZShjb2RlLCBucywgcG9zc2libGVLZXksIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7IHJlczogZm91bmQsIHVzZWRLZXk6IHVzZWRLZXkgfTtcbiAgfTtcblxuICBUcmFuc2xhdG9yLnByb3RvdHlwZS5pc1ZhbGlkTG9va3VwID0gZnVuY3Rpb24gaXNWYWxpZExvb2t1cChyZXMpIHtcbiAgICByZXR1cm4gcmVzICE9PSB1bmRlZmluZWQgJiYgISghdGhpcy5vcHRpb25zLnJldHVybk51bGwgJiYgcmVzID09PSBudWxsKSAmJiAhKCF0aGlzLm9wdGlvbnMucmV0dXJuRW1wdHlTdHJpbmcgJiYgcmVzID09PSAnJyk7XG4gIH07XG5cbiAgVHJhbnNsYXRvci5wcm90b3R5cGUuZ2V0UmVzb3VyY2UgPSBmdW5jdGlvbiBnZXRSZXNvdXJjZShjb2RlLCBucywga2V5KSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHt9O1xuXG4gICAgcmV0dXJuIHRoaXMucmVzb3VyY2VTdG9yZS5nZXRSZXNvdXJjZShjb2RlLCBucywga2V5LCBvcHRpb25zKTtcbiAgfTtcblxuICByZXR1cm4gVHJhbnNsYXRvcjtcbn0oX0V2ZW50RW1pdHRlcjMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRyYW5zbGF0b3I7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy50cmFuc2Zvcm1PcHRpb25zID0gdHJhbnNmb3JtT3B0aW9ucztcbmZ1bmN0aW9uIGdldCgpIHtcbiAgcmV0dXJuIHtcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgaW5pdEltbWVkaWF0ZTogdHJ1ZSxcblxuICAgIG5zOiBbJ3RyYW5zbGF0aW9uJ10sXG4gICAgZGVmYXVsdE5TOiBbJ3RyYW5zbGF0aW9uJ10sXG4gICAgZmFsbGJhY2tMbmc6IFsnZGV2J10sXG4gICAgZmFsbGJhY2tOUzogZmFsc2UsIC8vIHN0cmluZyBvciBhcnJheSBvZiBuYW1lc3BhY2VzXG5cbiAgICB3aGl0ZWxpc3Q6IGZhbHNlLCAvLyBhcnJheSB3aXRoIHdoaXRlbGlzdGVkIGxhbmd1YWdlc1xuICAgIG5vbkV4cGxpY2l0V2hpdGVsaXN0OiBmYWxzZSxcbiAgICBsb2FkOiAnYWxsJywgLy8gfCBjdXJyZW50T25seSB8IGxhbmd1YWdlT25seVxuICAgIHByZWxvYWQ6IGZhbHNlLCAvLyBhcnJheSB3aXRoIHByZWxvYWQgbGFuZ3VhZ2VzXG5cbiAgICBzaW1wbGlmeVBsdXJhbFN1ZmZpeDogdHJ1ZSxcbiAgICBrZXlTZXBhcmF0b3I6ICcuJyxcbiAgICBuc1NlcGFyYXRvcjogJzonLFxuICAgIHBsdXJhbFNlcGFyYXRvcjogJ18nLFxuICAgIGNvbnRleHRTZXBhcmF0b3I6ICdfJyxcblxuICAgIHNhdmVNaXNzaW5nOiBmYWxzZSwgLy8gZW5hYmxlIHRvIHNlbmQgbWlzc2luZyB2YWx1ZXNcbiAgICB1cGRhdGVNaXNzaW5nOiBmYWxzZSwgLy8gZW5hYmxlIHRvIHVwZGF0ZSBkZWZhdWx0IHZhbHVlcyBpZiBkaWZmZXJlbnQgZnJvbSB0cmFuc2xhdGVkIHZhbHVlIChvbmx5IHVzZWZ1bCBvbiBpbml0aWFsIGRldmVsb3BtZW50LCBvciB3aGVuIGtlZXBpbmcgY29kZSBhcyBzb3VyY2Ugb2YgdHJ1dGgpXG4gICAgc2F2ZU1pc3NpbmdUbzogJ2ZhbGxiYWNrJywgLy8gJ2N1cnJlbnQnIHx8ICdhbGwnXG4gICAgc2F2ZU1pc3NpbmdQbHVyYWxzOiB0cnVlLCAvLyB3aWxsIHNhdmUgYWxsIGZvcm1zIG5vdCBvbmx5IHNpbmd1bGFyIGtleVxuICAgIG1pc3NpbmdLZXlIYW5kbGVyOiBmYWxzZSwgLy8gZnVuY3Rpb24obG5nLCBucywga2V5LCBmYWxsYmFja1ZhbHVlKSAtPiBvdmVycmlkZSBpZiBwcmVmZXIgb24gaGFuZGxpbmdcblxuICAgIHBvc3RQcm9jZXNzOiBmYWxzZSwgLy8gc3RyaW5nIG9yIGFycmF5IG9mIHBvc3RQcm9jZXNzb3IgbmFtZXNcbiAgICByZXR1cm5OdWxsOiB0cnVlLCAvLyBhbGxvd3MgbnVsbCB2YWx1ZSBhcyB2YWxpZCB0cmFuc2xhdGlvblxuICAgIHJldHVybkVtcHR5U3RyaW5nOiB0cnVlLCAvLyBhbGxvd3MgZW1wdHkgc3RyaW5nIHZhbHVlIGFzIHZhbGlkIHRyYW5zbGF0aW9uXG4gICAgcmV0dXJuT2JqZWN0czogZmFsc2UsXG4gICAgam9pbkFycmF5czogZmFsc2UsIC8vIG9yIHN0cmluZyB0byBqb2luIGFycmF5XG4gICAgcmV0dXJuZWRPYmplY3RIYW5kbGVyOiBmdW5jdGlvbiByZXR1cm5lZE9iamVjdEhhbmRsZXIoKSB7fSwgLy8gZnVuY3Rpb24oa2V5LCB2YWx1ZSwgb3B0aW9ucykgdHJpZ2dlcmVkIGlmIGtleSByZXR1cm5zIG9iamVjdCBidXQgcmV0dXJuT2JqZWN0cyBpcyBzZXQgdG8gZmFsc2VcbiAgICBwYXJzZU1pc3NpbmdLZXlIYW5kbGVyOiBmYWxzZSwgLy8gZnVuY3Rpb24oa2V5KSBwYXJzZWQgYSBrZXkgdGhhdCB3YXMgbm90IGZvdW5kIGluIHQoKSBiZWZvcmUgcmV0dXJuaW5nXG4gICAgYXBwZW5kTmFtZXNwYWNlVG9NaXNzaW5nS2V5OiBmYWxzZSxcbiAgICBhcHBlbmROYW1lc3BhY2VUb0NJTW9kZTogZmFsc2UsXG4gICAgb3ZlcmxvYWRUcmFuc2xhdGlvbk9wdGlvbkhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZShhcmdzKSB7XG4gICAgICB2YXIgcmV0ID0ge307XG4gICAgICBpZiAoYXJnc1sxXSkgcmV0LmRlZmF1bHRWYWx1ZSA9IGFyZ3NbMV07XG4gICAgICBpZiAoYXJnc1syXSkgcmV0LnREZXNjcmlwdGlvbiA9IGFyZ3NbMl07XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICBpbnRlcnBvbGF0aW9uOiB7XG4gICAgICBlc2NhcGVWYWx1ZTogdHJ1ZSxcbiAgICAgIGZvcm1hdDogZnVuY3Rpb24gZm9ybWF0KHZhbHVlLCBfZm9ybWF0LCBsbmcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSxcbiAgICAgIHByZWZpeDogJ3t7JyxcbiAgICAgIHN1ZmZpeDogJ319JyxcbiAgICAgIGZvcm1hdFNlcGFyYXRvcjogJywnLFxuICAgICAgLy8gcHJlZml4RXNjYXBlZDogJ3t7JyxcbiAgICAgIC8vIHN1ZmZpeEVzY2FwZWQ6ICd9fScsXG4gICAgICAvLyB1bmVzY2FwZVN1ZmZpeDogJycsXG4gICAgICB1bmVzY2FwZVByZWZpeDogJy0nLFxuXG4gICAgICBuZXN0aW5nUHJlZml4OiAnJHQoJyxcbiAgICAgIG5lc3RpbmdTdWZmaXg6ICcpJyxcbiAgICAgIC8vIG5lc3RpbmdQcmVmaXhFc2NhcGVkOiAnJHQoJyxcbiAgICAgIC8vIG5lc3RpbmdTdWZmaXhFc2NhcGVkOiAnKScsXG4gICAgICAvLyBkZWZhdWx0VmFyaWFibGVzOiB1bmRlZmluZWQgLy8gb2JqZWN0IHRoYXQgY2FuIGhhdmUgdmFsdWVzIHRvIGludGVycG9sYXRlIG9uIC0gZXh0ZW5kcyBwYXNzZWQgaW4gaW50ZXJwb2xhdGlvbiBkYXRhXG4gICAgICBtYXhSZXBsYWNlczogMTAwMCAvLyBtYXggcmVwbGFjZXMgdG8gcHJldmVudCBlbmRsZXNzIGxvb3BcbiAgICB9XG4gIH07XG59XG5cbi8qIGVzbGludCBuby1wYXJhbS1yZWFzc2lnbjogMCAqL1xuZXhwb3J0cy5nZXQgPSBnZXQ7XG5mdW5jdGlvbiB0cmFuc2Zvcm1PcHRpb25zKG9wdGlvbnMpIHtcbiAgLy8gY3JlYXRlIG5hbWVzcGFjZSBvYmplY3QgaWYgbmFtZXNwYWNlIGlzIHBhc3NlZCBpbiBhcyBzdHJpbmdcbiAgaWYgKHR5cGVvZiBvcHRpb25zLm5zID09PSAnc3RyaW5nJykgb3B0aW9ucy5ucyA9IFtvcHRpb25zLm5zXTtcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmZhbGxiYWNrTG5nID09PSAnc3RyaW5nJykgb3B0aW9ucy5mYWxsYmFja0xuZyA9IFtvcHRpb25zLmZhbGxiYWNrTG5nXTtcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmZhbGxiYWNrTlMgPT09ICdzdHJpbmcnKSBvcHRpb25zLmZhbGxiYWNrTlMgPSBbb3B0aW9ucy5mYWxsYmFja05TXTtcblxuICAvLyBleHRlbmQgd2hpdGVsaXN0IHdpdGggY2ltb2RlXG4gIGlmIChvcHRpb25zLndoaXRlbGlzdCAmJiBvcHRpb25zLndoaXRlbGlzdC5pbmRleE9mKCdjaW1vZGUnKSA8IDApIG9wdGlvbnMud2hpdGVsaXN0LnB1c2goJ2NpbW9kZScpO1xuXG4gIHJldHVybiBvcHRpb25zO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2xvZ2dlciA9IHJlcXVpcmUoJy4vbG9nZ2VyLmpzJyk7XG5cbnZhciBfbG9nZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xvZ2dlcik7XG5cbnZhciBfRXZlbnRFbWl0dGVyMiA9IHJlcXVpcmUoJy4vRXZlbnRFbWl0dGVyLmpzJyk7XG5cbnZhciBfRXZlbnRFbWl0dGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0V2ZW50RW1pdHRlcjIpO1xuXG52YXIgX1Jlc291cmNlU3RvcmUgPSByZXF1aXJlKCcuL1Jlc291cmNlU3RvcmUuanMnKTtcblxudmFyIF9SZXNvdXJjZVN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Jlc291cmNlU3RvcmUpO1xuXG52YXIgX1RyYW5zbGF0b3IgPSByZXF1aXJlKCcuL1RyYW5zbGF0b3IuanMnKTtcblxudmFyIF9UcmFuc2xhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RyYW5zbGF0b3IpO1xuXG52YXIgX0xhbmd1YWdlVXRpbHMgPSByZXF1aXJlKCcuL0xhbmd1YWdlVXRpbHMuanMnKTtcblxudmFyIF9MYW5ndWFnZVV0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0xhbmd1YWdlVXRpbHMpO1xuXG52YXIgX1BsdXJhbFJlc29sdmVyID0gcmVxdWlyZSgnLi9QbHVyYWxSZXNvbHZlci5qcycpO1xuXG52YXIgX1BsdXJhbFJlc29sdmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1BsdXJhbFJlc29sdmVyKTtcblxudmFyIF9JbnRlcnBvbGF0b3IgPSByZXF1aXJlKCcuL0ludGVycG9sYXRvci5qcycpO1xuXG52YXIgX0ludGVycG9sYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JbnRlcnBvbGF0b3IpO1xuXG52YXIgX0JhY2tlbmRDb25uZWN0b3IgPSByZXF1aXJlKCcuL0JhY2tlbmRDb25uZWN0b3IuanMnKTtcblxudmFyIF9CYWNrZW5kQ29ubmVjdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0JhY2tlbmRDb25uZWN0b3IpO1xuXG52YXIgX0NhY2hlQ29ubmVjdG9yID0gcmVxdWlyZSgnLi9DYWNoZUNvbm5lY3Rvci5qcycpO1xuXG52YXIgX0NhY2hlQ29ubmVjdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NhY2hlQ29ubmVjdG9yKTtcblxudmFyIF9kZWZhdWx0czIgPSByZXF1aXJlKCcuL2RlZmF1bHRzLmpzJyk7XG5cbnZhciBfcG9zdFByb2Nlc3NvciA9IHJlcXVpcmUoJy4vcG9zdFByb2Nlc3Nvci5qcycpO1xuXG52YXIgX3Bvc3RQcm9jZXNzb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zdFByb2Nlc3Nvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZhdWx0cyhvYmosIGRlZmF1bHRzKSB7IHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGVmYXVsdHMpOyBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHsgdmFyIGtleSA9IGtleXNbaV07IHZhciB2YWx1ZSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZGVmYXVsdHMsIGtleSk7IGlmICh2YWx1ZSAmJiB2YWx1ZS5jb25maWd1cmFibGUgJiYgb2JqW2tleV0gPT09IHVuZGVmaW5lZCkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKTsgfSB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogX2RlZmF1bHRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBub29wKCkge31cblxudmFyIEkxOG4gPSBmdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoSTE4biwgX0V2ZW50RW1pdHRlcik7XG5cbiAgZnVuY3Rpb24gSTE4bigpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzFdO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEkxOG4pO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0V2ZW50RW1pdHRlci5jYWxsKHRoaXMpKTtcblxuICAgIF90aGlzLm9wdGlvbnMgPSAoMCwgX2RlZmF1bHRzMi50cmFuc2Zvcm1PcHRpb25zKShvcHRpb25zKTtcbiAgICBfdGhpcy5zZXJ2aWNlcyA9IHt9O1xuICAgIF90aGlzLmxvZ2dlciA9IF9sb2dnZXIyLmRlZmF1bHQ7XG4gICAgX3RoaXMubW9kdWxlcyA9IHsgZXh0ZXJuYWw6IFtdIH07XG5cbiAgICBpZiAoY2FsbGJhY2sgJiYgIV90aGlzLmlzSW5pdGlhbGl6ZWQgJiYgIW9wdGlvbnMuaXNDbG9uZSkge1xuICAgICAgdmFyIF9yZXQ7XG5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pMThuZXh0L2kxOG5leHQvaXNzdWVzLzg3OVxuICAgICAgaWYgKCFfdGhpcy5vcHRpb25zLmluaXRJbW1lZGlhdGUpIHJldHVybiBfcmV0ID0gX3RoaXMuaW5pdChvcHRpb25zLCBjYWxsYmFjayksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5pbml0KG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBJMThuLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMV07XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5vcHRpb25zID0gX2V4dGVuZHMoe30sICgwLCBfZGVmYXVsdHMyLmdldCkoKSwgdGhpcy5vcHRpb25zLCAoMCwgX2RlZmF1bHRzMi50cmFuc2Zvcm1PcHRpb25zKShvcHRpb25zKSk7XG5cbiAgICB0aGlzLmZvcm1hdCA9IHRoaXMub3B0aW9ucy5pbnRlcnBvbGF0aW9uLmZvcm1hdDtcbiAgICBpZiAoIWNhbGxiYWNrKSBjYWxsYmFjayA9IG5vb3A7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDbGFzc09uRGVtYW5kKENsYXNzT3JPYmplY3QpIHtcbiAgICAgIGlmICghQ2xhc3NPck9iamVjdCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAodHlwZW9mIENsYXNzT3JPYmplY3QgPT09ICdmdW5jdGlvbicpIHJldHVybiBuZXcgQ2xhc3NPck9iamVjdCgpO1xuICAgICAgcmV0dXJuIENsYXNzT3JPYmplY3Q7XG4gICAgfVxuXG4gICAgLy8gaW5pdCBzZXJ2aWNlc1xuICAgIGlmICghdGhpcy5vcHRpb25zLmlzQ2xvbmUpIHtcbiAgICAgIGlmICh0aGlzLm1vZHVsZXMubG9nZ2VyKSB7XG4gICAgICAgIF9sb2dnZXIyLmRlZmF1bHQuaW5pdChjcmVhdGVDbGFzc09uRGVtYW5kKHRoaXMubW9kdWxlcy5sb2dnZXIpLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2xvZ2dlcjIuZGVmYXVsdC5pbml0KG51bGwsIHRoaXMub3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBsdSA9IG5ldyBfTGFuZ3VhZ2VVdGlsczIuZGVmYXVsdCh0aGlzLm9wdGlvbnMpO1xuICAgICAgdGhpcy5zdG9yZSA9IG5ldyBfUmVzb3VyY2VTdG9yZTIuZGVmYXVsdCh0aGlzLm9wdGlvbnMucmVzb3VyY2VzLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgICB2YXIgcyA9IHRoaXMuc2VydmljZXM7XG4gICAgICBzLmxvZ2dlciA9IF9sb2dnZXIyLmRlZmF1bHQ7XG4gICAgICBzLnJlc291cmNlU3RvcmUgPSB0aGlzLnN0b3JlO1xuICAgICAgcy5yZXNvdXJjZVN0b3JlLm9uKCdhZGRlZCByZW1vdmVkJywgZnVuY3Rpb24gKGxuZywgbnMpIHtcbiAgICAgICAgcy5jYWNoZUNvbm5lY3Rvci5zYXZlKCk7XG4gICAgICB9KTtcbiAgICAgIHMubGFuZ3VhZ2VVdGlscyA9IGx1O1xuICAgICAgcy5wbHVyYWxSZXNvbHZlciA9IG5ldyBfUGx1cmFsUmVzb2x2ZXIyLmRlZmF1bHQobHUsIHsgcHJlcGVuZDogdGhpcy5vcHRpb25zLnBsdXJhbFNlcGFyYXRvciwgY29tcGF0aWJpbGl0eUpTT046IHRoaXMub3B0aW9ucy5jb21wYXRpYmlsaXR5SlNPTiwgc2ltcGxpZnlQbHVyYWxTdWZmaXg6IHRoaXMub3B0aW9ucy5zaW1wbGlmeVBsdXJhbFN1ZmZpeCB9KTtcbiAgICAgIHMuaW50ZXJwb2xhdG9yID0gbmV3IF9JbnRlcnBvbGF0b3IyLmRlZmF1bHQodGhpcy5vcHRpb25zKTtcblxuICAgICAgcy5iYWNrZW5kQ29ubmVjdG9yID0gbmV3IF9CYWNrZW5kQ29ubmVjdG9yMi5kZWZhdWx0KGNyZWF0ZUNsYXNzT25EZW1hbmQodGhpcy5tb2R1bGVzLmJhY2tlbmQpLCBzLnJlc291cmNlU3RvcmUsIHMsIHRoaXMub3B0aW9ucyk7XG4gICAgICAvLyBwaXBlIGV2ZW50cyBmcm9tIGJhY2tlbmRDb25uZWN0b3JcbiAgICAgIHMuYmFja2VuZENvbm5lY3Rvci5vbignKicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi5lbWl0LmFwcGx5KF90aGlzMiwgW2V2ZW50XS5jb25jYXQoYXJncykpO1xuICAgICAgfSk7XG5cbiAgICAgIHMuYmFja2VuZENvbm5lY3Rvci5vbignbG9hZGVkJywgZnVuY3Rpb24gKGxvYWRlZCkge1xuICAgICAgICBzLmNhY2hlQ29ubmVjdG9yLnNhdmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBzLmNhY2hlQ29ubmVjdG9yID0gbmV3IF9DYWNoZUNvbm5lY3RvcjIuZGVmYXVsdChjcmVhdGVDbGFzc09uRGVtYW5kKHRoaXMubW9kdWxlcy5jYWNoZSksIHMucmVzb3VyY2VTdG9yZSwgcywgdGhpcy5vcHRpb25zKTtcbiAgICAgIC8vIHBpcGUgZXZlbnRzIGZyb20gYmFja2VuZENvbm5lY3RvclxuICAgICAgcy5jYWNoZUNvbm5lY3Rvci5vbignKicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi5lbWl0LmFwcGx5KF90aGlzMiwgW2V2ZW50XS5jb25jYXQoYXJncykpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLm1vZHVsZXMubGFuZ3VhZ2VEZXRlY3Rvcikge1xuICAgICAgICBzLmxhbmd1YWdlRGV0ZWN0b3IgPSBjcmVhdGVDbGFzc09uRGVtYW5kKHRoaXMubW9kdWxlcy5sYW5ndWFnZURldGVjdG9yKTtcbiAgICAgICAgcy5sYW5ndWFnZURldGVjdG9yLmluaXQocywgdGhpcy5vcHRpb25zLmRldGVjdGlvbiwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50cmFuc2xhdG9yID0gbmV3IF9UcmFuc2xhdG9yMi5kZWZhdWx0KHRoaXMuc2VydmljZXMsIHRoaXMub3B0aW9ucyk7XG4gICAgICAvLyBwaXBlIGV2ZW50cyBmcm9tIHRyYW5zbGF0b3JcbiAgICAgIHRoaXMudHJhbnNsYXRvci5vbignKicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMyA+IDEgPyBfbGVuMyAtIDEgOiAwKSwgX2tleTMgPSAxOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5MyAtIDFdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi5lbWl0LmFwcGx5KF90aGlzMiwgW2V2ZW50XS5jb25jYXQoYXJncykpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMubW9kdWxlcy5leHRlcm5hbC5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIGlmIChtLmluaXQpIG0uaW5pdChfdGhpczIpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYXBwZW5kIGFwaVxuICAgIHZhciBzdG9yZUFwaSA9IFsnZ2V0UmVzb3VyY2UnLCAnYWRkUmVzb3VyY2UnLCAnYWRkUmVzb3VyY2VzJywgJ2FkZFJlc291cmNlQnVuZGxlJywgJ3JlbW92ZVJlc291cmNlQnVuZGxlJywgJ2hhc1Jlc291cmNlQnVuZGxlJywgJ2dldFJlc291cmNlQnVuZGxlJ107XG4gICAgc3RvcmVBcGkuZm9yRWFjaChmdW5jdGlvbiAoZmNOYW1lKSB7XG4gICAgICBfdGhpczJbZmNOYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9zdG9yZTtcblxuICAgICAgICByZXR1cm4gKF9zdG9yZSA9IF90aGlzMi5zdG9yZSlbZmNOYW1lXS5hcHBseShfc3RvcmUsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdmFyIGxvYWQgPSBmdW5jdGlvbiBsb2FkKCkge1xuICAgICAgX3RoaXMyLmNoYW5nZUxhbmd1YWdlKF90aGlzMi5vcHRpb25zLmxuZywgZnVuY3Rpb24gKGVyciwgdCkge1xuICAgICAgICBfdGhpczIuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIF90aGlzMi5sb2dnZXIubG9nKCdpbml0aWFsaXplZCcsIF90aGlzMi5vcHRpb25zKTtcbiAgICAgICAgX3RoaXMyLmVtaXQoJ2luaXRpYWxpemVkJywgX3RoaXMyLm9wdGlvbnMpO1xuXG4gICAgICAgIGNhbGxiYWNrKGVyciwgdCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXNvdXJjZXMgfHwgIXRoaXMub3B0aW9ucy5pbml0SW1tZWRpYXRlKSB7XG4gICAgICBsb2FkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQobG9hZCwgMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyogZXNsaW50IGNvbnNpc3RlbnQtcmV0dXJuOiAwICovXG5cblxuICBJMThuLnByb3RvdHlwZS5sb2FkUmVzb3VyY2VzID0gZnVuY3Rpb24gbG9hZFJlc291cmNlcygpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogbm9vcDtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLnJlc291cmNlcykge1xuICAgICAgaWYgKHRoaXMubGFuZ3VhZ2UgJiYgdGhpcy5sYW5ndWFnZS50b0xvd2VyQ2FzZSgpID09PSAnY2ltb2RlJykgcmV0dXJuIGNhbGxiYWNrKCk7IC8vIGF2b2lkIGxvYWRpbmcgcmVzb3VyY2VzIGZvciBjaW1vZGVcblxuICAgICAgdmFyIHRvTG9hZCA9IFtdO1xuXG4gICAgICB2YXIgYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKGxuZykge1xuICAgICAgICBpZiAoIWxuZykgcmV0dXJuO1xuICAgICAgICB2YXIgbG5ncyA9IF90aGlzMy5zZXJ2aWNlcy5sYW5ndWFnZVV0aWxzLnRvUmVzb2x2ZUhpZXJhcmNoeShsbmcpO1xuICAgICAgICBsbmdzLmZvckVhY2goZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgICBpZiAodG9Mb2FkLmluZGV4T2YobCkgPCAwKSB0b0xvYWQucHVzaChsKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoIXRoaXMubGFuZ3VhZ2UpIHtcbiAgICAgICAgLy8gYXQgbGVhc3QgbG9hZCBmYWxsYmFja3MgaW4gdGhpcyBjYXNlXG4gICAgICAgIHZhciBmYWxsYmFja3MgPSB0aGlzLnNlcnZpY2VzLmxhbmd1YWdlVXRpbHMuZ2V0RmFsbGJhY2tDb2Rlcyh0aGlzLm9wdGlvbnMuZmFsbGJhY2tMbmcpO1xuICAgICAgICBmYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAobCkge1xuICAgICAgICAgIHJldHVybiBhcHBlbmQobCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBwZW5kKHRoaXMubGFuZ3VhZ2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnByZWxvYWQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnByZWxvYWQuZm9yRWFjaChmdW5jdGlvbiAobCkge1xuICAgICAgICAgIHJldHVybiBhcHBlbmQobCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNlcnZpY2VzLmNhY2hlQ29ubmVjdG9yLmxvYWQodG9Mb2FkLCB0aGlzLm9wdGlvbnMubnMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMzLnNlcnZpY2VzLmJhY2tlbmRDb25uZWN0b3IubG9hZCh0b0xvYWQsIF90aGlzMy5vcHRpb25zLm5zLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgfVxuICB9O1xuXG4gIEkxOG4ucHJvdG90eXBlLnJlbG9hZFJlc291cmNlcyA9IGZ1bmN0aW9uIHJlbG9hZFJlc291cmNlcyhsbmdzLCBucykge1xuICAgIGlmICghbG5ncykgbG5ncyA9IHRoaXMubGFuZ3VhZ2VzO1xuICAgIGlmICghbnMpIG5zID0gdGhpcy5vcHRpb25zLm5zO1xuICAgIHRoaXMuc2VydmljZXMuYmFja2VuZENvbm5lY3Rvci5yZWxvYWQobG5ncywgbnMpO1xuICB9O1xuXG4gIEkxOG4ucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShtb2R1bGUpIHtcbiAgICBpZiAobW9kdWxlLnR5cGUgPT09ICdiYWNrZW5kJykge1xuICAgICAgdGhpcy5tb2R1bGVzLmJhY2tlbmQgPSBtb2R1bGU7XG4gICAgfVxuXG4gICAgaWYgKG1vZHVsZS50eXBlID09PSAnY2FjaGUnKSB7XG4gICAgICB0aGlzLm1vZHVsZXMuY2FjaGUgPSBtb2R1bGU7XG4gICAgfVxuXG4gICAgaWYgKG1vZHVsZS50eXBlID09PSAnbG9nZ2VyJyB8fCBtb2R1bGUubG9nICYmIG1vZHVsZS53YXJuICYmIG1vZHVsZS5lcnJvcikge1xuICAgICAgdGhpcy5tb2R1bGVzLmxvZ2dlciA9IG1vZHVsZTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlLnR5cGUgPT09ICdsYW5ndWFnZURldGVjdG9yJykge1xuICAgICAgdGhpcy5tb2R1bGVzLmxhbmd1YWdlRGV0ZWN0b3IgPSBtb2R1bGU7XG4gICAgfVxuXG4gICAgaWYgKG1vZHVsZS50eXBlID09PSAncG9zdFByb2Nlc3NvcicpIHtcbiAgICAgIF9wb3N0UHJvY2Vzc29yMi5kZWZhdWx0LmFkZFBvc3RQcm9jZXNzb3IobW9kdWxlKTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlLnR5cGUgPT09ICczcmRQYXJ0eScpIHtcbiAgICAgIHRoaXMubW9kdWxlcy5leHRlcm5hbC5wdXNoKG1vZHVsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgSTE4bi5wcm90b3R5cGUuY2hhbmdlTGFuZ3VhZ2UgPSBmdW5jdGlvbiBjaGFuZ2VMYW5ndWFnZShsbmcsIGNhbGxiYWNrKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICB2YXIgZG9uZSA9IGZ1bmN0aW9uIGRvbmUoZXJyLCBsKSB7XG4gICAgICBfdGhpczQudHJhbnNsYXRvci5jaGFuZ2VMYW5ndWFnZShsKTtcblxuICAgICAgaWYgKGwpIHtcbiAgICAgICAgX3RoaXM0LmVtaXQoJ2xhbmd1YWdlQ2hhbmdlZCcsIGwpO1xuICAgICAgICBfdGhpczQubG9nZ2VyLmxvZygnbGFuZ3VhZ2VDaGFuZ2VkJywgbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczQudC5hcHBseShfdGhpczQsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHNldExuZyA9IGZ1bmN0aW9uIHNldExuZyhsKSB7XG4gICAgICBpZiAobCkge1xuICAgICAgICBfdGhpczQubGFuZ3VhZ2UgPSBsO1xuICAgICAgICBfdGhpczQubGFuZ3VhZ2VzID0gX3RoaXM0LnNlcnZpY2VzLmxhbmd1YWdlVXRpbHMudG9SZXNvbHZlSGllcmFyY2h5KGwpO1xuICAgICAgICBpZiAoIV90aGlzNC50cmFuc2xhdG9yLmxhbmd1YWdlKSBfdGhpczQudHJhbnNsYXRvci5jaGFuZ2VMYW5ndWFnZShsKTtcblxuICAgICAgICBpZiAoX3RoaXM0LnNlcnZpY2VzLmxhbmd1YWdlRGV0ZWN0b3IpIF90aGlzNC5zZXJ2aWNlcy5sYW5ndWFnZURldGVjdG9yLmNhY2hlVXNlckxhbmd1YWdlKGwpO1xuICAgICAgfVxuXG4gICAgICBfdGhpczQubG9hZFJlc291cmNlcyhmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGRvbmUoZXJyLCBsKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoIWxuZyAmJiB0aGlzLnNlcnZpY2VzLmxhbmd1YWdlRGV0ZWN0b3IgJiYgIXRoaXMuc2VydmljZXMubGFuZ3VhZ2VEZXRlY3Rvci5hc3luYykge1xuICAgICAgc2V0TG5nKHRoaXMuc2VydmljZXMubGFuZ3VhZ2VEZXRlY3Rvci5kZXRlY3QoKSk7XG4gICAgfSBlbHNlIGlmICghbG5nICYmIHRoaXMuc2VydmljZXMubGFuZ3VhZ2VEZXRlY3RvciAmJiB0aGlzLnNlcnZpY2VzLmxhbmd1YWdlRGV0ZWN0b3IuYXN5bmMpIHtcbiAgICAgIHRoaXMuc2VydmljZXMubGFuZ3VhZ2VEZXRlY3Rvci5kZXRlY3Qoc2V0TG5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TG5nKGxuZyk7XG4gICAgfVxuICB9O1xuXG4gIEkxOG4ucHJvdG90eXBlLmdldEZpeGVkVCA9IGZ1bmN0aW9uIGdldEZpeGVkVChsbmcsIG5zKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICB2YXIgZml4ZWRUID0gZnVuY3Rpb24gZml4ZWRUKGtleSwgb3B0cykge1xuICAgICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCByZXN0ID0gQXJyYXkoX2xlbjQgPiAyID8gX2xlbjQgLSAyIDogMCksIF9rZXk0ID0gMjsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICByZXN0W19rZXk0IC0gMl0gPSBhcmd1bWVudHNbX2tleTRdO1xuICAgICAgfVxuXG4gICAgICB2YXIgb3B0aW9ucyA9IF9leHRlbmRzKHt9LCBvcHRzKTtcbiAgICAgIGlmICgodHlwZW9mIG9wdHMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9wdHMpKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgb3B0aW9ucyA9IF90aGlzNS5vcHRpb25zLm92ZXJsb2FkVHJhbnNsYXRpb25PcHRpb25IYW5kbGVyKFtrZXksIG9wdHNdLmNvbmNhdChyZXN0KSk7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMubG5nID0gb3B0aW9ucy5sbmcgfHwgZml4ZWRULmxuZztcbiAgICAgIG9wdGlvbnMubG5ncyA9IG9wdGlvbnMubG5ncyB8fCBmaXhlZFQubG5ncztcbiAgICAgIG9wdGlvbnMubnMgPSBvcHRpb25zLm5zIHx8IGZpeGVkVC5ucztcbiAgICAgIHJldHVybiBfdGhpczUudChrZXksIG9wdGlvbnMpO1xuICAgIH07XG4gICAgaWYgKHR5cGVvZiBsbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBmaXhlZFQubG5nID0gbG5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXhlZFQubG5ncyA9IGxuZztcbiAgICB9XG4gICAgZml4ZWRULm5zID0gbnM7XG4gICAgcmV0dXJuIGZpeGVkVDtcbiAgfTtcblxuICBJMThuLnByb3RvdHlwZS50ID0gZnVuY3Rpb24gdCgpIHtcbiAgICB2YXIgX3RyYW5zbGF0b3I7XG5cbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdG9yICYmIChfdHJhbnNsYXRvciA9IHRoaXMudHJhbnNsYXRvcikudHJhbnNsYXRlLmFwcGx5KF90cmFuc2xhdG9yLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIEkxOG4ucHJvdG90eXBlLmV4aXN0cyA9IGZ1bmN0aW9uIGV4aXN0cygpIHtcbiAgICB2YXIgX3RyYW5zbGF0b3IyO1xuXG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRvciAmJiAoX3RyYW5zbGF0b3IyID0gdGhpcy50cmFuc2xhdG9yKS5leGlzdHMuYXBwbHkoX3RyYW5zbGF0b3IyLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIEkxOG4ucHJvdG90eXBlLnNldERlZmF1bHROYW1lc3BhY2UgPSBmdW5jdGlvbiBzZXREZWZhdWx0TmFtZXNwYWNlKG5zKSB7XG4gICAgdGhpcy5vcHRpb25zLmRlZmF1bHROUyA9IG5zO1xuICB9O1xuXG4gIEkxOG4ucHJvdG90eXBlLmxvYWROYW1lc3BhY2VzID0gZnVuY3Rpb24gbG9hZE5hbWVzcGFjZXMobnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5ucykgcmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgaWYgKHR5cGVvZiBucyA9PT0gJ3N0cmluZycpIG5zID0gW25zXTtcblxuICAgIG5zLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgIGlmIChfdGhpczYub3B0aW9ucy5ucy5pbmRleE9mKG4pIDwgMCkgX3RoaXM2Lm9wdGlvbnMubnMucHVzaChuKTtcbiAgICB9KTtcblxuICAgIHRoaXMubG9hZFJlc291cmNlcyhjYWxsYmFjayk7XG4gIH07XG5cbiAgSTE4bi5wcm90b3R5cGUubG9hZExhbmd1YWdlcyA9IGZ1bmN0aW9uIGxvYWRMYW5ndWFnZXMobG5ncywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGxuZ3MgPT09ICdzdHJpbmcnKSBsbmdzID0gW2xuZ3NdO1xuICAgIHZhciBwcmVsb2FkZWQgPSB0aGlzLm9wdGlvbnMucHJlbG9hZCB8fCBbXTtcblxuICAgIHZhciBuZXdMbmdzID0gbG5ncy5maWx0ZXIoZnVuY3Rpb24gKGxuZykge1xuICAgICAgcmV0dXJuIHByZWxvYWRlZC5pbmRleE9mKGxuZykgPCAwO1xuICAgIH0pO1xuICAgIC8vIEV4aXQgZWFybHkgaWYgYWxsIGdpdmVuIGxhbmd1YWdlcyBhcmUgYWxyZWFkeSBwcmVsb2FkZWRcbiAgICBpZiAoIW5ld0xuZ3MubGVuZ3RoKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgIHRoaXMub3B0aW9ucy5wcmVsb2FkID0gcHJlbG9hZGVkLmNvbmNhdChuZXdMbmdzKTtcbiAgICB0aGlzLmxvYWRSZXNvdXJjZXMoY2FsbGJhY2spO1xuICB9O1xuXG4gIEkxOG4ucHJvdG90eXBlLmRpciA9IGZ1bmN0aW9uIGRpcihsbmcpIHtcbiAgICBpZiAoIWxuZykgbG5nID0gdGhpcy5sYW5ndWFnZXMgJiYgdGhpcy5sYW5ndWFnZXMubGVuZ3RoID4gMCA/IHRoaXMubGFuZ3VhZ2VzWzBdIDogdGhpcy5sYW5ndWFnZTtcbiAgICBpZiAoIWxuZykgcmV0dXJuICdydGwnO1xuXG4gICAgdmFyIHJ0bExuZ3MgPSBbJ2FyJywgJ3NodScsICdzcXInLCAnc3NoJywgJ3hhYScsICd5aGQnLCAneXVkJywgJ2FhbycsICdhYmgnLCAnYWJ2JywgJ2FjbScsICdhY3EnLCAnYWN3JywgJ2FjeCcsICdhY3knLCAnYWRmJywgJ2FkcycsICdhZWInLCAnYWVjJywgJ2FmYicsICdhanAnLCAnYXBjJywgJ2FwZCcsICdhcmInLCAnYXJxJywgJ2FycycsICdhcnknLCAnYXJ6JywgJ2F1eicsICdhdmwnLCAnYXloJywgJ2F5bCcsICdheW4nLCAnYXlwJywgJ2JieicsICdwZ2EnLCAnaGUnLCAnaXcnLCAncHMnLCAncGJ0JywgJ3BidScsICdwc3QnLCAncHJwJywgJ3ByZCcsICd1cicsICd5ZGQnLCAneWRzJywgJ3lpaCcsICdqaScsICd5aScsICdoYm8nLCAnbWVuJywgJ3htbicsICdmYScsICdqcHInLCAncGVvJywgJ3BlcycsICdwcnMnLCAnZHYnLCAnc2FtJ107XG5cbiAgICByZXR1cm4gcnRsTG5ncy5pbmRleE9mKHRoaXMuc2VydmljZXMubGFuZ3VhZ2VVdGlscy5nZXRMYW5ndWFnZVBhcnRGcm9tQ29kZShsbmcpKSA+PSAwID8gJ3J0bCcgOiAnbHRyJztcbiAgfTtcblxuICAvKiBlc2xpbnQgY2xhc3MtbWV0aG9kcy11c2UtdGhpczogMCAqL1xuXG5cbiAgSTE4bi5wcm90b3R5cGUuY3JlYXRlSW5zdGFuY2UgPSBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZSgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzFdO1xuXG4gICAgcmV0dXJuIG5ldyBJMThuKG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgfTtcblxuICBJMThuLnByb3RvdHlwZS5jbG9uZUluc3RhbmNlID0gZnVuY3Rpb24gY2xvbmVJbnN0YW5jZSgpIHtcbiAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG5vb3A7XG5cbiAgICB2YXIgbWVyZ2VkT3B0aW9ucyA9IF9leHRlbmRzKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMsIHsgaXNDbG9uZTogdHJ1ZSB9KTtcbiAgICB2YXIgY2xvbmUgPSBuZXcgSTE4bihtZXJnZWRPcHRpb25zKTtcbiAgICB2YXIgbWVtYmVyc1RvQ29weSA9IFsnc3RvcmUnLCAnc2VydmljZXMnLCAnbGFuZ3VhZ2UnXTtcbiAgICBtZW1iZXJzVG9Db3B5LmZvckVhY2goZnVuY3Rpb24gKG0pIHtcbiAgICAgIGNsb25lW21dID0gX3RoaXM3W21dO1xuICAgIH0pO1xuICAgIGNsb25lLnRyYW5zbGF0b3IgPSBuZXcgX1RyYW5zbGF0b3IyLmRlZmF1bHQoY2xvbmUuc2VydmljZXMsIGNsb25lLm9wdGlvbnMpO1xuICAgIGNsb25lLnRyYW5zbGF0b3Iub24oJyonLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW41ID4gMSA/IF9sZW41IC0gMSA6IDApLCBfa2V5NSA9IDE7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NSAtIDFdID0gYXJndW1lbnRzW19rZXk1XTtcbiAgICAgIH1cblxuICAgICAgY2xvbmUuZW1pdC5hcHBseShjbG9uZSwgW2V2ZW50XS5jb25jYXQoYXJncykpO1xuICAgIH0pO1xuICAgIGNsb25lLmluaXQobWVyZ2VkT3B0aW9ucywgY2FsbGJhY2spO1xuICAgIGNsb25lLnRyYW5zbGF0b3Iub3B0aW9ucyA9IGNsb25lLm9wdGlvbnM7IC8vIHN5bmMgb3B0aW9uc1xuXG4gICAgcmV0dXJuIGNsb25lO1xuICB9O1xuXG4gIHJldHVybiBJMThuO1xufShfRXZlbnRFbWl0dGVyMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IEkxOG4oKTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnVzZSA9IGV4cG9ydHMudCA9IGV4cG9ydHMuc2V0RGVmYXVsdE5hbWVzcGFjZSA9IGV4cG9ydHMub24gPSBleHBvcnRzLm9mZiA9IGV4cG9ydHMubG9hZFJlc291cmNlcyA9IGV4cG9ydHMubG9hZE5hbWVzcGFjZXMgPSBleHBvcnRzLmxvYWRMYW5ndWFnZXMgPSBleHBvcnRzLmluaXQgPSBleHBvcnRzLmdldEZpeGVkVCA9IGV4cG9ydHMuZXhpc3RzID0gZXhwb3J0cy5kaXIgPSBleHBvcnRzLmNyZWF0ZUluc3RhbmNlID0gZXhwb3J0cy5jbG9uZUluc3RhbmNlID0gZXhwb3J0cy5jaGFuZ2VMYW5ndWFnZSA9IHVuZGVmaW5lZDtcblxudmFyIF9pMThuZXh0ID0gcmVxdWlyZSgnLi9pMThuZXh0LmpzJyk7XG5cbnZhciBfaTE4bmV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pMThuZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX2kxOG5leHQyLmRlZmF1bHQ7XG52YXIgY2hhbmdlTGFuZ3VhZ2UgPSBleHBvcnRzLmNoYW5nZUxhbmd1YWdlID0gX2kxOG5leHQyLmRlZmF1bHQuY2hhbmdlTGFuZ3VhZ2UuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgY2xvbmVJbnN0YW5jZSA9IGV4cG9ydHMuY2xvbmVJbnN0YW5jZSA9IF9pMThuZXh0Mi5kZWZhdWx0LmNsb25lSW5zdGFuY2UuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgY3JlYXRlSW5zdGFuY2UgPSBleHBvcnRzLmNyZWF0ZUluc3RhbmNlID0gX2kxOG5leHQyLmRlZmF1bHQuY3JlYXRlSW5zdGFuY2UuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgZGlyID0gZXhwb3J0cy5kaXIgPSBfaTE4bmV4dDIuZGVmYXVsdC5kaXIuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgZXhpc3RzID0gZXhwb3J0cy5leGlzdHMgPSBfaTE4bmV4dDIuZGVmYXVsdC5leGlzdHMuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgZ2V0Rml4ZWRUID0gZXhwb3J0cy5nZXRGaXhlZFQgPSBfaTE4bmV4dDIuZGVmYXVsdC5nZXRGaXhlZFQuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgaW5pdCA9IGV4cG9ydHMuaW5pdCA9IF9pMThuZXh0Mi5kZWZhdWx0LmluaXQuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgbG9hZExhbmd1YWdlcyA9IGV4cG9ydHMubG9hZExhbmd1YWdlcyA9IF9pMThuZXh0Mi5kZWZhdWx0LmxvYWRMYW5ndWFnZXMuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgbG9hZE5hbWVzcGFjZXMgPSBleHBvcnRzLmxvYWROYW1lc3BhY2VzID0gX2kxOG5leHQyLmRlZmF1bHQubG9hZE5hbWVzcGFjZXMuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgbG9hZFJlc291cmNlcyA9IGV4cG9ydHMubG9hZFJlc291cmNlcyA9IF9pMThuZXh0Mi5kZWZhdWx0LmxvYWRSZXNvdXJjZXMuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgb2ZmID0gZXhwb3J0cy5vZmYgPSBfaTE4bmV4dDIuZGVmYXVsdC5vZmYuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgb24gPSBleHBvcnRzLm9uID0gX2kxOG5leHQyLmRlZmF1bHQub24uYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgc2V0RGVmYXVsdE5hbWVzcGFjZSA9IGV4cG9ydHMuc2V0RGVmYXVsdE5hbWVzcGFjZSA9IF9pMThuZXh0Mi5kZWZhdWx0LnNldERlZmF1bHROYW1lc3BhY2UuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgdCA9IGV4cG9ydHMudCA9IF9pMThuZXh0Mi5kZWZhdWx0LnQuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7XG52YXIgdXNlID0gZXhwb3J0cy51c2UgPSBfaTE4bmV4dDIuZGVmYXVsdC51c2UuYmluZChfaTE4bmV4dDIuZGVmYXVsdCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxudmFyIGNvbnNvbGVMb2dnZXIgPSB7XG4gIHR5cGU6ICdsb2dnZXInLFxuXG4gIGxvZzogZnVuY3Rpb24gbG9nKGFyZ3MpIHtcbiAgICB0aGlzLm91dHB1dCgnbG9nJywgYXJncyk7XG4gIH0sXG4gIHdhcm46IGZ1bmN0aW9uIHdhcm4oYXJncykge1xuICAgIHRoaXMub3V0cHV0KCd3YXJuJywgYXJncyk7XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbiBlcnJvcihhcmdzKSB7XG4gICAgdGhpcy5vdXRwdXQoJ2Vycm9yJywgYXJncyk7XG4gIH0sXG4gIG91dHB1dDogZnVuY3Rpb24gb3V0cHV0KHR5cGUsIGFyZ3MpIHtcbiAgICB2YXIgX2NvbnNvbGU7XG5cbiAgICAvKiBlc2xpbnQgbm8tY29uc29sZTogMCAqL1xuICAgIGlmIChjb25zb2xlICYmIGNvbnNvbGVbdHlwZV0pIChfY29uc29sZSA9IGNvbnNvbGUpW3R5cGVdLmFwcGx5KF9jb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpO1xuICB9XG59O1xuXG52YXIgTG9nZ2VyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBMb2dnZXIoY29uY3JldGVMb2dnZXIpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTG9nZ2VyKTtcblxuICAgIHRoaXMuaW5pdChjb25jcmV0ZUxvZ2dlciwgb3B0aW9ucyk7XG4gIH1cblxuICBMb2dnZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiBpbml0KGNvbmNyZXRlTG9nZ2VyKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgdGhpcy5wcmVmaXggPSBvcHRpb25zLnByZWZpeCB8fCAnaTE4bmV4dDonO1xuICAgIHRoaXMubG9nZ2VyID0gY29uY3JldGVMb2dnZXIgfHwgY29uc29sZUxvZ2dlcjtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuZGVidWcgPSBvcHRpb25zLmRlYnVnO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUuc2V0RGVidWcgPSBmdW5jdGlvbiBzZXREZWJ1Zyhib29sKSB7XG4gICAgdGhpcy5kZWJ1ZyA9IGJvb2w7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZm9yd2FyZChhcmdzLCAnbG9nJywgJycsIHRydWUpO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUud2FybiA9IGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5mb3J3YXJkKGFyZ3MsICd3YXJuJywgJycsIHRydWUpO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgYXJnc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmZvcndhcmQoYXJncywgJ2Vycm9yJywgJycpO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUuZGVwcmVjYXRlID0gZnVuY3Rpb24gZGVwcmVjYXRlKCkge1xuICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW40KSwgX2tleTQgPSAwOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZm9yd2FyZChhcmdzLCAnd2FybicsICdXQVJOSU5HIERFUFJFQ0FURUQ6ICcsIHRydWUpO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUuZm9yd2FyZCA9IGZ1bmN0aW9uIGZvcndhcmQoYXJncywgbHZsLCBwcmVmaXgsIGRlYnVnT25seSkge1xuICAgIGlmIChkZWJ1Z09ubHkgJiYgIXRoaXMuZGVidWcpIHJldHVybiBudWxsO1xuICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycpIGFyZ3NbMF0gPSAnJyArIHByZWZpeCArIHRoaXMucHJlZml4ICsgJyAnICsgYXJnc1swXTtcbiAgICByZXR1cm4gdGhpcy5sb2dnZXJbbHZsXShhcmdzKTtcbiAgfTtcblxuICBMb2dnZXIucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShtb2R1bGVOYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBMb2dnZXIodGhpcy5sb2dnZXIsIF9leHRlbmRzKHsgcHJlZml4OiB0aGlzLnByZWZpeCArICc6JyArIG1vZHVsZU5hbWUgKyAnOicgfSwgdGhpcy5vcHRpb25zKSk7XG4gIH07XG5cbiAgcmV0dXJuIExvZ2dlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IExvZ2dlcigpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuXG4gIHByb2Nlc3NvcnM6IHt9LFxuXG4gIGFkZFBvc3RQcm9jZXNzb3I6IGZ1bmN0aW9uIGFkZFBvc3RQcm9jZXNzb3IobW9kdWxlKSB7XG4gICAgdGhpcy5wcm9jZXNzb3JzW21vZHVsZS5uYW1lXSA9IG1vZHVsZTtcbiAgfSxcbiAgaGFuZGxlOiBmdW5jdGlvbiBoYW5kbGUocHJvY2Vzc29ycywgdmFsdWUsIGtleSwgb3B0aW9ucywgdHJhbnNsYXRvcikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBwcm9jZXNzb3JzLmZvckVhY2goZnVuY3Rpb24gKHByb2Nlc3Nvcikge1xuICAgICAgaWYgKF90aGlzLnByb2Nlc3NvcnNbcHJvY2Vzc29yXSkgdmFsdWUgPSBfdGhpcy5wcm9jZXNzb3JzW3Byb2Nlc3Nvcl0ucHJvY2Vzcyh2YWx1ZSwga2V5LCBvcHRpb25zLCB0cmFuc2xhdG9yKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLm1ha2VTdHJpbmcgPSBtYWtlU3RyaW5nO1xuZXhwb3J0cy5jb3B5ID0gY29weTtcbmV4cG9ydHMuc2V0UGF0aCA9IHNldFBhdGg7XG5leHBvcnRzLnB1c2hQYXRoID0gcHVzaFBhdGg7XG5leHBvcnRzLmdldFBhdGggPSBnZXRQYXRoO1xuZXhwb3J0cy5kZWVwRXh0ZW5kID0gZGVlcEV4dGVuZDtcbmV4cG9ydHMucmVnZXhFc2NhcGUgPSByZWdleEVzY2FwZTtcbmV4cG9ydHMuZXNjYXBlID0gZXNjYXBlO1xuZnVuY3Rpb24gbWFrZVN0cmluZyhvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSByZXR1cm4gJyc7XG4gIC8qIGVzbGludCBwcmVmZXItdGVtcGxhdGU6IDAgKi9cbiAgcmV0dXJuICcnICsgb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBjb3B5KGEsIHMsIHQpIHtcbiAgYS5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG4gICAgaWYgKHNbbV0pIHRbbV0gPSBzW21dO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0TGFzdE9mUGF0aChvYmplY3QsIHBhdGgsIEVtcHR5KSB7XG4gIGZ1bmN0aW9uIGNsZWFuS2V5KGtleSkge1xuICAgIHJldHVybiBrZXkgJiYga2V5LmluZGV4T2YoJyMjIycpID4gLTEgPyBrZXkucmVwbGFjZSgvIyMjL2csICcuJykgOiBrZXk7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5Ob3RUcmF2ZXJzZURlZXBlcigpIHtcbiAgICByZXR1cm4gIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJztcbiAgfVxuXG4gIHZhciBzdGFjayA9IHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJyA/IFtdLmNvbmNhdChwYXRoKSA6IHBhdGguc3BsaXQoJy4nKTtcbiAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICBpZiAoY2FuTm90VHJhdmVyc2VEZWVwZXIoKSkgcmV0dXJuIHt9O1xuXG4gICAgdmFyIGtleSA9IGNsZWFuS2V5KHN0YWNrLnNoaWZ0KCkpO1xuICAgIGlmICghb2JqZWN0W2tleV0gJiYgRW1wdHkpIG9iamVjdFtrZXldID0gbmV3IEVtcHR5KCk7XG4gICAgb2JqZWN0ID0gb2JqZWN0W2tleV07XG4gIH1cblxuICBpZiAoY2FuTm90VHJhdmVyc2VEZWVwZXIoKSkgcmV0dXJuIHt9O1xuICByZXR1cm4ge1xuICAgIG9iajogb2JqZWN0LFxuICAgIGs6IGNsZWFuS2V5KHN0YWNrLnNoaWZ0KCkpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHNldFBhdGgob2JqZWN0LCBwYXRoLCBuZXdWYWx1ZSkge1xuICB2YXIgX2dldExhc3RPZlBhdGggPSBnZXRMYXN0T2ZQYXRoKG9iamVjdCwgcGF0aCwgT2JqZWN0KSxcbiAgICAgIG9iaiA9IF9nZXRMYXN0T2ZQYXRoLm9iaixcbiAgICAgIGsgPSBfZ2V0TGFzdE9mUGF0aC5rO1xuXG4gIG9ialtrXSA9IG5ld1ZhbHVlO1xufVxuXG5mdW5jdGlvbiBwdXNoUGF0aChvYmplY3QsIHBhdGgsIG5ld1ZhbHVlLCBjb25jYXQpIHtcbiAgdmFyIF9nZXRMYXN0T2ZQYXRoMiA9IGdldExhc3RPZlBhdGgob2JqZWN0LCBwYXRoLCBPYmplY3QpLFxuICAgICAgb2JqID0gX2dldExhc3RPZlBhdGgyLm9iaixcbiAgICAgIGsgPSBfZ2V0TGFzdE9mUGF0aDIuaztcblxuICBvYmpba10gPSBvYmpba10gfHwgW107XG4gIGlmIChjb25jYXQpIG9ialtrXSA9IG9ialtrXS5jb25jYXQobmV3VmFsdWUpO1xuICBpZiAoIWNvbmNhdCkgb2JqW2tdLnB1c2gobmV3VmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXRQYXRoKG9iamVjdCwgcGF0aCkge1xuICB2YXIgX2dldExhc3RPZlBhdGgzID0gZ2V0TGFzdE9mUGF0aChvYmplY3QsIHBhdGgpLFxuICAgICAgb2JqID0gX2dldExhc3RPZlBhdGgzLm9iaixcbiAgICAgIGsgPSBfZ2V0TGFzdE9mUGF0aDMuaztcblxuICBpZiAoIW9iaikgcmV0dXJuIHVuZGVmaW5lZDtcbiAgcmV0dXJuIG9ialtrXTtcbn1cblxuZnVuY3Rpb24gZGVlcEV4dGVuZCh0YXJnZXQsIHNvdXJjZSwgb3ZlcndyaXRlKSB7XG4gIC8qIGVzbGludCBuby1yZXN0cmljdGVkLXN5bnRheDogMCAqL1xuICBmb3IgKHZhciBwcm9wIGluIHNvdXJjZSkge1xuICAgIGlmIChwcm9wIGluIHRhcmdldCkge1xuICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIGxlYWYgc3RyaW5nIGluIHRhcmdldCBvciBzb3VyY2UgdGhlbiByZXBsYWNlIHdpdGggc291cmNlIG9yIHNraXAgZGVwZW5kaW5nIG9uIHRoZSAnb3ZlcndyaXRlJyBzd2l0Y2hcbiAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BdID09PSAnc3RyaW5nJyB8fCB0YXJnZXRbcHJvcF0gaW5zdGFuY2VvZiBTdHJpbmcgfHwgdHlwZW9mIHNvdXJjZVtwcm9wXSA9PT0gJ3N0cmluZycgfHwgc291cmNlW3Byb3BdIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgIGlmIChvdmVyd3JpdGUpIHRhcmdldFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZXBFeHRlbmQodGFyZ2V0W3Byb3BdLCBzb3VyY2VbcHJvcF0sIG92ZXJ3cml0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gcmVnZXhFc2NhcGUoc3RyKSB7XG4gIC8qIGVzbGludCBuby11c2VsZXNzLWVzY2FwZTogMCAqL1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCAnXFxcXCQmJyk7XG59XG5cbi8qIGVzbGludC1kaXNhYmxlICovXG52YXIgX2VudGl0eU1hcCA9IHtcbiAgXCImXCI6IFwiJmFtcDtcIixcbiAgXCI8XCI6IFwiJmx0O1wiLFxuICBcIj5cIjogXCImZ3Q7XCIsXG4gICdcIic6ICcmcXVvdDsnLFxuICBcIidcIjogJyYjMzk7JyxcbiAgXCIvXCI6ICcmI3gyRjsnXG59O1xuLyogZXNsaW50LWVuYWJsZSAqL1xuXG5mdW5jdGlvbiBlc2NhcGUoZGF0YSkge1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGRhdGEucmVwbGFjZSgvWyY8PlwiJ1xcL10vZywgZnVuY3Rpb24gKHMpIHtcbiAgICAgIHJldHVybiBfZW50aXR5TWFwW3NdO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY29tbW9uanMvaW5kZXguanMnKS5kZWZhdWx0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gIHROYW1lOiAndCcsXG4gIGkxOG5OYW1lOiAnaTE4bicsXG4gIGhhbmRsZU5hbWU6ICdsb2NhbGl6ZScsXG4gIHNlbGVjdG9yQXR0cjogJ2RhdGEtaTE4bicsXG4gIHRhcmdldEF0dHI6ICdpMThuLXRhcmdldCcsXG4gIG9wdGlvbnNBdHRyOiAnaTE4bi1vcHRpb25zJyxcbiAgdXNlT3B0aW9uc0F0dHI6IGZhbHNlLFxuICBwYXJzZURlZmF1bHRWYWx1ZUZyb21Db250ZW50OiB0cnVlXG59O1xuXG5mdW5jdGlvbiBpbml0KGkxOG5leHQsICQpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuXG5cbiAgb3B0aW9ucyA9IF9leHRlbmRzKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgZnVuY3Rpb24gcGFyc2UoZWxlLCBrZXksIG9wdHMpIHtcbiAgICBpZiAoa2V5Lmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgdmFyIGF0dHIgPSAndGV4dCc7XG5cbiAgICBpZiAoa2V5LmluZGV4T2YoJ1snKSA9PT0gMCkge1xuICAgICAgdmFyIHBhcnRzID0ga2V5LnNwbGl0KCddJyk7XG4gICAgICBrZXkgPSBwYXJ0c1sxXTtcbiAgICAgIGF0dHIgPSBwYXJ0c1swXS5zdWJzdHIoMSwgcGFydHNbMF0ubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgaWYgKGtleS5pbmRleE9mKCc7JykgPT09IGtleS5sZW5ndGggLSAxKSB7XG4gICAgICBrZXkgPSBrZXkuc3Vic3RyKDAsIGtleS5sZW5ndGggLSAyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmREZWZhdWx0KG8sIHZhbCkge1xuICAgICAgaWYgKCFvcHRpb25zLnBhcnNlRGVmYXVsdFZhbHVlRnJvbUNvbnRlbnQpIHJldHVybiBvO1xuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBvLCB7IGRlZmF1bHRWYWx1ZTogdmFsIH0pO1xuICAgIH1cblxuICAgIGlmIChhdHRyID09PSAnaHRtbCcpIHtcbiAgICAgIGVsZS5odG1sKGkxOG5leHQudChrZXksIGV4dGVuZERlZmF1bHQob3B0cywgZWxlLmh0bWwoKSkpKTtcbiAgICB9IGVsc2UgaWYgKGF0dHIgPT09ICd0ZXh0Jykge1xuICAgICAgZWxlLnRleHQoaTE4bmV4dC50KGtleSwgZXh0ZW5kRGVmYXVsdChvcHRzLCBlbGUudGV4dCgpKSkpO1xuICAgIH0gZWxzZSBpZiAoYXR0ciA9PT0gJ3ByZXBlbmQnKSB7XG4gICAgICBlbGUucHJlcGVuZChpMThuZXh0LnQoa2V5LCBleHRlbmREZWZhdWx0KG9wdHMsIGVsZS5odG1sKCkpKSk7XG4gICAgfSBlbHNlIGlmIChhdHRyID09PSAnYXBwZW5kJykge1xuICAgICAgZWxlLmFwcGVuZChpMThuZXh0LnQoa2V5LCBleHRlbmREZWZhdWx0KG9wdHMsIGVsZS5odG1sKCkpKSk7XG4gICAgfSBlbHNlIGlmIChhdHRyLmluZGV4T2YoJ2RhdGEtJykgPT09IDApIHtcbiAgICAgIHZhciBkYXRhQXR0ciA9IGF0dHIuc3Vic3RyKCdkYXRhLScubGVuZ3RoKTtcbiAgICAgIHZhciB0cmFuc2xhdGVkID0gaTE4bmV4dC50KGtleSwgZXh0ZW5kRGVmYXVsdChvcHRzLCBlbGUuZGF0YShkYXRhQXR0cikpKTtcblxuICAgICAgLy8gd2UgY2hhbmdlIGludG8gdGhlIGRhdGEgY2FjaGVcbiAgICAgIGVsZS5kYXRhKGRhdGFBdHRyLCB0cmFuc2xhdGVkKTtcbiAgICAgIC8vIHdlIGNoYW5nZSBpbnRvIHRoZSBkb21cbiAgICAgIGVsZS5hdHRyKGF0dHIsIHRyYW5zbGF0ZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGUuYXR0cihhdHRyLCBpMThuZXh0LnQoa2V5LCBleHRlbmREZWZhdWx0KG9wdHMsIGVsZS5hdHRyKGF0dHIpKSkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxvY2FsaXplKGVsZSwgb3B0cykge1xuICAgIHZhciBrZXkgPSBlbGUuYXR0cihvcHRpb25zLnNlbGVjdG9yQXR0cik7XG4gICAgaWYgKCFrZXkgJiYgdHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcgJiYga2V5ICE9PSBmYWxzZSkga2V5ID0gZWxlLnRleHQoKSB8fCBlbGUudmFsKCk7XG4gICAgaWYgKCFrZXkpIHJldHVybjtcblxuICAgIHZhciB0YXJnZXQgPSBlbGUsXG4gICAgICAgIHRhcmdldFNlbGVjdG9yID0gZWxlLmRhdGEob3B0aW9ucy50YXJnZXRBdHRyKTtcblxuICAgIGlmICh0YXJnZXRTZWxlY3RvcikgdGFyZ2V0ID0gZWxlLmZpbmQodGFyZ2V0U2VsZWN0b3IpIHx8IGVsZTtcblxuICAgIGlmICghb3B0cyAmJiBvcHRpb25zLnVzZU9wdGlvbnNBdHRyID09PSB0cnVlKSBvcHRzID0gZWxlLmRhdGEob3B0aW9ucy5vcHRpb25zQXR0cik7XG5cbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgIGlmIChrZXkuaW5kZXhPZignOycpID49IDApIHtcbiAgICAgIHZhciBrZXlzID0ga2V5LnNwbGl0KCc7Jyk7XG5cbiAgICAgICQuZWFjaChrZXlzLCBmdW5jdGlvbiAobSwgaykge1xuICAgICAgICAvLyAudHJpbSgpOiBUcmltIHRoZSBjb21tYS1zZXBhcmF0ZWQgcGFyYW1ldGVycyBvbiB0aGUgZGF0YS1pMThuIGF0dHJpYnV0ZS5cbiAgICAgICAgaWYgKGsgIT09ICcnKSBwYXJzZSh0YXJnZXQsIGsudHJpbSgpLCBvcHRzKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZSh0YXJnZXQsIGtleSwgb3B0cyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMudXNlT3B0aW9uc0F0dHIgPT09IHRydWUpIHtcbiAgICAgIHZhciBjbG9uZSA9IHt9O1xuICAgICAgY2xvbmUgPSBfZXh0ZW5kcyh7IGNsb25lOiBjbG9uZSB9LCBvcHRzKTtcblxuICAgICAgZGVsZXRlIGNsb25lLmxuZztcbiAgICAgIGVsZS5kYXRhKG9wdGlvbnMub3B0aW9uc0F0dHIsIGNsb25lKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGUob3B0cykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgLy8gbG9jYWxpemUgZWxlbWVudCBpdHNlbGZcbiAgICAgIGxvY2FsaXplKCQodGhpcyksIG9wdHMpO1xuXG4gICAgICAvLyBsb2NhbGl6ZSBjaGlsZHJlblxuICAgICAgdmFyIGVsZW1lbnRzID0gJCh0aGlzKS5maW5kKCdbJyArIG9wdGlvbnMuc2VsZWN0b3JBdHRyICsgJ10nKTtcbiAgICAgIGVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2NhbGl6ZSgkKHRoaXMpLCBvcHRzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vICQudCAkLmkxOG4gc2hvcnRjdXRcbiAgJFtvcHRpb25zLnROYW1lXSA9IGkxOG5leHQudC5iaW5kKGkxOG5leHQpO1xuICAkW29wdGlvbnMuaTE4bk5hbWVdID0gaTE4bmV4dDtcblxuICAvLyBzZWxlY3RvciBmdW5jdGlvbiAkKG15U2VsZWN0b3IpLmxvY2FsaXplKG9wdHMpO1xuICAkLmZuW29wdGlvbnMuaGFuZGxlTmFtZV0gPSBoYW5kbGU7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgaW5pdDogaW5pdFxufTsiLCJpbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcbmltcG9ydCBqcXVlcnlJMThuZXh0IGZyb20gJ2pxdWVyeS1pMThuZXh0JztcblxuaW1wb3J0ICogYXMgc2tpbGxzZXQgZnJvbSAnLi9tb2R1bGVzL3NraWxsc2V0JztcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5nbGlzaCA9IHJlcXVpcmUoXCIuLi8uL2xvY2FsZXMvZW4uanNvblwiKTtcbnZhciBnZXJtYW4gPSByZXF1aXJlKFwiLi4vLi9sb2NhbGVzL2RlLmpzb25cIik7XG5cbnZhciByZXNvdXJjZXMgPSB7XG4gIGVuOiBlbmdsaXNoLFxuICBkZTogZ2VybWFuXG59O1xuXG5mdW5jdGlvbiBpbml0U21vb3RoU2Nyb2xsaW5nKCl7XG4gIC8vIFNlbGVjdCBhbGwgbGlua3Mgd2l0aCBoYXNoZXNcbiAgJCgnYVtocmVmKj1cIiNcIl0nKVxuICAgIC8vIFJlbW92ZSBsaW5rcyB0aGF0IGRvbid0IGFjdHVhbGx5IGxpbmsgdG8gYW55dGhpbmdcbiAgICAubm90KCdbaHJlZj1cIiNcIl0nKVxuICAgIC5ub3QoJ1tocmVmPVwiIzBcIl0nKVxuICAgIC5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgLy8gT24tcGFnZSBsaW5rc1xuICAgICAgaWYgKFxuICAgICAgICBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKSAmJlxuICAgICAgICBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lXG4gICAgICApIHtcbiAgICAgICAgLy8gRmlndXJlIG91dCBlbGVtZW50IHRvIHNjcm9sbCB0b1xuICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArICddJyk7XG4gICAgICAgIC8vIERvZXMgYSBzY3JvbGwgdGFyZ2V0IGV4aXN0P1xuICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgIC8vIE9ubHkgcHJldmVudCBkZWZhdWx0IGlmIGFuaW1hdGlvbiBpcyBhY3R1YWxseSBnb25uYSBoYXBwZW5cbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgICAgICAgIH0sIDEwMDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgYWZ0ZXIgYW5pbWF0aW9uXG4gICAgICAgICAgICAvLyBNdXN0IGNoYW5nZSBmb2N1cyFcbiAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xuICAgICAgICAgICAgJHRhcmdldC5mb2N1cygpO1xuICAgICAgICAgICAgaWYgKCR0YXJnZXQuaXMoXCI6Zm9jdXNcIikpIHsgLy8gQ2hlY2tpbmcgaWYgdGhlIHRhcmdldCB3YXMgZm9jdXNlZFxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkdGFyZ2V0LmF0dHIoJ3RhYmluZGV4JywnLTEnKTsgLy8gQWRkaW5nIHRhYmluZGV4IGZvciBlbGVtZW50cyBub3QgZm9jdXNhYmxlXG4gICAgICAgICAgICAgICR0YXJnZXQuZm9jdXMoKTsgLy8gU2V0IGZvY3VzIGFnYWluXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZmFkZUluU2Nyb2xsVG9wQnV0dG9uKCl7XG4gIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAyNTApIHtcbiAgICAkKCcuYmFjay10by10b3AnKS5mYWRlSW4oNDAwKTtcbiAgfSBlbHNlIHtcbiAgICAkKCcuYmFjay10by10b3AnKS5mYWRlT3V0KDQwMCk7XG4gIH1cbn1cblxudmFyIGxhbmd1YWdlTG9va3VwID0ge1xuICBcIkRldXRzY2hcIjogXCJkZVwiLFxuICBcIkVuZ2xpc2hcIjogXCJlblwiXG59XG5cbmZ1bmN0aW9uIHN3aXRjaExhbmd1YWdlKGV2ZW50KXtcbiAgdmFyIHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KTtcbiAgLy8gaWYoJChldmVudC50YXJnZXQpLmhhc0NsYXNzKFwiYWN0aXZlXCIpKVxuICAvLyAgIHJldHVybjtcbiAgJChcIiNsYW5ndWFnZXMgLmxhbmd1YWdlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICB0YXJnZXQuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gIGkxOG5leHQuY2hhbmdlTGFuZ3VhZ2UobGFuZ3VhZ2VMb29rdXBbdGFyZ2V0LnRleHQoKV0pO1xuICAkKFwiW2RhdGEtaTE4bl1cIikubG9jYWxpemUoKTtcbn1cblxuZnVuY3Rpb24gYWRkTGFuZ3VhZ2VTd2l0Y2hIYW5kbGVyKCl7XG4gICQoXCIjbGFuZ3VhZ2VzIC5sYW5ndWFnZVwiKS5jbGljayhzd2l0Y2hMYW5ndWFnZSlcbn1cblxuZnVuY3Rpb24gaW5pdEpxdWVyeUkxOG5leHQoKXtcbiAgaTE4bmV4dC5pbml0KHtcbiAgICBsbmc6ICdlbicsXG4gICAgZGVidWc6IHRydWUsXG4gICAgcmVzb3VyY2VzOiByZXNvdXJjZXNcbiAgfSwgZnVuY3Rpb24oZXJyLCB0KSB7XG4gICAgLy8gaW5pdGlhbGl6ZWQgYW5kIHJlYWR5IHRvIGdvIVxuICB9KTtcblxuICBqcXVlcnlJMThuZXh0LmluaXQoaTE4bmV4dCwgJCwge1xuICAgIHROYW1lOiAndCcsIC8vIC0tPiBhcHBlbmRzICQudCA9IGkxOG5leHQudFxuICAgIGkxOG5OYW1lOiAnaTE4bicsIC8vIC0tPiBhcHBlbmRzICQuaTE4biA9IGkxOG5leHRcbiAgICBoYW5kbGVOYW1lOiAnbG9jYWxpemUnLCAvLyAtLT4gYXBwZW5kcyAkKHNlbGVjdG9yKS5sb2NhbGl6ZShvcHRzKTtcbiAgICBzZWxlY3RvckF0dHI6ICdkYXRhLWkxOG4nLCAvLyBzZWxlY3RvciBmb3IgdHJhbnNsYXRpbmcgZWxlbWVudHNcbiAgICB0YXJnZXRBdHRyOiAnaTE4bi10YXJnZXQnLCAvLyBkYXRhLSgpIGF0dHJpYnV0ZSB0byBncmFiIHRhcmdldCBlbGVtZW50IHRvIHRyYW5zbGF0ZSAoaWYgZGlmZnJlbnQgdGhlbiBpdHNlbGYpXG4gICAgb3B0aW9uc0F0dHI6ICdpMThuLW9wdGlvbnMnLCAvLyBkYXRhLSgpIGF0dHJpYnV0ZSB0aGF0IGNvbnRhaW5zIG9wdGlvbnMsIHdpbGwgbG9hZC9zZXQgaWYgdXNlT3B0aW9uc0F0dHIgPSB0cnVlXG4gICAgdXNlT3B0aW9uc0F0dHI6IGZhbHNlLCAvLyBzZWUgb3B0aW9uc0F0dHJcbiAgICBwYXJzZURlZmF1bHRWYWx1ZUZyb21Db250ZW50OiB0cnVlIC8vIHBhcnNlcyBkZWZhdWx0IHZhbHVlcyBmcm9tIGNvbnRlbnQgZWxlLnZhbCBvciBlbGUudGV4dFxuICB9KTtcbn1cblxuLy8gRE9NIGlzIHJlYWR5XG4kKGZ1bmN0aW9uKCl7XG4gIGluaXRTbW9vdGhTY3JvbGxpbmcoKTtcbiAgaW5pdEpxdWVyeUkxOG5leHQoKTtcbiAgYWRkTGFuZ3VhZ2VTd2l0Y2hIYW5kbGVyKCk7XG4gIHNraWxsc2V0LmluaXQoKTtcbiAgJCh3aW5kb3cpLnNjcm9sbChmYWRlSW5TY3JvbGxUb3BCdXR0b24pO1xuICAkKFwiI2xvYWRlclwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbn0pO1xuIiwidmFyIGRhdGEgPSB7XHJcbiAgICBcIm5vZGVzXCI6IFt7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwiV2ViZGV2ZWxvcG1lbnRcIixcclxuICAgICAgICBcImdyb3VwXCI6IDBcclxuICAgIH0se1xyXG4gICAgICAgIFwibmFtZVwiOiBcIkZyb250LWVuZFwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwiQmFjay1lbmRcIixcclxuICAgICAgICBcImdyb3VwXCI6IDJcclxuICAgIH0se1xyXG4gICAgICAgIFwibmFtZVwiOiBcIkNTUzNcIixcclxuICAgICAgICBcImdyb3VwXCI6IDNcclxuICAgIH0sIHtcclxuICAgICAgICBcIm5hbWVcIjogXCJIVE1MNVwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogMVxyXG4gICAgfSwge1xyXG4gICAgICAgIFwibmFtZVwiOiBcIkphdmFzY3JpcHRcIixcclxuICAgICAgICBcImdyb3VwXCI6IDRcclxuICAgIH0se1xyXG4gICAgICAgIFwibmFtZVwiOiBcIkxlc3NcIixcclxuICAgICAgICBcImdyb3VwXCI6IDNcclxuICAgIH0sIHtcclxuICAgICAgICBcIm5hbWVcIjogXCJTdHlsdXNcIixcclxuICAgICAgICBcImdyb3VwXCI6IDNcclxuICAgIH0sIHtcclxuICAgICAgICBcIm5hbWVcIjogXCJQdWdcIixcclxuICAgICAgICBcImdyb3VwXCI6IDFcclxuICAgIH0se1xyXG4gICAgICAgIFwibmFtZVwiOiBcIkJvb3RzdHJhcFwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogM1xyXG4gICAgfSwge1xyXG4gICAgICAgIFwibmFtZVwiOiBcIk1hdGVyaWFsaXplXCIsXHJcbiAgICAgICAgXCJncm91cFwiOiAzXHJcbiAgICB9LCB7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwiVHlwZVNjcmlwdFwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogNFxyXG4gICAgfSwge1xyXG4gICAgICAgIFwibmFtZVwiOiBcIlRhc2sgUnVubmVyc1wiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogNVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwiR3VscFwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogNVxyXG4gICAgfSwge1xyXG4gICAgICAgIFwibmFtZVwiOiBcIm5wbSBzY3JpcHRzXCIsXHJcbiAgICAgICAgXCJncm91cFwiOiA1XHJcbiAgICB9LHtcclxuICAgICAgICBcIm5hbWVcIjogXCJUZXN0aW5nXCIsXHJcbiAgICAgICAgXCJncm91cFwiOiA2XHJcbiAgICB9LHtcclxuICAgICAgICBcIm5hbWVcIjogXCJNb2NoYVwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogNlxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwiSmFzbWluZVwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogNlxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwiU2lub25cIixcclxuICAgICAgICBcImdyb3VwXCI6IDZcclxuICAgIH0se1xyXG4gICAgICAgIFwibmFtZVwiOiBcIkZyYW1ld29ya1wiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogN1xyXG4gICAgfSwge1xyXG4gICAgICAgIFwibmFtZVwiOiBcIkFtcGVyc2FuZFwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogN1xyXG4gICAgfSwge1xyXG4gICAgICAgIFwibmFtZVwiOiBcIk1pdGhyaWxcIixcclxuICAgICAgICBcImdyb3VwXCI6IDdcclxuICAgIH0sIHtcclxuICAgICAgICBcIm5hbWVcIjogXCJSZWFjdFwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogN1xyXG4gICAgfSwge1xyXG4gICAgICAgIFwibmFtZVwiOiBcIkQzXCIsXHJcbiAgICAgICAgXCJncm91cFwiOiA3XHJcbiAgICB9LCB7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwiR2VuZXJhbFwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogOFxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwiR2l0XCIsXHJcbiAgICAgICAgXCJncm91cFwiOiA4XHJcbiAgICB9LCB7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwiR2l0aHViXCIsXHJcbiAgICAgICAgXCJncm91cFwiOiA4XHJcbiAgICB9LHtcclxuICAgICAgICBcIm5hbWVcIjogXCJNb2R1bGUgQnVuZGxlclwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogOVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJuYW1lXCI6IFwiQnJvd3NlcmlmeVwiLFxyXG4gICAgICAgIFwiZ3JvdXBcIjogOVxyXG4gICAgfV0sXHJcbiAgICBcImxpbmtzXCI6IFt7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMCxcclxuICAgICAgICBcInRhcmdldFwiOiAxLFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMCxcclxuICAgICAgICBcInRhcmdldFwiOiAyLFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMSxcclxuICAgICAgICBcInRhcmdldFwiOiAzLFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMSxcclxuICAgICAgICBcInRhcmdldFwiOiA0LFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMSxcclxuICAgICAgICBcInRhcmdldFwiOiA1LFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMyxcclxuICAgICAgICBcInRhcmdldFwiOiA2LFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMyxcclxuICAgICAgICBcInRhcmdldFwiOiA3LFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogNCxcclxuICAgICAgICBcInRhcmdldFwiOiA4LFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMyxcclxuICAgICAgICBcInRhcmdldFwiOiA5LFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMyxcclxuICAgICAgICBcInRhcmdldFwiOiAxMCxcclxuICAgICAgICBcInZhbHVlXCI6IDFcclxuICAgIH0se1xyXG4gICAgICAgIFwic291cmNlXCI6IDUsXHJcbiAgICAgICAgXCJ0YXJnZXRcIjogMTEsXHJcbiAgICAgICAgXCJ2YWx1ZVwiOiAxXHJcbiAgICB9LHtcclxuICAgICAgICBcInNvdXJjZVwiOiA1LFxyXG4gICAgICAgIFwidGFyZ2V0XCI6IDEyLFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMTIsXHJcbiAgICAgICAgXCJ0YXJnZXRcIjogMTMsXHJcbiAgICAgICAgXCJ2YWx1ZVwiOiAxXHJcbiAgICB9LHtcclxuICAgICAgICBcInNvdXJjZVwiOiAxMixcclxuICAgICAgICBcInRhcmdldFwiOiAxNCxcclxuICAgICAgICBcInZhbHVlXCI6IDFcclxuICAgIH0se1xyXG4gICAgICAgIFwic291cmNlXCI6IDUsXHJcbiAgICAgICAgXCJ0YXJnZXRcIjogMTUsXHJcbiAgICAgICAgXCJ2YWx1ZVwiOiAxXHJcbiAgICB9LHtcclxuICAgICAgICBcInNvdXJjZVwiOiAxNSxcclxuICAgICAgICBcInRhcmdldFwiOiAxNixcclxuICAgICAgICBcInZhbHVlXCI6IDFcclxuICAgIH0se1xyXG4gICAgICAgIFwic291cmNlXCI6IDE1LFxyXG4gICAgICAgIFwidGFyZ2V0XCI6IDE3LFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMTUsXHJcbiAgICAgICAgXCJ0YXJnZXRcIjogMTgsXHJcbiAgICAgICAgXCJ2YWx1ZVwiOiAxXHJcbiAgICB9LHtcclxuICAgICAgICBcInNvdXJjZVwiOiA1LFxyXG4gICAgICAgIFwidGFyZ2V0XCI6IDE5LFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMTksXHJcbiAgICAgICAgXCJ0YXJnZXRcIjogMjAsXHJcbiAgICAgICAgXCJ2YWx1ZVwiOiAxXHJcbiAgICB9LHtcclxuICAgICAgICBcInNvdXJjZVwiOiAxOSxcclxuICAgICAgICBcInRhcmdldFwiOiAyMSxcclxuICAgICAgICBcInZhbHVlXCI6IDFcclxuICAgIH0se1xyXG4gICAgICAgIFwic291cmNlXCI6IDE5LFxyXG4gICAgICAgIFwidGFyZ2V0XCI6IDIyLFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMTksXHJcbiAgICAgICAgXCJ0YXJnZXRcIjogMjMsXHJcbiAgICAgICAgXCJ2YWx1ZVwiOiAxXHJcbiAgICB9LHtcclxuICAgICAgICBcInNvdXJjZVwiOiAwLFxyXG4gICAgICAgIFwidGFyZ2V0XCI6IDI0LFxyXG4gICAgICAgIFwidmFsdWVcIjogMVxyXG4gICAgfSx7XHJcbiAgICAgICAgXCJzb3VyY2VcIjogMjQsXHJcbiAgICAgICAgXCJ0YXJnZXRcIjogMjUsXHJcbiAgICAgICAgXCJ2YWx1ZVwiOiAxXHJcbiAgICB9LHtcclxuICAgICAgICBcInNvdXJjZVwiOiAyNCxcclxuICAgICAgICBcInRhcmdldFwiOiAyNixcclxuICAgICAgICBcInZhbHVlXCI6IDFcclxuICAgIH0se1xyXG4gICAgICAgIFwic291cmNlXCI6IDUsXHJcbiAgICAgICAgXCJ0YXJnZXRcIjogMjcsXHJcbiAgICAgICAgXCJ2YWx1ZVwiOiAxXHJcbiAgICB9LHtcclxuICAgICAgICBcInNvdXJjZVwiOiAyNyxcclxuICAgICAgICBcInRhcmdldFwiOiAyOCxcclxuICAgICAgICBcInZhbHVlXCI6IDFcclxuICAgIH1dXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpe1xyXG5cclxuXHJcbi8vQ29uc3RhbnRzIGZvciB0aGUgU1ZHXHJcbnZhciB3aWR0aCA9ICQoXCIubGlnaHRcIikud2lkdGgoKSxcclxuICAgIGhlaWdodCA9ICQoXCIubGlnaHRcIikuaGVpZ2h0KCk7XHJcblxyXG5mdW5jdGlvbiBkcmFnc3RhcnRlZChkKSB7XHJcbiAgICBpZiAoIWQzLmV2ZW50LmFjdGl2ZSkgZm9yY2UuYWxwaGFUYXJnZXQoMC41KS5yZXN0YXJ0KCk7XHJcbiAgICBkLmZ4ID0gZC54O1xyXG4gICAgZC5meSA9IGQueTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhZ2dlZChkKSB7XHJcbiAgICBkLmZ4ID0gZDMuZXZlbnQueDtcclxuICAgIGQuZnkgPSBkMy5ldmVudC55O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFnZW5kZWQoZCkge1xyXG4gICAgaWYgKCFkMy5ldmVudC5hY3RpdmUpIGZvcmNlLmFscGhhVGFyZ2V0KDAuNSk7XHJcbiAgICBkLmZ4ID0gbnVsbDtcclxuICAgIGQuZnkgPSBudWxsO1xyXG59XHJcblxyXG4vL1NldCB1cCB0aGUgY29sb3VyIHNjYWxlXHJcbnZhciBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbChkMy5zY2hlbWVDYXRlZ29yeTIwKTtcclxuXHJcbi8vU2V0IHVwIHRoZSBmb3JjZSBsYXlvdXRcclxudmFyIGZvcmNlID0gZDMuZm9yY2VTaW11bGF0aW9uKClcclxuICAgIC5mb3JjZShcImNoYXJnZVwiLCBkMy5mb3JjZU1hbnlCb2R5KCkuc3RyZW5ndGgoLTcwMCkuZGlzdGFuY2VNaW4oMTAwKS5kaXN0YW5jZU1heCgxMDAwKSlcclxuICAgIC5mb3JjZShcImxpbmtcIiwgZDMuZm9yY2VMaW5rKCkuaWQoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuaW5kZXggfSkpXHJcbiAgICAuZm9yY2UoXCJjZW50ZXJcIiwgZDMuZm9yY2VDZW50ZXIod2lkdGggLyAyLCBoZWlnaHQgLyAyKSlcclxuICAgIC5mb3JjZShcInlcIiwgZDMuZm9yY2VZKDAuMDAxKSlcclxuICAgIC5mb3JjZShcInhcIiwgZDMuZm9yY2VYKDAuMDAxKSlcclxuXHJcbi8vQXBwZW5kIGEgU1ZHIHRvIHRoZSBib2R5IG9mIHRoZSBodG1sIHBhZ2UuIEFzc2lnbiB0aGlzIFNWRyBhcyBhbiBvYmplY3QgdG8gc3ZnXHJcbnZhciBzdmcgPSBkMy5zZWxlY3QoXCIubGlnaHRcIikuYXBwZW5kKFwic3ZnXCIpXHJcbiAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxyXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcclxuXHJcbmZvcmNlXHJcbiAgICAubm9kZXMoZGF0YS5ub2RlcylcclxuICAgIC5mb3JjZShcImxpbmtcIikubGlua3MoZGF0YS5saW5rcylcclxuXHJcbnZhciBsaW5rID0gc3ZnLnNlbGVjdEFsbChcIi5saW5rXCIpXHJcbiAgICAuZGF0YShkYXRhLmxpbmtzKVxyXG4gICAgLmVudGVyKClcclxuICAgIC5hcHBlbmQoXCJsaW5lXCIpXHJcbiAgICAuYXR0cihcImNsYXNzXCIsIFwibGlua1wiKVxyXG4gICAgLmF0dHIoJ21hcmtlci1lbmQnLCAndXJsKCNhcnJvd2hlYWQpJylcclxuXHJcbnZhciBub2RlID0gc3ZnLnNlbGVjdEFsbChcIi5ub2RlXCIpXHJcbiAgICAuZGF0YShkYXRhLm5vZGVzKVxyXG4gICAgLmVudGVyKCkuYXBwZW5kKFwiZ1wiKVxyXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcIm5vZGVcIilcclxuICAgIC5jYWxsKGQzLmRyYWcoKVxyXG4gICAgICAgIC5vbihcInN0YXJ0XCIsIGRyYWdzdGFydGVkKVxyXG4gICAgICAgIC5vbihcImRyYWdcIiwgZHJhZ2dlZClcclxuICAgICAgICAub24oXCJlbmRcIiwgZHJhZ2VuZGVkKSk7XHJcblxyXG5ub2RlLmFwcGVuZCgnY2lyY2xlJylcclxuICAgIC5hdHRyKCdyJywgMTMpXHJcbiAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbG9yKGQuZ3JvdXApO1xyXG4gICAgfSk7XHJcblxyXG5ub2RlLmFwcGVuZChcInRleHRcIilcclxuICAgICAgLmF0dHIoXCJkeFwiLCAxNClcclxuICAgICAgLmF0dHIoXCJkeVwiLCBcIi4zNWVtXCIpXHJcbiAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubmFtZSB9KVxyXG4gICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCJibGFja1wiKTtcclxuXHJcbnZhciBwYWRkaW5nID0gMSwgLy8gc2VwYXJhdGlvbiBiZXR3ZWVuIGNpcmNsZXNcclxuICAgIHJhZGl1cz04O1xyXG5mdW5jdGlvbiBjb2xsaWRlKGFscGhhKSB7XHJcbiAgdmFyIHF1YWR0cmVlID0gZDMucXVhZHRyZWUoZGF0YS5ub2Rlcyk7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGQpIHtcclxuICAgIHZhciByYiA9IDIqcmFkaXVzICsgcGFkZGluZyxcclxuICAgICAgICBueDEgPSBkLnggLSByYixcclxuICAgICAgICBueDIgPSBkLnggKyByYixcclxuICAgICAgICBueTEgPSBkLnkgLSByYixcclxuICAgICAgICBueTIgPSBkLnkgKyByYjtcclxuICAgIHF1YWR0cmVlLnZpc2l0KGZ1bmN0aW9uKHF1YWQsIHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAgIGlmIChxdWFkLnBvaW50ICYmIChxdWFkLnBvaW50ICE9PSBkKSkge1xyXG4gICAgICAgIHZhciB4ID0gZC54IC0gcXVhZC5wb2ludC54LFxyXG4gICAgICAgICAgICB5ID0gZC55IC0gcXVhZC5wb2ludC55LFxyXG4gICAgICAgICAgICBsID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xyXG4gICAgICAgICAgaWYgKGwgPCByYikge1xyXG4gICAgICAgICAgbCA9IChsIC0gcmIpIC8gbCAqIGFscGhhO1xyXG4gICAgICAgICAgZC54IC09IHggKj0gbDtcclxuICAgICAgICAgIGQueSAtPSB5ICo9IGw7XHJcbiAgICAgICAgICBxdWFkLnBvaW50LnggKz0geDtcclxuICAgICAgICAgIHF1YWQucG9pbnQueSArPSB5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geDEgPiBueDIgfHwgeDIgPCBueDEgfHwgeTEgPiBueTIgfHwgeTIgPCBueTE7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcblxyXG5mb3JjZS5vbihcInRpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgbGluay5hdHRyKFwieDFcIiwgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICByZXR1cm4gZC5zb3VyY2UueDtcclxuICAgIH0pXHJcbiAgICAgICAgLmF0dHIoXCJ5MVwiLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZC5zb3VyY2UueTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5hdHRyKFwieDJcIiwgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGQudGFyZ2V0Lng7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYXR0cihcInkyXCIsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLnRhcmdldC55O1xyXG4gICAgICAgIH0pO1xyXG4gIG5vZGUuZWFjaChjb2xsaWRlKDAuNSkpOyAvL0FkZGVkXHJcblxyXG4gICAgbm9kZS5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgZC54ICsgXCIsXCIgKyBkLnkgKyBcIilcIjtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gIFwibmF2XCI6IHtcclxuICAgIFwiaG9tZVwiOiBcIlN0YXJ0XCIsXHJcbiAgICBcInByb2plY3RzXCI6IFwiUHJvamVrdGVcIixcclxuICAgIFwiYWJvdXRNZVwiOiBcIsOcYmVyIG1pY2hcIixcclxuICAgIFwiY29udGFjdFwiOiBcIktvbnRha3RcIlxyXG4gIH0sXHJcbiAgXCJjb250YWN0XCI6e1xyXG4gICAgXCJ0aGFua3NcIjogXCJEYW5rZSBmw7xycyB2b3JiZWlzY2hhdWVuIVwiLFxyXG4gICAgXCJ0ZXh0XCI6IFwiSWNoIGJpbiBpbW1lciBvZmZlbiBmw7xyIGVpbmVuIGtsZWluZW4gUGxhdXNjaCwgYWxzbyBrb250YWt0aWVyZSBtaWNoIHJ1aGlnLlwiLFxyXG4gICAgXCJzYXlIaVwiOiBcIlNhZyBNb2luXCJcclxuICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gIFwibmF2XCI6IHtcclxuICAgIFwiaG9tZVwiOiBcIkhvbWVcIixcclxuICAgIFwicHJvamVjdHNcIjogXCJQcm9qZWN0c1wiLFxyXG4gICAgXCJhYm91dE1lXCI6IFwiQWJvdXQgTWVcIixcclxuICAgIFwiY29udGFjdFwiOiBcIkNvbnRhY3RcIlxyXG4gIH0sXHJcbiAgXCJjb250YWN0XCI6e1xyXG4gICAgXCJ0aGFua3NcIjogXCJUaGFua3MgZm9yIGNvbWluZyBieSFcIixcclxuICAgIFwidGV4dFwiOiBcIknigJltIGFsd2F5cyBvcGVuIGZvciBhIGNoYXQgc28gZmVlbCBmcmVlIHRvIGNvbnRhY3QgbWUuXCIsXHJcbiAgICBcInNheUhpXCI6IFwiU2F5IGhpXCJcclxuICB9XHJcbn1cclxuIl0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpY205M2MyVnlMWEJoWTJzdlgzQnlaV3gxWkdVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdmFURTRibVY0ZEM5a2FYTjBMMk52YlcxdmJtcHpMMEpoWTJ0bGJtUkRiMjV1WldOMGIzSXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZhVEU0Ym1WNGRDOWthWE4wTDJOdmJXMXZibXB6TDBOaFkyaGxRMjl1Ym1WamRHOXlMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMmt4T0c1bGVIUXZaR2x6ZEM5amIyMXRiMjVxY3k5RmRtVnVkRVZ0YVhSMFpYSXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZhVEU0Ym1WNGRDOWthWE4wTDJOdmJXMXZibXB6TDBsdWRHVnljRzlzWVhSdmNpNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OXBNVGh1WlhoMEwyUnBjM1F2WTI5dGJXOXVhbk12VEdGdVozVmhaMlZWZEdsc2N5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OXBNVGh1WlhoMEwyUnBjM1F2WTI5dGJXOXVhbk12VUd4MWNtRnNVbVZ6YjJ4MlpYSXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZhVEU0Ym1WNGRDOWthWE4wTDJOdmJXMXZibXB6TDFKbGMyOTFjbU5sVTNSdmNtVXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZhVEU0Ym1WNGRDOWthWE4wTDJOdmJXMXZibXB6TDFSeVlXNXpiR0YwYjNJdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdmFURTRibVY0ZEM5a2FYTjBMMk52YlcxdmJtcHpMMlJsWm1GMWJIUnpMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMmt4T0c1bGVIUXZaR2x6ZEM5amIyMXRiMjVxY3k5cE1UaHVaWGgwTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJreE9HNWxlSFF2WkdsemRDOWpiMjF0YjI1cWN5OXBibVJsZUM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5cE1UaHVaWGgwTDJScGMzUXZZMjl0Ylc5dWFuTXZiRzluWjJWeUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwya3hPRzVsZUhRdlpHbHpkQzlqYjIxdGIyNXFjeTl3YjNOMFVISnZZMlZ6YzI5eUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwya3hPRzVsZUhRdlpHbHpkQzlqYjIxdGIyNXFjeTkxZEdsc2N5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OXBNVGh1WlhoMEwybHVaR1Y0TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJweGRXVnllUzFwTVRodVpYaDBMMlJwYzNRdlkyOXRiVzl1YW5NdmFXNWtaWGd1YW5NaUxDSnpjbU12YW5NdmJXRnBiaTVxY3lJc0luTnlZeTlxY3k5dGIyUjFiR1Z6TDNOcmFXeHNjMlYwTG1weklpd2ljM0pqTDJ4dlkyRnNaWE12WkdVdWFuTnZiaUlzSW5OeVl5OXNiMk5oYkdWekwyVnVMbXB6YjI0aVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdRVU5CUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEYWxSQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVONlJrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRM0JGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEzQk5RVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTndTVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRNVXhCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUXpWS1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRlbFZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTNCR1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZETTJKQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRE5VSkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTI1SFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTnlRa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU4wU0VFN1FVRkRRVHM3UVVORVFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3pzN08wRkRNMGhCT3pzN08wRkJRMEU3T3pzN1FVRkZRVHM3U1VGQldTeFJPenM3T3pzN1FVRkZXanM3UVVGRlFTeEpRVUZKTEZWQlFWVXNVVUZCVVN4elFrRkJVaXhEUVVGa08wRkJRMEVzU1VGQlNTeFRRVUZUTEZGQlFWRXNjMEpCUVZJc1EwRkJZanM3UVVGRlFTeEpRVUZKTEZsQlFWazdRVUZEWkN4TlFVRkpMRTlCUkZVN1FVRkZaQ3hOUVVGSk8wRkJSbFVzUTBGQmFFSTdPMEZCUzBFc1UwRkJVeXh0UWtGQlZDeEhRVUU0UWp0QlFVTTFRanRCUVVOQkxFbEJRVVVzWTBGQlJqdEJRVU5GTzBGQlJFWXNSMEZGUnl4SFFVWklMRU5CUlU4c1dVRkdVQ3hGUVVkSExFZEJTRWdzUTBGSFR5eGhRVWhRTEVWQlNVY3NTMEZLU0N4RFFVbFRMRlZCUVZNc1MwRkJWQ3hGUVVGblFqdEJRVU55UWp0QlFVTkJMRkZCUTBVc1UwRkJVeXhSUVVGVUxFTkJRV3RDTEU5QlFXeENMRU5CUVRCQ0xFdEJRVEZDTEVWQlFXbERMRVZCUVdwRExFdEJRWGRETEV0QlFVc3NVVUZCVEN4RFFVRmpMRTlCUVdRc1EwRkJjMElzUzBGQmRFSXNSVUZCTmtJc1JVRkJOMElzUTBGQmVFTXNTVUZEUVN4VFFVRlRMRkZCUVZRc1NVRkJjVUlzUzBGQlN5eFJRVVkxUWl4RlFVZEZPMEZCUTBFN1FVRkRRU3hWUVVGSkxGTkJRVk1zUlVGQlJTeExRVUZMTEVsQlFWQXNRMEZCWWp0QlFVTkJMR1ZCUVZNc1QwRkJUeXhOUVVGUUxFZEJRV2RDTEUxQlFXaENMRWRCUVhsQ0xFVkJRVVVzVjBGQlZ5eExRVUZMTEVsQlFVd3NRMEZCVlN4TFFVRldMRU5CUVdkQ0xFTkJRV2hDTEVOQlFWZ3NSMEZCWjBNc1IwRkJiRU1zUTBGQmJFTTdRVUZEUVR0QlFVTkJMRlZCUVVrc1QwRkJUeXhOUVVGWUxFVkJRVzFDTzBGQlEycENPMEZCUTBFc1kwRkJUU3hqUVVGT08wRkJRMEVzVlVGQlJTeFpRVUZHTEVWQlFXZENMRTlCUVdoQ0xFTkJRWGRDTzBGQlEzUkNMSEZDUVVGWExFOUJRVThzVFVGQlVDeEhRVUZuUWp0QlFVUk1MRk5CUVhoQ0xFVkJSVWNzU1VGR1NDeEZRVVZUTEZsQlFWYzdRVUZEYkVJN1FVRkRRVHRCUVVOQkxHTkJRVWtzVlVGQlZTeEZRVUZGTEUxQlFVWXNRMEZCWkR0QlFVTkJMR3RDUVVGUkxFdEJRVkk3UVVGRFFTeGpRVUZKTEZGQlFWRXNSVUZCVWl4RFFVRlhMRkZCUVZnc1EwRkJTaXhGUVVFd1FqdEJRVUZGTzBGQlF6RkNMRzFDUVVGUExFdEJRVkE3UVVGRFJDeFhRVVpFTEUxQlJVODdRVUZEVEN4dlFrRkJVU3hKUVVGU0xFTkJRV0VzVlVGQllpeEZRVUYzUWl4SlFVRjRRaXhGUVVSTExFTkJRekJDTzBGQlF5OUNMRzlDUVVGUkxFdEJRVklzUjBGR1N5eERRVVZaTzBGQlEyeENPMEZCUTBZc1UwRmlSRHRCUVdORU8wRkJRMFk3UVVGRFJpeEhRV3BEU0R0QlFXdERSRHM3UVVGRlJDeFRRVUZUTEhGQ1FVRlVMRWRCUVdkRE8wRkJRemxDTEUxQlFVa3NSVUZCUlN4TlFVRkdMRVZCUVZVc1UwRkJWaXhMUVVGM1FpeEhRVUUxUWl4RlFVRnBRenRCUVVNdlFpeE5RVUZGTEdOQlFVWXNSVUZCYTBJc1RVRkJiRUlzUTBGQmVVSXNSMEZCZWtJN1FVRkRSQ3hIUVVaRUxFMUJSVTg3UVVGRFRDeE5RVUZGTEdOQlFVWXNSVUZCYTBJc1QwRkJiRUlzUTBGQk1FSXNSMEZCTVVJN1FVRkRSRHRCUVVOR096dEJRVVZFTEVsQlFVa3NhVUpCUVdsQ08wRkJRMjVDTEdGQlFWY3NTVUZFVVR0QlFVVnVRaXhoUVVGWE8wRkJSbEVzUTBGQmNrSTdPMEZCUzBFc1UwRkJVeXhqUVVGVUxFTkJRWGRDTEV0QlFYaENMRVZCUVRoQ08wRkJRelZDTEUxQlFVa3NVMEZCVXl4RlFVRkZMRTFCUVUwc1RVRkJVaXhEUVVGaU8wRkJRMEU3UVVGRFFUdEJRVU5CTEVsQlFVVXNjMEpCUVVZc1JVRkJNRUlzVjBGQk1VSXNRMEZCYzBNc1VVRkJkRU03UVVGRFFTeFRRVUZQTEZGQlFWQXNRMEZCWjBJc1VVRkJhRUk3UVVGRFFTeHZRa0ZCVVN4alFVRlNMRU5CUVhWQ0xHVkJRV1VzVDBGQlR5eEpRVUZRTEVWQlFXWXNRMEZCZGtJN1FVRkRRU3hKUVVGRkxHRkJRVVlzUlVGQmFVSXNVVUZCYWtJN1FVRkRSRHM3UVVGRlJDeFRRVUZUTEhkQ1FVRlVMRWRCUVcxRE8wRkJRMnBETEVsQlFVVXNjMEpCUVVZc1JVRkJNRUlzUzBGQk1VSXNRMEZCWjBNc1kwRkJhRU03UVVGRFJEczdRVUZGUkN4VFFVRlRMR2xDUVVGVUxFZEJRVFJDTzBGQlF6RkNMRzlDUVVGUkxFbEJRVklzUTBGQllUdEJRVU5ZTEZOQlFVc3NTVUZFVFR0QlFVVllMRmRCUVU4c1NVRkdTVHRCUVVkWUxHVkJRVmM3UVVGSVFTeEhRVUZpTEVWQlNVY3NWVUZCVXl4SFFVRlVMRVZCUVdNc1EwRkJaQ3hGUVVGcFFqdEJRVU5zUWp0QlFVTkVMRWRCVGtRN08wRkJVVUVzTUVKQlFXTXNTVUZCWkN4dlFrRkJORUlzUTBGQk5VSXNSVUZCSzBJN1FVRkROMElzVjBGQlR5eEhRVVJ6UWl4RlFVTnFRanRCUVVOYUxHTkJRVlVzVFVGR2JVSXNSVUZGV0R0QlFVTnNRaXhuUWtGQldTeFZRVWhwUWl4RlFVZE1PMEZCUTNoQ0xHdENRVUZqTEZkQlNtVXNSVUZKUmp0QlFVTXpRaXhuUWtGQldTeGhRVXhwUWl4RlFVdEdPMEZCUXpOQ0xHbENRVUZoTEdOQlRtZENMRVZCVFVFN1FVRkROMElzYjBKQlFXZENMRXRCVUdFc1JVRlBUanRCUVVOMlFpeHJRMEZCT0VJc1NVRlNSQ3hEUVZGTk8wRkJVazRzUjBGQkwwSTdRVUZWUkRzN1FVRkZSRHRCUVVOQkxFVkJRVVVzV1VGQlZUdEJRVU5XTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZNc1NVRkJWRHRCUVVOQkxFbEJRVVVzVFVGQlJpeEZRVUZWTEUxQlFWWXNRMEZCYVVJc2NVSkJRV3BDTzBGQlEwRXNTVUZCUlN4VFFVRkdMRVZCUVdFc1YwRkJZaXhEUVVGNVFpeFJRVUY2UWp0QlFVTkVMRU5CVUVRN096czdPenM3TzFGRGMwZG5RaXhKTEVkQlFVRXNTVHRCUVRWTmFFSXNTVUZCU1N4UFFVRlBPMEZCUTFBc1lVRkJVeXhEUVVGRE8wRkJRMDRzWjBKQlFWRXNaMEpCUkVZN1FVRkZUaXhwUWtGQlV6dEJRVVpJTEV0QlFVUXNSVUZIVUR0QlFVTkZMR2RDUVVGUkxGZEJSRlk3UVVGRlJTeHBRa0ZCVXp0QlFVWllMRXRCU0U4c1JVRk5VRHRCUVVORkxHZENRVUZSTEZWQlJGWTdRVUZGUlN4cFFrRkJVenRCUVVaWUxFdEJUazhzUlVGVFVEdEJRVU5GTEdkQ1FVRlJMRTFCUkZZN1FVRkZSU3hwUWtGQlV6dEJRVVpZTEV0QlZFOHNSVUZaVGp0QlFVTkRMR2RDUVVGUkxFOUJSRlE3UVVGRlF5eHBRa0ZCVXp0QlFVWldMRXRCV2swc1JVRmxUanRCUVVORExHZENRVUZSTEZsQlJGUTdRVUZGUXl4cFFrRkJVenRCUVVaV0xFdEJaazBzUlVGclFsQTdRVUZEUlN4blFrRkJVU3hOUVVSV08wRkJSVVVzYVVKQlFWTTdRVUZHV0N4TFFXeENUeXhGUVhGQ1RqdEJRVU5ETEdkQ1FVRlJMRkZCUkZRN1FVRkZReXhwUWtGQlV6dEJRVVpXTEV0QmNrSk5MRVZCZDBKT08wRkJRME1zWjBKQlFWRXNTMEZFVkR0QlFVVkRMR2xDUVVGVE8wRkJSbFlzUzBGNFFrMHNSVUV5UWxBN1FVRkRSU3huUWtGQlVTeFhRVVJXTzBGQlJVVXNhVUpCUVZNN1FVRkdXQ3hMUVROQ1R5eEZRVGhDVGp0QlFVTkRMR2RDUVVGUkxHRkJSRlE3UVVGRlF5eHBRa0ZCVXp0QlFVWldMRXRCT1VKTkxFVkJhVU5PTzBGQlEwTXNaMEpCUVZFc1dVRkVWRHRCUVVWRExHbENRVUZUTzBGQlJsWXNTMEZxUTAwc1JVRnZRMDQ3UVVGRFF5eG5Ra0ZCVVN4alFVUlVPMEZCUlVNc2FVSkJRVk03UVVGR1ZpeExRWEJEVFN4RlFYVkRVRHRCUVVORkxHZENRVUZSTEUxQlJGWTdRVUZGUlN4cFFrRkJVenRCUVVaWUxFdEJka05QTEVWQk1FTk9PMEZCUTBNc1owSkJRVkVzWVVGRVZEdEJRVVZETEdsQ1FVRlRPMEZCUmxZc1MwRXhRMDBzUlVFMlExQTdRVUZEUlN4blFrRkJVU3hUUVVSV08wRkJSVVVzYVVKQlFWTTdRVUZHV0N4TFFUZERUeXhGUVdkRVVEdEJRVU5GTEdkQ1FVRlJMRTlCUkZZN1FVRkZSU3hwUWtGQlV6dEJRVVpZTEV0QmFFUlBMRVZCYlVSUU8wRkJRMFVzWjBKQlFWRXNVMEZFVmp0QlFVVkZMR2xDUVVGVE8wRkJSbGdzUzBGdVJFOHNSVUZ6UkZBN1FVRkRSU3huUWtGQlVTeFBRVVJXTzBGQlJVVXNhVUpCUVZNN1FVRkdXQ3hMUVhSRVR5eEZRWGxFVUR0QlFVTkZMR2RDUVVGUkxGZEJSRlk3UVVGRlJTeHBRa0ZCVXp0QlFVWllMRXRCZWtSUExFVkJORVJPTzBGQlEwTXNaMEpCUVZFc1YwRkVWRHRCUVVWRExHbENRVUZUTzBGQlJsWXNTMEUxUkUwc1JVRXJSRTQ3UVVGRFF5eG5Ra0ZCVVN4VFFVUlVPMEZCUlVNc2FVSkJRVk03UVVGR1ZpeExRUzlFVFN4RlFXdEZUanRCUVVORExHZENRVUZSTEU5QlJGUTdRVUZGUXl4cFFrRkJVenRCUVVaV0xFdEJiRVZOTEVWQmNVVk9PMEZCUTBNc1owSkJRVkVzU1VGRVZEdEJRVVZETEdsQ1FVRlRPMEZCUmxZc1MwRnlSVTBzUlVGM1JVNDdRVUZEUXl4blFrRkJVU3hUUVVSVU8wRkJSVU1zYVVKQlFWTTdRVUZHVml4TFFYaEZUU3hGUVRKRlVEdEJRVU5GTEdkQ1FVRlJMRXRCUkZZN1FVRkZSU3hwUWtGQlV6dEJRVVpZTEV0Qk0wVlBMRVZCT0VWT08wRkJRME1zWjBKQlFWRXNVVUZFVkR0QlFVVkRMR2xDUVVGVE8wRkJSbFlzUzBFNVJVMHNSVUZwUmxBN1FVRkRSU3huUWtGQlVTeG5Ra0ZFVmp0QlFVVkZMR2xDUVVGVE8wRkJSbGdzUzBGcVJrOHNSVUZ2UmxBN1FVRkRSU3huUWtGQlVTeFpRVVJXTzBGQlJVVXNhVUpCUVZNN1FVRkdXQ3hMUVhCR1R5eERRVVJHTzBGQmVVWlFMR0ZCUVZNc1EwRkJRenRCUVVOT0xHdENRVUZWTEVOQlJFbzdRVUZGVGl4clFrRkJWU3hEUVVaS08wRkJSMDRzYVVKQlFWTTdRVUZJU0N4TFFVRkVMRVZCU1ZBN1FVRkRSU3hyUWtGQlZTeERRVVJhTzBGQlJVVXNhMEpCUVZVc1EwRkdXanRCUVVkRkxHbENRVUZUTzBGQlNGZ3NTMEZLVHl4RlFWRlFPMEZCUTBVc2EwSkJRVlVzUTBGRVdqdEJRVVZGTEd0Q1FVRlZMRU5CUmxvN1FVRkhSU3hwUWtGQlV6dEJRVWhZTEV0QlVrOHNSVUZaVUR0QlFVTkZMR3RDUVVGVkxFTkJSRm83UVVGRlJTeHJRa0ZCVlN4RFFVWmFPMEZCUjBVc2FVSkJRVk03UVVGSVdDeExRVnBQTEVWQlowSlFPMEZCUTBVc2EwSkJRVlVzUTBGRVdqdEJRVVZGTEd0Q1FVRlZMRU5CUmxvN1FVRkhSU3hwUWtGQlV6dEJRVWhZTEV0QmFFSlBMRVZCYjBKUU8wRkJRMFVzYTBKQlFWVXNRMEZFV2p0QlFVVkZMR3RDUVVGVkxFTkJSbG83UVVGSFJTeHBRa0ZCVXp0QlFVaFlMRXRCY0VKUExFVkJkMEpRTzBGQlEwVXNhMEpCUVZVc1EwRkVXanRCUVVWRkxHdENRVUZWTEVOQlJsbzdRVUZIUlN4cFFrRkJVenRCUVVoWUxFdEJlRUpQTEVWQk5FSlFPMEZCUTBVc2EwSkJRVlVzUTBGRVdqdEJRVVZGTEd0Q1FVRlZMRU5CUmxvN1FVRkhSU3hwUWtGQlV6dEJRVWhZTEV0Qk5VSlBMRVZCWjBOUU8wRkJRMFVzYTBKQlFWVXNRMEZFV2p0QlFVVkZMR3RDUVVGVkxFTkJSbG83UVVGSFJTeHBRa0ZCVXp0QlFVaFlMRXRCYUVOUExFVkJiME5RTzBGQlEwVXNhMEpCUVZVc1EwRkVXanRCUVVWRkxHdENRVUZWTEVWQlJsbzdRVUZIUlN4cFFrRkJVenRCUVVoWUxFdEJjRU5QTEVWQmQwTlFPMEZCUTBVc2EwSkJRVlVzUTBGRVdqdEJRVVZGTEd0Q1FVRlZMRVZCUmxvN1FVRkhSU3hwUWtGQlV6dEJRVWhZTEV0QmVFTlBMRVZCTkVOUU8wRkJRMFVzYTBKQlFWVXNRMEZFV2p0QlFVVkZMR3RDUVVGVkxFVkJSbG83UVVGSFJTeHBRa0ZCVXp0QlFVaFlMRXRCTlVOUExFVkJaMFJRTzBGQlEwVXNhMEpCUVZVc1JVRkVXanRCUVVWRkxHdENRVUZWTEVWQlJsbzdRVUZIUlN4cFFrRkJVenRCUVVoWUxFdEJhRVJQTEVWQmIwUlFPMEZCUTBVc2EwSkJRVlVzUlVGRVdqdEJRVVZGTEd0Q1FVRlZMRVZCUmxvN1FVRkhSU3hwUWtGQlV6dEJRVWhZTEV0QmNFUlBMRVZCZDBSUU8wRkJRMFVzYTBKQlFWVXNRMEZFV2p0QlFVVkZMR3RDUVVGVkxFVkJSbG83UVVGSFJTeHBRa0ZCVXp0QlFVaFlMRXRCZUVSUExFVkJORVJRTzBGQlEwVXNhMEpCUVZVc1JVRkVXanRCUVVWRkxHdENRVUZWTEVWQlJsbzdRVUZIUlN4cFFrRkJVenRCUVVoWUxFdEJOVVJQTEVWQlowVlFPMEZCUTBVc2EwSkJRVlVzUlVGRVdqdEJRVVZGTEd0Q1FVRlZMRVZCUmxvN1FVRkhSU3hwUWtGQlV6dEJRVWhZTEV0QmFFVlBMRVZCYjBWUU8wRkJRMFVzYTBKQlFWVXNSVUZFV2p0QlFVVkZMR3RDUVVGVkxFVkJSbG83UVVGSFJTeHBRa0ZCVXp0QlFVaFlMRXRCY0VWUExFVkJkMFZRTzBGQlEwVXNhMEpCUVZVc1EwRkVXanRCUVVWRkxHdENRVUZWTEVWQlJsbzdRVUZIUlN4cFFrRkJVenRCUVVoWUxFdEJlRVZQTEVWQk5FVlFPMEZCUTBVc2EwSkJRVlVzUlVGRVdqdEJRVVZGTEd0Q1FVRlZMRVZCUmxvN1FVRkhSU3hwUWtGQlV6dEJRVWhZTEV0Qk5VVlBMRVZCWjBaUU8wRkJRMFVzYTBKQlFWVXNSVUZFV2p0QlFVVkZMR3RDUVVGVkxFVkJSbG83UVVGSFJTeHBRa0ZCVXp0QlFVaFlMRXRCYUVaUExFVkJiMFpRTzBGQlEwVXNhMEpCUVZVc1JVRkVXanRCUVVWRkxHdENRVUZWTEVWQlJsbzdRVUZIUlN4cFFrRkJVenRCUVVoWUxFdEJjRVpQTEVWQmQwWlFPMEZCUTBVc2EwSkJRVlVzUlVGRVdqdEJRVVZGTEd0Q1FVRlZMRVZCUmxvN1FVRkhSU3hwUWtGQlV6dEJRVWhZTEV0QmVFWlBMRVZCTkVaUU8wRkJRMFVzYTBKQlFWVXNRMEZFV2p0QlFVVkZMR3RDUVVGVkxFVkJSbG83UVVGSFJTeHBRa0ZCVXp0QlFVaFlMRXRCTlVaUExFVkJaMGRRTzBGQlEwVXNhMEpCUVZVc1JVRkVXanRCUVVWRkxHdENRVUZWTEVWQlJsbzdRVUZIUlN4cFFrRkJVenRCUVVoWUxFdEJhRWRQTEVWQmIwZFFPMEZCUTBVc2EwSkJRVlVzUlVGRVdqdEJRVVZGTEd0Q1FVRlZMRVZCUmxvN1FVRkhSU3hwUWtGQlV6dEJRVWhZTEV0QmNFZFBMRVZCZDBkUU8wRkJRMFVzYTBKQlFWVXNRMEZFV2p0QlFVVkZMR3RDUVVGVkxFVkJSbG83UVVGSFJTeHBRa0ZCVXp0QlFVaFlMRXRCZUVkUExFVkJORWRRTzBGQlEwVXNhMEpCUVZVc1JVRkVXanRCUVVWRkxHdENRVUZWTEVWQlJsbzdRVUZIUlN4cFFrRkJVenRCUVVoWUxFdEJOVWRQTzBGQmVrWkdMRU5CUVZnN08wRkJORTFQTEZOQlFWTXNTVUZCVkN4SFFVRmxPenRCUVVkMFFqdEJRVU5CTEZGQlFVa3NVVUZCVVN4RlFVRkZMRkZCUVVZc1JVRkJXU3hMUVVGYUxFVkJRVm83UVVGQlFTeFJRVU5KTEZOQlFWTXNSVUZCUlN4UlFVRkdMRVZCUVZrc1RVRkJXaXhGUVVSaU96dEJRVWRCTEdGQlFWTXNWMEZCVkN4RFFVRnhRaXhEUVVGeVFpeEZRVUYzUWp0QlFVTndRaXhaUVVGSkxFTkJRVU1zUjBGQlJ5eExRVUZJTEVOQlFWTXNUVUZCWkN4RlFVRnpRaXhOUVVGTkxGZEJRVTRzUTBGQmEwSXNSMEZCYkVJc1JVRkJkVUlzVDBGQmRrSTdRVUZEZEVJc1ZVRkJSU3hGUVVGR0xFZEJRVThzUlVGQlJTeERRVUZVTzBGQlEwRXNWVUZCUlN4RlFVRkdMRWRCUVU4c1JVRkJSU3hEUVVGVU8wRkJRMGc3TzBGQlJVUXNZVUZCVXl4UFFVRlVMRU5CUVdsQ0xFTkJRV3BDTEVWQlFXOUNPMEZCUTJoQ0xGVkJRVVVzUlVGQlJpeEhRVUZQTEVkQlFVY3NTMEZCU0N4RFFVRlRMRU5CUVdoQ08wRkJRMEVzVlVGQlJTeEZRVUZHTEVkQlFVOHNSMEZCUnl4TFFVRklMRU5CUVZNc1EwRkJhRUk3UVVGRFNEczdRVUZGUkN4aFFVRlRMRk5CUVZRc1EwRkJiVUlzUTBGQmJrSXNSVUZCYzBJN1FVRkRiRUlzV1VGQlNTeERRVUZETEVkQlFVY3NTMEZCU0N4RFFVRlRMRTFCUVdRc1JVRkJjMElzVFVGQlRTeFhRVUZPTEVOQlFXdENMRWRCUVd4Q08wRkJRM1JDTEZWQlFVVXNSVUZCUml4SFFVRlBMRWxCUVZBN1FVRkRRU3hWUVVGRkxFVkJRVVlzUjBGQlR5eEpRVUZRTzBGQlEwZzdPMEZCUlVRN1FVRkRRU3hSUVVGSkxGRkJRVkVzUjBGQlJ5eFpRVUZJTEVOQlFXZENMRWRCUVVjc1owSkJRVzVDTEVOQlFWbzdPMEZCUlVFN1FVRkRRU3hSUVVGSkxGRkJRVkVzUjBGQlJ5eGxRVUZJTEVkQlExQXNTMEZFVHl4RFFVTkVMRkZCUkVNc1JVRkRVeXhIUVVGSExHRkJRVWdzUjBGQmJVSXNVVUZCYmtJc1EwRkJORUlzUTBGQlF5eEhRVUUzUWl4RlFVRnJReXhYUVVGc1F5eERRVUU0UXl4SFFVRTVReXhGUVVGdFJDeFhRVUZ1UkN4RFFVRXJSQ3hKUVVFdlJDeERRVVJVTEVWQlJWQXNTMEZHVHl4RFFVVkVMRTFCUmtNc1JVRkZUeXhIUVVGSExGTkJRVWdzUjBGQlpTeEZRVUZtTEVOQlFXdENMRlZCUVZVc1EwRkJWaXhGUVVGaE8wRkJRVVVzWlVGQlR5eEZRVUZGTEV0QlFWUTdRVUZCWjBJc1MwRkJha1FzUTBGR1VDeEZRVWRRTEV0QlNFOHNRMEZIUkN4UlFVaERMRVZCUjFNc1IwRkJSeXhYUVVGSUxFTkJRV1VzVVVGQlVTeERRVUYyUWl4RlFVRXdRaXhUUVVGVExFTkJRVzVETEVOQlNGUXNSVUZKVUN4TFFVcFBMRU5CU1VRc1IwRktReXhGUVVsSkxFZEJRVWNzVFVGQlNDeERRVUZWTEV0QlFWWXNRMEZLU2l4RlFVdFFMRXRCVEU4c1EwRkxSQ3hIUVV4RExFVkJTMGtzUjBGQlJ5eE5RVUZJTEVOQlFWVXNTMEZCVml4RFFVeEtMRU5CUVZvN08wRkJUMEU3UVVGRFFTeFJRVUZKTEUxQlFVMHNSMEZCUnl4TlFVRklMRU5CUVZVc1VVRkJWaXhGUVVGdlFpeE5RVUZ3UWl4RFFVRXlRaXhMUVVFelFpeEZRVU5NTEVsQlJFc3NRMEZEUVN4UFFVUkJMRVZCUTFNc1MwRkVWQ3hGUVVWTUxFbEJSa3NzUTBGRlFTeFJRVVpCTEVWQlJWVXNUVUZHVml4RFFVRldPenRCUVVsQkxGVkJRMHNzUzBGRVRDeERRVU5YTEV0QlFVc3NTMEZFYUVJc1JVRkZTeXhMUVVaTUxFTkJSVmNzVFVGR1dDeEZRVVZ0UWl4TFFVWnVRaXhEUVVWNVFpeExRVUZMTEV0QlJqbENPenRCUVVsQkxGRkJRVWtzVDBGQlR5eEpRVUZKTEZOQlFVb3NRMEZCWXl4UFFVRmtMRVZCUTA0c1NVRkVUU3hEUVVORUxFdEJRVXNzUzBGRVNpeEZRVVZPTEV0QlJrMHNSMEZIVGl4TlFVaE5MRU5CUjBNc1RVRklSQ3hGUVVsT0xFbEJTazBzUTBGSlJDeFBRVXBETEVWQlNWRXNUVUZLVWl4RlFVdE9MRWxCVEUwc1EwRkxSQ3haUVV4RExFVkJTMkVzYVVKQlRHSXNRMEZCV0RzN1FVRlBRU3hSUVVGSkxFOUJRVThzU1VGQlNTeFRRVUZLTEVOQlFXTXNUMEZCWkN4RlFVTk9MRWxCUkUwc1EwRkRSQ3hMUVVGTExFdEJSRW9zUlVGRlRpeExRVVpOTEVkQlJVVXNUVUZHUml4RFFVVlRMRWRCUmxRc1JVRkhUaXhKUVVoTkxFTkJSMFFzVDBGSVF5eEZRVWRSTEUxQlNGSXNSVUZKVGl4SlFVcE5MRU5CU1VRc1IwRkJSeXhKUVVGSUxFZEJRMFFzUlVGRVF5eERRVU5GTEU5QlJFWXNSVUZEVnl4WFFVUllMRVZCUlVRc1JVRkdReXhEUVVWRkxFMUJSa1lzUlVGRlZTeFBRVVpXTEVWQlIwUXNSVUZJUXl4RFFVZEZMRXRCU0VZc1JVRkhVeXhUUVVoVUxFTkJTa01zUTBGQldEczdRVUZUUVN4VFFVRkxMRTFCUVV3c1EwRkJXU3hSUVVGYUxFVkJRMHNzU1VGRVRDeERRVU5WTEVkQlJGWXNSVUZEWlN4RlFVUm1MRVZCUlVzc1NVRkdUQ3hEUVVWVkxFMUJSbFlzUlVGRmEwSXNWVUZCVlN4RFFVRldMRVZCUVdFN1FVRkRka0lzWlVGQlR5eE5RVUZOTEVWQlFVVXNTMEZCVWl4RFFVRlFPMEZCUTBnc1MwRktURHM3UVVGTlFTeFRRVUZMTEUxQlFVd3NRMEZCV1N4TlFVRmFMRVZCUTA4c1NVRkVVQ3hEUVVOWkxFbEJSRm9zUlVGRGEwSXNSVUZFYkVJc1JVRkZUeXhKUVVaUUxFTkJSVmtzU1VGR1dpeEZRVVZyUWl4UFFVWnNRaXhGUVVkUExFbEJTRkFzUTBGSFdTeFZRVUZUTEVOQlFWUXNSVUZCV1R0QlFVRkZMR1ZCUVU4c1JVRkJSU3hKUVVGVU8wRkJRV1VzUzBGSWVrTXNSVUZKVHl4TFFVcFFMRU5CU1dFc1VVRktZaXhGUVVsMVFpeFBRVXAyUWpzN1FVRk5RU3hSUVVGSkxGVkJRVlVzUTBGQlpEdEJRVUZCTEZGQlFXbENPMEZCUTJJc1lVRkJUeXhEUVVSWU8wRkJSVUVzWVVGQlV5eFBRVUZVTEVOQlFXbENMRXRCUVdwQ0xFVkJRWGRDTzBGQlEzUkNMRmxCUVVrc1YwRkJWeXhIUVVGSExGRkJRVWdzUTBGQldTeExRVUZMTEV0QlFXcENMRU5CUVdZN1FVRkRRU3hsUVVGUExGVkJRVk1zUTBGQlZDeEZRVUZaTzBGQlEycENMR2RDUVVGSkxFdEJRVXNzU1VGQlJTeE5RVUZHTEVkQlFWY3NUMEZCY0VJN1FVRkJRU3huUWtGRFNTeE5RVUZOTEVWQlFVVXNRMEZCUml4SFFVRk5MRVZCUkdoQ08wRkJRVUVzWjBKQlJVa3NUVUZCVFN4RlFVRkZMRU5CUVVZc1IwRkJUU3hGUVVab1FqdEJRVUZCTEdkQ1FVZEpMRTFCUVUwc1JVRkJSU3hEUVVGR0xFZEJRVTBzUlVGSWFFSTdRVUZCUVN4blFrRkpTU3hOUVVGTkxFVkJRVVVzUTBGQlJpeEhRVUZOTEVWQlNtaENPMEZCUzBFc2NVSkJRVk1zUzBGQlZDeERRVUZsTEZWQlFWTXNTVUZCVkN4RlFVRmxMRVZCUVdZc1JVRkJiVUlzUlVGQmJrSXNSVUZCZFVJc1JVRkJka0lzUlVGQk1rSXNSVUZCTTBJc1JVRkJLMEk3UVVGRE5VTXNiMEpCUVVrc1MwRkJTeXhMUVVGTUxFbEJRV1VzUzBGQlN5eExRVUZNTEV0QlFXVXNRMEZCYkVNc1JVRkJjME03UVVGRGNFTXNkMEpCUVVrc1NVRkJTU3hGUVVGRkxFTkJRVVlzUjBGQlRTeExRVUZMTEV0QlFVd3NRMEZCVnl4RFFVRjZRanRCUVVGQkxIZENRVU5KTEVsQlFVa3NSVUZCUlN4RFFVRkdMRWRCUVUwc1MwRkJTeXhMUVVGTUxFTkJRVmNzUTBGRWVrSTdRVUZCUVN4M1FrRkZTU3hKUVVGSkxFdEJRVXNzU1VGQlRDeERRVUZWTEVsQlFVa3NRMEZCU2l4SFFVRlJMRWxCUVVrc1EwRkJkRUlzUTBGR1VqdEJRVWRGTEhkQ1FVRkpMRWxCUVVrc1JVRkJVaXhGUVVGWk8wRkJRMW9zTkVKQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVV3c1NVRkJWeXhEUVVGWUxFZEJRV1VzUzBGQmJrSTdRVUZEUVN3d1FrRkJSU3hEUVVGR0xFbEJRVThzUzBGQlN5eERRVUZhTzBGQlEwRXNNRUpCUVVVc1EwRkJSaXhKUVVGUExFdEJRVXNzUTBGQldqdEJRVU5CTERaQ1FVRkxMRXRCUVV3c1EwRkJWeXhEUVVGWUxFbEJRV2RDTEVOQlFXaENPMEZCUTBFc05rSkJRVXNzUzBGQlRDeERRVUZYTEVOQlFWZ3NTVUZCWjBJc1EwRkJhRUk3UVVGRFJEdEJRVU5HTzBGQlEwUXNkVUpCUVU4c1MwRkJTeXhIUVVGTUxFbEJRVmtzUzBGQlN5eEhRVUZxUWl4SlFVRjNRaXhMUVVGTExFZEJRVGRDTEVsQlFXOURMRXRCUVVzc1IwRkJhRVE3UVVGRFJDeGhRV1JFTzBGQlpVUXNVMEZ5UWtRN1FVRnpRa1E3TzBGQlJVUXNWVUZCVFN4RlFVRk9MRU5CUVZNc1RVRkJWQ3hGUVVGcFFpeFpRVUZaTzBGQlEzcENMR0ZCUVVzc1NVRkJUQ3hEUVVGVkxFbEJRVllzUlVGQlowSXNWVUZCVlN4RFFVRldMRVZCUVdFN1FVRkRla0lzYlVKQlFVOHNSVUZCUlN4TlFVRkdMRU5CUVZNc1EwRkJhRUk3UVVGRFNDeFRRVVpFTEVWQlIwc3NTVUZJVEN4RFFVZFZMRWxCU0ZZc1JVRkhaMElzVlVGQlZTeERRVUZXTEVWQlFXRTdRVUZEY2tJc2JVSkJRVThzUlVGQlJTeE5RVUZHTEVOQlFWTXNRMEZCYUVJN1FVRkRTQ3hUUVV4TUxFVkJUVXNzU1VGT1RDeERRVTFWTEVsQlRsWXNSVUZOWjBJc1ZVRkJWU3hEUVVGV0xFVkJRV0U3UVVGRGNrSXNiVUpCUVU4c1JVRkJSU3hOUVVGR0xFTkJRVk1zUTBGQmFFSTdRVUZEU0N4VFFWSk1MRVZCVTBzc1NVRlVUQ3hEUVZOVkxFbEJWRllzUlVGVFowSXNWVUZCVlN4RFFVRldMRVZCUVdFN1FVRkRja0lzYlVKQlFVOHNSVUZCUlN4TlFVRkdMRU5CUVZNc1EwRkJhRUk3UVVGRFNDeFRRVmhNTzBGQldVWXNZVUZCU3l4SlFVRk1MRU5CUVZVc1VVRkJVU3hIUVVGU0xFTkJRVllzUlVGaU1rSXNRMEZoUmpzN1FVRkZka0lzWVVGQlN5eEpRVUZNTEVOQlFWVXNWMEZCVml4RlFVRjFRaXhWUVVGVkxFTkJRVllzUlVGQllUdEJRVU5vUXl4dFFrRkJUeXhsUVVGbExFVkJRVVVzUTBGQmFrSXNSMEZCY1VJc1IwRkJja0lzUjBGQk1rSXNSVUZCUlN4RFFVRTNRaXhIUVVGcFF5eEhRVUY0UXp0QlFVTklMRk5CUmtRN1FVRkhTQ3hMUVd4Q1JEdEJRVzlDUXpzN08wRkRjRlZFTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRZa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lLR1oxYm1OMGFXOXVLQ2w3Wm5WdVkzUnBiMjRnWlNoMExHNHNjaWw3Wm5WdVkzUnBiMjRnY3lodkxIVXBlMmxtS0NGdVcyOWRLWHRwWmlnaGRGdHZYU2w3ZG1GeUlHRTlkSGx3Wlc5bUlISmxjWFZwY21VOVBWd2lablZ1WTNScGIyNWNJaVltY21WeGRXbHlaVHRwWmlnaGRTWW1ZU2x5WlhSMWNtNGdZU2h2TENFd0tUdHBaaWhwS1hKbGRIVnliaUJwS0c4c0lUQXBPM1poY2lCbVBXNWxkeUJGY25KdmNpaGNJa05oYm01dmRDQm1hVzVrSUcxdlpIVnNaU0FuWENJcmJ5dGNJaWRjSWlrN2RHaHliM2NnWmk1amIyUmxQVndpVFU5RVZVeEZYMDVQVkY5R1QxVk9SRndpTEdaOWRtRnlJR3c5Ymx0dlhUMTdaWGh3YjNKMGN6cDdmWDA3ZEZ0dlhWc3dYUzVqWVd4c0tHd3VaWGh3YjNKMGN5eG1kVzVqZEdsdmJpaGxLWHQyWVhJZ2JqMTBXMjlkV3pGZFcyVmRPM0psZEhWeWJpQnpLRzQvYmpwbEtYMHNiQ3hzTG1WNGNHOXlkSE1zWlN4MExHNHNjaWw5Y21WMGRYSnVJRzViYjEwdVpYaHdiM0owYzMxMllYSWdhVDEwZVhCbGIyWWdjbVZ4ZFdseVpUMDlYQ0ptZFc1amRHbHZibHdpSmlaeVpYRjFhWEpsTzJadmNpaDJZWElnYnowd08yODhjaTVzWlc1bmRHZzdieXNyS1hNb2NsdHZYU2s3Y21WMGRYSnVJSE45Y21WMGRYSnVJR1Y5S1NncElpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNVBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnWENKZlgyVnpUVzlrZFd4bFhDSXNJSHRjYmlBZ2RtRnNkV1U2SUhSeWRXVmNibjBwTzF4dVhHNTJZWElnWDJWNGRHVnVaSE1nUFNCUFltcGxZM1F1WVhOemFXZHVJSHg4SUdaMWJtTjBhVzl1SUNoMFlYSm5aWFFwSUhzZ1ptOXlJQ2gyWVhJZ2FTQTlJREU3SUdrZ1BDQmhjbWQxYldWdWRITXViR1Z1WjNSb095QnBLeXNwSUhzZ2RtRnlJSE52ZFhKalpTQTlJR0Z5WjNWdFpXNTBjMXRwWFRzZ1ptOXlJQ2gyWVhJZ2EyVjVJR2x1SUhOdmRYSmpaU2tnZXlCcFppQW9UMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLSE52ZFhKalpTd2dhMlY1S1NrZ2V5QjBZWEpuWlhSYmEyVjVYU0E5SUhOdmRYSmpaVnRyWlhsZE95QjlJSDBnZlNCeVpYUjFjbTRnZEdGeVoyVjBPeUI5TzF4dVhHNTJZWElnWDNOc2FXTmxaRlJ2UVhKeVlYa2dQU0JtZFc1amRHbHZiaUFvS1NCN0lHWjFibU4wYVc5dUlITnNhV05sU1hSbGNtRjBiM0lvWVhKeUxDQnBLU0I3SUhaaGNpQmZZWEp5SUQwZ1cxMDdJSFpoY2lCZmJpQTlJSFJ5ZFdVN0lIWmhjaUJmWkNBOUlHWmhiSE5sT3lCMllYSWdYMlVnUFNCMWJtUmxabWx1WldRN0lIUnllU0I3SUdadmNpQW9kbUZ5SUY5cElEMGdZWEp5VzFONWJXSnZiQzVwZEdWeVlYUnZjbDBvS1N3Z1gzTTdJQ0VvWDI0Z1BTQW9YM01nUFNCZmFTNXVaWGgwS0NrcExtUnZibVVwT3lCZmJpQTlJSFJ5ZFdVcElIc2dYMkZ5Y2k1d2RYTm9LRjl6TG5aaGJIVmxLVHNnYVdZZ0tHa2dKaVlnWDJGeWNpNXNaVzVuZEdnZ1BUMDlJR2twSUdKeVpXRnJPeUI5SUgwZ1kyRjBZMmdnS0dWeWNpa2dleUJmWkNBOUlIUnlkV1U3SUY5bElEMGdaWEp5T3lCOUlHWnBibUZzYkhrZ2V5QjBjbmtnZXlCcFppQW9JVjl1SUNZbUlGOXBXMXdpY21WMGRYSnVYQ0pkS1NCZmFWdGNJbkpsZEhWeWJsd2lYU2dwT3lCOUlHWnBibUZzYkhrZ2V5QnBaaUFvWDJRcElIUm9jbTkzSUY5bE95QjlJSDBnY21WMGRYSnVJRjloY25JN0lIMGdjbVYwZFhKdUlHWjFibU4wYVc5dUlDaGhjbklzSUdrcElIc2dhV1lnS0VGeWNtRjVMbWx6UVhKeVlYa29ZWEp5S1NrZ2V5QnlaWFIxY200Z1lYSnlPeUI5SUdWc2MyVWdhV1lnS0ZONWJXSnZiQzVwZEdWeVlYUnZjaUJwYmlCUFltcGxZM1FvWVhKeUtTa2dleUJ5WlhSMWNtNGdjMnhwWTJWSmRHVnlZWFJ2Y2loaGNuSXNJR2twT3lCOUlHVnNjMlVnZXlCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtGd2lTVzUyWVd4cFpDQmhkSFJsYlhCMElIUnZJR1JsYzNSeWRXTjBkWEpsSUc1dmJpMXBkR1Z5WVdKc1pTQnBibk4wWVc1alpWd2lLVHNnZlNCOU95QjlLQ2s3WEc1Y2JuWmhjaUJmZFhScGJITWdQU0J5WlhGMWFYSmxLQ2N1TDNWMGFXeHpMbXB6SnlrN1hHNWNiblpoY2lCMWRHbHNjeUE5SUY5cGJuUmxjbTl3VW1WeGRXbHlaVmRwYkdSallYSmtLRjkxZEdsc2N5azdYRzVjYm5aaGNpQmZiRzluWjJWeUlEMGdjbVZ4ZFdseVpTZ25MaTlzYjJkblpYSXVhbk1uS1R0Y2JseHVkbUZ5SUY5c2IyZG5aWEl5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmYkc5bloyVnlLVHRjYmx4dWRtRnlJRjlGZG1WdWRFVnRhWFIwWlhJeUlEMGdjbVZ4ZFdseVpTZ25MaTlGZG1WdWRFVnRhWFIwWlhJdWFuTW5LVHRjYmx4dWRtRnlJRjlGZG1WdWRFVnRhWFIwWlhJeklEMGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENoZlJYWmxiblJGYldsMGRHVnlNaWs3WEc1Y2JtWjFibU4wYVc5dUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvYjJKcUtTQjdJSEpsZEhWeWJpQnZZbW9nSmlZZ2IySnFMbDlmWlhOTmIyUjFiR1VnUHlCdlltb2dPaUI3SUdSbFptRjFiSFE2SUc5aWFpQjlPeUI5WEc1Y2JtWjFibU4wYVc5dUlGOXBiblJsY205d1VtVnhkV2x5WlZkcGJHUmpZWEprS0c5aWFpa2dleUJwWmlBb2IySnFJQ1ltSUc5aWFpNWZYMlZ6VFc5a2RXeGxLU0I3SUhKbGRIVnliaUJ2WW1vN0lIMGdaV3h6WlNCN0lIWmhjaUJ1WlhkUFltb2dQU0I3ZlRzZ2FXWWdLRzlpYWlBaFBTQnVkV3hzS1NCN0lHWnZjaUFvZG1GeUlHdGxlU0JwYmlCdlltb3BJSHNnYVdZZ0tFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbW9zSUd0bGVTa3BJRzVsZDA5aWFsdHJaWGxkSUQwZ2IySnFXMnRsZVYwN0lIMGdmU0J1WlhkUFltb3VaR1ZtWVhWc2RDQTlJRzlpYWpzZ2NtVjBkWEp1SUc1bGQwOWlhanNnZlNCOVhHNWNibVoxYm1OMGFXOXVJRjlrWldaaGRXeDBjeWh2WW1vc0lHUmxabUYxYkhSektTQjdJSFpoY2lCclpYbHpJRDBnVDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVRtRnRaWE1vWkdWbVlYVnNkSE1wT3lCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHdGxlWE11YkdWdVozUm9PeUJwS3lzcElIc2dkbUZ5SUd0bGVTQTlJR3RsZVhOYmFWMDdJSFpoY2lCMllXeDFaU0E5SUU5aWFtVmpkQzVuWlhSUGQyNVFjbTl3WlhKMGVVUmxjMk55YVhCMGIzSW9aR1ZtWVhWc2RITXNJR3RsZVNrN0lHbG1JQ2gyWVd4MVpTQW1KaUIyWVd4MVpTNWpiMjVtYVdkMWNtRmliR1VnSmlZZ2IySnFXMnRsZVYwZ1BUMDlJSFZ1WkdWbWFXNWxaQ2tnZXlCUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29iMkpxTENCclpYa3NJSFpoYkhWbEtUc2dmU0I5SUhKbGRIVnliaUJ2WW1vN0lIMWNibHh1Wm5WdVkzUnBiMjRnWDJOc1lYTnpRMkZzYkVOb1pXTnJLR2x1YzNSaGJtTmxMQ0JEYjI1emRISjFZM1J2Y2lrZ2V5QnBaaUFvSVNocGJuTjBZVzVqWlNCcGJuTjBZVzVqWlc5bUlFTnZibk4wY25WamRHOXlLU2tnZXlCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtGd2lRMkZ1Ym05MElHTmhiR3dnWVNCamJHRnpjeUJoY3lCaElHWjFibU4wYVc5dVhDSXBPeUI5SUgxY2JseHVablZ1WTNScGIyNGdYM0J2YzNOcFlteGxRMjl1YzNSeWRXTjBiM0pTWlhSMWNtNG9jMlZzWml3Z1kyRnNiQ2tnZXlCcFppQW9JWE5sYkdZcElIc2dkR2h5YjNjZ2JtVjNJRkpsWm1WeVpXNWpaVVZ5Y205eUtGd2lkR2hwY3lCb1lYTnVKM1FnWW1WbGJpQnBibWwwYVdGc2FYTmxaQ0F0SUhOMWNHVnlLQ2tnYUdGemJpZDBJR0psWlc0Z1kyRnNiR1ZrWENJcE95QjlJSEpsZEhWeWJpQmpZV3hzSUNZbUlDaDBlWEJsYjJZZ1kyRnNiQ0E5UFQwZ1hDSnZZbXBsWTNSY0lpQjhmQ0IwZVhCbGIyWWdZMkZzYkNBOVBUMGdYQ0ptZFc1amRHbHZibHdpS1NBL0lHTmhiR3dnT2lCelpXeG1PeUI5WEc1Y2JtWjFibU4wYVc5dUlGOXBibWhsY21sMGN5aHpkV0pEYkdGemN5d2djM1Z3WlhKRGJHRnpjeWtnZXlCcFppQW9kSGx3Wlc5bUlITjFjR1Z5UTJ4aGMzTWdJVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpQW1KaUJ6ZFhCbGNrTnNZWE56SUNFOVBTQnVkV3hzS1NCN0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9YQ0pUZFhCbGNpQmxlSEJ5WlhOemFXOXVJRzExYzNRZ1pXbDBhR1Z5SUdKbElHNTFiR3dnYjNJZ1lTQm1kVzVqZEdsdmJpd2dibTkwSUZ3aUlDc2dkSGx3Wlc5bUlITjFjR1Z5UTJ4aGMzTXBPeUI5SUhOMVlrTnNZWE56TG5CeWIzUnZkSGx3WlNBOUlFOWlhbVZqZEM1amNtVmhkR1VvYzNWd1pYSkRiR0Z6Y3lBbUppQnpkWEJsY2tOc1lYTnpMbkJ5YjNSdmRIbHdaU3dnZXlCamIyNXpkSEoxWTNSdmNqb2dleUIyWVd4MVpUb2djM1ZpUTJ4aGMzTXNJR1Z1ZFcxbGNtRmliR1U2SUdaaGJITmxMQ0IzY21sMFlXSnNaVG9nZEhKMVpTd2dZMjl1Wm1sbmRYSmhZbXhsT2lCMGNuVmxJSDBnZlNrN0lHbG1JQ2h6ZFhCbGNrTnNZWE56S1NCUFltcGxZM1F1YzJWMFVISnZkRzkwZVhCbFQyWWdQeUJQWW1wbFkzUXVjMlYwVUhKdmRHOTBlWEJsVDJZb2MzVmlRMnhoYzNNc0lITjFjR1Z5UTJ4aGMzTXBJRG9nWDJSbFptRjFiSFJ6S0hOMVlrTnNZWE56TENCemRYQmxja05zWVhOektUc2dmVnh1WEc1bWRXNWpkR2x2YmlCeVpXMXZkbVVvWVhKeUxDQjNhR0YwS1NCN1hHNGdJSFpoY2lCbWIzVnVaQ0E5SUdGeWNpNXBibVJsZUU5bUtIZG9ZWFFwTzF4dVhHNGdJSGRvYVd4bElDaG1iM1Z1WkNBaFBUMGdMVEVwSUh0Y2JpQWdJQ0JoY25JdWMzQnNhV05sS0dadmRXNWtMQ0F4S1R0Y2JpQWdJQ0JtYjNWdVpDQTlJR0Z5Y2k1cGJtUmxlRTltS0hkb1lYUXBPMXh1SUNCOVhHNTlYRzVjYm5aaGNpQkRiMjV1WldOMGIzSWdQU0JtZFc1amRHbHZiaUFvWDBWMlpXNTBSVzFwZEhSbGNpa2dlMXh1SUNCZmFXNW9aWEpwZEhNb1EyOXVibVZqZEc5eUxDQmZSWFpsYm5SRmJXbDBkR1Z5S1R0Y2JseHVJQ0JtZFc1amRHbHZiaUJEYjI1dVpXTjBiM0lvWW1GamEyVnVaQ3dnYzNSdmNtVXNJSE5sY25acFkyVnpLU0I3WEc0Z0lDQWdkbUZ5SUc5d2RHbHZibk1nUFNCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUQ0Z015QW1KaUJoY21kMWJXVnVkSE5iTTEwZ0lUMDlJSFZ1WkdWbWFXNWxaQ0EvSUdGeVozVnRaVzUwYzFzelhTQTZJSHQ5TzF4dVhHNGdJQ0FnWDJOc1lYTnpRMkZzYkVOb1pXTnJLSFJvYVhNc0lFTnZibTVsWTNSdmNpazdYRzVjYmlBZ0lDQjJZWElnWDNSb2FYTWdQU0JmY0c5emMybGliR1ZEYjI1emRISjFZM1J2Y2xKbGRIVnliaWgwYUdsekxDQmZSWFpsYm5SRmJXbDBkR1Z5TG1OaGJHd29kR2hwY3lrcE8xeHVYRzRnSUNBZ1gzUm9hWE11WW1GamEyVnVaQ0E5SUdKaFkydGxibVE3WEc0Z0lDQWdYM1JvYVhNdWMzUnZjbVVnUFNCemRHOXlaVHRjYmlBZ0lDQmZkR2hwY3k1c1lXNW5kV0ZuWlZWMGFXeHpJRDBnYzJWeWRtbGpaWE11YkdGdVozVmhaMlZWZEdsc2N6dGNiaUFnSUNCZmRHaHBjeTV2Y0hScGIyNXpJRDBnYjNCMGFXOXVjenRjYmlBZ0lDQmZkR2hwY3k1c2IyZG5aWElnUFNCZmJHOW5aMlZ5TWk1a1pXWmhkV3gwTG1OeVpXRjBaU2duWW1GamEyVnVaRU52Ym01bFkzUnZjaWNwTzF4dVhHNGdJQ0FnWDNSb2FYTXVjM1JoZEdVZ1BTQjdmVHRjYmlBZ0lDQmZkR2hwY3k1eGRXVjFaU0E5SUZ0ZE8xeHVYRzRnSUNBZ2FXWWdLRjkwYUdsekxtSmhZMnRsYm1RZ0ppWWdYM1JvYVhNdVltRmphMlZ1WkM1cGJtbDBLU0I3WEc0Z0lDQWdJQ0JmZEdocGN5NWlZV05yWlc1a0xtbHVhWFFvYzJWeWRtbGpaWE1zSUc5d2RHbHZibk11WW1GamEyVnVaQ3dnYjNCMGFXOXVjeWs3WEc0Z0lDQWdmVnh1SUNBZ0lISmxkSFZ5YmlCZmRHaHBjenRjYmlBZ2ZWeHVYRzRnSUVOdmJtNWxZM1J2Y2k1d2NtOTBiM1I1Y0dVdWNYVmxkV1ZNYjJGa0lEMGdablZ1WTNScGIyNGdjWFZsZFdWTWIyRmtLR3hoYm1kMVlXZGxjeXdnYm1GdFpYTndZV05sY3l3Z1kyRnNiR0poWTJzcElIdGNiaUFnSUNCMllYSWdYM1JvYVhNeUlEMGdkR2hwY3p0Y2JseHVJQ0FnSUM4dklHWnBibVFnZDJoaGRDQnVaV1ZrY3lCMGJ5QmlaU0JzYjJGa1pXUmNiaUFnSUNCMllYSWdkRzlNYjJGa0lEMGdXMTA3WEc0Z0lDQWdkbUZ5SUhCbGJtUnBibWNnUFNCYlhUdGNiaUFnSUNCMllYSWdkRzlNYjJGa1RHRnVaM1ZoWjJWeklEMGdXMTA3WEc0Z0lDQWdkbUZ5SUhSdlRHOWhaRTVoYldWemNHRmpaWE1nUFNCYlhUdGNibHh1SUNBZ0lHeGhibWQxWVdkbGN5NW1iM0pGWVdOb0tHWjFibU4wYVc5dUlDaHNibWNwSUh0Y2JpQWdJQ0FnSUhaaGNpQm9ZWE5CYkd4T1lXMWxjM0JoWTJWeklEMGdkSEoxWlR0Y2JseHVJQ0FnSUNBZ2JtRnRaWE53WVdObGN5NW1iM0pGWVdOb0tHWjFibU4wYVc5dUlDaHVjeWtnZTF4dUlDQWdJQ0FnSUNCMllYSWdibUZ0WlNBOUlHeHVaeUFySUNkOEp5QXJJRzV6TzF4dVhHNGdJQ0FnSUNBZ0lHbG1JQ2hmZEdocGN6SXVjM1J2Y21VdWFHRnpVbVZ6YjNWeVkyVkNkVzVrYkdVb2JHNW5MQ0J1Y3lrcElIdGNiaUFnSUNBZ0lDQWdJQ0JmZEdocGN6SXVjM1JoZEdWYmJtRnRaVjBnUFNBeU95QXZMeUJzYjJGa1pXUmNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2hmZEdocGN6SXVjM1JoZEdWYmJtRnRaVjBnUENBd0tTQjdYRzRnSUNBZ0lDQWdJQ0FnTHk4Z2JtOTBhR2x1WnlCMGJ5QmtieUJtYjNJZ1pYSnlYRzRnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvWDNSb2FYTXlMbk4wWVhSbFcyNWhiV1ZkSUQwOVBTQXhLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLSEJsYm1ScGJtY3VhVzVrWlhoUFppaHVZVzFsS1NBOElEQXBJSEJsYm1ScGJtY3VjSFZ6YUNodVlXMWxLVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNCZmRHaHBjekl1YzNSaGRHVmJibUZ0WlYwZ1BTQXhPeUF2THlCd1pXNWthVzVuWEc1Y2JpQWdJQ0FnSUNBZ0lDQm9ZWE5CYkd4T1lXMWxjM0JoWTJWeklEMGdabUZzYzJVN1hHNWNiaUFnSUNBZ0lDQWdJQ0JwWmlBb2NHVnVaR2x1Wnk1cGJtUmxlRTltS0c1aGJXVXBJRHdnTUNrZ2NHVnVaR2x1Wnk1d2RYTm9LRzVoYldVcE8xeHVJQ0FnSUNBZ0lDQWdJR2xtSUNoMGIweHZZV1F1YVc1a1pYaFBaaWh1WVcxbEtTQThJREFwSUhSdlRHOWhaQzV3ZFhOb0tHNWhiV1VwTzF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2gwYjB4dllXUk9ZVzFsYzNCaFkyVnpMbWx1WkdWNFQyWW9ibk1wSUR3Z01Da2dkRzlNYjJGa1RtRnRaWE53WVdObGN5NXdkWE5vS0c1ektUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmU2s3WEc1Y2JpQWdJQ0FnSUdsbUlDZ2hhR0Z6UVd4c1RtRnRaWE53WVdObGN5a2dkRzlNYjJGa1RHRnVaM1ZoWjJWekxuQjFjMmdvYkc1bktUdGNiaUFnSUNCOUtUdGNibHh1SUNBZ0lHbG1JQ2gwYjB4dllXUXViR1Z1WjNSb0lIeDhJSEJsYm1ScGJtY3ViR1Z1WjNSb0tTQjdYRzRnSUNBZ0lDQjBhR2x6TG5GMVpYVmxMbkIxYzJnb2UxeHVJQ0FnSUNBZ0lDQndaVzVrYVc1bk9pQndaVzVrYVc1bkxGeHVJQ0FnSUNBZ0lDQnNiMkZrWldRNklIdDlMRnh1SUNBZ0lDQWdJQ0JsY25KdmNuTTZJRnRkTEZ4dUlDQWdJQ0FnSUNCallXeHNZbUZqYXpvZ1kyRnNiR0poWTJ0Y2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0IwYjB4dllXUTZJSFJ2VEc5aFpDeGNiaUFnSUNBZ0lIQmxibVJwYm1jNklIQmxibVJwYm1jc1hHNGdJQ0FnSUNCMGIweHZZV1JNWVc1bmRXRm5aWE02SUhSdlRHOWhaRXhoYm1kMVlXZGxjeXhjYmlBZ0lDQWdJSFJ2VEc5aFpFNWhiV1Z6Y0dGalpYTTZJSFJ2VEc5aFpFNWhiV1Z6Y0dGalpYTmNiaUFnSUNCOU8xeHVJQ0I5TzF4dVhHNGdJRU52Ym01bFkzUnZjaTV3Y205MGIzUjVjR1V1Ykc5aFpHVmtJRDBnWm5WdVkzUnBiMjRnYkc5aFpHVmtLRzVoYldVc0lHVnljaXdnWkdGMFlTa2dlMXh1SUNBZ0lIWmhjaUJmZEdocGN6TWdQU0IwYUdsek8xeHVYRzRnSUNBZ2RtRnlJRjl1WVcxbEpITndiR2wwSUQwZ2JtRnRaUzV6Y0d4cGRDZ25mQ2NwTEZ4dUlDQWdJQ0FnSUNCZmJtRnRaU1J6Y0d4cGRESWdQU0JmYzJ4cFkyVmtWRzlCY25KaGVTaGZibUZ0WlNSemNHeHBkQ3dnTWlrc1hHNGdJQ0FnSUNBZ0lHeHVaeUE5SUY5dVlXMWxKSE53YkdsME1sc3dYU3hjYmlBZ0lDQWdJQ0FnYm5NZ1BTQmZibUZ0WlNSemNHeHBkREpiTVYwN1hHNWNiaUFnSUNCcFppQW9aWEp5S1NCMGFHbHpMbVZ0YVhRb0oyWmhhV3hsWkV4dllXUnBibWNuTENCc2JtY3NJRzV6TENCbGNuSXBPMXh1WEc0Z0lDQWdhV1lnS0dSaGRHRXBJSHRjYmlBZ0lDQWdJSFJvYVhNdWMzUnZjbVV1WVdSa1VtVnpiM1Z5WTJWQ2RXNWtiR1VvYkc1bkxDQnVjeXdnWkdGMFlTazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdjMlYwSUd4dllXUmxaRnh1SUNBZ0lIUm9hWE11YzNSaGRHVmJibUZ0WlYwZ1BTQmxjbklnUHlBdE1TQTZJREk3WEc1Y2JpQWdJQ0F2THlCallXeHNZbUZqYXlCcFppQnlaV0ZrZVZ4dUlDQWdJSFJvYVhNdWNYVmxkV1V1Wm05eVJXRmphQ2htZFc1amRHbHZiaUFvY1NrZ2UxeHVJQ0FnSUNBZ2RYUnBiSE11Y0hWemFGQmhkR2dvY1M1c2IyRmtaV1FzSUZ0c2JtZGRMQ0J1Y3lrN1hHNGdJQ0FnSUNCeVpXMXZkbVVvY1M1d1pXNWthVzVuTENCdVlXMWxLVHRjYmx4dUlDQWdJQ0FnYVdZZ0tHVnljaWtnY1M1bGNuSnZjbk11Y0hWemFDaGxjbklwTzF4dVhHNGdJQ0FnSUNCcFppQW9jUzV3Wlc1a2FXNW5MbXhsYm1kMGFDQTlQVDBnTUNBbUppQWhjUzVrYjI1bEtTQjdYRzRnSUNBZ0lDQWdJRjkwYUdsek15NWxiV2wwS0Nkc2IyRmtaV1FuTENCeExteHZZV1JsWkNrN1hHNGdJQ0FnSUNBZ0lDOHFJR1Z6YkdsdWRDQnVieTF3WVhKaGJTMXlaV0Z6YzJsbmJqb2dNQ0FxTDF4dUlDQWdJQ0FnSUNCeExtUnZibVVnUFNCMGNuVmxPMXh1SUNBZ0lDQWdJQ0JwWmlBb2NTNWxjbkp2Y25NdWJHVnVaM1JvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdjUzVqWVd4c1ltRmpheWh4TG1WeWNtOXljeWs3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ2NTNWpZV3hzWW1GamF5Z3BPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU2s3WEc1Y2JpQWdJQ0F2THlCeVpXMXZkbVVnWkc5dVpTQnNiMkZrSUhKbGNYVmxjM1J6WEc0Z0lDQWdkR2hwY3k1eGRXVjFaU0E5SUhSb2FYTXVjWFZsZFdVdVptbHNkR1Z5S0daMWJtTjBhVzl1SUNoeEtTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z0lYRXVaRzl1WlR0Y2JpQWdJQ0I5S1R0Y2JpQWdmVHRjYmx4dUlDQkRiMjV1WldOMGIzSXVjSEp2ZEc5MGVYQmxMbkpsWVdRZ1BTQm1kVzVqZEdsdmJpQnlaV0ZrS0d4dVp5d2dibk1zSUdaalRtRnRaU2tnZTF4dUlDQWdJSFpoY2lCMGNtbGxaQ0E5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBeklDWW1JR0Z5WjNWdFpXNTBjMXN6WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pOZElEb2dNRHRjYmx4dUlDQWdJSFpoY2lCZmRHaHBjelFnUFNCMGFHbHpPMXh1WEc0Z0lDQWdkbUZ5SUhkaGFYUWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTkNBbUppQmhjbWQxYldWdWRITmJORjBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXMwWFNBNklESTFNRHRjYmlBZ0lDQjJZWElnWTJGc2JHSmhZMnNnUFNCaGNtZDFiV1Z1ZEhOYk5WMDdYRzVjYmlBZ0lDQnBaaUFvSVd4dVp5NXNaVzVuZEdncElISmxkSFZ5YmlCallXeHNZbUZqYXlodWRXeHNMQ0I3ZlNrN0lDOHZJRzV2ZEdsdVp5QjBieUJzYjJGa1hHNWNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NWlZV05yWlc1a1cyWmpUbUZ0WlYwb2JHNW5MQ0J1Y3l3Z1puVnVZM1JwYjI0Z0tHVnljaXdnWkdGMFlTa2dlMXh1SUNBZ0lDQWdhV1lnS0dWeWNpQW1KaUJrWVhSaElDOHFJRDBnY21WMGNubEdiR0ZuSUNvdklDWW1JSFJ5YVdWa0lEd2dOU2tnZTF4dUlDQWdJQ0FnSUNCelpYUlVhVzFsYjNWMEtHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNCZmRHaHBjelF1Y21WaFpDNWpZV3hzS0Y5MGFHbHpOQ3dnYkc1bkxDQnVjeXdnWm1OT1lXMWxMQ0IwY21sbFpDQXJJREVzSUhkaGFYUWdLaUF5TENCallXeHNZbUZqYXlrN1hHNGdJQ0FnSUNBZ0lIMHNJSGRoYVhRcE8xeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCallXeHNZbUZqYXlobGNuSXNJR1JoZEdFcE8xeHVJQ0FnSUgwcE8xeHVJQ0I5TzF4dVhHNGdJQzhxSUdWemJHbHVkQ0JqYjI1emFYTjBaVzUwTFhKbGRIVnliam9nTUNBcUwxeHVYRzVjYmlBZ1EyOXVibVZqZEc5eUxuQnliM1J2ZEhsd1pTNXNiMkZrSUQwZ1puVnVZM1JwYjI0Z2JHOWhaQ2hzWVc1bmRXRm5aWE1zSUc1aGJXVnpjR0ZqWlhNc0lHTmhiR3hpWVdOcktTQjdYRzRnSUNBZ2RtRnlJRjkwYUdsek5TQTlJSFJvYVhNN1hHNWNiaUFnSUNCcFppQW9JWFJvYVhNdVltRmphMlZ1WkNrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTVzYjJkblpYSXVkMkZ5YmlnblRtOGdZbUZqYTJWdVpDQjNZWE1nWVdSa1pXUWdkbWxoSUdreE9HNWxlSFF1ZFhObExpQlhhV3hzSUc1dmRDQnNiMkZrSUhKbGMyOTFjbU5sY3k0bktUdGNiaUFnSUNBZ0lISmxkSFZ5YmlCallXeHNZbUZqYXlBbUppQmpZV3hzWW1GamF5Z3BPMXh1SUNBZ0lIMWNiaUFnSUNCMllYSWdiM0IwYVc5dWN5QTlJRjlsZUhSbGJtUnpLSHQ5TENCMGFHbHpMbUpoWTJ0bGJtUXViM0IwYVc5dWN5d2dkR2hwY3k1dmNIUnBiMjV6TG1KaFkydGxibVFwTzF4dVhHNGdJQ0FnYVdZZ0tIUjVjR1Z2WmlCc1lXNW5kV0ZuWlhNZ1BUMDlJQ2R6ZEhKcGJtY25LU0JzWVc1bmRXRm5aWE1nUFNCMGFHbHpMbXhoYm1kMVlXZGxWWFJwYkhNdWRHOVNaWE52YkhabFNHbGxjbUZ5WTJoNUtHeGhibWQxWVdkbGN5azdYRzRnSUNBZ2FXWWdLSFI1Y0dWdlppQnVZVzFsYzNCaFkyVnpJRDA5UFNBbmMzUnlhVzVuSnlrZ2JtRnRaWE53WVdObGN5QTlJRnR1WVcxbGMzQmhZMlZ6WFR0Y2JseHVJQ0FnSUhaaGNpQjBiMHh2WVdRZ1BTQjBhR2x6TG5GMVpYVmxURzloWkNoc1lXNW5kV0ZuWlhNc0lHNWhiV1Z6Y0dGalpYTXNJR05oYkd4aVlXTnJLVHRjYmlBZ0lDQnBaaUFvSVhSdlRHOWhaQzUwYjB4dllXUXViR1Z1WjNSb0tTQjdYRzRnSUNBZ0lDQnBaaUFvSVhSdlRHOWhaQzV3Wlc1a2FXNW5MbXhsYm1kMGFDa2dZMkZzYkdKaFkyc29LVHNnTHk4Z2JtOTBhR2x1WnlCMGJ5QnNiMkZrSUdGdVpDQnVieUJ3Wlc1a2FXNW5jeTR1TG1OaGJHeGlZV05ySUc1dmQxeHVJQ0FnSUNBZ2NtVjBkWEp1SUc1MWJHdzdJQzh2SUhCbGJtUnBibWR6SUhkcGJHd2dkSEpwWjJkbGNpQmpZV3hzWW1GamExeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklHeHZZV1FnZDJsMGFDQnRkV3gwYVMxc2IyRmtYRzRnSUNBZ2FXWWdLRzl3ZEdsdmJuTXVZV3hzYjNkTmRXeDBhVXh2WVdScGJtY2dKaVlnZEdocGN5NWlZV05yWlc1a0xuSmxZV1JOZFd4MGFTa2dlMXh1SUNBZ0lDQWdkR2hwY3k1eVpXRmtLSFJ2VEc5aFpDNTBiMHh2WVdSTVlXNW5kV0ZuWlhNc0lIUnZURzloWkM1MGIweHZZV1JPWVcxbGMzQmhZMlZ6TENBbmNtVmhaRTExYkhScEp5d2diblZzYkN3Z2JuVnNiQ3dnWm5WdVkzUnBiMjRnS0dWeWNpd2daR0YwWVNrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvWlhKeUtTQmZkR2hwY3pVdWJHOW5aMlZ5TG5kaGNtNG9KMnh2WVdScGJtY2dibUZ0WlhOd1lXTmxjeUFuSUNzZ2RHOU1iMkZrTG5SdlRHOWhaRTVoYldWemNHRmpaWE11YW05cGJpZ25MQ0FuS1NBcklDY2dabTl5SUd4aGJtZDFZV2RsY3lBbklDc2dkRzlNYjJGa0xuUnZURzloWkV4aGJtZDFZV2RsY3k1cWIybHVLQ2NzSUNjcElDc2dKeUIyYVdFZ2JYVnNkR2xzYjJGa2FXNW5JR1poYVd4bFpDY3NJR1Z5Y2lrN1hHNGdJQ0FnSUNBZ0lHbG1JQ2doWlhKeUlDWW1JR1JoZEdFcElGOTBhR2x6TlM1c2IyZG5aWEl1Ykc5bktDZHpkV05qWlhOelpuVnNiSGtnYkc5aFpHVmtJRzVoYldWemNHRmpaWE1nSnlBcklIUnZURzloWkM1MGIweHZZV1JPWVcxbGMzQmhZMlZ6TG1wdmFXNG9KeXdnSnlrZ0t5QW5JR1p2Y2lCc1lXNW5kV0ZuWlhNZ0p5QXJJSFJ2VEc5aFpDNTBiMHh2WVdSTVlXNW5kV0ZuWlhNdWFtOXBiaWduTENBbktTQXJJQ2NnZG1saElHMTFiSFJwYkc5aFpHbHVaeWNzSUdSaGRHRXBPMXh1WEc0Z0lDQWdJQ0FnSUhSdlRHOWhaQzUwYjB4dllXUXVabTl5UldGamFDaG1kVzVqZEdsdmJpQW9ibUZ0WlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFpoY2lCZmJtRnRaU1J6Y0d4cGRETWdQU0J1WVcxbExuTndiR2wwS0NkOEp5a3NYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lGOXVZVzFsSkhOd2JHbDBOQ0E5SUY5emJHbGpaV1JVYjBGeWNtRjVLRjl1WVcxbEpITndiR2wwTXl3Z01pa3NYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHd2dQU0JmYm1GdFpTUnpjR3hwZERSYk1GMHNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHNGdQU0JmYm1GdFpTUnpjR3hwZERSYk1WMDdYRzVjYmlBZ0lDQWdJQ0FnSUNCMllYSWdZblZ1Wkd4bElEMGdkWFJwYkhNdVoyVjBVR0YwYUNoa1lYUmhMQ0JiYkN3Z2JsMHBPMXh1SUNBZ0lDQWdJQ0FnSUdsbUlDaGlkVzVrYkdVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUY5MGFHbHpOUzVzYjJGa1pXUW9ibUZ0WlN3Z1pYSnlMQ0JpZFc1a2JHVXBPMXh1SUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnWlhKeWIzSWdQU0FuYkc5aFpHbHVaeUJ1WVcxbGMzQmhZMlVnSnlBcklHNGdLeUFuSUdadmNpQnNZVzVuZFdGblpTQW5JQ3NnYkNBcklDY2dkbWxoSUcxMWJIUnBiRzloWkdsdVp5Qm1ZV2xzWldRbk8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWDNSb2FYTTFMbXh2WVdSbFpDaHVZVzFsTENCbGNuSnZjaWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmZkR2hwY3pVdWJHOW5aMlZ5TG1WeWNtOXlLR1Z5Y205eUtUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhSdlRHOWhaQzUwYjB4dllXUXVabTl5UldGamFDaG1kVzVqZEdsdmJpQW9ibUZ0WlNrZ2UxeHVJQ0FnSUNBZ0lDQmZkR2hwY3pVdWJHOWhaRTl1WlNodVlXMWxLVHRjYmlBZ0lDQWdJSDBwTzF4dUlDQWdJSDFjYmlBZ2ZUdGNibHh1SUNCRGIyNXVaV04wYjNJdWNISnZkRzkwZVhCbExuSmxiRzloWkNBOUlHWjFibU4wYVc5dUlISmxiRzloWkNoc1lXNW5kV0ZuWlhNc0lHNWhiV1Z6Y0dGalpYTXBJSHRjYmlBZ0lDQjJZWElnWDNSb2FYTTJJRDBnZEdocGN6dGNibHh1SUNBZ0lHbG1JQ2doZEdocGN5NWlZV05yWlc1a0tTQjdYRzRnSUNBZ0lDQjBhR2x6TG14dloyZGxjaTUzWVhKdUtDZE9ieUJpWVdOclpXNWtJSGRoY3lCaFpHUmxaQ0IyYVdFZ2FURTRibVY0ZEM1MWMyVXVJRmRwYkd3Z2JtOTBJR3h2WVdRZ2NtVnpiM1Z5WTJWekxpY3BPMXh1SUNBZ0lIMWNiaUFnSUNCMllYSWdiM0IwYVc5dWN5QTlJRjlsZUhSbGJtUnpLSHQ5TENCMGFHbHpMbUpoWTJ0bGJtUXViM0IwYVc5dWN5d2dkR2hwY3k1dmNIUnBiMjV6TG1KaFkydGxibVFwTzF4dVhHNGdJQ0FnYVdZZ0tIUjVjR1Z2WmlCc1lXNW5kV0ZuWlhNZ1BUMDlJQ2R6ZEhKcGJtY25LU0JzWVc1bmRXRm5aWE1nUFNCMGFHbHpMbXhoYm1kMVlXZGxWWFJwYkhNdWRHOVNaWE52YkhabFNHbGxjbUZ5WTJoNUtHeGhibWQxWVdkbGN5azdYRzRnSUNBZ2FXWWdLSFI1Y0dWdlppQnVZVzFsYzNCaFkyVnpJRDA5UFNBbmMzUnlhVzVuSnlrZ2JtRnRaWE53WVdObGN5QTlJRnR1WVcxbGMzQmhZMlZ6WFR0Y2JseHVJQ0FnSUM4dklHeHZZV1FnZDJsMGFDQnRkV3gwYVMxc2IyRmtYRzRnSUNBZ2FXWWdLRzl3ZEdsdmJuTXVZV3hzYjNkTmRXeDBhVXh2WVdScGJtY2dKaVlnZEdocGN5NWlZV05yWlc1a0xuSmxZV1JOZFd4MGFTa2dlMXh1SUNBZ0lDQWdkR2hwY3k1eVpXRmtLR3hoYm1kMVlXZGxjeXdnYm1GdFpYTndZV05sY3l3Z0ozSmxZV1JOZFd4MGFTY3NJRzUxYkd3c0lHNTFiR3dzSUdaMWJtTjBhVzl1SUNobGNuSXNJR1JoZEdFcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0dWeWNpa2dYM1JvYVhNMkxteHZaMmRsY2k1M1lYSnVLQ2R5Wld4dllXUnBibWNnYm1GdFpYTndZV05sY3lBbklDc2dibUZ0WlhOd1lXTmxjeTVxYjJsdUtDY3NJQ2NwSUNzZ0p5Qm1iM0lnYkdGdVozVmhaMlZ6SUNjZ0t5QnNZVzVuZFdGblpYTXVhbTlwYmlnbkxDQW5LU0FySUNjZ2RtbGhJRzExYkhScGJHOWhaR2x1WnlCbVlXbHNaV1FuTENCbGNuSXBPMXh1SUNBZ0lDQWdJQ0JwWmlBb0lXVnljaUFtSmlCa1lYUmhLU0JmZEdocGN6WXViRzluWjJWeUxteHZaeWduYzNWalkyVnpjMloxYkd4NUlISmxiRzloWkdWa0lHNWhiV1Z6Y0dGalpYTWdKeUFySUc1aGJXVnpjR0ZqWlhNdWFtOXBiaWduTENBbktTQXJJQ2NnWm05eUlHeGhibWQxWVdkbGN5QW5JQ3NnYkdGdVozVmhaMlZ6TG1wdmFXNG9KeXdnSnlrZ0t5QW5JSFpwWVNCdGRXeDBhV3h2WVdScGJtY25MQ0JrWVhSaEtUdGNibHh1SUNBZ0lDQWdJQ0JzWVc1bmRXRm5aWE11Wm05eVJXRmphQ2htZFc1amRHbHZiaUFvYkNrZ2UxeHVJQ0FnSUNBZ0lDQWdJRzVoYldWemNHRmpaWE11Wm05eVJXRmphQ2htZFc1amRHbHZiaUFvYmlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHSjFibVJzWlNBOUlIVjBhV3h6TG1kbGRGQmhkR2dvWkdGMFlTd2dXMndzSUc1ZEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGlkVzVrYkdVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1gzUm9hWE0yTG14dllXUmxaQ2hzSUNzZ0ozd25JQ3NnYml3Z1pYSnlMQ0JpZFc1a2JHVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHVnljbTl5SUQwZ0ozSmxiRzloWkdsdVp5QnVZVzFsYzNCaFkyVWdKeUFySUc0Z0t5QW5JR1p2Y2lCc1lXNW5kV0ZuWlNBbklDc2diQ0FySUNjZ2RtbGhJRzExYkhScGJHOWhaR2x1WnlCbVlXbHNaV1FuTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JmZEdocGN6WXViRzloWkdWa0tHd2dLeUFuZkNjZ0t5QnVMQ0JsY25KdmNpazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lGOTBhR2x6Tmk1c2IyZG5aWEl1WlhKeWIzSW9aWEp5YjNJcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0JzWVc1bmRXRm5aWE11Wm05eVJXRmphQ2htZFc1amRHbHZiaUFvYkNrZ2UxeHVJQ0FnSUNBZ0lDQnVZVzFsYzNCaFkyVnpMbVp2Y2tWaFkyZ29ablZ1WTNScGIyNGdLRzRwSUh0Y2JpQWdJQ0FnSUNBZ0lDQmZkR2hwY3pZdWJHOWhaRTl1WlNoc0lDc2dKM3duSUNzZ2Jpd2dKM0psSnlrN1hHNGdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdmU2s3WEc0Z0lDQWdmVnh1SUNCOU8xeHVYRzRnSUVOdmJtNWxZM1J2Y2k1d2NtOTBiM1I1Y0dVdWJHOWhaRTl1WlNBOUlHWjFibU4wYVc5dUlHeHZZV1JQYm1Vb2JtRnRaU2tnZTF4dUlDQWdJSFpoY2lCZmRHaHBjemNnUFNCMGFHbHpPMXh1WEc0Z0lDQWdkbUZ5SUhCeVpXWnBlQ0E5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBeElDWW1JR0Z5WjNWdFpXNTBjMXN4WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pGZElEb2dKeWM3WEc1Y2JpQWdJQ0IyWVhJZ1gyNWhiV1VrYzNCc2FYUTFJRDBnYm1GdFpTNXpjR3hwZENnbmZDY3BMRnh1SUNBZ0lDQWdJQ0JmYm1GdFpTUnpjR3hwZERZZ1BTQmZjMnhwWTJWa1ZHOUJjbkpoZVNoZmJtRnRaU1J6Y0d4cGREVXNJRElwTEZ4dUlDQWdJQ0FnSUNCc2JtY2dQU0JmYm1GdFpTUnpjR3hwZERaYk1GMHNYRzRnSUNBZ0lDQWdJRzV6SUQwZ1gyNWhiV1VrYzNCc2FYUTJXekZkTzF4dVhHNGdJQ0FnZEdocGN5NXlaV0ZrS0d4dVp5d2dibk1zSUNkeVpXRmtKeXdnYm5Wc2JDd2diblZzYkN3Z1puVnVZM1JwYjI0Z0tHVnljaXdnWkdGMFlTa2dlMXh1SUNBZ0lDQWdhV1lnS0dWeWNpa2dYM1JvYVhNM0xteHZaMmRsY2k1M1lYSnVLSEJ5WldacGVDQXJJQ2RzYjJGa2FXNW5JRzVoYldWemNHRmpaU0FuSUNzZ2JuTWdLeUFuSUdadmNpQnNZVzVuZFdGblpTQW5JQ3NnYkc1bklDc2dKeUJtWVdsc1pXUW5MQ0JsY25JcE8xeHVJQ0FnSUNBZ2FXWWdLQ0ZsY25JZ0ppWWdaR0YwWVNrZ1gzUm9hWE0zTG14dloyZGxjaTVzYjJjb2NISmxabWw0SUNzZ0oyeHZZV1JsWkNCdVlXMWxjM0JoWTJVZ0p5QXJJRzV6SUNzZ0p5Qm1iM0lnYkdGdVozVmhaMlVnSnlBcklHeHVaeXdnWkdGMFlTazdYRzVjYmlBZ0lDQWdJRjkwYUdsek55NXNiMkZrWldRb2JtRnRaU3dnWlhKeUxDQmtZWFJoS1R0Y2JpQWdJQ0I5S1R0Y2JpQWdmVHRjYmx4dUlDQkRiMjV1WldOMGIzSXVjSEp2ZEc5MGVYQmxMbk5oZG1WTmFYTnphVzVuSUQwZ1puVnVZM1JwYjI0Z2MyRjJaVTFwYzNOcGJtY29iR0Z1WjNWaFoyVnpMQ0J1WVcxbGMzQmhZMlVzSUd0bGVTd2dabUZzYkdKaFkydFdZV3gxWlN3Z2FYTlZjR1JoZEdVcElIdGNiaUFnSUNCMllYSWdiM0IwYVc5dWN5QTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQaUExSUNZbUlHRnlaM1Z0Wlc1MGMxczFYU0FoUFQwZ2RXNWtaV1pwYm1Wa0lEOGdZWEpuZFcxbGJuUnpXelZkSURvZ2UzMDdYRzVjYmlBZ0lDQnBaaUFvZEdocGN5NWlZV05yWlc1a0lDWW1JSFJvYVhNdVltRmphMlZ1WkM1amNtVmhkR1VwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVZbUZqYTJWdVpDNWpjbVZoZEdVb2JHRnVaM1ZoWjJWekxDQnVZVzFsYzNCaFkyVXNJR3RsZVN3Z1ptRnNiR0poWTJ0V1lXeDFaU3dnYm5Wc2JDQXZLaUIxYm5WelpXUWdZMkZzYkdKaFkyc2dLaThzSUY5bGVIUmxibVJ6S0h0OUxDQnZjSFJwYjI1ekxDQjdJR2x6VlhCa1lYUmxPaUJwYzFWd1pHRjBaU0I5S1NrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z2QzSnBkR1VnZEc4Z2MzUnZjbVVnZEc4Z1lYWnZhV1FnY21WelpXNWthVzVuWEc0Z0lDQWdhV1lnS0NGc1lXNW5kV0ZuWlhNZ2ZId2dJV3hoYm1kMVlXZGxjMXN3WFNrZ2NtVjBkWEp1TzF4dUlDQWdJSFJvYVhNdWMzUnZjbVV1WVdSa1VtVnpiM1Z5WTJVb2JHRnVaM1ZoWjJWeld6QmRMQ0J1WVcxbGMzQmhZMlVzSUd0bGVTd2dabUZzYkdKaFkydFdZV3gxWlNrN1hHNGdJSDA3WEc1Y2JpQWdjbVYwZFhKdUlFTnZibTVsWTNSdmNqdGNibjBvWDBWMlpXNTBSVzFwZEhSbGNqTXVaR1ZtWVhWc2RDazdYRzVjYm1WNGNHOXlkSE11WkdWbVlYVnNkQ0E5SUVOdmJtNWxZM1J2Y2pzaUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JrOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JjSWw5ZlpYTk5iMlIxYkdWY0lpd2dlMXh1SUNCMllXeDFaVG9nZEhKMVpWeHVmU2s3WEc1Y2JuWmhjaUJmWlhoMFpXNWtjeUE5SUU5aWFtVmpkQzVoYzNOcFoyNGdmSHdnWm5WdVkzUnBiMjRnS0hSaGNtZGxkQ2tnZXlCbWIzSWdLSFpoY2lCcElEMGdNVHNnYVNBOElHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnN0lHa3JLeWtnZXlCMllYSWdjMjkxY21ObElEMGdZWEpuZFcxbGJuUnpXMmxkT3lCbWIzSWdLSFpoY2lCclpYa2dhVzRnYzI5MWNtTmxLU0I3SUdsbUlDaFBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29jMjkxY21ObExDQnJaWGtwS1NCN0lIUmhjbWRsZEZ0clpYbGRJRDBnYzI5MWNtTmxXMnRsZVYwN0lIMGdmU0I5SUhKbGRIVnliaUIwWVhKblpYUTdJSDA3WEc1Y2JuWmhjaUJmYkc5bloyVnlJRDBnY21WeGRXbHlaU2duTGk5c2IyZG5aWEl1YW5NbktUdGNibHh1ZG1GeUlGOXNiMmRuWlhJeUlEMGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENoZmJHOW5aMlZ5S1R0Y2JseHVkbUZ5SUY5RmRtVnVkRVZ0YVhSMFpYSXlJRDBnY21WeGRXbHlaU2duTGk5RmRtVnVkRVZ0YVhSMFpYSXVhbk1uS1R0Y2JseHVkbUZ5SUY5RmRtVnVkRVZ0YVhSMFpYSXpJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZSWFpsYm5SRmJXbDBkR1Z5TWlrN1hHNWNibVoxYm1OMGFXOXVJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb2IySnFLU0I3SUhKbGRIVnliaUJ2WW1vZ0ppWWdiMkpxTGw5ZlpYTk5iMlIxYkdVZ1B5QnZZbW9nT2lCN0lHUmxabUYxYkhRNklHOWlhaUI5T3lCOVhHNWNibVoxYm1OMGFXOXVJRjlrWldaaGRXeDBjeWh2WW1vc0lHUmxabUYxYkhSektTQjdJSFpoY2lCclpYbHpJRDBnVDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVRtRnRaWE1vWkdWbVlYVnNkSE1wT3lCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHdGxlWE11YkdWdVozUm9PeUJwS3lzcElIc2dkbUZ5SUd0bGVTQTlJR3RsZVhOYmFWMDdJSFpoY2lCMllXeDFaU0E5SUU5aWFtVmpkQzVuWlhSUGQyNVFjbTl3WlhKMGVVUmxjMk55YVhCMGIzSW9aR1ZtWVhWc2RITXNJR3RsZVNrN0lHbG1JQ2gyWVd4MVpTQW1KaUIyWVd4MVpTNWpiMjVtYVdkMWNtRmliR1VnSmlZZ2IySnFXMnRsZVYwZ1BUMDlJSFZ1WkdWbWFXNWxaQ2tnZXlCUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29iMkpxTENCclpYa3NJSFpoYkhWbEtUc2dmU0I5SUhKbGRIVnliaUJ2WW1vN0lIMWNibHh1Wm5WdVkzUnBiMjRnWDJOc1lYTnpRMkZzYkVOb1pXTnJLR2x1YzNSaGJtTmxMQ0JEYjI1emRISjFZM1J2Y2lrZ2V5QnBaaUFvSVNocGJuTjBZVzVqWlNCcGJuTjBZVzVqWlc5bUlFTnZibk4wY25WamRHOXlLU2tnZXlCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtGd2lRMkZ1Ym05MElHTmhiR3dnWVNCamJHRnpjeUJoY3lCaElHWjFibU4wYVc5dVhDSXBPeUI5SUgxY2JseHVablZ1WTNScGIyNGdYM0J2YzNOcFlteGxRMjl1YzNSeWRXTjBiM0pTWlhSMWNtNG9jMlZzWml3Z1kyRnNiQ2tnZXlCcFppQW9JWE5sYkdZcElIc2dkR2h5YjNjZ2JtVjNJRkpsWm1WeVpXNWpaVVZ5Y205eUtGd2lkR2hwY3lCb1lYTnVKM1FnWW1WbGJpQnBibWwwYVdGc2FYTmxaQ0F0SUhOMWNHVnlLQ2tnYUdGemJpZDBJR0psWlc0Z1kyRnNiR1ZrWENJcE95QjlJSEpsZEhWeWJpQmpZV3hzSUNZbUlDaDBlWEJsYjJZZ1kyRnNiQ0E5UFQwZ1hDSnZZbXBsWTNSY0lpQjhmQ0IwZVhCbGIyWWdZMkZzYkNBOVBUMGdYQ0ptZFc1amRHbHZibHdpS1NBL0lHTmhiR3dnT2lCelpXeG1PeUI5WEc1Y2JtWjFibU4wYVc5dUlGOXBibWhsY21sMGN5aHpkV0pEYkdGemN5d2djM1Z3WlhKRGJHRnpjeWtnZXlCcFppQW9kSGx3Wlc5bUlITjFjR1Z5UTJ4aGMzTWdJVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpQW1KaUJ6ZFhCbGNrTnNZWE56SUNFOVBTQnVkV3hzS1NCN0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9YQ0pUZFhCbGNpQmxlSEJ5WlhOemFXOXVJRzExYzNRZ1pXbDBhR1Z5SUdKbElHNTFiR3dnYjNJZ1lTQm1kVzVqZEdsdmJpd2dibTkwSUZ3aUlDc2dkSGx3Wlc5bUlITjFjR1Z5UTJ4aGMzTXBPeUI5SUhOMVlrTnNZWE56TG5CeWIzUnZkSGx3WlNBOUlFOWlhbVZqZEM1amNtVmhkR1VvYzNWd1pYSkRiR0Z6Y3lBbUppQnpkWEJsY2tOc1lYTnpMbkJ5YjNSdmRIbHdaU3dnZXlCamIyNXpkSEoxWTNSdmNqb2dleUIyWVd4MVpUb2djM1ZpUTJ4aGMzTXNJR1Z1ZFcxbGNtRmliR1U2SUdaaGJITmxMQ0IzY21sMFlXSnNaVG9nZEhKMVpTd2dZMjl1Wm1sbmRYSmhZbXhsT2lCMGNuVmxJSDBnZlNrN0lHbG1JQ2h6ZFhCbGNrTnNZWE56S1NCUFltcGxZM1F1YzJWMFVISnZkRzkwZVhCbFQyWWdQeUJQWW1wbFkzUXVjMlYwVUhKdmRHOTBlWEJsVDJZb2MzVmlRMnhoYzNNc0lITjFjR1Z5UTJ4aGMzTXBJRG9nWDJSbFptRjFiSFJ6S0hOMVlrTnNZWE56TENCemRYQmxja05zWVhOektUc2dmVnh1WEc1MllYSWdRMjl1Ym1WamRHOXlJRDBnWm5WdVkzUnBiMjRnS0Y5RmRtVnVkRVZ0YVhSMFpYSXBJSHRjYmlBZ1gybHVhR1Z5YVhSektFTnZibTVsWTNSdmNpd2dYMFYyWlc1MFJXMXBkSFJsY2lrN1hHNWNiaUFnWm5WdVkzUnBiMjRnUTI5dWJtVmpkRzl5S0dOaFkyaGxMQ0J6ZEc5eVpTd2djMlZ5ZG1salpYTXBJSHRjYmlBZ0lDQjJZWElnYjNCMGFXOXVjeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBeklDWW1JR0Z5WjNWdFpXNTBjMXN6WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pOZElEb2dlMzA3WEc1Y2JpQWdJQ0JmWTJ4aGMzTkRZV3hzUTJobFkyc29kR2hwY3l3Z1EyOXVibVZqZEc5eUtUdGNibHh1SUNBZ0lIWmhjaUJmZEdocGN5QTlJRjl3YjNOemFXSnNaVU52Ym5OMGNuVmpkRzl5VW1WMGRYSnVLSFJvYVhNc0lGOUZkbVZ1ZEVWdGFYUjBaWEl1WTJGc2JDaDBhR2x6S1NrN1hHNWNiaUFnSUNCZmRHaHBjeTVqWVdOb1pTQTlJR05oWTJobE8xeHVJQ0FnSUY5MGFHbHpMbk4wYjNKbElEMGdjM1J2Y21VN1hHNGdJQ0FnWDNSb2FYTXVjMlZ5ZG1salpYTWdQU0J6WlhKMmFXTmxjenRjYmlBZ0lDQmZkR2hwY3k1dmNIUnBiMjV6SUQwZ2IzQjBhVzl1Y3p0Y2JpQWdJQ0JmZEdocGN5NXNiMmRuWlhJZ1BTQmZiRzluWjJWeU1pNWtaV1poZFd4MExtTnlaV0YwWlNnblkyRmphR1ZEYjI1dVpXTjBiM0luS1R0Y2JseHVJQ0FnSUdsbUlDaGZkR2hwY3k1allXTm9aU0FtSmlCZmRHaHBjeTVqWVdOb1pTNXBibWwwS1NCZmRHaHBjeTVqWVdOb1pTNXBibWwwS0hObGNuWnBZMlZ6TENCdmNIUnBiMjV6TG1OaFkyaGxMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQnlaWFIxY200Z1gzUm9hWE03WEc0Z0lIMWNibHh1SUNBdktpQmxjMnhwYm5RZ1kyOXVjMmx6ZEdWdWRDMXlaWFIxY200NklEQWdLaTljYmx4dVhHNGdJRU52Ym01bFkzUnZjaTV3Y205MGIzUjVjR1V1Ykc5aFpDQTlJR1oxYm1OMGFXOXVJR3h2WVdRb2JHRnVaM1ZoWjJWekxDQnVZVzFsYzNCaFkyVnpMQ0JqWVd4c1ltRmpheWtnZTF4dUlDQWdJSFpoY2lCZmRHaHBjeklnUFNCMGFHbHpPMXh1WEc0Z0lDQWdhV1lnS0NGMGFHbHpMbU5oWTJobEtTQnlaWFIxY200Z1kyRnNiR0poWTJzZ0ppWWdZMkZzYkdKaFkyc29LVHRjYmlBZ0lDQjJZWElnYjNCMGFXOXVjeUE5SUY5bGVIUmxibVJ6S0h0OUxDQjBhR2x6TG1OaFkyaGxMbTl3ZEdsdmJuTXNJSFJvYVhNdWIzQjBhVzl1Y3k1allXTm9aU2s3WEc1Y2JpQWdJQ0IyWVhJZ2JHOWhaRXh1WjNNZ1BTQjBlWEJsYjJZZ2JHRnVaM1ZoWjJWeklEMDlQU0FuYzNSeWFXNW5KeUEvSUhSb2FYTXVjMlZ5ZG1salpYTXViR0Z1WjNWaFoyVlZkR2xzY3k1MGIxSmxjMjlzZG1WSWFXVnlZWEpqYUhrb2JHRnVaM1ZoWjJWektTQTZJR3hoYm1kMVlXZGxjenRjYmx4dUlDQWdJR2xtSUNodmNIUnBiMjV6TG1WdVlXSnNaV1FwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVZMkZqYUdVdWJHOWhaQ2hzYjJGa1RHNW5jeXdnWm5WdVkzUnBiMjRnS0dWeWNpd2daR0YwWVNrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvWlhKeUtTQmZkR2hwY3pJdWJHOW5aMlZ5TG1WeWNtOXlLQ2RzYjJGa2FXNW5JR3hoYm1kMVlXZGxjeUFuSUNzZ2JHOWhaRXh1WjNNdWFtOXBiaWduTENBbktTQXJJQ2NnWm5KdmJTQmpZV05vWlNCbVlXbHNaV1FuTENCbGNuSXBPMXh1SUNBZ0lDQWdJQ0JwWmlBb1pHRjBZU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDOHFJR1Z6YkdsdWRDQnVieTF5WlhOMGNtbGpkR1ZrTFhONWJuUmhlRG9nTUNBcUwxeHVJQ0FnSUNBZ0lDQWdJR1p2Y2lBb2RtRnlJR3dnYVc0Z1pHRjBZU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0U5aWFtVmpkQzV3Y205MGIzUjVjR1V1YUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNoa1lYUmhMQ0JzS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWIzSWdLSFpoY2lCdUlHbHVJR1JoZEdGYmJGMHBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHUmhkR0ZiYkYwc0lHNHBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9iaUFoUFQwZ0oya3hPRzVUZEdGdGNDY3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR0oxYm1Sc1pTQTlJR1JoZEdGYmJGMWJibDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hpZFc1a2JHVXBJRjkwYUdsek1pNXpkRzl5WlM1aFpHUlNaWE52ZFhKalpVSjFibVJzWlNoc0xDQnVMQ0JpZFc1a2JHVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQnBaaUFvWTJGc2JHSmhZMnNwSUdOaGJHeGlZV05yS0NrN1hHNGdJQ0FnSUNCOUtUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHTmhiR3hpWVdOcktTQjdYRzRnSUNBZ0lDQmpZV3hzWW1GamF5Z3BPMXh1SUNBZ0lIMWNiaUFnZlR0Y2JseHVJQ0JEYjI1dVpXTjBiM0l1Y0hKdmRHOTBlWEJsTG5OaGRtVWdQU0JtZFc1amRHbHZiaUJ6WVhabEtDa2dlMXh1SUNBZ0lHbG1JQ2gwYUdsekxtTmhZMmhsSUNZbUlIUm9hWE11YjNCMGFXOXVjeTVqWVdOb1pTQW1KaUIwYUdsekxtOXdkR2x2Ym5NdVkyRmphR1V1Wlc1aFlteGxaQ2tnZEdocGN5NWpZV05vWlM1ellYWmxLSFJvYVhNdWMzUnZjbVV1WkdGMFlTazdYRzRnSUgwN1hHNWNiaUFnY21WMGRYSnVJRU52Ym01bFkzUnZjanRjYm4wb1gwVjJaVzUwUlcxcGRIUmxjak11WkdWbVlYVnNkQ2s3WEc1Y2JtVjRjRzl5ZEhNdVpHVm1ZWFZzZENBOUlFTnZibTVsWTNSdmNqc2lMQ0luZFhObElITjBjbWxqZENjN1hHNWNiazlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENCY0lsOWZaWE5OYjJSMWJHVmNJaXdnZTF4dUlDQjJZV3gxWlRvZ2RISjFaVnh1ZlNrN1hHNWNibVoxYm1OMGFXOXVJRjlqYkdGemMwTmhiR3hEYUdWamF5aHBibk4wWVc1alpTd2dRMjl1YzNSeWRXTjBiM0lwSUhzZ2FXWWdLQ0VvYVc1emRHRnVZMlVnYVc1emRHRnVZMlZ2WmlCRGIyNXpkSEoxWTNSdmNpa3BJSHNnZEdoeWIzY2dibVYzSUZSNWNHVkZjbkp2Y2loY0lrTmhibTV2ZENCallXeHNJR0VnWTJ4aGMzTWdZWE1nWVNCbWRXNWpkR2x2Ymx3aUtUc2dmU0I5WEc1Y2JuWmhjaUJGZG1WdWRFVnRhWFIwWlhJZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lHWjFibU4wYVc5dUlFVjJaVzUwUlcxcGRIUmxjaWdwSUh0Y2JpQWdJQ0JmWTJ4aGMzTkRZV3hzUTJobFkyc29kR2hwY3l3Z1JYWmxiblJGYldsMGRHVnlLVHRjYmx4dUlDQWdJSFJvYVhNdWIySnpaWEoyWlhKeklEMGdlMzA3WEc0Z0lIMWNibHh1SUNCRmRtVnVkRVZ0YVhSMFpYSXVjSEp2ZEc5MGVYQmxMbTl1SUQwZ1puVnVZM1JwYjI0Z2IyNG9aWFpsYm5SekxDQnNhWE4wWlc1bGNpa2dlMXh1SUNBZ0lIWmhjaUJmZEdocGN5QTlJSFJvYVhNN1hHNWNiaUFnSUNCbGRtVnVkSE11YzNCc2FYUW9KeUFuS1M1bWIzSkZZV05vS0daMWJtTjBhVzl1SUNobGRtVnVkQ2tnZTF4dUlDQWdJQ0FnWDNSb2FYTXViMkp6WlhKMlpYSnpXMlYyWlc1MFhTQTlJRjkwYUdsekxtOWljMlZ5ZG1WeWMxdGxkbVZ1ZEYwZ2ZId2dXMTA3WEc0Z0lDQWdJQ0JmZEdocGN5NXZZbk5sY25abGNuTmJaWFpsYm5SZExuQjFjMmdvYkdsemRHVnVaWElwTzF4dUlDQWdJSDBwTzF4dUlDQjlPMXh1WEc0Z0lFVjJaVzUwUlcxcGRIUmxjaTV3Y205MGIzUjVjR1V1YjJabUlEMGdablZ1WTNScGIyNGdiMlptS0dWMlpXNTBMQ0JzYVhOMFpXNWxjaWtnZTF4dUlDQWdJSFpoY2lCZmRHaHBjeklnUFNCMGFHbHpPMXh1WEc0Z0lDQWdhV1lnS0NGMGFHbHpMbTlpYzJWeWRtVnljMXRsZG1WdWRGMHBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNWNiaUFnSUNCMGFHbHpMbTlpYzJWeWRtVnljMXRsZG1WdWRGMHVabTl5UldGamFDaG1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0JwWmlBb0lXeHBjM1JsYm1WeUtTQjdYRzRnSUNBZ0lDQWdJR1JsYkdWMFpTQmZkR2hwY3pJdWIySnpaWEoyWlhKelcyVjJaVzUwWFR0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQnBibVJsZUNBOUlGOTBhR2x6TWk1dlluTmxjblpsY25OYlpYWmxiblJkTG1sdVpHVjRUMllvYkdsemRHVnVaWElwTzF4dUlDQWdJQ0FnSUNCcFppQW9hVzVrWlhnZ1BpQXRNU2tnZTF4dUlDQWdJQ0FnSUNBZ0lGOTBhR2x6TWk1dlluTmxjblpsY25OYlpYWmxiblJkTG5Od2JHbGpaU2hwYm1SbGVDd2dNU2s3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JpQWdJQ0I5S1R0Y2JpQWdmVHRjYmx4dUlDQkZkbVZ1ZEVWdGFYUjBaWEl1Y0hKdmRHOTBlWEJsTG1WdGFYUWdQU0JtZFc1amRHbHZiaUJsYldsMEtHVjJaVzUwS1NCN1hHNGdJQ0FnWm05eUlDaDJZWElnWDJ4bGJpQTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ3NJR0Z5WjNNZ1BTQkJjbkpoZVNoZmJHVnVJRDRnTVNBL0lGOXNaVzRnTFNBeElEb2dNQ2tzSUY5clpYa2dQU0F4T3lCZmEyVjVJRHdnWDJ4bGJqc2dYMnRsZVNzcktTQjdYRzRnSUNBZ0lDQmhjbWR6VzE5clpYa2dMU0F4WFNBOUlHRnlaM1Z0Wlc1MGMxdGZhMlY1WFR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JwWmlBb2RHaHBjeTV2WW5ObGNuWmxjbk5iWlhabGJuUmRLU0I3WEc0Z0lDQWdJQ0IyWVhJZ1kyeHZibVZrSUQwZ1cxMHVZMjl1WTJGMEtIUm9hWE11YjJKelpYSjJaWEp6VzJWMlpXNTBYU2s3WEc0Z0lDQWdJQ0JqYkc5dVpXUXVabTl5UldGamFDaG1kVzVqZEdsdmJpQW9iMkp6WlhKMlpYSXBJSHRjYmlBZ0lDQWdJQ0FnYjJKelpYSjJaWEl1WVhCd2JIa29kVzVrWldacGJtVmtMQ0JoY21kektUdGNiaUFnSUNBZ0lIMHBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHbG1JQ2gwYUdsekxtOWljMlZ5ZG1WeWMxc25LaWRkS1NCN1hHNGdJQ0FnSUNCMllYSWdYMk5zYjI1bFpDQTlJRnRkTG1OdmJtTmhkQ2gwYUdsekxtOWljMlZ5ZG1WeWMxc25LaWRkS1R0Y2JpQWdJQ0FnSUY5amJHOXVaV1F1Wm05eVJXRmphQ2htZFc1amRHbHZiaUFvYjJKelpYSjJaWElwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJRjl5WldZN1hHNWNiaUFnSUNBZ0lDQWdiMkp6WlhKMlpYSXVZWEJ3Ykhrb2IySnpaWEoyWlhJc0lDaGZjbVZtSUQwZ1cyVjJaVzUwWFNrdVkyOXVZMkYwTG1Gd2NHeDVLRjl5WldZc0lHRnlaM01wS1R0Y2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgxY2JpQWdmVHRjYmx4dUlDQnlaWFIxY200Z1JYWmxiblJGYldsMGRHVnlPMXh1ZlNncE8xeHVYRzVsZUhCdmNuUnpMbVJsWm1GMWJIUWdQU0JGZG1WdWRFVnRhWFIwWlhJN0lpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNVBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnWENKZlgyVnpUVzlrZFd4bFhDSXNJSHRjYmlBZ2RtRnNkV1U2SUhSeWRXVmNibjBwTzF4dVhHNTJZWElnWDJWNGRHVnVaSE1nUFNCUFltcGxZM1F1WVhOemFXZHVJSHg4SUdaMWJtTjBhVzl1SUNoMFlYSm5aWFFwSUhzZ1ptOXlJQ2gyWVhJZ2FTQTlJREU3SUdrZ1BDQmhjbWQxYldWdWRITXViR1Z1WjNSb095QnBLeXNwSUhzZ2RtRnlJSE52ZFhKalpTQTlJR0Z5WjNWdFpXNTBjMXRwWFRzZ1ptOXlJQ2gyWVhJZ2EyVjVJR2x1SUhOdmRYSmpaU2tnZXlCcFppQW9UMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLSE52ZFhKalpTd2dhMlY1S1NrZ2V5QjBZWEpuWlhSYmEyVjVYU0E5SUhOdmRYSmpaVnRyWlhsZE95QjlJSDBnZlNCeVpYUjFjbTRnZEdGeVoyVjBPeUI5TzF4dVhHNTJZWElnWDNWMGFXeHpJRDBnY21WeGRXbHlaU2duTGk5MWRHbHNjeTVxY3ljcE8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZYYVd4a1kyRnlaQ2hmZFhScGJITXBPMXh1WEc1MllYSWdYMnh2WjJkbGNpQTlJSEpsY1hWcGNtVW9KeTR2Ykc5bloyVnlMbXB6SnlrN1hHNWNiblpoY2lCZmJHOW5aMlZ5TWlBOUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvWDJ4dloyZGxjaWs3WEc1Y2JtWjFibU4wYVc5dUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvYjJKcUtTQjdJSEpsZEhWeWJpQnZZbW9nSmlZZ2IySnFMbDlmWlhOTmIyUjFiR1VnUHlCdlltb2dPaUI3SUdSbFptRjFiSFE2SUc5aWFpQjlPeUI5WEc1Y2JtWjFibU4wYVc5dUlGOXBiblJsY205d1VtVnhkV2x5WlZkcGJHUmpZWEprS0c5aWFpa2dleUJwWmlBb2IySnFJQ1ltSUc5aWFpNWZYMlZ6VFc5a2RXeGxLU0I3SUhKbGRIVnliaUJ2WW1vN0lIMGdaV3h6WlNCN0lIWmhjaUJ1WlhkUFltb2dQU0I3ZlRzZ2FXWWdLRzlpYWlBaFBTQnVkV3hzS1NCN0lHWnZjaUFvZG1GeUlHdGxlU0JwYmlCdlltb3BJSHNnYVdZZ0tFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbW9zSUd0bGVTa3BJRzVsZDA5aWFsdHJaWGxkSUQwZ2IySnFXMnRsZVYwN0lIMGdmU0J1WlhkUFltb3VaR1ZtWVhWc2RDQTlJRzlpYWpzZ2NtVjBkWEp1SUc1bGQwOWlhanNnZlNCOVhHNWNibVoxYm1OMGFXOXVJRjlqYkdGemMwTmhiR3hEYUdWamF5aHBibk4wWVc1alpTd2dRMjl1YzNSeWRXTjBiM0lwSUhzZ2FXWWdLQ0VvYVc1emRHRnVZMlVnYVc1emRHRnVZMlZ2WmlCRGIyNXpkSEoxWTNSdmNpa3BJSHNnZEdoeWIzY2dibVYzSUZSNWNHVkZjbkp2Y2loY0lrTmhibTV2ZENCallXeHNJR0VnWTJ4aGMzTWdZWE1nWVNCbWRXNWpkR2x2Ymx3aUtUc2dmU0I5WEc1Y2JuWmhjaUJKYm5SbGNuQnZiR0YwYjNJZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lHWjFibU4wYVc5dUlFbHVkR1Z5Y0c5c1lYUnZjaWdwSUh0Y2JpQWdJQ0IyWVhJZ2IzQjBhVzl1Y3lBOUlHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnZ1BpQXdJQ1ltSUdGeVozVnRaVzUwYzFzd1hTQWhQVDBnZFc1a1pXWnBibVZrSUQ4Z1lYSm5kVzFsYm5Seld6QmRJRG9nZTMwN1hHNWNiaUFnSUNCZlkyeGhjM05EWVd4c1EyaGxZMnNvZEdocGN5d2dTVzUwWlhKd2IyeGhkRzl5S1R0Y2JseHVJQ0FnSUhSb2FYTXViRzluWjJWeUlEMGdYMnh2WjJkbGNqSXVaR1ZtWVhWc2RDNWpjbVZoZEdVb0oybHVkR1Z5Y0c5c1lYUnZjaWNwTzF4dVhHNGdJQ0FnZEdocGN5NXBibWwwS0c5d2RHbHZibk1zSUhSeWRXVXBPMXh1SUNCOVhHNWNiaUFnTHlvZ1pYTnNhVzUwSUc1dkxYQmhjbUZ0TFhKbFlYTnphV2R1T2lBd0lDb3ZYRzVjYmx4dUlDQkpiblJsY25CdmJHRjBiM0l1Y0hKdmRHOTBlWEJsTG1sdWFYUWdQU0JtZFc1amRHbHZiaUJwYm1sMEtDa2dlMXh1SUNBZ0lIWmhjaUJ2Y0hScGIyNXpJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURBZ0ppWWdZWEpuZFcxbGJuUnpXekJkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTUYwZ09pQjdmVHRjYmlBZ0lDQjJZWElnY21WelpYUWdQU0JoY21kMWJXVnVkSE5iTVYwN1hHNWNiaUFnSUNCcFppQW9jbVZ6WlhRcElIdGNiaUFnSUNBZ0lIUm9hWE11YjNCMGFXOXVjeUE5SUc5d2RHbHZibk03WEc0Z0lDQWdJQ0IwYUdsekxtWnZjbTFoZENBOUlHOXdkR2x2Ym5NdWFXNTBaWEp3YjJ4aGRHbHZiaUFtSmlCdmNIUnBiMjV6TG1sdWRHVnljRzlzWVhScGIyNHVabTl5YldGMElIeDhJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkbUZzZFdVN1hHNGdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ2RHaHBjeTVsYzJOaGNHVWdQU0J2Y0hScGIyNXpMbWx1ZEdWeWNHOXNZWFJwYjI0Z0ppWWdiM0IwYVc5dWN5NXBiblJsY25CdmJHRjBhVzl1TG1WelkyRndaU0I4ZkNCMWRHbHNjeTVsYzJOaGNHVTdYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDZ2hiM0IwYVc5dWN5NXBiblJsY25CdmJHRjBhVzl1S1NCdmNIUnBiMjV6TG1sdWRHVnljRzlzWVhScGIyNGdQU0I3SUdWelkyRndaVlpoYkhWbE9pQjBjblZsSUgwN1hHNWNiaUFnSUNCMllYSWdhVTl3ZEhNZ1BTQnZjSFJwYjI1ekxtbHVkR1Z5Y0c5c1lYUnBiMjQ3WEc1Y2JpQWdJQ0IwYUdsekxtVnpZMkZ3WlZaaGJIVmxJRDBnYVU5d2RITXVaWE5qWVhCbFZtRnNkV1VnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR2xQY0hSekxtVnpZMkZ3WlZaaGJIVmxJRG9nZEhKMVpUdGNibHh1SUNBZ0lIUm9hWE11Y0hKbFptbDRJRDBnYVU5d2RITXVjSEpsWm1sNElEOGdkWFJwYkhNdWNtVm5aWGhGYzJOaGNHVW9hVTl3ZEhNdWNISmxabWw0S1NBNklHbFBjSFJ6TG5CeVpXWnBlRVZ6WTJGd1pXUWdmSHdnSjN0N0p6dGNiaUFnSUNCMGFHbHpMbk4xWm1acGVDQTlJR2xQY0hSekxuTjFabVpwZUNBL0lIVjBhV3h6TG5KbFoyVjRSWE5qWVhCbEtHbFBjSFJ6TG5OMVptWnBlQ2tnT2lCcFQzQjBjeTV6ZFdabWFYaEZjMk5oY0dWa0lIeDhJQ2Q5ZlNjN1hHNWNiaUFnSUNCMGFHbHpMbVp2Y20xaGRGTmxjR0Z5WVhSdmNpQTlJR2xQY0hSekxtWnZjbTFoZEZObGNHRnlZWFJ2Y2lBL0lHbFBjSFJ6TG1admNtMWhkRk5sY0dGeVlYUnZjaUE2SUdsUGNIUnpMbVp2Y20xaGRGTmxjR0Z5WVhSdmNpQjhmQ0FuTENjN1hHNWNiaUFnSUNCMGFHbHpMblZ1WlhOallYQmxVSEpsWm1sNElEMGdhVTl3ZEhNdWRXNWxjMk5oY0dWVGRXWm1hWGdnUHlBbkp5QTZJR2xQY0hSekxuVnVaWE5qWVhCbFVISmxabWw0SUh4OElDY3RKenRjYmlBZ0lDQjBhR2x6TG5WdVpYTmpZWEJsVTNWbVptbDRJRDBnZEdocGN5NTFibVZ6WTJGd1pWQnlaV1pwZUNBL0lDY25JRG9nYVU5d2RITXVkVzVsYzJOaGNHVlRkV1ptYVhnZ2ZId2dKeWM3WEc1Y2JpQWdJQ0IwYUdsekxtNWxjM1JwYm1kUWNtVm1hWGdnUFNCcFQzQjBjeTV1WlhOMGFXNW5VSEpsWm1sNElEOGdkWFJwYkhNdWNtVm5aWGhGYzJOaGNHVW9hVTl3ZEhNdWJtVnpkR2x1WjFCeVpXWnBlQ2tnT2lCcFQzQjBjeTV1WlhOMGFXNW5VSEpsWm1sNFJYTmpZWEJsWkNCOGZDQjFkR2xzY3k1eVpXZGxlRVZ6WTJGd1pTZ25KSFFvSnlrN1hHNGdJQ0FnZEdocGN5NXVaWE4wYVc1blUzVm1abWw0SUQwZ2FVOXdkSE11Ym1WemRHbHVaMU4xWm1acGVDQS9JSFYwYVd4ekxuSmxaMlY0UlhOallYQmxLR2xQY0hSekxtNWxjM1JwYm1kVGRXWm1hWGdwSURvZ2FVOXdkSE11Ym1WemRHbHVaMU4xWm1acGVFVnpZMkZ3WldRZ2ZId2dkWFJwYkhNdWNtVm5aWGhGYzJOaGNHVW9KeWtuS1R0Y2JseHVJQ0FnSUhSb2FYTXViV0Y0VW1Wd2JHRmpaWE1nUFNCcFQzQjBjeTV0WVhoU1pYQnNZV05sY3lBL0lHbFBjSFJ6TG0xaGVGSmxjR3hoWTJWeklEb2dNVEF3TUR0Y2JseHVJQ0FnSUM4dklIUm9aU0J5WldkbGVIQmNiaUFnSUNCMGFHbHpMbkpsYzJWMFVtVm5SWGh3S0NrN1hHNGdJSDA3WEc1Y2JpQWdTVzUwWlhKd2IyeGhkRzl5TG5CeWIzUnZkSGx3WlM1eVpYTmxkQ0E5SUdaMWJtTjBhVzl1SUhKbGMyVjBLQ2tnZTF4dUlDQWdJR2xtSUNoMGFHbHpMbTl3ZEdsdmJuTXBJSFJvYVhNdWFXNXBkQ2gwYUdsekxtOXdkR2x2Ym5NcE8xeHVJQ0I5TzF4dVhHNGdJRWx1ZEdWeWNHOXNZWFJ2Y2k1d2NtOTBiM1I1Y0dVdWNtVnpaWFJTWldkRmVIQWdQU0JtZFc1amRHbHZiaUJ5WlhObGRGSmxaMFY0Y0NncElIdGNiaUFnSUNBdkx5QjBhR1VnY21WblpYaHdYRzRnSUNBZ2RtRnlJSEpsWjJWNGNGTjBjaUE5SUhSb2FYTXVjSEpsWm1sNElDc2dKeWd1S3o4cEp5QXJJSFJvYVhNdWMzVm1abWw0TzF4dUlDQWdJSFJvYVhNdWNtVm5aWGh3SUQwZ2JtVjNJRkpsWjBWNGNDaHlaV2RsZUhCVGRISXNJQ2RuSnlrN1hHNWNiaUFnSUNCMllYSWdjbVZuWlhod1ZXNWxjMk5oY0dWVGRISWdQU0FuSnlBcklIUm9hWE11Y0hKbFptbDRJQ3NnZEdocGN5NTFibVZ6WTJGd1pWQnlaV1pwZUNBcklDY29MaXMvS1NjZ0t5QjBhR2x6TG5WdVpYTmpZWEJsVTNWbVptbDRJQ3NnZEdocGN5NXpkV1ptYVhnN1hHNGdJQ0FnZEdocGN5NXlaV2RsZUhCVmJtVnpZMkZ3WlNBOUlHNWxkeUJTWldkRmVIQW9jbVZuWlhod1ZXNWxjMk5oY0dWVGRISXNJQ2RuSnlrN1hHNWNiaUFnSUNCMllYSWdibVZ6ZEdsdVoxSmxaMlY0Y0ZOMGNpQTlJSFJvYVhNdWJtVnpkR2x1WjFCeVpXWnBlQ0FySUNjb0xpcy9LU2NnS3lCMGFHbHpMbTVsYzNScGJtZFRkV1ptYVhnN1hHNGdJQ0FnZEdocGN5NXVaWE4wYVc1blVtVm5aWGh3SUQwZ2JtVjNJRkpsWjBWNGNDaHVaWE4wYVc1blVtVm5aWGh3VTNSeUxDQW5aeWNwTzF4dUlDQjlPMXh1WEc0Z0lFbHVkR1Z5Y0c5c1lYUnZjaTV3Y205MGIzUjVjR1V1YVc1MFpYSndiMnhoZEdVZ1BTQm1kVzVqZEdsdmJpQnBiblJsY25CdmJHRjBaU2h6ZEhJc0lHUmhkR0VzSUd4dVp5a2dlMXh1SUNBZ0lIWmhjaUJmZEdocGN5QTlJSFJvYVhNN1hHNWNiaUFnSUNCMllYSWdiV0YwWTJnZ1BTQjJiMmxrSURBN1hHNGdJQ0FnZG1GeUlIWmhiSFZsSUQwZ2RtOXBaQ0F3TzF4dUlDQWdJSFpoY2lCeVpYQnNZV05sY3lBOUlIWnZhV1FnTUR0Y2JseHVJQ0FnSUdaMWJtTjBhVzl1SUhKbFoyVjRVMkZtWlNoMllXd3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjJZV3d1Y21Wd2JHRmpaU2d2WEZ3a0wyY3NJQ2NrSkNRa0p5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2RtRnlJR2hoYm1Sc1pVWnZjbTFoZENBOUlHWjFibU4wYVc5dUlHaGhibVJzWlVadmNtMWhkQ2hyWlhrcElIdGNiaUFnSUNBZ0lHbG1JQ2hyWlhrdWFXNWtaWGhQWmloZmRHaHBjeTVtYjNKdFlYUlRaWEJoY21GMGIzSXBJRHdnTUNrZ2NtVjBkWEp1SUhWMGFXeHpMbWRsZEZCaGRHZ29aR0YwWVN3Z2EyVjVLVHRjYmx4dUlDQWdJQ0FnZG1GeUlIQWdQU0JyWlhrdWMzQnNhWFFvWDNSb2FYTXVabTl5YldGMFUyVndZWEpoZEc5eUtUdGNiaUFnSUNBZ0lIWmhjaUJySUQwZ2NDNXphR2xtZENncExuUnlhVzBvS1R0Y2JpQWdJQ0FnSUhaaGNpQm1JRDBnY0M1cWIybHVLRjkwYUdsekxtWnZjbTFoZEZObGNHRnlZWFJ2Y2lrdWRISnBiU2dwTzF4dVhHNGdJQ0FnSUNCeVpYUjFjbTRnWDNSb2FYTXVabTl5YldGMEtIVjBhV3h6TG1kbGRGQmhkR2dvWkdGMFlTd2dheWtzSUdZc0lHeHVaeWs3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJSFJvYVhNdWNtVnpaWFJTWldkRmVIQW9LVHRjYmx4dUlDQWdJSEpsY0d4aFkyVnpJRDBnTUR0Y2JpQWdJQ0F2THlCMWJtVnpZMkZ3WlNCcFppQm9ZWE1nZFc1bGMyTmhjR1ZRY21WbWFYZ3ZVM1ZtWm1sNFhHNGdJQ0FnTHlvZ1pYTnNhVzUwSUc1dkxXTnZibVF0WVhOemFXZHVPaUF3SUNvdlhHNGdJQ0FnZDJocGJHVWdLRzFoZEdOb0lEMGdkR2hwY3k1eVpXZGxlSEJWYm1WelkyRndaUzVsZUdWaktITjBjaWtwSUh0Y2JpQWdJQ0FnSUhaaGJIVmxJRDBnYUdGdVpHeGxSbTl5YldGMEtHMWhkR05vV3pGZExuUnlhVzBvS1NrN1hHNGdJQ0FnSUNCemRISWdQU0J6ZEhJdWNtVndiR0ZqWlNodFlYUmphRnN3WFN3Z2RtRnNkV1VwTzF4dUlDQWdJQ0FnZEdocGN5NXlaV2RsZUhCVmJtVnpZMkZ3WlM1c1lYTjBTVzVrWlhnZ1BTQXdPMXh1SUNBZ0lDQWdjbVZ3YkdGalpYTXJLenRjYmlBZ0lDQWdJR2xtSUNoeVpYQnNZV05sY3lBK1BTQjBhR2x6TG0xaGVGSmxjR3hoWTJWektTQjdYRzRnSUNBZ0lDQWdJR0p5WldGck8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGNHeGhZMlZ6SUQwZ01EdGNiaUFnSUNBdkx5QnlaV2QxYkdGeUlHVnpZMkZ3WlNCdmJpQmtaVzFoYm1SY2JpQWdJQ0IzYUdsc1pTQW9iV0YwWTJnZ1BTQjBhR2x6TG5KbFoyVjRjQzVsZUdWaktITjBjaWtwSUh0Y2JpQWdJQ0FnSUhaaGJIVmxJRDBnYUdGdVpHeGxSbTl5YldGMEtHMWhkR05vV3pGZExuUnlhVzBvS1NrN1hHNGdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlIWmhiSFZsSUNFOVBTQW5jM1J5YVc1bkp5a2dkbUZzZFdVZ1BTQjFkR2xzY3k1dFlXdGxVM1J5YVc1bktIWmhiSFZsS1R0Y2JpQWdJQ0FnSUdsbUlDZ2hkbUZzZFdVcElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1c2IyZG5aWEl1ZDJGeWJpZ25iV2x6YzJWa0lIUnZJSEJoYzNNZ2FXNGdkbUZ5YVdGaWJHVWdKeUFySUcxaGRHTm9XekZkSUNzZ0p5Qm1iM0lnYVc1MFpYSndiMnhoZEdsdVp5QW5JQ3NnYzNSeUtUdGNiaUFnSUNBZ0lDQWdkbUZzZFdVZ1BTQW5KenRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJSFpoYkhWbElEMGdkR2hwY3k1bGMyTmhjR1ZXWVd4MVpTQS9JSEpsWjJWNFUyRm1aU2gwYUdsekxtVnpZMkZ3WlNoMllXeDFaU2twSURvZ2NtVm5aWGhUWVdabEtIWmhiSFZsS1R0Y2JpQWdJQ0FnSUhOMGNpQTlJSE4wY2k1eVpYQnNZV05sS0cxaGRHTm9XekJkTENCMllXeDFaU2s3WEc0Z0lDQWdJQ0IwYUdsekxuSmxaMlY0Y0M1c1lYTjBTVzVrWlhnZ1BTQXdPMXh1SUNBZ0lDQWdjbVZ3YkdGalpYTXJLenRjYmlBZ0lDQWdJR2xtSUNoeVpYQnNZV05sY3lBK1BTQjBhR2x6TG0xaGVGSmxjR3hoWTJWektTQjdYRzRnSUNBZ0lDQWdJR0p5WldGck8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdjM1J5TzF4dUlDQjlPMXh1WEc0Z0lFbHVkR1Z5Y0c5c1lYUnZjaTV3Y205MGIzUjVjR1V1Ym1WemRDQTlJR1oxYm1OMGFXOXVJRzVsYzNRb2MzUnlMQ0JtWXlrZ2UxeHVJQ0FnSUhaaGNpQnZjSFJwYjI1eklEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQStJRElnSmlZZ1lYSm5kVzFsYm5Seld6SmRJQ0U5UFNCMWJtUmxabWx1WldRZ1B5QmhjbWQxYldWdWRITmJNbDBnT2lCN2ZUdGNibHh1SUNBZ0lIWmhjaUJ0WVhSamFDQTlJSFp2YVdRZ01EdGNiaUFnSUNCMllYSWdkbUZzZFdVZ1BTQjJiMmxrSURBN1hHNWNiaUFnSUNCMllYSWdZMnh2Ym1Wa1QzQjBhVzl1Y3lBOUlGOWxlSFJsYm1SektIdDlMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQmpiRzl1WldSUGNIUnBiMjV6TG1Gd2NHeDVVRzl6ZEZCeWIyTmxjM052Y2lBOUlHWmhiSE5sT3lBdkx5QmhkbTlwWkNCd2IzTjBJSEJ5YjJObGMzTnBibWNnYjI0Z2JtVnpkR1ZrSUd4dmIydDFjRnh1WEc0Z0lDQWdMeThnYVdZZ2RtRnNkV1VnYVhNZ2MyOXRaWFJvYVc1bklHeHBhMlVnWENKdGVVdGxlVndpT2lCY0lteHZjbVZ0SUNRb1lXNXZkR2hsY2t0bGVTd2dleUJjSW1OdmRXNTBYQ0k2SUh0N1lWWmhiSFZsU1c1UGNIUnBiMjV6ZlgwZ2ZTbGNJbHh1SUNBZ0lHWjFibU4wYVc5dUlHaGhibVJzWlVoaGMwOXdkR2x2Ym5Nb2EyVjVMQ0JwYm1obGNtbDBaV1JQY0hScGIyNXpLU0I3WEc0Z0lDQWdJQ0JwWmlBb2EyVjVMbWx1WkdWNFQyWW9KeXduS1NBOElEQXBJSEpsZEhWeWJpQnJaWGs3WEc1Y2JpQWdJQ0FnSUhaaGNpQndJRDBnYTJWNUxuTndiR2wwS0Njc0p5azdYRzRnSUNBZ0lDQnJaWGtnUFNCd0xuTm9hV1owS0NrN1hHNGdJQ0FnSUNCMllYSWdiM0IwYVc5dWMxTjBjbWx1WnlBOUlIQXVhbTlwYmlnbkxDY3BPMXh1SUNBZ0lDQWdiM0IwYVc5dWMxTjBjbWx1WnlBOUlIUm9hWE11YVc1MFpYSndiMnhoZEdVb2IzQjBhVzl1YzFOMGNtbHVaeXdnWTJ4dmJtVmtUM0IwYVc5dWN5azdYRzRnSUNBZ0lDQnZjSFJwYjI1elUzUnlhVzVuSUQwZ2IzQjBhVzl1YzFOMGNtbHVaeTV5WlhCc1lXTmxLQzhuTDJjc0lDZGNJaWNwTzF4dVhHNGdJQ0FnSUNCMGNua2dlMXh1SUNBZ0lDQWdJQ0JqYkc5dVpXUlBjSFJwYjI1eklEMGdTbE5QVGk1d1lYSnpaU2h2Y0hScGIyNXpVM1J5YVc1bktUdGNibHh1SUNBZ0lDQWdJQ0JwWmlBb2FXNW9aWEpwZEdWa1QzQjBhVzl1Y3lrZ1kyeHZibVZrVDNCMGFXOXVjeUE5SUY5bGVIUmxibVJ6S0h0OUxDQnBibWhsY21sMFpXUlBjSFJwYjI1ekxDQmpiRzl1WldSUGNIUnBiMjV6S1R0Y2JpQWdJQ0FnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1c2IyZG5aWEl1WlhKeWIzSW9KMlpoYVd4bFpDQndZWEp6YVc1bklHOXdkR2x2Ym5NZ2MzUnlhVzVuSUdsdUlHNWxjM1JwYm1jZ1ptOXlJR3RsZVNBbklDc2dhMlY1TENCbEtUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdjbVYwZFhKdUlHdGxlVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJ5WldkMWJHRnlJR1Z6WTJGd1pTQnZiaUJrWlcxaGJtUmNiaUFnSUNCM2FHbHNaU0FvYldGMFkyZ2dQU0IwYUdsekxtNWxjM1JwYm1kU1pXZGxlSEF1WlhobFl5aHpkSElwS1NCN1hHNGdJQ0FnSUNCMllXeDFaU0E5SUdaaktHaGhibVJzWlVoaGMwOXdkR2x2Ym5NdVkyRnNiQ2gwYUdsekxDQnRZWFJqYUZzeFhTNTBjbWx0S0Nrc0lHTnNiMjVsWkU5d2RHbHZibk1wTENCamJHOXVaV1JQY0hScGIyNXpLVHRjYmx4dUlDQWdJQ0FnTHk4Z2FYTWdiMjVzZVNCMGFHVWdibVZ6ZEdsdVp5QnJaWGtnS0d0bGVURWdQU0FuSkNoclpYa3lLU2NwSUhKbGRIVnliaUIwYUdVZ2RtRnNkV1VnZDJsMGFHOTFkQ0J6ZEhKcGJtZHBabmxjYmlBZ0lDQWdJR2xtSUNoMllXeDFaU0FtSmlCdFlYUmphRnN3WFNBOVBUMGdjM1J5SUNZbUlIUjVjR1Z2WmlCMllXeDFaU0FoUFQwZ0ozTjBjbWx1WnljcElISmxkSFZ5YmlCMllXeDFaVHRjYmx4dUlDQWdJQ0FnTHk4Z2JtOGdjM1J5YVc1bklIUnZJR2x1WTJ4MVpHVWdiM0lnWlcxd2RIbGNiaUFnSUNBZ0lHbG1JQ2gwZVhCbGIyWWdkbUZzZFdVZ0lUMDlJQ2R6ZEhKcGJtY25LU0IyWVd4MVpTQTlJSFYwYVd4ekxtMWhhMlZUZEhKcGJtY29kbUZzZFdVcE8xeHVJQ0FnSUNBZ2FXWWdLQ0YyWVd4MVpTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxteHZaMmRsY2k1M1lYSnVLQ2R0YVhOelpXUWdkRzhnY21WemIyeDJaU0FuSUNzZ2JXRjBZMmhiTVYwZ0t5QW5JR1p2Y2lCdVpYTjBhVzVuSUNjZ0t5QnpkSElwTzF4dUlDQWdJQ0FnSUNCMllXeDFaU0E5SUNjbk8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0x5OGdUbVZ6ZEdWa0lHdGxlWE1nYzJodmRXeGtJRzV2ZENCaVpTQmxjMk5oY0dWa0lHSjVJR1JsWm1GMWJIUWdJemcxTkZ4dUlDQWdJQ0FnTHk4Z2RtRnNkV1VnUFNCMGFHbHpMbVZ6WTJGd1pWWmhiSFZsSUQ4Z2NtVm5aWGhUWVdabEtIVjBhV3h6TG1WelkyRndaU2gyWVd4MVpTa3BJRG9nY21WblpYaFRZV1psS0haaGJIVmxLVHRjYmlBZ0lDQWdJSE4wY2lBOUlITjBjaTV5WlhCc1lXTmxLRzFoZEdOb1d6QmRMQ0IyWVd4MVpTazdYRzRnSUNBZ0lDQjBhR2x6TG5KbFoyVjRjQzVzWVhOMFNXNWtaWGdnUFNBd08xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdjM1J5TzF4dUlDQjlPMXh1WEc0Z0lISmxkSFZ5YmlCSmJuUmxjbkJ2YkdGMGIzSTdYRzU5S0NrN1hHNWNibVY0Y0c5eWRITXVaR1ZtWVhWc2RDQTlJRWx1ZEdWeWNHOXNZWFJ2Y2pzaUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JrOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JjSWw5ZlpYTk5iMlIxYkdWY0lpd2dlMXh1SUNCMllXeDFaVG9nZEhKMVpWeHVmU2s3WEc1Y2JuWmhjaUJmYkc5bloyVnlJRDBnY21WeGRXbHlaU2duTGk5c2IyZG5aWEl1YW5NbktUdGNibHh1ZG1GeUlGOXNiMmRuWlhJeUlEMGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENoZmJHOW5aMlZ5S1R0Y2JseHVablZ1WTNScGIyNGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENodlltb3BJSHNnY21WMGRYSnVJRzlpYWlBbUppQnZZbW91WDE5bGMwMXZaSFZzWlNBL0lHOWlhaUE2SUhzZ1pHVm1ZWFZzZERvZ2IySnFJSDA3SUgxY2JseHVablZ1WTNScGIyNGdYMk5zWVhOelEyRnNiRU5vWldOcktHbHVjM1JoYm1ObExDQkRiMjV6ZEhKMVkzUnZjaWtnZXlCcFppQW9JU2hwYm5OMFlXNWpaU0JwYm5OMFlXNWpaVzltSUVOdmJuTjBjblZqZEc5eUtTa2dleUIwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0Z3aVEyRnVibTkwSUdOaGJHd2dZU0JqYkdGemN5QmhjeUJoSUdaMWJtTjBhVzl1WENJcE95QjlJSDFjYmx4dVpuVnVZM1JwYjI0Z1kyRndhWFJoYkdsNlpTaHpkSEpwYm1jcElIdGNiaUFnY21WMGRYSnVJSE4wY21sdVp5NWphR0Z5UVhRb01Da3VkRzlWY0hCbGNrTmhjMlVvS1NBcklITjBjbWx1Wnk1emJHbGpaU2d4S1R0Y2JuMWNibHh1ZG1GeUlFeGhibWQxWVdkbFZYUnBiQ0E5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnWm5WdVkzUnBiMjRnVEdGdVozVmhaMlZWZEdsc0tHOXdkR2x2Ym5NcElIdGNiaUFnSUNCZlkyeGhjM05EWVd4c1EyaGxZMnNvZEdocGN5d2dUR0Z1WjNWaFoyVlZkR2xzS1R0Y2JseHVJQ0FnSUhSb2FYTXViM0IwYVc5dWN5QTlJRzl3ZEdsdmJuTTdYRzVjYmlBZ0lDQjBhR2x6TG5kb2FYUmxiR2x6ZENBOUlIUm9hWE11YjNCMGFXOXVjeTUzYUdsMFpXeHBjM1FnZkh3Z1ptRnNjMlU3WEc0Z0lDQWdkR2hwY3k1c2IyZG5aWElnUFNCZmJHOW5aMlZ5TWk1a1pXWmhkV3gwTG1OeVpXRjBaU2duYkdGdVozVmhaMlZWZEdsc2N5Y3BPMXh1SUNCOVhHNWNiaUFnVEdGdVozVmhaMlZWZEdsc0xuQnliM1J2ZEhsd1pTNW5aWFJUWTNKcGNIUlFZWEowUm5KdmJVTnZaR1VnUFNCbWRXNWpkR2x2YmlCblpYUlRZM0pwY0hSUVlYSjBSbkp2YlVOdlpHVW9ZMjlrWlNrZ2UxeHVJQ0FnSUdsbUlDZ2hZMjlrWlNCOGZDQmpiMlJsTG1sdVpHVjRUMllvSnkwbktTQThJREFwSUhKbGRIVnliaUJ1ZFd4c08xeHVYRzRnSUNBZ2RtRnlJSEFnUFNCamIyUmxMbk53YkdsMEtDY3RKeWs3WEc0Z0lDQWdhV1lnS0hBdWJHVnVaM1JvSUQwOVBTQXlLU0J5WlhSMWNtNGdiblZzYkR0Y2JpQWdJQ0J3TG5CdmNDZ3BPMXh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpMbVp2Y20xaGRFeGhibWQxWVdkbFEyOWtaU2h3TG1wdmFXNG9KeTBuS1NrN1hHNGdJSDA3WEc1Y2JpQWdUR0Z1WjNWaFoyVlZkR2xzTG5CeWIzUnZkSGx3WlM1blpYUk1ZVzVuZFdGblpWQmhjblJHY205dFEyOWtaU0E5SUdaMWJtTjBhVzl1SUdkbGRFeGhibWQxWVdkbFVHRnlkRVp5YjIxRGIyUmxLR052WkdVcElIdGNiaUFnSUNCcFppQW9JV052WkdVZ2ZId2dZMjlrWlM1cGJtUmxlRTltS0NjdEp5a2dQQ0F3S1NCeVpYUjFjbTRnWTI5a1pUdGNibHh1SUNBZ0lIWmhjaUJ3SUQwZ1kyOWtaUzV6Y0d4cGRDZ25MU2NwTzF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TG1admNtMWhkRXhoYm1kMVlXZGxRMjlrWlNod1d6QmRLVHRjYmlBZ2ZUdGNibHh1SUNCTVlXNW5kV0ZuWlZWMGFXd3VjSEp2ZEc5MGVYQmxMbVp2Y20xaGRFeGhibWQxWVdkbFEyOWtaU0E5SUdaMWJtTjBhVzl1SUdadmNtMWhkRXhoYm1kMVlXZGxRMjlrWlNoamIyUmxLU0I3WEc0Z0lDQWdMeThnYUhSMGNEb3ZMM2QzZHk1cFlXNWhMbTl5Wnk5aGMzTnBaMjV0Wlc1MGN5OXNZVzVuZFdGblpTMTBZV2R6TDJ4aGJtZDFZV2RsTFhSaFozTXVlR2gwYld4Y2JpQWdJQ0JwWmlBb2RIbHdaVzltSUdOdlpHVWdQVDA5SUNkemRISnBibWNuSUNZbUlHTnZaR1V1YVc1a1pYaFBaaWduTFNjcElENGdMVEVwSUh0Y2JpQWdJQ0FnSUhaaGNpQnpjR1ZqYVdGc1EyRnpaWE1nUFNCYkoyaGhibk1uTENBbmFHRnVkQ2NzSUNkc1lYUnVKeXdnSjJONWNtd25MQ0FuWTJGdWN5Y3NJQ2R0YjI1bkp5d2dKMkZ5WVdJblhUdGNiaUFnSUNBZ0lIWmhjaUJ3SUQwZ1kyOWtaUzV6Y0d4cGRDZ25MU2NwTzF4dVhHNGdJQ0FnSUNCcFppQW9kR2hwY3k1dmNIUnBiMjV6TG14dmQyVnlRMkZ6WlV4dVp5a2dlMXh1SUNBZ0lDQWdJQ0J3SUQwZ2NDNXRZWEFvWm5WdVkzUnBiMjRnS0hCaGNuUXBJSHRjYmlBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnY0dGeWRDNTBiMHh2ZDJWeVEyRnpaU2dwTzF4dUlDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lIMGdaV3h6WlNCcFppQW9jQzVzWlc1bmRHZ2dQVDA5SURJcElIdGNiaUFnSUNBZ0lDQWdjRnN3WFNBOUlIQmJNRjB1ZEc5TWIzZGxja05oYzJVb0tUdGNiaUFnSUNBZ0lDQWdjRnN4WFNBOUlIQmJNVjB1ZEc5VmNIQmxja05oYzJVb0tUdGNibHh1SUNBZ0lDQWdJQ0JwWmlBb2MzQmxZMmxoYkVOaGMyVnpMbWx1WkdWNFQyWW9jRnN4WFM1MGIweHZkMlZ5UTJGelpTZ3BLU0ErSUMweEtTQndXekZkSUQwZ1kyRndhWFJoYkdsNlpTaHdXekZkTG5SdlRHOTNaWEpEWVhObEtDa3BPMXh1SUNBZ0lDQWdmU0JsYkhObElHbG1JQ2h3TG14bGJtZDBhQ0E5UFQwZ015a2dlMXh1SUNBZ0lDQWdJQ0J3V3pCZElEMGdjRnN3WFM1MGIweHZkMlZ5UTJGelpTZ3BPMXh1WEc0Z0lDQWdJQ0FnSUM4dklHbG1JR3hsYm1kb2RDQXlJR2QxWlhOeklHbDBKM01nWVNCamIzVnVkSEo1WEc0Z0lDQWdJQ0FnSUdsbUlDaHdXekZkTG14bGJtZDBhQ0E5UFQwZ01pa2djRnN4WFNBOUlIQmJNVjB1ZEc5VmNIQmxja05oYzJVb0tUdGNiaUFnSUNBZ0lDQWdhV1lnS0hCYk1GMGdJVDA5SUNkeloyNG5JQ1ltSUhCYk1sMHViR1Z1WjNSb0lEMDlQU0F5S1NCd1d6SmRJRDBnY0ZzeVhTNTBiMVZ3Y0dWeVEyRnpaU2dwTzF4dVhHNGdJQ0FnSUNBZ0lHbG1JQ2h6Y0dWamFXRnNRMkZ6WlhNdWFXNWtaWGhQWmlod1d6RmRMblJ2VEc5M1pYSkRZWE5sS0NrcElENGdMVEVwSUhCYk1WMGdQU0JqWVhCcGRHRnNhWHBsS0hCYk1WMHVkRzlNYjNkbGNrTmhjMlVvS1NrN1hHNGdJQ0FnSUNBZ0lHbG1JQ2h6Y0dWamFXRnNRMkZ6WlhNdWFXNWtaWGhQWmlod1d6SmRMblJ2VEc5M1pYSkRZWE5sS0NrcElENGdMVEVwSUhCYk1sMGdQU0JqWVhCcGRHRnNhWHBsS0hCYk1sMHVkRzlNYjNkbGNrTmhjMlVvS1NrN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCd0xtcHZhVzRvSnkwbktUdGNiaUFnSUNCOVhHNWNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NXZjSFJwYjI1ekxtTnNaV0Z1UTI5a1pTQjhmQ0IwYUdsekxtOXdkR2x2Ym5NdWJHOTNaWEpEWVhObFRHNW5JRDhnWTI5a1pTNTBiMHh2ZDJWeVEyRnpaU2dwSURvZ1kyOWtaVHRjYmlBZ2ZUdGNibHh1SUNCTVlXNW5kV0ZuWlZWMGFXd3VjSEp2ZEc5MGVYQmxMbWx6VjJocGRHVnNhWE4wWldRZ1BTQm1kVzVqZEdsdmJpQnBjMWRvYVhSbGJHbHpkR1ZrS0dOdlpHVXBJSHRjYmlBZ0lDQnBaaUFvZEdocGN5NXZjSFJwYjI1ekxteHZZV1FnUFQwOUlDZHNZVzVuZFdGblpVOXViSGtuSUh4OElIUm9hWE11YjNCMGFXOXVjeTV1YjI1RmVIQnNhV05wZEZkb2FYUmxiR2x6ZENrZ2UxeHVJQ0FnSUNBZ1kyOWtaU0E5SUhSb2FYTXVaMlYwVEdGdVozVmhaMlZRWVhKMFJuSnZiVU52WkdVb1kyOWtaU2s3WEc0Z0lDQWdmVnh1SUNBZ0lISmxkSFZ5YmlBaGRHaHBjeTUzYUdsMFpXeHBjM1FnZkh3Z0lYUm9hWE11ZDJocGRHVnNhWE4wTG14bGJtZDBhQ0I4ZkNCMGFHbHpMbmRvYVhSbGJHbHpkQzVwYm1SbGVFOW1LR052WkdVcElENGdMVEU3WEc0Z0lIMDdYRzVjYmlBZ1RHRnVaM1ZoWjJWVmRHbHNMbkJ5YjNSdmRIbHdaUzVuWlhSR1lXeHNZbUZqYTBOdlpHVnpJRDBnWm5WdVkzUnBiMjRnWjJWMFJtRnNiR0poWTJ0RGIyUmxjeWhtWVd4c1ltRmphM01zSUdOdlpHVXBJSHRjYmlBZ0lDQnBaaUFvSVdaaGJHeGlZV05yY3lrZ2NtVjBkWEp1SUZ0ZE8xeHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ1ptRnNiR0poWTJ0eklEMDlQU0FuYzNSeWFXNW5KeWtnWm1Gc2JHSmhZMnR6SUQwZ1cyWmhiR3hpWVdOcmMxMDdYRzRnSUNBZ2FXWWdLRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVkRzlUZEhKcGJtY3VZWEJ3Ykhrb1ptRnNiR0poWTJ0ektTQTlQVDBnSjF0dlltcGxZM1FnUVhKeVlYbGRKeWtnY21WMGRYSnVJR1poYkd4aVlXTnJjenRjYmx4dUlDQWdJR2xtSUNnaFkyOWtaU2tnY21WMGRYSnVJR1poYkd4aVlXTnJjeTVrWldaaGRXeDBJSHg4SUZ0ZE8xeHVYRzRnSUNBZ0x5OGdZWE4xYldVZ2QyVWdhR0YyWlNCaGJpQnZZbXBsWTNRZ1pHVm1hVzVwYm1jZ1ptRnNiR0poWTJ0elhHNGdJQ0FnZG1GeUlHWnZkVzVrSUQwZ1ptRnNiR0poWTJ0elcyTnZaR1ZkTzF4dUlDQWdJR2xtSUNnaFptOTFibVFwSUdadmRXNWtJRDBnWm1Gc2JHSmhZMnR6VzNSb2FYTXVaMlYwVTJOeWFYQjBVR0Z5ZEVaeWIyMURiMlJsS0dOdlpHVXBYVHRjYmlBZ0lDQnBaaUFvSVdadmRXNWtLU0JtYjNWdVpDQTlJR1poYkd4aVlXTnJjMXQwYUdsekxtWnZjbTFoZEV4aGJtZDFZV2RsUTI5a1pTaGpiMlJsS1YwN1hHNGdJQ0FnYVdZZ0tDRm1iM1Z1WkNrZ1ptOTFibVFnUFNCbVlXeHNZbUZqYTNNdVpHVm1ZWFZzZER0Y2JseHVJQ0FnSUhKbGRIVnliaUJtYjNWdVpDQjhmQ0JiWFR0Y2JpQWdmVHRjYmx4dUlDQk1ZVzVuZFdGblpWVjBhV3d1Y0hKdmRHOTBlWEJsTG5SdlVtVnpiMngyWlVocFpYSmhjbU5vZVNBOUlHWjFibU4wYVc5dUlIUnZVbVZ6YjJ4MlpVaHBaWEpoY21Ob2VTaGpiMlJsTENCbVlXeHNZbUZqYTBOdlpHVXBJSHRjYmlBZ0lDQjJZWElnWDNSb2FYTWdQU0IwYUdsek8xeHVYRzRnSUNBZ2RtRnlJR1poYkd4aVlXTnJRMjlrWlhNZ1BTQjBhR2x6TG1kbGRFWmhiR3hpWVdOclEyOWtaWE1vWm1Gc2JHSmhZMnREYjJSbElIeDhJSFJvYVhNdWIzQjBhVzl1Y3k1bVlXeHNZbUZqYTB4dVp5QjhmQ0JiWFN3Z1kyOWtaU2s3WEc1Y2JpQWdJQ0IyWVhJZ1kyOWtaWE1nUFNCYlhUdGNiaUFnSUNCMllYSWdZV1JrUTI5a1pTQTlJR1oxYm1OMGFXOXVJR0ZrWkVOdlpHVW9ZeWtnZTF4dUlDQWdJQ0FnYVdZZ0tDRmpLU0J5WlhSMWNtNDdYRzRnSUNBZ0lDQnBaaUFvWDNSb2FYTXVhWE5YYUdsMFpXeHBjM1JsWkNoaktTa2dlMXh1SUNBZ0lDQWdJQ0JqYjJSbGN5NXdkWE5vS0dNcE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ1gzUm9hWE11Ykc5bloyVnlMbmRoY200b0ozSmxhbVZqZEdsdVp5QnViMjR0ZDJocGRHVnNhWE4wWldRZ2JHRnVaM1ZoWjJVZ1kyOWtaVG9nSnlBcklHTXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMDdYRzVjYmlBZ0lDQnBaaUFvZEhsd1pXOW1JR052WkdVZ1BUMDlJQ2R6ZEhKcGJtY25JQ1ltSUdOdlpHVXVhVzVrWlhoUFppZ25MU2NwSUQ0Z0xURXBJSHRjYmlBZ0lDQWdJR2xtSUNoMGFHbHpMbTl3ZEdsdmJuTXViRzloWkNBaFBUMGdKMnhoYm1kMVlXZGxUMjVzZVNjcElHRmtaRU52WkdVb2RHaHBjeTVtYjNKdFlYUk1ZVzVuZFdGblpVTnZaR1VvWTI5a1pTa3BPMXh1SUNBZ0lDQWdhV1lnS0hSb2FYTXViM0IwYVc5dWN5NXNiMkZrSUNFOVBTQW5iR0Z1WjNWaFoyVlBibXg1SnlBbUppQjBhR2x6TG05d2RHbHZibk11Ykc5aFpDQWhQVDBnSjJOMWNuSmxiblJQYm14NUp5a2dZV1JrUTI5a1pTaDBhR2x6TG1kbGRGTmpjbWx3ZEZCaGNuUkdjbTl0UTI5a1pTaGpiMlJsS1NrN1hHNGdJQ0FnSUNCcFppQW9kR2hwY3k1dmNIUnBiMjV6TG14dllXUWdJVDA5SUNkamRYSnlaVzUwVDI1c2VTY3BJR0ZrWkVOdlpHVW9kR2hwY3k1blpYUk1ZVzVuZFdGblpWQmhjblJHY205dFEyOWtaU2hqYjJSbEtTazdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaDBlWEJsYjJZZ1kyOWtaU0E5UFQwZ0ozTjBjbWx1WnljcElIdGNiaUFnSUNBZ0lHRmtaRU52WkdVb2RHaHBjeTVtYjNKdFlYUk1ZVzVuZFdGblpVTnZaR1VvWTI5a1pTa3BPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHWmhiR3hpWVdOclEyOWtaWE11Wm05eVJXRmphQ2htZFc1amRHbHZiaUFvWm1NcElIdGNiaUFnSUNBZ0lHbG1JQ2hqYjJSbGN5NXBibVJsZUU5bUtHWmpLU0E4SURBcElHRmtaRU52WkdVb1gzUm9hWE11Wm05eWJXRjBUR0Z1WjNWaFoyVkRiMlJsS0daaktTazdYRzRnSUNBZ2ZTazdYRzVjYmlBZ0lDQnlaWFIxY200Z1kyOWtaWE03WEc0Z0lIMDdYRzVjYmlBZ2NtVjBkWEp1SUV4aGJtZDFZV2RsVlhScGJEdGNibjBvS1R0Y2JseHVaWGh3YjNKMGN5NWtaV1poZFd4MElEMGdUR0Z1WjNWaFoyVlZkR2xzT3lJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRndpWDE5bGMwMXZaSFZzWlZ3aUxDQjdYRzRnSUhaaGJIVmxPaUIwY25WbFhHNTlLVHRjYmx4dWRtRnlJRjlzYjJkblpYSWdQU0J5WlhGMWFYSmxLQ2N1TDJ4dloyZGxjaTVxY3ljcE8xeHVYRzUyWVhJZ1gyeHZaMmRsY2pJZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5c2IyZG5aWElwTzF4dVhHNW1kVzVqZEdsdmJpQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0c5aWFpa2dleUJ5WlhSMWNtNGdiMkpxSUNZbUlHOWlhaTVmWDJWelRXOWtkV3hsSUQ4Z2IySnFJRG9nZXlCa1pXWmhkV3gwT2lCdlltb2dmVHNnZlZ4dVhHNW1kVzVqZEdsdmJpQmZZMnhoYzNORFlXeHNRMmhsWTJzb2FXNXpkR0Z1WTJVc0lFTnZibk4wY25WamRHOXlLU0I3SUdsbUlDZ2hLR2x1YzNSaGJtTmxJR2x1YzNSaGJtTmxiMllnUTI5dWMzUnlkV04wYjNJcEtTQjdJSFJvY205M0lHNWxkeUJVZVhCbFJYSnliM0lvWENKRFlXNXViM1FnWTJGc2JDQmhJR05zWVhOeklHRnpJR0VnWm5WdVkzUnBiMjVjSWlrN0lIMGdmVnh1WEc0dkx5QmtaV1pwYm1sMGFXOXVJR2gwZEhBNkx5OTBjbUZ1YzJ4aGRHVXVjMjkxY21ObFptOXlaMlV1Ym1WMEwzZHBhMmt2YkRFd2JpOXdiSFZ5WVd4bWIzSnRjMXh1THlvZ1pYTnNhVzUwTFdScGMyRmliR1VnS2k5Y2JuWmhjaUJ6WlhSeklEMGdXM3NnYkc1bmN6b2dXeWRoWTJnbkxDQW5ZV3NuTENBbllXMG5MQ0FuWVhKdUp5d2dKMkp5Snl3Z0oyWnBiQ2NzSUNkbmRXNG5MQ0FuYkc0bkxDQW5iV1psSnl3Z0oyMW5KeXdnSjIxcEp5d2dKMjlqSnl3Z0ozQjBKeXdnSjNCMExVSlNKeXdnSjNSbkp5d2dKM1JwSnl3Z0ozUnlKeXdnSjNWNkp5d2dKM2RoSjEwc0lHNXlPaUJiTVN3Z01sMHNJR1pqT2lBeElIMHNJSHNnYkc1bmN6b2dXeWRoWmljc0lDZGhiaWNzSUNkaGMzUW5MQ0FuWVhvbkxDQW5ZbWNuTENBblltNG5MQ0FuWTJFbkxDQW5aR0VuTENBblpHVW5MQ0FuWkdWMkp5d2dKMlZzSnl3Z0oyVnVKeXdnSjJWdkp5d2dKMlZ6Snl3Z0oyVjBKeXdnSjJWMUp5d2dKMlpwSnl3Z0oyWnZKeXdnSjJaMWNpY3NJQ2RtZVNjc0lDZG5iQ2NzSUNkbmRTY3NJQ2RvWVNjc0lDZG9aU2NzSUNkb2FTY3NJQ2RvZFNjc0lDZG9lU2NzSUNkcFlTY3NJQ2RwZENjc0lDZHJiaWNzSUNkcmRTY3NJQ2RzWWljc0lDZHRZV2tuTENBbmJXd25MQ0FuYlc0bkxDQW5iWEluTENBbmJtRm9KeXdnSjI1aGNDY3NJQ2R1WWljc0lDZHVaU2NzSUNkdWJDY3NJQ2R1Ymljc0lDZHVieWNzSUNkdWMyOG5MQ0FuY0dFbkxDQW5jR0Z3Snl3Z0ozQnRjeWNzSUNkd2N5Y3NJQ2R3ZEMxUVZDY3NJQ2R5YlNjc0lDZHpZMjhuTENBbmMyVW5MQ0FuYzJrbkxDQW5jMjhuTENBbmMyOXVKeXdnSjNOeEp5d2dKM04ySnl3Z0ozTjNKeXdnSjNSaEp5d2dKM1JsSnl3Z0ozUnJKeXdnSjNWeUp5d2dKM2x2SjEwc0lHNXlPaUJiTVN3Z01sMHNJR1pqT2lBeUlIMHNJSHNnYkc1bmN6b2dXeWRoZVNjc0lDZGlieWNzSUNkaloyY25MQ0FuWm1FbkxDQW5hV1FuTENBbmFtRW5MQ0FuYW1Kdkp5d2dKMnRoSnl3Z0oydHJKeXdnSjJ0dEp5d2dKMnR2Snl3Z0oydDVKeXdnSjJ4dkp5d2dKMjF6Snl3Z0ozTmhhQ2NzSUNkemRTY3NJQ2QwYUNjc0lDZDBkQ2NzSUNkMVp5Y3NJQ2QyYVNjc0lDZDNieWNzSUNkNmFDZGRMQ0J1Y2pvZ1d6RmRMQ0JtWXpvZ015QjlMQ0I3SUd4dVozTTZJRnNuWW1VbkxDQW5Zbk1uTENBblpIb25MQ0FuYUhJbkxDQW5jblVuTENBbmMzSW5MQ0FuZFdzblhTd2dibkk2SUZzeExDQXlMQ0ExWFN3Z1ptTTZJRFFnZlN3Z2V5QnNibWR6T2lCYkoyRnlKMTBzSUc1eU9pQmJNQ3dnTVN3Z01pd2dNeXdnTVRFc0lERXdNRjBzSUdaak9pQTFJSDBzSUhzZ2JHNW5jem9nV3lkamN5Y3NJQ2R6YXlkZExDQnVjam9nV3pFc0lESXNJRFZkTENCbVl6b2dOaUI5TENCN0lHeHVaM002SUZzblkzTmlKeXdnSjNCc0oxMHNJRzV5T2lCYk1Td2dNaXdnTlYwc0lHWmpPaUEzSUgwc0lIc2diRzVuY3pvZ1d5ZGplU2RkTENCdWNqb2dXekVzSURJc0lETXNJRGhkTENCbVl6b2dPQ0I5TENCN0lHeHVaM002SUZzblpuSW5YU3dnYm5JNklGc3hMQ0F5WFN3Z1ptTTZJRGtnZlN3Z2V5QnNibWR6T2lCYkoyZGhKMTBzSUc1eU9pQmJNU3dnTWl3Z015d2dOeXdnTVRGZExDQm1Zem9nTVRBZ2ZTd2dleUJzYm1kek9pQmJKMmRrSjEwc0lHNXlPaUJiTVN3Z01pd2dNeXdnTWpCZExDQm1Zem9nTVRFZ2ZTd2dleUJzYm1kek9pQmJKMmx6SjEwc0lHNXlPaUJiTVN3Z01sMHNJR1pqT2lBeE1pQjlMQ0I3SUd4dVozTTZJRnNuYW5ZblhTd2dibkk2SUZzd0xDQXhYU3dnWm1NNklERXpJSDBzSUhzZ2JHNW5jem9nV3lkcmR5ZGRMQ0J1Y2pvZ1d6RXNJRElzSURNc0lEUmRMQ0JtWXpvZ01UUWdmU3dnZXlCc2JtZHpPaUJiSjJ4MEoxMHNJRzV5T2lCYk1Td2dNaXdnTVRCZExDQm1Zem9nTVRVZ2ZTd2dleUJzYm1kek9pQmJKMngySjEwc0lHNXlPaUJiTVN3Z01pd2dNRjBzSUdaak9pQXhOaUI5TENCN0lHeHVaM002SUZzbmJXc25YU3dnYm5JNklGc3hMQ0F5WFN3Z1ptTTZJREUzSUgwc0lIc2diRzVuY3pvZ1d5ZHRibXNuWFN3Z2JuSTZJRnN3TENBeExDQXlYU3dnWm1NNklERTRJSDBzSUhzZ2JHNW5jem9nV3lkdGRDZGRMQ0J1Y2pvZ1d6RXNJRElzSURFeExDQXlNRjBzSUdaak9pQXhPU0I5TENCN0lHeHVaM002SUZzbmIzSW5YU3dnYm5JNklGc3lMQ0F4WFN3Z1ptTTZJRElnZlN3Z2V5QnNibWR6T2lCYkozSnZKMTBzSUc1eU9pQmJNU3dnTWl3Z01qQmRMQ0JtWXpvZ01qQWdmU3dnZXlCc2JtZHpPaUJiSjNOc0oxMHNJRzV5T2lCYk5Td2dNU3dnTWl3Z00xMHNJR1pqT2lBeU1TQjlYVHRjYmx4dWRtRnlJRjl5ZFd4bGMxQnNkWEpoYkhOVWVYQmxjeUE5SUh0Y2JpQWdNVG9nWm5WdVkzUnBiMjRnWHlodUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUU1MWJXSmxjaWh1SUQ0Z01TazdYRzRnSUgwc1hHNGdJREk2SUdaMWJtTjBhVzl1SUY4b2Jpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCT2RXMWlaWElvYmlBaFBTQXhLVHRjYmlBZ2ZTeGNiaUFnTXpvZ1puVnVZM1JwYjI0Z1h5aHVLU0I3WEc0Z0lDQWdjbVYwZFhKdUlEQTdYRzRnSUgwc1hHNGdJRFE2SUdaMWJtTjBhVzl1SUY4b2Jpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCT2RXMWlaWElvYmlBbElERXdJRDA5SURFZ0ppWWdiaUFsSURFd01DQWhQU0F4TVNBL0lEQWdPaUJ1SUNVZ01UQWdQajBnTWlBbUppQnVJQ1VnTVRBZ1BEMGdOQ0FtSmlBb2JpQWxJREV3TUNBOElERXdJSHg4SUc0Z0pTQXhNREFnUGowZ01qQXBJRDhnTVNBNklESXBPMXh1SUNCOUxGeHVJQ0ExT2lCbWRXNWpkR2x2YmlCZktHNHBJSHRjYmlBZ0lDQnlaWFIxY200Z1RuVnRZbVZ5S0c0Z1BUMDlJREFnUHlBd0lEb2diaUE5UFNBeElEOGdNU0E2SUc0Z1BUMGdNaUEvSURJZ09pQnVJQ1VnTVRBd0lENDlJRE1nSmlZZ2JpQWxJREV3TUNBOFBTQXhNQ0EvSURNZ09pQnVJQ1VnTVRBd0lENDlJREV4SUQ4Z05DQTZJRFVwTzF4dUlDQjlMRnh1SUNBMk9pQm1kVzVqZEdsdmJpQmZLRzRwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdUblZ0WW1WeUtHNGdQVDBnTVNBL0lEQWdPaUJ1SUQ0OUlESWdKaVlnYmlBOFBTQTBJRDhnTVNBNklESXBPMXh1SUNCOUxGeHVJQ0EzT2lCbWRXNWpkR2x2YmlCZktHNHBJSHRjYmlBZ0lDQnlaWFIxY200Z1RuVnRZbVZ5S0c0Z1BUMGdNU0EvSURBZ09pQnVJQ1VnTVRBZ1BqMGdNaUFtSmlCdUlDVWdNVEFnUEQwZ05DQW1KaUFvYmlBbElERXdNQ0E4SURFd0lIeDhJRzRnSlNBeE1EQWdQajBnTWpBcElEOGdNU0E2SURJcE8xeHVJQ0I5TEZ4dUlDQTRPaUJtZFc1amRHbHZiaUJmS0c0cElIdGNiaUFnSUNCeVpYUjFjbTRnVG5WdFltVnlLRzRnUFQwZ01TQS9JREFnT2lCdUlEMDlJRElnUHlBeElEb2diaUFoUFNBNElDWW1JRzRnSVQwZ01URWdQeUF5SURvZ015azdYRzRnSUgwc1hHNGdJRGs2SUdaMWJtTjBhVzl1SUY4b2Jpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCT2RXMWlaWElvYmlBK1BTQXlLVHRjYmlBZ2ZTeGNiaUFnTVRBNklHWjFibU4wYVc5dUlGOG9iaWtnZTF4dUlDQWdJSEpsZEhWeWJpQk9kVzFpWlhJb2JpQTlQU0F4SUQ4Z01DQTZJRzRnUFQwZ01pQS9JREVnT2lCdUlEd2dOeUEvSURJZ09pQnVJRHdnTVRFZ1B5QXpJRG9nTkNrN1hHNGdJSDBzWEc0Z0lERXhPaUJtZFc1amRHbHZiaUJmS0c0cElIdGNiaUFnSUNCeVpYUjFjbTRnVG5WdFltVnlLRzRnUFQwZ01TQjhmQ0J1SUQwOUlERXhJRDhnTUNBNklHNGdQVDBnTWlCOGZDQnVJRDA5SURFeUlEOGdNU0E2SUc0Z1BpQXlJQ1ltSUc0Z1BDQXlNQ0EvSURJZ09pQXpLVHRjYmlBZ2ZTeGNiaUFnTVRJNklHWjFibU4wYVc5dUlGOG9iaWtnZTF4dUlDQWdJSEpsZEhWeWJpQk9kVzFpWlhJb2JpQWxJREV3SUNFOUlERWdmSHdnYmlBbElERXdNQ0E5UFNBeE1TazdYRzRnSUgwc1hHNGdJREV6T2lCbWRXNWpkR2x2YmlCZktHNHBJSHRjYmlBZ0lDQnlaWFIxY200Z1RuVnRZbVZ5S0c0Z0lUMDlJREFwTzF4dUlDQjlMRnh1SUNBeE5Eb2dablZ1WTNScGIyNGdYeWh1S1NCN1hHNGdJQ0FnY21WMGRYSnVJRTUxYldKbGNpaHVJRDA5SURFZ1B5QXdJRG9nYmlBOVBTQXlJRDhnTVNBNklHNGdQVDBnTXlBL0lESWdPaUF6S1R0Y2JpQWdmU3hjYmlBZ01UVTZJR1oxYm1OMGFXOXVJRjhvYmlrZ2UxeHVJQ0FnSUhKbGRIVnliaUJPZFcxaVpYSW9iaUFsSURFd0lEMDlJREVnSmlZZ2JpQWxJREV3TUNBaFBTQXhNU0EvSURBZ09pQnVJQ1VnTVRBZ1BqMGdNaUFtSmlBb2JpQWxJREV3TUNBOElERXdJSHg4SUc0Z0pTQXhNREFnUGowZ01qQXBJRDhnTVNBNklESXBPMXh1SUNCOUxGeHVJQ0F4TmpvZ1puVnVZM1JwYjI0Z1h5aHVLU0I3WEc0Z0lDQWdjbVYwZFhKdUlFNTFiV0psY2lodUlDVWdNVEFnUFQwZ01TQW1KaUJ1SUNVZ01UQXdJQ0U5SURFeElEOGdNQ0E2SUc0Z0lUMDlJREFnUHlBeElEb2dNaWs3WEc0Z0lIMHNYRzRnSURFM09pQm1kVzVqZEdsdmJpQmZLRzRwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdUblZ0WW1WeUtHNGdQVDBnTVNCOGZDQnVJQ1VnTVRBZ1BUMGdNU0EvSURBZ09pQXhLVHRjYmlBZ2ZTeGNiaUFnTVRnNklHWjFibU4wYVc5dUlGOG9iaWtnZTF4dUlDQWdJSEpsZEhWeWJpQk9kVzFpWlhJb2JpQTlQU0F3SUQ4Z01DQTZJRzRnUFQwZ01TQS9JREVnT2lBeUtUdGNiaUFnZlN4Y2JpQWdNVGs2SUdaMWJtTjBhVzl1SUY4b2Jpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCT2RXMWlaWElvYmlBOVBTQXhJRDhnTUNBNklHNGdQVDA5SURBZ2ZId2diaUFsSURFd01DQStJREVnSmlZZ2JpQWxJREV3TUNBOElERXhJRDhnTVNBNklHNGdKU0F4TURBZ1BpQXhNQ0FtSmlCdUlDVWdNVEF3SUR3Z01qQWdQeUF5SURvZ015azdYRzRnSUgwc1hHNGdJREl3T2lCbWRXNWpkR2x2YmlCZktHNHBJSHRjYmlBZ0lDQnlaWFIxY200Z1RuVnRZbVZ5S0c0Z1BUMGdNU0EvSURBZ09pQnVJRDA5UFNBd0lIeDhJRzRnSlNBeE1EQWdQaUF3SUNZbUlHNGdKU0F4TURBZ1BDQXlNQ0EvSURFZ09pQXlLVHRjYmlBZ2ZTeGNiaUFnTWpFNklHWjFibU4wYVc5dUlGOG9iaWtnZTF4dUlDQWdJSEpsZEhWeWJpQk9kVzFpWlhJb2JpQWxJREV3TUNBOVBTQXhJRDhnTVNBNklHNGdKU0F4TURBZ1BUMGdNaUEvSURJZ09pQnVJQ1VnTVRBd0lEMDlJRE1nZkh3Z2JpQWxJREV3TUNBOVBTQTBJRDhnTXlBNklEQXBPMXh1SUNCOVhHNTlPMXh1THlvZ1pYTnNhVzUwTFdWdVlXSnNaU0FxTDF4dVhHNW1kVzVqZEdsdmJpQmpjbVZoZEdWU2RXeGxjeWdwSUh0Y2JpQWdkbUZ5SUhKMWJHVnpJRDBnZTMwN1hHNGdJSE5sZEhNdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlBb2MyVjBLU0I3WEc0Z0lDQWdjMlYwTG14dVozTXVabTl5UldGamFDaG1kVzVqZEdsdmJpQW9iQ2tnZTF4dUlDQWdJQ0FnY25Wc1pYTmJiRjBnUFNCN1hHNGdJQ0FnSUNBZ0lHNTFiV0psY25NNklITmxkQzV1Y2l4Y2JpQWdJQ0FnSUNBZ2NHeDFjbUZzY3pvZ1gzSjFiR1Z6VUd4MWNtRnNjMVI1Y0dWelczTmxkQzVtWTExY2JpQWdJQ0FnSUgwN1hHNGdJQ0FnZlNrN1hHNGdJSDBwTzF4dUlDQnlaWFIxY200Z2NuVnNaWE03WEc1OVhHNWNiblpoY2lCUWJIVnlZV3hTWlhOdmJIWmxjaUE5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnWm5WdVkzUnBiMjRnVUd4MWNtRnNVbVZ6YjJ4MlpYSW9iR0Z1WjNWaFoyVlZkR2xzY3lrZ2UxeHVJQ0FnSUhaaGNpQnZjSFJwYjI1eklEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQStJREVnSmlZZ1lYSm5kVzFsYm5Seld6RmRJQ0U5UFNCMWJtUmxabWx1WldRZ1B5QmhjbWQxYldWdWRITmJNVjBnT2lCN2ZUdGNibHh1SUNBZ0lGOWpiR0Z6YzBOaGJHeERhR1ZqYXloMGFHbHpMQ0JRYkhWeVlXeFNaWE52YkhabGNpazdYRzVjYmlBZ0lDQjBhR2x6TG14aGJtZDFZV2RsVlhScGJITWdQU0JzWVc1bmRXRm5aVlYwYVd4ek8xeHVJQ0FnSUhSb2FYTXViM0IwYVc5dWN5QTlJRzl3ZEdsdmJuTTdYRzVjYmlBZ0lDQjBhR2x6TG14dloyZGxjaUE5SUY5c2IyZG5aWEl5TG1SbFptRjFiSFF1WTNKbFlYUmxLQ2R3YkhWeVlXeFNaWE52YkhabGNpY3BPMXh1WEc0Z0lDQWdkR2hwY3k1eWRXeGxjeUE5SUdOeVpXRjBaVkoxYkdWektDazdYRzRnSUgxY2JseHVJQ0JRYkhWeVlXeFNaWE52YkhabGNpNXdjbTkwYjNSNWNHVXVZV1JrVW5Wc1pTQTlJR1oxYm1OMGFXOXVJR0ZrWkZKMWJHVW9iRzVuTENCdlltb3BJSHRjYmlBZ0lDQjBhR2x6TG5KMWJHVnpXMnh1WjEwZ1BTQnZZbW83WEc0Z0lIMDdYRzVjYmlBZ1VHeDFjbUZzVW1WemIyeDJaWEl1Y0hKdmRHOTBlWEJsTG1kbGRGSjFiR1VnUFNCbWRXNWpkR2x2YmlCblpYUlNkV3hsS0dOdlpHVXBJSHRjYmlBZ0lDQnlaWFIxY200Z2RHaHBjeTV5ZFd4bGMxdGpiMlJsWFNCOGZDQjBhR2x6TG5KMWJHVnpXM1JvYVhNdWJHRnVaM1ZoWjJWVmRHbHNjeTVuWlhSTVlXNW5kV0ZuWlZCaGNuUkdjbTl0UTI5a1pTaGpiMlJsS1YwN1hHNGdJSDA3WEc1Y2JpQWdVR3gxY21Gc1VtVnpiMngyWlhJdWNISnZkRzkwZVhCbExtNWxaV1J6VUd4MWNtRnNJRDBnWm5WdVkzUnBiMjRnYm1WbFpITlFiSFZ5WVd3b1kyOWtaU2tnZTF4dUlDQWdJSFpoY2lCeWRXeGxJRDBnZEdocGN5NW5aWFJTZFd4bEtHTnZaR1VwTzF4dVhHNGdJQ0FnY21WMGRYSnVJSEoxYkdVZ0ppWWdjblZzWlM1dWRXMWlaWEp6TG14bGJtZDBhQ0ErSURFN1hHNGdJSDA3WEc1Y2JpQWdVR3gxY21Gc1VtVnpiMngyWlhJdWNISnZkRzkwZVhCbExtZGxkRkJzZFhKaGJFWnZjbTF6VDJaTFpYa2dQU0JtZFc1amRHbHZiaUJuWlhSUWJIVnlZV3hHYjNKdGMwOW1TMlY1S0dOdlpHVXNJR3RsZVNrZ2UxeHVJQ0FnSUhaaGNpQmZkR2hwY3lBOUlIUm9hWE03WEc1Y2JpQWdJQ0IyWVhJZ2NtVjBJRDBnVzEwN1hHNWNiaUFnSUNCMllYSWdjblZzWlNBOUlIUm9hWE11WjJWMFVuVnNaU2hqYjJSbEtUdGNibHh1SUNBZ0lISjFiR1V1Ym5WdFltVnljeTVtYjNKRllXTm9LR1oxYm1OMGFXOXVJQ2h1S1NCN1hHNGdJQ0FnSUNCMllYSWdjM1ZtWm1sNElEMGdYM1JvYVhNdVoyVjBVM1ZtWm1sNEtHTnZaR1VzSUc0cE8xeHVJQ0FnSUNBZ2NtVjBMbkIxYzJnb0p5Y2dLeUJyWlhrZ0t5QnpkV1ptYVhncE8xeHVJQ0FnSUgwcE8xeHVYRzRnSUNBZ2NtVjBkWEp1SUhKbGREdGNiaUFnZlR0Y2JseHVJQ0JRYkhWeVlXeFNaWE52YkhabGNpNXdjbTkwYjNSNWNHVXVaMlYwVTNWbVptbDRJRDBnWm5WdVkzUnBiMjRnWjJWMFUzVm1abWw0S0dOdlpHVXNJR052ZFc1MEtTQjdYRzRnSUNBZ2RtRnlJRjkwYUdsek1pQTlJSFJvYVhNN1hHNWNiaUFnSUNCMllYSWdjblZzWlNBOUlIUm9hWE11WjJWMFVuVnNaU2hqYjJSbEtUdGNibHh1SUNBZ0lHbG1JQ2h5ZFd4bEtTQjdYRzRnSUNBZ0lDQXZMeUJwWmlBb2NuVnNaUzV1ZFcxaVpYSnpMbXhsYm1kMGFDQTlQVDBnTVNrZ2NtVjBkWEp1SUNjbk95QXZMeUJ2Ym14NUlITnBibWQxYkdGeVhHNWNiaUFnSUNBZ0lIWmhjaUJwWkhnZ1BTQnlkV3hsTG01dlFXSnpJRDhnY25Wc1pTNXdiSFZ5WVd4ektHTnZkVzUwS1NBNklISjFiR1V1Y0d4MWNtRnNjeWhOWVhSb0xtRmljeWhqYjNWdWRDa3BPMXh1SUNBZ0lDQWdkbUZ5SUhOMVptWnBlQ0E5SUhKMWJHVXViblZ0WW1WeWMxdHBaSGhkTzF4dVhHNGdJQ0FnSUNBdkx5QnpjR1ZqYVdGc0lIUnlaV0YwYldWdWRDQm1iM0lnYkc1bmN5QnZibXg1SUdoaGRtbHVaeUJ6YVc1bmRXeGhjaUJoYm1RZ2NHeDFjbUZzWEc0Z0lDQWdJQ0JwWmlBb2RHaHBjeTV2Y0hScGIyNXpMbk5wYlhCc2FXWjVVR3gxY21Gc1UzVm1abWw0SUNZbUlISjFiR1V1Ym5WdFltVnljeTVzWlc1bmRHZ2dQVDA5SURJZ0ppWWdjblZzWlM1dWRXMWlaWEp6V3pCZElEMDlQU0F4S1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2h6ZFdabWFYZ2dQVDA5SURJcElIdGNiaUFnSUNBZ0lDQWdJQ0J6ZFdabWFYZ2dQU0FuY0d4MWNtRnNKenRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoemRXWm1hWGdnUFQwOUlERXBJSHRjYmlBZ0lDQWdJQ0FnSUNCemRXWm1hWGdnUFNBbkp6dGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0IyWVhJZ2NtVjBkWEp1VTNWbVptbDRJRDBnWm5WdVkzUnBiMjRnY21WMGRYSnVVM1ZtWm1sNEtDa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdYM1JvYVhNeUxtOXdkR2x2Ym5NdWNISmxjR1Z1WkNBbUppQnpkV1ptYVhndWRHOVRkSEpwYm1jb0tTQS9JRjkwYUdsek1pNXZjSFJwYjI1ekxuQnlaWEJsYm1RZ0t5QnpkV1ptYVhndWRHOVRkSEpwYm1jb0tTQTZJSE4xWm1acGVDNTBiMU4wY21sdVp5Z3BPMXh1SUNBZ0lDQWdmVHRjYmx4dUlDQWdJQ0FnTHk4Z1EwOU5VRUZVU1VKSlRFbFVXU0JLVTA5T1hHNGdJQ0FnSUNBdkx5QjJNVnh1SUNBZ0lDQWdhV1lnS0hSb2FYTXViM0IwYVc5dWN5NWpiMjF3WVhScFltbHNhWFI1U2xOUFRpQTlQVDBnSjNZeEp5a2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb2MzVm1abWw0SUQwOVBTQXhLU0J5WlhSMWNtNGdKeWM3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBlWEJsYjJZZ2MzVm1abWw0SUQwOVBTQW5iblZ0WW1WeUp5a2djbVYwZFhKdUlDZGZjR3gxY21Gc1h5Y2dLeUJ6ZFdabWFYZ3VkRzlUZEhKcGJtY29LVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSEpsZEhWeWJsTjFabVpwZUNncE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDZ2dMeW9nZGpJZ0tpOTBhR2x6TG05d2RHbHZibk11WTI5dGNHRjBhV0pwYkdsMGVVcFRUMDRnUFQwOUlDZDJNaWNnZkh3Z2NuVnNaUzV1ZFcxaVpYSnpMbXhsYm1kMGFDQTlQVDBnTWlBbUppQnlkV3hsTG01MWJXSmxjbk5iTUYwZ1BUMDlJREVwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhKbGRIVnlibE4xWm1acGVDZ3BPMXh1SUNBZ0lDQWdmU0JsYkhObElHbG1JQ2dnTHlvZ2RqTWdMU0JuWlhSMFpYaDBJR2x1WkdWNElDb3ZjblZzWlM1dWRXMWlaWEp6TG14bGJtZDBhQ0E5UFQwZ01pQW1KaUJ5ZFd4bExtNTFiV0psY25OYk1GMGdQVDA5SURFcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlISmxkSFZ5YmxOMVptWnBlQ2dwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdWIzQjBhVzl1Y3k1d2NtVndaVzVrSUNZbUlHbGtlQzUwYjFOMGNtbHVaeWdwSUQ4Z2RHaHBjeTV2Y0hScGIyNXpMbkJ5WlhCbGJtUWdLeUJwWkhndWRHOVRkSEpwYm1jb0tTQTZJR2xrZUM1MGIxTjBjbWx1WnlncE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhSb2FYTXViRzluWjJWeUxuZGhjbTRvSjI1dklIQnNkWEpoYkNCeWRXeGxJR1p2ZFc1a0lHWnZjam9nSnlBcklHTnZaR1VwTzF4dUlDQWdJSEpsZEhWeWJpQW5KenRjYmlBZ2ZUdGNibHh1SUNCeVpYUjFjbTRnVUd4MWNtRnNVbVZ6YjJ4MlpYSTdYRzU5S0NrN1hHNWNibVY0Y0c5eWRITXVaR1ZtWVhWc2RDQTlJRkJzZFhKaGJGSmxjMjlzZG1WeU95SXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUZ3aVgxOWxjMDF2WkhWc1pWd2lMQ0I3WEc0Z0lIWmhiSFZsT2lCMGNuVmxYRzU5S1R0Y2JseHVkbUZ5SUY5bGVIUmxibVJ6SUQwZ1QySnFaV04wTG1GemMybG5iaUI4ZkNCbWRXNWpkR2x2YmlBb2RHRnlaMlYwS1NCN0lHWnZjaUFvZG1GeUlHa2dQU0F4T3lCcElEd2dZWEpuZFcxbGJuUnpMbXhsYm1kMGFEc2dhU3NyS1NCN0lIWmhjaUJ6YjNWeVkyVWdQU0JoY21kMWJXVnVkSE5iYVYwN0lHWnZjaUFvZG1GeUlHdGxlU0JwYmlCemIzVnlZMlVwSUhzZ2FXWWdLRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2h6YjNWeVkyVXNJR3RsZVNrcElIc2dkR0Z5WjJWMFcydGxlVjBnUFNCemIzVnlZMlZiYTJWNVhUc2dmU0I5SUgwZ2NtVjBkWEp1SUhSaGNtZGxkRHNnZlR0Y2JseHVkbUZ5SUY5RmRtVnVkRVZ0YVhSMFpYSXlJRDBnY21WeGRXbHlaU2duTGk5RmRtVnVkRVZ0YVhSMFpYSXVhbk1uS1R0Y2JseHVkbUZ5SUY5RmRtVnVkRVZ0YVhSMFpYSXpJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZSWFpsYm5SRmJXbDBkR1Z5TWlrN1hHNWNiblpoY2lCZmRYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUwzVjBhV3h6TG1wekp5azdYRzVjYm5aaGNpQjFkR2xzY3lBOUlGOXBiblJsY205d1VtVnhkV2x5WlZkcGJHUmpZWEprS0Y5MWRHbHNjeWs3WEc1Y2JtWjFibU4wYVc5dUlGOXBiblJsY205d1VtVnhkV2x5WlZkcGJHUmpZWEprS0c5aWFpa2dleUJwWmlBb2IySnFJQ1ltSUc5aWFpNWZYMlZ6VFc5a2RXeGxLU0I3SUhKbGRIVnliaUJ2WW1vN0lIMGdaV3h6WlNCN0lIWmhjaUJ1WlhkUFltb2dQU0I3ZlRzZ2FXWWdLRzlpYWlBaFBTQnVkV3hzS1NCN0lHWnZjaUFvZG1GeUlHdGxlU0JwYmlCdlltb3BJSHNnYVdZZ0tFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbW9zSUd0bGVTa3BJRzVsZDA5aWFsdHJaWGxkSUQwZ2IySnFXMnRsZVYwN0lIMGdmU0J1WlhkUFltb3VaR1ZtWVhWc2RDQTlJRzlpYWpzZ2NtVjBkWEp1SUc1bGQwOWlhanNnZlNCOVhHNWNibVoxYm1OMGFXOXVJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb2IySnFLU0I3SUhKbGRIVnliaUJ2WW1vZ0ppWWdiMkpxTGw5ZlpYTk5iMlIxYkdVZ1B5QnZZbW9nT2lCN0lHUmxabUYxYkhRNklHOWlhaUI5T3lCOVhHNWNibVoxYm1OMGFXOXVJRjlrWldaaGRXeDBjeWh2WW1vc0lHUmxabUYxYkhSektTQjdJSFpoY2lCclpYbHpJRDBnVDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVRtRnRaWE1vWkdWbVlYVnNkSE1wT3lCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHdGxlWE11YkdWdVozUm9PeUJwS3lzcElIc2dkbUZ5SUd0bGVTQTlJR3RsZVhOYmFWMDdJSFpoY2lCMllXeDFaU0E5SUU5aWFtVmpkQzVuWlhSUGQyNVFjbTl3WlhKMGVVUmxjMk55YVhCMGIzSW9aR1ZtWVhWc2RITXNJR3RsZVNrN0lHbG1JQ2gyWVd4MVpTQW1KaUIyWVd4MVpTNWpiMjVtYVdkMWNtRmliR1VnSmlZZ2IySnFXMnRsZVYwZ1BUMDlJSFZ1WkdWbWFXNWxaQ2tnZXlCUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29iMkpxTENCclpYa3NJSFpoYkhWbEtUc2dmU0I5SUhKbGRIVnliaUJ2WW1vN0lIMWNibHh1Wm5WdVkzUnBiMjRnWDJOc1lYTnpRMkZzYkVOb1pXTnJLR2x1YzNSaGJtTmxMQ0JEYjI1emRISjFZM1J2Y2lrZ2V5QnBaaUFvSVNocGJuTjBZVzVqWlNCcGJuTjBZVzVqWlc5bUlFTnZibk4wY25WamRHOXlLU2tnZXlCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtGd2lRMkZ1Ym05MElHTmhiR3dnWVNCamJHRnpjeUJoY3lCaElHWjFibU4wYVc5dVhDSXBPeUI5SUgxY2JseHVablZ1WTNScGIyNGdYM0J2YzNOcFlteGxRMjl1YzNSeWRXTjBiM0pTWlhSMWNtNG9jMlZzWml3Z1kyRnNiQ2tnZXlCcFppQW9JWE5sYkdZcElIc2dkR2h5YjNjZ2JtVjNJRkpsWm1WeVpXNWpaVVZ5Y205eUtGd2lkR2hwY3lCb1lYTnVKM1FnWW1WbGJpQnBibWwwYVdGc2FYTmxaQ0F0SUhOMWNHVnlLQ2tnYUdGemJpZDBJR0psWlc0Z1kyRnNiR1ZrWENJcE95QjlJSEpsZEhWeWJpQmpZV3hzSUNZbUlDaDBlWEJsYjJZZ1kyRnNiQ0E5UFQwZ1hDSnZZbXBsWTNSY0lpQjhmQ0IwZVhCbGIyWWdZMkZzYkNBOVBUMGdYQ0ptZFc1amRHbHZibHdpS1NBL0lHTmhiR3dnT2lCelpXeG1PeUI5WEc1Y2JtWjFibU4wYVc5dUlGOXBibWhsY21sMGN5aHpkV0pEYkdGemN5d2djM1Z3WlhKRGJHRnpjeWtnZXlCcFppQW9kSGx3Wlc5bUlITjFjR1Z5UTJ4aGMzTWdJVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpQW1KaUJ6ZFhCbGNrTnNZWE56SUNFOVBTQnVkV3hzS1NCN0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9YQ0pUZFhCbGNpQmxlSEJ5WlhOemFXOXVJRzExYzNRZ1pXbDBhR1Z5SUdKbElHNTFiR3dnYjNJZ1lTQm1kVzVqZEdsdmJpd2dibTkwSUZ3aUlDc2dkSGx3Wlc5bUlITjFjR1Z5UTJ4aGMzTXBPeUI5SUhOMVlrTnNZWE56TG5CeWIzUnZkSGx3WlNBOUlFOWlhbVZqZEM1amNtVmhkR1VvYzNWd1pYSkRiR0Z6Y3lBbUppQnpkWEJsY2tOc1lYTnpMbkJ5YjNSdmRIbHdaU3dnZXlCamIyNXpkSEoxWTNSdmNqb2dleUIyWVd4MVpUb2djM1ZpUTJ4aGMzTXNJR1Z1ZFcxbGNtRmliR1U2SUdaaGJITmxMQ0IzY21sMFlXSnNaVG9nZEhKMVpTd2dZMjl1Wm1sbmRYSmhZbXhsT2lCMGNuVmxJSDBnZlNrN0lHbG1JQ2h6ZFhCbGNrTnNZWE56S1NCUFltcGxZM1F1YzJWMFVISnZkRzkwZVhCbFQyWWdQeUJQWW1wbFkzUXVjMlYwVUhKdmRHOTBlWEJsVDJZb2MzVmlRMnhoYzNNc0lITjFjR1Z5UTJ4aGMzTXBJRG9nWDJSbFptRjFiSFJ6S0hOMVlrTnNZWE56TENCemRYQmxja05zWVhOektUc2dmVnh1WEc1MllYSWdVbVZ6YjNWeVkyVlRkRzl5WlNBOUlHWjFibU4wYVc5dUlDaGZSWFpsYm5SRmJXbDBkR1Z5S1NCN1hHNGdJRjlwYm1obGNtbDBjeWhTWlhOdmRYSmpaVk4wYjNKbExDQmZSWFpsYm5SRmJXbDBkR1Z5S1R0Y2JseHVJQ0JtZFc1amRHbHZiaUJTWlhOdmRYSmpaVk4wYjNKbEtHUmhkR0VwSUh0Y2JpQWdJQ0IyWVhJZ2IzQjBhVzl1Y3lBOUlHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnZ1BpQXhJQ1ltSUdGeVozVnRaVzUwYzFzeFhTQWhQVDBnZFc1a1pXWnBibVZrSUQ4Z1lYSm5kVzFsYm5Seld6RmRJRG9nZXlCdWN6b2dXeWQwY21GdWMyeGhkR2x2YmlkZExDQmtaV1poZFd4MFRsTTZJQ2QwY21GdWMyeGhkR2x2YmljZ2ZUdGNibHh1SUNBZ0lGOWpiR0Z6YzBOaGJHeERhR1ZqYXloMGFHbHpMQ0JTWlhOdmRYSmpaVk4wYjNKbEtUdGNibHh1SUNBZ0lIWmhjaUJmZEdocGN5QTlJRjl3YjNOemFXSnNaVU52Ym5OMGNuVmpkRzl5VW1WMGRYSnVLSFJvYVhNc0lGOUZkbVZ1ZEVWdGFYUjBaWEl1WTJGc2JDaDBhR2x6S1NrN1hHNWNiaUFnSUNCZmRHaHBjeTVrWVhSaElEMGdaR0YwWVNCOGZDQjdmVHRjYmlBZ0lDQmZkR2hwY3k1dmNIUnBiMjV6SUQwZ2IzQjBhVzl1Y3p0Y2JpQWdJQ0J5WlhSMWNtNGdYM1JvYVhNN1hHNGdJSDFjYmx4dUlDQlNaWE52ZFhKalpWTjBiM0psTG5CeWIzUnZkSGx3WlM1aFpHUk9ZVzFsYzNCaFkyVnpJRDBnWm5WdVkzUnBiMjRnWVdSa1RtRnRaWE53WVdObGN5aHVjeWtnZTF4dUlDQWdJR2xtSUNoMGFHbHpMbTl3ZEdsdmJuTXVibk11YVc1a1pYaFBaaWh1Y3lrZ1BDQXdLU0I3WEc0Z0lDQWdJQ0IwYUdsekxtOXdkR2x2Ym5NdWJuTXVjSFZ6YUNodWN5azdYRzRnSUNBZ2ZWeHVJQ0I5TzF4dVhHNGdJRkpsYzI5MWNtTmxVM1J2Y21VdWNISnZkRzkwZVhCbExuSmxiVzkyWlU1aGJXVnpjR0ZqWlhNZ1BTQm1kVzVqZEdsdmJpQnlaVzF2ZG1WT1lXMWxjM0JoWTJWektHNXpLU0I3WEc0Z0lDQWdkbUZ5SUdsdVpHVjRJRDBnZEdocGN5NXZjSFJwYjI1ekxtNXpMbWx1WkdWNFQyWW9ibk1wTzF4dUlDQWdJR2xtSUNocGJtUmxlQ0ErSUMweEtTQjdYRzRnSUNBZ0lDQjBhR2x6TG05d2RHbHZibk11Ym5NdWMzQnNhV05sS0dsdVpHVjRMQ0F4S1R0Y2JpQWdJQ0I5WEc0Z0lIMDdYRzVjYmlBZ1VtVnpiM1Z5WTJWVGRHOXlaUzV3Y205MGIzUjVjR1V1WjJWMFVtVnpiM1Z5WTJVZ1BTQm1kVzVqZEdsdmJpQm5aWFJTWlhOdmRYSmpaU2hzYm1jc0lHNXpMQ0JyWlhrcElIdGNiaUFnSUNCMllYSWdiM0IwYVc5dWN5QTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQaUF6SUNZbUlHRnlaM1Z0Wlc1MGMxc3pYU0FoUFQwZ2RXNWtaV1pwYm1Wa0lEOGdZWEpuZFcxbGJuUnpXek5kSURvZ2UzMDdYRzVjYmlBZ0lDQjJZWElnYTJWNVUyVndZWEpoZEc5eUlEMGdiM0IwYVc5dWN5NXJaWGxUWlhCaGNtRjBiM0lnZkh3Z2RHaHBjeTV2Y0hScGIyNXpMbXRsZVZObGNHRnlZWFJ2Y2p0Y2JpQWdJQ0JwWmlBb2EyVjVVMlZ3WVhKaGRHOXlJRDA5UFNCMWJtUmxabWx1WldRcElHdGxlVk5sY0dGeVlYUnZjaUE5SUNjdUp6dGNibHh1SUNBZ0lIWmhjaUJ3WVhSb0lEMGdXMnh1Wnl3Z2JuTmRPMXh1SUNBZ0lHbG1JQ2hyWlhrZ0ppWWdkSGx3Wlc5bUlHdGxlU0FoUFQwZ0ozTjBjbWx1WnljcElIQmhkR2dnUFNCd1lYUm9MbU52Ym1OaGRDaHJaWGtwTzF4dUlDQWdJR2xtSUNoclpYa2dKaVlnZEhsd1pXOW1JR3RsZVNBOVBUMGdKM04wY21sdVp5Y3BJSEJoZEdnZ1BTQndZWFJvTG1OdmJtTmhkQ2hyWlhsVFpYQmhjbUYwYjNJZ1B5QnJaWGt1YzNCc2FYUW9hMlY1VTJWd1lYSmhkRzl5S1NBNklHdGxlU2s3WEc1Y2JpQWdJQ0JwWmlBb2JHNW5MbWx1WkdWNFQyWW9KeTRuS1NBK0lDMHhLU0I3WEc0Z0lDQWdJQ0J3WVhSb0lEMGdiRzVuTG5Od2JHbDBLQ2N1SnlrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnY21WMGRYSnVJSFYwYVd4ekxtZGxkRkJoZEdnb2RHaHBjeTVrWVhSaExDQndZWFJvS1R0Y2JpQWdmVHRjYmx4dUlDQlNaWE52ZFhKalpWTjBiM0psTG5CeWIzUnZkSGx3WlM1aFpHUlNaWE52ZFhKalpTQTlJR1oxYm1OMGFXOXVJR0ZrWkZKbGMyOTFjbU5sS0d4dVp5d2dibk1zSUd0bGVTd2dkbUZzZFdVcElIdGNiaUFnSUNCMllYSWdiM0IwYVc5dWN5QTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQaUEwSUNZbUlHRnlaM1Z0Wlc1MGMxczBYU0FoUFQwZ2RXNWtaV1pwYm1Wa0lEOGdZWEpuZFcxbGJuUnpXelJkSURvZ2V5QnphV3hsYm5RNklHWmhiSE5sSUgwN1hHNWNiaUFnSUNCMllYSWdhMlY1VTJWd1lYSmhkRzl5SUQwZ2RHaHBjeTV2Y0hScGIyNXpMbXRsZVZObGNHRnlZWFJ2Y2p0Y2JpQWdJQ0JwWmlBb2EyVjVVMlZ3WVhKaGRHOXlJRDA5UFNCMWJtUmxabWx1WldRcElHdGxlVk5sY0dGeVlYUnZjaUE5SUNjdUp6dGNibHh1SUNBZ0lIWmhjaUJ3WVhSb0lEMGdXMnh1Wnl3Z2JuTmRPMXh1SUNBZ0lHbG1JQ2hyWlhrcElIQmhkR2dnUFNCd1lYUm9MbU52Ym1OaGRDaHJaWGxUWlhCaGNtRjBiM0lnUHlCclpYa3VjM0JzYVhRb2EyVjVVMlZ3WVhKaGRHOXlLU0E2SUd0bGVTazdYRzVjYmlBZ0lDQnBaaUFvYkc1bkxtbHVaR1Y0VDJZb0p5NG5LU0ErSUMweEtTQjdYRzRnSUNBZ0lDQndZWFJvSUQwZ2JHNW5Mbk53YkdsMEtDY3VKeWs3WEc0Z0lDQWdJQ0IyWVd4MVpTQTlJRzV6TzF4dUlDQWdJQ0FnYm5NZ1BTQndZWFJvV3pGZE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhSb2FYTXVZV1JrVG1GdFpYTndZV05sY3lodWN5azdYRzVjYmlBZ0lDQjFkR2xzY3k1elpYUlFZWFJvS0hSb2FYTXVaR0YwWVN3Z2NHRjBhQ3dnZG1Gc2RXVXBPMXh1WEc0Z0lDQWdhV1lnS0NGdmNIUnBiMjV6TG5OcGJHVnVkQ2tnZEdocGN5NWxiV2wwS0NkaFpHUmxaQ2NzSUd4dVp5d2dibk1zSUd0bGVTd2dkbUZzZFdVcE8xeHVJQ0I5TzF4dVhHNGdJRkpsYzI5MWNtTmxVM1J2Y21VdWNISnZkRzkwZVhCbExtRmtaRkpsYzI5MWNtTmxjeUE5SUdaMWJtTjBhVzl1SUdGa1pGSmxjMjkxY21ObGN5aHNibWNzSUc1ekxDQnlaWE52ZFhKalpYTXBJSHRjYmlBZ0lDQXZLaUJsYzJ4cGJuUWdibTh0Y21WemRISnBZM1JsWkMxemVXNTBZWGc2SURBZ0tpOWNiaUFnSUNCbWIzSWdLSFpoY2lCdElHbHVJSEpsYzI5MWNtTmxjeWtnZTF4dUlDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCeVpYTnZkWEpqWlhOYmJWMGdQVDA5SUNkemRISnBibWNuS1NCMGFHbHpMbUZrWkZKbGMyOTFjbU5sS0d4dVp5d2dibk1zSUcwc0lISmxjMjkxY21ObGMxdHRYU3dnZXlCemFXeGxiblE2SUhSeWRXVWdmU2s3WEc0Z0lDQWdmVnh1SUNBZ0lIUm9hWE11WlcxcGRDZ25ZV1JrWldRbkxDQnNibWNzSUc1ekxDQnlaWE52ZFhKalpYTXBPMXh1SUNCOU8xeHVYRzRnSUZKbGMyOTFjbU5sVTNSdmNtVXVjSEp2ZEc5MGVYQmxMbUZrWkZKbGMyOTFjbU5sUW5WdVpHeGxJRDBnWm5WdVkzUnBiMjRnWVdSa1VtVnpiM1Z5WTJWQ2RXNWtiR1VvYkc1bkxDQnVjeXdnY21WemIzVnlZMlZ6TENCa1pXVndMQ0J2ZG1WeWQzSnBkR1VwSUh0Y2JpQWdJQ0IyWVhJZ2NHRjBhQ0E5SUZ0c2JtY3NJRzV6WFR0Y2JpQWdJQ0JwWmlBb2JHNW5MbWx1WkdWNFQyWW9KeTRuS1NBK0lDMHhLU0I3WEc0Z0lDQWdJQ0J3WVhSb0lEMGdiRzVuTG5Od2JHbDBLQ2N1SnlrN1hHNGdJQ0FnSUNCa1pXVndJRDBnY21WemIzVnlZMlZ6TzF4dUlDQWdJQ0FnY21WemIzVnlZMlZ6SUQwZ2JuTTdYRzRnSUNBZ0lDQnVjeUE5SUhCaGRHaGJNVjA3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdkR2hwY3k1aFpHUk9ZVzFsYzNCaFkyVnpLRzV6S1R0Y2JseHVJQ0FnSUhaaGNpQndZV05ySUQwZ2RYUnBiSE11WjJWMFVHRjBhQ2gwYUdsekxtUmhkR0VzSUhCaGRHZ3BJSHg4SUh0OU8xeHVYRzRnSUNBZ2FXWWdLR1JsWlhBcElIdGNiaUFnSUNBZ0lIVjBhV3h6TG1SbFpYQkZlSFJsYm1Rb2NHRmpheXdnY21WemIzVnlZMlZ6TENCdmRtVnlkM0pwZEdVcE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0J3WVdOcklEMGdYMlY0ZEdWdVpITW9lMzBzSUhCaFkyc3NJSEpsYzI5MWNtTmxjeWs3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdkWFJwYkhNdWMyVjBVR0YwYUNoMGFHbHpMbVJoZEdFc0lIQmhkR2dzSUhCaFkyc3BPMXh1WEc0Z0lDQWdkR2hwY3k1bGJXbDBLQ2RoWkdSbFpDY3NJR3h1Wnl3Z2JuTXNJSEpsYzI5MWNtTmxjeWs3WEc0Z0lIMDdYRzVjYmlBZ1VtVnpiM1Z5WTJWVGRHOXlaUzV3Y205MGIzUjVjR1V1Y21WdGIzWmxVbVZ6YjNWeVkyVkNkVzVrYkdVZ1BTQm1kVzVqZEdsdmJpQnlaVzF2ZG1WU1pYTnZkWEpqWlVKMWJtUnNaU2hzYm1jc0lHNXpLU0I3WEc0Z0lDQWdhV1lnS0hSb2FYTXVhR0Z6VW1WemIzVnlZMlZDZFc1a2JHVW9iRzVuTENCdWN5a3BJSHRjYmlBZ0lDQWdJR1JsYkdWMFpTQjBhR2x6TG1SaGRHRmJiRzVuWFZ0dWMxMDdYRzRnSUNBZ2ZWeHVJQ0FnSUhSb2FYTXVjbVZ0YjNabFRtRnRaWE53WVdObGN5aHVjeWs3WEc1Y2JpQWdJQ0IwYUdsekxtVnRhWFFvSjNKbGJXOTJaV1FuTENCc2JtY3NJRzV6S1R0Y2JpQWdmVHRjYmx4dUlDQlNaWE52ZFhKalpWTjBiM0psTG5CeWIzUnZkSGx3WlM1b1lYTlNaWE52ZFhKalpVSjFibVJzWlNBOUlHWjFibU4wYVc5dUlHaGhjMUpsYzI5MWNtTmxRblZ1Wkd4bEtHeHVaeXdnYm5NcElIdGNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NW5aWFJTWlhOdmRYSmpaU2hzYm1jc0lHNXpLU0FoUFQwZ2RXNWtaV1pwYm1Wa08xeHVJQ0I5TzF4dVhHNGdJRkpsYzI5MWNtTmxVM1J2Y21VdWNISnZkRzkwZVhCbExtZGxkRkpsYzI5MWNtTmxRblZ1Wkd4bElEMGdablZ1WTNScGIyNGdaMlYwVW1WemIzVnlZMlZDZFc1a2JHVW9iRzVuTENCdWN5a2dlMXh1SUNBZ0lHbG1JQ2doYm5NcElHNXpJRDBnZEdocGN5NXZjSFJwYjI1ekxtUmxabUYxYkhST1V6dGNibHh1SUNBZ0lDOHZJRU5QVFZCQlZFbENTVXhKVkZrNklISmxiVzkyWlNCbGVIUmxibVFnYVc0Z2RqSXVNUzR3WEc0Z0lDQWdhV1lnS0hSb2FYTXViM0IwYVc5dWN5NWpiMjF3WVhScFltbHNhWFI1UVZCSklEMDlQU0FuZGpFbktTQnlaWFIxY200Z1gyVjRkR1Z1WkhNb2UzMHNJSFJvYVhNdVoyVjBVbVZ6YjNWeVkyVW9iRzVuTENCdWN5a3BPMXh1WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE11WjJWMFVtVnpiM1Z5WTJVb2JHNW5MQ0J1Y3lrN1hHNGdJSDA3WEc1Y2JpQWdVbVZ6YjNWeVkyVlRkRzl5WlM1d2NtOTBiM1I1Y0dVdWRHOUtVMDlPSUQwZ1puVnVZM1JwYjI0Z2RHOUtVMDlPS0NrZ2UxeHVJQ0FnSUhKbGRIVnliaUIwYUdsekxtUmhkR0U3WEc0Z0lIMDdYRzVjYmlBZ2NtVjBkWEp1SUZKbGMyOTFjbU5sVTNSdmNtVTdYRzU5S0Y5RmRtVnVkRVZ0YVhSMFpYSXpMbVJsWm1GMWJIUXBPMXh1WEc1bGVIQnZjblJ6TG1SbFptRjFiSFFnUFNCU1pYTnZkWEpqWlZOMGIzSmxPeUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1VDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lGd2lYMTlsYzAxdlpIVnNaVndpTENCN1hHNGdJSFpoYkhWbE9pQjBjblZsWEc1OUtUdGNibHh1ZG1GeUlGOWxlSFJsYm1SeklEMGdUMkpxWldOMExtRnpjMmxuYmlCOGZDQm1kVzVqZEdsdmJpQW9kR0Z5WjJWMEtTQjdJR1p2Y2lBb2RtRnlJR2tnUFNBeE95QnBJRHdnWVhKbmRXMWxiblJ6TG14bGJtZDBhRHNnYVNzcktTQjdJSFpoY2lCemIzVnlZMlVnUFNCaGNtZDFiV1Z1ZEhOYmFWMDdJR1p2Y2lBb2RtRnlJR3RsZVNCcGJpQnpiM1Z5WTJVcElIc2dhV1lnS0U5aWFtVmpkQzV3Y205MGIzUjVjR1V1YUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNoemIzVnlZMlVzSUd0bGVTa3BJSHNnZEdGeVoyVjBXMnRsZVYwZ1BTQnpiM1Z5WTJWYmEyVjVYVHNnZlNCOUlIMGdjbVYwZFhKdUlIUmhjbWRsZERzZ2ZUdGNibHh1ZG1GeUlGOTBlWEJsYjJZZ1BTQjBlWEJsYjJZZ1UzbHRZbTlzSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lnSmlZZ2RIbHdaVzltSUZONWJXSnZiQzVwZEdWeVlYUnZjaUE5UFQwZ1hDSnplVzFpYjJ4Y0lpQS9JR1oxYm1OMGFXOXVJQ2h2WW1vcElIc2djbVYwZFhKdUlIUjVjR1Z2WmlCdlltbzdJSDBnT2lCbWRXNWpkR2x2YmlBb2IySnFLU0I3SUhKbGRIVnliaUJ2WW1vZ0ppWWdkSGx3Wlc5bUlGTjViV0p2YkNBOVBUMGdYQ0ptZFc1amRHbHZibHdpSUNZbUlHOWlhaTVqYjI1emRISjFZM1J2Y2lBOVBUMGdVM2x0WW05c0lDWW1JRzlpYWlBaFBUMGdVM2x0WW05c0xuQnliM1J2ZEhsd1pTQS9JRndpYzNsdFltOXNYQ0lnT2lCMGVYQmxiMllnYjJKcU95QjlPMXh1WEc1MllYSWdYMnh2WjJkbGNpQTlJSEpsY1hWcGNtVW9KeTR2Ykc5bloyVnlMbXB6SnlrN1hHNWNiblpoY2lCZmJHOW5aMlZ5TWlBOUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvWDJ4dloyZGxjaWs3WEc1Y2JuWmhjaUJmUlhabGJuUkZiV2wwZEdWeU1pQTlJSEpsY1hWcGNtVW9KeTR2UlhabGJuUkZiV2wwZEdWeUxtcHpKeWs3WEc1Y2JuWmhjaUJmUlhabGJuUkZiV2wwZEdWeU15QTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gwVjJaVzUwUlcxcGRIUmxjaklwTzF4dVhHNTJZWElnWDNCdmMzUlFjbTlqWlhOemIzSWdQU0J5WlhGMWFYSmxLQ2N1TDNCdmMzUlFjbTlqWlhOemIzSXVhbk1uS1R0Y2JseHVkbUZ5SUY5d2IzTjBVSEp2WTJWemMyOXlNaUE5SUY5cGJuUmxjbTl3VW1WeGRXbHlaVVJsWm1GMWJIUW9YM0J2YzNSUWNtOWpaWE56YjNJcE8xeHVYRzUyWVhJZ1gzVjBhV3h6SUQwZ2NtVnhkV2x5WlNnbkxpOTFkR2xzY3k1cWN5Y3BPMXh1WEc1MllYSWdkWFJwYkhNZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WWGFXeGtZMkZ5WkNoZmRYUnBiSE1wTzF4dVhHNW1kVzVqZEdsdmJpQmZhVzUwWlhKdmNGSmxjWFZwY21WWGFXeGtZMkZ5WkNodlltb3BJSHNnYVdZZ0tHOWlhaUFtSmlCdlltb3VYMTlsYzAxdlpIVnNaU2tnZXlCeVpYUjFjbTRnYjJKcU95QjlJR1ZzYzJVZ2V5QjJZWElnYm1WM1QySnFJRDBnZTMwN0lHbG1JQ2h2WW1vZ0lUMGdiblZzYkNrZ2V5Qm1iM0lnS0haaGNpQnJaWGtnYVc0Z2IySnFLU0I3SUdsbUlDaFBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29iMkpxTENCclpYa3BLU0J1WlhkUFltcGJhMlY1WFNBOUlHOWlhbHRyWlhsZE95QjlJSDBnYm1WM1QySnFMbVJsWm1GMWJIUWdQU0J2WW1vN0lISmxkSFZ5YmlCdVpYZFBZbW83SUgwZ2ZWeHVYRzVtZFc1amRHbHZiaUJmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtHOWlhaWtnZXlCeVpYUjFjbTRnYjJKcUlDWW1JRzlpYWk1ZlgyVnpUVzlrZFd4bElEOGdiMkpxSURvZ2V5QmtaV1poZFd4ME9pQnZZbW9nZlRzZ2ZWeHVYRzVtZFc1amRHbHZiaUJmWkdWbVlYVnNkSE1vYjJKcUxDQmtaV1poZFd4MGN5a2dleUIyWVhJZ2EyVjVjeUE5SUU5aWFtVmpkQzVuWlhSUGQyNVFjbTl3WlhKMGVVNWhiV1Z6S0dSbFptRjFiSFJ6S1RzZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnJaWGx6TG14bGJtZDBhRHNnYVNzcktTQjdJSFpoY2lCclpYa2dQU0JyWlhselcybGRPeUIyWVhJZ2RtRnNkV1VnUFNCUFltcGxZM1F1WjJWMFQzZHVVSEp2Y0dWeWRIbEVaWE5qY21sd2RHOXlLR1JsWm1GMWJIUnpMQ0JyWlhrcE95QnBaaUFvZG1Gc2RXVWdKaVlnZG1Gc2RXVXVZMjl1Wm1sbmRYSmhZbXhsSUNZbUlHOWlhbHRyWlhsZElEMDlQU0IxYm1SbFptbHVaV1FwSUhzZ1QySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLRzlpYWl3Z2EyVjVMQ0IyWVd4MVpTazdJSDBnZlNCeVpYUjFjbTRnYjJKcU95QjlYRzVjYm1aMWJtTjBhVzl1SUY5amJHRnpjME5oYkd4RGFHVmpheWhwYm5OMFlXNWpaU3dnUTI5dWMzUnlkV04wYjNJcElIc2dhV1lnS0NFb2FXNXpkR0Z1WTJVZ2FXNXpkR0Z1WTJWdlppQkRiMjV6ZEhKMVkzUnZjaWtwSUhzZ2RHaHliM2NnYm1WM0lGUjVjR1ZGY25KdmNpaGNJa05oYm01dmRDQmpZV3hzSUdFZ1kyeGhjM01nWVhNZ1lTQm1kVzVqZEdsdmJsd2lLVHNnZlNCOVhHNWNibVoxYm1OMGFXOXVJRjl3YjNOemFXSnNaVU52Ym5OMGNuVmpkRzl5VW1WMGRYSnVLSE5sYkdZc0lHTmhiR3dwSUhzZ2FXWWdLQ0Z6Wld4bUtTQjdJSFJvY205M0lHNWxkeUJTWldabGNtVnVZMlZGY25KdmNpaGNJblJvYVhNZ2FHRnpiaWQwSUdKbFpXNGdhVzVwZEdsaGJHbHpaV1FnTFNCemRYQmxjaWdwSUdoaGMyNG5kQ0JpWldWdUlHTmhiR3hsWkZ3aUtUc2dmU0J5WlhSMWNtNGdZMkZzYkNBbUppQW9kSGx3Wlc5bUlHTmhiR3dnUFQwOUlGd2liMkpxWldOMFhDSWdmSHdnZEhsd1pXOW1JR05oYkd3Z1BUMDlJRndpWm5WdVkzUnBiMjVjSWlrZ1B5QmpZV3hzSURvZ2MyVnNaanNnZlZ4dVhHNW1kVzVqZEdsdmJpQmZhVzVvWlhKcGRITW9jM1ZpUTJ4aGMzTXNJSE4xY0dWeVEyeGhjM01wSUhzZ2FXWWdLSFI1Y0dWdlppQnpkWEJsY2tOc1lYTnpJQ0U5UFNCY0ltWjFibU4wYVc5dVhDSWdKaVlnYzNWd1pYSkRiR0Z6Y3lBaFBUMGdiblZzYkNrZ2V5QjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLRndpVTNWd1pYSWdaWGh3Y21WemMybHZiaUJ0ZFhOMElHVnBkR2hsY2lCaVpTQnVkV3hzSUc5eUlHRWdablZ1WTNScGIyNHNJRzV2ZENCY0lpQXJJSFI1Y0dWdlppQnpkWEJsY2tOc1lYTnpLVHNnZlNCemRXSkRiR0Z6Y3k1d2NtOTBiM1I1Y0dVZ1BTQlBZbXBsWTNRdVkzSmxZWFJsS0hOMWNHVnlRMnhoYzNNZ0ppWWdjM1Z3WlhKRGJHRnpjeTV3Y205MGIzUjVjR1VzSUhzZ1kyOXVjM1J5ZFdOMGIzSTZJSHNnZG1Gc2RXVTZJSE4xWWtOc1lYTnpMQ0JsYm5WdFpYSmhZbXhsT2lCbVlXeHpaU3dnZDNKcGRHRmliR1U2SUhSeWRXVXNJR052Ym1acFozVnlZV0pzWlRvZ2RISjFaU0I5SUgwcE95QnBaaUFvYzNWd1pYSkRiR0Z6Y3lrZ1QySnFaV04wTG5ObGRGQnliM1J2ZEhsd1pVOW1JRDhnVDJKcVpXTjBMbk5sZEZCeWIzUnZkSGx3WlU5bUtITjFZa05zWVhOekxDQnpkWEJsY2tOc1lYTnpLU0E2SUY5a1pXWmhkV3gwY3loemRXSkRiR0Z6Y3l3Z2MzVndaWEpEYkdGemN5azdJSDFjYmx4dWRtRnlJRlJ5WVc1emJHRjBiM0lnUFNCbWRXNWpkR2x2YmlBb1gwVjJaVzUwUlcxcGRIUmxjaWtnZTF4dUlDQmZhVzVvWlhKcGRITW9WSEpoYm5Oc1lYUnZjaXdnWDBWMlpXNTBSVzFwZEhSbGNpazdYRzVjYmlBZ1puVnVZM1JwYjI0Z1ZISmhibk5zWVhSdmNpaHpaWEoyYVdObGN5a2dlMXh1SUNBZ0lIWmhjaUJ2Y0hScGIyNXpJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURFZ0ppWWdZWEpuZFcxbGJuUnpXekZkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTVYwZ09pQjdmVHRjYmx4dUlDQWdJRjlqYkdGemMwTmhiR3hEYUdWamF5aDBhR2x6TENCVWNtRnVjMnhoZEc5eUtUdGNibHh1SUNBZ0lIWmhjaUJmZEdocGN5QTlJRjl3YjNOemFXSnNaVU52Ym5OMGNuVmpkRzl5VW1WMGRYSnVLSFJvYVhNc0lGOUZkbVZ1ZEVWdGFYUjBaWEl1WTJGc2JDaDBhR2x6S1NrN1hHNWNiaUFnSUNCMWRHbHNjeTVqYjNCNUtGc25jbVZ6YjNWeVkyVlRkRzl5WlNjc0lDZHNZVzVuZFdGblpWVjBhV3h6Snl3Z0ozQnNkWEpoYkZKbGMyOXNkbVZ5Snl3Z0oybHVkR1Z5Y0c5c1lYUnZjaWNzSUNkaVlXTnJaVzVrUTI5dWJtVmpkRzl5SjEwc0lITmxjblpwWTJWekxDQmZkR2hwY3lrN1hHNWNiaUFnSUNCZmRHaHBjeTV2Y0hScGIyNXpJRDBnYjNCMGFXOXVjenRjYmlBZ0lDQmZkR2hwY3k1c2IyZG5aWElnUFNCZmJHOW5aMlZ5TWk1a1pXWmhkV3gwTG1OeVpXRjBaU2duZEhKaGJuTnNZWFJ2Y2ljcE8xeHVJQ0FnSUhKbGRIVnliaUJmZEdocGN6dGNiaUFnZlZ4dVhHNGdJRlJ5WVc1emJHRjBiM0l1Y0hKdmRHOTBlWEJsTG1Ob1lXNW5aVXhoYm1kMVlXZGxJRDBnWm5WdVkzUnBiMjRnWTJoaGJtZGxUR0Z1WjNWaFoyVW9iRzVuS1NCN1hHNGdJQ0FnYVdZZ0tHeHVaeWtnZEdocGN5NXNZVzVuZFdGblpTQTlJR3h1Wnp0Y2JpQWdmVHRjYmx4dUlDQlVjbUZ1YzJ4aGRHOXlMbkJ5YjNSdmRIbHdaUzVsZUdsemRITWdQU0JtZFc1amRHbHZiaUJsZUdsemRITW9hMlY1S1NCN1hHNGdJQ0FnZG1GeUlHOXdkR2x2Ym5NZ1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb0lENGdNU0FtSmlCaGNtZDFiV1Z1ZEhOYk1WMGdJVDA5SUhWdVpHVm1hVzVsWkNBL0lHRnlaM1Z0Wlc1MGMxc3hYU0E2SUhzZ2FXNTBaWEp3YjJ4aGRHbHZiam9nZTMwZ2ZUdGNibHh1SUNBZ0lIWmhjaUJ5WlhOdmJIWmxaQ0E5SUhSb2FYTXVjbVZ6YjJ4MlpTaHJaWGtzSUc5d2RHbHZibk1wTzF4dUlDQWdJSEpsZEhWeWJpQnlaWE52YkhabFpDQW1KaUJ5WlhOdmJIWmxaQzV5WlhNZ0lUMDlJSFZ1WkdWbWFXNWxaRHRjYmlBZ2ZUdGNibHh1SUNCVWNtRnVjMnhoZEc5eUxuQnliM1J2ZEhsd1pTNWxlSFJ5WVdOMFJuSnZiVXRsZVNBOUlHWjFibU4wYVc5dUlHVjRkSEpoWTNSR2NtOXRTMlY1S0d0bGVTd2diM0IwYVc5dWN5a2dlMXh1SUNBZ0lIWmhjaUJ1YzFObGNHRnlZWFJ2Y2lBOUlHOXdkR2x2Ym5NdWJuTlRaWEJoY21GMGIzSWdmSHdnZEdocGN5NXZjSFJwYjI1ekxtNXpVMlZ3WVhKaGRHOXlPMXh1SUNBZ0lHbG1JQ2h1YzFObGNHRnlZWFJ2Y2lBOVBUMGdkVzVrWldacGJtVmtLU0J1YzFObGNHRnlZWFJ2Y2lBOUlDYzZKenRjYmlBZ0lDQjJZWElnYTJWNVUyVndZWEpoZEc5eUlEMGdiM0IwYVc5dWN5NXJaWGxUWlhCaGNtRjBiM0lnZkh3Z2RHaHBjeTV2Y0hScGIyNXpMbXRsZVZObGNHRnlZWFJ2Y2lCOGZDQW5MaWM3WEc1Y2JpQWdJQ0IyWVhJZ2JtRnRaWE53WVdObGN5QTlJRzl3ZEdsdmJuTXVibk1nZkh3Z2RHaHBjeTV2Y0hScGIyNXpMbVJsWm1GMWJIUk9VenRjYmlBZ0lDQnBaaUFvYm5OVFpYQmhjbUYwYjNJZ0ppWWdhMlY1TG1sdVpHVjRUMllvYm5OVFpYQmhjbUYwYjNJcElENGdMVEVwSUh0Y2JpQWdJQ0FnSUhaaGNpQndZWEowY3lBOUlHdGxlUzV6Y0d4cGRDaHVjMU5sY0dGeVlYUnZjaWs3WEc0Z0lDQWdJQ0JwWmlBb2JuTlRaWEJoY21GMGIzSWdJVDA5SUd0bGVWTmxjR0Z5WVhSdmNpQjhmQ0J1YzFObGNHRnlZWFJ2Y2lBOVBUMGdhMlY1VTJWd1lYSmhkRzl5SUNZbUlIUm9hWE11YjNCMGFXOXVjeTV1Y3k1cGJtUmxlRTltS0hCaGNuUnpXekJkS1NBK0lDMHhLU0J1WVcxbGMzQmhZMlZ6SUQwZ2NHRnlkSE11YzJocFpuUW9LVHRjYmlBZ0lDQWdJR3RsZVNBOUlIQmhjblJ6TG1wdmFXNG9hMlY1VTJWd1lYSmhkRzl5S1R0Y2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0hSNWNHVnZaaUJ1WVcxbGMzQmhZMlZ6SUQwOVBTQW5jM1J5YVc1bkp5a2dibUZ0WlhOd1lXTmxjeUE5SUZ0dVlXMWxjM0JoWTJWelhUdGNibHh1SUNBZ0lISmxkSFZ5YmlCN1hHNGdJQ0FnSUNCclpYazZJR3RsZVN4Y2JpQWdJQ0FnSUc1aGJXVnpjR0ZqWlhNNklHNWhiV1Z6Y0dGalpYTmNiaUFnSUNCOU8xeHVJQ0I5TzF4dVhHNGdJRlJ5WVc1emJHRjBiM0l1Y0hKdmRHOTBlWEJsTG5SeVlXNXpiR0YwWlNBOUlHWjFibU4wYVc5dUlIUnlZVzV6YkdGMFpTaHJaWGx6TENCdmNIUnBiMjV6S1NCN1hHNGdJQ0FnZG1GeUlGOTBhR2x6TWlBOUlIUm9hWE03WEc1Y2JpQWdJQ0JwWmlBb0tIUjVjR1Z2WmlCdmNIUnBiMjV6SUQwOVBTQW5kVzVrWldacGJtVmtKeUEvSUNkMWJtUmxabWx1WldRbklEb2dYM1I1Y0dWdlppaHZjSFJwYjI1ektTa2dJVDA5SUNkdlltcGxZM1FuSUNZbUlIUm9hWE11YjNCMGFXOXVjeTV2ZG1WeWJHOWhaRlJ5WVc1emJHRjBhVzl1VDNCMGFXOXVTR0Z1Wkd4bGNpa2dlMXh1SUNBZ0lDQWdMeW9nWlhOc2FXNTBJSEJ5WldabGNpMXlaWE4wTFhCaGNtRnRjem9nTUNBcUwxeHVJQ0FnSUNBZ2IzQjBhVzl1Y3lBOUlIUm9hWE11YjNCMGFXOXVjeTV2ZG1WeWJHOWhaRlJ5WVc1emJHRjBhVzl1VDNCMGFXOXVTR0Z1Wkd4bGNpaGhjbWQxYldWdWRITXBPMXh1SUNBZ0lIMWNiaUFnSUNCcFppQW9JVzl3ZEdsdmJuTXBJRzl3ZEdsdmJuTWdQU0I3ZlR0Y2JseHVJQ0FnSUM4dklHNXZiaUIyWVd4cFpDQnJaWGx6SUdoaGJtUnNhVzVuWEc0Z0lDQWdhV1lnS0d0bGVYTWdQVDA5SUhWdVpHVm1hVzVsWkNCOGZDQnJaWGx6SUQwOVBTQnVkV3hzSUh4OElHdGxlWE1nUFQwOUlDY25LU0J5WlhSMWNtNGdKeWM3WEc0Z0lDQWdhV1lnS0hSNWNHVnZaaUJyWlhseklEMDlQU0FuYm5WdFltVnlKeWtnYTJWNWN5QTlJRk4wY21sdVp5aHJaWGx6S1R0Y2JpQWdJQ0JwWmlBb2RIbHdaVzltSUd0bGVYTWdQVDA5SUNkemRISnBibWNuS1NCclpYbHpJRDBnVzJ0bGVYTmRPMXh1WEc0Z0lDQWdMeThnYzJWd1lYSmhkRzl5YzF4dUlDQWdJSFpoY2lCclpYbFRaWEJoY21GMGIzSWdQU0J2Y0hScGIyNXpMbXRsZVZObGNHRnlZWFJ2Y2lCOGZDQjBhR2x6TG05d2RHbHZibk11YTJWNVUyVndZWEpoZEc5eUlIeDhJQ2N1Snp0Y2JseHVJQ0FnSUM4dklHZGxkQ0J1WVcxbGMzQmhZMlVvY3lsY2JseHVJQ0FnSUhaaGNpQmZaWGgwY21GamRFWnliMjFMWlhrZ1BTQjBhR2x6TG1WNGRISmhZM1JHY205dFMyVjVLR3RsZVhOYmEyVjVjeTVzWlc1bmRHZ2dMU0F4WFN3Z2IzQjBhVzl1Y3lrc1hHNGdJQ0FnSUNBZ0lHdGxlU0E5SUY5bGVIUnlZV04wUm5KdmJVdGxlUzVyWlhrc1hHNGdJQ0FnSUNBZ0lHNWhiV1Z6Y0dGalpYTWdQU0JmWlhoMGNtRmpkRVp5YjIxTFpYa3VibUZ0WlhOd1lXTmxjenRjYmx4dUlDQWdJSFpoY2lCdVlXMWxjM0JoWTJVZ1BTQnVZVzFsYzNCaFkyVnpXMjVoYldWemNHRmpaWE11YkdWdVozUm9JQzBnTVYwN1hHNWNiaUFnSUNBdkx5QnlaWFIxY200Z2EyVjVJRzl1SUVOSlRXOWtaVnh1SUNBZ0lIWmhjaUJzYm1jZ1BTQnZjSFJwYjI1ekxteHVaeUI4ZkNCMGFHbHpMbXhoYm1kMVlXZGxPMXh1SUNBZ0lIWmhjaUJoY0hCbGJtUk9ZVzFsYzNCaFkyVlViME5KVFc5a1pTQTlJRzl3ZEdsdmJuTXVZWEJ3Wlc1a1RtRnRaWE53WVdObFZHOURTVTF2WkdVZ2ZId2dkR2hwY3k1dmNIUnBiMjV6TG1Gd2NHVnVaRTVoYldWemNHRmpaVlJ2UTBsTmIyUmxPMXh1SUNBZ0lHbG1JQ2hzYm1jZ0ppWWdiRzVuTG5SdlRHOTNaWEpEWVhObEtDa2dQVDA5SUNkamFXMXZaR1VuS1NCN1hHNGdJQ0FnSUNCcFppQW9ZWEJ3Wlc1a1RtRnRaWE53WVdObFZHOURTVTF2WkdVcElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUc1elUyVndZWEpoZEc5eUlEMGdiM0IwYVc5dWN5NXVjMU5sY0dGeVlYUnZjaUI4ZkNCMGFHbHpMbTl3ZEdsdmJuTXVibk5UWlhCaGNtRjBiM0k3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ1WVcxbGMzQmhZMlVnS3lCdWMxTmxjR0Z5WVhSdmNpQXJJR3RsZVR0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2NtVjBkWEp1SUd0bGVUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QnlaWE52YkhabElHWnliMjBnYzNSdmNtVmNiaUFnSUNCMllYSWdjbVZ6YjJ4MlpXUWdQU0IwYUdsekxuSmxjMjlzZG1Vb2EyVjVjeXdnYjNCMGFXOXVjeWs3WEc0Z0lDQWdkbUZ5SUhKbGN5QTlJSEpsYzI5c2RtVmtJQ1ltSUhKbGMyOXNkbVZrTG5KbGN6dGNiaUFnSUNCMllYSWdjbVZ6VlhObFpFdGxlU0E5SUhKbGMyOXNkbVZrSUNZbUlISmxjMjlzZG1Wa0xuVnpaV1JMWlhrZ2ZId2dhMlY1TzF4dVhHNGdJQ0FnZG1GeUlISmxjMVI1Y0dVZ1BTQlBZbXBsWTNRdWNISnZkRzkwZVhCbExuUnZVM1J5YVc1bkxtRndjR3g1S0hKbGN5azdYRzRnSUNBZ2RtRnlJRzV2VDJKcVpXTjBJRDBnV3lkYmIySnFaV04wSUU1MWJXSmxjbDBuTENBblcyOWlhbVZqZENCR2RXNWpkR2x2YmwwbkxDQW5XMjlpYW1WamRDQlNaV2RGZUhCZEoxMDdYRzRnSUNBZ2RtRnlJR3B2YVc1QmNuSmhlWE1nUFNCdmNIUnBiMjV6TG1wdmFXNUJjbkpoZVhNZ0lUMDlJSFZ1WkdWbWFXNWxaQ0EvSUc5d2RHbHZibk11YW05cGJrRnljbUY1Y3lBNklIUm9hWE11YjNCMGFXOXVjeTVxYjJsdVFYSnlZWGx6TzF4dVhHNGdJQ0FnTHk4Z2IySnFaV04wWEc0Z0lDQWdkbUZ5SUdoaGJtUnNaVUZ6VDJKcVpXTjBJRDBnZEhsd1pXOW1JSEpsY3lBaFBUMGdKM04wY21sdVp5Y2dKaVlnZEhsd1pXOW1JSEpsY3lBaFBUMGdKMkp2YjJ4bFlXNG5JQ1ltSUhSNWNHVnZaaUJ5WlhNZ0lUMDlJQ2R1ZFcxaVpYSW5PMXh1SUNBZ0lHbG1JQ2h5WlhNZ0ppWWdhR0Z1Wkd4bFFYTlBZbXBsWTNRZ0ppWWdibTlQWW1wbFkzUXVhVzVrWlhoUFppaHlaWE5VZVhCbEtTQThJREFnSmlZZ0lTaHFiMmx1UVhKeVlYbHpJQ1ltSUhKbGMxUjVjR1VnUFQwOUlDZGJiMkpxWldOMElFRnljbUY1WFNjcEtTQjdYRzRnSUNBZ0lDQnBaaUFvSVc5d2RHbHZibk11Y21WMGRYSnVUMkpxWldOMGN5QW1KaUFoZEdocGN5NXZjSFJwYjI1ekxuSmxkSFZ5Yms5aWFtVmpkSE1wSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVzYjJkblpYSXVkMkZ5YmlnbllXTmpaWE56YVc1bklHRnVJRzlpYW1WamRDQXRJR0oxZENCeVpYUjFjbTVQWW1wbFkzUnpJRzl3ZEdsdmJuTWdhWE1nYm05MElHVnVZV0pzWldRaEp5azdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG05d2RHbHZibk11Y21WMGRYSnVaV1JQWW1wbFkzUklZVzVrYkdWeUlEOGdkR2hwY3k1dmNIUnBiMjV6TG5KbGRIVnlibVZrVDJKcVpXTjBTR0Z1Wkd4bGNpaHlaWE5WYzJWa1MyVjVMQ0J5WlhNc0lHOXdkR2x2Ym5NcElEb2dKMnRsZVNCY1hDY25JQ3NnYTJWNUlDc2dKeUFvSnlBcklIUm9hWE11YkdGdVozVmhaMlVnS3lBbktWeGNKeUJ5WlhSMWNtNWxaQ0JoYmlCdlltcGxZM1FnYVc1emRHVmhaQ0J2WmlCemRISnBibWN1Snp0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0x5OGdhV1lnZDJVZ1oyOTBJR0VnYzJWd1lYSmhkRzl5SUhkbElHeHZiM0FnYjNabGNpQmphR2xzWkhKbGJpQXRJR1ZzYzJVZ2QyVWdhblZ6ZENCeVpYUjFjbTRnYjJKcVpXTjBJR0Z6SUdselhHNGdJQ0FnSUNBdkx5QmhjeUJvWVhacGJtY2dhWFFnYzJWMElIUnZJR1poYkhObElHMWxZVzV6SUc1dklHaHBaWEpoY21Ob2VTQnpieUJ1YnlCc2IyOXJkWEFnWm05eUlHNWxjM1JsWkNCMllXeDFaWE5jYmlBZ0lDQWdJR2xtSUNodmNIUnBiMjV6TG10bGVWTmxjR0Z5WVhSdmNpQjhmQ0IwYUdsekxtOXdkR2x2Ym5NdWEyVjVVMlZ3WVhKaGRHOXlLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQmpiM0I1SUQwZ2NtVnpWSGx3WlNBOVBUMGdKMXR2WW1wbFkzUWdRWEp5WVhsZEp5QS9JRnRkSURvZ2UzMDdJQzh2SUdGd2NHeDVJR05vYVd4a0lIUnlZVzV6YkdGMGFXOXVJRzl1SUdFZ1kyOXdlVnh1WEc0Z0lDQWdJQ0FnSUM4cUlHVnpiR2x1ZENCdWJ5MXlaWE4wY21samRHVmtMWE41Ym5SaGVEb2dNQ0FxTDF4dUlDQWdJQ0FnSUNCbWIzSWdLSFpoY2lCdElHbHVJSEpsY3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJR2xtSUNoUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b2NtVnpMQ0J0S1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHUmxaWEJMWlhrZ1BTQW5KeUFySUhKbGMxVnpaV1JMWlhrZ0t5QnJaWGxUWlhCaGNtRjBiM0lnS3lCdE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5d2VWdHRYU0E5SUhSb2FYTXVkSEpoYm5Oc1lYUmxLR1JsWlhCTFpYa3NJRjlsZUhSbGJtUnpLSHQ5TENCdmNIUnBiMjV6TENCN0lHcHZhVzVCY25KaGVYTTZJR1poYkhObExDQnVjem9nYm1GdFpYTndZV05sY3lCOUtTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9ZMjl3ZVZ0dFhTQTlQVDBnWkdWbGNFdGxlU2tnWTI5d2VWdHRYU0E5SUhKbGMxdHRYVHNnTHk4Z2FXWWdibTkwYUdsdVp5Qm1iM1Z1WkNCMWMyVWdiM0puYVc1aGJDQjJZV3gxWlNCaGN5Qm1ZV3hzWW1GamExeHVJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCeVpYTWdQU0JqYjNCNU8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb2FtOXBia0Z5Y21GNWN5QW1KaUJ5WlhOVWVYQmxJRDA5UFNBblcyOWlhbVZqZENCQmNuSmhlVjBuS1NCN1hHNGdJQ0FnSUNBdkx5QmhjbkpoZVNCemNHVmphV0ZzSUhSeVpXRjBiV1Z1ZEZ4dUlDQWdJQ0FnY21WeklEMGdjbVZ6TG1wdmFXNG9hbTlwYmtGeWNtRjVjeWs3WEc0Z0lDQWdJQ0JwWmlBb2NtVnpLU0J5WlhNZ1BTQjBhR2x6TG1WNGRHVnVaRlJ5WVc1emJHRjBhVzl1S0hKbGN5d2dhMlY1Y3l3Z2IzQjBhVzl1Y3lrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQzh2SUhOMGNtbHVaeXdnWlcxd2RIa2diM0lnYm5Wc2JGeHVJQ0FnSUNBZ2RtRnlJSFZ6WldSRVpXWmhkV3gwSUQwZ1ptRnNjMlU3WEc0Z0lDQWdJQ0IyWVhJZ2RYTmxaRXRsZVNBOUlHWmhiSE5sTzF4dVhHNGdJQ0FnSUNBdkx5Qm1ZV3hzWW1GamF5QjJZV3gxWlZ4dUlDQWdJQ0FnYVdZZ0tDRjBhR2x6TG1selZtRnNhV1JNYjI5cmRYQW9jbVZ6S1NBbUppQnZjSFJwYjI1ekxtUmxabUYxYkhSV1lXeDFaU0FoUFQwZ2RXNWtaV1pwYm1Wa0tTQjdYRzRnSUNBZ0lDQWdJSFZ6WldSRVpXWmhkV3gwSUQwZ2RISjFaVHRjYmlBZ0lDQWdJQ0FnY21WeklEMGdiM0IwYVc5dWN5NWtaV1poZFd4MFZtRnNkV1U3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JwWmlBb0lYUm9hWE11YVhOV1lXeHBaRXh2YjJ0MWNDaHlaWE1wS1NCN1hHNGdJQ0FnSUNBZ0lIVnpaV1JMWlhrZ1BTQjBjblZsTzF4dUlDQWdJQ0FnSUNCeVpYTWdQU0JyWlhrN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDOHZJSE5oZG1VZ2JXbHpjMmx1WjF4dUlDQWdJQ0FnZG1GeUlIVndaR0YwWlUxcGMzTnBibWNnUFNCdmNIUnBiMjV6TG1SbFptRjFiSFJXWVd4MVpTQW1KaUJ2Y0hScGIyNXpMbVJsWm1GMWJIUldZV3gxWlNBaFBUMGdjbVZ6SUNZbUlIUm9hWE11YjNCMGFXOXVjeTUxY0dSaGRHVk5hWE56YVc1bk8xeHVJQ0FnSUNBZ2FXWWdLSFZ6WldSTFpYa2dmSHdnZFhObFpFUmxabUYxYkhRZ2ZId2dkWEJrWVhSbFRXbHpjMmx1WnlrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG14dloyZGxjaTVzYjJjb2RYQmtZWFJsVFdsemMybHVaeUEvSUNkMWNHUmhkR1ZMWlhrbklEb2dKMjFwYzNOcGJtZExaWGtuTENCc2JtY3NJRzVoYldWemNHRmpaU3dnYTJWNUxDQjFjR1JoZEdWTmFYTnphVzVuSUQ4Z2IzQjBhVzl1Y3k1a1pXWmhkV3gwVm1Gc2RXVWdPaUJ5WlhNcE8xeHVYRzRnSUNBZ0lDQWdJSFpoY2lCc2JtZHpJRDBnVzEwN1hHNGdJQ0FnSUNBZ0lIWmhjaUJtWVd4c1ltRmphMHh1WjNNZ1BTQjBhR2x6TG14aGJtZDFZV2RsVlhScGJITXVaMlYwUm1Gc2JHSmhZMnREYjJSbGN5aDBhR2x6TG05d2RHbHZibk11Wm1Gc2JHSmhZMnRNYm1jc0lHOXdkR2x2Ym5NdWJHNW5JSHg4SUhSb2FYTXViR0Z1WjNWaFoyVXBPMXh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV2Y0hScGIyNXpMbk5oZG1WTmFYTnphVzVuVkc4Z1BUMDlJQ2RtWVd4c1ltRmpheWNnSmlZZ1ptRnNiR0poWTJ0TWJtZHpJQ1ltSUdaaGJHeGlZV05yVEc1bmMxc3dYU2tnZTF4dUlDQWdJQ0FnSUNBZ0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2dabUZzYkdKaFkydE1ibWR6TG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCc2JtZHpMbkIxYzJnb1ptRnNiR0poWTJ0TWJtZHpXMmxkS1R0Y2JpQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvZEdocGN5NXZjSFJwYjI1ekxuTmhkbVZOYVhOemFXNW5WRzhnUFQwOUlDZGhiR3duS1NCN1hHNGdJQ0FnSUNBZ0lDQWdiRzVuY3lBOUlIUm9hWE11YkdGdVozVmhaMlZWZEdsc2N5NTBiMUpsYzI5c2RtVklhV1Z5WVhKamFIa29iM0IwYVc5dWN5NXNibWNnZkh3Z2RHaHBjeTVzWVc1bmRXRm5aU2s3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ2JHNW5jeTV3ZFhOb0tHOXdkR2x2Ym5NdWJHNW5JSHg4SUhSb2FYTXViR0Z1WjNWaFoyVXBPMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ2RtRnlJSE5sYm1RZ1BTQm1kVzVqZEdsdmJpQnpaVzVrS0d3c0lHc3BJSHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9YM1JvYVhNeUxtOXdkR2x2Ym5NdWJXbHpjMmx1WjB0bGVVaGhibVJzWlhJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUY5MGFHbHpNaTV2Y0hScGIyNXpMbTFwYzNOcGJtZExaWGxJWVc1a2JHVnlLR3dzSUc1aGJXVnpjR0ZqWlN3Z2F5d2dkWEJrWVhSbFRXbHpjMmx1WnlBL0lHOXdkR2x2Ym5NdVpHVm1ZWFZzZEZaaGJIVmxJRG9nY21WekxDQjFjR1JoZEdWTmFYTnphVzVuTENCdmNIUnBiMjV6S1R0Y2JpQWdJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLRjkwYUdsek1pNWlZV05yWlc1a1EyOXVibVZqZEc5eUlDWW1JRjkwYUdsek1pNWlZV05yWlc1a1EyOXVibVZqZEc5eUxuTmhkbVZOYVhOemFXNW5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmZkR2hwY3pJdVltRmphMlZ1WkVOdmJtNWxZM1J2Y2k1ellYWmxUV2x6YzJsdVp5aHNMQ0J1WVcxbGMzQmhZMlVzSUdzc0lIVndaR0YwWlUxcGMzTnBibWNnUHlCdmNIUnBiMjV6TG1SbFptRjFiSFJXWVd4MVpTQTZJSEpsY3l3Z2RYQmtZWFJsVFdsemMybHVaeXdnYjNCMGFXOXVjeWs3WEc0Z0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJRjkwYUdsek1pNWxiV2wwS0NkdGFYTnphVzVuUzJWNUp5d2diQ3dnYm1GdFpYTndZV05sTENCckxDQnlaWE1wTzF4dUlDQWdJQ0FnSUNCOU8xeHVYRzRnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbTl3ZEdsdmJuTXVjMkYyWlUxcGMzTnBibWNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXZjSFJwYjI1ekxuTmhkbVZOYVhOemFXNW5VR3gxY21Gc2N5QW1KaUJ2Y0hScGIyNXpMbU52ZFc1MEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCc2JtZHpMbVp2Y2tWaFkyZ29ablZ1WTNScGIyNGdLR3dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlIQnNkWEpoYkhNZ1BTQmZkR2hwY3pJdWNHeDFjbUZzVW1WemIyeDJaWEl1WjJWMFVHeDFjbUZzUm05eWJYTlBaa3RsZVNoc0xDQnJaWGtwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUhCc2RYSmhiSE11Wm05eVJXRmphQ2htZFc1amRHbHZiaUFvY0NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCelpXNWtLRnRzWFN3Z2NDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lITmxibVFvYkc1bmN5d2dhMlY1S1R0Y2JpQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnTHk4Z1pYaDBaVzVrWEc0Z0lDQWdJQ0J5WlhNZ1BTQjBhR2x6TG1WNGRHVnVaRlJ5WVc1emJHRjBhVzl1S0hKbGN5d2dhMlY1Y3l3Z2IzQjBhVzl1Y3lrN1hHNWNiaUFnSUNBZ0lDOHZJR0Z3Y0dWdVpDQnVZVzFsYzNCaFkyVWdhV1lnYzNScGJHd2dhMlY1WEc0Z0lDQWdJQ0JwWmlBb2RYTmxaRXRsZVNBbUppQnlaWE1nUFQwOUlHdGxlU0FtSmlCMGFHbHpMbTl3ZEdsdmJuTXVZWEJ3Wlc1a1RtRnRaWE53WVdObFZHOU5hWE56YVc1blMyVjVLU0J5WlhNZ1BTQnVZVzFsYzNCaFkyVWdLeUFuT2ljZ0t5QnJaWGs3WEc1Y2JpQWdJQ0FnSUM4dklIQmhjbk5sVFdsemMybHVaMHRsZVVoaGJtUnNaWEpjYmlBZ0lDQWdJR2xtSUNoMWMyVmtTMlY1SUNZbUlIUm9hWE11YjNCMGFXOXVjeTV3WVhKelpVMXBjM05wYm1kTFpYbElZVzVrYkdWeUtTQnlaWE1nUFNCMGFHbHpMbTl3ZEdsdmJuTXVjR0Z5YzJWTmFYTnphVzVuUzJWNVNHRnVaR3hsY2loeVpYTXBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJSEpsZEhWeWJseHVJQ0FnSUhKbGRIVnliaUJ5WlhNN1hHNGdJSDA3WEc1Y2JpQWdWSEpoYm5Oc1lYUnZjaTV3Y205MGIzUjVjR1V1WlhoMFpXNWtWSEpoYm5Oc1lYUnBiMjRnUFNCbWRXNWpkR2x2YmlCbGVIUmxibVJVY21GdWMyeGhkR2x2YmloeVpYTXNJR3RsZVN3Z2IzQjBhVzl1Y3lrZ2UxeHVJQ0FnSUhaaGNpQmZkR2hwY3pNZ1BTQjBhR2x6TzF4dVhHNGdJQ0FnYVdZZ0tHOXdkR2x2Ym5NdWFXNTBaWEp3YjJ4aGRHbHZiaWtnZEdocGN5NXBiblJsY25CdmJHRjBiM0l1YVc1cGRDaGZaWGgwWlc1a2N5aDdmU3dnYjNCMGFXOXVjeXdnZXlCcGJuUmxjbkJ2YkdGMGFXOXVPaUJmWlhoMFpXNWtjeWg3ZlN3Z2RHaHBjeTV2Y0hScGIyNXpMbWx1ZEdWeWNHOXNZWFJwYjI0c0lHOXdkR2x2Ym5NdWFXNTBaWEp3YjJ4aGRHbHZiaWtnZlNrcE8xeHVYRzRnSUNBZ0x5OGdhVzUwWlhKd2IyeGhkR1ZjYmlBZ0lDQjJZWElnWkdGMFlTQTlJRzl3ZEdsdmJuTXVjbVZ3YkdGalpTQW1KaUIwZVhCbGIyWWdiM0IwYVc5dWN5NXlaWEJzWVdObElDRTlQU0FuYzNSeWFXNW5KeUEvSUc5d2RHbHZibk11Y21Wd2JHRmpaU0E2SUc5d2RHbHZibk03WEc0Z0lDQWdhV1lnS0hSb2FYTXViM0IwYVc5dWN5NXBiblJsY25CdmJHRjBhVzl1TG1SbFptRjFiSFJXWVhKcFlXSnNaWE1wSUdSaGRHRWdQU0JmWlhoMFpXNWtjeWg3ZlN3Z2RHaHBjeTV2Y0hScGIyNXpMbWx1ZEdWeWNHOXNZWFJwYjI0dVpHVm1ZWFZzZEZaaGNtbGhZbXhsY3l3Z1pHRjBZU2s3WEc0Z0lDQWdjbVZ6SUQwZ2RHaHBjeTVwYm5SbGNuQnZiR0YwYjNJdWFXNTBaWEp3YjJ4aGRHVW9jbVZ6TENCa1lYUmhMQ0J2Y0hScGIyNXpMbXh1WnlCOGZDQjBhR2x6TG14aGJtZDFZV2RsS1R0Y2JseHVJQ0FnSUM4dklHNWxjM1JwYm1kY2JpQWdJQ0JwWmlBb2IzQjBhVzl1Y3k1dVpYTjBJQ0U5UFNCbVlXeHpaU2tnY21WeklEMGdkR2hwY3k1cGJuUmxjbkJ2YkdGMGIzSXVibVZ6ZENoeVpYTXNJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJmZEdocGN6TXVkSEpoYm5Oc1lYUmxMbUZ3Y0d4NUtGOTBhR2x6TXl3Z1lYSm5kVzFsYm5SektUdGNiaUFnSUNCOUxDQnZjSFJwYjI1ektUdGNibHh1SUNBZ0lHbG1JQ2h2Y0hScGIyNXpMbWx1ZEdWeWNHOXNZWFJwYjI0cElIUm9hWE11YVc1MFpYSndiMnhoZEc5eUxuSmxjMlYwS0NrN1hHNWNiaUFnSUNBdkx5QndiM04wSUhCeWIyTmxjM05jYmlBZ0lDQjJZWElnY0c5emRGQnliMk5sYzNNZ1BTQnZjSFJwYjI1ekxuQnZjM1JRY205alpYTnpJSHg4SUhSb2FYTXViM0IwYVc5dWN5NXdiM04wVUhKdlkyVnpjenRjYmlBZ0lDQjJZWElnY0c5emRGQnliMk5sYzNOdmNrNWhiV1Z6SUQwZ2RIbHdaVzltSUhCdmMzUlFjbTlqWlhOeklEMDlQU0FuYzNSeWFXNW5KeUEvSUZ0d2IzTjBVSEp2WTJWemMxMGdPaUJ3YjNOMFVISnZZMlZ6Y3p0Y2JseHVJQ0FnSUdsbUlDaHlaWE1nSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUJ5WlhNZ0lUMDlJRzUxYkd3Z0ppWWdjRzl6ZEZCeWIyTmxjM052Y2s1aGJXVnpJQ1ltSUhCdmMzUlFjbTlqWlhOemIzSk9ZVzFsY3k1c1pXNW5kR2dnSmlZZ2IzQjBhVzl1Y3k1aGNIQnNlVkJ2YzNSUWNtOWpaWE56YjNJZ0lUMDlJR1poYkhObEtTQjdYRzRnSUNBZ0lDQnlaWE1nUFNCZmNHOXpkRkJ5YjJObGMzTnZjakl1WkdWbVlYVnNkQzVvWVc1a2JHVW9jRzl6ZEZCeWIyTmxjM052Y2s1aGJXVnpMQ0J5WlhNc0lHdGxlU3dnYjNCMGFXOXVjeXdnZEdocGN5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2NtVjBkWEp1SUhKbGN6dGNiaUFnZlR0Y2JseHVJQ0JVY21GdWMyeGhkRzl5TG5CeWIzUnZkSGx3WlM1eVpYTnZiSFpsSUQwZ1puVnVZM1JwYjI0Z2NtVnpiMngyWlNoclpYbHpLU0I3WEc0Z0lDQWdkbUZ5SUY5MGFHbHpOQ0E5SUhSb2FYTTdYRzVjYmlBZ0lDQjJZWElnYjNCMGFXOXVjeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBeElDWW1JR0Z5WjNWdFpXNTBjMXN4WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pGZElEb2dlMzA3WEc1Y2JpQWdJQ0IyWVhJZ1ptOTFibVFnUFNCMmIybGtJREE3WEc0Z0lDQWdkbUZ5SUhWelpXUkxaWGtnUFNCMmIybGtJREE3WEc1Y2JpQWdJQ0JwWmlBb2RIbHdaVzltSUd0bGVYTWdQVDA5SUNkemRISnBibWNuS1NCclpYbHpJRDBnVzJ0bGVYTmRPMXh1WEc0Z0lDQWdMeThnWm05eVJXRmphQ0J3YjNOemFXSnNaU0JyWlhsY2JpQWdJQ0JyWlhsekxtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z0tHc3BJSHRjYmlBZ0lDQWdJR2xtSUNoZmRHaHBjelF1YVhOV1lXeHBaRXh2YjJ0MWNDaG1iM1Z1WkNrcElISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUhaaGNpQmxlSFJ5WVdOMFpXUWdQU0JmZEdocGN6UXVaWGgwY21GamRFWnliMjFMWlhrb2F5d2diM0IwYVc5dWN5azdYRzRnSUNBZ0lDQjJZWElnYTJWNUlEMGdaWGgwY21GamRHVmtMbXRsZVR0Y2JpQWdJQ0FnSUhWelpXUkxaWGtnUFNCclpYazdYRzRnSUNBZ0lDQjJZWElnYm1GdFpYTndZV05sY3lBOUlHVjRkSEpoWTNSbFpDNXVZVzFsYzNCaFkyVnpPMXh1SUNBZ0lDQWdhV1lnS0Y5MGFHbHpOQzV2Y0hScGIyNXpMbVpoYkd4aVlXTnJUbE1wSUc1aGJXVnpjR0ZqWlhNZ1BTQnVZVzFsYzNCaFkyVnpMbU52Ym1OaGRDaGZkR2hwY3pRdWIzQjBhVzl1Y3k1bVlXeHNZbUZqYTA1VEtUdGNibHh1SUNBZ0lDQWdkbUZ5SUc1bFpXUnpVR3gxY21Gc1NHRnVaR3hwYm1jZ1BTQnZjSFJwYjI1ekxtTnZkVzUwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnZEhsd1pXOW1JRzl3ZEdsdmJuTXVZMjkxYm5RZ0lUMDlJQ2R6ZEhKcGJtY25PMXh1SUNBZ0lDQWdkbUZ5SUc1bFpXUnpRMjl1ZEdWNGRFaGhibVJzYVc1bklEMGdiM0IwYVc5dWN5NWpiMjUwWlhoMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2RIbHdaVzltSUc5d2RHbHZibk11WTI5dWRHVjRkQ0E5UFQwZ0ozTjBjbWx1WnljZ0ppWWdiM0IwYVc5dWN5NWpiMjUwWlhoMElDRTlQU0FuSnp0Y2JseHVJQ0FnSUNBZ2RtRnlJR052WkdWeklEMGdiM0IwYVc5dWN5NXNibWR6SUQ4Z2IzQjBhVzl1Y3k1c2JtZHpJRG9nWDNSb2FYTTBMbXhoYm1kMVlXZGxWWFJwYkhNdWRHOVNaWE52YkhabFNHbGxjbUZ5WTJoNUtHOXdkR2x2Ym5NdWJHNW5JSHg4SUY5MGFHbHpOQzVzWVc1bmRXRm5aU2s3WEc1Y2JpQWdJQ0FnSUc1aGJXVnpjR0ZqWlhNdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlBb2JuTXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tGOTBhR2x6TkM1cGMxWmhiR2xrVEc5dmEzVndLR1p2ZFc1a0tTa2djbVYwZFhKdU8xeHVYRzRnSUNBZ0lDQWdJR052WkdWekxtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z0tHTnZaR1VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnBaaUFvWDNSb2FYTTBMbWx6Vm1Gc2FXUk1iMjlyZFhBb1ptOTFibVFwS1NCeVpYUjFjbTQ3WEc1Y2JpQWdJQ0FnSUNBZ0lDQjJZWElnWm1sdVlXeExaWGtnUFNCclpYazdYRzRnSUNBZ0lDQWdJQ0FnZG1GeUlHWnBibUZzUzJWNWN5QTlJRnRtYVc1aGJFdGxlVjA3WEc1Y2JpQWdJQ0FnSUNBZ0lDQjJZWElnY0d4MWNtRnNVM1ZtWm1sNElEMGdkbTlwWkNBd08xeHVJQ0FnSUNBZ0lDQWdJR2xtSUNodVpXVmtjMUJzZFhKaGJFaGhibVJzYVc1bktTQndiSFZ5WVd4VGRXWm1hWGdnUFNCZmRHaHBjelF1Y0d4MWNtRnNVbVZ6YjJ4MlpYSXVaMlYwVTNWbVptbDRLR052WkdVc0lHOXdkR2x2Ym5NdVkyOTFiblFwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdMeThnWm1Gc2JHSmhZMnNnWm05eUlIQnNkWEpoYkNCcFppQmpiMjUwWlhoMElHNXZkQ0JtYjNWdVpGeHVJQ0FnSUNBZ0lDQWdJR2xtSUNodVpXVmtjMUJzZFhKaGJFaGhibVJzYVc1bklDWW1JRzVsWldSelEyOXVkR1Y0ZEVoaGJtUnNhVzVuS1NCbWFXNWhiRXRsZVhNdWNIVnphQ2htYVc1aGJFdGxlU0FySUhCc2RYSmhiRk4xWm1acGVDazdYRzVjYmlBZ0lDQWdJQ0FnSUNBdkx5Qm5aWFFnYTJWNUlHWnZjaUJqYjI1MFpYaDBJR2xtSUc1bFpXUmxaRnh1SUNBZ0lDQWdJQ0FnSUdsbUlDaHVaV1ZrYzBOdmJuUmxlSFJJWVc1a2JHbHVaeWtnWm1sdVlXeExaWGx6TG5CMWMyZ29abWx1WVd4TFpYa2dLejBnSnljZ0t5QmZkR2hwY3pRdWIzQjBhVzl1Y3k1amIyNTBaWGgwVTJWd1lYSmhkRzl5SUNzZ2IzQjBhVzl1Y3k1amIyNTBaWGgwS1R0Y2JseHVJQ0FnSUNBZ0lDQWdJQzh2SUdkbGRDQnJaWGtnWm05eUlIQnNkWEpoYkNCcFppQnVaV1ZrWldSY2JpQWdJQ0FnSUNBZ0lDQnBaaUFvYm1WbFpITlFiSFZ5WVd4SVlXNWtiR2x1WnlrZ1ptbHVZV3hMWlhsekxuQjFjMmdvWm1sdVlXeExaWGtnS3owZ2NHeDFjbUZzVTNWbVptbDRLVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDOHZJR2wwWlhKaGRHVWdiM1psY2lCbWFXNWhiRXRsZVhNZ2MzUmhjblJwYm1jZ2QybDBhQ0J0YjNOMElITndaV05wWm1saklIQnNkWEpoYkd0bGVTQW9MVDRnWTI5dWRHVjRkR3RsZVNCdmJteDVLU0F0UGlCemFXNW5kV3hoY210bGVTQnZibXg1WEc0Z0lDQWdJQ0FnSUNBZ2RtRnlJSEJ2YzNOcFlteGxTMlY1SUQwZ2RtOXBaQ0F3TzF4dUlDQWdJQ0FnSUNBZ0lDOHFJR1Z6YkdsdWRDQnVieTFqYjI1a0xXRnpjMmxuYmpvZ01DQXFMMXh1SUNBZ0lDQWdJQ0FnSUhkb2FXeGxJQ2h3YjNOemFXSnNaVXRsZVNBOUlHWnBibUZzUzJWNWN5NXdiM0FvS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tDRmZkR2hwY3pRdWFYTldZV3hwWkV4dmIydDFjQ2htYjNWdVpDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdabTkxYm1RZ1BTQmZkR2hwY3pRdVoyVjBVbVZ6YjNWeVkyVW9ZMjlrWlN3Z2JuTXNJSEJ2YzNOcFlteGxTMlY1TENCdmNIUnBiMjV6S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdmU2s3WEc0Z0lDQWdmU2s3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdleUJ5WlhNNklHWnZkVzVrTENCMWMyVmtTMlY1T2lCMWMyVmtTMlY1SUgwN1hHNGdJSDA3WEc1Y2JpQWdWSEpoYm5Oc1lYUnZjaTV3Y205MGIzUjVjR1V1YVhOV1lXeHBaRXh2YjJ0MWNDQTlJR1oxYm1OMGFXOXVJR2x6Vm1Gc2FXUk1iMjlyZFhBb2NtVnpLU0I3WEc0Z0lDQWdjbVYwZFhKdUlISmxjeUFoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JQ0VvSVhSb2FYTXViM0IwYVc5dWN5NXlaWFIxY201T2RXeHNJQ1ltSUhKbGN5QTlQVDBnYm5Wc2JDa2dKaVlnSVNnaGRHaHBjeTV2Y0hScGIyNXpMbkpsZEhWeWJrVnRjSFI1VTNSeWFXNW5JQ1ltSUhKbGN5QTlQVDBnSnljcE8xeHVJQ0I5TzF4dVhHNGdJRlJ5WVc1emJHRjBiM0l1Y0hKdmRHOTBlWEJsTG1kbGRGSmxjMjkxY21ObElEMGdablZ1WTNScGIyNGdaMlYwVW1WemIzVnlZMlVvWTI5a1pTd2dibk1zSUd0bGVTa2dlMXh1SUNBZ0lIWmhjaUJ2Y0hScGIyNXpJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURNZ0ppWWdZWEpuZFcxbGJuUnpXek5kSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTTEwZ09pQjdmVHRjYmx4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TG5KbGMyOTFjbU5sVTNSdmNtVXVaMlYwVW1WemIzVnlZMlVvWTI5a1pTd2dibk1zSUd0bGVTd2diM0IwYVc5dWN5azdYRzRnSUgwN1hHNWNiaUFnY21WMGRYSnVJRlJ5WVc1emJHRjBiM0k3WEc1OUtGOUZkbVZ1ZEVWdGFYUjBaWEl6TG1SbFptRjFiSFFwTzF4dVhHNWxlSEJ2Y25SekxtUmxabUYxYkhRZ1BTQlVjbUZ1YzJ4aGRHOXlPeUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1VDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lGd2lYMTlsYzAxdlpIVnNaVndpTENCN1hHNGdJSFpoYkhWbE9pQjBjblZsWEc1OUtUdGNibVY0Y0c5eWRITXVkSEpoYm5ObWIzSnRUM0IwYVc5dWN5QTlJSFJ5WVc1elptOXliVTl3ZEdsdmJuTTdYRzVtZFc1amRHbHZiaUJuWlhRb0tTQjdYRzRnSUhKbGRIVnliaUI3WEc0Z0lDQWdaR1ZpZFdjNklHWmhiSE5sTEZ4dUlDQWdJR2x1YVhSSmJXMWxaR2xoZEdVNklIUnlkV1VzWEc1Y2JpQWdJQ0J1Y3pvZ1d5ZDBjbUZ1YzJ4aGRHbHZiaWRkTEZ4dUlDQWdJR1JsWm1GMWJIUk9Vem9nV3lkMGNtRnVjMnhoZEdsdmJpZGRMRnh1SUNBZ0lHWmhiR3hpWVdOclRHNW5PaUJiSjJSbGRpZGRMRnh1SUNBZ0lHWmhiR3hpWVdOclRsTTZJR1poYkhObExDQXZMeUJ6ZEhKcGJtY2diM0lnWVhKeVlYa2diMllnYm1GdFpYTndZV05sYzF4dVhHNGdJQ0FnZDJocGRHVnNhWE4wT2lCbVlXeHpaU3dnTHk4Z1lYSnlZWGtnZDJsMGFDQjNhR2wwWld4cGMzUmxaQ0JzWVc1bmRXRm5aWE5jYmlBZ0lDQnViMjVGZUhCc2FXTnBkRmRvYVhSbGJHbHpkRG9nWm1Gc2MyVXNYRzRnSUNBZ2JHOWhaRG9nSjJGc2JDY3NJQzh2SUh3Z1kzVnljbVZ1ZEU5dWJIa2dmQ0JzWVc1bmRXRm5aVTl1YkhsY2JpQWdJQ0J3Y21Wc2IyRmtPaUJtWVd4elpTd2dMeThnWVhKeVlYa2dkMmwwYUNCd2NtVnNiMkZrSUd4aGJtZDFZV2RsYzF4dVhHNGdJQ0FnYzJsdGNHeHBabmxRYkhWeVlXeFRkV1ptYVhnNklIUnlkV1VzWEc0Z0lDQWdhMlY1VTJWd1lYSmhkRzl5T2lBbkxpY3NYRzRnSUNBZ2JuTlRaWEJoY21GMGIzSTZJQ2M2Snl4Y2JpQWdJQ0J3YkhWeVlXeFRaWEJoY21GMGIzSTZJQ2RmSnl4Y2JpQWdJQ0JqYjI1MFpYaDBVMlZ3WVhKaGRHOXlPaUFuWHljc1hHNWNiaUFnSUNCellYWmxUV2x6YzJsdVp6b2dabUZzYzJVc0lDOHZJR1Z1WVdKc1pTQjBieUJ6Wlc1a0lHMXBjM05wYm1jZ2RtRnNkV1Z6WEc0Z0lDQWdkWEJrWVhSbFRXbHpjMmx1WnpvZ1ptRnNjMlVzSUM4dklHVnVZV0pzWlNCMGJ5QjFjR1JoZEdVZ1pHVm1ZWFZzZENCMllXeDFaWE1nYVdZZ1pHbG1abVZ5Wlc1MElHWnliMjBnZEhKaGJuTnNZWFJsWkNCMllXeDFaU0FvYjI1c2VTQjFjMlZtZFd3Z2IyNGdhVzVwZEdsaGJDQmtaWFpsYkc5d2JXVnVkQ3dnYjNJZ2QyaGxiaUJyWldWd2FXNW5JR052WkdVZ1lYTWdjMjkxY21ObElHOW1JSFJ5ZFhSb0tWeHVJQ0FnSUhOaGRtVk5hWE56YVc1blZHODZJQ2RtWVd4c1ltRmpheWNzSUM4dklDZGpkWEp5Wlc1MEp5QjhmQ0FuWVd4c0oxeHVJQ0FnSUhOaGRtVk5hWE56YVc1blVHeDFjbUZzY3pvZ2RISjFaU3dnTHk4Z2QybHNiQ0J6WVhabElHRnNiQ0JtYjNKdGN5QnViM1FnYjI1c2VTQnphVzVuZFd4aGNpQnJaWGxjYmlBZ0lDQnRhWE56YVc1blMyVjVTR0Z1Wkd4bGNqb2dabUZzYzJVc0lDOHZJR1oxYm1OMGFXOXVLR3h1Wnl3Z2JuTXNJR3RsZVN3Z1ptRnNiR0poWTJ0V1lXeDFaU2tnTFQ0Z2IzWmxjbkpwWkdVZ2FXWWdjSEpsWm1WeUlHOXVJR2hoYm1Sc2FXNW5YRzVjYmlBZ0lDQndiM04wVUhKdlkyVnpjem9nWm1Gc2MyVXNJQzh2SUhOMGNtbHVaeUJ2Y2lCaGNuSmhlU0J2WmlCd2IzTjBVSEp2WTJWemMyOXlJRzVoYldWelhHNGdJQ0FnY21WMGRYSnVUblZzYkRvZ2RISjFaU3dnTHk4Z1lXeHNiM2R6SUc1MWJHd2dkbUZzZFdVZ1lYTWdkbUZzYVdRZ2RISmhibk5zWVhScGIyNWNiaUFnSUNCeVpYUjFjbTVGYlhCMGVWTjBjbWx1WnpvZ2RISjFaU3dnTHk4Z1lXeHNiM2R6SUdWdGNIUjVJSE4wY21sdVp5QjJZV3gxWlNCaGN5QjJZV3hwWkNCMGNtRnVjMnhoZEdsdmJseHVJQ0FnSUhKbGRIVnliazlpYW1WamRITTZJR1poYkhObExGeHVJQ0FnSUdwdmFXNUJjbkpoZVhNNklHWmhiSE5sTENBdkx5QnZjaUJ6ZEhKcGJtY2dkRzhnYW05cGJpQmhjbkpoZVZ4dUlDQWdJSEpsZEhWeWJtVmtUMkpxWldOMFNHRnVaR3hsY2pvZ1puVnVZM1JwYjI0Z2NtVjBkWEp1WldSUFltcGxZM1JJWVc1a2JHVnlLQ2tnZTMwc0lDOHZJR1oxYm1OMGFXOXVLR3RsZVN3Z2RtRnNkV1VzSUc5d2RHbHZibk1wSUhSeWFXZG5aWEpsWkNCcFppQnJaWGtnY21WMGRYSnVjeUJ2WW1wbFkzUWdZblYwSUhKbGRIVnliazlpYW1WamRITWdhWE1nYzJWMElIUnZJR1poYkhObFhHNGdJQ0FnY0dGeWMyVk5hWE56YVc1blMyVjVTR0Z1Wkd4bGNqb2dabUZzYzJVc0lDOHZJR1oxYm1OMGFXOXVLR3RsZVNrZ2NHRnljMlZrSUdFZ2EyVjVJSFJvWVhRZ2QyRnpJRzV2ZENCbWIzVnVaQ0JwYmlCMEtDa2dZbVZtYjNKbElISmxkSFZ5Ym1sdVoxeHVJQ0FnSUdGd2NHVnVaRTVoYldWemNHRmpaVlJ2VFdsemMybHVaMHRsZVRvZ1ptRnNjMlVzWEc0Z0lDQWdZWEJ3Wlc1a1RtRnRaWE53WVdObFZHOURTVTF2WkdVNklHWmhiSE5sTEZ4dUlDQWdJRzkyWlhKc2IyRmtWSEpoYm5Oc1lYUnBiMjVQY0hScGIyNUlZVzVrYkdWeU9pQm1kVzVqZEdsdmJpQm9ZVzVrYkdVb1lYSm5jeWtnZTF4dUlDQWdJQ0FnZG1GeUlISmxkQ0E5SUh0OU8xeHVJQ0FnSUNBZ2FXWWdLR0Z5WjNOYk1WMHBJSEpsZEM1a1pXWmhkV3gwVm1Gc2RXVWdQU0JoY21keld6RmRPMXh1SUNBZ0lDQWdhV1lnS0dGeVozTmJNbDBwSUhKbGRDNTBSR1Z6WTNKcGNIUnBiMjRnUFNCaGNtZHpXekpkTzF4dUlDQWdJQ0FnY21WMGRYSnVJSEpsZER0Y2JpQWdJQ0I5TEZ4dVhHNGdJQ0FnYVc1MFpYSndiMnhoZEdsdmJqb2dlMXh1SUNBZ0lDQWdaWE5qWVhCbFZtRnNkV1U2SUhSeWRXVXNYRzRnSUNBZ0lDQm1iM0p0WVhRNklHWjFibU4wYVc5dUlHWnZjbTFoZENoMllXeDFaU3dnWDJadmNtMWhkQ3dnYkc1bktTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjJZV3gxWlR0Y2JpQWdJQ0FnSUgwc1hHNGdJQ0FnSUNCd2NtVm1hWGc2SUNkN2V5Y3NYRzRnSUNBZ0lDQnpkV1ptYVhnNklDZDlmU2NzWEc0Z0lDQWdJQ0JtYjNKdFlYUlRaWEJoY21GMGIzSTZJQ2NzSnl4Y2JpQWdJQ0FnSUM4dklIQnlaV1pwZUVWelkyRndaV1E2SUNkN2V5Y3NYRzRnSUNBZ0lDQXZMeUJ6ZFdabWFYaEZjMk5oY0dWa09pQW5mWDBuTEZ4dUlDQWdJQ0FnTHk4Z2RXNWxjMk5oY0dWVGRXWm1hWGc2SUNjbkxGeHVJQ0FnSUNBZ2RXNWxjMk5oY0dWUWNtVm1hWGc2SUNjdEp5eGNibHh1SUNBZ0lDQWdibVZ6ZEdsdVoxQnlaV1pwZURvZ0p5UjBLQ2NzWEc0Z0lDQWdJQ0J1WlhOMGFXNW5VM1ZtWm1sNE9pQW5LU2NzWEc0Z0lDQWdJQ0F2THlCdVpYTjBhVzVuVUhKbFptbDRSWE5qWVhCbFpEb2dKeVIwS0Njc1hHNGdJQ0FnSUNBdkx5QnVaWE4wYVc1blUzVm1abWw0UlhOallYQmxaRG9nSnlrbkxGeHVJQ0FnSUNBZ0x5OGdaR1ZtWVhWc2RGWmhjbWxoWW14bGN6b2dkVzVrWldacGJtVmtJQzh2SUc5aWFtVmpkQ0IwYUdGMElHTmhiaUJvWVhabElIWmhiSFZsY3lCMGJ5QnBiblJsY25CdmJHRjBaU0J2YmlBdElHVjRkR1Z1WkhNZ2NHRnpjMlZrSUdsdUlHbHVkR1Z5Y0c5c1lYUnBiMjRnWkdGMFlWeHVJQ0FnSUNBZ2JXRjRVbVZ3YkdGalpYTTZJREV3TURBZ0x5OGdiV0Y0SUhKbGNHeGhZMlZ6SUhSdklIQnlaWFpsYm5RZ1pXNWtiR1Z6Y3lCc2IyOXdYRzRnSUNBZ2ZWeHVJQ0I5TzF4dWZWeHVYRzR2S2lCbGMyeHBiblFnYm04dGNHRnlZVzB0Y21WaGMzTnBaMjQ2SURBZ0tpOWNibVY0Y0c5eWRITXVaMlYwSUQwZ1oyVjBPMXh1Wm5WdVkzUnBiMjRnZEhKaGJuTm1iM0p0VDNCMGFXOXVjeWh2Y0hScGIyNXpLU0I3WEc0Z0lDOHZJR055WldGMFpTQnVZVzFsYzNCaFkyVWdiMkpxWldOMElHbG1JRzVoYldWemNHRmpaU0JwY3lCd1lYTnpaV1FnYVc0Z1lYTWdjM1J5YVc1blhHNGdJR2xtSUNoMGVYQmxiMllnYjNCMGFXOXVjeTV1Y3lBOVBUMGdKM04wY21sdVp5Y3BJRzl3ZEdsdmJuTXVibk1nUFNCYmIzQjBhVzl1Y3k1dWMxMDdYRzRnSUdsbUlDaDBlWEJsYjJZZ2IzQjBhVzl1Y3k1bVlXeHNZbUZqYTB4dVp5QTlQVDBnSjNOMGNtbHVaeWNwSUc5d2RHbHZibk11Wm1Gc2JHSmhZMnRNYm1jZ1BTQmJiM0IwYVc5dWN5NW1ZV3hzWW1GamEweHVaMTA3WEc0Z0lHbG1JQ2gwZVhCbGIyWWdiM0IwYVc5dWN5NW1ZV3hzWW1GamEwNVRJRDA5UFNBbmMzUnlhVzVuSnlrZ2IzQjBhVzl1Y3k1bVlXeHNZbUZqYTA1VElEMGdXMjl3ZEdsdmJuTXVabUZzYkdKaFkydE9VMTA3WEc1Y2JpQWdMeThnWlhoMFpXNWtJSGRvYVhSbGJHbHpkQ0IzYVhSb0lHTnBiVzlrWlZ4dUlDQnBaaUFvYjNCMGFXOXVjeTUzYUdsMFpXeHBjM1FnSmlZZ2IzQjBhVzl1Y3k1M2FHbDBaV3hwYzNRdWFXNWtaWGhQWmlnblkybHRiMlJsSnlrZ1BDQXdLU0J2Y0hScGIyNXpMbmRvYVhSbGJHbHpkQzV3ZFhOb0tDZGphVzF2WkdVbktUdGNibHh1SUNCeVpYUjFjbTRnYjNCMGFXOXVjenRjYm4waUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JrOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JjSWw5ZlpYTk5iMlIxYkdWY0lpd2dlMXh1SUNCMllXeDFaVG9nZEhKMVpWeHVmU2s3WEc1Y2JuWmhjaUJmZEhsd1pXOW1JRDBnZEhsd1pXOW1JRk41YldKdmJDQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUlDWW1JSFI1Y0dWdlppQlRlVzFpYjJ3dWFYUmxjbUYwYjNJZ1BUMDlJRndpYzNsdFltOXNYQ0lnUHlCbWRXNWpkR2x2YmlBb2IySnFLU0I3SUhKbGRIVnliaUIwZVhCbGIyWWdiMkpxT3lCOUlEb2dablZ1WTNScGIyNGdLRzlpYWlrZ2V5QnlaWFIxY200Z2IySnFJQ1ltSUhSNWNHVnZaaUJUZVcxaWIyd2dQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpQW1KaUJ2WW1vdVkyOXVjM1J5ZFdOMGIzSWdQVDA5SUZONWJXSnZiQ0FtSmlCdlltb2dJVDA5SUZONWJXSnZiQzV3Y205MGIzUjVjR1VnUHlCY0luTjViV0p2YkZ3aUlEb2dkSGx3Wlc5bUlHOWlhanNnZlR0Y2JseHVkbUZ5SUY5bGVIUmxibVJ6SUQwZ1QySnFaV04wTG1GemMybG5iaUI4ZkNCbWRXNWpkR2x2YmlBb2RHRnlaMlYwS1NCN0lHWnZjaUFvZG1GeUlHa2dQU0F4T3lCcElEd2dZWEpuZFcxbGJuUnpMbXhsYm1kMGFEc2dhU3NyS1NCN0lIWmhjaUJ6YjNWeVkyVWdQU0JoY21kMWJXVnVkSE5iYVYwN0lHWnZjaUFvZG1GeUlHdGxlU0JwYmlCemIzVnlZMlVwSUhzZ2FXWWdLRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2h6YjNWeVkyVXNJR3RsZVNrcElIc2dkR0Z5WjJWMFcydGxlVjBnUFNCemIzVnlZMlZiYTJWNVhUc2dmU0I5SUgwZ2NtVjBkWEp1SUhSaGNtZGxkRHNnZlR0Y2JseHVkbUZ5SUY5c2IyZG5aWElnUFNCeVpYRjFhWEpsS0NjdUwyeHZaMmRsY2k1cWN5Y3BPMXh1WEc1MllYSWdYMnh2WjJkbGNqSWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOXNiMmRuWlhJcE8xeHVYRzUyWVhJZ1gwVjJaVzUwUlcxcGRIUmxjaklnUFNCeVpYRjFhWEpsS0NjdUwwVjJaVzUwUlcxcGRIUmxjaTVxY3ljcE8xeHVYRzUyWVhJZ1gwVjJaVzUwUlcxcGRIUmxjak1nUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjlGZG1WdWRFVnRhWFIwWlhJeUtUdGNibHh1ZG1GeUlGOVNaWE52ZFhKalpWTjBiM0psSUQwZ2NtVnhkV2x5WlNnbkxpOVNaWE52ZFhKalpWTjBiM0psTG1wekp5azdYRzVjYm5aaGNpQmZVbVZ6YjNWeVkyVlRkRzl5WlRJZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5U1pYTnZkWEpqWlZOMGIzSmxLVHRjYmx4dWRtRnlJRjlVY21GdWMyeGhkRzl5SUQwZ2NtVnhkV2x5WlNnbkxpOVVjbUZ1YzJ4aGRHOXlMbXB6SnlrN1hHNWNiblpoY2lCZlZISmhibk5zWVhSdmNqSWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOVVjbUZ1YzJ4aGRHOXlLVHRjYmx4dWRtRnlJRjlNWVc1bmRXRm5aVlYwYVd4eklEMGdjbVZ4ZFdseVpTZ25MaTlNWVc1bmRXRm5aVlYwYVd4ekxtcHpKeWs3WEc1Y2JuWmhjaUJmVEdGdVozVmhaMlZWZEdsc2N6SWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOU1ZVzVuZFdGblpWVjBhV3h6S1R0Y2JseHVkbUZ5SUY5UWJIVnlZV3hTWlhOdmJIWmxjaUE5SUhKbGNYVnBjbVVvSnk0dlVHeDFjbUZzVW1WemIyeDJaWEl1YW5NbktUdGNibHh1ZG1GeUlGOVFiSFZ5WVd4U1pYTnZiSFpsY2pJZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5UWJIVnlZV3hTWlhOdmJIWmxjaWs3WEc1Y2JuWmhjaUJmU1c1MFpYSndiMnhoZEc5eUlEMGdjbVZ4ZFdseVpTZ25MaTlKYm5SbGNuQnZiR0YwYjNJdWFuTW5LVHRjYmx4dWRtRnlJRjlKYm5SbGNuQnZiR0YwYjNJeUlEMGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENoZlNXNTBaWEp3YjJ4aGRHOXlLVHRjYmx4dWRtRnlJRjlDWVdOclpXNWtRMjl1Ym1WamRHOXlJRDBnY21WeGRXbHlaU2duTGk5Q1lXTnJaVzVrUTI5dWJtVmpkRzl5TG1wekp5azdYRzVjYm5aaGNpQmZRbUZqYTJWdVpFTnZibTVsWTNSdmNqSWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOUNZV05yWlc1a1EyOXVibVZqZEc5eUtUdGNibHh1ZG1GeUlGOURZV05vWlVOdmJtNWxZM1J2Y2lBOUlISmxjWFZwY21Vb0p5NHZRMkZqYUdWRGIyNXVaV04wYjNJdWFuTW5LVHRjYmx4dWRtRnlJRjlEWVdOb1pVTnZibTVsWTNSdmNqSWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOURZV05vWlVOdmJtNWxZM1J2Y2lrN1hHNWNiblpoY2lCZlpHVm1ZWFZzZEhNeUlEMGdjbVZ4ZFdseVpTZ25MaTlrWldaaGRXeDBjeTVxY3ljcE8xeHVYRzUyWVhJZ1gzQnZjM1JRY205alpYTnpiM0lnUFNCeVpYRjFhWEpsS0NjdUwzQnZjM1JRY205alpYTnpiM0l1YW5NbktUdGNibHh1ZG1GeUlGOXdiM04wVUhKdlkyVnpjMjl5TWlBOUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvWDNCdmMzUlFjbTlqWlhOemIzSXBPMXh1WEc1bWRXNWpkR2x2YmlCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRzlpYWlrZ2V5QnlaWFIxY200Z2IySnFJQ1ltSUc5aWFpNWZYMlZ6VFc5a2RXeGxJRDhnYjJKcUlEb2dleUJrWldaaGRXeDBPaUJ2WW1vZ2ZUc2dmVnh1WEc1bWRXNWpkR2x2YmlCZlpHVm1ZWFZzZEhNb2IySnFMQ0JrWldaaGRXeDBjeWtnZXlCMllYSWdhMlY1Y3lBOUlFOWlhbVZqZEM1blpYUlBkMjVRY205d1pYSjBlVTVoYldWektHUmxabUYxYkhSektUc2dabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JyWlhsekxteGxibWQwYURzZ2FTc3JLU0I3SUhaaGNpQnJaWGtnUFNCclpYbHpXMmxkT3lCMllYSWdkbUZzZFdVZ1BTQlBZbXBsWTNRdVoyVjBUM2R1VUhKdmNHVnlkSGxFWlhOamNtbHdkRzl5S0dSbFptRjFiSFJ6TENCclpYa3BPeUJwWmlBb2RtRnNkV1VnSmlZZ2RtRnNkV1V1WTI5dVptbG5kWEpoWW14bElDWW1JRzlpYWx0clpYbGRJRDA5UFNCMWJtUmxabWx1WldRcElIc2dUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0c5aWFpd2dhMlY1TENCMllXeDFaU2s3SUgwZ2ZTQnlaWFIxY200Z2IySnFPeUI5WEc1Y2JtWjFibU4wYVc5dUlGOWpiR0Z6YzBOaGJHeERhR1ZqYXlocGJuTjBZVzVqWlN3Z1EyOXVjM1J5ZFdOMGIzSXBJSHNnYVdZZ0tDRW9hVzV6ZEdGdVkyVWdhVzV6ZEdGdVkyVnZaaUJEYjI1emRISjFZM1J2Y2lrcElIc2dkR2h5YjNjZ2JtVjNJRlI1Y0dWRmNuSnZjaWhjSWtOaGJtNXZkQ0JqWVd4c0lHRWdZMnhoYzNNZ1lYTWdZU0JtZFc1amRHbHZibHdpS1RzZ2ZTQjlYRzVjYm1aMWJtTjBhVzl1SUY5d2IzTnphV0pzWlVOdmJuTjBjblZqZEc5eVVtVjBkWEp1S0hObGJHWXNJR05oYkd3cElIc2dhV1lnS0NGelpXeG1LU0I3SUhSb2NtOTNJRzVsZHlCU1pXWmxjbVZ1WTJWRmNuSnZjaWhjSW5Sb2FYTWdhR0Z6YmlkMElHSmxaVzRnYVc1cGRHbGhiR2x6WldRZ0xTQnpkWEJsY2lncElHaGhjMjRuZENCaVpXVnVJR05oYkd4bFpGd2lLVHNnZlNCeVpYUjFjbTRnWTJGc2JDQW1KaUFvZEhsd1pXOW1JR05oYkd3Z1BUMDlJRndpYjJKcVpXTjBYQ0lnZkh3Z2RIbHdaVzltSUdOaGJHd2dQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpa2dQeUJqWVd4c0lEb2djMlZzWmpzZ2ZWeHVYRzVtZFc1amRHbHZiaUJmYVc1b1pYSnBkSE1vYzNWaVEyeGhjM01zSUhOMWNHVnlRMnhoYzNNcElIc2dhV1lnS0hSNWNHVnZaaUJ6ZFhCbGNrTnNZWE56SUNFOVBTQmNJbVoxYm1OMGFXOXVYQ0lnSmlZZ2MzVndaWEpEYkdGemN5QWhQVDBnYm5Wc2JDa2dleUIwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0Z3aVUzVndaWElnWlhod2NtVnpjMmx2YmlCdGRYTjBJR1ZwZEdobGNpQmlaU0J1ZFd4c0lHOXlJR0VnWm5WdVkzUnBiMjRzSUc1dmRDQmNJaUFySUhSNWNHVnZaaUJ6ZFhCbGNrTnNZWE56S1RzZ2ZTQnpkV0pEYkdGemN5NXdjbTkwYjNSNWNHVWdQU0JQWW1wbFkzUXVZM0psWVhSbEtITjFjR1Z5UTJ4aGMzTWdKaVlnYzNWd1pYSkRiR0Z6Y3k1d2NtOTBiM1I1Y0dVc0lIc2dZMjl1YzNSeWRXTjBiM0k2SUhzZ2RtRnNkV1U2SUhOMVlrTnNZWE56TENCbGJuVnRaWEpoWW14bE9pQm1ZV3h6WlN3Z2QzSnBkR0ZpYkdVNklIUnlkV1VzSUdOdmJtWnBaM1Z5WVdKc1pUb2dkSEoxWlNCOUlIMHBPeUJwWmlBb2MzVndaWEpEYkdGemN5a2dUMkpxWldOMExuTmxkRkJ5YjNSdmRIbHdaVTltSUQ4Z1QySnFaV04wTG5ObGRGQnliM1J2ZEhsd1pVOW1LSE4xWWtOc1lYTnpMQ0J6ZFhCbGNrTnNZWE56S1NBNklGOWtaV1poZFd4MGN5aHpkV0pEYkdGemN5d2djM1Z3WlhKRGJHRnpjeWs3SUgxY2JseHVablZ1WTNScGIyNGdibTl2Y0NncElIdDlYRzVjYm5aaGNpQkpNVGh1SUQwZ1puVnVZM1JwYjI0Z0tGOUZkbVZ1ZEVWdGFYUjBaWElwSUh0Y2JpQWdYMmx1YUdWeWFYUnpLRWt4T0c0c0lGOUZkbVZ1ZEVWdGFYUjBaWElwTzF4dVhHNGdJR1oxYm1OMGFXOXVJRWt4T0c0b0tTQjdYRzRnSUNBZ2RtRnlJRzl3ZEdsdmJuTWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTUNBbUppQmhjbWQxYldWdWRITmJNRjBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXN3WFNBNklIdDlPMXh1SUNBZ0lIWmhjaUJqWVd4c1ltRmpheUE5SUdGeVozVnRaVzUwYzFzeFhUdGNibHh1SUNBZ0lGOWpiR0Z6YzBOaGJHeERhR1ZqYXloMGFHbHpMQ0JKTVRodUtUdGNibHh1SUNBZ0lIWmhjaUJmZEdocGN5QTlJRjl3YjNOemFXSnNaVU52Ym5OMGNuVmpkRzl5VW1WMGRYSnVLSFJvYVhNc0lGOUZkbVZ1ZEVWdGFYUjBaWEl1WTJGc2JDaDBhR2x6S1NrN1hHNWNiaUFnSUNCZmRHaHBjeTV2Y0hScGIyNXpJRDBnS0RBc0lGOWtaV1poZFd4MGN6SXVkSEpoYm5ObWIzSnRUM0IwYVc5dWN5a29iM0IwYVc5dWN5azdYRzRnSUNBZ1gzUm9hWE11YzJWeWRtbGpaWE1nUFNCN2ZUdGNiaUFnSUNCZmRHaHBjeTVzYjJkblpYSWdQU0JmYkc5bloyVnlNaTVrWldaaGRXeDBPMXh1SUNBZ0lGOTBhR2x6TG0xdlpIVnNaWE1nUFNCN0lHVjRkR1Z5Ym1Gc09pQmJYU0I5TzF4dVhHNGdJQ0FnYVdZZ0tHTmhiR3hpWVdOcklDWW1JQ0ZmZEdocGN5NXBjMGx1YVhScFlXeHBlbVZrSUNZbUlDRnZjSFJwYjI1ekxtbHpRMnh2Ym1VcElIdGNiaUFnSUNBZ0lIWmhjaUJmY21WME8xeHVYRzRnSUNBZ0lDQXZMeUJvZEhSd2N6b3ZMMmRwZEdoMVlpNWpiMjB2YVRFNGJtVjRkQzlwTVRodVpYaDBMMmx6YzNWbGN5ODROemxjYmlBZ0lDQWdJR2xtSUNnaFgzUm9hWE11YjNCMGFXOXVjeTVwYm1sMFNXMXRaV1JwWVhSbEtTQnlaWFIxY200Z1gzSmxkQ0E5SUY5MGFHbHpMbWx1YVhRb2IzQjBhVzl1Y3l3Z1kyRnNiR0poWTJzcExDQmZjRzl6YzJsaWJHVkRiMjV6ZEhKMVkzUnZjbEpsZEhWeWJpaGZkR2hwY3l3Z1gzSmxkQ2s3WEc0Z0lDQWdJQ0J6WlhSVWFXMWxiM1YwS0daMWJtTjBhVzl1SUNncElIdGNiaUFnSUNBZ0lDQWdYM1JvYVhNdWFXNXBkQ2h2Y0hScGIyNXpMQ0JqWVd4c1ltRmpheWs3WEc0Z0lDQWdJQ0I5TENBd0tUdGNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJRjkwYUdsek8xeHVJQ0I5WEc1Y2JpQWdTVEU0Ymk1d2NtOTBiM1I1Y0dVdWFXNXBkQ0E5SUdaMWJtTjBhVzl1SUdsdWFYUW9LU0I3WEc0Z0lDQWdkbUZ5SUY5MGFHbHpNaUE5SUhSb2FYTTdYRzVjYmlBZ0lDQjJZWElnYjNCMGFXOXVjeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBd0lDWW1JR0Z5WjNWdFpXNTBjMXN3WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pCZElEb2dlMzA3WEc0Z0lDQWdkbUZ5SUdOaGJHeGlZV05ySUQwZ1lYSm5kVzFsYm5Seld6RmRPMXh1WEc0Z0lDQWdhV1lnS0hSNWNHVnZaaUJ2Y0hScGIyNXpJRDA5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQmpZV3hzWW1GamF5QTlJRzl3ZEdsdmJuTTdYRzRnSUNBZ0lDQnZjSFJwYjI1eklEMGdlMzA3WEc0Z0lDQWdmVnh1SUNBZ0lIUm9hWE11YjNCMGFXOXVjeUE5SUY5bGVIUmxibVJ6S0h0OUxDQW9NQ3dnWDJSbFptRjFiSFJ6TWk1blpYUXBLQ2tzSUhSb2FYTXViM0IwYVc5dWN5d2dLREFzSUY5a1pXWmhkV3gwY3pJdWRISmhibk5tYjNKdFQzQjBhVzl1Y3lrb2IzQjBhVzl1Y3lrcE8xeHVYRzRnSUNBZ2RHaHBjeTVtYjNKdFlYUWdQU0IwYUdsekxtOXdkR2x2Ym5NdWFXNTBaWEp3YjJ4aGRHbHZiaTVtYjNKdFlYUTdYRzRnSUNBZ2FXWWdLQ0ZqWVd4c1ltRmpheWtnWTJGc2JHSmhZMnNnUFNCdWIyOXdPMXh1WEc0Z0lDQWdablZ1WTNScGIyNGdZM0psWVhSbFEyeGhjM05QYmtSbGJXRnVaQ2hEYkdGemMwOXlUMkpxWldOMEtTQjdYRzRnSUNBZ0lDQnBaaUFvSVVOc1lYTnpUM0pQWW1wbFkzUXBJSEpsZEhWeWJpQnVkV3hzTzF4dUlDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCRGJHRnpjMDl5VDJKcVpXTjBJRDA5UFNBblpuVnVZM1JwYjI0bktTQnlaWFIxY200Z2JtVjNJRU5zWVhOelQzSlBZbXBsWTNRb0tUdGNiaUFnSUNBZ0lISmxkSFZ5YmlCRGJHRnpjMDl5VDJKcVpXTjBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJR2x1YVhRZ2MyVnlkbWxqWlhOY2JpQWdJQ0JwWmlBb0lYUm9hWE11YjNCMGFXOXVjeTVwYzBOc2IyNWxLU0I3WEc0Z0lDQWdJQ0JwWmlBb2RHaHBjeTV0YjJSMWJHVnpMbXh2WjJkbGNpa2dlMXh1SUNBZ0lDQWdJQ0JmYkc5bloyVnlNaTVrWldaaGRXeDBMbWx1YVhRb1kzSmxZWFJsUTJ4aGMzTlBia1JsYldGdVpDaDBhR2x6TG0xdlpIVnNaWE11Ykc5bloyVnlLU3dnZEdocGN5NXZjSFJwYjI1ektUdGNiaUFnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lGOXNiMmRuWlhJeUxtUmxabUYxYkhRdWFXNXBkQ2h1ZFd4c0xDQjBhR2x6TG05d2RHbHZibk1wTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCMllYSWdiSFVnUFNCdVpYY2dYMHhoYm1kMVlXZGxWWFJwYkhNeUxtUmxabUYxYkhRb2RHaHBjeTV2Y0hScGIyNXpLVHRjYmlBZ0lDQWdJSFJvYVhNdWMzUnZjbVVnUFNCdVpYY2dYMUpsYzI5MWNtTmxVM1J2Y21VeUxtUmxabUYxYkhRb2RHaHBjeTV2Y0hScGIyNXpMbkpsYzI5MWNtTmxjeXdnZEdocGN5NXZjSFJwYjI1ektUdGNibHh1SUNBZ0lDQWdkbUZ5SUhNZ1BTQjBhR2x6TG5ObGNuWnBZMlZ6TzF4dUlDQWdJQ0FnY3k1c2IyZG5aWElnUFNCZmJHOW5aMlZ5TWk1a1pXWmhkV3gwTzF4dUlDQWdJQ0FnY3k1eVpYTnZkWEpqWlZOMGIzSmxJRDBnZEdocGN5NXpkRzl5WlR0Y2JpQWdJQ0FnSUhNdWNtVnpiM1Z5WTJWVGRHOXlaUzV2YmlnbllXUmtaV1FnY21WdGIzWmxaQ2NzSUdaMWJtTjBhVzl1SUNoc2JtY3NJRzV6S1NCN1hHNGdJQ0FnSUNBZ0lITXVZMkZqYUdWRGIyNXVaV04wYjNJdWMyRjJaU2dwTzF4dUlDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNCekxteGhibWQxWVdkbFZYUnBiSE1nUFNCc2RUdGNiaUFnSUNBZ0lITXVjR3gxY21Gc1VtVnpiMngyWlhJZ1BTQnVaWGNnWDFCc2RYSmhiRkpsYzI5c2RtVnlNaTVrWldaaGRXeDBLR3gxTENCN0lIQnlaWEJsYm1RNklIUm9hWE11YjNCMGFXOXVjeTV3YkhWeVlXeFRaWEJoY21GMGIzSXNJR052YlhCaGRHbGlhV3hwZEhsS1UwOU9PaUIwYUdsekxtOXdkR2x2Ym5NdVkyOXRjR0YwYVdKcGJHbDBlVXBUVDA0c0lITnBiWEJzYVdaNVVHeDFjbUZzVTNWbVptbDRPaUIwYUdsekxtOXdkR2x2Ym5NdWMybHRjR3hwWm5sUWJIVnlZV3hUZFdabWFYZ2dmU2s3WEc0Z0lDQWdJQ0J6TG1sdWRHVnljRzlzWVhSdmNpQTlJRzVsZHlCZlNXNTBaWEp3YjJ4aGRHOXlNaTVrWldaaGRXeDBLSFJvYVhNdWIzQjBhVzl1Y3lrN1hHNWNiaUFnSUNBZ0lITXVZbUZqYTJWdVpFTnZibTVsWTNSdmNpQTlJRzVsZHlCZlFtRmphMlZ1WkVOdmJtNWxZM1J2Y2pJdVpHVm1ZWFZzZENoamNtVmhkR1ZEYkdGemMwOXVSR1Z0WVc1a0tIUm9hWE11Ylc5a2RXeGxjeTVpWVdOclpXNWtLU3dnY3k1eVpYTnZkWEpqWlZOMGIzSmxMQ0J6TENCMGFHbHpMbTl3ZEdsdmJuTXBPMXh1SUNBZ0lDQWdMeThnY0dsd1pTQmxkbVZ1ZEhNZ1puSnZiU0JpWVdOclpXNWtRMjl1Ym1WamRHOXlYRzRnSUNBZ0lDQnpMbUpoWTJ0bGJtUkRiMjV1WldOMGIzSXViMjRvSnlvbkxDQm1kVzVqZEdsdmJpQW9aWFpsYm5RcElIdGNiaUFnSUNBZ0lDQWdabTl5SUNoMllYSWdYMnhsYmlBOUlHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnc0lHRnlaM01nUFNCQmNuSmhlU2hmYkdWdUlENGdNU0EvSUY5c1pXNGdMU0F4SURvZ01Da3NJRjlyWlhrZ1BTQXhPeUJmYTJWNUlEd2dYMnhsYmpzZ1gydGxlU3NyS1NCN1hHNGdJQ0FnSUNBZ0lDQWdZWEpuYzF0ZmEyVjVJQzBnTVYwZ1BTQmhjbWQxYldWdWRITmJYMnRsZVYwN1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0JmZEdocGN6SXVaVzFwZEM1aGNIQnNlU2hmZEdocGN6SXNJRnRsZG1WdWRGMHVZMjl1WTJGMEtHRnlaM01wS1R0Y2JpQWdJQ0FnSUgwcE8xeHVYRzRnSUNBZ0lDQnpMbUpoWTJ0bGJtUkRiMjV1WldOMGIzSXViMjRvSjJ4dllXUmxaQ2NzSUdaMWJtTjBhVzl1SUNoc2IyRmtaV1FwSUh0Y2JpQWdJQ0FnSUNBZ2N5NWpZV05vWlVOdmJtNWxZM1J2Y2k1ellYWmxLQ2s3WEc0Z0lDQWdJQ0I5S1R0Y2JseHVJQ0FnSUNBZ2N5NWpZV05vWlVOdmJtNWxZM1J2Y2lBOUlHNWxkeUJmUTJGamFHVkRiMjV1WldOMGIzSXlMbVJsWm1GMWJIUW9ZM0psWVhSbFEyeGhjM05QYmtSbGJXRnVaQ2gwYUdsekxtMXZaSFZzWlhNdVkyRmphR1VwTENCekxuSmxjMjkxY21ObFUzUnZjbVVzSUhNc0lIUm9hWE11YjNCMGFXOXVjeWs3WEc0Z0lDQWdJQ0F2THlCd2FYQmxJR1YyWlc1MGN5Qm1jbTl0SUdKaFkydGxibVJEYjI1dVpXTjBiM0pjYmlBZ0lDQWdJSE11WTJGamFHVkRiMjV1WldOMGIzSXViMjRvSnlvbkxDQm1kVzVqZEdsdmJpQW9aWFpsYm5RcElIdGNiaUFnSUNBZ0lDQWdabTl5SUNoMllYSWdYMnhsYmpJZ1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb0xDQmhjbWR6SUQwZ1FYSnlZWGtvWDJ4bGJqSWdQaUF4SUQ4Z1gyeGxiaklnTFNBeElEb2dNQ2tzSUY5clpYa3lJRDBnTVRzZ1gydGxlVElnUENCZmJHVnVNanNnWDJ0bGVUSXJLeWtnZTF4dUlDQWdJQ0FnSUNBZ0lHRnlaM05iWDJ0bGVUSWdMU0F4WFNBOUlHRnlaM1Z0Wlc1MGMxdGZhMlY1TWwwN1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0JmZEdocGN6SXVaVzFwZEM1aGNIQnNlU2hmZEdocGN6SXNJRnRsZG1WdWRGMHVZMjl1WTJGMEtHRnlaM01wS1R0Y2JpQWdJQ0FnSUgwcE8xeHVYRzRnSUNBZ0lDQnBaaUFvZEdocGN5NXRiMlIxYkdWekxteGhibWQxWVdkbFJHVjBaV04wYjNJcElIdGNiaUFnSUNBZ0lDQWdjeTVzWVc1bmRXRm5aVVJsZEdWamRHOXlJRDBnWTNKbFlYUmxRMnhoYzNOUGJrUmxiV0Z1WkNoMGFHbHpMbTF2WkhWc1pYTXViR0Z1WjNWaFoyVkVaWFJsWTNSdmNpazdYRzRnSUNBZ0lDQWdJSE11YkdGdVozVmhaMlZFWlhSbFkzUnZjaTVwYm1sMEtITXNJSFJvYVhNdWIzQjBhVzl1Y3k1a1pYUmxZM1JwYjI0c0lIUm9hWE11YjNCMGFXOXVjeWs3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUhSb2FYTXVkSEpoYm5Oc1lYUnZjaUE5SUc1bGR5QmZWSEpoYm5Oc1lYUnZjakl1WkdWbVlYVnNkQ2gwYUdsekxuTmxjblpwWTJWekxDQjBhR2x6TG05d2RHbHZibk1wTzF4dUlDQWdJQ0FnTHk4Z2NHbHdaU0JsZG1WdWRITWdabkp2YlNCMGNtRnVjMnhoZEc5eVhHNGdJQ0FnSUNCMGFHbHpMblJ5WVc1emJHRjBiM0l1YjI0b0p5b25MQ0JtZFc1amRHbHZiaUFvWlhabGJuUXBJSHRjYmlBZ0lDQWdJQ0FnWm05eUlDaDJZWElnWDJ4bGJqTWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9MQ0JoY21keklEMGdRWEp5WVhrb1gyeGxiak1nUGlBeElEOGdYMnhsYmpNZ0xTQXhJRG9nTUNrc0lGOXJaWGt6SUQwZ01Uc2dYMnRsZVRNZ1BDQmZiR1Z1TXpzZ1gydGxlVE1yS3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJR0Z5WjNOYlgydGxlVE1nTFNBeFhTQTlJR0Z5WjNWdFpXNTBjMXRmYTJWNU0xMDdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCZmRHaHBjekl1WlcxcGRDNWhjSEJzZVNoZmRHaHBjeklzSUZ0bGRtVnVkRjB1WTI5dVkyRjBLR0Z5WjNNcEtUdGNiaUFnSUNBZ0lIMHBPMXh1WEc0Z0lDQWdJQ0IwYUdsekxtMXZaSFZzWlhNdVpYaDBaWEp1WVd3dVptOXlSV0ZqYUNobWRXNWpkR2x2YmlBb2JTa2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb2JTNXBibWwwS1NCdExtbHVhWFFvWDNSb2FYTXlLVHRjYmlBZ0lDQWdJSDBwTzF4dUlDQWdJSDFjYmx4dUlDQWdJQzh2SUdGd2NHVnVaQ0JoY0dsY2JpQWdJQ0IyWVhJZ2MzUnZjbVZCY0drZ1BTQmJKMmRsZEZKbGMyOTFjbU5sSnl3Z0oyRmtaRkpsYzI5MWNtTmxKeXdnSjJGa1pGSmxjMjkxY21ObGN5Y3NJQ2RoWkdSU1pYTnZkWEpqWlVKMWJtUnNaU2NzSUNkeVpXMXZkbVZTWlhOdmRYSmpaVUoxYm1Sc1pTY3NJQ2RvWVhOU1pYTnZkWEpqWlVKMWJtUnNaU2NzSUNkblpYUlNaWE52ZFhKalpVSjFibVJzWlNkZE8xeHVJQ0FnSUhOMGIzSmxRWEJwTG1admNrVmhZMmdvWm5WdVkzUnBiMjRnS0daalRtRnRaU2tnZTF4dUlDQWdJQ0FnWDNSb2FYTXlXMlpqVG1GdFpWMGdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJmYzNSdmNtVTdYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJQ2hmYzNSdmNtVWdQU0JmZEdocGN6SXVjM1J2Y21VcFcyWmpUbUZ0WlYwdVlYQndiSGtvWDNOMGIzSmxMQ0JoY21kMWJXVnVkSE1wTzF4dUlDQWdJQ0FnZlR0Y2JpQWdJQ0I5S1R0Y2JseHVJQ0FnSUhaaGNpQnNiMkZrSUQwZ1puVnVZM1JwYjI0Z2JHOWhaQ2dwSUh0Y2JpQWdJQ0FnSUY5MGFHbHpNaTVqYUdGdVoyVk1ZVzVuZFdGblpTaGZkR2hwY3pJdWIzQjBhVzl1Y3k1c2JtY3NJR1oxYm1OMGFXOXVJQ2hsY25Jc0lIUXBJSHRjYmlBZ0lDQWdJQ0FnWDNSb2FYTXlMbWx6U1c1cGRHbGhiR2w2WldRZ1BTQjBjblZsTzF4dUlDQWdJQ0FnSUNCZmRHaHBjekl1Ykc5bloyVnlMbXh2WnlnbmFXNXBkR2xoYkdsNlpXUW5MQ0JmZEdocGN6SXViM0IwYVc5dWN5azdYRzRnSUNBZ0lDQWdJRjkwYUdsek1pNWxiV2wwS0NkcGJtbDBhV0ZzYVhwbFpDY3NJRjkwYUdsek1pNXZjSFJwYjI1ektUdGNibHh1SUNBZ0lDQWdJQ0JqWVd4c1ltRmpheWhsY25Jc0lIUXBPMXh1SUNBZ0lDQWdmU2s3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJR2xtSUNoMGFHbHpMbTl3ZEdsdmJuTXVjbVZ6YjNWeVkyVnpJSHg4SUNGMGFHbHpMbTl3ZEdsdmJuTXVhVzVwZEVsdGJXVmthV0YwWlNrZ2UxeHVJQ0FnSUNBZ2JHOWhaQ2dwTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQnpaWFJVYVcxbGIzVjBLR3h2WVdRc0lEQXBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpPMXh1SUNCOU8xeHVYRzRnSUM4cUlHVnpiR2x1ZENCamIyNXphWE4wWlc1MExYSmxkSFZ5YmpvZ01DQXFMMXh1WEc1Y2JpQWdTVEU0Ymk1d2NtOTBiM1I1Y0dVdWJHOWhaRkpsYzI5MWNtTmxjeUE5SUdaMWJtTjBhVzl1SUd4dllXUlNaWE52ZFhKalpYTW9LU0I3WEc0Z0lDQWdkbUZ5SUY5MGFHbHpNeUE5SUhSb2FYTTdYRzVjYmlBZ0lDQjJZWElnWTJGc2JHSmhZMnNnUFNCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUQ0Z01DQW1KaUJoY21kMWJXVnVkSE5iTUYwZ0lUMDlJSFZ1WkdWbWFXNWxaQ0EvSUdGeVozVnRaVzUwYzFzd1hTQTZJRzV2YjNBN1hHNWNiaUFnSUNCcFppQW9JWFJvYVhNdWIzQjBhVzl1Y3k1eVpYTnZkWEpqWlhNcElIdGNiaUFnSUNBZ0lHbG1JQ2gwYUdsekxteGhibWQxWVdkbElDWW1JSFJvYVhNdWJHRnVaM1ZoWjJVdWRHOU1iM2RsY2tOaGMyVW9LU0E5UFQwZ0oyTnBiVzlrWlNjcElISmxkSFZ5YmlCallXeHNZbUZqYXlncE95QXZMeUJoZG05cFpDQnNiMkZrYVc1bklISmxjMjkxY21ObGN5Qm1iM0lnWTJsdGIyUmxYRzVjYmlBZ0lDQWdJSFpoY2lCMGIweHZZV1FnUFNCYlhUdGNibHh1SUNBZ0lDQWdkbUZ5SUdGd2NHVnVaQ0E5SUdaMWJtTjBhVzl1SUdGd2NHVnVaQ2hzYm1jcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0NGc2JtY3BJSEpsZEhWeWJqdGNiaUFnSUNBZ0lDQWdkbUZ5SUd4dVozTWdQU0JmZEdocGN6TXVjMlZ5ZG1salpYTXViR0Z1WjNWaFoyVlZkR2xzY3k1MGIxSmxjMjlzZG1WSWFXVnlZWEpqYUhrb2JHNW5LVHRjYmlBZ0lDQWdJQ0FnYkc1bmN5NW1iM0pGWVdOb0tHWjFibU4wYVc5dUlDaHNLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLSFJ2VEc5aFpDNXBibVJsZUU5bUtHd3BJRHdnTUNrZ2RHOU1iMkZrTG5CMWMyZ29iQ2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ2ZUdGNibHh1SUNBZ0lDQWdhV1lnS0NGMGFHbHpMbXhoYm1kMVlXZGxLU0I3WEc0Z0lDQWdJQ0FnSUM4dklHRjBJR3hsWVhOMElHeHZZV1FnWm1Gc2JHSmhZMnR6SUdsdUlIUm9hWE1nWTJGelpWeHVJQ0FnSUNBZ0lDQjJZWElnWm1Gc2JHSmhZMnR6SUQwZ2RHaHBjeTV6WlhKMmFXTmxjeTVzWVc1bmRXRm5aVlYwYVd4ekxtZGxkRVpoYkd4aVlXTnJRMjlrWlhNb2RHaHBjeTV2Y0hScGIyNXpMbVpoYkd4aVlXTnJURzVuS1R0Y2JpQWdJQ0FnSUNBZ1ptRnNiR0poWTJ0ekxtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z0tHd3BJSHRjYmlBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWVhCd1pXNWtLR3dwTzF4dUlDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lHRndjR1Z1WkNoMGFHbHpMbXhoYm1kMVlXZGxLVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnYVdZZ0tIUm9hWE11YjNCMGFXOXVjeTV3Y21Wc2IyRmtLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXViM0IwYVc5dWN5NXdjbVZzYjJGa0xtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z0tHd3BJSHRjYmlBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWVhCd1pXNWtLR3dwTzF4dUlDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdkR2hwY3k1elpYSjJhV05sY3k1allXTm9aVU52Ym01bFkzUnZjaTVzYjJGa0tIUnZURzloWkN3Z2RHaHBjeTV2Y0hScGIyNXpMbTV6TENCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQWdJRjkwYUdsek15NXpaWEoyYVdObGN5NWlZV05yWlc1a1EyOXVibVZqZEc5eUxteHZZV1FvZEc5TWIyRmtMQ0JmZEdocGN6TXViM0IwYVc5dWN5NXVjeXdnWTJGc2JHSmhZMnNwTzF4dUlDQWdJQ0FnZlNrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJR05oYkd4aVlXTnJLRzUxYkd3cE8xeHVJQ0FnSUgxY2JpQWdmVHRjYmx4dUlDQkpNVGh1TG5CeWIzUnZkSGx3WlM1eVpXeHZZV1JTWlhOdmRYSmpaWE1nUFNCbWRXNWpkR2x2YmlCeVpXeHZZV1JTWlhOdmRYSmpaWE1vYkc1bmN5d2dibk1wSUh0Y2JpQWdJQ0JwWmlBb0lXeHVaM01wSUd4dVozTWdQU0IwYUdsekxteGhibWQxWVdkbGN6dGNiaUFnSUNCcFppQW9JVzV6S1NCdWN5QTlJSFJvYVhNdWIzQjBhVzl1Y3k1dWN6dGNiaUFnSUNCMGFHbHpMbk5sY25acFkyVnpMbUpoWTJ0bGJtUkRiMjV1WldOMGIzSXVjbVZzYjJGa0tHeHVaM01zSUc1ektUdGNiaUFnZlR0Y2JseHVJQ0JKTVRodUxuQnliM1J2ZEhsd1pTNTFjMlVnUFNCbWRXNWpkR2x2YmlCMWMyVW9iVzlrZFd4bEtTQjdYRzRnSUNBZ2FXWWdLRzF2WkhWc1pTNTBlWEJsSUQwOVBTQW5ZbUZqYTJWdVpDY3BJSHRjYmlBZ0lDQWdJSFJvYVhNdWJXOWtkV3hsY3k1aVlXTnJaVzVrSUQwZ2JXOWtkV3hsTzF4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNodGIyUjFiR1V1ZEhsd1pTQTlQVDBnSjJOaFkyaGxKeWtnZTF4dUlDQWdJQ0FnZEdocGN5NXRiMlIxYkdWekxtTmhZMmhsSUQwZ2JXOWtkV3hsTzF4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNodGIyUjFiR1V1ZEhsd1pTQTlQVDBnSjJ4dloyZGxjaWNnZkh3Z2JXOWtkV3hsTG14dlp5QW1KaUJ0YjJSMWJHVXVkMkZ5YmlBbUppQnRiMlIxYkdVdVpYSnliM0lwSUh0Y2JpQWdJQ0FnSUhSb2FYTXViVzlrZFd4bGN5NXNiMmRuWlhJZ1BTQnRiMlIxYkdVN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnYVdZZ0tHMXZaSFZzWlM1MGVYQmxJRDA5UFNBbmJHRnVaM1ZoWjJWRVpYUmxZM1J2Y2ljcElIdGNiaUFnSUNBZ0lIUm9hWE11Ylc5a2RXeGxjeTVzWVc1bmRXRm5aVVJsZEdWamRHOXlJRDBnYlc5a2RXeGxPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHbG1JQ2h0YjJSMWJHVXVkSGx3WlNBOVBUMGdKM0J2YzNSUWNtOWpaWE56YjNJbktTQjdYRzRnSUNBZ0lDQmZjRzl6ZEZCeWIyTmxjM052Y2pJdVpHVm1ZWFZzZEM1aFpHUlFiM04wVUhKdlkyVnpjMjl5S0cxdlpIVnNaU2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0cxdlpIVnNaUzUwZVhCbElEMDlQU0FuTTNKa1VHRnlkSGtuS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbTF2WkhWc1pYTXVaWGgwWlhKdVlXd3VjSFZ6YUNodGIyUjFiR1VwTzF4dUlDQWdJSDFjYmx4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TzF4dUlDQjlPMXh1WEc0Z0lFa3hPRzR1Y0hKdmRHOTBlWEJsTG1Ob1lXNW5aVXhoYm1kMVlXZGxJRDBnWm5WdVkzUnBiMjRnWTJoaGJtZGxUR0Z1WjNWaFoyVW9iRzVuTENCallXeHNZbUZqYXlrZ2UxeHVJQ0FnSUhaaGNpQmZkR2hwY3pRZ1BTQjBhR2x6TzF4dVhHNGdJQ0FnZG1GeUlHUnZibVVnUFNCbWRXNWpkR2x2YmlCa2IyNWxLR1Z5Y2l3Z2JDa2dlMXh1SUNBZ0lDQWdYM1JvYVhNMExuUnlZVzV6YkdGMGIzSXVZMmhoYm1kbFRHRnVaM1ZoWjJVb2JDazdYRzVjYmlBZ0lDQWdJR2xtSUNoc0tTQjdYRzRnSUNBZ0lDQWdJRjkwYUdsek5DNWxiV2wwS0Nkc1lXNW5kV0ZuWlVOb1lXNW5aV1FuTENCc0tUdGNiaUFnSUNBZ0lDQWdYM1JvYVhNMExteHZaMmRsY2k1c2IyY29KMnhoYm1kMVlXZGxRMmhoYm1kbFpDY3NJR3dwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCcFppQW9ZMkZzYkdKaFkyc3BJR05oYkd4aVlXTnJLR1Z5Y2l3Z1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdYM1JvYVhNMExuUXVZWEJ3Ykhrb1gzUm9hWE0wTENCaGNtZDFiV1Z1ZEhNcE8xeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lIWmhjaUJ6WlhSTWJtY2dQU0JtZFc1amRHbHZiaUJ6WlhSTWJtY29iQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tHd3BJSHRjYmlBZ0lDQWdJQ0FnWDNSb2FYTTBMbXhoYm1kMVlXZGxJRDBnYkR0Y2JpQWdJQ0FnSUNBZ1gzUm9hWE0wTG14aGJtZDFZV2RsY3lBOUlGOTBhR2x6TkM1elpYSjJhV05sY3k1c1lXNW5kV0ZuWlZWMGFXeHpMblJ2VW1WemIyeDJaVWhwWlhKaGNtTm9lU2hzS1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLQ0ZmZEdocGN6UXVkSEpoYm5Oc1lYUnZjaTVzWVc1bmRXRm5aU2tnWDNSb2FYTTBMblJ5WVc1emJHRjBiM0l1WTJoaGJtZGxUR0Z1WjNWaFoyVW9iQ2s3WEc1Y2JpQWdJQ0FnSUNBZ2FXWWdLRjkwYUdsek5DNXpaWEoyYVdObGN5NXNZVzVuZFdGblpVUmxkR1ZqZEc5eUtTQmZkR2hwY3pRdWMyVnlkbWxqWlhNdWJHRnVaM1ZoWjJWRVpYUmxZM1J2Y2k1allXTm9aVlZ6WlhKTVlXNW5kV0ZuWlNoc0tUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdYM1JvYVhNMExteHZZV1JTWlhOdmRYSmpaWE1vWm5WdVkzUnBiMjRnS0dWeWNpa2dlMXh1SUNBZ0lDQWdJQ0JrYjI1bEtHVnljaXdnYkNrN1hHNGdJQ0FnSUNCOUtUdGNiaUFnSUNCOU8xeHVYRzRnSUNBZ2FXWWdLQ0ZzYm1jZ0ppWWdkR2hwY3k1elpYSjJhV05sY3k1c1lXNW5kV0ZuWlVSbGRHVmpkRzl5SUNZbUlDRjBhR2x6TG5ObGNuWnBZMlZ6TG14aGJtZDFZV2RsUkdWMFpXTjBiM0l1WVhONWJtTXBJSHRjYmlBZ0lDQWdJSE5sZEV4dVp5aDBhR2x6TG5ObGNuWnBZMlZ6TG14aGJtZDFZV2RsUkdWMFpXTjBiM0l1WkdWMFpXTjBLQ2twTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvSVd4dVp5QW1KaUIwYUdsekxuTmxjblpwWTJWekxteGhibWQxWVdkbFJHVjBaV04wYjNJZ0ppWWdkR2hwY3k1elpYSjJhV05sY3k1c1lXNW5kV0ZuWlVSbGRHVmpkRzl5TG1GemVXNWpLU0I3WEc0Z0lDQWdJQ0IwYUdsekxuTmxjblpwWTJWekxteGhibWQxWVdkbFJHVjBaV04wYjNJdVpHVjBaV04wS0hObGRFeHVaeWs3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lITmxkRXh1Wnloc2JtY3BPMXh1SUNBZ0lIMWNiaUFnZlR0Y2JseHVJQ0JKTVRodUxuQnliM1J2ZEhsd1pTNW5aWFJHYVhobFpGUWdQU0JtZFc1amRHbHZiaUJuWlhSR2FYaGxaRlFvYkc1bkxDQnVjeWtnZTF4dUlDQWdJSFpoY2lCZmRHaHBjelVnUFNCMGFHbHpPMXh1WEc0Z0lDQWdkbUZ5SUdacGVHVmtWQ0E5SUdaMWJtTjBhVzl1SUdacGVHVmtWQ2hyWlhrc0lHOXdkSE1wSUh0Y2JpQWdJQ0FnSUdadmNpQW9kbUZ5SUY5c1pXNDBJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ3dnY21WemRDQTlJRUZ5Y21GNUtGOXNaVzQwSUQ0Z01pQS9JRjlzWlc0MElDMGdNaUE2SURBcExDQmZhMlY1TkNBOUlESTdJRjlyWlhrMElEd2dYMnhsYmpRN0lGOXJaWGswS3lzcElIdGNiaUFnSUNBZ0lDQWdjbVZ6ZEZ0ZmEyVjVOQ0F0SURKZElEMGdZWEpuZFcxbGJuUnpXMTlyWlhrMFhUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdkbUZ5SUc5d2RHbHZibk1nUFNCZlpYaDBaVzVrY3loN2ZTd2diM0IwY3lrN1hHNGdJQ0FnSUNCcFppQW9LSFI1Y0dWdlppQnZjSFJ6SUQwOVBTQW5kVzVrWldacGJtVmtKeUEvSUNkMWJtUmxabWx1WldRbklEb2dYM1I1Y0dWdlppaHZjSFJ6S1NrZ0lUMDlJQ2R2WW1wbFkzUW5LU0I3WEc0Z0lDQWdJQ0FnSUc5d2RHbHZibk1nUFNCZmRHaHBjelV1YjNCMGFXOXVjeTV2ZG1WeWJHOWhaRlJ5WVc1emJHRjBhVzl1VDNCMGFXOXVTR0Z1Wkd4bGNpaGJhMlY1TENCdmNIUnpYUzVqYjI1allYUW9jbVZ6ZENrcE8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQnZjSFJwYjI1ekxteHVaeUE5SUc5d2RHbHZibk11Ykc1bklIeDhJR1pwZUdWa1ZDNXNibWM3WEc0Z0lDQWdJQ0J2Y0hScGIyNXpMbXh1WjNNZ1BTQnZjSFJwYjI1ekxteHVaM01nZkh3Z1ptbDRaV1JVTG14dVozTTdYRzRnSUNBZ0lDQnZjSFJwYjI1ekxtNXpJRDBnYjNCMGFXOXVjeTV1Y3lCOGZDQm1hWGhsWkZRdWJuTTdYRzRnSUNBZ0lDQnlaWFIxY200Z1gzUm9hWE0xTG5Rb2EyVjVMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQjlPMXh1SUNBZ0lHbG1JQ2gwZVhCbGIyWWdiRzVuSUQwOVBTQW5jM1J5YVc1bkp5a2dlMXh1SUNBZ0lDQWdabWw0WldSVUxteHVaeUE5SUd4dVp6dGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnWm1sNFpXUlVMbXh1WjNNZ1BTQnNibWM3WEc0Z0lDQWdmVnh1SUNBZ0lHWnBlR1ZrVkM1dWN5QTlJRzV6TzF4dUlDQWdJSEpsZEhWeWJpQm1hWGhsWkZRN1hHNGdJSDA3WEc1Y2JpQWdTVEU0Ymk1d2NtOTBiM1I1Y0dVdWRDQTlJR1oxYm1OMGFXOXVJSFFvS1NCN1hHNGdJQ0FnZG1GeUlGOTBjbUZ1YzJ4aGRHOXlPMXh1WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE11ZEhKaGJuTnNZWFJ2Y2lBbUppQW9YM1J5WVc1emJHRjBiM0lnUFNCMGFHbHpMblJ5WVc1emJHRjBiM0lwTG5SeVlXNXpiR0YwWlM1aGNIQnNlU2hmZEhKaGJuTnNZWFJ2Y2l3Z1lYSm5kVzFsYm5SektUdGNiaUFnZlR0Y2JseHVJQ0JKTVRodUxuQnliM1J2ZEhsd1pTNWxlR2x6ZEhNZ1BTQm1kVzVqZEdsdmJpQmxlR2x6ZEhNb0tTQjdYRzRnSUNBZ2RtRnlJRjkwY21GdWMyeGhkRzl5TWp0Y2JseHVJQ0FnSUhKbGRIVnliaUIwYUdsekxuUnlZVzV6YkdGMGIzSWdKaVlnS0Y5MGNtRnVjMnhoZEc5eU1pQTlJSFJvYVhNdWRISmhibk5zWVhSdmNpa3VaWGhwYzNSekxtRndjR3g1S0Y5MGNtRnVjMnhoZEc5eU1pd2dZWEpuZFcxbGJuUnpLVHRjYmlBZ2ZUdGNibHh1SUNCSk1UaHVMbkJ5YjNSdmRIbHdaUzV6WlhSRVpXWmhkV3gwVG1GdFpYTndZV05sSUQwZ1puVnVZM1JwYjI0Z2MyVjBSR1ZtWVhWc2RFNWhiV1Z6Y0dGalpTaHVjeWtnZTF4dUlDQWdJSFJvYVhNdWIzQjBhVzl1Y3k1a1pXWmhkV3gwVGxNZ1BTQnVjenRjYmlBZ2ZUdGNibHh1SUNCSk1UaHVMbkJ5YjNSdmRIbHdaUzVzYjJGa1RtRnRaWE53WVdObGN5QTlJR1oxYm1OMGFXOXVJR3h2WVdST1lXMWxjM0JoWTJWektHNXpMQ0JqWVd4c1ltRmpheWtnZTF4dUlDQWdJSFpoY2lCZmRHaHBjellnUFNCMGFHbHpPMXh1WEc0Z0lDQWdhV1lnS0NGMGFHbHpMbTl3ZEdsdmJuTXVibk1wSUhKbGRIVnliaUJqWVd4c1ltRmpheUFtSmlCallXeHNZbUZqYXlncE8xeHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ2JuTWdQVDA5SUNkemRISnBibWNuS1NCdWN5QTlJRnR1YzEwN1hHNWNiaUFnSUNCdWN5NW1iM0pGWVdOb0tHWjFibU4wYVc5dUlDaHVLU0I3WEc0Z0lDQWdJQ0JwWmlBb1gzUm9hWE0yTG05d2RHbHZibk11Ym5NdWFXNWtaWGhQWmlodUtTQThJREFwSUY5MGFHbHpOaTV2Y0hScGIyNXpMbTV6TG5CMWMyZ29iaWs3WEc0Z0lDQWdmU2s3WEc1Y2JpQWdJQ0IwYUdsekxteHZZV1JTWlhOdmRYSmpaWE1vWTJGc2JHSmhZMnNwTzF4dUlDQjlPMXh1WEc0Z0lFa3hPRzR1Y0hKdmRHOTBlWEJsTG14dllXUk1ZVzVuZFdGblpYTWdQU0JtZFc1amRHbHZiaUJzYjJGa1RHRnVaM1ZoWjJWektHeHVaM01zSUdOaGJHeGlZV05yS1NCN1hHNGdJQ0FnYVdZZ0tIUjVjR1Z2WmlCc2JtZHpJRDA5UFNBbmMzUnlhVzVuSnlrZ2JHNW5jeUE5SUZ0c2JtZHpYVHRjYmlBZ0lDQjJZWElnY0hKbGJHOWhaR1ZrSUQwZ2RHaHBjeTV2Y0hScGIyNXpMbkJ5Wld4dllXUWdmSHdnVzEwN1hHNWNiaUFnSUNCMllYSWdibVYzVEc1bmN5QTlJR3h1WjNNdVptbHNkR1Z5S0daMWJtTjBhVzl1SUNoc2JtY3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQndjbVZzYjJGa1pXUXVhVzVrWlhoUFppaHNibWNwSUR3Z01EdGNiaUFnSUNCOUtUdGNiaUFnSUNBdkx5QkZlR2wwSUdWaGNteDVJR2xtSUdGc2JDQm5hWFpsYmlCc1lXNW5kV0ZuWlhNZ1lYSmxJR0ZzY21WaFpIa2djSEpsYkc5aFpHVmtYRzRnSUNBZ2FXWWdLQ0Z1WlhkTWJtZHpMbXhsYm1kMGFDa2djbVYwZFhKdUlHTmhiR3hpWVdOcktDazdYRzVjYmlBZ0lDQjBhR2x6TG05d2RHbHZibk11Y0hKbGJHOWhaQ0E5SUhCeVpXeHZZV1JsWkM1amIyNWpZWFFvYm1WM1RHNW5jeWs3WEc0Z0lDQWdkR2hwY3k1c2IyRmtVbVZ6YjNWeVkyVnpLR05oYkd4aVlXTnJLVHRjYmlBZ2ZUdGNibHh1SUNCSk1UaHVMbkJ5YjNSdmRIbHdaUzVrYVhJZ1BTQm1kVzVqZEdsdmJpQmthWElvYkc1bktTQjdYRzRnSUNBZ2FXWWdLQ0ZzYm1jcElHeHVaeUE5SUhSb2FYTXViR0Z1WjNWaFoyVnpJQ1ltSUhSb2FYTXViR0Z1WjNWaFoyVnpMbXhsYm1kMGFDQStJREFnUHlCMGFHbHpMbXhoYm1kMVlXZGxjMXN3WFNBNklIUm9hWE11YkdGdVozVmhaMlU3WEc0Z0lDQWdhV1lnS0NGc2JtY3BJSEpsZEhWeWJpQW5jblJzSnp0Y2JseHVJQ0FnSUhaaGNpQnlkR3hNYm1keklEMGdXeWRoY2ljc0lDZHphSFVuTENBbmMzRnlKeXdnSjNOemFDY3NJQ2Q0WVdFbkxDQW5lV2hrSnl3Z0ozbDFaQ2NzSUNkaFlXOG5MQ0FuWVdKb0p5d2dKMkZpZGljc0lDZGhZMjBuTENBbllXTnhKeXdnSjJGamR5Y3NJQ2RoWTNnbkxDQW5ZV041Snl3Z0oyRmtaaWNzSUNkaFpITW5MQ0FuWVdWaUp5d2dKMkZsWXljc0lDZGhabUluTENBbllXcHdKeXdnSjJGd1l5Y3NJQ2RoY0dRbkxDQW5ZWEppSnl3Z0oyRnljU2NzSUNkaGNuTW5MQ0FuWVhKNUp5d2dKMkZ5ZWljc0lDZGhkWG9uTENBbllYWnNKeXdnSjJGNWFDY3NJQ2RoZVd3bkxDQW5ZWGx1Snl3Z0oyRjVjQ2NzSUNkaVlub25MQ0FuY0dkaEp5d2dKMmhsSnl3Z0oybDNKeXdnSjNCekp5d2dKM0JpZENjc0lDZHdZblVuTENBbmNITjBKeXdnSjNCeWNDY3NJQ2R3Y21RbkxDQW5kWEluTENBbmVXUmtKeXdnSjNsa2N5Y3NJQ2Q1YVdnbkxDQW5hbWtuTENBbmVXa25MQ0FuYUdKdkp5d2dKMjFsYmljc0lDZDRiVzRuTENBblptRW5MQ0FuYW5CeUp5d2dKM0JsYnljc0lDZHdaWE1uTENBbmNISnpKeXdnSjJSMkp5d2dKM05oYlNkZE8xeHVYRzRnSUNBZ2NtVjBkWEp1SUhKMGJFeHVaM011YVc1a1pYaFBaaWgwYUdsekxuTmxjblpwWTJWekxteGhibWQxWVdkbFZYUnBiSE11WjJWMFRHRnVaM1ZoWjJWUVlYSjBSbkp2YlVOdlpHVW9iRzVuS1NrZ1BqMGdNQ0EvSUNkeWRHd25JRG9nSjJ4MGNpYzdYRzRnSUgwN1hHNWNiaUFnTHlvZ1pYTnNhVzUwSUdOc1lYTnpMVzFsZEdodlpITXRkWE5sTFhSb2FYTTZJREFnS2k5Y2JseHVYRzRnSUVreE9HNHVjSEp2ZEc5MGVYQmxMbU55WldGMFpVbHVjM1JoYm1ObElEMGdablZ1WTNScGIyNGdZM0psWVhSbFNXNXpkR0Z1WTJVb0tTQjdYRzRnSUNBZ2RtRnlJRzl3ZEdsdmJuTWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTUNBbUppQmhjbWQxYldWdWRITmJNRjBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXN3WFNBNklIdDlPMXh1SUNBZ0lIWmhjaUJqWVd4c1ltRmpheUE5SUdGeVozVnRaVzUwYzFzeFhUdGNibHh1SUNBZ0lISmxkSFZ5YmlCdVpYY2dTVEU0YmlodmNIUnBiMjV6TENCallXeHNZbUZqYXlrN1hHNGdJSDA3WEc1Y2JpQWdTVEU0Ymk1d2NtOTBiM1I1Y0dVdVkyeHZibVZKYm5OMFlXNWpaU0E5SUdaMWJtTjBhVzl1SUdOc2IyNWxTVzV6ZEdGdVkyVW9LU0I3WEc0Z0lDQWdkbUZ5SUY5MGFHbHpOeUE5SUhSb2FYTTdYRzVjYmlBZ0lDQjJZWElnYjNCMGFXOXVjeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBd0lDWW1JR0Z5WjNWdFpXNTBjMXN3WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pCZElEb2dlMzA3WEc0Z0lDQWdkbUZ5SUdOaGJHeGlZV05ySUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUNBK0lERWdKaVlnWVhKbmRXMWxiblJ6V3pGZElDRTlQU0IxYm1SbFptbHVaV1FnUHlCaGNtZDFiV1Z1ZEhOYk1WMGdPaUJ1YjI5d08xeHVYRzRnSUNBZ2RtRnlJRzFsY21kbFpFOXdkR2x2Ym5NZ1BTQmZaWGgwWlc1a2N5aDdmU3dnZEdocGN5NXZjSFJwYjI1ekxDQnZjSFJwYjI1ekxDQjdJR2x6UTJ4dmJtVTZJSFJ5ZFdVZ2ZTazdYRzRnSUNBZ2RtRnlJR05zYjI1bElEMGdibVYzSUVreE9HNG9iV1Z5WjJWa1QzQjBhVzl1Y3lrN1hHNGdJQ0FnZG1GeUlHMWxiV0psY25OVWIwTnZjSGtnUFNCYkozTjBiM0psSnl3Z0ozTmxjblpwWTJWekp5d2dKMnhoYm1kMVlXZGxKMTA3WEc0Z0lDQWdiV1Z0WW1WeWMxUnZRMjl3ZVM1bWIzSkZZV05vS0daMWJtTjBhVzl1SUNodEtTQjdYRzRnSUNBZ0lDQmpiRzl1WlZ0dFhTQTlJRjkwYUdsek4xdHRYVHRjYmlBZ0lDQjlLVHRjYmlBZ0lDQmpiRzl1WlM1MGNtRnVjMnhoZEc5eUlEMGdibVYzSUY5VWNtRnVjMnhoZEc5eU1pNWtaV1poZFd4MEtHTnNiMjVsTG5ObGNuWnBZMlZ6TENCamJHOXVaUzV2Y0hScGIyNXpLVHRjYmlBZ0lDQmpiRzl1WlM1MGNtRnVjMnhoZEc5eUxtOXVLQ2NxSnl3Z1puVnVZM1JwYjI0Z0tHVjJaVzUwS1NCN1hHNGdJQ0FnSUNCbWIzSWdLSFpoY2lCZmJHVnVOU0E5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dzSUdGeVozTWdQU0JCY25KaGVTaGZiR1Z1TlNBK0lERWdQeUJmYkdWdU5TQXRJREVnT2lBd0tTd2dYMnRsZVRVZ1BTQXhPeUJmYTJWNU5TQThJRjlzWlc0MU95QmZhMlY1TlNzcktTQjdYRzRnSUNBZ0lDQWdJR0Z5WjNOYlgydGxlVFVnTFNBeFhTQTlJR0Z5WjNWdFpXNTBjMXRmYTJWNU5WMDdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJR05zYjI1bExtVnRhWFF1WVhCd2JIa29ZMnh2Ym1Vc0lGdGxkbVZ1ZEYwdVkyOXVZMkYwS0dGeVozTXBLVHRjYmlBZ0lDQjlLVHRjYmlBZ0lDQmpiRzl1WlM1cGJtbDBLRzFsY21kbFpFOXdkR2x2Ym5Nc0lHTmhiR3hpWVdOcktUdGNiaUFnSUNCamJHOXVaUzUwY21GdWMyeGhkRzl5TG05d2RHbHZibk1nUFNCamJHOXVaUzV2Y0hScGIyNXpPeUF2THlCemVXNWpJRzl3ZEdsdmJuTmNibHh1SUNBZ0lISmxkSFZ5YmlCamJHOXVaVHRjYmlBZ2ZUdGNibHh1SUNCeVpYUjFjbTRnU1RFNGJqdGNibjBvWDBWMlpXNTBSVzFwZEhSbGNqTXVaR1ZtWVhWc2RDazdYRzVjYm1WNGNHOXlkSE11WkdWbVlYVnNkQ0E5SUc1bGR5QkpNVGh1S0NrN0lpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNVBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnWENKZlgyVnpUVzlrZFd4bFhDSXNJSHRjYmlBZ2RtRnNkV1U2SUhSeWRXVmNibjBwTzF4dVpYaHdiM0owY3k1MWMyVWdQU0JsZUhCdmNuUnpMblFnUFNCbGVIQnZjblJ6TG5ObGRFUmxabUYxYkhST1lXMWxjM0JoWTJVZ1BTQmxlSEJ2Y25SekxtOXVJRDBnWlhod2IzSjBjeTV2Wm1ZZ1BTQmxlSEJ2Y25SekxteHZZV1JTWlhOdmRYSmpaWE1nUFNCbGVIQnZjblJ6TG14dllXUk9ZVzFsYzNCaFkyVnpJRDBnWlhod2IzSjBjeTVzYjJGa1RHRnVaM1ZoWjJWeklEMGdaWGh3YjNKMGN5NXBibWwwSUQwZ1pYaHdiM0owY3k1blpYUkdhWGhsWkZRZ1BTQmxlSEJ2Y25SekxtVjRhWE4wY3lBOUlHVjRjRzl5ZEhNdVpHbHlJRDBnWlhod2IzSjBjeTVqY21WaGRHVkpibk4wWVc1alpTQTlJR1Y0Y0c5eWRITXVZMnh2Ym1WSmJuTjBZVzVqWlNBOUlHVjRjRzl5ZEhNdVkyaGhibWRsVEdGdVozVmhaMlVnUFNCMWJtUmxabWx1WldRN1hHNWNiblpoY2lCZmFURTRibVY0ZENBOUlISmxjWFZwY21Vb0p5NHZhVEU0Ym1WNGRDNXFjeWNwTzF4dVhHNTJZWElnWDJreE9HNWxlSFF5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmYVRFNGJtVjRkQ2s3WEc1Y2JtWjFibU4wYVc5dUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvYjJKcUtTQjdJSEpsZEhWeWJpQnZZbW9nSmlZZ2IySnFMbDlmWlhOTmIyUjFiR1VnUHlCdlltb2dPaUI3SUdSbFptRjFiSFE2SUc5aWFpQjlPeUI5WEc1Y2JtVjRjRzl5ZEhNdVpHVm1ZWFZzZENBOUlGOXBNVGh1WlhoME1pNWtaV1poZFd4ME8xeHVkbUZ5SUdOb1lXNW5aVXhoYm1kMVlXZGxJRDBnWlhod2IzSjBjeTVqYUdGdVoyVk1ZVzVuZFdGblpTQTlJRjlwTVRodVpYaDBNaTVrWldaaGRXeDBMbU5vWVc1blpVeGhibWQxWVdkbExtSnBibVFvWDJreE9HNWxlSFF5TG1SbFptRjFiSFFwTzF4dWRtRnlJR05zYjI1bFNXNXpkR0Z1WTJVZ1BTQmxlSEJ2Y25SekxtTnNiMjVsU1c1emRHRnVZMlVnUFNCZmFURTRibVY0ZERJdVpHVm1ZWFZzZEM1amJHOXVaVWx1YzNSaGJtTmxMbUpwYm1Rb1gya3hPRzVsZUhReUxtUmxabUYxYkhRcE8xeHVkbUZ5SUdOeVpXRjBaVWx1YzNSaGJtTmxJRDBnWlhod2IzSjBjeTVqY21WaGRHVkpibk4wWVc1alpTQTlJRjlwTVRodVpYaDBNaTVrWldaaGRXeDBMbU55WldGMFpVbHVjM1JoYm1ObExtSnBibVFvWDJreE9HNWxlSFF5TG1SbFptRjFiSFFwTzF4dWRtRnlJR1JwY2lBOUlHVjRjRzl5ZEhNdVpHbHlJRDBnWDJreE9HNWxlSFF5TG1SbFptRjFiSFF1WkdseUxtSnBibVFvWDJreE9HNWxlSFF5TG1SbFptRjFiSFFwTzF4dWRtRnlJR1Y0YVhOMGN5QTlJR1Y0Y0c5eWRITXVaWGhwYzNSeklEMGdYMmt4T0c1bGVIUXlMbVJsWm1GMWJIUXVaWGhwYzNSekxtSnBibVFvWDJreE9HNWxlSFF5TG1SbFptRjFiSFFwTzF4dWRtRnlJR2RsZEVacGVHVmtWQ0E5SUdWNGNHOXlkSE11WjJWMFJtbDRaV1JVSUQwZ1gya3hPRzVsZUhReUxtUmxabUYxYkhRdVoyVjBSbWw0WldSVUxtSnBibVFvWDJreE9HNWxlSFF5TG1SbFptRjFiSFFwTzF4dWRtRnlJR2x1YVhRZ1BTQmxlSEJ2Y25SekxtbHVhWFFnUFNCZmFURTRibVY0ZERJdVpHVm1ZWFZzZEM1cGJtbDBMbUpwYm1Rb1gya3hPRzVsZUhReUxtUmxabUYxYkhRcE8xeHVkbUZ5SUd4dllXUk1ZVzVuZFdGblpYTWdQU0JsZUhCdmNuUnpMbXh2WVdSTVlXNW5kV0ZuWlhNZ1BTQmZhVEU0Ym1WNGRESXVaR1ZtWVhWc2RDNXNiMkZrVEdGdVozVmhaMlZ6TG1KcGJtUW9YMmt4T0c1bGVIUXlMbVJsWm1GMWJIUXBPMXh1ZG1GeUlHeHZZV1JPWVcxbGMzQmhZMlZ6SUQwZ1pYaHdiM0owY3k1c2IyRmtUbUZ0WlhOd1lXTmxjeUE5SUY5cE1UaHVaWGgwTWk1a1pXWmhkV3gwTG14dllXUk9ZVzFsYzNCaFkyVnpMbUpwYm1Rb1gya3hPRzVsZUhReUxtUmxabUYxYkhRcE8xeHVkbUZ5SUd4dllXUlNaWE52ZFhKalpYTWdQU0JsZUhCdmNuUnpMbXh2WVdSU1pYTnZkWEpqWlhNZ1BTQmZhVEU0Ym1WNGRESXVaR1ZtWVhWc2RDNXNiMkZrVW1WemIzVnlZMlZ6TG1KcGJtUW9YMmt4T0c1bGVIUXlMbVJsWm1GMWJIUXBPMXh1ZG1GeUlHOW1aaUE5SUdWNGNHOXlkSE11YjJabUlEMGdYMmt4T0c1bGVIUXlMbVJsWm1GMWJIUXViMlptTG1KcGJtUW9YMmt4T0c1bGVIUXlMbVJsWm1GMWJIUXBPMXh1ZG1GeUlHOXVJRDBnWlhod2IzSjBjeTV2YmlBOUlGOXBNVGh1WlhoME1pNWtaV1poZFd4MExtOXVMbUpwYm1Rb1gya3hPRzVsZUhReUxtUmxabUYxYkhRcE8xeHVkbUZ5SUhObGRFUmxabUYxYkhST1lXMWxjM0JoWTJVZ1BTQmxlSEJ2Y25SekxuTmxkRVJsWm1GMWJIUk9ZVzFsYzNCaFkyVWdQU0JmYVRFNGJtVjRkREl1WkdWbVlYVnNkQzV6WlhSRVpXWmhkV3gwVG1GdFpYTndZV05sTG1KcGJtUW9YMmt4T0c1bGVIUXlMbVJsWm1GMWJIUXBPMXh1ZG1GeUlIUWdQU0JsZUhCdmNuUnpMblFnUFNCZmFURTRibVY0ZERJdVpHVm1ZWFZzZEM1MExtSnBibVFvWDJreE9HNWxlSFF5TG1SbFptRjFiSFFwTzF4dWRtRnlJSFZ6WlNBOUlHVjRjRzl5ZEhNdWRYTmxJRDBnWDJreE9HNWxlSFF5TG1SbFptRjFiSFF1ZFhObExtSnBibVFvWDJreE9HNWxlSFF5TG1SbFptRjFiSFFwT3lJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRndpWDE5bGMwMXZaSFZzWlZ3aUxDQjdYRzRnSUhaaGJIVmxPaUIwY25WbFhHNTlLVHRjYmx4dWRtRnlJRjlsZUhSbGJtUnpJRDBnVDJKcVpXTjBMbUZ6YzJsbmJpQjhmQ0JtZFc1amRHbHZiaUFvZEdGeVoyVjBLU0I3SUdadmNpQW9kbUZ5SUdrZ1BTQXhPeUJwSUR3Z1lYSm5kVzFsYm5SekxteGxibWQwYURzZ2FTc3JLU0I3SUhaaGNpQnpiM1Z5WTJVZ1BTQmhjbWQxYldWdWRITmJhVjA3SUdadmNpQW9kbUZ5SUd0bGVTQnBiaUJ6YjNWeVkyVXBJSHNnYVdZZ0tFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHpiM1Z5WTJVc0lHdGxlU2twSUhzZ2RHRnlaMlYwVzJ0bGVWMGdQU0J6YjNWeVkyVmJhMlY1WFRzZ2ZTQjlJSDBnY21WMGRYSnVJSFJoY21kbGREc2dmVHRjYmx4dVpuVnVZM1JwYjI0Z1gyTnNZWE56UTJGc2JFTm9aV05yS0dsdWMzUmhibU5sTENCRGIyNXpkSEoxWTNSdmNpa2dleUJwWmlBb0lTaHBibk4wWVc1alpTQnBibk4wWVc1alpXOW1JRU52Ym5OMGNuVmpkRzl5S1NrZ2V5QjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLRndpUTJGdWJtOTBJR05oYkd3Z1lTQmpiR0Z6Y3lCaGN5QmhJR1oxYm1OMGFXOXVYQ0lwT3lCOUlIMWNibHh1Wm5WdVkzUnBiMjRnWDNSdlEyOXVjM1Z0WVdKc1pVRnljbUY1S0dGeWNpa2dleUJwWmlBb1FYSnlZWGt1YVhOQmNuSmhlU2hoY25JcEtTQjdJR1p2Y2lBb2RtRnlJR2tnUFNBd0xDQmhjbkl5SUQwZ1FYSnlZWGtvWVhKeUxteGxibWQwYUNrN0lHa2dQQ0JoY25JdWJHVnVaM1JvT3lCcEt5c3BJSHNnWVhKeU1sdHBYU0E5SUdGeWNsdHBYVHNnZlNCeVpYUjFjbTRnWVhKeU1qc2dmU0JsYkhObElIc2djbVYwZFhKdUlFRnljbUY1TG1aeWIyMG9ZWEp5S1RzZ2ZTQjlYRzVjYm5aaGNpQmpiMjV6YjJ4bFRHOW5aMlZ5SUQwZ2UxeHVJQ0IwZVhCbE9pQW5iRzluWjJWeUp5eGNibHh1SUNCc2IyYzZJR1oxYm1OMGFXOXVJR3h2WnloaGNtZHpLU0I3WEc0Z0lDQWdkR2hwY3k1dmRYUndkWFFvSjJ4dlp5Y3NJR0Z5WjNNcE8xeHVJQ0I5TEZ4dUlDQjNZWEp1T2lCbWRXNWpkR2x2YmlCM1lYSnVLR0Z5WjNNcElIdGNiaUFnSUNCMGFHbHpMbTkxZEhCMWRDZ25kMkZ5Ymljc0lHRnlaM01wTzF4dUlDQjlMRnh1SUNCbGNuSnZjam9nWm5WdVkzUnBiMjRnWlhKeWIzSW9ZWEpuY3lrZ2UxeHVJQ0FnSUhSb2FYTXViM1YwY0hWMEtDZGxjbkp2Y2ljc0lHRnlaM01wTzF4dUlDQjlMRnh1SUNCdmRYUndkWFE2SUdaMWJtTjBhVzl1SUc5MWRIQjFkQ2gwZVhCbExDQmhjbWR6S1NCN1hHNGdJQ0FnZG1GeUlGOWpiMjV6YjJ4bE8xeHVYRzRnSUNBZ0x5b2daWE5zYVc1MElHNXZMV052Ym5OdmJHVTZJREFnS2k5Y2JpQWdJQ0JwWmlBb1kyOXVjMjlzWlNBbUppQmpiMjV6YjJ4bFczUjVjR1ZkS1NBb1gyTnZibk52YkdVZ1BTQmpiMjV6YjJ4bEtWdDBlWEJsWFM1aGNIQnNlU2hmWTI5dWMyOXNaU3dnWDNSdlEyOXVjM1Z0WVdKc1pVRnljbUY1S0dGeVozTXBLVHRjYmlBZ2ZWeHVmVHRjYmx4dWRtRnlJRXh2WjJkbGNpQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdablZ1WTNScGIyNGdURzluWjJWeUtHTnZibU55WlhSbFRHOW5aMlZ5S1NCN1hHNGdJQ0FnZG1GeUlHOXdkR2x2Ym5NZ1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb0lENGdNU0FtSmlCaGNtZDFiV1Z1ZEhOYk1WMGdJVDA5SUhWdVpHVm1hVzVsWkNBL0lHRnlaM1Z0Wlc1MGMxc3hYU0E2SUh0OU8xeHVYRzRnSUNBZ1gyTnNZWE56UTJGc2JFTm9aV05yS0hSb2FYTXNJRXh2WjJkbGNpazdYRzVjYmlBZ0lDQjBhR2x6TG1sdWFYUW9ZMjl1WTNKbGRHVk1iMmRuWlhJc0lHOXdkR2x2Ym5NcE8xeHVJQ0I5WEc1Y2JpQWdURzluWjJWeUxuQnliM1J2ZEhsd1pTNXBibWwwSUQwZ1puVnVZM1JwYjI0Z2FXNXBkQ2hqYjI1amNtVjBaVXh2WjJkbGNpa2dlMXh1SUNBZ0lIWmhjaUJ2Y0hScGIyNXpJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURFZ0ppWWdZWEpuZFcxbGJuUnpXekZkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTVYwZ09pQjdmVHRjYmx4dUlDQWdJSFJvYVhNdWNISmxabWw0SUQwZ2IzQjBhVzl1Y3k1d2NtVm1hWGdnZkh3Z0oya3hPRzVsZUhRNkp6dGNiaUFnSUNCMGFHbHpMbXh2WjJkbGNpQTlJR052Ym1OeVpYUmxURzluWjJWeUlIeDhJR052Ym5OdmJHVk1iMmRuWlhJN1hHNGdJQ0FnZEdocGN5NXZjSFJwYjI1eklEMGdiM0IwYVc5dWN6dGNiaUFnSUNCMGFHbHpMbVJsWW5WbklEMGdiM0IwYVc5dWN5NWtaV0oxWnp0Y2JpQWdmVHRjYmx4dUlDQk1iMmRuWlhJdWNISnZkRzkwZVhCbExuTmxkRVJsWW5WbklEMGdablZ1WTNScGIyNGdjMlYwUkdWaWRXY29ZbTl2YkNrZ2UxeHVJQ0FnSUhSb2FYTXVaR1ZpZFdjZ1BTQmliMjlzTzF4dUlDQjlPMXh1WEc0Z0lFeHZaMmRsY2k1d2NtOTBiM1I1Y0dVdWJHOW5JRDBnWm5WdVkzUnBiMjRnYkc5bktDa2dlMXh1SUNBZ0lHWnZjaUFvZG1GeUlGOXNaVzRnUFNCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvTENCaGNtZHpJRDBnUVhKeVlYa29YMnhsYmlrc0lGOXJaWGtnUFNBd095QmZhMlY1SUR3Z1gyeGxianNnWDJ0bGVTc3JLU0I3WEc0Z0lDQWdJQ0JoY21kelcxOXJaWGxkSUQwZ1lYSm5kVzFsYm5SelcxOXJaWGxkTzF4dUlDQWdJSDFjYmx4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TG1admNuZGhjbVFvWVhKbmN5d2dKMnh2Wnljc0lDY25MQ0IwY25WbEtUdGNiaUFnZlR0Y2JseHVJQ0JNYjJkblpYSXVjSEp2ZEc5MGVYQmxMbmRoY200Z1BTQm1kVzVqZEdsdmJpQjNZWEp1S0NrZ2UxeHVJQ0FnSUdadmNpQW9kbUZ5SUY5c1pXNHlJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ3dnWVhKbmN5QTlJRUZ5Y21GNUtGOXNaVzR5S1N3Z1gydGxlVElnUFNBd095QmZhMlY1TWlBOElGOXNaVzR5T3lCZmEyVjVNaXNyS1NCN1hHNGdJQ0FnSUNCaGNtZHpXMTlyWlhreVhTQTlJR0Z5WjNWdFpXNTBjMXRmYTJWNU1sMDdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTXVabTl5ZDJGeVpDaGhjbWR6TENBbmQyRnliaWNzSUNjbkxDQjBjblZsS1R0Y2JpQWdmVHRjYmx4dUlDQk1iMmRuWlhJdWNISnZkRzkwZVhCbExtVnljbTl5SUQwZ1puVnVZM1JwYjI0Z1pYSnliM0lvS1NCN1hHNGdJQ0FnWm05eUlDaDJZWElnWDJ4bGJqTWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9MQ0JoY21keklEMGdRWEp5WVhrb1gyeGxiak1wTENCZmEyVjVNeUE5SURBN0lGOXJaWGt6SUR3Z1gyeGxiak03SUY5clpYa3pLeXNwSUh0Y2JpQWdJQ0FnSUdGeVozTmJYMnRsZVROZElEMGdZWEpuZFcxbGJuUnpXMTlyWlhrelhUdGNiaUFnSUNCOVhHNWNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NW1iM0ozWVhKa0tHRnlaM01zSUNkbGNuSnZjaWNzSUNjbktUdGNiaUFnZlR0Y2JseHVJQ0JNYjJkblpYSXVjSEp2ZEc5MGVYQmxMbVJsY0hKbFkyRjBaU0E5SUdaMWJtTjBhVzl1SUdSbGNISmxZMkYwWlNncElIdGNiaUFnSUNCbWIzSWdLSFpoY2lCZmJHVnVOQ0E5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dzSUdGeVozTWdQU0JCY25KaGVTaGZiR1Z1TkNrc0lGOXJaWGswSUQwZ01Ec2dYMnRsZVRRZ1BDQmZiR1Z1TkRzZ1gydGxlVFFyS3lrZ2UxeHVJQ0FnSUNBZ1lYSm5jMXRmYTJWNU5GMGdQU0JoY21kMWJXVnVkSE5iWDJ0bGVUUmRPMXh1SUNBZ0lIMWNibHh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpMbVp2Y25kaGNtUW9ZWEpuY3l3Z0ozZGhjbTRuTENBblYwRlNUa2xPUnlCRVJWQlNSVU5CVkVWRU9pQW5MQ0IwY25WbEtUdGNiaUFnZlR0Y2JseHVJQ0JNYjJkblpYSXVjSEp2ZEc5MGVYQmxMbVp2Y25kaGNtUWdQU0JtZFc1amRHbHZiaUJtYjNKM1lYSmtLR0Z5WjNNc0lHeDJiQ3dnY0hKbFptbDRMQ0JrWldKMVowOXViSGtwSUh0Y2JpQWdJQ0JwWmlBb1pHVmlkV2RQYm14NUlDWW1JQ0YwYUdsekxtUmxZblZuS1NCeVpYUjFjbTRnYm5Wc2JEdGNiaUFnSUNCcFppQW9kSGx3Wlc5bUlHRnlaM05iTUYwZ1BUMDlJQ2R6ZEhKcGJtY25LU0JoY21keld6QmRJRDBnSnljZ0t5QndjbVZtYVhnZ0t5QjBhR2x6TG5CeVpXWnBlQ0FySUNjZ0p5QXJJR0Z5WjNOYk1GMDdYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTXViRzluWjJWeVcyeDJiRjBvWVhKbmN5azdYRzRnSUgwN1hHNWNiaUFnVEc5bloyVnlMbkJ5YjNSdmRIbHdaUzVqY21WaGRHVWdQU0JtZFc1amRHbHZiaUJqY21WaGRHVW9iVzlrZFd4bFRtRnRaU2tnZTF4dUlDQWdJSEpsZEhWeWJpQnVaWGNnVEc5bloyVnlLSFJvYVhNdWJHOW5aMlZ5TENCZlpYaDBaVzVrY3loN0lIQnlaV1pwZURvZ2RHaHBjeTV3Y21WbWFYZ2dLeUFuT2ljZ0t5QnRiMlIxYkdWT1lXMWxJQ3NnSnpvbklIMHNJSFJvYVhNdWIzQjBhVzl1Y3lrcE8xeHVJQ0I5TzF4dVhHNGdJSEpsZEhWeWJpQk1iMmRuWlhJN1hHNTlLQ2s3WEc1Y2JtVjRjRzl5ZEhNdVpHVm1ZWFZzZENBOUlHNWxkeUJNYjJkblpYSW9LVHNpTENKY0luVnpaU0J6ZEhKcFkzUmNJanRjYmx4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRndpWDE5bGMwMXZaSFZzWlZ3aUxDQjdYRzRnSUhaaGJIVmxPaUIwY25WbFhHNTlLVHRjYm1WNGNHOXlkSE11WkdWbVlYVnNkQ0E5SUh0Y2JseHVJQ0J3Y205alpYTnpiM0p6T2lCN2ZTeGNibHh1SUNCaFpHUlFiM04wVUhKdlkyVnpjMjl5T2lCbWRXNWpkR2x2YmlCaFpHUlFiM04wVUhKdlkyVnpjMjl5S0cxdlpIVnNaU2tnZTF4dUlDQWdJSFJvYVhNdWNISnZZMlZ6YzI5eWMxdHRiMlIxYkdVdWJtRnRaVjBnUFNCdGIyUjFiR1U3WEc0Z0lIMHNYRzRnSUdoaGJtUnNaVG9nWm5WdVkzUnBiMjRnYUdGdVpHeGxLSEJ5YjJObGMzTnZjbk1zSUhaaGJIVmxMQ0JyWlhrc0lHOXdkR2x2Ym5Nc0lIUnlZVzV6YkdGMGIzSXBJSHRjYmlBZ0lDQjJZWElnWDNSb2FYTWdQU0IwYUdsek8xeHVYRzRnSUNBZ2NISnZZMlZ6YzI5eWN5NW1iM0pGWVdOb0tHWjFibU4wYVc5dUlDaHdjbTlqWlhOemIzSXBJSHRjYmlBZ0lDQWdJR2xtSUNoZmRHaHBjeTV3Y205alpYTnpiM0p6VzNCeWIyTmxjM052Y2wwcElIWmhiSFZsSUQwZ1gzUm9hWE11Y0hKdlkyVnpjMjl5YzF0d2NtOWpaWE56YjNKZExuQnliMk5sYzNNb2RtRnNkV1VzSUd0bGVTd2diM0IwYVc5dWN5d2dkSEpoYm5Oc1lYUnZjaWs3WEc0Z0lDQWdmU2s3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdkbUZzZFdVN1hHNGdJSDFjYm4wN0lpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNVBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnWENKZlgyVnpUVzlrZFd4bFhDSXNJSHRjYmlBZ2RtRnNkV1U2SUhSeWRXVmNibjBwTzF4dVpYaHdiM0owY3k1dFlXdGxVM1J5YVc1bklEMGdiV0ZyWlZOMGNtbHVaenRjYm1WNGNHOXlkSE11WTI5d2VTQTlJR052Y0hrN1hHNWxlSEJ2Y25SekxuTmxkRkJoZEdnZ1BTQnpaWFJRWVhSb08xeHVaWGh3YjNKMGN5NXdkWE5vVUdGMGFDQTlJSEIxYzJoUVlYUm9PMXh1Wlhod2IzSjBjeTVuWlhSUVlYUm9JRDBnWjJWMFVHRjBhRHRjYm1WNGNHOXlkSE11WkdWbGNFVjRkR1Z1WkNBOUlHUmxaWEJGZUhSbGJtUTdYRzVsZUhCdmNuUnpMbkpsWjJWNFJYTmpZWEJsSUQwZ2NtVm5aWGhGYzJOaGNHVTdYRzVsZUhCdmNuUnpMbVZ6WTJGd1pTQTlJR1Z6WTJGd1pUdGNibVoxYm1OMGFXOXVJRzFoYTJWVGRISnBibWNvYjJKcVpXTjBLU0I3WEc0Z0lHbG1JQ2h2WW1wbFkzUWdQVDBnYm5Wc2JDa2djbVYwZFhKdUlDY25PMXh1SUNBdktpQmxjMnhwYm5RZ2NISmxabVZ5TFhSbGJYQnNZWFJsT2lBd0lDb3ZYRzRnSUhKbGRIVnliaUFuSnlBcklHOWlhbVZqZER0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWTI5d2VTaGhMQ0J6TENCMEtTQjdYRzRnSUdFdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlBb2JTa2dlMXh1SUNBZ0lHbG1JQ2h6VzIxZEtTQjBXMjFkSUQwZ2MxdHRYVHRjYmlBZ2ZTazdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHZGxkRXhoYzNSUFpsQmhkR2dvYjJKcVpXTjBMQ0J3WVhSb0xDQkZiWEIwZVNrZ2UxeHVJQ0JtZFc1amRHbHZiaUJqYkdWaGJrdGxlU2hyWlhrcElIdGNiaUFnSUNCeVpYUjFjbTRnYTJWNUlDWW1JR3RsZVM1cGJtUmxlRTltS0Njakl5TW5LU0ErSUMweElEOGdhMlY1TG5KbGNHeGhZMlVvTHlNakl5OW5MQ0FuTGljcElEb2dhMlY1TzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1kyRnVUbTkwVkhKaGRtVnljMlZFWldWd1pYSW9LU0I3WEc0Z0lDQWdjbVYwZFhKdUlDRnZZbXBsWTNRZ2ZId2dkSGx3Wlc5bUlHOWlhbVZqZENBOVBUMGdKM04wY21sdVp5YzdYRzRnSUgxY2JseHVJQ0IyWVhJZ2MzUmhZMnNnUFNCMGVYQmxiMllnY0dGMGFDQWhQVDBnSjNOMGNtbHVaeWNnUHlCYlhTNWpiMjVqWVhRb2NHRjBhQ2tnT2lCd1lYUm9Mbk53YkdsMEtDY3VKeWs3WEc0Z0lIZG9hV3hsSUNoemRHRmpheTVzWlc1bmRHZ2dQaUF4S1NCN1hHNGdJQ0FnYVdZZ0tHTmhiazV2ZEZSeVlYWmxjbk5sUkdWbGNHVnlLQ2twSUhKbGRIVnliaUI3ZlR0Y2JseHVJQ0FnSUhaaGNpQnJaWGtnUFNCamJHVmhia3RsZVNoemRHRmpheTV6YUdsbWRDZ3BLVHRjYmlBZ0lDQnBaaUFvSVc5aWFtVmpkRnRyWlhsZElDWW1JRVZ0Y0hSNUtTQnZZbXBsWTNSYmEyVjVYU0E5SUc1bGR5QkZiWEIwZVNncE8xeHVJQ0FnSUc5aWFtVmpkQ0E5SUc5aWFtVmpkRnRyWlhsZE8xeHVJQ0I5WEc1Y2JpQWdhV1lnS0dOaGJrNXZkRlJ5WVhabGNuTmxSR1ZsY0dWeUtDa3BJSEpsZEhWeWJpQjdmVHRjYmlBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0J2WW1vNklHOWlhbVZqZEN4Y2JpQWdJQ0JyT2lCamJHVmhia3RsZVNoemRHRmpheTV6YUdsbWRDZ3BLVnh1SUNCOU8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCelpYUlFZWFJvS0c5aWFtVmpkQ3dnY0dGMGFDd2dibVYzVm1Gc2RXVXBJSHRjYmlBZ2RtRnlJRjluWlhSTVlYTjBUMlpRWVhSb0lEMGdaMlYwVEdGemRFOW1VR0YwYUNodlltcGxZM1FzSUhCaGRHZ3NJRTlpYW1WamRDa3NYRzRnSUNBZ0lDQnZZbW9nUFNCZloyVjBUR0Z6ZEU5bVVHRjBhQzV2WW1vc1hHNGdJQ0FnSUNCcklEMGdYMmRsZEV4aGMzUlBabEJoZEdndWF6dGNibHh1SUNCdlltcGJhMTBnUFNCdVpYZFdZV3gxWlR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnY0hWemFGQmhkR2dvYjJKcVpXTjBMQ0J3WVhSb0xDQnVaWGRXWVd4MVpTd2dZMjl1WTJGMEtTQjdYRzRnSUhaaGNpQmZaMlYwVEdGemRFOW1VR0YwYURJZ1BTQm5aWFJNWVhOMFQyWlFZWFJvS0c5aWFtVmpkQ3dnY0dGMGFDd2dUMkpxWldOMEtTeGNiaUFnSUNBZ0lHOWlhaUE5SUY5blpYUk1ZWE4wVDJaUVlYUm9NaTV2WW1vc1hHNGdJQ0FnSUNCcklEMGdYMmRsZEV4aGMzUlBabEJoZEdneUxtczdYRzVjYmlBZ2IySnFXMnRkSUQwZ2IySnFXMnRkSUh4OElGdGRPMXh1SUNCcFppQW9ZMjl1WTJGMEtTQnZZbXBiYTEwZ1BTQnZZbXBiYTEwdVkyOXVZMkYwS0c1bGQxWmhiSFZsS1R0Y2JpQWdhV1lnS0NGamIyNWpZWFFwSUc5aWFsdHJYUzV3ZFhOb0tHNWxkMVpoYkhWbEtUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1oyVjBVR0YwYUNodlltcGxZM1FzSUhCaGRHZ3BJSHRjYmlBZ2RtRnlJRjluWlhSTVlYTjBUMlpRWVhSb015QTlJR2RsZEV4aGMzUlBabEJoZEdnb2IySnFaV04wTENCd1lYUm9LU3hjYmlBZ0lDQWdJRzlpYWlBOUlGOW5aWFJNWVhOMFQyWlFZWFJvTXk1dlltb3NYRzRnSUNBZ0lDQnJJRDBnWDJkbGRFeGhjM1JQWmxCaGRHZ3pMbXM3WEc1Y2JpQWdhV1lnS0NGdlltb3BJSEpsZEhWeWJpQjFibVJsWm1sdVpXUTdYRzRnSUhKbGRIVnliaUJ2WW1wYmExMDdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHUmxaWEJGZUhSbGJtUW9kR0Z5WjJWMExDQnpiM1Z5WTJVc0lHOTJaWEozY21sMFpTa2dlMXh1SUNBdktpQmxjMnhwYm5RZ2JtOHRjbVZ6ZEhKcFkzUmxaQzF6ZVc1MFlYZzZJREFnS2k5Y2JpQWdabTl5SUNoMllYSWdjSEp2Y0NCcGJpQnpiM1Z5WTJVcElIdGNiaUFnSUNCcFppQW9jSEp2Y0NCcGJpQjBZWEpuWlhRcElIdGNiaUFnSUNBZ0lDOHZJRWxtSUhkbElISmxZV05vWldRZ1lTQnNaV0ZtSUhOMGNtbHVaeUJwYmlCMFlYSm5aWFFnYjNJZ2MyOTFjbU5sSUhSb1pXNGdjbVZ3YkdGalpTQjNhWFJvSUhOdmRYSmpaU0J2Y2lCemEybHdJR1JsY0dWdVpHbHVaeUJ2YmlCMGFHVWdKMjkyWlhKM2NtbDBaU2NnYzNkcGRHTm9YRzRnSUNBZ0lDQnBaaUFvZEhsd1pXOW1JSFJoY21kbGRGdHdjbTl3WFNBOVBUMGdKM04wY21sdVp5Y2dmSHdnZEdGeVoyVjBXM0J5YjNCZElHbHVjM1JoYm1ObGIyWWdVM1J5YVc1bklIeDhJSFI1Y0dWdlppQnpiM1Z5WTJWYmNISnZjRjBnUFQwOUlDZHpkSEpwYm1jbklIeDhJSE52ZFhKalpWdHdjbTl3WFNCcGJuTjBZVzVqWlc5bUlGTjBjbWx1WnlrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvYjNabGNuZHlhWFJsS1NCMFlYSm5aWFJiY0hKdmNGMGdQU0J6YjNWeVkyVmJjSEp2Y0YwN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCa1pXVndSWGgwWlc1a0tIUmhjbWRsZEZ0d2NtOXdYU3dnYzI5MWNtTmxXM0J5YjNCZExDQnZkbVZ5ZDNKcGRHVXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCMFlYSm5aWFJiY0hKdmNGMGdQU0J6YjNWeVkyVmJjSEp2Y0YwN1hHNGdJQ0FnZlZ4dUlDQjlYRzRnSUhKbGRIVnliaUIwWVhKblpYUTdYRzU5WEc1Y2JtWjFibU4wYVc5dUlISmxaMlY0UlhOallYQmxLSE4wY2lrZ2UxeHVJQ0F2S2lCbGMyeHBiblFnYm04dGRYTmxiR1Z6Y3kxbGMyTmhjR1U2SURBZ0tpOWNiaUFnY21WMGRYSnVJSE4wY2k1eVpYQnNZV05sS0M5YlhGd3RYRnhiWEZ4ZFhGd3ZYRng3WEZ4OVhGd29YRndwWEZ3cVhGd3JYRncvWEZ3dVhGeGNYRnhjWGx4Y0pGeGNmRjB2Wnl3Z0oxeGNYRndrSmljcE8xeHVmVnh1WEc0dktpQmxjMnhwYm5RdFpHbHpZV0pzWlNBcUwxeHVkbUZ5SUY5bGJuUnBkSGxOWVhBZ1BTQjdYRzRnSUZ3aUpsd2lPaUJjSWlaaGJYQTdYQ0lzWEc0Z0lGd2lQRndpT2lCY0lpWnNkRHRjSWl4Y2JpQWdYQ0krWENJNklGd2lKbWQwTzF3aUxGeHVJQ0FuWENJbk9pQW5KbkYxYjNRN0p5eGNiaUFnWENJblhDSTZJQ2NtSXpNNU95Y3NYRzRnSUZ3aUwxd2lPaUFuSmlONE1rWTdKMXh1ZlR0Y2JpOHFJR1Z6YkdsdWRDMWxibUZpYkdVZ0tpOWNibHh1Wm5WdVkzUnBiMjRnWlhOallYQmxLR1JoZEdFcElIdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCa1lYUmhJRDA5UFNBbmMzUnlhVzVuSnlrZ2UxeHVJQ0FnSUhKbGRIVnliaUJrWVhSaExuSmxjR3hoWTJVb0wxc21QRDVjSWlkY1hDOWRMMmNzSUdaMWJtTjBhVzl1SUNoektTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z1gyVnVkR2wwZVUxaGNGdHpYVHRjYmlBZ0lDQjlLVHRjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJrWVhSaE8xeHVmU0lzSW0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21WeGRXbHlaU2duTGk5a2FYTjBMMk52YlcxdmJtcHpMMmx1WkdWNExtcHpKeWt1WkdWbVlYVnNkRHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRndpWDE5bGMwMXZaSFZzWlZ3aUxDQjdYRzRnSUhaaGJIVmxPaUIwY25WbFhHNTlLVHRjYmx4dWRtRnlJRjlsZUhSbGJtUnpJRDBnVDJKcVpXTjBMbUZ6YzJsbmJpQjhmQ0JtZFc1amRHbHZiaUFvZEdGeVoyVjBLU0I3SUdadmNpQW9kbUZ5SUdrZ1BTQXhPeUJwSUR3Z1lYSm5kVzFsYm5SekxteGxibWQwYURzZ2FTc3JLU0I3SUhaaGNpQnpiM1Z5WTJVZ1BTQmhjbWQxYldWdWRITmJhVjA3SUdadmNpQW9kbUZ5SUd0bGVTQnBiaUJ6YjNWeVkyVXBJSHNnYVdZZ0tFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHpiM1Z5WTJVc0lHdGxlU2twSUhzZ2RHRnlaMlYwVzJ0bGVWMGdQU0J6YjNWeVkyVmJhMlY1WFRzZ2ZTQjlJSDBnY21WMGRYSnVJSFJoY21kbGREc2dmVHRjYmx4dWRtRnlJR1JsWm1GMWJIUnpJRDBnZTF4dUlDQjBUbUZ0WlRvZ0ozUW5MRnh1SUNCcE1UaHVUbUZ0WlRvZ0oya3hPRzRuTEZ4dUlDQm9ZVzVrYkdWT1lXMWxPaUFuYkc5allXeHBlbVVuTEZ4dUlDQnpaV3hsWTNSdmNrRjBkSEk2SUNka1lYUmhMV2t4T0c0bkxGeHVJQ0IwWVhKblpYUkJkSFJ5T2lBbmFURTRiaTEwWVhKblpYUW5MRnh1SUNCdmNIUnBiMjV6UVhSMGNqb2dKMmt4T0c0dGIzQjBhVzl1Y3ljc1hHNGdJSFZ6WlU5d2RHbHZibk5CZEhSeU9pQm1ZV3h6WlN4Y2JpQWdjR0Z5YzJWRVpXWmhkV3gwVm1Gc2RXVkdjbTl0UTI5dWRHVnVkRG9nZEhKMVpWeHVmVHRjYmx4dVpuVnVZM1JwYjI0Z2FXNXBkQ2hwTVRodVpYaDBMQ0FrS1NCN1hHNGdJSFpoY2lCdmNIUnBiMjV6SUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUNBK0lESWdKaVlnWVhKbmRXMWxiblJ6V3pKZElDRTlQU0IxYm1SbFptbHVaV1FnUHlCaGNtZDFiV1Z1ZEhOYk1sMGdPaUI3ZlR0Y2JseHVYRzRnSUc5d2RHbHZibk1nUFNCZlpYaDBaVzVrY3loN2ZTd2daR1ZtWVhWc2RITXNJRzl3ZEdsdmJuTXBPMXh1WEc0Z0lHWjFibU4wYVc5dUlIQmhjbk5sS0dWc1pTd2dhMlY1TENCdmNIUnpLU0I3WEc0Z0lDQWdhV1lnS0d0bGVTNXNaVzVuZEdnZ1BUMDlJREFwSUhKbGRIVnlianRjYmx4dUlDQWdJSFpoY2lCaGRIUnlJRDBnSjNSbGVIUW5PMXh1WEc0Z0lDQWdhV1lnS0d0bGVTNXBibVJsZUU5bUtDZGJKeWtnUFQwOUlEQXBJSHRjYmlBZ0lDQWdJSFpoY2lCd1lYSjBjeUE5SUd0bGVTNXpjR3hwZENnblhTY3BPMXh1SUNBZ0lDQWdhMlY1SUQwZ2NHRnlkSE5iTVYwN1hHNGdJQ0FnSUNCaGRIUnlJRDBnY0dGeWRITmJNRjB1YzNWaWMzUnlLREVzSUhCaGNuUnpXekJkTG14bGJtZDBhQ0F0SURFcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaHJaWGt1YVc1a1pYaFBaaWduT3ljcElEMDlQU0JyWlhrdWJHVnVaM1JvSUMwZ01Ta2dlMXh1SUNBZ0lDQWdhMlY1SUQwZ2EyVjVMbk4xWW5OMGNpZ3dMQ0JyWlhrdWJHVnVaM1JvSUMwZ01pazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ1puVnVZM1JwYjI0Z1pYaDBaVzVrUkdWbVlYVnNkQ2h2TENCMllXd3BJSHRjYmlBZ0lDQWdJR2xtSUNnaGIzQjBhVzl1Y3k1d1lYSnpaVVJsWm1GMWJIUldZV3gxWlVaeWIyMURiMjUwWlc1MEtTQnlaWFIxY200Z2J6dGNiaUFnSUNBZ0lISmxkSFZ5YmlCZlpYaDBaVzVrY3loN2ZTd2dieXdnZXlCa1pXWmhkV3gwVm1Gc2RXVTZJSFpoYkNCOUtUdGNiaUFnSUNCOVhHNWNiaUFnSUNCcFppQW9ZWFIwY2lBOVBUMGdKMmgwYld3bktTQjdYRzRnSUNBZ0lDQmxiR1V1YUhSdGJDaHBNVGh1WlhoMExuUW9hMlY1TENCbGVIUmxibVJFWldaaGRXeDBLRzl3ZEhNc0lHVnNaUzVvZEcxc0tDa3BLU2s3WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2hoZEhSeUlEMDlQU0FuZEdWNGRDY3BJSHRjYmlBZ0lDQWdJR1ZzWlM1MFpYaDBLR2t4T0c1bGVIUXVkQ2hyWlhrc0lHVjRkR1Z1WkVSbFptRjFiSFFvYjNCMGN5d2daV3hsTG5SbGVIUW9LU2twS1R0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0dGMGRISWdQVDA5SUNkd2NtVndaVzVrSnlrZ2UxeHVJQ0FnSUNBZ1pXeGxMbkJ5WlhCbGJtUW9hVEU0Ym1WNGRDNTBLR3RsZVN3Z1pYaDBaVzVrUkdWbVlYVnNkQ2h2Y0hSekxDQmxiR1V1YUhSdGJDZ3BLU2twTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvWVhSMGNpQTlQVDBnSjJGd2NHVnVaQ2NwSUh0Y2JpQWdJQ0FnSUdWc1pTNWhjSEJsYm1Rb2FURTRibVY0ZEM1MEtHdGxlU3dnWlhoMFpXNWtSR1ZtWVhWc2RDaHZjSFJ6TENCbGJHVXVhSFJ0YkNncEtTa3BPMXh1SUNBZ0lIMGdaV3h6WlNCcFppQW9ZWFIwY2k1cGJtUmxlRTltS0Nka1lYUmhMU2NwSUQwOVBTQXdLU0I3WEc0Z0lDQWdJQ0IyWVhJZ1pHRjBZVUYwZEhJZ1BTQmhkSFJ5TG5OMVluTjBjaWduWkdGMFlTMG5MbXhsYm1kMGFDazdYRzRnSUNBZ0lDQjJZWElnZEhKaGJuTnNZWFJsWkNBOUlHa3hPRzVsZUhRdWRDaHJaWGtzSUdWNGRHVnVaRVJsWm1GMWJIUW9iM0IwY3l3Z1pXeGxMbVJoZEdFb1pHRjBZVUYwZEhJcEtTazdYRzVjYmlBZ0lDQWdJQzh2SUhkbElHTm9ZVzVuWlNCcGJuUnZJSFJvWlNCa1lYUmhJR05oWTJobFhHNGdJQ0FnSUNCbGJHVXVaR0YwWVNoa1lYUmhRWFIwY2l3Z2RISmhibk5zWVhSbFpDazdYRzRnSUNBZ0lDQXZMeUIzWlNCamFHRnVaMlVnYVc1MGJ5QjBhR1VnWkc5dFhHNGdJQ0FnSUNCbGJHVXVZWFIwY2loaGRIUnlMQ0IwY21GdWMyeGhkR1ZrS1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdaV3hsTG1GMGRISW9ZWFIwY2l3Z2FURTRibVY0ZEM1MEtHdGxlU3dnWlhoMFpXNWtSR1ZtWVhWc2RDaHZjSFJ6TENCbGJHVXVZWFIwY2loaGRIUnlLU2twS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCc2IyTmhiR2w2WlNobGJHVXNJRzl3ZEhNcElIdGNiaUFnSUNCMllYSWdhMlY1SUQwZ1pXeGxMbUYwZEhJb2IzQjBhVzl1Y3k1elpXeGxZM1J2Y2tGMGRISXBPMXh1SUNBZ0lHbG1JQ2doYTJWNUlDWW1JSFI1Y0dWdlppQnJaWGtnSVQwOUlDZDFibVJsWm1sdVpXUW5JQ1ltSUd0bGVTQWhQVDBnWm1Gc2MyVXBJR3RsZVNBOUlHVnNaUzUwWlhoMEtDa2dmSHdnWld4bExuWmhiQ2dwTzF4dUlDQWdJR2xtSUNnaGEyVjVLU0J5WlhSMWNtNDdYRzVjYmlBZ0lDQjJZWElnZEdGeVoyVjBJRDBnWld4bExGeHVJQ0FnSUNBZ0lDQjBZWEpuWlhSVFpXeGxZM1J2Y2lBOUlHVnNaUzVrWVhSaEtHOXdkR2x2Ym5NdWRHRnlaMlYwUVhSMGNpazdYRzVjYmlBZ0lDQnBaaUFvZEdGeVoyVjBVMlZzWldOMGIzSXBJSFJoY21kbGRDQTlJR1ZzWlM1bWFXNWtLSFJoY21kbGRGTmxiR1ZqZEc5eUtTQjhmQ0JsYkdVN1hHNWNiaUFnSUNCcFppQW9JVzl3ZEhNZ0ppWWdiM0IwYVc5dWN5NTFjMlZQY0hScGIyNXpRWFIwY2lBOVBUMGdkSEoxWlNrZ2IzQjBjeUE5SUdWc1pTNWtZWFJoS0c5d2RHbHZibk11YjNCMGFXOXVjMEYwZEhJcE8xeHVYRzRnSUNBZ2IzQjBjeUE5SUc5d2RITWdmSHdnZTMwN1hHNWNiaUFnSUNCcFppQW9hMlY1TG1sdVpHVjRUMllvSnpzbktTQStQU0F3S1NCN1hHNGdJQ0FnSUNCMllYSWdhMlY1Y3lBOUlHdGxlUzV6Y0d4cGRDZ25PeWNwTzF4dVhHNGdJQ0FnSUNBa0xtVmhZMmdvYTJWNWN5d2dablZ1WTNScGIyNGdLRzBzSUdzcElIdGNiaUFnSUNBZ0lDQWdMeThnTG5SeWFXMG9LVG9nVkhKcGJTQjBhR1VnWTI5dGJXRXRjMlZ3WVhKaGRHVmtJSEJoY21GdFpYUmxjbk1nYjI0Z2RHaGxJR1JoZEdFdGFURTRiaUJoZEhSeWFXSjFkR1V1WEc0Z0lDQWdJQ0FnSUdsbUlDaHJJQ0U5UFNBbkp5a2djR0Z5YzJVb2RHRnlaMlYwTENCckxuUnlhVzBvS1N3Z2IzQjBjeWs3WEc0Z0lDQWdJQ0I5S1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdjR0Z5YzJVb2RHRnlaMlYwTENCclpYa3NJRzl3ZEhNcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaHZjSFJwYjI1ekxuVnpaVTl3ZEdsdmJuTkJkSFJ5SUQwOVBTQjBjblZsS1NCN1hHNGdJQ0FnSUNCMllYSWdZMnh2Ym1VZ1BTQjdmVHRjYmlBZ0lDQWdJR05zYjI1bElEMGdYMlY0ZEdWdVpITW9leUJqYkc5dVpUb2dZMnh2Ym1VZ2ZTd2diM0IwY3lrN1hHNWNiaUFnSUNBZ0lHUmxiR1YwWlNCamJHOXVaUzVzYm1jN1hHNGdJQ0FnSUNCbGJHVXVaR0YwWVNodmNIUnBiMjV6TG05d2RHbHZibk5CZEhSeUxDQmpiRzl1WlNrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2FHRnVaR3hsS0c5d2RITXBJSHRjYmlBZ0lDQnlaWFIxY200Z2RHaHBjeTVsWVdOb0tHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQWdJQzh2SUd4dlkyRnNhWHBsSUdWc1pXMWxiblFnYVhSelpXeG1YRzRnSUNBZ0lDQnNiMk5oYkdsNlpTZ2tLSFJvYVhNcExDQnZjSFJ6S1R0Y2JseHVJQ0FnSUNBZ0x5OGdiRzlqWVd4cGVtVWdZMmhwYkdSeVpXNWNiaUFnSUNBZ0lIWmhjaUJsYkdWdFpXNTBjeUE5SUNRb2RHaHBjeWt1Wm1sdVpDZ25XeWNnS3lCdmNIUnBiMjV6TG5ObGJHVmpkRzl5UVhSMGNpQXJJQ2RkSnlrN1hHNGdJQ0FnSUNCbGJHVnRaVzUwY3k1bFlXTm9LR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0FnSUNBZ2JHOWpZV3hwZW1Vb0pDaDBhR2x6S1N3Z2IzQjBjeWs3WEc0Z0lDQWdJQ0I5S1R0Y2JpQWdJQ0I5S1R0Y2JpQWdmVHRjYmx4dUlDQXZMeUFrTG5RZ0pDNXBNVGh1SUhOb2IzSjBZM1YwWEc0Z0lDUmJiM0IwYVc5dWN5NTBUbUZ0WlYwZ1BTQnBNVGh1WlhoMExuUXVZbWx1WkNocE1UaHVaWGgwS1R0Y2JpQWdKRnR2Y0hScGIyNXpMbWt4T0c1T1lXMWxYU0E5SUdreE9HNWxlSFE3WEc1Y2JpQWdMeThnYzJWc1pXTjBiM0lnWm5WdVkzUnBiMjRnSkNodGVWTmxiR1ZqZEc5eUtTNXNiMk5oYkdsNlpTaHZjSFJ6S1R0Y2JpQWdKQzVtYmx0dmNIUnBiMjV6TG1oaGJtUnNaVTVoYldWZElEMGdhR0Z1Wkd4bE8xeHVmVnh1WEc1bGVIQnZjblJ6TG1SbFptRjFiSFFnUFNCN1hHNGdJR2x1YVhRNklHbHVhWFJjYm4wN0lpd2lhVzF3YjNKMElHa3hPRzVsZUhRZ1puSnZiU0FuYVRFNGJtVjRkQ2M3WEc1cGJYQnZjblFnYW5GMVpYSjVTVEU0Ym1WNGRDQm1jbTl0SUNkcWNYVmxjbmt0YVRFNGJtVjRkQ2M3WEc1Y2JtbHRjRzl5ZENBcUlHRnpJSE5yYVd4c2MyVjBJR1p5YjIwZ0p5NHZiVzlrZFd4bGN5OXphMmxzYkhObGRDYzdYRzVjYmlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlHVnVaMnhwYzJnZ1BTQnlaWEYxYVhKbEtGd2lMaTR2TGk5c2IyTmhiR1Z6TDJWdUxtcHpiMjVjSWlrN1hHNTJZWElnWjJWeWJXRnVJRDBnY21WeGRXbHlaU2hjSWk0dUx5NHZiRzlqWVd4bGN5OWtaUzVxYzI5dVhDSXBPMXh1WEc1MllYSWdjbVZ6YjNWeVkyVnpJRDBnZTF4dUlDQmxiam9nWlc1bmJHbHphQ3hjYmlBZ1pHVTZJR2RsY20xaGJseHVmVHRjYmx4dVpuVnVZM1JwYjI0Z2FXNXBkRk50YjI5MGFGTmpjbTlzYkdsdVp5Z3BlMXh1SUNBdkx5QlRaV3hsWTNRZ1lXeHNJR3hwYm10eklIZHBkR2dnYUdGemFHVnpYRzRnSUNRb0oyRmJhSEpsWmlvOVhDSWpYQ0pkSnlsY2JpQWdJQ0F2THlCU1pXMXZkbVVnYkdsdWEzTWdkR2hoZENCa2IyNG5kQ0JoWTNSMVlXeHNlU0JzYVc1cklIUnZJR0Z1ZVhSb2FXNW5YRzRnSUNBZ0xtNXZkQ2duVzJoeVpXWTlYQ0lqWENKZEp5bGNiaUFnSUNBdWJtOTBLQ2RiYUhKbFpqMWNJaU13WENKZEp5bGNiaUFnSUNBdVkyeHBZMnNvWm5WdVkzUnBiMjRvWlhabGJuUXBJSHRjYmlBZ0lDQWdJQzh2SUU5dUxYQmhaMlVnYkdsdWEzTmNiaUFnSUNBZ0lHbG1JQ2hjYmlBZ0lDQWdJQ0FnYkc5allYUnBiMjR1Y0dGMGFHNWhiV1V1Y21Wd2JHRmpaU2d2WGx4Y0x5OHNJQ2NuS1NBOVBTQjBhR2x6TG5CaGRHaHVZVzFsTG5KbGNHeGhZMlVvTDE1Y1hDOHZMQ0FuSnlrZ0ppWmNiaUFnSUNBZ0lDQWdiRzlqWVhScGIyNHVhRzl6ZEc1aGJXVWdQVDBnZEdocGN5NW9iM04wYm1GdFpWeHVJQ0FnSUNBZ0tTQjdYRzRnSUNBZ0lDQWdJQzh2SUVacFozVnlaU0J2ZFhRZ1pXeGxiV1Z1ZENCMGJ5QnpZM0p2Ykd3Z2RHOWNiaUFnSUNBZ0lDQWdkbUZ5SUhSaGNtZGxkQ0E5SUNRb2RHaHBjeTVvWVhOb0tUdGNiaUFnSUNBZ0lDQWdkR0Z5WjJWMElEMGdkR0Z5WjJWMExteGxibWQwYUNBL0lIUmhjbWRsZENBNklDUW9KMXR1WVcxbFBTY2dLeUIwYUdsekxtaGhjMmd1YzJ4cFkyVW9NU2tnS3lBblhTY3BPMXh1SUNBZ0lDQWdJQ0F2THlCRWIyVnpJR0VnYzJOeWIyeHNJSFJoY21kbGRDQmxlR2x6ZEQ5Y2JpQWdJQ0FnSUNBZ2FXWWdLSFJoY21kbGRDNXNaVzVuZEdncElIdGNiaUFnSUNBZ0lDQWdJQ0F2THlCUGJteDVJSEJ5WlhabGJuUWdaR1ZtWVhWc2RDQnBaaUJoYm1sdFlYUnBiMjRnYVhNZ1lXTjBkV0ZzYkhrZ1oyOXVibUVnYUdGd2NHVnVYRzRnSUNBZ0lDQWdJQ0FnWlhabGJuUXVjSEpsZG1WdWRFUmxabUYxYkhRb0tUdGNiaUFnSUNBZ0lDQWdJQ0FrS0Nkb2RHMXNMQ0JpYjJSNUp5a3VZVzVwYldGMFpTaDdYRzRnSUNBZ0lDQWdJQ0FnSUNCelkzSnZiR3hVYjNBNklIUmhjbWRsZEM1dlptWnpaWFFvS1M1MGIzQmNiaUFnSUNBZ0lDQWdJQ0I5TENBeE1EQXdMQ0JtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUVOaGJHeGlZV05ySUdGbWRHVnlJR0Z1YVcxaGRHbHZibHh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdUWFZ6ZENCamFHRnVaMlVnWm05amRYTWhYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdKSFJoY21kbGRDQTlJQ1FvZEdGeVoyVjBLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDUjBZWEpuWlhRdVptOWpkWE1vS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNna2RHRnlaMlYwTG1sektGd2lPbVp2WTNWelhDSXBLU0I3SUM4dklFTm9aV05yYVc1bklHbG1JSFJvWlNCMFlYSm5aWFFnZDJGeklHWnZZM1Z6WldSY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdKSFJoY21kbGRDNWhkSFJ5S0NkMFlXSnBibVJsZUNjc0p5MHhKeWs3SUM4dklFRmtaR2x1WnlCMFlXSnBibVJsZUNCbWIzSWdaV3hsYldWdWRITWdibTkwSUdadlkzVnpZV0pzWlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FrZEdGeVoyVjBMbVp2WTNWektDazdJQzh2SUZObGRDQm1iMk4xY3lCaFoyRnBibHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNrN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdaaFpHVkpibE5qY205c2JGUnZjRUoxZEhSdmJpZ3BlMXh1SUNCcFppQW9KQ2gzYVc1a2IzY3BMbk5qY205c2JGUnZjQ2dwSUQ0Z01qVXdLU0I3WEc0Z0lDQWdKQ2duTG1KaFkyc3RkRzh0ZEc5d0p5a3VabUZrWlVsdUtEUXdNQ2s3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnSkNnbkxtSmhZMnN0ZEc4dGRHOXdKeWt1Wm1Ga1pVOTFkQ2cwTURBcE8xeHVJQ0I5WEc1OVhHNWNiblpoY2lCc1lXNW5kV0ZuWlV4dmIydDFjQ0E5SUh0Y2JpQWdYQ0pFWlhWMGMyTm9YQ0k2SUZ3aVpHVmNJaXhjYmlBZ1hDSkZibWRzYVhOb1hDSTZJRndpWlc1Y0lseHVmVnh1WEc1bWRXNWpkR2x2YmlCemQybDBZMmhNWVc1bmRXRm5aU2hsZG1WdWRDbDdYRzRnSUhaaGNpQjBZWEpuWlhRZ1BTQWtLR1YyWlc1MExuUmhjbWRsZENrN1hHNGdJQzh2SUdsbUtDUW9aWFpsYm5RdWRHRnlaMlYwS1M1b1lYTkRiR0Z6Y3loY0ltRmpkR2wyWlZ3aUtTbGNiaUFnTHk4Z0lDQnlaWFIxY200N1hHNGdJQ1FvWENJamJHRnVaM1ZoWjJWeklDNXNZVzVuZFdGblpWd2lLUzV5WlcxdmRtVkRiR0Z6Y3loY0ltRmpkR2wyWlZ3aUtUdGNiaUFnZEdGeVoyVjBMbUZrWkVOc1lYTnpLRndpWVdOMGFYWmxYQ0lwTzF4dUlDQnBNVGh1WlhoMExtTm9ZVzVuWlV4aGJtZDFZV2RsS0d4aGJtZDFZV2RsVEc5dmEzVndXM1JoY21kbGRDNTBaWGgwS0NsZEtUdGNiaUFnSkNoY0lsdGtZWFJoTFdreE9HNWRYQ0lwTG14dlkyRnNhWHBsS0NrN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdGa1pFeGhibWQxWVdkbFUzZHBkR05vU0dGdVpHeGxjaWdwZTF4dUlDQWtLRndpSTJ4aGJtZDFZV2RsY3lBdWJHRnVaM1ZoWjJWY0lpa3VZMnhwWTJzb2MzZHBkR05vVEdGdVozVmhaMlVwWEc1OVhHNWNibVoxYm1OMGFXOXVJR2x1YVhSS2NYVmxjbmxKTVRodVpYaDBLQ2w3WEc0Z0lHa3hPRzVsZUhRdWFXNXBkQ2g3WEc0Z0lDQWdiRzVuT2lBblpXNG5MRnh1SUNBZ0lHUmxZblZuT2lCMGNuVmxMRnh1SUNBZ0lISmxjMjkxY21ObGN6b2djbVZ6YjNWeVkyVnpYRzRnSUgwc0lHWjFibU4wYVc5dUtHVnljaXdnZENrZ2UxeHVJQ0FnSUM4dklHbHVhWFJwWVd4cGVtVmtJR0Z1WkNCeVpXRmtlU0IwYnlCbmJ5RmNiaUFnZlNrN1hHNWNiaUFnYW5GMVpYSjVTVEU0Ym1WNGRDNXBibWwwS0dreE9HNWxlSFFzSUNRc0lIdGNiaUFnSUNCMFRtRnRaVG9nSjNRbkxDQXZMeUF0TFQ0Z1lYQndaVzVrY3lBa0xuUWdQU0JwTVRodVpYaDBMblJjYmlBZ0lDQnBNVGh1VG1GdFpUb2dKMmt4T0c0bkxDQXZMeUF0TFQ0Z1lYQndaVzVrY3lBa0xta3hPRzRnUFNCcE1UaHVaWGgwWEc0Z0lDQWdhR0Z1Wkd4bFRtRnRaVG9nSjJ4dlkyRnNhWHBsSnl3Z0x5OGdMUzArSUdGd2NHVnVaSE1nSkNoelpXeGxZM1J2Y2lrdWJHOWpZV3hwZW1Vb2IzQjBjeWs3WEc0Z0lDQWdjMlZzWldOMGIzSkJkSFJ5T2lBblpHRjBZUzFwTVRodUp5d2dMeThnYzJWc1pXTjBiM0lnWm05eUlIUnlZVzV6YkdGMGFXNW5JR1ZzWlcxbGJuUnpYRzRnSUNBZ2RHRnlaMlYwUVhSMGNqb2dKMmt4T0c0dGRHRnlaMlYwSnl3Z0x5OGdaR0YwWVMwb0tTQmhkSFJ5YVdKMWRHVWdkRzhnWjNKaFlpQjBZWEpuWlhRZ1pXeGxiV1Z1ZENCMGJ5QjBjbUZ1YzJ4aGRHVWdLR2xtSUdScFptWnlaVzUwSUhSb1pXNGdhWFJ6Wld4bUtWeHVJQ0FnSUc5d2RHbHZibk5CZEhSeU9pQW5hVEU0YmkxdmNIUnBiMjV6Snl3Z0x5OGdaR0YwWVMwb0tTQmhkSFJ5YVdKMWRHVWdkR2hoZENCamIyNTBZV2x1Y3lCdmNIUnBiMjV6TENCM2FXeHNJR3h2WVdRdmMyVjBJR2xtSUhWelpVOXdkR2x2Ym5OQmRIUnlJRDBnZEhKMVpWeHVJQ0FnSUhWelpVOXdkR2x2Ym5OQmRIUnlPaUJtWVd4elpTd2dMeThnYzJWbElHOXdkR2x2Ym5OQmRIUnlYRzRnSUNBZ2NHRnljMlZFWldaaGRXeDBWbUZzZFdWR2NtOXRRMjl1ZEdWdWREb2dkSEoxWlNBdkx5QndZWEp6WlhNZ1pHVm1ZWFZzZENCMllXeDFaWE1nWm5KdmJTQmpiMjUwWlc1MElHVnNaUzUyWVd3Z2IzSWdaV3hsTG5SbGVIUmNiaUFnZlNrN1hHNTlYRzVjYmk4dklFUlBUU0JwY3lCeVpXRmtlVnh1SkNobWRXNWpkR2x2YmlncGUxeHVJQ0JwYm1sMFUyMXZiM1JvVTJOeWIyeHNhVzVuS0NrN1hHNGdJR2x1YVhSS2NYVmxjbmxKTVRodVpYaDBLQ2s3WEc0Z0lHRmtaRXhoYm1kMVlXZGxVM2RwZEdOb1NHRnVaR3hsY2lncE8xeHVJQ0J6YTJsc2JITmxkQzVwYm1sMEtDazdYRzRnSUNRb2QybHVaRzkzS1M1elkzSnZiR3dvWm1Ga1pVbHVVMk55YjJ4c1ZHOXdRblYwZEc5dUtUdGNiaUFnSkNoY0lpTnNiMkZrWlhKY0lpa3VjbVZ0YjNabFEyeGhjM01vWENKaFkzUnBkbVZjSWlrN1hHNTlLVHRjYmlJc0luWmhjaUJrWVhSaElEMGdlMXh5WEc0Z0lDQWdYQ0p1YjJSbGMxd2lPaUJiZTF4eVhHNGdJQ0FnSUNBZ0lGd2libUZ0WlZ3aU9pQmNJbGRsWW1SbGRtVnNiM0J0Wlc1MFhDSXNYSEpjYmlBZ0lDQWdJQ0FnWENKbmNtOTFjRndpT2lBd1hISmNiaUFnSUNCOUxIdGNjbHh1SUNBZ0lDQWdJQ0JjSW01aGJXVmNJam9nWENKR2NtOXVkQzFsYm1SY0lpeGNjbHh1SUNBZ0lDQWdJQ0JjSW1keWIzVndYQ0k2SURGY2NseHVJQ0FnSUgwc2UxeHlYRzRnSUNBZ0lDQWdJRndpYm1GdFpWd2lPaUJjSWtKaFkyc3RaVzVrWENJc1hISmNiaUFnSUNBZ0lDQWdYQ0puY205MWNGd2lPaUF5WEhKY2JpQWdJQ0I5TEh0Y2NseHVJQ0FnSUNBZ0lDQmNJbTVoYldWY0lqb2dYQ0pEVTFNelhDSXNYSEpjYmlBZ0lDQWdJQ0FnWENKbmNtOTFjRndpT2lBelhISmNiaUFnSUNCOUxDQjdYSEpjYmlBZ0lDQWdJQ0FnWENKdVlXMWxYQ0k2SUZ3aVNGUk5URFZjSWl4Y2NseHVJQ0FnSUNBZ0lDQmNJbWR5YjNWd1hDSTZJREZjY2x4dUlDQWdJSDBzSUh0Y2NseHVJQ0FnSUNBZ0lDQmNJbTVoYldWY0lqb2dYQ0pLWVhaaGMyTnlhWEIwWENJc1hISmNiaUFnSUNBZ0lDQWdYQ0puY205MWNGd2lPaUEwWEhKY2JpQWdJQ0I5TEh0Y2NseHVJQ0FnSUNBZ0lDQmNJbTVoYldWY0lqb2dYQ0pNWlhOelhDSXNYSEpjYmlBZ0lDQWdJQ0FnWENKbmNtOTFjRndpT2lBelhISmNiaUFnSUNCOUxDQjdYSEpjYmlBZ0lDQWdJQ0FnWENKdVlXMWxYQ0k2SUZ3aVUzUjViSFZ6WENJc1hISmNiaUFnSUNBZ0lDQWdYQ0puY205MWNGd2lPaUF6WEhKY2JpQWdJQ0I5TENCN1hISmNiaUFnSUNBZ0lDQWdYQ0p1WVcxbFhDSTZJRndpVUhWblhDSXNYSEpjYmlBZ0lDQWdJQ0FnWENKbmNtOTFjRndpT2lBeFhISmNiaUFnSUNCOUxIdGNjbHh1SUNBZ0lDQWdJQ0JjSW01aGJXVmNJam9nWENKQ2IyOTBjM1J5WVhCY0lpeGNjbHh1SUNBZ0lDQWdJQ0JjSW1keWIzVndYQ0k2SUROY2NseHVJQ0FnSUgwc0lIdGNjbHh1SUNBZ0lDQWdJQ0JjSW01aGJXVmNJam9nWENKTllYUmxjbWxoYkdsNlpWd2lMRnh5WEc0Z0lDQWdJQ0FnSUZ3aVozSnZkWEJjSWpvZ00xeHlYRzRnSUNBZ2ZTd2dlMXh5WEc0Z0lDQWdJQ0FnSUZ3aWJtRnRaVndpT2lCY0lsUjVjR1ZUWTNKcGNIUmNJaXhjY2x4dUlDQWdJQ0FnSUNCY0ltZHliM1Z3WENJNklEUmNjbHh1SUNBZ0lIMHNJSHRjY2x4dUlDQWdJQ0FnSUNCY0ltNWhiV1ZjSWpvZ1hDSlVZWE5ySUZKMWJtNWxjbk5jSWl4Y2NseHVJQ0FnSUNBZ0lDQmNJbWR5YjNWd1hDSTZJRFZjY2x4dUlDQWdJSDBzZTF4eVhHNGdJQ0FnSUNBZ0lGd2libUZ0WlZ3aU9pQmNJa2QxYkhCY0lpeGNjbHh1SUNBZ0lDQWdJQ0JjSW1keWIzVndYQ0k2SURWY2NseHVJQ0FnSUgwc0lIdGNjbHh1SUNBZ0lDQWdJQ0JjSW01aGJXVmNJam9nWENKdWNHMGdjMk55YVhCMGMxd2lMRnh5WEc0Z0lDQWdJQ0FnSUZ3aVozSnZkWEJjSWpvZ05WeHlYRzRnSUNBZ2ZTeDdYSEpjYmlBZ0lDQWdJQ0FnWENKdVlXMWxYQ0k2SUZ3aVZHVnpkR2x1WjF3aUxGeHlYRzRnSUNBZ0lDQWdJRndpWjNKdmRYQmNJam9nTmx4eVhHNGdJQ0FnZlN4N1hISmNiaUFnSUNBZ0lDQWdYQ0p1WVcxbFhDSTZJRndpVFc5amFHRmNJaXhjY2x4dUlDQWdJQ0FnSUNCY0ltZHliM1Z3WENJNklEWmNjbHh1SUNBZ0lIMHNlMXh5WEc0Z0lDQWdJQ0FnSUZ3aWJtRnRaVndpT2lCY0lrcGhjMjFwYm1WY0lpeGNjbHh1SUNBZ0lDQWdJQ0JjSW1keWIzVndYQ0k2SURaY2NseHVJQ0FnSUgwc2UxeHlYRzRnSUNBZ0lDQWdJRndpYm1GdFpWd2lPaUJjSWxOcGJtOXVYQ0lzWEhKY2JpQWdJQ0FnSUNBZ1hDSm5jbTkxY0Z3aU9pQTJYSEpjYmlBZ0lDQjlMSHRjY2x4dUlDQWdJQ0FnSUNCY0ltNWhiV1ZjSWpvZ1hDSkdjbUZ0WlhkdmNtdGNJaXhjY2x4dUlDQWdJQ0FnSUNCY0ltZHliM1Z3WENJNklEZGNjbHh1SUNBZ0lIMHNJSHRjY2x4dUlDQWdJQ0FnSUNCY0ltNWhiV1ZjSWpvZ1hDSkJiWEJsY25OaGJtUmNJaXhjY2x4dUlDQWdJQ0FnSUNCY0ltZHliM1Z3WENJNklEZGNjbHh1SUNBZ0lIMHNJSHRjY2x4dUlDQWdJQ0FnSUNCY0ltNWhiV1ZjSWpvZ1hDSk5hWFJvY21sc1hDSXNYSEpjYmlBZ0lDQWdJQ0FnWENKbmNtOTFjRndpT2lBM1hISmNiaUFnSUNCOUxDQjdYSEpjYmlBZ0lDQWdJQ0FnWENKdVlXMWxYQ0k2SUZ3aVVtVmhZM1JjSWl4Y2NseHVJQ0FnSUNBZ0lDQmNJbWR5YjNWd1hDSTZJRGRjY2x4dUlDQWdJSDBzSUh0Y2NseHVJQ0FnSUNBZ0lDQmNJbTVoYldWY0lqb2dYQ0pFTTF3aUxGeHlYRzRnSUNBZ0lDQWdJRndpWjNKdmRYQmNJam9nTjF4eVhHNGdJQ0FnZlN3Z2UxeHlYRzRnSUNBZ0lDQWdJRndpYm1GdFpWd2lPaUJjSWtkbGJtVnlZV3hjSWl4Y2NseHVJQ0FnSUNBZ0lDQmNJbWR5YjNWd1hDSTZJRGhjY2x4dUlDQWdJSDBzZTF4eVhHNGdJQ0FnSUNBZ0lGd2libUZ0WlZ3aU9pQmNJa2RwZEZ3aUxGeHlYRzRnSUNBZ0lDQWdJRndpWjNKdmRYQmNJam9nT0Z4eVhHNGdJQ0FnZlN3Z2UxeHlYRzRnSUNBZ0lDQWdJRndpYm1GdFpWd2lPaUJjSWtkcGRHaDFZbHdpTEZ4eVhHNGdJQ0FnSUNBZ0lGd2laM0p2ZFhCY0lqb2dPRnh5WEc0Z0lDQWdmU3g3WEhKY2JpQWdJQ0FnSUNBZ1hDSnVZVzFsWENJNklGd2lUVzlrZFd4bElFSjFibVJzWlhKY0lpeGNjbHh1SUNBZ0lDQWdJQ0JjSW1keWIzVndYQ0k2SURsY2NseHVJQ0FnSUgwc2UxeHlYRzRnSUNBZ0lDQWdJRndpYm1GdFpWd2lPaUJjSWtKeWIzZHpaWEpwWm5sY0lpeGNjbHh1SUNBZ0lDQWdJQ0JjSW1keWIzVndYQ0k2SURsY2NseHVJQ0FnSUgxZExGeHlYRzRnSUNBZ1hDSnNhVzVyYzF3aU9pQmJlMXh5WEc0Z0lDQWdJQ0FnSUZ3aWMyOTFjbU5sWENJNklEQXNYSEpjYmlBZ0lDQWdJQ0FnWENKMFlYSm5aWFJjSWpvZ01TeGNjbHh1SUNBZ0lDQWdJQ0JjSW5aaGJIVmxYQ0k2SURGY2NseHVJQ0FnSUgwc2UxeHlYRzRnSUNBZ0lDQWdJRndpYzI5MWNtTmxYQ0k2SURBc1hISmNiaUFnSUNBZ0lDQWdYQ0owWVhKblpYUmNJam9nTWl4Y2NseHVJQ0FnSUNBZ0lDQmNJblpoYkhWbFhDSTZJREZjY2x4dUlDQWdJSDBzZTF4eVhHNGdJQ0FnSUNBZ0lGd2ljMjkxY21ObFhDSTZJREVzWEhKY2JpQWdJQ0FnSUNBZ1hDSjBZWEpuWlhSY0lqb2dNeXhjY2x4dUlDQWdJQ0FnSUNCY0luWmhiSFZsWENJNklERmNjbHh1SUNBZ0lIMHNlMXh5WEc0Z0lDQWdJQ0FnSUZ3aWMyOTFjbU5sWENJNklERXNYSEpjYmlBZ0lDQWdJQ0FnWENKMFlYSm5aWFJjSWpvZ05DeGNjbHh1SUNBZ0lDQWdJQ0JjSW5aaGJIVmxYQ0k2SURGY2NseHVJQ0FnSUgwc2UxeHlYRzRnSUNBZ0lDQWdJRndpYzI5MWNtTmxYQ0k2SURFc1hISmNiaUFnSUNBZ0lDQWdYQ0owWVhKblpYUmNJam9nTlN4Y2NseHVJQ0FnSUNBZ0lDQmNJblpoYkhWbFhDSTZJREZjY2x4dUlDQWdJSDBzZTF4eVhHNGdJQ0FnSUNBZ0lGd2ljMjkxY21ObFhDSTZJRE1zWEhKY2JpQWdJQ0FnSUNBZ1hDSjBZWEpuWlhSY0lqb2dOaXhjY2x4dUlDQWdJQ0FnSUNCY0luWmhiSFZsWENJNklERmNjbHh1SUNBZ0lIMHNlMXh5WEc0Z0lDQWdJQ0FnSUZ3aWMyOTFjbU5sWENJNklETXNYSEpjYmlBZ0lDQWdJQ0FnWENKMFlYSm5aWFJjSWpvZ055eGNjbHh1SUNBZ0lDQWdJQ0JjSW5aaGJIVmxYQ0k2SURGY2NseHVJQ0FnSUgwc2UxeHlYRzRnSUNBZ0lDQWdJRndpYzI5MWNtTmxYQ0k2SURRc1hISmNiaUFnSUNBZ0lDQWdYQ0owWVhKblpYUmNJam9nT0N4Y2NseHVJQ0FnSUNBZ0lDQmNJblpoYkhWbFhDSTZJREZjY2x4dUlDQWdJSDBzZTF4eVhHNGdJQ0FnSUNBZ0lGd2ljMjkxY21ObFhDSTZJRE1zWEhKY2JpQWdJQ0FnSUNBZ1hDSjBZWEpuWlhSY0lqb2dPU3hjY2x4dUlDQWdJQ0FnSUNCY0luWmhiSFZsWENJNklERmNjbHh1SUNBZ0lIMHNlMXh5WEc0Z0lDQWdJQ0FnSUZ3aWMyOTFjbU5sWENJNklETXNYSEpjYmlBZ0lDQWdJQ0FnWENKMFlYSm5aWFJjSWpvZ01UQXNYSEpjYmlBZ0lDQWdJQ0FnWENKMllXeDFaVndpT2lBeFhISmNiaUFnSUNCOUxIdGNjbHh1SUNBZ0lDQWdJQ0JjSW5OdmRYSmpaVndpT2lBMUxGeHlYRzRnSUNBZ0lDQWdJRndpZEdGeVoyVjBYQ0k2SURFeExGeHlYRzRnSUNBZ0lDQWdJRndpZG1Gc2RXVmNJam9nTVZ4eVhHNGdJQ0FnZlN4N1hISmNiaUFnSUNBZ0lDQWdYQ0p6YjNWeVkyVmNJam9nTlN4Y2NseHVJQ0FnSUNBZ0lDQmNJblJoY21kbGRGd2lPaUF4TWl4Y2NseHVJQ0FnSUNBZ0lDQmNJblpoYkhWbFhDSTZJREZjY2x4dUlDQWdJSDBzZTF4eVhHNGdJQ0FnSUNBZ0lGd2ljMjkxY21ObFhDSTZJREV5TEZ4eVhHNGdJQ0FnSUNBZ0lGd2lkR0Z5WjJWMFhDSTZJREV6TEZ4eVhHNGdJQ0FnSUNBZ0lGd2lkbUZzZFdWY0lqb2dNVnh5WEc0Z0lDQWdmU3g3WEhKY2JpQWdJQ0FnSUNBZ1hDSnpiM1Z5WTJWY0lqb2dNVElzWEhKY2JpQWdJQ0FnSUNBZ1hDSjBZWEpuWlhSY0lqb2dNVFFzWEhKY2JpQWdJQ0FnSUNBZ1hDSjJZV3gxWlZ3aU9pQXhYSEpjYmlBZ0lDQjlMSHRjY2x4dUlDQWdJQ0FnSUNCY0luTnZkWEpqWlZ3aU9pQTFMRnh5WEc0Z0lDQWdJQ0FnSUZ3aWRHRnlaMlYwWENJNklERTFMRnh5WEc0Z0lDQWdJQ0FnSUZ3aWRtRnNkV1ZjSWpvZ01WeHlYRzRnSUNBZ2ZTeDdYSEpjYmlBZ0lDQWdJQ0FnWENKemIzVnlZMlZjSWpvZ01UVXNYSEpjYmlBZ0lDQWdJQ0FnWENKMFlYSm5aWFJjSWpvZ01UWXNYSEpjYmlBZ0lDQWdJQ0FnWENKMllXeDFaVndpT2lBeFhISmNiaUFnSUNCOUxIdGNjbHh1SUNBZ0lDQWdJQ0JjSW5OdmRYSmpaVndpT2lBeE5TeGNjbHh1SUNBZ0lDQWdJQ0JjSW5SaGNtZGxkRndpT2lBeE55eGNjbHh1SUNBZ0lDQWdJQ0JjSW5aaGJIVmxYQ0k2SURGY2NseHVJQ0FnSUgwc2UxeHlYRzRnSUNBZ0lDQWdJRndpYzI5MWNtTmxYQ0k2SURFMUxGeHlYRzRnSUNBZ0lDQWdJRndpZEdGeVoyVjBYQ0k2SURFNExGeHlYRzRnSUNBZ0lDQWdJRndpZG1Gc2RXVmNJam9nTVZ4eVhHNGdJQ0FnZlN4N1hISmNiaUFnSUNBZ0lDQWdYQ0p6YjNWeVkyVmNJam9nTlN4Y2NseHVJQ0FnSUNBZ0lDQmNJblJoY21kbGRGd2lPaUF4T1N4Y2NseHVJQ0FnSUNBZ0lDQmNJblpoYkhWbFhDSTZJREZjY2x4dUlDQWdJSDBzZTF4eVhHNGdJQ0FnSUNBZ0lGd2ljMjkxY21ObFhDSTZJREU1TEZ4eVhHNGdJQ0FnSUNBZ0lGd2lkR0Z5WjJWMFhDSTZJREl3TEZ4eVhHNGdJQ0FnSUNBZ0lGd2lkbUZzZFdWY0lqb2dNVnh5WEc0Z0lDQWdmU3g3WEhKY2JpQWdJQ0FnSUNBZ1hDSnpiM1Z5WTJWY0lqb2dNVGtzWEhKY2JpQWdJQ0FnSUNBZ1hDSjBZWEpuWlhSY0lqb2dNakVzWEhKY2JpQWdJQ0FnSUNBZ1hDSjJZV3gxWlZ3aU9pQXhYSEpjYmlBZ0lDQjlMSHRjY2x4dUlDQWdJQ0FnSUNCY0luTnZkWEpqWlZ3aU9pQXhPU3hjY2x4dUlDQWdJQ0FnSUNCY0luUmhjbWRsZEZ3aU9pQXlNaXhjY2x4dUlDQWdJQ0FnSUNCY0luWmhiSFZsWENJNklERmNjbHh1SUNBZ0lIMHNlMXh5WEc0Z0lDQWdJQ0FnSUZ3aWMyOTFjbU5sWENJNklERTVMRnh5WEc0Z0lDQWdJQ0FnSUZ3aWRHRnlaMlYwWENJNklESXpMRnh5WEc0Z0lDQWdJQ0FnSUZ3aWRtRnNkV1ZjSWpvZ01WeHlYRzRnSUNBZ2ZTeDdYSEpjYmlBZ0lDQWdJQ0FnWENKemIzVnlZMlZjSWpvZ01DeGNjbHh1SUNBZ0lDQWdJQ0JjSW5SaGNtZGxkRndpT2lBeU5DeGNjbHh1SUNBZ0lDQWdJQ0JjSW5aaGJIVmxYQ0k2SURGY2NseHVJQ0FnSUgwc2UxeHlYRzRnSUNBZ0lDQWdJRndpYzI5MWNtTmxYQ0k2SURJMExGeHlYRzRnSUNBZ0lDQWdJRndpZEdGeVoyVjBYQ0k2SURJMUxGeHlYRzRnSUNBZ0lDQWdJRndpZG1Gc2RXVmNJam9nTVZ4eVhHNGdJQ0FnZlN4N1hISmNiaUFnSUNBZ0lDQWdYQ0p6YjNWeVkyVmNJam9nTWpRc1hISmNiaUFnSUNBZ0lDQWdYQ0owWVhKblpYUmNJam9nTWpZc1hISmNiaUFnSUNBZ0lDQWdYQ0oyWVd4MVpWd2lPaUF4WEhKY2JpQWdJQ0I5TEh0Y2NseHVJQ0FnSUNBZ0lDQmNJbk52ZFhKalpWd2lPaUExTEZ4eVhHNGdJQ0FnSUNBZ0lGd2lkR0Z5WjJWMFhDSTZJREkzTEZ4eVhHNGdJQ0FnSUNBZ0lGd2lkbUZzZFdWY0lqb2dNVnh5WEc0Z0lDQWdmU3g3WEhKY2JpQWdJQ0FnSUNBZ1hDSnpiM1Z5WTJWY0lqb2dNamNzWEhKY2JpQWdJQ0FnSUNBZ1hDSjBZWEpuWlhSY0lqb2dNamdzWEhKY2JpQWdJQ0FnSUNBZ1hDSjJZV3gxWlZ3aU9pQXhYSEpjYmlBZ0lDQjlYVnh5WEc1OU8xeHlYRzVjY2x4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUdsdWFYUW9LWHRjY2x4dVhISmNibHh5WEc0dkwwTnZibk4wWVc1MGN5Qm1iM0lnZEdobElGTldSMXh5WEc1MllYSWdkMmxrZEdnZ1BTQWtLRndpTG14cFoyaDBYQ0lwTG5kcFpIUm9LQ2tzWEhKY2JpQWdJQ0JvWldsbmFIUWdQU0FrS0Z3aUxteHBaMmgwWENJcExtaGxhV2RvZENncE8xeHlYRzVjY2x4dVpuVnVZM1JwYjI0Z1pISmhaM04wWVhKMFpXUW9aQ2tnZTF4eVhHNGdJQ0FnYVdZZ0tDRmtNeTVsZG1WdWRDNWhZM1JwZG1VcElHWnZjbU5sTG1Gc2NHaGhWR0Z5WjJWMEtEQXVOU2t1Y21WemRHRnlkQ2dwTzF4eVhHNGdJQ0FnWkM1bWVDQTlJR1F1ZUR0Y2NseHVJQ0FnSUdRdVpua2dQU0JrTG5rN1hISmNibjFjY2x4dVhISmNibVoxYm1OMGFXOXVJR1J5WVdkblpXUW9aQ2tnZTF4eVhHNGdJQ0FnWkM1bWVDQTlJR1F6TG1WMlpXNTBMbmc3WEhKY2JpQWdJQ0JrTG1aNUlEMGdaRE11WlhabGJuUXVlVHRjY2x4dWZWeHlYRzVjY2x4dVpuVnVZM1JwYjI0Z1pISmhaMlZ1WkdWa0tHUXBJSHRjY2x4dUlDQWdJR2xtSUNnaFpETXVaWFpsYm5RdVlXTjBhWFpsS1NCbWIzSmpaUzVoYkhCb1lWUmhjbWRsZENnd0xqVXBPMXh5WEc0Z0lDQWdaQzVtZUNBOUlHNTFiR3c3WEhKY2JpQWdJQ0JrTG1aNUlEMGdiblZzYkR0Y2NseHVmVnh5WEc1Y2NseHVMeTlUWlhRZ2RYQWdkR2hsSUdOdmJHOTFjaUJ6WTJGc1pWeHlYRzUyWVhJZ1kyOXNiM0lnUFNCa015NXpZMkZzWlU5eVpHbHVZV3dvWkRNdWMyTm9aVzFsUTJGMFpXZHZjbmt5TUNrN1hISmNibHh5WEc0dkwxTmxkQ0IxY0NCMGFHVWdabTl5WTJVZ2JHRjViM1YwWEhKY2JuWmhjaUJtYjNKalpTQTlJR1F6TG1admNtTmxVMmx0ZFd4aGRHbHZiaWdwWEhKY2JpQWdJQ0F1Wm05eVkyVW9YQ0pqYUdGeVoyVmNJaXdnWkRNdVptOXlZMlZOWVc1NVFtOWtlU2dwTG5OMGNtVnVaM1JvS0MwM01EQXBMbVJwYzNSaGJtTmxUV2x1S0RFd01Da3VaR2x6ZEdGdVkyVk5ZWGdvTVRBd01Da3BYSEpjYmlBZ0lDQXVabTl5WTJVb1hDSnNhVzVyWENJc0lHUXpMbVp2Y21ObFRHbHVheWdwTG1sa0tHWjFibU4wYVc5dUlDaGtLU0I3SUhKbGRIVnliaUJrTG1sdVpHVjRJSDBwS1Z4eVhHNGdJQ0FnTG1admNtTmxLRndpWTJWdWRHVnlYQ0lzSUdRekxtWnZjbU5sUTJWdWRHVnlLSGRwWkhSb0lDOGdNaXdnYUdWcFoyaDBJQzhnTWlrcFhISmNiaUFnSUNBdVptOXlZMlVvWENKNVhDSXNJR1F6TG1admNtTmxXU2d3TGpBd01Ta3BYSEpjYmlBZ0lDQXVabTl5WTJVb1hDSjRYQ0lzSUdRekxtWnZjbU5sV0Nnd0xqQXdNU2twWEhKY2JseHlYRzR2TDBGd2NHVnVaQ0JoSUZOV1J5QjBieUIwYUdVZ1ltOWtlU0J2WmlCMGFHVWdhSFJ0YkNCd1lXZGxMaUJCYzNOcFoyNGdkR2hwY3lCVFZrY2dZWE1nWVc0Z2IySnFaV04wSUhSdklITjJaMXh5WEc1MllYSWdjM1puSUQwZ1pETXVjMlZzWldOMEtGd2lMbXhwWjJoMFhDSXBMbUZ3Y0dWdVpDaGNJbk4yWjF3aUtWeHlYRzRnSUNBZ0xtRjBkSElvWENKM2FXUjBhRndpTENCM2FXUjBhQ2xjY2x4dUlDQWdJQzVoZEhSeUtGd2lhR1ZwWjJoMFhDSXNJR2hsYVdkb2RDazdYSEpjYmx4eVhHNW1iM0pqWlZ4eVhHNGdJQ0FnTG01dlpHVnpLR1JoZEdFdWJtOWtaWE1wWEhKY2JpQWdJQ0F1Wm05eVkyVW9YQ0pzYVc1clhDSXBMbXhwYm10ektHUmhkR0V1YkdsdWEzTXBYSEpjYmx4eVhHNTJZWElnYkdsdWF5QTlJSE4yWnk1elpXeGxZM1JCYkd3b1hDSXViR2x1YTF3aUtWeHlYRzRnSUNBZ0xtUmhkR0VvWkdGMFlTNXNhVzVyY3lsY2NseHVJQ0FnSUM1bGJuUmxjaWdwWEhKY2JpQWdJQ0F1WVhCd1pXNWtLRndpYkdsdVpWd2lLVnh5WEc0Z0lDQWdMbUYwZEhJb1hDSmpiR0Z6YzF3aUxDQmNJbXhwYm10Y0lpbGNjbHh1SUNBZ0lDNWhkSFJ5S0NkdFlYSnJaWEl0Wlc1a0p5d2dKM1Z5YkNnallYSnliM2RvWldGa0tTY3BYSEpjYmx4eVhHNTJZWElnYm05a1pTQTlJSE4yWnk1elpXeGxZM1JCYkd3b1hDSXVibTlrWlZ3aUtWeHlYRzRnSUNBZ0xtUmhkR0VvWkdGMFlTNXViMlJsY3lsY2NseHVJQ0FnSUM1bGJuUmxjaWdwTG1Gd2NHVnVaQ2hjSW1kY0lpbGNjbHh1SUNBZ0lDNWhkSFJ5S0Z3aVkyeGhjM05jSWl3Z1hDSnViMlJsWENJcFhISmNiaUFnSUNBdVkyRnNiQ2hrTXk1a2NtRm5LQ2xjY2x4dUlDQWdJQ0FnSUNBdWIyNG9YQ0p6ZEdGeWRGd2lMQ0JrY21GbmMzUmhjblJsWkNsY2NseHVJQ0FnSUNBZ0lDQXViMjRvWENKa2NtRm5YQ0lzSUdSeVlXZG5aV1FwWEhKY2JpQWdJQ0FnSUNBZ0xtOXVLRndpWlc1a1hDSXNJR1J5WVdkbGJtUmxaQ2twTzF4eVhHNWNjbHh1Ym05a1pTNWhjSEJsYm1Rb0oyTnBjbU5zWlNjcFhISmNiaUFnSUNBdVlYUjBjaWduY2ljc0lERXpLVnh5WEc0Z0lDQWdMbUYwZEhJb0oyWnBiR3duTENCbWRXNWpkR2x2YmlBb1pDa2dlMXh5WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJqYjJ4dmNpaGtMbWR5YjNWd0tUdGNjbHh1SUNBZ0lIMHBPMXh5WEc1Y2NseHVibTlrWlM1aGNIQmxibVFvWENKMFpYaDBYQ0lwWEhKY2JpQWdJQ0FnSUM1aGRIUnlLRndpWkhoY0lpd2dNVFFwWEhKY2JpQWdJQ0FnSUM1aGRIUnlLRndpWkhsY0lpd2dYQ0l1TXpWbGJWd2lLVnh5WEc0Z0lDQWdJQ0F1ZEdWNGRDaG1kVzVqZEdsdmJpaGtLU0I3SUhKbGRIVnliaUJrTG01aGJXVWdmU2xjY2x4dUlDQWdJQ0FnTG5OMGVXeGxLRndpYzNSeWIydGxYQ0lzSUZ3aVlteGhZMnRjSWlrN1hISmNibHh5WEc1MllYSWdjR0ZrWkdsdVp5QTlJREVzSUM4dklITmxjR0Z5WVhScGIyNGdZbVYwZDJWbGJpQmphWEpqYkdWelhISmNiaUFnSUNCeVlXUnBkWE05T0R0Y2NseHVablZ1WTNScGIyNGdZMjlzYkdsa1pTaGhiSEJvWVNrZ2UxeHlYRzRnSUhaaGNpQnhkV0ZrZEhKbFpTQTlJR1F6TG5GMVlXUjBjbVZsS0dSaGRHRXVibTlrWlhNcE8xeHlYRzRnSUhKbGRIVnliaUJtZFc1amRHbHZiaWhrS1NCN1hISmNiaUFnSUNCMllYSWdjbUlnUFNBeUtuSmhaR2wxY3lBcklIQmhaR1JwYm1jc1hISmNiaUFnSUNBZ0lDQWdibmd4SUQwZ1pDNTRJQzBnY21Jc1hISmNiaUFnSUNBZ0lDQWdibmd5SUQwZ1pDNTRJQ3NnY21Jc1hISmNiaUFnSUNBZ0lDQWdibmt4SUQwZ1pDNTVJQzBnY21Jc1hISmNiaUFnSUNBZ0lDQWdibmt5SUQwZ1pDNTVJQ3NnY21JN1hISmNiaUFnSUNCeGRXRmtkSEpsWlM1MmFYTnBkQ2htZFc1amRHbHZiaWh4ZFdGa0xDQjRNU3dnZVRFc0lIZ3lMQ0I1TWlrZ2UxeHlYRzRnSUNBZ0lDQnBaaUFvY1hWaFpDNXdiMmx1ZENBbUppQW9jWFZoWkM1d2IybHVkQ0FoUFQwZ1pDa3BJSHRjY2x4dUlDQWdJQ0FnSUNCMllYSWdlQ0E5SUdRdWVDQXRJSEYxWVdRdWNHOXBiblF1ZUN4Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZVNBOUlHUXVlU0F0SUhGMVlXUXVjRzlwYm5RdWVTeGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2JDQTlJRTFoZEdndWMzRnlkQ2g0SUNvZ2VDQXJJSGtnS2lCNUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUdsbUlDaHNJRHdnY21JcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUd3Z1BTQW9iQ0F0SUhKaUtTQXZJR3dnS2lCaGJIQm9ZVHRjY2x4dUlDQWdJQ0FnSUNBZ0lHUXVlQ0F0UFNCNElDbzlJR3c3WEhKY2JpQWdJQ0FnSUNBZ0lDQmtMbmtnTFQwZ2VTQXFQU0JzTzF4eVhHNGdJQ0FnSUNBZ0lDQWdjWFZoWkM1d2IybHVkQzU0SUNzOUlIZzdYSEpjYmlBZ0lDQWdJQ0FnSUNCeGRXRmtMbkJ2YVc1MExua2dLejBnZVR0Y2NseHVJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnY21WMGRYSnVJSGd4SUQ0Z2JuZ3lJSHg4SUhneUlEd2dibmd4SUh4OElIa3hJRDRnYm5reUlIeDhJSGt5SUR3Z2Jua3hPMXh5WEc0Z0lDQWdmU2s3WEhKY2JpQWdmVHRjY2x4dWZWeHlYRzVjY2x4dVptOXlZMlV1YjI0b1hDSjBhV05yWENJc0lHWjFibU4wYVc5dUlDZ3BJSHRjY2x4dUlDQWdJR3hwYm1zdVlYUjBjaWhjSW5neFhDSXNJR1oxYm1OMGFXOXVJQ2hrS1NCN1hISmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHUXVjMjkxY21ObExuZzdYSEpjYmlBZ0lDQjlLVnh5WEc0Z0lDQWdJQ0FnSUM1aGRIUnlLRndpZVRGY0lpd2dablZ1WTNScGIyNGdLR1FwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR1F1YzI5MWNtTmxMbms3WEhKY2JpQWdJQ0FnSUNBZ2ZTbGNjbHh1SUNBZ0lDQWdJQ0F1WVhSMGNpaGNJbmd5WENJc0lHWjFibU4wYVc5dUlDaGtLU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmtMblJoY21kbGRDNTRPMXh5WEc0Z0lDQWdJQ0FnSUgwcFhISmNiaUFnSUNBZ0lDQWdMbUYwZEhJb1hDSjVNbHdpTENCbWRXNWpkR2x2YmlBb1pDa2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1pDNTBZWEpuWlhRdWVUdGNjbHh1SUNBZ0lDQWdJQ0I5S1R0Y2NseHVJQ0J1YjJSbExtVmhZMmdvWTI5c2JHbGtaU2d3TGpVcEtUc2dMeTlCWkdSbFpGeHlYRzVjY2x4dUlDQWdJRzV2WkdVdVlYUjBjaWhjSW5SeVlXNXpabTl5YlZ3aUxDQm1kVzVqZEdsdmJpQW9aQ2tnZTF4eVhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCY0luUnlZVzV6YkdGMFpTaGNJaUFySUdRdWVDQXJJRndpTEZ3aUlDc2daQzU1SUNzZ1hDSXBYQ0k3WEhKY2JpQWdJQ0I5S1R0Y2NseHVmU2s3WEhKY2JseHlYRzU5WEhKY2JpSXNJbTF2WkhWc1pTNWxlSEJ2Y25SelBYdGNjbHh1SUNCY0ltNWhkbHdpT2lCN1hISmNiaUFnSUNCY0ltaHZiV1ZjSWpvZ1hDSlRkR0Z5ZEZ3aUxGeHlYRzRnSUNBZ1hDSndjbTlxWldOMGMxd2lPaUJjSWxCeWIycGxhM1JsWENJc1hISmNiaUFnSUNCY0ltRmliM1YwVFdWY0lqb2dYQ0xEbkdKbGNpQnRhV05vWENJc1hISmNiaUFnSUNCY0ltTnZiblJoWTNSY0lqb2dYQ0pMYjI1MFlXdDBYQ0pjY2x4dUlDQjlMRnh5WEc0Z0lGd2lZMjl1ZEdGamRGd2lPbnRjY2x4dUlDQWdJRndpZEdoaGJtdHpYQ0k2SUZ3aVJHRnVhMlVnWnNPOGNuTWdkbTl5WW1WcGMyTm9ZWFZsYmlGY0lpeGNjbHh1SUNBZ0lGd2lkR1Y0ZEZ3aU9pQmNJa2xqYUNCaWFXNGdhVzF0WlhJZ2IyWm1aVzRnWnNPOGNpQmxhVzVsYmlCcmJHVnBibVZ1SUZCc1lYVnpZMmdzSUdGc2MyOGdhMjl1ZEdGcmRHbGxjbVVnYldsamFDQnlkV2hwWnk1Y0lpeGNjbHh1SUNBZ0lGd2ljMkY1U0dsY0lqb2dYQ0pUWVdjZ1RXOXBibHdpWEhKY2JpQWdmVnh5WEc1OVhISmNiaUlzSW0xdlpIVnNaUzVsZUhCdmNuUnpQWHRjY2x4dUlDQmNJbTVoZGx3aU9pQjdYSEpjYmlBZ0lDQmNJbWh2YldWY0lqb2dYQ0pJYjIxbFhDSXNYSEpjYmlBZ0lDQmNJbkJ5YjJwbFkzUnpYQ0k2SUZ3aVVISnZhbVZqZEhOY0lpeGNjbHh1SUNBZ0lGd2lZV0p2ZFhSTlpWd2lPaUJjSWtGaWIzVjBJRTFsWENJc1hISmNiaUFnSUNCY0ltTnZiblJoWTNSY0lqb2dYQ0pEYjI1MFlXTjBYQ0pjY2x4dUlDQjlMRnh5WEc0Z0lGd2lZMjl1ZEdGamRGd2lPbnRjY2x4dUlDQWdJRndpZEdoaGJtdHpYQ0k2SUZ3aVZHaGhibXR6SUdadmNpQmpiMjFwYm1jZ1lua2hYQ0lzWEhKY2JpQWdJQ0JjSW5SbGVIUmNJam9nWENKSjRvQ1piU0JoYkhkaGVYTWdiM0JsYmlCbWIzSWdZU0JqYUdGMElITnZJR1psWld3Z1puSmxaU0IwYnlCamIyNTBZV04wSUcxbExsd2lMRnh5WEc0Z0lDQWdYQ0p6WVhsSWFWd2lPaUJjSWxOaGVTQm9hVndpWEhKY2JpQWdmVnh5WEc1OVhISmNiaUpkZlE9PSJ9
