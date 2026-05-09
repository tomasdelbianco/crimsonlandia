/**
 * Drop tables and weapon progression system
 */

/**
 * Drop tables by enemy type
 * Format: [probability, pickupType, options]
 */
export const DROP_TABLES = {
  basic: [
    [0.15, 'health', { value: 20 }],
    [0.10, 'ammo', {}],
    [0.05, 'weapon', {}]
  ]
};

/**
 * Weapon unlock progression by wave number
 * Each weapon unlocks at a specific wave
 */
export const WEAPON_PROGRESSION = [
  { minWave: 2,  weaponId: 'smg' },
  { minWave: 4,  weaponId: 'shotgun' },
  { minWave: 6,  weaponId: 'rifle' },
  { minWave: 8,  weaponId: 'plasma' },
  { minWave: 10, weaponId: 'minigun' }
];

/**
 * Gets available weapons for current wave
 * @param {number} currentWave - Current wave number
 * @returns {string[]} Array of weapon IDs that can drop
 */
export function getAvailableWeapons(currentWave) {
  return WEAPON_PROGRESSION
    .filter(w => currentWave >= w.minWave)
    .map(w => w.weaponId);
}
