/**
 * Input system - Captures keyboard and mouse events
 * and stores them in state.input
 */

/**
 * Initializes input event listeners
 * @param {HTMLCanvasElement} canvas
 * @param {import('./state.js').GameState} state
 */
export function initInput(canvas, state) {
  // Keyboard events
  window.addEventListener('keydown', (e) => onKeyDown(e, state));
  window.addEventListener('keyup', (e) => onKeyUp(e, state));

  // Mouse events
  canvas.addEventListener('mousemove', (e) => onMouseMove(e, canvas, state));
  canvas.addEventListener('mousedown', (e) => onMouseDown(e, state));
  canvas.addEventListener('mouseup', (e) => onMouseUp(e, state));

  // Prevent context menu on right click
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  console.log('✅ Input system initialized');
}

/**
 * Handles keydown events
 * @param {KeyboardEvent} e
 * @param {import('./state.js').GameState} state
 */
function onKeyDown(e, state) {
  const key = e.key.toLowerCase();

  switch (key) {
    case 'w':
    case 'arrowup':
      state.input.keys.up = true;
      break;
    case 's':
    case 'arrowdown':
      state.input.keys.down = true;
      break;
    case 'a':
    case 'arrowleft':
      state.input.keys.left = true;
      break;
    case 'd':
    case 'arrowright':
      state.input.keys.right = true;
      break;
    case 'r':
      state.input.keys.reload = true;
      break;
    // Weapon switching (1-6)
    case '1':
      state.input.keys.weaponSwitch = 0;
      break;
    case '2':
      state.input.keys.weaponSwitch = 1;
      break;
    case '3':
      state.input.keys.weaponSwitch = 2;
      break;
    case '4':
      state.input.keys.weaponSwitch = 3;
      break;
    case '5':
      state.input.keys.weaponSwitch = 4;
      break;
    case '6':
      state.input.keys.weaponSwitch = 5;
      break;
  }
}

/**
 * Handles keyup events
 * @param {KeyboardEvent} e
 * @param {import('./state.js').GameState} state
 */
function onKeyUp(e, state) {
  const key = e.key.toLowerCase();

  switch (key) {
    case 'w':
    case 'arrowup':
      state.input.keys.up = false;
      break;
    case 's':
    case 'arrowdown':
      state.input.keys.down = false;
      break;
    case 'a':
    case 'arrowleft':
      state.input.keys.left = false;
      break;
    case 'd':
    case 'arrowright':
      state.input.keys.right = false;
      break;
    case 'r':
      state.input.keys.reload = false;
      break;
  }
}

/**
 * Handles mouse move events
 * @param {MouseEvent} e
 * @param {HTMLCanvasElement} canvas
 * @param {import('./state.js').GameState} state
 */
function onMouseMove(e, canvas, state) {
  const rect = canvas.getBoundingClientRect();
  state.input.mouse.x = e.clientX - rect.left;
  state.input.mouse.y = e.clientY - rect.top;
}

/**
 * Handles mouse down events
 * @param {MouseEvent} e
 * @param {import('./state.js').GameState} state
 */
function onMouseDown(e, state) {
  if (e.button === 0) { // Left click
    state.input.mouse.down = true;
  }
}

/**
 * Handles mouse up events
 * @param {MouseEvent} e
 * @param {import('./state.js').GameState} state
 */
function onMouseUp(e, state) {
  if (e.button === 0) { // Left click
    state.input.mouse.down = false;
  }
}
