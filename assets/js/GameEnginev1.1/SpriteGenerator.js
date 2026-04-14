/**
 * SpriteGenerator — Canvas-drawn spritesheets for Hunger Heroes game
 * No external image files needed — everything is drawn programmatically.
 */

export class SpriteGenerator {

  /**
   * Create a player spritesheet (hero character)
   * 4 columns x 4 rows = walk down, right, left, up
   * Each frame: 128x128 pixels → total: 512x512
   */
  static createHeroSprite() {
    const fw = 128, fh = 128, cols = 4, rows = 4;
    const canvas = document.createElement('canvas');
    canvas.width = fw * cols;
    canvas.height = fh * rows;
    const ctx = canvas.getContext('2d');

    const directions = ['down', 'right', 'left', 'up'];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = c * fw, oy = r * fh;
        const bounce = Math.sin(c * Math.PI / 2) * 4;

        // Body (green cape — hero!)
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.ellipse(ox + 64, oy + 72 + bounce, 24, 30, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(ox + 64, oy + 38 + bounce, 18, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#1e293b';
        if (directions[r] === 'left') {
          ctx.fillRect(ox + 54, oy + 34 + bounce, 4, 5);
          ctx.fillRect(ox + 62, oy + 34 + bounce, 4, 5);
        } else if (directions[r] === 'right') {
          ctx.fillRect(ox + 62, oy + 34 + bounce, 4, 5);
          ctx.fillRect(ox + 70, oy + 34 + bounce, 4, 5);
        } else {
          ctx.fillRect(ox + 56, oy + 34 + bounce, 4, 5);
          ctx.fillRect(ox + 68, oy + 34 + bounce, 4, 5);
        }

        // Smile
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ox + 64, oy + 42 + bounce, 6, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();

        // Cape detail (H for Hero)
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('H', ox + 64, oy + 78 + bounce);

        // Legs
        ctx.fillStyle = '#3b82f6';
        const legOffset = Math.sin(c * Math.PI) * 6;
        ctx.fillRect(ox + 52, oy + 96 + bounce, 8, 18);
        ctx.fillRect(ox + 68, oy + 96 + bounce + legOffset, 8, 18);

        // Feet
        ctx.fillStyle = '#7c3aed';
        ctx.fillRect(ox + 50, oy + 112 + bounce, 12, 6);
        ctx.fillRect(ox + 66, oy + 112 + bounce + legOffset, 12, 6);
      }
    }
    return canvas.toDataURL('image/png');
  }

  /**
   * Create an NPC spritesheet (food character)
   * 1 row x 3 columns (idle animation)
   * @param {string} emoji - The emoji to draw on the NPC
   * @param {string} bodyColor - The body color
   * @param {string} label - Text label below
   */
  static createNpcSprite(emoji = '🍎', bodyColor = '#ef4444', label = '') {
    const fw = 128, fh = 128, cols = 3, rows = 1;
    const canvas = document.createElement('canvas');
    canvas.width = fw * cols;
    canvas.height = fh * rows;
    const ctx = canvas.getContext('2d');

    for (let c = 0; c < cols; c++) {
      const ox = c * fw, oy = 0;
      const bob = Math.sin(c * Math.PI / 1.5) * 3;

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.ellipse(ox + 64, oy + 115, 26, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.fillStyle = bodyColor;
      ctx.beginPath();
      ctx.ellipse(ox + 64, oy + 64 + bob, 30, 34, 0, 0, Math.PI * 2);
      ctx.fill();

      // Border
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Emoji face
      ctx.font = '36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, ox + 64, oy + 58 + bob);

      // Label
      if (label) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(label, ox + 64, oy + 92 + bob);
      }
    }
    return canvas.toDataURL('image/png');
  }

  /**
   * Create a background image (food bank / community scene)
   * @param {string} theme - 'foodbank' | 'kitchen' | 'garden' | 'warehouse'
   */
  static createBackground(theme = 'foodbank') {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 400);
    if (theme === 'kitchen') {
      skyGrad.addColorStop(0, '#fef3c7');
      skyGrad.addColorStop(1, '#fde68a');
    } else if (theme === 'garden') {
      skyGrad.addColorStop(0, '#ecfccb');
      skyGrad.addColorStop(1, '#a3e635');
    } else if (theme === 'warehouse') {
      skyGrad.addColorStop(0, '#e2e8f0');
      skyGrad.addColorStop(1, '#94a3b8');
    } else {
      skyGrad.addColorStop(0, '#bfdbfe');
      skyGrad.addColorStop(1, '#93c5fd');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, 1200, 400);

    // Ground
    const gndGrad = ctx.createLinearGradient(0, 380, 0, 600);
    gndGrad.addColorStop(0, '#86efac');
    gndGrad.addColorStop(1, '#22c55e');
    ctx.fillStyle = gndGrad;
    ctx.fillRect(0, 380, 1200, 220);

    // Path
    ctx.fillStyle = '#d4a574';
    ctx.beginPath();
    ctx.moveTo(0, 480);
    ctx.quadraticCurveTo(300, 460, 600, 470);
    ctx.quadraticCurveTo(900, 480, 1200, 465);
    ctx.lineTo(1200, 520);
    ctx.quadraticCurveTo(900, 530, 600, 520);
    ctx.quadraticCurveTo(300, 510, 0, 530);
    ctx.closePath();
    ctx.fill();

    // Building
    ctx.fillStyle = '#f97316';
    ctx.fillRect(80, 260, 200, 140);
    ctx.fillStyle = '#ea580c';
    // Roof
    ctx.beginPath();
    ctx.moveTo(60, 260);
    ctx.lineTo(180, 200);
    ctx.lineTo(300, 260);
    ctx.closePath();
    ctx.fill();
    // Door
    ctx.fillStyle = '#92400e';
    ctx.fillRect(155, 340, 50, 60);
    // Windows
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(100, 290, 35, 30);
    ctx.fillRect(225, 290, 35, 30);
    // Sign
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏠 FOOD BANK', 180, 250);

    // Trees
    const treePositions = [400, 550, 750, 950, 1100];
    treePositions.forEach(tx => {
      const ty = 340 + Math.random() * 40;
      // Trunk
      ctx.fillStyle = '#92400e';
      ctx.fillRect(tx - 6, ty, 12, 50);
      // Leaves
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(tx, ty - 10, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(tx - 10, ty, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(tx + 12, ty - 5, 22, 0, Math.PI * 2);
      ctx.fill();
    });

    // Clouds
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    [[150, 80], [450, 50], [800, 90], [1050, 60]].forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.arc(cx + 30, cy - 10, 25, 0, Math.PI * 2);
      ctx.arc(cx + 50, cy, 28, 0, Math.PI * 2);
      ctx.fill();
    });

    // Sun
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(1050, 80, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(1050, 80, 32, 0, Math.PI * 2);
    ctx.fill();

    // Title banner
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, 1200, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    const titles = {
      foodbank: '🦸 Hunger Heroes — Food Bank',
      kitchen: '🦸 Hunger Heroes — Community Kitchen',
      garden: '🦸 Hunger Heroes — Garden',
      warehouse: '🦸 Hunger Heroes — Warehouse',
    };
    ctx.fillText(titles[theme] || titles.foodbank, 600, 27);

    return canvas.toDataURL('image/png');
  }
}

export default SpriteGenerator;
