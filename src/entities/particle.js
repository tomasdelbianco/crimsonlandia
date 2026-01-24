/**
 * Particle entity factory
 */

/**
 * Creates a particle entity
 * @param {number} id - Unique ID
 * @param {number} x - Position X
 * @param {number} y - Position Y
 * @param {number} vx - Velocity X
 * @param {number} vy - Velocity Y
 * @param {string} color - Particle color
 * @param {number} size - Particle size (radius)
 * @param {number} ttl - Time to live in seconds
 * @returns {Object} Particle entity
 */
export function createParticle(id, x, y, vx, vy, color = '#ff6666', size = 3, ttl = 0.5) {
  return {
    id,
    type: 'particle',
    pos: { x, y },
    vel: { x: vx, y: vy },
    radius: size,
    ttl,
    visual: {
      kind: 'debug',
      color
    }
  };
}

/**
 * Spawns explosion particles at a position
 * @param {Object} state - Game state
 * @param {number} x - Center X
 * @param {number} y - Center Y
 * @param {string} color - Particle color
 * @param {number} count - Number of particles
 */
export function spawnExplosion(state, x, y, color = '#ff6666', count = 8) {
  for (let i = 0; i < count; i++) {
    // Random direction
    const angle = (Math.PI * 2 * i) / count + state.rng.randomRange(-0.3, 0.3);
    const speed = state.rng.randomRange(100, 250);
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    // Random size and TTL
    const size = state.rng.randomRange(2, 5);
    const ttl = state.rng.randomRange(0.3, 0.6);

    const particle = createParticle(state.nextId++, x, y, vx, vy, color, size, ttl);
    state.entities.push(particle);
  }
}
