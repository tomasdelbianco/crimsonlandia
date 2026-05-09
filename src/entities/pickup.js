/**
 * Pickup entity factory
 */

/**
 * Pickup type configurations
 */
const PICKUP_CONFIGS = {
  health: { color: '#00ff00', radius: 8, defaultValue: 20 },
  ammo:   { color: '#ffaa00', radius: 8, defaultValue: 999 },
  weapon: { color: '#00ffff', radius: 10, defaultValue: 0 }
};

/**
 * Creates a pickup entity
 * @param {number} id - Unique entity ID
 * @param {number} x - Spawn X position
 * @param {number} y - Spawn Y position
 * @param {string} pickupType - 'health' | 'ammo' | 'weapon'
 * @param {Object} [options] - Optional pickup properties
 * @param {number} [options.value] - Value for health/ammo pickups
 * @param {string} [options.weaponId] - Weapon ID for weapon pickups
 * @returns {Object} Pickup entity
 */
export function createPickup(id, x, y, pickupType, options = {}) {
  const cfg = PICKUP_CONFIGS[pickupType] || PICKUP_CONFIGS.health;

  return {
    id,
    type: 'pickup',
    pickupType,
    pos: { x, y },
    vel: { x: 0, y: 0 },
    radius: cfg.radius,
    value: options.value ?? cfg.defaultValue,
    weaponId: options.weaponId || null,
    ttl: 10.0, // Despawn after 10 seconds
    visual: {
      kind: 'debug',
      color: cfg.color
    }
  };
}
