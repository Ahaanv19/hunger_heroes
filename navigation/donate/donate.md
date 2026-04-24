---
layout: base
title: Donate Hub
permalink: /donate/
search_exclude: true
menu: nav/home.html
---

<!-- All styles live in _sass/hunger-heroes/_donate-hub.scss -->

<div class="hub">

  <!-- ============== Header ============== -->
  <div class="hub__head">
    <span class="hub__eyebrow">Donate Hub</span>
    <h1 class="hub__title">Choose your role, walk the path.</h1>
    <p class="hub__sub">
      Pick a role below, then move your hero through each step in order.
      Use <span class="hub__key">A</span><span class="hub__key">D</span> or the arrow keys
      to walk, and press <span class="hub__key">E</span> to open the active step.
    </p>
  </div>

  <!-- ============== Role selector (segmented control) ============== -->
  <div class="hub__roles-wrap">
    <div class="hub__roles" role="tablist" aria-label="Choose your role">
      <button class="hub__role is-active" data-role="donor"     role="tab">I'm Donating</button>
      <button class="hub__role"           data-role="receiver"  role="tab">I Need Food</button>
      <button class="hub__role"           data-role="volunteer" role="tab">I'm Volunteering</button>
    </div>
  </div>

  <!-- ============== Step tracker + progress ============== -->
  <div id="stepTracker" class="hub__tracker hub__tracker--r5"></div>
  <div class="hub__progress"><div id="progressBar"></div></div>

  <!-- ============== Game canvas + HUD ============== -->
  <div class="hub__game">
    <canvas id="hubCanvas" width="1080" height="320" tabindex="0" aria-label="Donate hub level"></canvas>

    <div class="hub__overlay" id="helpOverlay">
      <div class="hub__overlay-card">
        <h2>Welcome, Hunger Hero</h2>
        <p>
          Pick your role above, then walk your hero from <strong>Step 1</strong>
          to the finish, opening each step in order.
        </p>
        <p style="font-size: 0.875rem;">
          Move with <span class="hub__key">A</span><span class="hub__key">D</span>
          or <span class="hub__key">&larr;</span><span class="hub__key">&rarr;</span>
          &middot; Open with <span class="hub__key">E</span> / <span class="hub__key">Enter</span>
        </p>
        <button class="hub__start-btn" id="startBtn">Start Step 1</button>
      </div>
    </div>

    <div class="hub__hud">
      <div>Current step: <span class="hub__hud-current" id="hudStep">Step 1</span></div>
      <div>Move <span class="hub__key">A</span><span class="hub__key">D</span> &middot; Open <span class="hub__key">E</span></div>
      <div class="hub__hud-actions">
        <button class="hub__hud-btn"             id="prevBtn">Previous</button>
        <button class="hub__hud-btn hub__hud-btn--primary" id="enterBtn" disabled>Open Step</button>
        <button class="hub__hud-btn"             id="nextBtn">Next</button>
        <button class="hub__hud-btn"             id="resetBtn">Reset</button>
      </div>
    </div>
  </div>

  <!-- ============== Optional tools ============== -->
  <h2 class="hub__section-title">Optional tools</h2>
  <div class="hub__extras" id="extrasList"></div>

  <!-- ============== Community stats ============== -->
  <h2 class="hub__section-title">Community impact</h2>
  <div class="hub__stats">
    <div class="stat-tile"><div class="stat-tile__num" id="stat-total">0</div>      <div class="stat-tile__lbl">Total</div></div>
    <div class="stat-tile"><div class="stat-tile__num" id="stat-posted">0</div>     <div class="stat-tile__lbl">Posted</div></div>
    <div class="stat-tile"><div class="stat-tile__num" id="stat-claimed">0</div>    <div class="stat-tile__lbl">Claimed</div></div>
    <div class="stat-tile"><div class="stat-tile__num" id="stat-in-transit">0</div> <div class="stat-tile__lbl">In Transit</div></div>
    <div class="stat-tile"><div class="stat-tile__num" id="stat-delivered">0</div>  <div class="stat-tile__lbl">Delivered</div></div>
    <div class="stat-tile"><div class="stat-tile__num" id="stat-confirmed">0</div>  <div class="stat-tile__lbl">Confirmed</div></div>
  </div>
