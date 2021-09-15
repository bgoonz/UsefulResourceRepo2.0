"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setElementStyle = exports.setElementStyle = function setElementStyle(element, style) {
  return Object.assign(element.style, style);
};

var delay = exports.delay = function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};