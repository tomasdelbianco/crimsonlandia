/**
 * Lifecycle system - Manages entity TTL and cleanup
 */

/**
 * Updates time-to-live for entities and removes dead ones
 * @param {import('../state.js').GameState} state
 * @param {number} dt - Delta time in seconds
 */
export function updateLifecycle(state, dt) {
  // Update TTL for entities that have it
  for (const entity of state.entities) {
    if (entity.ttl !== undefined) {
      entity.ttl -= dt;
    }
  }

  // Remove entities that should be cleaned up
  state.entities = state.entities.filter(entity => {
    // Remove if TTL expired
    if (entity.ttl !== undefined && entity.ttl <= 0) {
      return false;
    }

    // Remove if HP depleted (future: enemies, player respawn logic)
    if (entity.hp !== undefined && entity.hp <= 0) {
      return false;
    }

    // Keep alive
    return true;
  });
}
