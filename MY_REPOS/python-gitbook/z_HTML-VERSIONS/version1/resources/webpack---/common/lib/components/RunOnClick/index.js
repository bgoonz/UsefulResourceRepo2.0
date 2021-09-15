'use strict';
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
const react_1 = __importDefault(require('react'));
const Fullscreen_1 = __importDefault(require('../flex/Fullscreen'));
const Centered_1 = __importDefault(require('../flex/Centered'));
const elements_1 = require('./elements');
const RunOnClick = ({ onClick }) =>
  react_1.default.createElement(
    Fullscreen_1.default,
    {
      style: {
        background: '#131313',
        cursor: 'pointer',
      },
      onClick: onClick,
    },
    react_1.default.createElement(
      Centered_1.default,
      {
        horizontal: true,
        vertical: true,
      },
      react_1.default.createElement(
        elements_1.Container,
        null,
        react_1.default.createElement(
          'div',
          {
            className: 'cube',
          },
          react_1.default.createElement(
            'div',
            {
              className: 'sides',
            },
            react_1.default.createElement('div', {
              className: 'top',
            }),
            react_1.default.createElement('div', {
              className: 'right',
            }),
            react_1.default.createElement('div', {
              className: 'bottom',
            }),
            react_1.default.createElement('div', {
              className: 'left',
            }),
            react_1.default.createElement('div', {
              className: 'front',
            }),
            react_1.default.createElement('div', {
              className: 'back',
            })
          ),
          react_1.default.createElement('div', {
            className: 'play',
          })
        ),
        react_1.default.createElement(elements_1.Text, null, 'Click to Run')
      )
    )
  );
exports.default = RunOnClick;
