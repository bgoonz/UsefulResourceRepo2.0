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

const ATTR = 'data-has-css-animation';
const EVENT = 'DOMContentLoaded';
const FUNCTION = 'function';
const NO_PREFERENCE = '(prefers-reduced-motion: no-preference)';

const d = document.documentElement;
const w = window;

// ====================
// Set user preference.
// ====================

const setFlag = (media = {}) => {
	// Get match.
	const { matches } = media;

	// Get bool.
	const bool = !!matches;

	// Set attribute.
	d.setAttribute(ATTR, bool);
};

// =====================
// Remove event handler.
// =====================

const unbind = () => {
	w.removeEventListener(EVENT, handleLoad);
};

// =====================
// Define event handler.
// =====================

const handleLoad = () => {
	// Prevent doubles.
	unbind();

	// Has browser support?
	if (typeof w.matchMedia === FUNCTION && typeof w.requestAnimationFrame === FUNCTION) {
		// Wait for next frame.
		w.requestAnimationFrame(() => {
			// Get media.
			const match = w.matchMedia(NO_PREFERENCE);

			// Kickoff.
			setFlag(match);

			// Prevent doubles.
			match.removeListener(setFlag);

			// Add event.
			match.addListener(setFlag);
		});
	}
};

// ==================
// Add event handler.
// ==================

const init = () => {
	// Prevent doubles.
	unbind();

	// Add event.
	w.addEventListener(EVENT, handleLoad);
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

export { cssAnimation };
