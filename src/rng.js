/**
 * Seedable RNG (Random Number Generator) system
 * Uses Mulberry32 algorithm for fast, deterministic random numbers
 */

/**
 * Creates a seedable random number generator
 * @param {number} seed - Initial seed value
 * @returns {Object} RNG object with random methods
 */
export function createRNG(seed) {
  let state = seed;

  /**
   * Mulberry32 - Fast, high-quality PRNG
   * @returns {number} Random float between 0 and 1
   */
  function random() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Random float in range [min, max)
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  function randomRange(min, max) {
    return min + random() * (max - min);
  }

  /**
   * Random integer in range [min, max)
   * @param {number} min - Inclusive
   * @param {number} max - Exclusive
   * @returns {number}
   */
  function randomInt(min, max) {
    return Math.floor(randomRange(min, max));
  }

  return {
    random,
    randomRange,
    randomInt
  };
}
