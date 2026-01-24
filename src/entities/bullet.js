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
 * @returns {Object} Bullet entity
 */
export function createBullet(id, x, y, vx, vy, damage, owner) {
  return {
    id,
    type: 'bullet',
    pos: { x, y },
    vel: { x: vx, y: vy },
    radius: 3,
    damage,
    ttl: 2.0, // Time to live in seconds
    owner, // 'player' or 'enemy'
    visual: {
      kind: 'debug',
      color: owner === 'player' ? '#ffff00' : '#ff0000' // Yellow for player, red for enemy
    }
  };
}
