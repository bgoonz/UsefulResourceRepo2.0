'use strict';
/* eslint-disable */
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
exports.useMenuButtonContext =
  exports.MenuPopover =
  exports.MenuList =
  exports.MenuLink =
  exports.MenuItems =
  exports.MenuItem =
  exports.MenuButton =
  exports.Menu =
    void 0;
/**
 * Welcome to @reach/menu-button!
 *
 * An accessible dropdown menu for the common dropdown menu button design
 * pattern.
 *
 * @see Docs     https://reacttraining.com/reach-ui/menu-button
 * @see Source   https://github.com/reach/reach-ui/tree/master/packages/menu-button
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#menubutton
 *
 * TODO: Fix flash when opening a menu button on a screen with another open menu
 */
const react_1 = __importStar(require('react'));
const prop_types_1 = __importDefault(require('prop-types'));
const auto_id_1 = require('@reach/auto-id');
const popover_1 = __importDefault(require('@reach/popover'));
const descendants_1 = require('@reach/descendants');
const utils_1 = require('@reach/utils');
const __DEV__ = false;
////////////////////////////////////////////////////////////////////////////////
// Actions
const CLEAR_SELECTION_INDEX = 'CLEAR_SELECTION_INDEX';
const CLICK_MENU_ITEM = 'CLICK_MENU_ITEM';
const CLOSE_MENU = 'CLOSE_MENU';
const OPEN_MENU_AT_FIRST_ITEM = 'OPEN_MENU_AT_FIRST_ITEM';
const OPEN_MENU_CLEARED = 'OPEN_MENU_CLEARED';
const SEARCH_FOR_ITEM = 'SEARCH_FOR_ITEM';
const SELECT_ITEM_AT_INDEX = 'SELECT_ITEM_AT_INDEX';
const SET_BUTTON_ID = 'SET_BUTTON_ID';
const MenuDescendantContext = descendants_1.createDescendantContext(
  'MenuDescendantContext'
);
const MenuContext = utils_1.createNamedContext('MenuContext', {});
const initialState = {
  // The button ID is needed for aria controls and can be set directly and
  // updated for top-level use via context. Otherwise a default is set by useId.
  // TODO: Consider deprecating direct ID in 1.0 in favor of id at the top level
  //       for passing deterministic IDs to descendent components.
  buttonId: null,
  // Whether or not the menu is expanded
  isExpanded: false,
  // When a user begins typing a character string, the selection will change if
  // a matching item is found
  typeaheadQuery: '',
  // The index of the current selected item. When the selection is cleared a
  // value of -1 is used.
  selectionIndex: -1,
};
////////////////////////////////////////////////////////////////////////////////
/**
 * Menu
 *
 * The wrapper component for the other components. No DOM element is rendered.
 *
 * @see Docs https://reacttraining.com/reach-ui/menu-button#menu
 */
