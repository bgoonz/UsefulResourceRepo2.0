/*
  Used like so…
  
  ```
  import cssAnimation from './cssAnimation';
  
  cssAnimation.init();
  ```
*/

// ==========
// Constants.
// ==========

const event = 'DOMContentLoaded';
const attr = 'data-has-css-animation';
const d = document.documentElement;
const w = window;

// ==============
// Event handler.
// ==============

const handleLoad = () => {
  w.requestAnimationFrame(() => {
    d.setAttribute(attr, true);
  });
};

// ======================
// Remove event handlers.
// ======================

const unbind = () => {
  d.removeAttribute(attr);
  w.removeEventListener(event, handleLoad);
};

// ===================
// Add event handlers.
// ===================

const init = () => {
  // Prevent doubles.
  unbind();

  w.addEventListener(event, handleLoad);
};

// ==============
// Expose object.
// ==============

const cssAnimation = {
  init,
  unbind,
};

// =======
// Export.
// =======

export default cssAnimation;
