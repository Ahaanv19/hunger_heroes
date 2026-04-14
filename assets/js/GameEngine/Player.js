import Character from './Character.js';

/**
 * Player — Keyboard-controlled character.
 * Ported from nightmare GameEnginev1.1.
 */
class Player extends Character {
  static playerCount = 0;

  constructor(data = null, gameEnv = null) {
    super(data, gameEnv);
    Player.playerCount++;
    this.id = data?.id?.toLowerCase() || `player${Player.playerCount}`;
    this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };
    this.pressedKeys = {};
    this.gravity = data?.GRAVITY || false;
    this.acceleration = 0.001;
    this.time = 0;
    this.moved = false;
    this._handleKeyDown = this.handleKeyDown.bind(this);
    this._handleKeyUp = this.handleKeyUp.bind(this);
    addEventListener('keydown', this._handleKeyDown);
    addEventListener('keyup', this._handleKeyUp);
  }

  handleKeyDown({ keyCode }) {
    this.pressedKeys[keyCode] = true;
    this.updateVelocity();
    this.updateDirection();
  }

  handleKeyUp({ keyCode }) {
    delete this.pressedKeys[keyCode];
    this.updateVelocity();
    this.updateDirection();
  }

  updateVelocity() {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.moved = false;
    if (this.pressedKeys[this.keypress.right]) { this.velocity.x += this.xVelocity; this.moved = true; }
    if (this.pressedKeys[this.keypress.left]) { this.velocity.x -= this.xVelocity; this.moved = true; }
    if (this.pressedKeys[this.keypress.up]) { this.velocity.y -= this.yVelocity; this.moved = true; }
    if (this.pressedKeys[this.keypress.down]) { this.velocity.y += this.yVelocity; this.moved = true; }
  }

  updateDirection() {
    if (this.pressedKeys[this.keypress.up]) this.direction = 'up';
    else if (this.pressedKeys[this.keypress.down]) this.direction = 'down';
    else if (this.pressedKeys[this.keypress.right]) this.direction = 'right';
    else if (this.pressedKeys[this.keypress.left]) this.direction = 'left';
  }

  update() {
    super.update();
    if (!this.moved && this.gravity) {
      this.time += 1;
      this.velocity.y += 0.5 + this.acceleration * this.time;
    } else {
      this.time = 0;
    }
  }

  handleCollisionReaction(other) {
    try {
      const tp = this.collisionData?.touchPoints?.this;
      if (tp) {
        if (tp.left || tp.right) this.velocity.x = 0;
        if (tp.top || tp.bottom) this.velocity.y = 0;
      }
    } catch (_) {}
    super.handleCollisionReaction(other);
  }

  destroy() {
    removeEventListener('keydown', this._handleKeyDown);
    removeEventListener('keyup', this._handleKeyUp);
    super.destroy();
  }
}

export default Player;
