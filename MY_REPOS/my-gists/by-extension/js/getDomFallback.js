/*
  Helper to mock DOM methods, for
  when an element might not exist.
*/
const getDomFallback = () => {
  return {
    // Props.
    children: [],
    className: '',
    classList: {
      contains: () => false,
    },
    id: '',
    innerHTML: '',
    name: '',
    nextSibling: null,
    previousSibling: null,
    outerHTML: '',
    tagName: '',
    textContent: '',

    // Methods.
    addEventListener: () => undefined,
    appendChild: () => Object.create(null),
    blur: () => undefined,
    click: () => undefined,
    cloneNode: () => Object.create(null),
    closest: () => null,
    createElement: () => Object.create(null),
    execCommand: () => undefined,
    focus: () => undefined,
    getAttribute: () => null,
    hasAttribute: () => false,
    insertAdjacentElement: () => Object.create(null),
    insertBefore: () => Object.create(null),
    matchMedia: () => ({
      matches: false,
      addListener: () => undefined,
      removeListener: () => undefined,
    }),
    querySelector: () => null,
    querySelectorAll: () => [],
    removeAttribute: () => undefined,
    removeChild: () => Object.create(null),
    removeEventListener: () => undefined,
    replaceChild: () => Object.create(null),
    requestAnimationFrame: () => undefined,
    setAttribute: () => undefined,
  };
};

// Export.
export { getDomFallback };
