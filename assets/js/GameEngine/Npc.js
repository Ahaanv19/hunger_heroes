import Character from './Character.js';

/**
 * Npc — Non-player character with interaction support.
 * Ported from nightmare GameEnginev1.1.
 * Press E or U while colliding to interact.
 */
class Npc extends Character {
  constructor(data = null, gameEnv = null) {
    super(data, gameEnv);
    this.interactKey = data?.interactKey ?? 69; // E
    this.interactKeyAlt = data?.interactKeyAlt ?? 85; // U
    this.isPlayerNearby = false;
    this.isInteracting = false;
    this.dialogueText = data?.dialogueText || '';
    this.onInteract = data?.onInteract || null;
    this.promptEl = null;
    this._handleKeyDown = this.handleKeyDown.bind(this);
    addEventListener('keydown', this._handleKeyDown);
  }

  handleKeyDown({ keyCode }) {
    if (!this.isPlayerNearby) return;
    if (keyCode === this.interactKey || keyCode === this.interactKeyAlt) {
      this.interact();
    }
  }

  interact() {
    this.isInteracting = true;
    if (typeof this.onInteract === 'function') {
      this.onInteract(this);
    }
    setTimeout(() => { this.isInteracting = false; }, 500);
  }

  handleCollisionEvent(other) {
    if (other?.id?.includes('player') || other?.constructor?.name === 'Player') {
      this.isPlayerNearby = true;
      this.showPrompt();
    }
  }

  handleCollisionEnd() {
    this.isPlayerNearby = false;
    this.hidePrompt();
  }

  showPrompt() {
    if (this.promptEl) return;
    if (!this.canvas) return;
    this.promptEl = document.createElement('div');
    this.promptEl.textContent = '[ E ] Interact';
    Object.assign(this.promptEl.style, {
      position: 'absolute',
      left: `${this.canvas.offsetLeft + this.canvas.width / 2 - 50}px`,
      top: `${this.canvas.offsetTop - 24}px`,
      color: '#fff',
      background: 'rgba(0,0,0,0.7)',
      padding: '2px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: '100',
      pointerEvents: 'none',
    });
    this.canvas.parentElement?.appendChild(this.promptEl);
  }

  hidePrompt() {
    if (this.promptEl) {
      this.promptEl.remove();
      this.promptEl = null;
    }
  }

  update() {
    super.update();
    // Reset collision flag each frame; it gets set again by Player's collisionChecks
    if (this.isPlayerNearby) {
      // Check if collision flag was refreshed this frame
      if (!this.collisionData?.isCollision) {
        this.handleCollisionEnd();
      }
    }
    // Clear the flag so it can be set fresh next frame
    if (this.collisionData) this.collisionData.isCollision = false;
  }

  destroy() {
    removeEventListener('keydown', this._handleKeyDown);
    this.hidePrompt();
    super.destroy();
  }
}

export default Npc;
