import GameLevel from './GameLevel.js';
import Player from './Player.js';
import Background from './Background.js';
import Npc from './Npc.js';
import Barrier from './Barrier.js';

/**
 * DonationTrackerLevel — A gamified donation lifecycle.
 *
 * The player walks between 5 "station" NPCs, each representing
 * a donation status: Posted → Claimed → In-Transit → Delivered → Confirmed.
 *
 * Walk to a building and press [E] to interact.  The UI sidebar updates
 * and optionally triggers a real status-patch via donationApi.
 */

/* -------------------------------------------------- */
/*  Canvas-generated sprite helpers (no image files)  */
/* -------------------------------------------------- */

function makeCanvasURL(w, h, drawFn) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  drawFn(ctx, w, h);
  return c.toDataURL();
}

function playerSprite() {
  return makeCanvasURL(256, 256, (ctx, w, h) => {
    const fw = w / 4, fh = h / 4;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const cx = col * fw + fw / 2;
        const cy = row * fh + fh * 0.3;
        // head
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath(); ctx.arc(cx, cy, fh * 0.18, 0, Math.PI * 2); ctx.fill();
        // body
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(cx - fh * 0.14, cy + fh * 0.18, fh * 0.28, fh * 0.32);
        // legs – slight offset per col to fake walk
        ctx.fillStyle = '#1e3a5f';
        const off = (col % 2 === 0) ? -3 : 3;
        ctx.fillRect(cx - fh * 0.1 + off, cy + fh * 0.5, fh * 0.08, fh * 0.2);
        ctx.fillRect(cx + fh * 0.04 - off, cy + fh * 0.5, fh * 0.08, fh * 0.2);
      }
    }
  });
}

function buildingSprite(emoji, color) {
  return makeCanvasURL(128, 128, (ctx, w, h) => {
    // Building body
    const bx = 14, by = 28, bw = 100, bh = 86;
    ctx.fillStyle = color;
    ctx.fillRect(bx, by, bw, bh);
    // Roof
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(bx - 6, by);
    ctx.lineTo(bx + bw / 2, 6);
    ctx.lineTo(bx + bw + 6, by);
    ctx.closePath();
    ctx.fill();
    // Door
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(bx + bw / 2 - 10, by + bh - 34, 20, 34);
    // Emoji label
    ctx.font = '28px serif';
    ctx.textAlign = 'center';
    ctx.fillText(emoji, w / 2, 80);
  });
}

function grassBg() {
  return makeCanvasURL(800, 400, (ctx, w, h) => {
    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.55);
    sky.addColorStop(0, '#38bdf8'); sky.addColorStop(1, '#93c5fd');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * 0.55);
    // Grass
    const grass = ctx.createLinearGradient(0, h * 0.55, 0, h);
    grass.addColorStop(0, '#4ade80'); grass.addColorStop(1, '#22c55e');
    ctx.fillStyle = grass; ctx.fillRect(0, h * 0.55, w, h * 0.45);
    // Path
    ctx.fillStyle = '#d4a76a';
    ctx.fillRect(0, h * 0.72, w, h * 0.12);
  });
}

/* -------------------------------------------------- */
/*  Status vocabulary (mirrors donationApi scan.md)   */
/* -------------------------------------------------- */

const STEPS = [
  { key: 'posted',    label: 'Posted',     emoji: '📦', color: '#38bdf8', desc: 'Donation has been posted and is waiting for a volunteer.' },
  { key: 'claimed',   label: 'Claimed',    emoji: '🤝', color: '#a78bfa', desc: 'A volunteer has claimed this donation for pick-up.' },
  { key: 'in_transit', label: 'In Transit', emoji: '🚚', color: '#fb923c', desc: 'The donation is on its way to the recipient.' },
  { key: 'delivered', label: 'Delivered',  emoji: '🏠', color: '#4ade80', desc: 'The donation has been delivered!' },
  { key: 'confirmed', label: 'Confirmed',  emoji: '✅', color: '#34d399', desc: 'Receipt confirmed – donation complete!' },
];

/* -------------------------------------------------- */
/*  Level class                                        */
/* -------------------------------------------------- */

class DonationTrackerLevel extends GameLevel {
  constructor(gameControl) {
    super(gameControl);

    // external hooks (set by game page before create)
    this.donationId = null;
    this.currentStepIndex = 0;
    this.onStepReached = null; // (stepIndex, stepData) => {}

    this._buildClasses();
  }

  _buildClasses() {
    const bgSrc = grassBg();
    const pSrc = playerSprite();

    this.classes = [];

    // 1. Background
    this.classes.push({
      class: Background,
      data: { id: 'bg', src: bgSrc, SCALE_FACTOR: 1 },
    });

    // 2. Station NPCs (5 buildings spaced evenly)
    STEPS.forEach((step, i) => {
      const xFrac = 0.08 + i * 0.18; // 0.08 … 0.80
      this.classes.push({
        class: Npc,
        data: {
          id: `station-${step.key}`,
          src: buildingSprite(step.emoji, step.color),
          pixels: { width: 128, height: 128 },
          orientation: { rows: 1, columns: 1 },
          SCALE_FACTOR: 0.8,
          STEP_FACTOR: 0,
          ANIMATION_RATE: 0,
          INIT_POSITION: { x: xFrac, y: 0.38 },
          down: { row: 0, start: 0, columns: 1 },
          hitbox: { widthPercentage: 0.9, heightPercentage: 0.9 },
          dialogueText: step.desc,
          onInteract: () => this._onStationInteract(i),
        },
      });
    });

    // 3. Player
    this.classes.push({
      class: Player,
      data: {
        id: 'donor-hero',
        src: pSrc,
        pixels: { width: 64, height: 64 },
        orientation: { rows: 4, columns: 4 },
        SCALE_FACTOR: 0.55,
        STEP_FACTOR: 6,
        ANIMATION_RATE: 100,
        INIT_POSITION: { x: 0.02, y: 0.62 },
        down: { row: 0, start: 0, columns: 4 },
        up: { row: 1, start: 0, columns: 4 },
        left: { row: 2, start: 0, columns: 4 },
        right: { row: 3, start: 0, columns: 4 },
        hitbox: { widthPercentage: 0.6, heightPercentage: 0.7 },
        keypress: { up: 87, left: 65, down: 83, right: 68 },
      },
    });

    // 4. Barriers (top, bottom, left, right)
    this.classes.push({ class: Barrier, data: { id: 'wall-left',   INIT_POSITION: { x: -0.01, y: 0 }, WIDTH_PERCENTAGE: 0.01, HEIGHT_PERCENTAGE: 1 } });
    this.classes.push({ class: Barrier, data: { id: 'wall-right',  INIT_POSITION: { x: 1.0, y: 0 }, WIDTH_PERCENTAGE: 0.01, HEIGHT_PERCENTAGE: 1 } });
    this.classes.push({ class: Barrier, data: { id: 'wall-top',    INIT_POSITION: { x: 0, y: -0.01 }, WIDTH_PERCENTAGE: 1, HEIGHT_PERCENTAGE: 0.01 } });
    this.classes.push({ class: Barrier, data: { id: 'wall-bottom', INIT_POSITION: { x: 0, y: 1.0 }, WIDTH_PERCENTAGE: 1, HEIGHT_PERCENTAGE: 0.01 } });
  }

  _onStationInteract(stepIndex) {
    this.currentStepIndex = stepIndex;
    const step = STEPS[stepIndex];
    if (typeof this.onStepReached === 'function') {
      this.onStepReached(stepIndex, step);
    }
  }
}

export { STEPS };
export default DonationTrackerLevel;
