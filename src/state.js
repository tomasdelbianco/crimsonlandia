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
 * @property {boolean} keys.reload - R key for manual reload
 * @property {number|null} keys.weaponSwitch - 0-5 for weapon slots, null if no switch
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
 * @property {Object} wave - Wave system state
 * @property {number} wave.current - Current wave number
 * @property {number} wave.enemiesTotal - Total enemies for this wave
 * @property {number} wave.enemiesSpawned - Enemies spawned so far
 * @property {number} wave.enemiesKilled - Enemies killed this wave
 * @property {string} wave.state - 'countdown' | 'active' | 'cleared'
 * @property {number} wave.countdown - Countdown timer
 * @property {number} wave.spawnTimer - Timer until next spawn
 * @property {number} wave.spawnInterval - Seconds between spawns
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
        right: false,
        reload: false,
        weaponSwitch: null  // 0-5 for weapon slots, null if no switch
      },
      mouse: {
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        down: false
      }
    },
    rng: null, // Initialized in main.js with seed
    wave: {
      current: 1,              // Current wave number
      enemiesTotal: 8,         // Total enemies for wave 1 (scales: 8, 11, 14...)
      enemiesSpawned: 0,       // Enemies spawned so far
      enemiesKilled: 0,        // Enemies killed this wave
      state: 'countdown',      // 'countdown' | 'active' | 'cleared'
      countdown: 3.0,          // Countdown timer (3s before wave starts)
      spawnTimer: 0,           // Timer for next spawn
      spawnInterval: 1.5       // Initial spawn interval (scales down per wave)
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
