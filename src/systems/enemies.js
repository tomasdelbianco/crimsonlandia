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
 * Spawns an enemy at a random edge position
 * @param {import('../state.js').GameState} state
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
function spawnEnemy(state, width, height) {
  const pos = getRandomEdgePosition(state.rng, width, height);
  const enemy = createEnemy(state.nextId++, pos.x, pos.y, 'basic');
  state.entities.push(enemy);
}

/**
 * Gets a random position on the edge of the screen
 * @param {Object} rng - Random number generator
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @returns {{x: number, y: number}}
 */
function getRandomEdgePosition(rng, width, height) {
  const side = rng.randomInt(0, 4); // 0=top, 1=right, 2=bottom, 3=left
  const margin = 20; // Spawn slightly outside visible area

  switch (side) {
    case 0: // Top
      return { x: rng.randomRange(0, width), y: -margin };
    case 1: // Right
      return { x: width + margin, y: rng.randomRange(0, height) };
    case 2: // Bottom
      return { x: rng.randomRange(0, width), y: height + margin };
    case 3: // Left
      return { x: -margin, y: rng.randomRange(0, height) };
    default:
      return { x: width / 2, y: -margin };
  }
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
