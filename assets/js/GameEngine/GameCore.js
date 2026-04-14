import GameControl from './GameControl.js';

/**
 * GameCore — Top-level entry point.
 * Ported / simplified from nightmare Game.js.
 *
 * Usage:
 *   const game = new GameCore(containerEl, [LevelA, LevelB]);
 *   game.start();
 */
class GameCore {
  constructor(container, levelClasses = []) {
    if (!container) throw new Error('[GameCore] A container element is required.');
    this.container = container;
    this.levelClasses = levelClasses;
    this.gameControl = new GameControl(container, levelClasses);
  }

  start() {
    this.gameControl.start();
  }

  stop() {
    this.gameControl.stop();
  }

  pause() { this.gameControl.pause(); }
  resume() { this.gameControl.resume(); }

  /** Convenience: jump to level by index */
  goToLevel(index) {
    this.gameControl.transitionToLevel(index);
  }
}

export default GameCore;
