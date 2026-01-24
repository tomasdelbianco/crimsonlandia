/**
 * Enemy entity factory
 */

/**
 * Creates an enemy entity
 * @param {number} id - Unique entity ID
 * @param {number} x - Spawn X position
 * @param {number} y - Spawn Y position
 * @param {string} enemyType - Enemy variant ('basic', 'fast', 'tank')
 * @returns {Object} Enemy entity
 */
export function createEnemy(id, x, y, enemyType = 'basic') {
  // Enemy type configurations
  const types = {
    basic: {
      hp: 20,
      moveSpeed: 80,
      radius: 10,
      color: '#ff3333'
    },
    fast: {
      hp: 10,
      moveSpeed: 150,
      radius: 8,
      color: '#ff8833'
    },
    tank: {
      hp: 50,
      moveSpeed: 50,
      radius: 14,
      color: '#883333'
    }
  };

  const config = types[enemyType] || types.basic;

  return {
    id,
    type: 'enemy',
    enemyType,
    pos: { x, y },
    vel: { x: 0, y: 0 },
    radius: config.radius,
    hp: config.hp,
    maxHp: config.hp,
    moveSpeed: config.moveSpeed,
    damage: 10, // Damage dealt to player on contact
    visual: {
      kind: 'debug',
      color: config.color
    }
  };
}
