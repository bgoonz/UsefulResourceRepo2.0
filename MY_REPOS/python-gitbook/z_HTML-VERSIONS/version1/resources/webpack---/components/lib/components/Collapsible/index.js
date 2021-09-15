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
exports.Collapsible = exports.Body = exports.Header = void 0;
const react_1 = __importDefault(require('react'));
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const visually_hidden_1 = __importDefault(require('@reach/visually-hidden'));
const Element_1 = require('../Element');
const Text_1 = require('../Text');
const SidebarRow_1 = require('../SidebarRow');
const Section = styled_components_1.default(Element_1.Element).attrs({
  as: 'section',
})(
  css_1.default({
    fontSize: 3,
  })
);
exports.Header = styled_components_1.default(SidebarRow_1.SidebarRow).attrs({
  gap: 2,
})(
  css_1.default({
    minHeight: '35px',
    paddingX: 3,
    borderBottom: '1px solid',
    // Note: sideBarSectionHeader exists but we dont use it because it is rarely implemented
    // in themes, so intentionally ignoring the declaration and using sidebar colors makes sense.
    borderColor: 'sideBar.border',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'sideBar.hoverBackground',
    },
    ':focus-within': {
      backgroundColor: 'sideBar.hoverBackground',
    },
  })
);
// temporary: replace with <Icon name="triangle/toggle">
const Icon = styled_components_1.default.svg((props) =>
  css_1.default({
    transform: props.open ? 'rotate(0)' : 'rotate(-90deg)',
    transition: 'transform',
    transitionDuration: (theme) => theme.speeds[1],
    opacity: 0.25,
  })
);
exports.Body = styled_components_1.default(Element_1.Element)((props) =>
  css_1.default({
    borderBottom: props.open ? '1px solid' : 'none',
    borderColor: 'sideBar.border',
    overflow: props.open ? 'auto' : 'hidden',
    paddingTop: props.open ? 4 : 0,
    paddingBottom: props.open ? 8 : 0,
    opacity: props.open ? 1 : 0,
    transition: 'all',
    transitionDuration: (theme) => theme.speeds[4],
  })
);
const ToggleIcon = (props) =>
  react_1.default.createElement(
    Icon,
    Object.assign(
      {
        width: '9',
        height: '6',
        viewBox: '0 0 9 6',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      props
    ),
    react_1.default.createElement('path', {
      d: 'M4.50009 6L-5.24537e-07 1.26364e-06L9 4.76837e-07L4.50009 6Z',
      fill: 'currentcolor',
    })
  );
exports.Collapsible = (_a) => {
  var { defaultOpen, title, children } = _a,
    props = __rest(_a, ['defaultOpen', 'title', 'children']);
  const [open, setOpen] = react_1.default.useState(defaultOpen || false);
  const toggle = () => setOpen(!open);
  return react_1.default.createElement(
    Section,
    Object.assign({}, props),
    react_1.default.createElement(
      exports.Header,
      {
        onClick: toggle,
      },
      react_1.default.createElement(ToggleIcon, {
        open: open,
      }),
      react_1.default.createElement(
        Text_1.Text,
        {
          weight: 'medium',
        },
        title
      ),
      react_1.default.createElement(
        visually_hidden_1.default,
        null,
        react_1.default.createElement('input', {
          type: 'checkbox',
          checked: open,
          readOnly: true,
        })
      )
    ),
    react_1.default.createElement(
      exports.Body,
      {
        open: open,
      },
      open ? children : null
    )
  );
};
