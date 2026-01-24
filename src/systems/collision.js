/**
 * Collision system - Handles collision detection and damage
 */

import { spawnExplosion } from '../entities/particle.js';
import { playHit, playEnemyDeath, playPlayerHurt } from '../audio.js';

/**
 * Updates all collisions in the game
 * @param {import('../state.js').GameState} state
 */
export function updateCollisions(state) {
  const bullets = state.entities.filter(e => e.type === 'bullet');
  const enemies = state.entities.filter(e => e.type === 'enemy');
  const player = state.entities.find(e => e.type === 'player');

  // 1. Bullet vs Enemy collisions
  for (const bullet of bullets) {
    // Only check player bullets (enemies don't shoot yet)
    if (bullet.owner !== 'player') continue;

    // Initialize hit tracking for piercing bullets
    if (!bullet.hitEnemies) {
      bullet.hitEnemies = new Set();
    }

    for (const enemy of enemies) {
      // Skip if already hit this enemy (piercing bullets)
      if (bullet.hitEnemies.has(enemy.id)) continue;

      if (checkCircleCollision(bullet, enemy)) {
        handleBulletEnemyCollision(state, bullet, enemy);

        // Track that this bullet hit this enemy
        bullet.hitEnemies.add(enemy.id);

        // Non-piercing bullets stop after first hit
        if (!bullet.piercing) {
          break;
        }
        // Piercing bullets continue checking other enemies
      }
    }
  }

  // 2. Enemy vs Player collisions
  if (!player) return; // No player, no damage

  for (const enemy of enemies) {
    if (checkCircleCollision(enemy, player)) {
      handleEnemyPlayerCollision(state, enemy, player);
    }
  }
}

/**
 * Checks if two circular entities are colliding
 * @param {Object} a - First entity
 * @param {Object} b - Second entity
 * @returns {boolean} True if colliding
 */
function checkCircleCollision(a, b) {
  const dx = a.pos.x - b.pos.x;
  const dy = a.pos.y - b.pos.y;
  const distSq = dx * dx + dy * dy;
  const radiusSum = a.radius + b.radius;

  // Use squared distance to avoid expensive sqrt
  return distSq < radiusSum * radiusSum;
}

/**
 * Handles bullet hitting enemy
 * @param {Object} state - Game state
 * @param {Object} bullet
 * @param {Object} enemy
 */
function handleBulletEnemyCollision(state, bullet, enemy) {
  // Deal damage to enemy
  enemy.hp -= bullet.damage;

  // Mark bullet for removal (only for non-piercing bullets)
  if (!bullet.piercing) {
    bullet.ttl = 0;
  }

  // Sound hook
  playHit();

  // Check if enemy died
  if (enemy.hp <= 0) {
    // Spawn death particles
    spawnExplosion(state, enemy.pos.x, enemy.pos.y, '#ff4444', 10);
    playEnemyDeath();
  }
}

/**
 * Handles enemy touching player
 * @param {Object} state - Game state
 * @param {Object} enemy
 * @param {Object} player
 */
function handleEnemyPlayerCollision(state, enemy, player) {
  // Only damage if player doesn't have invincibility frames
  if (player.invincible > 0) return;

  // Deal damage to player
  player.hp -= enemy.damage;

  // Give player brief invincibility (0.5s)
  player.invincible = 0.5;

  // Sound hook
  playPlayerHurt();

  // Visual feedback: flash player red
  player.damageFlash = 0.1;
}
