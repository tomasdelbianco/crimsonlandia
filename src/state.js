/**
 * @typedef {Object} Vec2
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} InputState
 * @property {Object} keys
 * @property {boolean} keys.up
 * @property {boolean} keys.down
 * @property {boolean} keys.left
 * @property {boolean} keys.right
 * @property {Object} mouse
 * @property {number} mouse.x - Canvas-space X
 * @property {number} mouse.y - Canvas-space Y
 * @property {boolean} mouse.down - Left button pressed
 */

/**
 * @typedef {Object} GameState
 * @property {number} tick - Current tick number
 * @property {number} time - Game time in seconds
 * @property {number} nextId - Entity ID counter
 * @property {Array} entities - All game entities
 * @property {InputState} input - Current input state
 * @property {Object} rng - Random number generator
 * @property {Object} spawn - Enemy spawning state
 * @property {number} spawn.timer - Time until next spawn
 * @property {number} spawn.interval - Seconds between spawns
 * @property {number} spawn.count - Total enemies spawned
 * @property {string} gameState - "playing" | "paused" | "gameOver"
 */

/** @type {GameState} */
let state = null;

/**
 * Creates the initial game state
 * @param {number} canvasWidth - Canvas width for centering player
 * @param {number} canvasHeight - Canvas height for centering player
 * @returns {GameState}
 */
export function createInitialState(canvasWidth = 800, canvasHeight = 600) {
  return {
    tick: 0,
    time: 0,
    nextId: 1,
    entities: [],
    input: {
      keys: {
        up: false,
        down: false,
        left: false,
        right: false
      },
      mouse: {
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        down: false
      }
    },
    rng: null, // Initialized in main.js with seed
    spawn: {
      timer: 2.0, // First spawn after 2 seconds
      interval: 2.0, // Spawn every 2 seconds
      count: 0 // Total enemies spawned
    },
    gameState: 'playing'
  };
}

/**
 * Gets the current game state
 * @returns {GameState}
 */
export function getState() {
  return state;
}

/**
 * Sets the game state
 * @param {GameState} newState
 */
export function setState(newState) {
  state = newState;
}
