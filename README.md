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

- ✅ **Milestone 6**: Waves
  - Sistema de oleadas con dificultad progresiva
  - Wave 1: 8 enemigos, spawn cada 1.5s
  - Cada wave: +3 enemigos, spawn 0.2s más rápido
  - Countdown de 3s entre waves
  - HUD con número de wave y enemigos restantes
  - Mensajes "Wave X" y "Wave Cleared!"

- ✅ **Milestone 7**: Polish
  - Partículas de explosión al morir enemigos (10 partículas rojas)
  - Invincibility frames (0.5s de inmunidad después de recibir daño)
  - Damage flash (jugador parpadea rojo/invisible al ser golpeado)
  - Sound hooks preparados (sin audio real aún)
  - Dificultad ajustada (más agresiva desde wave 1)

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
├── audio.js             # Sound hooks (ready for implementation)
├── entities/
│   ├── player.js        # Player entity factory
│   ├── bullet.js        # Bullet entity factory
│   ├── enemy.js         # Enemy entity factory
│   └── particle.js      # Particle entity + explosion spawner
├── systems/
│   ├── movement.js      # Movement & physics system
│   ├── shooting.js      # Weapon firing & bullet spawning
│   ├── enemies.js       # Enemy spawning, AI & wave management
│   ├── collision.js     # Collision detection & damage + particles
│   └── lifecycle.js     # TTL & entity cleanup
└── render/
    ├── canvas.js        # Canvas setup & resize
    └── draw.js          # Entity rendering + visual effects
```

## 🎯 Milestones

- [x] M1: Boot & Loop
- [x] M2: Player (WASD movement, mouse aim)
- [x] M3: Shooting (bullets, cooldown)
- [x] M4: Enemies (spawn, AI, HP)
- [x] M5: Collisions
- [x] M6: Waves
- [x] M7: Polish

**🎉 Prototipo completo!**

## 📝 Tech Stack

- JavaScript ES modules (no TypeScript)
- Canvas 2D
- Vite (dev tooling)
- Zero game frameworks
