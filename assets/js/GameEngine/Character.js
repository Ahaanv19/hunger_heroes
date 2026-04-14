import GameObject from './GameObject.js';

const SCALE_FACTOR = 25;
const STEP_FACTOR = 100;
const ANIMATION_RATE = 1;
const INIT_POSITION = { x: 0, y: 0 };
const PIXELS = { height: 16, width: 16 };

/**
 * Character — Sprite-rendered game character.
 * Ported from nightmare GameEnginev1.1.
 */
class Character extends GameObject {
  constructor(data = null, gameEnv = null) {
    super(gameEnv);
    this.data = data;
    this.state = { ...this.state, animation: 'idle', direction: 'right', isDying: false, isFinishing: false };

    this.canvas = document.createElement('canvas');
    this.canvas.id = data.id || 'default';
    this.canvas.width = data.pixels?.width || PIXELS.width;
    this.canvas.height = data.pixels?.height || PIXELS.height;
    this.hitbox = data?.hitbox || {};
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.gameEnv.container.appendChild(this.canvas);
    this.canvas.style = 'image-rendering: pixelated;';

    this.x = 0;
    this.y = 0;
    this.frame = 0;
    this.visible = data?.visible !== undefined ? data.visible : true;
    this.scale = { width: this.gameEnv.innerWidth, height: this.gameEnv.innerHeight };
    this.scaleFactor = data.SCALE_FACTOR || SCALE_FACTOR;
    this.stepFactor = data.STEP_FACTOR || STEP_FACTOR;
    this.animationRate = data.ANIMATION_RATE || ANIMATION_RATE;

    const initPos = data.INIT_POSITION || INIT_POSITION;
    if (initPos.x >= 0 && initPos.x <= 1 && initPos.y >= 0 && initPos.y <= 1) {
      this.position = { x: initPos.x * this.gameEnv.innerWidth, y: initPos.y * this.gameEnv.innerHeight };
    } else {
      this.position = { ...initPos };
    }

    this.spriteData = data;

    if (data && data.src) {
      this.spriteSheet = new Image();
      this.spriteReady = false;
      this.spriteSheet.onload = () => {
        this.spriteReady = true;
        if (!this.spriteData.pixels || this.spriteData.pixels.width === undefined) {
          this.spriteData.pixels = { width: this.spriteSheet.naturalWidth, height: this.spriteSheet.naturalHeight };
        }
        if (!this.spriteData.orientation) this.spriteData.orientation = { rows: 1, columns: 1 };
        this.resize();
      };
      this.spriteSheet.src = data.src;
      this.frameIndex = 0;
      this.frameCounter = 0;
      this.direction = 'down';
    }

    this.velocity = { x: 0, y: 0 };
    this.resize();
  }

  update() {
    if (this.gameEnv?.gameControl?.isPaused) { this.draw(); return; }
    this.draw();
    this.collisionChecks();
    this.move();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.spriteSheet && this.spriteReady) {
      this.drawSprite();
      this.updateAnimationFrame();
    } else {
      this.drawDefault();
    }
    this.setupCanvas();
  }

  drawSprite() {
    const pixels = this.spriteData.pixels || { width: this.spriteSheet.naturalWidth, height: this.spriteSheet.naturalHeight };
    const ori = this.spriteData.orientation || { rows: 1, columns: 1 };
    const fw = Math.max(1, Math.round(pixels.width / ori.columns));
    const fh = Math.max(1, Math.round(pixels.height / ori.rows));
    const dir = this.spriteData[this.direction] || {};
    const fx = ((dir.start || 0) + (this.frameIndex || 0)) * fw;
    const fy = (dir.row || 0) * fh;
    this.canvas.width = fw;
    this.canvas.height = fh;
    if (dir.mirror) { this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2); this.ctx.scale(-1, 1); this.ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2); }
    if (!this.visible) return;
    this.ctx.drawImage(this.spriteSheet, fx, fy, fw, fh, 0, 0, this.canvas.width, this.canvas.height);
  }

  updateAnimationFrame() {
    if (this.gameEnv?.gameControl?.isPaused) return;
    if (!this.animationRate || this.animationRate <= 0) return; // static sprite
    this.frameCounter++;
    if (this.frameCounter % this.animationRate === 0) {
      const dir = this.spriteData[this.direction] || {};
      const frames = dir.columns || this.spriteData.orientation?.columns || 1;
      this.frameIndex = (this.frameIndex + 1) % frames;
    }
  }

  drawDefault() {
    if (!this.visible) return;
    this.ctx.fillStyle = this.data?.fillStyle || 'red';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setupCanvas() {
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = `${this.position.x}px`;
    this.canvas.style.top = `${this.gameEnv.top + this.position.y}px`;
    this.canvas.style.zIndex = this.data?.zIndex ?? '10';
  }

  move(x, y) {
    if (this.gameEnv?.gameControl?.isPaused) return;
    if (x !== undefined) this.position.x = x;
    if (y !== undefined) this.position.y = y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height > this.gameEnv.innerHeight) { this.position.y = this.gameEnv.innerHeight - this.height; this.velocity.y = 0; }
    if (this.position.y < 0) { this.position.y = 0; this.velocity.y = 0; }
    if (this.position.x + this.width > this.gameEnv.innerWidth) { this.position.x = this.gameEnv.innerWidth - this.width; this.velocity.x = 0; }
    if (this.position.x < 0) { this.position.x = 0; this.velocity.x = 0; }
  }

  resize() {
    const ns = { width: this.gameEnv.innerWidth, height: this.gameEnv.innerHeight };
    if (this.scale.width) this.position.x = (this.position.x / this.scale.width) * ns.width;
    if (this.scale.height) this.position.y = (this.position.y / this.scale.height) * ns.height;
    this.scale = ns;
    this.size = this.scale.height / this.scaleFactor;
    this.xVelocity = this.stepFactor > 0 ? (this.scale.width / this.stepFactor) * 3 : 0;
    this.yVelocity = this.stepFactor > 0 ? (this.scale.height / this.stepFactor) * 3 : 0;
    this.width = this.size;
    this.height = this.size;
    if (this.position.x + this.width > this.gameEnv.innerWidth) this.position.x = this.gameEnv.innerWidth - this.width;
    if (this.position.y + this.height > this.gameEnv.innerHeight) this.position.y = this.gameEnv.innerHeight - this.height;
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.y < 0) this.position.y = 0;
  }

  destroy() {
    if (this.canvas?.parentNode) this.canvas.parentNode.removeChild(this.canvas);
    const i = this.gameEnv.gameObjects.indexOf(this);
    if (i !== -1) this.gameEnv.gameObjects.splice(i, 1);
  }
}

export default Character;
