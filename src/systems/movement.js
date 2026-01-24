/**
 * Movement system - Handles entity movement, player controls, and physics
 */

/**
 * Updates movement for all entities
 * @param {import('../state.js').GameState} state
 * @param {number} dt - Delta time in seconds
 */
export function updateMovement(state, dt) {
  for (const entity of state.entities) {
    if (entity.type === 'player') {
      updatePlayerMovement(entity, state.input, dt);
      updatePlayerAim(entity, state.input.mouse);

      // Apply friction only when not actively moving
      const isMoving = state.input.keys.up || state.input.keys.down ||
                       state.input.keys.left || state.input.keys.right;
      if (!isMoving && entity.friction) {
        applyFriction(entity, dt);
      }

      // Update invincibility timer
      if (entity.invincible > 0) {
        entity.invincible -= dt;
      }

      // Update damage flash timer
      if (entity.damageFlash > 0) {
        entity.damageFlash -= dt;
      }
    }

    // Apply velocity to position
    entity.pos.x += entity.vel.x * dt;
    entity.pos.y += entity.vel.y * dt;
  }
}

/**
 * Updates player movement based on input
 * @param {Object} player - Player entity
 * @param {import('../state.js').InputState} input - Current input state
 * @param {number} dt - Delta time in seconds
 */
function updatePlayerMovement(player, input, dt) {
  // Calculate movement direction from input
  let dx = 0;
  let dy = 0;

  if (input.keys.up) dy -= 1;
  if (input.keys.down) dy += 1;
  if (input.keys.left) dx -= 1;
  if (input.keys.right) dx += 1;

  // Normalize diagonal movement and apply velocity
  if (dx !== 0 || dy !== 0) {
    const length = Math.sqrt(dx * dx + dy * dy);
    dx /= length;
    dy /= length;

    // Set velocity directly (not acceleration) for responsive movement
    player.vel.x = dx * player.moveSpeed;
    player.vel.y = dy * player.moveSpeed;
  }
}

/**
 * Applies friction to slow down an entity
 * @param {Object} entity
 * @param {number} dt - Delta time in seconds
 */
function applyFriction(entity, dt) {
  // Linear friction for more responsive control
  // Decelerate at a fixed rate
  const deceleration = 1200; // Units per second squared

  const speed = Math.sqrt(entity.vel.x * entity.vel.x + entity.vel.y * entity.vel.y);

  if (speed > 0) {
    const drop = deceleration * dt;
    const newSpeed = Math.max(0, speed - drop);
    const scale = newSpeed / speed;

    entity.vel.x *= scale;
    entity.vel.y *= scale;
  }

  // Stop completely if moving very slowly (avoid floating point drift)
  if (Math.abs(entity.vel.x) < 1) entity.vel.x = 0;
  if (Math.abs(entity.vel.y) < 1) entity.vel.y = 0;
}

/**
 * Updates player aim angle to point at mouse
 * @param {Object} player - Player entity
 * @param {Object} mousePos - Mouse position {x, y}
 */
function updatePlayerAim(player, mousePos) {
  const dx = mousePos.x - player.pos.x;
  const dy = mousePos.y - player.pos.y;
  player.angle = Math.atan2(dy, dx);
}
