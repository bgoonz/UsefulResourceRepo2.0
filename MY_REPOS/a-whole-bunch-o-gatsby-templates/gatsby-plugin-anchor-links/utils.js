"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logWarning = logWarning;
exports.scroller = scroller;
exports.handleLinkClick = handleLinkClick;
exports.handleStrippedLinkClick = handleStrippedLinkClick;
exports.stripHashedLocation = stripHashedLocation;
exports.checkHash = checkHash;
exports.isDevelopment = exports.isBrowser = void 0;

var _scrollToElement = _interopRequireDefault(require("scroll-to-element"));

var _gatsby = require("gatsby");

var errorTypes = _interopRequireWildcard(require("./errors"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isBrowser = typeof window !== 'undefined';
exports.isBrowser = isBrowser;
var isDevelopment = process.env.NODE_ENV !== 'production';
exports.isDevelopment = isDevelopment;

function logWarning(message) {
  if (isDevelopment) console.warn(message);
}

function scroller(target) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  (0, _scrollToElement["default"])(target, {
    duration: duration,
    offset: offset
  });
}

function handleLinkClick(to, e, onAnchorLinkClick) {
  /**
   * Log warnings on click
   */
  var improperFormatting = !to.includes('/') || !to.includes('#');
  if (improperFormatting) logWarning(errorTypes.IMPROPPER_FORMATTING);

  if (isBrowser && to.includes('#')) {
    var _to$split = to.split('#'),
        _to$split2 = _slicedToArray(_to$split, 2),
        anchorPath = _to$split2[0],
        anchor = _to$split2[1];

    if (window.location.pathname === (0, _gatsby.withPrefix)(anchorPath)) {
      e.preventDefault();
      scroller("#".concat(anchor), window.gatsby_scroll_offset, window.gatsby_scroll_duration);
    }
  }

  if (onAnchorLinkClick) onAnchorLinkClick();
}

function handleStrippedLinkClick(to, e, onAnchorLinkClick) {
  /**
   * Log warnings on click
   */
  var improperFormatting = !to.includes('/') || !to.includes('#');
  if (improperFormatting) logWarning(errorTypes.IMPROPPER_FORMATTING);

  var _to$split3 = to.split('#'),
      _to$split4 = _slicedToArray(_to$split3, 2),
      anchorPath = _to$split4[0],
      anchor = _to$split4[1];
  /**
   * Determine location, run scroller or set window variable
   */


  var isSamePage = isBrowser && window.location.pathname === anchorPath;
  var isDifferentPage = isBrowser && window.location.pathname !== anchorPath;

  if (isSamePage) {
    e.preventDefault();
    scroller("#".concat(anchor), window.gatsby_scroll_offset, window.gatsby_scroll_duration);
  }

  if (isDifferentPage) {
    window.gatsby_scroll_hash = "#".concat(anchor);
  }

  if (onAnchorLinkClick) onAnchorLinkClick();
}

function stripHashedLocation(to) {
  return to.split('#')[0];
}

function checkHash(location, offset) {
  var hash = location.hash,
      selector = hash ? hash.substr(1) : null,
      validElement = selector ? document.getElementById(selector) : null;
  if (hash && Boolean(validElement)) scroller(hash, offset);else if (hash && selector && !validElement) logWarning(errorTypes.INVALID_HASH);
}