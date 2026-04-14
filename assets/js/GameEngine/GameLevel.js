import GameEnv from './GameEnv.js';

/**
 * GameLevel — Manages one level's lifecycle.
 * Ported from nightmare GameEnginev1.1.
 *
 * Each level class (e.g. DonationTrackerLevel) sets `this.classes = [...]`,
 * then GameLevel.create() instantiates them.
 */
class GameLevel {
  constructor(gameControl) {
    this.gameControl = gameControl;
    this.gameEnv = null;
    this.gameObjects = [];
    this.classes = [];
    this.isDestroyed = false;
  }

  create() {
    this.gameEnv = new GameEnv();
    const container = this.gameControl?.container;
    if (container) {
      this.gameEnv.create(container);
    }
    // Wire gameControl onto gameEnv so objects can check isPaused etc.
    this.gameEnv.gameControl = this.gameControl;
    // Instantiate every game-object class from `this.classes`
    for (const entry of this.classes) {
      if (!entry.class) continue;
      try {
        const obj = new entry.class(entry.data || null, this.gameEnv);
        this.gameObjects.push(obj);
        // Also register on gameEnv so collision detection can iterate all objects
        this.gameEnv.gameObjects.push(obj);
      } catch (e) {
        console.error('[GameLevel] failed to create object:', e);
      }
    }
    return this;
  }

  update() {
    if (this.isDestroyed) return;
    if (!this.gameEnv) return;
    // Clear every canvas owned by gameEnv
    this.gameEnv.clear();
    // Update each game object
    for (const obj of this.gameObjects) {
      if (typeof obj.update === 'function') {
        obj.update();
      }
    }
  }

  resize() {
    if (this.isDestroyed) return;
    if (this.gameEnv) {
      this.gameEnv.resize?.();
    }
    for (const obj of this.gameObjects) {
      if (typeof obj.resize === 'function') {
        obj.resize();
      }
    }
  }

  destroy() {
    this.isDestroyed = true;
    for (const obj of this.gameObjects) {
      if (typeof obj.destroy === 'function') {
        obj.destroy();
      }
    }
    this.gameObjects = [];
    if (this.gameEnv) {
      this.gameEnv.gameObjects = [];
      this.gameEnv.destroy();
      this.gameEnv = null;
    }
  }
}

export default GameLevel;
