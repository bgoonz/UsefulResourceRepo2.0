'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.Text = exports.Container = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(
  require('@babel/runtime/helpers/taggedTemplateLiteral')
);

var _styledComponents = _interopRequireDefault(require('styled-components'));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2['default'])([
    "\n  color: #fff;\n  font-family: 'Inter UI', 'Roboto', sans-serif;\n  margin-top: 10rem;\n  font-size: 1rem;\n  width: 100%;\n  max-width: 400px;\n  font-weight: 500;\n  text-align: center;\n",
  ]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2['default'])([
    "\n  .cube,\n  .cube * {\n    position: absolute;\n    width: 6rem;\n    height: 6rem;\n  }\n  .cube .sides * {\n    opacity: 0.1;\n    box-sizing: border-box;\n    border: 0.12rem solid white;\n    border-radius: 0.25rem;\n    background: rgba(255, 255, 255, 0.1);\n  }\n  .sides {\n    transform-style: preserve-3d;\n    transform: rotateX(-37.5deg) rotateY(45deg);\n  }\n\n  .cube .sides .top {\n    transform: rotateX(90deg) translateZ(48px);\n    transform-origin: 50% 50%;\n  }\n\n  .cube .sides .bottom {\n    transform: rotateX(-90deg) translateZ(48px);\n    transform-origin: 50% 50%;\n  }\n\n  .cube .sides .front {\n    transform: rotateY(0deg) translateZ(48px);\n    transform-origin: 50% 50%;\n  }\n\n  .cube .sides .back {\n    transform: rotateY(-180deg) translateZ(48px);\n    transform-origin: 50% 50%;\n  }\n  .cube .sides .left {\n    transform: rotateY(-90deg) translateZ(48px);\n    transform-origin: 50% 50%;\n  }\n\n  .cube .sides .right {\n    transform: rotateY(90deg) translateZ(48px);\n    transform-origin: 50% 50%;\n  }\n\n  .play {\n    position: absolute;\n    background-color: white;\n    top: calc(50% - 0.5rem);\n    left: calc(50% - 0.5rem);\n  }\n  .play:before,\n  .play:after {\n    content: '';\n    position: absolute;\n    background-color: inherit;\n  }\n  .play,\n  .play:before,\n  .play:after {\n    width: 1rem;\n    height: 1rem;\n    border-top-right-radius: 30%;\n  }\n\n  .play {\n    transform: rotate(-90deg) skewX(-30deg) scale(1, 0.866);\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.24);\n  }\n  .play:before {\n    transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)\n      translate(0, -50%);\n  }\n  .play:after {\n    transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);\n  }\n",
  ]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

// directly copied from app/src/sandbox/status-screen
var Container = _styledComponents['default'].div(_templateObject());

exports.Container = Container;

var Text = _styledComponents['default'].div(_templateObject2());

exports.Text = Text;
