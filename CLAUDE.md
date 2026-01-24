# Claude Code Rules — Crimsonland-like Web Game (Prototype)

## High-level goal
Build a functional singleplayer top-down horde shooter prototype inspired by Crimsonland.
Prioritize gameplay feel and correctness over visuals. No heavy frameworks.

## Tech constraints
- Language: JavaScript (ES modules), NOT TypeScript.
- Rendering: HTML5 Canvas 2D.
- Tooling: Vite is allowed (dev server + bundling). No UI frameworks.
- Keep dependencies minimal. Prefer zero deps; if needed, justify each one.

## Architecture rules
- Separate simulation (game state + systems) from rendering.
- Use a fixed timestep simulation (60 ticks per second). Render can interpolate.
- Use plain objects for entities/components. Avoid complicated class hierarchies.
- Systems should be small, readable, and mostly pure (mutate state in one place).
- Determinism-friendly: use a seedable PRNG for spawns/loot, stored in state.

## Code style
- Prefer functions + modules over classes.
- Keep functions short. Name things clearly.
- Use JSDoc comments for key data shapes and function signatures (lightweight).
- Avoid premature optimization, but keep allocations reasonable in the hot loop.
- No global mutable state except inside `state` owned by the game.

## Entity model (guideline)
Entities are plain objects with common fields:
- id (number)
- type ("player" | "enemy" | "bullet" | "pickup" | ...)
- pos {x,y}, vel {x,y}
- radius (number)
- hp, damage (optional)
- weapon (for player): cooldown, rate, bulletSpeed, spread
- ttl (for bullets/particles)
- visual { kind: "debug" | "sprite", spriteId?: string }

## Input model
- Store input in `state.input` each frame:
  - keys: up/down/left/right, fire
  - mouse: x, y, down
- Simulation uses ONLY `state.input` (do not read DOM directly inside systems).

## Milestone plan (must follow)
1) Boot & loop: canvas, resize, fixed timestep, clear screen.
2) Player: WASD move + friction; aim at mouse.
3) Shooting: spawn bullets toward aim with cooldown.
4) Enemies: spawn at edges; seek player; basic HP.
5) Collisions: bullet hits enemy; enemy damages player on contact.
6) Waves: increasing spawn rate; simple HUD (HP + wave timer).
7) Polish: particles (debug), screen shake (tiny), simple sound hooks.

## Deliverables expectation
- Provide a step-by-step implementation plan first.
- Then implement in small incremental commits/patches per milestone.
- Each milestone must result in a runnable game.
- Include a short "How to run" section in README (or in comments).

## Do NOT do
- No React/Vue/Angular/Svelte.
- No Phaser as a first choice (too heavy for this constraint).
- No complex physics engines unless requested later.
- No multiplayer yet (but keep architecture friendly for future server-authoritative coop).
