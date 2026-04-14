/**
 * Transform — Position, velocity, and physics for game objects.
 * Ported from nightmare GameEnginev1.1 for Hunger Heroes.
 */

class TransformValidation {
  static number(value, fallback = 0) {
    return Number.isFinite(value) ? value : fallback;
  }
  static object(value, fallback = {}) {
    return value && typeof value === 'object' ? value : fallback;
  }
  static clampDamping(value, fallback = 0.9) {
    const n = TransformValidation.number(value, fallback);
    return Math.max(0, Math.min(1, n));
  }
  static hasDirection(value) {
    return Number.isFinite(value);
  }
}

class TransformState {
  constructor(spawnX = 0, spawnY = 0, speed = 0.4) {
    this.spawn = { x: TransformValidation.number(spawnX), y: TransformValidation.number(spawnY) };
    this.position = { x: this.spawn.x, y: this.spawn.y };
    this.velocity = { x: 0, y: 0 };
    this.speed = TransformValidation.number(speed, 0.4);
  }
  setPosition(x, y) {
    this.position.x = TransformValidation.number(x, this.position.x);
    this.position.y = TransformValidation.number(y, this.position.y);
  }
  setVelocity(x, y) {
    this.velocity.x = TransformValidation.number(x, this.velocity.x);
    this.velocity.y = TransformValidation.number(y, this.velocity.y);
  }
  resetToSpawn() {
    this.position.x = this.spawn.x;
    this.position.y = this.spawn.y;
    this.velocity.x = 0;
    this.velocity.y = 0;
  }
}

class TransformMotion {
  static applyDirection(state, dirDeg = 0, mag = null) {
    const speed = TransformValidation.number(mag, state.speed);
    const rad = (dirDeg * Math.PI) / 180;
    state.velocity.x += speed * Math.sin(rad);
    state.velocity.y += speed * Math.cos(rad);
  }
  static applyDelta(state, dx = 0, dy = 0) {
    state.position.x += TransformValidation.number(dx);
    state.position.y += TransformValidation.number(dy);
  }
  static integrate(state, damping = 0.9) {
    const d = TransformValidation.clampDamping(damping);
    state.velocity.x *= d;
    state.velocity.y *= d;
    state.position.x += state.velocity.x;
    state.position.y += state.velocity.y;
  }
}

class Transform {
  constructor(spawnX = 0, spawnY = 0, speed = 0.4) {
    this.state = new TransformState(spawnX, spawnY, speed);
  }
  get position() { return this.state.position; }
  set position(v) { const n = TransformValidation.object(v, this.state.position); this.state.setPosition(n.x, n.y); }
  get velocity() { return this.state.velocity; }
  set velocity(v) { const n = TransformValidation.object(v, this.state.velocity); this.state.setVelocity(n.x, n.y); }
  get x() { return this.state.position.x; }
  set x(v) { this.state.position.x = TransformValidation.number(v, this.state.position.x); }
  get y() { return this.state.position.y; }
  set y(v) { this.state.position.y = TransformValidation.number(v, this.state.position.y); }
  get xv() { return this.state.velocity.x; }
  set xv(v) { this.state.velocity.x = TransformValidation.number(v, this.state.velocity.x); }
  get yv() { return this.state.velocity.y; }
  set yv(v) { this.state.velocity.y = TransformValidation.number(v, this.state.velocity.y); }
  setPosition(x, y) { this.state.setPosition(x, y); }
  setVelocity(x, y) { this.state.setVelocity(x, y); }
  resetToSpawn() { this.state.resetToSpawn(); }
}

export { Transform, TransformValidation, TransformState, TransformMotion };
export default Transform;
