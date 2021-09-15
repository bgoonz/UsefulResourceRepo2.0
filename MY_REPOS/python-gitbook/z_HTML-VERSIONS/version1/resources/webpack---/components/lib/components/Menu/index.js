'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', {
          enumerable: true,
          value: v,
        });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
exports.Menu = exports.isMenuClicked = exports.MenuStyles = void 0;
const react_1 = __importDefault(require('react'));
const deepmerge_1 = __importDefault(require('deepmerge'));
const css_1 = __importDefault(require('@styled-system/css'));
const styled_components_1 = require('styled-components');
const react_router_dom_1 = require('react-router-dom');
const ReachMenu = __importStar(require('./reach-menu.fork'));
const __1 = require('../..');
const transitions = {
  slide: styled_components_1.keyframes({
    from: {
      opacity: 0,
      transform: 'translateY(-4px)',
    },
  }),
  scale: styled_components_1.keyframes({
    from: {
      opacity: 0,
      transform: 'scale(0.7)',
    },
  }),
};
const MenuContext = react_1.default.createContext({
  trigger: null,
  portal: true,
});
exports.MenuStyles = styled_components_1.createGlobalStyle(
  css_1.default({
    '[data-reach-menu]': {
      zIndex: 11,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
    },
    '[data-reach-menu][hidden],[data-reach-menu-popover][hidden]': {
      display: 'none',
    },
    '[data-reach-menu-list][data-component=MenuList]': {
      minWidth: 100,
      backgroundColor: 'menuList.background',
      borderRadius: 3,
      boxShadow: 2,
      overflow: 'hidden',
      border: '1px solid',
      borderColor: 'menuList.border',
      ':focus': {
        outline: 'none',
      },
      transform: 'translateY(4px)',
      // override reach ui styles
      padding: 0,
    },
    '[data-reach-menu-item][data-component=MenuItem], [data-reach-menu-item][data-component=MenuLink]':
      {
        fontSize: 2,
        paddingY: 2,
        paddingX: 2,
        cursor: 'pointer',
        outline: 'none',
        color: 'menuList.foreground',
        '&[data-selected], :hover': {
          outline: 'none',
          backgroundColor: 'menuList.hoverBackground',
          color: 'menuList.hoverForeground',
        },
        '&[data-disabled], &[data-disabled]:hover': {
          outline: 'none',
          backgroundColor: 'transparent',
          color: 'inherit',
          opacity: 0.5,
          cursor: 'not-allowed',
        },
        // override reach ui styles
        font: 'inherit',
      },
    '[data-component=MenuDivider]': {
      margin: 0,
      border: 'none',
      borderBottom: '1px solid',
      borderColor: 'menuList.border',
    },
  }),
  styled_components_1.css`
      [data-reach-menu-list][data-trigger=MenuButton] {
        animation: ${transitions.slide} 150ms ease-out;
        transform-origin: top;
      }
      [data-reach-menu-list][data-trigger=MenuIconButton] {
        animation: ${transitions.scale} 150ms ease-out;
        transform-origin: top left;
      } 
    `
);
const Menu = (_a) => {
  var props = __rest(_a, []);
  const trigger = props.children[0].type.name;
  return react_1.default.createElement(
    __1.Element,
    Object.assign(
      {
        as: ReachMenu.Menu,
      },
      props
    ),
    react_1.default.createElement(
      MenuContext.Provider,
      {
        value: {
          trigger,
          portal: true,
        },
      },
      props.children
    )
  );
};
exports.Menu = Menu;
const ESC = 27;
const ALT = 18;
const ENTER = 13;
const SPACE = 32;
const ContextMenu = (_a) => {
  var { visible, setVisibility, position } = _a,
    props = __rest(_a, ['visible', 'setVisibility', 'position']);
  react_1.default.useEffect(() => {
    // close when user clicks outside or scrolls away
    const handler = () => {
      if (visible) setVisibility(false);
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, [visible, setVisibility]);
  // handle key down events - close on escape + disable the rest
  // TODO: handle arrow keys and space/enter.
  react_1.default.useEffect(() => {
    const handler = (event) => {
      if (!visible) return;
      if (
        event.keyCode === ESC ||
        event.keyCode === ALT ||
        event.keyCode === SPACE ||
        event.keyCode === ENTER
      )
        setVisibility(false);
      event.preventDefault();
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  });
  const menuRef = react_1.default.useRef(null);
  const [computedMenuHeight, setComputedMenuHeight] =
    react_1.default.useState(0);
  const [computedMenuWidth, setComputedMenuWidth] = react_1.default.useState(0);
  const [menuIsReadyToShow, setMenuIsReadyToShow] =
    react_1.default.useState(false);
  // enables keyboard navigation
  react_1.default.useEffect(() => {
    setTimeout(() => {
      if (!visible && !menuRef.current) return;
      menuRef.current.focus();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, menuRef.current]);
  react_1.default.useEffect(() => {
    // for the initial render, the menu is not ready to be shown
    // because the element height cannot be computed
    setMenuIsReadyToShow(false);
    setTimeout(() => {
      // once the ref is set and the menu is rendered in the dom
      // use its height to adjust the position of the popover
      if (menuRef.current) {
        const boundingRect = menuRef.current.getBoundingClientRect();
        setComputedMenuHeight(boundingRect.height);
        setComputedMenuWidth(boundingRect.width);
        setMenuIsReadyToShow(true);
      }
    });
  }, [position.x, position.y]);
  if (!visible) return null;
  return react_1.default.createElement(
    __1.Element,
    Object.assign(
      {
        as: ReachMenu.Menu,
      },
      props
    ),
    ({ isExpanded, dispatch }) => {
      if (visible && !isExpanded) {
        // keep it open if prop is set to visible
        dispatch({
          type: 'OPEN_MENU_AT_FIRST_ITEM',
        });
      }
      return react_1.default.createElement(
        MenuContext.Provider,
        {
          value: {
            trigger: null,
            portal: false,
          },
        },
        react_1.default.createElement(
          ReachMenu.MenuPopover,
          {
            position: (targetRect, popoverRect) => ({
              position: 'fixed',
              left: Math.min(
                position.x,
                window.innerWidth -
                  (popoverRect.width || computedMenuWidth) -
                  16
              ),
              top: Math.min(
                position.y,
                window.innerHeight -
                  (popoverRect.height || computedMenuHeight) -
                  16
              ),
            }),
          },
          react_1.default.createElement(
            Menu.List,
            {
              style: {
                visibility: menuIsReadyToShow ? 'visible' : 'hidden',
              },
              ref: menuRef,
            },
            props.children
          )
        )
      );
    }
  );
};
const MenuButton = (props) =>
  react_1.default.createElement(
    __1.Button,
    Object.assign(
      {
        as: ReachMenu.MenuButton,
        variant: 'link',
      },
      props,
      {
        css: deepmerge_1.default(
          {
            width: 'auto',
            // disable scale feedback of buttons in menu
            // to make the menu feel less jumpy
            transform: 'scale(1)',
            ':active:not(:disabled)': {
              transform: 'scale(1)',
            },
          },
          props.css || {}
        ),
      }
    ),
    props.children
  );
const MenuIconButton = (props) =>
  react_1.default.createElement(
    __1.IconButton,
    Object.assign(
      {
        as: ReachMenu.MenuButton,
      },
      props
    )
  );
const MenuList = react_1.default.forwardRef((_a, ref) => {
  var { style, children } = _a,
    props = __rest(_a, ['style', 'children']);
  const { trigger, portal } = react_1.default.useContext(MenuContext);
  return react_1.default.createElement(
    ReachMenu.MenuList,
    Object.assign(
      {
        style: style,
        ref: ref,
        'data-component': 'MenuList',
        'data-trigger': trigger,
        portal: portal,
      },
      props
    ),
    children
  );
});
const MenuItem = (props) =>
  react_1.default.createElement(
    __1.Element,
    Object.assign(
      {
        as: ReachMenu.MenuItem,
        'data-component': 'MenuItem',
      },
      props
    )
  );
const MenuLink = ({ children, to, title, href }) => {
  if (to) {
    return react_1.default.createElement(
      ReachMenu.MenuLink,
      {
        'data-component': 'MenuLink',
        as: react_router_dom_1.Link,
        to: to,
        title: title,
      },
      children
    );
  }
  return react_1.default.createElement(
    ReachMenu.MenuLink,
    {
      'data-component': 'MenuLink',
      href: href,
      title: title,
    },
    children
  );
};
const MenuDivider = (props) =>
  react_1.default.createElement(
    __1.Element,
    Object.assign(
      {
        as: 'hr',
        'data-component': 'MenuDivider',
        style: {
          margin: '0.25rem 0',
        },
      },
      props
    )
  );
Menu.Button = MenuButton;
Menu.IconButton = MenuIconButton;
Menu.List = MenuList;
Menu.Item = MenuItem;
Menu.Link = MenuLink;
Menu.Divider = MenuDivider;
Menu.ContextMenu = ContextMenu;
exports.isMenuClicked = (event) => {
  // don't trigger comment if you click on the menu
  // we handle this because of an upstream
  // bug in reach/menu-button
  const target = event.target;
  if (
    target.tagName === 'BUTTON' ||
    target.tagName === 'svg' ||
    target.tagName === 'path' ||
    target.className.includes('no-click')
  ) {
    return true;
  }
  return false;
};
