/**
 * Enemy system - Handles enemy AI, spawning, and wave management
 */

import { createEnemy } from '../entities/enemy.js';

/**
 * Updates enemy AI, spawning, and wave state
 * @param {import('../state.js').GameState} state
 * @param {number} dt - Delta time in seconds
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 */
export function updateEnemies(state, dt, canvasWidth, canvasHeight) {
  // Find player
  const player = state.entities.find(e => e.type === 'player');
  if (!player) return; // No player, no updates

  // Update AI for existing enemies
  for (const entity of state.entities) {
    if (entity.type === 'enemy') {
      seekPlayer(entity, player);
    }
  }

  // Update wave system
  updateWave(state, dt, canvasWidth, canvasHeight);
}

/**
 * Updates wave state machine
 * @param {import('../state.js').GameState} state
 * @param {number} dt
 * @param {number} width
 * @param {number} height
 */
function updateWave(state, dt, width, height) {
  const wave = state.wave;

  switch (wave.state) {
    case 'countdown':
      // Countdown before wave starts
      wave.countdown -= dt;
      if (wave.countdown <= 0) {
        wave.state = 'active';
        wave.spawnTimer = 0; // Spawn first enemy immediately
        console.log(`🌊 Wave ${wave.current} started! (${wave.enemiesTotal} enemies)`);
      }
      break;

    case 'active':
      // Spawn enemies until we reach the total
      if (wave.enemiesSpawned < wave.enemiesTotal) {
        wave.spawnTimer -= dt;
        if (wave.spawnTimer <= 0) {
          spawnEnemy(state, width, height);
          wave.enemiesSpawned++;
          wave.spawnTimer = wave.spawnInterval;
        }
      }

      // Check if wave is cleared (all enemies killed)
      const enemiesAlive = state.entities.filter(e => e.type === 'enemy').length;
      if (wave.enemiesSpawned >= wave.enemiesTotal && enemiesAlive === 0) {
        wave.state = 'cleared';
        console.log(`✅ Wave ${wave.current} cleared!`);
      }
      break;

    case 'cleared':
      // Brief pause, then start next wave
      wave.countdown -= dt;
      if (wave.countdown <= 0) {
        startNextWave(state);
      }
      break;
  }
}

/**
 * Starts the next wave with increased difficulty
 * @param {import('../state.js').GameState} state
 */
function startNextWave(state) {
  const wave = state.wave;

  wave.current++;
  wave.enemiesSpawned = 0;
  wave.enemiesKilled = 0;

  // Difficulty scaling (aggressive)
  // More enemies: 8 + (wave-1) * 3 → 8, 11, 14, 17, 20...
  wave.enemiesTotal = 8 + (wave.current - 1) * 3;

  // Faster spawns: 1.5 - (wave-1) * 0.2, min 0.4s
  wave.spawnInterval = Math.max(0.4, 1.5 - (wave.current - 1) * 0.2);

  // Reset state
  wave.state = 'countdown';
  wave.countdown = 3.0; // 3 second countdown

  console.log(`⏳ Wave ${wave.current} starting in 3 seconds...`);
}

/**
 * Spawns an enemy near the viewport edge, clamped to world bounds
 * @param {import('../state.js').GameState} state
 * @param {number} viewportWidth - Canvas width
 * @param {number} viewportHeight - Canvas height
 */
function spawnEnemy(state, viewportWidth, viewportHeight) {
  const pos = pickSpawnPointNearViewportEdge(state, viewportWidth, viewportHeight);
  const enemy = createEnemy(state.nextId++, pos.x, pos.y, 'basic');
  state.entities.push(enemy);
}

/**
 * Picks a spawn point near viewport edge, clamped to world bounds
 * @param {import('../state.js').GameState} state
 * @param {number} vw - Viewport width
 * @param {number} vh - Viewport height
 * @returns {{x: number, y: number}}
 */
function pickSpawnPointNearViewportEdge(state, vw, vh) {
  const cam = state.camera;
  const world = state.world;
  const margin = 30;          // Distance outside viewport to spawn
  const minDistToPlayer = 100;
  const maxRetries = 10;

  const player = state.entities.find(e => e.type === 'player');

  for (let i = 0; i < maxRetries; i++) {
    const side = state.rng.randomInt(0, 4);
    let x, y;

    // Calculate viewport bounds in world coords
    const viewLeft = cam.x;
    const viewRight = cam.x + vw;
    const viewTop = cam.y;
    const viewBottom = cam.y + vh;

    switch (side) {
      case 0: // Top
        x = state.rng.randomRange(viewLeft, viewRight);
        y = viewTop - margin;
        break;
      case 1: // Right
        x = viewRight + margin;
        y = state.rng.randomRange(viewTop, viewBottom);
        break;
      case 2: // Bottom
        x = state.rng.randomRange(viewLeft, viewRight);
        y = viewBottom + margin;
        break;
      case 3: // Left
        x = viewLeft - margin;
        y = state.rng.randomRange(viewTop, viewBottom);
        break;
      default:
        x = viewLeft;
        y = viewTop - margin;
    }

    // Clamp to world bounds (ensure spawn is inside the world)
    x = Math.max(0, Math.min(x, world.width));
    y = Math.max(0, Math.min(y, world.height));

    // Verify minimum distance to player
    if (player) {
      const dx = x - player.pos.x;
      const dy = y - player.pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDistToPlayer) {
        continue; // Too close, retry
      }
    }

    return { x, y };
  }

  // Fallback: spawn in corner opposite to player
  if (player) {
    const px = player.pos.x;
    const py = player.pos.y;
    return {
      x: px < world.width / 2 ? world.width - 20 : 20,
      y: py < world.height / 2 ? world.height - 20 : 20
    };
  }

  return { x: 0, y: 0 };
}

/**
 * Simple seeking AI - enemy moves toward player
 * @param {Object} enemy - Enemy entity
 * @param {Object} player - Player entity
 */
function seekPlayer(enemy, player) {
  // Calculate direction vector from enemy to player
  const dx = player.pos.x - enemy.pos.x;
  const dy = player.pos.y - enemy.pos.y;

  // Normalize and apply velocity
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > 0) {
    const dirX = dx / dist;
    const dirY = dy / dist;

    // Set velocity directly (movement system will apply it)
    enemy.vel.x = dirX * enemy.moveSpeed;
    enemy.vel.y = dirY * enemy.moveSpeed;
  }
}
