import GameObject from './GameObject.js';

/**
 * Barrier — Invisible or visible collision wall.
 * Ported from nightmare GameEnginev1.1.
 */
class Barrier extends GameObject {
  constructor(data = null, gameEnv = null) {
    super(gameEnv);
    this.data = data || {};
    this.visible = data?.visible ?? false;
    this.color = data?.color || 'rgba(255,0,0,0.3)';

    // Create own canvas (Barrier is not Character, so must self-create)
    this.canvas = document.createElement('canvas');
    this.canvas.id = data?.id || 'barrier';
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (gameEnv?.container) gameEnv.container.appendChild(this.canvas);

    this.position = {
      x: (data?.INIT_POSITION?.x ?? 0) * (gameEnv?.innerWidth || 1),
      y: (data?.INIT_POSITION?.y ?? 0) * (gameEnv?.innerHeight || 1),
    };
    this.size = {
      width: (data?.WIDTH_PERCENTAGE ?? 0.02) * (gameEnv?.innerWidth || 1),
      height: (data?.HEIGHT_PERCENTAGE ?? 1) * (gameEnv?.innerHeight || 1),
    };
    this.hitbox = { widthPercentage: 1, heightPercentage: 1 };
    this.setupCanvas();
  }

  setupCanvas() {
    if (!this.canvas || !this.gameEnv) return;
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;
    Object.assign(this.canvas.style, {
      position: 'absolute',
      left: `${this.position.x}px`,
      top: `${this.position.y}px`,
      width: `${this.size.width}px`,
      height: `${this.size.height}px`,
      zIndex: '1',
    });
    if (!this.visible) {
      this.canvas.style.pointerEvents = 'none';
    }
    this.draw();
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.visible) {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(0, 0, this.size.width, this.size.height);
    }
  }

  update() {
    this.draw();
    this.collisionChecks();
  }

  resize() {
    const env = this.gameEnv;
    if (!env) return;
    this.position.x = (this.data?.INIT_POSITION?.x ?? 0) * env.innerWidth;
    this.position.y = (this.data?.INIT_POSITION?.y ?? 0) * env.innerHeight;
    this.size.width = (this.data?.WIDTH_PERCENTAGE ?? 0.02) * env.innerWidth;
    this.size.height = (this.data?.HEIGHT_PERCENTAGE ?? 1) * env.innerHeight;
    this.setupCanvas();
  }

  destroy() {
    if (this.canvas?.parentNode) this.canvas.parentNode.removeChild(this.canvas);
    const i = this.gameEnv?.gameObjects?.indexOf(this);
    if (i !== undefined && i !== -1) this.gameEnv.gameObjects.splice(i, 1);
  }
}

export default Barrier;
