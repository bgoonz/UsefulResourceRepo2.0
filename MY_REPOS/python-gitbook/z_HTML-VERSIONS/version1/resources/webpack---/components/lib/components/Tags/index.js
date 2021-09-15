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
exports.Tags = void 0;
const react_1 = __importDefault(require('react'));
const Stack_1 = require('../Stack');
const Tag_1 = require('./Tag');

function Tags(_a) {
  var { tags } = _a,
    props = __rest(_a, ['tags']);
  return react_1.default.createElement(
    Stack_1.Stack,
    Object.assign(
      {
        align: 'center',
        gap: 1,
        css: {
          flexWrap: 'wrap',
          // we add margin instead for multiline tags
          // because stack doesn't support multilines
          '> *': {
            marginBottom: 1,
          },
        },
      },
      props
    ),
    tags.slice().map((tag) =>
      react_1.default.createElement(
        Tag_1.Tag,
        Object.assign(
          {
            key: tag,
            tag: tag,
          },
          props
        )
      )
    )
  );
}
exports.Tags = Tags;
