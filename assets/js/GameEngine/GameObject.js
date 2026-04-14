import Transform from './Transform.js';

/**
 * GameObject — Abstract base class for all game objects.
 * Ported from nightmare GameEnginev1.1.
 */
class GameObject {
  constructor(gameEnv = null) {
    if (new.target === GameObject) throw new TypeError('Cannot construct GameObject directly');
    this.gameEnv = gameEnv;
    this.transform = new Transform(0, 0);
    this.collisionWidth = 0;
    this.collisionHeight = 0;
    this.collisionData = {};
    this.hitbox = {};
    this.state = { collisionEvents: [], movement: { up: true, down: true, left: true, right: true } };
  }

  get position() { return this.transform.position; }
  set position(v) { this.transform.position = v; }
  get velocity() { return this.transform.velocity; }
  set velocity(v) { this.transform.velocity = v; }
  get x() { return this.transform.x; }
  set x(v) { this.transform.x = v; }
  get y() { return this.transform.y; }
  set y(v) { this.transform.y = v; }

  update() { throw new Error("update() must be implemented"); }
  draw() { throw new Error("draw() must be implemented"); }
  resize() { throw new Error("resize() must be implemented"); }
  destroy() { throw new Error("destroy() must be implemented"); }

  collisionChecks() {
    let hit = false;
    for (const obj of this.gameEnv.gameObjects) {
      if (obj.canvas && this !== obj) {
        this.isCollision(obj);
        if (this.collisionData.hit) {
          hit = true;
          this.handleCollisionEvent();
          // Notify the other object that this object is colliding with it
          if (typeof obj.handleCollisionEvent === 'function' && obj !== this) {
            obj.collisionData = obj.collisionData || {};
            obj.collisionData.isCollision = true;
            obj.handleCollisionEvent(this);
          }
        }
      }
    }
    if (!hit) this.state.collisionEvents = [];
  }

  isCollision(other) {
    const a = this.canvas.getBoundingClientRect();
    const b = other.canvas.getBoundingClientRect();
    const aw = a.width * (this.hitbox?.widthPercentage || 0);
    const ah = a.height * (this.hitbox?.heightPercentage || 0);
    const bw = b.width * (other.hitbox?.widthPercentage || 0);
    const bh = b.height * (other.hitbox?.heightPercentage || 0);
    const aL = a.left + aw, aT = a.top + ah, aR = a.right - aw, aB = a.bottom;
    const bL = b.left + bw, bT = b.top + bh, bR = b.right - bw, bB = b.bottom;
    const hit = aL < bR && aR > bL && aT < bB && aB > bT;
    const touchPoints = {
      this: { id: this.canvas.id, top: aB > bT && aT < bT, bottom: aT < bB && aB > bB, left: aR > bL && aL < bL, right: aL < bR && aR > bR },
      other: { id: other.canvas.id, reaction: other.spriteData?.reaction || null, top: bB > aT && bT < aT, bottom: bT < aB && bB > aB, left: bR > aL && bL < aL, right: bL < aR && bR > aR }
    };
    this.collisionData = { hit, touchPoints };
  }

  handleCollisionEvent() {
    const other = this.collisionData.touchPoints.other;
    if (!this.state.collisionEvents.includes(other.id)) {
      this.state.collisionEvents.push(other.id);
      this.handleCollisionReaction(other);
    }
    this.handleCollisionState();
  }

  handleCollisionReaction(other) {
    if (other?.reaction && typeof other.reaction === 'function') other.reaction();
  }

  handleCollisionState() {
    if (this.state.collisionEvents.length > 0) {
      const tp = this.collisionData.touchPoints.this;
      this.state.movement = { up: true, down: true, left: true, right: true };
      if (tp.top) { this.state.movement.down = false; if (this.velocity.y > 0) this.velocity.y = 0; }
      if (tp.bottom) { this.state.movement.up = false; if (this.velocity.y < 0) this.velocity.y = 0; }
      if (tp.right) { this.state.movement.left = false; if (this.velocity.x < 0) this.velocity.x = 0; }
      if (tp.left) { this.state.movement.right = false; if (this.velocity.x > 0) this.velocity.x = 0; }
    }
  }
}

export default GameObject;