exports.Menu = ({ id, defaultOpen = false, children }) => {
  let buttonRef = react_1.useRef(null);
  let menuRef = react_1.useRef(null);
  let popoverRef = react_1.useRef(null);
  let [descendants, setDescendants] = descendants_1.useDescendantsInit();
  let [state, dispatch] = react_1.useReducer(
    reducer,
    Object.assign(Object.assign({}, initialState), {
      isExpanded: defaultOpen,
    })
  );
  let _id = auto_id_1.useId(id);
  let menuId = id || utils_1.makeId('menu', _id);
  // We use an event listener attached to the window to capture outside clicks
  // that close the menu. We don't want the initial button click to trigger this
  // when a menu is closed, so we can track this behavior in a ref for now.
  // We shouldn't need this when we rewrite with state machine logic.
  let buttonClickedRef = react_1.useRef(false);
  // We will put children callbacks in a ref to avoid triggering endless render
  // loops when using render props if the app code doesn't useCallback
  // https://github.com/reach/reach-ui/issues/523
  let selectCallbacks = react_1.useRef([]);
  // If the popover's position overlaps with an option when the popover
  // initially opens, the mouseup event will trigger a select. To prevent that,
  // we decide the menu button is only ready to make a selection if the pointer
  // moves first, otherwise the user is just registering the initial button
  // click rather than selecting an item. This is similar to a native select
  // on most platforms, and our menu button popover works similarly.
  let readyToSelect = react_1.useRef(false);
  let context = {
    buttonRef,
    dispatch,
    menuId,
    menuRef,
    popoverRef,
    buttonClickedRef,
    readyToSelect,
    selectCallbacks,
    state,
  };
  // When the menu is open, focus is placed on the menu itself so that
  // keyboard navigation is still possible.
  react_1.useEffect(() => {
    if (state.isExpanded) {
      // @ts-ignore
      window.__REACH_DISABLE_TOOLTIPS = true;
      window.requestAnimationFrame(() => {
        focus(menuRef.current);
      });
    } else {
      // We want to ignore the immediate focus of a tooltip so it doesn't pop
      // up again when the menu closes, only pops up when focus returns again
      // to the tooltip (like native OS tooltips).
      // @ts-ignore
      window.__REACH_DISABLE_TOOLTIPS = false;
    }
  }, [state.isExpanded]);
  react_1.useEffect(() => utils_1.checkStyles('menu-button'), []);
  return react_1.default.createElement(
    descendants_1.DescendantProvider,
    {
      context: MenuDescendantContext,
      items: descendants,
      set: setDescendants,
    },
    react_1.default.createElement(
      MenuContext.Provider,
      {
        value: context,
      },
      utils_1.isFunction(children)
        ? children({
            isExpanded: state.isExpanded,
            // TODO: Remove in 1.0
            isOpen: state.isExpanded,
            dispatch,
          })
        : children
    )
  );
};
if (__DEV__) {
  exports.Menu.displayName = 'Menu';
  exports.Menu.propTypes = {
    children: prop_types_1.default.oneOfType([
      prop_types_1.default.func,
      prop_types_1.default.node,
    ]),
  };
}
////////////////////////////////////////////////////////////////////////////////
/**
 * MenuButton
 *
 * Wraps a DOM `button` that toggles the opening and closing of the dropdown
 * menu. Must be rendered inside of a `<Menu>`.
 *
 * @see Docs https://reacttraining.com/reach-ui/menu-button#menubutton
 */
exports.MenuButton = utils_1.forwardRefWithAs(function MenuButton(
  _a,
  forwardedRef
) {
  var { as: Comp = 'button', onKeyDown, onMouseDown, id } = _a,
    props = __rest(_a, ['as', 'onKeyDown', 'onMouseDown', 'id']);
  let {
    buttonRef,
    buttonClickedRef,
    menuId,
    state: { buttonId, isExpanded },
    dispatch,
  } = react_1.useContext(MenuContext);
  let ref = utils_1.useForkedRef(buttonRef, forwardedRef);
  react_1.useEffect(() => {
    let newButtonId =
      id != null
        ? id
        : menuId
        ? utils_1.makeId('menu-button', menuId)
        : 'menu-button';
    if (buttonId !== newButtonId) {
      dispatch({
        type: SET_BUTTON_ID,
        payload: newButtonId,
      });
    }
  }, [buttonId, dispatch, id, menuId]);

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault(); // prevent scroll
        dispatch({
          type: OPEN_MENU_AT_FIRST_ITEM,
        });
        break;
      case 'Enter':
      case ' ':
        dispatch({
          type: OPEN_MENU_AT_FIRST_ITEM,
        });
        break;
      default:
        break;
    }
  }

  function handleMouseDown(event) {
    if (!isExpanded) {
      buttonClickedRef.current = true;
    }
    if (isRightClick(event.nativeEvent)) {
      return;
    } else if (isExpanded) {
      dispatch({
        type: CLOSE_MENU,
        payload: {
          buttonRef,
        },
      });
    } else {
      dispatch({
        type: OPEN_MENU_CLEARED,
      });
    }
  }
  return react_1.default.createElement(
    Comp,
    // When the menu is displayed, the element with role `button` has
    // `aria-expanded` set to `true`. When the menu is hidden, it is
    // recommended that `aria-expanded` is not present.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#menubutton
    Object.assign(
      {
        'aria-expanded': isExpanded ? true : undefined,
        'aria-haspopup': true,
        'aria-controls': menuId,
      },
      props,
      {
        ref: ref,
        'data-reach-menu-button': '',
        id: buttonId || undefined,
        onKeyDown: utils_1.wrapEvent(onKeyDown, handleKeyDown),
        onMouseDown: utils_1.wrapEvent(onMouseDown, handleMouseDown),
        type: 'button',
      }
    )
  );
});
if (__DEV__) {
  exports.MenuButton.displayName = 'MenuButton';
  exports.MenuButton.propTypes = {
    children: prop_types_1.default.node,
  };
}
////////////////////////////////////////////////////////////////////////////////
/**
 * MenuItemImpl
 *
 * MenuItem and MenuLink share most of the same functionality captured here.
 */
