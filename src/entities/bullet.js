/**
 * Bullet entity factory
 */

/**
 * Creates a bullet entity
 * @param {number} id - Unique entity ID
 * @param {number} x - Spawn X position
 * @param {number} y - Spawn Y position
 * @param {number} vx - Velocity X
 * @param {number} vy - Velocity Y
 * @param {number} damage - Damage dealt
 * @param {string} owner - Who fired it ('player' | 'enemy')
 * @param {Object} [options] - Optional bullet properties
 * @param {boolean} [options.piercing=false] - If true, doesn't disappear on hit
 * @param {string} [options.color] - Bullet color (default based on owner)
 * @param {number} [options.radius=3] - Bullet radius
 * @returns {Object} Bullet entity
 */
export function createBullet(id, x, y, vx, vy, damage, owner, options = {}) {
  const defaultColor = owner === 'player' ? '#ffff00' : '#ff0000';

  return {
    id,
    type: 'bullet',
    pos: { x, y },
    vel: { x: vx, y: vy },
    radius: options.radius || 3,
    damage,
    ttl: 2.0, // Time to live in seconds
    owner, // 'player' or 'enemy'
    piercing: options.piercing || false, // If true, goes through enemies
    visual: {
      kind: 'debug',
      color: options.color || defaultColor
    }
  };
}
