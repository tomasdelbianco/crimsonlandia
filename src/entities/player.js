/**
 * Player entity factory
 */

/**
 * Creates a player entity
 * @param {number} id - Unique entity ID
 * @param {number} x - Initial X position
 * @param {number} y - Initial Y position
 * @returns {Object} Player entity
 */
export function createPlayer(id, x, y) {
  return {
    id,
    type: 'player',
    pos: { x, y },
    vel: { x: 0, y: 0 },
    radius: 12,
    hp: 100,
    maxHp: 100,
    angle: 0, // Direction the player is aiming (radians)
    moveSpeed: 200, // Units per second (movement speed)
    friction: true, // Apply friction when not moving
    invincible: 0, // Invincibility frames timer (seconds)
    damageFlash: 0, // Visual flash timer when taking damage
    weapon: {
      cooldown: 0, // Current cooldown timer
      fireRate: 0.15, // Time between shots (150ms = ~6.6 shots/sec)
      bulletSpeed: 500, // Bullet velocity
      damage: 10 // Damage per bullet
    },
    visual: {
      kind: 'debug',
      color: '#00ff88' // Cyan/green
    }
  };
}
