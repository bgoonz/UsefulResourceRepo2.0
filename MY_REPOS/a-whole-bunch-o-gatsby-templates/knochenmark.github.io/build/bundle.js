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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var i18n = require('i18n');
// var jqueryI18next = require('jquery-i18next');

// ;(function( window, document, $, undefined ) {

'use strict';

var english = require(".././locales/en/translation.json");
var german = require(".././locales/de/translation.json");

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
  $(window).scroll(fadeInScrollTopButton);
  $("#loader").removeClass("active");
});

// })( window, document, jQuery );

},{".././locales/de/translation.json":19,".././locales/en/translation.json":20,"i18next":15,"jquery-i18next":17}],19:[function(require,module,exports){
module.exports={
  "nav": {
    "home": "Home333",
    "projects": "Projects333",
    "aboutMe": "About Me333",
    "contact": "Contact333"
  }
}

},{}],20:[function(require,module,exports){
module.exports={
    "nav": {
      "home": "Home222",
      "projects": "Projects222",
      "aboutMe": "About Me222",
      "contact": "Contact222"
    }
  }
},{}]},{},[18])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL0JhY2tlbmRDb25uZWN0b3IuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL0NhY2hlQ29ubmVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2kxOG5leHQvZGlzdC9jb21tb25qcy9FdmVudEVtaXR0ZXIuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL0ludGVycG9sYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9pMThuZXh0L2Rpc3QvY29tbW9uanMvTGFuZ3VhZ2VVdGlscy5qcyIsIm5vZGVfbW9kdWxlcy9pMThuZXh0L2Rpc3QvY29tbW9uanMvUGx1cmFsUmVzb2x2ZXIuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL1Jlc291cmNlU3RvcmUuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL1RyYW5zbGF0b3IuanMiLCJub2RlX21vZHVsZXMvaTE4bmV4dC9kaXN0L2NvbW1vbmpzL2RlZmF1bHRzLmpzIiwibm9kZV9tb2R1bGVzL2kxOG5leHQvZGlzdC9jb21tb25qcy9pMThuZXh0LmpzIiwibm9kZV9tb2R1bGVzL2kxOG5leHQvZGlzdC9jb21tb25qcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9pMThuZXh0L2Rpc3QvY29tbW9uanMvbG9nZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2kxOG5leHQvZGlzdC9jb21tb25qcy9wb3N0UHJvY2Vzc29yLmpzIiwibm9kZV9tb2R1bGVzL2kxOG5leHQvZGlzdC9jb21tb25qcy91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9pMThuZXh0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2pxdWVyeS1pMThuZXh0L2Rpc3QvY29tbW9uanMvaW5kZXguanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9sb2NhbGVzL2RlL3RyYW5zbGF0aW9uLmpzb24iLCJzcmMvbG9jYWxlcy9lbi90cmFuc2xhdGlvbi5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEhBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3pIQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBOztBQU5BOztBQVFBOztBQUVBLElBQUksVUFBVSxRQUFRLGtDQUFSLENBQWQ7QUFDQSxJQUFJLFNBQVMsUUFBUSxrQ0FBUixDQUFiOztBQUVBLElBQUksWUFBWTtBQUNkLE1BQUksT0FEVTtBQUVkLE1BQUk7QUFGVSxDQUFoQjs7QUFLQSxTQUFTLG1CQUFULEdBQThCO0FBQzVCO0FBQ0EsSUFBRSxjQUFGO0FBQ0U7QUFERixHQUVHLEdBRkgsQ0FFTyxZQUZQLEVBR0csR0FISCxDQUdPLGFBSFAsRUFJRyxLQUpILENBSVMsVUFBUyxLQUFULEVBQWdCO0FBQ3JCO0FBQ0EsUUFDRSxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsQ0FBMEIsS0FBMUIsRUFBaUMsRUFBakMsS0FBd0MsS0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQixLQUF0QixFQUE2QixFQUE3QixDQUF4QyxJQUNBLFNBQVMsUUFBVCxJQUFxQixLQUFLLFFBRjVCLEVBR0U7QUFDQTtBQUNBLFVBQUksU0FBUyxFQUFFLEtBQUssSUFBUCxDQUFiO0FBQ0EsZUFBUyxPQUFPLE1BQVAsR0FBZ0IsTUFBaEIsR0FBeUIsRUFBRSxXQUFXLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsQ0FBaEIsQ0FBWCxHQUFnQyxHQUFsQyxDQUFsQztBQUNBO0FBQ0EsVUFBSSxPQUFPLE1BQVgsRUFBbUI7QUFDakI7QUFDQSxjQUFNLGNBQU47QUFDQSxVQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIscUJBQVcsT0FBTyxNQUFQLEdBQWdCO0FBREwsU0FBeEIsRUFFRyxJQUZILEVBRVMsWUFBVztBQUNsQjtBQUNBO0FBQ0EsY0FBSSxVQUFVLEVBQUUsTUFBRixDQUFkO0FBQ0Esa0JBQVEsS0FBUjtBQUNBLGNBQUksUUFBUSxFQUFSLENBQVcsUUFBWCxDQUFKLEVBQTBCO0FBQUU7QUFDMUIsbUJBQU8sS0FBUDtBQUNELFdBRkQsTUFFTztBQUNMLG9CQUFRLElBQVIsQ0FBYSxVQUFiLEVBQXdCLElBQXhCLEVBREssQ0FDMEI7QUFDL0Isb0JBQVEsS0FBUixHQUZLLENBRVk7QUFDbEI7QUFDRixTQWJEO0FBY0Q7QUFDRjtBQUNGLEdBakNIO0FBa0NEOztBQUVELFNBQVMscUJBQVQsR0FBZ0M7QUFDOUIsTUFBSSxFQUFFLE1BQUYsRUFBVSxTQUFWLEtBQXdCLEdBQTVCLEVBQWlDO0FBQy9CLE1BQUUsY0FBRixFQUFrQixNQUFsQixDQUF5QixHQUF6QjtBQUNELEdBRkQsTUFFTztBQUNMLE1BQUUsY0FBRixFQUFrQixPQUFsQixDQUEwQixHQUExQjtBQUNEO0FBQ0Y7O0FBRUQsSUFBSSxpQkFBaUI7QUFDbkIsYUFBVyxJQURRO0FBRW5CLGFBQVc7QUFGUSxDQUFyQjs7QUFLQSxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsRUFBOEI7QUFDNUIsTUFBSSxTQUFTLEVBQUUsTUFBTSxNQUFSLENBQWI7QUFDQTtBQUNBO0FBQ0EsSUFBRSxzQkFBRixFQUEwQixXQUExQixDQUFzQyxRQUF0QztBQUNBLFNBQU8sUUFBUCxDQUFnQixRQUFoQjtBQUNBLG9CQUFRLGNBQVIsQ0FBdUIsZUFBZSxPQUFPLElBQVAsRUFBZixDQUF2QjtBQUNBLElBQUUsYUFBRixFQUFpQixRQUFqQjtBQUNEOztBQUVELFNBQVMsd0JBQVQsR0FBbUM7QUFDakMsSUFBRSxzQkFBRixFQUEwQixLQUExQixDQUFnQyxjQUFoQztBQUNEOztBQUVELFNBQVMsaUJBQVQsR0FBNEI7QUFDMUIsb0JBQVEsSUFBUixDQUFhO0FBQ1gsU0FBSyxJQURNO0FBRVgsV0FBTyxJQUZJO0FBR1gsZUFBVztBQUhBLEdBQWIsRUFJRyxVQUFTLEdBQVQsRUFBYyxDQUFkLEVBQWlCO0FBQ2xCO0FBQ0QsR0FORDs7QUFRQSwwQkFBYyxJQUFkLG9CQUE0QixDQUE1QixFQUErQjtBQUM3QixXQUFPLEdBRHNCLEVBQ2pCO0FBQ1osY0FBVSxNQUZtQixFQUVYO0FBQ2xCLGdCQUFZLFVBSGlCLEVBR0w7QUFDeEIsa0JBQWMsV0FKZSxFQUlGO0FBQzNCLGdCQUFZLGFBTGlCLEVBS0Y7QUFDM0IsaUJBQWEsY0FOZ0IsRUFNQTtBQUM3QixvQkFBZ0IsS0FQYSxFQU9OO0FBQ3ZCLGtDQUE4QixJQVJELENBUU07QUFSTixHQUEvQjtBQVVEOztBQUVEO0FBQ0EsRUFBRSxZQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsSUFBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixxQkFBakI7QUFDQSxJQUFFLFNBQUYsRUFBYSxXQUFiLENBQXlCLFFBQXpCO0FBQ0QsQ0FORDs7QUFRQTs7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuXG52YXIgdXRpbHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHMpO1xuXG52YXIgX2xvZ2dlciA9IHJlcXVpcmUoJy4vbG9nZ2VyLmpzJyk7XG5cbnZhciBfbG9nZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xvZ2dlcik7XG5cbnZhciBfRXZlbnRFbWl0dGVyMiA9IHJlcXVpcmUoJy4vRXZlbnRFbWl0dGVyLmpzJyk7XG5cbnZhciBfRXZlbnRFbWl0dGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0V2ZW50RW1pdHRlcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfZGVmYXVsdHMob2JqLCBkZWZhdWx0cykgeyB2YXIga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRlZmF1bHRzKTsgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7IHZhciBrZXkgPSBrZXlzW2ldOyB2YXIgdmFsdWUgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGRlZmF1bHRzLCBrZXkpOyBpZiAodmFsdWUgJiYgdmFsdWUuY29uZmlndXJhYmxlICYmIG9ialtrZXldID09PSB1bmRlZmluZWQpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSk7IH0gfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IF9kZWZhdWx0cyhzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gcmVtb3ZlKGFyciwgd2hhdCkge1xuICB2YXIgZm91bmQgPSBhcnIuaW5kZXhPZih3aGF0KTtcblxuICB3aGlsZSAoZm91bmQgIT09IC0xKSB7XG4gICAgYXJyLnNwbGljZShmb3VuZCwgMSk7XG4gICAgZm91bmQgPSBhcnIuaW5kZXhPZih3aGF0KTtcbiAgfVxufVxuXG52YXIgQ29ubmVjdG9yID0gZnVuY3Rpb24gKF9FdmVudEVtaXR0ZXIpIHtcbiAgX2luaGVyaXRzKENvbm5lY3RvciwgX0V2ZW50RW1pdHRlcik7XG5cbiAgZnVuY3Rpb24gQ29ubmVjdG9yKGJhY2tlbmQsIHN0b3JlLCBzZXJ2aWNlcykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb25uZWN0b3IpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0V2ZW50RW1pdHRlci5jYWxsKHRoaXMpKTtcblxuICAgIF90aGlzLmJhY2tlbmQgPSBiYWNrZW5kO1xuICAgIF90aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgX3RoaXMubGFuZ3VhZ2VVdGlscyA9IHNlcnZpY2VzLmxhbmd1YWdlVXRpbHM7XG4gICAgX3RoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgX3RoaXMubG9nZ2VyID0gX2xvZ2dlcjIuZGVmYXVsdC5jcmVhdGUoJ2JhY2tlbmRDb25uZWN0b3InKTtcblxuICAgIF90aGlzLnN0YXRlID0ge307XG4gICAgX3RoaXMucXVldWUgPSBbXTtcblxuICAgIGlmIChfdGhpcy5iYWNrZW5kICYmIF90aGlzLmJhY2tlbmQuaW5pdCkge1xuICAgICAgX3RoaXMuYmFja2VuZC5pbml0KHNlcnZpY2VzLCBvcHRpb25zLmJhY2tlbmQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBDb25uZWN0b3IucHJvdG90eXBlLnF1ZXVlTG9hZCA9IGZ1bmN0aW9uIHF1ZXVlTG9hZChsYW5ndWFnZXMsIG5hbWVzcGFjZXMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAvLyBmaW5kIHdoYXQgbmVlZHMgdG8gYmUgbG9hZGVkXG4gICAgdmFyIHRvTG9hZCA9IFtdO1xuICAgIHZhciBwZW5kaW5nID0gW107XG4gICAgdmFyIHRvTG9hZExhbmd1YWdlcyA9IFtdO1xuICAgIHZhciB0b0xvYWROYW1lc3BhY2VzID0gW107XG5cbiAgICBsYW5ndWFnZXMuZm9yRWFjaChmdW5jdGlvbiAobG5nKSB7XG4gICAgICB2YXIgaGFzQWxsTmFtZXNwYWNlcyA9IHRydWU7XG5cbiAgICAgIG5hbWVzcGFjZXMuZm9yRWFjaChmdW5jdGlvbiAobnMpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBsbmcgKyAnfCcgKyBucztcblxuICAgICAgICBpZiAoX3RoaXMyLnN0b3JlLmhhc1Jlc291cmNlQnVuZGxlKGxuZywgbnMpKSB7XG4gICAgICAgICAgX3RoaXMyLnN0YXRlW25hbWVdID0gMjsgLy8gbG9hZGVkXG4gICAgICAgIH0gZWxzZSBpZiAoX3RoaXMyLnN0YXRlW25hbWVdIDwgMCkge1xuICAgICAgICAgIC8vIG5vdGhpbmcgdG8gZG8gZm9yIGVyclxuICAgICAgICB9IGVsc2UgaWYgKF90aGlzMi5zdGF0ZVtuYW1lXSA9PT0gMSkge1xuICAgICAgICAgIGlmIChwZW5kaW5nLmluZGV4T2YobmFtZSkgPCAwKSBwZW5kaW5nLnB1c2gobmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMyLnN0YXRlW25hbWVdID0gMTsgLy8gcGVuZGluZ1xuXG4gICAgICAgICAgaGFzQWxsTmFtZXNwYWNlcyA9IGZhbHNlO1xuXG4gICAgICAgICAgaWYgKHBlbmRpbmcuaW5kZXhPZihuYW1lKSA8IDApIHBlbmRpbmcucHVzaChuYW1lKTtcbiAgICAgICAgICBpZiAodG9Mb2FkLmluZGV4T2YobmFtZSkgPCAwKSB0b0xvYWQucHVzaChuYW1lKTtcbiAgICAgICAgICBpZiAodG9Mb2FkTmFtZXNwYWNlcy5pbmRleE9mKG5zKSA8IDApIHRvTG9hZE5hbWVzcGFjZXMucHVzaChucyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWhhc0FsbE5hbWVzcGFjZXMpIHRvTG9hZExhbmd1YWdlcy5wdXNoKGxuZyk7XG4gICAgfSk7XG5cbiAgICBpZiAodG9Mb2FkLmxlbmd0aCB8fCBwZW5kaW5nLmxlbmd0aCkge1xuICAgICAgdGhpcy5xdWV1ZS5wdXNoKHtcbiAgICAgICAgcGVuZGluZzogcGVuZGluZyxcbiAgICAgICAgbG9hZGVkOiB7fSxcbiAgICAgICAgZXJyb3JzOiBbXSxcbiAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9Mb2FkOiB0b0xvYWQsXG4gICAgICBwZW5kaW5nOiBwZW5kaW5nLFxuICAgICAgdG9Mb2FkTGFuZ3VhZ2VzOiB0b0xvYWRMYW5ndWFnZXMsXG4gICAgICB0b0xvYWROYW1lc3BhY2VzOiB0b0xvYWROYW1lc3BhY2VzXG4gICAgfTtcbiAgfTtcblxuICBDb25uZWN0b3IucHJvdG90eXBlLmxvYWRlZCA9IGZ1bmN0aW9uIGxvYWRlZChuYW1lLCBlcnIsIGRhdGEpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHZhciBfbmFtZSRzcGxpdCA9IG5hbWUuc3BsaXQoJ3wnKSxcbiAgICAgICAgX25hbWUkc3BsaXQyID0gX3NsaWNlZFRvQXJyYXkoX25hbWUkc3BsaXQsIDIpLFxuICAgICAgICBsbmcgPSBfbmFtZSRzcGxpdDJbMF0sXG4gICAgICAgIG5zID0gX25hbWUkc3BsaXQyWzFdO1xuXG4gICAgaWYgKGVycikgdGhpcy5lbWl0KCdmYWlsZWRMb2FkaW5nJywgbG5nLCBucywgZXJyKTtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLnN0b3JlLmFkZFJlc291cmNlQnVuZGxlKGxuZywgbnMsIGRhdGEpO1xuICAgIH1cblxuICAgIC8vIHNldCBsb2FkZWRcbiAgICB0aGlzLnN0YXRlW25hbWVdID0gZXJyID8gLTEgOiAyO1xuXG4gICAgLy8gY2FsbGJhY2sgaWYgcmVhZHlcbiAgICB0aGlzLnF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKHEpIHtcbiAgICAgIHV0aWxzLnB1c2hQYXRoKHEubG9hZGVkLCBbbG5nXSwgbnMpO1xuICAgICAgcmVtb3ZlKHEucGVuZGluZywgbmFtZSk7XG5cbiAgICAgIGlmIChlcnIpIHEuZXJyb3JzLnB1c2goZXJyKTtcblxuICAgICAgaWYgKHEucGVuZGluZy5sZW5ndGggPT09IDAgJiYgIXEuZG9uZSkge1xuICAgICAgICBfdGhpczMuZW1pdCgnbG9hZGVkJywgcS5sb2FkZWQpO1xuICAgICAgICAvKiBlc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246IDAgKi9cbiAgICAgICAgcS5kb25lID0gdHJ1ZTtcbiAgICAgICAgaWYgKHEuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgIHEuY2FsbGJhY2socS5lcnJvcnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHEuY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIGRvbmUgbG9hZCByZXF1ZXN0c1xuICAgIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLmZpbHRlcihmdW5jdGlvbiAocSkge1xuICAgICAgcmV0dXJuICFxLmRvbmU7XG4gICAgfSk7XG4gIH07XG5cbiAgQ29ubmVjdG9yLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gcmVhZChsbmcsIG5zLCBmY05hbWUpIHtcbiAgICB2YXIgdHJpZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IDA7XG5cbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHZhciB3YWl0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiAyNTA7XG4gICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzVdO1xuXG4gICAgaWYgKCFsbmcubGVuZ3RoKSByZXR1cm4gY2FsbGJhY2sobnVsbCwge30pOyAvLyBub3RpbmcgdG8gbG9hZFxuXG4gICAgcmV0dXJuIHRoaXMuYmFja2VuZFtmY05hbWVdKGxuZywgbnMsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgIGlmIChlcnIgJiYgZGF0YSAvKiA9IHJldHJ5RmxhZyAqLyAmJiB0cmllZCA8IDUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXM0LnJlYWQuY2FsbChfdGhpczQsIGxuZywgbnMsIGZjTmFtZSwgdHJpZWQgKyAxLCB3YWl0ICogMiwgY2FsbGJhY2spO1xuICAgICAgICB9LCB3YWl0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2soZXJyLCBkYXRhKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKiBlc2xpbnQgY29uc2lzdGVudC1yZXR1cm46IDAgKi9cblxuXG4gIENvbm5lY3Rvci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uIGxvYWQobGFuZ3VhZ2VzLCBuYW1lc3BhY2VzLCBjYWxsYmFjaykge1xuICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgaWYgKCF0aGlzLmJhY2tlbmQpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ05vIGJhY2tlbmQgd2FzIGFkZGVkIHZpYSBpMThuZXh0LnVzZS4gV2lsbCBub3QgbG9hZCByZXNvdXJjZXMuJyk7XG4gICAgICByZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgdmFyIG9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgdGhpcy5iYWNrZW5kLm9wdGlvbnMsIHRoaXMub3B0aW9ucy5iYWNrZW5kKTtcblxuICAgIGlmICh0eXBlb2YgbGFuZ3VhZ2VzID09PSAnc3RyaW5nJykgbGFuZ3VhZ2VzID0gdGhpcy5sYW5ndWFnZVV0aWxzLnRvUmVzb2x2ZUhpZXJhcmNoeShsYW5ndWFnZXMpO1xuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycpIG5hbWVzcGFjZXMgPSBbbmFtZXNwYWNlc107XG5cbiAgICB2YXIgdG9Mb2FkID0gdGhpcy5xdWV1ZUxvYWQobGFuZ3VhZ2VzLCBuYW1lc3BhY2VzLCBjYWxsYmFjayk7XG4gICAgaWYgKCF0b0xvYWQudG9Mb2FkLmxlbmd0aCkge1xuICAgICAgaWYgKCF0b0xvYWQucGVuZGluZy5sZW5ndGgpIGNhbGxiYWNrKCk7IC8vIG5vdGhpbmcgdG8gbG9hZCBhbmQgbm8gcGVuZGluZ3MuLi5jYWxsYmFjayBub3dcbiAgICAgIHJldHVybiBudWxsOyAvLyBwZW5kaW5ncyB3aWxsIHRyaWdnZXIgY2FsbGJhY2tcbiAgICB9XG5cbiAgICAvLyBsb2FkIHdpdGggbXVsdGktbG9hZFxuICAgIGlmIChvcHRpb25zLmFsbG93TXVsdGlMb2FkaW5nICYmIHRoaXMuYmFja2VuZC5yZWFkTXVsdGkpIHtcbiAgICAgIHRoaXMucmVhZCh0b0xvYWQudG9Mb2FkTGFuZ3VhZ2VzLCB0b0xvYWQudG9Mb2FkTmFtZXNwYWNlcywgJ3JlYWRNdWx0aScsIG51bGwsIG51bGwsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikgX3RoaXM1LmxvZ2dlci53YXJuKCdsb2FkaW5nIG5hbWVzcGFjZXMgJyArIHRvTG9hZC50b0xvYWROYW1lc3BhY2VzLmpvaW4oJywgJykgKyAnIGZvciBsYW5ndWFnZXMgJyArIHRvTG9hZC50b0xvYWRMYW5ndWFnZXMuam9pbignLCAnKSArICcgdmlhIG11bHRpbG9hZGluZyBmYWlsZWQnLCBlcnIpO1xuICAgICAgICBpZiAoIWVyciAmJiBkYXRhKSBfdGhpczUubG9nZ2VyLmxvZygnc3VjY2Vzc2Z1bGx5IGxvYWRlZCBuYW1lc3BhY2VzICcgKyB0b0xvYWQudG9Mb2FkTmFtZXNwYWNlcy5qb2luKCcsICcpICsgJyBmb3IgbGFuZ3VhZ2VzICcgKyB0b0xvYWQudG9Mb2FkTGFuZ3VhZ2VzLmpvaW4oJywgJykgKyAnIHZpYSBtdWx0aWxvYWRpbmcnLCBkYXRhKTtcblxuICAgICAgICB0b0xvYWQudG9Mb2FkLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICB2YXIgX25hbWUkc3BsaXQzID0gbmFtZS5zcGxpdCgnfCcpLFxuICAgICAgICAgICAgICBfbmFtZSRzcGxpdDQgPSBfc2xpY2VkVG9BcnJheShfbmFtZSRzcGxpdDMsIDIpLFxuICAgICAgICAgICAgICBsID0gX25hbWUkc3BsaXQ0WzBdLFxuICAgICAgICAgICAgICBuID0gX25hbWUkc3BsaXQ0WzFdO1xuXG4gICAgICAgICAgdmFyIGJ1bmRsZSA9IHV0aWxzLmdldFBhdGgoZGF0YSwgW2wsIG5dKTtcbiAgICAgICAgICBpZiAoYnVuZGxlKSB7XG4gICAgICAgICAgICBfdGhpczUubG9hZGVkKG5hbWUsIGVyciwgYnVuZGxlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGVycm9yID0gJ2xvYWRpbmcgbmFtZXNwYWNlICcgKyBuICsgJyBmb3IgbGFuZ3VhZ2UgJyArIGwgKyAnIHZpYSBtdWx0aWxvYWRpbmcgZmFpbGVkJztcbiAgICAgICAgICAgIF90aGlzNS5sb2FkZWQobmFtZSwgZXJyb3IpO1xuICAgICAgICAgICAgX3RoaXM1LmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b0xvYWQudG9Mb2FkLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgX3RoaXM1LmxvYWRPbmUobmFtZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgQ29ubmVjdG9yLnByb3RvdHlwZS5yZWxvYWQgPSBmdW5jdGlvbiByZWxvYWQobGFuZ3VhZ2VzLCBuYW1lc3BhY2VzKSB7XG4gICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICBpZiAoIXRoaXMuYmFja2VuZCkge1xuICAgICAgdGhpcy5sb2dnZXIud2FybignTm8gYmFja2VuZCB3YXMgYWRkZWQgdmlhIGkxOG5leHQudXNlLiBXaWxsIG5vdCBsb2FkIHJlc291cmNlcy4nKTtcbiAgICB9XG4gICAgdmFyIG9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgdGhpcy5iYWNrZW5kLm9wdGlvbnMsIHRoaXMub3B0aW9ucy5iYWNrZW5kKTtcblxuICAgIGlmICh0eXBlb2YgbGFuZ3VhZ2VzID09PSAnc3RyaW5nJykgbGFuZ3VhZ2VzID0gdGhpcy5sYW5ndWFnZVV0aWxzLnRvUmVzb2x2ZUhpZXJhcmNoeShsYW5ndWFnZXMpO1xuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycpIG5hbWVzcGFjZXMgPSBbbmFtZXNwYWNlc107XG5cbiAgICAvLyBsb2FkIHdpdGggbXVsdGktbG9hZFxuICAgIGlmIChvcHRpb25zLmFsbG93TXVsdGlMb2FkaW5nICYmIHRoaXMuYmFja2VuZC5yZWFkTXVsdGkpIHtcbiAgICAgIHRoaXMucmVhZChsYW5ndWFnZXMsIG5hbWVzcGFjZXMsICdyZWFkTXVsdGknLCBudWxsLCBudWxsLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIF90aGlzNi5sb2dnZXIud2FybigncmVsb2FkaW5nIG5hbWVzcGFjZXMgJyArIG5hbWVzcGFjZXMuam9pbignLCAnKSArICcgZm9yIGxhbmd1YWdlcyAnICsgbGFuZ3VhZ2VzLmpvaW4oJywgJykgKyAnIHZpYSBtdWx0aWxvYWRpbmcgZmFpbGVkJywgZXJyKTtcbiAgICAgICAgaWYgKCFlcnIgJiYgZGF0YSkgX3RoaXM2LmxvZ2dlci5sb2coJ3N1Y2Nlc3NmdWxseSByZWxvYWRlZCBuYW1lc3BhY2VzICcgKyBuYW1lc3BhY2VzLmpvaW4oJywgJykgKyAnIGZvciBsYW5ndWFnZXMgJyArIGxhbmd1YWdlcy5qb2luKCcsICcpICsgJyB2aWEgbXVsdGlsb2FkaW5nJywgZGF0YSk7XG5cbiAgICAgICAgbGFuZ3VhZ2VzLmZvckVhY2goZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgICBuYW1lc3BhY2VzLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgIHZhciBidW5kbGUgPSB1dGlscy5nZXRQYXRoKGRhdGEsIFtsLCBuXSk7XG4gICAgICAgICAgICBpZiAoYnVuZGxlKSB7XG4gICAgICAgICAgICAgIF90aGlzNi5sb2FkZWQobCArICd8JyArIG4sIGVyciwgYnVuZGxlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBlcnJvciA9ICdyZWxvYWRpbmcgbmFtZXNwYWNlICcgKyBuICsgJyBmb3IgbGFuZ3VhZ2UgJyArIGwgKyAnIHZpYSBtdWx0aWxvYWRpbmcgZmFpbGVkJztcbiAgICAgICAgICAgICAgX3RoaXM2LmxvYWRlZChsICsgJ3wnICsgbiwgZXJyb3IpO1xuICAgICAgICAgICAgICBfdGhpczYubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFuZ3VhZ2VzLmZvckVhY2goZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgbmFtZXNwYWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgX3RoaXM2LmxvYWRPbmUobCArICd8JyArIG4sICdyZScpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBDb25uZWN0b3IucHJvdG90eXBlLmxvYWRPbmUgPSBmdW5jdGlvbiBsb2FkT25lKG5hbWUpIHtcbiAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgIHZhciBwcmVmaXggPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICcnO1xuXG4gICAgdmFyIF9uYW1lJHNwbGl0NSA9IG5hbWUuc3BsaXQoJ3wnKSxcbiAgICAgICAgX25hbWUkc3BsaXQ2ID0gX3NsaWNlZFRvQXJyYXkoX25hbWUkc3BsaXQ1LCAyKSxcbiAgICAgICAgbG5nID0gX25hbWUkc3BsaXQ2WzBdLFxuICAgICAgICBucyA9IF9uYW1lJHNwbGl0NlsxXTtcblxuICAgIHRoaXMucmVhZChsbmcsIG5zLCAncmVhZCcsIG51bGwsIG51bGwsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgIGlmIChlcnIpIF90aGlzNy5sb2dnZXIud2FybihwcmVmaXggKyAnbG9hZGluZyBuYW1lc3BhY2UgJyArIG5zICsgJyBmb3IgbGFuZ3VhZ2UgJyArIGxuZyArICcgZmFpbGVkJywgZXJyKTtcbiAgICAgIGlmICghZXJyICYmIGRhdGEpIF90aGlzNy5sb2dnZXIubG9nKHByZWZpeCArICdsb2FkZWQgbmFtZXNwYWNlICcgKyBucyArICcgZm9yIGxhbmd1YWdlICcgKyBsbmcsIGRhdGEpO1xuXG4gICAgICBfdGhpczcubG9hZGVkKG5hbWUsIGVyciwgZGF0YSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ29ubmVjdG9yLnByb3RvdHlwZS5zYXZlTWlzc2luZyA9IGZ1bmN0aW9uIHNhdmVNaXNzaW5nKGxhbmd1YWdlcywgbmFtZXNwYWNlLCBrZXksIGZhbGxiYWNrVmFsdWUsIGlzVXBkYXRlKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gNSAmJiBhcmd1bWVudHNbNV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s1XSA6IHt9O1xuXG4gICAgaWYgKHRoaXMuYmFja2VuZCAmJiB0aGlzLmJhY2tlbmQuY3JlYXRlKSB7XG4gICAgICB0aGlzLmJhY2tlbmQuY3JlYXRlKGxhbmd1YWdlcywgbmFtZXNwYWNlLCBrZXksIGZhbGxiYWNrVmFsdWUsIG51bGwgLyogdW51c2VkIGNhbGxiYWNrICovLCBfZXh0ZW5kcyh7fSwgb3B0aW9ucywgeyBpc1VwZGF0ZTogaXNVcGRhdGUgfSkpO1xuICAgIH1cblxuICAgIC8vIHdyaXRlIHRvIHN0b3JlIHRvIGF2b2lkIHJlc2VuZGluZ1xuICAgIGlmICghbGFuZ3VhZ2VzIHx8ICFsYW5ndWFnZXNbMF0pIHJldHVybjtcbiAgICB0aGlzLnN0b3JlLmFkZFJlc291cmNlKGxhbmd1YWdlc1swXSwgbmFtZXNwYWNlLCBrZXksIGZhbGxiYWNrVmFsdWUpO1xuICB9O1xuXG4gIHJldHVybiBDb25uZWN0b3I7XG59KF9FdmVudEVtaXR0ZXIzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb25uZWN0b3I7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2xvZ2dlciA9IHJlcXVpcmUoJy4vbG9nZ2VyLmpzJyk7XG5cbnZhciBfbG9nZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xvZ2dlcik7XG5cbnZhciBfRXZlbnRFbWl0dGVyMiA9IHJlcXVpcmUoJy4vRXZlbnRFbWl0dGVyLmpzJyk7XG5cbnZhciBfRXZlbnRFbWl0dGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0V2ZW50RW1pdHRlcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfZGVmYXVsdHMob2JqLCBkZWZhdWx0cykgeyB2YXIga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRlZmF1bHRzKTsgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7IHZhciBrZXkgPSBrZXlzW2ldOyB2YXIgdmFsdWUgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGRlZmF1bHRzLCBrZXkpOyBpZiAodmFsdWUgJiYgdmFsdWUuY29uZmlndXJhYmxlICYmIG9ialtrZXldID09PSB1bmRlZmluZWQpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSk7IH0gfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IF9kZWZhdWx0cyhzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxudmFyIENvbm5lY3RvciA9IGZ1bmN0aW9uIChfRXZlbnRFbWl0dGVyKSB7XG4gIF9pbmhlcml0cyhDb25uZWN0b3IsIF9FdmVudEVtaXR0ZXIpO1xuXG4gIGZ1bmN0aW9uIENvbm5lY3RvcihjYWNoZSwgc3RvcmUsIHNlcnZpY2VzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbm5lY3Rvcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfRXZlbnRFbWl0dGVyLmNhbGwodGhpcykpO1xuXG4gICAgX3RoaXMuY2FjaGUgPSBjYWNoZTtcbiAgICBfdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgIF90aGlzLnNlcnZpY2VzID0gc2VydmljZXM7XG4gICAgX3RoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgX3RoaXMubG9nZ2VyID0gX2xvZ2dlcjIuZGVmYXVsdC5jcmVhdGUoJ2NhY2hlQ29ubmVjdG9yJyk7XG5cbiAgICBpZiAoX3RoaXMuY2FjaGUgJiYgX3RoaXMuY2FjaGUuaW5pdCkgX3RoaXMuY2FjaGUuaW5pdChzZXJ2aWNlcywgb3B0aW9ucy5jYWNoZSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyogZXNsaW50IGNvbnNpc3RlbnQtcmV0dXJuOiAwICovXG5cblxuICBDb25uZWN0b3IucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiBsb2FkKGxhbmd1YWdlcywgbmFtZXNwYWNlcywgY2FsbGJhY2spIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmICghdGhpcy5jYWNoZSkgcmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgdmFyIG9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgdGhpcy5jYWNoZS5vcHRpb25zLCB0aGlzLm9wdGlvbnMuY2FjaGUpO1xuXG4gICAgdmFyIGxvYWRMbmdzID0gdHlwZW9mIGxhbmd1YWdlcyA9PT0gJ3N0cmluZycgPyB0aGlzLnNlcnZpY2VzLmxhbmd1YWdlVXRpbHMudG9SZXNvbHZlSGllcmFyY2h5KGxhbmd1YWdlcykgOiBsYW5ndWFnZXM7XG5cbiAgICBpZiAob3B0aW9ucy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmNhY2hlLmxvYWQobG9hZExuZ3MsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikgX3RoaXMyLmxvZ2dlci5lcnJvcignbG9hZGluZyBsYW5ndWFnZXMgJyArIGxvYWRMbmdzLmpvaW4oJywgJykgKyAnIGZyb20gY2FjaGUgZmFpbGVkJywgZXJyKTtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAvKiBlc2xpbnQgbm8tcmVzdHJpY3RlZC1zeW50YXg6IDAgKi9cbiAgICAgICAgICBmb3IgKHZhciBsIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwgbCkpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgbiBpbiBkYXRhW2xdKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkYXRhW2xdLCBuKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKG4gIT09ICdpMThuU3RhbXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBidW5kbGUgPSBkYXRhW2xdW25dO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnVuZGxlKSBfdGhpczIuc3RvcmUuYWRkUmVzb3VyY2VCdW5kbGUobCwgbiwgYnVuZGxlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH07XG5cbiAgQ29ubmVjdG9yLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICBpZiAodGhpcy5jYWNoZSAmJiB0aGlzLm9wdGlvbnMuY2FjaGUgJiYgdGhpcy5vcHRpb25zLmNhY2hlLmVuYWJsZWQpIHRoaXMuY2FjaGUuc2F2ZSh0aGlzLnN0b3JlLmRhdGEpO1xuICB9O1xuXG4gIHJldHVybiBDb25uZWN0b3I7XG59KF9FdmVudEVtaXR0ZXIzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb25uZWN0b3I7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50RW1pdHRlcik7XG5cbiAgICB0aGlzLm9ic2VydmVycyA9IHt9O1xuICB9XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50cywgbGlzdGVuZXIpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIF90aGlzLm9ic2VydmVyc1tldmVudF0gPSBfdGhpcy5vYnNlcnZlcnNbZXZlbnRdIHx8IFtdO1xuICAgICAgX3RoaXMub2JzZXJ2ZXJzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcbiAgICB9KTtcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIG9mZihldmVudCwgbGlzdGVuZXIpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmICghdGhpcy5vYnNlcnZlcnNbZXZlbnRdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vYnNlcnZlcnNbZXZlbnRdLmZvckVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFsaXN0ZW5lcikge1xuICAgICAgICBkZWxldGUgX3RoaXMyLm9ic2VydmVyc1tldmVudF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaW5kZXggPSBfdGhpczIub2JzZXJ2ZXJzW2V2ZW50XS5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICBfdGhpczIub2JzZXJ2ZXJzW2V2ZW50XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub2JzZXJ2ZXJzW2V2ZW50XSkge1xuICAgICAgdmFyIGNsb25lZCA9IFtdLmNvbmNhdCh0aGlzLm9ic2VydmVyc1tldmVudF0pO1xuICAgICAgY2xvbmVkLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIG9ic2VydmVyLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vYnNlcnZlcnNbJyonXSkge1xuICAgICAgdmFyIF9jbG9uZWQgPSBbXS5jb25jYXQodGhpcy5vYnNlcnZlcnNbJyonXSk7XG4gICAgICBfY2xvbmVkLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIHZhciBfcmVmO1xuXG4gICAgICAgIG9ic2VydmVyLmFwcGx5KG9ic2VydmVyLCAoX3JlZiA9IFtldmVudF0pLmNvbmNhdC5hcHBseShfcmVmLCBhcmdzKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcblxudmFyIHV0aWxzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzKTtcblxudmFyIF9sb2dnZXIgPSByZXF1aXJlKCcuL2xvZ2dlci5qcycpO1xuXG52YXIgX2xvZ2dlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sb2dnZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgSW50ZXJwb2xhdG9yID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBJbnRlcnBvbGF0b3IoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEludGVycG9sYXRvcik7XG5cbiAgICB0aGlzLmxvZ2dlciA9IF9sb2dnZXIyLmRlZmF1bHQuY3JlYXRlKCdpbnRlcnBvbGF0b3InKTtcblxuICAgIHRoaXMuaW5pdChvcHRpb25zLCB0cnVlKTtcbiAgfVxuXG4gIC8qIGVzbGludCBuby1wYXJhbS1yZWFzc2lnbjogMCAqL1xuXG5cbiAgSW50ZXJwb2xhdG9yLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgdmFyIHJlc2V0ID0gYXJndW1lbnRzWzFdO1xuXG4gICAgaWYgKHJlc2V0KSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgdGhpcy5mb3JtYXQgPSBvcHRpb25zLmludGVycG9sYXRpb24gJiYgb3B0aW9ucy5pbnRlcnBvbGF0aW9uLmZvcm1hdCB8fCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICAgIHRoaXMuZXNjYXBlID0gb3B0aW9ucy5pbnRlcnBvbGF0aW9uICYmIG9wdGlvbnMuaW50ZXJwb2xhdGlvbi5lc2NhcGUgfHwgdXRpbHMuZXNjYXBlO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuaW50ZXJwb2xhdGlvbikgb3B0aW9ucy5pbnRlcnBvbGF0aW9uID0geyBlc2NhcGVWYWx1ZTogdHJ1ZSB9O1xuXG4gICAgdmFyIGlPcHRzID0gb3B0aW9ucy5pbnRlcnBvbGF0aW9uO1xuXG4gICAgdGhpcy5lc2NhcGVWYWx1ZSA9IGlPcHRzLmVzY2FwZVZhbHVlICE9PSB1bmRlZmluZWQgPyBpT3B0cy5lc2NhcGVWYWx1ZSA6IHRydWU7XG5cbiAgICB0aGlzLnByZWZpeCA9IGlPcHRzLnByZWZpeCA/IHV0aWxzLnJlZ2V4RXNjYXBlKGlPcHRzLnByZWZpeCkgOiBpT3B0cy5wcmVmaXhFc2NhcGVkIHx8ICd7eyc7XG4gICAgdGhpcy5zdWZmaXggPSBpT3B0cy5zdWZmaXggPyB1dGlscy5yZWdleEVzY2FwZShpT3B0cy5zdWZmaXgpIDogaU9wdHMuc3VmZml4RXNjYXBlZCB8fCAnfX0nO1xuXG4gICAgdGhpcy5mb3JtYXRTZXBhcmF0b3IgPSBpT3B0cy5mb3JtYXRTZXBhcmF0b3IgPyBpT3B0cy5mb3JtYXRTZXBhcmF0b3IgOiBpT3B0cy5mb3JtYXRTZXBhcmF0b3IgfHwgJywnO1xuXG4gICAgdGhpcy51bmVzY2FwZVByZWZpeCA9IGlPcHRzLnVuZXNjYXBlU3VmZml4ID8gJycgOiBpT3B0cy51bmVzY2FwZVByZWZpeCB8fCAnLSc7XG4gICAgdGhpcy51bmVzY2FwZVN1ZmZpeCA9IHRoaXMudW5lc2NhcGVQcmVmaXggPyAnJyA6IGlPcHRzLnVuZXNjYXBlU3VmZml4IHx8ICcnO1xuXG4gICAgdGhpcy5uZXN0aW5nUHJlZml4ID0gaU9wdHMubmVzdGluZ1ByZWZpeCA/IHV0aWxzLnJlZ2V4RXNjYXBlKGlPcHRzLm5lc3RpbmdQcmVmaXgpIDogaU9wdHMubmVzdGluZ1ByZWZpeEVzY2FwZWQgfHwgdXRpbHMucmVnZXhFc2NhcGUoJyR0KCcpO1xuICAgIHRoaXMubmVzdGluZ1N1ZmZpeCA9IGlPcHRzLm5lc3RpbmdTdWZmaXggPyB1dGlscy5yZWdleEVzY2FwZShpT3B0cy5uZXN0aW5nU3VmZml4KSA6IGlPcHRzLm5lc3RpbmdTdWZmaXhFc2NhcGVkIHx8IHV0aWxzLnJlZ2V4RXNjYXBlKCcpJyk7XG5cbiAgICB0aGlzLm1heFJlcGxhY2VzID0gaU9wdHMubWF4UmVwbGFjZXMgPyBpT3B0cy5tYXhSZXBsYWNlcyA6IDEwMDA7XG5cbiAgICAvLyB0aGUgcmVnZXhwXG4gICAgdGhpcy5yZXNldFJlZ0V4cCgpO1xuICB9O1xuXG4gIEludGVycG9sYXRvci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zKSB0aGlzLmluaXQodGhpcy5vcHRpb25zKTtcbiAgfTtcblxuICBJbnRlcnBvbGF0b3IucHJvdG90eXBlLnJlc2V0UmVnRXhwID0gZnVuY3Rpb24gcmVzZXRSZWdFeHAoKSB7XG4gICAgLy8gdGhlIHJlZ2V4cFxuICAgIHZhciByZWdleHBTdHIgPSB0aGlzLnByZWZpeCArICcoLis/KScgKyB0aGlzLnN1ZmZpeDtcbiAgICB0aGlzLnJlZ2V4cCA9IG5ldyBSZWdFeHAocmVnZXhwU3RyLCAnZycpO1xuXG4gICAgdmFyIHJlZ2V4cFVuZXNjYXBlU3RyID0gJycgKyB0aGlzLnByZWZpeCArIHRoaXMudW5lc2NhcGVQcmVmaXggKyAnKC4rPyknICsgdGhpcy51bmVzY2FwZVN1ZmZpeCArIHRoaXMuc3VmZml4O1xuICAgIHRoaXMucmVnZXhwVW5lc2NhcGUgPSBuZXcgUmVnRXhwKHJlZ2V4cFVuZXNjYXBlU3RyLCAnZycpO1xuXG4gICAgdmFyIG5lc3RpbmdSZWdleHBTdHIgPSB0aGlzLm5lc3RpbmdQcmVmaXggKyAnKC4rPyknICsgdGhpcy5uZXN0aW5nU3VmZml4O1xuICAgIHRoaXMubmVzdGluZ1JlZ2V4cCA9IG5ldyBSZWdFeHAobmVzdGluZ1JlZ2V4cFN0ciwgJ2cnKTtcbiAgfTtcblxuICBJbnRlcnBvbGF0b3IucHJvdG90eXBlLmludGVycG9sYXRlID0gZnVuY3Rpb24gaW50ZXJwb2xhdGUoc3RyLCBkYXRhLCBsbmcpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIG1hdGNoID0gdm9pZCAwO1xuICAgIHZhciB2YWx1ZSA9IHZvaWQgMDtcbiAgICB2YXIgcmVwbGFjZXMgPSB2b2lkIDA7XG5cbiAgICBmdW5jdGlvbiByZWdleFNhZmUodmFsKSB7XG4gICAgICByZXR1cm4gdmFsLnJlcGxhY2UoL1xcJC9nLCAnJCQkJCcpO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGVGb3JtYXQgPSBmdW5jdGlvbiBoYW5kbGVGb3JtYXQoa2V5KSB7XG4gICAgICBpZiAoa2V5LmluZGV4T2YoX3RoaXMuZm9ybWF0U2VwYXJhdG9yKSA8IDApIHJldHVybiB1dGlscy5nZXRQYXRoKGRhdGEsIGtleSk7XG5cbiAgICAgIHZhciBwID0ga2V5LnNwbGl0KF90aGlzLmZvcm1hdFNlcGFyYXRvcik7XG4gICAgICB2YXIgayA9IHAuc2hpZnQoKS50cmltKCk7XG4gICAgICB2YXIgZiA9IHAuam9pbihfdGhpcy5mb3JtYXRTZXBhcmF0b3IpLnRyaW0oKTtcblxuICAgICAgcmV0dXJuIF90aGlzLmZvcm1hdCh1dGlscy5nZXRQYXRoKGRhdGEsIGspLCBmLCBsbmcpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc2V0UmVnRXhwKCk7XG5cbiAgICByZXBsYWNlcyA9IDA7XG4gICAgLy8gdW5lc2NhcGUgaWYgaGFzIHVuZXNjYXBlUHJlZml4L1N1ZmZpeFxuICAgIC8qIGVzbGludCBuby1jb25kLWFzc2lnbjogMCAqL1xuICAgIHdoaWxlIChtYXRjaCA9IHRoaXMucmVnZXhwVW5lc2NhcGUuZXhlYyhzdHIpKSB7XG4gICAgICB2YWx1ZSA9IGhhbmRsZUZvcm1hdChtYXRjaFsxXS50cmltKCkpO1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UobWF0Y2hbMF0sIHZhbHVlKTtcbiAgICAgIHRoaXMucmVnZXhwVW5lc2NhcGUubGFzdEluZGV4ID0gMDtcbiAgICAgIHJlcGxhY2VzKys7XG4gICAgICBpZiAocmVwbGFjZXMgPj0gdGhpcy5tYXhSZXBsYWNlcykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXBsYWNlcyA9IDA7XG4gICAgLy8gcmVndWxhciBlc2NhcGUgb24gZGVtYW5kXG4gICAgd2hpbGUgKG1hdGNoID0gdGhpcy5yZWdleHAuZXhlYyhzdHIpKSB7XG4gICAgICB2YWx1ZSA9IGhhbmRsZUZvcm1hdChtYXRjaFsxXS50cmltKCkpO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHZhbHVlID0gdXRpbHMubWFrZVN0cmluZyh2YWx1ZSk7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ21pc3NlZCB0byBwYXNzIGluIHZhcmlhYmxlICcgKyBtYXRjaFsxXSArICcgZm9yIGludGVycG9sYXRpbmcgJyArIHN0cik7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IHRoaXMuZXNjYXBlVmFsdWUgPyByZWdleFNhZmUodGhpcy5lc2NhcGUodmFsdWUpKSA6IHJlZ2V4U2FmZSh2YWx1ZSk7XG4gICAgICBzdHIgPSBzdHIucmVwbGFjZShtYXRjaFswXSwgdmFsdWUpO1xuICAgICAgdGhpcy5yZWdleHAubGFzdEluZGV4ID0gMDtcbiAgICAgIHJlcGxhY2VzKys7XG4gICAgICBpZiAocmVwbGFjZXMgPj0gdGhpcy5tYXhSZXBsYWNlcykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfTtcblxuICBJbnRlcnBvbGF0b3IucHJvdG90eXBlLm5lc3QgPSBmdW5jdGlvbiBuZXN0KHN0ciwgZmMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG5cbiAgICB2YXIgbWF0Y2ggPSB2b2lkIDA7XG4gICAgdmFyIHZhbHVlID0gdm9pZCAwO1xuXG4gICAgdmFyIGNsb25lZE9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgb3B0aW9ucyk7XG4gICAgY2xvbmVkT3B0aW9ucy5hcHBseVBvc3RQcm9jZXNzb3IgPSBmYWxzZTsgLy8gYXZvaWQgcG9zdCBwcm9jZXNzaW5nIG9uIG5lc3RlZCBsb29rdXBcblxuICAgIC8vIGlmIHZhbHVlIGlzIHNvbWV0aGluZyBsaWtlIFwibXlLZXlcIjogXCJsb3JlbSAkKGFub3RoZXJLZXksIHsgXCJjb3VudFwiOiB7e2FWYWx1ZUluT3B0aW9uc319IH0pXCJcbiAgICBmdW5jdGlvbiBoYW5kbGVIYXNPcHRpb25zKGtleSwgaW5oZXJpdGVkT3B0aW9ucykge1xuICAgICAgaWYgKGtleS5pbmRleE9mKCcsJykgPCAwKSByZXR1cm4ga2V5O1xuXG4gICAgICB2YXIgcCA9IGtleS5zcGxpdCgnLCcpO1xuICAgICAga2V5ID0gcC5zaGlmdCgpO1xuICAgICAgdmFyIG9wdGlvbnNTdHJpbmcgPSBwLmpvaW4oJywnKTtcbiAgICAgIG9wdGlvbnNTdHJpbmcgPSB0aGlzLmludGVycG9sYXRlKG9wdGlvbnNTdHJpbmcsIGNsb25lZE9wdGlvbnMpO1xuICAgICAgb3B0aW9uc1N0cmluZyA9IG9wdGlvbnNTdHJpbmcucmVwbGFjZSgvJy9nLCAnXCInKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY2xvbmVkT3B0aW9ucyA9IEpTT04ucGFyc2Uob3B0aW9uc1N0cmluZyk7XG5cbiAgICAgICAgaWYgKGluaGVyaXRlZE9wdGlvbnMpIGNsb25lZE9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgaW5oZXJpdGVkT3B0aW9ucywgY2xvbmVkT3B0aW9ucyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdmYWlsZWQgcGFyc2luZyBvcHRpb25zIHN0cmluZyBpbiBuZXN0aW5nIGZvciBrZXkgJyArIGtleSwgZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuXG4gICAgLy8gcmVndWxhciBlc2NhcGUgb24gZGVtYW5kXG4gICAgd2hpbGUgKG1hdGNoID0gdGhpcy5uZXN0aW5nUmVnZXhwLmV4ZWMoc3RyKSkge1xuICAgICAgdmFsdWUgPSBmYyhoYW5kbGVIYXNPcHRpb25zLmNhbGwodGhpcywgbWF0Y2hbMV0udHJpbSgpLCBjbG9uZWRPcHRpb25zKSwgY2xvbmVkT3B0aW9ucyk7XG5cbiAgICAgIC8vIGlzIG9ubHkgdGhlIG5lc3Rpbmcga2V5IChrZXkxID0gJyQoa2V5MiknKSByZXR1cm4gdGhlIHZhbHVlIHdpdGhvdXQgc3RyaW5naWZ5XG4gICAgICBpZiAodmFsdWUgJiYgbWF0Y2hbMF0gPT09IHN0ciAmJiB0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSByZXR1cm4gdmFsdWU7XG5cbiAgICAgIC8vIG5vIHN0cmluZyB0byBpbmNsdWRlIG9yIGVtcHR5XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykgdmFsdWUgPSB1dGlscy5tYWtlU3RyaW5nKHZhbHVlKTtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignbWlzc2VkIHRvIHJlc29sdmUgJyArIG1hdGNoWzFdICsgJyBmb3IgbmVzdGluZyAnICsgc3RyKTtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICAgIC8vIE5lc3RlZCBrZXlzIHNob3VsZCBub3QgYmUgZXNjYXBlZCBieSBkZWZhdWx0ICM4NTRcbiAgICAgIC8vIHZhbHVlID0gdGhpcy5lc2NhcGVWYWx1ZSA/IHJlZ2V4U2FmZSh1dGlscy5lc2NhcGUodmFsdWUpKSA6IHJlZ2V4U2FmZSh2YWx1ZSk7XG4gICAgICBzdHIgPSBzdHIucmVwbGFjZShtYXRjaFswXSwgdmFsdWUpO1xuICAgICAgdGhpcy5yZWdleHAubGFzdEluZGV4ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfTtcblxuICByZXR1cm4gSW50ZXJwb2xhdG9yO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBJbnRlcnBvbGF0b3I7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2xvZ2dlciA9IHJlcXVpcmUoJy4vbG9nZ2VyLmpzJyk7XG5cbnZhciBfbG9nZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xvZ2dlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59XG5cbnZhciBMYW5ndWFnZVV0aWwgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIExhbmd1YWdlVXRpbChvcHRpb25zKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIExhbmd1YWdlVXRpbCk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgdGhpcy53aGl0ZWxpc3QgPSB0aGlzLm9wdGlvbnMud2hpdGVsaXN0IHx8IGZhbHNlO1xuICAgIHRoaXMubG9nZ2VyID0gX2xvZ2dlcjIuZGVmYXVsdC5jcmVhdGUoJ2xhbmd1YWdlVXRpbHMnKTtcbiAgfVxuXG4gIExhbmd1YWdlVXRpbC5wcm90b3R5cGUuZ2V0U2NyaXB0UGFydEZyb21Db2RlID0gZnVuY3Rpb24gZ2V0U2NyaXB0UGFydEZyb21Db2RlKGNvZGUpIHtcbiAgICBpZiAoIWNvZGUgfHwgY29kZS5pbmRleE9mKCctJykgPCAwKSByZXR1cm4gbnVsbDtcblxuICAgIHZhciBwID0gY29kZS5zcGxpdCgnLScpO1xuICAgIGlmIChwLmxlbmd0aCA9PT0gMikgcmV0dXJuIG51bGw7XG4gICAgcC5wb3AoKTtcbiAgICByZXR1cm4gdGhpcy5mb3JtYXRMYW5ndWFnZUNvZGUocC5qb2luKCctJykpO1xuICB9O1xuXG4gIExhbmd1YWdlVXRpbC5wcm90b3R5cGUuZ2V0TGFuZ3VhZ2VQYXJ0RnJvbUNvZGUgPSBmdW5jdGlvbiBnZXRMYW5ndWFnZVBhcnRGcm9tQ29kZShjb2RlKSB7XG4gICAgaWYgKCFjb2RlIHx8IGNvZGUuaW5kZXhPZignLScpIDwgMCkgcmV0dXJuIGNvZGU7XG5cbiAgICB2YXIgcCA9IGNvZGUuc3BsaXQoJy0nKTtcbiAgICByZXR1cm4gdGhpcy5mb3JtYXRMYW5ndWFnZUNvZGUocFswXSk7XG4gIH07XG5cbiAgTGFuZ3VhZ2VVdGlsLnByb3RvdHlwZS5mb3JtYXRMYW5ndWFnZUNvZGUgPSBmdW5jdGlvbiBmb3JtYXRMYW5ndWFnZUNvZGUoY29kZSkge1xuICAgIC8vIGh0dHA6Ly93d3cuaWFuYS5vcmcvYXNzaWdubWVudHMvbGFuZ3VhZ2UtdGFncy9sYW5ndWFnZS10YWdzLnhodG1sXG4gICAgaWYgKHR5cGVvZiBjb2RlID09PSAnc3RyaW5nJyAmJiBjb2RlLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICB2YXIgc3BlY2lhbENhc2VzID0gWydoYW5zJywgJ2hhbnQnLCAnbGF0bicsICdjeXJsJywgJ2NhbnMnLCAnbW9uZycsICdhcmFiJ107XG4gICAgICB2YXIgcCA9IGNvZGUuc3BsaXQoJy0nKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5sb3dlckNhc2VMbmcpIHtcbiAgICAgICAgcCA9IHAubWFwKGZ1bmN0aW9uIChwYXJ0KSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHAubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHBbMF0gPSBwWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHBbMV0gPSBwWzFdLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKHNwZWNpYWxDYXNlcy5pbmRleE9mKHBbMV0udG9Mb3dlckNhc2UoKSkgPiAtMSkgcFsxXSA9IGNhcGl0YWxpemUocFsxXS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAocC5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgcFswXSA9IHBbMF0udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAvLyBpZiBsZW5naHQgMiBndWVzcyBpdCdzIGEgY291bnRyeVxuICAgICAgICBpZiAocFsxXS5sZW5ndGggPT09IDIpIHBbMV0gPSBwWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGlmIChwWzBdICE9PSAnc2duJyAmJiBwWzJdLmxlbmd0aCA9PT0gMikgcFsyXSA9IHBbMl0udG9VcHBlckNhc2UoKTtcblxuICAgICAgICBpZiAoc3BlY2lhbENhc2VzLmluZGV4T2YocFsxXS50b0xvd2VyQ2FzZSgpKSA+IC0xKSBwWzFdID0gY2FwaXRhbGl6ZShwWzFdLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICBpZiAoc3BlY2lhbENhc2VzLmluZGV4T2YocFsyXS50b0xvd2VyQ2FzZSgpKSA+IC0xKSBwWzJdID0gY2FwaXRhbGl6ZShwWzJdLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcC5qb2luKCctJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jbGVhbkNvZGUgfHwgdGhpcy5vcHRpb25zLmxvd2VyQ2FzZUxuZyA/IGNvZGUudG9Mb3dlckNhc2UoKSA6IGNvZGU7XG4gIH07XG5cbiAgTGFuZ3VhZ2VVdGlsLnByb3RvdHlwZS5pc1doaXRlbGlzdGVkID0gZnVuY3Rpb24gaXNXaGl0ZWxpc3RlZChjb2RlKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5sb2FkID09PSAnbGFuZ3VhZ2VPbmx5JyB8fCB0aGlzLm9wdGlvbnMubm9uRXhwbGljaXRXaGl0ZWxpc3QpIHtcbiAgICAgIGNvZGUgPSB0aGlzLmdldExhbmd1YWdlUGFydEZyb21Db2RlKGNvZGUpO1xuICAgIH1cbiAgICByZXR1cm4gIXRoaXMud2hpdGVsaXN0IHx8ICF0aGlzLndoaXRlbGlzdC5sZW5ndGggfHwgdGhpcy53aGl0ZWxpc3QuaW5kZXhPZihjb2RlKSA+IC0xO1xuICB9O1xuXG4gIExhbmd1YWdlVXRpbC5wcm90b3R5cGUuZ2V0RmFsbGJhY2tDb2RlcyA9IGZ1bmN0aW9uIGdldEZhbGxiYWNrQ29kZXMoZmFsbGJhY2tzLCBjb2RlKSB7XG4gICAgaWYgKCFmYWxsYmFja3MpIHJldHVybiBbXTtcbiAgICBpZiAodHlwZW9mIGZhbGxiYWNrcyA9PT0gJ3N0cmluZycpIGZhbGxiYWNrcyA9IFtmYWxsYmFja3NdO1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KGZhbGxiYWNrcykgPT09ICdbb2JqZWN0IEFycmF5XScpIHJldHVybiBmYWxsYmFja3M7XG5cbiAgICBpZiAoIWNvZGUpIHJldHVybiBmYWxsYmFja3MuZGVmYXVsdCB8fCBbXTtcblxuICAgIC8vIGFzdW1lIHdlIGhhdmUgYW4gb2JqZWN0IGRlZmluaW5nIGZhbGxiYWNrc1xuICAgIHZhciBmb3VuZCA9IGZhbGxiYWNrc1tjb2RlXTtcbiAgICBpZiAoIWZvdW5kKSBmb3VuZCA9IGZhbGxiYWNrc1t0aGlzLmdldFNjcmlwdFBhcnRGcm9tQ29kZShjb2RlKV07XG4gICAgaWYgKCFmb3VuZCkgZm91bmQgPSBmYWxsYmFja3NbdGhpcy5mb3JtYXRMYW5ndWFnZUNvZGUoY29kZSldO1xuICAgIGlmICghZm91bmQpIGZvdW5kID0gZmFsbGJhY2tzLmRlZmF1bHQ7XG5cbiAgICByZXR1cm4gZm91bmQgfHwgW107XG4gIH07XG5cbiAgTGFuZ3VhZ2VVdGlsLnByb3RvdHlwZS50b1Jlc29sdmVIaWVyYXJjaHkgPSBmdW5jdGlvbiB0b1Jlc29sdmVIaWVyYXJjaHkoY29kZSwgZmFsbGJhY2tDb2RlKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBmYWxsYmFja0NvZGVzID0gdGhpcy5nZXRGYWxsYmFja0NvZGVzKGZhbGxiYWNrQ29kZSB8fCB0aGlzLm9wdGlvbnMuZmFsbGJhY2tMbmcgfHwgW10sIGNvZGUpO1xuXG4gICAgdmFyIGNvZGVzID0gW107XG4gICAgdmFyIGFkZENvZGUgPSBmdW5jdGlvbiBhZGRDb2RlKGMpIHtcbiAgICAgIGlmICghYykgcmV0dXJuO1xuICAgICAgaWYgKF90aGlzLmlzV2hpdGVsaXN0ZWQoYykpIHtcbiAgICAgICAgY29kZXMucHVzaChjKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLmxvZ2dlci53YXJuKCdyZWplY3Rpbmcgbm9uLXdoaXRlbGlzdGVkIGxhbmd1YWdlIGNvZGU6ICcgKyBjKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBjb2RlID09PSAnc3RyaW5nJyAmJiBjb2RlLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmxvYWQgIT09ICdsYW5ndWFnZU9ubHknKSBhZGRDb2RlKHRoaXMuZm9ybWF0TGFuZ3VhZ2VDb2RlKGNvZGUpKTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubG9hZCAhPT0gJ2xhbmd1YWdlT25seScgJiYgdGhpcy5vcHRpb25zLmxvYWQgIT09ICdjdXJyZW50T25seScpIGFkZENvZGUodGhpcy5nZXRTY3JpcHRQYXJ0RnJvbUNvZGUoY29kZSkpO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5sb2FkICE9PSAnY3VycmVudE9ubHknKSBhZGRDb2RlKHRoaXMuZ2V0TGFuZ3VhZ2VQYXJ0RnJvbUNvZGUoY29kZSkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBhZGRDb2RlKHRoaXMuZm9ybWF0TGFuZ3VhZ2VDb2RlKGNvZGUpKTtcbiAgICB9XG5cbiAgICBmYWxsYmFja0NvZGVzLmZvckVhY2goZnVuY3Rpb24gKGZjKSB7XG4gICAgICBpZiAoY29kZXMuaW5kZXhPZihmYykgPCAwKSBhZGRDb2RlKF90aGlzLmZvcm1hdExhbmd1YWdlQ29kZShmYykpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvZGVzO1xuICB9O1xuXG4gIHJldHVybiBMYW5ndWFnZVV0aWw7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IExhbmd1YWdlVXRpbDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfbG9nZ2VyID0gcmVxdWlyZSgnLi9sb2dnZXIuanMnKTtcblxudmFyIF9sb2dnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbG9nZ2VyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLy8gZGVmaW5pdGlvbiBodHRwOi8vdHJhbnNsYXRlLnNvdXJjZWZvcmdlLm5ldC93aWtpL2wxMG4vcGx1cmFsZm9ybXNcbi8qIGVzbGludC1kaXNhYmxlICovXG52YXIgc2V0cyA9IFt7IGxuZ3M6IFsnYWNoJywgJ2FrJywgJ2FtJywgJ2FybicsICdicicsICdmaWwnLCAnZ3VuJywgJ2xuJywgJ21mZScsICdtZycsICdtaScsICdvYycsICdwdCcsICdwdC1CUicsICd0ZycsICd0aScsICd0cicsICd1eicsICd3YSddLCBucjogWzEsIDJdLCBmYzogMSB9LCB7IGxuZ3M6IFsnYWYnLCAnYW4nLCAnYXN0JywgJ2F6JywgJ2JnJywgJ2JuJywgJ2NhJywgJ2RhJywgJ2RlJywgJ2RldicsICdlbCcsICdlbicsICdlbycsICdlcycsICdldCcsICdldScsICdmaScsICdmbycsICdmdXInLCAnZnknLCAnZ2wnLCAnZ3UnLCAnaGEnLCAnaGUnLCAnaGknLCAnaHUnLCAnaHknLCAnaWEnLCAnaXQnLCAna24nLCAna3UnLCAnbGInLCAnbWFpJywgJ21sJywgJ21uJywgJ21yJywgJ25haCcsICduYXAnLCAnbmInLCAnbmUnLCAnbmwnLCAnbm4nLCAnbm8nLCAnbnNvJywgJ3BhJywgJ3BhcCcsICdwbXMnLCAncHMnLCAncHQtUFQnLCAncm0nLCAnc2NvJywgJ3NlJywgJ3NpJywgJ3NvJywgJ3NvbicsICdzcScsICdzdicsICdzdycsICd0YScsICd0ZScsICd0aycsICd1cicsICd5byddLCBucjogWzEsIDJdLCBmYzogMiB9LCB7IGxuZ3M6IFsnYXknLCAnYm8nLCAnY2dnJywgJ2ZhJywgJ2lkJywgJ2phJywgJ2pibycsICdrYScsICdraycsICdrbScsICdrbycsICdreScsICdsbycsICdtcycsICdzYWgnLCAnc3UnLCAndGgnLCAndHQnLCAndWcnLCAndmknLCAnd28nLCAnemgnXSwgbnI6IFsxXSwgZmM6IDMgfSwgeyBsbmdzOiBbJ2JlJywgJ2JzJywgJ2R6JywgJ2hyJywgJ3J1JywgJ3NyJywgJ3VrJ10sIG5yOiBbMSwgMiwgNV0sIGZjOiA0IH0sIHsgbG5nczogWydhciddLCBucjogWzAsIDEsIDIsIDMsIDExLCAxMDBdLCBmYzogNSB9LCB7IGxuZ3M6IFsnY3MnLCAnc2snXSwgbnI6IFsxLCAyLCA1XSwgZmM6IDYgfSwgeyBsbmdzOiBbJ2NzYicsICdwbCddLCBucjogWzEsIDIsIDVdLCBmYzogNyB9LCB7IGxuZ3M6IFsnY3knXSwgbnI6IFsxLCAyLCAzLCA4XSwgZmM6IDggfSwgeyBsbmdzOiBbJ2ZyJ10sIG5yOiBbMSwgMl0sIGZjOiA5IH0sIHsgbG5nczogWydnYSddLCBucjogWzEsIDIsIDMsIDcsIDExXSwgZmM6IDEwIH0sIHsgbG5nczogWydnZCddLCBucjogWzEsIDIsIDMsIDIwXSwgZmM6IDExIH0sIHsgbG5nczogWydpcyddLCBucjogWzEsIDJdLCBmYzogMTIgfSwgeyBsbmdzOiBbJ2p2J10sIG5yOiBbMCwgMV0sIGZjOiAxMyB9LCB7IGxuZ3M6IFsna3cnXSwgbnI6IFsxLCAyLCAzLCA0XSwgZmM6IDE0IH0sIHsgbG5nczogWydsdCddLCBucjogWzEsIDIsIDEwXSwgZmM6IDE1IH0sIHsgbG5nczogWydsdiddLCBucjogWzEsIDIsIDBdLCBmYzogMTYgfSwgeyBsbmdzOiBbJ21rJ10sIG5yOiBbMSwgMl0sIGZjOiAxNyB9LCB7IGxuZ3M6IFsnbW5rJ10sIG5yOiBbMCwgMSwgMl0sIGZjOiAxOCB9LCB7IGxuZ3M6IFsnbXQnXSwgbnI6IFsxLCAyLCAxMSwgMjBdLCBmYzogMTkgfSwgeyBsbmdzOiBbJ29yJ10sIG5yOiBbMiwgMV0sIGZjOiAyIH0sIHsgbG5nczogWydybyddLCBucjogWzEsIDIsIDIwXSwgZmM6IDIwIH0sIHsgbG5nczogWydzbCddLCBucjogWzUsIDEsIDIsIDNdLCBmYzogMjEgfV07XG5cbnZhciBfcnVsZXNQbHVyYWxzVHlwZXMgPSB7XG4gIDE6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiBOdW1iZXIobiA+IDEpO1xuICB9LFxuICAyOiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gIT0gMSk7XG4gIH0sXG4gIDM6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiAwO1xuICB9LFxuICA0OiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gJSAxMCA9PSAxICYmIG4gJSAxMDAgIT0gMTEgPyAwIDogbiAlIDEwID49IDIgJiYgbiAlIDEwIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyKTtcbiAgfSxcbiAgNTogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuID09PSAwID8gMCA6IG4gPT0gMSA/IDEgOiBuID09IDIgPyAyIDogbiAlIDEwMCA+PSAzICYmIG4gJSAxMDAgPD0gMTAgPyAzIDogbiAlIDEwMCA+PSAxMSA/IDQgOiA1KTtcbiAgfSxcbiAgNjogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuID09IDEgPyAwIDogbiA+PSAyICYmIG4gPD0gNCA/IDEgOiAyKTtcbiAgfSxcbiAgNzogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuID09IDEgPyAwIDogbiAlIDEwID49IDIgJiYgbiAlIDEwIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyKTtcbiAgfSxcbiAgODogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuID09IDEgPyAwIDogbiA9PSAyID8gMSA6IG4gIT0gOCAmJiBuICE9IDExID8gMiA6IDMpO1xuICB9LFxuICA5OiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gPj0gMik7XG4gIH0sXG4gIDEwOiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gPT0gMSA/IDAgOiBuID09IDIgPyAxIDogbiA8IDcgPyAyIDogbiA8IDExID8gMyA6IDQpO1xuICB9LFxuICAxMTogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuID09IDEgfHwgbiA9PSAxMSA/IDAgOiBuID09IDIgfHwgbiA9PSAxMiA/IDEgOiBuID4gMiAmJiBuIDwgMjAgPyAyIDogMyk7XG4gIH0sXG4gIDEyOiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gJSAxMCAhPSAxIHx8IG4gJSAxMDAgPT0gMTEpO1xuICB9LFxuICAxMzogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuICE9PSAwKTtcbiAgfSxcbiAgMTQ6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiBOdW1iZXIobiA9PSAxID8gMCA6IG4gPT0gMiA/IDEgOiBuID09IDMgPyAyIDogMyk7XG4gIH0sXG4gIDE1OiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gJSAxMCA9PSAxICYmIG4gJSAxMDAgIT0gMTEgPyAwIDogbiAlIDEwID49IDIgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyKTtcbiAgfSxcbiAgMTY6IGZ1bmN0aW9uIF8obikge1xuICAgIHJldHVybiBOdW1iZXIobiAlIDEwID09IDEgJiYgbiAlIDEwMCAhPSAxMSA/IDAgOiBuICE9PSAwID8gMSA6IDIpO1xuICB9LFxuICAxNzogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuID09IDEgfHwgbiAlIDEwID09IDEgPyAwIDogMSk7XG4gIH0sXG4gIDE4OiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gPT0gMCA/IDAgOiBuID09IDEgPyAxIDogMik7XG4gIH0sXG4gIDE5OiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gPT0gMSA/IDAgOiBuID09PSAwIHx8IG4gJSAxMDAgPiAxICYmIG4gJSAxMDAgPCAxMSA/IDEgOiBuICUgMTAwID4gMTAgJiYgbiAlIDEwMCA8IDIwID8gMiA6IDMpO1xuICB9LFxuICAyMDogZnVuY3Rpb24gXyhuKSB7XG4gICAgcmV0dXJuIE51bWJlcihuID09IDEgPyAwIDogbiA9PT0gMCB8fCBuICUgMTAwID4gMCAmJiBuICUgMTAwIDwgMjAgPyAxIDogMik7XG4gIH0sXG4gIDIxOiBmdW5jdGlvbiBfKG4pIHtcbiAgICByZXR1cm4gTnVtYmVyKG4gJSAxMDAgPT0gMSA/IDEgOiBuICUgMTAwID09IDIgPyAyIDogbiAlIDEwMCA9PSAzIHx8IG4gJSAxMDAgPT0gNCA/IDMgOiAwKTtcbiAgfVxufTtcbi8qIGVzbGludC1lbmFibGUgKi9cblxuZnVuY3Rpb24gY3JlYXRlUnVsZXMoKSB7XG4gIHZhciBydWxlcyA9IHt9O1xuICBzZXRzLmZvckVhY2goZnVuY3Rpb24gKHNldCkge1xuICAgIHNldC5sbmdzLmZvckVhY2goZnVuY3Rpb24gKGwpIHtcbiAgICAgIHJ1bGVzW2xdID0ge1xuICAgICAgICBudW1iZXJzOiBzZXQubnIsXG4gICAgICAgIHBsdXJhbHM6IF9ydWxlc1BsdXJhbHNUeXBlc1tzZXQuZmNdXG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHJ1bGVzO1xufVxuXG52YXIgUGx1cmFsUmVzb2x2ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFBsdXJhbFJlc29sdmVyKGxhbmd1YWdlVXRpbHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGx1cmFsUmVzb2x2ZXIpO1xuXG4gICAgdGhpcy5sYW5ndWFnZVV0aWxzID0gbGFuZ3VhZ2VVdGlscztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2dnZXIgPSBfbG9nZ2VyMi5kZWZhdWx0LmNyZWF0ZSgncGx1cmFsUmVzb2x2ZXInKTtcblxuICAgIHRoaXMucnVsZXMgPSBjcmVhdGVSdWxlcygpO1xuICB9XG5cbiAgUGx1cmFsUmVzb2x2ZXIucHJvdG90eXBlLmFkZFJ1bGUgPSBmdW5jdGlvbiBhZGRSdWxlKGxuZywgb2JqKSB7XG4gICAgdGhpcy5ydWxlc1tsbmddID0gb2JqO1xuICB9O1xuXG4gIFBsdXJhbFJlc29sdmVyLnByb3RvdHlwZS5nZXRSdWxlID0gZnVuY3Rpb24gZ2V0UnVsZShjb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMucnVsZXNbY29kZV0gfHwgdGhpcy5ydWxlc1t0aGlzLmxhbmd1YWdlVXRpbHMuZ2V0TGFuZ3VhZ2VQYXJ0RnJvbUNvZGUoY29kZSldO1xuICB9O1xuXG4gIFBsdXJhbFJlc29sdmVyLnByb3RvdHlwZS5uZWVkc1BsdXJhbCA9IGZ1bmN0aW9uIG5lZWRzUGx1cmFsKGNvZGUpIHtcbiAgICB2YXIgcnVsZSA9IHRoaXMuZ2V0UnVsZShjb2RlKTtcblxuICAgIHJldHVybiBydWxlICYmIHJ1bGUubnVtYmVycy5sZW5ndGggPiAxO1xuICB9O1xuXG4gIFBsdXJhbFJlc29sdmVyLnByb3RvdHlwZS5nZXRQbHVyYWxGb3Jtc09mS2V5ID0gZnVuY3Rpb24gZ2V0UGx1cmFsRm9ybXNPZktleShjb2RlLCBrZXkpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIHJldCA9IFtdO1xuXG4gICAgdmFyIHJ1bGUgPSB0aGlzLmdldFJ1bGUoY29kZSk7XG5cbiAgICBydWxlLm51bWJlcnMuZm9yRWFjaChmdW5jdGlvbiAobikge1xuICAgICAgdmFyIHN1ZmZpeCA9IF90aGlzLmdldFN1ZmZpeChjb2RlLCBuKTtcbiAgICAgIHJldC5wdXNoKCcnICsga2V5ICsgc3VmZml4KTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgUGx1cmFsUmVzb2x2ZXIucHJvdG90eXBlLmdldFN1ZmZpeCA9IGZ1bmN0aW9uIGdldFN1ZmZpeChjb2RlLCBjb3VudCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdmFyIHJ1bGUgPSB0aGlzLmdldFJ1bGUoY29kZSk7XG5cbiAgICBpZiAocnVsZSkge1xuICAgICAgLy8gaWYgKHJ1bGUubnVtYmVycy5sZW5ndGggPT09IDEpIHJldHVybiAnJzsgLy8gb25seSBzaW5ndWxhclxuXG4gICAgICB2YXIgaWR4ID0gcnVsZS5ub0FicyA/IHJ1bGUucGx1cmFscyhjb3VudCkgOiBydWxlLnBsdXJhbHMoTWF0aC5hYnMoY291bnQpKTtcbiAgICAgIHZhciBzdWZmaXggPSBydWxlLm51bWJlcnNbaWR4XTtcblxuICAgICAgLy8gc3BlY2lhbCB0cmVhdG1lbnQgZm9yIGxuZ3Mgb25seSBoYXZpbmcgc2luZ3VsYXIgYW5kIHBsdXJhbFxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaW1wbGlmeVBsdXJhbFN1ZmZpeCAmJiBydWxlLm51bWJlcnMubGVuZ3RoID09PSAyICYmIHJ1bGUubnVtYmVyc1swXSA9PT0gMSkge1xuICAgICAgICBpZiAoc3VmZml4ID09PSAyKSB7XG4gICAgICAgICAgc3VmZml4ID0gJ3BsdXJhbCc7XG4gICAgICAgIH0gZWxzZSBpZiAoc3VmZml4ID09PSAxKSB7XG4gICAgICAgICAgc3VmZml4ID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHJldHVyblN1ZmZpeCA9IGZ1bmN0aW9uIHJldHVyblN1ZmZpeCgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5vcHRpb25zLnByZXBlbmQgJiYgc3VmZml4LnRvU3RyaW5nKCkgPyBfdGhpczIub3B0aW9ucy5wcmVwZW5kICsgc3VmZml4LnRvU3RyaW5nKCkgOiBzdWZmaXgudG9TdHJpbmcoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIENPTVBBVElCSUxJVFkgSlNPTlxuICAgICAgLy8gdjFcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29tcGF0aWJpbGl0eUpTT04gPT09ICd2MScpIHtcbiAgICAgICAgaWYgKHN1ZmZpeCA9PT0gMSkgcmV0dXJuICcnO1xuICAgICAgICBpZiAodHlwZW9mIHN1ZmZpeCA9PT0gJ251bWJlcicpIHJldHVybiAnX3BsdXJhbF8nICsgc3VmZml4LnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiByZXR1cm5TdWZmaXgoKTtcbiAgICAgIH0gZWxzZSBpZiAoIC8qIHYyICovdGhpcy5vcHRpb25zLmNvbXBhdGliaWxpdHlKU09OID09PSAndjInIHx8IHJ1bGUubnVtYmVycy5sZW5ndGggPT09IDIgJiYgcnVsZS5udW1iZXJzWzBdID09PSAxKSB7XG4gICAgICAgIHJldHVybiByZXR1cm5TdWZmaXgoKTtcbiAgICAgIH0gZWxzZSBpZiAoIC8qIHYzIC0gZ2V0dGV4dCBpbmRleCAqL3J1bGUubnVtYmVycy5sZW5ndGggPT09IDIgJiYgcnVsZS5udW1iZXJzWzBdID09PSAxKSB7XG4gICAgICAgIHJldHVybiByZXR1cm5TdWZmaXgoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucHJlcGVuZCAmJiBpZHgudG9TdHJpbmcoKSA/IHRoaXMub3B0aW9ucy5wcmVwZW5kICsgaWR4LnRvU3RyaW5nKCkgOiBpZHgudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBwbHVyYWwgcnVsZSBmb3VuZCBmb3I6ICcgKyBjb2RlKTtcbiAgICByZXR1cm4gJyc7XG4gIH07XG5cbiAgcmV0dXJuIFBsdXJhbFJlc29sdmVyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBQbHVyYWxSZXNvbHZlcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfRXZlbnRFbWl0dGVyMiA9IHJlcXVpcmUoJy4vRXZlbnRFbWl0dGVyLmpzJyk7XG5cbnZhciBfRXZlbnRFbWl0dGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0V2ZW50RW1pdHRlcjIpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuXG52YXIgdXRpbHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfZGVmYXVsdHMob2JqLCBkZWZhdWx0cykgeyB2YXIga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRlZmF1bHRzKTsgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7IHZhciBrZXkgPSBrZXlzW2ldOyB2YXIgdmFsdWUgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGRlZmF1bHRzLCBrZXkpOyBpZiAodmFsdWUgJiYgdmFsdWUuY29uZmlndXJhYmxlICYmIG9ialtrZXldID09PSB1bmRlZmluZWQpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSk7IH0gfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IF9kZWZhdWx0cyhzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxudmFyIFJlc291cmNlU3RvcmUgPSBmdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoUmVzb3VyY2VTdG9yZSwgX0V2ZW50RW1pdHRlcik7XG5cbiAgZnVuY3Rpb24gUmVzb3VyY2VTdG9yZShkYXRhKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHsgbnM6IFsndHJhbnNsYXRpb24nXSwgZGVmYXVsdE5TOiAndHJhbnNsYXRpb24nIH07XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVzb3VyY2VTdG9yZSk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfRXZlbnRFbWl0dGVyLmNhbGwodGhpcykpO1xuXG4gICAgX3RoaXMuZGF0YSA9IGRhdGEgfHwge307XG4gICAgX3RoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgUmVzb3VyY2VTdG9yZS5wcm90b3R5cGUuYWRkTmFtZXNwYWNlcyA9IGZ1bmN0aW9uIGFkZE5hbWVzcGFjZXMobnMpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLm5zLmluZGV4T2YobnMpIDwgMCkge1xuICAgICAgdGhpcy5vcHRpb25zLm5zLnB1c2gobnMpO1xuICAgIH1cbiAgfTtcblxuICBSZXNvdXJjZVN0b3JlLnByb3RvdHlwZS5yZW1vdmVOYW1lc3BhY2VzID0gZnVuY3Rpb24gcmVtb3ZlTmFtZXNwYWNlcyhucykge1xuICAgIHZhciBpbmRleCA9IHRoaXMub3B0aW9ucy5ucy5pbmRleE9mKG5zKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5vcHRpb25zLm5zLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9O1xuXG4gIFJlc291cmNlU3RvcmUucHJvdG90eXBlLmdldFJlc291cmNlID0gZnVuY3Rpb24gZ2V0UmVzb3VyY2UobG5nLCBucywga2V5KSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHt9O1xuXG4gICAgdmFyIGtleVNlcGFyYXRvciA9IG9wdGlvbnMua2V5U2VwYXJhdG9yIHx8IHRoaXMub3B0aW9ucy5rZXlTZXBhcmF0b3I7XG4gICAgaWYgKGtleVNlcGFyYXRvciA9PT0gdW5kZWZpbmVkKSBrZXlTZXBhcmF0b3IgPSAnLic7XG5cbiAgICB2YXIgcGF0aCA9IFtsbmcsIG5zXTtcbiAgICBpZiAoa2V5ICYmIHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSBwYXRoID0gcGF0aC5jb25jYXQoa2V5KTtcbiAgICBpZiAoa2V5ICYmIHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSBwYXRoID0gcGF0aC5jb25jYXQoa2V5U2VwYXJhdG9yID8ga2V5LnNwbGl0KGtleVNlcGFyYXRvcikgOiBrZXkpO1xuXG4gICAgaWYgKGxuZy5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgcGF0aCA9IGxuZy5zcGxpdCgnLicpO1xuICAgIH1cblxuICAgIHJldHVybiB1dGlscy5nZXRQYXRoKHRoaXMuZGF0YSwgcGF0aCk7XG4gIH07XG5cbiAgUmVzb3VyY2VTdG9yZS5wcm90b3R5cGUuYWRkUmVzb3VyY2UgPSBmdW5jdGlvbiBhZGRSZXNvdXJjZShsbmcsIG5zLCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IHsgc2lsZW50OiBmYWxzZSB9O1xuXG4gICAgdmFyIGtleVNlcGFyYXRvciA9IHRoaXMub3B0aW9ucy5rZXlTZXBhcmF0b3I7XG4gICAgaWYgKGtleVNlcGFyYXRvciA9PT0gdW5kZWZpbmVkKSBrZXlTZXBhcmF0b3IgPSAnLic7XG5cbiAgICB2YXIgcGF0aCA9IFtsbmcsIG5zXTtcbiAgICBpZiAoa2V5KSBwYXRoID0gcGF0aC5jb25jYXQoa2V5U2VwYXJhdG9yID8ga2V5LnNwbGl0KGtleVNlcGFyYXRvcikgOiBrZXkpO1xuXG4gICAgaWYgKGxuZy5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgcGF0aCA9IGxuZy5zcGxpdCgnLicpO1xuICAgICAgdmFsdWUgPSBucztcbiAgICAgIG5zID0gcGF0aFsxXTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE5hbWVzcGFjZXMobnMpO1xuXG4gICAgdXRpbHMuc2V0UGF0aCh0aGlzLmRhdGEsIHBhdGgsIHZhbHVlKTtcblxuICAgIGlmICghb3B0aW9ucy5zaWxlbnQpIHRoaXMuZW1pdCgnYWRkZWQnLCBsbmcsIG5zLCBrZXksIHZhbHVlKTtcbiAgfTtcblxuICBSZXNvdXJjZVN0b3JlLnByb3RvdHlwZS5hZGRSZXNvdXJjZXMgPSBmdW5jdGlvbiBhZGRSZXNvdXJjZXMobG5nLCBucywgcmVzb3VyY2VzKSB7XG4gICAgLyogZXNsaW50IG5vLXJlc3RyaWN0ZWQtc3ludGF4OiAwICovXG4gICAgZm9yICh2YXIgbSBpbiByZXNvdXJjZXMpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVzb3VyY2VzW21dID09PSAnc3RyaW5nJykgdGhpcy5hZGRSZXNvdXJjZShsbmcsIG5zLCBtLCByZXNvdXJjZXNbbV0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgIH1cbiAgICB0aGlzLmVtaXQoJ2FkZGVkJywgbG5nLCBucywgcmVzb3VyY2VzKTtcbiAgfTtcblxuICBSZXNvdXJjZVN0b3JlLnByb3RvdHlwZS5hZGRSZXNvdXJjZUJ1bmRsZSA9IGZ1bmN0aW9uIGFkZFJlc291cmNlQnVuZGxlKGxuZywgbnMsIHJlc291cmNlcywgZGVlcCwgb3ZlcndyaXRlKSB7XG4gICAgdmFyIHBhdGggPSBbbG5nLCBuc107XG4gICAgaWYgKGxuZy5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgcGF0aCA9IGxuZy5zcGxpdCgnLicpO1xuICAgICAgZGVlcCA9IHJlc291cmNlcztcbiAgICAgIHJlc291cmNlcyA9IG5zO1xuICAgICAgbnMgPSBwYXRoWzFdO1xuICAgIH1cblxuICAgIHRoaXMuYWRkTmFtZXNwYWNlcyhucyk7XG5cbiAgICB2YXIgcGFjayA9IHV0aWxzLmdldFBhdGgodGhpcy5kYXRhLCBwYXRoKSB8fCB7fTtcblxuICAgIGlmIChkZWVwKSB7XG4gICAgICB1dGlscy5kZWVwRXh0ZW5kKHBhY2ssIHJlc291cmNlcywgb3ZlcndyaXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFjayA9IF9leHRlbmRzKHt9LCBwYWNrLCByZXNvdXJjZXMpO1xuICAgIH1cblxuICAgIHV0aWxzLnNldFBhdGgodGhpcy5kYXRhLCBwYXRoLCBwYWNrKTtcblxuICAgIHRoaXMuZW1pdCgnYWRkZWQnLCBsbmcsIG5zLCByZXNvdXJjZXMpO1xuICB9O1xuXG4gIFJlc291cmNlU3RvcmUucHJvdG90eXBlLnJlbW92ZVJlc291cmNlQnVuZGxlID0gZnVuY3Rpb24gcmVtb3ZlUmVzb3VyY2VCdW5kbGUobG5nLCBucykge1xuICAgIGlmICh0aGlzLmhhc1Jlc291cmNlQnVuZGxlKGxuZywgbnMpKSB7XG4gICAgICBkZWxldGUgdGhpcy5kYXRhW2xuZ11bbnNdO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZU5hbWVzcGFjZXMobnMpO1xuXG4gICAgdGhpcy5lbWl0KCdyZW1vdmVkJywgbG5nLCBucyk7XG4gIH07XG5cbiAgUmVzb3VyY2VTdG9yZS5wcm90b3R5cGUuaGFzUmVzb3VyY2VCdW5kbGUgPSBmdW5jdGlvbiBoYXNSZXNvdXJjZUJ1bmRsZShsbmcsIG5zKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2UobG5nLCBucykgIT09IHVuZGVmaW5lZDtcbiAgfTtcblxuICBSZXNvdXJjZVN0b3JlLnByb3RvdHlwZS5nZXRSZXNvdXJjZUJ1bmRsZSA9IGZ1bmN0aW9uIGdldFJlc291cmNlQnVuZGxlKGxuZywgbnMpIHtcbiAgICBpZiAoIW5zKSBucyA9IHRoaXMub3B0aW9ucy5kZWZhdWx0TlM7XG5cbiAgICAvLyBDT01QQVRJQklMSVRZOiByZW1vdmUgZXh0ZW5kIGluIHYyLjEuMFxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29tcGF0aWJpbGl0eUFQSSA9PT0gJ3YxJykgcmV0dXJuIF9leHRlbmRzKHt9LCB0aGlzLmdldFJlc291cmNlKGxuZywgbnMpKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlKGxuZywgbnMpO1xuICB9O1xuXG4gIFJlc291cmNlU3RvcmUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9O1xuXG4gIHJldHVybiBSZXNvdXJjZVN0b3JlO1xufShfRXZlbnRFbWl0dGVyMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUmVzb3VyY2VTdG9yZTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9sb2dnZXIgPSByZXF1aXJlKCcuL2xvZ2dlci5qcycpO1xuXG52YXIgX2xvZ2dlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sb2dnZXIpO1xuXG52YXIgX0V2ZW50RW1pdHRlcjIgPSByZXF1aXJlKCcuL0V2ZW50RW1pdHRlci5qcycpO1xuXG52YXIgX0V2ZW50RW1pdHRlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FdmVudEVtaXR0ZXIyKTtcblxudmFyIF9wb3N0UHJvY2Vzc29yID0gcmVxdWlyZSgnLi9wb3N0UHJvY2Vzc29yLmpzJyk7XG5cbnZhciBfcG9zdFByb2Nlc3NvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3N0UHJvY2Vzc29yKTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcblxudmFyIHV0aWxzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWxzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmF1bHRzKG9iaiwgZGVmYXVsdHMpIHsgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkZWZhdWx0cyk7IGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykgeyB2YXIga2V5ID0ga2V5c1tpXTsgdmFyIHZhbHVlID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkZWZhdWx0cywga2V5KTsgaWYgKHZhbHVlICYmIHZhbHVlLmNvbmZpZ3VyYWJsZSAmJiBvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpOyB9IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBfZGVmYXVsdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbnZhciBUcmFuc2xhdG9yID0gZnVuY3Rpb24gKF9FdmVudEVtaXR0ZXIpIHtcbiAgX2luaGVyaXRzKFRyYW5zbGF0b3IsIF9FdmVudEVtaXR0ZXIpO1xuXG4gIGZ1bmN0aW9uIFRyYW5zbGF0b3Ioc2VydmljZXMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVHJhbnNsYXRvcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfRXZlbnRFbWl0dGVyLmNhbGwodGhpcykpO1xuXG4gICAgdXRpbHMuY29weShbJ3Jlc291cmNlU3RvcmUnLCAnbGFuZ3VhZ2VVdGlscycsICdwbHVyYWxSZXNvbHZlcicsICdpbnRlcnBvbGF0b3InLCAnYmFja2VuZENvbm5lY3RvciddLCBzZXJ2aWNlcywgX3RoaXMpO1xuXG4gICAgX3RoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgX3RoaXMubG9nZ2VyID0gX2xvZ2dlcjIuZGVmYXVsdC5jcmVhdGUoJ3RyYW5zbGF0b3InKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBUcmFuc2xhdG9yLnByb3RvdHlwZS5jaGFuZ2VMYW5ndWFnZSA9IGZ1bmN0aW9uIGNoYW5nZUxhbmd1YWdlKGxuZykge1xuICAgIGlmIChsbmcpIHRoaXMubGFuZ3VhZ2UgPSBsbmc7XG4gIH07XG5cbiAgVHJhbnNsYXRvci5wcm90b3R5cGUuZXhpc3RzID0gZnVuY3Rpb24gZXhpc3RzKGtleSkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7IGludGVycG9sYXRpb246IHt9IH07XG5cbiAgICB2YXIgcmVzb2x2ZWQgPSB0aGlzLnJlc29sdmUoa2V5LCBvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzb2x2ZWQgJiYgcmVzb2x2ZWQucmVzICE9PSB1bmRlZmluZWQ7XG4gIH07XG5cbiAgVHJhbnNsYXRvci5wcm90b3R5cGUuZXh0cmFjdEZyb21LZXkgPSBmdW5jdGlvbiBleHRyYWN0RnJvbUtleShrZXksIG9wdGlvbnMpIHtcbiAgICB2YXIgbnNTZXBhcmF0b3IgPSBvcHRpb25zLm5zU2VwYXJhdG9yIHx8IHRoaXMub3B0aW9ucy5uc1NlcGFyYXRvcjtcbiAgICBpZiAobnNTZXBhcmF0b3IgPT09IHVuZGVmaW5lZCkgbnNTZXBhcmF0b3IgPSAnOic7XG4gICAgdmFyIGtleVNlcGFyYXRvciA9IG9wdGlvbnMua2V5U2VwYXJhdG9yIHx8IHRoaXMub3B0aW9ucy5rZXlTZXBhcmF0b3IgfHwgJy4nO1xuXG4gICAgdmFyIG5hbWVzcGFjZXMgPSBvcHRpb25zLm5zIHx8IHRoaXMub3B0aW9ucy5kZWZhdWx0TlM7XG4gICAgaWYgKG5zU2VwYXJhdG9yICYmIGtleS5pbmRleE9mKG5zU2VwYXJhdG9yKSA+IC0xKSB7XG4gICAgICB2YXIgcGFydHMgPSBrZXkuc3BsaXQobnNTZXBhcmF0b3IpO1xuICAgICAgaWYgKG5zU2VwYXJhdG9yICE9PSBrZXlTZXBhcmF0b3IgfHwgbnNTZXBhcmF0b3IgPT09IGtleVNlcGFyYXRvciAmJiB0aGlzLm9wdGlvbnMubnMuaW5kZXhPZihwYXJ0c1swXSkgPiAtMSkgbmFtZXNwYWNlcyA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgICBrZXkgPSBwYXJ0cy5qb2luKGtleVNlcGFyYXRvcik7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycpIG5hbWVzcGFjZXMgPSBbbmFtZXNwYWNlc107XG5cbiAgICByZXR1cm4ge1xuICAgICAga2V5OiBrZXksXG4gICAgICBuYW1lc3BhY2VzOiBuYW1lc3BhY2VzXG4gICAgfTtcbiAgfTtcblxuICBUcmFuc2xhdG9yLnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiB0cmFuc2xhdGUoa2V5cywgb3B0aW9ucykge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgaWYgKCh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob3B0aW9ucykpICE9PSAnb2JqZWN0JyAmJiB0aGlzLm9wdGlvbnMub3ZlcmxvYWRUcmFuc2xhdGlvbk9wdGlvbkhhbmRsZXIpIHtcbiAgICAgIC8qIGVzbGludCBwcmVmZXItcmVzdC1wYXJhbXM6IDAgKi9cbiAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMub3ZlcmxvYWRUcmFuc2xhdGlvbk9wdGlvbkhhbmRsZXIoYXJndW1lbnRzKTtcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG5cbiAgICAvLyBub24gdmFsaWQga2V5cyBoYW5kbGluZ1xuICAgIGlmIChrZXlzID09PSB1bmRlZmluZWQgfHwga2V5cyA9PT0gbnVsbCB8fCBrZXlzID09PSAnJykgcmV0dXJuICcnO1xuICAgIGlmICh0eXBlb2Yga2V5cyA9PT0gJ251bWJlcicpIGtleXMgPSBTdHJpbmcoa2V5cyk7XG4gICAgaWYgKHR5cGVvZiBrZXlzID09PSAnc3RyaW5nJykga2V5cyA9IFtrZXlzXTtcblxuICAgIC8vIHNlcGFyYXRvcnNcbiAgICB2YXIga2V5U2VwYXJhdG9yID0gb3B0aW9ucy5rZXlTZXBhcmF0b3IgfHwgdGhpcy5vcHRpb25zLmtleVNlcGFyYXRvciB8fCAnLic7XG5cbiAgICAvLyBnZXQgbmFtZXNwYWNlKHMpXG5cbiAgICB2YXIgX2V4dHJhY3RGcm9tS2V5ID0gdGhpcy5leHRyYWN0RnJvbUtleShrZXlzW2tleXMubGVuZ3RoIC0gMV0sIG9wdGlvbnMpLFxuICAgICAgICBrZXkgPSBfZXh0cmFjdEZyb21LZXkua2V5LFxuICAgICAgICBuYW1lc3BhY2VzID0gX2V4dHJhY3RGcm9tS2V5Lm5hbWVzcGFjZXM7XG5cbiAgICB2YXIgbmFtZXNwYWNlID0gbmFtZXNwYWNlc1tuYW1lc3BhY2VzLmxlbmd0aCAtIDFdO1xuXG4gICAgLy8gcmV0dXJuIGtleSBvbiBDSU1vZGVcbiAgICB2YXIgbG5nID0gb3B0aW9ucy5sbmcgfHwgdGhpcy5sYW5ndWFnZTtcbiAgICB2YXIgYXBwZW5kTmFtZXNwYWNlVG9DSU1vZGUgPSBvcHRpb25zLmFwcGVuZE5hbWVzcGFjZVRvQ0lNb2RlIHx8IHRoaXMub3B0aW9ucy5hcHBlbmROYW1lc3BhY2VUb0NJTW9kZTtcbiAgICBpZiAobG5nICYmIGxuZy50b0xvd2VyQ2FzZSgpID09PSAnY2ltb2RlJykge1xuICAgICAgaWYgKGFwcGVuZE5hbWVzcGFjZVRvQ0lNb2RlKSB7XG4gICAgICAgIHZhciBuc1NlcGFyYXRvciA9IG9wdGlvbnMubnNTZXBhcmF0b3IgfHwgdGhpcy5vcHRpb25zLm5zU2VwYXJhdG9yO1xuICAgICAgICByZXR1cm4gbmFtZXNwYWNlICsgbnNTZXBhcmF0b3IgKyBrZXk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBmcm9tIHN0b3JlXG4gICAgdmFyIHJlc29sdmVkID0gdGhpcy5yZXNvbHZlKGtleXMsIG9wdGlvbnMpO1xuICAgIHZhciByZXMgPSByZXNvbHZlZCAmJiByZXNvbHZlZC5yZXM7XG4gICAgdmFyIHJlc1VzZWRLZXkgPSByZXNvbHZlZCAmJiByZXNvbHZlZC51c2VkS2V5IHx8IGtleTtcblxuICAgIHZhciByZXNUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseShyZXMpO1xuICAgIHZhciBub09iamVjdCA9IFsnW29iamVjdCBOdW1iZXJdJywgJ1tvYmplY3QgRnVuY3Rpb25dJywgJ1tvYmplY3QgUmVnRXhwXSddO1xuICAgIHZhciBqb2luQXJyYXlzID0gb3B0aW9ucy5qb2luQXJyYXlzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmpvaW5BcnJheXMgOiB0aGlzLm9wdGlvbnMuam9pbkFycmF5cztcblxuICAgIC8vIG9iamVjdFxuICAgIHZhciBoYW5kbGVBc09iamVjdCA9IHR5cGVvZiByZXMgIT09ICdzdHJpbmcnICYmIHR5cGVvZiByZXMgIT09ICdib29sZWFuJyAmJiB0eXBlb2YgcmVzICE9PSAnbnVtYmVyJztcbiAgICBpZiAocmVzICYmIGhhbmRsZUFzT2JqZWN0ICYmIG5vT2JqZWN0LmluZGV4T2YocmVzVHlwZSkgPCAwICYmICEoam9pbkFycmF5cyAmJiByZXNUeXBlID09PSAnW29iamVjdCBBcnJheV0nKSkge1xuICAgICAgaWYgKCFvcHRpb25zLnJldHVybk9iamVjdHMgJiYgIXRoaXMub3B0aW9ucy5yZXR1cm5PYmplY3RzKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2FjY2Vzc2luZyBhbiBvYmplY3QgLSBidXQgcmV0dXJuT2JqZWN0cyBvcHRpb25zIGlzIG5vdCBlbmFibGVkIScpO1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJldHVybmVkT2JqZWN0SGFuZGxlciA/IHRoaXMub3B0aW9ucy5yZXR1cm5lZE9iamVjdEhhbmRsZXIocmVzVXNlZEtleSwgcmVzLCBvcHRpb25zKSA6ICdrZXkgXFwnJyArIGtleSArICcgKCcgKyB0aGlzLmxhbmd1YWdlICsgJylcXCcgcmV0dXJuZWQgYW4gb2JqZWN0IGluc3RlYWQgb2Ygc3RyaW5nLic7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHdlIGdvdCBhIHNlcGFyYXRvciB3ZSBsb29wIG92ZXIgY2hpbGRyZW4gLSBlbHNlIHdlIGp1c3QgcmV0dXJuIG9iamVjdCBhcyBpc1xuICAgICAgLy8gYXMgaGF2aW5nIGl0IHNldCB0byBmYWxzZSBtZWFucyBubyBoaWVyYXJjaHkgc28gbm8gbG9va3VwIGZvciBuZXN0ZWQgdmFsdWVzXG4gICAgICBpZiAob3B0aW9ucy5rZXlTZXBhcmF0b3IgfHwgdGhpcy5vcHRpb25zLmtleVNlcGFyYXRvcikge1xuICAgICAgICB2YXIgY29weSA9IHJlc1R5cGUgPT09ICdbb2JqZWN0IEFycmF5XScgPyBbXSA6IHt9OyAvLyBhcHBseSBjaGlsZCB0cmFuc2xhdGlvbiBvbiBhIGNvcHlcblxuICAgICAgICAvKiBlc2xpbnQgbm8tcmVzdHJpY3RlZC1zeW50YXg6IDAgKi9cbiAgICAgICAgZm9yICh2YXIgbSBpbiByZXMpIHtcbiAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlcywgbSkpIHtcbiAgICAgICAgICAgIHZhciBkZWVwS2V5ID0gJycgKyByZXNVc2VkS2V5ICsga2V5U2VwYXJhdG9yICsgbTtcbiAgICAgICAgICAgIGNvcHlbbV0gPSB0aGlzLnRyYW5zbGF0ZShkZWVwS2V5LCBfZXh0ZW5kcyh7fSwgb3B0aW9ucywgeyBqb2luQXJyYXlzOiBmYWxzZSwgbnM6IG5hbWVzcGFjZXMgfSkpO1xuICAgICAgICAgICAgaWYgKGNvcHlbbV0gPT09IGRlZXBLZXkpIGNvcHlbbV0gPSByZXNbbV07IC8vIGlmIG5vdGhpbmcgZm91bmQgdXNlIG9yZ2luYWwgdmFsdWUgYXMgZmFsbGJhY2tcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzID0gY29weTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGpvaW5BcnJheXMgJiYgcmVzVHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgLy8gYXJyYXkgc3BlY2lhbCB0cmVhdG1lbnRcbiAgICAgIHJlcyA9IHJlcy5qb2luKGpvaW5BcnJheXMpO1xuICAgICAgaWYgKHJlcykgcmVzID0gdGhpcy5leHRlbmRUcmFuc2xhdGlvbihyZXMsIGtleXMsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzdHJpbmcsIGVtcHR5IG9yIG51bGxcbiAgICAgIHZhciB1c2VkRGVmYXVsdCA9IGZhbHNlO1xuICAgICAgdmFyIHVzZWRLZXkgPSBmYWxzZTtcblxuICAgICAgLy8gZmFsbGJhY2sgdmFsdWVcbiAgICAgIGlmICghdGhpcy5pc1ZhbGlkTG9va3VwKHJlcykgJiYgb3B0aW9ucy5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB1c2VkRGVmYXVsdCA9IHRydWU7XG4gICAgICAgIHJlcyA9IG9wdGlvbnMuZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmlzVmFsaWRMb29rdXAocmVzKSkge1xuICAgICAgICB1c2VkS2V5ID0gdHJ1ZTtcbiAgICAgICAgcmVzID0ga2V5O1xuICAgICAgfVxuXG4gICAgICAvLyBzYXZlIG1pc3NpbmdcbiAgICAgIHZhciB1cGRhdGVNaXNzaW5nID0gb3B0aW9ucy5kZWZhdWx0VmFsdWUgJiYgb3B0aW9ucy5kZWZhdWx0VmFsdWUgIT09IHJlcyAmJiB0aGlzLm9wdGlvbnMudXBkYXRlTWlzc2luZztcbiAgICAgIGlmICh1c2VkS2V5IHx8IHVzZWREZWZhdWx0IHx8IHVwZGF0ZU1pc3NpbmcpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKHVwZGF0ZU1pc3NpbmcgPyAndXBkYXRlS2V5JyA6ICdtaXNzaW5nS2V5JywgbG5nLCBuYW1lc3BhY2UsIGtleSwgdXBkYXRlTWlzc2luZyA/IG9wdGlvbnMuZGVmYXVsdFZhbHVlIDogcmVzKTtcblxuICAgICAgICB2YXIgbG5ncyA9IFtdO1xuICAgICAgICB2YXIgZmFsbGJhY2tMbmdzID0gdGhpcy5sYW5ndWFnZVV0aWxzLmdldEZhbGxiYWNrQ29kZXModGhpcy5vcHRpb25zLmZhbGxiYWNrTG5nLCBvcHRpb25zLmxuZyB8fCB0aGlzLmxhbmd1YWdlKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zYXZlTWlzc2luZ1RvID09PSAnZmFsbGJhY2snICYmIGZhbGxiYWNrTG5ncyAmJiBmYWxsYmFja0xuZ3NbMF0pIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZhbGxiYWNrTG5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbG5ncy5wdXNoKGZhbGxiYWNrTG5nc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5zYXZlTWlzc2luZ1RvID09PSAnYWxsJykge1xuICAgICAgICAgIGxuZ3MgPSB0aGlzLmxhbmd1YWdlVXRpbHMudG9SZXNvbHZlSGllcmFyY2h5KG9wdGlvbnMubG5nIHx8IHRoaXMubGFuZ3VhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxuZ3MucHVzaChvcHRpb25zLmxuZyB8fCB0aGlzLmxhbmd1YWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZW5kID0gZnVuY3Rpb24gc2VuZChsLCBrKSB7XG4gICAgICAgICAgaWYgKF90aGlzMi5vcHRpb25zLm1pc3NpbmdLZXlIYW5kbGVyKSB7XG4gICAgICAgICAgICBfdGhpczIub3B0aW9ucy5taXNzaW5nS2V5SGFuZGxlcihsLCBuYW1lc3BhY2UsIGssIHVwZGF0ZU1pc3NpbmcgPyBvcHRpb25zLmRlZmF1bHRWYWx1ZSA6IHJlcywgdXBkYXRlTWlzc2luZywgb3B0aW9ucyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChfdGhpczIuYmFja2VuZENvbm5lY3RvciAmJiBfdGhpczIuYmFja2VuZENvbm5lY3Rvci5zYXZlTWlzc2luZykge1xuICAgICAgICAgICAgX3RoaXMyLmJhY2tlbmRDb25uZWN0b3Iuc2F2ZU1pc3NpbmcobCwgbmFtZXNwYWNlLCBrLCB1cGRhdGVNaXNzaW5nID8gb3B0aW9ucy5kZWZhdWx0VmFsdWUgOiByZXMsIHVwZGF0ZU1pc3NpbmcsIG9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpczIuZW1pdCgnbWlzc2luZ0tleScsIGwsIG5hbWVzcGFjZSwgaywgcmVzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNhdmVNaXNzaW5nKSB7XG4gICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zYXZlTWlzc2luZ1BsdXJhbHMgJiYgb3B0aW9ucy5jb3VudCkge1xuICAgICAgICAgICAgbG5ncy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICAgIHZhciBwbHVyYWxzID0gX3RoaXMyLnBsdXJhbFJlc29sdmVyLmdldFBsdXJhbEZvcm1zT2ZLZXkobCwga2V5KTtcblxuICAgICAgICAgICAgICBwbHVyYWxzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VuZChbbF0sIHApO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZW5kKGxuZ3MsIGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGV4dGVuZFxuICAgICAgcmVzID0gdGhpcy5leHRlbmRUcmFuc2xhdGlvbihyZXMsIGtleXMsIG9wdGlvbnMpO1xuXG4gICAgICAvLyBhcHBlbmQgbmFtZXNwYWNlIGlmIHN0aWxsIGtleVxuICAgICAgaWYgKHVzZWRLZXkgJiYgcmVzID09PSBrZXkgJiYgdGhpcy5vcHRpb25zLmFwcGVuZE5hbWVzcGFjZVRvTWlzc2luZ0tleSkgcmVzID0gbmFtZXNwYWNlICsgJzonICsga2V5O1xuXG4gICAgICAvLyBwYXJzZU1pc3NpbmdLZXlIYW5kbGVyXG4gICAgICBpZiAodXNlZEtleSAmJiB0aGlzLm9wdGlvbnMucGFyc2VNaXNzaW5nS2V5SGFuZGxlcikgcmVzID0gdGhpcy5vcHRpb25zLnBhcnNlTWlzc2luZ0tleUhhbmRsZXIocmVzKTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIFRyYW5zbGF0b3IucHJvdG90eXBlLmV4dGVuZFRyYW5zbGF0aW9uID0gZnVuY3Rpb24gZXh0ZW5kVHJhbnNsYXRpb24ocmVzLCBrZXksIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIGlmIChvcHRpb25zLmludGVycG9sYXRpb24pIHRoaXMuaW50ZXJwb2xhdG9yLmluaXQoX2V4dGVuZHMoe30sIG9wdGlvbnMsIHsgaW50ZXJwb2xhdGlvbjogX2V4dGVuZHMoe30sIHRoaXMub3B0aW9ucy5pbnRlcnBvbGF0aW9uLCBvcHRpb25zLmludGVycG9sYXRpb24pIH0pKTtcblxuICAgIC8vIGludGVycG9sYXRlXG4gICAgdmFyIGRhdGEgPSBvcHRpb25zLnJlcGxhY2UgJiYgdHlwZW9mIG9wdGlvbnMucmVwbGFjZSAhPT0gJ3N0cmluZycgPyBvcHRpb25zLnJlcGxhY2UgOiBvcHRpb25zO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaW50ZXJwb2xhdGlvbi5kZWZhdWx0VmFyaWFibGVzKSBkYXRhID0gX2V4dGVuZHMoe30sIHRoaXMub3B0aW9ucy5pbnRlcnBvbGF0aW9uLmRlZmF1bHRWYXJpYWJsZXMsIGRhdGEpO1xuICAgIHJlcyA9IHRoaXMuaW50ZXJwb2xhdG9yLmludGVycG9sYXRlKHJlcywgZGF0YSwgb3B0aW9ucy5sbmcgfHwgdGhpcy5sYW5ndWFnZSk7XG5cbiAgICAvLyBuZXN0aW5nXG4gICAgaWYgKG9wdGlvbnMubmVzdCAhPT0gZmFsc2UpIHJlcyA9IHRoaXMuaW50ZXJwb2xhdG9yLm5lc3QocmVzLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMzLnRyYW5zbGF0ZS5hcHBseShfdGhpczMsIGFyZ3VtZW50cyk7XG4gICAgfSwgb3B0aW9ucyk7XG5cbiAgICBpZiAob3B0aW9ucy5pbnRlcnBvbGF0aW9uKSB0aGlzLmludGVycG9sYXRvci5yZXNldCgpO1xuXG4gICAgLy8gcG9zdCBwcm9jZXNzXG4gICAgdmFyIHBvc3RQcm9jZXNzID0gb3B0aW9ucy5wb3N0UHJvY2VzcyB8fCB0aGlzLm9wdGlvbnMucG9zdFByb2Nlc3M7XG4gICAgdmFyIHBvc3RQcm9jZXNzb3JOYW1lcyA9IHR5cGVvZiBwb3N0UHJvY2VzcyA9PT0gJ3N0cmluZycgPyBbcG9zdFByb2Nlc3NdIDogcG9zdFByb2Nlc3M7XG5cbiAgICBpZiAocmVzICE9PSB1bmRlZmluZWQgJiYgcmVzICE9PSBudWxsICYmIHBvc3RQcm9jZXNzb3JOYW1lcyAmJiBwb3N0UHJvY2Vzc29yTmFtZXMubGVuZ3RoICYmIG9wdGlvbnMuYXBwbHlQb3N0UHJvY2Vzc29yICE9PSBmYWxzZSkge1xuICAgICAgcmVzID0gX3Bvc3RQcm9jZXNzb3IyLmRlZmF1bHQuaGFuZGxlKHBvc3RQcm9jZXNzb3JOYW1lcywgcmVzLCBrZXksIG9wdGlvbnMsIHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgVHJhbnNsYXRvci5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUoa2V5cykge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgdmFyIGZvdW5kID0gdm9pZCAwO1xuICAgIHZhciB1c2VkS2V5ID0gdm9pZCAwO1xuXG4gICAgaWYgKHR5cGVvZiBrZXlzID09PSAnc3RyaW5nJykga2V5cyA9IFtrZXlzXTtcblxuICAgIC8vIGZvckVhY2ggcG9zc2libGUga2V5XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICBpZiAoX3RoaXM0LmlzVmFsaWRMb29rdXAoZm91bmQpKSByZXR1cm47XG4gICAgICB2YXIgZXh0cmFjdGVkID0gX3RoaXM0LmV4dHJhY3RGcm9tS2V5KGssIG9wdGlvbnMpO1xuICAgICAgdmFyIGtleSA9IGV4dHJhY3RlZC5rZXk7XG4gICAgICB1c2VkS2V5ID0ga2V5O1xuICAgICAgdmFyIG5hbWVzcGFjZXMgPSBleHRyYWN0ZWQubmFtZXNwYWNlcztcbiAgICAgIGlmIChfdGhpczQub3B0aW9ucy5mYWxsYmFja05TKSBuYW1lc3BhY2VzID0gbmFtZXNwYWNlcy5jb25jYXQoX3RoaXM0Lm9wdGlvbnMuZmFsbGJhY2tOUyk7XG5cbiAgICAgIHZhciBuZWVkc1BsdXJhbEhhbmRsaW5nID0gb3B0aW9ucy5jb3VudCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLmNvdW50ICE9PSAnc3RyaW5nJztcbiAgICAgIHZhciBuZWVkc0NvbnRleHRIYW5kbGluZyA9IG9wdGlvbnMuY29udGV4dCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLmNvbnRleHQgPT09ICdzdHJpbmcnICYmIG9wdGlvbnMuY29udGV4dCAhPT0gJyc7XG5cbiAgICAgIHZhciBjb2RlcyA9IG9wdGlvbnMubG5ncyA/IG9wdGlvbnMubG5ncyA6IF90aGlzNC5sYW5ndWFnZVV0aWxzLnRvUmVzb2x2ZUhpZXJhcmNoeShvcHRpb25zLmxuZyB8fCBfdGhpczQubGFuZ3VhZ2UpO1xuXG4gICAgICBuYW1lc3BhY2VzLmZvckVhY2goZnVuY3Rpb24gKG5zKSB7XG4gICAgICAgIGlmIChfdGhpczQuaXNWYWxpZExvb2t1cChmb3VuZCkpIHJldHVybjtcblxuICAgICAgICBjb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICAgICAgaWYgKF90aGlzNC5pc1ZhbGlkTG9va3VwKGZvdW5kKSkgcmV0dXJuO1xuXG4gICAgICAgICAgdmFyIGZpbmFsS2V5ID0ga2V5O1xuICAgICAgICAgIHZhciBmaW5hbEtleXMgPSBbZmluYWxLZXldO1xuXG4gICAgICAgICAgdmFyIHBsdXJhbFN1ZmZpeCA9IHZvaWQgMDtcbiAgICAgICAgICBpZiAobmVlZHNQbHVyYWxIYW5kbGluZykgcGx1cmFsU3VmZml4ID0gX3RoaXM0LnBsdXJhbFJlc29sdmVyLmdldFN1ZmZpeChjb2RlLCBvcHRpb25zLmNvdW50KTtcblxuICAgICAgICAgIC8vIGZhbGxiYWNrIGZvciBwbHVyYWwgaWYgY29udGV4dCBub3QgZm91bmRcbiAgICAgICAgICBpZiAobmVlZHNQbHVyYWxIYW5kbGluZyAmJiBuZWVkc0NvbnRleHRIYW5kbGluZykgZmluYWxLZXlzLnB1c2goZmluYWxLZXkgKyBwbHVyYWxTdWZmaXgpO1xuXG4gICAgICAgICAgLy8gZ2V0IGtleSBmb3IgY29udGV4dCBpZiBuZWVkZWRcbiAgICAgICAgICBpZiAobmVlZHNDb250ZXh0SGFuZGxpbmcpIGZpbmFsS2V5cy5wdXNoKGZpbmFsS2V5ICs9ICcnICsgX3RoaXM0Lm9wdGlvbnMuY29udGV4dFNlcGFyYXRvciArIG9wdGlvbnMuY29udGV4dCk7XG5cbiAgICAgICAgICAvLyBnZXQga2V5IGZvciBwbHVyYWwgaWYgbmVlZGVkXG4gICAgICAgICAgaWYgKG5lZWRzUGx1cmFsSGFuZGxpbmcpIGZpbmFsS2V5cy5wdXNoKGZpbmFsS2V5ICs9IHBsdXJhbFN1ZmZpeCk7XG5cbiAgICAgICAgICAvLyBpdGVyYXRlIG92ZXIgZmluYWxLZXlzIHN0YXJ0aW5nIHdpdGggbW9zdCBzcGVjaWZpYyBwbHVyYWxrZXkgKC0+IGNvbnRleHRrZXkgb25seSkgLT4gc2luZ3VsYXJrZXkgb25seVxuICAgICAgICAgIHZhciBwb3NzaWJsZUtleSA9IHZvaWQgMDtcbiAgICAgICAgICAvKiBlc2xpbnQgbm8tY29uZC1hc3NpZ246IDAgKi9cbiAgICAgICAgICB3aGlsZSAocG9zc2libGVLZXkgPSBmaW5hbEtleXMucG9wKCkpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXM0LmlzVmFsaWRMb29rdXAoZm91bmQpKSB7XG4gICAgICAgICAgICAgIGZvdW5kID0gX3RoaXM0LmdldFJlc291cmNlKGNvZGUsIG5zLCBwb3NzaWJsZUtleSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgcmVzOiBmb3VuZCwgdXNlZEtleTogdXNlZEtleSB9O1xuICB9O1xuXG4gIFRyYW5zbGF0b3IucHJvdG90eXBlLmlzVmFsaWRMb29rdXAgPSBmdW5jdGlvbiBpc1ZhbGlkTG9va3VwKHJlcykge1xuICAgIHJldHVybiByZXMgIT09IHVuZGVmaW5lZCAmJiAhKCF0aGlzLm9wdGlvbnMucmV0dXJuTnVsbCAmJiByZXMgPT09IG51bGwpICYmICEoIXRoaXMub3B0aW9ucy5yZXR1cm5FbXB0eVN0cmluZyAmJiByZXMgPT09ICcnKTtcbiAgfTtcblxuICBUcmFuc2xhdG9yLnByb3RvdHlwZS5nZXRSZXNvdXJjZSA9IGZ1bmN0aW9uIGdldFJlc291cmNlKGNvZGUsIG5zLCBrZXkpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDoge307XG5cbiAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVN0b3JlLmdldFJlc291cmNlKGNvZGUsIG5zLCBrZXksIG9wdGlvbnMpO1xuICB9O1xuXG4gIHJldHVybiBUcmFuc2xhdG9yO1xufShfRXZlbnRFbWl0dGVyMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVHJhbnNsYXRvcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnRyYW5zZm9ybU9wdGlvbnMgPSB0cmFuc2Zvcm1PcHRpb25zO1xuZnVuY3Rpb24gZ2V0KCkge1xuICByZXR1cm4ge1xuICAgIGRlYnVnOiBmYWxzZSxcbiAgICBpbml0SW1tZWRpYXRlOiB0cnVlLFxuXG4gICAgbnM6IFsndHJhbnNsYXRpb24nXSxcbiAgICBkZWZhdWx0TlM6IFsndHJhbnNsYXRpb24nXSxcbiAgICBmYWxsYmFja0xuZzogWydkZXYnXSxcbiAgICBmYWxsYmFja05TOiBmYWxzZSwgLy8gc3RyaW5nIG9yIGFycmF5IG9mIG5hbWVzcGFjZXNcblxuICAgIHdoaXRlbGlzdDogZmFsc2UsIC8vIGFycmF5IHdpdGggd2hpdGVsaXN0ZWQgbGFuZ3VhZ2VzXG4gICAgbm9uRXhwbGljaXRXaGl0ZWxpc3Q6IGZhbHNlLFxuICAgIGxvYWQ6ICdhbGwnLCAvLyB8IGN1cnJlbnRPbmx5IHwgbGFuZ3VhZ2VPbmx5XG4gICAgcHJlbG9hZDogZmFsc2UsIC8vIGFycmF5IHdpdGggcHJlbG9hZCBsYW5ndWFnZXNcblxuICAgIHNpbXBsaWZ5UGx1cmFsU3VmZml4OiB0cnVlLFxuICAgIGtleVNlcGFyYXRvcjogJy4nLFxuICAgIG5zU2VwYXJhdG9yOiAnOicsXG4gICAgcGx1cmFsU2VwYXJhdG9yOiAnXycsXG4gICAgY29udGV4dFNlcGFyYXRvcjogJ18nLFxuXG4gICAgc2F2ZU1pc3Npbmc6IGZhbHNlLCAvLyBlbmFibGUgdG8gc2VuZCBtaXNzaW5nIHZhbHVlc1xuICAgIHVwZGF0ZU1pc3Npbmc6IGZhbHNlLCAvLyBlbmFibGUgdG8gdXBkYXRlIGRlZmF1bHQgdmFsdWVzIGlmIGRpZmZlcmVudCBmcm9tIHRyYW5zbGF0ZWQgdmFsdWUgKG9ubHkgdXNlZnVsIG9uIGluaXRpYWwgZGV2ZWxvcG1lbnQsIG9yIHdoZW4ga2VlcGluZyBjb2RlIGFzIHNvdXJjZSBvZiB0cnV0aClcbiAgICBzYXZlTWlzc2luZ1RvOiAnZmFsbGJhY2snLCAvLyAnY3VycmVudCcgfHwgJ2FsbCdcbiAgICBzYXZlTWlzc2luZ1BsdXJhbHM6IHRydWUsIC8vIHdpbGwgc2F2ZSBhbGwgZm9ybXMgbm90IG9ubHkgc2luZ3VsYXIga2V5XG4gICAgbWlzc2luZ0tleUhhbmRsZXI6IGZhbHNlLCAvLyBmdW5jdGlvbihsbmcsIG5zLCBrZXksIGZhbGxiYWNrVmFsdWUpIC0+IG92ZXJyaWRlIGlmIHByZWZlciBvbiBoYW5kbGluZ1xuXG4gICAgcG9zdFByb2Nlc3M6IGZhbHNlLCAvLyBzdHJpbmcgb3IgYXJyYXkgb2YgcG9zdFByb2Nlc3NvciBuYW1lc1xuICAgIHJldHVybk51bGw6IHRydWUsIC8vIGFsbG93cyBudWxsIHZhbHVlIGFzIHZhbGlkIHRyYW5zbGF0aW9uXG4gICAgcmV0dXJuRW1wdHlTdHJpbmc6IHRydWUsIC8vIGFsbG93cyBlbXB0eSBzdHJpbmcgdmFsdWUgYXMgdmFsaWQgdHJhbnNsYXRpb25cbiAgICByZXR1cm5PYmplY3RzOiBmYWxzZSxcbiAgICBqb2luQXJyYXlzOiBmYWxzZSwgLy8gb3Igc3RyaW5nIHRvIGpvaW4gYXJyYXlcbiAgICByZXR1cm5lZE9iamVjdEhhbmRsZXI6IGZ1bmN0aW9uIHJldHVybmVkT2JqZWN0SGFuZGxlcigpIHt9LCAvLyBmdW5jdGlvbihrZXksIHZhbHVlLCBvcHRpb25zKSB0cmlnZ2VyZWQgaWYga2V5IHJldHVybnMgb2JqZWN0IGJ1dCByZXR1cm5PYmplY3RzIGlzIHNldCB0byBmYWxzZVxuICAgIHBhcnNlTWlzc2luZ0tleUhhbmRsZXI6IGZhbHNlLCAvLyBmdW5jdGlvbihrZXkpIHBhcnNlZCBhIGtleSB0aGF0IHdhcyBub3QgZm91bmQgaW4gdCgpIGJlZm9yZSByZXR1cm5pbmdcbiAgICBhcHBlbmROYW1lc3BhY2VUb01pc3NpbmdLZXk6IGZhbHNlLFxuICAgIGFwcGVuZE5hbWVzcGFjZVRvQ0lNb2RlOiBmYWxzZSxcbiAgICBvdmVybG9hZFRyYW5zbGF0aW9uT3B0aW9uSGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlKGFyZ3MpIHtcbiAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgIGlmIChhcmdzWzFdKSByZXQuZGVmYXVsdFZhbHVlID0gYXJnc1sxXTtcbiAgICAgIGlmIChhcmdzWzJdKSByZXQudERlc2NyaXB0aW9uID0gYXJnc1syXTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIGludGVycG9sYXRpb246IHtcbiAgICAgIGVzY2FwZVZhbHVlOiB0cnVlLFxuICAgICAgZm9ybWF0OiBmdW5jdGlvbiBmb3JtYXQodmFsdWUsIF9mb3JtYXQsIGxuZykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9LFxuICAgICAgcHJlZml4OiAne3snLFxuICAgICAgc3VmZml4OiAnfX0nLFxuICAgICAgZm9ybWF0U2VwYXJhdG9yOiAnLCcsXG4gICAgICAvLyBwcmVmaXhFc2NhcGVkOiAne3snLFxuICAgICAgLy8gc3VmZml4RXNjYXBlZDogJ319JyxcbiAgICAgIC8vIHVuZXNjYXBlU3VmZml4OiAnJyxcbiAgICAgIHVuZXNjYXBlUHJlZml4OiAnLScsXG5cbiAgICAgIG5lc3RpbmdQcmVmaXg6ICckdCgnLFxuICAgICAgbmVzdGluZ1N1ZmZpeDogJyknLFxuICAgICAgLy8gbmVzdGluZ1ByZWZpeEVzY2FwZWQ6ICckdCgnLFxuICAgICAgLy8gbmVzdGluZ1N1ZmZpeEVzY2FwZWQ6ICcpJyxcbiAgICAgIC8vIGRlZmF1bHRWYXJpYWJsZXM6IHVuZGVmaW5lZCAvLyBvYmplY3QgdGhhdCBjYW4gaGF2ZSB2YWx1ZXMgdG8gaW50ZXJwb2xhdGUgb24gLSBleHRlbmRzIHBhc3NlZCBpbiBpbnRlcnBvbGF0aW9uIGRhdGFcbiAgICAgIG1heFJlcGxhY2VzOiAxMDAwIC8vIG1heCByZXBsYWNlcyB0byBwcmV2ZW50IGVuZGxlc3MgbG9vcFxuICAgIH1cbiAgfTtcbn1cblxuLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOiAwICovXG5leHBvcnRzLmdldCA9IGdldDtcbmZ1bmN0aW9uIHRyYW5zZm9ybU9wdGlvbnMob3B0aW9ucykge1xuICAvLyBjcmVhdGUgbmFtZXNwYWNlIG9iamVjdCBpZiBuYW1lc3BhY2UgaXMgcGFzc2VkIGluIGFzIHN0cmluZ1xuICBpZiAodHlwZW9mIG9wdGlvbnMubnMgPT09ICdzdHJpbmcnKSBvcHRpb25zLm5zID0gW29wdGlvbnMubnNdO1xuICBpZiAodHlwZW9mIG9wdGlvbnMuZmFsbGJhY2tMbmcgPT09ICdzdHJpbmcnKSBvcHRpb25zLmZhbGxiYWNrTG5nID0gW29wdGlvbnMuZmFsbGJhY2tMbmddO1xuICBpZiAodHlwZW9mIG9wdGlvbnMuZmFsbGJhY2tOUyA9PT0gJ3N0cmluZycpIG9wdGlvbnMuZmFsbGJhY2tOUyA9IFtvcHRpb25zLmZhbGxiYWNrTlNdO1xuXG4gIC8vIGV4dGVuZCB3aGl0ZWxpc3Qgd2l0aCBjaW1vZGVcbiAgaWYgKG9wdGlvbnMud2hpdGVsaXN0ICYmIG9wdGlvbnMud2hpdGVsaXN0LmluZGV4T2YoJ2NpbW9kZScpIDwgMCkgb3B0aW9ucy53aGl0ZWxpc3QucHVzaCgnY2ltb2RlJyk7XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfbG9nZ2VyID0gcmVxdWlyZSgnLi9sb2dnZXIuanMnKTtcblxudmFyIF9sb2dnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbG9nZ2VyKTtcblxudmFyIF9FdmVudEVtaXR0ZXIyID0gcmVxdWlyZSgnLi9FdmVudEVtaXR0ZXIuanMnKTtcblxudmFyIF9FdmVudEVtaXR0ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRXZlbnRFbWl0dGVyMik7XG5cbnZhciBfUmVzb3VyY2VTdG9yZSA9IHJlcXVpcmUoJy4vUmVzb3VyY2VTdG9yZS5qcycpO1xuXG52YXIgX1Jlc291cmNlU3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUmVzb3VyY2VTdG9yZSk7XG5cbnZhciBfVHJhbnNsYXRvciA9IHJlcXVpcmUoJy4vVHJhbnNsYXRvci5qcycpO1xuXG52YXIgX1RyYW5zbGF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVHJhbnNsYXRvcik7XG5cbnZhciBfTGFuZ3VhZ2VVdGlscyA9IHJlcXVpcmUoJy4vTGFuZ3VhZ2VVdGlscy5qcycpO1xuXG52YXIgX0xhbmd1YWdlVXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTGFuZ3VhZ2VVdGlscyk7XG5cbnZhciBfUGx1cmFsUmVzb2x2ZXIgPSByZXF1aXJlKCcuL1BsdXJhbFJlc29sdmVyLmpzJyk7XG5cbnZhciBfUGx1cmFsUmVzb2x2ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUGx1cmFsUmVzb2x2ZXIpO1xuXG52YXIgX0ludGVycG9sYXRvciA9IHJlcXVpcmUoJy4vSW50ZXJwb2xhdG9yLmpzJyk7XG5cbnZhciBfSW50ZXJwb2xhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ludGVycG9sYXRvcik7XG5cbnZhciBfQmFja2VuZENvbm5lY3RvciA9IHJlcXVpcmUoJy4vQmFja2VuZENvbm5lY3Rvci5qcycpO1xuXG52YXIgX0JhY2tlbmRDb25uZWN0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQmFja2VuZENvbm5lY3Rvcik7XG5cbnZhciBfQ2FjaGVDb25uZWN0b3IgPSByZXF1aXJlKCcuL0NhY2hlQ29ubmVjdG9yLmpzJyk7XG5cbnZhciBfQ2FjaGVDb25uZWN0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ2FjaGVDb25uZWN0b3IpO1xuXG52YXIgX2RlZmF1bHRzMiA9IHJlcXVpcmUoJy4vZGVmYXVsdHMuanMnKTtcblxudmFyIF9wb3N0UHJvY2Vzc29yID0gcmVxdWlyZSgnLi9wb3N0UHJvY2Vzc29yLmpzJyk7XG5cbnZhciBfcG9zdFByb2Nlc3NvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3N0UHJvY2Vzc29yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmF1bHRzKG9iaiwgZGVmYXVsdHMpIHsgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkZWZhdWx0cyk7IGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykgeyB2YXIga2V5ID0ga2V5c1tpXTsgdmFyIHZhbHVlID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkZWZhdWx0cywga2V5KTsgaWYgKHZhbHVlICYmIHZhbHVlLmNvbmZpZ3VyYWJsZSAmJiBvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpOyB9IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBfZGVmYXVsdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgSTE4biA9IGZ1bmN0aW9uIChfRXZlbnRFbWl0dGVyKSB7XG4gIF9pbmhlcml0cyhJMThuLCBfRXZlbnRFbWl0dGVyKTtcblxuICBmdW5jdGlvbiBJMThuKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMV07XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSTE4bik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfRXZlbnRFbWl0dGVyLmNhbGwodGhpcykpO1xuXG4gICAgX3RoaXMub3B0aW9ucyA9ICgwLCBfZGVmYXVsdHMyLnRyYW5zZm9ybU9wdGlvbnMpKG9wdGlvbnMpO1xuICAgIF90aGlzLnNlcnZpY2VzID0ge307XG4gICAgX3RoaXMubG9nZ2VyID0gX2xvZ2dlcjIuZGVmYXVsdDtcbiAgICBfdGhpcy5tb2R1bGVzID0geyBleHRlcm5hbDogW10gfTtcblxuICAgIGlmIChjYWxsYmFjayAmJiAhX3RoaXMuaXNJbml0aWFsaXplZCAmJiAhb3B0aW9ucy5pc0Nsb25lKSB7XG4gICAgICB2YXIgX3JldDtcblxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2kxOG5leHQvaTE4bmV4dC9pc3N1ZXMvODc5XG4gICAgICBpZiAoIV90aGlzLm9wdGlvbnMuaW5pdEltbWVkaWF0ZSkgcmV0dXJuIF9yZXQgPSBfdGhpcy5pbml0KG9wdGlvbnMsIGNhbGxiYWNrKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzLmluaXQob3B0aW9ucywgY2FsbGJhY2spO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIEkxOG4ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1sxXTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLm9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgKDAsIF9kZWZhdWx0czIuZ2V0KSgpLCB0aGlzLm9wdGlvbnMsICgwLCBfZGVmYXVsdHMyLnRyYW5zZm9ybU9wdGlvbnMpKG9wdGlvbnMpKTtcblxuICAgIHRoaXMuZm9ybWF0ID0gdGhpcy5vcHRpb25zLmludGVycG9sYXRpb24uZm9ybWF0O1xuICAgIGlmICghY2FsbGJhY2spIGNhbGxiYWNrID0gbm9vcDtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzT25EZW1hbmQoQ2xhc3NPck9iamVjdCkge1xuICAgICAgaWYgKCFDbGFzc09yT2JqZWN0KSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICh0eXBlb2YgQ2xhc3NPck9iamVjdCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIG5ldyBDbGFzc09yT2JqZWN0KCk7XG4gICAgICByZXR1cm4gQ2xhc3NPck9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpbml0IHNlcnZpY2VzXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuaXNDbG9uZSkge1xuICAgICAgaWYgKHRoaXMubW9kdWxlcy5sb2dnZXIpIHtcbiAgICAgICAgX2xvZ2dlcjIuZGVmYXVsdC5pbml0KGNyZWF0ZUNsYXNzT25EZW1hbmQodGhpcy5tb2R1bGVzLmxvZ2dlciksIHRoaXMub3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfbG9nZ2VyMi5kZWZhdWx0LmluaXQobnVsbCwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGx1ID0gbmV3IF9MYW5ndWFnZVV0aWxzMi5kZWZhdWx0KHRoaXMub3B0aW9ucyk7XG4gICAgICB0aGlzLnN0b3JlID0gbmV3IF9SZXNvdXJjZVN0b3JlMi5kZWZhdWx0KHRoaXMub3B0aW9ucy5yZXNvdXJjZXMsIHRoaXMub3B0aW9ucyk7XG5cbiAgICAgIHZhciBzID0gdGhpcy5zZXJ2aWNlcztcbiAgICAgIHMubG9nZ2VyID0gX2xvZ2dlcjIuZGVmYXVsdDtcbiAgICAgIHMucmVzb3VyY2VTdG9yZSA9IHRoaXMuc3RvcmU7XG4gICAgICBzLnJlc291cmNlU3RvcmUub24oJ2FkZGVkIHJlbW92ZWQnLCBmdW5jdGlvbiAobG5nLCBucykge1xuICAgICAgICBzLmNhY2hlQ29ubmVjdG9yLnNhdmUoKTtcbiAgICAgIH0pO1xuICAgICAgcy5sYW5ndWFnZVV0aWxzID0gbHU7XG4gICAgICBzLnBsdXJhbFJlc29sdmVyID0gbmV3IF9QbHVyYWxSZXNvbHZlcjIuZGVmYXVsdChsdSwgeyBwcmVwZW5kOiB0aGlzLm9wdGlvbnMucGx1cmFsU2VwYXJhdG9yLCBjb21wYXRpYmlsaXR5SlNPTjogdGhpcy5vcHRpb25zLmNvbXBhdGliaWxpdHlKU09OLCBzaW1wbGlmeVBsdXJhbFN1ZmZpeDogdGhpcy5vcHRpb25zLnNpbXBsaWZ5UGx1cmFsU3VmZml4IH0pO1xuICAgICAgcy5pbnRlcnBvbGF0b3IgPSBuZXcgX0ludGVycG9sYXRvcjIuZGVmYXVsdCh0aGlzLm9wdGlvbnMpO1xuXG4gICAgICBzLmJhY2tlbmRDb25uZWN0b3IgPSBuZXcgX0JhY2tlbmRDb25uZWN0b3IyLmRlZmF1bHQoY3JlYXRlQ2xhc3NPbkRlbWFuZCh0aGlzLm1vZHVsZXMuYmFja2VuZCksIHMucmVzb3VyY2VTdG9yZSwgcywgdGhpcy5vcHRpb25zKTtcbiAgICAgIC8vIHBpcGUgZXZlbnRzIGZyb20gYmFja2VuZENvbm5lY3RvclxuICAgICAgcy5iYWNrZW5kQ29ubmVjdG9yLm9uKCcqJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLmVtaXQuYXBwbHkoX3RoaXMyLCBbZXZlbnRdLmNvbmNhdChhcmdzKSk7XG4gICAgICB9KTtcblxuICAgICAgcy5iYWNrZW5kQ29ubmVjdG9yLm9uKCdsb2FkZWQnLCBmdW5jdGlvbiAobG9hZGVkKSB7XG4gICAgICAgIHMuY2FjaGVDb25uZWN0b3Iuc2F2ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHMuY2FjaGVDb25uZWN0b3IgPSBuZXcgX0NhY2hlQ29ubmVjdG9yMi5kZWZhdWx0KGNyZWF0ZUNsYXNzT25EZW1hbmQodGhpcy5tb2R1bGVzLmNhY2hlKSwgcy5yZXNvdXJjZVN0b3JlLCBzLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgLy8gcGlwZSBldmVudHMgZnJvbSBiYWNrZW5kQ29ubmVjdG9yXG4gICAgICBzLmNhY2hlQ29ubmVjdG9yLm9uKCcqJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLmVtaXQuYXBwbHkoX3RoaXMyLCBbZXZlbnRdLmNvbmNhdChhcmdzKSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMubW9kdWxlcy5sYW5ndWFnZURldGVjdG9yKSB7XG4gICAgICAgIHMubGFuZ3VhZ2VEZXRlY3RvciA9IGNyZWF0ZUNsYXNzT25EZW1hbmQodGhpcy5tb2R1bGVzLmxhbmd1YWdlRGV0ZWN0b3IpO1xuICAgICAgICBzLmxhbmd1YWdlRGV0ZWN0b3IuaW5pdChzLCB0aGlzLm9wdGlvbnMuZGV0ZWN0aW9uLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRyYW5zbGF0b3IgPSBuZXcgX1RyYW5zbGF0b3IyLmRlZmF1bHQodGhpcy5zZXJ2aWNlcywgdGhpcy5vcHRpb25zKTtcbiAgICAgIC8vIHBpcGUgZXZlbnRzIGZyb20gdHJhbnNsYXRvclxuICAgICAgdGhpcy50cmFuc2xhdG9yLm9uKCcqJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4zID4gMSA/IF9sZW4zIC0gMSA6IDApLCBfa2V5MyA9IDE7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkzIC0gMV0gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLmVtaXQuYXBwbHkoX3RoaXMyLCBbZXZlbnRdLmNvbmNhdChhcmdzKSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5tb2R1bGVzLmV4dGVybmFsLmZvckVhY2goZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgaWYgKG0uaW5pdCkgbS5pbml0KF90aGlzMik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgYXBpXG4gICAgdmFyIHN0b3JlQXBpID0gWydnZXRSZXNvdXJjZScsICdhZGRSZXNvdXJjZScsICdhZGRSZXNvdXJjZXMnLCAnYWRkUmVzb3VyY2VCdW5kbGUnLCAncmVtb3ZlUmVzb3VyY2VCdW5kbGUnLCAnaGFzUmVzb3VyY2VCdW5kbGUnLCAnZ2V0UmVzb3VyY2VCdW5kbGUnXTtcbiAgICBzdG9yZUFwaS5mb3JFYWNoKGZ1bmN0aW9uIChmY05hbWUpIHtcbiAgICAgIF90aGlzMltmY05hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3N0b3JlO1xuXG4gICAgICAgIHJldHVybiAoX3N0b3JlID0gX3RoaXMyLnN0b3JlKVtmY05hbWVdLmFwcGx5KF9zdG9yZSwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICB2YXIgbG9hZCA9IGZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgICBfdGhpczIuY2hhbmdlTGFuZ3VhZ2UoX3RoaXMyLm9wdGlvbnMubG5nLCBmdW5jdGlvbiAoZXJyLCB0KSB7XG4gICAgICAgIF90aGlzMi5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMyLmxvZ2dlci5sb2coJ2luaXRpYWxpemVkJywgX3RoaXMyLm9wdGlvbnMpO1xuICAgICAgICBfdGhpczIuZW1pdCgnaW5pdGlhbGl6ZWQnLCBfdGhpczIub3B0aW9ucyk7XG5cbiAgICAgICAgY2FsbGJhY2soZXJyLCB0KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlc291cmNlcyB8fCAhdGhpcy5vcHRpb25zLmluaXRJbW1lZGlhdGUpIHtcbiAgICAgIGxvYWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dChsb2FkLCAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKiBlc2xpbnQgY29uc2lzdGVudC1yZXR1cm46IDAgKi9cblxuXG4gIEkxOG4ucHJvdG90eXBlLmxvYWRSZXNvdXJjZXMgPSBmdW5jdGlvbiBsb2FkUmVzb3VyY2VzKCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBub29wO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucmVzb3VyY2VzKSB7XG4gICAgICBpZiAodGhpcy5sYW5ndWFnZSAmJiB0aGlzLmxhbmd1YWdlLnRvTG93ZXJDYXNlKCkgPT09ICdjaW1vZGUnKSByZXR1cm4gY2FsbGJhY2soKTsgLy8gYXZvaWQgbG9hZGluZyByZXNvdXJjZXMgZm9yIGNpbW9kZVxuXG4gICAgICB2YXIgdG9Mb2FkID0gW107XG5cbiAgICAgIHZhciBhcHBlbmQgPSBmdW5jdGlvbiBhcHBlbmQobG5nKSB7XG4gICAgICAgIGlmICghbG5nKSByZXR1cm47XG4gICAgICAgIHZhciBsbmdzID0gX3RoaXMzLnNlcnZpY2VzLmxhbmd1YWdlVXRpbHMudG9SZXNvbHZlSGllcmFyY2h5KGxuZyk7XG4gICAgICAgIGxuZ3MuZm9yRWFjaChmdW5jdGlvbiAobCkge1xuICAgICAgICAgIGlmICh0b0xvYWQuaW5kZXhPZihsKSA8IDApIHRvTG9hZC5wdXNoKGwpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGlmICghdGhpcy5sYW5ndWFnZSkge1xuICAgICAgICAvLyBhdCBsZWFzdCBsb2FkIGZhbGxiYWNrcyBpbiB0aGlzIGNhc2VcbiAgICAgICAgdmFyIGZhbGxiYWNrcyA9IHRoaXMuc2VydmljZXMubGFuZ3VhZ2VVdGlscy5nZXRGYWxsYmFja0NvZGVzKHRoaXMub3B0aW9ucy5mYWxsYmFja0xuZyk7XG4gICAgICAgIGZhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgcmV0dXJuIGFwcGVuZChsKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcHBlbmQodGhpcy5sYW5ndWFnZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJlbG9hZCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMucHJlbG9hZC5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgcmV0dXJuIGFwcGVuZChsKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VydmljZXMuY2FjaGVDb25uZWN0b3IubG9hZCh0b0xvYWQsIHRoaXMub3B0aW9ucy5ucywgZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczMuc2VydmljZXMuYmFja2VuZENvbm5lY3Rvci5sb2FkKHRvTG9hZCwgX3RoaXMzLm9wdGlvbnMubnMsIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhudWxsKTtcbiAgICB9XG4gIH07XG5cbiAgSTE4bi5wcm90b3R5cGUucmVsb2FkUmVzb3VyY2VzID0gZnVuY3Rpb24gcmVsb2FkUmVzb3VyY2VzKGxuZ3MsIG5zKSB7XG4gICAgaWYgKCFsbmdzKSBsbmdzID0gdGhpcy5sYW5ndWFnZXM7XG4gICAgaWYgKCFucykgbnMgPSB0aGlzLm9wdGlvbnMubnM7XG4gICAgdGhpcy5zZXJ2aWNlcy5iYWNrZW5kQ29ubmVjdG9yLnJlbG9hZChsbmdzLCBucyk7XG4gIH07XG5cbiAgSTE4bi5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKG1vZHVsZSkge1xuICAgIGlmIChtb2R1bGUudHlwZSA9PT0gJ2JhY2tlbmQnKSB7XG4gICAgICB0aGlzLm1vZHVsZXMuYmFja2VuZCA9IG1vZHVsZTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlLnR5cGUgPT09ICdjYWNoZScpIHtcbiAgICAgIHRoaXMubW9kdWxlcy5jYWNoZSA9IG1vZHVsZTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlLnR5cGUgPT09ICdsb2dnZXInIHx8IG1vZHVsZS5sb2cgJiYgbW9kdWxlLndhcm4gJiYgbW9kdWxlLmVycm9yKSB7XG4gICAgICB0aGlzLm1vZHVsZXMubG9nZ2VyID0gbW9kdWxlO1xuICAgIH1cblxuICAgIGlmIChtb2R1bGUudHlwZSA9PT0gJ2xhbmd1YWdlRGV0ZWN0b3InKSB7XG4gICAgICB0aGlzLm1vZHVsZXMubGFuZ3VhZ2VEZXRlY3RvciA9IG1vZHVsZTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlLnR5cGUgPT09ICdwb3N0UHJvY2Vzc29yJykge1xuICAgICAgX3Bvc3RQcm9jZXNzb3IyLmRlZmF1bHQuYWRkUG9zdFByb2Nlc3Nvcihtb2R1bGUpO1xuICAgIH1cblxuICAgIGlmIChtb2R1bGUudHlwZSA9PT0gJzNyZFBhcnR5Jykge1xuICAgICAgdGhpcy5tb2R1bGVzLmV4dGVybmFsLnB1c2gobW9kdWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBJMThuLnByb3RvdHlwZS5jaGFuZ2VMYW5ndWFnZSA9IGZ1bmN0aW9uIGNoYW5nZUxhbmd1YWdlKGxuZywgY2FsbGJhY2spIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHZhciBkb25lID0gZnVuY3Rpb24gZG9uZShlcnIsIGwpIHtcbiAgICAgIF90aGlzNC50cmFuc2xhdG9yLmNoYW5nZUxhbmd1YWdlKGwpO1xuXG4gICAgICBpZiAobCkge1xuICAgICAgICBfdGhpczQuZW1pdCgnbGFuZ3VhZ2VDaGFuZ2VkJywgbCk7XG4gICAgICAgIF90aGlzNC5sb2dnZXIubG9nKCdsYW5ndWFnZUNoYW5nZWQnLCBsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhlcnIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzNC50LmFwcGx5KF90aGlzNCwgYXJndW1lbnRzKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc2V0TG5nID0gZnVuY3Rpb24gc2V0TG5nKGwpIHtcbiAgICAgIGlmIChsKSB7XG4gICAgICAgIF90aGlzNC5sYW5ndWFnZSA9IGw7XG4gICAgICAgIF90aGlzNC5sYW5ndWFnZXMgPSBfdGhpczQuc2VydmljZXMubGFuZ3VhZ2VVdGlscy50b1Jlc29sdmVIaWVyYXJjaHkobCk7XG4gICAgICAgIGlmICghX3RoaXM0LnRyYW5zbGF0b3IubGFuZ3VhZ2UpIF90aGlzNC50cmFuc2xhdG9yLmNoYW5nZUxhbmd1YWdlKGwpO1xuXG4gICAgICAgIGlmIChfdGhpczQuc2VydmljZXMubGFuZ3VhZ2VEZXRlY3RvcikgX3RoaXM0LnNlcnZpY2VzLmxhbmd1YWdlRGV0ZWN0b3IuY2FjaGVVc2VyTGFuZ3VhZ2UobCk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzNC5sb2FkUmVzb3VyY2VzKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgZG9uZShlcnIsIGwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmICghbG5nICYmIHRoaXMuc2VydmljZXMubGFuZ3VhZ2VEZXRlY3RvciAmJiAhdGhpcy5zZXJ2aWNlcy5sYW5ndWFnZURldGVjdG9yLmFzeW5jKSB7XG4gICAgICBzZXRMbmcodGhpcy5zZXJ2aWNlcy5sYW5ndWFnZURldGVjdG9yLmRldGVjdCgpKTtcbiAgICB9IGVsc2UgaWYgKCFsbmcgJiYgdGhpcy5zZXJ2aWNlcy5sYW5ndWFnZURldGVjdG9yICYmIHRoaXMuc2VydmljZXMubGFuZ3VhZ2VEZXRlY3Rvci5hc3luYykge1xuICAgICAgdGhpcy5zZXJ2aWNlcy5sYW5ndWFnZURldGVjdG9yLmRldGVjdChzZXRMbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRMbmcobG5nKTtcbiAgICB9XG4gIH07XG5cbiAgSTE4bi5wcm90b3R5cGUuZ2V0Rml4ZWRUID0gZnVuY3Rpb24gZ2V0Rml4ZWRUKGxuZywgbnMpIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgIHZhciBmaXhlZFQgPSBmdW5jdGlvbiBmaXhlZFQoa2V5LCBvcHRzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIHJlc3QgPSBBcnJheShfbGVuNCA+IDIgPyBfbGVuNCAtIDIgOiAwKSwgX2tleTQgPSAyOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgIHJlc3RbX2tleTQgLSAyXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICB9XG5cbiAgICAgIHZhciBvcHRpb25zID0gX2V4dGVuZHMoe30sIG9wdHMpO1xuICAgICAgaWYgKCh0eXBlb2Ygb3B0cyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob3B0cykpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBvcHRpb25zID0gX3RoaXM1Lm9wdGlvbnMub3ZlcmxvYWRUcmFuc2xhdGlvbk9wdGlvbkhhbmRsZXIoW2tleSwgb3B0c10uY29uY2F0KHJlc3QpKTtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucy5sbmcgPSBvcHRpb25zLmxuZyB8fCBmaXhlZFQubG5nO1xuICAgICAgb3B0aW9ucy5sbmdzID0gb3B0aW9ucy5sbmdzIHx8IGZpeGVkVC5sbmdzO1xuICAgICAgb3B0aW9ucy5ucyA9IG9wdGlvbnMubnMgfHwgZml4ZWRULm5zO1xuICAgICAgcmV0dXJuIF90aGlzNS50KGtleSwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBpZiAodHlwZW9mIGxuZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZpeGVkVC5sbmcgPSBsbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpeGVkVC5sbmdzID0gbG5nO1xuICAgIH1cbiAgICBmaXhlZFQubnMgPSBucztcbiAgICByZXR1cm4gZml4ZWRUO1xuICB9O1xuXG4gIEkxOG4ucHJvdG90eXBlLnQgPSBmdW5jdGlvbiB0KCkge1xuICAgIHZhciBfdHJhbnNsYXRvcjtcblxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0b3IgJiYgKF90cmFuc2xhdG9yID0gdGhpcy50cmFuc2xhdG9yKS50cmFuc2xhdGUuYXBwbHkoX3RyYW5zbGF0b3IsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgSTE4bi5wcm90b3R5cGUuZXhpc3RzID0gZnVuY3Rpb24gZXhpc3RzKCkge1xuICAgIHZhciBfdHJhbnNsYXRvcjI7XG5cbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdG9yICYmIChfdHJhbnNsYXRvcjIgPSB0aGlzLnRyYW5zbGF0b3IpLmV4aXN0cy5hcHBseShfdHJhbnNsYXRvcjIsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgSTE4bi5wcm90b3R5cGUuc2V0RGVmYXVsdE5hbWVzcGFjZSA9IGZ1bmN0aW9uIHNldERlZmF1bHROYW1lc3BhY2UobnMpIHtcbiAgICB0aGlzLm9wdGlvbnMuZGVmYXVsdE5TID0gbnM7XG4gIH07XG5cbiAgSTE4bi5wcm90b3R5cGUubG9hZE5hbWVzcGFjZXMgPSBmdW5jdGlvbiBsb2FkTmFtZXNwYWNlcyhucywgY2FsbGJhY2spIHtcbiAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgIGlmICghdGhpcy5vcHRpb25zLm5zKSByZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICBpZiAodHlwZW9mIG5zID09PSAnc3RyaW5nJykgbnMgPSBbbnNdO1xuXG4gICAgbnMuZm9yRWFjaChmdW5jdGlvbiAobikge1xuICAgICAgaWYgKF90aGlzNi5vcHRpb25zLm5zLmluZGV4T2YobikgPCAwKSBfdGhpczYub3B0aW9ucy5ucy5wdXNoKG4pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sb2FkUmVzb3VyY2VzKGNhbGxiYWNrKTtcbiAgfTtcblxuICBJMThuLnByb3RvdHlwZS5sb2FkTGFuZ3VhZ2VzID0gZnVuY3Rpb24gbG9hZExhbmd1YWdlcyhsbmdzLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgbG5ncyA9PT0gJ3N0cmluZycpIGxuZ3MgPSBbbG5nc107XG4gICAgdmFyIHByZWxvYWRlZCA9IHRoaXMub3B0aW9ucy5wcmVsb2FkIHx8IFtdO1xuXG4gICAgdmFyIG5ld0xuZ3MgPSBsbmdzLmZpbHRlcihmdW5jdGlvbiAobG5nKSB7XG4gICAgICByZXR1cm4gcHJlbG9hZGVkLmluZGV4T2YobG5nKSA8IDA7XG4gICAgfSk7XG4gICAgLy8gRXhpdCBlYXJseSBpZiBhbGwgZ2l2ZW4gbGFuZ3VhZ2VzIGFyZSBhbHJlYWR5IHByZWxvYWRlZFxuICAgIGlmICghbmV3TG5ncy5sZW5ndGgpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgdGhpcy5vcHRpb25zLnByZWxvYWQgPSBwcmVsb2FkZWQuY29uY2F0KG5ld0xuZ3MpO1xuICAgIHRoaXMubG9hZFJlc291cmNlcyhjYWxsYmFjayk7XG4gIH07XG5cbiAgSTE4bi5wcm90b3R5cGUuZGlyID0gZnVuY3Rpb24gZGlyKGxuZykge1xuICAgIGlmICghbG5nKSBsbmcgPSB0aGlzLmxhbmd1YWdlcyAmJiB0aGlzLmxhbmd1YWdlcy5sZW5ndGggPiAwID8gdGhpcy5sYW5ndWFnZXNbMF0gOiB0aGlzLmxhbmd1YWdlO1xuICAgIGlmICghbG5nKSByZXR1cm4gJ3J0bCc7XG5cbiAgICB2YXIgcnRsTG5ncyA9IFsnYXInLCAnc2h1JywgJ3NxcicsICdzc2gnLCAneGFhJywgJ3loZCcsICd5dWQnLCAnYWFvJywgJ2FiaCcsICdhYnYnLCAnYWNtJywgJ2FjcScsICdhY3cnLCAnYWN4JywgJ2FjeScsICdhZGYnLCAnYWRzJywgJ2FlYicsICdhZWMnLCAnYWZiJywgJ2FqcCcsICdhcGMnLCAnYXBkJywgJ2FyYicsICdhcnEnLCAnYXJzJywgJ2FyeScsICdhcnonLCAnYXV6JywgJ2F2bCcsICdheWgnLCAnYXlsJywgJ2F5bicsICdheXAnLCAnYmJ6JywgJ3BnYScsICdoZScsICdpdycsICdwcycsICdwYnQnLCAncGJ1JywgJ3BzdCcsICdwcnAnLCAncHJkJywgJ3VyJywgJ3lkZCcsICd5ZHMnLCAneWloJywgJ2ppJywgJ3lpJywgJ2hibycsICdtZW4nLCAneG1uJywgJ2ZhJywgJ2pwcicsICdwZW8nLCAncGVzJywgJ3BycycsICdkdicsICdzYW0nXTtcblxuICAgIHJldHVybiBydGxMbmdzLmluZGV4T2YodGhpcy5zZXJ2aWNlcy5sYW5ndWFnZVV0aWxzLmdldExhbmd1YWdlUGFydEZyb21Db2RlKGxuZykpID49IDAgPyAncnRsJyA6ICdsdHInO1xuICB9O1xuXG4gIC8qIGVzbGludCBjbGFzcy1tZXRob2RzLXVzZS10aGlzOiAwICovXG5cblxuICBJMThuLnByb3RvdHlwZS5jcmVhdGVJbnN0YW5jZSA9IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMV07XG5cbiAgICByZXR1cm4gbmV3IEkxOG4ob3B0aW9ucywgY2FsbGJhY2spO1xuICB9O1xuXG4gIEkxOG4ucHJvdG90eXBlLmNsb25lSW5zdGFuY2UgPSBmdW5jdGlvbiBjbG9uZUluc3RhbmNlKCkge1xuICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbm9vcDtcblxuICAgIHZhciBtZXJnZWRPcHRpb25zID0gX2V4dGVuZHMoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucywgeyBpc0Nsb25lOiB0cnVlIH0pO1xuICAgIHZhciBjbG9uZSA9IG5ldyBJMThuKG1lcmdlZE9wdGlvbnMpO1xuICAgIHZhciBtZW1iZXJzVG9Db3B5ID0gWydzdG9yZScsICdzZXJ2aWNlcycsICdsYW5ndWFnZSddO1xuICAgIG1lbWJlcnNUb0NvcHkuZm9yRWFjaChmdW5jdGlvbiAobSkge1xuICAgICAgY2xvbmVbbV0gPSBfdGhpczdbbV07XG4gICAgfSk7XG4gICAgY2xvbmUudHJhbnNsYXRvciA9IG5ldyBfVHJhbnNsYXRvcjIuZGVmYXVsdChjbG9uZS5zZXJ2aWNlcywgY2xvbmUub3B0aW9ucyk7XG4gICAgY2xvbmUudHJhbnNsYXRvci5vbignKicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjUgPiAxID8gX2xlbjUgLSAxIDogMCksIF9rZXk1ID0gMTsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgICAgICBhcmdzW19rZXk1IC0gMV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgfVxuXG4gICAgICBjbG9uZS5lbWl0LmFwcGx5KGNsb25lLCBbZXZlbnRdLmNvbmNhdChhcmdzKSk7XG4gICAgfSk7XG4gICAgY2xvbmUuaW5pdChtZXJnZWRPcHRpb25zLCBjYWxsYmFjayk7XG4gICAgY2xvbmUudHJhbnNsYXRvci5vcHRpb25zID0gY2xvbmUub3B0aW9uczsgLy8gc3luYyBvcHRpb25zXG5cbiAgICByZXR1cm4gY2xvbmU7XG4gIH07XG5cbiAgcmV0dXJuIEkxOG47XG59KF9FdmVudEVtaXR0ZXIzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBuZXcgSTE4bigpOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudXNlID0gZXhwb3J0cy50ID0gZXhwb3J0cy5zZXREZWZhdWx0TmFtZXNwYWNlID0gZXhwb3J0cy5vbiA9IGV4cG9ydHMub2ZmID0gZXhwb3J0cy5sb2FkUmVzb3VyY2VzID0gZXhwb3J0cy5sb2FkTmFtZXNwYWNlcyA9IGV4cG9ydHMubG9hZExhbmd1YWdlcyA9IGV4cG9ydHMuaW5pdCA9IGV4cG9ydHMuZ2V0Rml4ZWRUID0gZXhwb3J0cy5leGlzdHMgPSBleHBvcnRzLmRpciA9IGV4cG9ydHMuY3JlYXRlSW5zdGFuY2UgPSBleHBvcnRzLmNsb25lSW5zdGFuY2UgPSBleHBvcnRzLmNoYW5nZUxhbmd1YWdlID0gdW5kZWZpbmVkO1xuXG52YXIgX2kxOG5leHQgPSByZXF1aXJlKCcuL2kxOG5leHQuanMnKTtcblxudmFyIF9pMThuZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2kxOG5leHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfaTE4bmV4dDIuZGVmYXVsdDtcbnZhciBjaGFuZ2VMYW5ndWFnZSA9IGV4cG9ydHMuY2hhbmdlTGFuZ3VhZ2UgPSBfaTE4bmV4dDIuZGVmYXVsdC5jaGFuZ2VMYW5ndWFnZS5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBjbG9uZUluc3RhbmNlID0gZXhwb3J0cy5jbG9uZUluc3RhbmNlID0gX2kxOG5leHQyLmRlZmF1bHQuY2xvbmVJbnN0YW5jZS5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBjcmVhdGVJbnN0YW5jZSA9IGV4cG9ydHMuY3JlYXRlSW5zdGFuY2UgPSBfaTE4bmV4dDIuZGVmYXVsdC5jcmVhdGVJbnN0YW5jZS5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBkaXIgPSBleHBvcnRzLmRpciA9IF9pMThuZXh0Mi5kZWZhdWx0LmRpci5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBleGlzdHMgPSBleHBvcnRzLmV4aXN0cyA9IF9pMThuZXh0Mi5kZWZhdWx0LmV4aXN0cy5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBnZXRGaXhlZFQgPSBleHBvcnRzLmdldEZpeGVkVCA9IF9pMThuZXh0Mi5kZWZhdWx0LmdldEZpeGVkVC5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBpbml0ID0gZXhwb3J0cy5pbml0ID0gX2kxOG5leHQyLmRlZmF1bHQuaW5pdC5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBsb2FkTGFuZ3VhZ2VzID0gZXhwb3J0cy5sb2FkTGFuZ3VhZ2VzID0gX2kxOG5leHQyLmRlZmF1bHQubG9hZExhbmd1YWdlcy5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBsb2FkTmFtZXNwYWNlcyA9IGV4cG9ydHMubG9hZE5hbWVzcGFjZXMgPSBfaTE4bmV4dDIuZGVmYXVsdC5sb2FkTmFtZXNwYWNlcy5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBsb2FkUmVzb3VyY2VzID0gZXhwb3J0cy5sb2FkUmVzb3VyY2VzID0gX2kxOG5leHQyLmRlZmF1bHQubG9hZFJlc291cmNlcy5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBvZmYgPSBleHBvcnRzLm9mZiA9IF9pMThuZXh0Mi5kZWZhdWx0Lm9mZi5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBvbiA9IGV4cG9ydHMub24gPSBfaTE4bmV4dDIuZGVmYXVsdC5vbi5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciBzZXREZWZhdWx0TmFtZXNwYWNlID0gZXhwb3J0cy5zZXREZWZhdWx0TmFtZXNwYWNlID0gX2kxOG5leHQyLmRlZmF1bHQuc2V0RGVmYXVsdE5hbWVzcGFjZS5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciB0ID0gZXhwb3J0cy50ID0gX2kxOG5leHQyLmRlZmF1bHQudC5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTtcbnZhciB1c2UgPSBleHBvcnRzLnVzZSA9IF9pMThuZXh0Mi5kZWZhdWx0LnVzZS5iaW5kKF9pMThuZXh0Mi5kZWZhdWx0KTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG52YXIgY29uc29sZUxvZ2dlciA9IHtcbiAgdHlwZTogJ2xvZ2dlcicsXG5cbiAgbG9nOiBmdW5jdGlvbiBsb2coYXJncykge1xuICAgIHRoaXMub3V0cHV0KCdsb2cnLCBhcmdzKTtcbiAgfSxcbiAgd2FybjogZnVuY3Rpb24gd2FybihhcmdzKSB7XG4gICAgdGhpcy5vdXRwdXQoJ3dhcm4nLCBhcmdzKTtcbiAgfSxcbiAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGFyZ3MpIHtcbiAgICB0aGlzLm91dHB1dCgnZXJyb3InLCBhcmdzKTtcbiAgfSxcbiAgb3V0cHV0OiBmdW5jdGlvbiBvdXRwdXQodHlwZSwgYXJncykge1xuICAgIHZhciBfY29uc29sZTtcblxuICAgIC8qIGVzbGludCBuby1jb25zb2xlOiAwICovXG4gICAgaWYgKGNvbnNvbGUgJiYgY29uc29sZVt0eXBlXSkgKF9jb25zb2xlID0gY29uc29sZSlbdHlwZV0uYXBwbHkoX2NvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gIH1cbn07XG5cbnZhciBMb2dnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIExvZ2dlcihjb25jcmV0ZUxvZ2dlcikge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMb2dnZXIpO1xuXG4gICAgdGhpcy5pbml0KGNvbmNyZXRlTG9nZ2VyLCBvcHRpb25zKTtcbiAgfVxuXG4gIExvZ2dlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIGluaXQoY29uY3JldGVMb2dnZXIpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICB0aGlzLnByZWZpeCA9IG9wdGlvbnMucHJlZml4IHx8ICdpMThuZXh0Oic7XG4gICAgdGhpcy5sb2dnZXIgPSBjb25jcmV0ZUxvZ2dlciB8fCBjb25zb2xlTG9nZ2VyO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWc7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5zZXREZWJ1ZyA9IGZ1bmN0aW9uIHNldERlYnVnKGJvb2wpIHtcbiAgICB0aGlzLmRlYnVnID0gYm9vbDtcbiAgfTtcblxuICBMb2dnZXIucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5mb3J3YXJkKGFyZ3MsICdsb2cnLCAnJywgdHJ1ZSk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS53YXJuID0gZnVuY3Rpb24gd2FybigpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmZvcndhcmQoYXJncywgJ3dhcm4nLCAnJywgdHJ1ZSk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICBhcmdzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZm9yd2FyZChhcmdzLCAnZXJyb3InLCAnJyk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5kZXByZWNhdGUgPSBmdW5jdGlvbiBkZXByZWNhdGUoKSB7XG4gICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjQpLCBfa2V5NCA9IDA7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgIGFyZ3NbX2tleTRdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5mb3J3YXJkKGFyZ3MsICd3YXJuJywgJ1dBUk5JTkcgREVQUkVDQVRFRDogJywgdHJ1ZSk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5mb3J3YXJkID0gZnVuY3Rpb24gZm9yd2FyZChhcmdzLCBsdmwsIHByZWZpeCwgZGVidWdPbmx5KSB7XG4gICAgaWYgKGRlYnVnT25seSAmJiAhdGhpcy5kZWJ1ZykgcmV0dXJuIG51bGw7XG4gICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJykgYXJnc1swXSA9ICcnICsgcHJlZml4ICsgdGhpcy5wcmVmaXggKyAnICcgKyBhcmdzWzBdO1xuICAgIHJldHVybiB0aGlzLmxvZ2dlcltsdmxdKGFyZ3MpO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKG1vZHVsZU5hbWUpIHtcbiAgICByZXR1cm4gbmV3IExvZ2dlcih0aGlzLmxvZ2dlciwgX2V4dGVuZHMoeyBwcmVmaXg6IHRoaXMucHJlZml4ICsgJzonICsgbW9kdWxlTmFtZSArICc6JyB9LCB0aGlzLm9wdGlvbnMpKTtcbiAgfTtcblxuICByZXR1cm4gTG9nZ2VyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBuZXcgTG9nZ2VyKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG5cbiAgcHJvY2Vzc29yczoge30sXG5cbiAgYWRkUG9zdFByb2Nlc3NvcjogZnVuY3Rpb24gYWRkUG9zdFByb2Nlc3Nvcihtb2R1bGUpIHtcbiAgICB0aGlzLnByb2Nlc3NvcnNbbW9kdWxlLm5hbWVdID0gbW9kdWxlO1xuICB9LFxuICBoYW5kbGU6IGZ1bmN0aW9uIGhhbmRsZShwcm9jZXNzb3JzLCB2YWx1ZSwga2V5LCBvcHRpb25zLCB0cmFuc2xhdG9yKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHByb2Nlc3NvcnMuZm9yRWFjaChmdW5jdGlvbiAocHJvY2Vzc29yKSB7XG4gICAgICBpZiAoX3RoaXMucHJvY2Vzc29yc1twcm9jZXNzb3JdKSB2YWx1ZSA9IF90aGlzLnByb2Nlc3NvcnNbcHJvY2Vzc29yXS5wcm9jZXNzKHZhbHVlLCBrZXksIG9wdGlvbnMsIHRyYW5zbGF0b3IpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubWFrZVN0cmluZyA9IG1ha2VTdHJpbmc7XG5leHBvcnRzLmNvcHkgPSBjb3B5O1xuZXhwb3J0cy5zZXRQYXRoID0gc2V0UGF0aDtcbmV4cG9ydHMucHVzaFBhdGggPSBwdXNoUGF0aDtcbmV4cG9ydHMuZ2V0UGF0aCA9IGdldFBhdGg7XG5leHBvcnRzLmRlZXBFeHRlbmQgPSBkZWVwRXh0ZW5kO1xuZXhwb3J0cy5yZWdleEVzY2FwZSA9IHJlZ2V4RXNjYXBlO1xuZXhwb3J0cy5lc2NhcGUgPSBlc2NhcGU7XG5mdW5jdGlvbiBtYWtlU3RyaW5nKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiAnJztcbiAgLyogZXNsaW50IHByZWZlci10ZW1wbGF0ZTogMCAqL1xuICByZXR1cm4gJycgKyBvYmplY3Q7XG59XG5cbmZ1bmN0aW9uIGNvcHkoYSwgcywgdCkge1xuICBhLmZvckVhY2goZnVuY3Rpb24gKG0pIHtcbiAgICBpZiAoc1ttXSkgdFttXSA9IHNbbV07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRMYXN0T2ZQYXRoKG9iamVjdCwgcGF0aCwgRW1wdHkpIHtcbiAgZnVuY3Rpb24gY2xlYW5LZXkoa2V5KSB7XG4gICAgcmV0dXJuIGtleSAmJiBrZXkuaW5kZXhPZignIyMjJykgPiAtMSA/IGtleS5yZXBsYWNlKC8jIyMvZywgJy4nKSA6IGtleTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbk5vdFRyYXZlcnNlRGVlcGVyKCkge1xuICAgIHJldHVybiAhb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnO1xuICB9XG5cbiAgdmFyIHN0YWNrID0gdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnID8gW10uY29uY2F0KHBhdGgpIDogcGF0aC5zcGxpdCgnLicpO1xuICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMSkge1xuICAgIGlmIChjYW5Ob3RUcmF2ZXJzZURlZXBlcigpKSByZXR1cm4ge307XG5cbiAgICB2YXIga2V5ID0gY2xlYW5LZXkoc3RhY2suc2hpZnQoKSk7XG4gICAgaWYgKCFvYmplY3Rba2V5XSAmJiBFbXB0eSkgb2JqZWN0W2tleV0gPSBuZXcgRW1wdHkoKTtcbiAgICBvYmplY3QgPSBvYmplY3Rba2V5XTtcbiAgfVxuXG4gIGlmIChjYW5Ob3RUcmF2ZXJzZURlZXBlcigpKSByZXR1cm4ge307XG4gIHJldHVybiB7XG4gICAgb2JqOiBvYmplY3QsXG4gICAgazogY2xlYW5LZXkoc3RhY2suc2hpZnQoKSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0UGF0aChvYmplY3QsIHBhdGgsIG5ld1ZhbHVlKSB7XG4gIHZhciBfZ2V0TGFzdE9mUGF0aCA9IGdldExhc3RPZlBhdGgob2JqZWN0LCBwYXRoLCBPYmplY3QpLFxuICAgICAgb2JqID0gX2dldExhc3RPZlBhdGgub2JqLFxuICAgICAgayA9IF9nZXRMYXN0T2ZQYXRoLms7XG5cbiAgb2JqW2tdID0gbmV3VmFsdWU7XG59XG5cbmZ1bmN0aW9uIHB1c2hQYXRoKG9iamVjdCwgcGF0aCwgbmV3VmFsdWUsIGNvbmNhdCkge1xuICB2YXIgX2dldExhc3RPZlBhdGgyID0gZ2V0TGFzdE9mUGF0aChvYmplY3QsIHBhdGgsIE9iamVjdCksXG4gICAgICBvYmogPSBfZ2V0TGFzdE9mUGF0aDIub2JqLFxuICAgICAgayA9IF9nZXRMYXN0T2ZQYXRoMi5rO1xuXG4gIG9ialtrXSA9IG9ialtrXSB8fCBbXTtcbiAgaWYgKGNvbmNhdCkgb2JqW2tdID0gb2JqW2tdLmNvbmNhdChuZXdWYWx1ZSk7XG4gIGlmICghY29uY2F0KSBvYmpba10ucHVzaChuZXdWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGdldFBhdGgob2JqZWN0LCBwYXRoKSB7XG4gIHZhciBfZ2V0TGFzdE9mUGF0aDMgPSBnZXRMYXN0T2ZQYXRoKG9iamVjdCwgcGF0aCksXG4gICAgICBvYmogPSBfZ2V0TGFzdE9mUGF0aDMub2JqLFxuICAgICAgayA9IF9nZXRMYXN0T2ZQYXRoMy5rO1xuXG4gIGlmICghb2JqKSByZXR1cm4gdW5kZWZpbmVkO1xuICByZXR1cm4gb2JqW2tdO1xufVxuXG5mdW5jdGlvbiBkZWVwRXh0ZW5kKHRhcmdldCwgc291cmNlLCBvdmVyd3JpdGUpIHtcbiAgLyogZXNsaW50IG5vLXJlc3RyaWN0ZWQtc3ludGF4OiAwICovXG4gIGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG4gICAgaWYgKHByb3AgaW4gdGFyZ2V0KSB7XG4gICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgbGVhZiBzdHJpbmcgaW4gdGFyZ2V0IG9yIHNvdXJjZSB0aGVuIHJlcGxhY2Ugd2l0aCBzb3VyY2Ugb3Igc2tpcCBkZXBlbmRpbmcgb24gdGhlICdvdmVyd3JpdGUnIHN3aXRjaFxuICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcF0gPT09ICdzdHJpbmcnIHx8IHRhcmdldFtwcm9wXSBpbnN0YW5jZW9mIFN0cmluZyB8fCB0eXBlb2Ygc291cmNlW3Byb3BdID09PSAnc3RyaW5nJyB8fCBzb3VyY2VbcHJvcF0gaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgaWYgKG92ZXJ3cml0ZSkgdGFyZ2V0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVlcEV4dGVuZCh0YXJnZXRbcHJvcF0sIHNvdXJjZVtwcm9wXSwgb3ZlcndyaXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiByZWdleEVzY2FwZShzdHIpIHtcbiAgLyogZXNsaW50IG5vLXVzZWxlc3MtZXNjYXBlOiAwICovXG4gIHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csICdcXFxcJCYnKTtcbn1cblxuLyogZXNsaW50LWRpc2FibGUgKi9cbnZhciBfZW50aXR5TWFwID0ge1xuICBcIiZcIjogXCImYW1wO1wiLFxuICBcIjxcIjogXCImbHQ7XCIsXG4gIFwiPlwiOiBcIiZndDtcIixcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiMzOTsnLFxuICBcIi9cIjogJyYjeDJGOydcbn07XG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbmZ1bmN0aW9uIGVzY2FwZShkYXRhKSB7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZGF0YS5yZXBsYWNlKC9bJjw+XCInXFwvXS9nLCBmdW5jdGlvbiAocykge1xuICAgICAgcmV0dXJuIF9lbnRpdHlNYXBbc107XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9jb21tb25qcy9pbmRleC5qcycpLmRlZmF1bHQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgdE5hbWU6ICd0JyxcbiAgaTE4bk5hbWU6ICdpMThuJyxcbiAgaGFuZGxlTmFtZTogJ2xvY2FsaXplJyxcbiAgc2VsZWN0b3JBdHRyOiAnZGF0YS1pMThuJyxcbiAgdGFyZ2V0QXR0cjogJ2kxOG4tdGFyZ2V0JyxcbiAgb3B0aW9uc0F0dHI6ICdpMThuLW9wdGlvbnMnLFxuICB1c2VPcHRpb25zQXR0cjogZmFsc2UsXG4gIHBhcnNlRGVmYXVsdFZhbHVlRnJvbUNvbnRlbnQ6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGluaXQoaTE4bmV4dCwgJCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG5cblxuICBvcHRpb25zID0gX2V4dGVuZHMoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICBmdW5jdGlvbiBwYXJzZShlbGUsIGtleSwgb3B0cykge1xuICAgIGlmIChrZXkubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICB2YXIgYXR0ciA9ICd0ZXh0JztcblxuICAgIGlmIChrZXkuaW5kZXhPZignWycpID09PSAwKSB7XG4gICAgICB2YXIgcGFydHMgPSBrZXkuc3BsaXQoJ10nKTtcbiAgICAgIGtleSA9IHBhcnRzWzFdO1xuICAgICAgYXR0ciA9IHBhcnRzWzBdLnN1YnN0cigxLCBwYXJ0c1swXS5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICBpZiAoa2V5LmluZGV4T2YoJzsnKSA9PT0ga2V5Lmxlbmd0aCAtIDEpIHtcbiAgICAgIGtleSA9IGtleS5zdWJzdHIoMCwga2V5Lmxlbmd0aCAtIDIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZERlZmF1bHQobywgdmFsKSB7XG4gICAgICBpZiAoIW9wdGlvbnMucGFyc2VEZWZhdWx0VmFsdWVGcm9tQ29udGVudCkgcmV0dXJuIG87XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIG8sIHsgZGVmYXVsdFZhbHVlOiB2YWwgfSk7XG4gICAgfVxuXG4gICAgaWYgKGF0dHIgPT09ICdodG1sJykge1xuICAgICAgZWxlLmh0bWwoaTE4bmV4dC50KGtleSwgZXh0ZW5kRGVmYXVsdChvcHRzLCBlbGUuaHRtbCgpKSkpO1xuICAgIH0gZWxzZSBpZiAoYXR0ciA9PT0gJ3RleHQnKSB7XG4gICAgICBlbGUudGV4dChpMThuZXh0LnQoa2V5LCBleHRlbmREZWZhdWx0KG9wdHMsIGVsZS50ZXh0KCkpKSk7XG4gICAgfSBlbHNlIGlmIChhdHRyID09PSAncHJlcGVuZCcpIHtcbiAgICAgIGVsZS5wcmVwZW5kKGkxOG5leHQudChrZXksIGV4dGVuZERlZmF1bHQob3B0cywgZWxlLmh0bWwoKSkpKTtcbiAgICB9IGVsc2UgaWYgKGF0dHIgPT09ICdhcHBlbmQnKSB7XG4gICAgICBlbGUuYXBwZW5kKGkxOG5leHQudChrZXksIGV4dGVuZERlZmF1bHQob3B0cywgZWxlLmh0bWwoKSkpKTtcbiAgICB9IGVsc2UgaWYgKGF0dHIuaW5kZXhPZignZGF0YS0nKSA9PT0gMCkge1xuICAgICAgdmFyIGRhdGFBdHRyID0gYXR0ci5zdWJzdHIoJ2RhdGEtJy5sZW5ndGgpO1xuICAgICAgdmFyIHRyYW5zbGF0ZWQgPSBpMThuZXh0LnQoa2V5LCBleHRlbmREZWZhdWx0KG9wdHMsIGVsZS5kYXRhKGRhdGFBdHRyKSkpO1xuXG4gICAgICAvLyB3ZSBjaGFuZ2UgaW50byB0aGUgZGF0YSBjYWNoZVxuICAgICAgZWxlLmRhdGEoZGF0YUF0dHIsIHRyYW5zbGF0ZWQpO1xuICAgICAgLy8gd2UgY2hhbmdlIGludG8gdGhlIGRvbVxuICAgICAgZWxlLmF0dHIoYXR0ciwgdHJhbnNsYXRlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZS5hdHRyKGF0dHIsIGkxOG5leHQudChrZXksIGV4dGVuZERlZmF1bHQob3B0cywgZWxlLmF0dHIoYXR0cikpKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbG9jYWxpemUoZWxlLCBvcHRzKSB7XG4gICAgdmFyIGtleSA9IGVsZS5hdHRyKG9wdGlvbnMuc2VsZWN0b3JBdHRyKTtcbiAgICBpZiAoIWtleSAmJiB0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJyAmJiBrZXkgIT09IGZhbHNlKSBrZXkgPSBlbGUudGV4dCgpIHx8IGVsZS52YWwoKTtcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xuXG4gICAgdmFyIHRhcmdldCA9IGVsZSxcbiAgICAgICAgdGFyZ2V0U2VsZWN0b3IgPSBlbGUuZGF0YShvcHRpb25zLnRhcmdldEF0dHIpO1xuXG4gICAgaWYgKHRhcmdldFNlbGVjdG9yKSB0YXJnZXQgPSBlbGUuZmluZCh0YXJnZXRTZWxlY3RvcikgfHwgZWxlO1xuXG4gICAgaWYgKCFvcHRzICYmIG9wdGlvbnMudXNlT3B0aW9uc0F0dHIgPT09IHRydWUpIG9wdHMgPSBlbGUuZGF0YShvcHRpb25zLm9wdGlvbnNBdHRyKTtcblxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgaWYgKGtleS5pbmRleE9mKCc7JykgPj0gMCkge1xuICAgICAgdmFyIGtleXMgPSBrZXkuc3BsaXQoJzsnKTtcblxuICAgICAgJC5lYWNoKGtleXMsIGZ1bmN0aW9uIChtLCBrKSB7XG4gICAgICAgIC8vIC50cmltKCk6IFRyaW0gdGhlIGNvbW1hLXNlcGFyYXRlZCBwYXJhbWV0ZXJzIG9uIHRoZSBkYXRhLWkxOG4gYXR0cmlidXRlLlxuICAgICAgICBpZiAoayAhPT0gJycpIHBhcnNlKHRhcmdldCwgay50cmltKCksIG9wdHMpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlKHRhcmdldCwga2V5LCBvcHRzKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy51c2VPcHRpb25zQXR0ciA9PT0gdHJ1ZSkge1xuICAgICAgdmFyIGNsb25lID0ge307XG4gICAgICBjbG9uZSA9IF9leHRlbmRzKHsgY2xvbmU6IGNsb25lIH0sIG9wdHMpO1xuXG4gICAgICBkZWxldGUgY2xvbmUubG5nO1xuICAgICAgZWxlLmRhdGEob3B0aW9ucy5vcHRpb25zQXR0ciwgY2xvbmUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZShvcHRzKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBsb2NhbGl6ZSBlbGVtZW50IGl0c2VsZlxuICAgICAgbG9jYWxpemUoJCh0aGlzKSwgb3B0cyk7XG5cbiAgICAgIC8vIGxvY2FsaXplIGNoaWxkcmVuXG4gICAgICB2YXIgZWxlbWVudHMgPSAkKHRoaXMpLmZpbmQoJ1snICsgb3B0aW9ucy5zZWxlY3RvckF0dHIgKyAnXScpO1xuICAgICAgZWxlbWVudHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvY2FsaXplKCQodGhpcyksIG9wdHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gJC50ICQuaTE4biBzaG9ydGN1dFxuICAkW29wdGlvbnMudE5hbWVdID0gaTE4bmV4dC50LmJpbmQoaTE4bmV4dCk7XG4gICRbb3B0aW9ucy5pMThuTmFtZV0gPSBpMThuZXh0O1xuXG4gIC8vIHNlbGVjdG9yIGZ1bmN0aW9uICQobXlTZWxlY3RvcikubG9jYWxpemUob3B0cyk7XG4gICQuZm5bb3B0aW9ucy5oYW5kbGVOYW1lXSA9IGhhbmRsZTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBpbml0OiBpbml0XG59OyIsIi8vIDsoZnVuY3Rpb24oIHdpbmRvdywgZG9jdW1lbnQsICQsIHVuZGVmaW5lZCApIHtcblxuaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XG5pbXBvcnQganF1ZXJ5STE4bmV4dCBmcm9tICdqcXVlcnktaTE4bmV4dCc7XG5cbi8vIHZhciBpMThuID0gcmVxdWlyZSgnaTE4bicpO1xuLy8gdmFyIGpxdWVyeUkxOG5leHQgPSByZXF1aXJlKCdqcXVlcnktaTE4bmV4dCcpO1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbmdsaXNoID0gcmVxdWlyZShcIi4uLy4vbG9jYWxlcy9lbi90cmFuc2xhdGlvbi5qc29uXCIpO1xudmFyIGdlcm1hbiA9IHJlcXVpcmUoXCIuLi8uL2xvY2FsZXMvZGUvdHJhbnNsYXRpb24uanNvblwiKTtcblxudmFyIHJlc291cmNlcyA9IHtcbiAgZW46IGVuZ2xpc2gsXG4gIGRlOiBnZXJtYW5cbn07XG5cbmZ1bmN0aW9uIGluaXRTbW9vdGhTY3JvbGxpbmcoKXtcbiAgLy8gU2VsZWN0IGFsbCBsaW5rcyB3aXRoIGhhc2hlc1xuICAkKCdhW2hyZWYqPVwiI1wiXScpXG4gICAgLy8gUmVtb3ZlIGxpbmtzIHRoYXQgZG9uJ3QgYWN0dWFsbHkgbGluayB0byBhbnl0aGluZ1xuICAgIC5ub3QoJ1tocmVmPVwiI1wiXScpXG4gICAgLm5vdCgnW2hyZWY9XCIjMFwiXScpXG4gICAgLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAvLyBPbi1wYWdlIGxpbmtzXG4gICAgICBpZiAoXG4gICAgICAgIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpICYmXG4gICAgICAgIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWVcbiAgICAgICkge1xuICAgICAgICAvLyBGaWd1cmUgb3V0IGVsZW1lbnQgdG8gc2Nyb2xsIHRvXG4gICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsgJ10nKTtcbiAgICAgICAgLy8gRG9lcyBhIHNjcm9sbCB0YXJnZXQgZXhpc3Q/XG4gICAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gT25seSBwcmV2ZW50IGRlZmF1bHQgaWYgYW5pbWF0aW9uIGlzIGFjdHVhbGx5IGdvbm5hIGhhcHBlblxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG4gICAgICAgICAgfSwgMTAwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBDYWxsYmFjayBhZnRlciBhbmltYXRpb25cbiAgICAgICAgICAgIC8vIE11c3QgY2hhbmdlIGZvY3VzIVxuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKHRhcmdldCk7XG4gICAgICAgICAgICAkdGFyZ2V0LmZvY3VzKCk7XG4gICAgICAgICAgICBpZiAoJHRhcmdldC5pcyhcIjpmb2N1c1wiKSkgeyAvLyBDaGVja2luZyBpZiB0aGUgdGFyZ2V0IHdhcyBmb2N1c2VkXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICR0YXJnZXQuYXR0cigndGFiaW5kZXgnLCctMScpOyAvLyBBZGRpbmcgdGFiaW5kZXggZm9yIGVsZW1lbnRzIG5vdCBmb2N1c2FibGVcbiAgICAgICAgICAgICAgJHRhcmdldC5mb2N1cygpOyAvLyBTZXQgZm9jdXMgYWdhaW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBmYWRlSW5TY3JvbGxUb3BCdXR0b24oKXtcbiAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IDI1MCkge1xuICAgICQoJy5iYWNrLXRvLXRvcCcpLmZhZGVJbig0MDApO1xuICB9IGVsc2Uge1xuICAgICQoJy5iYWNrLXRvLXRvcCcpLmZhZGVPdXQoNDAwKTtcbiAgfVxufVxuXG52YXIgbGFuZ3VhZ2VMb29rdXAgPSB7XG4gIFwiRGV1dHNjaFwiOiBcImRlXCIsXG4gIFwiRW5nbGlzaFwiOiBcImVuXCJcbn1cblxuZnVuY3Rpb24gc3dpdGNoTGFuZ3VhZ2UoZXZlbnQpe1xuICB2YXIgdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuICAvLyBpZigkKGV2ZW50LnRhcmdldCkuaGFzQ2xhc3MoXCJhY3RpdmVcIikpXG4gIC8vICAgcmV0dXJuO1xuICAkKFwiI2xhbmd1YWdlcyAubGFuZ3VhZ2VcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gIHRhcmdldC5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgaTE4bmV4dC5jaGFuZ2VMYW5ndWFnZShsYW5ndWFnZUxvb2t1cFt0YXJnZXQudGV4dCgpXSk7XG4gICQoXCJbZGF0YS1pMThuXVwiKS5sb2NhbGl6ZSgpO1xufVxuXG5mdW5jdGlvbiBhZGRMYW5ndWFnZVN3aXRjaEhhbmRsZXIoKXtcbiAgJChcIiNsYW5ndWFnZXMgLmxhbmd1YWdlXCIpLmNsaWNrKHN3aXRjaExhbmd1YWdlKVxufVxuXG5mdW5jdGlvbiBpbml0SnF1ZXJ5STE4bmV4dCgpe1xuICBpMThuZXh0LmluaXQoe1xuICAgIGxuZzogJ2VuJyxcbiAgICBkZWJ1ZzogdHJ1ZSxcbiAgICByZXNvdXJjZXM6IHJlc291cmNlc1xuICB9LCBmdW5jdGlvbihlcnIsIHQpIHtcbiAgICAvLyBpbml0aWFsaXplZCBhbmQgcmVhZHkgdG8gZ28hXG4gIH0pO1xuXG4gIGpxdWVyeUkxOG5leHQuaW5pdChpMThuZXh0LCAkLCB7XG4gICAgdE5hbWU6ICd0JywgLy8gLS0+IGFwcGVuZHMgJC50ID0gaTE4bmV4dC50XG4gICAgaTE4bk5hbWU6ICdpMThuJywgLy8gLS0+IGFwcGVuZHMgJC5pMThuID0gaTE4bmV4dFxuICAgIGhhbmRsZU5hbWU6ICdsb2NhbGl6ZScsIC8vIC0tPiBhcHBlbmRzICQoc2VsZWN0b3IpLmxvY2FsaXplKG9wdHMpO1xuICAgIHNlbGVjdG9yQXR0cjogJ2RhdGEtaTE4bicsIC8vIHNlbGVjdG9yIGZvciB0cmFuc2xhdGluZyBlbGVtZW50c1xuICAgIHRhcmdldEF0dHI6ICdpMThuLXRhcmdldCcsIC8vIGRhdGEtKCkgYXR0cmlidXRlIHRvIGdyYWIgdGFyZ2V0IGVsZW1lbnQgdG8gdHJhbnNsYXRlIChpZiBkaWZmcmVudCB0aGVuIGl0c2VsZilcbiAgICBvcHRpb25zQXR0cjogJ2kxOG4tb3B0aW9ucycsIC8vIGRhdGEtKCkgYXR0cmlidXRlIHRoYXQgY29udGFpbnMgb3B0aW9ucywgd2lsbCBsb2FkL3NldCBpZiB1c2VPcHRpb25zQXR0ciA9IHRydWVcbiAgICB1c2VPcHRpb25zQXR0cjogZmFsc2UsIC8vIHNlZSBvcHRpb25zQXR0clxuICAgIHBhcnNlRGVmYXVsdFZhbHVlRnJvbUNvbnRlbnQ6IHRydWUgLy8gcGFyc2VzIGRlZmF1bHQgdmFsdWVzIGZyb20gY29udGVudCBlbGUudmFsIG9yIGVsZS50ZXh0XG4gIH0pO1xufVxuXG4vLyBET00gaXMgcmVhZHlcbiQoZnVuY3Rpb24oKXtcbiAgaW5pdFNtb290aFNjcm9sbGluZygpO1xuICBpbml0SnF1ZXJ5STE4bmV4dCgpO1xuICBhZGRMYW5ndWFnZVN3aXRjaEhhbmRsZXIoKTtcbiAgJCh3aW5kb3cpLnNjcm9sbChmYWRlSW5TY3JvbGxUb3BCdXR0b24pO1xuICAkKFwiI2xvYWRlclwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbn0pO1xuXG4vLyB9KSggd2luZG93LCBkb2N1bWVudCwgalF1ZXJ5ICk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgXCJuYXZcIjoge1xyXG4gICAgXCJob21lXCI6IFwiSG9tZTMzM1wiLFxyXG4gICAgXCJwcm9qZWN0c1wiOiBcIlByb2plY3RzMzMzXCIsXHJcbiAgICBcImFib3V0TWVcIjogXCJBYm91dCBNZTMzM1wiLFxyXG4gICAgXCJjb250YWN0XCI6IFwiQ29udGFjdDMzM1wiXHJcbiAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzPXtcclxuICAgIFwibmF2XCI6IHtcclxuICAgICAgXCJob21lXCI6IFwiSG9tZTIyMlwiLFxyXG4gICAgICBcInByb2plY3RzXCI6IFwiUHJvamVjdHMyMjJcIixcclxuICAgICAgXCJhYm91dE1lXCI6IFwiQWJvdXQgTWUyMjJcIixcclxuICAgICAgXCJjb250YWN0XCI6IFwiQ29udGFjdDIyMlwiXHJcbiAgICB9XHJcbiAgfSJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWNtOTNjMlZ5TFhCaFkyc3ZYM0J5Wld4MVpHVXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZhVEU0Ym1WNGRDOWthWE4wTDJOdmJXMXZibXB6TDBKaFkydGxibVJEYjI1dVpXTjBiM0l1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12YVRFNGJtVjRkQzlrYVhOMEwyTnZiVzF2Ym1wekwwTmhZMmhsUTI5dWJtVmpkRzl5TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJreE9HNWxlSFF2WkdsemRDOWpiMjF0YjI1cWN5OUZkbVZ1ZEVWdGFYUjBaWEl1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12YVRFNGJtVjRkQzlrYVhOMEwyTnZiVzF2Ym1wekwwbHVkR1Z5Y0c5c1lYUnZjaTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlwTVRodVpYaDBMMlJwYzNRdlkyOXRiVzl1YW5NdlRHRnVaM1ZoWjJWVmRHbHNjeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlwTVRodVpYaDBMMlJwYzNRdlkyOXRiVzl1YW5NdlVHeDFjbUZzVW1WemIyeDJaWEl1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12YVRFNGJtVjRkQzlrYVhOMEwyTnZiVzF2Ym1wekwxSmxjMjkxY21ObFUzUnZjbVV1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12YVRFNGJtVjRkQzlrYVhOMEwyTnZiVzF2Ym1wekwxUnlZVzV6YkdGMGIzSXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZhVEU0Ym1WNGRDOWthWE4wTDJOdmJXMXZibXB6TDJSbFptRjFiSFJ6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJreE9HNWxlSFF2WkdsemRDOWpiMjF0YjI1cWN5OXBNVGh1WlhoMExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwya3hPRzVsZUhRdlpHbHpkQzlqYjIxdGIyNXFjeTlwYm1SbGVDNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OXBNVGh1WlhoMEwyUnBjM1F2WTI5dGJXOXVhbk12Ykc5bloyVnlMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMmt4T0c1bGVIUXZaR2x6ZEM5amIyMXRiMjVxY3k5d2IzTjBVSEp2WTJWemMyOXlMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMmt4T0c1bGVIUXZaR2x6ZEM5amIyMXRiMjVxY3k5MWRHbHNjeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlwTVRodVpYaDBMMmx1WkdWNExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwycHhkV1Z5ZVMxcE1UaHVaWGgwTDJScGMzUXZZMjl0Ylc5dWFuTXZhVzVrWlhndWFuTWlMQ0p6Y21NdmFuTXZiV0ZwYmk1cWN5SXNJbk55WXk5c2IyTmhiR1Z6TDJSbEwzUnlZVzV6YkdGMGFXOXVMbXB6YjI0aUxDSnpjbU12Ykc5allXeGxjeTlsYmk5MGNtRnVjMnhoZEdsdmJpNXFjMjl1SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk8wRkRRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMnBVUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEZWtaQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTndSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOd1RVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRGNFbEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlF6Rk1RVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU0xU2tFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEzcFZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU53UmtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRek5pUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUXpWQ1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU51UjBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRGNrSkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRkRWhCTzBGQlEwRTdPMEZEUkVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPenM3T3p0QlEzcElRVHM3T3p0QlFVTkJPenM3T3pzN1FVRkZRVHRCUVVOQk96dEJRVTVCT3p0QlFWRkJPenRCUVVWQkxFbEJRVWtzVlVGQlZTeFJRVUZSTEd0RFFVRlNMRU5CUVdRN1FVRkRRU3hKUVVGSkxGTkJRVk1zVVVGQlVTeHJRMEZCVWl4RFFVRmlPenRCUVVWQkxFbEJRVWtzV1VGQldUdEJRVU5rTEUxQlFVa3NUMEZFVlR0QlFVVmtMRTFCUVVrN1FVRkdWU3hEUVVGb1FqczdRVUZMUVN4VFFVRlRMRzFDUVVGVUxFZEJRVGhDTzBGQlF6VkNPMEZCUTBFc1NVRkJSU3hqUVVGR08wRkJRMFU3UVVGRVJpeEhRVVZITEVkQlJrZ3NRMEZGVHl4WlFVWlFMRVZCUjBjc1IwRklTQ3hEUVVkUExHRkJTRkFzUlVGSlJ5eExRVXBJTEVOQlNWTXNWVUZCVXl4TFFVRlVMRVZCUVdkQ08wRkJRM0pDTzBGQlEwRXNVVUZEUlN4VFFVRlRMRkZCUVZRc1EwRkJhMElzVDBGQmJFSXNRMEZCTUVJc1MwRkJNVUlzUlVGQmFVTXNSVUZCYWtNc1MwRkJkME1zUzBGQlN5eFJRVUZNTEVOQlFXTXNUMEZCWkN4RFFVRnpRaXhMUVVGMFFpeEZRVUUyUWl4RlFVRTNRaXhEUVVGNFF5eEpRVU5CTEZOQlFWTXNVVUZCVkN4SlFVRnhRaXhMUVVGTExGRkJSalZDTEVWQlIwVTdRVUZEUVR0QlFVTkJMRlZCUVVrc1UwRkJVeXhGUVVGRkxFdEJRVXNzU1VGQlVDeERRVUZpTzBGQlEwRXNaVUZCVXl4UFFVRlBMRTFCUVZBc1IwRkJaMElzVFVGQmFFSXNSMEZCZVVJc1JVRkJSU3hYUVVGWExFdEJRVXNzU1VGQlRDeERRVUZWTEV0QlFWWXNRMEZCWjBJc1EwRkJhRUlzUTBGQldDeEhRVUZuUXl4SFFVRnNReXhEUVVGc1F6dEJRVU5CTzBGQlEwRXNWVUZCU1N4UFFVRlBMRTFCUVZnc1JVRkJiVUk3UVVGRGFrSTdRVUZEUVN4alFVRk5MR05CUVU0N1FVRkRRU3hWUVVGRkxGbEJRVVlzUlVGQlowSXNUMEZCYUVJc1EwRkJkMEk3UVVGRGRFSXNjVUpCUVZjc1QwRkJUeXhOUVVGUUxFZEJRV2RDTzBGQlJFd3NVMEZCZUVJc1JVRkZSeXhKUVVaSUxFVkJSVk1zV1VGQlZ6dEJRVU5zUWp0QlFVTkJPMEZCUTBFc1kwRkJTU3hWUVVGVkxFVkJRVVVzVFVGQlJpeERRVUZrTzBGQlEwRXNhMEpCUVZFc1MwRkJVanRCUVVOQkxHTkJRVWtzVVVGQlVTeEZRVUZTTEVOQlFWY3NVVUZCV0N4RFFVRktMRVZCUVRCQ08wRkJRVVU3UVVGRE1VSXNiVUpCUVU4c1MwRkJVRHRCUVVORUxGZEJSa1FzVFVGRlR6dEJRVU5NTEc5Q1FVRlJMRWxCUVZJc1EwRkJZU3hWUVVGaUxFVkJRWGRDTEVsQlFYaENMRVZCUkVzc1EwRkRNRUk3UVVGREwwSXNiMEpCUVZFc1MwRkJVaXhIUVVaTExFTkJSVms3UVVGRGJFSTdRVUZEUml4VFFXSkVPMEZCWTBRN1FVRkRSanRCUVVOR0xFZEJha05JTzBGQmEwTkVPenRCUVVWRUxGTkJRVk1zY1VKQlFWUXNSMEZCWjBNN1FVRkRPVUlzVFVGQlNTeEZRVUZGTEUxQlFVWXNSVUZCVlN4VFFVRldMRXRCUVhkQ0xFZEJRVFZDTEVWQlFXbERPMEZCUXk5Q0xFMUJRVVVzWTBGQlJpeEZRVUZyUWl4TlFVRnNRaXhEUVVGNVFpeEhRVUY2UWp0QlFVTkVMRWRCUmtRc1RVRkZUenRCUVVOTUxFMUJRVVVzWTBGQlJpeEZRVUZyUWl4UFFVRnNRaXhEUVVFd1FpeEhRVUV4UWp0QlFVTkVPMEZCUTBZN08wRkJSVVFzU1VGQlNTeHBRa0ZCYVVJN1FVRkRia0lzWVVGQlZ5eEpRVVJSTzBGQlJXNUNMR0ZCUVZjN1FVRkdVU3hEUVVGeVFqczdRVUZMUVN4VFFVRlRMR05CUVZRc1EwRkJkMElzUzBGQmVFSXNSVUZCT0VJN1FVRkROVUlzVFVGQlNTeFRRVUZUTEVWQlFVVXNUVUZCVFN4TlFVRlNMRU5CUVdJN1FVRkRRVHRCUVVOQk8wRkJRMEVzU1VGQlJTeHpRa0ZCUml4RlFVRXdRaXhYUVVFeFFpeERRVUZ6UXl4UlFVRjBRenRCUVVOQkxGTkJRVThzVVVGQlVDeERRVUZuUWl4UlFVRm9RanRCUVVOQkxHOUNRVUZSTEdOQlFWSXNRMEZCZFVJc1pVRkJaU3hQUVVGUExFbEJRVkFzUlVGQlppeERRVUYyUWp0QlFVTkJMRWxCUVVVc1lVRkJSaXhGUVVGcFFpeFJRVUZxUWp0QlFVTkVPenRCUVVWRUxGTkJRVk1zZDBKQlFWUXNSMEZCYlVNN1FVRkRha01zU1VGQlJTeHpRa0ZCUml4RlFVRXdRaXhMUVVFeFFpeERRVUZuUXl4alFVRm9RenRCUVVORU96dEJRVVZFTEZOQlFWTXNhVUpCUVZRc1IwRkJORUk3UVVGRE1VSXNiMEpCUVZFc1NVRkJVaXhEUVVGaE8wRkJRMWdzVTBGQlN5eEpRVVJOTzBGQlJWZ3NWMEZCVHl4SlFVWkpPMEZCUjFnc1pVRkJWenRCUVVoQkxFZEJRV0lzUlVGSlJ5eFZRVUZUTEVkQlFWUXNSVUZCWXl4RFFVRmtMRVZCUVdsQ08wRkJRMnhDTzBGQlEwUXNSMEZPUkRzN1FVRlJRU3d3UWtGQll5eEpRVUZrTEc5Q1FVRTBRaXhEUVVFMVFpeEZRVUVyUWp0QlFVTTNRaXhYUVVGUExFZEJSSE5DTEVWQlEycENPMEZCUTFvc1kwRkJWU3hOUVVadFFpeEZRVVZZTzBGQlEyeENMR2RDUVVGWkxGVkJTR2xDTEVWQlIwdzdRVUZEZUVJc2EwSkJRV01zVjBGS1pTeEZRVWxHTzBGQlF6TkNMR2RDUVVGWkxHRkJUR2xDTEVWQlMwWTdRVUZETTBJc2FVSkJRV0VzWTBGT1owSXNSVUZOUVR0QlFVTTNRaXh2UWtGQlowSXNTMEZRWVN4RlFVOU9PMEZCUTNaQ0xHdERRVUU0UWl4SlFWSkVMRU5CVVUwN1FVRlNUaXhIUVVFdlFqdEJRVlZFT3p0QlFVVkVPMEZCUTBFc1JVRkJSU3haUVVGVk8wRkJRMVk3UVVGRFFUdEJRVU5CTzBGQlEwRXNTVUZCUlN4TlFVRkdMRVZCUVZVc1RVRkJWaXhEUVVGcFFpeHhRa0ZCYWtJN1FVRkRRU3hKUVVGRkxGTkJRVVlzUlVGQllTeFhRVUZpTEVOQlFYbENMRkZCUVhwQ08wRkJRMFFzUTBGT1JEczdRVUZSUVRzN08wRkRha2hCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5TUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW9ablZ1WTNScGIyNG9LWHRtZFc1amRHbHZiaUJsS0hRc2JpeHlLWHRtZFc1amRHbHZiaUJ6S0c4c2RTbDdhV1lvSVc1YmIxMHBlMmxtS0NGMFcyOWRLWHQyWVhJZ1lUMTBlWEJsYjJZZ2NtVnhkV2x5WlQwOVhDSm1kVzVqZEdsdmJsd2lKaVp5WlhGMWFYSmxPMmxtS0NGMUppWmhLWEpsZEhWeWJpQmhLRzhzSVRBcE8ybG1LR2twY21WMGRYSnVJR2tvYnl3aE1DazdkbUZ5SUdZOWJtVjNJRVZ5Y205eUtGd2lRMkZ1Ym05MElHWnBibVFnYlc5a2RXeGxJQ2RjSWl0dksxd2lKMXdpS1R0MGFISnZkeUJtTG1OdlpHVTlYQ0pOVDBSVlRFVmZUazlVWDBaUFZVNUVYQ0lzWm4xMllYSWdiRDF1VzI5ZFBYdGxlSEJ2Y25Sek9udDlmVHQwVzI5ZFd6QmRMbU5oYkd3b2JDNWxlSEJ2Y25SekxHWjFibU4wYVc5dUtHVXBlM1poY2lCdVBYUmJiMTFiTVYxYlpWMDdjbVYwZFhKdUlITW9iajl1T21VcGZTeHNMR3d1Wlhod2IzSjBjeXhsTEhRc2JpeHlLWDF5WlhSMWNtNGdibHR2WFM1bGVIQnZjblJ6ZlhaaGNpQnBQWFI1Y0dWdlppQnlaWEYxYVhKbFBUMWNJbVoxYm1OMGFXOXVYQ0ltSm5KbGNYVnBjbVU3Wm05eUtIWmhjaUJ2UFRBN2J6eHlMbXhsYm1kMGFEdHZLeXNwY3loeVcyOWRLVHR5WlhSMWNtNGdjMzF5WlhSMWNtNGdaWDBwS0NraUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JrOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JjSWw5ZlpYTk5iMlIxYkdWY0lpd2dlMXh1SUNCMllXeDFaVG9nZEhKMVpWeHVmU2s3WEc1Y2JuWmhjaUJmWlhoMFpXNWtjeUE5SUU5aWFtVmpkQzVoYzNOcFoyNGdmSHdnWm5WdVkzUnBiMjRnS0hSaGNtZGxkQ2tnZXlCbWIzSWdLSFpoY2lCcElEMGdNVHNnYVNBOElHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnN0lHa3JLeWtnZXlCMllYSWdjMjkxY21ObElEMGdZWEpuZFcxbGJuUnpXMmxkT3lCbWIzSWdLSFpoY2lCclpYa2dhVzRnYzI5MWNtTmxLU0I3SUdsbUlDaFBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29jMjkxY21ObExDQnJaWGtwS1NCN0lIUmhjbWRsZEZ0clpYbGRJRDBnYzI5MWNtTmxXMnRsZVYwN0lIMGdmU0I5SUhKbGRIVnliaUIwWVhKblpYUTdJSDA3WEc1Y2JuWmhjaUJmYzJ4cFkyVmtWRzlCY25KaGVTQTlJR1oxYm1OMGFXOXVJQ2dwSUhzZ1puVnVZM1JwYjI0Z2MyeHBZMlZKZEdWeVlYUnZjaWhoY25Jc0lHa3BJSHNnZG1GeUlGOWhjbklnUFNCYlhUc2dkbUZ5SUY5dUlEMGdkSEoxWlRzZ2RtRnlJRjlrSUQwZ1ptRnNjMlU3SUhaaGNpQmZaU0E5SUhWdVpHVm1hVzVsWkRzZ2RISjVJSHNnWm05eUlDaDJZWElnWDJrZ1BTQmhjbkpiVTNsdFltOXNMbWwwWlhKaGRHOXlYU2dwTENCZmN6c2dJU2hmYmlBOUlDaGZjeUE5SUY5cExtNWxlSFFvS1NrdVpHOXVaU2s3SUY5dUlEMGdkSEoxWlNrZ2V5QmZZWEp5TG5CMWMyZ29YM011ZG1Gc2RXVXBPeUJwWmlBb2FTQW1KaUJmWVhKeUxteGxibWQwYUNBOVBUMGdhU2tnWW5KbFlXczdJSDBnZlNCallYUmphQ0FvWlhKeUtTQjdJRjlrSUQwZ2RISjFaVHNnWDJVZ1BTQmxjbkk3SUgwZ1ptbHVZV3hzZVNCN0lIUnllU0I3SUdsbUlDZ2hYMjRnSmlZZ1gybGJYQ0p5WlhSMWNtNWNJbDBwSUY5cFcxd2ljbVYwZFhKdVhDSmRLQ2s3SUgwZ1ptbHVZV3hzZVNCN0lHbG1JQ2hmWkNrZ2RHaHliM2NnWDJVN0lIMGdmU0J5WlhSMWNtNGdYMkZ5Y2pzZ2ZTQnlaWFIxY200Z1puVnVZM1JwYjI0Z0tHRnljaXdnYVNrZ2V5QnBaaUFvUVhKeVlYa3VhWE5CY25KaGVTaGhjbklwS1NCN0lISmxkSFZ5YmlCaGNuSTdJSDBnWld4elpTQnBaaUFvVTNsdFltOXNMbWwwWlhKaGRHOXlJR2x1SUU5aWFtVmpkQ2hoY25JcEtTQjdJSEpsZEhWeWJpQnpiR2xqWlVsMFpYSmhkRzl5S0dGeWNpd2dhU2s3SUgwZ1pXeHpaU0I3SUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb1hDSkpiblpoYkdsa0lHRjBkR1Z0Y0hRZ2RHOGdaR1Z6ZEhKMVkzUjFjbVVnYm05dUxXbDBaWEpoWW14bElHbHVjM1JoYm1ObFhDSXBPeUI5SUgwN0lIMG9LVHRjYmx4dWRtRnlJRjkxZEdsc2N5QTlJSEpsY1hWcGNtVW9KeTR2ZFhScGJITXVhbk1uS1R0Y2JseHVkbUZ5SUhWMGFXeHpJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxWMmxzWkdOaGNtUW9YM1YwYVd4ektUdGNibHh1ZG1GeUlGOXNiMmRuWlhJZ1BTQnlaWEYxYVhKbEtDY3VMMnh2WjJkbGNpNXFjeWNwTzF4dVhHNTJZWElnWDJ4dloyZGxjaklnUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjlzYjJkblpYSXBPMXh1WEc1MllYSWdYMFYyWlc1MFJXMXBkSFJsY2pJZ1BTQnlaWEYxYVhKbEtDY3VMMFYyWlc1MFJXMXBkSFJsY2k1cWN5Y3BPMXh1WEc1MllYSWdYMFYyWlc1MFJXMXBkSFJsY2pNZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5RmRtVnVkRVZ0YVhSMFpYSXlLVHRjYmx4dVpuVnVZM1JwYjI0Z1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2h2WW1vcElIc2djbVYwZFhKdUlHOWlhaUFtSmlCdlltb3VYMTlsYzAxdlpIVnNaU0EvSUc5aWFpQTZJSHNnWkdWbVlYVnNkRG9nYjJKcUlIMDdJSDFjYmx4dVpuVnVZM1JwYjI0Z1gybHVkR1Z5YjNCU1pYRjFhWEpsVjJsc1pHTmhjbVFvYjJKcUtTQjdJR2xtSUNodlltb2dKaVlnYjJKcUxsOWZaWE5OYjJSMWJHVXBJSHNnY21WMGRYSnVJRzlpYWpzZ2ZTQmxiSE5sSUhzZ2RtRnlJRzVsZDA5aWFpQTlJSHQ5T3lCcFppQW9iMkpxSUNFOUlHNTFiR3dwSUhzZ1ptOXlJQ2gyWVhJZ2EyVjVJR2x1SUc5aWFpa2dleUJwWmlBb1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHOWlhaXdnYTJWNUtTa2dibVYzVDJKcVcydGxlVjBnUFNCdlltcGJhMlY1WFRzZ2ZTQjlJRzVsZDA5aWFpNWtaV1poZFd4MElEMGdiMkpxT3lCeVpYUjFjbTRnYm1WM1QySnFPeUI5SUgxY2JseHVablZ1WTNScGIyNGdYMlJsWm1GMWJIUnpLRzlpYWl3Z1pHVm1ZWFZzZEhNcElIc2dkbUZ5SUd0bGVYTWdQU0JQWW1wbFkzUXVaMlYwVDNkdVVISnZjR1Z5ZEhsT1lXMWxjeWhrWldaaGRXeDBjeWs3SUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2EyVjVjeTVzWlc1bmRHZzdJR2tyS3lrZ2V5QjJZWElnYTJWNUlEMGdhMlY1YzF0cFhUc2dkbUZ5SUhaaGJIVmxJRDBnVDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVJHVnpZM0pwY0hSdmNpaGtaV1poZFd4MGN5d2dhMlY1S1RzZ2FXWWdLSFpoYkhWbElDWW1JSFpoYkhWbExtTnZibVpwWjNWeVlXSnNaU0FtSmlCdlltcGJhMlY1WFNBOVBUMGdkVzVrWldacGJtVmtLU0I3SUU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaHZZbW9zSUd0bGVTd2dkbUZzZFdVcE95QjlJSDBnY21WMGRYSnVJRzlpYWpzZ2ZWeHVYRzVtZFc1amRHbHZiaUJmWTJ4aGMzTkRZV3hzUTJobFkyc29hVzV6ZEdGdVkyVXNJRU52Ym5OMGNuVmpkRzl5S1NCN0lHbG1JQ2doS0dsdWMzUmhibU5sSUdsdWMzUmhibU5sYjJZZ1EyOXVjM1J5ZFdOMGIzSXBLU0I3SUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb1hDSkRZVzV1YjNRZ1kyRnNiQ0JoSUdOc1lYTnpJR0Z6SUdFZ1puVnVZM1JwYjI1Y0lpazdJSDBnZlZ4dVhHNW1kVzVqZEdsdmJpQmZjRzl6YzJsaWJHVkRiMjV6ZEhKMVkzUnZjbEpsZEhWeWJpaHpaV3htTENCallXeHNLU0I3SUdsbUlDZ2hjMlZzWmlrZ2V5QjBhSEp2ZHlCdVpYY2dVbVZtWlhKbGJtTmxSWEp5YjNJb1hDSjBhR2x6SUdoaGMyNG5kQ0JpWldWdUlHbHVhWFJwWVd4cGMyVmtJQzBnYzNWd1pYSW9LU0JvWVhOdUozUWdZbVZsYmlCallXeHNaV1JjSWlrN0lIMGdjbVYwZFhKdUlHTmhiR3dnSmlZZ0tIUjVjR1Z2WmlCallXeHNJRDA5UFNCY0ltOWlhbVZqZEZ3aUlIeDhJSFI1Y0dWdlppQmpZV3hzSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lwSUQ4Z1kyRnNiQ0E2SUhObGJHWTdJSDFjYmx4dVpuVnVZM1JwYjI0Z1gybHVhR1Z5YVhSektITjFZa05zWVhOekxDQnpkWEJsY2tOc1lYTnpLU0I3SUdsbUlDaDBlWEJsYjJZZ2MzVndaWEpEYkdGemN5QWhQVDBnWENKbWRXNWpkR2x2Ymx3aUlDWW1JSE4xY0dWeVEyeGhjM01nSVQwOUlHNTFiR3dwSUhzZ2RHaHliM2NnYm1WM0lGUjVjR1ZGY25KdmNpaGNJbE4xY0dWeUlHVjRjSEpsYzNOcGIyNGdiWFZ6ZENCbGFYUm9aWElnWW1VZ2JuVnNiQ0J2Y2lCaElHWjFibU4wYVc5dUxDQnViM1FnWENJZ0t5QjBlWEJsYjJZZ2MzVndaWEpEYkdGemN5azdJSDBnYzNWaVEyeGhjM011Y0hKdmRHOTBlWEJsSUQwZ1QySnFaV04wTG1OeVpXRjBaU2h6ZFhCbGNrTnNZWE56SUNZbUlITjFjR1Z5UTJ4aGMzTXVjSEp2ZEc5MGVYQmxMQ0I3SUdOdmJuTjBjblZqZEc5eU9pQjdJSFpoYkhWbE9pQnpkV0pEYkdGemN5d2daVzUxYldWeVlXSnNaVG9nWm1Gc2MyVXNJSGR5YVhSaFlteGxPaUIwY25WbExDQmpiMjVtYVdkMWNtRmliR1U2SUhSeWRXVWdmU0I5S1RzZ2FXWWdLSE4xY0dWeVEyeGhjM01wSUU5aWFtVmpkQzV6WlhSUWNtOTBiM1I1Y0dWUFppQS9JRTlpYW1WamRDNXpaWFJRY205MGIzUjVjR1ZQWmloemRXSkRiR0Z6Y3l3Z2MzVndaWEpEYkdGemN5a2dPaUJmWkdWbVlYVnNkSE1vYzNWaVEyeGhjM01zSUhOMWNHVnlRMnhoYzNNcE95QjlYRzVjYm1aMWJtTjBhVzl1SUhKbGJXOTJaU2hoY25Jc0lIZG9ZWFFwSUh0Y2JpQWdkbUZ5SUdadmRXNWtJRDBnWVhKeUxtbHVaR1Y0VDJZb2QyaGhkQ2s3WEc1Y2JpQWdkMmhwYkdVZ0tHWnZkVzVrSUNFOVBTQXRNU2tnZTF4dUlDQWdJR0Z5Y2k1emNHeHBZMlVvWm05MWJtUXNJREVwTzF4dUlDQWdJR1p2ZFc1a0lEMGdZWEp5TG1sdVpHVjRUMllvZDJoaGRDazdYRzRnSUgxY2JuMWNibHh1ZG1GeUlFTnZibTVsWTNSdmNpQTlJR1oxYm1OMGFXOXVJQ2hmUlhabGJuUkZiV2wwZEdWeUtTQjdYRzRnSUY5cGJtaGxjbWwwY3loRGIyNXVaV04wYjNJc0lGOUZkbVZ1ZEVWdGFYUjBaWElwTzF4dVhHNGdJR1oxYm1OMGFXOXVJRU52Ym01bFkzUnZjaWhpWVdOclpXNWtMQ0J6ZEc5eVpTd2djMlZ5ZG1salpYTXBJSHRjYmlBZ0lDQjJZWElnYjNCMGFXOXVjeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBeklDWW1JR0Z5WjNWdFpXNTBjMXN6WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pOZElEb2dlMzA3WEc1Y2JpQWdJQ0JmWTJ4aGMzTkRZV3hzUTJobFkyc29kR2hwY3l3Z1EyOXVibVZqZEc5eUtUdGNibHh1SUNBZ0lIWmhjaUJmZEdocGN5QTlJRjl3YjNOemFXSnNaVU52Ym5OMGNuVmpkRzl5VW1WMGRYSnVLSFJvYVhNc0lGOUZkbVZ1ZEVWdGFYUjBaWEl1WTJGc2JDaDBhR2x6S1NrN1hHNWNiaUFnSUNCZmRHaHBjeTVpWVdOclpXNWtJRDBnWW1GamEyVnVaRHRjYmlBZ0lDQmZkR2hwY3k1emRHOXlaU0E5SUhOMGIzSmxPMXh1SUNBZ0lGOTBhR2x6TG14aGJtZDFZV2RsVlhScGJITWdQU0J6WlhKMmFXTmxjeTVzWVc1bmRXRm5aVlYwYVd4ek8xeHVJQ0FnSUY5MGFHbHpMbTl3ZEdsdmJuTWdQU0J2Y0hScGIyNXpPMXh1SUNBZ0lGOTBhR2x6TG14dloyZGxjaUE5SUY5c2IyZG5aWEl5TG1SbFptRjFiSFF1WTNKbFlYUmxLQ2RpWVdOclpXNWtRMjl1Ym1WamRHOXlKeWs3WEc1Y2JpQWdJQ0JmZEdocGN5NXpkR0YwWlNBOUlIdDlPMXh1SUNBZ0lGOTBhR2x6TG5GMVpYVmxJRDBnVzEwN1hHNWNiaUFnSUNCcFppQW9YM1JvYVhNdVltRmphMlZ1WkNBbUppQmZkR2hwY3k1aVlXTnJaVzVrTG1sdWFYUXBJSHRjYmlBZ0lDQWdJRjkwYUdsekxtSmhZMnRsYm1RdWFXNXBkQ2h6WlhKMmFXTmxjeXdnYjNCMGFXOXVjeTVpWVdOclpXNWtMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUY5MGFHbHpPMXh1SUNCOVhHNWNiaUFnUTI5dWJtVmpkRzl5TG5CeWIzUnZkSGx3WlM1eGRXVjFaVXh2WVdRZ1BTQm1kVzVqZEdsdmJpQnhkV1YxWlV4dllXUW9iR0Z1WjNWaFoyVnpMQ0J1WVcxbGMzQmhZMlZ6TENCallXeHNZbUZqYXlrZ2UxeHVJQ0FnSUhaaGNpQmZkR2hwY3pJZ1BTQjBhR2x6TzF4dVhHNGdJQ0FnTHk4Z1ptbHVaQ0IzYUdGMElHNWxaV1J6SUhSdklHSmxJR3h2WVdSbFpGeHVJQ0FnSUhaaGNpQjBiMHh2WVdRZ1BTQmJYVHRjYmlBZ0lDQjJZWElnY0dWdVpHbHVaeUE5SUZ0ZE8xeHVJQ0FnSUhaaGNpQjBiMHh2WVdSTVlXNW5kV0ZuWlhNZ1BTQmJYVHRjYmlBZ0lDQjJZWElnZEc5TWIyRmtUbUZ0WlhOd1lXTmxjeUE5SUZ0ZE8xeHVYRzRnSUNBZ2JHRnVaM1ZoWjJWekxtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z0tHeHVaeWtnZTF4dUlDQWdJQ0FnZG1GeUlHaGhjMEZzYkU1aGJXVnpjR0ZqWlhNZ1BTQjBjblZsTzF4dVhHNGdJQ0FnSUNCdVlXMWxjM0JoWTJWekxtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z0tHNXpLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQnVZVzFsSUQwZ2JHNW5JQ3NnSjN3bklDc2dibk03WEc1Y2JpQWdJQ0FnSUNBZ2FXWWdLRjkwYUdsek1pNXpkRzl5WlM1b1lYTlNaWE52ZFhKalpVSjFibVJzWlNoc2JtY3NJRzV6S1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJRjkwYUdsek1pNXpkR0YwWlZ0dVlXMWxYU0E5SURJN0lDOHZJR3h2WVdSbFpGeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLRjkwYUdsek1pNXpkR0YwWlZ0dVlXMWxYU0E4SURBcElIdGNiaUFnSUNBZ0lDQWdJQ0F2THlCdWIzUm9hVzVuSUhSdklHUnZJR1p2Y2lCbGNuSmNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2hmZEdocGN6SXVjM1JoZEdWYmJtRnRaVjBnUFQwOUlERXBJSHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9jR1Z1WkdsdVp5NXBibVJsZUU5bUtHNWhiV1VwSUR3Z01Da2djR1Z1WkdsdVp5NXdkWE5vS0c1aGJXVXBPMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUY5MGFHbHpNaTV6ZEdGMFpWdHVZVzFsWFNBOUlERTdJQzh2SUhCbGJtUnBibWRjYmx4dUlDQWdJQ0FnSUNBZ0lHaGhjMEZzYkU1aGJXVnpjR0ZqWlhNZ1BTQm1ZV3h6WlR0Y2JseHVJQ0FnSUNBZ0lDQWdJR2xtSUNod1pXNWthVzVuTG1sdVpHVjRUMllvYm1GdFpTa2dQQ0F3S1NCd1pXNWthVzVuTG5CMWMyZ29ibUZ0WlNrN1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0hSdlRHOWhaQzVwYm1SbGVFOW1LRzVoYldVcElEd2dNQ2tnZEc5TWIyRmtMbkIxYzJnb2JtRnRaU2s3WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLSFJ2VEc5aFpFNWhiV1Z6Y0dGalpYTXVhVzVrWlhoUFppaHVjeWtnUENBd0tTQjBiMHh2WVdST1lXMWxjM0JoWTJWekxuQjFjMmdvYm5NcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlLVHRjYmx4dUlDQWdJQ0FnYVdZZ0tDRm9ZWE5CYkd4T1lXMWxjM0JoWTJWektTQjBiMHh2WVdSTVlXNW5kV0ZuWlhNdWNIVnphQ2hzYm1jcE8xeHVJQ0FnSUgwcE8xeHVYRzRnSUNBZ2FXWWdLSFJ2VEc5aFpDNXNaVzVuZEdnZ2ZId2djR1Z1WkdsdVp5NXNaVzVuZEdncElIdGNiaUFnSUNBZ0lIUm9hWE11Y1hWbGRXVXVjSFZ6YUNoN1hHNGdJQ0FnSUNBZ0lIQmxibVJwYm1jNklIQmxibVJwYm1jc1hHNGdJQ0FnSUNBZ0lHeHZZV1JsWkRvZ2UzMHNYRzRnSUNBZ0lDQWdJR1Z5Y205eWN6b2dXMTBzWEc0Z0lDQWdJQ0FnSUdOaGJHeGlZV05yT2lCallXeHNZbUZqYTF4dUlDQWdJQ0FnZlNrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnY21WMGRYSnVJSHRjYmlBZ0lDQWdJSFJ2VEc5aFpEb2dkRzlNYjJGa0xGeHVJQ0FnSUNBZ2NHVnVaR2x1WnpvZ2NHVnVaR2x1Wnl4Y2JpQWdJQ0FnSUhSdlRHOWhaRXhoYm1kMVlXZGxjem9nZEc5TWIyRmtUR0Z1WjNWaFoyVnpMRnh1SUNBZ0lDQWdkRzlNYjJGa1RtRnRaWE53WVdObGN6b2dkRzlNYjJGa1RtRnRaWE53WVdObGMxeHVJQ0FnSUgwN1hHNGdJSDA3WEc1Y2JpQWdRMjl1Ym1WamRHOXlMbkJ5YjNSdmRIbHdaUzVzYjJGa1pXUWdQU0JtZFc1amRHbHZiaUJzYjJGa1pXUW9ibUZ0WlN3Z1pYSnlMQ0JrWVhSaEtTQjdYRzRnSUNBZ2RtRnlJRjkwYUdsek15QTlJSFJvYVhNN1hHNWNiaUFnSUNCMllYSWdYMjVoYldVa2MzQnNhWFFnUFNCdVlXMWxMbk53YkdsMEtDZDhKeWtzWEc0Z0lDQWdJQ0FnSUY5dVlXMWxKSE53YkdsME1pQTlJRjl6YkdsalpXUlViMEZ5Y21GNUtGOXVZVzFsSkhOd2JHbDBMQ0F5S1N4Y2JpQWdJQ0FnSUNBZ2JHNW5JRDBnWDI1aGJXVWtjM0JzYVhReVd6QmRMRnh1SUNBZ0lDQWdJQ0J1Y3lBOUlGOXVZVzFsSkhOd2JHbDBNbHN4WFR0Y2JseHVJQ0FnSUdsbUlDaGxjbklwSUhSb2FYTXVaVzFwZENnblptRnBiR1ZrVEc5aFpHbHVaeWNzSUd4dVp5d2dibk1zSUdWeWNpazdYRzVjYmlBZ0lDQnBaaUFvWkdGMFlTa2dlMXh1SUNBZ0lDQWdkR2hwY3k1emRHOXlaUzVoWkdSU1pYTnZkWEpqWlVKMWJtUnNaU2hzYm1jc0lHNXpMQ0JrWVhSaEtUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QnpaWFFnYkc5aFpHVmtYRzRnSUNBZ2RHaHBjeTV6ZEdGMFpWdHVZVzFsWFNBOUlHVnljaUEvSUMweElEb2dNanRjYmx4dUlDQWdJQzh2SUdOaGJHeGlZV05ySUdsbUlISmxZV1I1WEc0Z0lDQWdkR2hwY3k1eGRXVjFaUzVtYjNKRllXTm9LR1oxYm1OMGFXOXVJQ2h4S1NCN1hHNGdJQ0FnSUNCMWRHbHNjeTV3ZFhOb1VHRjBhQ2h4TG14dllXUmxaQ3dnVzJ4dVoxMHNJRzV6S1R0Y2JpQWdJQ0FnSUhKbGJXOTJaU2h4TG5CbGJtUnBibWNzSUc1aGJXVXBPMXh1WEc0Z0lDQWdJQ0JwWmlBb1pYSnlLU0J4TG1WeWNtOXljeTV3ZFhOb0tHVnljaWs3WEc1Y2JpQWdJQ0FnSUdsbUlDaHhMbkJsYm1ScGJtY3ViR1Z1WjNSb0lEMDlQU0F3SUNZbUlDRnhMbVJ2Ym1VcElIdGNiaUFnSUNBZ0lDQWdYM1JvYVhNekxtVnRhWFFvSjJ4dllXUmxaQ2NzSUhFdWJHOWhaR1ZrS1R0Y2JpQWdJQ0FnSUNBZ0x5b2daWE5zYVc1MElHNXZMWEJoY21GdExYSmxZWE56YVdkdU9pQXdJQ292WEc0Z0lDQWdJQ0FnSUhFdVpHOXVaU0E5SUhSeWRXVTdYRzRnSUNBZ0lDQWdJR2xtSUNoeExtVnljbTl5Y3k1c1pXNW5kR2dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnhMbU5oYkd4aVlXTnJLSEV1WlhKeWIzSnpLVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNCeExtTmhiR3hpWVdOcktDazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlLVHRjYmx4dUlDQWdJQzh2SUhKbGJXOTJaU0JrYjI1bElHeHZZV1FnY21WeGRXVnpkSE5jYmlBZ0lDQjBhR2x6TG5GMVpYVmxJRDBnZEdocGN5NXhkV1YxWlM1bWFXeDBaWElvWm5WdVkzUnBiMjRnS0hFcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlBaGNTNWtiMjVsTzF4dUlDQWdJSDBwTzF4dUlDQjlPMXh1WEc0Z0lFTnZibTVsWTNSdmNpNXdjbTkwYjNSNWNHVXVjbVZoWkNBOUlHWjFibU4wYVc5dUlISmxZV1FvYkc1bkxDQnVjeXdnWm1OT1lXMWxLU0I3WEc0Z0lDQWdkbUZ5SUhSeWFXVmtJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURNZ0ppWWdZWEpuZFcxbGJuUnpXek5kSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTTEwZ09pQXdPMXh1WEc0Z0lDQWdkbUZ5SUY5MGFHbHpOQ0E5SUhSb2FYTTdYRzVjYmlBZ0lDQjJZWElnZDJGcGRDQTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQaUEwSUNZbUlHRnlaM1Z0Wlc1MGMxczBYU0FoUFQwZ2RXNWtaV1pwYm1Wa0lEOGdZWEpuZFcxbGJuUnpXelJkSURvZ01qVXdPMXh1SUNBZ0lIWmhjaUJqWVd4c1ltRmpheUE5SUdGeVozVnRaVzUwYzFzMVhUdGNibHh1SUNBZ0lHbG1JQ2doYkc1bkxteGxibWQwYUNrZ2NtVjBkWEp1SUdOaGJHeGlZV05yS0c1MWJHd3NJSHQ5S1RzZ0x5OGdibTkwYVc1bklIUnZJR3h2WVdSY2JseHVJQ0FnSUhKbGRIVnliaUIwYUdsekxtSmhZMnRsYm1SYlptTk9ZVzFsWFNoc2JtY3NJRzV6TENCbWRXNWpkR2x2YmlBb1pYSnlMQ0JrWVhSaEtTQjdYRzRnSUNBZ0lDQnBaaUFvWlhKeUlDWW1JR1JoZEdFZ0x5b2dQU0J5WlhSeWVVWnNZV2NnS2k4Z0ppWWdkSEpwWldRZ1BDQTFLU0I3WEc0Z0lDQWdJQ0FnSUhObGRGUnBiV1Z2ZFhRb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0FnSUY5MGFHbHpOQzV5WldGa0xtTmhiR3dvWDNSb2FYTTBMQ0JzYm1jc0lHNXpMQ0JtWTA1aGJXVXNJSFJ5YVdWa0lDc2dNU3dnZDJGcGRDQXFJRElzSUdOaGJHeGlZV05yS1R0Y2JpQWdJQ0FnSUNBZ2ZTd2dkMkZwZENrN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUdOaGJHeGlZV05yS0dWeWNpd2daR0YwWVNrN1hHNGdJQ0FnZlNrN1hHNGdJSDA3WEc1Y2JpQWdMeW9nWlhOc2FXNTBJR052Ym5OcGMzUmxiblF0Y21WMGRYSnVPaUF3SUNvdlhHNWNibHh1SUNCRGIyNXVaV04wYjNJdWNISnZkRzkwZVhCbExteHZZV1FnUFNCbWRXNWpkR2x2YmlCc2IyRmtLR3hoYm1kMVlXZGxjeXdnYm1GdFpYTndZV05sY3l3Z1kyRnNiR0poWTJzcElIdGNiaUFnSUNCMllYSWdYM1JvYVhNMUlEMGdkR2hwY3p0Y2JseHVJQ0FnSUdsbUlDZ2hkR2hwY3k1aVlXTnJaVzVrS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbXh2WjJkbGNpNTNZWEp1S0NkT2J5QmlZV05yWlc1a0lIZGhjeUJoWkdSbFpDQjJhV0VnYVRFNGJtVjRkQzUxYzJVdUlGZHBiR3dnYm05MElHeHZZV1FnY21WemIzVnlZMlZ6TGljcE8xeHVJQ0FnSUNBZ2NtVjBkWEp1SUdOaGJHeGlZV05ySUNZbUlHTmhiR3hpWVdOcktDazdYRzRnSUNBZ2ZWeHVJQ0FnSUhaaGNpQnZjSFJwYjI1eklEMGdYMlY0ZEdWdVpITW9lMzBzSUhSb2FYTXVZbUZqYTJWdVpDNXZjSFJwYjI1ekxDQjBhR2x6TG05d2RHbHZibk11WW1GamEyVnVaQ2s3WEc1Y2JpQWdJQ0JwWmlBb2RIbHdaVzltSUd4aGJtZDFZV2RsY3lBOVBUMGdKM04wY21sdVp5Y3BJR3hoYm1kMVlXZGxjeUE5SUhSb2FYTXViR0Z1WjNWaFoyVlZkR2xzY3k1MGIxSmxjMjlzZG1WSWFXVnlZWEpqYUhrb2JHRnVaM1ZoWjJWektUdGNiaUFnSUNCcFppQW9kSGx3Wlc5bUlHNWhiV1Z6Y0dGalpYTWdQVDA5SUNkemRISnBibWNuS1NCdVlXMWxjM0JoWTJWeklEMGdXMjVoYldWemNHRmpaWE5kTzF4dVhHNGdJQ0FnZG1GeUlIUnZURzloWkNBOUlIUm9hWE11Y1hWbGRXVk1iMkZrS0d4aGJtZDFZV2RsY3l3Z2JtRnRaWE53WVdObGN5d2dZMkZzYkdKaFkyc3BPMXh1SUNBZ0lHbG1JQ2doZEc5TWIyRmtMblJ2VEc5aFpDNXNaVzVuZEdncElIdGNiaUFnSUNBZ0lHbG1JQ2doZEc5TWIyRmtMbkJsYm1ScGJtY3ViR1Z1WjNSb0tTQmpZV3hzWW1GamF5Z3BPeUF2THlCdWIzUm9hVzVuSUhSdklHeHZZV1FnWVc1a0lHNXZJSEJsYm1ScGJtZHpMaTR1WTJGc2JHSmhZMnNnYm05M1hHNGdJQ0FnSUNCeVpYUjFjbTRnYm5Wc2JEc2dMeThnY0dWdVpHbHVaM01nZDJsc2JDQjBjbWxuWjJWeUlHTmhiR3hpWVdOclhHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z2JHOWhaQ0IzYVhSb0lHMTFiSFJwTFd4dllXUmNiaUFnSUNCcFppQW9iM0IwYVc5dWN5NWhiR3h2ZDAxMWJIUnBURzloWkdsdVp5QW1KaUIwYUdsekxtSmhZMnRsYm1RdWNtVmhaRTExYkhScEtTQjdYRzRnSUNBZ0lDQjBhR2x6TG5KbFlXUW9kRzlNYjJGa0xuUnZURzloWkV4aGJtZDFZV2RsY3l3Z2RHOU1iMkZrTG5SdlRHOWhaRTVoYldWemNHRmpaWE1zSUNkeVpXRmtUWFZzZEdrbkxDQnVkV3hzTENCdWRXeHNMQ0JtZFc1amRHbHZiaUFvWlhKeUxDQmtZWFJoS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hsY25JcElGOTBhR2x6TlM1c2IyZG5aWEl1ZDJGeWJpZ25iRzloWkdsdVp5QnVZVzFsYzNCaFkyVnpJQ2NnS3lCMGIweHZZV1F1ZEc5TWIyRmtUbUZ0WlhOd1lXTmxjeTVxYjJsdUtDY3NJQ2NwSUNzZ0p5Qm1iM0lnYkdGdVozVmhaMlZ6SUNjZ0t5QjBiMHh2WVdRdWRHOU1iMkZrVEdGdVozVmhaMlZ6TG1wdmFXNG9KeXdnSnlrZ0t5QW5JSFpwWVNCdGRXeDBhV3h2WVdScGJtY2dabUZwYkdWa0p5d2daWEp5S1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLQ0ZsY25JZ0ppWWdaR0YwWVNrZ1gzUm9hWE0xTG14dloyZGxjaTVzYjJjb0ozTjFZMk5sYzNObWRXeHNlU0JzYjJGa1pXUWdibUZ0WlhOd1lXTmxjeUFuSUNzZ2RHOU1iMkZrTG5SdlRHOWhaRTVoYldWemNHRmpaWE11YW05cGJpZ25MQ0FuS1NBcklDY2dabTl5SUd4aGJtZDFZV2RsY3lBbklDc2dkRzlNYjJGa0xuUnZURzloWkV4aGJtZDFZV2RsY3k1cWIybHVLQ2NzSUNjcElDc2dKeUIyYVdFZ2JYVnNkR2xzYjJGa2FXNW5KeXdnWkdGMFlTazdYRzVjYmlBZ0lDQWdJQ0FnZEc5TWIyRmtMblJ2VEc5aFpDNW1iM0pGWVdOb0tHWjFibU4wYVc5dUlDaHVZVzFsS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkbUZ5SUY5dVlXMWxKSE53YkdsME15QTlJRzVoYldVdWMzQnNhWFFvSjN3bktTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1gyNWhiV1VrYzNCc2FYUTBJRDBnWDNOc2FXTmxaRlJ2UVhKeVlYa29YMjVoYldVa2MzQnNhWFF6TENBeUtTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2JDQTlJRjl1WVcxbEpITndiR2wwTkZzd1hTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2JpQTlJRjl1WVcxbEpITndiR2wwTkZzeFhUdGNibHh1SUNBZ0lDQWdJQ0FnSUhaaGNpQmlkVzVrYkdVZ1BTQjFkR2xzY3k1blpYUlFZWFJvS0dSaGRHRXNJRnRzTENCdVhTazdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tHSjFibVJzWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWDNSb2FYTTFMbXh2WVdSbFpDaHVZVzFsTENCbGNuSXNJR0oxYm1Sc1pTazdYRzRnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJsY25KdmNpQTlJQ2RzYjJGa2FXNW5JRzVoYldWemNHRmpaU0FuSUNzZ2JpQXJJQ2NnWm05eUlHeGhibWQxWVdkbElDY2dLeUJzSUNzZ0p5QjJhV0VnYlhWc2RHbHNiMkZrYVc1bklHWmhhV3hsWkNjN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JmZEdocGN6VXViRzloWkdWa0tHNWhiV1VzSUdWeWNtOXlLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lGOTBhR2x6TlM1c2IyZG5aWEl1WlhKeWIzSW9aWEp5YjNJcE8xeHVJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNCOUtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnZEc5TWIyRmtMblJ2VEc5aFpDNW1iM0pGWVdOb0tHWjFibU4wYVc5dUlDaHVZVzFsS1NCN1hHNGdJQ0FnSUNBZ0lGOTBhR2x6TlM1c2IyRmtUMjVsS0c1aGJXVXBPMXh1SUNBZ0lDQWdmU2s3WEc0Z0lDQWdmVnh1SUNCOU8xeHVYRzRnSUVOdmJtNWxZM1J2Y2k1d2NtOTBiM1I1Y0dVdWNtVnNiMkZrSUQwZ1puVnVZM1JwYjI0Z2NtVnNiMkZrS0d4aGJtZDFZV2RsY3l3Z2JtRnRaWE53WVdObGN5a2dlMXh1SUNBZ0lIWmhjaUJmZEdocGN6WWdQU0IwYUdsek8xeHVYRzRnSUNBZ2FXWWdLQ0YwYUdsekxtSmhZMnRsYm1RcElIdGNiaUFnSUNBZ0lIUm9hWE11Ykc5bloyVnlMbmRoY200b0owNXZJR0poWTJ0bGJtUWdkMkZ6SUdGa1pHVmtJSFpwWVNCcE1UaHVaWGgwTG5WelpTNGdWMmxzYkNCdWIzUWdiRzloWkNCeVpYTnZkWEpqWlhNdUp5azdYRzRnSUNBZ2ZWeHVJQ0FnSUhaaGNpQnZjSFJwYjI1eklEMGdYMlY0ZEdWdVpITW9lMzBzSUhSb2FYTXVZbUZqYTJWdVpDNXZjSFJwYjI1ekxDQjBhR2x6TG05d2RHbHZibk11WW1GamEyVnVaQ2s3WEc1Y2JpQWdJQ0JwWmlBb2RIbHdaVzltSUd4aGJtZDFZV2RsY3lBOVBUMGdKM04wY21sdVp5Y3BJR3hoYm1kMVlXZGxjeUE5SUhSb2FYTXViR0Z1WjNWaFoyVlZkR2xzY3k1MGIxSmxjMjlzZG1WSWFXVnlZWEpqYUhrb2JHRnVaM1ZoWjJWektUdGNiaUFnSUNCcFppQW9kSGx3Wlc5bUlHNWhiV1Z6Y0dGalpYTWdQVDA5SUNkemRISnBibWNuS1NCdVlXMWxjM0JoWTJWeklEMGdXMjVoYldWemNHRmpaWE5kTzF4dVhHNGdJQ0FnTHk4Z2JHOWhaQ0IzYVhSb0lHMTFiSFJwTFd4dllXUmNiaUFnSUNCcFppQW9iM0IwYVc5dWN5NWhiR3h2ZDAxMWJIUnBURzloWkdsdVp5QW1KaUIwYUdsekxtSmhZMnRsYm1RdWNtVmhaRTExYkhScEtTQjdYRzRnSUNBZ0lDQjBhR2x6TG5KbFlXUW9iR0Z1WjNWaFoyVnpMQ0J1WVcxbGMzQmhZMlZ6TENBbmNtVmhaRTExYkhScEp5d2diblZzYkN3Z2JuVnNiQ3dnWm5WdVkzUnBiMjRnS0dWeWNpd2daR0YwWVNrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvWlhKeUtTQmZkR2hwY3pZdWJHOW5aMlZ5TG5kaGNtNG9KM0psYkc5aFpHbHVaeUJ1WVcxbGMzQmhZMlZ6SUNjZ0t5QnVZVzFsYzNCaFkyVnpMbXB2YVc0b0p5d2dKeWtnS3lBbklHWnZjaUJzWVc1bmRXRm5aWE1nSnlBcklHeGhibWQxWVdkbGN5NXFiMmx1S0Njc0lDY3BJQ3NnSnlCMmFXRWdiWFZzZEdsc2IyRmthVzVuSUdaaGFXeGxaQ2NzSUdWeWNpazdYRzRnSUNBZ0lDQWdJR2xtSUNnaFpYSnlJQ1ltSUdSaGRHRXBJRjkwYUdsek5pNXNiMmRuWlhJdWJHOW5LQ2R6ZFdOalpYTnpablZzYkhrZ2NtVnNiMkZrWldRZ2JtRnRaWE53WVdObGN5QW5JQ3NnYm1GdFpYTndZV05sY3k1cWIybHVLQ2NzSUNjcElDc2dKeUJtYjNJZ2JHRnVaM1ZoWjJWeklDY2dLeUJzWVc1bmRXRm5aWE11YW05cGJpZ25MQ0FuS1NBcklDY2dkbWxoSUcxMWJIUnBiRzloWkdsdVp5Y3NJR1JoZEdFcE8xeHVYRzRnSUNBZ0lDQWdJR3hoYm1kMVlXZGxjeTVtYjNKRllXTm9LR1oxYm1OMGFXOXVJQ2hzS1NCN1hHNGdJQ0FnSUNBZ0lDQWdibUZ0WlhOd1lXTmxjeTVtYjNKRllXTm9LR1oxYm1OMGFXOXVJQ2h1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1luVnVaR3hsSUQwZ2RYUnBiSE11WjJWMFVHRjBhQ2hrWVhSaExDQmJiQ3dnYmwwcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHSjFibVJzWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCZmRHaHBjell1Ykc5aFpHVmtLR3dnS3lBbmZDY2dLeUJ1TENCbGNuSXNJR0oxYm1Sc1pTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pYSnliM0lnUFNBbmNtVnNiMkZrYVc1bklHNWhiV1Z6Y0dGalpTQW5JQ3NnYmlBcklDY2dabTl5SUd4aGJtZDFZV2RsSUNjZ0t5QnNJQ3NnSnlCMmFXRWdiWFZzZEdsc2IyRmthVzVuSUdaaGFXeGxaQ2M3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJRjkwYUdsek5pNXNiMkZrWldRb2JDQXJJQ2Q4SnlBcklHNHNJR1Z5Y205eUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1gzUm9hWE0yTG14dloyZGxjaTVsY25KdmNpaGxjbkp2Y2lrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnZlNrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJR3hoYm1kMVlXZGxjeTVtYjNKRllXTm9LR1oxYm1OMGFXOXVJQ2hzS1NCN1hHNGdJQ0FnSUNBZ0lHNWhiV1Z6Y0dGalpYTXVabTl5UldGamFDaG1kVzVqZEdsdmJpQW9iaWtnZTF4dUlDQWdJQ0FnSUNBZ0lGOTBhR2x6Tmk1c2IyRmtUMjVsS0d3Z0t5QW5mQ2NnS3lCdUxDQW5jbVVuS1R0Y2JpQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQjlYRzRnSUgwN1hHNWNiaUFnUTI5dWJtVmpkRzl5TG5CeWIzUnZkSGx3WlM1c2IyRmtUMjVsSUQwZ1puVnVZM1JwYjI0Z2JHOWhaRTl1WlNodVlXMWxLU0I3WEc0Z0lDQWdkbUZ5SUY5MGFHbHpOeUE5SUhSb2FYTTdYRzVjYmlBZ0lDQjJZWElnY0hKbFptbDRJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURFZ0ppWWdZWEpuZFcxbGJuUnpXekZkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTVYwZ09pQW5KenRjYmx4dUlDQWdJSFpoY2lCZmJtRnRaU1J6Y0d4cGREVWdQU0J1WVcxbExuTndiR2wwS0NkOEp5a3NYRzRnSUNBZ0lDQWdJRjl1WVcxbEpITndiR2wwTmlBOUlGOXpiR2xqWldSVWIwRnljbUY1S0Y5dVlXMWxKSE53YkdsME5Td2dNaWtzWEc0Z0lDQWdJQ0FnSUd4dVp5QTlJRjl1WVcxbEpITndiR2wwTmxzd1hTeGNiaUFnSUNBZ0lDQWdibk1nUFNCZmJtRnRaU1J6Y0d4cGREWmJNVjA3WEc1Y2JpQWdJQ0IwYUdsekxuSmxZV1FvYkc1bkxDQnVjeXdnSjNKbFlXUW5MQ0J1ZFd4c0xDQnVkV3hzTENCbWRXNWpkR2x2YmlBb1pYSnlMQ0JrWVhSaEtTQjdYRzRnSUNBZ0lDQnBaaUFvWlhKeUtTQmZkR2hwY3pjdWJHOW5aMlZ5TG5kaGNtNG9jSEpsWm1sNElDc2dKMnh2WVdScGJtY2dibUZ0WlhOd1lXTmxJQ2NnS3lCdWN5QXJJQ2NnWm05eUlHeGhibWQxWVdkbElDY2dLeUJzYm1jZ0t5QW5JR1poYVd4bFpDY3NJR1Z5Y2lrN1hHNGdJQ0FnSUNCcFppQW9JV1Z5Y2lBbUppQmtZWFJoS1NCZmRHaHBjemN1Ykc5bloyVnlMbXh2Wnlod2NtVm1hWGdnS3lBbmJHOWhaR1ZrSUc1aGJXVnpjR0ZqWlNBbklDc2dibk1nS3lBbklHWnZjaUJzWVc1bmRXRm5aU0FuSUNzZ2JHNW5MQ0JrWVhSaEtUdGNibHh1SUNBZ0lDQWdYM1JvYVhNM0xteHZZV1JsWkNodVlXMWxMQ0JsY25Jc0lHUmhkR0VwTzF4dUlDQWdJSDBwTzF4dUlDQjlPMXh1WEc0Z0lFTnZibTVsWTNSdmNpNXdjbTkwYjNSNWNHVXVjMkYyWlUxcGMzTnBibWNnUFNCbWRXNWpkR2x2YmlCellYWmxUV2x6YzJsdVp5aHNZVzVuZFdGblpYTXNJRzVoYldWemNHRmpaU3dnYTJWNUxDQm1ZV3hzWW1GamExWmhiSFZsTENCcGMxVndaR0YwWlNrZ2UxeHVJQ0FnSUhaaGNpQnZjSFJwYjI1eklEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQStJRFVnSmlZZ1lYSm5kVzFsYm5Seld6VmRJQ0U5UFNCMWJtUmxabWx1WldRZ1B5QmhjbWQxYldWdWRITmJOVjBnT2lCN2ZUdGNibHh1SUNBZ0lHbG1JQ2gwYUdsekxtSmhZMnRsYm1RZ0ppWWdkR2hwY3k1aVlXTnJaVzVrTG1OeVpXRjBaU2tnZTF4dUlDQWdJQ0FnZEdocGN5NWlZV05yWlc1a0xtTnlaV0YwWlNoc1lXNW5kV0ZuWlhNc0lHNWhiV1Z6Y0dGalpTd2dhMlY1TENCbVlXeHNZbUZqYTFaaGJIVmxMQ0J1ZFd4c0lDOHFJSFZ1ZFhObFpDQmpZV3hzWW1GamF5QXFMeXdnWDJWNGRHVnVaSE1vZTMwc0lHOXdkR2x2Ym5Nc0lIc2dhWE5WY0dSaGRHVTZJR2x6VlhCa1lYUmxJSDBwS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCM2NtbDBaU0IwYnlCemRHOXlaU0IwYnlCaGRtOXBaQ0J5WlhObGJtUnBibWRjYmlBZ0lDQnBaaUFvSVd4aGJtZDFZV2RsY3lCOGZDQWhiR0Z1WjNWaFoyVnpXekJkS1NCeVpYUjFjbTQ3WEc0Z0lDQWdkR2hwY3k1emRHOXlaUzVoWkdSU1pYTnZkWEpqWlNoc1lXNW5kV0ZuWlhOYk1GMHNJRzVoYldWemNHRmpaU3dnYTJWNUxDQm1ZV3hzWW1GamExWmhiSFZsS1R0Y2JpQWdmVHRjYmx4dUlDQnlaWFIxY200Z1EyOXVibVZqZEc5eU8xeHVmU2hmUlhabGJuUkZiV2wwZEdWeU15NWtaV1poZFd4MEtUdGNibHh1Wlhod2IzSjBjeTVrWldaaGRXeDBJRDBnUTI5dWJtVmpkRzl5T3lJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRndpWDE5bGMwMXZaSFZzWlZ3aUxDQjdYRzRnSUhaaGJIVmxPaUIwY25WbFhHNTlLVHRjYmx4dWRtRnlJRjlsZUhSbGJtUnpJRDBnVDJKcVpXTjBMbUZ6YzJsbmJpQjhmQ0JtZFc1amRHbHZiaUFvZEdGeVoyVjBLU0I3SUdadmNpQW9kbUZ5SUdrZ1BTQXhPeUJwSUR3Z1lYSm5kVzFsYm5SekxteGxibWQwYURzZ2FTc3JLU0I3SUhaaGNpQnpiM1Z5WTJVZ1BTQmhjbWQxYldWdWRITmJhVjA3SUdadmNpQW9kbUZ5SUd0bGVTQnBiaUJ6YjNWeVkyVXBJSHNnYVdZZ0tFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHpiM1Z5WTJVc0lHdGxlU2twSUhzZ2RHRnlaMlYwVzJ0bGVWMGdQU0J6YjNWeVkyVmJhMlY1WFRzZ2ZTQjlJSDBnY21WMGRYSnVJSFJoY21kbGREc2dmVHRjYmx4dWRtRnlJRjlzYjJkblpYSWdQU0J5WlhGMWFYSmxLQ2N1TDJ4dloyZGxjaTVxY3ljcE8xeHVYRzUyWVhJZ1gyeHZaMmRsY2pJZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5c2IyZG5aWElwTzF4dVhHNTJZWElnWDBWMlpXNTBSVzFwZEhSbGNqSWdQU0J5WlhGMWFYSmxLQ2N1TDBWMlpXNTBSVzFwZEhSbGNpNXFjeWNwTzF4dVhHNTJZWElnWDBWMlpXNTBSVzFwZEhSbGNqTWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOUZkbVZ1ZEVWdGFYUjBaWEl5S1R0Y2JseHVablZ1WTNScGIyNGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENodlltb3BJSHNnY21WMGRYSnVJRzlpYWlBbUppQnZZbW91WDE5bGMwMXZaSFZzWlNBL0lHOWlhaUE2SUhzZ1pHVm1ZWFZzZERvZ2IySnFJSDA3SUgxY2JseHVablZ1WTNScGIyNGdYMlJsWm1GMWJIUnpLRzlpYWl3Z1pHVm1ZWFZzZEhNcElIc2dkbUZ5SUd0bGVYTWdQU0JQWW1wbFkzUXVaMlYwVDNkdVVISnZjR1Z5ZEhsT1lXMWxjeWhrWldaaGRXeDBjeWs3SUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2EyVjVjeTVzWlc1bmRHZzdJR2tyS3lrZ2V5QjJZWElnYTJWNUlEMGdhMlY1YzF0cFhUc2dkbUZ5SUhaaGJIVmxJRDBnVDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVJHVnpZM0pwY0hSdmNpaGtaV1poZFd4MGN5d2dhMlY1S1RzZ2FXWWdLSFpoYkhWbElDWW1JSFpoYkhWbExtTnZibVpwWjNWeVlXSnNaU0FtSmlCdlltcGJhMlY1WFNBOVBUMGdkVzVrWldacGJtVmtLU0I3SUU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaHZZbW9zSUd0bGVTd2dkbUZzZFdVcE95QjlJSDBnY21WMGRYSnVJRzlpYWpzZ2ZWeHVYRzVtZFc1amRHbHZiaUJmWTJ4aGMzTkRZV3hzUTJobFkyc29hVzV6ZEdGdVkyVXNJRU52Ym5OMGNuVmpkRzl5S1NCN0lHbG1JQ2doS0dsdWMzUmhibU5sSUdsdWMzUmhibU5sYjJZZ1EyOXVjM1J5ZFdOMGIzSXBLU0I3SUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb1hDSkRZVzV1YjNRZ1kyRnNiQ0JoSUdOc1lYTnpJR0Z6SUdFZ1puVnVZM1JwYjI1Y0lpazdJSDBnZlZ4dVhHNW1kVzVqZEdsdmJpQmZjRzl6YzJsaWJHVkRiMjV6ZEhKMVkzUnZjbEpsZEhWeWJpaHpaV3htTENCallXeHNLU0I3SUdsbUlDZ2hjMlZzWmlrZ2V5QjBhSEp2ZHlCdVpYY2dVbVZtWlhKbGJtTmxSWEp5YjNJb1hDSjBhR2x6SUdoaGMyNG5kQ0JpWldWdUlHbHVhWFJwWVd4cGMyVmtJQzBnYzNWd1pYSW9LU0JvWVhOdUozUWdZbVZsYmlCallXeHNaV1JjSWlrN0lIMGdjbVYwZFhKdUlHTmhiR3dnSmlZZ0tIUjVjR1Z2WmlCallXeHNJRDA5UFNCY0ltOWlhbVZqZEZ3aUlIeDhJSFI1Y0dWdlppQmpZV3hzSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lwSUQ4Z1kyRnNiQ0E2SUhObGJHWTdJSDFjYmx4dVpuVnVZM1JwYjI0Z1gybHVhR1Z5YVhSektITjFZa05zWVhOekxDQnpkWEJsY2tOc1lYTnpLU0I3SUdsbUlDaDBlWEJsYjJZZ2MzVndaWEpEYkdGemN5QWhQVDBnWENKbWRXNWpkR2x2Ymx3aUlDWW1JSE4xY0dWeVEyeGhjM01nSVQwOUlHNTFiR3dwSUhzZ2RHaHliM2NnYm1WM0lGUjVjR1ZGY25KdmNpaGNJbE4xY0dWeUlHVjRjSEpsYzNOcGIyNGdiWFZ6ZENCbGFYUm9aWElnWW1VZ2JuVnNiQ0J2Y2lCaElHWjFibU4wYVc5dUxDQnViM1FnWENJZ0t5QjBlWEJsYjJZZ2MzVndaWEpEYkdGemN5azdJSDBnYzNWaVEyeGhjM011Y0hKdmRHOTBlWEJsSUQwZ1QySnFaV04wTG1OeVpXRjBaU2h6ZFhCbGNrTnNZWE56SUNZbUlITjFjR1Z5UTJ4aGMzTXVjSEp2ZEc5MGVYQmxMQ0I3SUdOdmJuTjBjblZqZEc5eU9pQjdJSFpoYkhWbE9pQnpkV0pEYkdGemN5d2daVzUxYldWeVlXSnNaVG9nWm1Gc2MyVXNJSGR5YVhSaFlteGxPaUIwY25WbExDQmpiMjVtYVdkMWNtRmliR1U2SUhSeWRXVWdmU0I5S1RzZ2FXWWdLSE4xY0dWeVEyeGhjM01wSUU5aWFtVmpkQzV6WlhSUWNtOTBiM1I1Y0dWUFppQS9JRTlpYW1WamRDNXpaWFJRY205MGIzUjVjR1ZQWmloemRXSkRiR0Z6Y3l3Z2MzVndaWEpEYkdGemN5a2dPaUJmWkdWbVlYVnNkSE1vYzNWaVEyeGhjM01zSUhOMWNHVnlRMnhoYzNNcE95QjlYRzVjYm5aaGNpQkRiMjV1WldOMGIzSWdQU0JtZFc1amRHbHZiaUFvWDBWMlpXNTBSVzFwZEhSbGNpa2dlMXh1SUNCZmFXNW9aWEpwZEhNb1EyOXVibVZqZEc5eUxDQmZSWFpsYm5SRmJXbDBkR1Z5S1R0Y2JseHVJQ0JtZFc1amRHbHZiaUJEYjI1dVpXTjBiM0lvWTJGamFHVXNJSE4wYjNKbExDQnpaWEoyYVdObGN5a2dlMXh1SUNBZ0lIWmhjaUJ2Y0hScGIyNXpJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURNZ0ppWWdZWEpuZFcxbGJuUnpXek5kSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTTEwZ09pQjdmVHRjYmx4dUlDQWdJRjlqYkdGemMwTmhiR3hEYUdWamF5aDBhR2x6TENCRGIyNXVaV04wYjNJcE8xeHVYRzRnSUNBZ2RtRnlJRjkwYUdseklEMGdYM0J2YzNOcFlteGxRMjl1YzNSeWRXTjBiM0pTWlhSMWNtNG9kR2hwY3l3Z1gwVjJaVzUwUlcxcGRIUmxjaTVqWVd4c0tIUm9hWE1wS1R0Y2JseHVJQ0FnSUY5MGFHbHpMbU5oWTJobElEMGdZMkZqYUdVN1hHNGdJQ0FnWDNSb2FYTXVjM1J2Y21VZ1BTQnpkRzl5WlR0Y2JpQWdJQ0JmZEdocGN5NXpaWEoyYVdObGN5QTlJSE5sY25acFkyVnpPMXh1SUNBZ0lGOTBhR2x6TG05d2RHbHZibk1nUFNCdmNIUnBiMjV6TzF4dUlDQWdJRjkwYUdsekxteHZaMmRsY2lBOUlGOXNiMmRuWlhJeUxtUmxabUYxYkhRdVkzSmxZWFJsS0NkallXTm9aVU52Ym01bFkzUnZjaWNwTzF4dVhHNGdJQ0FnYVdZZ0tGOTBhR2x6TG1OaFkyaGxJQ1ltSUY5MGFHbHpMbU5oWTJobExtbHVhWFFwSUY5MGFHbHpMbU5oWTJobExtbHVhWFFvYzJWeWRtbGpaWE1zSUc5d2RHbHZibk11WTJGamFHVXNJRzl3ZEdsdmJuTXBPMXh1SUNBZ0lISmxkSFZ5YmlCZmRHaHBjenRjYmlBZ2ZWeHVYRzRnSUM4cUlHVnpiR2x1ZENCamIyNXphWE4wWlc1MExYSmxkSFZ5YmpvZ01DQXFMMXh1WEc1Y2JpQWdRMjl1Ym1WamRHOXlMbkJ5YjNSdmRIbHdaUzVzYjJGa0lEMGdablZ1WTNScGIyNGdiRzloWkNoc1lXNW5kV0ZuWlhNc0lHNWhiV1Z6Y0dGalpYTXNJR05oYkd4aVlXTnJLU0I3WEc0Z0lDQWdkbUZ5SUY5MGFHbHpNaUE5SUhSb2FYTTdYRzVjYmlBZ0lDQnBaaUFvSVhSb2FYTXVZMkZqYUdVcElISmxkSFZ5YmlCallXeHNZbUZqYXlBbUppQmpZV3hzWW1GamF5Z3BPMXh1SUNBZ0lIWmhjaUJ2Y0hScGIyNXpJRDBnWDJWNGRHVnVaSE1vZTMwc0lIUm9hWE11WTJGamFHVXViM0IwYVc5dWN5d2dkR2hwY3k1dmNIUnBiMjV6TG1OaFkyaGxLVHRjYmx4dUlDQWdJSFpoY2lCc2IyRmtURzVuY3lBOUlIUjVjR1Z2WmlCc1lXNW5kV0ZuWlhNZ1BUMDlJQ2R6ZEhKcGJtY25JRDhnZEdocGN5NXpaWEoyYVdObGN5NXNZVzVuZFdGblpWVjBhV3h6TG5SdlVtVnpiMngyWlVocFpYSmhjbU5vZVNoc1lXNW5kV0ZuWlhNcElEb2diR0Z1WjNWaFoyVnpPMXh1WEc0Z0lDQWdhV1lnS0c5d2RHbHZibk11Wlc1aFlteGxaQ2tnZTF4dUlDQWdJQ0FnZEdocGN5NWpZV05vWlM1c2IyRmtLR3h2WVdSTWJtZHpMQ0JtZFc1amRHbHZiaUFvWlhKeUxDQmtZWFJoS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hsY25JcElGOTBhR2x6TWk1c2IyZG5aWEl1WlhKeWIzSW9KMnh2WVdScGJtY2diR0Z1WjNWaFoyVnpJQ2NnS3lCc2IyRmtURzVuY3k1cWIybHVLQ2NzSUNjcElDc2dKeUJtY205dElHTmhZMmhsSUdaaGFXeGxaQ2NzSUdWeWNpazdYRzRnSUNBZ0lDQWdJR2xtSUNoa1lYUmhLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0x5b2daWE5zYVc1MElHNXZMWEpsYzNSeWFXTjBaV1F0YzNsdWRHRjRPaUF3SUNvdlhHNGdJQ0FnSUNBZ0lDQWdabTl5SUNoMllYSWdiQ0JwYmlCa1lYUmhLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0dSaGRHRXNJR3dwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUdadmNpQW9kbUZ5SUc0Z2FXNGdaR0YwWVZ0c1hTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b1pHRjBZVnRzWFN3Z2Jpa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaHVJQ0U5UFNBbmFURTRibE4wWVcxd0p5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdZblZ1Wkd4bElEMGdaR0YwWVZ0c1hWdHVYVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR0oxYm1Sc1pTa2dYM1JvYVhNeUxuTjBiM0psTG1Ga1pGSmxjMjkxY21ObFFuVnVaR3hsS0d3c0lHNHNJR0oxYm1Sc1pTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHbG1JQ2hqWVd4c1ltRmpheWtnWTJGc2JHSmhZMnNvS1R0Y2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb1kyRnNiR0poWTJzcElIdGNiaUFnSUNBZ0lHTmhiR3hpWVdOcktDazdYRzRnSUNBZ2ZWeHVJQ0I5TzF4dVhHNGdJRU52Ym01bFkzUnZjaTV3Y205MGIzUjVjR1V1YzJGMlpTQTlJR1oxYm1OMGFXOXVJSE5oZG1Vb0tTQjdYRzRnSUNBZ2FXWWdLSFJvYVhNdVkyRmphR1VnSmlZZ2RHaHBjeTV2Y0hScGIyNXpMbU5oWTJobElDWW1JSFJvYVhNdWIzQjBhVzl1Y3k1allXTm9aUzVsYm1GaWJHVmtLU0IwYUdsekxtTmhZMmhsTG5OaGRtVW9kR2hwY3k1emRHOXlaUzVrWVhSaEtUdGNiaUFnZlR0Y2JseHVJQ0J5WlhSMWNtNGdRMjl1Ym1WamRHOXlPMXh1ZlNoZlJYWmxiblJGYldsMGRHVnlNeTVrWldaaGRXeDBLVHRjYmx4dVpYaHdiM0owY3k1a1pXWmhkV3gwSUQwZ1EyOXVibVZqZEc5eU95SXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUZ3aVgxOWxjMDF2WkhWc1pWd2lMQ0I3WEc0Z0lIWmhiSFZsT2lCMGNuVmxYRzU5S1R0Y2JseHVablZ1WTNScGIyNGdYMk5zWVhOelEyRnNiRU5vWldOcktHbHVjM1JoYm1ObExDQkRiMjV6ZEhKMVkzUnZjaWtnZXlCcFppQW9JU2hwYm5OMFlXNWpaU0JwYm5OMFlXNWpaVzltSUVOdmJuTjBjblZqZEc5eUtTa2dleUIwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0Z3aVEyRnVibTkwSUdOaGJHd2dZU0JqYkdGemN5QmhjeUJoSUdaMWJtTjBhVzl1WENJcE95QjlJSDFjYmx4dWRtRnlJRVYyWlc1MFJXMXBkSFJsY2lBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ1puVnVZM1JwYjI0Z1JYWmxiblJGYldsMGRHVnlLQ2tnZTF4dUlDQWdJRjlqYkdGemMwTmhiR3hEYUdWamF5aDBhR2x6TENCRmRtVnVkRVZ0YVhSMFpYSXBPMXh1WEc0Z0lDQWdkR2hwY3k1dlluTmxjblpsY25NZ1BTQjdmVHRjYmlBZ2ZWeHVYRzRnSUVWMlpXNTBSVzFwZEhSbGNpNXdjbTkwYjNSNWNHVXViMjRnUFNCbWRXNWpkR2x2YmlCdmJpaGxkbVZ1ZEhNc0lHeHBjM1JsYm1WeUtTQjdYRzRnSUNBZ2RtRnlJRjkwYUdseklEMGdkR2hwY3p0Y2JseHVJQ0FnSUdWMlpXNTBjeTV6Y0d4cGRDZ25JQ2NwTG1admNrVmhZMmdvWm5WdVkzUnBiMjRnS0dWMlpXNTBLU0I3WEc0Z0lDQWdJQ0JmZEdocGN5NXZZbk5sY25abGNuTmJaWFpsYm5SZElEMGdYM1JvYVhNdWIySnpaWEoyWlhKelcyVjJaVzUwWFNCOGZDQmJYVHRjYmlBZ0lDQWdJRjkwYUdsekxtOWljMlZ5ZG1WeWMxdGxkbVZ1ZEYwdWNIVnphQ2hzYVhOMFpXNWxjaWs3WEc0Z0lDQWdmU2s3WEc0Z0lIMDdYRzVjYmlBZ1JYWmxiblJGYldsMGRHVnlMbkJ5YjNSdmRIbHdaUzV2Wm1ZZ1BTQm1kVzVqZEdsdmJpQnZabVlvWlhabGJuUXNJR3hwYzNSbGJtVnlLU0I3WEc0Z0lDQWdkbUZ5SUY5MGFHbHpNaUE5SUhSb2FYTTdYRzVjYmlBZ0lDQnBaaUFvSVhSb2FYTXViMkp6WlhKMlpYSnpXMlYyWlc1MFhTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhSb2FYTXViMkp6WlhKMlpYSnpXMlYyWlc1MFhTNW1iM0pGWVdOb0tHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQWdJR2xtSUNnaGJHbHpkR1Z1WlhJcElIdGNiaUFnSUNBZ0lDQWdaR1ZzWlhSbElGOTBhR2x6TWk1dlluTmxjblpsY25OYlpYWmxiblJkTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHbHVaR1Y0SUQwZ1gzUm9hWE15TG05aWMyVnlkbVZ5YzF0bGRtVnVkRjB1YVc1a1pYaFBaaWhzYVhOMFpXNWxjaWs3WEc0Z0lDQWdJQ0FnSUdsbUlDaHBibVJsZUNBK0lDMHhLU0I3WEc0Z0lDQWdJQ0FnSUNBZ1gzUm9hWE15TG05aWMyVnlkbVZ5YzF0bGRtVnVkRjB1YzNCc2FXTmxLR2x1WkdWNExDQXhLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBwTzF4dUlDQjlPMXh1WEc0Z0lFVjJaVzUwUlcxcGRIUmxjaTV3Y205MGIzUjVjR1V1WlcxcGRDQTlJR1oxYm1OMGFXOXVJR1Z0YVhRb1pYWmxiblFwSUh0Y2JpQWdJQ0JtYjNJZ0tIWmhjaUJmYkdWdUlEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDd2dZWEpuY3lBOUlFRnljbUY1S0Y5c1pXNGdQaUF4SUQ4Z1gyeGxiaUF0SURFZ09pQXdLU3dnWDJ0bGVTQTlJREU3SUY5clpYa2dQQ0JmYkdWdU95QmZhMlY1S3lzcElIdGNiaUFnSUNBZ0lHRnlaM05iWDJ0bGVTQXRJREZkSUQwZ1lYSm5kVzFsYm5SelcxOXJaWGxkTzF4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNoMGFHbHpMbTlpYzJWeWRtVnljMXRsZG1WdWRGMHBJSHRjYmlBZ0lDQWdJSFpoY2lCamJHOXVaV1FnUFNCYlhTNWpiMjVqWVhRb2RHaHBjeTV2WW5ObGNuWmxjbk5iWlhabGJuUmRLVHRjYmlBZ0lDQWdJR05zYjI1bFpDNW1iM0pGWVdOb0tHWjFibU4wYVc5dUlDaHZZbk5sY25abGNpa2dlMXh1SUNBZ0lDQWdJQ0J2WW5ObGNuWmxjaTVoY0hCc2VTaDFibVJsWm1sdVpXUXNJR0Z5WjNNcE8xeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLSFJvYVhNdWIySnpaWEoyWlhKeld5Y3FKMTBwSUh0Y2JpQWdJQ0FnSUhaaGNpQmZZMnh2Ym1Wa0lEMGdXMTB1WTI5dVkyRjBLSFJvYVhNdWIySnpaWEoyWlhKeld5Y3FKMTBwTzF4dUlDQWdJQ0FnWDJOc2IyNWxaQzVtYjNKRllXTm9LR1oxYm1OMGFXOXVJQ2h2WW5ObGNuWmxjaWtnZTF4dUlDQWdJQ0FnSUNCMllYSWdYM0psWmp0Y2JseHVJQ0FnSUNBZ0lDQnZZbk5sY25abGNpNWhjSEJzZVNodlluTmxjblpsY2l3Z0tGOXlaV1lnUFNCYlpYWmxiblJkS1M1amIyNWpZWFF1WVhCd2JIa29YM0psWml3Z1lYSm5jeWtwTzF4dUlDQWdJQ0FnZlNrN1hHNGdJQ0FnZlZ4dUlDQjlPMXh1WEc0Z0lISmxkSFZ5YmlCRmRtVnVkRVZ0YVhSMFpYSTdYRzU5S0NrN1hHNWNibVY0Y0c5eWRITXVaR1ZtWVhWc2RDQTlJRVYyWlc1MFJXMXBkSFJsY2pzaUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JrOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JjSWw5ZlpYTk5iMlIxYkdWY0lpd2dlMXh1SUNCMllXeDFaVG9nZEhKMVpWeHVmU2s3WEc1Y2JuWmhjaUJmWlhoMFpXNWtjeUE5SUU5aWFtVmpkQzVoYzNOcFoyNGdmSHdnWm5WdVkzUnBiMjRnS0hSaGNtZGxkQ2tnZXlCbWIzSWdLSFpoY2lCcElEMGdNVHNnYVNBOElHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnN0lHa3JLeWtnZXlCMllYSWdjMjkxY21ObElEMGdZWEpuZFcxbGJuUnpXMmxkT3lCbWIzSWdLSFpoY2lCclpYa2dhVzRnYzI5MWNtTmxLU0I3SUdsbUlDaFBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29jMjkxY21ObExDQnJaWGtwS1NCN0lIUmhjbWRsZEZ0clpYbGRJRDBnYzI5MWNtTmxXMnRsZVYwN0lIMGdmU0I5SUhKbGRIVnliaUIwWVhKblpYUTdJSDA3WEc1Y2JuWmhjaUJmZFhScGJITWdQU0J5WlhGMWFYSmxLQ2N1TDNWMGFXeHpMbXB6SnlrN1hHNWNiblpoY2lCMWRHbHNjeUE5SUY5cGJuUmxjbTl3VW1WeGRXbHlaVmRwYkdSallYSmtLRjkxZEdsc2N5azdYRzVjYm5aaGNpQmZiRzluWjJWeUlEMGdjbVZ4ZFdseVpTZ25MaTlzYjJkblpYSXVhbk1uS1R0Y2JseHVkbUZ5SUY5c2IyZG5aWEl5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmYkc5bloyVnlLVHRjYmx4dVpuVnVZM1JwYjI0Z1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2h2WW1vcElIc2djbVYwZFhKdUlHOWlhaUFtSmlCdlltb3VYMTlsYzAxdlpIVnNaU0EvSUc5aWFpQTZJSHNnWkdWbVlYVnNkRG9nYjJKcUlIMDdJSDFjYmx4dVpuVnVZM1JwYjI0Z1gybHVkR1Z5YjNCU1pYRjFhWEpsVjJsc1pHTmhjbVFvYjJKcUtTQjdJR2xtSUNodlltb2dKaVlnYjJKcUxsOWZaWE5OYjJSMWJHVXBJSHNnY21WMGRYSnVJRzlpYWpzZ2ZTQmxiSE5sSUhzZ2RtRnlJRzVsZDA5aWFpQTlJSHQ5T3lCcFppQW9iMkpxSUNFOUlHNTFiR3dwSUhzZ1ptOXlJQ2gyWVhJZ2EyVjVJR2x1SUc5aWFpa2dleUJwWmlBb1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHOWlhaXdnYTJWNUtTa2dibVYzVDJKcVcydGxlVjBnUFNCdlltcGJhMlY1WFRzZ2ZTQjlJRzVsZDA5aWFpNWtaV1poZFd4MElEMGdiMkpxT3lCeVpYUjFjbTRnYm1WM1QySnFPeUI5SUgxY2JseHVablZ1WTNScGIyNGdYMk5zWVhOelEyRnNiRU5vWldOcktHbHVjM1JoYm1ObExDQkRiMjV6ZEhKMVkzUnZjaWtnZXlCcFppQW9JU2hwYm5OMFlXNWpaU0JwYm5OMFlXNWpaVzltSUVOdmJuTjBjblZqZEc5eUtTa2dleUIwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0Z3aVEyRnVibTkwSUdOaGJHd2dZU0JqYkdGemN5QmhjeUJoSUdaMWJtTjBhVzl1WENJcE95QjlJSDFjYmx4dWRtRnlJRWx1ZEdWeWNHOXNZWFJ2Y2lBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ1puVnVZM1JwYjI0Z1NXNTBaWEp3YjJ4aGRHOXlLQ2tnZTF4dUlDQWdJSFpoY2lCdmNIUnBiMjV6SUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUNBK0lEQWdKaVlnWVhKbmRXMWxiblJ6V3pCZElDRTlQU0IxYm1SbFptbHVaV1FnUHlCaGNtZDFiV1Z1ZEhOYk1GMGdPaUI3ZlR0Y2JseHVJQ0FnSUY5amJHRnpjME5oYkd4RGFHVmpheWgwYUdsekxDQkpiblJsY25CdmJHRjBiM0lwTzF4dVhHNGdJQ0FnZEdocGN5NXNiMmRuWlhJZ1BTQmZiRzluWjJWeU1pNWtaV1poZFd4MExtTnlaV0YwWlNnbmFXNTBaWEp3YjJ4aGRHOXlKeWs3WEc1Y2JpQWdJQ0IwYUdsekxtbHVhWFFvYjNCMGFXOXVjeXdnZEhKMVpTazdYRzRnSUgxY2JseHVJQ0F2S2lCbGMyeHBiblFnYm04dGNHRnlZVzB0Y21WaGMzTnBaMjQ2SURBZ0tpOWNibHh1WEc0Z0lFbHVkR1Z5Y0c5c1lYUnZjaTV3Y205MGIzUjVjR1V1YVc1cGRDQTlJR1oxYm1OMGFXOXVJR2x1YVhRb0tTQjdYRzRnSUNBZ2RtRnlJRzl3ZEdsdmJuTWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTUNBbUppQmhjbWQxYldWdWRITmJNRjBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXN3WFNBNklIdDlPMXh1SUNBZ0lIWmhjaUJ5WlhObGRDQTlJR0Z5WjNWdFpXNTBjMXN4WFR0Y2JseHVJQ0FnSUdsbUlDaHlaWE5sZENrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTV2Y0hScGIyNXpJRDBnYjNCMGFXOXVjenRjYmlBZ0lDQWdJSFJvYVhNdVptOXliV0YwSUQwZ2IzQjBhVzl1Y3k1cGJuUmxjbkJ2YkdGMGFXOXVJQ1ltSUc5d2RHbHZibk11YVc1MFpYSndiMnhoZEdsdmJpNW1iM0p0WVhRZ2ZId2dablZ1WTNScGIyNGdLSFpoYkhWbEtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjJZV3gxWlR0Y2JpQWdJQ0FnSUgwN1hHNGdJQ0FnSUNCMGFHbHpMbVZ6WTJGd1pTQTlJRzl3ZEdsdmJuTXVhVzUwWlhKd2IyeGhkR2x2YmlBbUppQnZjSFJwYjI1ekxtbHVkR1Z5Y0c5c1lYUnBiMjR1WlhOallYQmxJSHg4SUhWMGFXeHpMbVZ6WTJGd1pUdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tDRnZjSFJwYjI1ekxtbHVkR1Z5Y0c5c1lYUnBiMjRwSUc5d2RHbHZibk11YVc1MFpYSndiMnhoZEdsdmJpQTlJSHNnWlhOallYQmxWbUZzZFdVNklIUnlkV1VnZlR0Y2JseHVJQ0FnSUhaaGNpQnBUM0IwY3lBOUlHOXdkR2x2Ym5NdWFXNTBaWEp3YjJ4aGRHbHZianRjYmx4dUlDQWdJSFJvYVhNdVpYTmpZWEJsVm1Gc2RXVWdQU0JwVDNCMGN5NWxjMk5oY0dWV1lXeDFaU0FoUFQwZ2RXNWtaV1pwYm1Wa0lEOGdhVTl3ZEhNdVpYTmpZWEJsVm1Gc2RXVWdPaUIwY25WbE8xeHVYRzRnSUNBZ2RHaHBjeTV3Y21WbWFYZ2dQU0JwVDNCMGN5NXdjbVZtYVhnZ1B5QjFkR2xzY3k1eVpXZGxlRVZ6WTJGd1pTaHBUM0IwY3k1d2NtVm1hWGdwSURvZ2FVOXdkSE11Y0hKbFptbDRSWE5qWVhCbFpDQjhmQ0FuZTNzbk8xeHVJQ0FnSUhSb2FYTXVjM1ZtWm1sNElEMGdhVTl3ZEhNdWMzVm1abWw0SUQ4Z2RYUnBiSE11Y21WblpYaEZjMk5oY0dVb2FVOXdkSE11YzNWbVptbDRLU0E2SUdsUGNIUnpMbk4xWm1acGVFVnpZMkZ3WldRZ2ZId2dKMzE5Snp0Y2JseHVJQ0FnSUhSb2FYTXVabTl5YldGMFUyVndZWEpoZEc5eUlEMGdhVTl3ZEhNdVptOXliV0YwVTJWd1lYSmhkRzl5SUQ4Z2FVOXdkSE11Wm05eWJXRjBVMlZ3WVhKaGRHOXlJRG9nYVU5d2RITXVabTl5YldGMFUyVndZWEpoZEc5eUlIeDhJQ2NzSnp0Y2JseHVJQ0FnSUhSb2FYTXVkVzVsYzJOaGNHVlFjbVZtYVhnZ1BTQnBUM0IwY3k1MWJtVnpZMkZ3WlZOMVptWnBlQ0EvSUNjbklEb2dhVTl3ZEhNdWRXNWxjMk5oY0dWUWNtVm1hWGdnZkh3Z0p5MG5PMXh1SUNBZ0lIUm9hWE11ZFc1bGMyTmhjR1ZUZFdabWFYZ2dQU0IwYUdsekxuVnVaWE5qWVhCbFVISmxabWw0SUQ4Z0p5Y2dPaUJwVDNCMGN5NTFibVZ6WTJGd1pWTjFabVpwZUNCOGZDQW5KenRjYmx4dUlDQWdJSFJvYVhNdWJtVnpkR2x1WjFCeVpXWnBlQ0E5SUdsUGNIUnpMbTVsYzNScGJtZFFjbVZtYVhnZ1B5QjFkR2xzY3k1eVpXZGxlRVZ6WTJGd1pTaHBUM0IwY3k1dVpYTjBhVzVuVUhKbFptbDRLU0E2SUdsUGNIUnpMbTVsYzNScGJtZFFjbVZtYVhoRmMyTmhjR1ZrSUh4OElIVjBhV3h6TG5KbFoyVjRSWE5qWVhCbEtDY2tkQ2duS1R0Y2JpQWdJQ0IwYUdsekxtNWxjM1JwYm1kVGRXWm1hWGdnUFNCcFQzQjBjeTV1WlhOMGFXNW5VM1ZtWm1sNElEOGdkWFJwYkhNdWNtVm5aWGhGYzJOaGNHVW9hVTl3ZEhNdWJtVnpkR2x1WjFOMVptWnBlQ2tnT2lCcFQzQjBjeTV1WlhOMGFXNW5VM1ZtWm1sNFJYTmpZWEJsWkNCOGZDQjFkR2xzY3k1eVpXZGxlRVZ6WTJGd1pTZ25LU2NwTzF4dVhHNGdJQ0FnZEdocGN5NXRZWGhTWlhCc1lXTmxjeUE5SUdsUGNIUnpMbTFoZUZKbGNHeGhZMlZ6SUQ4Z2FVOXdkSE11YldGNFVtVndiR0ZqWlhNZ09pQXhNREF3TzF4dVhHNGdJQ0FnTHk4Z2RHaGxJSEpsWjJWNGNGeHVJQ0FnSUhSb2FYTXVjbVZ6WlhSU1pXZEZlSEFvS1R0Y2JpQWdmVHRjYmx4dUlDQkpiblJsY25CdmJHRjBiM0l1Y0hKdmRHOTBlWEJsTG5KbGMyVjBJRDBnWm5WdVkzUnBiMjRnY21WelpYUW9LU0I3WEc0Z0lDQWdhV1lnS0hSb2FYTXViM0IwYVc5dWN5a2dkR2hwY3k1cGJtbDBLSFJvYVhNdWIzQjBhVzl1Y3lrN1hHNGdJSDA3WEc1Y2JpQWdTVzUwWlhKd2IyeGhkRzl5TG5CeWIzUnZkSGx3WlM1eVpYTmxkRkpsWjBWNGNDQTlJR1oxYm1OMGFXOXVJSEpsYzJWMFVtVm5SWGh3S0NrZ2UxeHVJQ0FnSUM4dklIUm9aU0J5WldkbGVIQmNiaUFnSUNCMllYSWdjbVZuWlhod1UzUnlJRDBnZEdocGN5NXdjbVZtYVhnZ0t5QW5LQzRyUHlrbklDc2dkR2hwY3k1emRXWm1hWGc3WEc0Z0lDQWdkR2hwY3k1eVpXZGxlSEFnUFNCdVpYY2dVbVZuUlhod0tISmxaMlY0Y0ZOMGNpd2dKMmNuS1R0Y2JseHVJQ0FnSUhaaGNpQnlaV2RsZUhCVmJtVnpZMkZ3WlZOMGNpQTlJQ2NuSUNzZ2RHaHBjeTV3Y21WbWFYZ2dLeUIwYUdsekxuVnVaWE5qWVhCbFVISmxabWw0SUNzZ0p5Z3VLejhwSnlBcklIUm9hWE11ZFc1bGMyTmhjR1ZUZFdabWFYZ2dLeUIwYUdsekxuTjFabVpwZUR0Y2JpQWdJQ0IwYUdsekxuSmxaMlY0Y0ZWdVpYTmpZWEJsSUQwZ2JtVjNJRkpsWjBWNGNDaHlaV2RsZUhCVmJtVnpZMkZ3WlZOMGNpd2dKMmNuS1R0Y2JseHVJQ0FnSUhaaGNpQnVaWE4wYVc1blVtVm5aWGh3VTNSeUlEMGdkR2hwY3k1dVpYTjBhVzVuVUhKbFptbDRJQ3NnSnlndUt6OHBKeUFySUhSb2FYTXVibVZ6ZEdsdVoxTjFabVpwZUR0Y2JpQWdJQ0IwYUdsekxtNWxjM1JwYm1kU1pXZGxlSEFnUFNCdVpYY2dVbVZuUlhod0tHNWxjM1JwYm1kU1pXZGxlSEJUZEhJc0lDZG5KeWs3WEc0Z0lIMDdYRzVjYmlBZ1NXNTBaWEp3YjJ4aGRHOXlMbkJ5YjNSdmRIbHdaUzVwYm5SbGNuQnZiR0YwWlNBOUlHWjFibU4wYVc5dUlHbHVkR1Z5Y0c5c1lYUmxLSE4wY2l3Z1pHRjBZU3dnYkc1bktTQjdYRzRnSUNBZ2RtRnlJRjkwYUdseklEMGdkR2hwY3p0Y2JseHVJQ0FnSUhaaGNpQnRZWFJqYUNBOUlIWnZhV1FnTUR0Y2JpQWdJQ0IyWVhJZ2RtRnNkV1VnUFNCMmIybGtJREE3WEc0Z0lDQWdkbUZ5SUhKbGNHeGhZMlZ6SUQwZ2RtOXBaQ0F3TzF4dVhHNGdJQ0FnWm5WdVkzUnBiMjRnY21WblpYaFRZV1psS0haaGJDa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlIWmhiQzV5WlhCc1lXTmxLQzljWENRdlp5d2dKeVFrSkNRbktUdGNiaUFnSUNCOVhHNWNiaUFnSUNCMllYSWdhR0Z1Wkd4bFJtOXliV0YwSUQwZ1puVnVZM1JwYjI0Z2FHRnVaR3hsUm05eWJXRjBLR3RsZVNrZ2UxeHVJQ0FnSUNBZ2FXWWdLR3RsZVM1cGJtUmxlRTltS0Y5MGFHbHpMbVp2Y20xaGRGTmxjR0Z5WVhSdmNpa2dQQ0F3S1NCeVpYUjFjbTRnZFhScGJITXVaMlYwVUdGMGFDaGtZWFJoTENCclpYa3BPMXh1WEc0Z0lDQWdJQ0IyWVhJZ2NDQTlJR3RsZVM1emNHeHBkQ2hmZEdocGN5NW1iM0p0WVhSVFpYQmhjbUYwYjNJcE8xeHVJQ0FnSUNBZ2RtRnlJR3NnUFNCd0xuTm9hV1owS0NrdWRISnBiU2dwTzF4dUlDQWdJQ0FnZG1GeUlHWWdQU0J3TG1wdmFXNG9YM1JvYVhNdVptOXliV0YwVTJWd1lYSmhkRzl5S1M1MGNtbHRLQ2s3WEc1Y2JpQWdJQ0FnSUhKbGRIVnliaUJmZEdocGN5NW1iM0p0WVhRb2RYUnBiSE11WjJWMFVHRjBhQ2hrWVhSaExDQnJLU3dnWml3Z2JHNW5LVHRjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdkR2hwY3k1eVpYTmxkRkpsWjBWNGNDZ3BPMXh1WEc0Z0lDQWdjbVZ3YkdGalpYTWdQU0F3TzF4dUlDQWdJQzh2SUhWdVpYTmpZWEJsSUdsbUlHaGhjeUIxYm1WelkyRndaVkJ5WldacGVDOVRkV1ptYVhoY2JpQWdJQ0F2S2lCbGMyeHBiblFnYm04dFkyOXVaQzFoYzNOcFoyNDZJREFnS2k5Y2JpQWdJQ0IzYUdsc1pTQW9iV0YwWTJnZ1BTQjBhR2x6TG5KbFoyVjRjRlZ1WlhOallYQmxMbVY0WldNb2MzUnlLU2tnZTF4dUlDQWdJQ0FnZG1Gc2RXVWdQU0JvWVc1a2JHVkdiM0p0WVhRb2JXRjBZMmhiTVYwdWRISnBiU2dwS1R0Y2JpQWdJQ0FnSUhOMGNpQTlJSE4wY2k1eVpYQnNZV05sS0cxaGRHTm9XekJkTENCMllXeDFaU2s3WEc0Z0lDQWdJQ0IwYUdsekxuSmxaMlY0Y0ZWdVpYTmpZWEJsTG14aGMzUkpibVJsZUNBOUlEQTdYRzRnSUNBZ0lDQnlaWEJzWVdObGN5c3JPMXh1SUNBZ0lDQWdhV1lnS0hKbGNHeGhZMlZ6SUQ0OUlIUm9hWE11YldGNFVtVndiR0ZqWlhNcElIdGNiaUFnSUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dVhHNGdJQ0FnY21Wd2JHRmpaWE1nUFNBd08xeHVJQ0FnSUM4dklISmxaM1ZzWVhJZ1pYTmpZWEJsSUc5dUlHUmxiV0Z1WkZ4dUlDQWdJSGRvYVd4bElDaHRZWFJqYUNBOUlIUm9hWE11Y21WblpYaHdMbVY0WldNb2MzUnlLU2tnZTF4dUlDQWdJQ0FnZG1Gc2RXVWdQU0JvWVc1a2JHVkdiM0p0WVhRb2JXRjBZMmhiTVYwdWRISnBiU2dwS1R0Y2JpQWdJQ0FnSUdsbUlDaDBlWEJsYjJZZ2RtRnNkV1VnSVQwOUlDZHpkSEpwYm1jbktTQjJZV3gxWlNBOUlIVjBhV3h6TG0xaGEyVlRkSEpwYm1jb2RtRnNkV1VwTzF4dUlDQWdJQ0FnYVdZZ0tDRjJZV3gxWlNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG14dloyZGxjaTUzWVhKdUtDZHRhWE56WldRZ2RHOGdjR0Z6Y3lCcGJpQjJZWEpwWVdKc1pTQW5JQ3NnYldGMFkyaGJNVjBnS3lBbklHWnZjaUJwYm5SbGNuQnZiR0YwYVc1bklDY2dLeUJ6ZEhJcE8xeHVJQ0FnSUNBZ0lDQjJZV3gxWlNBOUlDY25PMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdkbUZzZFdVZ1BTQjBhR2x6TG1WelkyRndaVlpoYkhWbElEOGdjbVZuWlhoVFlXWmxLSFJvYVhNdVpYTmpZWEJsS0haaGJIVmxLU2tnT2lCeVpXZGxlRk5oWm1Vb2RtRnNkV1VwTzF4dUlDQWdJQ0FnYzNSeUlEMGdjM1J5TG5KbGNHeGhZMlVvYldGMFkyaGJNRjBzSUhaaGJIVmxLVHRjYmlBZ0lDQWdJSFJvYVhNdWNtVm5aWGh3TG14aGMzUkpibVJsZUNBOUlEQTdYRzRnSUNBZ0lDQnlaWEJzWVdObGN5c3JPMXh1SUNBZ0lDQWdhV1lnS0hKbGNHeGhZMlZ6SUQ0OUlIUm9hWE11YldGNFVtVndiR0ZqWlhNcElIdGNiaUFnSUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQnpkSEk3WEc0Z0lIMDdYRzVjYmlBZ1NXNTBaWEp3YjJ4aGRHOXlMbkJ5YjNSdmRIbHdaUzV1WlhOMElEMGdablZ1WTNScGIyNGdibVZ6ZENoemRISXNJR1pqS1NCN1hHNGdJQ0FnZG1GeUlHOXdkR2x2Ym5NZ1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb0lENGdNaUFtSmlCaGNtZDFiV1Z1ZEhOYk1sMGdJVDA5SUhWdVpHVm1hVzVsWkNBL0lHRnlaM1Z0Wlc1MGMxc3lYU0E2SUh0OU8xeHVYRzRnSUNBZ2RtRnlJRzFoZEdOb0lEMGdkbTlwWkNBd08xeHVJQ0FnSUhaaGNpQjJZV3gxWlNBOUlIWnZhV1FnTUR0Y2JseHVJQ0FnSUhaaGNpQmpiRzl1WldSUGNIUnBiMjV6SUQwZ1gyVjRkR1Z1WkhNb2UzMHNJRzl3ZEdsdmJuTXBPMXh1SUNBZ0lHTnNiMjVsWkU5d2RHbHZibk11WVhCd2JIbFFiM04wVUhKdlkyVnpjMjl5SUQwZ1ptRnNjMlU3SUM4dklHRjJiMmxrSUhCdmMzUWdjSEp2WTJWemMybHVaeUJ2YmlCdVpYTjBaV1FnYkc5dmEzVndYRzVjYmlBZ0lDQXZMeUJwWmlCMllXeDFaU0JwY3lCemIyMWxkR2hwYm1jZ2JHbHJaU0JjSW0xNVMyVjVYQ0k2SUZ3aWJHOXlaVzBnSkNoaGJtOTBhR1Z5UzJWNUxDQjdJRndpWTI5MWJuUmNJam9nZTN0aFZtRnNkV1ZKYms5d2RHbHZibk45ZlNCOUtWd2lYRzRnSUNBZ1puVnVZM1JwYjI0Z2FHRnVaR3hsU0dGelQzQjBhVzl1Y3loclpYa3NJR2x1YUdWeWFYUmxaRTl3ZEdsdmJuTXBJSHRjYmlBZ0lDQWdJR2xtSUNoclpYa3VhVzVrWlhoUFppZ25MQ2NwSUR3Z01Da2djbVYwZFhKdUlHdGxlVHRjYmx4dUlDQWdJQ0FnZG1GeUlIQWdQU0JyWlhrdWMzQnNhWFFvSnl3bktUdGNiaUFnSUNBZ0lHdGxlU0E5SUhBdWMyaHBablFvS1R0Y2JpQWdJQ0FnSUhaaGNpQnZjSFJwYjI1elUzUnlhVzVuSUQwZ2NDNXFiMmx1S0Njc0p5azdYRzRnSUNBZ0lDQnZjSFJwYjI1elUzUnlhVzVuSUQwZ2RHaHBjeTVwYm5SbGNuQnZiR0YwWlNodmNIUnBiMjV6VTNSeWFXNW5MQ0JqYkc5dVpXUlBjSFJwYjI1ektUdGNiaUFnSUNBZ0lHOXdkR2x2Ym5OVGRISnBibWNnUFNCdmNIUnBiMjV6VTNSeWFXNW5MbkpsY0d4aFkyVW9MeWN2Wnl3Z0oxd2lKeWs3WEc1Y2JpQWdJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQWdJR05zYjI1bFpFOXdkR2x2Ym5NZ1BTQktVMDlPTG5CaGNuTmxLRzl3ZEdsdmJuTlRkSEpwYm1jcE8xeHVYRzRnSUNBZ0lDQWdJR2xtSUNocGJtaGxjbWwwWldSUGNIUnBiMjV6S1NCamJHOXVaV1JQY0hScGIyNXpJRDBnWDJWNGRHVnVaSE1vZTMwc0lHbHVhR1Z5YVhSbFpFOXdkR2x2Ym5Nc0lHTnNiMjVsWkU5d2RHbHZibk1wTzF4dUlDQWdJQ0FnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG14dloyZGxjaTVsY25KdmNpZ25abUZwYkdWa0lIQmhjbk5wYm1jZ2IzQjBhVzl1Y3lCemRISnBibWNnYVc0Z2JtVnpkR2x1WnlCbWIzSWdhMlY1SUNjZ0t5QnJaWGtzSUdVcE8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQnlaWFIxY200Z2EyVjVPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJSEpsWjNWc1lYSWdaWE5qWVhCbElHOXVJR1JsYldGdVpGeHVJQ0FnSUhkb2FXeGxJQ2h0WVhSamFDQTlJSFJvYVhNdWJtVnpkR2x1WjFKbFoyVjRjQzVsZUdWaktITjBjaWtwSUh0Y2JpQWdJQ0FnSUhaaGJIVmxJRDBnWm1Nb2FHRnVaR3hsU0dGelQzQjBhVzl1Y3k1allXeHNLSFJvYVhNc0lHMWhkR05vV3pGZExuUnlhVzBvS1N3Z1kyeHZibVZrVDNCMGFXOXVjeWtzSUdOc2IyNWxaRTl3ZEdsdmJuTXBPMXh1WEc0Z0lDQWdJQ0F2THlCcGN5QnZibXg1SUhSb1pTQnVaWE4wYVc1bklHdGxlU0FvYTJWNU1TQTlJQ2NrS0d0bGVUSXBKeWtnY21WMGRYSnVJSFJvWlNCMllXeDFaU0IzYVhSb2IzVjBJSE4wY21sdVoybG1lVnh1SUNBZ0lDQWdhV1lnS0haaGJIVmxJQ1ltSUcxaGRHTm9XekJkSUQwOVBTQnpkSElnSmlZZ2RIbHdaVzltSUhaaGJIVmxJQ0U5UFNBbmMzUnlhVzVuSnlrZ2NtVjBkWEp1SUhaaGJIVmxPMXh1WEc0Z0lDQWdJQ0F2THlCdWJ5QnpkSEpwYm1jZ2RHOGdhVzVqYkhWa1pTQnZjaUJsYlhCMGVWeHVJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQjJZV3gxWlNBaFBUMGdKM04wY21sdVp5Y3BJSFpoYkhWbElEMGdkWFJwYkhNdWJXRnJaVk4wY21sdVp5aDJZV3gxWlNrN1hHNGdJQ0FnSUNCcFppQW9JWFpoYkhWbEtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdWJHOW5aMlZ5TG5kaGNtNG9KMjFwYzNObFpDQjBieUJ5WlhOdmJIWmxJQ2NnS3lCdFlYUmphRnN4WFNBcklDY2dabTl5SUc1bGMzUnBibWNnSnlBcklITjBjaWs3WEc0Z0lDQWdJQ0FnSUhaaGJIVmxJRDBnSnljN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNBdkx5Qk9aWE4wWldRZ2EyVjVjeUJ6YUc5MWJHUWdibTkwSUdKbElHVnpZMkZ3WldRZ1lua2daR1ZtWVhWc2RDQWpPRFUwWEc0Z0lDQWdJQ0F2THlCMllXeDFaU0E5SUhSb2FYTXVaWE5qWVhCbFZtRnNkV1VnUHlCeVpXZGxlRk5oWm1Vb2RYUnBiSE11WlhOallYQmxLSFpoYkhWbEtTa2dPaUJ5WldkbGVGTmhabVVvZG1Gc2RXVXBPMXh1SUNBZ0lDQWdjM1J5SUQwZ2MzUnlMbkpsY0d4aFkyVW9iV0YwWTJoYk1GMHNJSFpoYkhWbEtUdGNiaUFnSUNBZ0lIUm9hWE11Y21WblpYaHdMbXhoYzNSSmJtUmxlQ0E5SURBN1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQnpkSEk3WEc0Z0lIMDdYRzVjYmlBZ2NtVjBkWEp1SUVsdWRHVnljRzlzWVhSdmNqdGNibjBvS1R0Y2JseHVaWGh3YjNKMGN5NWtaV1poZFd4MElEMGdTVzUwWlhKd2IyeGhkRzl5T3lJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRndpWDE5bGMwMXZaSFZzWlZ3aUxDQjdYRzRnSUhaaGJIVmxPaUIwY25WbFhHNTlLVHRjYmx4dWRtRnlJRjlzYjJkblpYSWdQU0J5WlhGMWFYSmxLQ2N1TDJ4dloyZGxjaTVxY3ljcE8xeHVYRzUyWVhJZ1gyeHZaMmRsY2pJZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5c2IyZG5aWElwTzF4dVhHNW1kVzVqZEdsdmJpQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0c5aWFpa2dleUJ5WlhSMWNtNGdiMkpxSUNZbUlHOWlhaTVmWDJWelRXOWtkV3hsSUQ4Z2IySnFJRG9nZXlCa1pXWmhkV3gwT2lCdlltb2dmVHNnZlZ4dVhHNW1kVzVqZEdsdmJpQmZZMnhoYzNORFlXeHNRMmhsWTJzb2FXNXpkR0Z1WTJVc0lFTnZibk4wY25WamRHOXlLU0I3SUdsbUlDZ2hLR2x1YzNSaGJtTmxJR2x1YzNSaGJtTmxiMllnUTI5dWMzUnlkV04wYjNJcEtTQjdJSFJvY205M0lHNWxkeUJVZVhCbFJYSnliM0lvWENKRFlXNXViM1FnWTJGc2JDQmhJR05zWVhOeklHRnpJR0VnWm5WdVkzUnBiMjVjSWlrN0lIMGdmVnh1WEc1bWRXNWpkR2x2YmlCallYQnBkR0ZzYVhwbEtITjBjbWx1WnlrZ2UxeHVJQ0J5WlhSMWNtNGdjM1J5YVc1bkxtTm9ZWEpCZENnd0tTNTBiMVZ3Y0dWeVEyRnpaU2dwSUNzZ2MzUnlhVzVuTG5Oc2FXTmxLREVwTzF4dWZWeHVYRzUyWVhJZ1RHRnVaM1ZoWjJWVmRHbHNJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0JtZFc1amRHbHZiaUJNWVc1bmRXRm5aVlYwYVd3b2IzQjBhVzl1Y3lrZ2UxeHVJQ0FnSUY5amJHRnpjME5oYkd4RGFHVmpheWgwYUdsekxDQk1ZVzVuZFdGblpWVjBhV3dwTzF4dVhHNGdJQ0FnZEdocGN5NXZjSFJwYjI1eklEMGdiM0IwYVc5dWN6dGNibHh1SUNBZ0lIUm9hWE11ZDJocGRHVnNhWE4wSUQwZ2RHaHBjeTV2Y0hScGIyNXpMbmRvYVhSbGJHbHpkQ0I4ZkNCbVlXeHpaVHRjYmlBZ0lDQjBhR2x6TG14dloyZGxjaUE5SUY5c2IyZG5aWEl5TG1SbFptRjFiSFF1WTNKbFlYUmxLQ2RzWVc1bmRXRm5aVlYwYVd4ekp5azdYRzRnSUgxY2JseHVJQ0JNWVc1bmRXRm5aVlYwYVd3dWNISnZkRzkwZVhCbExtZGxkRk5qY21sd2RGQmhjblJHY205dFEyOWtaU0E5SUdaMWJtTjBhVzl1SUdkbGRGTmpjbWx3ZEZCaGNuUkdjbTl0UTI5a1pTaGpiMlJsS1NCN1hHNGdJQ0FnYVdZZ0tDRmpiMlJsSUh4OElHTnZaR1V1YVc1a1pYaFBaaWduTFNjcElEd2dNQ2tnY21WMGRYSnVJRzUxYkd3N1hHNWNiaUFnSUNCMllYSWdjQ0E5SUdOdlpHVXVjM0JzYVhRb0p5MG5LVHRjYmlBZ0lDQnBaaUFvY0M1c1pXNW5kR2dnUFQwOUlESXBJSEpsZEhWeWJpQnVkV3hzTzF4dUlDQWdJSEF1Y0c5d0tDazdYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTXVabTl5YldGMFRHRnVaM1ZoWjJWRGIyUmxLSEF1YW05cGJpZ25MU2NwS1R0Y2JpQWdmVHRjYmx4dUlDQk1ZVzVuZFdGblpWVjBhV3d1Y0hKdmRHOTBlWEJsTG1kbGRFeGhibWQxWVdkbFVHRnlkRVp5YjIxRGIyUmxJRDBnWm5WdVkzUnBiMjRnWjJWMFRHRnVaM1ZoWjJWUVlYSjBSbkp2YlVOdlpHVW9ZMjlrWlNrZ2UxeHVJQ0FnSUdsbUlDZ2hZMjlrWlNCOGZDQmpiMlJsTG1sdVpHVjRUMllvSnkwbktTQThJREFwSUhKbGRIVnliaUJqYjJSbE8xeHVYRzRnSUNBZ2RtRnlJSEFnUFNCamIyUmxMbk53YkdsMEtDY3RKeWs3WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE11Wm05eWJXRjBUR0Z1WjNWaFoyVkRiMlJsS0hCYk1GMHBPMXh1SUNCOU8xeHVYRzRnSUV4aGJtZDFZV2RsVlhScGJDNXdjbTkwYjNSNWNHVXVabTl5YldGMFRHRnVaM1ZoWjJWRGIyUmxJRDBnWm5WdVkzUnBiMjRnWm05eWJXRjBUR0Z1WjNWaFoyVkRiMlJsS0dOdlpHVXBJSHRjYmlBZ0lDQXZMeUJvZEhSd09pOHZkM2QzTG1saGJtRXViM0puTDJGemMybG5ibTFsYm5SekwyeGhibWQxWVdkbExYUmhaM012YkdGdVozVmhaMlV0ZEdGbmN5NTRhSFJ0YkZ4dUlDQWdJR2xtSUNoMGVYQmxiMllnWTI5a1pTQTlQVDBnSjNOMGNtbHVaeWNnSmlZZ1kyOWtaUzVwYm1SbGVFOW1LQ2N0SnlrZ1BpQXRNU2tnZTF4dUlDQWdJQ0FnZG1GeUlITndaV05wWVd4RFlYTmxjeUE5SUZzbmFHRnVjeWNzSUNkb1lXNTBKeXdnSjJ4aGRHNG5MQ0FuWTNseWJDY3NJQ2RqWVc1ekp5d2dKMjF2Ym1jbkxDQW5ZWEpoWWlkZE8xeHVJQ0FnSUNBZ2RtRnlJSEFnUFNCamIyUmxMbk53YkdsMEtDY3RKeWs3WEc1Y2JpQWdJQ0FnSUdsbUlDaDBhR2x6TG05d2RHbHZibk11Ykc5M1pYSkRZWE5sVEc1bktTQjdYRzRnSUNBZ0lDQWdJSEFnUFNCd0xtMWhjQ2htZFc1amRHbHZiaUFvY0dGeWRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ3WVhKMExuUnZURzkzWlhKRFlYTmxLQ2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaHdMbXhsYm1kMGFDQTlQVDBnTWlrZ2UxeHVJQ0FnSUNBZ0lDQndXekJkSUQwZ2NGc3dYUzUwYjB4dmQyVnlRMkZ6WlNncE8xeHVJQ0FnSUNBZ0lDQndXekZkSUQwZ2NGc3hYUzUwYjFWd2NHVnlRMkZ6WlNncE8xeHVYRzRnSUNBZ0lDQWdJR2xtSUNoemNHVmphV0ZzUTJGelpYTXVhVzVrWlhoUFppaHdXekZkTG5SdlRHOTNaWEpEWVhObEtDa3BJRDRnTFRFcElIQmJNVjBnUFNCallYQnBkR0ZzYVhwbEtIQmJNVjB1ZEc5TWIzZGxja05oYzJVb0tTazdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLSEF1YkdWdVozUm9JRDA5UFNBektTQjdYRzRnSUNBZ0lDQWdJSEJiTUYwZ1BTQndXekJkTG5SdlRHOTNaWEpEWVhObEtDazdYRzVjYmlBZ0lDQWdJQ0FnTHk4Z2FXWWdiR1Z1WjJoMElESWdaM1ZsYzNNZ2FYUW5jeUJoSUdOdmRXNTBjbmxjYmlBZ0lDQWdJQ0FnYVdZZ0tIQmJNVjB1YkdWdVozUm9JRDA5UFNBeUtTQndXekZkSUQwZ2NGc3hYUzUwYjFWd2NHVnlRMkZ6WlNncE8xeHVJQ0FnSUNBZ0lDQnBaaUFvY0Zzd1hTQWhQVDBnSjNObmJpY2dKaVlnY0ZzeVhTNXNaVzVuZEdnZ1BUMDlJRElwSUhCYk1sMGdQU0J3V3pKZExuUnZWWEJ3WlhKRFlYTmxLQ2s3WEc1Y2JpQWdJQ0FnSUNBZ2FXWWdLSE53WldOcFlXeERZWE5sY3k1cGJtUmxlRTltS0hCYk1WMHVkRzlNYjNkbGNrTmhjMlVvS1NrZ1BpQXRNU2tnY0ZzeFhTQTlJR05oY0dsMFlXeHBlbVVvY0ZzeFhTNTBiMHh2ZDJWeVEyRnpaU2dwS1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLSE53WldOcFlXeERZWE5sY3k1cGJtUmxlRTltS0hCYk1sMHVkRzlNYjNkbGNrTmhjMlVvS1NrZ1BpQXRNU2tnY0ZzeVhTQTlJR05oY0dsMFlXeHBlbVVvY0ZzeVhTNTBiMHh2ZDJWeVEyRnpaU2dwS1R0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2NtVjBkWEp1SUhBdWFtOXBiaWduTFNjcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGRIVnliaUIwYUdsekxtOXdkR2x2Ym5NdVkyeGxZVzVEYjJSbElIeDhJSFJvYVhNdWIzQjBhVzl1Y3k1c2IzZGxja05oYzJWTWJtY2dQeUJqYjJSbExuUnZURzkzWlhKRFlYTmxLQ2tnT2lCamIyUmxPMXh1SUNCOU8xeHVYRzRnSUV4aGJtZDFZV2RsVlhScGJDNXdjbTkwYjNSNWNHVXVhWE5YYUdsMFpXeHBjM1JsWkNBOUlHWjFibU4wYVc5dUlHbHpWMmhwZEdWc2FYTjBaV1FvWTI5a1pTa2dlMXh1SUNBZ0lHbG1JQ2gwYUdsekxtOXdkR2x2Ym5NdWJHOWhaQ0E5UFQwZ0oyeGhibWQxWVdkbFQyNXNlU2NnZkh3Z2RHaHBjeTV2Y0hScGIyNXpMbTV2YmtWNGNHeHBZMmwwVjJocGRHVnNhWE4wS1NCN1hHNGdJQ0FnSUNCamIyUmxJRDBnZEdocGN5NW5aWFJNWVc1bmRXRm5aVkJoY25SR2NtOXRRMjlrWlNoamIyUmxLVHRjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUNGMGFHbHpMbmRvYVhSbGJHbHpkQ0I4ZkNBaGRHaHBjeTUzYUdsMFpXeHBjM1F1YkdWdVozUm9JSHg4SUhSb2FYTXVkMmhwZEdWc2FYTjBMbWx1WkdWNFQyWW9ZMjlrWlNrZ1BpQXRNVHRjYmlBZ2ZUdGNibHh1SUNCTVlXNW5kV0ZuWlZWMGFXd3VjSEp2ZEc5MGVYQmxMbWRsZEVaaGJHeGlZV05yUTI5a1pYTWdQU0JtZFc1amRHbHZiaUJuWlhSR1lXeHNZbUZqYTBOdlpHVnpLR1poYkd4aVlXTnJjeXdnWTI5a1pTa2dlMXh1SUNBZ0lHbG1JQ2doWm1Gc2JHSmhZMnR6S1NCeVpYUjFjbTRnVzEwN1hHNGdJQ0FnYVdZZ0tIUjVjR1Z2WmlCbVlXeHNZbUZqYTNNZ1BUMDlJQ2R6ZEhKcGJtY25LU0JtWVd4c1ltRmphM01nUFNCYlptRnNiR0poWTJ0elhUdGNiaUFnSUNCcFppQW9UMkpxWldOMExuQnliM1J2ZEhsd1pTNTBiMU4wY21sdVp5NWhjSEJzZVNobVlXeHNZbUZqYTNNcElEMDlQU0FuVzI5aWFtVmpkQ0JCY25KaGVWMG5LU0J5WlhSMWNtNGdabUZzYkdKaFkydHpPMXh1WEc0Z0lDQWdhV1lnS0NGamIyUmxLU0J5WlhSMWNtNGdabUZzYkdKaFkydHpMbVJsWm1GMWJIUWdmSHdnVzEwN1hHNWNiaUFnSUNBdkx5QmhjM1Z0WlNCM1pTQm9ZWFpsSUdGdUlHOWlhbVZqZENCa1pXWnBibWx1WnlCbVlXeHNZbUZqYTNOY2JpQWdJQ0IyWVhJZ1ptOTFibVFnUFNCbVlXeHNZbUZqYTNOYlkyOWtaVjA3WEc0Z0lDQWdhV1lnS0NGbWIzVnVaQ2tnWm05MWJtUWdQU0JtWVd4c1ltRmphM05iZEdocGN5NW5aWFJUWTNKcGNIUlFZWEowUm5KdmJVTnZaR1VvWTI5a1pTbGRPMXh1SUNBZ0lHbG1JQ2doWm05MWJtUXBJR1p2ZFc1a0lEMGdabUZzYkdKaFkydHpXM1JvYVhNdVptOXliV0YwVEdGdVozVmhaMlZEYjJSbEtHTnZaR1VwWFR0Y2JpQWdJQ0JwWmlBb0lXWnZkVzVrS1NCbWIzVnVaQ0E5SUdaaGJHeGlZV05yY3k1a1pXWmhkV3gwTzF4dVhHNGdJQ0FnY21WMGRYSnVJR1p2ZFc1a0lIeDhJRnRkTzF4dUlDQjlPMXh1WEc0Z0lFeGhibWQxWVdkbFZYUnBiQzV3Y205MGIzUjVjR1V1ZEc5U1pYTnZiSFpsU0dsbGNtRnlZMmg1SUQwZ1puVnVZM1JwYjI0Z2RHOVNaWE52YkhabFNHbGxjbUZ5WTJoNUtHTnZaR1VzSUdaaGJHeGlZV05yUTI5a1pTa2dlMXh1SUNBZ0lIWmhjaUJmZEdocGN5QTlJSFJvYVhNN1hHNWNiaUFnSUNCMllYSWdabUZzYkdKaFkydERiMlJsY3lBOUlIUm9hWE11WjJWMFJtRnNiR0poWTJ0RGIyUmxjeWhtWVd4c1ltRmphME52WkdVZ2ZId2dkR2hwY3k1dmNIUnBiMjV6TG1aaGJHeGlZV05yVEc1bklIeDhJRnRkTENCamIyUmxLVHRjYmx4dUlDQWdJSFpoY2lCamIyUmxjeUE5SUZ0ZE8xeHVJQ0FnSUhaaGNpQmhaR1JEYjJSbElEMGdablZ1WTNScGIyNGdZV1JrUTI5a1pTaGpLU0I3WEc0Z0lDQWdJQ0JwWmlBb0lXTXBJSEpsZEhWeWJqdGNiaUFnSUNBZ0lHbG1JQ2hmZEdocGN5NXBjMWRvYVhSbGJHbHpkR1ZrS0dNcEtTQjdYRzRnSUNBZ0lDQWdJR052WkdWekxuQjFjMmdvWXlrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCZmRHaHBjeTVzYjJkblpYSXVkMkZ5YmlnbmNtVnFaV04wYVc1bklHNXZiaTEzYUdsMFpXeHBjM1JsWkNCc1lXNW5kV0ZuWlNCamIyUmxPaUFuSUNzZ1l5azdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lHbG1JQ2gwZVhCbGIyWWdZMjlrWlNBOVBUMGdKM04wY21sdVp5Y2dKaVlnWTI5a1pTNXBibVJsZUU5bUtDY3RKeWtnUGlBdE1Ta2dlMXh1SUNBZ0lDQWdhV1lnS0hSb2FYTXViM0IwYVc5dWN5NXNiMkZrSUNFOVBTQW5iR0Z1WjNWaFoyVlBibXg1SnlrZ1lXUmtRMjlrWlNoMGFHbHpMbVp2Y20xaGRFeGhibWQxWVdkbFEyOWtaU2hqYjJSbEtTazdYRzRnSUNBZ0lDQnBaaUFvZEdocGN5NXZjSFJwYjI1ekxteHZZV1FnSVQwOUlDZHNZVzVuZFdGblpVOXViSGtuSUNZbUlIUm9hWE11YjNCMGFXOXVjeTVzYjJGa0lDRTlQU0FuWTNWeWNtVnVkRTl1YkhrbktTQmhaR1JEYjJSbEtIUm9hWE11WjJWMFUyTnlhWEIwVUdGeWRFWnliMjFEYjJSbEtHTnZaR1VwS1R0Y2JpQWdJQ0FnSUdsbUlDaDBhR2x6TG05d2RHbHZibk11Ykc5aFpDQWhQVDBnSjJOMWNuSmxiblJQYm14NUp5a2dZV1JrUTI5a1pTaDBhR2x6TG1kbGRFeGhibWQxWVdkbFVHRnlkRVp5YjIxRGIyUmxLR052WkdVcEtUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tIUjVjR1Z2WmlCamIyUmxJRDA5UFNBbmMzUnlhVzVuSnlrZ2UxeHVJQ0FnSUNBZ1lXUmtRMjlrWlNoMGFHbHpMbVp2Y20xaGRFeGhibWQxWVdkbFEyOWtaU2hqYjJSbEtTazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ1ptRnNiR0poWTJ0RGIyUmxjeTVtYjNKRllXTm9LR1oxYm1OMGFXOXVJQ2htWXlrZ2UxeHVJQ0FnSUNBZ2FXWWdLR052WkdWekxtbHVaR1Y0VDJZb1ptTXBJRHdnTUNrZ1lXUmtRMjlrWlNoZmRHaHBjeTVtYjNKdFlYUk1ZVzVuZFdGblpVTnZaR1VvWm1NcEtUdGNiaUFnSUNCOUtUdGNibHh1SUNBZ0lISmxkSFZ5YmlCamIyUmxjenRjYmlBZ2ZUdGNibHh1SUNCeVpYUjFjbTRnVEdGdVozVmhaMlZWZEdsc08xeHVmU2dwTzF4dVhHNWxlSEJ2Y25SekxtUmxabUYxYkhRZ1BTQk1ZVzVuZFdGblpWVjBhV3c3SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1UFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dYQ0pmWDJWelRXOWtkV3hsWENJc0lIdGNiaUFnZG1Gc2RXVTZJSFJ5ZFdWY2JuMHBPMXh1WEc1MllYSWdYMnh2WjJkbGNpQTlJSEpsY1hWcGNtVW9KeTR2Ykc5bloyVnlMbXB6SnlrN1hHNWNiblpoY2lCZmJHOW5aMlZ5TWlBOUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvWDJ4dloyZGxjaWs3WEc1Y2JtWjFibU4wYVc5dUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvYjJKcUtTQjdJSEpsZEhWeWJpQnZZbW9nSmlZZ2IySnFMbDlmWlhOTmIyUjFiR1VnUHlCdlltb2dPaUI3SUdSbFptRjFiSFE2SUc5aWFpQjlPeUI5WEc1Y2JtWjFibU4wYVc5dUlGOWpiR0Z6YzBOaGJHeERhR1ZqYXlocGJuTjBZVzVqWlN3Z1EyOXVjM1J5ZFdOMGIzSXBJSHNnYVdZZ0tDRW9hVzV6ZEdGdVkyVWdhVzV6ZEdGdVkyVnZaaUJEYjI1emRISjFZM1J2Y2lrcElIc2dkR2h5YjNjZ2JtVjNJRlI1Y0dWRmNuSnZjaWhjSWtOaGJtNXZkQ0JqWVd4c0lHRWdZMnhoYzNNZ1lYTWdZU0JtZFc1amRHbHZibHdpS1RzZ2ZTQjlYRzVjYmk4dklHUmxabWx1YVhScGIyNGdhSFIwY0RvdkwzUnlZVzV6YkdGMFpTNXpiM1Z5WTJWbWIzSm5aUzV1WlhRdmQybHJhUzlzTVRCdUwzQnNkWEpoYkdadmNtMXpYRzR2S2lCbGMyeHBiblF0WkdsellXSnNaU0FxTDF4dWRtRnlJSE5sZEhNZ1BTQmJleUJzYm1kek9pQmJKMkZqYUNjc0lDZGhheWNzSUNkaGJTY3NJQ2RoY200bkxDQW5ZbkluTENBblptbHNKeXdnSjJkMWJpY3NJQ2RzYmljc0lDZHRabVVuTENBbmJXY25MQ0FuYldrbkxDQW5iMk1uTENBbmNIUW5MQ0FuY0hRdFFsSW5MQ0FuZEdjbkxDQW5kR2tuTENBbmRISW5MQ0FuZFhvbkxDQW5kMkVuWFN3Z2JuSTZJRnN4TENBeVhTd2dabU02SURFZ2ZTd2dleUJzYm1kek9pQmJKMkZtSnl3Z0oyRnVKeXdnSjJGemRDY3NJQ2RoZWljc0lDZGlaeWNzSUNkaWJpY3NJQ2RqWVNjc0lDZGtZU2NzSUNka1pTY3NJQ2RrWlhZbkxDQW5aV3duTENBblpXNG5MQ0FuWlc4bkxDQW5aWE1uTENBblpYUW5MQ0FuWlhVbkxDQW5abWtuTENBblptOG5MQ0FuWm5WeUp5d2dKMlo1Snl3Z0oyZHNKeXdnSjJkMUp5d2dKMmhoSnl3Z0oyaGxKeXdnSjJocEp5d2dKMmgxSnl3Z0oyaDVKeXdnSjJsaEp5d2dKMmwwSnl3Z0oydHVKeXdnSjJ0MUp5d2dKMnhpSnl3Z0oyMWhhU2NzSUNkdGJDY3NJQ2R0Ymljc0lDZHRjaWNzSUNkdVlXZ25MQ0FuYm1Gd0p5d2dKMjVpSnl3Z0oyNWxKeXdnSjI1c0p5d2dKMjV1Snl3Z0oyNXZKeXdnSjI1emJ5Y3NJQ2R3WVNjc0lDZHdZWEFuTENBbmNHMXpKeXdnSjNCekp5d2dKM0IwTFZCVUp5d2dKM0p0Snl3Z0ozTmpieWNzSUNkelpTY3NJQ2R6YVNjc0lDZHpieWNzSUNkemIyNG5MQ0FuYzNFbkxDQW5jM1luTENBbmMzY25MQ0FuZEdFbkxDQW5kR1VuTENBbmRHc25MQ0FuZFhJbkxDQW5lVzhuWFN3Z2JuSTZJRnN4TENBeVhTd2dabU02SURJZ2ZTd2dleUJzYm1kek9pQmJKMkY1Snl3Z0oySnZKeXdnSjJOblp5Y3NJQ2RtWVNjc0lDZHBaQ2NzSUNkcVlTY3NJQ2RxWW04bkxDQW5hMkVuTENBbmEyc25MQ0FuYTIwbkxDQW5hMjhuTENBbmEza25MQ0FuYkc4bkxDQW5iWE1uTENBbmMyRm9KeXdnSjNOMUp5d2dKM1JvSnl3Z0ozUjBKeXdnSjNWbkp5d2dKM1pwSnl3Z0ozZHZKeXdnSjNwb0oxMHNJRzV5T2lCYk1WMHNJR1pqT2lBeklIMHNJSHNnYkc1bmN6b2dXeWRpWlNjc0lDZGljeWNzSUNka2VpY3NJQ2RvY2ljc0lDZHlkU2NzSUNkemNpY3NJQ2QxYXlkZExDQnVjam9nV3pFc0lESXNJRFZkTENCbVl6b2dOQ0I5TENCN0lHeHVaM002SUZzbllYSW5YU3dnYm5JNklGc3dMQ0F4TENBeUxDQXpMQ0F4TVN3Z01UQXdYU3dnWm1NNklEVWdmU3dnZXlCc2JtZHpPaUJiSjJOekp5d2dKM05ySjEwc0lHNXlPaUJiTVN3Z01pd2dOVjBzSUdaak9pQTJJSDBzSUhzZ2JHNW5jem9nV3lkamMySW5MQ0FuY0d3blhTd2dibkk2SUZzeExDQXlMQ0ExWFN3Z1ptTTZJRGNnZlN3Z2V5QnNibWR6T2lCYkoyTjVKMTBzSUc1eU9pQmJNU3dnTWl3Z015d2dPRjBzSUdaak9pQTRJSDBzSUhzZ2JHNW5jem9nV3lkbWNpZGRMQ0J1Y2pvZ1d6RXNJREpkTENCbVl6b2dPU0I5TENCN0lHeHVaM002SUZzbloyRW5YU3dnYm5JNklGc3hMQ0F5TENBekxDQTNMQ0F4TVYwc0lHWmpPaUF4TUNCOUxDQjdJR3h1WjNNNklGc25aMlFuWFN3Z2JuSTZJRnN4TENBeUxDQXpMQ0F5TUYwc0lHWmpPaUF4TVNCOUxDQjdJR3h1WjNNNklGc25hWE1uWFN3Z2JuSTZJRnN4TENBeVhTd2dabU02SURFeUlIMHNJSHNnYkc1bmN6b2dXeWRxZGlkZExDQnVjam9nV3pBc0lERmRMQ0JtWXpvZ01UTWdmU3dnZXlCc2JtZHpPaUJiSjJ0M0oxMHNJRzV5T2lCYk1Td2dNaXdnTXl3Z05GMHNJR1pqT2lBeE5DQjlMQ0I3SUd4dVozTTZJRnNuYkhRblhTd2dibkk2SUZzeExDQXlMQ0F4TUYwc0lHWmpPaUF4TlNCOUxDQjdJR3h1WjNNNklGc25iSFluWFN3Z2JuSTZJRnN4TENBeUxDQXdYU3dnWm1NNklERTJJSDBzSUhzZ2JHNW5jem9nV3lkdGF5ZGRMQ0J1Y2pvZ1d6RXNJREpkTENCbVl6b2dNVGNnZlN3Z2V5QnNibWR6T2lCYkoyMXVheWRkTENCdWNqb2dXekFzSURFc0lESmRMQ0JtWXpvZ01UZ2dmU3dnZXlCc2JtZHpPaUJiSjIxMEoxMHNJRzV5T2lCYk1Td2dNaXdnTVRFc0lESXdYU3dnWm1NNklERTVJSDBzSUhzZ2JHNW5jem9nV3lkdmNpZGRMQ0J1Y2pvZ1d6SXNJREZkTENCbVl6b2dNaUI5TENCN0lHeHVaM002SUZzbmNtOG5YU3dnYm5JNklGc3hMQ0F5TENBeU1GMHNJR1pqT2lBeU1DQjlMQ0I3SUd4dVozTTZJRnNuYzJ3blhTd2dibkk2SUZzMUxDQXhMQ0F5TENBelhTd2dabU02SURJeElIMWRPMXh1WEc1MllYSWdYM0oxYkdWelVHeDFjbUZzYzFSNWNHVnpJRDBnZTF4dUlDQXhPaUJtZFc1amRHbHZiaUJmS0c0cElIdGNiaUFnSUNCeVpYUjFjbTRnVG5WdFltVnlLRzRnUGlBeEtUdGNiaUFnZlN4Y2JpQWdNam9nWm5WdVkzUnBiMjRnWHlodUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUU1MWJXSmxjaWh1SUNFOUlERXBPMXh1SUNCOUxGeHVJQ0F6T2lCbWRXNWpkR2x2YmlCZktHNHBJSHRjYmlBZ0lDQnlaWFIxY200Z01EdGNiaUFnZlN4Y2JpQWdORG9nWm5WdVkzUnBiMjRnWHlodUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUU1MWJXSmxjaWh1SUNVZ01UQWdQVDBnTVNBbUppQnVJQ1VnTVRBd0lDRTlJREV4SUQ4Z01DQTZJRzRnSlNBeE1DQStQU0F5SUNZbUlHNGdKU0F4TUNBOFBTQTBJQ1ltSUNodUlDVWdNVEF3SUR3Z01UQWdmSHdnYmlBbElERXdNQ0ErUFNBeU1Da2dQeUF4SURvZ01pazdYRzRnSUgwc1hHNGdJRFU2SUdaMWJtTjBhVzl1SUY4b2Jpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCT2RXMWlaWElvYmlBOVBUMGdNQ0EvSURBZ09pQnVJRDA5SURFZ1B5QXhJRG9nYmlBOVBTQXlJRDhnTWlBNklHNGdKU0F4TURBZ1BqMGdNeUFtSmlCdUlDVWdNVEF3SUR3OUlERXdJRDhnTXlBNklHNGdKU0F4TURBZ1BqMGdNVEVnUHlBMElEb2dOU2s3WEc0Z0lIMHNYRzRnSURZNklHWjFibU4wYVc5dUlGOG9iaWtnZTF4dUlDQWdJSEpsZEhWeWJpQk9kVzFpWlhJb2JpQTlQU0F4SUQ4Z01DQTZJRzRnUGowZ01pQW1KaUJ1SUR3OUlEUWdQeUF4SURvZ01pazdYRzRnSUgwc1hHNGdJRGM2SUdaMWJtTjBhVzl1SUY4b2Jpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCT2RXMWlaWElvYmlBOVBTQXhJRDhnTUNBNklHNGdKU0F4TUNBK1BTQXlJQ1ltSUc0Z0pTQXhNQ0E4UFNBMElDWW1JQ2h1SUNVZ01UQXdJRHdnTVRBZ2ZId2diaUFsSURFd01DQStQU0F5TUNrZ1B5QXhJRG9nTWlrN1hHNGdJSDBzWEc0Z0lEZzZJR1oxYm1OMGFXOXVJRjhvYmlrZ2UxeHVJQ0FnSUhKbGRIVnliaUJPZFcxaVpYSW9iaUE5UFNBeElEOGdNQ0E2SUc0Z1BUMGdNaUEvSURFZ09pQnVJQ0U5SURnZ0ppWWdiaUFoUFNBeE1TQS9JRElnT2lBektUdGNiaUFnZlN4Y2JpQWdPVG9nWm5WdVkzUnBiMjRnWHlodUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUU1MWJXSmxjaWh1SUQ0OUlESXBPMXh1SUNCOUxGeHVJQ0F4TURvZ1puVnVZM1JwYjI0Z1h5aHVLU0I3WEc0Z0lDQWdjbVYwZFhKdUlFNTFiV0psY2lodUlEMDlJREVnUHlBd0lEb2diaUE5UFNBeUlEOGdNU0E2SUc0Z1BDQTNJRDhnTWlBNklHNGdQQ0F4TVNBL0lETWdPaUEwS1R0Y2JpQWdmU3hjYmlBZ01URTZJR1oxYm1OMGFXOXVJRjhvYmlrZ2UxeHVJQ0FnSUhKbGRIVnliaUJPZFcxaVpYSW9iaUE5UFNBeElIeDhJRzRnUFQwZ01URWdQeUF3SURvZ2JpQTlQU0F5SUh4OElHNGdQVDBnTVRJZ1B5QXhJRG9nYmlBK0lESWdKaVlnYmlBOElESXdJRDhnTWlBNklETXBPMXh1SUNCOUxGeHVJQ0F4TWpvZ1puVnVZM1JwYjI0Z1h5aHVLU0I3WEc0Z0lDQWdjbVYwZFhKdUlFNTFiV0psY2lodUlDVWdNVEFnSVQwZ01TQjhmQ0J1SUNVZ01UQXdJRDA5SURFeEtUdGNiaUFnZlN4Y2JpQWdNVE02SUdaMWJtTjBhVzl1SUY4b2Jpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCT2RXMWlaWElvYmlBaFBUMGdNQ2s3WEc0Z0lIMHNYRzRnSURFME9pQm1kVzVqZEdsdmJpQmZLRzRwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdUblZ0WW1WeUtHNGdQVDBnTVNBL0lEQWdPaUJ1SUQwOUlESWdQeUF4SURvZ2JpQTlQU0F6SUQ4Z01pQTZJRE1wTzF4dUlDQjlMRnh1SUNBeE5Ub2dablZ1WTNScGIyNGdYeWh1S1NCN1hHNGdJQ0FnY21WMGRYSnVJRTUxYldKbGNpaHVJQ1VnTVRBZ1BUMGdNU0FtSmlCdUlDVWdNVEF3SUNFOUlERXhJRDhnTUNBNklHNGdKU0F4TUNBK1BTQXlJQ1ltSUNodUlDVWdNVEF3SUR3Z01UQWdmSHdnYmlBbElERXdNQ0ErUFNBeU1Da2dQeUF4SURvZ01pazdYRzRnSUgwc1hHNGdJREUyT2lCbWRXNWpkR2x2YmlCZktHNHBJSHRjYmlBZ0lDQnlaWFIxY200Z1RuVnRZbVZ5S0c0Z0pTQXhNQ0E5UFNBeElDWW1JRzRnSlNBeE1EQWdJVDBnTVRFZ1B5QXdJRG9nYmlBaFBUMGdNQ0EvSURFZ09pQXlLVHRjYmlBZ2ZTeGNiaUFnTVRjNklHWjFibU4wYVc5dUlGOG9iaWtnZTF4dUlDQWdJSEpsZEhWeWJpQk9kVzFpWlhJb2JpQTlQU0F4SUh4OElHNGdKU0F4TUNBOVBTQXhJRDhnTUNBNklERXBPMXh1SUNCOUxGeHVJQ0F4T0RvZ1puVnVZM1JwYjI0Z1h5aHVLU0I3WEc0Z0lDQWdjbVYwZFhKdUlFNTFiV0psY2lodUlEMDlJREFnUHlBd0lEb2diaUE5UFNBeElEOGdNU0E2SURJcE8xeHVJQ0I5TEZ4dUlDQXhPVG9nWm5WdVkzUnBiMjRnWHlodUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUU1MWJXSmxjaWh1SUQwOUlERWdQeUF3SURvZ2JpQTlQVDBnTUNCOGZDQnVJQ1VnTVRBd0lENGdNU0FtSmlCdUlDVWdNVEF3SUR3Z01URWdQeUF4SURvZ2JpQWxJREV3TUNBK0lERXdJQ1ltSUc0Z0pTQXhNREFnUENBeU1DQS9JRElnT2lBektUdGNiaUFnZlN4Y2JpQWdNakE2SUdaMWJtTjBhVzl1SUY4b2Jpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCT2RXMWlaWElvYmlBOVBTQXhJRDhnTUNBNklHNGdQVDA5SURBZ2ZId2diaUFsSURFd01DQStJREFnSmlZZ2JpQWxJREV3TUNBOElESXdJRDhnTVNBNklESXBPMXh1SUNCOUxGeHVJQ0F5TVRvZ1puVnVZM1JwYjI0Z1h5aHVLU0I3WEc0Z0lDQWdjbVYwZFhKdUlFNTFiV0psY2lodUlDVWdNVEF3SUQwOUlERWdQeUF4SURvZ2JpQWxJREV3TUNBOVBTQXlJRDhnTWlBNklHNGdKU0F4TURBZ1BUMGdNeUI4ZkNCdUlDVWdNVEF3SUQwOUlEUWdQeUF6SURvZ01DazdYRzRnSUgxY2JuMDdYRzR2S2lCbGMyeHBiblF0Wlc1aFlteGxJQ292WEc1Y2JtWjFibU4wYVc5dUlHTnlaV0YwWlZKMWJHVnpLQ2tnZTF4dUlDQjJZWElnY25Wc1pYTWdQU0I3ZlR0Y2JpQWdjMlYwY3k1bWIzSkZZV05vS0daMWJtTjBhVzl1SUNoelpYUXBJSHRjYmlBZ0lDQnpaWFF1Ykc1bmN5NW1iM0pGWVdOb0tHWjFibU4wYVc5dUlDaHNLU0I3WEc0Z0lDQWdJQ0J5ZFd4bGMxdHNYU0E5SUh0Y2JpQWdJQ0FnSUNBZ2JuVnRZbVZ5Y3pvZ2MyVjBMbTV5TEZ4dUlDQWdJQ0FnSUNCd2JIVnlZV3h6T2lCZmNuVnNaWE5RYkhWeVlXeHpWSGx3WlhOYmMyVjBMbVpqWFZ4dUlDQWdJQ0FnZlR0Y2JpQWdJQ0I5S1R0Y2JpQWdmU2s3WEc0Z0lISmxkSFZ5YmlCeWRXeGxjenRjYm4xY2JseHVkbUZ5SUZCc2RYSmhiRkpsYzI5c2RtVnlJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0JtZFc1amRHbHZiaUJRYkhWeVlXeFNaWE52YkhabGNpaHNZVzVuZFdGblpWVjBhV3h6S1NCN1hHNGdJQ0FnZG1GeUlHOXdkR2x2Ym5NZ1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb0lENGdNU0FtSmlCaGNtZDFiV1Z1ZEhOYk1WMGdJVDA5SUhWdVpHVm1hVzVsWkNBL0lHRnlaM1Z0Wlc1MGMxc3hYU0E2SUh0OU8xeHVYRzRnSUNBZ1gyTnNZWE56UTJGc2JFTm9aV05yS0hSb2FYTXNJRkJzZFhKaGJGSmxjMjlzZG1WeUtUdGNibHh1SUNBZ0lIUm9hWE11YkdGdVozVmhaMlZWZEdsc2N5QTlJR3hoYm1kMVlXZGxWWFJwYkhNN1hHNGdJQ0FnZEdocGN5NXZjSFJwYjI1eklEMGdiM0IwYVc5dWN6dGNibHh1SUNBZ0lIUm9hWE11Ykc5bloyVnlJRDBnWDJ4dloyZGxjakl1WkdWbVlYVnNkQzVqY21WaGRHVW9KM0JzZFhKaGJGSmxjMjlzZG1WeUp5azdYRzVjYmlBZ0lDQjBhR2x6TG5KMWJHVnpJRDBnWTNKbFlYUmxVblZzWlhNb0tUdGNiaUFnZlZ4dVhHNGdJRkJzZFhKaGJGSmxjMjlzZG1WeUxuQnliM1J2ZEhsd1pTNWhaR1JTZFd4bElEMGdablZ1WTNScGIyNGdZV1JrVW5Wc1pTaHNibWNzSUc5aWFpa2dlMXh1SUNBZ0lIUm9hWE11Y25Wc1pYTmJiRzVuWFNBOUlHOWlhanRjYmlBZ2ZUdGNibHh1SUNCUWJIVnlZV3hTWlhOdmJIWmxjaTV3Y205MGIzUjVjR1V1WjJWMFVuVnNaU0E5SUdaMWJtTjBhVzl1SUdkbGRGSjFiR1VvWTI5a1pTa2dlMXh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpMbkoxYkdWelcyTnZaR1ZkSUh4OElIUm9hWE11Y25Wc1pYTmJkR2hwY3k1c1lXNW5kV0ZuWlZWMGFXeHpMbWRsZEV4aGJtZDFZV2RsVUdGeWRFWnliMjFEYjJSbEtHTnZaR1VwWFR0Y2JpQWdmVHRjYmx4dUlDQlFiSFZ5WVd4U1pYTnZiSFpsY2k1d2NtOTBiM1I1Y0dVdWJtVmxaSE5RYkhWeVlXd2dQU0JtZFc1amRHbHZiaUJ1WldWa2MxQnNkWEpoYkNoamIyUmxLU0I3WEc0Z0lDQWdkbUZ5SUhKMWJHVWdQU0IwYUdsekxtZGxkRkoxYkdVb1kyOWtaU2s3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdjblZzWlNBbUppQnlkV3hsTG01MWJXSmxjbk11YkdWdVozUm9JRDRnTVR0Y2JpQWdmVHRjYmx4dUlDQlFiSFZ5WVd4U1pYTnZiSFpsY2k1d2NtOTBiM1I1Y0dVdVoyVjBVR3gxY21Gc1JtOXliWE5QWmt0bGVTQTlJR1oxYm1OMGFXOXVJR2RsZEZCc2RYSmhiRVp2Y20xelQyWkxaWGtvWTI5a1pTd2dhMlY1S1NCN1hHNGdJQ0FnZG1GeUlGOTBhR2x6SUQwZ2RHaHBjenRjYmx4dUlDQWdJSFpoY2lCeVpYUWdQU0JiWFR0Y2JseHVJQ0FnSUhaaGNpQnlkV3hsSUQwZ2RHaHBjeTVuWlhSU2RXeGxLR052WkdVcE8xeHVYRzRnSUNBZ2NuVnNaUzV1ZFcxaVpYSnpMbVp2Y2tWaFkyZ29ablZ1WTNScGIyNGdLRzRwSUh0Y2JpQWdJQ0FnSUhaaGNpQnpkV1ptYVhnZ1BTQmZkR2hwY3k1blpYUlRkV1ptYVhnb1kyOWtaU3dnYmlrN1hHNGdJQ0FnSUNCeVpYUXVjSFZ6YUNnbkp5QXJJR3RsZVNBcklITjFabVpwZUNrN1hHNGdJQ0FnZlNrN1hHNWNiaUFnSUNCeVpYUjFjbTRnY21WME8xeHVJQ0I5TzF4dVhHNGdJRkJzZFhKaGJGSmxjMjlzZG1WeUxuQnliM1J2ZEhsd1pTNW5aWFJUZFdabWFYZ2dQU0JtZFc1amRHbHZiaUJuWlhSVGRXWm1hWGdvWTI5a1pTd2dZMjkxYm5RcElIdGNiaUFnSUNCMllYSWdYM1JvYVhNeUlEMGdkR2hwY3p0Y2JseHVJQ0FnSUhaaGNpQnlkV3hsSUQwZ2RHaHBjeTVuWlhSU2RXeGxLR052WkdVcE8xeHVYRzRnSUNBZ2FXWWdLSEoxYkdVcElIdGNiaUFnSUNBZ0lDOHZJR2xtSUNoeWRXeGxMbTUxYldKbGNuTXViR1Z1WjNSb0lEMDlQU0F4S1NCeVpYUjFjbTRnSnljN0lDOHZJRzl1YkhrZ2MybHVaM1ZzWVhKY2JseHVJQ0FnSUNBZ2RtRnlJR2xrZUNBOUlISjFiR1V1Ym05QlluTWdQeUJ5ZFd4bExuQnNkWEpoYkhNb1kyOTFiblFwSURvZ2NuVnNaUzV3YkhWeVlXeHpLRTFoZEdndVlXSnpLR052ZFc1MEtTazdYRzRnSUNBZ0lDQjJZWElnYzNWbVptbDRJRDBnY25Wc1pTNXVkVzFpWlhKelcybGtlRjA3WEc1Y2JpQWdJQ0FnSUM4dklITndaV05wWVd3Z2RISmxZWFJ0Wlc1MElHWnZjaUJzYm1keklHOXViSGtnYUdGMmFXNW5JSE5wYm1kMWJHRnlJR0Z1WkNCd2JIVnlZV3hjYmlBZ0lDQWdJR2xtSUNoMGFHbHpMbTl3ZEdsdmJuTXVjMmx0Y0d4cFpubFFiSFZ5WVd4VGRXWm1hWGdnSmlZZ2NuVnNaUzV1ZFcxaVpYSnpMbXhsYm1kMGFDQTlQVDBnTWlBbUppQnlkV3hsTG01MWJXSmxjbk5iTUYwZ1BUMDlJREVwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLSE4xWm1acGVDQTlQVDBnTWlrZ2UxeHVJQ0FnSUNBZ0lDQWdJSE4xWm1acGVDQTlJQ2R3YkhWeVlXd25PMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0hOMVptWnBlQ0E5UFQwZ01Ta2dlMXh1SUNBZ0lDQWdJQ0FnSUhOMVptWnBlQ0E5SUNjbk8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSFpoY2lCeVpYUjFjbTVUZFdabWFYZ2dQU0JtZFc1amRHbHZiaUJ5WlhSMWNtNVRkV1ptYVhnb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQmZkR2hwY3pJdWIzQjBhVzl1Y3k1d2NtVndaVzVrSUNZbUlITjFabVpwZUM1MGIxTjBjbWx1WnlncElEOGdYM1JvYVhNeUxtOXdkR2x2Ym5NdWNISmxjR1Z1WkNBcklITjFabVpwZUM1MGIxTjBjbWx1WnlncElEb2djM1ZtWm1sNExuUnZVM1J5YVc1bktDazdYRzRnSUNBZ0lDQjlPMXh1WEc0Z0lDQWdJQ0F2THlCRFQwMVFRVlJKUWtsTVNWUlpJRXBUVDA1Y2JpQWdJQ0FnSUM4dklIWXhYRzRnSUNBZ0lDQnBaaUFvZEdocGN5NXZjSFJwYjI1ekxtTnZiWEJoZEdsaWFXeHBkSGxLVTA5T0lEMDlQU0FuZGpFbktTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoemRXWm1hWGdnUFQwOUlERXBJSEpsZEhWeWJpQW5KenRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCemRXWm1hWGdnUFQwOUlDZHVkVzFpWlhJbktTQnlaWFIxY200Z0oxOXdiSFZ5WVd4Zkp5QXJJSE4xWm1acGVDNTBiMU4wY21sdVp5Z3BPMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdjbVYwZFhKdVUzVm1abWw0S0NrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tDQXZLaUIyTWlBcUwzUm9hWE11YjNCMGFXOXVjeTVqYjIxd1lYUnBZbWxzYVhSNVNsTlBUaUE5UFQwZ0ozWXlKeUI4ZkNCeWRXeGxMbTUxYldKbGNuTXViR1Z1WjNSb0lEMDlQU0F5SUNZbUlISjFiR1V1Ym5WdFltVnljMXN3WFNBOVBUMGdNU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnY21WMGRYSnVVM1ZtWm1sNEtDazdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLQ0F2S2lCMk15QXRJR2RsZEhSbGVIUWdhVzVrWlhnZ0tpOXlkV3hsTG01MWJXSmxjbk11YkdWdVozUm9JRDA5UFNBeUlDWW1JSEoxYkdVdWJuVnRZbVZ5YzFzd1hTQTlQVDBnTVNrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2NtVjBkWEp1VTNWbVptbDRLQ2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3k1dmNIUnBiMjV6TG5CeVpYQmxibVFnSmlZZ2FXUjRMblJ2VTNSeWFXNW5LQ2tnUHlCMGFHbHpMbTl3ZEdsdmJuTXVjSEpsY0dWdVpDQXJJR2xrZUM1MGIxTjBjbWx1WnlncElEb2dhV1I0TG5SdlUzUnlhVzVuS0NrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnZEdocGN5NXNiMmRuWlhJdWQyRnliaWduYm04Z2NHeDFjbUZzSUhKMWJHVWdabTkxYm1RZ1ptOXlPaUFuSUNzZ1kyOWtaU2s3WEc0Z0lDQWdjbVYwZFhKdUlDY25PMXh1SUNCOU8xeHVYRzRnSUhKbGRIVnliaUJRYkhWeVlXeFNaWE52YkhabGNqdGNibjBvS1R0Y2JseHVaWGh3YjNKMGN5NWtaV1poZFd4MElEMGdVR3gxY21Gc1VtVnpiMngyWlhJN0lpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNVBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnWENKZlgyVnpUVzlrZFd4bFhDSXNJSHRjYmlBZ2RtRnNkV1U2SUhSeWRXVmNibjBwTzF4dVhHNTJZWElnWDJWNGRHVnVaSE1nUFNCUFltcGxZM1F1WVhOemFXZHVJSHg4SUdaMWJtTjBhVzl1SUNoMFlYSm5aWFFwSUhzZ1ptOXlJQ2gyWVhJZ2FTQTlJREU3SUdrZ1BDQmhjbWQxYldWdWRITXViR1Z1WjNSb095QnBLeXNwSUhzZ2RtRnlJSE52ZFhKalpTQTlJR0Z5WjNWdFpXNTBjMXRwWFRzZ1ptOXlJQ2gyWVhJZ2EyVjVJR2x1SUhOdmRYSmpaU2tnZXlCcFppQW9UMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLSE52ZFhKalpTd2dhMlY1S1NrZ2V5QjBZWEpuWlhSYmEyVjVYU0E5SUhOdmRYSmpaVnRyWlhsZE95QjlJSDBnZlNCeVpYUjFjbTRnZEdGeVoyVjBPeUI5TzF4dVhHNTJZWElnWDBWMlpXNTBSVzFwZEhSbGNqSWdQU0J5WlhGMWFYSmxLQ2N1TDBWMlpXNTBSVzFwZEhSbGNpNXFjeWNwTzF4dVhHNTJZWElnWDBWMlpXNTBSVzFwZEhSbGNqTWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOUZkbVZ1ZEVWdGFYUjBaWEl5S1R0Y2JseHVkbUZ5SUY5MWRHbHNjeUE5SUhKbGNYVnBjbVVvSnk0dmRYUnBiSE11YW5NbktUdGNibHh1ZG1GeUlIVjBhV3h6SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsVjJsc1pHTmhjbVFvWDNWMGFXeHpLVHRjYmx4dVpuVnVZM1JwYjI0Z1gybHVkR1Z5YjNCU1pYRjFhWEpsVjJsc1pHTmhjbVFvYjJKcUtTQjdJR2xtSUNodlltb2dKaVlnYjJKcUxsOWZaWE5OYjJSMWJHVXBJSHNnY21WMGRYSnVJRzlpYWpzZ2ZTQmxiSE5sSUhzZ2RtRnlJRzVsZDA5aWFpQTlJSHQ5T3lCcFppQW9iMkpxSUNFOUlHNTFiR3dwSUhzZ1ptOXlJQ2gyWVhJZ2EyVjVJR2x1SUc5aWFpa2dleUJwWmlBb1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHOWlhaXdnYTJWNUtTa2dibVYzVDJKcVcydGxlVjBnUFNCdlltcGJhMlY1WFRzZ2ZTQjlJRzVsZDA5aWFpNWtaV1poZFd4MElEMGdiMkpxT3lCeVpYUjFjbTRnYm1WM1QySnFPeUI5SUgxY2JseHVablZ1WTNScGIyNGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENodlltb3BJSHNnY21WMGRYSnVJRzlpYWlBbUppQnZZbW91WDE5bGMwMXZaSFZzWlNBL0lHOWlhaUE2SUhzZ1pHVm1ZWFZzZERvZ2IySnFJSDA3SUgxY2JseHVablZ1WTNScGIyNGdYMlJsWm1GMWJIUnpLRzlpYWl3Z1pHVm1ZWFZzZEhNcElIc2dkbUZ5SUd0bGVYTWdQU0JQWW1wbFkzUXVaMlYwVDNkdVVISnZjR1Z5ZEhsT1lXMWxjeWhrWldaaGRXeDBjeWs3SUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2EyVjVjeTVzWlc1bmRHZzdJR2tyS3lrZ2V5QjJZWElnYTJWNUlEMGdhMlY1YzF0cFhUc2dkbUZ5SUhaaGJIVmxJRDBnVDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVJHVnpZM0pwY0hSdmNpaGtaV1poZFd4MGN5d2dhMlY1S1RzZ2FXWWdLSFpoYkhWbElDWW1JSFpoYkhWbExtTnZibVpwWjNWeVlXSnNaU0FtSmlCdlltcGJhMlY1WFNBOVBUMGdkVzVrWldacGJtVmtLU0I3SUU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaHZZbW9zSUd0bGVTd2dkbUZzZFdVcE95QjlJSDBnY21WMGRYSnVJRzlpYWpzZ2ZWeHVYRzVtZFc1amRHbHZiaUJmWTJ4aGMzTkRZV3hzUTJobFkyc29hVzV6ZEdGdVkyVXNJRU52Ym5OMGNuVmpkRzl5S1NCN0lHbG1JQ2doS0dsdWMzUmhibU5sSUdsdWMzUmhibU5sYjJZZ1EyOXVjM1J5ZFdOMGIzSXBLU0I3SUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb1hDSkRZVzV1YjNRZ1kyRnNiQ0JoSUdOc1lYTnpJR0Z6SUdFZ1puVnVZM1JwYjI1Y0lpazdJSDBnZlZ4dVhHNW1kVzVqZEdsdmJpQmZjRzl6YzJsaWJHVkRiMjV6ZEhKMVkzUnZjbEpsZEhWeWJpaHpaV3htTENCallXeHNLU0I3SUdsbUlDZ2hjMlZzWmlrZ2V5QjBhSEp2ZHlCdVpYY2dVbVZtWlhKbGJtTmxSWEp5YjNJb1hDSjBhR2x6SUdoaGMyNG5kQ0JpWldWdUlHbHVhWFJwWVd4cGMyVmtJQzBnYzNWd1pYSW9LU0JvWVhOdUozUWdZbVZsYmlCallXeHNaV1JjSWlrN0lIMGdjbVYwZFhKdUlHTmhiR3dnSmlZZ0tIUjVjR1Z2WmlCallXeHNJRDA5UFNCY0ltOWlhbVZqZEZ3aUlIeDhJSFI1Y0dWdlppQmpZV3hzSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lwSUQ4Z1kyRnNiQ0E2SUhObGJHWTdJSDFjYmx4dVpuVnVZM1JwYjI0Z1gybHVhR1Z5YVhSektITjFZa05zWVhOekxDQnpkWEJsY2tOc1lYTnpLU0I3SUdsbUlDaDBlWEJsYjJZZ2MzVndaWEpEYkdGemN5QWhQVDBnWENKbWRXNWpkR2x2Ymx3aUlDWW1JSE4xY0dWeVEyeGhjM01nSVQwOUlHNTFiR3dwSUhzZ2RHaHliM2NnYm1WM0lGUjVjR1ZGY25KdmNpaGNJbE4xY0dWeUlHVjRjSEpsYzNOcGIyNGdiWFZ6ZENCbGFYUm9aWElnWW1VZ2JuVnNiQ0J2Y2lCaElHWjFibU4wYVc5dUxDQnViM1FnWENJZ0t5QjBlWEJsYjJZZ2MzVndaWEpEYkdGemN5azdJSDBnYzNWaVEyeGhjM011Y0hKdmRHOTBlWEJsSUQwZ1QySnFaV04wTG1OeVpXRjBaU2h6ZFhCbGNrTnNZWE56SUNZbUlITjFjR1Z5UTJ4aGMzTXVjSEp2ZEc5MGVYQmxMQ0I3SUdOdmJuTjBjblZqZEc5eU9pQjdJSFpoYkhWbE9pQnpkV0pEYkdGemN5d2daVzUxYldWeVlXSnNaVG9nWm1Gc2MyVXNJSGR5YVhSaFlteGxPaUIwY25WbExDQmpiMjVtYVdkMWNtRmliR1U2SUhSeWRXVWdmU0I5S1RzZ2FXWWdLSE4xY0dWeVEyeGhjM01wSUU5aWFtVmpkQzV6WlhSUWNtOTBiM1I1Y0dWUFppQS9JRTlpYW1WamRDNXpaWFJRY205MGIzUjVjR1ZQWmloemRXSkRiR0Z6Y3l3Z2MzVndaWEpEYkdGemN5a2dPaUJmWkdWbVlYVnNkSE1vYzNWaVEyeGhjM01zSUhOMWNHVnlRMnhoYzNNcE95QjlYRzVjYm5aaGNpQlNaWE52ZFhKalpWTjBiM0psSUQwZ1puVnVZM1JwYjI0Z0tGOUZkbVZ1ZEVWdGFYUjBaWElwSUh0Y2JpQWdYMmx1YUdWeWFYUnpLRkpsYzI5MWNtTmxVM1J2Y21Vc0lGOUZkbVZ1ZEVWdGFYUjBaWElwTzF4dVhHNGdJR1oxYm1OMGFXOXVJRkpsYzI5MWNtTmxVM1J2Y21Vb1pHRjBZU2tnZTF4dUlDQWdJSFpoY2lCdmNIUnBiMjV6SUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUNBK0lERWdKaVlnWVhKbmRXMWxiblJ6V3pGZElDRTlQU0IxYm1SbFptbHVaV1FnUHlCaGNtZDFiV1Z1ZEhOYk1WMGdPaUI3SUc1ek9pQmJKM1J5WVc1emJHRjBhVzl1SjEwc0lHUmxabUYxYkhST1V6b2dKM1J5WVc1emJHRjBhVzl1SnlCOU8xeHVYRzRnSUNBZ1gyTnNZWE56UTJGc2JFTm9aV05yS0hSb2FYTXNJRkpsYzI5MWNtTmxVM1J2Y21VcE8xeHVYRzRnSUNBZ2RtRnlJRjkwYUdseklEMGdYM0J2YzNOcFlteGxRMjl1YzNSeWRXTjBiM0pTWlhSMWNtNG9kR2hwY3l3Z1gwVjJaVzUwUlcxcGRIUmxjaTVqWVd4c0tIUm9hWE1wS1R0Y2JseHVJQ0FnSUY5MGFHbHpMbVJoZEdFZ1BTQmtZWFJoSUh4OElIdDlPMXh1SUNBZ0lGOTBhR2x6TG05d2RHbHZibk1nUFNCdmNIUnBiMjV6TzF4dUlDQWdJSEpsZEhWeWJpQmZkR2hwY3p0Y2JpQWdmVnh1WEc0Z0lGSmxjMjkxY21ObFUzUnZjbVV1Y0hKdmRHOTBlWEJsTG1Ga1pFNWhiV1Z6Y0dGalpYTWdQU0JtZFc1amRHbHZiaUJoWkdST1lXMWxjM0JoWTJWektHNXpLU0I3WEc0Z0lDQWdhV1lnS0hSb2FYTXViM0IwYVc5dWN5NXVjeTVwYm1SbGVFOW1LRzV6S1NBOElEQXBJSHRjYmlBZ0lDQWdJSFJvYVhNdWIzQjBhVzl1Y3k1dWN5NXdkWE5vS0c1ektUdGNiaUFnSUNCOVhHNGdJSDA3WEc1Y2JpQWdVbVZ6YjNWeVkyVlRkRzl5WlM1d2NtOTBiM1I1Y0dVdWNtVnRiM1psVG1GdFpYTndZV05sY3lBOUlHWjFibU4wYVc5dUlISmxiVzkyWlU1aGJXVnpjR0ZqWlhNb2JuTXBJSHRjYmlBZ0lDQjJZWElnYVc1a1pYZ2dQU0IwYUdsekxtOXdkR2x2Ym5NdWJuTXVhVzVrWlhoUFppaHVjeWs3WEc0Z0lDQWdhV1lnS0dsdVpHVjRJRDRnTFRFcElIdGNiaUFnSUNBZ0lIUm9hWE11YjNCMGFXOXVjeTV1Y3k1emNHeHBZMlVvYVc1a1pYZ3NJREVwTzF4dUlDQWdJSDFjYmlBZ2ZUdGNibHh1SUNCU1pYTnZkWEpqWlZOMGIzSmxMbkJ5YjNSdmRIbHdaUzVuWlhSU1pYTnZkWEpqWlNBOUlHWjFibU4wYVc5dUlHZGxkRkpsYzI5MWNtTmxLR3h1Wnl3Z2JuTXNJR3RsZVNrZ2UxeHVJQ0FnSUhaaGNpQnZjSFJwYjI1eklEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQStJRE1nSmlZZ1lYSm5kVzFsYm5Seld6TmRJQ0U5UFNCMWJtUmxabWx1WldRZ1B5QmhjbWQxYldWdWRITmJNMTBnT2lCN2ZUdGNibHh1SUNBZ0lIWmhjaUJyWlhsVFpYQmhjbUYwYjNJZ1BTQnZjSFJwYjI1ekxtdGxlVk5sY0dGeVlYUnZjaUI4ZkNCMGFHbHpMbTl3ZEdsdmJuTXVhMlY1VTJWd1lYSmhkRzl5TzF4dUlDQWdJR2xtSUNoclpYbFRaWEJoY21GMGIzSWdQVDA5SUhWdVpHVm1hVzVsWkNrZ2EyVjVVMlZ3WVhKaGRHOXlJRDBnSnk0bk8xeHVYRzRnSUNBZ2RtRnlJSEJoZEdnZ1BTQmJiRzVuTENCdWMxMDdYRzRnSUNBZ2FXWWdLR3RsZVNBbUppQjBlWEJsYjJZZ2EyVjVJQ0U5UFNBbmMzUnlhVzVuSnlrZ2NHRjBhQ0E5SUhCaGRHZ3VZMjl1WTJGMEtHdGxlU2s3WEc0Z0lDQWdhV1lnS0d0bGVTQW1KaUIwZVhCbGIyWWdhMlY1SUQwOVBTQW5jM1J5YVc1bkp5a2djR0YwYUNBOUlIQmhkR2d1WTI5dVkyRjBLR3RsZVZObGNHRnlZWFJ2Y2lBL0lHdGxlUzV6Y0d4cGRDaHJaWGxUWlhCaGNtRjBiM0lwSURvZ2EyVjVLVHRjYmx4dUlDQWdJR2xtSUNoc2JtY3VhVzVrWlhoUFppZ25MaWNwSUQ0Z0xURXBJSHRjYmlBZ0lDQWdJSEJoZEdnZ1BTQnNibWN1YzNCc2FYUW9KeTRuS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0J5WlhSMWNtNGdkWFJwYkhNdVoyVjBVR0YwYUNoMGFHbHpMbVJoZEdFc0lIQmhkR2dwTzF4dUlDQjlPMXh1WEc0Z0lGSmxjMjkxY21ObFUzUnZjbVV1Y0hKdmRHOTBlWEJsTG1Ga1pGSmxjMjkxY21ObElEMGdablZ1WTNScGIyNGdZV1JrVW1WemIzVnlZMlVvYkc1bkxDQnVjeXdnYTJWNUxDQjJZV3gxWlNrZ2UxeHVJQ0FnSUhaaGNpQnZjSFJwYjI1eklEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQStJRFFnSmlZZ1lYSm5kVzFsYm5Seld6UmRJQ0U5UFNCMWJtUmxabWx1WldRZ1B5QmhjbWQxYldWdWRITmJORjBnT2lCN0lITnBiR1Z1ZERvZ1ptRnNjMlVnZlR0Y2JseHVJQ0FnSUhaaGNpQnJaWGxUWlhCaGNtRjBiM0lnUFNCMGFHbHpMbTl3ZEdsdmJuTXVhMlY1VTJWd1lYSmhkRzl5TzF4dUlDQWdJR2xtSUNoclpYbFRaWEJoY21GMGIzSWdQVDA5SUhWdVpHVm1hVzVsWkNrZ2EyVjVVMlZ3WVhKaGRHOXlJRDBnSnk0bk8xeHVYRzRnSUNBZ2RtRnlJSEJoZEdnZ1BTQmJiRzVuTENCdWMxMDdYRzRnSUNBZ2FXWWdLR3RsZVNrZ2NHRjBhQ0E5SUhCaGRHZ3VZMjl1WTJGMEtHdGxlVk5sY0dGeVlYUnZjaUEvSUd0bGVTNXpjR3hwZENoclpYbFRaWEJoY21GMGIzSXBJRG9nYTJWNUtUdGNibHh1SUNBZ0lHbG1JQ2hzYm1jdWFXNWtaWGhQWmlnbkxpY3BJRDRnTFRFcElIdGNiaUFnSUNBZ0lIQmhkR2dnUFNCc2JtY3VjM0JzYVhRb0p5NG5LVHRjYmlBZ0lDQWdJSFpoYkhWbElEMGdibk03WEc0Z0lDQWdJQ0J1Y3lBOUlIQmhkR2hiTVYwN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnZEdocGN5NWhaR1JPWVcxbGMzQmhZMlZ6S0c1ektUdGNibHh1SUNBZ0lIVjBhV3h6TG5ObGRGQmhkR2dvZEdocGN5NWtZWFJoTENCd1lYUm9MQ0IyWVd4MVpTazdYRzVjYmlBZ0lDQnBaaUFvSVc5d2RHbHZibk11YzJsc1pXNTBLU0IwYUdsekxtVnRhWFFvSjJGa1pHVmtKeXdnYkc1bkxDQnVjeXdnYTJWNUxDQjJZV3gxWlNrN1hHNGdJSDA3WEc1Y2JpQWdVbVZ6YjNWeVkyVlRkRzl5WlM1d2NtOTBiM1I1Y0dVdVlXUmtVbVZ6YjNWeVkyVnpJRDBnWm5WdVkzUnBiMjRnWVdSa1VtVnpiM1Z5WTJWektHeHVaeXdnYm5Nc0lISmxjMjkxY21ObGN5a2dlMXh1SUNBZ0lDOHFJR1Z6YkdsdWRDQnVieTF5WlhOMGNtbGpkR1ZrTFhONWJuUmhlRG9nTUNBcUwxeHVJQ0FnSUdadmNpQW9kbUZ5SUcwZ2FXNGdjbVZ6YjNWeVkyVnpLU0I3WEc0Z0lDQWdJQ0JwWmlBb2RIbHdaVzltSUhKbGMyOTFjbU5sYzF0dFhTQTlQVDBnSjNOMGNtbHVaeWNwSUhSb2FYTXVZV1JrVW1WemIzVnlZMlVvYkc1bkxDQnVjeXdnYlN3Z2NtVnpiM1Z5WTJWelcyMWRMQ0I3SUhOcGJHVnVkRG9nZEhKMVpTQjlLVHRjYmlBZ0lDQjlYRzRnSUNBZ2RHaHBjeTVsYldsMEtDZGhaR1JsWkNjc0lHeHVaeXdnYm5Nc0lISmxjMjkxY21ObGN5azdYRzRnSUgwN1hHNWNiaUFnVW1WemIzVnlZMlZUZEc5eVpTNXdjbTkwYjNSNWNHVXVZV1JrVW1WemIzVnlZMlZDZFc1a2JHVWdQU0JtZFc1amRHbHZiaUJoWkdSU1pYTnZkWEpqWlVKMWJtUnNaU2hzYm1jc0lHNXpMQ0J5WlhOdmRYSmpaWE1zSUdSbFpYQXNJRzkyWlhKM2NtbDBaU2tnZTF4dUlDQWdJSFpoY2lCd1lYUm9JRDBnVzJ4dVp5d2dibk5kTzF4dUlDQWdJR2xtSUNoc2JtY3VhVzVrWlhoUFppZ25MaWNwSUQ0Z0xURXBJSHRjYmlBZ0lDQWdJSEJoZEdnZ1BTQnNibWN1YzNCc2FYUW9KeTRuS1R0Y2JpQWdJQ0FnSUdSbFpYQWdQU0J5WlhOdmRYSmpaWE03WEc0Z0lDQWdJQ0J5WlhOdmRYSmpaWE1nUFNCdWN6dGNiaUFnSUNBZ0lHNXpJRDBnY0dGMGFGc3hYVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQjBhR2x6TG1Ga1pFNWhiV1Z6Y0dGalpYTW9ibk1wTzF4dVhHNGdJQ0FnZG1GeUlIQmhZMnNnUFNCMWRHbHNjeTVuWlhSUVlYUm9LSFJvYVhNdVpHRjBZU3dnY0dGMGFDa2dmSHdnZTMwN1hHNWNiaUFnSUNCcFppQW9aR1ZsY0NrZ2UxeHVJQ0FnSUNBZ2RYUnBiSE11WkdWbGNFVjRkR1Z1WkNod1lXTnJMQ0J5WlhOdmRYSmpaWE1zSUc5MlpYSjNjbWwwWlNrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSEJoWTJzZ1BTQmZaWGgwWlc1a2N5aDdmU3dnY0dGamF5d2djbVZ6YjNWeVkyVnpLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQjFkR2xzY3k1elpYUlFZWFJvS0hSb2FYTXVaR0YwWVN3Z2NHRjBhQ3dnY0dGamF5azdYRzVjYmlBZ0lDQjBhR2x6TG1WdGFYUW9KMkZrWkdWa0p5d2diRzVuTENCdWN5d2djbVZ6YjNWeVkyVnpLVHRjYmlBZ2ZUdGNibHh1SUNCU1pYTnZkWEpqWlZOMGIzSmxMbkJ5YjNSdmRIbHdaUzV5WlcxdmRtVlNaWE52ZFhKalpVSjFibVJzWlNBOUlHWjFibU4wYVc5dUlISmxiVzkyWlZKbGMyOTFjbU5sUW5WdVpHeGxLR3h1Wnl3Z2JuTXBJSHRjYmlBZ0lDQnBaaUFvZEdocGN5NW9ZWE5TWlhOdmRYSmpaVUoxYm1Sc1pTaHNibWNzSUc1ektTa2dlMXh1SUNBZ0lDQWdaR1ZzWlhSbElIUm9hWE11WkdGMFlWdHNibWRkVzI1elhUdGNiaUFnSUNCOVhHNGdJQ0FnZEdocGN5NXlaVzF2ZG1WT1lXMWxjM0JoWTJWektHNXpLVHRjYmx4dUlDQWdJSFJvYVhNdVpXMXBkQ2duY21WdGIzWmxaQ2NzSUd4dVp5d2dibk1wTzF4dUlDQjlPMXh1WEc0Z0lGSmxjMjkxY21ObFUzUnZjbVV1Y0hKdmRHOTBlWEJsTG1oaGMxSmxjMjkxY21ObFFuVnVaR3hsSUQwZ1puVnVZM1JwYjI0Z2FHRnpVbVZ6YjNWeVkyVkNkVzVrYkdVb2JHNW5MQ0J1Y3lrZ2UxeHVJQ0FnSUhKbGRIVnliaUIwYUdsekxtZGxkRkpsYzI5MWNtTmxLR3h1Wnl3Z2JuTXBJQ0U5UFNCMWJtUmxabWx1WldRN1hHNGdJSDA3WEc1Y2JpQWdVbVZ6YjNWeVkyVlRkRzl5WlM1d2NtOTBiM1I1Y0dVdVoyVjBVbVZ6YjNWeVkyVkNkVzVrYkdVZ1BTQm1kVzVqZEdsdmJpQm5aWFJTWlhOdmRYSmpaVUoxYm1Sc1pTaHNibWNzSUc1ektTQjdYRzRnSUNBZ2FXWWdLQ0Z1Y3lrZ2JuTWdQU0IwYUdsekxtOXdkR2x2Ym5NdVpHVm1ZWFZzZEU1VE8xeHVYRzRnSUNBZ0x5OGdRMDlOVUVGVVNVSkpURWxVV1RvZ2NtVnRiM1psSUdWNGRHVnVaQ0JwYmlCMk1pNHhMakJjYmlBZ0lDQnBaaUFvZEdocGN5NXZjSFJwYjI1ekxtTnZiWEJoZEdsaWFXeHBkSGxCVUVrZ1BUMDlJQ2QyTVNjcElISmxkSFZ5YmlCZlpYaDBaVzVrY3loN2ZTd2dkR2hwY3k1blpYUlNaWE52ZFhKalpTaHNibWNzSUc1ektTazdYRzVjYmlBZ0lDQnlaWFIxY200Z2RHaHBjeTVuWlhSU1pYTnZkWEpqWlNoc2JtY3NJRzV6S1R0Y2JpQWdmVHRjYmx4dUlDQlNaWE52ZFhKalpWTjBiM0psTG5CeWIzUnZkSGx3WlM1MGIwcFRUMDRnUFNCbWRXNWpkR2x2YmlCMGIwcFRUMDRvS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJvYVhNdVpHRjBZVHRjYmlBZ2ZUdGNibHh1SUNCeVpYUjFjbTRnVW1WemIzVnlZMlZUZEc5eVpUdGNibjBvWDBWMlpXNTBSVzFwZEhSbGNqTXVaR1ZtWVhWc2RDazdYRzVjYm1WNGNHOXlkSE11WkdWbVlYVnNkQ0E5SUZKbGMyOTFjbU5sVTNSdmNtVTdJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzVQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb1pYaHdiM0owY3l3Z1hDSmZYMlZ6VFc5a2RXeGxYQ0lzSUh0Y2JpQWdkbUZzZFdVNklIUnlkV1ZjYm4wcE8xeHVYRzUyWVhJZ1gyVjRkR1Z1WkhNZ1BTQlBZbXBsWTNRdVlYTnphV2R1SUh4OElHWjFibU4wYVc5dUlDaDBZWEpuWlhRcElIc2dabTl5SUNoMllYSWdhU0E5SURFN0lHa2dQQ0JoY21kMWJXVnVkSE11YkdWdVozUm9PeUJwS3lzcElIc2dkbUZ5SUhOdmRYSmpaU0E5SUdGeVozVnRaVzUwYzF0cFhUc2dabTl5SUNoMllYSWdhMlY1SUdsdUlITnZkWEpqWlNrZ2V5QnBaaUFvVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0hOdmRYSmpaU3dnYTJWNUtTa2dleUIwWVhKblpYUmJhMlY1WFNBOUlITnZkWEpqWlZ0clpYbGRPeUI5SUgwZ2ZTQnlaWFIxY200Z2RHRnlaMlYwT3lCOU8xeHVYRzUyWVhJZ1gzUjVjR1Z2WmlBOUlIUjVjR1Z2WmlCVGVXMWliMndnUFQwOUlGd2lablZ1WTNScGIyNWNJaUFtSmlCMGVYQmxiMllnVTNsdFltOXNMbWwwWlhKaGRHOXlJRDA5UFNCY0luTjViV0p2YkZ3aUlEOGdablZ1WTNScGIyNGdLRzlpYWlrZ2V5QnlaWFIxY200Z2RIbHdaVzltSUc5aWFqc2dmU0E2SUdaMWJtTjBhVzl1SUNodlltb3BJSHNnY21WMGRYSnVJRzlpYWlBbUppQjBlWEJsYjJZZ1UzbHRZbTlzSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lnSmlZZ2IySnFMbU52Ym5OMGNuVmpkRzl5SUQwOVBTQlRlVzFpYjJ3Z0ppWWdiMkpxSUNFOVBTQlRlVzFpYjJ3dWNISnZkRzkwZVhCbElEOGdYQ0p6ZVcxaWIyeGNJaUE2SUhSNWNHVnZaaUJ2WW1vN0lIMDdYRzVjYm5aaGNpQmZiRzluWjJWeUlEMGdjbVZ4ZFdseVpTZ25MaTlzYjJkblpYSXVhbk1uS1R0Y2JseHVkbUZ5SUY5c2IyZG5aWEl5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmYkc5bloyVnlLVHRjYmx4dWRtRnlJRjlGZG1WdWRFVnRhWFIwWlhJeUlEMGdjbVZ4ZFdseVpTZ25MaTlGZG1WdWRFVnRhWFIwWlhJdWFuTW5LVHRjYmx4dWRtRnlJRjlGZG1WdWRFVnRhWFIwWlhJeklEMGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENoZlJYWmxiblJGYldsMGRHVnlNaWs3WEc1Y2JuWmhjaUJmY0c5emRGQnliMk5sYzNOdmNpQTlJSEpsY1hWcGNtVW9KeTR2Y0c5emRGQnliMk5sYzNOdmNpNXFjeWNwTzF4dVhHNTJZWElnWDNCdmMzUlFjbTlqWlhOemIzSXlJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZjRzl6ZEZCeWIyTmxjM052Y2lrN1hHNWNiblpoY2lCZmRYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUwzVjBhV3h6TG1wekp5azdYRzVjYm5aaGNpQjFkR2xzY3lBOUlGOXBiblJsY205d1VtVnhkV2x5WlZkcGJHUmpZWEprS0Y5MWRHbHNjeWs3WEc1Y2JtWjFibU4wYVc5dUlGOXBiblJsY205d1VtVnhkV2x5WlZkcGJHUmpZWEprS0c5aWFpa2dleUJwWmlBb2IySnFJQ1ltSUc5aWFpNWZYMlZ6VFc5a2RXeGxLU0I3SUhKbGRIVnliaUJ2WW1vN0lIMGdaV3h6WlNCN0lIWmhjaUJ1WlhkUFltb2dQU0I3ZlRzZ2FXWWdLRzlpYWlBaFBTQnVkV3hzS1NCN0lHWnZjaUFvZG1GeUlHdGxlU0JwYmlCdlltb3BJSHNnYVdZZ0tFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbW9zSUd0bGVTa3BJRzVsZDA5aWFsdHJaWGxkSUQwZ2IySnFXMnRsZVYwN0lIMGdmU0J1WlhkUFltb3VaR1ZtWVhWc2RDQTlJRzlpYWpzZ2NtVjBkWEp1SUc1bGQwOWlhanNnZlNCOVhHNWNibVoxYm1OMGFXOXVJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb2IySnFLU0I3SUhKbGRIVnliaUJ2WW1vZ0ppWWdiMkpxTGw5ZlpYTk5iMlIxYkdVZ1B5QnZZbW9nT2lCN0lHUmxabUYxYkhRNklHOWlhaUI5T3lCOVhHNWNibVoxYm1OMGFXOXVJRjlrWldaaGRXeDBjeWh2WW1vc0lHUmxabUYxYkhSektTQjdJSFpoY2lCclpYbHpJRDBnVDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVRtRnRaWE1vWkdWbVlYVnNkSE1wT3lCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHdGxlWE11YkdWdVozUm9PeUJwS3lzcElIc2dkbUZ5SUd0bGVTQTlJR3RsZVhOYmFWMDdJSFpoY2lCMllXeDFaU0E5SUU5aWFtVmpkQzVuWlhSUGQyNVFjbTl3WlhKMGVVUmxjMk55YVhCMGIzSW9aR1ZtWVhWc2RITXNJR3RsZVNrN0lHbG1JQ2gyWVd4MVpTQW1KaUIyWVd4MVpTNWpiMjVtYVdkMWNtRmliR1VnSmlZZ2IySnFXMnRsZVYwZ1BUMDlJSFZ1WkdWbWFXNWxaQ2tnZXlCUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29iMkpxTENCclpYa3NJSFpoYkhWbEtUc2dmU0I5SUhKbGRIVnliaUJ2WW1vN0lIMWNibHh1Wm5WdVkzUnBiMjRnWDJOc1lYTnpRMkZzYkVOb1pXTnJLR2x1YzNSaGJtTmxMQ0JEYjI1emRISjFZM1J2Y2lrZ2V5QnBaaUFvSVNocGJuTjBZVzVqWlNCcGJuTjBZVzVqWlc5bUlFTnZibk4wY25WamRHOXlLU2tnZXlCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtGd2lRMkZ1Ym05MElHTmhiR3dnWVNCamJHRnpjeUJoY3lCaElHWjFibU4wYVc5dVhDSXBPeUI5SUgxY2JseHVablZ1WTNScGIyNGdYM0J2YzNOcFlteGxRMjl1YzNSeWRXTjBiM0pTWlhSMWNtNG9jMlZzWml3Z1kyRnNiQ2tnZXlCcFppQW9JWE5sYkdZcElIc2dkR2h5YjNjZ2JtVjNJRkpsWm1WeVpXNWpaVVZ5Y205eUtGd2lkR2hwY3lCb1lYTnVKM1FnWW1WbGJpQnBibWwwYVdGc2FYTmxaQ0F0SUhOMWNHVnlLQ2tnYUdGemJpZDBJR0psWlc0Z1kyRnNiR1ZrWENJcE95QjlJSEpsZEhWeWJpQmpZV3hzSUNZbUlDaDBlWEJsYjJZZ1kyRnNiQ0E5UFQwZ1hDSnZZbXBsWTNSY0lpQjhmQ0IwZVhCbGIyWWdZMkZzYkNBOVBUMGdYQ0ptZFc1amRHbHZibHdpS1NBL0lHTmhiR3dnT2lCelpXeG1PeUI5WEc1Y2JtWjFibU4wYVc5dUlGOXBibWhsY21sMGN5aHpkV0pEYkdGemN5d2djM1Z3WlhKRGJHRnpjeWtnZXlCcFppQW9kSGx3Wlc5bUlITjFjR1Z5UTJ4aGMzTWdJVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpQW1KaUJ6ZFhCbGNrTnNZWE56SUNFOVBTQnVkV3hzS1NCN0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9YQ0pUZFhCbGNpQmxlSEJ5WlhOemFXOXVJRzExYzNRZ1pXbDBhR1Z5SUdKbElHNTFiR3dnYjNJZ1lTQm1kVzVqZEdsdmJpd2dibTkwSUZ3aUlDc2dkSGx3Wlc5bUlITjFjR1Z5UTJ4aGMzTXBPeUI5SUhOMVlrTnNZWE56TG5CeWIzUnZkSGx3WlNBOUlFOWlhbVZqZEM1amNtVmhkR1VvYzNWd1pYSkRiR0Z6Y3lBbUppQnpkWEJsY2tOc1lYTnpMbkJ5YjNSdmRIbHdaU3dnZXlCamIyNXpkSEoxWTNSdmNqb2dleUIyWVd4MVpUb2djM1ZpUTJ4aGMzTXNJR1Z1ZFcxbGNtRmliR1U2SUdaaGJITmxMQ0IzY21sMFlXSnNaVG9nZEhKMVpTd2dZMjl1Wm1sbmRYSmhZbXhsT2lCMGNuVmxJSDBnZlNrN0lHbG1JQ2h6ZFhCbGNrTnNZWE56S1NCUFltcGxZM1F1YzJWMFVISnZkRzkwZVhCbFQyWWdQeUJQWW1wbFkzUXVjMlYwVUhKdmRHOTBlWEJsVDJZb2MzVmlRMnhoYzNNc0lITjFjR1Z5UTJ4aGMzTXBJRG9nWDJSbFptRjFiSFJ6S0hOMVlrTnNZWE56TENCemRYQmxja05zWVhOektUc2dmVnh1WEc1MllYSWdWSEpoYm5Oc1lYUnZjaUE5SUdaMWJtTjBhVzl1SUNoZlJYWmxiblJGYldsMGRHVnlLU0I3WEc0Z0lGOXBibWhsY21sMGN5aFVjbUZ1YzJ4aGRHOXlMQ0JmUlhabGJuUkZiV2wwZEdWeUtUdGNibHh1SUNCbWRXNWpkR2x2YmlCVWNtRnVjMnhoZEc5eUtITmxjblpwWTJWektTQjdYRzRnSUNBZ2RtRnlJRzl3ZEdsdmJuTWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTVNBbUppQmhjbWQxYldWdWRITmJNVjBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXN4WFNBNklIdDlPMXh1WEc0Z0lDQWdYMk5zWVhOelEyRnNiRU5vWldOcktIUm9hWE1zSUZSeVlXNXpiR0YwYjNJcE8xeHVYRzRnSUNBZ2RtRnlJRjkwYUdseklEMGdYM0J2YzNOcFlteGxRMjl1YzNSeWRXTjBiM0pTWlhSMWNtNG9kR2hwY3l3Z1gwVjJaVzUwUlcxcGRIUmxjaTVqWVd4c0tIUm9hWE1wS1R0Y2JseHVJQ0FnSUhWMGFXeHpMbU52Y0hrb1d5ZHlaWE52ZFhKalpWTjBiM0psSnl3Z0oyeGhibWQxWVdkbFZYUnBiSE1uTENBbmNHeDFjbUZzVW1WemIyeDJaWEluTENBbmFXNTBaWEp3YjJ4aGRHOXlKeXdnSjJKaFkydGxibVJEYjI1dVpXTjBiM0luWFN3Z2MyVnlkbWxqWlhNc0lGOTBhR2x6S1R0Y2JseHVJQ0FnSUY5MGFHbHpMbTl3ZEdsdmJuTWdQU0J2Y0hScGIyNXpPMXh1SUNBZ0lGOTBhR2x6TG14dloyZGxjaUE5SUY5c2IyZG5aWEl5TG1SbFptRjFiSFF1WTNKbFlYUmxLQ2QwY21GdWMyeGhkRzl5SnlrN1hHNGdJQ0FnY21WMGRYSnVJRjkwYUdsek8xeHVJQ0I5WEc1Y2JpQWdWSEpoYm5Oc1lYUnZjaTV3Y205MGIzUjVjR1V1WTJoaGJtZGxUR0Z1WjNWaFoyVWdQU0JtZFc1amRHbHZiaUJqYUdGdVoyVk1ZVzVuZFdGblpTaHNibWNwSUh0Y2JpQWdJQ0JwWmlBb2JHNW5LU0IwYUdsekxteGhibWQxWVdkbElEMGdiRzVuTzF4dUlDQjlPMXh1WEc0Z0lGUnlZVzV6YkdGMGIzSXVjSEp2ZEc5MGVYQmxMbVY0YVhOMGN5QTlJR1oxYm1OMGFXOXVJR1Y0YVhOMGN5aHJaWGtwSUh0Y2JpQWdJQ0IyWVhJZ2IzQjBhVzl1Y3lBOUlHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnZ1BpQXhJQ1ltSUdGeVozVnRaVzUwYzFzeFhTQWhQVDBnZFc1a1pXWnBibVZrSUQ4Z1lYSm5kVzFsYm5Seld6RmRJRG9nZXlCcGJuUmxjbkJ2YkdGMGFXOXVPaUI3ZlNCOU8xeHVYRzRnSUNBZ2RtRnlJSEpsYzI5c2RtVmtJRDBnZEdocGN5NXlaWE52YkhabEtHdGxlU3dnYjNCMGFXOXVjeWs3WEc0Z0lDQWdjbVYwZFhKdUlISmxjMjlzZG1Wa0lDWW1JSEpsYzI5c2RtVmtMbkpsY3lBaFBUMGdkVzVrWldacGJtVmtPMXh1SUNCOU8xeHVYRzRnSUZSeVlXNXpiR0YwYjNJdWNISnZkRzkwZVhCbExtVjRkSEpoWTNSR2NtOXRTMlY1SUQwZ1puVnVZM1JwYjI0Z1pYaDBjbUZqZEVaeWIyMUxaWGtvYTJWNUxDQnZjSFJwYjI1ektTQjdYRzRnSUNBZ2RtRnlJRzV6VTJWd1lYSmhkRzl5SUQwZ2IzQjBhVzl1Y3k1dWMxTmxjR0Z5WVhSdmNpQjhmQ0IwYUdsekxtOXdkR2x2Ym5NdWJuTlRaWEJoY21GMGIzSTdYRzRnSUNBZ2FXWWdLRzV6VTJWd1lYSmhkRzl5SUQwOVBTQjFibVJsWm1sdVpXUXBJRzV6VTJWd1lYSmhkRzl5SUQwZ0p6b25PMXh1SUNBZ0lIWmhjaUJyWlhsVFpYQmhjbUYwYjNJZ1BTQnZjSFJwYjI1ekxtdGxlVk5sY0dGeVlYUnZjaUI4ZkNCMGFHbHpMbTl3ZEdsdmJuTXVhMlY1VTJWd1lYSmhkRzl5SUh4OElDY3VKenRjYmx4dUlDQWdJSFpoY2lCdVlXMWxjM0JoWTJWeklEMGdiM0IwYVc5dWN5NXVjeUI4ZkNCMGFHbHpMbTl3ZEdsdmJuTXVaR1ZtWVhWc2RFNVRPMXh1SUNBZ0lHbG1JQ2h1YzFObGNHRnlZWFJ2Y2lBbUppQnJaWGt1YVc1a1pYaFBaaWh1YzFObGNHRnlZWFJ2Y2lrZ1BpQXRNU2tnZTF4dUlDQWdJQ0FnZG1GeUlIQmhjblJ6SUQwZ2EyVjVMbk53YkdsMEtHNXpVMlZ3WVhKaGRHOXlLVHRjYmlBZ0lDQWdJR2xtSUNodWMxTmxjR0Z5WVhSdmNpQWhQVDBnYTJWNVUyVndZWEpoZEc5eUlIeDhJRzV6VTJWd1lYSmhkRzl5SUQwOVBTQnJaWGxUWlhCaGNtRjBiM0lnSmlZZ2RHaHBjeTV2Y0hScGIyNXpMbTV6TG1sdVpHVjRUMllvY0dGeWRITmJNRjBwSUQ0Z0xURXBJRzVoYldWemNHRmpaWE1nUFNCd1lYSjBjeTV6YUdsbWRDZ3BPMXh1SUNBZ0lDQWdhMlY1SUQwZ2NHRnlkSE11YW05cGJpaHJaWGxUWlhCaGNtRjBiM0lwTzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvZEhsd1pXOW1JRzVoYldWemNHRmpaWE1nUFQwOUlDZHpkSEpwYm1jbktTQnVZVzFsYzNCaFkyVnpJRDBnVzI1aGJXVnpjR0ZqWlhOZE8xeHVYRzRnSUNBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0FnSUd0bGVUb2dhMlY1TEZ4dUlDQWdJQ0FnYm1GdFpYTndZV05sY3pvZ2JtRnRaWE53WVdObGMxeHVJQ0FnSUgwN1hHNGdJSDA3WEc1Y2JpQWdWSEpoYm5Oc1lYUnZjaTV3Y205MGIzUjVjR1V1ZEhKaGJuTnNZWFJsSUQwZ1puVnVZM1JwYjI0Z2RISmhibk5zWVhSbEtHdGxlWE1zSUc5d2RHbHZibk1wSUh0Y2JpQWdJQ0IyWVhJZ1gzUm9hWE15SUQwZ2RHaHBjenRjYmx4dUlDQWdJR2xtSUNnb2RIbHdaVzltSUc5d2RHbHZibk1nUFQwOUlDZDFibVJsWm1sdVpXUW5JRDhnSjNWdVpHVm1hVzVsWkNjZ09pQmZkSGx3Wlc5bUtHOXdkR2x2Ym5NcEtTQWhQVDBnSjI5aWFtVmpkQ2NnSmlZZ2RHaHBjeTV2Y0hScGIyNXpMbTkyWlhKc2IyRmtWSEpoYm5Oc1lYUnBiMjVQY0hScGIyNUlZVzVrYkdWeUtTQjdYRzRnSUNBZ0lDQXZLaUJsYzJ4cGJuUWdjSEpsWm1WeUxYSmxjM1F0Y0dGeVlXMXpPaUF3SUNvdlhHNGdJQ0FnSUNCdmNIUnBiMjV6SUQwZ2RHaHBjeTV2Y0hScGIyNXpMbTkyWlhKc2IyRmtWSEpoYm5Oc1lYUnBiMjVQY0hScGIyNUlZVzVrYkdWeUtHRnlaM1Z0Wlc1MGN5azdYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDZ2hiM0IwYVc5dWN5a2diM0IwYVc5dWN5QTlJSHQ5TzF4dVhHNGdJQ0FnTHk4Z2JtOXVJSFpoYkdsa0lHdGxlWE1nYUdGdVpHeHBibWRjYmlBZ0lDQnBaaUFvYTJWNWN5QTlQVDBnZFc1a1pXWnBibVZrSUh4OElHdGxlWE1nUFQwOUlHNTFiR3dnZkh3Z2EyVjVjeUE5UFQwZ0p5Y3BJSEpsZEhWeWJpQW5KenRjYmlBZ0lDQnBaaUFvZEhsd1pXOW1JR3RsZVhNZ1BUMDlJQ2R1ZFcxaVpYSW5LU0JyWlhseklEMGdVM1J5YVc1bktHdGxlWE1wTzF4dUlDQWdJR2xtSUNoMGVYQmxiMllnYTJWNWN5QTlQVDBnSjNOMGNtbHVaeWNwSUd0bGVYTWdQU0JiYTJWNWMxMDdYRzVjYmlBZ0lDQXZMeUJ6WlhCaGNtRjBiM0p6WEc0Z0lDQWdkbUZ5SUd0bGVWTmxjR0Z5WVhSdmNpQTlJRzl3ZEdsdmJuTXVhMlY1VTJWd1lYSmhkRzl5SUh4OElIUm9hWE11YjNCMGFXOXVjeTVyWlhsVFpYQmhjbUYwYjNJZ2ZId2dKeTRuTzF4dVhHNGdJQ0FnTHk4Z1oyVjBJRzVoYldWemNHRmpaU2h6S1Z4dVhHNGdJQ0FnZG1GeUlGOWxlSFJ5WVdOMFJuSnZiVXRsZVNBOUlIUm9hWE11WlhoMGNtRmpkRVp5YjIxTFpYa29hMlY1YzF0clpYbHpMbXhsYm1kMGFDQXRJREZkTENCdmNIUnBiMjV6S1N4Y2JpQWdJQ0FnSUNBZ2EyVjVJRDBnWDJWNGRISmhZM1JHY205dFMyVjVMbXRsZVN4Y2JpQWdJQ0FnSUNBZ2JtRnRaWE53WVdObGN5QTlJRjlsZUhSeVlXTjBSbkp2YlV0bGVTNXVZVzFsYzNCaFkyVnpPMXh1WEc0Z0lDQWdkbUZ5SUc1aGJXVnpjR0ZqWlNBOUlHNWhiV1Z6Y0dGalpYTmJibUZ0WlhOd1lXTmxjeTVzWlc1bmRHZ2dMU0F4WFR0Y2JseHVJQ0FnSUM4dklISmxkSFZ5YmlCclpYa2diMjRnUTBsTmIyUmxYRzRnSUNBZ2RtRnlJR3h1WnlBOUlHOXdkR2x2Ym5NdWJHNW5JSHg4SUhSb2FYTXViR0Z1WjNWaFoyVTdYRzRnSUNBZ2RtRnlJR0Z3Y0dWdVpFNWhiV1Z6Y0dGalpWUnZRMGxOYjJSbElEMGdiM0IwYVc5dWN5NWhjSEJsYm1ST1lXMWxjM0JoWTJWVWIwTkpUVzlrWlNCOGZDQjBhR2x6TG05d2RHbHZibk11WVhCd1pXNWtUbUZ0WlhOd1lXTmxWRzlEU1UxdlpHVTdYRzRnSUNBZ2FXWWdLR3h1WnlBbUppQnNibWN1ZEc5TWIzZGxja05oYzJVb0tTQTlQVDBnSjJOcGJXOWtaU2NwSUh0Y2JpQWdJQ0FnSUdsbUlDaGhjSEJsYm1ST1lXMWxjM0JoWTJWVWIwTkpUVzlrWlNrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnYm5OVFpYQmhjbUYwYjNJZ1BTQnZjSFJwYjI1ekxtNXpVMlZ3WVhKaGRHOXlJSHg4SUhSb2FYTXViM0IwYVc5dWN5NXVjMU5sY0dGeVlYUnZjanRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRzVoYldWemNHRmpaU0FySUc1elUyVndZWEpoZEc5eUlDc2dhMlY1TzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCeVpYUjFjbTRnYTJWNU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklISmxjMjlzZG1VZ1puSnZiU0J6ZEc5eVpWeHVJQ0FnSUhaaGNpQnlaWE52YkhabFpDQTlJSFJvYVhNdWNtVnpiMngyWlNoclpYbHpMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQjJZWElnY21WeklEMGdjbVZ6YjJ4MlpXUWdKaVlnY21WemIyeDJaV1F1Y21Wek8xeHVJQ0FnSUhaaGNpQnlaWE5WYzJWa1MyVjVJRDBnY21WemIyeDJaV1FnSmlZZ2NtVnpiMngyWldRdWRYTmxaRXRsZVNCOGZDQnJaWGs3WEc1Y2JpQWdJQ0IyWVhJZ2NtVnpWSGx3WlNBOUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWRHOVRkSEpwYm1jdVlYQndiSGtvY21WektUdGNiaUFnSUNCMllYSWdibTlQWW1wbFkzUWdQU0JiSjF0dlltcGxZM1FnVG5WdFltVnlYU2NzSUNkYmIySnFaV04wSUVaMWJtTjBhVzl1WFNjc0lDZGJiMkpxWldOMElGSmxaMFY0Y0YwblhUdGNiaUFnSUNCMllYSWdhbTlwYmtGeWNtRjVjeUE5SUc5d2RHbHZibk11YW05cGJrRnljbUY1Y3lBaFBUMGdkVzVrWldacGJtVmtJRDhnYjNCMGFXOXVjeTVxYjJsdVFYSnlZWGx6SURvZ2RHaHBjeTV2Y0hScGIyNXpMbXB2YVc1QmNuSmhlWE03WEc1Y2JpQWdJQ0F2THlCdlltcGxZM1JjYmlBZ0lDQjJZWElnYUdGdVpHeGxRWE5QWW1wbFkzUWdQU0IwZVhCbGIyWWdjbVZ6SUNFOVBTQW5jM1J5YVc1bkp5QW1KaUIwZVhCbGIyWWdjbVZ6SUNFOVBTQW5ZbTl2YkdWaGJpY2dKaVlnZEhsd1pXOW1JSEpsY3lBaFBUMGdKMjUxYldKbGNpYzdYRzRnSUNBZ2FXWWdLSEpsY3lBbUppQm9ZVzVrYkdWQmMwOWlhbVZqZENBbUppQnViMDlpYW1WamRDNXBibVJsZUU5bUtISmxjMVI1Y0dVcElEd2dNQ0FtSmlBaEtHcHZhVzVCY25KaGVYTWdKaVlnY21WelZIbHdaU0E5UFQwZ0oxdHZZbXBsWTNRZ1FYSnlZWGxkSnlrcElIdGNiaUFnSUNBZ0lHbG1JQ2doYjNCMGFXOXVjeTV5WlhSMWNtNVBZbXBsWTNSeklDWW1JQ0YwYUdsekxtOXdkR2x2Ym5NdWNtVjBkWEp1VDJKcVpXTjBjeWtnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbXh2WjJkbGNpNTNZWEp1S0NkaFkyTmxjM05wYm1jZ1lXNGdiMkpxWldOMElDMGdZblYwSUhKbGRIVnliazlpYW1WamRITWdiM0IwYVc5dWN5QnBjeUJ1YjNRZ1pXNWhZbXhsWkNFbktUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE11YjNCMGFXOXVjeTV5WlhSMWNtNWxaRTlpYW1WamRFaGhibVJzWlhJZ1B5QjBhR2x6TG05d2RHbHZibk11Y21WMGRYSnVaV1JQWW1wbFkzUklZVzVrYkdWeUtISmxjMVZ6WldSTFpYa3NJSEpsY3l3Z2IzQjBhVzl1Y3lrZ09pQW5hMlY1SUZ4Y0p5Y2dLeUJyWlhrZ0t5QW5JQ2duSUNzZ2RHaHBjeTVzWVc1bmRXRm5aU0FySUNjcFhGd25JSEpsZEhWeWJtVmtJR0Z1SUc5aWFtVmpkQ0JwYm5OMFpXRmtJRzltSUhOMGNtbHVaeTRuTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBdkx5QnBaaUIzWlNCbmIzUWdZU0J6WlhCaGNtRjBiM0lnZDJVZ2JHOXZjQ0J2ZG1WeUlHTm9hV3hrY21WdUlDMGdaV3h6WlNCM1pTQnFkWE4wSUhKbGRIVnliaUJ2WW1wbFkzUWdZWE1nYVhOY2JpQWdJQ0FnSUM4dklHRnpJR2hoZG1sdVp5QnBkQ0J6WlhRZ2RHOGdabUZzYzJVZ2JXVmhibk1nYm04Z2FHbGxjbUZ5WTJoNUlITnZJRzV2SUd4dmIydDFjQ0JtYjNJZ2JtVnpkR1ZrSUhaaGJIVmxjMXh1SUNBZ0lDQWdhV1lnS0c5d2RHbHZibk11YTJWNVUyVndZWEpoZEc5eUlIeDhJSFJvYVhNdWIzQjBhVzl1Y3k1clpYbFRaWEJoY21GMGIzSXBJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHTnZjSGtnUFNCeVpYTlVlWEJsSUQwOVBTQW5XMjlpYW1WamRDQkJjbkpoZVYwbklEOGdXMTBnT2lCN2ZUc2dMeThnWVhCd2JIa2dZMmhwYkdRZ2RISmhibk5zWVhScGIyNGdiMjRnWVNCamIzQjVYRzVjYmlBZ0lDQWdJQ0FnTHlvZ1pYTnNhVzUwSUc1dkxYSmxjM1J5YVdOMFpXUXRjM2x1ZEdGNE9pQXdJQ292WEc0Z0lDQWdJQ0FnSUdadmNpQW9kbUZ5SUcwZ2FXNGdjbVZ6S1NCN1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0U5aWFtVmpkQzV3Y205MGIzUjVjR1V1YUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNoeVpYTXNJRzBwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pHVmxjRXRsZVNBOUlDY25JQ3NnY21WelZYTmxaRXRsZVNBcklHdGxlVk5sY0dGeVlYUnZjaUFySUcwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjNCNVcyMWRJRDBnZEdocGN5NTBjbUZ1YzJ4aGRHVW9aR1ZsY0V0bGVTd2dYMlY0ZEdWdVpITW9lMzBzSUc5d2RHbHZibk1zSUhzZ2FtOXBia0Z5Y21GNWN6b2dabUZzYzJVc0lHNXpPaUJ1WVcxbGMzQmhZMlZ6SUgwcEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGpiM0I1VzIxZElEMDlQU0JrWldWd1MyVjVLU0JqYjNCNVcyMWRJRDBnY21WelcyMWRPeUF2THlCcFppQnViM1JvYVc1bklHWnZkVzVrSUhWelpTQnZjbWRwYm1Gc0lIWmhiSFZsSUdGeklHWmhiR3hpWVdOclhHNGdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUhKbGN5QTlJR052Y0hrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNCbGJITmxJR2xtSUNocWIybHVRWEp5WVhseklDWW1JSEpsYzFSNWNHVWdQVDA5SUNkYmIySnFaV04wSUVGeWNtRjVYU2NwSUh0Y2JpQWdJQ0FnSUM4dklHRnljbUY1SUhOd1pXTnBZV3dnZEhKbFlYUnRaVzUwWEc0Z0lDQWdJQ0J5WlhNZ1BTQnlaWE11YW05cGJpaHFiMmx1UVhKeVlYbHpLVHRjYmlBZ0lDQWdJR2xtSUNoeVpYTXBJSEpsY3lBOUlIUm9hWE11WlhoMFpXNWtWSEpoYm5Oc1lYUnBiMjRvY21WekxDQnJaWGx6TENCdmNIUnBiMjV6S1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdMeThnYzNSeWFXNW5MQ0JsYlhCMGVTQnZjaUJ1ZFd4c1hHNGdJQ0FnSUNCMllYSWdkWE5sWkVSbFptRjFiSFFnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJSFpoY2lCMWMyVmtTMlY1SUQwZ1ptRnNjMlU3WEc1Y2JpQWdJQ0FnSUM4dklHWmhiR3hpWVdOcklIWmhiSFZsWEc0Z0lDQWdJQ0JwWmlBb0lYUm9hWE11YVhOV1lXeHBaRXh2YjJ0MWNDaHlaWE1wSUNZbUlHOXdkR2x2Ym5NdVpHVm1ZWFZzZEZaaGJIVmxJQ0U5UFNCMWJtUmxabWx1WldRcElIdGNiaUFnSUNBZ0lDQWdkWE5sWkVSbFptRjFiSFFnUFNCMGNuVmxPMXh1SUNBZ0lDQWdJQ0J5WlhNZ1BTQnZjSFJwYjI1ekxtUmxabUYxYkhSV1lXeDFaVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR2xtSUNnaGRHaHBjeTVwYzFaaGJHbGtURzl2YTNWd0tISmxjeWtwSUh0Y2JpQWdJQ0FnSUNBZ2RYTmxaRXRsZVNBOUlIUnlkV1U3WEc0Z0lDQWdJQ0FnSUhKbGN5QTlJR3RsZVR0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0x5OGdjMkYyWlNCdGFYTnphVzVuWEc0Z0lDQWdJQ0IyWVhJZ2RYQmtZWFJsVFdsemMybHVaeUE5SUc5d2RHbHZibk11WkdWbVlYVnNkRlpoYkhWbElDWW1JRzl3ZEdsdmJuTXVaR1ZtWVhWc2RGWmhiSFZsSUNFOVBTQnlaWE1nSmlZZ2RHaHBjeTV2Y0hScGIyNXpMblZ3WkdGMFpVMXBjM05wYm1jN1hHNGdJQ0FnSUNCcFppQW9kWE5sWkV0bGVTQjhmQ0IxYzJWa1JHVm1ZWFZzZENCOGZDQjFjR1JoZEdWTmFYTnphVzVuS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Ykc5bloyVnlMbXh2WnloMWNHUmhkR1ZOYVhOemFXNW5JRDhnSjNWd1pHRjBaVXRsZVNjZ09pQW5iV2x6YzJsdVowdGxlU2NzSUd4dVp5d2dibUZ0WlhOd1lXTmxMQ0JyWlhrc0lIVndaR0YwWlUxcGMzTnBibWNnUHlCdmNIUnBiMjV6TG1SbFptRjFiSFJXWVd4MVpTQTZJSEpsY3lrN1hHNWNiaUFnSUNBZ0lDQWdkbUZ5SUd4dVozTWdQU0JiWFR0Y2JpQWdJQ0FnSUNBZ2RtRnlJR1poYkd4aVlXTnJURzVuY3lBOUlIUm9hWE11YkdGdVozVmhaMlZWZEdsc2N5NW5aWFJHWVd4c1ltRmphME52WkdWektIUm9hWE11YjNCMGFXOXVjeTVtWVd4c1ltRmphMHh1Wnl3Z2IzQjBhVzl1Y3k1c2JtY2dmSHdnZEdocGN5NXNZVzVuZFdGblpTazdYRzRnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbTl3ZEdsdmJuTXVjMkYyWlUxcGMzTnBibWRVYnlBOVBUMGdKMlpoYkd4aVlXTnJKeUFtSmlCbVlXeHNZbUZqYTB4dVozTWdKaVlnWm1Gc2JHSmhZMnRNYm1keld6QmRLU0I3WEc0Z0lDQWdJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQm1ZV3hzWW1GamEweHVaM011YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUd4dVozTXVjSFZ6YUNobVlXeHNZbUZqYTB4dVozTmJhVjBwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2gwYUdsekxtOXdkR2x2Ym5NdWMyRjJaVTFwYzNOcGJtZFVieUE5UFQwZ0oyRnNiQ2NwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnNibWR6SUQwZ2RHaHBjeTVzWVc1bmRXRm5aVlYwYVd4ekxuUnZVbVZ6YjJ4MlpVaHBaWEpoY21Ob2VTaHZjSFJwYjI1ekxteHVaeUI4ZkNCMGFHbHpMbXhoYm1kMVlXZGxLVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNCc2JtZHpMbkIxYzJnb2IzQjBhVzl1Y3k1c2JtY2dmSHdnZEdocGN5NXNZVzVuZFdGblpTazdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCMllYSWdjMlZ1WkNBOUlHWjFibU4wYVc5dUlITmxibVFvYkN3Z2F5a2dlMXh1SUNBZ0lDQWdJQ0FnSUdsbUlDaGZkR2hwY3pJdWIzQjBhVzl1Y3k1dGFYTnphVzVuUzJWNVNHRnVaR3hsY2lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWDNSb2FYTXlMbTl3ZEdsdmJuTXViV2x6YzJsdVowdGxlVWhoYm1Sc1pYSW9iQ3dnYm1GdFpYTndZV05sTENCckxDQjFjR1JoZEdWTmFYTnphVzVuSUQ4Z2IzQjBhVzl1Y3k1a1pXWmhkV3gwVm1Gc2RXVWdPaUJ5WlhNc0lIVndaR0YwWlUxcGMzTnBibWNzSUc5d2RHbHZibk1wTzF4dUlDQWdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9YM1JvYVhNeUxtSmhZMnRsYm1SRGIyNXVaV04wYjNJZ0ppWWdYM1JvYVhNeUxtSmhZMnRsYm1SRGIyNXVaV04wYjNJdWMyRjJaVTFwYzNOcGJtY3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lGOTBhR2x6TWk1aVlXTnJaVzVrUTI5dWJtVmpkRzl5TG5OaGRtVk5hWE56YVc1bktHd3NJRzVoYldWemNHRmpaU3dnYXl3Z2RYQmtZWFJsVFdsemMybHVaeUEvSUc5d2RHbHZibk11WkdWbVlYVnNkRlpoYkhWbElEb2djbVZ6TENCMWNHUmhkR1ZOYVhOemFXNW5MQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdYM1JvYVhNeUxtVnRhWFFvSjIxcGMzTnBibWRMWlhrbkxDQnNMQ0J1WVcxbGMzQmhZMlVzSUdzc0lISmxjeWs3WEc0Z0lDQWdJQ0FnSUgwN1hHNWNiaUFnSUNBZ0lDQWdhV1lnS0hSb2FYTXViM0IwYVc5dWN5NXpZWFpsVFdsemMybHVaeWtnZTF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxtOXdkR2x2Ym5NdWMyRjJaVTFwYzNOcGJtZFFiSFZ5WVd4eklDWW1JRzl3ZEdsdmJuTXVZMjkxYm5RcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUd4dVozTXVabTl5UldGamFDaG1kVzVqZEdsdmJpQW9iQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2NHeDFjbUZzY3lBOUlGOTBhR2x6TWk1d2JIVnlZV3hTWlhOdmJIWmxjaTVuWlhSUWJIVnlZV3hHYjNKdGMwOW1TMlY1S0d3c0lHdGxlU2s3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnY0d4MWNtRnNjeTVtYjNKRllXTm9LR1oxYm1OMGFXOXVJQ2h3S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhObGJtUW9XMnhkTENCd0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2MyVnVaQ2hzYm1kekxDQnJaWGtwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0F2THlCbGVIUmxibVJjYmlBZ0lDQWdJSEpsY3lBOUlIUm9hWE11WlhoMFpXNWtWSEpoYm5Oc1lYUnBiMjRvY21WekxDQnJaWGx6TENCdmNIUnBiMjV6S1R0Y2JseHVJQ0FnSUNBZ0x5OGdZWEJ3Wlc1a0lHNWhiV1Z6Y0dGalpTQnBaaUJ6ZEdsc2JDQnJaWGxjYmlBZ0lDQWdJR2xtSUNoMWMyVmtTMlY1SUNZbUlISmxjeUE5UFQwZ2EyVjVJQ1ltSUhSb2FYTXViM0IwYVc5dWN5NWhjSEJsYm1ST1lXMWxjM0JoWTJWVWIwMXBjM05wYm1kTFpYa3BJSEpsY3lBOUlHNWhiV1Z6Y0dGalpTQXJJQ2M2SnlBcklHdGxlVHRjYmx4dUlDQWdJQ0FnTHk4Z2NHRnljMlZOYVhOemFXNW5TMlY1U0dGdVpHeGxjbHh1SUNBZ0lDQWdhV1lnS0hWelpXUkxaWGtnSmlZZ2RHaHBjeTV2Y0hScGIyNXpMbkJoY25ObFRXbHpjMmx1WjB0bGVVaGhibVJzWlhJcElISmxjeUE5SUhSb2FYTXViM0IwYVc5dWN5NXdZWEp6WlUxcGMzTnBibWRMWlhsSVlXNWtiR1Z5S0hKbGN5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdjbVYwZFhKdVhHNGdJQ0FnY21WMGRYSnVJSEpsY3p0Y2JpQWdmVHRjYmx4dUlDQlVjbUZ1YzJ4aGRHOXlMbkJ5YjNSdmRIbHdaUzVsZUhSbGJtUlVjbUZ1YzJ4aGRHbHZiaUE5SUdaMWJtTjBhVzl1SUdWNGRHVnVaRlJ5WVc1emJHRjBhVzl1S0hKbGN5d2dhMlY1TENCdmNIUnBiMjV6S1NCN1hHNGdJQ0FnZG1GeUlGOTBhR2x6TXlBOUlIUm9hWE03WEc1Y2JpQWdJQ0JwWmlBb2IzQjBhVzl1Y3k1cGJuUmxjbkJ2YkdGMGFXOXVLU0IwYUdsekxtbHVkR1Z5Y0c5c1lYUnZjaTVwYm1sMEtGOWxlSFJsYm1SektIdDlMQ0J2Y0hScGIyNXpMQ0I3SUdsdWRHVnljRzlzWVhScGIyNDZJRjlsZUhSbGJtUnpLSHQ5TENCMGFHbHpMbTl3ZEdsdmJuTXVhVzUwWlhKd2IyeGhkR2x2Yml3Z2IzQjBhVzl1Y3k1cGJuUmxjbkJ2YkdGMGFXOXVLU0I5S1NrN1hHNWNiaUFnSUNBdkx5QnBiblJsY25CdmJHRjBaVnh1SUNBZ0lIWmhjaUJrWVhSaElEMGdiM0IwYVc5dWN5NXlaWEJzWVdObElDWW1JSFI1Y0dWdlppQnZjSFJwYjI1ekxuSmxjR3hoWTJVZ0lUMDlJQ2R6ZEhKcGJtY25JRDhnYjNCMGFXOXVjeTV5WlhCc1lXTmxJRG9nYjNCMGFXOXVjenRjYmlBZ0lDQnBaaUFvZEdocGN5NXZjSFJwYjI1ekxtbHVkR1Z5Y0c5c1lYUnBiMjR1WkdWbVlYVnNkRlpoY21saFlteGxjeWtnWkdGMFlTQTlJRjlsZUhSbGJtUnpLSHQ5TENCMGFHbHpMbTl3ZEdsdmJuTXVhVzUwWlhKd2IyeGhkR2x2Ymk1a1pXWmhkV3gwVm1GeWFXRmliR1Z6TENCa1lYUmhLVHRjYmlBZ0lDQnlaWE1nUFNCMGFHbHpMbWx1ZEdWeWNHOXNZWFJ2Y2k1cGJuUmxjbkJ2YkdGMFpTaHlaWE1zSUdSaGRHRXNJRzl3ZEdsdmJuTXViRzVuSUh4OElIUm9hWE11YkdGdVozVmhaMlVwTzF4dVhHNGdJQ0FnTHk4Z2JtVnpkR2x1WjF4dUlDQWdJR2xtSUNodmNIUnBiMjV6TG01bGMzUWdJVDA5SUdaaGJITmxLU0J5WlhNZ1BTQjBhR2x6TG1sdWRHVnljRzlzWVhSdmNpNXVaWE4wS0hKbGN5d2dablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJRjkwYUdsek15NTBjbUZ1YzJ4aGRHVXVZWEJ3Ykhrb1gzUm9hWE16TENCaGNtZDFiV1Z1ZEhNcE8xeHVJQ0FnSUgwc0lHOXdkR2x2Ym5NcE8xeHVYRzRnSUNBZ2FXWWdLRzl3ZEdsdmJuTXVhVzUwWlhKd2IyeGhkR2x2YmlrZ2RHaHBjeTVwYm5SbGNuQnZiR0YwYjNJdWNtVnpaWFFvS1R0Y2JseHVJQ0FnSUM4dklIQnZjM1FnY0hKdlkyVnpjMXh1SUNBZ0lIWmhjaUJ3YjNOMFVISnZZMlZ6Y3lBOUlHOXdkR2x2Ym5NdWNHOXpkRkJ5YjJObGMzTWdmSHdnZEdocGN5NXZjSFJwYjI1ekxuQnZjM1JRY205alpYTnpPMXh1SUNBZ0lIWmhjaUJ3YjNOMFVISnZZMlZ6YzI5eVRtRnRaWE1nUFNCMGVYQmxiMllnY0c5emRGQnliMk5sYzNNZ1BUMDlJQ2R6ZEhKcGJtY25JRDhnVzNCdmMzUlFjbTlqWlhOelhTQTZJSEJ2YzNSUWNtOWpaWE56TzF4dVhHNGdJQ0FnYVdZZ0tISmxjeUFoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JSEpsY3lBaFBUMGdiblZzYkNBbUppQndiM04wVUhKdlkyVnpjMjl5VG1GdFpYTWdKaVlnY0c5emRGQnliMk5sYzNOdmNrNWhiV1Z6TG14bGJtZDBhQ0FtSmlCdmNIUnBiMjV6TG1Gd2NHeDVVRzl6ZEZCeWIyTmxjM052Y2lBaFBUMGdabUZzYzJVcElIdGNiaUFnSUNBZ0lISmxjeUE5SUY5d2IzTjBVSEp2WTJWemMyOXlNaTVrWldaaGRXeDBMbWhoYm1Sc1pTaHdiM04wVUhKdlkyVnpjMjl5VG1GdFpYTXNJSEpsY3l3Z2EyVjVMQ0J2Y0hScGIyNXpMQ0IwYUdsektUdGNiaUFnSUNCOVhHNWNiaUFnSUNCeVpYUjFjbTRnY21Wek8xeHVJQ0I5TzF4dVhHNGdJRlJ5WVc1emJHRjBiM0l1Y0hKdmRHOTBlWEJsTG5KbGMyOXNkbVVnUFNCbWRXNWpkR2x2YmlCeVpYTnZiSFpsS0d0bGVYTXBJSHRjYmlBZ0lDQjJZWElnWDNSb2FYTTBJRDBnZEdocGN6dGNibHh1SUNBZ0lIWmhjaUJ2Y0hScGIyNXpJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURFZ0ppWWdZWEpuZFcxbGJuUnpXekZkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTVYwZ09pQjdmVHRjYmx4dUlDQWdJSFpoY2lCbWIzVnVaQ0E5SUhadmFXUWdNRHRjYmlBZ0lDQjJZWElnZFhObFpFdGxlU0E5SUhadmFXUWdNRHRjYmx4dUlDQWdJR2xtSUNoMGVYQmxiMllnYTJWNWN5QTlQVDBnSjNOMGNtbHVaeWNwSUd0bGVYTWdQU0JiYTJWNWMxMDdYRzVjYmlBZ0lDQXZMeUJtYjNKRllXTm9JSEJ2YzNOcFlteGxJR3RsZVZ4dUlDQWdJR3RsZVhNdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlBb2F5a2dlMXh1SUNBZ0lDQWdhV1lnS0Y5MGFHbHpOQzVwYzFaaGJHbGtURzl2YTNWd0tHWnZkVzVrS1NrZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnZG1GeUlHVjRkSEpoWTNSbFpDQTlJRjkwYUdsek5DNWxlSFJ5WVdOMFJuSnZiVXRsZVNockxDQnZjSFJwYjI1ektUdGNiaUFnSUNBZ0lIWmhjaUJyWlhrZ1BTQmxlSFJ5WVdOMFpXUXVhMlY1TzF4dUlDQWdJQ0FnZFhObFpFdGxlU0E5SUd0bGVUdGNiaUFnSUNBZ0lIWmhjaUJ1WVcxbGMzQmhZMlZ6SUQwZ1pYaDBjbUZqZEdWa0xtNWhiV1Z6Y0dGalpYTTdYRzRnSUNBZ0lDQnBaaUFvWDNSb2FYTTBMbTl3ZEdsdmJuTXVabUZzYkdKaFkydE9VeWtnYm1GdFpYTndZV05sY3lBOUlHNWhiV1Z6Y0dGalpYTXVZMjl1WTJGMEtGOTBhR2x6TkM1dmNIUnBiMjV6TG1aaGJHeGlZV05yVGxNcE8xeHVYRzRnSUNBZ0lDQjJZWElnYm1WbFpITlFiSFZ5WVd4SVlXNWtiR2x1WnlBOUlHOXdkR2x2Ym5NdVkyOTFiblFnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUIwZVhCbGIyWWdiM0IwYVc5dWN5NWpiM1Z1ZENBaFBUMGdKM04wY21sdVp5YzdYRzRnSUNBZ0lDQjJZWElnYm1WbFpITkRiMjUwWlhoMFNHRnVaR3hwYm1jZ1BTQnZjSFJwYjI1ekxtTnZiblJsZUhRZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCMGVYQmxiMllnYjNCMGFXOXVjeTVqYjI1MFpYaDBJRDA5UFNBbmMzUnlhVzVuSnlBbUppQnZjSFJwYjI1ekxtTnZiblJsZUhRZ0lUMDlJQ2NuTzF4dVhHNGdJQ0FnSUNCMllYSWdZMjlrWlhNZ1BTQnZjSFJwYjI1ekxteHVaM01nUHlCdmNIUnBiMjV6TG14dVozTWdPaUJmZEdocGN6UXViR0Z1WjNWaFoyVlZkR2xzY3k1MGIxSmxjMjlzZG1WSWFXVnlZWEpqYUhrb2IzQjBhVzl1Y3k1c2JtY2dmSHdnWDNSb2FYTTBMbXhoYm1kMVlXZGxLVHRjYmx4dUlDQWdJQ0FnYm1GdFpYTndZV05sY3k1bWIzSkZZV05vS0daMWJtTjBhVzl1SUNodWN5a2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb1gzUm9hWE0wTG1selZtRnNhV1JNYjI5cmRYQW9abTkxYm1RcEtTQnlaWFIxY200N1hHNWNiaUFnSUNBZ0lDQWdZMjlrWlhNdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlBb1kyOWtaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2hmZEdocGN6UXVhWE5XWVd4cFpFeHZiMnQxY0NobWIzVnVaQ2twSUhKbGRIVnlianRjYmx4dUlDQWdJQ0FnSUNBZ0lIWmhjaUJtYVc1aGJFdGxlU0E5SUd0bGVUdGNiaUFnSUNBZ0lDQWdJQ0IyWVhJZ1ptbHVZV3hMWlhseklEMGdXMlpwYm1Gc1MyVjVYVHRjYmx4dUlDQWdJQ0FnSUNBZ0lIWmhjaUJ3YkhWeVlXeFRkV1ptYVhnZ1BTQjJiMmxrSURBN1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0c1bFpXUnpVR3gxY21Gc1NHRnVaR3hwYm1jcElIQnNkWEpoYkZOMVptWnBlQ0E5SUY5MGFHbHpOQzV3YkhWeVlXeFNaWE52YkhabGNpNW5aWFJUZFdabWFYZ29ZMjlrWlN3Z2IzQjBhVzl1Y3k1amIzVnVkQ2s3WEc1Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJtWVd4c1ltRmpheUJtYjNJZ2NHeDFjbUZzSUdsbUlHTnZiblJsZUhRZ2JtOTBJR1p2ZFc1a1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0c1bFpXUnpVR3gxY21Gc1NHRnVaR3hwYm1jZ0ppWWdibVZsWkhORGIyNTBaWGgwU0dGdVpHeHBibWNwSUdacGJtRnNTMlY1Y3k1d2RYTm9LR1pwYm1Gc1MyVjVJQ3NnY0d4MWNtRnNVM1ZtWm1sNEtUdGNibHh1SUNBZ0lDQWdJQ0FnSUM4dklHZGxkQ0JyWlhrZ1ptOXlJR052Ym5SbGVIUWdhV1lnYm1WbFpHVmtYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tHNWxaV1J6UTI5dWRHVjRkRWhoYm1Sc2FXNW5LU0JtYVc1aGJFdGxlWE11Y0hWemFDaG1hVzVoYkV0bGVTQXJQU0FuSnlBcklGOTBhR2x6TkM1dmNIUnBiMjV6TG1OdmJuUmxlSFJUWlhCaGNtRjBiM0lnS3lCdmNIUnBiMjV6TG1OdmJuUmxlSFFwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdMeThnWjJWMElHdGxlU0JtYjNJZ2NHeDFjbUZzSUdsbUlHNWxaV1JsWkZ4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2h1WldWa2MxQnNkWEpoYkVoaGJtUnNhVzVuS1NCbWFXNWhiRXRsZVhNdWNIVnphQ2htYVc1aGJFdGxlU0FyUFNCd2JIVnlZV3hUZFdabWFYZ3BPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0x5OGdhWFJsY21GMFpTQnZkbVZ5SUdacGJtRnNTMlY1Y3lCemRHRnlkR2x1WnlCM2FYUm9JRzF2YzNRZ2MzQmxZMmxtYVdNZ2NHeDFjbUZzYTJWNUlDZ3RQaUJqYjI1MFpYaDBhMlY1SUc5dWJIa3BJQzArSUhOcGJtZDFiR0Z5YTJWNUlHOXViSGxjYmlBZ0lDQWdJQ0FnSUNCMllYSWdjRzl6YzJsaWJHVkxaWGtnUFNCMmIybGtJREE3WEc0Z0lDQWdJQ0FnSUNBZ0x5b2daWE5zYVc1MElHNXZMV052Ym1RdFlYTnphV2R1T2lBd0lDb3ZYRzRnSUNBZ0lDQWdJQ0FnZDJocGJHVWdLSEJ2YzNOcFlteGxTMlY1SUQwZ1ptbHVZV3hMWlhsekxuQnZjQ2dwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0lWOTBhR2x6TkM1cGMxWmhiR2xrVEc5dmEzVndLR1p2ZFc1a0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQm1iM1Z1WkNBOUlGOTBhR2x6TkM1blpYUlNaWE52ZFhKalpTaGpiMlJsTENCdWN5d2djRzl6YzJsaWJHVkxaWGtzSUc5d2RHbHZibk1wTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQjlLVHRjYmx4dUlDQWdJSEpsZEhWeWJpQjdJSEpsY3pvZ1ptOTFibVFzSUhWelpXUkxaWGs2SUhWelpXUkxaWGtnZlR0Y2JpQWdmVHRjYmx4dUlDQlVjbUZ1YzJ4aGRHOXlMbkJ5YjNSdmRIbHdaUzVwYzFaaGJHbGtURzl2YTNWd0lEMGdablZ1WTNScGIyNGdhWE5XWVd4cFpFeHZiMnQxY0NoeVpYTXBJSHRjYmlBZ0lDQnlaWFIxY200Z2NtVnpJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdJU2doZEdocGN5NXZjSFJwYjI1ekxuSmxkSFZ5Yms1MWJHd2dKaVlnY21WeklEMDlQU0J1ZFd4c0tTQW1KaUFoS0NGMGFHbHpMbTl3ZEdsdmJuTXVjbVYwZFhKdVJXMXdkSGxUZEhKcGJtY2dKaVlnY21WeklEMDlQU0FuSnlrN1hHNGdJSDA3WEc1Y2JpQWdWSEpoYm5Oc1lYUnZjaTV3Y205MGIzUjVjR1V1WjJWMFVtVnpiM1Z5WTJVZ1BTQm1kVzVqZEdsdmJpQm5aWFJTWlhOdmRYSmpaU2hqYjJSbExDQnVjeXdnYTJWNUtTQjdYRzRnSUNBZ2RtRnlJRzl3ZEdsdmJuTWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTXlBbUppQmhjbWQxYldWdWRITmJNMTBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXN6WFNBNklIdDlPMXh1WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE11Y21WemIzVnlZMlZUZEc5eVpTNW5aWFJTWlhOdmRYSmpaU2hqYjJSbExDQnVjeXdnYTJWNUxDQnZjSFJwYjI1ektUdGNiaUFnZlR0Y2JseHVJQ0J5WlhSMWNtNGdWSEpoYm5Oc1lYUnZjanRjYm4wb1gwVjJaVzUwUlcxcGRIUmxjak11WkdWbVlYVnNkQ2s3WEc1Y2JtVjRjRzl5ZEhNdVpHVm1ZWFZzZENBOUlGUnlZVzV6YkdGMGIzSTdJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzVQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb1pYaHdiM0owY3l3Z1hDSmZYMlZ6VFc5a2RXeGxYQ0lzSUh0Y2JpQWdkbUZzZFdVNklIUnlkV1ZjYm4wcE8xeHVaWGh3YjNKMGN5NTBjbUZ1YzJadmNtMVBjSFJwYjI1eklEMGdkSEpoYm5ObWIzSnRUM0IwYVc5dWN6dGNibVoxYm1OMGFXOXVJR2RsZENncElIdGNiaUFnY21WMGRYSnVJSHRjYmlBZ0lDQmtaV0oxWnpvZ1ptRnNjMlVzWEc0Z0lDQWdhVzVwZEVsdGJXVmthV0YwWlRvZ2RISjFaU3hjYmx4dUlDQWdJRzV6T2lCYkozUnlZVzV6YkdGMGFXOXVKMTBzWEc0Z0lDQWdaR1ZtWVhWc2RFNVRPaUJiSjNSeVlXNXpiR0YwYVc5dUoxMHNYRzRnSUNBZ1ptRnNiR0poWTJ0TWJtYzZJRnNuWkdWMkoxMHNYRzRnSUNBZ1ptRnNiR0poWTJ0T1V6b2dabUZzYzJVc0lDOHZJSE4wY21sdVp5QnZjaUJoY25KaGVTQnZaaUJ1WVcxbGMzQmhZMlZ6WEc1Y2JpQWdJQ0IzYUdsMFpXeHBjM1E2SUdaaGJITmxMQ0F2THlCaGNuSmhlU0IzYVhSb0lIZG9hWFJsYkdsemRHVmtJR3hoYm1kMVlXZGxjMXh1SUNBZ0lHNXZia1Y0Y0d4cFkybDBWMmhwZEdWc2FYTjBPaUJtWVd4elpTeGNiaUFnSUNCc2IyRmtPaUFuWVd4c0p5d2dMeThnZkNCamRYSnlaVzUwVDI1c2VTQjhJR3hoYm1kMVlXZGxUMjVzZVZ4dUlDQWdJSEJ5Wld4dllXUTZJR1poYkhObExDQXZMeUJoY25KaGVTQjNhWFJvSUhCeVpXeHZZV1FnYkdGdVozVmhaMlZ6WEc1Y2JpQWdJQ0J6YVcxd2JHbG1lVkJzZFhKaGJGTjFabVpwZURvZ2RISjFaU3hjYmlBZ0lDQnJaWGxUWlhCaGNtRjBiM0k2SUNjdUp5eGNiaUFnSUNCdWMxTmxjR0Z5WVhSdmNqb2dKem9uTEZ4dUlDQWdJSEJzZFhKaGJGTmxjR0Z5WVhSdmNqb2dKMThuTEZ4dUlDQWdJR052Ym5SbGVIUlRaWEJoY21GMGIzSTZJQ2RmSnl4Y2JseHVJQ0FnSUhOaGRtVk5hWE56YVc1bk9pQm1ZV3h6WlN3Z0x5OGdaVzVoWW14bElIUnZJSE5sYm1RZ2JXbHpjMmx1WnlCMllXeDFaWE5jYmlBZ0lDQjFjR1JoZEdWTmFYTnphVzVuT2lCbVlXeHpaU3dnTHk4Z1pXNWhZbXhsSUhSdklIVndaR0YwWlNCa1pXWmhkV3gwSUhaaGJIVmxjeUJwWmlCa2FXWm1aWEpsYm5RZ1puSnZiU0IwY21GdWMyeGhkR1ZrSUhaaGJIVmxJQ2h2Ym14NUlIVnpaV1oxYkNCdmJpQnBibWwwYVdGc0lHUmxkbVZzYjNCdFpXNTBMQ0J2Y2lCM2FHVnVJR3RsWlhCcGJtY2dZMjlrWlNCaGN5QnpiM1Z5WTJVZ2IyWWdkSEoxZEdncFhHNGdJQ0FnYzJGMlpVMXBjM05wYm1kVWJ6b2dKMlpoYkd4aVlXTnJKeXdnTHk4Z0oyTjFjbkpsYm5RbklIeDhJQ2RoYkd3blhHNGdJQ0FnYzJGMlpVMXBjM05wYm1kUWJIVnlZV3h6T2lCMGNuVmxMQ0F2THlCM2FXeHNJSE5oZG1VZ1lXeHNJR1p2Y20xeklHNXZkQ0J2Ym14NUlITnBibWQxYkdGeUlHdGxlVnh1SUNBZ0lHMXBjM05wYm1kTFpYbElZVzVrYkdWeU9pQm1ZV3h6WlN3Z0x5OGdablZ1WTNScGIyNG9iRzVuTENCdWN5d2dhMlY1TENCbVlXeHNZbUZqYTFaaGJIVmxLU0F0UGlCdmRtVnljbWxrWlNCcFppQndjbVZtWlhJZ2IyNGdhR0Z1Wkd4cGJtZGNibHh1SUNBZ0lIQnZjM1JRY205alpYTnpPaUJtWVd4elpTd2dMeThnYzNSeWFXNW5JRzl5SUdGeWNtRjVJRzltSUhCdmMzUlFjbTlqWlhOemIzSWdibUZ0WlhOY2JpQWdJQ0J5WlhSMWNtNU9kV3hzT2lCMGNuVmxMQ0F2THlCaGJHeHZkM01nYm5Wc2JDQjJZV3gxWlNCaGN5QjJZV3hwWkNCMGNtRnVjMnhoZEdsdmJseHVJQ0FnSUhKbGRIVnlia1Z0Y0hSNVUzUnlhVzVuT2lCMGNuVmxMQ0F2THlCaGJHeHZkM01nWlcxd2RIa2djM1J5YVc1bklIWmhiSFZsSUdGeklIWmhiR2xrSUhSeVlXNXpiR0YwYVc5dVhHNGdJQ0FnY21WMGRYSnVUMkpxWldOMGN6b2dabUZzYzJVc1hHNGdJQ0FnYW05cGJrRnljbUY1Y3pvZ1ptRnNjMlVzSUM4dklHOXlJSE4wY21sdVp5QjBieUJxYjJsdUlHRnljbUY1WEc0Z0lDQWdjbVYwZFhKdVpXUlBZbXBsWTNSSVlXNWtiR1Z5T2lCbWRXNWpkR2x2YmlCeVpYUjFjbTVsWkU5aWFtVmpkRWhoYm1Sc1pYSW9LU0I3ZlN3Z0x5OGdablZ1WTNScGIyNG9hMlY1TENCMllXeDFaU3dnYjNCMGFXOXVjeWtnZEhKcFoyZGxjbVZrSUdsbUlHdGxlU0J5WlhSMWNtNXpJRzlpYW1WamRDQmlkWFFnY21WMGRYSnVUMkpxWldOMGN5QnBjeUJ6WlhRZ2RHOGdabUZzYzJWY2JpQWdJQ0J3WVhKelpVMXBjM05wYm1kTFpYbElZVzVrYkdWeU9pQm1ZV3h6WlN3Z0x5OGdablZ1WTNScGIyNG9hMlY1S1NCd1lYSnpaV1FnWVNCclpYa2dkR2hoZENCM1lYTWdibTkwSUdadmRXNWtJR2x1SUhRb0tTQmlaV1p2Y21VZ2NtVjBkWEp1YVc1blhHNGdJQ0FnWVhCd1pXNWtUbUZ0WlhOd1lXTmxWRzlOYVhOemFXNW5TMlY1T2lCbVlXeHpaU3hjYmlBZ0lDQmhjSEJsYm1ST1lXMWxjM0JoWTJWVWIwTkpUVzlrWlRvZ1ptRnNjMlVzWEc0Z0lDQWdiM1psY214dllXUlVjbUZ1YzJ4aGRHbHZiazl3ZEdsdmJraGhibVJzWlhJNklHWjFibU4wYVc5dUlHaGhibVJzWlNoaGNtZHpLU0I3WEc0Z0lDQWdJQ0IyWVhJZ2NtVjBJRDBnZTMwN1hHNGdJQ0FnSUNCcFppQW9ZWEpuYzFzeFhTa2djbVYwTG1SbFptRjFiSFJXWVd4MVpTQTlJR0Z5WjNOYk1WMDdYRzRnSUNBZ0lDQnBaaUFvWVhKbmMxc3lYU2tnY21WMExuUkVaWE5qY21sd2RHbHZiaUE5SUdGeVozTmJNbDA3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdjbVYwTzF4dUlDQWdJSDBzWEc1Y2JpQWdJQ0JwYm5SbGNuQnZiR0YwYVc5dU9pQjdYRzRnSUNBZ0lDQmxjMk5oY0dWV1lXeDFaVG9nZEhKMVpTeGNiaUFnSUNBZ0lHWnZjbTFoZERvZ1puVnVZM1JwYjI0Z1ptOXliV0YwS0haaGJIVmxMQ0JmWm05eWJXRjBMQ0JzYm1jcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIWmhiSFZsTzF4dUlDQWdJQ0FnZlN4Y2JpQWdJQ0FnSUhCeVpXWnBlRG9nSjN0N0p5eGNiaUFnSUNBZ0lITjFabVpwZURvZ0ozMTlKeXhjYmlBZ0lDQWdJR1p2Y20xaGRGTmxjR0Z5WVhSdmNqb2dKeXduTEZ4dUlDQWdJQ0FnTHk4Z2NISmxabWw0UlhOallYQmxaRG9nSjN0N0p5eGNiaUFnSUNBZ0lDOHZJSE4xWm1acGVFVnpZMkZ3WldRNklDZDlmU2NzWEc0Z0lDQWdJQ0F2THlCMWJtVnpZMkZ3WlZOMVptWnBlRG9nSnljc1hHNGdJQ0FnSUNCMWJtVnpZMkZ3WlZCeVpXWnBlRG9nSnkwbkxGeHVYRzRnSUNBZ0lDQnVaWE4wYVc1blVISmxabWw0T2lBbkpIUW9KeXhjYmlBZ0lDQWdJRzVsYzNScGJtZFRkV1ptYVhnNklDY3BKeXhjYmlBZ0lDQWdJQzh2SUc1bGMzUnBibWRRY21WbWFYaEZjMk5oY0dWa09pQW5KSFFvSnl4Y2JpQWdJQ0FnSUM4dklHNWxjM1JwYm1kVGRXWm1hWGhGYzJOaGNHVmtPaUFuS1Njc1hHNGdJQ0FnSUNBdkx5QmtaV1poZFd4MFZtRnlhV0ZpYkdWek9pQjFibVJsWm1sdVpXUWdMeThnYjJKcVpXTjBJSFJvWVhRZ1kyRnVJR2hoZG1VZ2RtRnNkV1Z6SUhSdklHbHVkR1Z5Y0c5c1lYUmxJRzl1SUMwZ1pYaDBaVzVrY3lCd1lYTnpaV1FnYVc0Z2FXNTBaWEp3YjJ4aGRHbHZiaUJrWVhSaFhHNGdJQ0FnSUNCdFlYaFNaWEJzWVdObGN6b2dNVEF3TUNBdkx5QnRZWGdnY21Wd2JHRmpaWE1nZEc4Z2NISmxkbVZ1ZENCbGJtUnNaWE56SUd4dmIzQmNiaUFnSUNCOVhHNGdJSDA3WEc1OVhHNWNiaThxSUdWemJHbHVkQ0J1Ynkxd1lYSmhiUzF5WldGemMybG5iam9nTUNBcUwxeHVaWGh3YjNKMGN5NW5aWFFnUFNCblpYUTdYRzVtZFc1amRHbHZiaUIwY21GdWMyWnZjbTFQY0hScGIyNXpLRzl3ZEdsdmJuTXBJSHRjYmlBZ0x5OGdZM0psWVhSbElHNWhiV1Z6Y0dGalpTQnZZbXBsWTNRZ2FXWWdibUZ0WlhOd1lXTmxJR2x6SUhCaGMzTmxaQ0JwYmlCaGN5QnpkSEpwYm1kY2JpQWdhV1lnS0hSNWNHVnZaaUJ2Y0hScGIyNXpMbTV6SUQwOVBTQW5jM1J5YVc1bkp5a2diM0IwYVc5dWN5NXVjeUE5SUZ0dmNIUnBiMjV6TG01elhUdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCdmNIUnBiMjV6TG1aaGJHeGlZV05yVEc1bklEMDlQU0FuYzNSeWFXNW5KeWtnYjNCMGFXOXVjeTVtWVd4c1ltRmphMHh1WnlBOUlGdHZjSFJwYjI1ekxtWmhiR3hpWVdOclRHNW5YVHRjYmlBZ2FXWWdLSFI1Y0dWdlppQnZjSFJwYjI1ekxtWmhiR3hpWVdOclRsTWdQVDA5SUNkemRISnBibWNuS1NCdmNIUnBiMjV6TG1aaGJHeGlZV05yVGxNZ1BTQmJiM0IwYVc5dWN5NW1ZV3hzWW1GamEwNVRYVHRjYmx4dUlDQXZMeUJsZUhSbGJtUWdkMmhwZEdWc2FYTjBJSGRwZEdnZ1kybHRiMlJsWEc0Z0lHbG1JQ2h2Y0hScGIyNXpMbmRvYVhSbGJHbHpkQ0FtSmlCdmNIUnBiMjV6TG5kb2FYUmxiR2x6ZEM1cGJtUmxlRTltS0NkamFXMXZaR1VuS1NBOElEQXBJRzl3ZEdsdmJuTXVkMmhwZEdWc2FYTjBMbkIxYzJnb0oyTnBiVzlrWlNjcE8xeHVYRzRnSUhKbGRIVnliaUJ2Y0hScGIyNXpPMXh1ZlNJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRndpWDE5bGMwMXZaSFZzWlZ3aUxDQjdYRzRnSUhaaGJIVmxPaUIwY25WbFhHNTlLVHRjYmx4dWRtRnlJRjkwZVhCbGIyWWdQU0IwZVhCbGIyWWdVM2x0WW05c0lEMDlQU0JjSW1aMWJtTjBhVzl1WENJZ0ppWWdkSGx3Wlc5bUlGTjViV0p2YkM1cGRHVnlZWFJ2Y2lBOVBUMGdYQ0p6ZVcxaWIyeGNJaUEvSUdaMWJtTjBhVzl1SUNodlltb3BJSHNnY21WMGRYSnVJSFI1Y0dWdlppQnZZbW83SUgwZ09pQm1kVzVqZEdsdmJpQW9iMkpxS1NCN0lISmxkSFZ5YmlCdlltb2dKaVlnZEhsd1pXOW1JRk41YldKdmJDQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUlDWW1JRzlpYWk1amIyNXpkSEoxWTNSdmNpQTlQVDBnVTNsdFltOXNJQ1ltSUc5aWFpQWhQVDBnVTNsdFltOXNMbkJ5YjNSdmRIbHdaU0EvSUZ3aWMzbHRZbTlzWENJZ09pQjBlWEJsYjJZZ2IySnFPeUI5TzF4dVhHNTJZWElnWDJWNGRHVnVaSE1nUFNCUFltcGxZM1F1WVhOemFXZHVJSHg4SUdaMWJtTjBhVzl1SUNoMFlYSm5aWFFwSUhzZ1ptOXlJQ2gyWVhJZ2FTQTlJREU3SUdrZ1BDQmhjbWQxYldWdWRITXViR1Z1WjNSb095QnBLeXNwSUhzZ2RtRnlJSE52ZFhKalpTQTlJR0Z5WjNWdFpXNTBjMXRwWFRzZ1ptOXlJQ2gyWVhJZ2EyVjVJR2x1SUhOdmRYSmpaU2tnZXlCcFppQW9UMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLSE52ZFhKalpTd2dhMlY1S1NrZ2V5QjBZWEpuWlhSYmEyVjVYU0E5SUhOdmRYSmpaVnRyWlhsZE95QjlJSDBnZlNCeVpYUjFjbTRnZEdGeVoyVjBPeUI5TzF4dVhHNTJZWElnWDJ4dloyZGxjaUE5SUhKbGNYVnBjbVVvSnk0dmJHOW5aMlZ5TG1wekp5azdYRzVjYm5aaGNpQmZiRzluWjJWeU1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gyeHZaMmRsY2lrN1hHNWNiblpoY2lCZlJYWmxiblJGYldsMGRHVnlNaUE5SUhKbGNYVnBjbVVvSnk0dlJYWmxiblJGYldsMGRHVnlMbXB6SnlrN1hHNWNiblpoY2lCZlJYWmxiblJGYldsMGRHVnlNeUE5SUY5cGJuUmxjbTl3VW1WeGRXbHlaVVJsWm1GMWJIUW9YMFYyWlc1MFJXMXBkSFJsY2pJcE8xeHVYRzUyWVhJZ1gxSmxjMjkxY21ObFUzUnZjbVVnUFNCeVpYRjFhWEpsS0NjdUwxSmxjMjkxY21ObFUzUnZjbVV1YW5NbktUdGNibHh1ZG1GeUlGOVNaWE52ZFhKalpWTjBiM0psTWlBOUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvWDFKbGMyOTFjbU5sVTNSdmNtVXBPMXh1WEc1MllYSWdYMVJ5WVc1emJHRjBiM0lnUFNCeVpYRjFhWEpsS0NjdUwxUnlZVzV6YkdGMGIzSXVhbk1uS1R0Y2JseHVkbUZ5SUY5VWNtRnVjMnhoZEc5eU1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gxUnlZVzV6YkdGMGIzSXBPMXh1WEc1MllYSWdYMHhoYm1kMVlXZGxWWFJwYkhNZ1BTQnlaWEYxYVhKbEtDY3VMMHhoYm1kMVlXZGxWWFJwYkhNdWFuTW5LVHRjYmx4dWRtRnlJRjlNWVc1bmRXRm5aVlYwYVd4ek1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gweGhibWQxWVdkbFZYUnBiSE1wTzF4dVhHNTJZWElnWDFCc2RYSmhiRkpsYzI5c2RtVnlJRDBnY21WeGRXbHlaU2duTGk5UWJIVnlZV3hTWlhOdmJIWmxjaTVxY3ljcE8xeHVYRzUyWVhJZ1gxQnNkWEpoYkZKbGMyOXNkbVZ5TWlBOUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvWDFCc2RYSmhiRkpsYzI5c2RtVnlLVHRjYmx4dWRtRnlJRjlKYm5SbGNuQnZiR0YwYjNJZ1BTQnlaWEYxYVhKbEtDY3VMMGx1ZEdWeWNHOXNZWFJ2Y2k1cWN5Y3BPMXh1WEc1MllYSWdYMGx1ZEdWeWNHOXNZWFJ2Y2pJZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5SmJuUmxjbkJ2YkdGMGIzSXBPMXh1WEc1MllYSWdYMEpoWTJ0bGJtUkRiMjV1WldOMGIzSWdQU0J5WlhGMWFYSmxLQ2N1TDBKaFkydGxibVJEYjI1dVpXTjBiM0l1YW5NbktUdGNibHh1ZG1GeUlGOUNZV05yWlc1a1EyOXVibVZqZEc5eU1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gwSmhZMnRsYm1SRGIyNXVaV04wYjNJcE8xeHVYRzUyWVhJZ1gwTmhZMmhsUTI5dWJtVmpkRzl5SUQwZ2NtVnhkV2x5WlNnbkxpOURZV05vWlVOdmJtNWxZM1J2Y2k1cWN5Y3BPMXh1WEc1MllYSWdYME5oWTJobFEyOXVibVZqZEc5eU1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gwTmhZMmhsUTI5dWJtVmpkRzl5S1R0Y2JseHVkbUZ5SUY5a1pXWmhkV3gwY3pJZ1BTQnlaWEYxYVhKbEtDY3VMMlJsWm1GMWJIUnpMbXB6SnlrN1hHNWNiblpoY2lCZmNHOXpkRkJ5YjJObGMzTnZjaUE5SUhKbGNYVnBjbVVvSnk0dmNHOXpkRkJ5YjJObGMzTnZjaTVxY3ljcE8xeHVYRzUyWVhJZ1gzQnZjM1JRY205alpYTnpiM0l5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmY0c5emRGQnliMk5sYzNOdmNpazdYRzVjYm1aMWJtTjBhVzl1SUY5cGJuUmxjbTl3VW1WeGRXbHlaVVJsWm1GMWJIUW9iMkpxS1NCN0lISmxkSFZ5YmlCdlltb2dKaVlnYjJKcUxsOWZaWE5OYjJSMWJHVWdQeUJ2WW1vZ09pQjdJR1JsWm1GMWJIUTZJRzlpYWlCOU95QjlYRzVjYm1aMWJtTjBhVzl1SUY5a1pXWmhkV3gwY3lodlltb3NJR1JsWm1GMWJIUnpLU0I3SUhaaGNpQnJaWGx6SUQwZ1QySnFaV04wTG1kbGRFOTNibEJ5YjNCbGNuUjVUbUZ0WlhNb1pHVm1ZWFZzZEhNcE95Qm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR3RsZVhNdWJHVnVaM1JvT3lCcEt5c3BJSHNnZG1GeUlHdGxlU0E5SUd0bGVYTmJhVjA3SUhaaGNpQjJZV3gxWlNBOUlFOWlhbVZqZEM1blpYUlBkMjVRY205d1pYSjBlVVJsYzJOeWFYQjBiM0lvWkdWbVlYVnNkSE1zSUd0bGVTazdJR2xtSUNoMllXeDFaU0FtSmlCMllXeDFaUzVqYjI1bWFXZDFjbUZpYkdVZ0ppWWdiMkpxVzJ0bGVWMGdQVDA5SUhWdVpHVm1hVzVsWkNrZ2V5QlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvYjJKcUxDQnJaWGtzSUhaaGJIVmxLVHNnZlNCOUlISmxkSFZ5YmlCdlltbzdJSDFjYmx4dVpuVnVZM1JwYjI0Z1gyTnNZWE56UTJGc2JFTm9aV05yS0dsdWMzUmhibU5sTENCRGIyNXpkSEoxWTNSdmNpa2dleUJwWmlBb0lTaHBibk4wWVc1alpTQnBibk4wWVc1alpXOW1JRU52Ym5OMGNuVmpkRzl5S1NrZ2V5QjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLRndpUTJGdWJtOTBJR05oYkd3Z1lTQmpiR0Z6Y3lCaGN5QmhJR1oxYm1OMGFXOXVYQ0lwT3lCOUlIMWNibHh1Wm5WdVkzUnBiMjRnWDNCdmMzTnBZbXhsUTI5dWMzUnlkV04wYjNKU1pYUjFjbTRvYzJWc1ppd2dZMkZzYkNrZ2V5QnBaaUFvSVhObGJHWXBJSHNnZEdoeWIzY2dibVYzSUZKbFptVnlaVzVqWlVWeWNtOXlLRndpZEdocGN5Qm9ZWE51SjNRZ1ltVmxiaUJwYm1sMGFXRnNhWE5sWkNBdElITjFjR1Z5S0NrZ2FHRnpiaWQwSUdKbFpXNGdZMkZzYkdWa1hDSXBPeUI5SUhKbGRIVnliaUJqWVd4c0lDWW1JQ2gwZVhCbGIyWWdZMkZzYkNBOVBUMGdYQ0p2WW1wbFkzUmNJaUI4ZkNCMGVYQmxiMllnWTJGc2JDQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUtTQS9JR05oYkd3Z09pQnpaV3htT3lCOVhHNWNibVoxYm1OMGFXOXVJRjlwYm1obGNtbDBjeWh6ZFdKRGJHRnpjeXdnYzNWd1pYSkRiR0Z6Y3lrZ2V5QnBaaUFvZEhsd1pXOW1JSE4xY0dWeVEyeGhjM01nSVQwOUlGd2lablZ1WTNScGIyNWNJaUFtSmlCemRYQmxja05zWVhOeklDRTlQU0J1ZFd4c0tTQjdJSFJvY205M0lHNWxkeUJVZVhCbFJYSnliM0lvWENKVGRYQmxjaUJsZUhCeVpYTnphVzl1SUcxMWMzUWdaV2wwYUdWeUlHSmxJRzUxYkd3Z2IzSWdZU0JtZFc1amRHbHZiaXdnYm05MElGd2lJQ3NnZEhsd1pXOW1JSE4xY0dWeVEyeGhjM01wT3lCOUlITjFZa05zWVhOekxuQnliM1J2ZEhsd1pTQTlJRTlpYW1WamRDNWpjbVZoZEdVb2MzVndaWEpEYkdGemN5QW1KaUJ6ZFhCbGNrTnNZWE56TG5CeWIzUnZkSGx3WlN3Z2V5QmpiMjV6ZEhKMVkzUnZjam9nZXlCMllXeDFaVG9nYzNWaVEyeGhjM01zSUdWdWRXMWxjbUZpYkdVNklHWmhiSE5sTENCM2NtbDBZV0pzWlRvZ2RISjFaU3dnWTI5dVptbG5kWEpoWW14bE9pQjBjblZsSUgwZ2ZTazdJR2xtSUNoemRYQmxja05zWVhOektTQlBZbXBsWTNRdWMyVjBVSEp2ZEc5MGVYQmxUMllnUHlCUFltcGxZM1F1YzJWMFVISnZkRzkwZVhCbFQyWW9jM1ZpUTJ4aGMzTXNJSE4xY0dWeVEyeGhjM01wSURvZ1gyUmxabUYxYkhSektITjFZa05zWVhOekxDQnpkWEJsY2tOc1lYTnpLVHNnZlZ4dVhHNW1kVzVqZEdsdmJpQnViMjl3S0NrZ2UzMWNibHh1ZG1GeUlFa3hPRzRnUFNCbWRXNWpkR2x2YmlBb1gwVjJaVzUwUlcxcGRIUmxjaWtnZTF4dUlDQmZhVzVvWlhKcGRITW9TVEU0Yml3Z1gwVjJaVzUwUlcxcGRIUmxjaWs3WEc1Y2JpQWdablZ1WTNScGIyNGdTVEU0YmlncElIdGNiaUFnSUNCMllYSWdiM0IwYVc5dWN5QTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQaUF3SUNZbUlHRnlaM1Z0Wlc1MGMxc3dYU0FoUFQwZ2RXNWtaV1pwYm1Wa0lEOGdZWEpuZFcxbGJuUnpXekJkSURvZ2UzMDdYRzRnSUNBZ2RtRnlJR05oYkd4aVlXTnJJRDBnWVhKbmRXMWxiblJ6V3pGZE8xeHVYRzRnSUNBZ1gyTnNZWE56UTJGc2JFTm9aV05yS0hSb2FYTXNJRWt4T0c0cE8xeHVYRzRnSUNBZ2RtRnlJRjkwYUdseklEMGdYM0J2YzNOcFlteGxRMjl1YzNSeWRXTjBiM0pTWlhSMWNtNG9kR2hwY3l3Z1gwVjJaVzUwUlcxcGRIUmxjaTVqWVd4c0tIUm9hWE1wS1R0Y2JseHVJQ0FnSUY5MGFHbHpMbTl3ZEdsdmJuTWdQU0FvTUN3Z1gyUmxabUYxYkhSek1pNTBjbUZ1YzJadmNtMVBjSFJwYjI1ektTaHZjSFJwYjI1ektUdGNiaUFnSUNCZmRHaHBjeTV6WlhKMmFXTmxjeUE5SUh0OU8xeHVJQ0FnSUY5MGFHbHpMbXh2WjJkbGNpQTlJRjlzYjJkblpYSXlMbVJsWm1GMWJIUTdYRzRnSUNBZ1gzUm9hWE11Ylc5a2RXeGxjeUE5SUhzZ1pYaDBaWEp1WVd3NklGdGRJSDA3WEc1Y2JpQWdJQ0JwWmlBb1kyRnNiR0poWTJzZ0ppWWdJVjkwYUdsekxtbHpTVzVwZEdsaGJHbDZaV1FnSmlZZ0lXOXdkR2x2Ym5NdWFYTkRiRzl1WlNrZ2UxeHVJQ0FnSUNBZ2RtRnlJRjl5WlhRN1hHNWNiaUFnSUNBZ0lDOHZJR2gwZEhCek9pOHZaMmwwYUhWaUxtTnZiUzlwTVRodVpYaDBMMmt4T0c1bGVIUXZhWE56ZFdWekx6ZzNPVnh1SUNBZ0lDQWdhV1lnS0NGZmRHaHBjeTV2Y0hScGIyNXpMbWx1YVhSSmJXMWxaR2xoZEdVcElISmxkSFZ5YmlCZmNtVjBJRDBnWDNSb2FYTXVhVzVwZENodmNIUnBiMjV6TENCallXeHNZbUZqYXlrc0lGOXdiM056YVdKc1pVTnZibk4wY25WamRHOXlVbVYwZFhKdUtGOTBhR2x6TENCZmNtVjBLVHRjYmlBZ0lDQWdJSE5sZEZScGJXVnZkWFFvWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUNBZ0lDQmZkR2hwY3k1cGJtbDBLRzl3ZEdsdmJuTXNJR05oYkd4aVlXTnJLVHRjYmlBZ0lDQWdJSDBzSURBcE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdYM1JvYVhNN1hHNGdJSDFjYmx4dUlDQkpNVGh1TG5CeWIzUnZkSGx3WlM1cGJtbDBJRDBnWm5WdVkzUnBiMjRnYVc1cGRDZ3BJSHRjYmlBZ0lDQjJZWElnWDNSb2FYTXlJRDBnZEdocGN6dGNibHh1SUNBZ0lIWmhjaUJ2Y0hScGIyNXpJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURBZ0ppWWdZWEpuZFcxbGJuUnpXekJkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTUYwZ09pQjdmVHRjYmlBZ0lDQjJZWElnWTJGc2JHSmhZMnNnUFNCaGNtZDFiV1Z1ZEhOYk1WMDdYRzVjYmlBZ0lDQnBaaUFvZEhsd1pXOW1JRzl3ZEdsdmJuTWdQVDA5SUNkbWRXNWpkR2x2YmljcElIdGNiaUFnSUNBZ0lHTmhiR3hpWVdOcklEMGdiM0IwYVc5dWN6dGNiaUFnSUNBZ0lHOXdkR2x2Ym5NZ1BTQjdmVHRjYmlBZ0lDQjlYRzRnSUNBZ2RHaHBjeTV2Y0hScGIyNXpJRDBnWDJWNGRHVnVaSE1vZTMwc0lDZ3dMQ0JmWkdWbVlYVnNkSE15TG1kbGRDa29LU3dnZEdocGN5NXZjSFJwYjI1ekxDQW9NQ3dnWDJSbFptRjFiSFJ6TWk1MGNtRnVjMlp2Y20xUGNIUnBiMjV6S1NodmNIUnBiMjV6S1NrN1hHNWNiaUFnSUNCMGFHbHpMbVp2Y20xaGRDQTlJSFJvYVhNdWIzQjBhVzl1Y3k1cGJuUmxjbkJ2YkdGMGFXOXVMbVp2Y20xaGREdGNiaUFnSUNCcFppQW9JV05oYkd4aVlXTnJLU0JqWVd4c1ltRmpheUE5SUc1dmIzQTdYRzVjYmlBZ0lDQm1kVzVqZEdsdmJpQmpjbVZoZEdWRGJHRnpjMDl1UkdWdFlXNWtLRU5zWVhOelQzSlBZbXBsWTNRcElIdGNiaUFnSUNBZ0lHbG1JQ2doUTJ4aGMzTlBjazlpYW1WamRDa2djbVYwZFhKdUlHNTFiR3c3WEc0Z0lDQWdJQ0JwWmlBb2RIbHdaVzltSUVOc1lYTnpUM0pQWW1wbFkzUWdQVDA5SUNkbWRXNWpkR2x2YmljcElISmxkSFZ5YmlCdVpYY2dRMnhoYzNOUGNrOWlhbVZqZENncE8xeHVJQ0FnSUNBZ2NtVjBkWEp1SUVOc1lYTnpUM0pQWW1wbFkzUTdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdhVzVwZENCelpYSjJhV05sYzF4dUlDQWdJR2xtSUNnaGRHaHBjeTV2Y0hScGIyNXpMbWx6UTJ4dmJtVXBJSHRjYmlBZ0lDQWdJR2xtSUNoMGFHbHpMbTF2WkhWc1pYTXViRzluWjJWeUtTQjdYRzRnSUNBZ0lDQWdJRjlzYjJkblpYSXlMbVJsWm1GMWJIUXVhVzVwZENoamNtVmhkR1ZEYkdGemMwOXVSR1Z0WVc1a0tIUm9hWE11Ylc5a2RXeGxjeTVzYjJkblpYSXBMQ0IwYUdsekxtOXdkR2x2Ym5NcE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ1gyeHZaMmRsY2pJdVpHVm1ZWFZzZEM1cGJtbDBLRzUxYkd3c0lIUm9hWE11YjNCMGFXOXVjeWs3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUhaaGNpQnNkU0E5SUc1bGR5QmZUR0Z1WjNWaFoyVlZkR2xzY3pJdVpHVm1ZWFZzZENoMGFHbHpMbTl3ZEdsdmJuTXBPMXh1SUNBZ0lDQWdkR2hwY3k1emRHOXlaU0E5SUc1bGR5QmZVbVZ6YjNWeVkyVlRkRzl5WlRJdVpHVm1ZWFZzZENoMGFHbHpMbTl3ZEdsdmJuTXVjbVZ6YjNWeVkyVnpMQ0IwYUdsekxtOXdkR2x2Ym5NcE8xeHVYRzRnSUNBZ0lDQjJZWElnY3lBOUlIUm9hWE11YzJWeWRtbGpaWE03WEc0Z0lDQWdJQ0J6TG14dloyZGxjaUE5SUY5c2IyZG5aWEl5TG1SbFptRjFiSFE3WEc0Z0lDQWdJQ0J6TG5KbGMyOTFjbU5sVTNSdmNtVWdQU0IwYUdsekxuTjBiM0psTzF4dUlDQWdJQ0FnY3k1eVpYTnZkWEpqWlZOMGIzSmxMbTl1S0NkaFpHUmxaQ0J5WlcxdmRtVmtKeXdnWm5WdVkzUnBiMjRnS0d4dVp5d2dibk1wSUh0Y2JpQWdJQ0FnSUNBZ2N5NWpZV05vWlVOdmJtNWxZM1J2Y2k1ellYWmxLQ2s3WEc0Z0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUhNdWJHRnVaM1ZoWjJWVmRHbHNjeUE5SUd4MU8xeHVJQ0FnSUNBZ2N5NXdiSFZ5WVd4U1pYTnZiSFpsY2lBOUlHNWxkeUJmVUd4MWNtRnNVbVZ6YjJ4MlpYSXlMbVJsWm1GMWJIUW9iSFVzSUhzZ2NISmxjR1Z1WkRvZ2RHaHBjeTV2Y0hScGIyNXpMbkJzZFhKaGJGTmxjR0Z5WVhSdmNpd2dZMjl0Y0dGMGFXSnBiR2wwZVVwVFQwNDZJSFJvYVhNdWIzQjBhVzl1Y3k1amIyMXdZWFJwWW1sc2FYUjVTbE5QVGl3Z2MybHRjR3hwWm5sUWJIVnlZV3hUZFdabWFYZzZJSFJvYVhNdWIzQjBhVzl1Y3k1emFXMXdiR2xtZVZCc2RYSmhiRk4xWm1acGVDQjlLVHRjYmlBZ0lDQWdJSE11YVc1MFpYSndiMnhoZEc5eUlEMGdibVYzSUY5SmJuUmxjbkJ2YkdGMGIzSXlMbVJsWm1GMWJIUW9kR2hwY3k1dmNIUnBiMjV6S1R0Y2JseHVJQ0FnSUNBZ2N5NWlZV05yWlc1a1EyOXVibVZqZEc5eUlEMGdibVYzSUY5Q1lXTnJaVzVrUTI5dWJtVmpkRzl5TWk1a1pXWmhkV3gwS0dOeVpXRjBaVU5zWVhOelQyNUVaVzFoYm1Rb2RHaHBjeTV0YjJSMWJHVnpMbUpoWTJ0bGJtUXBMQ0J6TG5KbGMyOTFjbU5sVTNSdmNtVXNJSE1zSUhSb2FYTXViM0IwYVc5dWN5azdYRzRnSUNBZ0lDQXZMeUJ3YVhCbElHVjJaVzUwY3lCbWNtOXRJR0poWTJ0bGJtUkRiMjV1WldOMGIzSmNiaUFnSUNBZ0lITXVZbUZqYTJWdVpFTnZibTVsWTNSdmNpNXZiaWduS2ljc0lHWjFibU4wYVc5dUlDaGxkbVZ1ZENrZ2UxeHVJQ0FnSUNBZ0lDQm1iM0lnS0haaGNpQmZiR1Z1SUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUN3Z1lYSm5jeUE5SUVGeWNtRjVLRjlzWlc0Z1BpQXhJRDhnWDJ4bGJpQXRJREVnT2lBd0tTd2dYMnRsZVNBOUlERTdJRjlyWlhrZ1BDQmZiR1Z1T3lCZmEyVjVLeXNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQmhjbWR6VzE5clpYa2dMU0F4WFNBOUlHRnlaM1Z0Wlc1MGMxdGZhMlY1WFR0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJRjkwYUdsek1pNWxiV2wwTG1Gd2NHeDVLRjkwYUdsek1pd2dXMlYyWlc1MFhTNWpiMjVqWVhRb1lYSm5jeWtwTzF4dUlDQWdJQ0FnZlNrN1hHNWNiaUFnSUNBZ0lITXVZbUZqYTJWdVpFTnZibTVsWTNSdmNpNXZiaWduYkc5aFpHVmtKeXdnWm5WdVkzUnBiMjRnS0d4dllXUmxaQ2tnZTF4dUlDQWdJQ0FnSUNCekxtTmhZMmhsUTI5dWJtVmpkRzl5TG5OaGRtVW9LVHRjYmlBZ0lDQWdJSDBwTzF4dVhHNGdJQ0FnSUNCekxtTmhZMmhsUTI5dWJtVmpkRzl5SUQwZ2JtVjNJRjlEWVdOb1pVTnZibTVsWTNSdmNqSXVaR1ZtWVhWc2RDaGpjbVZoZEdWRGJHRnpjMDl1UkdWdFlXNWtLSFJvYVhNdWJXOWtkV3hsY3k1allXTm9aU2tzSUhNdWNtVnpiM1Z5WTJWVGRHOXlaU3dnY3l3Z2RHaHBjeTV2Y0hScGIyNXpLVHRjYmlBZ0lDQWdJQzh2SUhCcGNHVWdaWFpsYm5SeklHWnliMjBnWW1GamEyVnVaRU52Ym01bFkzUnZjbHh1SUNBZ0lDQWdjeTVqWVdOb1pVTnZibTVsWTNSdmNpNXZiaWduS2ljc0lHWjFibU4wYVc5dUlDaGxkbVZ1ZENrZ2UxeHVJQ0FnSUNBZ0lDQm1iM0lnS0haaGNpQmZiR1Z1TWlBOUlHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnc0lHRnlaM01nUFNCQmNuSmhlU2hmYkdWdU1pQStJREVnUHlCZmJHVnVNaUF0SURFZ09pQXdLU3dnWDJ0bGVUSWdQU0F4T3lCZmEyVjVNaUE4SUY5c1pXNHlPeUJmYTJWNU1pc3JLU0I3WEc0Z0lDQWdJQ0FnSUNBZ1lYSm5jMXRmYTJWNU1pQXRJREZkSUQwZ1lYSm5kVzFsYm5SelcxOXJaWGt5WFR0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJRjkwYUdsek1pNWxiV2wwTG1Gd2NHeDVLRjkwYUdsek1pd2dXMlYyWlc1MFhTNWpiMjVqWVhRb1lYSm5jeWtwTzF4dUlDQWdJQ0FnZlNrN1hHNWNiaUFnSUNBZ0lHbG1JQ2gwYUdsekxtMXZaSFZzWlhNdWJHRnVaM1ZoWjJWRVpYUmxZM1J2Y2lrZ2UxeHVJQ0FnSUNBZ0lDQnpMbXhoYm1kMVlXZGxSR1YwWldOMGIzSWdQU0JqY21WaGRHVkRiR0Z6YzA5dVJHVnRZVzVrS0hSb2FYTXViVzlrZFd4bGN5NXNZVzVuZFdGblpVUmxkR1ZqZEc5eUtUdGNiaUFnSUNBZ0lDQWdjeTVzWVc1bmRXRm5aVVJsZEdWamRHOXlMbWx1YVhRb2N5d2dkR2hwY3k1dmNIUnBiMjV6TG1SbGRHVmpkR2x2Yml3Z2RHaHBjeTV2Y0hScGIyNXpLVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnZEdocGN5NTBjbUZ1YzJ4aGRHOXlJRDBnYm1WM0lGOVVjbUZ1YzJ4aGRHOXlNaTVrWldaaGRXeDBLSFJvYVhNdWMyVnlkbWxqWlhNc0lIUm9hWE11YjNCMGFXOXVjeWs3WEc0Z0lDQWdJQ0F2THlCd2FYQmxJR1YyWlc1MGN5Qm1jbTl0SUhSeVlXNXpiR0YwYjNKY2JpQWdJQ0FnSUhSb2FYTXVkSEpoYm5Oc1lYUnZjaTV2YmlnbktpY3NJR1oxYm1OMGFXOXVJQ2hsZG1WdWRDa2dlMXh1SUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUJmYkdWdU15QTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ3NJR0Z5WjNNZ1BTQkJjbkpoZVNoZmJHVnVNeUErSURFZ1B5QmZiR1Z1TXlBdElERWdPaUF3S1N3Z1gydGxlVE1nUFNBeE95QmZhMlY1TXlBOElGOXNaVzR6T3lCZmEyVjVNeXNyS1NCN1hHNGdJQ0FnSUNBZ0lDQWdZWEpuYzF0ZmEyVjVNeUF0SURGZElEMGdZWEpuZFcxbGJuUnpXMTlyWlhrelhUdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUY5MGFHbHpNaTVsYldsMExtRndjR3g1S0Y5MGFHbHpNaXdnVzJWMlpXNTBYUzVqYjI1allYUW9ZWEpuY3lrcE8xeHVJQ0FnSUNBZ2ZTazdYRzVjYmlBZ0lDQWdJSFJvYVhNdWJXOWtkV3hsY3k1bGVIUmxjbTVoYkM1bWIzSkZZV05vS0daMWJtTjBhVzl1SUNodEtTQjdYRzRnSUNBZ0lDQWdJR2xtSUNodExtbHVhWFFwSUcwdWFXNXBkQ2hmZEdocGN6SXBPMXh1SUNBZ0lDQWdmU2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnWVhCd1pXNWtJR0Z3YVZ4dUlDQWdJSFpoY2lCemRHOXlaVUZ3YVNBOUlGc25aMlYwVW1WemIzVnlZMlVuTENBbllXUmtVbVZ6YjNWeVkyVW5MQ0FuWVdSa1VtVnpiM1Z5WTJWekp5d2dKMkZrWkZKbGMyOTFjbU5sUW5WdVpHeGxKeXdnSjNKbGJXOTJaVkpsYzI5MWNtTmxRblZ1Wkd4bEp5d2dKMmhoYzFKbGMyOTFjbU5sUW5WdVpHeGxKeXdnSjJkbGRGSmxjMjkxY21ObFFuVnVaR3hsSjEwN1hHNGdJQ0FnYzNSdmNtVkJjR2t1Wm05eVJXRmphQ2htZFc1amRHbHZiaUFvWm1OT1lXMWxLU0I3WEc0Z0lDQWdJQ0JmZEdocGN6SmJabU5PWVcxbFhTQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJRjl6ZEc5eVpUdGNibHh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdLRjl6ZEc5eVpTQTlJRjkwYUdsek1pNXpkRzl5WlNsYlptTk9ZVzFsWFM1aGNIQnNlU2hmYzNSdmNtVXNJR0Z5WjNWdFpXNTBjeWs3WEc0Z0lDQWdJQ0I5TzF4dUlDQWdJSDBwTzF4dVhHNGdJQ0FnZG1GeUlHeHZZV1FnUFNCbWRXNWpkR2x2YmlCc2IyRmtLQ2tnZTF4dUlDQWdJQ0FnWDNSb2FYTXlMbU5vWVc1blpVeGhibWQxWVdkbEtGOTBhR2x6TWk1dmNIUnBiMjV6TG14dVp5d2dablZ1WTNScGIyNGdLR1Z5Y2l3Z2RDa2dlMXh1SUNBZ0lDQWdJQ0JmZEdocGN6SXVhWE5KYm1sMGFXRnNhWHBsWkNBOUlIUnlkV1U3WEc0Z0lDQWdJQ0FnSUY5MGFHbHpNaTVzYjJkblpYSXViRzluS0NkcGJtbDBhV0ZzYVhwbFpDY3NJRjkwYUdsek1pNXZjSFJwYjI1ektUdGNiaUFnSUNBZ0lDQWdYM1JvYVhNeUxtVnRhWFFvSjJsdWFYUnBZV3hwZW1Wa0p5d2dYM1JvYVhNeUxtOXdkR2x2Ym5NcE8xeHVYRzRnSUNBZ0lDQWdJR05oYkd4aVlXTnJLR1Z5Y2l3Z2RDazdYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdhV1lnS0hSb2FYTXViM0IwYVc5dWN5NXlaWE52ZFhKalpYTWdmSHdnSVhSb2FYTXViM0IwYVc5dWN5NXBibWwwU1cxdFpXUnBZWFJsS1NCN1hHNGdJQ0FnSUNCc2IyRmtLQ2s3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lITmxkRlJwYldWdmRYUW9iRzloWkN3Z01DazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTTdYRzRnSUgwN1hHNWNiaUFnTHlvZ1pYTnNhVzUwSUdOdmJuTnBjM1JsYm5RdGNtVjBkWEp1T2lBd0lDb3ZYRzVjYmx4dUlDQkpNVGh1TG5CeWIzUnZkSGx3WlM1c2IyRmtVbVZ6YjNWeVkyVnpJRDBnWm5WdVkzUnBiMjRnYkc5aFpGSmxjMjkxY21ObGN5Z3BJSHRjYmlBZ0lDQjJZWElnWDNSb2FYTXpJRDBnZEdocGN6dGNibHh1SUNBZ0lIWmhjaUJqWVd4c1ltRmpheUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBd0lDWW1JR0Z5WjNWdFpXNTBjMXN3WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pCZElEb2dibTl2Y0R0Y2JseHVJQ0FnSUdsbUlDZ2hkR2hwY3k1dmNIUnBiMjV6TG5KbGMyOTFjbU5sY3lrZ2UxeHVJQ0FnSUNBZ2FXWWdLSFJvYVhNdWJHRnVaM1ZoWjJVZ0ppWWdkR2hwY3k1c1lXNW5kV0ZuWlM1MGIweHZkMlZ5UTJGelpTZ3BJRDA5UFNBblkybHRiMlJsSnlrZ2NtVjBkWEp1SUdOaGJHeGlZV05yS0NrN0lDOHZJR0YyYjJsa0lHeHZZV1JwYm1jZ2NtVnpiM1Z5WTJWeklHWnZjaUJqYVcxdlpHVmNibHh1SUNBZ0lDQWdkbUZ5SUhSdlRHOWhaQ0E5SUZ0ZE8xeHVYRzRnSUNBZ0lDQjJZWElnWVhCd1pXNWtJRDBnWm5WdVkzUnBiMjRnWVhCd1pXNWtLR3h1WnlrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvSVd4dVp5a2djbVYwZFhKdU8xeHVJQ0FnSUNBZ0lDQjJZWElnYkc1bmN5QTlJRjkwYUdsek15NXpaWEoyYVdObGN5NXNZVzVuZFdGblpWVjBhV3h6TG5SdlVtVnpiMngyWlVocFpYSmhjbU5vZVNoc2JtY3BPMXh1SUNBZ0lDQWdJQ0JzYm1kekxtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z0tHd3BJSHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9kRzlNYjJGa0xtbHVaR1Y0VDJZb2JDa2dQQ0F3S1NCMGIweHZZV1F1Y0hWemFDaHNLVHRjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNCOU8xeHVYRzRnSUNBZ0lDQnBaaUFvSVhSb2FYTXViR0Z1WjNWaFoyVXBJSHRjYmlBZ0lDQWdJQ0FnTHk4Z1lYUWdiR1ZoYzNRZ2JHOWhaQ0JtWVd4c1ltRmphM01nYVc0Z2RHaHBjeUJqWVhObFhHNGdJQ0FnSUNBZ0lIWmhjaUJtWVd4c1ltRmphM01nUFNCMGFHbHpMbk5sY25acFkyVnpMbXhoYm1kMVlXZGxWWFJwYkhNdVoyVjBSbUZzYkdKaFkydERiMlJsY3loMGFHbHpMbTl3ZEdsdmJuTXVabUZzYkdKaFkydE1ibWNwTzF4dUlDQWdJQ0FnSUNCbVlXeHNZbUZqYTNNdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlBb2JDa2dlMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJoY0hCbGJtUW9iQ2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ1lYQndaVzVrS0hSb2FYTXViR0Z1WjNWaFoyVXBPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0JwWmlBb2RHaHBjeTV2Y0hScGIyNXpMbkJ5Wld4dllXUXBJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXZjSFJwYjI1ekxuQnlaV3h2WVdRdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlBb2JDa2dlMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJoY0hCbGJtUW9iQ2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQjBhR2x6TG5ObGNuWnBZMlZ6TG1OaFkyaGxRMjl1Ym1WamRHOXlMbXh2WVdRb2RHOU1iMkZrTENCMGFHbHpMbTl3ZEdsdmJuTXVibk1zSUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNBZ0lDQWdYM1JvYVhNekxuTmxjblpwWTJWekxtSmhZMnRsYm1SRGIyNXVaV04wYjNJdWJHOWhaQ2gwYjB4dllXUXNJRjkwYUdsek15NXZjSFJwYjI1ekxtNXpMQ0JqWVd4c1ltRmpheWs3WEc0Z0lDQWdJQ0I5S1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdZMkZzYkdKaFkyc29iblZzYkNrN1hHNGdJQ0FnZlZ4dUlDQjlPMXh1WEc0Z0lFa3hPRzR1Y0hKdmRHOTBlWEJsTG5KbGJHOWhaRkpsYzI5MWNtTmxjeUE5SUdaMWJtTjBhVzl1SUhKbGJHOWhaRkpsYzI5MWNtTmxjeWhzYm1kekxDQnVjeWtnZTF4dUlDQWdJR2xtSUNnaGJHNW5jeWtnYkc1bmN5QTlJSFJvYVhNdWJHRnVaM1ZoWjJWek8xeHVJQ0FnSUdsbUlDZ2hibk1wSUc1eklEMGdkR2hwY3k1dmNIUnBiMjV6TG01ek8xeHVJQ0FnSUhSb2FYTXVjMlZ5ZG1salpYTXVZbUZqYTJWdVpFTnZibTVsWTNSdmNpNXlaV3h2WVdRb2JHNW5jeXdnYm5NcE8xeHVJQ0I5TzF4dVhHNGdJRWt4T0c0dWNISnZkRzkwZVhCbExuVnpaU0E5SUdaMWJtTjBhVzl1SUhWelpTaHRiMlIxYkdVcElIdGNiaUFnSUNCcFppQW9iVzlrZFd4bExuUjVjR1VnUFQwOUlDZGlZV05yWlc1a0p5a2dlMXh1SUNBZ0lDQWdkR2hwY3k1dGIyUjFiR1Z6TG1KaFkydGxibVFnUFNCdGIyUjFiR1U3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0cxdlpIVnNaUzUwZVhCbElEMDlQU0FuWTJGamFHVW5LU0I3WEc0Z0lDQWdJQ0IwYUdsekxtMXZaSFZzWlhNdVkyRmphR1VnUFNCdGIyUjFiR1U3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0cxdlpIVnNaUzUwZVhCbElEMDlQU0FuYkc5bloyVnlKeUI4ZkNCdGIyUjFiR1V1Ykc5bklDWW1JRzF2WkhWc1pTNTNZWEp1SUNZbUlHMXZaSFZzWlM1bGNuSnZjaWtnZTF4dUlDQWdJQ0FnZEdocGN5NXRiMlIxYkdWekxteHZaMmRsY2lBOUlHMXZaSFZzWlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JwWmlBb2JXOWtkV3hsTG5SNWNHVWdQVDA5SUNkc1lXNW5kV0ZuWlVSbGRHVmpkRzl5SnlrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTV0YjJSMWJHVnpMbXhoYm1kMVlXZGxSR1YwWldOMGIzSWdQU0J0YjJSMWJHVTdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLRzF2WkhWc1pTNTBlWEJsSUQwOVBTQW5jRzl6ZEZCeWIyTmxjM052Y2ljcElIdGNiaUFnSUNBZ0lGOXdiM04wVUhKdlkyVnpjMjl5TWk1a1pXWmhkV3gwTG1Ga1pGQnZjM1JRY205alpYTnpiM0lvYlc5a2RXeGxLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvYlc5a2RXeGxMblI1Y0dVZ1BUMDlJQ2N6Y21SUVlYSjBlU2NwSUh0Y2JpQWdJQ0FnSUhSb2FYTXViVzlrZFd4bGN5NWxlSFJsY201aGJDNXdkWE5vS0cxdlpIVnNaU2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE03WEc0Z0lIMDdYRzVjYmlBZ1NURTRiaTV3Y205MGIzUjVjR1V1WTJoaGJtZGxUR0Z1WjNWaFoyVWdQU0JtZFc1amRHbHZiaUJqYUdGdVoyVk1ZVzVuZFdGblpTaHNibWNzSUdOaGJHeGlZV05yS1NCN1hHNGdJQ0FnZG1GeUlGOTBhR2x6TkNBOUlIUm9hWE03WEc1Y2JpQWdJQ0IyWVhJZ1pHOXVaU0E5SUdaMWJtTjBhVzl1SUdSdmJtVW9aWEp5TENCc0tTQjdYRzRnSUNBZ0lDQmZkR2hwY3pRdWRISmhibk5zWVhSdmNpNWphR0Z1WjJWTVlXNW5kV0ZuWlNoc0tUdGNibHh1SUNBZ0lDQWdhV1lnS0d3cElIdGNiaUFnSUNBZ0lDQWdYM1JvYVhNMExtVnRhWFFvSjJ4aGJtZDFZV2RsUTJoaGJtZGxaQ2NzSUd3cE8xeHVJQ0FnSUNBZ0lDQmZkR2hwY3pRdWJHOW5aMlZ5TG14dlp5Z25iR0Z1WjNWaFoyVkRhR0Z1WjJWa0p5d2diQ2s3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdsbUlDaGpZV3hzWW1GamF5a2dZMkZzYkdKaFkyc29aWEp5TENCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQmZkR2hwY3pRdWRDNWhjSEJzZVNoZmRHaHBjelFzSUdGeVozVnRaVzUwY3lrN1hHNGdJQ0FnSUNCOUtUdGNiaUFnSUNCOU8xeHVYRzRnSUNBZ2RtRnlJSE5sZEV4dVp5QTlJR1oxYm1OMGFXOXVJSE5sZEV4dVp5aHNLU0I3WEc0Z0lDQWdJQ0JwWmlBb2JDa2dlMXh1SUNBZ0lDQWdJQ0JmZEdocGN6UXViR0Z1WjNWaFoyVWdQU0JzTzF4dUlDQWdJQ0FnSUNCZmRHaHBjelF1YkdGdVozVmhaMlZ6SUQwZ1gzUm9hWE0wTG5ObGNuWnBZMlZ6TG14aGJtZDFZV2RsVlhScGJITXVkRzlTWlhOdmJIWmxTR2xsY21GeVkyaDVLR3dwTzF4dUlDQWdJQ0FnSUNCcFppQW9JVjkwYUdsek5DNTBjbUZ1YzJ4aGRHOXlMbXhoYm1kMVlXZGxLU0JmZEdocGN6UXVkSEpoYm5Oc1lYUnZjaTVqYUdGdVoyVk1ZVzVuZFdGblpTaHNLVHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9YM1JvYVhNMExuTmxjblpwWTJWekxteGhibWQxWVdkbFJHVjBaV04wYjNJcElGOTBhR2x6TkM1elpYSjJhV05sY3k1c1lXNW5kV0ZuWlVSbGRHVmpkRzl5TG1OaFkyaGxWWE5sY2t4aGJtZDFZV2RsS0d3cE8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQmZkR2hwY3pRdWJHOWhaRkpsYzI5MWNtTmxjeWhtZFc1amRHbHZiaUFvWlhKeUtTQjdYRzRnSUNBZ0lDQWdJR1J2Ym1Vb1pYSnlMQ0JzS1R0Y2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgwN1hHNWNiaUFnSUNCcFppQW9JV3h1WnlBbUppQjBhR2x6TG5ObGNuWnBZMlZ6TG14aGJtZDFZV2RsUkdWMFpXTjBiM0lnSmlZZ0lYUm9hWE11YzJWeWRtbGpaWE11YkdGdVozVmhaMlZFWlhSbFkzUnZjaTVoYzNsdVl5a2dlMXh1SUNBZ0lDQWdjMlYwVEc1bktIUm9hWE11YzJWeWRtbGpaWE11YkdGdVozVmhaMlZFWlhSbFkzUnZjaTVrWlhSbFkzUW9LU2s3WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2doYkc1bklDWW1JSFJvYVhNdWMyVnlkbWxqWlhNdWJHRnVaM1ZoWjJWRVpYUmxZM1J2Y2lBbUppQjBhR2x6TG5ObGNuWnBZMlZ6TG14aGJtZDFZV2RsUkdWMFpXTjBiM0l1WVhONWJtTXBJSHRjYmlBZ0lDQWdJSFJvYVhNdWMyVnlkbWxqWlhNdWJHRnVaM1ZoWjJWRVpYUmxZM1J2Y2k1a1pYUmxZM1FvYzJWMFRHNW5LVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2MyVjBURzVuS0d4dVp5azdYRzRnSUNBZ2ZWeHVJQ0I5TzF4dVhHNGdJRWt4T0c0dWNISnZkRzkwZVhCbExtZGxkRVpwZUdWa1ZDQTlJR1oxYm1OMGFXOXVJR2RsZEVacGVHVmtWQ2hzYm1jc0lHNXpLU0I3WEc0Z0lDQWdkbUZ5SUY5MGFHbHpOU0E5SUhSb2FYTTdYRzVjYmlBZ0lDQjJZWElnWm1sNFpXUlVJRDBnWm5WdVkzUnBiMjRnWm1sNFpXUlVLR3RsZVN3Z2IzQjBjeWtnZTF4dUlDQWdJQ0FnWm05eUlDaDJZWElnWDJ4bGJqUWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9MQ0J5WlhOMElEMGdRWEp5WVhrb1gyeGxialFnUGlBeUlEOGdYMnhsYmpRZ0xTQXlJRG9nTUNrc0lGOXJaWGswSUQwZ01qc2dYMnRsZVRRZ1BDQmZiR1Z1TkRzZ1gydGxlVFFyS3lrZ2UxeHVJQ0FnSUNBZ0lDQnlaWE4wVzE5clpYazBJQzBnTWwwZ1BTQmhjbWQxYldWdWRITmJYMnRsZVRSZE8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQjJZWElnYjNCMGFXOXVjeUE5SUY5bGVIUmxibVJ6S0h0OUxDQnZjSFJ6S1R0Y2JpQWdJQ0FnSUdsbUlDZ29kSGx3Wlc5bUlHOXdkSE1nUFQwOUlDZDFibVJsWm1sdVpXUW5JRDhnSjNWdVpHVm1hVzVsWkNjZ09pQmZkSGx3Wlc5bUtHOXdkSE1wS1NBaFBUMGdKMjlpYW1WamRDY3BJSHRjYmlBZ0lDQWdJQ0FnYjNCMGFXOXVjeUE5SUY5MGFHbHpOUzV2Y0hScGIyNXpMbTkyWlhKc2IyRmtWSEpoYm5Oc1lYUnBiMjVQY0hScGIyNUlZVzVrYkdWeUtGdHJaWGtzSUc5d2RITmRMbU52Ym1OaGRDaHlaWE4wS1NrN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lHOXdkR2x2Ym5NdWJHNW5JRDBnYjNCMGFXOXVjeTVzYm1jZ2ZId2dabWw0WldSVUxteHVaenRjYmlBZ0lDQWdJRzl3ZEdsdmJuTXViRzVuY3lBOUlHOXdkR2x2Ym5NdWJHNW5jeUI4ZkNCbWFYaGxaRlF1Ykc1bmN6dGNiaUFnSUNBZ0lHOXdkR2x2Ym5NdWJuTWdQU0J2Y0hScGIyNXpMbTV6SUh4OElHWnBlR1ZrVkM1dWN6dGNiaUFnSUNBZ0lISmxkSFZ5YmlCZmRHaHBjelV1ZENoclpYa3NJRzl3ZEdsdmJuTXBPMXh1SUNBZ0lIMDdYRzRnSUNBZ2FXWWdLSFI1Y0dWdlppQnNibWNnUFQwOUlDZHpkSEpwYm1jbktTQjdYRzRnSUNBZ0lDQm1hWGhsWkZRdWJHNW5JRDBnYkc1bk8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0JtYVhobFpGUXViRzVuY3lBOUlHeHVaenRjYmlBZ0lDQjlYRzRnSUNBZ1ptbDRaV1JVTG01eklEMGdibk03WEc0Z0lDQWdjbVYwZFhKdUlHWnBlR1ZrVkR0Y2JpQWdmVHRjYmx4dUlDQkpNVGh1TG5CeWIzUnZkSGx3WlM1MElEMGdablZ1WTNScGIyNGdkQ2dwSUh0Y2JpQWdJQ0IyWVhJZ1gzUnlZVzV6YkdGMGIzSTdYRzVjYmlBZ0lDQnlaWFIxY200Z2RHaHBjeTUwY21GdWMyeGhkRzl5SUNZbUlDaGZkSEpoYm5Oc1lYUnZjaUE5SUhSb2FYTXVkSEpoYm5Oc1lYUnZjaWt1ZEhKaGJuTnNZWFJsTG1Gd2NHeDVLRjkwY21GdWMyeGhkRzl5TENCaGNtZDFiV1Z1ZEhNcE8xeHVJQ0I5TzF4dVhHNGdJRWt4T0c0dWNISnZkRzkwZVhCbExtVjRhWE4wY3lBOUlHWjFibU4wYVc5dUlHVjRhWE4wY3lncElIdGNiaUFnSUNCMllYSWdYM1J5WVc1emJHRjBiM0l5TzF4dVhHNGdJQ0FnY21WMGRYSnVJSFJvYVhNdWRISmhibk5zWVhSdmNpQW1KaUFvWDNSeVlXNXpiR0YwYjNJeUlEMGdkR2hwY3k1MGNtRnVjMnhoZEc5eUtTNWxlR2x6ZEhNdVlYQndiSGtvWDNSeVlXNXpiR0YwYjNJeUxDQmhjbWQxYldWdWRITXBPMXh1SUNCOU8xeHVYRzRnSUVreE9HNHVjSEp2ZEc5MGVYQmxMbk5sZEVSbFptRjFiSFJPWVcxbGMzQmhZMlVnUFNCbWRXNWpkR2x2YmlCelpYUkVaV1poZFd4MFRtRnRaWE53WVdObEtHNXpLU0I3WEc0Z0lDQWdkR2hwY3k1dmNIUnBiMjV6TG1SbFptRjFiSFJPVXlBOUlHNXpPMXh1SUNCOU8xeHVYRzRnSUVreE9HNHVjSEp2ZEc5MGVYQmxMbXh2WVdST1lXMWxjM0JoWTJWeklEMGdablZ1WTNScGIyNGdiRzloWkU1aGJXVnpjR0ZqWlhNb2JuTXNJR05oYkd4aVlXTnJLU0I3WEc0Z0lDQWdkbUZ5SUY5MGFHbHpOaUE5SUhSb2FYTTdYRzVjYmlBZ0lDQnBaaUFvSVhSb2FYTXViM0IwYVc5dWN5NXVjeWtnY21WMGRYSnVJR05oYkd4aVlXTnJJQ1ltSUdOaGJHeGlZV05yS0NrN1hHNGdJQ0FnYVdZZ0tIUjVjR1Z2WmlCdWN5QTlQVDBnSjNOMGNtbHVaeWNwSUc1eklEMGdXMjV6WFR0Y2JseHVJQ0FnSUc1ekxtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z0tHNHBJSHRjYmlBZ0lDQWdJR2xtSUNoZmRHaHBjell1YjNCMGFXOXVjeTV1Y3k1cGJtUmxlRTltS0c0cElEd2dNQ2tnWDNSb2FYTTJMbTl3ZEdsdmJuTXVibk11Y0hWemFDaHVLVHRjYmlBZ0lDQjlLVHRjYmx4dUlDQWdJSFJvYVhNdWJHOWhaRkpsYzI5MWNtTmxjeWhqWVd4c1ltRmpheWs3WEc0Z0lIMDdYRzVjYmlBZ1NURTRiaTV3Y205MGIzUjVjR1V1Ykc5aFpFeGhibWQxWVdkbGN5QTlJR1oxYm1OMGFXOXVJR3h2WVdSTVlXNW5kV0ZuWlhNb2JHNW5jeXdnWTJGc2JHSmhZMnNwSUh0Y2JpQWdJQ0JwWmlBb2RIbHdaVzltSUd4dVozTWdQVDA5SUNkemRISnBibWNuS1NCc2JtZHpJRDBnVzJ4dVozTmRPMXh1SUNBZ0lIWmhjaUJ3Y21Wc2IyRmtaV1FnUFNCMGFHbHpMbTl3ZEdsdmJuTXVjSEpsYkc5aFpDQjhmQ0JiWFR0Y2JseHVJQ0FnSUhaaGNpQnVaWGRNYm1keklEMGdiRzVuY3k1bWFXeDBaWElvWm5WdVkzUnBiMjRnS0d4dVp5a2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlIQnlaV3h2WVdSbFpDNXBibVJsZUU5bUtHeHVaeWtnUENBd08xeHVJQ0FnSUgwcE8xeHVJQ0FnSUM4dklFVjRhWFFnWldGeWJIa2dhV1lnWVd4c0lHZHBkbVZ1SUd4aGJtZDFZV2RsY3lCaGNtVWdZV3h5WldGa2VTQndjbVZzYjJGa1pXUmNiaUFnSUNCcFppQW9JVzVsZDB4dVozTXViR1Z1WjNSb0tTQnlaWFIxY200Z1kyRnNiR0poWTJzb0tUdGNibHh1SUNBZ0lIUm9hWE11YjNCMGFXOXVjeTV3Y21Wc2IyRmtJRDBnY0hKbGJHOWhaR1ZrTG1OdmJtTmhkQ2h1WlhkTWJtZHpLVHRjYmlBZ0lDQjBhR2x6TG14dllXUlNaWE52ZFhKalpYTW9ZMkZzYkdKaFkyc3BPMXh1SUNCOU8xeHVYRzRnSUVreE9HNHVjSEp2ZEc5MGVYQmxMbVJwY2lBOUlHWjFibU4wYVc5dUlHUnBjaWhzYm1jcElIdGNiaUFnSUNCcFppQW9JV3h1WnlrZ2JHNW5JRDBnZEdocGN5NXNZVzVuZFdGblpYTWdKaVlnZEdocGN5NXNZVzVuZFdGblpYTXViR1Z1WjNSb0lENGdNQ0EvSUhSb2FYTXViR0Z1WjNWaFoyVnpXekJkSURvZ2RHaHBjeTVzWVc1bmRXRm5aVHRjYmlBZ0lDQnBaaUFvSVd4dVp5a2djbVYwZFhKdUlDZHlkR3duTzF4dVhHNGdJQ0FnZG1GeUlISjBiRXh1WjNNZ1BTQmJKMkZ5Snl3Z0ozTm9kU2NzSUNkemNYSW5MQ0FuYzNOb0p5d2dKM2hoWVNjc0lDZDVhR1FuTENBbmVYVmtKeXdnSjJGaGJ5Y3NJQ2RoWW1nbkxDQW5ZV0oySnl3Z0oyRmpiU2NzSUNkaFkzRW5MQ0FuWVdOM0p5d2dKMkZqZUNjc0lDZGhZM2tuTENBbllXUm1KeXdnSjJGa2N5Y3NJQ2RoWldJbkxDQW5ZV1ZqSnl3Z0oyRm1ZaWNzSUNkaGFuQW5MQ0FuWVhCakp5d2dKMkZ3WkNjc0lDZGhjbUluTENBbllYSnhKeXdnSjJGeWN5Y3NJQ2RoY25rbkxDQW5ZWEo2Snl3Z0oyRjFlaWNzSUNkaGRtd25MQ0FuWVhsb0p5d2dKMkY1YkNjc0lDZGhlVzRuTENBbllYbHdKeXdnSjJKaWVpY3NJQ2R3WjJFbkxDQW5hR1VuTENBbmFYY25MQ0FuY0hNbkxDQW5jR0owSnl3Z0ozQmlkU2NzSUNkd2MzUW5MQ0FuY0hKd0p5d2dKM0J5WkNjc0lDZDFjaWNzSUNkNVpHUW5MQ0FuZVdSekp5d2dKM2xwYUNjc0lDZHFhU2NzSUNkNWFTY3NJQ2RvWW04bkxDQW5iV1Z1Snl3Z0ozaHRiaWNzSUNkbVlTY3NJQ2RxY0hJbkxDQW5jR1Z2Snl3Z0ozQmxjeWNzSUNkd2NuTW5MQ0FuWkhZbkxDQW5jMkZ0SjEwN1hHNWNiaUFnSUNCeVpYUjFjbTRnY25Sc1RHNW5jeTVwYm1SbGVFOW1LSFJvYVhNdWMyVnlkbWxqWlhNdWJHRnVaM1ZoWjJWVmRHbHNjeTVuWlhSTVlXNW5kV0ZuWlZCaGNuUkdjbTl0UTI5a1pTaHNibWNwS1NBK1BTQXdJRDhnSjNKMGJDY2dPaUFuYkhSeUp6dGNiaUFnZlR0Y2JseHVJQ0F2S2lCbGMyeHBiblFnWTJ4aGMzTXRiV1YwYUc5a2N5MTFjMlV0ZEdocGN6b2dNQ0FxTDF4dVhHNWNiaUFnU1RFNGJpNXdjbTkwYjNSNWNHVXVZM0psWVhSbFNXNXpkR0Z1WTJVZ1BTQm1kVzVqZEdsdmJpQmpjbVZoZEdWSmJuTjBZVzVqWlNncElIdGNiaUFnSUNCMllYSWdiM0IwYVc5dWN5QTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQaUF3SUNZbUlHRnlaM1Z0Wlc1MGMxc3dYU0FoUFQwZ2RXNWtaV1pwYm1Wa0lEOGdZWEpuZFcxbGJuUnpXekJkSURvZ2UzMDdYRzRnSUNBZ2RtRnlJR05oYkd4aVlXTnJJRDBnWVhKbmRXMWxiblJ6V3pGZE8xeHVYRzRnSUNBZ2NtVjBkWEp1SUc1bGR5QkpNVGh1S0c5d2RHbHZibk1zSUdOaGJHeGlZV05yS1R0Y2JpQWdmVHRjYmx4dUlDQkpNVGh1TG5CeWIzUnZkSGx3WlM1amJHOXVaVWx1YzNSaGJtTmxJRDBnWm5WdVkzUnBiMjRnWTJ4dmJtVkpibk4wWVc1alpTZ3BJSHRjYmlBZ0lDQjJZWElnWDNSb2FYTTNJRDBnZEdocGN6dGNibHh1SUNBZ0lIWmhjaUJ2Y0hScGIyNXpJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURBZ0ppWWdZWEpuZFcxbGJuUnpXekJkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTUYwZ09pQjdmVHRjYmlBZ0lDQjJZWElnWTJGc2JHSmhZMnNnUFNCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUQ0Z01TQW1KaUJoY21kMWJXVnVkSE5iTVYwZ0lUMDlJSFZ1WkdWbWFXNWxaQ0EvSUdGeVozVnRaVzUwYzFzeFhTQTZJRzV2YjNBN1hHNWNiaUFnSUNCMllYSWdiV1Z5WjJWa1QzQjBhVzl1Y3lBOUlGOWxlSFJsYm1SektIdDlMQ0IwYUdsekxtOXdkR2x2Ym5Nc0lHOXdkR2x2Ym5Nc0lIc2dhWE5EYkc5dVpUb2dkSEoxWlNCOUtUdGNiaUFnSUNCMllYSWdZMnh2Ym1VZ1BTQnVaWGNnU1RFNGJpaHRaWEpuWldSUGNIUnBiMjV6S1R0Y2JpQWdJQ0IyWVhJZ2JXVnRZbVZ5YzFSdlEyOXdlU0E5SUZzbmMzUnZjbVVuTENBbmMyVnlkbWxqWlhNbkxDQW5iR0Z1WjNWaFoyVW5YVHRjYmlBZ0lDQnRaVzFpWlhKelZHOURiM0I1TG1admNrVmhZMmdvWm5WdVkzUnBiMjRnS0cwcElIdGNiaUFnSUNBZ0lHTnNiMjVsVzIxZElEMGdYM1JvYVhNM1cyMWRPMXh1SUNBZ0lIMHBPMXh1SUNBZ0lHTnNiMjVsTG5SeVlXNXpiR0YwYjNJZ1BTQnVaWGNnWDFSeVlXNXpiR0YwYjNJeUxtUmxabUYxYkhRb1kyeHZibVV1YzJWeWRtbGpaWE1zSUdOc2IyNWxMbTl3ZEdsdmJuTXBPMXh1SUNBZ0lHTnNiMjVsTG5SeVlXNXpiR0YwYjNJdWIyNG9KeW9uTENCbWRXNWpkR2x2YmlBb1pYWmxiblFwSUh0Y2JpQWdJQ0FnSUdadmNpQW9kbUZ5SUY5c1pXNDFJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ3dnWVhKbmN5QTlJRUZ5Y21GNUtGOXNaVzQxSUQ0Z01TQS9JRjlzWlc0MUlDMGdNU0E2SURBcExDQmZhMlY1TlNBOUlERTdJRjlyWlhrMUlEd2dYMnhsYmpVN0lGOXJaWGsxS3lzcElIdGNiaUFnSUNBZ0lDQWdZWEpuYzF0ZmEyVjVOU0F0SURGZElEMGdZWEpuZFcxbGJuUnpXMTlyWlhrMVhUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdZMnh2Ym1VdVpXMXBkQzVoY0hCc2VTaGpiRzl1WlN3Z1cyVjJaVzUwWFM1amIyNWpZWFFvWVhKbmN5a3BPMXh1SUNBZ0lIMHBPMXh1SUNBZ0lHTnNiMjVsTG1sdWFYUW9iV1Z5WjJWa1QzQjBhVzl1Y3l3Z1kyRnNiR0poWTJzcE8xeHVJQ0FnSUdOc2IyNWxMblJ5WVc1emJHRjBiM0l1YjNCMGFXOXVjeUE5SUdOc2IyNWxMbTl3ZEdsdmJuTTdJQzh2SUhONWJtTWdiM0IwYVc5dWMxeHVYRzRnSUNBZ2NtVjBkWEp1SUdOc2IyNWxPMXh1SUNCOU8xeHVYRzRnSUhKbGRIVnliaUJKTVRodU8xeHVmU2hmUlhabGJuUkZiV2wwZEdWeU15NWtaV1poZFd4MEtUdGNibHh1Wlhod2IzSjBjeTVrWldaaGRXeDBJRDBnYm1WM0lFa3hPRzRvS1RzaUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JrOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JjSWw5ZlpYTk5iMlIxYkdWY0lpd2dlMXh1SUNCMllXeDFaVG9nZEhKMVpWeHVmU2s3WEc1bGVIQnZjblJ6TG5WelpTQTlJR1Y0Y0c5eWRITXVkQ0E5SUdWNGNHOXlkSE11YzJWMFJHVm1ZWFZzZEU1aGJXVnpjR0ZqWlNBOUlHVjRjRzl5ZEhNdWIyNGdQU0JsZUhCdmNuUnpMbTltWmlBOUlHVjRjRzl5ZEhNdWJHOWhaRkpsYzI5MWNtTmxjeUE5SUdWNGNHOXlkSE11Ykc5aFpFNWhiV1Z6Y0dGalpYTWdQU0JsZUhCdmNuUnpMbXh2WVdSTVlXNW5kV0ZuWlhNZ1BTQmxlSEJ2Y25SekxtbHVhWFFnUFNCbGVIQnZjblJ6TG1kbGRFWnBlR1ZrVkNBOUlHVjRjRzl5ZEhNdVpYaHBjM1J6SUQwZ1pYaHdiM0owY3k1a2FYSWdQU0JsZUhCdmNuUnpMbU55WldGMFpVbHVjM1JoYm1ObElEMGdaWGh3YjNKMGN5NWpiRzl1WlVsdWMzUmhibU5sSUQwZ1pYaHdiM0owY3k1amFHRnVaMlZNWVc1bmRXRm5aU0E5SUhWdVpHVm1hVzVsWkR0Y2JseHVkbUZ5SUY5cE1UaHVaWGgwSUQwZ2NtVnhkV2x5WlNnbkxpOXBNVGh1WlhoMExtcHpKeWs3WEc1Y2JuWmhjaUJmYVRFNGJtVjRkRElnUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjlwTVRodVpYaDBLVHRjYmx4dVpuVnVZM1JwYjI0Z1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2h2WW1vcElIc2djbVYwZFhKdUlHOWlhaUFtSmlCdlltb3VYMTlsYzAxdlpIVnNaU0EvSUc5aWFpQTZJSHNnWkdWbVlYVnNkRG9nYjJKcUlIMDdJSDFjYmx4dVpYaHdiM0owY3k1a1pXWmhkV3gwSUQwZ1gya3hPRzVsZUhReUxtUmxabUYxYkhRN1hHNTJZWElnWTJoaGJtZGxUR0Z1WjNWaFoyVWdQU0JsZUhCdmNuUnpMbU5vWVc1blpVeGhibWQxWVdkbElEMGdYMmt4T0c1bGVIUXlMbVJsWm1GMWJIUXVZMmhoYm1kbFRHRnVaM1ZoWjJVdVltbHVaQ2hmYVRFNGJtVjRkREl1WkdWbVlYVnNkQ2s3WEc1MllYSWdZMnh2Ym1WSmJuTjBZVzVqWlNBOUlHVjRjRzl5ZEhNdVkyeHZibVZKYm5OMFlXNWpaU0E5SUY5cE1UaHVaWGgwTWk1a1pXWmhkV3gwTG1Oc2IyNWxTVzV6ZEdGdVkyVXVZbWx1WkNoZmFURTRibVY0ZERJdVpHVm1ZWFZzZENrN1hHNTJZWElnWTNKbFlYUmxTVzV6ZEdGdVkyVWdQU0JsZUhCdmNuUnpMbU55WldGMFpVbHVjM1JoYm1ObElEMGdYMmt4T0c1bGVIUXlMbVJsWm1GMWJIUXVZM0psWVhSbFNXNXpkR0Z1WTJVdVltbHVaQ2hmYVRFNGJtVjRkREl1WkdWbVlYVnNkQ2s3WEc1MllYSWdaR2x5SUQwZ1pYaHdiM0owY3k1a2FYSWdQU0JmYVRFNGJtVjRkREl1WkdWbVlYVnNkQzVrYVhJdVltbHVaQ2hmYVRFNGJtVjRkREl1WkdWbVlYVnNkQ2s3WEc1MllYSWdaWGhwYzNSeklEMGdaWGh3YjNKMGN5NWxlR2x6ZEhNZ1BTQmZhVEU0Ym1WNGRESXVaR1ZtWVhWc2RDNWxlR2x6ZEhNdVltbHVaQ2hmYVRFNGJtVjRkREl1WkdWbVlYVnNkQ2s3WEc1MllYSWdaMlYwUm1sNFpXUlVJRDBnWlhod2IzSjBjeTVuWlhSR2FYaGxaRlFnUFNCZmFURTRibVY0ZERJdVpHVm1ZWFZzZEM1blpYUkdhWGhsWkZRdVltbHVaQ2hmYVRFNGJtVjRkREl1WkdWbVlYVnNkQ2s3WEc1MllYSWdhVzVwZENBOUlHVjRjRzl5ZEhNdWFXNXBkQ0E5SUY5cE1UaHVaWGgwTWk1a1pXWmhkV3gwTG1sdWFYUXVZbWx1WkNoZmFURTRibVY0ZERJdVpHVm1ZWFZzZENrN1hHNTJZWElnYkc5aFpFeGhibWQxWVdkbGN5QTlJR1Y0Y0c5eWRITXViRzloWkV4aGJtZDFZV2RsY3lBOUlGOXBNVGh1WlhoME1pNWtaV1poZFd4MExteHZZV1JNWVc1bmRXRm5aWE11WW1sdVpDaGZhVEU0Ym1WNGRESXVaR1ZtWVhWc2RDazdYRzUyWVhJZ2JHOWhaRTVoYldWemNHRmpaWE1nUFNCbGVIQnZjblJ6TG14dllXUk9ZVzFsYzNCaFkyVnpJRDBnWDJreE9HNWxlSFF5TG1SbFptRjFiSFF1Ykc5aFpFNWhiV1Z6Y0dGalpYTXVZbWx1WkNoZmFURTRibVY0ZERJdVpHVm1ZWFZzZENrN1hHNTJZWElnYkc5aFpGSmxjMjkxY21ObGN5QTlJR1Y0Y0c5eWRITXViRzloWkZKbGMyOTFjbU5sY3lBOUlGOXBNVGh1WlhoME1pNWtaV1poZFd4MExteHZZV1JTWlhOdmRYSmpaWE11WW1sdVpDaGZhVEU0Ym1WNGRESXVaR1ZtWVhWc2RDazdYRzUyWVhJZ2IyWm1JRDBnWlhod2IzSjBjeTV2Wm1ZZ1BTQmZhVEU0Ym1WNGRESXVaR1ZtWVhWc2RDNXZabVl1WW1sdVpDaGZhVEU0Ym1WNGRESXVaR1ZtWVhWc2RDazdYRzUyWVhJZ2IyNGdQU0JsZUhCdmNuUnpMbTl1SUQwZ1gya3hPRzVsZUhReUxtUmxabUYxYkhRdWIyNHVZbWx1WkNoZmFURTRibVY0ZERJdVpHVm1ZWFZzZENrN1hHNTJZWElnYzJWMFJHVm1ZWFZzZEU1aGJXVnpjR0ZqWlNBOUlHVjRjRzl5ZEhNdWMyVjBSR1ZtWVhWc2RFNWhiV1Z6Y0dGalpTQTlJRjlwTVRodVpYaDBNaTVrWldaaGRXeDBMbk5sZEVSbFptRjFiSFJPWVcxbGMzQmhZMlV1WW1sdVpDaGZhVEU0Ym1WNGRESXVaR1ZtWVhWc2RDazdYRzUyWVhJZ2RDQTlJR1Y0Y0c5eWRITXVkQ0E5SUY5cE1UaHVaWGgwTWk1a1pXWmhkV3gwTG5RdVltbHVaQ2hmYVRFNGJtVjRkREl1WkdWbVlYVnNkQ2s3WEc1MllYSWdkWE5sSUQwZ1pYaHdiM0owY3k1MWMyVWdQU0JmYVRFNGJtVjRkREl1WkdWbVlYVnNkQzUxYzJVdVltbHVaQ2hmYVRFNGJtVjRkREl1WkdWbVlYVnNkQ2s3SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1UFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dYQ0pmWDJWelRXOWtkV3hsWENJc0lIdGNiaUFnZG1Gc2RXVTZJSFJ5ZFdWY2JuMHBPMXh1WEc1MllYSWdYMlY0ZEdWdVpITWdQU0JQWW1wbFkzUXVZWE56YVdkdUlIeDhJR1oxYm1OMGFXOXVJQ2gwWVhKblpYUXBJSHNnWm05eUlDaDJZWElnYVNBOUlERTdJR2tnUENCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvT3lCcEt5c3BJSHNnZG1GeUlITnZkWEpqWlNBOUlHRnlaM1Z0Wlc1MGMxdHBYVHNnWm05eUlDaDJZWElnYTJWNUlHbHVJSE52ZFhKalpTa2dleUJwWmlBb1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tITnZkWEpqWlN3Z2EyVjVLU2tnZXlCMFlYSm5aWFJiYTJWNVhTQTlJSE52ZFhKalpWdHJaWGxkT3lCOUlIMGdmU0J5WlhSMWNtNGdkR0Z5WjJWME95QjlPMXh1WEc1bWRXNWpkR2x2YmlCZlkyeGhjM05EWVd4c1EyaGxZMnNvYVc1emRHRnVZMlVzSUVOdmJuTjBjblZqZEc5eUtTQjdJR2xtSUNnaEtHbHVjM1JoYm1ObElHbHVjM1JoYm1ObGIyWWdRMjl1YzNSeWRXTjBiM0lwS1NCN0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9YQ0pEWVc1dWIzUWdZMkZzYkNCaElHTnNZWE56SUdGeklHRWdablZ1WTNScGIyNWNJaWs3SUgwZ2ZWeHVYRzVtZFc1amRHbHZiaUJmZEc5RGIyNXpkVzFoWW14bFFYSnlZWGtvWVhKeUtTQjdJR2xtSUNoQmNuSmhlUzVwYzBGeWNtRjVLR0Z5Y2lrcElIc2dabTl5SUNoMllYSWdhU0E5SURBc0lHRnljaklnUFNCQmNuSmhlU2hoY25JdWJHVnVaM1JvS1RzZ2FTQThJR0Z5Y2k1c1pXNW5kR2c3SUdrckt5a2dleUJoY25JeVcybGRJRDBnWVhKeVcybGRPeUI5SUhKbGRIVnliaUJoY25JeU95QjlJR1ZzYzJVZ2V5QnlaWFIxY200Z1FYSnlZWGt1Wm5KdmJTaGhjbklwT3lCOUlIMWNibHh1ZG1GeUlHTnZibk52YkdWTWIyZG5aWElnUFNCN1hHNGdJSFI1Y0dVNklDZHNiMmRuWlhJbkxGeHVYRzRnSUd4dlp6b2dablZ1WTNScGIyNGdiRzluS0dGeVozTXBJSHRjYmlBZ0lDQjBhR2x6TG05MWRIQjFkQ2duYkc5bkp5d2dZWEpuY3lrN1hHNGdJSDBzWEc0Z0lIZGhjbTQ2SUdaMWJtTjBhVzl1SUhkaGNtNG9ZWEpuY3lrZ2UxeHVJQ0FnSUhSb2FYTXViM1YwY0hWMEtDZDNZWEp1Snl3Z1lYSm5jeWs3WEc0Z0lIMHNYRzRnSUdWeWNtOXlPaUJtZFc1amRHbHZiaUJsY25KdmNpaGhjbWR6S1NCN1hHNGdJQ0FnZEdocGN5NXZkWFJ3ZFhRb0oyVnljbTl5Snl3Z1lYSm5jeWs3WEc0Z0lIMHNYRzRnSUc5MWRIQjFkRG9nWm5WdVkzUnBiMjRnYjNWMGNIVjBLSFI1Y0dVc0lHRnlaM01wSUh0Y2JpQWdJQ0IyWVhJZ1gyTnZibk52YkdVN1hHNWNiaUFnSUNBdktpQmxjMnhwYm5RZ2JtOHRZMjl1YzI5c1pUb2dNQ0FxTDF4dUlDQWdJR2xtSUNoamIyNXpiMnhsSUNZbUlHTnZibk52YkdWYmRIbHdaVjBwSUNoZlkyOXVjMjlzWlNBOUlHTnZibk52YkdVcFczUjVjR1ZkTG1Gd2NHeDVLRjlqYjI1emIyeGxMQ0JmZEc5RGIyNXpkVzFoWW14bFFYSnlZWGtvWVhKbmN5a3BPMXh1SUNCOVhHNTlPMXh1WEc1MllYSWdURzluWjJWeUlEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQm1kVzVqZEdsdmJpQk1iMmRuWlhJb1kyOXVZM0psZEdWTWIyZG5aWElwSUh0Y2JpQWdJQ0IyWVhJZ2IzQjBhVzl1Y3lBOUlHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnZ1BpQXhJQ1ltSUdGeVozVnRaVzUwYzFzeFhTQWhQVDBnZFc1a1pXWnBibVZrSUQ4Z1lYSm5kVzFsYm5Seld6RmRJRG9nZTMwN1hHNWNiaUFnSUNCZlkyeGhjM05EWVd4c1EyaGxZMnNvZEdocGN5d2dURzluWjJWeUtUdGNibHh1SUNBZ0lIUm9hWE11YVc1cGRDaGpiMjVqY21WMFpVeHZaMmRsY2l3Z2IzQjBhVzl1Y3lrN1hHNGdJSDFjYmx4dUlDQk1iMmRuWlhJdWNISnZkRzkwZVhCbExtbHVhWFFnUFNCbWRXNWpkR2x2YmlCcGJtbDBLR052Ym1OeVpYUmxURzluWjJWeUtTQjdYRzRnSUNBZ2RtRnlJRzl3ZEdsdmJuTWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTVNBbUppQmhjbWQxYldWdWRITmJNVjBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXN4WFNBNklIdDlPMXh1WEc0Z0lDQWdkR2hwY3k1d2NtVm1hWGdnUFNCdmNIUnBiMjV6TG5CeVpXWnBlQ0I4ZkNBbmFURTRibVY0ZERvbk8xeHVJQ0FnSUhSb2FYTXViRzluWjJWeUlEMGdZMjl1WTNKbGRHVk1iMmRuWlhJZ2ZId2dZMjl1YzI5c1pVeHZaMmRsY2p0Y2JpQWdJQ0IwYUdsekxtOXdkR2x2Ym5NZ1BTQnZjSFJwYjI1ek8xeHVJQ0FnSUhSb2FYTXVaR1ZpZFdjZ1BTQnZjSFJwYjI1ekxtUmxZblZuTzF4dUlDQjlPMXh1WEc0Z0lFeHZaMmRsY2k1d2NtOTBiM1I1Y0dVdWMyVjBSR1ZpZFdjZ1BTQm1kVzVqZEdsdmJpQnpaWFJFWldKMVp5aGliMjlzS1NCN1hHNGdJQ0FnZEdocGN5NWtaV0oxWnlBOUlHSnZiMnc3WEc0Z0lIMDdYRzVjYmlBZ1RHOW5aMlZ5TG5CeWIzUnZkSGx3WlM1c2IyY2dQU0JtZFc1amRHbHZiaUJzYjJjb0tTQjdYRzRnSUNBZ1ptOXlJQ2gyWVhJZ1gyeGxiaUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dzSUdGeVozTWdQU0JCY25KaGVTaGZiR1Z1S1N3Z1gydGxlU0E5SURBN0lGOXJaWGtnUENCZmJHVnVPeUJmYTJWNUt5c3BJSHRjYmlBZ0lDQWdJR0Z5WjNOYlgydGxlVjBnUFNCaGNtZDFiV1Z1ZEhOYlgydGxlVjA3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE11Wm05eWQyRnlaQ2hoY21kekxDQW5iRzluSnl3Z0p5Y3NJSFJ5ZFdVcE8xeHVJQ0I5TzF4dVhHNGdJRXh2WjJkbGNpNXdjbTkwYjNSNWNHVXVkMkZ5YmlBOUlHWjFibU4wYVc5dUlIZGhjbTRvS1NCN1hHNGdJQ0FnWm05eUlDaDJZWElnWDJ4bGJqSWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9MQ0JoY21keklEMGdRWEp5WVhrb1gyeGxiaklwTENCZmEyVjVNaUE5SURBN0lGOXJaWGt5SUR3Z1gyeGxiakk3SUY5clpYa3lLeXNwSUh0Y2JpQWdJQ0FnSUdGeVozTmJYMnRsZVRKZElEMGdZWEpuZFcxbGJuUnpXMTlyWlhreVhUdGNiaUFnSUNCOVhHNWNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NW1iM0ozWVhKa0tHRnlaM01zSUNkM1lYSnVKeXdnSnljc0lIUnlkV1VwTzF4dUlDQjlPMXh1WEc0Z0lFeHZaMmRsY2k1d2NtOTBiM1I1Y0dVdVpYSnliM0lnUFNCbWRXNWpkR2x2YmlCbGNuSnZjaWdwSUh0Y2JpQWdJQ0JtYjNJZ0tIWmhjaUJmYkdWdU15QTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ3NJR0Z5WjNNZ1BTQkJjbkpoZVNoZmJHVnVNeWtzSUY5clpYa3pJRDBnTURzZ1gydGxlVE1nUENCZmJHVnVNenNnWDJ0bGVUTXJLeWtnZTF4dUlDQWdJQ0FnWVhKbmMxdGZhMlY1TTEwZ1BTQmhjbWQxYldWdWRITmJYMnRsZVROZE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGRIVnliaUIwYUdsekxtWnZjbmRoY21Rb1lYSm5jeXdnSjJWeWNtOXlKeXdnSnljcE8xeHVJQ0I5TzF4dVhHNGdJRXh2WjJkbGNpNXdjbTkwYjNSNWNHVXVaR1Z3Y21WallYUmxJRDBnWm5WdVkzUnBiMjRnWkdWd2NtVmpZWFJsS0NrZ2UxeHVJQ0FnSUdadmNpQW9kbUZ5SUY5c1pXNDBJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ3dnWVhKbmN5QTlJRUZ5Y21GNUtGOXNaVzQwS1N3Z1gydGxlVFFnUFNBd095QmZhMlY1TkNBOElGOXNaVzQwT3lCZmEyVjVOQ3NyS1NCN1hHNGdJQ0FnSUNCaGNtZHpXMTlyWlhrMFhTQTlJR0Z5WjNWdFpXNTBjMXRmYTJWNU5GMDdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTXVabTl5ZDJGeVpDaGhjbWR6TENBbmQyRnliaWNzSUNkWFFWSk9TVTVISUVSRlVGSkZRMEZVUlVRNklDY3NJSFJ5ZFdVcE8xeHVJQ0I5TzF4dVhHNGdJRXh2WjJkbGNpNXdjbTkwYjNSNWNHVXVabTl5ZDJGeVpDQTlJR1oxYm1OMGFXOXVJR1p2Y25kaGNtUW9ZWEpuY3l3Z2JIWnNMQ0J3Y21WbWFYZ3NJR1JsWW5WblQyNXNlU2tnZTF4dUlDQWdJR2xtSUNoa1pXSjFaMDl1YkhrZ0ppWWdJWFJvYVhNdVpHVmlkV2NwSUhKbGRIVnliaUJ1ZFd4c08xeHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ1lYSm5jMXN3WFNBOVBUMGdKM04wY21sdVp5Y3BJR0Z5WjNOYk1GMGdQU0FuSnlBcklIQnlaV1pwZUNBcklIUm9hWE11Y0hKbFptbDRJQ3NnSnlBbklDc2dZWEpuYzFzd1hUdGNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NXNiMmRuWlhKYmJIWnNYU2hoY21kektUdGNiaUFnZlR0Y2JseHVJQ0JNYjJkblpYSXVjSEp2ZEc5MGVYQmxMbU55WldGMFpTQTlJR1oxYm1OMGFXOXVJR055WldGMFpTaHRiMlIxYkdWT1lXMWxLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHNWxkeUJNYjJkblpYSW9kR2hwY3k1c2IyZG5aWElzSUY5bGVIUmxibVJ6S0hzZ2NISmxabWw0T2lCMGFHbHpMbkJ5WldacGVDQXJJQ2M2SnlBcklHMXZaSFZzWlU1aGJXVWdLeUFuT2ljZ2ZTd2dkR2hwY3k1dmNIUnBiMjV6S1NrN1hHNGdJSDA3WEc1Y2JpQWdjbVYwZFhKdUlFeHZaMmRsY2p0Y2JuMG9LVHRjYmx4dVpYaHdiM0owY3k1a1pXWmhkV3gwSUQwZ2JtVjNJRXh2WjJkbGNpZ3BPeUlzSWx3aWRYTmxJSE4wY21samRGd2lPMXh1WEc1UFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dYQ0pmWDJWelRXOWtkV3hsWENJc0lIdGNiaUFnZG1Gc2RXVTZJSFJ5ZFdWY2JuMHBPMXh1Wlhod2IzSjBjeTVrWldaaGRXeDBJRDBnZTF4dVhHNGdJSEJ5YjJObGMzTnZjbk02SUh0OUxGeHVYRzRnSUdGa1pGQnZjM1JRY205alpYTnpiM0k2SUdaMWJtTjBhVzl1SUdGa1pGQnZjM1JRY205alpYTnpiM0lvYlc5a2RXeGxLU0I3WEc0Z0lDQWdkR2hwY3k1d2NtOWpaWE56YjNKelcyMXZaSFZzWlM1dVlXMWxYU0E5SUcxdlpIVnNaVHRjYmlBZ2ZTeGNiaUFnYUdGdVpHeGxPaUJtZFc1amRHbHZiaUJvWVc1a2JHVW9jSEp2WTJWemMyOXljeXdnZG1Gc2RXVXNJR3RsZVN3Z2IzQjBhVzl1Y3l3Z2RISmhibk5zWVhSdmNpa2dlMXh1SUNBZ0lIWmhjaUJmZEdocGN5QTlJSFJvYVhNN1hHNWNiaUFnSUNCd2NtOWpaWE56YjNKekxtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z0tIQnliMk5sYzNOdmNpa2dlMXh1SUNBZ0lDQWdhV1lnS0Y5MGFHbHpMbkJ5YjJObGMzTnZjbk5iY0hKdlkyVnpjMjl5WFNrZ2RtRnNkV1VnUFNCZmRHaHBjeTV3Y205alpYTnpiM0p6VzNCeWIyTmxjM052Y2wwdWNISnZZMlZ6Y3loMllXeDFaU3dnYTJWNUxDQnZjSFJwYjI1ekxDQjBjbUZ1YzJ4aGRHOXlLVHRjYmlBZ0lDQjlLVHRjYmx4dUlDQWdJSEpsZEhWeWJpQjJZV3gxWlR0Y2JpQWdmVnh1ZlRzaUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JrOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JjSWw5ZlpYTk5iMlIxYkdWY0lpd2dlMXh1SUNCMllXeDFaVG9nZEhKMVpWeHVmU2s3WEc1bGVIQnZjblJ6TG0xaGEyVlRkSEpwYm1jZ1BTQnRZV3RsVTNSeWFXNW5PMXh1Wlhod2IzSjBjeTVqYjNCNUlEMGdZMjl3ZVR0Y2JtVjRjRzl5ZEhNdWMyVjBVR0YwYUNBOUlITmxkRkJoZEdnN1hHNWxlSEJ2Y25SekxuQjFjMmhRWVhSb0lEMGdjSFZ6YUZCaGRHZzdYRzVsZUhCdmNuUnpMbWRsZEZCaGRHZ2dQU0JuWlhSUVlYUm9PMXh1Wlhod2IzSjBjeTVrWldWd1JYaDBaVzVrSUQwZ1pHVmxjRVY0ZEdWdVpEdGNibVY0Y0c5eWRITXVjbVZuWlhoRmMyTmhjR1VnUFNCeVpXZGxlRVZ6WTJGd1pUdGNibVY0Y0c5eWRITXVaWE5qWVhCbElEMGdaWE5qWVhCbE8xeHVablZ1WTNScGIyNGdiV0ZyWlZOMGNtbHVaeWh2WW1wbFkzUXBJSHRjYmlBZ2FXWWdLRzlpYW1WamRDQTlQU0J1ZFd4c0tTQnlaWFIxY200Z0p5YzdYRzRnSUM4cUlHVnpiR2x1ZENCd2NtVm1aWEl0ZEdWdGNHeGhkR1U2SURBZ0tpOWNiaUFnY21WMGRYSnVJQ2NuSUNzZ2IySnFaV04wTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJqYjNCNUtHRXNJSE1zSUhRcElIdGNiaUFnWVM1bWIzSkZZV05vS0daMWJtTjBhVzl1SUNodEtTQjdYRzRnSUNBZ2FXWWdLSE5iYlYwcElIUmJiVjBnUFNCelcyMWRPMXh1SUNCOUtUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1oyVjBUR0Z6ZEU5bVVHRjBhQ2h2WW1wbFkzUXNJSEJoZEdnc0lFVnRjSFI1S1NCN1hHNGdJR1oxYm1OMGFXOXVJR05zWldGdVMyVjVLR3RsZVNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJyWlhrZ0ppWWdhMlY1TG1sdVpHVjRUMllvSnlNakl5Y3BJRDRnTFRFZ1B5QnJaWGt1Y21Wd2JHRmpaU2d2SXlNakwyY3NJQ2N1SnlrZ09pQnJaWGs3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCallXNU9iM1JVY21GMlpYSnpaVVJsWlhCbGNpZ3BJSHRjYmlBZ0lDQnlaWFIxY200Z0lXOWlhbVZqZENCOGZDQjBlWEJsYjJZZ2IySnFaV04wSUQwOVBTQW5jM1J5YVc1bkp6dGNiaUFnZlZ4dVhHNGdJSFpoY2lCemRHRmpheUE5SUhSNWNHVnZaaUJ3WVhSb0lDRTlQU0FuYzNSeWFXNW5KeUEvSUZ0ZExtTnZibU5oZENod1lYUm9LU0E2SUhCaGRHZ3VjM0JzYVhRb0p5NG5LVHRjYmlBZ2QyaHBiR1VnS0hOMFlXTnJMbXhsYm1kMGFDQStJREVwSUh0Y2JpQWdJQ0JwWmlBb1kyRnVUbTkwVkhKaGRtVnljMlZFWldWd1pYSW9LU2tnY21WMGRYSnVJSHQ5TzF4dVhHNGdJQ0FnZG1GeUlHdGxlU0E5SUdOc1pXRnVTMlY1S0hOMFlXTnJMbk5vYVdaMEtDa3BPMXh1SUNBZ0lHbG1JQ2doYjJKcVpXTjBXMnRsZVYwZ0ppWWdSVzF3ZEhrcElHOWlhbVZqZEZ0clpYbGRJRDBnYm1WM0lFVnRjSFI1S0NrN1hHNGdJQ0FnYjJKcVpXTjBJRDBnYjJKcVpXTjBXMnRsZVYwN1hHNGdJSDFjYmx4dUlDQnBaaUFvWTJGdVRtOTBWSEpoZG1WeWMyVkVaV1Z3WlhJb0tTa2djbVYwZFhKdUlIdDlPMXh1SUNCeVpYUjFjbTRnZTF4dUlDQWdJRzlpYWpvZ2IySnFaV04wTEZ4dUlDQWdJR3M2SUdOc1pXRnVTMlY1S0hOMFlXTnJMbk5vYVdaMEtDa3BYRzRnSUgwN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUhObGRGQmhkR2dvYjJKcVpXTjBMQ0J3WVhSb0xDQnVaWGRXWVd4MVpTa2dlMXh1SUNCMllYSWdYMmRsZEV4aGMzUlBabEJoZEdnZ1BTQm5aWFJNWVhOMFQyWlFZWFJvS0c5aWFtVmpkQ3dnY0dGMGFDd2dUMkpxWldOMEtTeGNiaUFnSUNBZ0lHOWlhaUE5SUY5blpYUk1ZWE4wVDJaUVlYUm9MbTlpYWl4Y2JpQWdJQ0FnSUdzZ1BTQmZaMlYwVEdGemRFOW1VR0YwYUM1ck8xeHVYRzRnSUc5aWFsdHJYU0E5SUc1bGQxWmhiSFZsTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ3ZFhOb1VHRjBhQ2h2WW1wbFkzUXNJSEJoZEdnc0lHNWxkMVpoYkhWbExDQmpiMjVqWVhRcElIdGNiaUFnZG1GeUlGOW5aWFJNWVhOMFQyWlFZWFJvTWlBOUlHZGxkRXhoYzNSUFpsQmhkR2dvYjJKcVpXTjBMQ0J3WVhSb0xDQlBZbXBsWTNRcExGeHVJQ0FnSUNBZ2IySnFJRDBnWDJkbGRFeGhjM1JQWmxCaGRHZ3lMbTlpYWl4Y2JpQWdJQ0FnSUdzZ1BTQmZaMlYwVEdGemRFOW1VR0YwYURJdWF6dGNibHh1SUNCdlltcGJhMTBnUFNCdlltcGJhMTBnZkh3Z1cxMDdYRzRnSUdsbUlDaGpiMjVqWVhRcElHOWlhbHRyWFNBOUlHOWlhbHRyWFM1amIyNWpZWFFvYm1WM1ZtRnNkV1VwTzF4dUlDQnBaaUFvSVdOdmJtTmhkQ2tnYjJKcVcydGRMbkIxYzJnb2JtVjNWbUZzZFdVcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCblpYUlFZWFJvS0c5aWFtVmpkQ3dnY0dGMGFDa2dlMXh1SUNCMllYSWdYMmRsZEV4aGMzUlBabEJoZEdneklEMGdaMlYwVEdGemRFOW1VR0YwYUNodlltcGxZM1FzSUhCaGRHZ3BMRnh1SUNBZ0lDQWdiMkpxSUQwZ1gyZGxkRXhoYzNSUFpsQmhkR2d6TG05aWFpeGNiaUFnSUNBZ0lHc2dQU0JmWjJWMFRHRnpkRTltVUdGMGFETXVhenRjYmx4dUlDQnBaaUFvSVc5aWFpa2djbVYwZFhKdUlIVnVaR1ZtYVc1bFpEdGNiaUFnY21WMGRYSnVJRzlpYWx0clhUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1pHVmxjRVY0ZEdWdVpDaDBZWEpuWlhRc0lITnZkWEpqWlN3Z2IzWmxjbmR5YVhSbEtTQjdYRzRnSUM4cUlHVnpiR2x1ZENCdWJ5MXlaWE4wY21samRHVmtMWE41Ym5SaGVEb2dNQ0FxTDF4dUlDQm1iM0lnS0haaGNpQndjbTl3SUdsdUlITnZkWEpqWlNrZ2UxeHVJQ0FnSUdsbUlDaHdjbTl3SUdsdUlIUmhjbWRsZENrZ2UxeHVJQ0FnSUNBZ0x5OGdTV1lnZDJVZ2NtVmhZMmhsWkNCaElHeGxZV1lnYzNSeWFXNW5JR2x1SUhSaGNtZGxkQ0J2Y2lCemIzVnlZMlVnZEdobGJpQnlaWEJzWVdObElIZHBkR2dnYzI5MWNtTmxJRzl5SUhOcmFYQWdaR1Z3Wlc1a2FXNW5JRzl1SUhSb1pTQW5iM1psY25keWFYUmxKeUJ6ZDJsMFkyaGNiaUFnSUNBZ0lHbG1JQ2gwZVhCbGIyWWdkR0Z5WjJWMFczQnliM0JkSUQwOVBTQW5jM1J5YVc1bkp5QjhmQ0IwWVhKblpYUmJjSEp2Y0YwZ2FXNXpkR0Z1WTJWdlppQlRkSEpwYm1jZ2ZId2dkSGx3Wlc5bUlITnZkWEpqWlZ0d2NtOXdYU0E5UFQwZ0ozTjBjbWx1WnljZ2ZId2djMjkxY21ObFczQnliM0JkSUdsdWMzUmhibU5sYjJZZ1UzUnlhVzVuS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2h2ZG1WeWQzSnBkR1VwSUhSaGNtZGxkRnR3Y205d1hTQTlJSE52ZFhKalpWdHdjbTl3WFR0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUdSbFpYQkZlSFJsYm1Rb2RHRnlaMlYwVzNCeWIzQmRMQ0J6YjNWeVkyVmJjSEp2Y0Ywc0lHOTJaWEozY21sMFpTazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhSaGNtZGxkRnR3Y205d1hTQTlJSE52ZFhKalpWdHdjbTl3WFR0Y2JpQWdJQ0I5WEc0Z0lIMWNiaUFnY21WMGRYSnVJSFJoY21kbGREdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2NtVm5aWGhGYzJOaGNHVW9jM1J5S1NCN1hHNGdJQzhxSUdWemJHbHVkQ0J1YnkxMWMyVnNaWE56TFdWelkyRndaVG9nTUNBcUwxeHVJQ0J5WlhSMWNtNGdjM1J5TG5KbGNHeGhZMlVvTDF0Y1hDMWNYRnRjWEYxY1hDOWNYSHRjWEgxY1hDaGNYQ2xjWENwY1hDdGNYRDljWEM1Y1hGeGNYRnhlWEZ3a1hGeDhYUzluTENBblhGeGNYQ1FtSnlrN1hHNTlYRzVjYmk4cUlHVnpiR2x1ZEMxa2FYTmhZbXhsSUNvdlhHNTJZWElnWDJWdWRHbDBlVTFoY0NBOUlIdGNiaUFnWENJbVhDSTZJRndpSm1GdGNEdGNJaXhjYmlBZ1hDSThYQ0k2SUZ3aUpteDBPMXdpTEZ4dUlDQmNJajVjSWpvZ1hDSW1aM1E3WENJc1hHNGdJQ2RjSWljNklDY21jWFZ2ZERzbkxGeHVJQ0JjSWlkY0lqb2dKeVlqTXprN0p5eGNiaUFnWENJdlhDSTZJQ2NtSTNneVJqc25YRzU5TzF4dUx5b2daWE5zYVc1MExXVnVZV0pzWlNBcUwxeHVYRzVtZFc1amRHbHZiaUJsYzJOaGNHVW9aR0YwWVNrZ2UxeHVJQ0JwWmlBb2RIbHdaVzltSUdSaGRHRWdQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnY21WMGRYSnVJR1JoZEdFdWNtVndiR0ZqWlNndld5WThQbHdpSjF4Y0wxMHZaeXdnWm5WdVkzUnBiMjRnS0hNcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCZlpXNTBhWFI1VFdGd1czTmRPMXh1SUNBZ0lIMHBPMXh1SUNCOVhHNWNiaUFnY21WMGRYSnVJR1JoZEdFN1hHNTlJaXdpYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0J5WlhGMWFYSmxLQ2N1TDJScGMzUXZZMjl0Ylc5dWFuTXZhVzVrWlhndWFuTW5LUzVrWldaaGRXeDBPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1UFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dYQ0pmWDJWelRXOWtkV3hsWENJc0lIdGNiaUFnZG1Gc2RXVTZJSFJ5ZFdWY2JuMHBPMXh1WEc1MllYSWdYMlY0ZEdWdVpITWdQU0JQWW1wbFkzUXVZWE56YVdkdUlIeDhJR1oxYm1OMGFXOXVJQ2gwWVhKblpYUXBJSHNnWm05eUlDaDJZWElnYVNBOUlERTdJR2tnUENCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvT3lCcEt5c3BJSHNnZG1GeUlITnZkWEpqWlNBOUlHRnlaM1Z0Wlc1MGMxdHBYVHNnWm05eUlDaDJZWElnYTJWNUlHbHVJSE52ZFhKalpTa2dleUJwWmlBb1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tITnZkWEpqWlN3Z2EyVjVLU2tnZXlCMFlYSm5aWFJiYTJWNVhTQTlJSE52ZFhKalpWdHJaWGxkT3lCOUlIMGdmU0J5WlhSMWNtNGdkR0Z5WjJWME95QjlPMXh1WEc1MllYSWdaR1ZtWVhWc2RITWdQU0I3WEc0Z0lIUk9ZVzFsT2lBbmRDY3NYRzRnSUdreE9HNU9ZVzFsT2lBbmFURTRiaWNzWEc0Z0lHaGhibVJzWlU1aGJXVTZJQ2RzYjJOaGJHbDZaU2NzWEc0Z0lITmxiR1ZqZEc5eVFYUjBjam9nSjJSaGRHRXRhVEU0Ymljc1hHNGdJSFJoY21kbGRFRjBkSEk2SUNkcE1UaHVMWFJoY21kbGRDY3NYRzRnSUc5d2RHbHZibk5CZEhSeU9pQW5hVEU0YmkxdmNIUnBiMjV6Snl4Y2JpQWdkWE5sVDNCMGFXOXVjMEYwZEhJNklHWmhiSE5sTEZ4dUlDQndZWEp6WlVSbFptRjFiSFJXWVd4MVpVWnliMjFEYjI1MFpXNTBPaUIwY25WbFhHNTlPMXh1WEc1bWRXNWpkR2x2YmlCcGJtbDBLR2t4T0c1bGVIUXNJQ1FwSUh0Y2JpQWdkbUZ5SUc5d2RHbHZibk1nUFNCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUQ0Z01pQW1KaUJoY21kMWJXVnVkSE5iTWwwZ0lUMDlJSFZ1WkdWbWFXNWxaQ0EvSUdGeVozVnRaVzUwYzFzeVhTQTZJSHQ5TzF4dVhHNWNiaUFnYjNCMGFXOXVjeUE5SUY5bGVIUmxibVJ6S0h0OUxDQmtaV1poZFd4MGN5d2diM0IwYVc5dWN5azdYRzVjYmlBZ1puVnVZM1JwYjI0Z2NHRnljMlVvWld4bExDQnJaWGtzSUc5d2RITXBJSHRjYmlBZ0lDQnBaaUFvYTJWNUxteGxibWQwYUNBOVBUMGdNQ2tnY21WMGRYSnVPMXh1WEc0Z0lDQWdkbUZ5SUdGMGRISWdQU0FuZEdWNGRDYzdYRzVjYmlBZ0lDQnBaaUFvYTJWNUxtbHVaR1Y0VDJZb0oxc25LU0E5UFQwZ01Da2dlMXh1SUNBZ0lDQWdkbUZ5SUhCaGNuUnpJRDBnYTJWNUxuTndiR2wwS0NkZEp5azdYRzRnSUNBZ0lDQnJaWGtnUFNCd1lYSjBjMXN4WFR0Y2JpQWdJQ0FnSUdGMGRISWdQU0J3WVhKMGMxc3dYUzV6ZFdKemRISW9NU3dnY0dGeWRITmJNRjB1YkdWdVozUm9JQzBnTVNrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnYVdZZ0tHdGxlUzVwYm1SbGVFOW1LQ2M3SnlrZ1BUMDlJR3RsZVM1c1pXNW5kR2dnTFNBeEtTQjdYRzRnSUNBZ0lDQnJaWGtnUFNCclpYa3VjM1ZpYzNSeUtEQXNJR3RsZVM1c1pXNW5kR2dnTFNBeUtUdGNiaUFnSUNCOVhHNWNiaUFnSUNCbWRXNWpkR2x2YmlCbGVIUmxibVJFWldaaGRXeDBLRzhzSUhaaGJDa2dlMXh1SUNBZ0lDQWdhV1lnS0NGdmNIUnBiMjV6TG5CaGNuTmxSR1ZtWVhWc2RGWmhiSFZsUm5KdmJVTnZiblJsYm5RcElISmxkSFZ5YmlCdk8xeHVJQ0FnSUNBZ2NtVjBkWEp1SUY5bGVIUmxibVJ6S0h0OUxDQnZMQ0I3SUdSbFptRjFiSFJXWVd4MVpUb2dkbUZzSUgwcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaGhkSFJ5SUQwOVBTQW5hSFJ0YkNjcElIdGNiaUFnSUNBZ0lHVnNaUzVvZEcxc0tHa3hPRzVsZUhRdWRDaHJaWGtzSUdWNGRHVnVaRVJsWm1GMWJIUW9iM0IwY3l3Z1pXeGxMbWgwYld3b0tTa3BLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLR0YwZEhJZ1BUMDlJQ2QwWlhoMEp5a2dlMXh1SUNBZ0lDQWdaV3hsTG5SbGVIUW9hVEU0Ym1WNGRDNTBLR3RsZVN3Z1pYaDBaVzVrUkdWbVlYVnNkQ2h2Y0hSekxDQmxiR1V1ZEdWNGRDZ3BLU2twTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvWVhSMGNpQTlQVDBnSjNCeVpYQmxibVFuS1NCN1hHNGdJQ0FnSUNCbGJHVXVjSEpsY0dWdVpDaHBNVGh1WlhoMExuUW9hMlY1TENCbGVIUmxibVJFWldaaGRXeDBLRzl3ZEhNc0lHVnNaUzVvZEcxc0tDa3BLU2s3WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2hoZEhSeUlEMDlQU0FuWVhCd1pXNWtKeWtnZTF4dUlDQWdJQ0FnWld4bExtRndjR1Z1WkNocE1UaHVaWGgwTG5Rb2EyVjVMQ0JsZUhSbGJtUkVaV1poZFd4MEtHOXdkSE1zSUdWc1pTNW9kRzFzS0NrcEtTazdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaGhkSFJ5TG1sdVpHVjRUMllvSjJSaGRHRXRKeWtnUFQwOUlEQXBJSHRjYmlBZ0lDQWdJSFpoY2lCa1lYUmhRWFIwY2lBOUlHRjBkSEl1YzNWaWMzUnlLQ2RrWVhSaExTY3ViR1Z1WjNSb0tUdGNiaUFnSUNBZ0lIWmhjaUIwY21GdWMyeGhkR1ZrSUQwZ2FURTRibVY0ZEM1MEtHdGxlU3dnWlhoMFpXNWtSR1ZtWVhWc2RDaHZjSFJ6TENCbGJHVXVaR0YwWVNoa1lYUmhRWFIwY2lrcEtUdGNibHh1SUNBZ0lDQWdMeThnZDJVZ1kyaGhibWRsSUdsdWRHOGdkR2hsSUdSaGRHRWdZMkZqYUdWY2JpQWdJQ0FnSUdWc1pTNWtZWFJoS0dSaGRHRkJkSFJ5TENCMGNtRnVjMnhoZEdWa0tUdGNiaUFnSUNBZ0lDOHZJSGRsSUdOb1lXNW5aU0JwYm5SdklIUm9aU0JrYjIxY2JpQWdJQ0FnSUdWc1pTNWhkSFJ5S0dGMGRISXNJSFJ5WVc1emJHRjBaV1FwTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQmxiR1V1WVhSMGNpaGhkSFJ5TENCcE1UaHVaWGgwTG5Rb2EyVjVMQ0JsZUhSbGJtUkVaV1poZFd4MEtHOXdkSE1zSUdWc1pTNWhkSFJ5S0dGMGRISXBLU2twTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUd4dlkyRnNhWHBsS0dWc1pTd2diM0IwY3lrZ2UxeHVJQ0FnSUhaaGNpQnJaWGtnUFNCbGJHVXVZWFIwY2lodmNIUnBiMjV6TG5ObGJHVmpkRzl5UVhSMGNpazdYRzRnSUNBZ2FXWWdLQ0ZyWlhrZ0ppWWdkSGx3Wlc5bUlHdGxlU0FoUFQwZ0ozVnVaR1ZtYVc1bFpDY2dKaVlnYTJWNUlDRTlQU0JtWVd4elpTa2dhMlY1SUQwZ1pXeGxMblJsZUhRb0tTQjhmQ0JsYkdVdWRtRnNLQ2s3WEc0Z0lDQWdhV1lnS0NGclpYa3BJSEpsZEhWeWJqdGNibHh1SUNBZ0lIWmhjaUIwWVhKblpYUWdQU0JsYkdVc1hHNGdJQ0FnSUNBZ0lIUmhjbWRsZEZObGJHVmpkRzl5SUQwZ1pXeGxMbVJoZEdFb2IzQjBhVzl1Y3k1MFlYSm5aWFJCZEhSeUtUdGNibHh1SUNBZ0lHbG1JQ2gwWVhKblpYUlRaV3hsWTNSdmNpa2dkR0Z5WjJWMElEMGdaV3hsTG1acGJtUW9kR0Z5WjJWMFUyVnNaV04wYjNJcElIeDhJR1ZzWlR0Y2JseHVJQ0FnSUdsbUlDZ2hiM0IwY3lBbUppQnZjSFJwYjI1ekxuVnpaVTl3ZEdsdmJuTkJkSFJ5SUQwOVBTQjBjblZsS1NCdmNIUnpJRDBnWld4bExtUmhkR0VvYjNCMGFXOXVjeTV2Y0hScGIyNXpRWFIwY2lrN1hHNWNiaUFnSUNCdmNIUnpJRDBnYjNCMGN5QjhmQ0I3ZlR0Y2JseHVJQ0FnSUdsbUlDaHJaWGt1YVc1a1pYaFBaaWduT3ljcElENDlJREFwSUh0Y2JpQWdJQ0FnSUhaaGNpQnJaWGx6SUQwZ2EyVjVMbk53YkdsMEtDYzdKeWs3WEc1Y2JpQWdJQ0FnSUNRdVpXRmphQ2hyWlhsekxDQm1kVzVqZEdsdmJpQW9iU3dnYXlrZ2UxeHVJQ0FnSUNBZ0lDQXZMeUF1ZEhKcGJTZ3BPaUJVY21sdElIUm9aU0JqYjIxdFlTMXpaWEJoY21GMFpXUWdjR0Z5WVcxbGRHVnljeUJ2YmlCMGFHVWdaR0YwWVMxcE1UaHVJR0YwZEhKcFluVjBaUzVjYmlBZ0lDQWdJQ0FnYVdZZ0tHc2dJVDA5SUNjbktTQndZWEp6WlNoMFlYSm5aWFFzSUdzdWRISnBiU2dwTENCdmNIUnpLVHRjYmlBZ0lDQWdJSDBwTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQndZWEp6WlNoMFlYSm5aWFFzSUd0bGVTd2diM0IwY3lrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnYVdZZ0tHOXdkR2x2Ym5NdWRYTmxUM0IwYVc5dWMwRjBkSElnUFQwOUlIUnlkV1VwSUh0Y2JpQWdJQ0FnSUhaaGNpQmpiRzl1WlNBOUlIdDlPMXh1SUNBZ0lDQWdZMnh2Ym1VZ1BTQmZaWGgwWlc1a2N5aDdJR05zYjI1bE9pQmpiRzl1WlNCOUxDQnZjSFJ6S1R0Y2JseHVJQ0FnSUNBZ1pHVnNaWFJsSUdOc2IyNWxMbXh1Wnp0Y2JpQWdJQ0FnSUdWc1pTNWtZWFJoS0c5d2RHbHZibk11YjNCMGFXOXVjMEYwZEhJc0lHTnNiMjVsS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCb1lXNWtiR1VvYjNCMGN5a2dlMXh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpMbVZoWTJnb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdMeThnYkc5allXeHBlbVVnWld4bGJXVnVkQ0JwZEhObGJHWmNiaUFnSUNBZ0lHeHZZMkZzYVhwbEtDUW9kR2hwY3lrc0lHOXdkSE1wTzF4dVhHNGdJQ0FnSUNBdkx5QnNiMk5oYkdsNlpTQmphR2xzWkhKbGJseHVJQ0FnSUNBZ2RtRnlJR1ZzWlcxbGJuUnpJRDBnSkNoMGFHbHpLUzVtYVc1a0tDZGJKeUFySUc5d2RHbHZibk11YzJWc1pXTjBiM0pCZEhSeUlDc2dKMTBuS1R0Y2JpQWdJQ0FnSUdWc1pXMWxiblJ6TG1WaFkyZ29ablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNCc2IyTmhiR2w2WlNna0tIUm9hWE1wTENCdmNIUnpLVHRjYmlBZ0lDQWdJSDBwTzF4dUlDQWdJSDBwTzF4dUlDQjlPMXh1WEc0Z0lDOHZJQ1F1ZENBa0xta3hPRzRnYzJodmNuUmpkWFJjYmlBZ0pGdHZjSFJwYjI1ekxuUk9ZVzFsWFNBOUlHa3hPRzVsZUhRdWRDNWlhVzVrS0dreE9HNWxlSFFwTzF4dUlDQWtXMjl3ZEdsdmJuTXVhVEU0Yms1aGJXVmRJRDBnYVRFNGJtVjRkRHRjYmx4dUlDQXZMeUJ6Wld4bFkzUnZjaUJtZFc1amRHbHZiaUFrS0cxNVUyVnNaV04wYjNJcExteHZZMkZzYVhwbEtHOXdkSE1wTzF4dUlDQWtMbVp1VzI5d2RHbHZibk11YUdGdVpHeGxUbUZ0WlYwZ1BTQm9ZVzVrYkdVN1hHNTlYRzVjYm1WNGNHOXlkSE11WkdWbVlYVnNkQ0E5SUh0Y2JpQWdhVzVwZERvZ2FXNXBkRnh1ZlRzaUxDSXZMeUE3S0daMWJtTjBhVzl1S0NCM2FXNWtiM2NzSUdSdlkzVnRaVzUwTENBa0xDQjFibVJsWm1sdVpXUWdLU0I3WEc1Y2JtbHRjRzl5ZENCcE1UaHVaWGgwSUdaeWIyMGdKMmt4T0c1bGVIUW5PMXh1YVcxd2IzSjBJR3B4ZFdWeWVVa3hPRzVsZUhRZ1puSnZiU0FuYW5GMVpYSjVMV2t4T0c1bGVIUW5PMXh1WEc0dkx5QjJZWElnYVRFNGJpQTlJSEpsY1hWcGNtVW9KMmt4T0c0bktUdGNiaTh2SUhaaGNpQnFjWFZsY25sSk1UaHVaWGgwSUQwZ2NtVnhkV2x5WlNnbmFuRjFaWEo1TFdreE9HNWxlSFFuS1R0Y2JseHVKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnWlc1bmJHbHphQ0E5SUhKbGNYVnBjbVVvWENJdUxpOHVMMnh2WTJGc1pYTXZaVzR2ZEhKaGJuTnNZWFJwYjI0dWFuTnZibHdpS1R0Y2JuWmhjaUJuWlhKdFlXNGdQU0J5WlhGMWFYSmxLRndpTGk0dkxpOXNiMk5oYkdWekwyUmxMM1J5WVc1emJHRjBhVzl1TG1wemIyNWNJaWs3WEc1Y2JuWmhjaUJ5WlhOdmRYSmpaWE1nUFNCN1hHNGdJR1Z1T2lCbGJtZHNhWE5vTEZ4dUlDQmtaVG9nWjJWeWJXRnVYRzU5TzF4dVhHNW1kVzVqZEdsdmJpQnBibWwwVTIxdmIzUm9VMk55YjJ4c2FXNW5LQ2w3WEc0Z0lDOHZJRk5sYkdWamRDQmhiR3dnYkdsdWEzTWdkMmwwYUNCb1lYTm9aWE5jYmlBZ0pDZ25ZVnRvY21WbUtqMWNJaU5jSWwwbktWeHVJQ0FnSUM4dklGSmxiVzkyWlNCc2FXNXJjeUIwYUdGMElHUnZiaWQwSUdGamRIVmhiR3g1SUd4cGJtc2dkRzhnWVc1NWRHaHBibWRjYmlBZ0lDQXVibTkwS0NkYmFISmxaajFjSWlOY0lsMG5LVnh1SUNBZ0lDNXViM1FvSjF0b2NtVm1QVndpSXpCY0lsMG5LVnh1SUNBZ0lDNWpiR2xqYXlobWRXNWpkR2x2YmlobGRtVnVkQ2tnZTF4dUlDQWdJQ0FnTHk4Z1QyNHRjR0ZuWlNCc2FXNXJjMXh1SUNBZ0lDQWdhV1lnS0Z4dUlDQWdJQ0FnSUNCc2IyTmhkR2x2Ymk1d1lYUm9ibUZ0WlM1eVpYQnNZV05sS0M5ZVhGd3ZMeXdnSnljcElEMDlJSFJvYVhNdWNHRjBhRzVoYldVdWNtVndiR0ZqWlNndlhseGNMeThzSUNjbktTQW1KbHh1SUNBZ0lDQWdJQ0JzYjJOaGRHbHZiaTVvYjNOMGJtRnRaU0E5UFNCMGFHbHpMbWh2YzNSdVlXMWxYRzRnSUNBZ0lDQXBJSHRjYmlBZ0lDQWdJQ0FnTHk4Z1JtbG5kWEpsSUc5MWRDQmxiR1Z0Wlc1MElIUnZJSE5qY205c2JDQjBiMXh1SUNBZ0lDQWdJQ0IyWVhJZ2RHRnlaMlYwSUQwZ0pDaDBhR2x6TG1oaGMyZ3BPMXh1SUNBZ0lDQWdJQ0IwWVhKblpYUWdQU0IwWVhKblpYUXViR1Z1WjNSb0lEOGdkR0Z5WjJWMElEb2dKQ2duVzI1aGJXVTlKeUFySUhSb2FYTXVhR0Z6YUM1emJHbGpaU2d4S1NBcklDZGRKeWs3WEc0Z0lDQWdJQ0FnSUM4dklFUnZaWE1nWVNCelkzSnZiR3dnZEdGeVoyVjBJR1Y0YVhOMFAxeHVJQ0FnSUNBZ0lDQnBaaUFvZEdGeVoyVjBMbXhsYm1kMGFDa2dlMXh1SUNBZ0lDQWdJQ0FnSUM4dklFOXViSGtnY0hKbGRtVnVkQ0JrWldaaGRXeDBJR2xtSUdGdWFXMWhkR2x2YmlCcGN5QmhZM1IxWVd4c2VTQm5iMjV1WVNCb1lYQndaVzVjYmlBZ0lDQWdJQ0FnSUNCbGRtVnVkQzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNRb0oyaDBiV3dzSUdKdlpIa25LUzVoYm1sdFlYUmxLSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lITmpjbTlzYkZSdmNEb2dkR0Z5WjJWMExtOW1abk5sZENncExuUnZjRnh1SUNBZ0lDQWdJQ0FnSUgwc0lERXdNREFzSUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1EyRnNiR0poWTJzZ1lXWjBaWElnWVc1cGJXRjBhVzl1WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJOZFhOMElHTm9ZVzVuWlNCbWIyTjFjeUZjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUFrZEdGeVoyVjBJRDBnSkNoMFlYSm5aWFFwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdKSFJoY21kbGRDNW1iMk4xY3lncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tDUjBZWEpuWlhRdWFYTW9YQ0k2Wm05amRYTmNJaWtwSUhzZ0x5OGdRMmhsWTJ0cGJtY2dhV1lnZEdobElIUmhjbWRsZENCM1lYTWdabTlqZFhObFpGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FrZEdGeVoyVjBMbUYwZEhJb0ozUmhZbWx1WkdWNEp5d25MVEVuS1RzZ0x5OGdRV1JrYVc1bklIUmhZbWx1WkdWNElHWnZjaUJsYkdWdFpXNTBjeUJ1YjNRZ1ptOWpkWE5oWW14bFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNSMFlYSm5aWFF1Wm05amRYTW9LVHNnTHk4Z1UyVjBJR1p2WTNWeklHRm5ZV2x1WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMWNiaUFnSUNCOUtUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1ptRmtaVWx1VTJOeWIyeHNWRzl3UW5WMGRHOXVLQ2w3WEc0Z0lHbG1JQ2drS0hkcGJtUnZkeWt1YzJOeWIyeHNWRzl3S0NrZ1BpQXlOVEFwSUh0Y2JpQWdJQ0FrS0NjdVltRmpheTEwYnkxMGIzQW5LUzVtWVdSbFNXNG9OREF3S1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNBa0tDY3VZbUZqYXkxMGJ5MTBiM0FuS1M1bVlXUmxUM1YwS0RRd01DazdYRzRnSUgxY2JuMWNibHh1ZG1GeUlHeGhibWQxWVdkbFRHOXZhM1Z3SUQwZ2UxeHVJQ0JjSWtSbGRYUnpZMmhjSWpvZ1hDSmtaVndpTEZ4dUlDQmNJa1Z1WjJ4cGMyaGNJam9nWENKbGJsd2lYRzU5WEc1Y2JtWjFibU4wYVc5dUlITjNhWFJqYUV4aGJtZDFZV2RsS0dWMlpXNTBLWHRjYmlBZ2RtRnlJSFJoY21kbGRDQTlJQ1FvWlhabGJuUXVkR0Z5WjJWMEtUdGNiaUFnTHk4Z2FXWW9KQ2hsZG1WdWRDNTBZWEpuWlhRcExtaGhjME5zWVhOektGd2lZV04wYVhabFhDSXBLVnh1SUNBdkx5QWdJSEpsZEhWeWJqdGNiaUFnSkNoY0lpTnNZVzVuZFdGblpYTWdMbXhoYm1kMVlXZGxYQ0lwTG5KbGJXOTJaVU5zWVhOektGd2lZV04wYVhabFhDSXBPMXh1SUNCMFlYSm5aWFF1WVdSa1EyeGhjM01vWENKaFkzUnBkbVZjSWlrN1hHNGdJR2t4T0c1bGVIUXVZMmhoYm1kbFRHRnVaM1ZoWjJVb2JHRnVaM1ZoWjJWTWIyOXJkWEJiZEdGeVoyVjBMblJsZUhRb0tWMHBPMXh1SUNBa0tGd2lXMlJoZEdFdGFURTRibDFjSWlrdWJHOWpZV3hwZW1Vb0tUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1lXUmtUR0Z1WjNWaFoyVlRkMmwwWTJoSVlXNWtiR1Z5S0NsN1hHNGdJQ1FvWENJamJHRnVaM1ZoWjJWeklDNXNZVzVuZFdGblpWd2lLUzVqYkdsamF5aHpkMmwwWTJoTVlXNW5kV0ZuWlNsY2JuMWNibHh1Wm5WdVkzUnBiMjRnYVc1cGRFcHhkV1Z5ZVVreE9HNWxlSFFvS1h0Y2JpQWdhVEU0Ym1WNGRDNXBibWwwS0h0Y2JpQWdJQ0JzYm1jNklDZGxiaWNzWEc0Z0lDQWdaR1ZpZFdjNklIUnlkV1VzWEc0Z0lDQWdjbVZ6YjNWeVkyVnpPaUJ5WlhOdmRYSmpaWE5jYmlBZ2ZTd2dablZ1WTNScGIyNG9aWEp5TENCMEtTQjdYRzRnSUNBZ0x5OGdhVzVwZEdsaGJHbDZaV1FnWVc1a0lISmxZV1I1SUhSdklHZHZJVnh1SUNCOUtUdGNibHh1SUNCcWNYVmxjbmxKTVRodVpYaDBMbWx1YVhRb2FURTRibVY0ZEN3Z0pDd2dlMXh1SUNBZ0lIUk9ZVzFsT2lBbmRDY3NJQzh2SUMwdFBpQmhjSEJsYm1SeklDUXVkQ0E5SUdreE9HNWxlSFF1ZEZ4dUlDQWdJR2t4T0c1T1lXMWxPaUFuYVRFNGJpY3NJQzh2SUMwdFBpQmhjSEJsYm1SeklDUXVhVEU0YmlBOUlHa3hPRzVsZUhSY2JpQWdJQ0JvWVc1a2JHVk9ZVzFsT2lBbmJHOWpZV3hwZW1VbkxDQXZMeUF0TFQ0Z1lYQndaVzVrY3lBa0tITmxiR1ZqZEc5eUtTNXNiMk5oYkdsNlpTaHZjSFJ6S1R0Y2JpQWdJQ0J6Wld4bFkzUnZja0YwZEhJNklDZGtZWFJoTFdreE9HNG5MQ0F2THlCelpXeGxZM1J2Y2lCbWIzSWdkSEpoYm5Oc1lYUnBibWNnWld4bGJXVnVkSE5jYmlBZ0lDQjBZWEpuWlhSQmRIUnlPaUFuYVRFNGJpMTBZWEpuWlhRbkxDQXZMeUJrWVhSaExTZ3BJR0YwZEhKcFluVjBaU0IwYnlCbmNtRmlJSFJoY21kbGRDQmxiR1Z0Wlc1MElIUnZJSFJ5WVc1emJHRjBaU0FvYVdZZ1pHbG1abkpsYm5RZ2RHaGxiaUJwZEhObGJHWXBYRzRnSUNBZ2IzQjBhVzl1YzBGMGRISTZJQ2RwTVRodUxXOXdkR2x2Ym5NbkxDQXZMeUJrWVhSaExTZ3BJR0YwZEhKcFluVjBaU0IwYUdGMElHTnZiblJoYVc1eklHOXdkR2x2Ym5Nc0lIZHBiR3dnYkc5aFpDOXpaWFFnYVdZZ2RYTmxUM0IwYVc5dWMwRjBkSElnUFNCMGNuVmxYRzRnSUNBZ2RYTmxUM0IwYVc5dWMwRjBkSEk2SUdaaGJITmxMQ0F2THlCelpXVWdiM0IwYVc5dWMwRjBkSEpjYmlBZ0lDQndZWEp6WlVSbFptRjFiSFJXWVd4MVpVWnliMjFEYjI1MFpXNTBPaUIwY25WbElDOHZJSEJoY25ObGN5QmtaV1poZFd4MElIWmhiSFZsY3lCbWNtOXRJR052Ym5SbGJuUWdaV3hsTG5aaGJDQnZjaUJsYkdVdWRHVjRkRnh1SUNCOUtUdGNibjFjYmx4dUx5OGdSRTlOSUdseklISmxZV1I1WEc0a0tHWjFibU4wYVc5dUtDbDdYRzRnSUdsdWFYUlRiVzl2ZEdoVFkzSnZiR3hwYm1jb0tUdGNiaUFnYVc1cGRFcHhkV1Z5ZVVreE9HNWxlSFFvS1R0Y2JpQWdZV1JrVEdGdVozVmhaMlZUZDJsMFkyaElZVzVrYkdWeUtDazdYRzRnSUNRb2QybHVaRzkzS1M1elkzSnZiR3dvWm1Ga1pVbHVVMk55YjJ4c1ZHOXdRblYwZEc5dUtUdGNiaUFnSkNoY0lpTnNiMkZrWlhKY0lpa3VjbVZ0YjNabFEyeGhjM01vWENKaFkzUnBkbVZjSWlrN1hHNTlLVHRjYmx4dUx5OGdmU2tvSUhkcGJtUnZkeXdnWkc5amRXMWxiblFzSUdwUmRXVnllU0FwTzF4dUlpd2liVzlrZFd4bExtVjRjRzl5ZEhNOWUxeHlYRzRnSUZ3aWJtRjJYQ0k2SUh0Y2NseHVJQ0FnSUZ3aWFHOXRaVndpT2lCY0lraHZiV1V6TXpOY0lpeGNjbHh1SUNBZ0lGd2ljSEp2YW1WamRITmNJam9nWENKUWNtOXFaV04wY3pNek0xd2lMRnh5WEc0Z0lDQWdYQ0poWW05MWRFMWxYQ0k2SUZ3aVFXSnZkWFFnVFdVek16TmNJaXhjY2x4dUlDQWdJRndpWTI5dWRHRmpkRndpT2lCY0lrTnZiblJoWTNRek16TmNJbHh5WEc0Z0lIMWNjbHh1ZlZ4eVhHNGlMQ0p0YjJSMWJHVXVaWGh3YjNKMGN6MTdYSEpjYmlBZ0lDQmNJbTVoZGx3aU9pQjdYSEpjYmlBZ0lDQWdJRndpYUc5dFpWd2lPaUJjSWtodmJXVXlNakpjSWl4Y2NseHVJQ0FnSUNBZ1hDSndjbTlxWldOMGMxd2lPaUJjSWxCeWIycGxZM1J6TWpJeVhDSXNYSEpjYmlBZ0lDQWdJRndpWVdKdmRYUk5aVndpT2lCY0lrRmliM1YwSUUxbE1qSXlYQ0lzWEhKY2JpQWdJQ0FnSUZ3aVkyOXVkR0ZqZEZ3aU9pQmNJa052Ym5SaFkzUXlNakpjSWx4eVhHNGdJQ0FnZlZ4eVhHNGdJSDBpWFgwPSJ9
