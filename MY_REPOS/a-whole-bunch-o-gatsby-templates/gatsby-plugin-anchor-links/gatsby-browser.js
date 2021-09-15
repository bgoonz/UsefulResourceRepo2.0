"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onRouteUpdate = void 0;

var _utils = require("./utils");

var onRouteUpdate = function onRouteUpdate(_ref, _ref2) {
  var location = _ref.location;
  var _ref2$offset = _ref2.offset,
      offset = _ref2$offset === void 0 ? 0 : _ref2$offset,
      _ref2$duration = _ref2.duration,
      duration = _ref2$duration === void 0 ? 1000 : _ref2$duration;
  var windowHash;

  if (_utils.isBrowser) {
    window.gatsby_scroll_offset = offset;
    window.gatsby_scroll_duration = duration;
    windowHash = window.gatsby_scroll_hash;
  }

  windowHash ? (0, _utils.scroller)(windowHash, offset) : (0, _utils.checkHash)(location, offset);

  if (_utils.isBrowser && windowHash) {
    window.gatsby_scroll_hash = undefined;
  }
};

exports.onRouteUpdate = onRouteUpdate;