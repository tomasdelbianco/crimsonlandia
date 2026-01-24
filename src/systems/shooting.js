/**
 * Shooting system - Handles weapon firing and bullet spawning
 */

import { createBullet } from '../entities/bullet.js';

/**
 * Updates shooting for all entities with weapons
 * @param {import('../state.js').GameState} state
 * @param {number} dt - Delta time in seconds
 */
export function updateShooting(state, dt) {
  for (const entity of state.entities) {
    if (entity.weapon) {
      // Decrease cooldown
      if (entity.weapon.cooldown > 0) {
        entity.weapon.cooldown -= dt;
      }

      // Handle player shooting
      if (entity.type === 'player') {
        updatePlayerShooting(state, entity, dt);
      }
    }
  }
}

/**
 * Handles player shooting input
 * @param {import('../state.js').GameState} state
 * @param {Object} player - Player entity
 * @param {number} dt - Delta time
 */
function updatePlayerShooting(state, player, dt) {
  // Check if player is holding fire button and weapon is ready
  if (state.input.mouse.down && player.weapon.cooldown <= 0) {
    spawnBullet(state, player);

    // Reset cooldown
    player.weapon.cooldown = player.weapon.fireRate;
  }
}

/**
 * Spawns a bullet from a shooter entity
 * @param {import('../state.js').GameState} state
 * @param {Object} shooter - Entity shooting the bullet
 */
function spawnBullet(state, shooter) {
  // Calculate bullet velocity from shooter's angle
  const speed = shooter.weapon.bulletSpeed;
  const vx = Math.cos(shooter.angle) * speed;
  const vy = Math.sin(shooter.angle) * speed;

  // Spawn bullet at shooter position (could offset by radius later)
  const bullet = createBullet(
    state.nextId++,
    shooter.pos.x,
    shooter.pos.y,
    vx,
    vy,
    shooter.weapon.damage,
    shooter.type
  );

  state.entities.push(bullet);
}
