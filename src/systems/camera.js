/**
 * Camera system - Follows player with clamping to world bounds
 */

/**
 * Updates camera position to follow player, clamped to world bounds
 * @param {import('../state.js').GameState} state
 * @param {number} viewportWidth - Canvas width
 * @param {number} viewportHeight - Canvas height
 */
export function updateCamera(state, viewportWidth, viewportHeight) {
  const player = state.entities.find(e => e.type === 'player');
  if (!player) return;

  const world = state.world;
  const vw = viewportWidth;
  const vh = viewportHeight;

  // Target: center camera on player
  let camX = player.pos.x - vw / 2;
  let camY = player.pos.y - vh / 2;

  // Clamp to world bounds
  if (world.width >= vw) {
    // World larger than viewport: clamp to [0, world.width - viewport]
    camX = Math.max(0, Math.min(camX, world.width - vw));
  } else {
    // World smaller than viewport: center world in screen
    camX = (world.width - vw) / 2;
  }

  if (world.height >= vh) {
    camY = Math.max(0, Math.min(camY, world.height - vh));
  } else {
    camY = (world.height - vh) / 2;
  }

  state.camera.x = camX;
  state.camera.y = camY;
}

/**
 * Converts world coordinates to screen coordinates
 * @param {number} worldX
 * @param {number} worldY
 * @param {Object} camera - Camera state {x, y}
 * @returns {{x: number, y: number}} Screen coordinates
 */
export function worldToScreen(worldX, worldY, camera) {
  return {
    x: worldX - camera.x,
    y: worldY - camera.y
  };
}

/**
 * Converts screen coordinates to world coordinates
 * @param {number} screenX
 * @param {number} screenY
 * @param {Object} camera - Camera state {x, y}
 * @returns {{x: number, y: number}} World coordinates
 */
export function screenToWorld(screenX, screenY, camera) {
  return {
    x: screenX + camera.x,
    y: screenY + camera.y
  };
}
