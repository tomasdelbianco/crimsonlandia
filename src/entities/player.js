/**
 * Player entity factory
 */

import { getWeapon } from '../data/weapons.js';

/**
 * Creates a player entity
 * @param {number} id - Unique entity ID
 * @param {number} x - Initial X position
 * @param {number} y - Initial Y position
 * @param {string} [startWeapon='pistol'] - Starting weapon ID
 * @returns {Object} Player entity
 */
export function createPlayer(id, x, y, startWeapon = 'pistol') {
  const weapon = getWeapon(startWeapon);

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

    // Weapon system
    weaponId: startWeapon, // Current weapon ID (references WEAPONS data)
    weaponCooldown: 0, // Cooldown timer between shots
    currentAmmo: weapon.magazineSize, // Current ammo in magazine
    isReloading: false, // Whether currently reloading
    reloadTimer: 0, // Time remaining in reload

    visual: {
      kind: 'debug',
      color: '#00ff88' // Cyan/green
    }
  };
}
