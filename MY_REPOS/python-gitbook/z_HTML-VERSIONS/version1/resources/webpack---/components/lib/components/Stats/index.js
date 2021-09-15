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
exports.Stats =
  exports.formatNumber =
  exports.ForkIcon =
  exports.ViewIcon =
  exports.HeartIcon =
    void 0;
const react_1 = __importDefault(require('react'));
const Text_1 = require('../Text');
const Stack_1 = require('../Stack');
const Icon_1 = require('../Icon');
exports.HeartIcon = (props) =>
  react_1.default.createElement(
    'svg',
    Object.assign(
      {
        width: 16,
        height: 16,
        fill: 'none',
        viewBox: '0 0 16 16',
      },
      props
    ),
    react_1.default.createElement('path', {
      fill: 'currentColor',
      d: 'M8.423 13.625c9.631-5.155 4.868-12.17 0-8.695-4.658-3.475-9.421 3.54 0 8.695z',
    })
  );
exports.ViewIcon = (props) =>
  react_1.default.createElement(
    'svg',
    Object.assign(
      {
        width: 16,
        height: 16,
        fill: 'none',
        viewBox: '0 0 16 16',
      },
      props
    ),
    react_1.default.createElement(
      'g',
      {
        fill: 'currentColor',
      },
      react_1.default.createElement('path', {
        fillRule: 'evenodd',
        d: 'M8 12.1c2.513 0 6.5-3.25 6.5-4.55S10.513 3 8 3 1.5 6.25 1.5 7.55c0 .975 3.987 4.55 6.5 4.55zm0-1.95a2.6 2.6 0 100-5.2 2.6 2.6 0 000 5.2z',
        clipRule: 'evenodd',
      }),
      react_1.default.createElement('circle', {
        cx: 8,
        cy: 7.5,
        r: 1.5,
      })
    )
  );
exports.ForkIcon = (props) =>
  react_1.default.createElement(
    'svg',
    Object.assign(
      {
        width: 16,
        height: 16,
        fill: 'none',
        viewBox: '0 0 16 16',
      },
      props
    ),
    react_1.default.createElement('path', {
      fill: 'currentColor',
      d: 'M13 3.625C13 2.715 12.267 2 11.333 2c-.933 0-1.666.715-1.666 1.625 0 .585.333 1.137.833 1.397v1.071a.75.75 0 01-.2.51L8.55 8.491a.75.75 0 01-1.1 0L5.7 6.603a.75.75 0 01-.2-.51v-1.07c.5-.26.833-.78.833-1.398C6.333 2.715 5.6 2 4.667 2 3.733 2 3 2.715 3 3.625c0 .585.333 1.137.833 1.397V6.71c0 .19.072.372.202.511l2.93 3.143a.75.75 0 01.202.511v.103c-.5.292-.834.812-.834 1.397C6.333 13.285 7.067 14 8 14s1.667-.715 1.667-1.625c0-.585-.334-1.105-.834-1.397v-.103a.75.75 0 01.202-.511l2.93-3.143a.75.75 0 00.202-.511V5.022c.5-.26.833-.78.833-1.397z',
    })
  );
exports.formatNumber = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count;
};
exports.Stats = (_a) => {
  var { sandbox } = _a,
    props = __rest(_a, ['sandbox']);
  return react_1.default.createElement(
    Stack_1.Stack,
    Object.assign(
      {
        gap: 4,
      },
      props
    ),
    typeof sandbox.likeCount !== 'undefined' &&
      react_1.default.createElement(
        Stack_1.Stack,
        {
          gap: 2,
          align: 'center',
        },
        react_1.default.createElement(
          Text_1.Text,
          {
            variant: 'muted',
            style: {
              display: 'flex',
              alignItems: 'center',
            },
          },
          react_1.default.createElement(Icon_1.Icon, {
            name: 'heart',
            size: 13,
          })
        ),
        react_1.default.createElement(
          Text_1.Text,
          {
            size: 3,
            variant: 'muted',
          },
          exports.formatNumber(sandbox.likeCount)
        )
      ),
    typeof sandbox.viewCount !== 'undefined' &&
      react_1.default.createElement(
        Stack_1.Stack,
        {
          gap: 2,
          align: 'center',
        },
        react_1.default.createElement(
          Text_1.Text,
          {
            variant: 'muted',
            style: {
              display: 'flex',
              alignItems: 'center',
            },
          },
          react_1.default.createElement(Icon_1.Icon, {
            name: 'eye',
            size: 16,
          })
        ),
        react_1.default.createElement(
          Text_1.Text,
          {
            size: 3,
            variant: 'muted',
          },
          exports.formatNumber(sandbox.viewCount)
        )
      ),
    typeof sandbox.forkCount !== 'undefined' &&
      react_1.default.createElement(
        Stack_1.Stack,
        {
          gap: 2,
          align: 'center',
        },
        react_1.default.createElement(
          Text_1.Text,
          {
            variant: 'muted',
            style: {
              display: 'flex',
              alignItems: 'center',
            },
          },
          react_1.default.createElement(Icon_1.Icon, {
            name: 'forkFilled',
            size: 14,
          })
        ),
        react_1.default.createElement(
          Text_1.Text,
          {
            size: 3,
            variant: 'muted',
          },
          exports.formatNumber(sandbox.forkCount)
        )
      )
  );
};
