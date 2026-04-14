import GameObject from './GameObject.js';

/**
 * Background — Draws a background image aligned to the game canvas.
 * Ported from nightmare GameEnginev1.1.
 */
class Background extends GameObject {
  constructor(data = null, gameEnv = null) {
    super(gameEnv);
    this.data = data || {};
    this.scaleFactor = data?.SCALE_FACTOR || 1;

    // Create own canvas (Background is not Character, so must self-create)
    this.canvas = document.createElement('canvas');
    this.canvas.id = data?.id || 'background';
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (gameEnv?.container) gameEnv.container.appendChild(this.canvas);

    this.image = new Image();
    this.image.src = data?.src || '';
    this.position = { x: 0, y: 0 };
    this.size = { width: 0, height: 0 };
    this.image.onload = () => this.setupCanvas();
    if (this.image.complete) this.setupCanvas();
  }

  setupCanvas() {
    if (!this.canvas || !this.gameEnv) return;
    const envWidth = this.gameEnv.innerWidth;
    const envHeight = this.gameEnv.innerHeight;
    const aspect = this.image.width / (this.image.height || 1);

    let w = envWidth;
    let h = envWidth / aspect;
    if (h < envHeight) { h = envHeight; w = envHeight * aspect; }

    this.canvas.width = w;
    this.canvas.height = h;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0px';
    this.canvas.style.top = '0px';
    this.canvas.style.zIndex = '0';

    this.size = { width: w, height: h };
    this.draw();
  }

  draw() {
    if (!this.ctx || !this.image.complete) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
  }

  update() {
    this.draw();
  }

  resize() {
    this.setupCanvas();
  }

  destroy() {
    if (this.canvas?.parentNode) this.canvas.parentNode.removeChild(this.canvas);
    const i = this.gameEnv?.gameObjects?.indexOf(this);
    if (i !== undefined && i !== -1) this.gameEnv.gameObjects.splice(i, 1);
  }
}

export default Background;
