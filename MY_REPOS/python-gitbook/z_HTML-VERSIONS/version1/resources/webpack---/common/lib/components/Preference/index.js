'use strict';
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule
      ? mod
      : {
          default: mod,
        };
  };
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.Preference = void 0;
const react_1 = __importDefault(require('react'));
const Tooltip_1 = __importDefault(require('../Tooltip'));
const elements_1 = require('./elements');
const PreferenceDropdown_1 = require('./PreferenceDropdown');
const PreferenceKeybinding_1 = require('./PreferenceKeybinding');
const PreferenceNumber_1 = require('./PreferenceNumber');
const PreferenceSwitch_1 = require('./PreferenceSwitch');
const PreferenceText_1 = require('./PreferenceText');
exports.Preference = (_a) => {
  var { className, style, title, tooltip, innerClassName, innerStyle } = _a,
    contentProps = __rest(_a, [
      'className',
      'style',
      'title',
      'tooltip',
      'innerClassName',
      'innerStyle',
    ]);
  const getContent = () => {
    const stylingProps = {
      className: innerClassName,
      style: innerStyle,
    };
    switch (
      contentProps.type // need 'type' as discriminant of union type
    ) {
      case 'boolean':
        return react_1.default.createElement(
          PreferenceSwitch_1.PreferenceSwitch,
          Object.assign({}, stylingProps, contentProps)
        );
      case 'string':
        return react_1.default.createElement(
          PreferenceText_1.PreferenceText,
          Object.assign({}, stylingProps, contentProps)
        );
      case 'dropdown':
        return react_1.default.createElement(
          PreferenceDropdown_1.PreferenceDropdown,
          Object.assign({}, stylingProps, contentProps)
        );
      case 'keybinding':
        return react_1.default.createElement(
          PreferenceKeybinding_1.PreferenceKeybinding,
          Object.assign({}, stylingProps, contentProps)
        );
      default:
        return react_1.default.createElement(
          PreferenceNumber_1.PreferenceNumber,
          Object.assign({}, stylingProps, contentProps)
        );
    }
  };
  const Title = tooltip
    ? react_1.default.createElement(
        Tooltip_1.default,
        {
          content: tooltip,
          placement: 'right',
        },
        title
      )
    : react_1.default.createElement('span', null, title);
  return react_1.default.createElement(
    elements_1.Container,
    {
      className: className,
      style: style,
    },
    title ? Title : null,
    react_1.default.createElement('div', null, getContent())
  );
};
