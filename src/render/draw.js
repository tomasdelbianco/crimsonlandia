/**
 * Drawing/rendering system - Handles all visual output
 */

/**
 * Draws all entities
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} entities - Array of entities to draw
 */
export function drawEntities(ctx, entities) {
  for (const entity of entities) {
    if (entity.visual.kind === 'debug') {
      drawDebugCircle(ctx, entity);

      // Draw aim line for player
      if (entity.type === 'player') {
        drawAimLine(ctx, entity);
      }
    }
  }
}

/**
 * Draws an entity as a debug circle
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} entity
 */
function drawDebugCircle(ctx, entity) {
  ctx.save();

  // Draw circle
  ctx.beginPath();
  ctx.arc(entity.pos.x, entity.pos.y, entity.radius, 0, Math.PI * 2);
  ctx.fillStyle = entity.visual.color;
  ctx.fill();

  // Draw border
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

/**
 * Draws a line indicating the entity's aim direction
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} entity
 */
function drawAimLine(ctx, entity) {
  const lineLength = 30;
  const endX = entity.pos.x + Math.cos(entity.angle) * lineLength;
  const endY = entity.pos.y + Math.sin(entity.angle) * lineLength;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(entity.pos.x, entity.pos.y);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = '#ffff00'; // Yellow
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}