</div>

<script>
(function () {
  const BASE = '{{site.baseurl}}';

  // Brand palette (mirrors _design-tokens.scss)
  const BRAND = {
    primary:    '#1B5E20',
    surface:    '#ffffff',
    surfaceAlt: '#f8fafc',
    text:       '#212121',
    textMuted:  '#616161'
  };

  const FLOWS = {
    donor: [
      { id:'create',      num:1, name:'Create Donation', href: BASE + '/donate/create' },
      { id:'barcode',     num:2, name:'Print Label',     href: BASE + '/donate/barcode' },
      { id:'manage',      num:3, name:'Manage Status',   href: BASE + '/donate/manage' },
      { id:'history',     num:4, name:'View History',    href: BASE + '/donate/history' },
      { id:'leaderboard', num:5, name:'Leaderboard',     href: BASE + '/donate/leaderboard' }
    ],
    receiver: [
      { id:'match',      num:1, name:'Find Food',     href: BASE + '/donate/match' },
      { id:'browse',     num:2, name:'Browse & Sort', href: BASE + '/donate/browse' },
      { id:'categories', num:3, name:'Pick Category', href: BASE + '/donate/categories' },
      { id:'scan',       num:4, name:'Scan & Verify', href: BASE + '/donate/scan' }
    ],
    volunteer: [
      { id:'browse',  num:1, name:'See Open Donations', href: BASE + '/donate/browse' },
      { id:'scan',    num:2, name:'Scan Pickup',        href: BASE + '/donate/scan' },
      { id:'manage',  num:3, name:'Update In-Transit',  href: BASE + '/donate/manage' },
      { id:'network', num:4, name:'View Network',       href: BASE + '/donate/network' }
    ]
  };

  const ICON = {
    network:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
    leaderboard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5A2.5 2.5 0 0 1 2 6.5V5h4M18 9h1.5A2.5 2.5 0 0 0 22 6.5V5h-4M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 1 0 12 0V2Z"/></svg>',
    categories:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    game:        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 13"/><polyline points="4 11 8 11"/><circle cx="16" cy="11" r="1"/><circle cx="18" cy="13" r="1"/><path d="M2 12a5 5 0 0 1 5-5h10a5 5 0 0 1 0 10H7a5 5 0 0 1-5-5z"/></svg>'
  };

  const EXTRAS = [
    { name:'Hero Game',   icon: ICON.game,        href: BASE + '/donate/game',        desc:'2D food bank adventure' },
    { name:'Network',     icon: ICON.network,     href: BASE + '/donate/network',     desc:'Community connections' },
    { name:'Leaderboard', icon: ICON.leaderboard, href: BASE + '/donate/leaderboard', desc:'Top donors' },
    { name:'Categories',  icon: ICON.categories,  href: BASE + '/donate/categories',  desc:'Browse food tree' }
  ];

  let role = 'donor', steps = FLOWS[role], currentIdx = 0, visited = new Set();
  const tracker     = document.getElementById('stepTracker');
  const progress    = document.getElementById('progressBar');
  const hudStep     = document.getElementById('hudStep');
  const enterBtn    = document.getElementById('enterBtn');
  const prevBtn     = document.getElementById('prevBtn');
  const nextBtn     = document.getElementById('nextBtn');
  const resetBtn    = document.getElementById('resetBtn');
  const helpOverlay = document.getElementById('helpOverlay');
  const startBtn    = document.getElementById('startBtn');
  const canvas      = document.getElementById('hubCanvas');
  const ctx         = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const player = { x: 80, y: H - 80, r: 14, speed: 3.4 };
  const keys   = Object.create(null);
  let running = false, started = false;

  function buildTracker() {
    tracker.className = 'hub__tracker hub__tracker--r' + steps.length;
    tracker.innerHTML = '';
    steps.forEach(function (s, i) {
      const el = document.createElement('div');
      el.className = 'step-card';
      el.innerHTML =
        '<div class="step-card__num">' + s.num + '</div>' +
        '<div class="step-card__name">' + s.name + '</div>';
      el.addEventListener('click', function () { currentIdx = i; snapPlayerToStep(); refresh(); });
      tracker.appendChild(el);
    });
  }

  function stepPositions() {
    const margin = 110, span = W - margin * 2;
    return steps.map(function (s, i) {
      return Object.assign({}, s, {
        px: margin + (steps.length === 1 ? span / 2 : (span * i) / (steps.length - 1)),
        py: H - 110
      });
    });
  }

  function snapPlayerToStep() {
    const p = stepPositions()[currentIdx];
    if (p) player.x = p.px - 50;
  }

  function refresh() {
    Array.prototype.forEach.call(tracker.children, function (el, i) {
      el.classList.toggle('is-done', visited.has(steps[i].id));
      el.classList.toggle('is-active', i === currentIdx);
    });
    progress.style.width = Math.round((currentIdx / Math.max(1, steps.length - 1)) * 100) + '%';
    hudStep.textContent = 'Step ' + steps[currentIdx].num + ' \u2014 ' + steps[currentIdx].name;
    prevBtn.disabled = currentIdx === 0;
    nextBtn.disabled = currentIdx === steps.length - 1;
  }

  document.querySelectorAll('.hub__role').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.hub__role').forEach(function (x) { x.classList.remove('is-active'); });
      b.classList.add('is-active');
      role = b.dataset.role;
      steps = FLOWS[role];
      currentIdx = 0;
      visited = new Set();
      buildTracker();
      snapPlayerToStep();
      refresh();
    });
  });

  prevBtn.addEventListener('click',  function () { if (currentIdx > 0) { currentIdx--; snapPlayerToStep(); refresh(); } });
  nextBtn.addEventListener('click',  function () { if (currentIdx < steps.length - 1) { currentIdx++; snapPlayerToStep(); refresh(); } });
  resetBtn.addEventListener('click', function () { currentIdx = 0; visited = new Set(); snapPlayerToStep(); refresh(); });
  enterBtn.addEventListener('click', enterCurrent);

  function showHelp(show) {
    helpOverlay.style.display = show ? 'flex' : 'none';
    running = !show;
    if (!show) canvas.focus();
  }
  startBtn.addEventListener('click', function () { started = true; showHelp(false); });

  function enterCurrent() {
    const s = steps[currentIdx]; if (!s) return;
    visited.add(s.id);
    try {
      sessionStorage.setItem('hh_donate_flow', JSON.stringify({
        role: role, idx: currentIdx, visited: Array.from(visited)
      }));
    } catch (_) {}
    window.location.href = s.href;
  }

  try {
    const saved = JSON.parse(sessionStorage.getItem('hh_donate_flow') || 'null');
    if (saved && FLOWS[saved.role]) {
      role = saved.role;
      steps = FLOWS[role];
      visited = new Set(saved.visited || []);
      const si = saved.idx || 0;
      currentIdx = Math.min(steps.length - 1,
        si + (visited.has(steps[si] && steps[si].id) ? 1 : 0));
      document.querySelectorAll('.hub__role').forEach(function (b) {
        b.classList.toggle('is-active', b.dataset.role === role);
      });
    }
  } catch (_) {}

  window.addEventListener('keydown', function (e) {
    const k = e.key.toLowerCase();
    if (['arrowleft','arrowright','arrowup','arrowdown',' '].indexOf(k) !== -1) e.preventDefault();
    keys[k] = true;
    if ((k === 'e' || k === 'enter') && started && nearCurrent()) enterCurrent();
  });
  window.addEventListener('keyup', function (e) { keys[e.key.toLowerCase()] = false; });

  function nearCurrent() {
    const p = stepPositions()[currentIdx]; if (!p) return false;
    return Math.abs(player.x - p.px) < 50;
  }

  function update() {
    if (!running) return;
    let dx = 0;
    if (keys['a'] || keys['arrowleft'])  dx -= 1;
    if (keys['d'] || keys['arrowright']) dx += 1;
    if (dx) player.x += dx * player.speed;
    player.x = Math.max(40, Math.min(W - 40, player.x));

    const positioned = stepPositions();
    let bestIdx = currentIdx, bestDist = Infinity;
    positioned.forEach(function (s, i) {
      const d = Math.abs(player.x - s.px);
      if (d < bestDist) { bestDist = d; bestIdx = i; }
    });
    if (bestIdx !== currentIdx && bestDist < 60) { currentIdx = bestIdx; refresh(); }
    enterBtn.disabled = !nearCurrent();
  }

  function drawBg() {
    ctx.fillStyle = BRAND.surfaceAlt;
    ctx.fillRect(0, 0, W, H);

    const g = ctx.createLinearGradient(0, H - 90, 0, H);
    g.addColorStop(0, '#e8f3ec');
    g.addColorStop(1, '#d6e9dc');
    ctx.fillStyle = g;
    ctx.fillRect(0, H - 90, W, 90);

    ctx.strokeStyle = 'rgba(27, 94, 32, 0.18)';
    ctx.lineWidth = 1;
    for (let x = 10; x < W; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x, H - 6);
      ctx.lineTo(x + 3, H - 14);
      ctx.stroke();
    }
  }

  function drawPath(positioned) {
    if (positioned.length < 2) return;
    const y = H - 80;

    ctx.strokeStyle = 'rgba(69, 90, 100, 0.35)';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    positioned.forEach(function (s, i) {
      if (i === 0) ctx.moveTo(s.px, y); else ctx.lineTo(s.px, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    if (currentIdx > 0) {
      ctx.strokeStyle = BRAND.primary;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(positioned[0].px, y);
      for (let i = 1; i <= currentIdx; i++) ctx.lineTo(positioned[i].px, y);
      ctx.stroke();
    }
  }

  function drawStation(s, i) {
    const isCurrent = i === currentIdx;
    const isDone    = visited.has(s.id);
    const x = s.px, y = H - 80;

    if (isCurrent) {
      ctx.beginPath();
      ctx.arc(x, y, 38, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(27, 94, 32, 0.10)';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    if (isDone)         ctx.fillStyle = BRAND.primary;
    else if (isCurrent) ctx.fillStyle = BRAND.surface;
    else                ctx.fillStyle = '#cfd8dc';
    ctx.fill();

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = isCurrent ? BRAND.primary : (isDone ? BRAND.primary : '#9ba8b3');
    ctx.stroke();

    ctx.font = '700 14px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isDone ? '#ffffff' : (isCurrent ? BRAND.primary : '#455a64');
    ctx.fillText(isDone ? '\u2713' : String(s.num), x, y + 1);

    ctx.font = '600 11px Inter, system-ui, sans-serif';
    ctx.fillStyle = isCurrent ? BRAND.primary : BRAND.textMuted;
    ctx.fillText('STEP ' + s.num, x, y + 38);

    ctx.font = '600 12px Inter, system-ui, sans-serif';
    ctx.fillStyle = BRAND.text;
    ctx.fillText(s.name, x, y + 54);

    if (isCurrent && nearCurrent()) {
      const hintW = 64, hintH = 20, r = 6;
      const rx = x - hintW / 2, ry = y - 60;
      ctx.fillStyle = BRAND.primary;
      ctx.beginPath();
      ctx.moveTo(rx + r, ry);
      ctx.arcTo(rx + hintW, ry, rx + hintW, ry + hintH, r);
      ctx.arcTo(rx + hintW, ry + hintH, rx, ry + hintH, r);
      ctx.arcTo(rx, ry + hintH, rx, ry, r);
      ctx.arcTo(rx, ry, rx + hintW, ry, r);
      ctx.closePath();
      ctx.fill();
      ctx.font = '700 10px Inter, system-ui, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('PRESS E', x, ry + hintH / 2 + 1);
    }
  }

  function drawPlayer() {
    const y = H - 80;

    ctx.beginPath();
    ctx.ellipse(player.x, y + 18, 13, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(player.x, y - 4, player.r, 0, Math.PI * 2);
    ctx.fillStyle = BRAND.primary;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#0d3817';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(player.x - 4, y - 8, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fill();
  }

  function render() {
    const p = stepPositions();
    drawBg();
    drawPath(p);
    p.forEach(drawStation);
    drawPlayer();
  }

  function loop() { update(); render(); requestAnimationFrame(loop); }

  canvas.addEventListener('click', function (e) {
    if (!started) { started = true; showHelp(false); }
    const rect = canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * (W / rect.width);
    const positioned = stepPositions();
    for (let i = 0; i < positioned.length; i++) {
      if (Math.abs(sx - positioned[i].px) < 36) {
        currentIdx = i; snapPlayerToStep(); refresh();
        if (nearCurrent()) enterCurrent();
        return;
      }
    }
    player.x = Math.max(40, Math.min(W - 40, sx));
  });

  const extrasEl = document.getElementById('extrasList');
  EXTRAS.forEach(function (e) {
    const a = document.createElement('a');
    a.className = 'extra-card';
    a.href = e.href;
    a.innerHTML =
      '<div class="extra-card__icon">' + e.icon + '</div>' +
      '<div><div class="extra-card__name">' + e.name + '</div>' +
      '<div class="extra-card__desc">' + e.desc + '</div></div>';
    extrasEl.appendChild(a);
  });

  buildTracker();
  snapPlayerToStep();
  refresh();
  render();
  loop();

  function animate(id, target) {
    const el = document.getElementById(id); if (!el) return;
    if (!target) { el.textContent = '0'; return; }
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const t = setInterval(function () {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = cur.toLocaleString();
    }, 35);
  }

  (async function loadStats() {
    try {
      const m = await import(BASE + '/assets/js/api/config.js');
      const pythonURI = m.pythonURI, javaURI = m.javaURI, fetchOptions = m.fetchOptions;
      try {
        const ctrl = new AbortController();
        const t = setTimeout(function () { ctrl.abort(); }, 4000);
        const r = await fetch(javaURI + '/api/donations/stats', Object.assign({}, fetchOptions, { signal: ctrl.signal }));
        clearTimeout(t);
        if (r.ok) {
          const s = await r.json();
          const bs = s.byStatus || s.by_status || {};
          animate('stat-total',      s.total || 0);
          animate('stat-posted',     bs.active || bs.posted || 0);
          animate('stat-claimed',    bs.accepted || bs.claimed || 0);
          animate('stat-in-transit', bs['in-transit'] || bs.in_transit || 0);
          animate('stat-delivered',  bs.delivered || 0);
          animate('stat-confirmed',  bs.confirmed || 0);
          return;
        }
      } catch (_) {}
      try {
        const ctrl = new AbortController();
        const t = setTimeout(function () { ctrl.abort(); }, 3000);
        const r = await fetch(pythonURI + '/api/donations/stats', Object.assign({}, fetchOptions, { signal: ctrl.signal }));
        clearTimeout(t);
        if (r.ok) {
          const s = await r.json();
          animate('stat-total',      s.total || 0);
          animate('stat-posted',     s.posted || 0);
          animate('stat-claimed',    s.claimed || 0);
          animate('stat-in-transit', s.in_transit || 0);
          animate('stat-delivered',  s.delivered || 0);
          animate('stat-confirmed',  s.confirmed || 0);
          return;
        }
      } catch (_) {}
    } catch (_) {}

    const ds = JSON.parse(localStorage.getItem('hh_donations') || '[]');
    const c = { posted: 0, claimed: 0, in_transit: 0, delivered: 0, confirmed: 0 };
    ds.forEach(function (d) { if (c[d.status] !== undefined) c[d.status]++; });
    animate('stat-total',      ds.length);
    animate('stat-posted',     c.posted);
    animate('stat-claimed',    c.claimed);
    animate('stat-in-transit', c.in_transit);
    animate('stat-delivered',  c.delivered);
    animate('stat-confirmed',  c.confirmed);
  })();
})();
</script>
