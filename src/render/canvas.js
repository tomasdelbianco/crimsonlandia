/** @type {HTMLCanvasElement} */
let canvas = null;

/** @type {CanvasRenderingContext2D} */
let ctx = null;

/**
 * Sets up the canvas element and context
 * @param {string} canvasId - ID of the canvas element
 */
export function setupCanvas(canvasId) {
  canvas = document.getElementById(canvasId);
  if (!canvas) {
    throw new Error(`Canvas element with id "${canvasId}" not found`);
  }

  ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get 2D context from canvas');
  }

  // Initial resize
  resizeCanvas();

  // Listen for window resize
  window.addEventListener('resize', resizeCanvas);
}

/**
 * Resizes canvas to match window size
 */
export function resizeCanvas() {
  if (!canvas) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  // Set internal resolution
  canvas.width = width;
  canvas.height = height;

  // Disable image smoothing for crisp pixel rendering
  if (ctx) {
    ctx.imageSmoothingEnabled = false;
  }
}

/**
 * Gets the canvas element
 * @returns {HTMLCanvasElement}
 */
export function getCanvas() {
  return canvas;
}

/**
 * Gets the 2D rendering context
 * @returns {CanvasRenderingContext2D}
 */
export function getContext() {
  return ctx;
}

/**
 * Gets canvas dimensions
 * @returns {{width: number, height: number}}
 */
export function getCanvasSize() {
  return {
    width: canvas ? canvas.width : 0,
    height: canvas ? canvas.height : 0
  };
}
