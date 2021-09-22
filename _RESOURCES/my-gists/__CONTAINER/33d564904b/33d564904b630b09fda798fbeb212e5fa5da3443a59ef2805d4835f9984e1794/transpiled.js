'use strict';

var _redux = require('redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reduxDevtools = require('redux-devtools');

var _reduxDevtoolsLogMonitor = require('redux-devtools-log-monitor');

var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DevTools = (0, _reduxDevtools.createDevTools)(_react2.default.createElement(_reduxDevtoolsLogMonitor2.default, { theme: 'tomorrow' }));

var Counter = function Counter(_ref) {
  var value = _ref.value;
  var onAdd = _ref.onAdd;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h1',
      null,
      value
    ),
    _react2.default.createElement(
      'button',
      { onClick: onAdd },
      '+'
    )
  );
};

var counter = function counter() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var action = arguments[1];

  if (action.type === 'inc') {
    return state + 1;
  }
  return state;
};

var store = (0, _redux.createStore)(counter, DevTools.instrument());
var render = function render() {
  _reactDom2.default.render(_react2.default.createElement(
    'div',
    { style: { height: '100%' } },
    _react2.default.createElement(Counter, {
      value: store.getState(),
      onAdd: function onAdd() {
        return store.dispatch({ type: 'inc' });
      }
    }),
    _react2.default.createElement(DevTools, { store: store })
  ), document.getElementById('root'));
};

render();
store.subscribe(render);