const MenuItemImpl = utils_1.forwardRefWithAs(function MenuItemImpl(
  _a,
  forwardedRef
) {
  var {
      as: Comp,
      index: indexProp,
      isLink = false,
      onClick,
      onDragStart,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      onMouseUp,
      onSelect,
      valueText: valueTextProp,
    } = _a,
    props = __rest(_a, [
      'as',
      'index',
      'isLink',
      'onClick',
      'onDragStart',
      'onMouseDown',
      'onMouseEnter',
      'onMouseLeave',
      'onMouseMove',
      'onMouseUp',
      'onSelect',
      'valueText',
    ]);
  let {
    buttonRef,
    dispatch,
    readyToSelect,
    selectCallbacks,
    state: { selectionIndex, isExpanded },
  } = react_1.useContext(MenuContext);
  let ownRef = react_1.useRef(null);
  // After the ref is mounted to the DOM node, we check to see if we have an
  // explicit valueText prop before looking for the node's textContent for
  // typeahead functionality.
  let [valueText, setValueText] = react_1.useState(valueTextProp || '');
  let setValueTextFromDom = react_1.useCallback(
    (node) => {
      if (node) {
        ownRef.current = node;
        if (
          !valueTextProp ||
          (node.textContent && valueText !== node.textContent)
        ) {
          setValueText(node.textContent);
        }
      }
    },
    [valueText, valueTextProp]
  );
  let ref = utils_1.useForkedRef(forwardedRef, setValueTextFromDom);
  let mouseEventStarted = react_1.useRef(false);
  let index = descendants_1.useDescendant(
    {
      element: ownRef.current,
      key: valueText,
      isLink,
    },
    MenuDescendantContext,
    indexProp
  );
  let isSelected = index === selectionIndex;
  // Update the callback ref array on every render
  selectCallbacks.current[index] = onSelect;

  function select() {
    focus(buttonRef.current);
    if (onSelect) {
      const result = onSelect();
      if (result && result.CLOSE_MENU === false) {
        // don't dispatch event
      } else {
        dispatch({
          type: CLICK_MENU_ITEM,
        });
      }
    } else {
      dispatch({
        type: CLICK_MENU_ITEM,
      });
    }
  }

  function handleClick(event) {
    if (isLink && !isRightClick(event.nativeEvent)) {
      select();
    }
  }

  function handleDragStart(event) {
    // Because we don't preventDefault on mousedown for links (we need the
    // native click event), clicking and holding on a link triggers a
    // dragstart which we don't want.
    if (isLink) {
      event.preventDefault();
    }
  }

  function handleMouseDown(event) {
    if (isRightClick(event.nativeEvent)) return;
    if (isLink) {
      // Signal that the mouse is down so we can react call the right function
      // if the user is clicking on a link.
      mouseEventStarted.current = true;
    } else {
      event.preventDefault();
    }
  }

  function handleMouseEnter(event) {
    if (!isSelected && index != null) {
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index,
        },
      });
    }
  }

  function handleMouseLeave(event) {
    // Clear out selection when mouse over a non-menu item child.
    dispatch({
      type: CLEAR_SELECTION_INDEX,
    });
  }

  function handleMouseMove() {
    readyToSelect.current = true;
    if (!isSelected && index != null) {
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index,
        },
      });
    }
  }

  function handleMouseUp(event) {
    if (!readyToSelect.current) {
      readyToSelect.current = true;
      return;
    }
    if (isRightClick(event.nativeEvent)) return;
    if (isLink) {
      // If a mousedown event was initiated on a menu link followed by a
      // mouseup event on the same link, we do nothing; a click event will
      // come next and handle selection. Otherwise, we trigger a click event.
      if (mouseEventStarted.current) {
        mouseEventStarted.current = false;
      } else if (ownRef.current) {
        ownRef.current.click();
      }
    } else {
      select();
    }
  }
  // When the menu closes, reset readyToSelect for the next interaction.
  react_1.useEffect(() => {
    if (!isExpanded) {
      readyToSelect.current = false;
    }
  }, [isExpanded, readyToSelect]);
  // Any time a mouseup event occurs anywhere in the document, we reset the
  // mouseEventStarted ref so we can check it again when needed.
  react_1.useEffect(() => {
    let ownerDocument = utils_1.getOwnerDocument(ownRef.current) || document;
    let listener = () => (mouseEventStarted.current = false);
    ownerDocument.addEventListener('mouseup', listener);
    return () => ownerDocument.removeEventListener('mouseup', listener);
  }, []);
  return react_1.default.createElement(
    Comp,
    Object.assign(
      {
        role: 'menuitem',
        id: useMenuItemId(index),
        tabIndex: -1,
      },
      props,
      {
        ref: ref,
        'data-reach-menu-item': '',
        'data-selected': isSelected ? '' : undefined,
        'data-valuetext': valueText,
        onClick: utils_1.wrapEvent(onClick, handleClick),
        onDragStart: utils_1.wrapEvent(onDragStart, handleDragStart),
        onMouseDown: utils_1.wrapEvent(onMouseDown, handleMouseDown),
        onMouseEnter: utils_1.wrapEvent(onMouseEnter, handleMouseEnter),
        onMouseLeave: utils_1.wrapEvent(onMouseLeave, handleMouseLeave),
        onMouseMove: utils_1.wrapEvent(onMouseMove, handleMouseMove),
        onMouseUp: utils_1.wrapEvent(onMouseUp, handleMouseUp),
      }
    )
  );
});
////////////////////////////////////////////////////////////////////////////////
/**
 * MenuItem
 *
 * Handles menu selection. Must be a direct child of a `<MenuList>`.
 *
 * @see Docs https://reacttraining.com/reach-ui/menu-button#menuitem
 */
