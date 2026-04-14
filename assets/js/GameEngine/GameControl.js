/**
 * GameControl — Core game loop and level manager.
 * Ported from nightmare GameEnginev1.1.
 *
 * Uses requestAnimationFrame for smooth 60 fps rendering.
 * Manages level transitions, pause / resume, and resize events.
 */
class GameControl {
  constructor(container, levelClasses = []) {
    this.container = container;
    this.levelClasses = levelClasses; // array of level *classes*
    this.currentLevelIndex = -1;
    this.currentLevel = null;
    this.isPaused = false;
    this.isRunning = false;
    this.rafId = null;
    this._resizeHandler = this.handleResize.bind(this);
  }

  /* ---- lifecycle ---- */

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    window.addEventListener('resize', this._resizeHandler);
    this.transitionToLevel(0);
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    window.removeEventListener('resize', this._resizeHandler);
    this.destroyCurrentLevel();
  }

  /* ---- game loop ---- */

  loop() {
    if (!this.isRunning) return;
    if (!this.isPaused && this.currentLevel) {
      this.currentLevel.update();
    }
    this.rafId = requestAnimationFrame(() => this.loop());
  }

  /* ---- pause / resume ---- */

  pause() { this.isPaused = true; }
  resume() { this.isPaused = false; }
  togglePause() { this.isPaused = !this.isPaused; }

  /* ---- level management ---- */

  transitionToLevel(index) {
    if (index < 0 || index >= this.levelClasses.length) return;
    this.destroyCurrentLevel();
    this.currentLevelIndex = index;
    const LevelClass = this.levelClasses[index];
    this.currentLevel = new LevelClass(this);
    this.currentLevel.create();
  }

  nextLevel() {
    this.transitionToLevel(this.currentLevelIndex + 1);
  }

  previousLevel() {
    this.transitionToLevel(this.currentLevelIndex - 1);
  }

  destroyCurrentLevel() {
    if (this.currentLevel) {
      this.currentLevel.destroy();
      this.currentLevel = null;
    }
  }

  /* ---- resize ---- */

  handleResize() {
    if (this.currentLevel) {
      this.currentLevel.resize();
    }
  }
}

export default GameControl;
