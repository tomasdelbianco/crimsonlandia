import { setupCanvas, getCanvas, getContext, getCanvasSize } from './render/canvas.js';
import { createInitialState, getState, setState } from './state.js';
import { initInput } from './input.js';
import { createPlayer } from './entities/player.js';
import { createRNG } from './rng.js';
import { updateMovement } from './systems/movement.js';
import { updateShooting } from './systems/shooting.js';
import { updateEnemies } from './systems/enemies.js';
import { updateCollisions } from './systems/collision.js';
import { updateLifecycle } from './systems/lifecycle.js';
import { drawEntities } from './render/draw.js';

// Constants
const TICK_RATE = 60; // Hz
const TICK_DELTA = 1000 / TICK_RATE; // ms per tick
const MAX_FRAME_DELTA = 250; // Max time to process in one frame (avoid spiral of death)

// Timing
let lastTime = 0;
let accumulator = 0;
let tickCount = 0;

/**
 * Initializes the game
 */
function init() {
  console.log('🎮 Crimsonlandia - Initializing...');

  // Setup canvas
  setupCanvas('gameCanvas');
  const canvas = getCanvas();
  const { width, height } = getCanvasSize();
  console.log('✅ Canvas ready');

  // Create initial game state
  const initialState = createInitialState(width, height);
  setState(initialState);

  // Initialize RNG with current timestamp as seed
  const seed = Date.now();
  initialState.rng = createRNG(seed);
  console.log(`✅ RNG initialized with seed: ${seed}`);

  // Initialize input system
  initInput(canvas, initialState);

  // Create player entity in the center
  const player = createPlayer(initialState.nextId++, width / 2, height / 2);
  initialState.entities.push(player);
  console.log('✅ Player spawned at center');

  console.log('✅ State initialized');

  // Start game loop
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);

  console.log('✅ Game loop started at 60 Hz');
}

/**
 * Fixed timestep simulation tick
 * @param {number} dt - Delta time in seconds (always 1/60)
 */
function tick(dt) {
  const state = getState();

  // Update game time
  state.time += dt;
  state.tick++;

  // Log every 60 ticks (once per second)
  if (state.tick % 60 === 0) {
    console.log(`Tick ${state.tick} - Time: ${state.time.toFixed(2)}s`);
  }

  // Run game systems
  const { width, height } = getCanvasSize();
  updateMovement(state, dt);
  updateShooting(state, dt);
  updateEnemies(state, dt, width, height);
  updateCollisions(state);
  updateLifecycle(state, dt);
}

/**
 * Renders the current game state
 * @param {number} alpha - Interpolation factor (0-1)
 */
function render(alpha) {
  const ctx = getContext();
  const { width, height } = getCanvasSize();
  const state = getState();

  // Clear screen
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, width, height);

  // Render entities
  drawEntities(ctx, state.entities);

  // Check for player
  const player = state.entities.find(e => e.type === 'player');

  // Game Over screen
  if (!player) {
    ctx.fillStyle = '#ff0000';
    ctx.font = '48px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', width / 2, height / 2);
    ctx.font = '24px monospace';
    ctx.fillText('Refresh to restart', width / 2, height / 2 + 40);
    ctx.textAlign = 'left';
    return; // Don't render HUD
  }

  // Wave info (top-right)
  const wave = state.wave;
  ctx.fillStyle = '#ffff00';
  ctx.font = '20px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`Wave ${wave.current}`, width - 10, 30);

  ctx.font = '14px monospace';
  const enemyCount = state.entities.filter(e => e.type === 'enemy').length;
  const enemiesRemaining = wave.enemiesTotal - wave.enemiesSpawned + enemyCount;
  ctx.fillText(`Enemies: ${enemiesRemaining}`, width - 10, 50);

  ctx.textAlign = 'left';

  // Wave state messages (center)
  if (wave.state === 'countdown') {
    ctx.fillStyle = '#ffff00';
    ctx.font = '32px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`Wave ${wave.current}`, width / 2, height / 2 - 20);
    ctx.font = '48px monospace';
    ctx.fillText(Math.ceil(wave.countdown).toString(), width / 2, height / 2 + 30);
    ctx.textAlign = 'left';
  } else if (wave.state === 'cleared') {
    ctx.fillStyle = '#00ff00';
    ctx.font = '32px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Wave Cleared!', width / 2, height / 2);
    ctx.textAlign = 'left';
  }

  // Player HUD (top-left)
  ctx.fillStyle = '#00ff00';
  ctx.font = '14px monospace';
  ctx.fillText(`HP: ${player.hp}/${player.maxHp}`, 10, 20);
  ctx.fillText(`Time: ${state.time.toFixed(1)}s`, 10, 40);

  // Controls hint
  ctx.fillText(`WASD: Move | Click: Shoot`, 10, height - 10);
}

/**
 * Main game loop with fixed timestep
 * @param {number} currentTime - Current timestamp from requestAnimationFrame
 */
function gameLoop(currentTime) {
  // Calculate frame delta
  let frameDelta = currentTime - lastTime;
  lastTime = currentTime;

  // Clamp to avoid spiral of death
  if (frameDelta > MAX_FRAME_DELTA) {
    frameDelta = MAX_FRAME_DELTA;
  }

  // Accumulate time
  accumulator += frameDelta;

  // Fixed timestep updates
  while (accumulator >= TICK_DELTA) {
    tick(TICK_DELTA / 1000); // Convert ms to seconds
    accumulator -= TICK_DELTA;
    tickCount++;
  }

  // Render with interpolation factor
  const alpha = accumulator / TICK_DELTA;
  render(alpha);

  // Continue loop
  requestAnimationFrame(gameLoop);
}

// Boot the game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
