/**
 * Weapon definitions - Data-driven weapon system
 *
 * Balance notes:
 * - All weapons have similar effective DPS (~35-50) with different trade-offs
 * - Reload mechanic adds tactical depth
 * - Piercing allows bullets to hit multiple enemies
 */

/**
 * @typedef {Object} WeaponDef
 * @property {string} id - Unique weapon identifier
 * @property {string} name - Display name
 * @property {number} fireRate - Seconds between shots
 * @property {number} damage - Damage per bullet
 * @property {number} bulletSpeed - Bullet velocity (units/sec)
 * @property {number} bulletsPerShot - Bullets fired per trigger pull
 * @property {number} spread - Spread angle in radians (0 = perfectly accurate)
 * @property {boolean} piercing - If true, bullet doesn't disappear on hit
 * @property {number} magazineSize - Bullets per magazine
 * @property {number} reloadTime - Seconds to reload
 * @property {string} bulletColor - Bullet visual color
 * @property {number} bulletRadius - Bullet visual size
 */

/** @type {Object.<string, WeaponDef>} */
export const WEAPONS = {
  pistol: {
    id: 'pistol',
    name: 'Pistol',
    fireRate: 0.25,        // 4 shots/sec
    damage: 12,            // 2 hits to kill basic enemy
    bulletSpeed: 600,
    bulletsPerShot: 1,
    spread: 0,             // Perfectly accurate
    piercing: false,
    magazineSize: 12,
    reloadTime: 1.0,
    bulletColor: '#ffff00', // Yellow
    bulletRadius: 3
  },

  smg: {
    id: 'smg',
    name: 'SMG',
    fireRate: 0.08,        // 12.5 shots/sec
    damage: 5,             // 4 hits to kill
    bulletSpeed: 500,
    bulletsPerShot: 1,
    spread: 0.15,          // ~8.5 degrees spread
    piercing: false,
    magazineSize: 30,
    reloadTime: 1.5,
    bulletColor: '#ffaa00', // Orange
    bulletRadius: 2
  },

  shotgun: {
    id: 'shotgun',
    name: 'Shotgun',
    fireRate: 0.7,         // ~1.4 shots/sec
    damage: 8,             // Per pellet
    bulletSpeed: 450,
    bulletsPerShot: 6,     // 6 pellets
    spread: 0.35,          // ~20 degrees cone
    piercing: false,
    magazineSize: 6,
    reloadTime: 2.2,
    bulletColor: '#ff6600', // Dark orange
    bulletRadius: 3
  },

  rifle: {
    id: 'rifle',
    name: 'Rifle',
    fireRate: 0.5,         // 2 shots/sec
    damage: 25,            // Almost one-shot kill
    bulletSpeed: 900,
    bulletsPerShot: 1,
    spread: 0,             // Perfectly accurate
    piercing: false,
    magazineSize: 5,
    reloadTime: 1.2,
    bulletColor: '#00ffff', // Cyan
    bulletRadius: 4
  },

  plasma: {
    id: 'plasma',
    name: 'Plasma',
    fireRate: 0.18,        // ~5.5 shots/sec
    damage: 8,
    bulletSpeed: 400,
    bulletsPerShot: 1,
    spread: 0,
    piercing: true,        // Goes through enemies!
    magazineSize: 20,
    reloadTime: 1.8,
    bulletColor: '#00ff88', // Green
    bulletRadius: 5
  },

  minigun: {
    id: 'minigun',
    name: 'Minigun',
    fireRate: 0.05,        // 20 shots/sec
    damage: 4,             // 5 hits to kill
    bulletSpeed: 550,
    bulletsPerShot: 1,
    spread: 0.12,          // ~7 degrees spread
    piercing: false,
    magazineSize: 100,
    reloadTime: 3.5,
    bulletColor: '#ff4444', // Red
    bulletRadius: 2
  }
};

/**
 * Gets a weapon definition by ID
 * @param {string} weaponId
 * @returns {WeaponDef|null}
 */
export function getWeapon(weaponId) {
  return WEAPONS[weaponId] || null;
}

/**
 * Gets all weapon IDs in order
 * @returns {string[]}
 */
export function getWeaponIds() {
  return ['pistol', 'smg', 'shotgun', 'rifle', 'plasma', 'minigun'];
}
