/**
 * Collision system - Handles collision detection and damage
 */

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

    for (const enemy of enemies) {
      if (checkCircleCollision(bullet, enemy)) {
        handleBulletEnemyCollision(bullet, enemy);
        break; // Bullet can only hit one enemy
      }
    }
  }

  // 2. Enemy vs Player collisions
  if (!player) return; // No player, no damage

  for (const enemy of enemies) {
    if (checkCircleCollision(enemy, player)) {
      handleEnemyPlayerCollision(enemy, player);
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
 * @param {Object} bullet
 * @param {Object} enemy
 */
function handleBulletEnemyCollision(bullet, enemy) {
  // Deal damage to enemy
  enemy.hp -= bullet.damage;

  // Mark bullet for removal
  bullet.ttl = 0;
}

/**
 * Handles enemy touching player
 * @param {Object} enemy
 * @param {Object} player
 */
function handleEnemyPlayerCollision(enemy, player) {
  // Deal damage to player
  player.hp -= enemy.damage;

  // Future: Add knockback, damage cooldown, effects
}
