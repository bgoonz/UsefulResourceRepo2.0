const states = {};
const keyMap = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  17: 'ctrl',
  18: 'alt',
  20: 'caps',
  27: 'esc',
  37: 'left',
  32: 'space',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'insert',
  46: 'delete'
};

/**
 * Change state of the key.
 *
 * @param {boolean} state
 * @param {Event} e
 */
function changeState(state, e) {
  const mapped = keyMap[e.keyCode] || String.fromCharCode(e.keyCode);
  states[mapped.toLowerCase()] = state;
}

window.addEventListener('keydown', changeState.bind(this, true));
window.addEventListener('keyup', changeState.bind(this, false));

export default states;
