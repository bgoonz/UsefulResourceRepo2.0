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
exports.Avatar =
  exports.Pro =
  exports.AvatarImage =
  exports.AvatarContainer =
    void 0;
const react_1 = __importDefault(require('react'));
const css_1 = __importDefault(require('@styled-system/css'));
const styled_components_1 = __importDefault(require('styled-components'));
const Element_1 = require('../Element');
const Text_1 = require('../Text');
exports.AvatarContainer = styled_components_1.default(Element_1.Element).attrs({
  as: 'span',
})(
  css_1.default({
    display: 'inline-block',
    height: 8,
    width: 8,
    position: 'relative',
    flexShrink: 0,
  })
);
exports.AvatarImage = styled_components_1.default.img(
  css_1.default({
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: 'small',
    border: '1px solid',
    borderColor: 'avatar.border',
    backgroundColor: 'avatar.border',
  })
);
exports.Pro = styled_components_1.default(Text_1.Text).attrs({
  size: 1,
  weight: 'bold',
})(
  css_1.default({
    backgroundColor: 'blues.700',
    color: 'white',
    borderRadius: 'small',
    paddingX: 2,
    border: '1px solid',
    borderColor: 'sideBar.background',
    position: 'absolute',
    height: 3,
    lineHeight: '10px',
    bottom: '-4px',
    right: '-4px',
  })
);
exports.Avatar = (_a) => {
  var { user, file } = _a,
    props = __rest(_a, ['user', 'file']);
  return (
    user &&
    react_1.default.createElement(
      exports.AvatarContainer,
      Object.assign({}, props),
      react_1.default.createElement(exports.AvatarImage, {
        src: file !== null && file !== void 0 ? file : user.avatarUrl,
        alt: user.username,
      }),
      user.subscriptionSince
        ? react_1.default.createElement(exports.Pro, null, 'Pro')
        : null
    )
  );
};
