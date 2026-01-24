/**
 * Enemy system - Handles enemy AI and spawning
 */

import { createEnemy } from '../entities/enemy.js';

/**
 * Updates enemy AI and spawning
 * @param {import('../state.js').GameState} state
 * @param {number} dt - Delta time in seconds
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 */
export function updateEnemies(state, dt, canvasWidth, canvasHeight) {
  // Find player
  const player = state.entities.find(e => e.type === 'player');
  if (!player) return; // No player, no enemies

  // Update AI for existing enemies
  for (const entity of state.entities) {
    if (entity.type === 'enemy') {
      seekPlayer(entity, player, dt);
    }
  }

  // Update spawn timer
  state.spawn.timer -= dt;
  if (state.spawn.timer <= 0) {
    spawnEnemy(state, canvasWidth, canvasHeight);
    state.spawn.timer = state.spawn.interval;
    state.spawn.count++;
  }
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
 * @param {number} dt - Delta time
 */
function seekPlayer(enemy, player, dt) {
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