exports.MenuItem = utils_1.forwardRefWithAs(function MenuItem(
  _a,
  forwardedRef
) {
  var { as = 'div' } = _a,
    props = __rest(_a, ['as']);
  return react_1.default.createElement(
    MenuItemImpl,
    Object.assign({}, props, {
      ref: forwardedRef,
      as: as,
    })
  );
});
if (__DEV__) {
  exports.MenuItem.displayName = 'MenuItem';
  exports.MenuItem.propTypes = {
    as: prop_types_1.default.any,
    onSelect: prop_types_1.default.func.isRequired,
  };
}
////////////////////////////////////////////////////////////////////////////////
/**
 * MenuItems
 *
 * A low-level wrapper for menu items. Compose it with `MenuPopover` for more
 * control over the nested components and their rendered DOM nodes, or if you
 * need to nest arbitrary components between the outer wrapper and your list.
 *
 * @see Docs https://reacttraining.com/reach-ui/menu-button#menuitems
 */
exports.MenuItems = utils_1.forwardRefWithAs(function MenuItems(
  _a,
  forwardedRef
) {
  var { as: Comp = 'div', children, id, onKeyDown } = _a,
    props = __rest(_a, ['as', 'children', 'id', 'onKeyDown']);
  const {
    menuId,
    dispatch,
    buttonRef,
    menuRef,
    selectCallbacks,
    state: { isExpanded, buttonId, selectionIndex, typeaheadQuery },
  } = react_1.useContext(MenuContext);
  const menuItems = descendants_1.useDescendants(MenuDescendantContext);
  const ref = utils_1.useForkedRef(menuRef, forwardedRef);
  react_1.useEffect(() => {
    // Respond to user char key input with typeahead
    const match = findItemFromTypeahead(menuItems, typeaheadQuery);
    if (typeaheadQuery && match != null) {
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index: match,
        },
      });
    }
    let timeout = window.setTimeout(
      () =>
        typeaheadQuery &&
        dispatch({
          type: SEARCH_FOR_ITEM,
          payload: '',
        }),
      1000
    );
    return () => window.clearTimeout(timeout);
  }, [dispatch, menuItems, typeaheadQuery]);
  const prevMenuItemsLength = utils_1.usePrevious(menuItems.length);
  const prevSelected = utils_1.usePrevious(menuItems[selectionIndex]);
  const prevSelectionIndex = utils_1.usePrevious(selectionIndex);
  react_1.useEffect(() => {
    if (selectionIndex > menuItems.length - 1) {
      // If for some reason our selection index is larger than our possible
      // index range (let's say the last item is selected and the list
      // dynamically updates), we need to select the last item in the list.
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index: menuItems.length - 1,
        },
      });
    } else if (
      // Checks if
      //  - menu length has changed
      //  - selection index has not changed BUT selected item has changed
      //
      // This prevents any dynamic adding/removing of menu items from actually
      // changing a user's expected selection.
      prevMenuItemsLength !== menuItems.length &&
      selectionIndex > -1 &&
      prevSelected &&
      prevSelectionIndex === selectionIndex &&
      menuItems[selectionIndex] !== prevSelected
    ) {
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index: menuItems.findIndex((i) => i.key === prevSelected.key),
        },
      });
    }
  }, [
    dispatch,
    menuItems,
    prevMenuItemsLength,
    prevSelected,
    prevSelectionIndex,
    selectionIndex,
  ]);
  let handleKeyDown = utils_1.wrapEvent(
    function handleKeyDown(event) {
      let { key } = event;
      if (!isExpanded) {
        return;
      }
      switch (key) {
        case 'Enter':
        case ' ':
          let selected = menuItems.find(
            (item) => item.index === selectionIndex
          );
          // For links, the Enter key will trigger a click by default, but for
          // consistent behavior across menu items we'll trigger a click when
          // the spacebar is pressed.
          if (selected) {
            if (selected.isLink && selected.element) {
              selected.element.click();
            } else {
              event.preventDefault();
              // Focus the button first by default when an item is selected.
              // We fire the onSelect callback next so the app can manage
              // focus if needed.
              focus(buttonRef.current);
              selectCallbacks.current[selected.index] &&
                selectCallbacks.current[selected.index]();
              dispatch({
                type: CLICK_MENU_ITEM,
              });
            }
          }
          break;
        case 'Escape':
          focus(buttonRef.current);
          dispatch({
            type: CLOSE_MENU,
            payload: {
              buttonRef,
            },
          });
          break;
        case 'Tab':
          // prevent leaving
          event.preventDefault();
          break;
        default:
          // Check if a user is typing some char keys and respond by setting
          // the query state.
          if (utils_1.isString(key) && key.length === 1) {
            const query = typeaheadQuery + key.toLowerCase();
            dispatch({
              type: SEARCH_FOR_ITEM,
              payload: query,
            });
          }
          break;
      }
    },
    descendants_1.useDescendantKeyDown(MenuDescendantContext, {
      currentIndex: selectionIndex,
      orientation: 'vertical',
      rotate: false,
      callback: (index) => {
        dispatch({
          type: SELECT_ITEM_AT_INDEX,
          payload: {
            index,
          },
        });
      },
      key: 'index',
    })
  );
  return (
    // TODO: Should probably file a but in jsx-a11y, but this is correct
    // according to https://www.w3.org/TR/wai-aria-practices-1.2/examples/menu-button/menu-button-actions-active-descendant.html
    // eslint-disable-next-line jsx-a11y/aria-activedescendant-has-tabindex
    react_1.default.createElement(
      Comp,
      // Refers to the descendant menuitem element that is visually indicated
      // as focused.
      // https://www.w3.org/TR/wai-aria-practices-1.2/examples/menu-button/menu-button-actions-active-descendant.html
      Object.assign(
        {
          'aria-activedescendant': useMenuItemId(selectionIndex) || undefined,
          'aria-labelledby': buttonId || undefined,
          // The element that contains the menu items displayed by activating the
          // button has role menu.
          // https://www.w3.org/TR/wai-aria-practices-1.2/#menubutton
          role: 'menu',
          tabIndex: -1,
        },
        props,
        {
          ref: ref,
          'data-reach-menu-items': '',
          id: menuId,
          onKeyDown: utils_1.wrapEvent(onKeyDown, handleKeyDown),
        }
      ),
      children
    )
  );
});
if (__DEV__) {
  exports.MenuItems.displayName = 'MenuItems';
  exports.MenuItems.propTypes = {
    children: prop_types_1.default.node,
  };
}
////////////////////////////////////////////////////////////////////////////////
/**
 * MenuLink
 *
 * Handles linking to a different page in the menu. By default it renders `<a>`,
 * but also accepts any other kind of Link as long as the `Link` uses the
 * `React.forwardRef` API.
 *
 * Must be a direct child of a `<MenuList>`.
 *
 * @see Docs https://reacttraining.com/reach-ui/menu-button#menulink
 */
