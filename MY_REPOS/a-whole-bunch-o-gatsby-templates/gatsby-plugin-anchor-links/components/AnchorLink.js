"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnchorLink = AnchorLink;

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

AnchorLink.propTypes = {
  to: _propTypes["default"].string.isRequired,
  title: _propTypes["default"].string,
  className: _propTypes["default"].string,
  stripHash: _propTypes["default"].bool,
  gatsbyLinkProps: _propTypes["default"].object,
  onAnchorLinkClick: _propTypes["default"].func,
  children: _propTypes["default"].node
};

function AnchorLink(_ref) {
  var to = _ref.to,
      title = _ref.title,
      children = _ref.children,
      className = _ref.className,
      _ref$stripHash = _ref.stripHash,
      stripHash = _ref$stripHash === void 0 ? false : _ref$stripHash,
      _ref$gatsbyLinkProps = _ref.gatsbyLinkProps,
      gatsbyLinkProps = _ref$gatsbyLinkProps === void 0 ? {} : _ref$gatsbyLinkProps,
      onAnchorLinkClick = _ref.onAnchorLinkClick;
  var onClickHandler = stripHash ? _utils.handleStrippedLinkClick : _utils.handleLinkClick;

  var linkProps = _objectSpread(_objectSpread({}, gatsbyLinkProps), {}, {
    /**
     * Spread optional gatsbyLinkProps object in fist, so our specific props will override
     */
    to: stripHash ? (0, _utils.stripHashedLocation)(to) : to,
    onClick: function onClick(e) {
      return onClickHandler(to, e, onAnchorLinkClick);
    }
  });
  /**
   * Optional props
   */


  if (title) linkProps.title = title;
  if (className) linkProps.className = className;
  return /*#__PURE__*/_react["default"].createElement(_gatsby.Link, linkProps, children ? children : title);
}