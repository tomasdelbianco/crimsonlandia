# Crimsonlandia - Top-Down Horde Shooter Prototype

Prototipo funcional de un shooter top-down estilo Crimsonland para web.

## 🎮 Características actuales

- ✅ **Milestone 1**: Boot & Loop
  - Canvas con fixed timestep (60 Hz)
  - Estado del juego inicializado
  - Loop de renderizado

- ✅ **Milestone 2**: Player
  - Movimiento con WASD y flechas
  - Física con fricción (se frena suavemente)
  - Apuntado hacia el mouse
  - Sistema de input completo

- ✅ **Milestone 3**: Shooting
  - Disparo con click izquierdo
  - Balas vuelan hacia donde apuntas
  - Cooldown entre disparos (~150ms)
  - Balas desaparecen después de 2 segundos
  - Sistema de lifecycle (TTL)

- ✅ **Milestone 4**: Enemies
  - Enemigos (círculos rojos) spawnean cada 2 segundos
  - Aparecen en bordes aleatorios del canvas
  - AI simple: persiguen al jugador constantemente
  - Sistema RNG seedable (spawns determinísticos)
  - HP: 20, velocidad: 80 u/s

- ✅ **Milestone 5**: Collisions
  - Balas impactan enemigos (damage: 10)
  - Enemigos mueren con 2 disparos (HP: 20)
  - Enemigos dañan al jugador por contacto (damage: 10)
  - Detección círculo-círculo eficiente
  - Game over cuando player muere
  - HUD muestra HP del jugador

## 🚀 Cómo ejecutar

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Luego abre tu navegador en la URL que muestra Vite (típicamente `http://localhost:5173`).

## 🏗️ Arquitectura

- **Fixed timestep**: Simulación a 60 Hz constante, rendering variable con interpolación
- **Separación**: Estado de juego separado del rendering
- **Plain objects**: Entidades como objetos planos (no clases complejas)
- **Systems**: Sistemas pequeños que mutan el estado

## 📁 Estructura

```
src/
├── main.js              # Game loop + boot + game over
├── state.js             # Game state management
├── input.js             # Input capture (keyboard + mouse)
├── rng.js               # Seedable RNG (Mulberry32)
├── entities/
│   ├── player.js        # Player entity factory
│   ├── bullet.js        # Bullet entity factory
│   └── enemy.js         # Enemy entity factory
├── systems/
│   ├── movement.js      # Movement & physics system
│   ├── shooting.js      # Weapon firing & bullet spawning
│   ├── enemies.js       # Enemy spawning & AI (seeking)
│   ├── collision.js     # Collision detection & damage
│   └── lifecycle.js     # TTL & entity cleanup
└── render/
    ├── canvas.js        # Canvas setup & resize
    └── draw.js          # Entity rendering
```

## 🎯 Próximos Milestones

- [x] M2: Player (WASD movement, mouse aim)
- [x] M3: Shooting (bullets, cooldown)
- [x] M4: Enemies (spawn, AI, HP)
- [x] M5: Collisions
- [ ] M6: Waves
- [ ] M7: Polish

## 📝 Tech Stack

- JavaScript ES modules (no TypeScript)
- Canvas 2D
- Vite (dev tooling)
- Zero game frameworks