exports.MenuLink = utils_1.forwardRefWithAs(function MenuLink(
  _a,
  forwardedRef
) {
  var { as = 'a', component, onSelect } = _a,
    props = __rest(_a, ['as', 'component', 'onSelect']);
  if (component) {
    console.warn(
      '[@reach/menu-button]: Please use the `as` prop instead of `component`.'
    );
  }
  return react_1.default.createElement(
    'div',
    {
      role: 'none',
      tabIndex: -1,
    },
    react_1.default.createElement(
      MenuItemImpl,
      Object.assign({}, props, {
        ref: forwardedRef,
        'data-reach-menu-link': '',
        as: as,
        isLink: true,
        onSelect: onSelect || utils_1.noop,
      })
    )
  );
});
if (__DEV__) {
  exports.MenuLink.displayName = 'MenuLink';
  exports.MenuLink.propTypes = {
    as: prop_types_1.default.any,
    component: prop_types_1.default.any,
  };
}
////////////////////////////////////////////////////////////////////////////////
/**
 * MenuList
 *
 * Wraps a DOM element that renders the menu items. Must be rendered inside of
 * a `<Menu>`.
 *
 * @see Docs https://reacttraining.com/reach-ui/menu-button#menulist
 */
exports.MenuList = react_1.forwardRef(function MenuList(_a, forwardedRef) {
  var { portal = true } = _a,
    props = __rest(_a, ['portal']);
  return react_1.default.createElement(
    exports.MenuPopover,
    {
      portal: portal,
    },
    react_1.default.createElement(
      exports.MenuItems,
      Object.assign({}, props, {
        ref: forwardedRef,
        'data-reach-menu-list': '',
      })
    )
  );
});
if (__DEV__) {
  exports.MenuList.displayName = 'MenuList';
  exports.MenuList.propTypes = {
    children: prop_types_1.default.node.isRequired,
  };
}
////////////////////////////////////////////////////////////////////////////////
/**
 * MenuPopover
 *
 * A low-level wrapper for the popover that appears when a menu button is open.
 * You can compose it with `MenuItems` for more control over the nested
 * components and their rendered DOM nodes, or if you need to nest arbitrary
 * components between the outer wrapper and your list.
 *
 * @see Docs https://reacttraining.com/reach-ui/menu-button#menupopover
 */
