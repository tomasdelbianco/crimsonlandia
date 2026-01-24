/**
 * Shooting system - Handles weapon firing, reload, and bullet spawning
 */

import { createBullet } from '../entities/bullet.js';
import { getWeapon } from '../data/weapons.js';

/**
 * Updates shooting for all entities with weapons
 * @param {import('../state.js').GameState} state
 * @param {number} dt - Delta time in seconds
 */
export function updateShooting(state, dt) {
  for (const entity of state.entities) {
    if (entity.type === 'player') {
      updatePlayerShooting(state, entity, dt);
    }
  }
}

/**
 * Handles player shooting, reload, and weapon cooldown
 * @param {import('../state.js').GameState} state
 * @param {Object} player - Player entity
 * @param {number} dt - Delta time
 */
function updatePlayerShooting(state, player, dt) {
  const weapon = getWeapon(player.weaponId);
  if (!weapon) return;

  // Handle reload
  if (player.isReloading) {
    player.reloadTimer -= dt;
    if (player.reloadTimer <= 0) {
      // Reload complete
      player.currentAmmo = weapon.magazineSize;
      player.isReloading = false;
      player.reloadTimer = 0;
      console.log(`🔫 ${weapon.name} reloaded!`);
    }
    return; // Can't shoot while reloading
  }

  // Decrease cooldown
  if (player.weaponCooldown > 0) {
    player.weaponCooldown -= dt;
  }

  // Check for manual reload (R key)
  if (state.input.keys.reload && player.currentAmmo < weapon.magazineSize) {
    startReload(player, weapon);
    return;
  }

  // Check if player is holding fire button and weapon is ready
  if (state.input.mouse.down && player.weaponCooldown <= 0) {
    // Auto-reload if empty
    if (player.currentAmmo <= 0) {
      startReload(player, weapon);
      return;
    }

    // Fire weapon
    fireWeapon(state, player, weapon);

    // Consume ammo and reset cooldown
    player.currentAmmo--;
    player.weaponCooldown = weapon.fireRate;

    // Auto-reload if magazine emptied
    if (player.currentAmmo <= 0) {
      startReload(player, weapon);
    }
  }
}

/**
 * Starts the reload process
 * @param {Object} player - Player entity
 * @param {Object} weapon - Weapon definition
 */
function startReload(player, weapon) {
  if (player.isReloading) return;

  player.isReloading = true;
  player.reloadTimer = weapon.reloadTime;
  console.log(`🔄 Reloading ${weapon.name}...`);
}

/**
 * Fires the weapon, spawning bullets
 * @param {import('../state.js').GameState} state
 * @param {Object} player - Player entity
 * @param {Object} weapon - Weapon definition
 */
function fireWeapon(state, player, weapon) {
  const baseAngle = player.angle;

  // Spawn multiple bullets if bulletsPerShot > 1
  for (let i = 0; i < weapon.bulletsPerShot; i++) {
    // Calculate spread angle
    let angle = baseAngle;
    if (weapon.spread > 0) {
      if (weapon.bulletsPerShot > 1) {
        // For shotgun: distribute bullets evenly across spread cone
        const spreadRange = weapon.spread;
        const step = spreadRange / (weapon.bulletsPerShot - 1);
        angle = baseAngle - spreadRange / 2 + step * i;
        // Add small random variation
        angle += (Math.random() - 0.5) * 0.05;
      } else {
        // For single bullet weapons: random spread
        angle += (Math.random() - 0.5) * weapon.spread;
      }
    }

    // Calculate velocity
    const vx = Math.cos(angle) * weapon.bulletSpeed;
    const vy = Math.sin(angle) * weapon.bulletSpeed;

    // Create bullet with weapon properties
    const bullet = createBullet(
      state.nextId++,
      player.pos.x,
      player.pos.y,
      vx,
      vy,
      weapon.damage,
      'player',
      {
        piercing: weapon.piercing,
        color: weapon.bulletColor,
        radius: weapon.bulletRadius
      }
    );

    state.entities.push(bullet);
  }
}

/**
 * Switches the player's weapon
 * @param {Object} player - Player entity
 * @param {string} weaponId - New weapon ID
 */
export function switchWeapon(player, weaponId) {
  const newWeapon = getWeapon(weaponId);
  if (!newWeapon) return;

  // Cancel any ongoing reload
  player.isReloading = false;
  player.reloadTimer = 0;

  // Switch weapon
  player.weaponId = weaponId;
  player.currentAmmo = newWeapon.magazineSize;
  player.weaponCooldown = 0;

  console.log(`🔫 Switched to ${newWeapon.name}`);
}
