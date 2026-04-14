/**
 * GameEnv — Canvas and game-area management.
 * Ported from nightmare GameEnginev1.1 for Hunger Heroes.
 */

class GameEnv {
  static canvasCounter = 0;

  constructor() {
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.canvasId = null;
    this.innerWidth = 0;
    this.innerHeight = 0;
    this.top = 0;
    this.bottom = 0;
    this.game = null;
    this.path = '';
    this.gameControl = null;
    this.gameObjects = [];
  }

  create(containerEl) {
    if (containerEl) this.container = containerEl;
    this.setCanvas();
    this.setTop();
    this.setBottom();
    this.innerWidth = this.container?.clientWidth || window.innerWidth;
    this.innerHeight = this.container?.clientHeight || (window.innerHeight - this.top - this.bottom);
    this.size();
  }

  setCanvas() {
    if (!this.container) {
      this.container = document.getElementById('gameContainer') || document.body;
    }
    this.canvasId = `gameCanvas-${GameEnv.canvasCounter++}`;
    this.canvas = document.createElement('canvas');
    this.canvas.id = this.canvasId;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
  }

  setTop() { this.top = 0; }
  setBottom() { this.bottom = 0; }

  size() {
    this.canvas.width = this.innerWidth;
    this.canvas.height = this.innerHeight;
    this.canvas.style.width = `${this.innerWidth}px`;
    this.canvas.style.height = `${this.innerHeight}px`;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0px';
    this.canvas.style.top = `${this.top}px`;
  }

  resize() {
    this.innerWidth = this.container?.clientWidth || window.innerWidth;
    this.innerHeight = this.container?.clientHeight || (window.innerHeight - this.top - this.bottom);
    this.size();
  }

  clear() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);
  }

  destroy() {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.canvas = null;
    this.ctx = null;
    this.canvasId = null;
  }
}

export default GameEnv;