exports.MenuPopover = react_1.forwardRef(function MenuPopover(
  _a,
  forwardedRef
) {
  var { children, portal = true, position } = _a,
    props = __rest(_a, ['children', 'portal', 'position']);
  const {
    buttonRef,
    buttonClickedRef,
    dispatch,
    menuRef,
    popoverRef,
    state: { isExpanded },
  } = react_1.useContext(MenuContext);
  const ref = utils_1.useForkedRef(popoverRef, forwardedRef);
  react_1.useEffect(() => {
    function listener(event) {
      var _a;
      if (buttonClickedRef.current) {
        buttonClickedRef.current = false;
      } else {
        let { relatedTarget, target } = event;
        // We on want to close only if focus rests outside the menu
        if (isExpanded && popoverRef.current) {
          if (
            !((_a = popoverRef.current) === null || _a === void 0
              ? void 0
              : _a.contains(relatedTarget || target))
          ) {
            dispatch({
              type: CLOSE_MENU,
              payload: {
                buttonRef,
              },
            });
          }
        }
      }
    }
    window.addEventListener('mousedown', listener);
    return () => {
      window.removeEventListener('mousedown', listener);
    };
  }, [buttonClickedRef, buttonRef, dispatch, isExpanded, menuRef, popoverRef]);
  let commonProps = Object.assign(
    {
      ref,
      // TODO: remove in 1.0
      'data-reach-menu': '',
      'data-reach-menu-popover': '',
      hidden: !isExpanded,
      children,
    },
    props
  );
  return portal
    ? react_1.default.createElement(
        popover_1.default,
        Object.assign({}, commonProps, {
          targetRef: buttonRef,
          position: position,
        })
      )
    : react_1.default.createElement('div', Object.assign({}, commonProps));
});
if (__DEV__) {
  exports.MenuPopover.displayName = 'MenuPopover';
  exports.MenuPopover.propTypes = {
    children: prop_types_1.default.node,
  };
}
////////////////////////////////////////////////////////////////////////////////
/**
 * A hook that exposes data for a given `Menu` component to its descendants.
 *
 * @see Docs https://reacttraining.com/reach-ui/menu-button#usemenubuttoncontext
 */
function useMenuButtonContext() {
  let {
    state: { isExpanded },
  } = react_1.useContext(MenuContext);
  return react_1.useMemo(
    () => ({
      isExpanded,
    }),
    [isExpanded]
  );
}
exports.useMenuButtonContext = useMenuButtonContext;
////////////////////////////////////////////////////////////////////////////////
/**
 * When a user's typed input matches the string displayed in a menu item, it is
 * expected that the matching menu item is selected. This is our matching
 * function.
 */
function findItemFromTypeahead(items, string = '') {
  if (!string) {
    return null;
  }
  const found = items.find(({ element }) => {
    var _a, _b;
    return (_b =
      (_a =
        element === null || element === void 0 ? void 0 : element.dataset) ===
        null || _a === void 0
        ? void 0
        : _a.valuetext) === null || _b === void 0
      ? void 0
      : _b.toLowerCase().startsWith(string);
  });
  return found ? items.indexOf(found) : null;
}

function useMenuItemId(index) {
  let { menuId } = react_1.useContext(MenuContext);
  return index != null && index > -1
    ? utils_1.makeId(`option-${index}`, menuId)
    : undefined;
}

function isRightClick(nativeEvent) {
  return nativeEvent.which === 3 || nativeEvent.button === 2;
}

function focus(element) {
  element && element.focus();
}

function reducer(state, action = {}) {
  switch (action.type) {
    case CLICK_MENU_ITEM:
      return Object.assign(Object.assign({}, state), {
        isExpanded: false,
        selectionIndex: -1,
      });
    case CLOSE_MENU:
      return Object.assign(Object.assign({}, state), {
        isExpanded: false,
        selectionIndex: -1,
      });
    case OPEN_MENU_AT_FIRST_ITEM:
      return Object.assign(Object.assign({}, state), {
        isExpanded: true,
        selectionIndex: 0,
      });
    case OPEN_MENU_CLEARED:
      return Object.assign(Object.assign({}, state), {
        isExpanded: true,
        selectionIndex: -1,
      });
    case SELECT_ITEM_AT_INDEX:
      if (action.payload.index >= 0) {
        return Object.assign(Object.assign({}, state), {
          selectionIndex:
            action.payload.max != null
              ? Math.min(Math.max(action.payload.index, 0), action.payload.max)
              : Math.max(action.payload.index, 0),
        });
      }
      return state;
    case CLEAR_SELECTION_INDEX:
      return Object.assign(Object.assign({}, state), {
        selectionIndex: -1,
      });
    case SET_BUTTON_ID:
      return Object.assign(Object.assign({}, state), {
        buttonId: action.payload,
      });
    case SEARCH_FOR_ITEM:
      if (typeof action.payload !== 'undefined') {
        return Object.assign(Object.assign({}, state), {
          typeaheadQuery: action.payload,
        });
      }
      return state;
    default:
      return state;
  }
}
